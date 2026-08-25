-- ============================================================
-- PRUEBAS DEL MÓDULO DE ASISTENCIA
--
-- Comprueban las reglas de negocio y, sobre todo, que la
-- seguridad por filas realmente aísla a cada alumno. Se ejecutan
-- contra un PostgreSQL local, sin necesidad de Supabase:
--
--   createdb mt
--   psql -d mt -v ON_ERROR_STOP=1 -f pruebas.sql
--
-- El primer bloque simula el esquema auth que Supabase ya trae
-- (auth.users, auth.uid(), auth.jwt()). En Supabase real ese
-- bloque sobra: basta con ejecutar schema-supabase.sql.
-- ============================================================

\set ON_ERROR_STOP on
\pset pager off

-- ── Simulacro del esquema auth de Supabase (solo para pruebas) ──
create schema if not exists auth;
create table auth.users (id uuid primary key default gen_random_uuid(), email text);
create table _sesion (clave text primary key, valor text);
create or replace function auth.jwt() returns jsonb language sql stable as $$
  select coalesce((select jsonb_build_object('email', valor) from _sesion where clave='email'), '{}'::jsonb);
$$;
create or replace function auth.uid() returns uuid language sql stable as $$
  select (select nullif(valor,'')::uuid from _sesion where clave='uid');
$$;
create or replace function set_sesion(p_email text, p_uid uuid) returns void language sql as $$
  delete from _sesion;
  insert into _sesion values ('email', p_email), ('uid', coalesce(p_uid::text,''));
$$;

\echo '=== Cargando el esquema ==='
\i schema-supabase.sql

\echo ''
\echo '=== PRUEBAS ==='
-- Rol de prueba sin privilegios especiales: RLS sí le aplica
-- El rol es del cluster, no de la base: puede sobrevivir a ejecuciones
-- anteriores y no se puede borrar mientras tenga permisos concedidos en
-- otras bases. Se crea solo si falta; los permisos de abajo son de esta
-- base y por tanto siempre parten de cero.
do $$ begin
  if not exists (select 1 from pg_roles where rolname = 'alumno_rol') then
    create role alumno_rol nologin;
  end if;
end $$;
grant usage on schema public, auth to alumno_rol;
grant select, insert, update on all tables in schema public to alumno_rol;
grant select, insert, delete on _sesion to alumno_rol;
grant execute on all functions in schema public, auth to alumno_rol;

insert into admins(email) values ('direccionsancristobal@alianzafr.edu.mx');
select set_sesion('direccionsancristobal@alianzafr.edu.mx', null);

-- Dos alumnos con cuenta del portal
insert into auth.users(id, email) values
  ('11111111-1111-1111-1111-111111111111','ana@ejemplo.com'),
  ('22222222-2222-2222-2222-222222222222','luis@ejemplo.com');
insert into students(full_name, email, phone) values
  ('Ana Pérez','ana@ejemplo.com','+52 967 000 0001'),
  ('Luis Gómez','luis@ejemplo.com','+52 967 000 0002');

\echo '--- 1. El enlace automático de cuenta funciona'
select full_name, auth_user_id is not null as enlazada from students order by student_id;

insert into student_contracts
  (student_id, total_contracted_hours, weekly_frequency, session_duration_hours,
   start_date, projected_end_date, original_end_date)
values (1, 20, 2, 1.0, date '2026-09-01', date '2026-11-10', date '2026-11-10');

insert into class_sessions(contract_id, session_date, duration_hours) values
  (1, timestamptz '2026-09-01 18:00', 1.0),
  (1, timestamptz '2026-09-03 18:00', 1.0),
  (1, timestamptz '2026-09-08 18:00', 1.0);

\echo '--- 2. Asistir descuenta horas'
select registrar_asistencia(1, 'present') -> 'remaining_hours' as saldo_tras_asistir;

\echo '--- 3. Falta sin avisar también descuenta'
select registrar_asistencia(2, 'unjustified_absence') -> 'remaining_hours' as saldo_tras_falta;

\echo '--- 4. Corregir de present a justificada devuelve las horas'
update class_sessions set attendance_status='justified_absence' where session_id=1;
select remaining_hours as saldo_tras_correccion from student_contracts where contract_id=1;

\echo '--- 5. Con una ausencia sin resolver, no se pueden programar clases'
do $$ begin
  insert into class_sessions(contract_id, session_date) values (1, timestamptz '2026-09-15 18:00');
  raise exception 'FALLO: debería haber bloqueado';
exception when check_violation then raise notice 'OK: bloqueado como se esperaba';
end $$;

\echo '--- 6. Flujo A rechaza una reposición de otra semana'
do $$ begin
  perform resolver_ausencia_flujo_a(1, timestamptz '2026-09-20 18:00');
  raise exception 'FALLO: debería haber rechazado';
exception when check_violation then raise notice 'OK: rechazada por caer fuera de la semana';
end $$;

\echo '--- 7. Flujo A acepta la misma semana y no mueve la fecha de fin'
select resolver_ausencia_flujo_a(1, timestamptz '2026-09-05 10:00') as flujo_a;
select projected_end_date as fecha_fin_tras_flujo_a from student_contracts where contract_id=1;

\echo '--- 8. No se puede resolver dos veces la misma ausencia'
do $$ begin
  perform resolver_ausencia_flujo_b(1);
  raise exception 'FALLO: debería haber rechazado';
exception when others then raise notice 'OK: %', sqlerrm;
end $$;

\echo '--- 9. La reposición, al impartirse, sí descuenta'
update class_sessions set attendance_status='present'
 where makeup_of_session_id = 1;
select remaining_hours as saldo_tras_reposicion from student_contracts where contract_id=1;

\echo '--- 10. Flujo B recalcula y audita la fecha de fin'
select registrar_asistencia(3, 'justified_absence') -> 'requires_resolution' as pide_selector;
select resolver_ausencia_flujo_b(3) as flujo_b;
select previous_end_date, new_end_date, flow_type
  from absence_resolutions where session_id = 3;

\echo '--- 11. original_end_date nunca cambia'
select original_end_date, projected_end_date,
       (original_end_date = date '2026-11-10') as original_intacta
  from student_contracts where contract_id=1;

\echo '--- 12. Las notificaciones quedan encoladas para las dos partes'
select template_code, recipient_type, sent_at is null as pendiente
  from notification_log order by notification_id;

\echo '--- 13. RLS: Ana solo ve su contrato'
set role alumno_rol;
select set_sesion('ana@ejemplo.com', '11111111-1111-1111-1111-111111111111');
select count(*) as contratos_visibles_ana from student_contracts;
select count(*) as sesiones_visibles_ana from class_sessions;

\echo '--- 14. RLS: Luis no ve nada de Ana'
select set_sesion('luis@ejemplo.com', '22222222-2222-2222-2222-222222222222');
select count(*) as contratos_visibles_luis from student_contracts;
select count(*) as estudiantes_visibles_luis from students;

\echo '--- 15. RLS: un alumno no puede registrar asistencia'
do $$ begin
  perform registrar_asistencia(2, 'present');
  raise exception 'FALLO: debería haber rechazado';
exception when insufficient_privilege then raise notice 'OK: rechazado por falta de permisos';
end $$;

\echo '--- 16. RLS: un alumno no puede cambiarse el nombre ni el correo'
select set_sesion('ana@ejemplo.com', '11111111-1111-1111-1111-111111111111');
do $$ begin
  update students set full_name = 'Ana la Jefa' where email='ana@ejemplo.com';
  raise exception 'FALLO: debería haber rechazado';
exception when insufficient_privilege then raise notice 'OK: nombre protegido';
end $$;
update students set phone = '+52 967 999 9999' where email='ana@ejemplo.com';
select phone as telefono_si_editable from students where email='ana@ejemplo.com';

\echo '--- 17. RLS: el profesor sí lo ve todo'
reset role;
select set_sesion('direccionsancristobal@alianzafr.edu.mx', null);
select count(*) as estudiantes_visibles_admin from students;
