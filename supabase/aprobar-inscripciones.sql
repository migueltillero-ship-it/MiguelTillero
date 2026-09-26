-- ============================================================================
-- APROBAR INSCRIPCIONES DESDE SUPABASE
--
-- Para cuando haga falta aprobar sin pasar por el panel docente.
-- Hace exactamente lo mismo que el botón del panel: poner la inscripción en
-- 'activa'. A partir de ahí el estudiante ve su calendario, su asistencia,
-- sus resultados y los enlaces de Zoom y WhatsApp.
--
-- CÓMO USAR: pega en el SQL Editor SOLO el bloque que necesites y dale RUN.
-- No hace falta ejecutar el archivo entero.
--
--   https://supabase.com/dashboard/project/yfrdlzveleevkjqekdoq/sql/new
-- ============================================================================


-- ────────────────────────────────────────────────────────────────────────────
-- 1. VER QUIÉN ESTÁ ESPERANDO
--    Empieza siempre por aquí: te dice a quién tienes que aprobar.
-- ────────────────────────────────────────────────────────────────────────────

select
  p.nombre_completo                                  as estudiante,
  u.email                                            as correo,
  coalesce(p.representante_nombre, '—')              as representante,
  coalesce(p.representante_parentesco, '—')          as parentesco,
  coalesce(p.representante_telefono, p.telefono, '—') as telefono,
  i.estado,
  to_char(i.created_at, 'DD/MM HH24:MI')             as se_inscribio,
  g.codigo                                           as grupo
from public.inscripciones i
join public.profiles p on p.id = i.estudiante_id
join auth.users   u on u.id = i.estudiante_id
join public.grupos g on g.id = i.grupo_id
where g.codigo = 'A1-OCT2026'
order by i.created_at;


-- ────────────────────────────────────────────────────────────────────────────
-- 2. APROBAR A UNA PERSONA  ← lo normal, según te vayan pagando
--    Cambia el correo por el de quien te mandó el comprobante.
-- ────────────────────────────────────────────────────────────────────────────

update public.inscripciones i
set estado = 'activa'
from auth.users u, public.grupos g
where u.id = i.estudiante_id
  and g.id = i.grupo_id
  and g.codigo = 'A1-OCT2026'
  and lower(u.email) = lower('CORREO-DEL-ESTUDIANTE@ejemplo.com')
returning i.id, u.email, i.estado;


-- ────────────────────────────────────────────────────────────────────────────
-- 3. APROBAR A TODOS LOS PENDIENTES DEL GRUPO
--    Úsalo solo cuando ya te hayan pagado todos.
-- ────────────────────────────────────────────────────────────────────────────

-- update public.inscripciones i
-- set estado = 'activa'
-- from public.grupos g
-- where g.id = i.grupo_id
--   and g.codigo = 'A1-OCT2026'
--   and i.estado = 'pendiente'
-- returning i.id, i.estudiante_id, i.estado;


-- ────────────────────────────────────────────────────────────────────────────
-- 4. DEJAR CONSTANCIA DEL PAGO
--    No es obligatorio para que entren, pero así el estudiante ve su pago en
--    su espacio y a ti te queda el registro. Cambia el correo.
-- ────────────────────────────────────────────────────────────────────────────

-- insert into public.pagos (inscripcion_id, monto, moneda, concepto, estado, metodo, pagado_en)
-- select i.id, g.costo, g.moneda, 'Ciclo A1.4 · octubre-noviembre 2026', 'pagado', 'manual', now()
-- from public.inscripciones i
-- join public.grupos g on g.id = i.grupo_id
-- join auth.users u on u.id = i.estudiante_id
-- where g.codigo = 'A1-OCT2026'
--   and lower(u.email) = lower('CORREO-DEL-ESTUDIANTE@ejemplo.com')
--   and not exists (select 1 from public.pagos x where x.inscripcion_id = i.id);


-- ────────────────────────────────────────────────────────────────────────────
-- 5. DESHACER, si te equivocaste de persona
-- ────────────────────────────────────────────────────────────────────────────

-- update public.inscripciones i
-- set estado = 'pendiente'
-- from auth.users u, public.grupos g
-- where u.id = i.estudiante_id and g.id = i.grupo_id
--   and g.codigo = 'A1-OCT2026'
--   and lower(u.email) = lower('CORREO-DEL-ESTUDIANTE@ejemplo.com');


-- ────────────────────────────────────────────────────────────────────────────
-- 6. COMPROBAR CÓMO QUEDÓ EL GRUPO
-- ────────────────────────────────────────────────────────────────────────────

select
  g.codigo,
  g.cupo_actual                    as inscritos_activos,
  g.cupo_maximo - g.cupo_actual    as cupos_libres,
  count(*) filter (where i.estado = 'activa')    as activas,
  count(*) filter (where i.estado = 'pendiente') as pendientes
from public.grupos g
left join public.inscripciones i on i.grupo_id = g.id
where g.codigo = 'A1-OCT2026'
group by g.codigo, g.cupo_actual, g.cupo_maximo;
