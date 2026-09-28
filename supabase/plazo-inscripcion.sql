-- ===========================================================================
-- PLAZO DE INSCRIPCIÓN POR GRUPO
-- ===========================================================================
-- Hasta ahora un grupo estaba «abierto» o «cerrado» y había que cerrarlo a
-- mano. La regla que queremos es otra: hay plazo hasta el primer día del
-- ciclo inclusive —quien llegue ese martes todavía entra— y a partir del día
-- siguiente, no.
--
-- Se añade una fecha de cierre por grupo, con el primer día del ciclo como
-- valor de partida, y se hace que el plazo se respete solo: ni la página de
-- inscripción ofrece el grupo pasado el plazo, ni el alta lo engancha.
--
-- Todo se compara en hora de Ciudad de México. Con la hora UTC que trae
-- Postgres por defecto, el martes a las 18:00 de México ya sería miércoles y
-- el plazo se habría cerrado seis horas antes de tiempo, justo cuando la
-- clase empieza a las 19:00.
--
-- Es idempotente: se puede pegar entera las veces que haga falta.
-- Dónde: Supabase → SQL Editor → New query → pegar → Run.
-- ===========================================================================

-- ---------------------------------------------------------------------------
-- 1. La fecha de cierre
-- ---------------------------------------------------------------------------

alter table public.grupos
  add column if not exists fecha_cierre_inscripcion date;

comment on column public.grupos.fecha_cierre_inscripcion is
  'Último día en que se admiten inscripciones, inclusive. Si está vacío, se '
  'toma el primer día del ciclo.';

-- Los grupos que ya existen se quedan con el primer día del ciclo.
update public.grupos
   set fecha_cierre_inscripcion = fecha_inicio
 where fecha_cierre_inscripcion is null;

-- El ciclo de octubre: se admite gente durante todo el martes 29.
update public.grupos
   set fecha_cierre_inscripcion = date '2026-09-29'
 where codigo = 'A1-OCT2026';

-- ---------------------------------------------------------------------------
-- 2. Una función que responda «¿sigue abierto?»
-- ---------------------------------------------------------------------------

create or replace function public.hoy_mexico()
returns date language sql stable as $$
  select (now() at time zone 'America/Mexico_City')::date;
$$;

create or replace function public.inscripcion_abierta(p_grupo_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1
      from public.grupos g
     where g.id = p_grupo_id
       and g.estado in ('abierto', 'en_curso')
       and coalesce(g.fecha_cierre_inscripcion, g.fecha_inicio) >= public.hoy_mexico()
  );
$$;

grant execute on function public.hoy_mexico(), public.inscripcion_abierta(uuid)
  to anon, authenticated;

-- ---------------------------------------------------------------------------
-- 3. La vista pública lleva el plazo
-- ---------------------------------------------------------------------------
-- El grupo sigue apareciendo aunque el plazo haya pasado: así la página de
-- inscripción puede decir «el plazo cerró el martes 29» en lugar de dejar al
-- representante mirando una lista vacía sin saber por qué.

drop view if exists public.v_grupos_disponibles;
create view public.v_grupos_disponibles as
select
  g.id, g.codigo, g.curso_id, c.nombre as curso_nombre, c.nivel as curso_nivel,
  g.formato, g.modalidad, g.cupo_maximo, g.cupo_actual,
  (g.cupo_maximo - g.cupo_actual) as cupo_disponible,
  g.fecha_inicio, g.fecha_fin, g.horario, g.costo, g.moneda, g.estado,
  coalesce(g.fecha_cierre_inscripcion, g.fecha_inicio) as fecha_cierre_inscripcion,
  (coalesce(g.fecha_cierre_inscripcion, g.fecha_inicio) >= public.hoy_mexico())
    as inscripcion_abierta,
  p.nombre_completo as docente_nombre
from public.grupos g
join public.cursos c on c.id = g.curso_id
left join public.profiles p on p.id = g.docente_id
where g.estado in ('abierto', 'en_curso');

grant select on public.v_grupos_disponibles to anon, authenticated;

-- ---------------------------------------------------------------------------
-- 4. El alta respeta el plazo
-- ---------------------------------------------------------------------------
-- Si alguien llega tarde con su enlace, la cuenta se crea igual —no le
-- cerramos la puerta— pero no queda enganchada al grupo: aparece en el panel
-- sin grupo para que el docente decida.

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
    coalesce(nullif(new.raw_user_meta_data->>'representante_email', ''),
             case when nullif(new.raw_user_meta_data->>'representante_nombre', '') is not null
                  then new.email end)
  )
  on conflict (id) do nothing;

  v_curso_id := nullif(new.raw_user_meta_data->>'curso_id', '')::uuid;
  v_grupo_id := nullif(new.raw_user_meta_data->>'grupo_id', '')::uuid;

  -- Fuera de plazo: la cuenta se queda sin grupo y el docente la asigna.
  if v_grupo_id is not null and not public.inscripcion_abierta(v_grupo_id) then
    v_grupo_id := null;
    v_curso_id := null;
  end if;

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
-- 5. Comprobación
-- ---------------------------------------------------------------------------

select
  g.codigo,
  g.fecha_inicio                                as primer_dia,
  coalesce(g.fecha_cierre_inscripcion,
           g.fecha_inicio)                      as ultimo_dia_para_inscribirse,
  public.hoy_mexico()                           as hoy_en_mexico,
  case when public.inscripcion_abierta(g.id)
       then 'SÍ, todavía se puede'
       else 'NO, el plazo cerró' end            as inscripcion
from public.grupos g
where g.estado in ('abierto', 'en_curso')
order by g.fecha_inicio;
