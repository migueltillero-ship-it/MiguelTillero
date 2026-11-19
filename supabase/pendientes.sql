-- ===========================================================================
-- «MIS PENDIENTES»: la campanita del estudiante
-- ===========================================================================
-- Un solo lugar donde cada estudiante ve qué le falta por hacer, qué practicar y
-- cómo mejorar. Junta tres cosas:
--   1. lo que el docente le pide en concreto (tabla `pendientes`: una grabación,
--      una práctica, un texto por corregir, un consejo para entrenarse);
--   2. los deberes publicados de su grupo que todavía no entregó;
--   3. las fichas de ejercicios de su grupo que tiene sin empezar o a medias.
-- Las partes 2 y 3 se calculan solas con lo que ya existe: nadie tiene que escribir nada.
--
-- Quién ve qué: cada estudiante lee solo lo suyo y solo puede marcar como hecho lo suyo
-- (con `completar_pendiente`); el docente lo ve y lo escribe todo.
--
-- CÓMO USAR: Supabase → SQL Editor → pegar → Run. Es seguro repetirlo.
-- https://supabase.com/dashboard/project/yfrdlzveleevkjqekdoq/sql/new
-- ===========================================================================

create table if not exists public.pendientes (
  id             uuid primary key default gen_random_uuid(),
  estudiante_id  uuid not null references public.profiles(id) on delete cascade,
  tipo           text not null default 'practicar' check (tipo in ('entregar', 'practicar', 'mejorar')),
  titulo         text not null,
  detalle        text,
  enlace         text,                      -- a dónde ir para hacerlo (una página del sitio)
  fecha_limite   date,
  completado     boolean not null default false,
  completado_en  timestamptz,
  creado_en      timestamptz not null default now(),
  creado_por     uuid default auth.uid()
);
create index if not exists idx_pendientes_estudiante on public.pendientes(estudiante_id, completado);
alter table public.pendientes enable row level security;

do $$ begin
  if not exists (select 1 from pg_policies where tablename='pendientes' and policyname='pendientes: cada quien los suyos') then
    create policy "pendientes: cada quien los suyos" on public.pendientes
      for select to authenticated using (estudiante_id = auth.uid() or public.es_docente());
  end if;
  if not exists (select 1 from pg_policies where tablename='pendientes' and policyname='pendientes: el docente escribe') then
    create policy "pendientes: el docente escribe" on public.pendientes
      for all to authenticated using (public.es_docente()) with check (public.es_docente());
  end if;
end $$;

-- El estudiante marca como hecho solo lo suyo.
create or replace function public.completar_pendiente(p_id uuid, p_hecho boolean default true)
returns void language plpgsql security definer set search_path = public as $$
begin
  update public.pendientes
     set completado = p_hecho, completado_en = case when p_hecho then now() else null end
   where id = p_id and estudiante_id = auth.uid();
end $$;
revoke all on function public.completar_pendiente(uuid, boolean) from public, anon;
grant execute on function public.completar_pendiente(uuid, boolean) to authenticated;

-- Todo lo pendiente de quien entra, en un solo viaje.
create or replace function public.mis_pendientes()
returns jsonb language plpgsql security definer set search_path = public as $$
declare
  v_uid uuid := auth.uid();
  v_manuales jsonb; v_deberes jsonb; v_fichas jsonb;
begin
  if v_uid is null then return jsonb_build_object('manuales','[]'::jsonb,'deberes','[]'::jsonb,'fichas','[]'::jsonb,'total',0); end if;

  select coalesce(jsonb_agg(jsonb_build_object('id',p.id,'tipo',p.tipo,'titulo',p.titulo,'detalle',p.detalle,'enlace',p.enlace,'fecha_limite',p.fecha_limite)
                           order by p.fecha_limite nulls last, p.creado_en), '[]'::jsonb)
    into v_manuales from public.pendientes p where p.estudiante_id = v_uid and not p.completado;

  select coalesce(jsonb_agg(jsonb_build_object('id',d.id,'titulo',d.titulo,'entregar_antes',d.entregar_antes,'enlace','estudiantes/devoirs.html')
                           order by d.entregar_antes nulls last, d.asignado_el), '[]'::jsonb)
    into v_deberes
    from public.deberes d
    join public.inscripciones i on i.grupo_id = d.grupo_id and i.estudiante_id = v_uid and i.estado in ('activa','pendiente')
   where d.publicado
     and not exists (select 1 from public.deberes_entregas e where e.deber_id = d.id and e.estudiante_id = v_uid);

  -- Fichas del espacio de ejercicios del grupo: sin empezar o a medias.
  select coalesce(jsonb_agg(x order by (x->>'orden')::int), '[]'::jsonb) into v_fichas from (
    select jsonb_build_object('ficha', c.ficha, 'titulo', c.titulo, 'de', c.ejercicios,
             'hechos', (select count(distinct fa.ejercicio) from public.fichas_avance fa
                         where fa.estudiante_id = v_uid and fa.clave = c.clave and fa.ficha = c.ficha
                           and fa.ejercicio ~ '^[0-9]+$' and fa.ejercicio::int < c.ejercicios),
             'enlace', case c.clave when 'mt-a1' then 'estudiantes/espace-a1-exercices.html'
                                    when 'mt-a2' then 'estudiantes/espace-a2-exercices.html'
                                    else 'estudiantes/espace-b2-exercices.html' end || '#' || c.ficha,
             'orden', row_number() over (order by g.fecha_inicio, c.ficha)) as x
      from public.inscripciones i
      join public.grupos g on g.id = i.grupo_id
      join public.fichas_catalogo c on c.cuenta and c.clave = case when g.codigo like 'A1%' then 'mt-a1' when g.codigo like 'A2%' then 'mt-a2' when g.codigo like 'B2%' then 'mt-b2' end
     where i.estudiante_id = v_uid and i.estado in ('activa','pendiente')
       and (g.fecha_fin is null or g.fecha_fin >= current_date)      -- un ciclo ya cerrado no recuerda nada
  ) t
  -- Las fichas a medias se muestran todas; de las que no se han empezado, solo las tres primeras,
  -- para que la campanita ayude y no abrume.
  where (x->>'hechos')::int < (x->>'de')::int
    and ((x->>'hechos')::int > 0 or (x->>'orden')::int <= 3);

  return jsonb_build_object('manuales', v_manuales, 'deberes', v_deberes, 'fichas', v_fichas,
    'total', jsonb_array_length(v_manuales) + jsonb_array_length(v_deberes) + jsonb_array_length(v_fichas));
end $$;
revoke all on function public.mis_pendientes() from public, anon;
grant execute on function public.mis_pendientes() to authenticated;

-- ---------------------------------------------------------------------------
-- Cómo le pides algo a una persona (ejemplo; cambia el nombre y el texto):
--
--   insert into public.pendientes (estudiante_id, tipo, titulo, detalle, enlace, fecha_limite)
--   select id, 'practicar', 'La S y la Z con cada vocal',
--          'Di sa–za, se–ze, si–zi, so–zo, su–zu. Pon la mano en la garganta: la Z vibra y la S no.',
--          'estudiantes/fonetica-vocales.html', date '2026-11-20'
--     from public.profiles where nombre_completo ilike '%zenteno%';
-- ---------------------------------------------------------------------------
