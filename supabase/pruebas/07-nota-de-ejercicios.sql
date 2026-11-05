-- ===========================================================================
-- ¿QUIÉN PUEDE RECALCULAR LAS NOTAS DE LOS EJERCICIOS?
-- ===========================================================================
-- Esta prueba existe por un fallo concreto que estuvo a punto de salir:
-- dentro de una función «security definer», current_user NO es quien llama,
-- es la dueña de la función. Una guarda escrita sobre current_user deja
-- entrar a todo el mundo, y encima PostgreSQL concede EXECUTE a PUBLIC en
-- cuanto se crea la función, así que conceder «to authenticated» no cierra
-- nada por sí solo.
--
-- Los cuatro casos tienen que salir así:
--   1. Editor SQL (postgres, sin sesión) ....... FUNCIONA
--   2. Docente con sesión iniciada ............. FUNCIONA
--   3. Estudiante con sesión iniciada .......... ERROR «Solo el docente…»
--   4. Visitante sin cuenta .................... ERROR «permission denied»
--
-- Requiere la base de prueba con el esquema y nota-de-ejercicios.sql puestos.
--   psql -d plataforma_test -f 07-nota-de-ejercicios.sql
-- ===========================================================================

\echo '── 1. Como el Editor SQL (postgres, sin sesión) → DEBE funcionar ──'
select count(*) as filas_devueltas from public.recalcular_nota_ejercicios('A1-OCT2026');

\echo '── 2. Como docente con sesión iniciada → debe funcionar ──'
select set_config('request.jwt.claim.sub','11111111-1111-1111-1111-111111111111',false);
set role authenticated;
select count(*) as filas_devueltas from public.recalcular_nota_ejercicios('A1-OCT2026');
reset role;

\echo '── 3. Como estudiante con sesión iniciada → debe fallar ──'
select set_config('request.jwt.claim.sub','22222222-2222-2222-2222-222222222222',false);
set role authenticated;
select * from public.recalcular_nota_ejercicios('A1-OCT2026');
reset role;

\echo '── 4. Como visitante sin cuenta → debe fallar ──'
select set_config('request.jwt.claim.sub','',false);
set role anon;
select * from public.recalcular_nota_ejercicios('A1-OCT2026');
reset role;
