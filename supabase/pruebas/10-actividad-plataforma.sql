-- ===========================================================================
-- ¿QUIÉN PUEDE SUMAR Y VER MINUTOS DE USO?
-- ===========================================================================
-- Requiere la base de prueba (00, schema_v2, 01) con boletines.sql y
-- actividad-plataforma.sql aplicados. Esperado:
--   1 da 1 minuto · 2 sigue en 1 (aviso demasiado pronto) · 3 da 0 filas ·
--   4 y 5 fallan (escribir a mano) · 6 el docente no suma · 7 falla SIN_PERMISO ·
--   8 el docente ve el resumen · 9 un visitante no ve la tabla.
-- Si el 2 diera 2, bastaría dejar la pestaña abierta para inflar las horas.
-- Si el 4 o el 5 funcionaran, un estudiante se pondría las horas a mano.
-- ===========================================================================
\set ON_ERROR_STOP off
insert into auth.users (id, email) values ('44444444-4444-4444-4444-444444444444','otra@prueba.test') on conflict do nothing;
insert into public.profiles (id, nombre_completo, role) values ('44444444-4444-4444-4444-444444444444','Otra Estudiante','estudiante') on conflict do nothing;
select set_config('request.jwt.claim.sub','11111111-1111-1111-1111-111111111111',false) \gset
\echo '── 1. La estudiante suma un minuto → DEBE dar 1 ──'
set role authenticated;
select public.registrar_actividad();
select minutos as minutos_tras_1_aviso from public.actividad_plataforma;
\echo '── 2. Otro aviso a los pocos segundos NO suma → debe seguir en 1 ──'
select public.registrar_actividad();
select minutos as minutos_tras_2_avisos from public.actividad_plataforma;
reset role;
\echo '── 3. Otra estudiante NO ve los minutos de la primera → DEBE dar 0 ──'
select set_config('request.jwt.claim.sub','44444444-4444-4444-4444-444444444444',false) \gset
set role authenticated;
select count(*) as ve_la_ajena from public.actividad_plataforma;
\echo '── 4. Intenta escribir minutos a mano → DEBE FALLAR ──'
insert into public.actividad_plataforma (estudiante_id, dia, minutos) values ('44444444-4444-4444-4444-444444444444', current_date, 500);
\echo '── 5. Intenta cambiar los de la otra → DEBE FALLAR ──'
update public.actividad_plataforma set minutos = 0;
reset role;
\echo '── 6. El docente llama a registrar_actividad → no debe sumarle a nadie ──'
select id as docente_id from public.profiles where role='docente' limit 1 \gset
select set_config('request.jwt.claim.sub', :'docente_id', false) \gset
set role authenticated;
select public.registrar_actividad();
select count(*) as filas_del_docente from public.actividad_plataforma where estudiante_id = :'docente_id';
reset role;
\echo '── 7. La estudiante 4444 pide el resumen de la 1111 → DEBE FALLAR (SIN_PERMISO) ──'
select set_config('request.jwt.claim.sub','44444444-4444-4444-4444-444444444444',false) \gset
set role authenticated;
select public.resumen_actividad('11111111-1111-1111-1111-111111111111');
reset role;
\echo '── 8. El docente sí ve el resumen ──'
select set_config('request.jwt.claim.sub', :'docente_id', false) \gset
set role authenticated;
select public.resumen_actividad('11111111-1111-1111-1111-111111111111');
reset role;
\echo '── 9. Un visitante sin cuenta → permission denied ──'
set role anon;
select count(*) from public.actividad_plataforma;
reset role;
