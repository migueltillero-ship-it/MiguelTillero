-- ===========================================================================
-- ¿QUIÉN PUEDE PEDIR AYUDA, VERLA Y RESPONDERLA?
-- ===========================================================================
-- Requiere la base de prueba con solicitudes-ayuda.sql aplicado. Esperado:
--   1 funciona · 2 y 3 fallan por RLS · 4 da 0 · 5 da 0 filas · 6 permission
--   denied · 7 falla con «Ya tienes 5 peticiones…» · 8 y 9 funcionan.
-- Si el 2 o el 4 funcionaran, un estudiante podría suplantar o leer a otro.
-- ===========================================================================
\set ON_ERROR_STOP off
\echo '── 1. La estudiante A pide ayuda a su nombre → DEBE funcionar ──'
select set_config('request.jwt.claim.sub','22222222-2222-2222-2222-222222222222',false) \gset
set role authenticated;
insert into public.solicitudes_ayuda (estudiante_id, tema, detalle) values ('22222222-2222-2222-2222-222222222222','El participio de los verbos en -ir','No entiendo por qué dormir no va con être') returning tema;
\echo '── 2. La estudiante A pide ayuda A NOMBRE DE B → DEBE FALLAR ──'
insert into public.solicitudes_ayuda (estudiante_id, tema) values ('33333333-3333-3333-3333-333333333333','Suplantando');
\echo '── 3. Intenta darse a sí misma la respuesta → DEBE FALLAR ──'
insert into public.solicitudes_ayuda (estudiante_id, tema, respuesta, estado) values ('22222222-2222-2222-2222-222222222222','Con respuesta puesta','Ya me contesté','respondida');
\echo '── 4. La estudiante B NO ve la de A (debe dar 0) ──'
reset role;
select set_config('request.jwt.claim.sub','33333333-3333-3333-3333-333333333333',false) \gset
set role authenticated;
select count(*) as filas_que_ve_B from public.solicitudes_ayuda;
\echo '── 5. B intenta modificar la de A → 0 filas ──'
update public.solicitudes_ayuda set respuesta='hackeada' returning id;
reset role;
\echo '── 6. Un visitante sin cuenta → permission denied ──'
set role anon;
select count(*) from public.solicitudes_ayuda;
reset role;
\echo '── 7. El tope: la 6.ª abierta de A → DEBE FALLAR con mensaje claro ──'
select set_config('request.jwt.claim.sub','22222222-2222-2222-2222-222222222222',false) \gset
set role authenticated;
insert into public.solicitudes_ayuda (estudiante_id, tema) select '22222222-2222-2222-2222-222222222222', 'Duda número ' || g from generate_series(2,6) g;
select count(*) as abiertas_de_A from public.solicitudes_ayuda;
reset role;
\echo '── 8. El docente ve todas y responde → DEBE FUNCIONAR ──'
select set_config('request.jwt.claim.sub','11111111-1111-1111-1111-111111111111',false) \gset
set role authenticated;
select count(*) as filas_que_ve_el_docente from public.solicitudes_ayuda;
update public.solicitudes_ayuda set respuesta='Porque dormir no es de la casa de être.', estado='respondida', respondida_en=now()
 where tema like 'El participio%' returning estado;
reset role;
\echo '── 9. La estudiante A ve la respuesta ──'
select set_config('request.jwt.claim.sub','22222222-2222-2222-2222-222222222222',false) \gset
set role authenticated;
select estado, left(respuesta,30) as respuesta from public.solicitudes_ayuda where tema like 'El participio%';
reset role;
