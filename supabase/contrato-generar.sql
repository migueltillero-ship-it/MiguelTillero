-- ===========================================================================
-- REDACTAR EL CONTRATO DE APRENDIZAJE
-- ===========================================================================
-- El texto se arma aquí y se guarda ya redactado en «contratos.cuerpo». No se
-- genera al abrir la página a propósito: dentro de un año la plantilla habrá
-- cambiado y lo que vale es lo que la persona leyó el día que firmó.
--
-- CÓMO USAR: Supabase → SQL Editor → New query → pegar → Run.
-- Ejecutar DESPUÉS de contrataciones.sql. Es seguro repetirlo.
-- ===========================================================================

create or replace function public.crear_contrato(p_contratacion uuid)
returns uuid
language plpgsql security definer set search_path = public as $$
declare
  c          contrataciones%rowtype;
  v_alumno   text;
  v_docente  text;
  v_regalo   numeric;
  v_calend   text;
  v_numero   text;
  v_cuerpo   text;
  v_id       uuid;
begin
  if not es_docente() then
    raise exception 'Solo el docente puede emitir un contrato.';
  end if;

  select * into c from contrataciones where id = p_contratacion;
  if not found then raise exception 'La contratación no existe.'; end if;

  select id into v_id from contratos where contratacion_id = p_contratacion;
  if v_id is not null then return v_id; end if;   -- ya estaba emitido

  select nombre_completo into v_alumno  from profiles where id = c.estudiante_id;
  select nombre_completo into v_docente from profiles where id = c.docente_id;
  v_regalo := c.horas_totales - c.horas_pagadas;

  -- El calendario, una línea por clase, en el orden en que ocurren.
  select coalesce(string_agg(
           '  · ' || to_char(k.fecha, 'TMDay DD "de" TMMonth "de" YYYY') || ', de ' ||
           to_char(k.hora_inicio, 'HH24:MI') || ' a ' || to_char(k.hora_fin, 'HH24:MI'),
           E'\n' order by k.fecha, k.hora_inicio), '  (por acordar)')
    into v_calend
    from clases k
   where k.contratacion_id = p_contratacion and k.estado <> 'cancelada';

  v_numero := nuevo_numero_contrato();

  v_cuerpo :=
    'CONTRATO DE APRENDIZAJE — ' || v_numero || E'\n' ||
    '===========================================================' || E'\n\n' ||
    'Entre ' || coalesce(v_docente, 'Miguel David Tillero Álvarez') ||
    ', profesor de francés (en adelante, el profesor), y ' ||
    coalesce(v_alumno, '—') || ' (en adelante, el estudiante), se acuerda lo siguiente.' || E'\n\n' ||

    '1. OBJETO' || E'\n' ||
    'El profesor impartirá clases particulares de francés al estudiante, en la ' ||
    'modalidad y el calendario que se detallan abajo.' || E'\n\n' ||

    '2. HORAS' || E'\n' ||
    'El estudiante contrata ' || trim(to_char(c.horas_pagadas, '999D9')) || ' horas de clase.' ||
    case when v_regalo > 0 then
      E'\n' || 'El profesor añade ' || trim(to_char(v_regalo, '999D9')) ||
      ' horas sin costo, de manera excepcional, por lo que el estudiante recibirá ' ||
      trim(to_char(c.horas_totales, '999D9')) || ' horas en total.'
    else '' end || E'\n\n' ||

    '3. CALENDARIO' || E'\n' ||
    'Las clases se impartirán en las siguientes fechas y horarios (hora de la ' ||
    'Ciudad de México):' || E'\n' || v_calend || E'\n\n' ||
    'Cualquier cambio de fecha u horario se acuerda entre las partes con ' ||
    'antelación. Una clase cancelada con menos de 24 horas de aviso se ' ||
    'considera impartida, salvo caso de fuerza mayor.' || E'\n\n' ||

    '4. IMPORTE' || E'\n' ||
    'El precio es de ' || trim(to_char(c.precio_hora, '999G999D99')) || ' ' || c.moneda ||
    ' por hora. El importe total a pagar es de ' ||
    trim(to_char(c.importe_total, '999G999D99')) || ' ' || c.moneda ||
    ', correspondiente a las ' || trim(to_char(c.horas_pagadas, '999D9')) ||
    ' horas contratadas.' ||
    case when v_regalo > 0 then ' Las horas añadidas no se facturan.' else '' end || E'\n\n' ||

    '5. PAGO' || E'\n' ||
    'El pago no condiciona el inicio de las clases ni el acceso a la ' ||
    'plataforma. El estudiante dispone de los datos bancarios en su espacio y ' ||
    'puede enviar el comprobante subiéndolo a la plataforma o por mensajería.' || E'\n\n' ||

    '6. REGLAMENTO' || E'\n' ||
    'El estudiante declara haber leído el reglamento de las clases, que forma ' ||
    'parte de este contrato y regula la asistencia, la puntualidad, las ' ||
    'cancelaciones y el uso de los materiales.' || E'\n\n' ||

    '7. VIGENCIA' || E'\n' ||
    'Del ' || to_char(c.fecha_inicio, 'DD "de" TMMonth "de" YYYY') ||
    coalesce(' al ' || to_char(c.fecha_fin, 'DD "de" TMMonth "de" YYYY'), '') ||
    '. Las horas no utilizadas dentro de la vigencia se reprograman de común ' ||
    'acuerdo.' || E'\n\n' ||

    '8. ACEPTACIÓN' || E'\n' ||
    'La aceptación se realiza en línea. Al marcar las casillas y escribir su ' ||
    'nombre completo, el estudiante acepta este contrato y confirma la lectura ' ||
    'del reglamento. Queda registrada la fecha, la hora y el dispositivo desde ' ||
    'el que se aceptó, con el mismo valor que una firma.';

  insert into contratos (contratacion_id, numero, cuerpo)
  values (p_contratacion, v_numero, v_cuerpo)
  returning id into v_id;
  return v_id;
end;
$$;
grant execute on function public.crear_contrato(uuid) to authenticated;

comment on function public.crear_contrato(uuid) is
  'Redacta y guarda el contrato de una contratación. Si ya existe, devuelve el '
  'que hay: el texto firmado no se regenera nunca.';
