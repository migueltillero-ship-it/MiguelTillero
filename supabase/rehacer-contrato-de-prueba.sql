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
  v_docente      uuid;
begin
  -- crear_contrato() solo deja emitir al docente, y lo comprueba con
  -- auth.uid(). En el editor de SQL no hay sesión de nadie: auth.uid() es
  -- nulo y la función responde «Solo el docente puede emitir un contrato».
  -- Así que, solo durante esta transacción, decimos quiénes somos.
  select id into v_docente from public.profiles
   where role in ('docente','admin')
   order by case when role = 'admin' then 0 else 1 end
   limit 1;
  if v_docente is null then
    raise exception 'No hay ningún perfil docente o admin.';
  end if;
  perform set_config('request.jwt.claims',
                     json_build_object('sub', v_docente, 'role', 'authenticated')::text,
                     true);

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
