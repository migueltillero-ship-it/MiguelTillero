-- ===========================================================================
-- ¿QUIÉN PUEDE VER Y CREAR GRABACIONES DE CLASE?
-- ===========================================================================
-- Requiere la base de prueba (00, schema_v2 y 01) con grabaciones-de-clase.sql aplicado.
-- Esperado: 1 funciona · 2 da 1 · 3 da 0 · 4 da 0 · 5 falla por RLS ·
--   6 da 0 filas · 7 falla con «check constraint» · 8 permission denied.
-- Si el 3 o el 4 dieran 1, alguien vería clases que no le tocan.
-- ===========================================================================
\set ON_ERROR_STOP off
\echo '── 0. Prepara: otra estudiante sin inscripción ──'
insert into auth.users (id, email) values ('44444444-4444-4444-4444-444444444444','otra@prueba.test') on conflict do nothing;
insert into public.profiles (id, nombre_completo, role) values ('44444444-4444-4444-4444-444444444444','Otra Estudiante','estudiante') on conflict do nothing;
\echo '── 1. El docente deja una grabación → DEBE funcionar ──'
select id as docente_id from public.profiles where role='docente' limit 1 \gset
select set_config('request.jwt.claim.sub', :'docente_id', false) \gset
set role authenticated;
insert into public.clases_grabadas (curso_id, titulo, enlace, codigo)
  values ('22222222-2222-2222-2222-222222222222','Clase del 3 de noviembre','https://zoom.example/rec/abc','clave-1') returning titulo;
reset role;
\echo '── 2. La estudiante inscrita la ve → DEBE dar 1 ──'
select set_config('request.jwt.claim.sub','11111111-1111-1111-1111-111111111111',false) \gset
set role authenticated;
select count(*) as ve_la_inscrita from public.clases_grabadas;
reset role;
\echo '── 3. Otra sin inscripción NO la ve → DEBE dar 0 ──'
select set_config('request.jwt.claim.sub','44444444-4444-4444-4444-444444444444',false) \gset
set role authenticated;
select count(*) as ve_la_ajena from public.clases_grabadas;
\echo '── 4. Con inscripción PENDIENTE tampoco → DEBE dar 0 ──'
reset role;
insert into public.inscripciones (estudiante_id, curso_id, estado) values ('44444444-4444-4444-4444-444444444444','22222222-2222-2222-2222-222222222222','pendiente') on conflict do nothing;
set role authenticated;
select count(*) as ve_la_pendiente from public.clases_grabadas;
\echo '── 5. Una estudiante intenta crear una → DEBE FALLAR ──'
insert into public.clases_grabadas (curso_id, titulo, enlace) values ('22222222-2222-2222-2222-222222222222','Mía','https://x.example/a');
\echo '── 6. Intenta cambiar la existente → 0 filas ──'
update public.clases_grabadas set enlace='https://malo.example/x' returning id;
reset role;
\echo '── 7. Un enlace que no es https → DEBE FALLAR ──'
select set_config('request.jwt.claim.sub', :'docente_id', false) \gset
set role authenticated;
insert into public.clases_grabadas (curso_id, titulo, enlace) values ('22222222-2222-2222-2222-222222222222','Mala','javascript:alert(1)');
reset role;
\echo '── 8. Un visitante sin cuenta → permission denied ──'
set role anon;
select count(*) from public.clases_grabadas;
reset role;
