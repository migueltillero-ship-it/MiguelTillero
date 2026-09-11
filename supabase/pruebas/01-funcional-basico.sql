-- Prueba: simula exactamente lo que hace la web al iniciar sesión el docente.
-- Crea un docente, un estudiante, un curso y una inscripción, y luego lee
-- profiles como lo haría el navegador de Miguel.

-- Datos de prueba (como superusuario, saltándose RLS)
insert into auth.users (id, email) values
  ('57cedee4-d045-4ce5-81a6-8641c82d6216', 'migueltillero@gmail.com'),
  ('11111111-1111-1111-1111-111111111111', 'estudiante@ejemplo.com')
on conflict do nothing;

insert into public.profiles (id, role, nombre_completo) values
  ('57cedee4-d045-4ce5-81a6-8641c82d6216', 'docente', 'Miguel Tillero'),
  ('11111111-1111-1111-1111-111111111111', 'estudiante', 'Estudiante Prueba')
on conflict (id) do update set role = excluded.role;

insert into public.cursos (id, docente_id, nombre, nivel, estado)
values ('22222222-2222-2222-2222-222222222222', '57cedee4-d045-4ce5-81a6-8641c82d6216', 'Francés B2', 'B2', 'abierto')
on conflict do nothing;

insert into public.inscripciones (curso_id, estudiante_id, estado)
values ('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'activa')
on conflict do nothing;

\echo '=============================================='
\echo 'PRUEBA 1: el DOCENTE lee su propio perfil'
\echo '(esto es exactamente lo que falla en la web)'
\echo '=============================================='
set role authenticated;
select set_config('request.jwt.claim.sub', '57cedee4-d045-4ce5-81a6-8641c82d6216', false);
select id, role, nombre_completo from public.profiles where id = auth.uid();

\echo '=============================================='
\echo 'PRUEBA 2: el DOCENTE lista sus cursos'
\echo '=============================================='
select id, nombre, estado from public.cursos where docente_id = auth.uid();

\echo '=============================================='
\echo 'PRUEBA 3: el DOCENTE lista inscripciones de su curso'
\echo '=============================================='
select id, estado from public.inscripciones where curso_id = '22222222-2222-2222-2222-222222222222';

\echo '=============================================='
\echo 'PRUEBA 4: el DOCENTE ve el perfil de su estudiante inscrito'
\echo '=============================================='
select id, nombre_completo from public.profiles where id = '11111111-1111-1111-1111-111111111111';

reset role;

\echo '=============================================='
\echo 'PRUEBA 5: el ESTUDIANTE lee su propio perfil'
\echo '=============================================='
set role authenticated;
select set_config('request.jwt.claim.sub', '11111111-1111-1111-1111-111111111111', false);
select id, role, nombre_completo from public.profiles where id = auth.uid();

\echo '=============================================='
\echo 'PRUEBA 6: el ESTUDIANTE ve el curso donde está inscrito'
\echo '=============================================='
select id, nombre from public.cursos;

\echo '=============================================='
\echo 'PRUEBA 7: el ESTUDIANTE NO debe ver perfiles ajenos'
\echo '(debe devolver 0 filas, no error)'
\echo '=============================================='
select count(*) as perfiles_ajenos_visibles from public.profiles
where id = '57cedee4-d045-4ce5-81a6-8641c82d6216';

reset role;
