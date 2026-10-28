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
    'ACUERDO DE APRENDIZAJE — ' || v_numero || E'\n' ||
    'Clases particulares de francés con ' || coalesce(v_docente, 'Miguel Tillero') || E'\n\n' ||

    'Este acuerdo lo firmamos ' || coalesce(v_alumno, '—') || ' y ' ||
    coalesce(v_docente, 'Miguel David Tillero Álvarez') ||
    '. No es un trámite: es el mapa de lo que vamos a hacer juntos y de lo que ' ||
    'cada uno pone de su parte.' || E'\n\n' ||

    '1. NUESTRO OBJETIVO' || E'\n' ||
    'Trabajaremos el francés en clases particulares, adaptadas a tu nivel y a tus ' ||
    'metas. Yo preparo cada sesión a partir de lo que necesitas; tú llegas con ' ||
    'ganas de hablar, que es como de verdad se aprende un idioma.' || E'\n\n' ||

    '2. LAS HORAS' || E'\n' ||
    'Contratas ' || trim(to_char(c.horas_pagadas, '999D9')) || ' horas de clase.' ||
    case when v_regalo > 0 then
      ' A esas añado ' || trim(to_char(v_regalo, '999D9')) ||
      ' horas sin costo, de manera excepcional, así que recibirás ' ||
      trim(to_char(c.horas_totales, '999D9')) || ' horas en total.'
    else '' end || E'\n\n' ||

    '3. NUESTRO CALENDARIO' || E'\n' ||
    'Estas son las fechas y horarios que reservamos (hora de la Ciudad de ' ||
    'México):' || E'\n' || v_calend || E'\n\n' ||
    'Si a alguno de los dos se le cruza algo, lo movemos: basta con avisar al ' ||
    'otro con 24 horas de antelación. Una clase cancelada con menos aviso cuenta ' ||
    'como dada, salvo que ocurra algo de fuerza mayor — y esto vale para los dos: ' ||
    'si el que falla soy yo, la repongo sin descontarla.' || E'\n\n' ||

    '4. CÓMO TRABAJAREMOS' || E'\n' ||
    'Las clases en línea se dan por videollamada, con la cámara encendida. No es ' ||
    'un capricho: enseño francés por el método comunicativo, y ver tu gesto, tu ' ||
    'boca y tu reacción es parte de cómo corrijo la pronunciación. Necesitarás un ' ||
    'lugar tranquilo, buena conexión y un equipo con cámara y micrófono que ' ||
    'funcionen.' || E'\n' ||
    'Los materiales y tus resultados los encontrarás siempre en tu espacio de la ' ||
    'plataforma, y tendrás acceso al club de conversación de los viernes.' || E'\n\n' ||

    '5. LA INVERSIÓN' || E'\n' ||
    'El precio es de ' || trim(to_char(c.precio_hora, '999G999D99')) || ' ' || c.moneda ||
    ' por hora. En total son ' || trim(to_char(c.importe_total, '999G999D99')) || ' ' || c.moneda ||
    ', por las ' || trim(to_char(c.horas_pagadas, '999D9')) || ' horas contratadas.' ||
    case when v_regalo > 0 then ' Las horas que añado no se cobran.' else '' end || E'\n\n' ||

    '6. EL PAGO' || E'\n' ||
    'El pago no condiciona nada: puedes entrar a la plataforma y empezar las ' ||
    'clases antes de pagar. En tu espacio tienes mis datos bancarios y, cuando te ' ||
    'venga bien, subes el comprobante o me lo mandas por WhatsApp.' || E'\n\n' ||

    '7. EL REGLAMENTO' || E'\n' ||
    'El reglamento de las clases forma parte de este acuerdo. Ahí están, con más ' ||
    'detalle, nuestros compromisos sobre puntualidad, cámara, cancelaciones y uso ' ||
    'de los materiales. Lo confirmas aparte al aceptar.' || E'\n\n' ||

    '8. VIGENCIA' || E'\n' ||
    'Del ' || to_char(c.fecha_inicio, 'DD "de" TMMonth "de" YYYY') ||
    coalesce(' al ' || to_char(c.fecha_fin, 'DD "de" TMMonth "de" YYYY'), '') ||
    '. Si al terminar quedaran horas sin usar, las reprogramamos entre los dos.' || E'\n\n' ||

    '9. LA FIRMA' || E'\n' ||
    'Este acuerdo se acepta en línea. Al marcar las dos casillas y escribir tu ' ||
    'nombre completo quedas firmando: se guarda la fecha, la hora y el ' ||
    'dispositivo desde el que lo aceptaste, con el mismo valor que una firma de ' ||
    'puño y letra.';

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
