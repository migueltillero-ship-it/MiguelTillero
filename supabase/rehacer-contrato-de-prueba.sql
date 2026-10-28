-- ===========================================================================
-- VOLVER A EMITIR UN ACUERDO DE PRUEBA
-- ===========================================================================
-- El texto de un acuerdo se congela el día que se emite y no se regenera
-- nunca: lo que vale es lo que la persona leyó cuando firmó. Por eso arreglar
-- la plantilla no arregla los acuerdos ya emitidos.
--
-- Para los de prueba sí interesa rehacerlos, y eso es lo que hace esto:
-- borra el acuerdo del contrato CA-2026-0001 y lo vuelve a redactar con la
-- plantilla de ahora, ya con las fechas en español.
--
-- OJO: solo para acuerdos de prueba. Nunca sobre uno que alguien haya
-- firmado — se perdería el texto que esa persona aceptó.
--
-- CÓMO USAR: Supabase → SQL Editor → New query → pegar → Run.
--   https://supabase.com/dashboard/project/yfrdlzveleevkjqekdoq/sql/new
-- ===========================================================================

do $$
declare
  v_contratacion uuid;
  v_nuevo        uuid;
begin
  select contratacion_id into v_contratacion
    from public.contratos
   where numero = 'CA-2026-0001'
     and aceptado_en is null;      -- jamás tocar uno ya firmado

  if v_contratacion is null then
    raise notice 'No hay un CA-2026-0001 sin firmar. No se toca nada.';
    return;
  end if;

  delete from public.contratos where contratacion_id = v_contratacion;
  v_nuevo := public.crear_contrato(v_contratacion);
  raise notice 'Acuerdo rehecho: %', v_nuevo;
end;
$$;

-- Para comprobarlo: las fechas tienen que salir en español.
select numero,
       substring(cuerpo from 'NUESTRO CALENDARIO.{0,160}') as asi_quedo
  from public.contratos
 order by creado_en desc
 limit 1;
