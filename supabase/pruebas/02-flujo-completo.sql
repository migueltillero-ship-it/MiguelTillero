-- Prueba del flujo completo: todo lo que harán los paneles docente y estudiante.
\set ON_ERROR_STOP off

\echo ''
\echo '########## FLUJO DEL PANEL DOCENTE ##########'
set role authenticated;
select set_config('request.jwt.claim.sub', '57cedee4-d045-4ce5-81a6-8641c82d6216', false);

\echo '--- 1. Crear un curso nuevo ---'
insert into public.cursos (id, docente_id, nombre, nivel, fecha_inicio, fecha_fin, cupo_maximo, estado)
values ('33333333-3333-3333-3333-333333333333', auth.uid(), 'Francés A1 Grupo Mañana', 'A1', '2026-10-01', '2026-12-15', 12, 'abierto')
returning nombre, estado;

\echo '--- 2. Crear horario del curso ---'
insert into public.horarios (curso_id, dia_semana, hora_inicio, hora_fin)
values ('33333333-3333-3333-3333-333333333333', 1, '09:00', '11:00')
returning dia_semana, hora_inicio, hora_fin;

\echo '--- 3. Crear sesiones (planificación) ---'
insert into public.sesiones (id, curso_id, fecha, tema, contenido)
values ('44444444-4444-4444-4444-444444444444', '22222222-2222-2222-2222-222222222222', '2026-10-05', 'Les articles', 'Défini / indéfini')
returning fecha, tema;

\echo '--- 4. Aprobar la inscripción pendiente de un estudiante ---'
update public.inscripciones set estado = 'activa'
where curso_id = '22222222-2222-2222-2222-222222222222'
returning estado;

\echo '--- 5. Marcar asistencia del estudiante ---'
insert into public.asistencia (sesion_id, estudiante_id, presente, observacion)
values ('44444444-4444-4444-4444-444444444444', '11111111-1111-1111-1111-111111111111', true, 'Participó activamente')
on conflict (sesion_id, estudiante_id) do update set presente = excluded.presente
returning presente, observacion;

\echo '--- 6. Crear una evaluación ---'
insert into public.evaluaciones (id, curso_id, nombre, fecha, ponderacion)
values ('55555555-5555-5555-5555-555555555555', '22222222-2222-2222-2222-222222222222', 'Examen módulo 1', '2026-10-20', 30)
returning nombre, ponderacion;

\echo '--- 7. Poner nota al estudiante ---'
insert into public.notas (evaluacion_id, estudiante_id, calificacion, comentario)
values ('55555555-5555-5555-5555-555555555555', '11111111-1111-1111-1111-111111111111', 18.5, 'Muy buen trabajo')
on conflict (evaluacion_id, estudiante_id) do update set calificacion = excluded.calificacion
returning calificacion, comentario;

reset role;

\echo ''
\echo '########## FLUJO DEL PANEL ESTUDIANTE ##########'
set role authenticated;
select set_config('request.jwt.claim.sub', '11111111-1111-1111-1111-111111111111', false);

\echo '--- 8. El estudiante ve su inscripción y su curso ---'
select i.estado, c.nombre from public.inscripciones i join public.cursos c on c.id = i.curso_id;

\echo '--- 9. El estudiante ve la planificación del curso ---'
select fecha, tema from public.sesiones;

\echo '--- 10. El estudiante ve su asistencia ---'
select presente, observacion from public.asistencia;

\echo '--- 11. El estudiante ve sus evaluaciones y notas ---'
select e.nombre, n.calificacion, n.comentario
from public.evaluaciones e left join public.notas n on n.evaluacion_id = e.id;

\echo ''
\echo '########## PRUEBAS DE SEGURIDAD (no debe poder) ##########'
\echo '--- 12. El estudiante NO debe poder crear cursos (debe fallar) ---'
insert into public.cursos (docente_id, nombre, estado)
values (auth.uid(), 'Curso pirata', 'abierto');

\echo '--- 13. El estudiante NO debe poder cambiar su propia nota (0 filas) ---'
update public.notas set calificacion = 20 where estudiante_id = auth.uid() returning calificacion;

\echo '--- 14. El estudiante NO debe poder aprobar su propia inscripción (0 filas) ---'
update public.inscripciones set estado = 'activa' where estudiante_id = auth.uid() returning estado;

\echo '--- 15. El estudiante NO debe ver asistencia de otros (0 filas) ---'
select count(*) from public.asistencia where estudiante_id <> auth.uid();

reset role;
