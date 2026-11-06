-- ===========================================================================
-- A1.4 · LA ASISTENCIA DEL CICLO, RECONSTRUIDA DESDE LOS CHATS
-- ===========================================================================
-- La lista no se había pasado en todo el ciclo, salvo tres días. Reconstruirla
-- de memoria es donde se cometen las injusticias: se olvida quién avisó y se
-- marca como falta lo que fue una ausencia justificada con dos días de
-- antelación.
--
-- Esto sale de los mensajes de WhatsApp del ciclo, con fecha y hora. Donde el
-- chat no dice nada, se marca presente: en un grupo de dos personas que avisan
-- siempre que faltan, el silencio significa que vinieron.
--
-- LO QUE EL CHAT DEMUESTRA
--   15/10  Annette avisa a las 17:53 que no podrá asistir. Isaac sí viene
--          («en séance privé»).
--   27/10  Isaac avisa, dos días antes, que el jueves no podrá venir porque
--          tiene un compromiso. Se le responde «Merci de m'avoir prévenu».
--   29/10  Es esa ausencia. Queda justificada, no como falta sin más.
--   03/11  Los dos confirman por el grupo: Isaac presencial, Annette en línea.
--   05/11  Isaac viene presencial, Annette participa.
--
-- CÓMO USAR: pégalo entero. Es seguro repetirlo.
-- Dónde: Supabase → SQL Editor → New query → pegar → Run.
-- ===========================================================================

do $$
declare
  v_grupo uuid;
  r record;
  v_sesion uuid;
  v_id uuid;
  v_puestos integer := 0;
begin
  select g.id into v_grupo from public.grupos g where g.codigo = 'A1-OCT2026';
  if v_grupo is null then raise exception 'No existe el grupo A1-OCT2026.'; end if;

  for r in
    select * from (values
      -- fecha,        quién falta,  motivo (null = vinieron los dos)
      (date '2026-09-29', null::text, null::text),
      (date '2026-10-01', null, null),
      (date '2026-10-06', null, null),
      (date '2026-10-08', null, null),
      (date '2026-10-13', null, null),
      (date '2026-10-15', 'Annette', 'Avisó el mismo día por la tarde'),
      (date '2026-10-20', null, null),
      (date '2026-10-22', null, null),
      (date '2026-10-27', null, null),
      (date '2026-10-29', 'Isaac',   'Avisó con dos días de antelación: compromiso personal'),
      (date '2026-11-03', null, null),
      (date '2026-11-05', null, null)
    ) as t(fecha, ausente, motivo)
  loop
    select s.id into v_sesion from public.sesiones s
     where s.grupo_id = v_grupo and s.fecha = r.fecha;
    if v_sesion is null then
      raise notice 'No hay sesión del %: se omite.', r.fecha;
      continue;
    end if;

    v_id := null;
    if r.ausente is not null then
      select p.id into v_id
        from public.inscripciones i
        join public.profiles p on p.id = i.estudiante_id
       where i.grupo_id = v_grupo and i.estado in ('activa','pendiente')
         and p.nombre_completo ilike '%' || r.ausente || '%';
      if v_id is null then
        raise exception 'No encuentro a «%» en el grupo. Revisa el nombre.', r.ausente;
      end if;
    end if;

    insert into public.asistencia (sesion_id, estudiante_id, presente, observacion)
    select v_sesion, i.estudiante_id,
           (v_id is null or i.estudiante_id <> v_id),
           case when i.estudiante_id = v_id then r.motivo end
      from public.inscripciones i
     where i.grupo_id = v_grupo and i.estado in ('activa','pendiente')
    on conflict (sesion_id, estudiante_id)
    do update set presente = excluded.presente, observacion = excluded.observacion;
    v_puestos := v_puestos + 1;
  end loop;

  raise notice 'Lista pasada en % sesiones del ciclo A1.4.', v_puestos;
end $$;


-- ---------------------------------------------------------------------------
-- Comprobación: el ciclo entero, como lo verá la familia
-- ---------------------------------------------------------------------------

select to_char(s.fecha,'TMDy DD/MM') as dia,
       p.nombre_completo as estudiante,
       case when a.presente then 'Presente' else 'No asistió' end as estado,
       coalesce(a.observacion,'') as justificacion
from public.asistencia a
join public.sesiones s on s.id = a.sesion_id
join public.grupos g on g.id = s.grupo_id and g.codigo = 'A1-OCT2026'
join public.profiles p on p.id = a.estudiante_id
order by s.fecha, p.nombre_completo;

select p.nombre_completo as estudiante,
       count(*) filter (where a.presente) || ' de ' || count(*) as asistencia,
       round(100.0 * count(*) filter (where a.presente) / count(*)) || ' %' as porcentaje,
       count(*) filter (where not a.presente and a.observacion is not null) as faltas_justificadas
from public.asistencia a
join public.sesiones s on s.id = a.sesion_id
join public.grupos g on g.id = s.grupo_id and g.codigo = 'A1-OCT2026'
join public.profiles p on p.id = a.estudiante_id
group by 1 order by 1;
