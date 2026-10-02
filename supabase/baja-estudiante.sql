-- ===========================================================================
-- BAJA DE UN ESTUDIANTE
-- ===========================================================================
-- Cuando alguien se retira a mitad de ciclo hay que dejar tres cosas en su
-- sitio, y ninguna se arregla sola:
--
--   · Su inscripción, que debe decir que se retiró y no quedarse en
--     «pendiente» para siempre, como si aún estuviéramos esperando su pago.
--   · El cupo del grupo, que vuelve a quedar libre.
--   · Las finanzas, para que no siga figurando dinero por cobrar que ya
--     nadie va a cobrar.
--
-- Lo que NO toca: su boletín de resultados. Esas notas se las ganó y su
-- familia puede seguir abriéndolas. Al final hay una línea, comentada, por
-- si alguna vez quieres retirar un boletín.
--
-- CÓMO USAR
--   1. Cambia el nombre en el bloque 1 (basta con el nombre de pila si no
--      hay dos alumnos que se llamen igual).
--   2. Ejecuta el bloque 2 y mira lo que sale ANTES de seguir.
--   3. Si cuadra, ejecuta el resto.
--
-- Dónde: Supabase → SQL Editor → New query. Es seguro repetirlo.
-- ===========================================================================


-- ---------------------------------------------------------------------------
-- 1. Quién se da de baja
-- ---------------------------------------------------------------------------
-- Vale el nombre completo o solo una parte. No distingue mayúsculas.

select set_config('mt.alumno', 'Ricardo', false);


-- ---------------------------------------------------------------------------
-- 2. Ver la situación ANTES de tocar nada
-- ---------------------------------------------------------------------------

-- 2a · ¿Tiene cuenta e inscripción?
select
  p.nombre_completo                    as alumno,
  u.email,
  i.estado                             as inscripcion,
  g.codigo                             as grupo,
  i.notas
from public.profiles p
join auth.users u        on u.id = p.id
left join public.inscripciones i on i.estudiante_id = p.id
left join public.grupos g        on g.id = i.grupo_id
where p.nombre_completo ilike '%' || current_setting('mt.alumno') || '%';

-- 2b · ¿Tiene algún cobro apuntado?
select
  p.nombre_completo  as alumno,
  pg.concepto,
  pg.monto,
  pg.moneda,
  pg.estado          as estado_del_pago,
  pg.pagado_en
from public.pagos pg
join public.inscripciones i on i.id = pg.inscripcion_id
join public.profiles p      on p.id = i.estudiante_id
where p.nombre_completo ilike '%' || current_setting('mt.alumno') || '%';

-- 2c · ¿Tiene boletín de resultados?
select b.alumno, b.representante, b.telefono, b.creado_en
from public.boletines b
where b.alumno ilike '%' || current_setting('mt.alumno') || '%';

-- 2d · Cómo está el cupo ahora mismo
select codigo, cupo_actual, cupo_maximo, (cupo_maximo - cupo_actual) as libres
from public.grupos where codigo = 'A1-OCT2026';


-- ---------------------------------------------------------------------------
-- 3. Permitir el estado «retirada»
-- ---------------------------------------------------------------------------
-- Las inscripciones solo admitían pendiente / activa / rechazada /
-- finalizada. Ninguno sirve aquí: «rechazada» es para quien no admitimos, y
-- «finalizada» para quien llegó al final. Quien se retira merece su propia
-- palabra, y así las estadísticas del curso no lo cuentan como un rechazo.

do $$
declare
  v_constraint text;
begin
  select conname into v_constraint
    from pg_constraint
   where conrelid = 'public.inscripciones'::regclass
     and contype = 'c'
     and pg_get_constraintdef(oid) ilike '%estado%';

  if v_constraint is not null then
    execute format('alter table public.inscripciones drop constraint %I', v_constraint);
  end if;

  alter table public.inscripciones
    add constraint inscripciones_estado_check
    check (estado in ('pendiente', 'activa', 'rechazada', 'retirada', 'finalizada'));
end $$;


-- ---------------------------------------------------------------------------
-- 4. Darlo de baja
-- ---------------------------------------------------------------------------
-- El cupo se libera solo: hay un disparador que descuenta del grupo en
-- cuanto la inscripción deja de estar «activa».

update public.inscripciones i
   set estado = 'retirada',
       notas  = trim(both E'\n' from
                 coalesce(i.notas || E'\n', '') ||
                 'Se retira del ciclo el ' || to_char(public.hoy_mexico(), 'DD/MM/YYYY') || '.')
  from public.profiles p
 where p.id = i.estudiante_id
   and p.nombre_completo ilike '%' || current_setting('mt.alumno') || '%'
   and i.estado <> 'retirada';


-- ---------------------------------------------------------------------------
-- 5. Dejar las finanzas en claro
-- ---------------------------------------------------------------------------
-- «Pendiente de cobro» en el panel suma los pagos en estado pendiente o
-- procesando. Los que queden de este alumno dejan de contar.
--
-- Los pagos YA COBRADOS no se tocan: si pagó y se retira, ese dinero entró
-- de verdad y la devolución, si la hay, se registra aparte como egreso.

update public.pagos pg
   set estado   = 'rechazado',
       concepto = trim(both ' ' from coalesce(pg.concepto, '') || ' (anulado: se retira del ciclo)'),
       updated_at = now()
  from public.inscripciones i
  join public.profiles p on p.id = i.estudiante_id
 where i.id = pg.inscripcion_id
   and p.nombre_completo ilike '%' || current_setting('mt.alumno') || '%'
   and pg.estado in ('pendiente', 'procesando');


-- ---------------------------------------------------------------------------
-- 6. Comprobación
-- ---------------------------------------------------------------------------

select
  p.nombre_completo        as alumno,
  i.estado                 as inscripcion,
  i.notas,
  (select count(*) from public.pagos pg
    where pg.inscripcion_id = i.id and pg.estado in ('pendiente','procesando'))
                           as cobros_pendientes
from public.profiles p
join public.inscripciones i on i.estudiante_id = p.id
where p.nombre_completo ilike '%' || current_setting('mt.alumno') || '%';

select codigo, cupo_actual, cupo_maximo, (cupo_maximo - cupo_actual) as libres
from public.grupos where codigo = 'A1-OCT2026';


-- ---------------------------------------------------------------------------
-- 7. Opcional: retirar el boletín
-- ---------------------------------------------------------------------------
-- Por omisión el boletín se queda: son sus notas y su familia puede volver
-- a abrirlas cuando quiera. Descomenta estas dos líneas solo si quieres que
-- el enlace deje de funcionar.
--
-- delete from public.boletin_notas
--  where boletin_id in (select id from public.boletines
--                        where alumno ilike '%' || current_setting('mt.alumno') || '%');
-- delete from public.boletines
--  where alumno ilike '%' || current_setting('mt.alumno') || '%';
