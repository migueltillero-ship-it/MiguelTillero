-- Pruebas de seguridad: cosas que un estudiante NO debe poder hacer.
-- Cada bloque debe fallar o devolver 0 filas.

\echo ''
\echo '########## PRUEBAS DE SEGURIDAD ##########'
set role authenticated;
select set_config('request.jwt.claim.sub', '11111111-1111-1111-1111-111111111111', false);

\echo ''
\echo '--- S1. Estudiante intenta CREAR UN CURSO (debe dar error de política) ---'
insert into public.cursos (docente_id, nombre, estado)
values (auth.uid(), 'Curso pirata', 'abierto');

\echo ''
\echo '--- S2. Estudiante intenta AUTOPROMOVERSE a docente (debe dar error) ---'
update public.profiles set role = 'docente' where id = auth.uid();

\echo ''
\echo '--- S3. Estudiante intenta cambiar SU PROPIA NOTA (debe ser 0 filas) ---'
update public.notas set calificacion = 20 where estudiante_id = auth.uid() returning calificacion;

\echo ''
\echo '--- S4. Estudiante intenta APROBAR su propia inscripción (debe ser 0 filas) ---'
update public.inscripciones set estado = 'activa' where estudiante_id = auth.uid() returning estado;

\echo ''
\echo '--- S5. Estudiante intenta ver PERFILES AJENOS (debe ser 0) ---'
select count(*) as perfiles_ajenos from public.profiles where id <> auth.uid();

\echo ''
\echo '--- S6. Estudiante intenta ver ASISTENCIA AJENA (debe ser 0) ---'
select count(*) as asistencia_ajena from public.asistencia where estudiante_id <> auth.uid();

\echo ''
\echo '--- S7. Estudiante intenta ver NOTAS AJENAS (debe ser 0) ---'
select count(*) as notas_ajenas from public.notas where estudiante_id <> auth.uid();

\echo ''
\echo '--- S8. Estudiante intenta CREAR UNA SESIÓN en el curso (debe dar error) ---'
insert into public.sesiones (curso_id, fecha, tema)
values ('22222222-2222-2222-2222-222222222222', '2026-11-01', 'Sesión falsa');

\echo ''
\echo '--- S9. Estudiante intenta MARCARSE PRESENTE (debe dar error) ---'
insert into public.asistencia (sesion_id, estudiante_id, presente)
values ('44444444-4444-4444-4444-444444444444', auth.uid(), true)
on conflict (sesion_id, estudiante_id) do update set presente = true;

\echo ''
\echo '--- S10. Estudiante intenta inscribir a OTRA PERSONA (debe dar error) ---'
insert into public.inscripciones (curso_id, estudiante_id)
values ('22222222-2222-2222-2222-222222222222', '57cedee4-d045-4ce5-81a6-8641c82d6216');

reset role;

\echo ''
\echo '--- S11. El DOCENTE sí puede crear cursos (debe funcionar) ---'
set role authenticated;
select set_config('request.jwt.claim.sub', '57cedee4-d045-4ce5-81a6-8641c82d6216', false);
insert into public.cursos (docente_id, nombre, estado)
values (auth.uid(), 'Curso legítimo del docente', 'abierto')
returning nombre;
reset role;
