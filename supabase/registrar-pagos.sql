-- ===========================================================================
-- REGISTRAR UN PAGO QUE YA SE HIZO
-- ===========================================================================
-- Un pago que no consta es peor que un pago que no se hizo: la familia
-- recibe recordatorios de algo que ya pagó, y la confianza se gasta rápido.
--
-- Esto anota pagos hechos fuera de la plataforma (transferencia, efectivo,
-- depósito) para que dejen de aparecer como pendientes y para que el
-- histórico sirva de algo cuando haya que reclamar o justificar.
--
-- El importe no se escribe: sale del grupo en el que está inscrita cada
-- persona, así que no hay forma de teclearlo mal.
--
-- CÓMO USAR: cambia la tabla de abajo y ejecuta. Es seguro repetirlo:
-- reconoce el pago por su concepto y lo actualiza en vez de duplicarlo.
-- Dónde: Supabase → SQL Editor → New query → pegar → Run.
-- ===========================================================================

do $$
declare
  r record;
  v_insc uuid;
  v_costo numeric;
  v_moneda text;
  v_cuantos integer;
  v_hechos integer := 0;
begin
  for r in
    -- ── CAMBIA ESTA TABLA ──────────────────────────────────────────────
    --    quién · qué se pagó · cuándo (null si no se sabe) · importe (null = el del grupo)
    select * from (values
      ('Annette',  'Ciclo Français A1.4 — Défi 1',        date '2026-09-29', null::numeric),
      ('MELISSA',  'Bimestre oct-nov 2026 · Français B2', date '2026-10-06', null),
      -- Tarifa especial de los hermanos, solo este ciclo: 1 900 cada uno en
      -- lugar de 2 300. El papá pagó por los dos juntos y no consta el día:
      -- no se inventa. Con la fecha en null el pago queda como cubierto y la
      -- fecha se completa el día que aparezca el comprobante.
      -- Sebastián se añade aquí en cuanto cree su cuenta.
      ('Rothman',  'Bimestre oct-nov 2026 · Français B2 · tarifa especial hermanos', null::date, 1900)
    ) as t(quien, concepto, cuando, importe)
    -- ───────────────────────────────────────────────────────────────────
  loop
    select count(*), min(i.id::text)::uuid, min(g.costo), min(g.moneda)
      into v_cuantos, v_insc, v_costo, v_moneda
      from public.inscripciones i
      join public.grupos g on g.id = i.grupo_id
      join public.profiles p on p.id = i.estudiante_id
     where i.estado in ('activa','pendiente')
       and p.nombre_completo ilike '%' || r.quien || '%';

    if v_cuantos <> 1 then
      raise exception 'A «%» le corresponden % inscripciones activas. '
                      'Con cero no hay dónde anotar el pago; con varias, no '
                      'sé en cuál va.', r.quien, v_cuantos;
    end if;

    -- El concepto es lo que identifica el pago: si ya estaba anotado, se
    -- corrige; si no, se crea. Así repetir el guion no cobra dos veces.
    -- Una tarifa especial manda sobre la del grupo.
    v_costo := coalesce(r.importe, v_costo);

    if exists (select 1 from public.pagos pg
                where pg.inscripcion_id = v_insc and pg.concepto = r.concepto) then
      -- coalesce: si ya hay una fecha y aquí va vacía, no se la borra.
      update public.pagos
         set monto = v_costo, moneda = v_moneda, estado = 'pagado',
             pagado_en = coalesce(r.cuando, pagado_en), updated_at = now()
       where inscripcion_id = v_insc and concepto = r.concepto;
    else
      insert into public.pagos (inscripcion_id, monto, moneda, concepto, estado, metodo, pagado_en)
      values (v_insc, v_costo, v_moneda, r.concepto, 'pagado', 'manual', r.cuando);
      v_hechos := v_hechos + 1;
    end if;

    raise notice '% · % · $% %', r.quien, r.concepto, v_costo, v_moneda;
  end loop;

  raise notice 'Listo: % pago(s) nuevo(s) anotado(s).', v_hechos;
end $$;


-- ---------------------------------------------------------------------------
-- Comprobación: quién ha pagado qué, y qué queda
-- ---------------------------------------------------------------------------

select g.codigo as grupo,
       p.nombre_completo as estudiante,
       coalesce(string_agg(pg.concepto || ' (' || coalesce(to_char(pg.pagado_en,'DD/MM/YYYY'), 'fecha sin confirmar')
                           || ') $' || trim(to_char(pg.monto,'FM999G999D00')),
                           E'\n' order by pg.pagado_en), '— nada registrado —') as pagos,
       '$' || trim(to_char(g.costo,'FM999G999D00')) || ' ' || g.moneda as cuota_del_ciclo
from public.inscripciones i
join public.grupos g   on g.id = i.grupo_id
join public.profiles p on p.id = i.estudiante_id
left join public.pagos pg on pg.inscripcion_id = i.id and pg.estado = 'pagado'
where i.estado in ('activa','pendiente')
group by g.codigo, p.nombre_completo, g.costo, g.moneda
order by 1, 2;
