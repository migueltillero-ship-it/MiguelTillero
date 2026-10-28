-- ===========================================================================
-- FECHAS EN ESPAÑOL, SIN DEPENDER DEL IDIOMA DEL SERVIDOR
-- ===========================================================================
-- El acuerdo de Evelyn salió con «Tuesday 01 de December de 2026». No era un
-- error de redacción: el servidor de Supabase tiene lc_time = en_US.UTF-8, y
-- los patrones TMDay/TMMonth de to_char() traducen al idioma del servidor, no
-- al del texto que estamos escribiendo. Medio en español y medio en inglés.
--
-- Cambiar lc_time no está en nuestras manos (es una opción del servidor, y
-- aunque lo estuviera, dependería de que nadie la toque nunca). Así que los
-- nombres se escriben aquí, en una tabla fija: lo que un estudiante lee no
-- puede depender de la configuración regional de una máquina.
--
--   fecha_larga('2026-12-01')        → «1 de diciembre de 2026»
--   fecha_larga('2026-12-01', true)  → «martes 1 de diciembre de 2026»
--
-- CÓMO USAR: Supabase → SQL Editor → New query → pegar → Run.
-- Ejecutar ANTES de contrato-generar.sql. Es seguro repetirlo.
-- ===========================================================================

create or replace function public.fecha_larga(
  p_fecha   date,
  p_con_dia boolean default false
) returns text
language sql immutable as $$
  select case when p_fecha is null then null else
    case when p_con_dia
      then (array['domingo','lunes','martes','miércoles','jueves','viernes','sábado'])
             [extract(dow from p_fecha)::int + 1] || ' '
      else '' end
    || extract(day from p_fecha)::text || ' de '
    || (array['enero','febrero','marzo','abril','mayo','junio','julio','agosto',
              'septiembre','octubre','noviembre','diciembre'])
         [extract(month from p_fecha)::int]
    || ' de ' || extract(year from p_fecha)::text
  end;
$$;

grant execute on function public.fecha_larga(date, boolean) to authenticated, anon;

comment on function public.fecha_larga(date, boolean) is
  'Escribe una fecha en español sin usar TMDay/TMMonth: esos patrones siguen '
  'el lc_time del servidor, que aquí está en inglés. Con p_con_dia = true '
  'añade delante el día de la semana.';


-- ---------------------------------------------------------------------------
-- NÚMEROS LEGIBLES, Y TAMBIÉN SIN DEPENDER DEL IDIOMA DEL SERVIDOR
-- ---------------------------------------------------------------------------
-- El acuerdo decía «10.0 horas de clase». Nadie escribe eso: son 10 horas. El
-- decimal solo hace falta cuando lo hay de verdad, como en 12.5.
--
-- Y de paso, la misma trampa de las fechas: en to_char(), «D» y «G» son el
-- separador decimal y el de miles *del idioma del servidor*. Aquí coincidían
-- con los de México por casualidad. Los patrones «.» y «,» son fijos, así que
-- se usan esos y se acabó la casualidad.

create or replace function public.horas_legibles(p_horas numeric)
returns text language sql immutable as $$
  select case
           when p_horas is null then '—'
           when p_horas = trunc(p_horas) then trunc(p_horas)::bigint::text
           else trim(to_char(p_horas, 'FM9999990.9'))
         end;
$$;

create or replace function public.dinero_legible(p_monto numeric)
returns text language sql immutable as $$
  select case when p_monto is null then '—'
              else trim(to_char(p_monto, 'FM9,999,990.00')) end;
$$;

grant execute on function public.horas_legibles(numeric)  to authenticated, anon;
grant execute on function public.dinero_legible(numeric)  to authenticated, anon;

comment on function public.horas_legibles(numeric) is
  'Escribe unas horas como las escribiría una persona: «10», no «10.0»; «12.5» '
  'cuando el medio existe. Sin depender del idioma del servidor.';
