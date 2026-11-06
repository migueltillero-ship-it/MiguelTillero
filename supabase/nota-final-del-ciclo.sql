-- ===========================================================================
-- LA NOTA DE DESEMPEÑO DEL CICLO
-- ===========================================================================
-- Hasta ahora la nota del ciclo salía solo del examen. Pero un examen es una
-- hora de la vida de un estudiante, y hay cosas que dicen más: si vino, si
-- trabajó en casa, si avisó cuando no pudo venir.
--
-- Esto junta las cuatro cosas en una sola nota:
--
--   1. El examen escrito del 3 de noviembre  (Entre quatre murs, partes 1 a 3)
--   2. El examen oral del 5 de noviembre     (Entre quatre murs, parte 4)
--   3. Las fichas de ejercicios de la plataforma
--   4. La asistencia al ciclo
--
-- LAS AUSENCIAS JUSTIFICADAS NO RESTAN
-- Quien avisa de que no puede venir está haciendo lo correcto, y penalizarlo
-- igual que a quien no aparece sin decir nada enseña justo lo contrario. El
-- cálculo descuenta esas sesiones del total en lugar de contarlas como falta.
-- Por eso valió la pena reconstruir la asistencia desde los mensajes: sin la
-- justificación escrita, esta regla no tendría de dónde agarrarse.
--
-- LO QUE PONGAS A MANO MANDA
-- Igual que con la nota de ejercicios: si cambias la nota en
-- panel-docente.html, el recálculo la respeta y no te la pisa. Puedes
-- recalcular cuantas veces quieras.
--
-- CÓMO USAR: pégalo entero. Después, cada vez que quieras actualizar:
--   select public.recalcular_desempeno('A1-OCT2026');
-- Dónde: Supabase → SQL Editor → New query → pegar → Run.
-- ===========================================================================


-- ---------------------------------------------------------------------------
-- 1) Los exámenes, con sus puntos de verdad
-- ---------------------------------------------------------------------------
-- «Entre quatre murs» vale 100 puntos repartidos en cuatro pruebas de 25.
-- Las tres primeras se aplicaron juntas el 3 (75 puntos) y la oral el 5
-- (25 puntos). En la base la colectiva figuraba sobre 50, así que cualquier
-- nota que se pusiera ahí se interpretaba mal.

update public.evaluaciones e
   set nota_maxima = 75,
       descripcion = 'Entre quatre murs · compréhension écrite (25) + lexique et '
                  || 'grammaire (25) + production écrite (25).'
 where e.nombre = 'Évaluation collective (cierre de ciclo)'
   and exists (select 1 from public.grupos g
                where g.curso_id = e.curso_id and g.codigo = 'A1-OCT2026');

update public.evaluaciones e
   set nota_maxima = 25,
       descripcion = 'Entre quatre murs · production orale, individuelle.'
 where e.nombre = 'Évaluation individuelle (cierre de ciclo)'
   and exists (select 1 from public.grupos g
                where g.curso_id = e.curso_id and g.codigo = 'A1-OCT2026');


-- ---------------------------------------------------------------------------
-- 2) La evaluación que guarda el desempeño
-- ---------------------------------------------------------------------------

do $$
declare
  v_curso uuid;
  v_nombre text := 'Desempeño final del ciclo';
begin
  select g.curso_id into v_curso from public.grupos g where g.codigo = 'A1-OCT2026';
  if v_curso is null then raise exception 'No existe el grupo A1-OCT2026.'; end if;

  if not exists (select 1 from public.evaluaciones e
                  where e.curso_id = v_curso and e.nombre = v_nombre) then
    insert into public.evaluaciones (curso_id, nombre, descripcion, fecha, ponderacion, nota_maxima)
    values (v_curso, v_nombre,
      'La nota del ciclo, sobre 100. Junta el examen escrito, el oral, el '
      'trabajo en la plataforma y la asistencia. Las ausencias avisadas no '
      'restan: se descuentan del total.',
      date '2026-11-08', null, 100);
  end if;
end $$;


-- ---------------------------------------------------------------------------
-- 3) El cálculo
-- ---------------------------------------------------------------------------

create or replace function public.recalcular_desempeno(p_grupo text)
returns table (estudiante text, escrito text, oral text, plataforma text,
               asistencia text, desempeno numeric, estado text)
language plpgsql security definer set search_path = public as $$
declare
  -- ── LOS PESOS. Cambia estos cuatro números si quieres otro reparto. ────
  v_p_escrito    numeric := 35;
  v_p_oral       numeric := 25;
  v_p_plataforma numeric := 25;
  v_p_asistencia numeric := 15;
  -- ───────────────────────────────────────────────────────────────────────
  v_quien text;
  v_curso uuid;
  v_eval uuid;
  r record;
begin
  -- La misma guarda que en recalcular_nota_ejercicios: dentro de una función
  -- «security definer» current_user es la dueña, no quien llama. Lo que dice
  -- quién llama es el ajuste «role».
  v_quien := coalesce(nullif(current_setting('role', true), 'none'), session_user);
  if not (public.es_docente() or public.es_admin()
          or v_quien in ('postgres', 'service_role', 'supabase_admin')) then
    raise exception 'Solo el docente puede recalcular el desempeño. (Entras como «%».)', v_quien;
  end if;

  if v_p_escrito + v_p_oral + v_p_plataforma + v_p_asistencia <> 100 then
    raise exception 'Los pesos suman % y tienen que sumar 100.',
                    v_p_escrito + v_p_oral + v_p_plataforma + v_p_asistencia;
  end if;

  select g.curso_id into v_curso from public.grupos g where g.codigo = p_grupo;
  if v_curso is null then raise exception 'No existe el grupo %.', p_grupo; end if;

  select e.id into v_eval from public.evaluaciones e
   where e.curso_id = v_curso and e.nombre = 'Desempeño final del ciclo';
  if v_eval is null then
    raise exception 'Falta la evaluación de desempeño. Ejecuta antes el bloque 2.';
  end if;

  for r in
    with alumnos as (
      select i.estudiante_id, p.nombre_completo
        from public.inscripciones i
        join public.grupos g on g.id = i.grupo_id and g.codigo = p_grupo
        join public.profiles p on p.id = i.estudiante_id
       where i.estado in ('activa','pendiente')
    ),
    -- Cada examen, en porcentaje sobre su propio máximo.
    examen as (
      select a.estudiante_id,
             max(case when ev.nombre like 'Évaluation collective%'
                      then round(100.0 * n.calificacion / nullif(ev.nota_maxima,0), 1) end) as escrito,
             max(case when ev.nombre like 'Évaluation individuelle%'
                      then round(100.0 * n.calificacion / nullif(ev.nota_maxima,0), 1) end) as oral
        from alumnos a
        left join public.notas n on n.estudiante_id = a.estudiante_id
        left join public.evaluaciones ev on ev.id = n.evaluacion_id
                 and ev.curso_id = v_curso and ev.fecha >= date '2026-11-01'
       group by 1
    ),
    -- La plataforma: la nota que ya calcula recalcular_nota_ejercicios.
    plataforma as (
      select a.estudiante_id, n.calificacion as nota
        from alumnos a
        left join public.evaluaciones ev
               on ev.curso_id = v_curso
              and ev.nombre = 'Exercices complémentaires — travail à la maison'
        left join public.notas n
               on n.evaluacion_id = ev.id and n.estudiante_id = a.estudiante_id
    ),
    -- La asistencia, sin contar las ausencias avisadas.
    presencia as (
      select a.estudiante_id,
             count(*) filter (where asi.presente) as vino,
             count(*) filter (where not asi.presente and asi.observacion is not null) as avisadas,
             count(asi.id) as total
        from alumnos a
        left join public.asistencia asi on asi.estudiante_id = a.estudiante_id
        left join public.sesiones s on s.id = asi.sesion_id
        left join public.grupos g on g.id = s.grupo_id and g.codigo = p_grupo
       group by 1
    )
    select a.estudiante_id, a.nombre_completo,
           e.escrito, e.oral, pl.nota as plataforma,
           pr.vino, pr.avisadas, pr.total,
           case when pr.total - pr.avisadas > 0
                then round(100.0 * pr.vino / (pr.total - pr.avisadas), 1) end as pct_asistencia
      from alumnos a
      join examen e     on e.estudiante_id = a.estudiante_id
      join plataforma pl on pl.estudiante_id = a.estudiante_id
      join presencia pr  on pr.estudiante_id = a.estudiante_id
  loop
    declare
      v_nota numeric;
      v_falta text[] := array[]::text[];
      v_detalle jsonb;
    begin
      -- Lo que todavía no está puesto se dice, no se cuenta como cero: una
      -- nota de desempeño con el oral sin corregir no es una nota baja, es
      -- una nota incompleta, y confundirlas es injusto.
      if r.escrito is null then v_falta := v_falta || 'el examen escrito'::text; end if;
      if r.oral    is null then v_falta := v_falta || 'el examen oral'::text; end if;
      if r.pct_asistencia is null then v_falta := v_falta || 'la asistencia'::text; end if;

      v_nota := round(
          coalesce(r.escrito, 0)        * v_p_escrito    / 100
        + coalesce(r.oral, 0)           * v_p_oral       / 100
        + coalesce(r.plataforma, 0)     * v_p_plataforma / 100
        + coalesce(r.pct_asistencia, 0) * v_p_asistencia / 100, 1);

      v_detalle := jsonb_build_object(
        'origen', 'automatico', 'calculado', now(), 'nota_automatica', v_nota,
        'escrito', r.escrito, 'oral', r.oral, 'plataforma', r.plataforma,
        'asistencia', jsonb_build_object('vino', r.vino, 'de', r.total - r.avisadas,
                                         'avisadas', r.avisadas, 'pct', r.pct_asistencia),
        'pesos', jsonb_build_object('escrito', v_p_escrito, 'oral', v_p_oral,
                                    'plataforma', v_p_plataforma, 'asistencia', v_p_asistencia));

      estudiante := r.nombre_completo;
      escrito    := coalesce(r.escrito::text || ' %', 'sin corregir');
      oral       := coalesce(r.oral::text || ' %', 'sin corregir');
      plataforma := coalesce(r.plataforma::text || ' %', 'sin datos');
      asistencia := coalesce(r.vino || ' de ' || (r.total - r.avisadas)
                             || case when r.avisadas > 0
                                     then ' (' || r.avisadas || ' avisada' ||
                                          case when r.avisadas > 1 then 's' else '' end || ')'
                                     else '' end, 'sin datos');

      -- ¿La tocó el docente?
      if exists (select 1 from public.notas n
                  where n.evaluacion_id = v_eval and n.estudiante_id = r.estudiante_id
                    and n.detalle ? 'nota_automatica'
                    and n.calificacion is distinct from (n.detalle->>'nota_automatica')::numeric)
      then
        select n.calificacion into desempeno from public.notas n
         where n.evaluacion_id = v_eval and n.estudiante_id = r.estudiante_id;
        estado := 'la pusiste tú — no se toca';
        return next; continue;
      end if;

      -- UNA NOTA INCOMPLETA NO SE PUBLICA.
      -- Los paneles de estudiante y de representante enseñan todo lo que hay en
      -- «notas». Con el oral sin corregir, esta cuenta da 15 sobre 100 a quien
      -- viene a todas las clases: no es una nota baja, es una nota que todavía
      -- no existe, y una familia que la lee solo entiende «15». Se enseña aquí,
      -- en el resultado, y no se guarda hasta que esté completa. Si una
      -- anterior ya se guardó incompleta, se retira (solo la automática: lo que
      -- hayas puesto tú a mano no se toca).
      if array_length(v_falta, 1) is not null then
        delete from public.notas n
         where n.evaluacion_id = v_eval and n.estudiante_id = r.estudiante_id
           and n.detalle ? 'nota_automatica'
           and n.calificacion is not distinct from (n.detalle->>'nota_automatica')::numeric;
        desempeno := v_nota;
        estado := 'provisional, NO se publica: falta ' || array_to_string(v_falta, ' y ');
        return next; continue;
      end if;

      insert into public.notas (evaluacion_id, estudiante_id, calificacion, comentario, detalle)
      values (v_eval, r.estudiante_id, v_nota,
        'Escrito ' || coalesce(r.escrito::text || '%','por corregir')
        || ' · Oral ' || coalesce(r.oral::text || '%','por corregir')
        || ' · Plataforma ' || coalesce(r.plataforma::text || '%','0%')
        || ' · Asistencia ' || coalesce(r.pct_asistencia::text || '%','sin datos')
        || case when r.avisadas > 0 then ' (con ' || r.avisadas
                || ' ausencia avisada, que no resta)' else '' end,
        v_detalle)
      on conflict (evaluacion_id, estudiante_id)
      do update set calificacion = excluded.calificacion,
                    comentario   = excluded.comentario,
                    detalle      = excluded.detalle;

      desempeno := v_nota;
      estado := 'completa y publicada';
      return next;
    end;
  end loop;
end $$;

revoke all on function public.recalcular_desempeno(text) from public;
grant execute on function public.recalcular_desempeno(text) to authenticated;


-- ---------------------------------------------------------------------------
-- Comprobación
-- ---------------------------------------------------------------------------

select * from public.recalcular_desempeno('A1-OCT2026');
