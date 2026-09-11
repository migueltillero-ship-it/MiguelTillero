\echo '--- F1. Desde SQL Editor (sin usuario autenticado) SÍ se puede promover a docente ---'
update public.profiles set role = 'docente' where id = '11111111-1111-1111-1111-111111111111' returning id, role;
-- lo devolvemos a estudiante para no alterar la prueba
update public.profiles set role = 'estudiante' where id = '11111111-1111-1111-1111-111111111111';

\echo ''
\echo '--- F2. El estudiante SÍ puede editar su nombre y teléfono (sin tocar rol) ---'
set role authenticated;
select set_config('request.jwt.claim.sub', '11111111-1111-1111-1111-111111111111', false);
update public.profiles set nombre_completo = 'Ana García', telefono = '+52 555 123 4567'
where id = auth.uid() returning nombre_completo, telefono, role;
reset role;

\echo ''
\echo '--- F3. Un visitante SIN cuenta ve los cursos abiertos (para el formulario de inscripción) ---'
set role anon;
select set_config('request.jwt.claim.sub', '', false);
select count(*) as cursos_abiertos_visibles from public.cursos;
reset role;

\echo ''
\echo '--- F4. Un visitante SIN cuenta NO ve perfiles ni notas (debe ser 0) ---'
set role anon;
select (select count(*) from public.profiles) as perfiles,
       (select count(*) from public.notas) as notas,
       (select count(*) from public.inscripciones) as inscripciones;
reset role;
