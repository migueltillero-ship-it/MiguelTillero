-- ===========================================================================
-- PASAR LISTA DE UNA SESIÓN
-- ===========================================================================
-- Sirve para cualquier grupo y cualquier día. Se dice quién FALTÓ; el resto
-- del grupo queda presente. Es al revés de lo habitual a propósito: en un
-- grupo pequeño casi todos vienen, y escribir solo las ausencias es más
-- rápido y se equivoca menos.
--
-- Por qué un guion y no la interfaz: la asistencia es lo que alimenta el
-- porcentaje que ve la familia y lo que justifica una ausencia el día que
-- hay que reclamar algo. Hacerla a mano, sesión por sesión, es donde se
-- pierden los registros.
--
-- CÓMO USAR: cambia las cuatro líneas del bloque de abajo y ejecuta.
-- Es seguro repetirlo: corrige lo que hubiera, no duplica.
-- Dónde: Supabase → SQL Editor → New query → pegar → Run.
--
-- Los nombres no se guardan aquí: este archivo se publica con el sitio y los
-- estudiantes son menores. Se escriben al pegar, en el SQL Editor, y basta
-- con un trozo del nombre («Mart» vale por «Martínez»).
-- ===========================================================================

do $$
declare
  -- ── CAMBIA SOLO ESTAS CUATRO LÍNEAS ────────────────────────────────────
  v_codigo text   := 'CODIGO-DEL-GRUPO';
  v_fecha  date   := date 'AAAA-MM-DD';
  v_ausentes text[] := array['Nombre o trozo de nombre'];  -- quien NO vino
  v_justificadas text[] := array[]::text[];                -- de los de arriba,
                                                           -- con justificación
  -- ───────────────────────────────────────────────────────────────────────
  v_grupo  uuid;
  v_sesion uuid;
  v_sin_pareja text;
  r record;
  v_pres int := 0;
  v_aus  int := 0;
begin
  select g.id into v_grupo from public.grupos g where g.codigo = v_codigo;
  if v_grupo is null then
    raise exception 'No existe el grupo %.', v_codigo;
  end if;

  select s.id into v_sesion
    from public.sesiones s
   where s.grupo_id = v_grupo and s.fecha = v_fecha;
  if v_sesion is null then
    raise exception 'No hay sesión del % en el grupo %. Revisa la fecha.',
                    v_fecha, v_codigo;
  end if;

  -- Un nombre mal escrito es el error que no se nota: la persona quedaría
  -- marcada como presente y nadie lo vería. Mejor fallar aquí.
  select string_agg(x, ', ') into v_sin_pareja
    from unnest(v_ausentes || v_justificadas) as x
   where not exists (
     select 1 from public.inscripciones i
      join public.profiles p on p.id = i.estudiante_id
     where i.grupo_id = v_grupo and i.estado in ('activa','pendiente')
       and p.nombre_completo ilike '%' || x || '%');
  if v_sin_pareja is not null then
    raise exception 'En el grupo % no hay nadie que se llame así: %. '
                    'Revisa cómo lo has escrito.', v_codigo, v_sin_pareja;
  end if;

  for r in
    select i.estudiante_id,
           not exists (select 1 from unnest(v_ausentes) a
                        where p.nombre_completo ilike '%' || a || '%') as presente,
           exists (select 1 from unnest(v_justificadas) j
                    where p.nombre_completo ilike '%' || j || '%') as justificada
      from public.inscripciones i
      join public.profiles p on p.id = i.estudiante_id
     where i.grupo_id = v_grupo and i.estado in ('activa','pendiente')
  loop
    insert into public.asistencia (sesion_id, estudiante_id, presente, observacion)
    values (v_sesion, r.estudiante_id, r.presente,
            case when r.presente then null
                 when r.justificada then 'Ausencia justificada'
                 else null end)
    on conflict (sesion_id, estudiante_id)
    do update set presente    = excluded.presente,
                  observacion = excluded.observacion;
    if r.presente then v_pres := v_pres + 1; else v_aus := v_aus + 1; end if;
  end loop;

  raise notice 'Lista del % en %: % presentes, % ausentes.',
               v_fecha, v_codigo, v_pres, v_aus;
end $$;


-- ---------------------------------------------------------------------------
-- Comprobación: la lista de ese día
-- ---------------------------------------------------------------------------
-- Cambia el código y la fecha por los mismos de arriba.

select p.nombre_completo as estudiante,
       case when a.presente then 'Presente' else 'Ausente' end as estado,
       coalesce(a.observacion, '—') as observacion
from public.asistencia a
join public.sesiones s on s.id = a.sesion_id
join public.grupos g   on g.id = s.grupo_id and g.codigo = 'CODIGO-DEL-GRUPO'
join public.profiles p on p.id = a.estudiante_id
where s.fecha = date 'AAAA-MM-DD'
order by p.nombre_completo;


-- ---------------------------------------------------------------------------
-- Y el acumulado del ciclo, que es lo que de verdad importa
-- ---------------------------------------------------------------------------

select p.nombre_completo as estudiante,
       count(*) filter (where a.presente)     as presentes,
       count(*) filter (where not a.presente) as ausencias,
       round(100.0 * count(*) filter (where a.presente) / count(*)) || ' %' as asistencia
from public.asistencia a
join public.sesiones s on s.id = a.sesion_id
join public.grupos g   on g.id = s.grupo_id and g.codigo = 'CODIGO-DEL-GRUPO'
join public.profiles p on p.id = a.estudiante_id
group by p.nombre_completo
order by p.nombre_completo;
