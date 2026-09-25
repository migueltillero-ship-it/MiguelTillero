-- ============================================================================
-- DATOS DEL REPRESENTANTE + CIERRE DE LOS ENLACES DE CLASE
--
-- 1) SEGURIDAD. Hasta ahora el enlace de Zoom y la invitación al grupo de
--    WhatsApp vivían en la tabla grupos, y la política "grupos: estudiante ve
--    el suyo" no distingue entre una inscripción activa y una pendiente. Como
--    el enlace de inscripción es público, cualquiera podía rellenar el
--    formulario —sin pagar— y quedarse con el acceso a la clase.
--    Los enlaces se mudan a su propia tabla, que solo leen el docente del
--    grupo y quien tenga la inscripción ACTIVA.
--
-- 2) REPRESENTANTE. Los estudiantes son menores y quien registra es el padre,
--    la madre o el tutor. Se guardan sus datos en el perfil.
--
-- CÓMO USAR: ejecútalo DESPUÉS de materiales-y-resultados.sql.
-- Es seguro repetirlo.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Datos del representante en el perfil
-- ---------------------------------------------------------------------------

alter table public.profiles add column if not exists representante_nombre text;
alter table public.profiles add column if not exists representante_parentesco text;
alter table public.profiles add column if not exists representante_telefono text;
alter table public.profiles add column if not exists representante_email text;

-- El alta manda estos datos como metadatos; el trigger los copia al perfil.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  v_curso_id uuid;
  v_grupo_id uuid;
begin
  insert into public.profiles (
    id, role, nombre_completo, telefono,
    representante_nombre, representante_parentesco, representante_telefono, representante_email
  )
  values (
    new.id,
    'estudiante',
    coalesce(new.raw_user_meta_data->>'nombre_completo', new.email),
    new.raw_user_meta_data->>'telefono',
    nullif(new.raw_user_meta_data->>'representante_nombre', ''),
    nullif(new.raw_user_meta_data->>'representante_parentesco', ''),
    nullif(new.raw_user_meta_data->>'representante_telefono', ''),
    -- Si el representante registró con su propio correo, ese es su contacto.
    coalesce(nullif(new.raw_user_meta_data->>'representante_email', ''),
             case when nullif(new.raw_user_meta_data->>'representante_nombre', '') is not null
                  then new.email end)
  )
  on conflict (id) do nothing;

  v_curso_id := nullif(new.raw_user_meta_data->>'curso_id', '')::uuid;
  v_grupo_id := nullif(new.raw_user_meta_data->>'grupo_id', '')::uuid;

  if v_curso_id is null and v_grupo_id is not null then
    select curso_id into v_curso_id from public.grupos where id = v_grupo_id;
  end if;

  if v_curso_id is not null then
    insert into public.inscripciones (curso_id, grupo_id, estudiante_id, estado)
    values (v_curso_id, v_grupo_id, new.id, 'pendiente')
    on conflict (curso_id, estudiante_id) do nothing;
  end if;

  return new;
end;
$$;


-- ---------------------------------------------------------------------------
-- 2. Los enlaces de clase, en su propia tabla y bajo llave
-- ---------------------------------------------------------------------------

create or replace function public.esta_inscrito_activo_en_grupo(p_grupo_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.inscripciones i
    where i.grupo_id = p_grupo_id
      and i.estudiante_id = auth.uid()
      and i.estado in ('activa', 'finalizada')
  );
$$;
grant execute on function public.esta_inscrito_activo_en_grupo(uuid) to anon, authenticated;

create table if not exists public.grupo_enlaces (
  grupo_id uuid primary key references public.grupos(id) on delete cascade,
  enlace_zoom text,
  enlace_whatsapp text,
  notas text,
  updated_at timestamptz not null default now()
);
alter table public.grupo_enlaces enable row level security;

drop policy if exists "enlaces: docente del grupo administra" on public.grupo_enlaces;
create policy "enlaces: docente del grupo administra"
  on public.grupo_enlaces for all
  using (public.es_admin() or public.es_docente_del_grupo(grupo_id))
  with check (public.es_admin() or public.es_docente_del_grupo(grupo_id));

-- La diferencia con el resto: aquí se exige inscripción ACTIVA, no basta con
-- estar registrado.
drop policy if exists "enlaces: solo inscripciones activas" on public.grupo_enlaces;
create policy "enlaces: solo inscripciones activas"
  on public.grupo_enlaces for select
  using (public.esta_inscrito_activo_en_grupo(grupo_id));

-- Se mudan los valores que hoy están en grupos y se vacían de allí, porque
-- esa tabla la lee cualquier inscrito aunque esté pendiente.
insert into public.grupo_enlaces (grupo_id, enlace_zoom, enlace_whatsapp)
select g.id, g.enlace_zoom, g.enlace_whatsapp
from public.grupos g
where g.enlace_zoom is not null or g.enlace_whatsapp is not null
on conflict (grupo_id) do update
  set enlace_zoom     = coalesce(public.grupo_enlaces.enlace_zoom, excluded.enlace_zoom),
      enlace_whatsapp = coalesce(public.grupo_enlaces.enlace_whatsapp, excluded.enlace_whatsapp),
      updated_at      = now();

alter table public.grupos drop column if exists enlace_zoom;
alter table public.grupos drop column if exists enlace_whatsapp;


-- ============================================================================
-- PARA CAMBIAR LOS ENLACES MÁS ADELANTE
-- ============================================================================
-- update public.grupo_enlaces
-- set enlace_zoom     = 'https://...',
--     enlace_whatsapp = 'https://chat.whatsapp.com/...'
-- where grupo_id = (select id from public.grupos where codigo = 'A1-OCT2026');


-- ============================================================================
-- COMPROBACIÓN
-- ============================================================================
select g.codigo,
       case when e.enlace_zoom     is null then '(sin poner)' else 'puesto' end as zoom,
       case when e.enlace_whatsapp is null then '(sin poner)' else 'puesto' end as whatsapp
from public.grupos g
left join public.grupo_enlaces e on e.grupo_id = g.id
where g.codigo = 'A1-OCT2026';
