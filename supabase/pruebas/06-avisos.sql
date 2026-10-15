-- Pruebas de los AVISOS del perfil.
--
-- Lo que hay que comprobar, y por qué cada cosa importa:
--   A1. El docente puede crear un aviso con crear_aviso().
--   A2. El estudiante ve el suyo.
--   A3. Un aviso con fecha futura NO se ve antes de tiempo (es el caso de
--       uso que motivó la función: avisar hoy de un precio de dentro de dos
--       meses sin alarmar a nadie todavía).
--   A4. Un aviso caducado deja de verse.
--   A5. El estudiante NO ve los avisos de otro estudiante.
--   A6. El representante ve los de su hijo, y solo los de su hijo.
--   A7. panel_representante() devuelve el apartado de avisos.
--   A8. Repetir el mismo título no duplica el aviso: lo reemplaza.
--
-- Se ejecuta después de 00..05 y de avisos.sql.
--   psql -d plataforma_test -f 06-avisos.sql

\echo ''
\echo '########## PRUEBAS DE AVISOS ##########'

-- ---------------------------------------------------------------------------
-- Preparación: dos familias sin relación entre sí.
-- ---------------------------------------------------------------------------
reset role;

insert into auth.users (id, email) values
  ('aa000000-0000-0000-0000-000000000001', 'docente.prueba@ejemplo.test'),
  ('aa000000-0000-0000-0000-000000000002', 'alumnoa@ejemplo.test'),
  ('aa000000-0000-0000-0000-000000000003', 'alumnob@ejemplo.test'),
  ('aa000000-0000-0000-0000-000000000004', 'familiaa@ejemplo.test'),
  ('aa000000-0000-0000-0000-000000000005', 'familiab@ejemplo.test')
on conflict (id) do nothing;

insert into public.profiles (id, nombre_completo, role) values
  ('aa000000-0000-0000-0000-000000000001', 'Docente De Prueba',   'docente'),
  ('aa000000-0000-0000-0000-000000000002', 'Alumno A Apellido',   'estudiante'),
  ('aa000000-0000-0000-0000-000000000003', 'Alumno B Apellido',   'estudiante'),
  ('aa000000-0000-0000-0000-000000000004', 'Familia A Apellido',  'representante'),
  ('aa000000-0000-0000-0000-000000000005', 'Familia B Apellido',  'representante')
on conflict (id) do update set role = excluded.role,
                               nombre_completo = excluded.nombre_completo;

insert into public.tutorias (representante_id, estudiante_id, parentesco) values
  ('aa000000-0000-0000-0000-000000000004', 'aa000000-0000-0000-0000-000000000002', 'madre'),
  ('aa000000-0000-0000-0000-000000000005', 'aa000000-0000-0000-0000-000000000003', 'padre')
on conflict do nothing;

delete from public.avisos where estudiante_id in (
  'aa000000-0000-0000-0000-000000000002', 'aa000000-0000-0000-0000-000000000003');


-- ---------------------------------------------------------------------------
\echo ''
\echo '--- A1. El docente crea tres avisos (debe decir «Aviso guardado») ---'
set role authenticated;
select set_config('request.jwt.claim.sub', 'aa000000-0000-0000-0000-000000000001', false);

select public.crear_aviso('Alumno A', 'Vigente ahora',
       'Este se ve desde ya.', 'info') as a1_vigente;

select public.crear_aviso('Alumno A', 'Todavia no',
       'Este no debe verse hasta dentro de un mes.', 'importante',
       (public.hoy_mexico() + 30)) as a1_futuro;

select public.crear_aviso('Alumno A', 'Ya caducado',
       'Este caducó ayer.', 'aviso',
       (public.hoy_mexico() - 10), (public.hoy_mexico() - 1)) as a1_caducado;

select public.crear_aviso('Alumno B', 'De la otra familia',
       'Este es del otro estudiante.', 'info') as a1_otro;

\echo ''
\echo '--- A1b. Nombre que no existe y nombre ambiguo (debe explicarlo, no fallar) ---'
select public.crear_aviso('Nadie Que Exista', 'X', 'Y') as a1b_inexistente;
select public.crear_aviso('Alumno', 'X', 'Y')           as a1b_ambiguo;


-- ---------------------------------------------------------------------------
\echo ''
\echo '--- A2/A3/A4. El estudiante A ve 1 aviso: solo «Vigente ahora» ---'
select set_config('request.jwt.claim.sub', 'aa000000-0000-0000-0000-000000000002', false);
select count(*) as debe_ser_1, string_agg(titulo, ', ') as titulos from public.avisos;

\echo ''
\echo '--- A5. El estudiante A NO ve avisos de la otra familia (debe ser 0) ---'
select count(*) as debe_ser_0 from public.avisos
 where estudiante_id = 'aa000000-0000-0000-0000-000000000003';


-- ---------------------------------------------------------------------------
\echo ''
\echo '--- A6. La familia A ve 1 aviso (el vigente de su hijo) ---'
select set_config('request.jwt.claim.sub', 'aa000000-0000-0000-0000-000000000004', false);
select count(*) as debe_ser_1, string_agg(titulo, ', ') as titulos from public.avisos;

\echo ''
\echo '--- A6b. La familia A NO ve nada del hijo de la familia B (debe ser 0) ---'
select count(*) as debe_ser_0 from public.avisos
 where estudiante_id = 'aa000000-0000-0000-0000-000000000003';

\echo ''
\echo '--- A7. panel_representante() trae los avisos del hijo ---'
select jsonb_pretty(
         jsonb_build_object(
           'hijo',   hijo->>'nombre',
           'avisos', hijo->'avisos')) as a7_panel
  from jsonb_array_elements((select public.panel_representante()->'hijos')) as hijo;


-- ---------------------------------------------------------------------------
\echo ''
\echo '--- A8. Repetir el mismo título no duplica (debe seguir habiendo 1) ---'
select set_config('request.jwt.claim.sub', 'aa000000-0000-0000-0000-000000000001', false);
select public.crear_aviso('Alumno A', 'Vigente ahora',
       'Texto corregido: el mensaje se reemplaza.', 'aviso') as a8_repetido;

select count(*) as debe_ser_1, max(tipo) as tipo_nuevo, max(mensaje) as mensaje_nuevo
  from public.avisos
 where estudiante_id = 'aa000000-0000-0000-0000-000000000002'
   and titulo = 'Vigente ahora';

\echo ''
\echo '--- A9. El estudiante NO puede crearse un aviso a sí mismo (debe dar error) ---'
select set_config('request.jwt.claim.sub', 'aa000000-0000-0000-0000-000000000002', false);
insert into public.avisos (estudiante_id, titulo, mensaje)
values (auth.uid(), 'Aviso pirata', 'Me lo escribo yo.');

\echo ''
\echo '--- A10. El estudiante NO puede borrar un aviso suyo (debe ser 0 filas) ---'
delete from public.avisos where estudiante_id = auth.uid() returning titulo;

reset role;

\echo ''
\echo '--- A11. El docente ve los cuatro avisos, vigentes o no (debe ser 4) ---'
set role authenticated;
select set_config('request.jwt.claim.sub', 'aa000000-0000-0000-0000-000000000001', false);
select count(*) as debe_ser_4 from public.avisos
 where estudiante_id in ('aa000000-0000-0000-0000-000000000002',
                         'aa000000-0000-0000-0000-000000000003');
reset role;

\echo ''
\echo '--- Resumen final: 4 avisos guardados, 2 visibles hoy ---'
-- Sin rol, como el SQL Editor de Supabase: la consulta de comprobación de
-- avisos.sql cruza con profiles, y un docente que no tenga a esos estudiantes
-- en ninguno de sus grupos no ve sus perfiles (es lo correcto). Aquí los dos
-- estudiantes de prueba no están en ningún grupo, así que el cruce se hace
-- sin rol para poder leer el resultado completo.
select p.nombre_completo as estudiante, a.tipo, a.titulo,
       case when public.aviso_vigente(a.desde, a.hasta) then 'visible' else 'oculto' end as hoy
  from public.avisos a
  join public.profiles p on p.id = a.estudiante_id
 where a.estudiante_id in ('aa000000-0000-0000-0000-000000000002',
                           'aa000000-0000-0000-0000-000000000003')
 order by p.nombre_completo, a.titulo;
reset role;
