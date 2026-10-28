-- ===========================================================================
-- VOLVER A EMITIR EL ÚLTIMO ACUERDO SIN FIRMAR
-- ===========================================================================
-- El texto de un acuerdo se congela el día que se emite y no se regenera
-- nunca: lo que vale es lo que la persona leyó cuando firmó. Por eso arreglar
-- la plantilla no arregla los acuerdos ya emitidos.
--
-- Para los de prueba sí interesa rehacerlos, y eso es lo que hace esto: coge
-- el acuerdo más reciente que NADIE haya firmado, lo borra y lo vuelve a
-- redactar con la plantilla de ahora.
--
-- No va atado a un número de acuerdo. La primera versión buscaba
-- «CA-2026-0001» y, en cuanto se rehízo una vez, el acuerdo pasó a ser el
-- 0002: el guion ya no encontraba nada y parecía que no funcionaba. Cada vez
-- que se rehace, se emite con un número nuevo, así que atarlo a uno concreto
-- solo servía para una vez.
--
-- SEGURO: jamás toca un acuerdo firmado. Si el último que hay tiene firma,
-- no hace nada y lo dice.
--
-- CÓMO USAR: Supabase → SQL Editor → New query → pegar → Run.
--   https://supabase.com/dashboard/project/yfrdlzveleevkjqekdoq/sql/new
-- ===========================================================================

do $$
declare
  v_contratacion uuid;
  v_viejo        text;
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

  select contratacion_id, numero into v_contratacion, v_viejo
    from public.contratos
   where aceptado_en is null          -- nunca uno ya firmado
   order by creado_en desc
   limit 1;

  if v_contratacion is null then
    raise notice 'No hay ningún acuerdo sin firmar. No se toca nada.';
    return;
  end if;

  delete from public.contratos where contratacion_id = v_contratacion;
  v_nuevo := public.crear_contrato(v_contratacion);
  raise notice 'Rehecho: % pasa a ser otro acuerdo con la plantilla nueva.', v_viejo;
end;
$$;

-- Comprobación: las fechas tienen que salir en español y las horas sin el
-- «.0» de más.
select numero,
       substring(cuerpo from 'LAS HORAS.{0,120}')          as las_horas,
       substring(cuerpo from 'NUESTRO CALENDARIO.{0,190}') as el_calendario,
       substring(cuerpo from 'LA INVERSIÓN.{0,140}')       as la_inversion
  from public.contratos
 order by creado_en desc
 limit 1;
