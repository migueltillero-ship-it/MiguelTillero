-- ===========================================================================
-- AVISO DE PAGO MENSUAL A LAS FAMILIAS
-- ===========================================================================
-- Deja el aviso en el espacio del estudiante. El panel del representante lo
-- muestra también, así que la familia que tenga cuenta vinculada lo ve sin
-- que haya que mandarle nada.
--
-- IMPORTANTE, Y POR ESO ESTO NO VA A TODO EL MUNDO
-- Un aviso de cobro a quien ya pagó cuesta más que no mandarlo. En la base,
-- hoy, no todos están en la misma situación:
--   · hay quien pagó el ciclo de octubre y le toca el de noviembre;
--   · hay quien pagó el mes anterior y le toca el siguiente (en B2 las clases
--     se pagan por mes de 8 sesiones, no por bimestre);
--   · y hay quien no tiene NINGÚN pago registrado, que puede querer decir que
--     no pagó… o que pagó y no se anotó.
-- Por eso la lista de abajo se escribe a mano. Mira antes la consulta del
-- final de este archivo y decide.
--
-- El importe no se escribe aquí: se saca del grupo, para que cada familia
-- vea el suyo y no haya forma de equivocarse al copiar.
--
-- Tampoco van aquí los datos bancarios. El aviso manda a la página de pagos,
-- que es donde están y donde se mantienen en un solo sitio.
--
-- CÓMO USAR: cambia las tres líneas de abajo y ejecuta. Es seguro repetirlo:
-- reemplaza el aviso anterior en lugar de acumular avisos.
-- Dónde: Supabase → SQL Editor → New query → pegar → Run.
-- ===========================================================================

do $$
declare
  -- ── CAMBIA SOLO ESTAS TRES LÍNEAS ──────────────────────────────────────
  -- A quién se le manda. Nombre o trozo de nombre, como en asistencia.sql.
  v_a_quien  text[] := array['Isaac'];
  v_limite   date   := date '2026-11-13';   -- hasta cuándo pagar
  v_concepto text   := 'noviembre 2026';    -- lo que se está cobrando (B2: del 9 nov al 2 dic)
  -- ───────────────────────────────────────────────────────────────────────
  v_titulo text := 'Pago de ' || v_concepto;
  v_sin_pareja text;
  v_cuantos integer := 0;
  r record;
begin
  -- Un nombre mal escrito no avisa de nada: simplemente no le llega a nadie
  -- y tú te quedas pensando que sí. Mejor parar aquí.
  select string_agg(x, ', ') into v_sin_pareja
    from unnest(v_a_quien) as x
   where not exists (
     select 1 from public.inscripciones i
      join public.profiles p on p.id = i.estudiante_id
     where i.estado in ('activa','pendiente')
       and p.nombre_completo ilike '%' || x || '%');
  if v_sin_pareja is not null then
    raise exception 'No hay ningún estudiante activo que se llame así: %. '
                    'Revisa cómo lo has escrito.', v_sin_pareja;
  end if;

  -- Fuera el aviso de pago anterior, sea del mes que sea: si no, se apilan
  -- dos cobros con dos fechas y la familia no sabe cuál vale.
  delete from public.avisos a
   where a.titulo like 'Pago de %';

  for r in
    select distinct i.estudiante_id, g.costo, g.moneda, g.id as grupo_id
      from public.inscripciones i
      join public.grupos g on g.id = i.grupo_id
      join public.profiles p on p.id = i.estudiante_id
     where i.estado in ('activa','pendiente')
       and exists (select 1 from unnest(v_a_quien) x
                    where p.nombre_completo ilike '%' || x || '%')
  loop
    insert into public.avisos (estudiante_id, titulo, mensaje, tipo, desde, hasta)
    values (r.estudiante_id, v_titulo,
      'Las clases se pagan por mes, y toca el de ' || v_concepto || '.' || E'\n\n'
      || 'Importe: $' || trim(to_char(r.costo, 'FM999G999D00')) || ' ' || r.moneda
      || '.' || E'\n'
      || 'Fecha límite: ' || to_char(v_limite, 'DD/MM/YYYY') || '.' || E'\n\n'
      || 'Los datos para pagar están en la página de pagos del sitio:' || E'\n'
      || 'https://migueltillero-ship-it.github.io/MiguelTillero/pagos.html' || E'\n\n'
      || 'Cuando hagas el pago, mándame el comprobante por WhatsApp y lo '
      || 'registro. Si ya lo hiciste y este aviso te sigue saliendo, '
      || 'escríbeme: quiere decir que no me llegó el comprobante y lo '
      || 'arreglamos en un minuto.',
      'importante', null::date, v_limite + 30)
    on conflict do nothing;

    -- La fecha límite del grupo también se mueve: es la que ve el resto de
    -- la plataforma, y si se queda en octubre todo lo demás miente.
    update public.grupos set fecha_limite_pago = v_limite where id = r.grupo_id;
    v_cuantos := v_cuantos + 1;
  end loop;

  raise notice 'Aviso de pago puesto a % estudiante(s), con fecha límite %.',
               v_cuantos, v_limite;
end $$;


-- ---------------------------------------------------------------------------
-- MIRA ESTO ANTES DE DECIDIR A QUIÉN SE LE MANDA
-- ---------------------------------------------------------------------------
-- «Sin pago registrado» no significa «no ha pagado»: significa que no consta.
-- Y quien ya pagó este mes concreto no necesita el aviso.

select g.codigo as grupo,
       p.nombre_completo as estudiante,
       '$' || trim(to_char(g.costo, 'FM999G999D00')) || ' ' || g.moneda as importe,
       coalesce(pg.concepto, '— NO CONSTA NINGÚN PAGO —') as ultimo_pago,
       coalesce(to_char(pg.pagado_en at time zone 'America/Mexico_City', 'DD/MM/YYYY'), '—') as cuando,
       case
         when pg.id is null then 'Comprueba antes de cobrarle'
         else 'Le toca el mes siguiente'
       end as que_hacer,
       case when exists (select 1 from public.tutorias t where t.estudiante_id = p.id)
            then 'Sí, lo verá en su panel' else 'NO — hay que avisarle aparte' end as la_familia_tiene_cuenta
from public.inscripciones i
join public.grupos g   on g.id = i.grupo_id
join public.profiles p on p.id = i.estudiante_id
left join lateral (
  select * from public.pagos x where x.inscripcion_id = i.id
   order by x.pagado_en desc nulls last, x.created_at desc limit 1) pg on true
where i.estado in ('activa','pendiente')
order by g.codigo, p.nombre_completo;


-- Y a quién le quedó puesto el aviso.
select p.nombre_completo as estudiante, a.titulo,
       to_char(a.hasta, 'DD/MM/YYYY') as visible_hasta
from public.avisos a
join public.profiles p on p.id = a.estudiante_id
where a.titulo like 'Pago de %'
order by 1;
