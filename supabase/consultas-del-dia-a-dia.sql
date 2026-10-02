-- ===========================================================================
-- CONSULTAS DEL DÍA A DÍA
-- ===========================================================================
-- Lo que hace falta una y otra vez durante un ciclo. Cada bloque va por su
-- cuenta: selecciona el que necesites y pulsa Run. No hace falta ejecutar
-- el archivo entero —de hecho, mejor no—.
--
-- Dónde: Supabase → SQL Editor → New query.
-- ===========================================================================


-- ---------------------------------------------------------------------------
-- 1 · ¿Cómo está todo?  (el primero que miras siempre)
-- ---------------------------------------------------------------------------

select
  p.nombre_completo                                  as alumno,
  u.email,
  coalesce(i.estado, '— sin inscripción —')          as inscripcion,
  coalesce(sum(case when pg.estado = 'pagado'
                    then pg.monto end), 0)           as pagado,
  g.codigo                                           as grupo
from public.profiles p
join auth.users u                on u.id = p.id
left join public.inscripciones i on i.estudiante_id = p.id
left join public.grupos g        on g.id = i.grupo_id
left join public.pagos pg        on pg.inscripcion_id = i.id
where p.role = 'estudiante'
group by p.nombre_completo, u.email, i.estado, g.codigo
order by p.nombre_completo;

select codigo, cupo_actual, cupo_maximo, (cupo_maximo - cupo_actual) as libres
  from public.grupos where estado in ('abierto', 'en_curso');


-- ---------------------------------------------------------------------------
-- 2 · Activar a alguien
-- ---------------------------------------------------------------------------
-- Mientras la inscripción no está «activa», el estudiante NO ve el enlace de
-- Zoom ni el del grupo de WhatsApp: le sale el candado en su espacio.
-- Cambia el correo y ejecuta.

update public.inscripciones i
   set estado = 'activa'
  from public.profiles p
  join auth.users u on u.id = p.id
 where p.id = i.estudiante_id
   and lower(u.email) = lower('CORREO@EJEMPLO.COM')
   and i.estado <> 'activa';


-- ---------------------------------------------------------------------------
-- 3 · Registrar un pago
-- ---------------------------------------------------------------------------
-- Cambia el correo y, si hace falta, el monto. No duplica: si esa persona
-- ya tiene un pago cobrado, no añade otro.

insert into public.pagos (inscripcion_id, monto, moneda, concepto, estado, pagado_en)
select i.id, 1900, 'MXN', 'Ciclo Français A1.4 — Défi 1', 'pagado', now()
  from public.inscripciones i
  join public.profiles p on p.id = i.estudiante_id
  join auth.users u      on u.id = p.id
 where lower(u.email) = lower('CORREO@EJEMPLO.COM')
   and not exists (select 1 from public.pagos pg
                    where pg.inscripcion_id = i.id and pg.estado = 'pagado');


-- ---------------------------------------------------------------------------
-- 4 · Quitar una inscripción que no debería existir
-- ---------------------------------------------------------------------------
-- Pasa al probar el formulario con tu propia cuenta: te quedas figurando
-- como alumno pendiente de pago en Finanzas y en la lista de estudiantes.
-- Borra la inscripción, nunca la cuenta.

delete from public.inscripciones i
 using public.profiles p, auth.users u
 where p.id = i.estudiante_id
   and u.id = p.id
   and lower(u.email) = lower('CORREO@EJEMPLO.COM')
   and p.role in ('docente', 'admin');


-- ---------------------------------------------------------------------------
-- 5 · Quién es quién  (antes de borrar cuentas, mira esto)
-- ---------------------------------------------------------------------------
-- Las cuentas con rol «docente» o «admin» NO se borran nunca: una es la
-- dueña de los cursos y la otra la que da clase.

select
  u.email,
  p.nombre_completo,
  p.role,
  coalesce(i.estado, '— sin inscripción —') as inscripcion,
  u.created_at::date                        as creada,
  u.last_sign_in_at::date                   as ultimo_acceso
from auth.users u
left join public.profiles p      on p.id = u.id
left join public.inscripciones i on i.estudiante_id = p.id
order by u.created_at;


-- ---------------------------------------------------------------------------
-- 6 · Las clases que vienen
-- ---------------------------------------------------------------------------

select s.fecha, s.tema, left(s.contenido, 90) || '…' as contenido
  from public.sesiones s
  join public.grupos g on g.curso_id = s.curso_id
 where g.codigo = 'A1-OCT2026'
   and s.fecha >= public.hoy_mexico()
 order by s.fecha
 limit 4;


-- ---------------------------------------------------------------------------
-- 7 · Dinero del ciclo
-- ---------------------------------------------------------------------------

select
  sum(case when pg.estado = 'pagado' then pg.monto else 0 end)                      as cobrado,
  sum(case when pg.estado in ('pendiente','procesando') then pg.monto else 0 end)   as por_cobrar,
  count(*) filter (where pg.estado = 'pagado')                                      as pagos_cobrados
from public.pagos pg;


-- ---------------------------------------------------------------------------
-- Para dar de baja a quien se retira → supabase/baja-estudiante.sql
-- ---------------------------------------------------------------------------
