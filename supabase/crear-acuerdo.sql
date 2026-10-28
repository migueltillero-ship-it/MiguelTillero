-- ===========================================================================
-- CREAR EL ACUERDO DE UN PROSPECTO EN UN SOLO PASO
-- ===========================================================================
-- Hasta aquí había que hacerlo a mano: insertar la contratación, calcular y
-- meter cada clase, asignar el plan, emitir el acuerdo y mover la etapa. Cinco
-- operaciones que, si una falla a medias, dejan al estudiante con media cosa.
--
-- Esta función lo hace todo junto o no hace nada.
--
-- Hay un detalle que conviene tener presente: un prospecto no es un usuario.
-- Quien llena el formulario público no crea cuenta, así que no puede entrar a
-- ver su acuerdo hasta que se registre. Por eso aquí hace falta el perfil del
-- estudiante, y por eso existe buscar_estudiante(), para saber desde el panel
-- si esa persona ya se registró o todavía hay que invitarla.
--
-- CÓMO USAR: Supabase → SQL Editor → New query → pegar → Run.
-- Ejecutar DESPUÉS de contrataciones.sql, contrato-generar.sql,
-- prospectos-etapas.sql y plan-pedagogico.sql. Es seguro repetirlo.
-- ===========================================================================


-- ---------------------------------------------------------------------------
-- 1. ¿Esta persona ya tiene cuenta?
-- ---------------------------------------------------------------------------
-- El panel no puede mirar auth.users directamente, y tampoco debería: solo
-- necesita saber si existe un perfil con ese correo.

create or replace function public.buscar_estudiante(p_email text)
returns table (id uuid, nombre_completo text, role text)
language sql security definer set search_path = public, auth as $$
  select p.id, p.nombre_completo, p.role
    from auth.users u
    join public.profiles p on p.id = u.id
   where lower(u.email) = lower(trim(p_email))
     and public.es_docente()
   limit 1;
$$;
grant execute on function public.buscar_estudiante(text) to authenticated;


-- ---------------------------------------------------------------------------
-- 2. Crear contratación, clases y acuerdo
-- ---------------------------------------------------------------------------
-- El patrón semanal llega como {"lun":{"desde":"16:00","hasta":"18:00"}, …},
-- que es exactamente la forma en que el formulario guarda lo que pidió la
-- persona: no hay que traducir nada entre lo que ella propuso y lo que se
-- agenda.
--
-- Las clases se van colocando semana a semana desde la fecha de inicio hasta
-- agotar las horas. Si una franja choca con otra clase ya agendada, se salta
-- y se intenta la semana siguiente: antes dejar un hueco que pisar a otro
-- estudiante.

create or replace function public.crear_acuerdo_desde_prospecto(
  p_prospecto      uuid,
  p_estudiante     uuid,
  p_horas_pagadas  numeric,
  p_horas_totales  numeric,
  p_precio_hora    numeric,
  p_fecha_inicio   date,
  p_patron         jsonb,
  p_plan           text    default null,
  p_modalidad      text    default 'en_linea',
  p_moneda         text    default 'MXN'
) returns uuid
language plpgsql security definer set search_path = public as $$
declare
  v_docente   uuid;
  v_contrat   uuid;
  v_fecha     date;
  v_restan    numeric;
  v_clave     text;
  v_desde     time;
  v_hasta     time;
  v_horas     numeric;
  v_puestas   int := 0;
  v_vueltas   int := 0;
  v_ultima    date;
  v_contrato  uuid;
begin
  if not es_docente() then
    raise exception 'Solo el docente puede crear un acuerdo.';
  end if;
  if p_horas_totales < p_horas_pagadas then
    raise exception 'No se pueden recibir menos horas de las que se pagan.';
  end if;
  if p_patron is null or p_patron = '{}'::jsonb then
    raise exception 'Hace falta al menos un día con su horario.';
  end if;

  select id into v_docente from profiles where role in ('docente','admin')
   order by case when id = auth.uid() then 0 else 1 end limit 1;

  insert into contrataciones (estudiante_id, docente_id, tipo, horas_pagadas, horas_totales,
                              precio_hora, moneda, importe_total, modalidad, fecha_inicio, estado)
  values (p_estudiante, v_docente, 'patron', p_horas_pagadas, p_horas_totales,
          p_precio_hora, p_moneda, round(p_horas_pagadas * p_precio_hora, 2),
          p_modalidad, p_fecha_inicio, 'propuesta')
  returning id into v_contrat;

  if p_plan is not null and p_plan <> '' then
    perform asignar_plan(v_contrat, p_plan);
  end if;

  -- Repartir las horas en el calendario.
  v_fecha  := p_fecha_inicio;
  v_restan := p_horas_totales;
  while v_restan > 0.01 and v_vueltas < 400 loop
    v_vueltas := v_vueltas + 1;
    v_clave := (array['dom','lun','mar','mie','jue','vie','sab'])[extract(dow from v_fecha)::int + 1];

    if p_patron ? v_clave then
      v_desde := nullif(p_patron -> v_clave ->> 'desde', '')::time;
      v_hasta := nullif(p_patron -> v_clave ->> 'hasta', '')::time;
      if v_desde is not null and v_hasta is not null and v_hasta > v_desde then
        v_horas := horas_de_clase(v_desde, v_hasta);
        -- La última clase puede recortarse para no pasarse de las horas pagadas.
        if v_horas > v_restan then
          v_hasta := v_desde + make_interval(mins => (v_restan * 60)::int);
          v_horas := horas_de_clase(v_desde, v_hasta);
        end if;
        if v_horas > 0.01 and not exists (
             select 1 from clases k
              where k.docente_id = v_docente and k.fecha = v_fecha
                and k.estado <> 'cancelada'
                and timerange(k.hora_inicio, k.hora_fin, '[)') && timerange(v_desde, v_hasta, '[)'))
        then
          insert into clases (contratacion_id, docente_id, fecha, hora_inicio, hora_fin)
          values (v_contrat, v_docente, v_fecha, v_desde, v_hasta);
          v_restan  := v_restan - v_horas;
          v_puestas := v_puestas + 1;
          v_ultima  := v_fecha;
        end if;
      end if;
    end if;
    v_fecha := v_fecha + 1;
  end loop;

  if v_puestas = 0 then
    raise exception 'No se pudo agendar ninguna clase: revisa el patrón de días y horas.';
  end if;

  update contrataciones set fecha_fin = v_ultima where id = v_contrat;

  v_contrato := crear_contrato(v_contrat);

  update prospectos
     set estado = 'validado', contratacion_id = v_contrat
   where id = p_prospecto;

  return v_contrat;
end;
$$;
grant execute on function public.crear_acuerdo_desde_prospecto(
  uuid, uuid, numeric, numeric, numeric, date, jsonb, text, text, text) to authenticated;

comment on function public.crear_acuerdo_desde_prospecto(
  uuid, uuid, numeric, numeric, numeric, date, jsonb, text, text, text) is
  'Crea la contratación, reparte las clases según el patrón semanal, asigna el '
  'plan y emite el acuerdo. Todo junto o nada: si algo falla, no queda media '
  'cosa a medio hacer.';
