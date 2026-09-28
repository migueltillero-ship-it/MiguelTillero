-- ============================================================================
-- ESTUDIANTES SIN GRUPO
--
-- Cualquiera puede registrarse desde el enlace de inscripción aunque el grupo
-- todavía no exista: se crea su cuenta y su perfil, sin inscripción. Este
-- archivo le da al ADMINISTRADOR lo que necesita para verlos y asignarlos:
--
--   1) ver todos los perfiles y administrar todas las inscripciones
--   2) admin_estudiantes(): la lista con correo, teléfono y grupos
--   3) asignar_estudiante_a_grupo(): crea o mueve la inscripción
--
-- CÓMO USAR: pégalo completo en Supabase → SQL Editor y pulsa Run.
-- Es seguro repetirlo. Necesita que ya hayas corrido schema_v2.sql (es_admin).
-- ============================================================================

-- 1. El administrador ve a todos y administra todas las inscripciones
drop policy if exists "profiles: admin ve todos" on public.profiles;
create policy "profiles: admin ve todos"
  on public.profiles for select
  using (public.es_admin());

drop policy if exists "inscripciones: admin administra todas" on public.inscripciones;
create policy "inscripciones: admin administra todas"
  on public.inscripciones for all
  using (public.es_admin())
  with check (public.es_admin());

-- 2. Lista de estudiantes con su correo (que vive en auth.users)
create or replace function public.admin_estudiantes()
returns table (
  id uuid, nombre_completo text, email text, telefono text,
  representante_nombre text, created_at timestamptz,
  total_inscripciones integer, grupos text
)
language sql stable security definer set search_path = public, auth as $$
  select p.id, p.nombre_completo, u.email::text, p.telefono,
         p.representante_nombre, p.created_at,
         (select count(*)::integer from public.inscripciones i where i.estudiante_id = p.id),
         (select string_agg(coalesce(g.codigo, 'sin grupo') || ' (' || i.estado || ')', ', ')
            from public.inscripciones i left join public.grupos g on g.id = i.grupo_id
           where i.estudiante_id = p.id)
    from public.profiles p
    join auth.users u on u.id = p.id
   where p.role = 'estudiante' and public.es_admin()
   order by p.created_at desc;
$$;
grant execute on function public.admin_estudiantes() to authenticated;

-- 3. Asignar (o mover) a un estudiante a un grupo
create or replace function public.asignar_estudiante_a_grupo(
  p_estudiante uuid, p_grupo uuid, p_estado text default 'pendiente'
) returns void
language plpgsql security definer set search_path = public as $$
declare v_curso uuid;
begin
  if not public.es_admin() then
    raise exception 'Solo el administrador puede asignar estudiantes a un grupo.';
  end if;
  if p_estado not in ('pendiente', 'activa') then
    raise exception 'Estado no válido: %', p_estado;
  end if;
  select curso_id into v_curso from public.grupos where id = p_grupo;
  if v_curso is null then
    raise exception 'El grupo no existe.';
  end if;
  insert into public.inscripciones (curso_id, grupo_id, estudiante_id, estado)
  values (v_curso, p_grupo, p_estudiante, p_estado)
  on conflict (curso_id, estudiante_id)
  do update set grupo_id = excluded.grupo_id, estado = excluded.estado;
end;
$$;
grant execute on function public.asignar_estudiante_a_grupo(uuid, uuid, text) to authenticated;

-- COMPROBACIÓN (desde el editor no hay sesión de usuario, así que admin_estudiantes()
-- devolvería vacío aquí; la lista real se ve en admin.html → pestaña Estudiantes)
select
  (select count(*) from public.profiles where role = 'estudiante') as estudiantes_registrados,
  (select count(*) from public.profiles p where p.role = 'estudiante'
     and not exists (select 1 from public.inscripciones i where i.estudiante_id = p.id)) as sin_grupo,
  (select count(*) from pg_policies where policyname in ('profiles: admin ve todos','inscripciones: admin administra todas')) as politicas_creadas;
