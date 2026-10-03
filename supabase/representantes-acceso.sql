-- ===========================================================================
-- ACCESO PROPIO PARA REPRESENTANTES
-- ===========================================================================
-- «Y uno como mamá, ¿cómo entraré a la plataforma?» — esa pregunta destapó
-- que no había respuesta. Hasta ahora la cuenta era una sola, compartida con
-- el estudiante: si el chico cambiaba la contraseña, la madre se quedaba
-- fuera, y no había forma de saber quién había entrado.
--
-- Esto le da al representante su propia cuenta, su propia contraseña y una
-- vista de solo lectura del hijo o hijos que tenga a cargo.
--
-- CÓMO ESTÁ HECHO
--
-- En vez de repartir políticas de lectura por seis tablas —y arriesgar las
-- recursiones de siempre—, todo pasa por UNA función con SECURITY DEFINER
-- que devuelve el panel ya armado. La función filtra por auth.uid() contra
-- la tabla de tutorías: un representante no puede pedir los datos de un
-- alumno que no sea suyo, porque no hay parámetro que tocar.
--
-- EL ENLACE SE HACE SOLO
--
-- El formulario de inscripción ya pedía el correo del representante. Cuando
-- esa persona se registra con ese mismo correo, queda emparejada con sus
-- hijos automáticamente. Y al revés: si el representante se registra primero
-- y el hijo después, el alta del hijo también los empareja.
--
-- CÓMO USAR: ejecútalo después de representante-y-enlaces.sql.
-- Es seguro repetirlo.
-- Dónde: Supabase → SQL Editor → New query → pegar → Run.
-- ===========================================================================


-- ---------------------------------------------------------------------------
-- 1. El rol
-- ---------------------------------------------------------------------------

do $$
declare v_constraint text;
begin
  select conname into v_constraint
    from pg_constraint
   where conrelid = 'public.profiles'::regclass
     and contype = 'c'
     and pg_get_constraintdef(oid) ilike '%role%';
  if v_constraint is not null then
    execute format('alter table public.profiles drop constraint %I', v_constraint);
  end if;
  alter table public.profiles
    add constraint profiles_role_check
    check (role in ('docente', 'estudiante', 'admin', 'representante'));
end $$;


-- ---------------------------------------------------------------------------
-- 2. Quién representa a quién
-- ---------------------------------------------------------------------------
-- Una fila por pareja. Un representante puede tener varios hijos en la
-- escuela, y un estudiante puede tener a su madre y a su padre.

create table if not exists public.tutorias (
  representante_id uuid not null references public.profiles(id) on delete cascade,
  estudiante_id    uuid not null references public.profiles(id) on delete cascade,
  parentesco       text,
  creado_en        timestamptz not null default now(),
  primary key (representante_id, estudiante_id)
);
alter table public.tutorias enable row level security;

comment on table public.tutorias is
  'Qué representante puede ver a qué estudiante. Se llena sola al emparejar '
  'el correo que el estudiante declaró como representante_email.';

drop policy if exists "tutorias: el docente administra" on public.tutorias;
create policy "tutorias: el docente administra"
  on public.tutorias for all
  using (public.es_admin() or exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.role in ('docente','admin')))
  with check (public.es_admin() or exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.role in ('docente','admin')));

drop policy if exists "tutorias: cada quien ve las suyas" on public.tutorias;
create policy "tutorias: cada quien ve las suyas"
  on public.tutorias for select
  using (representante_id = auth.uid() or estudiante_id = auth.uid());


-- ---------------------------------------------------------------------------
-- 3. El emparejamiento, en los dos sentidos
-- ---------------------------------------------------------------------------

create or replace function public.emparejar_representante(p_representante_id uuid)
returns integer language plpgsql security definer set search_path = public as $$
declare
  v_email text;
  v_n integer := 0;
begin
  select lower(u.email) into v_email from auth.users u where u.id = p_representante_id;
  if v_email is null then return 0; end if;

  insert into public.tutorias (representante_id, estudiante_id, parentesco)
  select p_representante_id, p.id, p.representante_parentesco
    from public.profiles p
   where p.role = 'estudiante'
     and lower(p.representante_email) = v_email
     and p.id <> p_representante_id
  on conflict do nothing;

  get diagnostics v_n = row_count;
  return v_n;
end $$;

-- Y al revés: cuando se da de alta un estudiante, buscamos si su
-- representante ya tiene cuenta.
create or replace function public.emparejar_estudiante(p_estudiante_id uuid)
returns integer language plpgsql security definer set search_path = public as $$
declare v_n integer := 0;
begin
  insert into public.tutorias (representante_id, estudiante_id, parentesco)
  select r.id, p_estudiante_id, p.representante_parentesco
    from public.profiles p
    join auth.users u on lower(u.email) = lower(p.representante_email)
    join public.profiles r on r.id = u.id
   where p.id = p_estudiante_id
     and p.representante_email is not null
     and r.role = 'representante'
     and r.id <> p_estudiante_id
  on conflict do nothing;

  get diagnostics v_n = row_count;
  return v_n;
end $$;

grant execute on function
  public.emparejar_representante(uuid), public.emparejar_estudiante(uuid)
  to authenticated;


-- ---------------------------------------------------------------------------
-- 4. El alta: reconoce quién se está registrando
-- ---------------------------------------------------------------------------
-- El formulario del representante manda es_representante en los metadatos.
-- Todo lo demás del alta se mantiene como estaba.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  v_curso_id uuid;
  v_grupo_id uuid;
  v_es_representante boolean := coalesce((new.raw_user_meta_data->>'es_representante')::boolean, false);
begin
  insert into public.profiles (
    id, role, nombre_completo, telefono,
    representante_nombre, representante_parentesco, representante_telefono, representante_email
  )
  values (
    new.id,
    case when v_es_representante then 'representante' else 'estudiante' end,
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

  -- Un representante no se inscribe a ningún curso: se empareja con sus hijos.
  if v_es_representante then
    perform public.emparejar_representante(new.id);
    return new;
  end if;

  v_curso_id := nullif(new.raw_user_meta_data->>'curso_id', '')::uuid;
  v_grupo_id := nullif(new.raw_user_meta_data->>'grupo_id', '')::uuid;

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

  -- Por si su representante ya tenía cuenta.
  perform public.emparejar_estudiante(new.id);

  return new;
end;
$$;


-- ---------------------------------------------------------------------------
-- 5. El panel, en una sola llamada
-- ---------------------------------------------------------------------------
-- Devuelve todo lo que el representante puede ver, ya armado. No acepta
-- parámetros a propósito: no hay nada que manipular para asomarse a los
-- datos de otro alumno.

create or replace function public.panel_representante()
returns jsonb language plpgsql stable security definer set search_path = public as $$
declare
  v_yo uuid := auth.uid();
  v_resultado jsonb;
begin
  if v_yo is null then
    return jsonb_build_object('error', 'sin sesión');
  end if;

  select jsonb_build_object(
    'representante', (
      select jsonb_build_object('nombre', p.nombre_completo, 'rol', p.role)
        from public.profiles p where p.id = v_yo
    ),
    'hijos', coalesce((
      select jsonb_agg(hijo order by hijo->>'nombre')
      from (
        select jsonb_build_object(
          'nombre',     e.nombre_completo,
          'parentesco', t.parentesco,

          'curso', (
            select jsonb_build_object(
              'nombre',   c.nombre,
              'grupo',    g.codigo,
              'horario',  g.horario,
              'modalidad',g.modalidad,
              'inicio',   g.fecha_inicio,
              'fin',      g.fecha_fin,
              'estado_inscripcion', i.estado
            )
            from public.inscripciones i
            join public.cursos c on c.id = i.curso_id
            left join public.grupos g on g.id = i.grupo_id
            where i.estudiante_id = e.id
            order by i.created_at desc limit 1
          ),

          'asistencia', (
            select jsonb_build_object(
              'presentes', count(*) filter (where a.presente),
              'faltas',    count(*) filter (where not a.presente),
              'total',     count(*),
              'detalle',   coalesce(jsonb_agg(jsonb_build_object(
                              'fecha', s.fecha, 'tema', s.tema, 'presente', a.presente,
                              'observacion', a.observacion)
                            order by s.fecha desc) filter (where s.fecha is not null), '[]'::jsonb)
            )
            from public.asistencia a
            join public.sesiones s on s.id = a.sesion_id
            where a.estudiante_id = e.id
          ),

          'notas', coalesce((
            select jsonb_agg(jsonb_build_object(
                     'evaluacion', ev.nombre,
                     'fecha',      ev.fecha,
                     'nota',       n.calificacion,
                     'comentario', n.comentario)
                   order by ev.fecha desc nulls last)
              from public.notas n
              join public.evaluaciones ev on ev.id = n.evaluacion_id
             where n.estudiante_id = e.id
          ), '[]'::jsonb),

          'pagos', (
            select jsonb_build_object(
              'pagado',     coalesce(sum(pg.monto) filter (where pg.estado = 'pagado'), 0),
              'por_cobrar', coalesce(sum(pg.monto) filter (where pg.estado in ('pendiente','procesando')), 0),
              'detalle',    coalesce(jsonb_agg(jsonb_build_object(
                              'concepto', pg.concepto, 'monto', pg.monto,
                              'moneda', pg.moneda, 'estado', pg.estado,
                              'fecha', pg.pagado_en)
                            order by pg.created_at desc) filter (where pg.id is not null), '[]'::jsonb)
            )
            from public.inscripciones i2
            left join public.pagos pg on pg.inscripcion_id = i2.id
            where i2.estudiante_id = e.id
          ),

          'proximas_clases', coalesce((
            select jsonb_agg(jsonb_build_object(
                     'fecha', s.fecha, 'tema', s.tema, 'contenido', s.contenido)
                   order by s.fecha)
              from public.sesiones s
             where s.curso_id = (select i3.curso_id from public.inscripciones i3
                                  where i3.estudiante_id = e.id
                                  order by i3.created_at desc limit 1)
               and s.fecha >= public.hoy_mexico()
             limit 3
          ), '[]'::jsonb)
        ) as hijo
        from public.tutorias t
        join public.profiles e on e.id = t.estudiante_id
        where t.representante_id = v_yo
      ) sub
    ), '[]'::jsonb)
  ) into v_resultado;

  return v_resultado;
end $$;

grant execute on function public.panel_representante() to authenticated;


-- ---------------------------------------------------------------------------
-- 6. Emparejar lo que ya existe
-- ---------------------------------------------------------------------------
-- Para las cuentas creadas antes de todo esto.

do $$
declare r record;
begin
  for r in select id from public.profiles where role = 'representante' loop
    perform public.emparejar_representante(r.id);
  end loop;
end $$;


-- ---------------------------------------------------------------------------
-- 7. Comprobación
-- ---------------------------------------------------------------------------

select
  u.email                     as correo_del_representante,
  p.representante_nombre      as nombre_declarado,
  p.nombre_completo           as estudiante,
  p.representante_parentesco  as parentesco,
  case when exists (
        select 1 from public.tutorias t
        join public.profiles r on r.id = t.representante_id
        join auth.users ru on ru.id = r.id
        where t.estudiante_id = p.id and lower(ru.email) = lower(p.representante_email))
       then 'enlazado'
       else 'falta que el representante cree su cuenta' end as estado
from public.profiles p
left join auth.users u on lower(u.email) = lower(p.representante_email)
where p.role = 'estudiante'
  and p.representante_email is not null
order by p.nombre_completo;
