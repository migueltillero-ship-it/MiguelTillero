-- ============================================================================
-- RESULTADOS DE LA EVALUACIÓN A1.4 · «Chez les Moreau»
--
-- Lleva las dos pruebas del ciclo anterior (Unités 1 a 4) a «Mis resultados»
-- del estudiante, que es lo que también ve su representante:
--
--   · Prueba escrita (colectiva, en línea con Sentinelle) ........ / 50
--       compréhension orale /15 · compréhension écrite /15 · production écrite /20
--   · Prueba oral (individual, evaluaciones/a1-4/oral.html) ....... / 25
--
-- 1) notas.detalle guarda el desglose por partes, para que la nota se
--    entienda y no sea solo un número.
-- 2) evaluaciones.examen_id enlaza una evaluación del curso con un examen
--    de Sentinelle.
-- 3) publicar_resultados_examen() pasa las notas ya revisadas de Sentinelle a
--    la tabla notas, emparejando por el correo con el que el alumno hizo la
--    prueba (el de su cuenta o el de su representante).
--
-- CÓMO USAR: ejecútalo DESPUÉS de evaluaciones-sentinelle.sql y
-- representante-y-enlaces.sql. Es seguro repetirlo.
-- ============================================================================

alter table public.notas add column if not exists detalle jsonb;
alter table public.evaluaciones add column if not exists examen_id text
  references public.examenes(id) on delete set null;


-- ---------------------------------------------------------------------------
-- 1. Las dos evaluaciones, en el curso del grupo A1-OCT2026
-- ---------------------------------------------------------------------------

do $$
declare
  v_curso_id uuid;
begin
  select g.curso_id into v_curso_id from public.grupos g where g.codigo = 'A1-OCT2026';
  if v_curso_id is null then
    raise exception 'No existe el grupo A1-OCT2026. Ejecuta antes ciclo-a1-oct2026.sql.';
  end if;

  if not exists (select 1 from public.evaluaciones
                 where curso_id = v_curso_id and nombre = 'A1.4 · Prueba escrita · Chez les Moreau') then
    insert into public.evaluaciones (curso_id, nombre, fecha, nota_maxima, examen_id)
    values (v_curso_id, 'A1.4 · Prueba escrita · Chez les Moreau', date '2026-10-01', 50, 'a14-chez-les-moreau');
  end if;

  if not exists (select 1 from public.evaluaciones
                 where curso_id = v_curso_id and nombre = 'A1.4 · Prueba oral · Chez les Moreau') then
    insert into public.evaluaciones (curso_id, nombre, fecha, nota_maxima)
    values (v_curso_id, 'A1.4 · Prueba oral · Chez les Moreau', date '2026-10-01', 25);
  end if;

  update public.evaluaciones set nota_maxima = 50, examen_id = 'a14-chez-les-moreau',
    descripcion = 'Evaluación del ciclo anterior (Unités 1 a 4), en línea: compréhension orale, compréhension écrite y production écrite.'
  where curso_id = v_curso_id and nombre = 'A1.4 · Prueba escrita · Chez les Moreau';

  update public.evaluaciones set nota_maxima = 25,
    descripcion = 'Evaluación del ciclo anterior (Unités 1 a 4), individual con el profesor: entretien dirigé, échange d''informations y dialogue simulé, con grilla tipo DELF A1.'
  where curso_id = v_curso_id and nombre = 'A1.4 · Prueba oral · Chez les Moreau';
end $$;


-- ---------------------------------------------------------------------------
-- 2. Publicar los resultados de un examen de Sentinelle
-- ---------------------------------------------------------------------------
-- Solo pasan los intentos con nota_final (es decir, ya revisados en el panel).
-- Se empareja con los estudiantes inscritos en el curso de la evaluación, por
-- el correo de su cuenta o el de su representante. Si un correo corresponde a
-- dos hermanos, se desempata por el nombre escrito en la prueba; si aun así
-- no se puede, se informa y no se publica.

create or replace function public.publicar_resultados_examen(p_examen text)
returns jsonb
language plpgsql
security definer set search_path = public
as $$
declare
  ev record; it record;
  v_est uuid; v_n int;
  v_publicadas int := 0;
  v_pendientes jsonb := '[]'::jsonb;
begin
  if not (public.es_admin() or public.es_docente()) then
    raise exception 'SIN_PERMISO';
  end if;

  for ev in select e.id, e.curso_id from public.evaluaciones e where e.examen_id = p_examen loop
    if not (public.es_admin() or public.es_docente_del_curso(ev.curso_id)) then
      continue;
    end if;

    for it in
      select * from public.examenes_intentos
      where examen_id = p_examen and nota_final is not null
    loop
      with candidatos as (
        select p.id, p.nombre_completo
        from public.inscripciones i
        join public.profiles p on p.id = i.estudiante_id
        join auth.users u on u.id = p.id
        where i.curso_id = ev.curso_id
          and i.estado in ('activa', 'finalizada')
          and lower(trim(it.email)) in (lower(trim(u.email)), lower(trim(coalesce(p.representante_email, ''))))
      )
      select count(*),
             coalesce(
               (select c.id from candidatos c
                where (select count(*) from candidatos) = 1),
               (select c.id from candidatos c
                where lower(c.nombre_completo) like '%' || lower(split_part(trim(it.nombre), ' ', 1)) || '%'
                limit 1))
        into v_n, v_est
      from candidatos;

      if v_est is null then
        v_pendientes := v_pendientes || jsonb_build_object(
          'nombre', it.nombre, 'email', it.email,
          'motivo', case when v_n = 0 then 'No coincide con ningún estudiante del curso'
                         else 'El correo corresponde a varios estudiantes' end);
        continue;
      end if;

      insert into public.notas (evaluacion_id, estudiante_id, calificacion, comentario, detalle)
      values (
        ev.id, v_est, it.nota_final, it.comentario,
        jsonb_build_object('partes', jsonb_build_array(
          jsonb_build_object('n', 'Compréhension orale',  'p', coalesce((it.puntaje_auto->'secciones'->>'co')::numeric, 0), 'm', 15),
          jsonb_build_object('n', 'Compréhension écrite', 'p', coalesce((it.puntaje_auto->'secciones'->>'ce')::numeric, 0), 'm', 15),
          jsonb_build_object('n', 'Production écrite',    'p', coalesce((it.calif_pe->>'total')::numeric, 0), 'm', 20)
        ))
      )
      on conflict (evaluacion_id, estudiante_id) do update
        set calificacion = excluded.calificacion,
            comentario   = excluded.comentario,
            detalle      = excluded.detalle;

      v_publicadas := v_publicadas + 1;
    end loop;
  end loop;

  return jsonb_build_object('publicadas', v_publicadas, 'pendientes', v_pendientes);
end;
$$;

revoke all on function public.publicar_resultados_examen(text) from public, anon;
grant execute on function public.publicar_resultados_examen(text) to authenticated;


-- ============================================================================
-- COMPROBACIÓN
-- ============================================================================
select e.nombre, e.nota_maxima, e.examen_id, count(n.id) as notas_cargadas
from public.evaluaciones e
join public.grupos g on g.curso_id = e.curso_id and g.codigo = 'A1-OCT2026'
left join public.notas n on n.evaluacion_id = e.id
where e.nombre like 'A1.4 ·%'
group by e.nombre, e.nota_maxima, e.examen_id
order by e.nombre;
