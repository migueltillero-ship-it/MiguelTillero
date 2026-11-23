-- ===========================================================================
-- REVISIÓN AUTÓNOMA DEL B2: LOS RESULTADOS LLEGAN A LA PLATAFORMA Y A SUS NOTAS
-- ===========================================================================
-- Cuando la clase de revisión se trabaja sin el profesor en directo
-- (estudiantes/b2-revision-autonome.html), el estudiante entra con su cuenta, hace
-- los pasos y pulsa «Enviar mis resultados». Esto guarda:
--   · su envío completo (respuestas, tiempo, texto escrito) en revision_autonoma_envios;
--   · una fila en `notas` de la evaluación «Révision générale — travail autonome»,
--     con la nota SUGERIDA dentro de `detalle`, pero SIN calificación.
--
-- Por qué la calificación queda vacía: el disparador fn_nota_devuelta marca una nota
-- como «devuelta» (visible para el estudiante) en cuanto tiene calificación. El quiz
-- se corrige a sí mismo (cada quien marca si acertó) y el texto lo evalúa el
-- docente, así que la nota la fija Miguel y solo entonces la ve la persona.
--
-- La evaluación NO tiene ponderación: es formativa, como el «Exposé», y no cambia el
-- peso de las evaluaciones de cierre (40 % + 60 %). Si algún día debe pesar, basta
-- con ponerle ponderación a la evaluación.
--
-- Nota sugerida sobre 20:  4 de participación (rappel 2 + lecture éclair 2)
--                        + 10 del quiz (puntos propios sobre 28)
--                        + 3 del texto si cumple lo pedido (≥ 40 palabras y ≥ 2
--                          estructuras); los otros 3 son del juicio del docente.
--
-- CÓMO USAR: Supabase → SQL Editor → pegar → Run. Es seguro repetirlo.
--   https://supabase.com/dashboard/project/yfrdlzveleevkjqekdoq/sql/new
-- Después de revisar los textos, para dar la nota sugerida a todos los pendientes:
--   select * from public.calificar_revision_autonoma();
-- o a una sola persona:  select * from public.calificar_revision_autonoma('<id del estudiante>');
-- ===========================================================================

-- 1. La evaluación (sin ponderación) en el curso B2.
insert into public.evaluaciones (curso_id, nombre, fecha, ponderacion, nota_maxima, descripcion)
select c.id, 'Révision générale — travail autonome', date '2026-11-19', null, 20,
       'Revisión del ciclo trabajada de forma autónoma: rappel, quiz, lectura relámpago y texto escrito. Formativa, sin ponderación.'
  from public.cursos c
 where c.nombre = 'Français B2'
   and not exists (select 1 from public.evaluaciones e where e.curso_id = c.id and e.nombre = 'Révision générale — travail autonome');

-- 2. El envío completo.
create table if not exists public.revision_autonoma_envios (
  estudiante_id  uuid not null references public.profiles(id),
  evaluacion_id  uuid not null references public.evaluaciones(id),
  nombre         text,
  rappel         boolean not null default false,
  lectura        boolean not null default false,
  quiz_resp      integer not null default 0,
  quiz_pts       integer not null default 0,
  boss_pts       integer not null default 0,
  palabras       integer not null default 0,
  estructuras    integer not null default 0,
  tema           text,
  texto          text,
  respuestas     jsonb not null default '{}'::jsonb,
  nota_sugerida  numeric(4,1),
  enviado_en     timestamptz not null default now(),
  actualizado_en timestamptz not null default now(),
  primary key (estudiante_id, evaluacion_id)
);
alter table public.revision_autonoma_envios enable row level security;

do $$ begin
  if not exists (select 1 from pg_policies where tablename='revision_autonoma_envios' and policyname='revision autonoma: cada quien la suya') then
    create policy "revision autonoma: cada quien la suya" on public.revision_autonoma_envios
      for select to authenticated using (estudiante_id = auth.uid() or public.es_docente() or public.es_admin());
  end if;
end $$;
-- Sin políticas de escritura: solo se escribe por las funciones de abajo.

-- 3. Envío del estudiante.
create or replace function public.enviar_revision_autonoma(p_datos jsonb)
returns jsonb language plpgsql security definer set search_path = public as $$
declare
  v_uid uuid := auth.uid();
  v_eval uuid;
  v_quiz_resp int; v_quiz_pts int; v_boss_pts int; v_pal int; v_est int;
  v_rap boolean; v_lec boolean; v_texto text; v_nota numeric;
  v_participa numeric; v_quiz numeric; v_escr numeric;
begin
  if v_uid is null then raise exception 'Hay que iniciar sesión.'; end if;

  -- Solo quien está inscrito en el B2.
  if not exists (select 1 from public.inscripciones i join public.grupos g on g.id = i.grupo_id
                  where i.estudiante_id = v_uid and i.estado in ('activa','pendiente') and g.codigo like 'B2%') then
    raise exception 'Esta actividad es del grupo B2.';
  end if;

  select e.id into v_eval from public.evaluaciones e join public.cursos c on c.id = e.curso_id
   where c.nombre = 'Français B2' and e.nombre = 'Révision générale — travail autonome';
  if v_eval is null then raise exception 'Falta la evaluación de la revisión autónoma.'; end if;

  -- Lo que llega del navegador se acota: no se confía en cifras fuera de rango.
  v_quiz_resp := least(greatest(coalesce((p_datos->>'quiz_resp')::int, 0), 0), 20);
  v_quiz_pts  := least(greatest(coalesce((p_datos->>'quiz_pts')::int, 0), 0), 28);
  v_boss_pts  := least(greatest(coalesce((p_datos->>'boss_pts')::int, 0), 0), 14);
  v_pal       := least(greatest(coalesce((p_datos->>'palabras')::int, 0), 0), 2000);
  v_est       := least(greatest(coalesce((p_datos->>'estructuras')::int, 0), 0), 6);
  v_rap       := coalesce((p_datos->>'rappel')::boolean, false);
  v_lec       := coalesce((p_datos->>'lectura')::boolean, false);
  v_texto     := left(coalesce(p_datos->>'texto', ''), 6000);

  v_participa := (case when v_rap then 2 else 0 end) + (case when v_lec then 2 else 0 end);
  v_quiz      := round(10.0 * v_quiz_pts / 28, 1);
  v_escr      := case when v_pal >= 40 and v_est >= 2 then 3 else 0 end;
  v_nota      := v_participa + v_quiz + v_escr;

  insert into public.revision_autonoma_envios
    (estudiante_id, evaluacion_id, nombre, rappel, lectura, quiz_resp, quiz_pts, boss_pts, palabras, estructuras, tema, texto, respuestas, nota_sugerida)
  values (v_uid, v_eval, left(p_datos->>'nombre', 120), v_rap, v_lec, v_quiz_resp, v_quiz_pts, v_boss_pts, v_pal, v_est,
          left(p_datos->>'tema', 20), v_texto, coalesce(p_datos->'respuestas', '{}'::jsonb), v_nota)
  on conflict (estudiante_id, evaluacion_id) do update set
    nombre = excluded.nombre, rappel = excluded.rappel, lectura = excluded.lectura, quiz_resp = excluded.quiz_resp,
    quiz_pts = excluded.quiz_pts, boss_pts = excluded.boss_pts, palabras = excluded.palabras, estructuras = excluded.estructuras,
    tema = excluded.tema, texto = excluded.texto, respuestas = excluded.respuestas, nota_sugerida = excluded.nota_sugerida,
    actualizado_en = now();

  -- La fila en `notas`, sin calificación (ver arriba). Si el docente ya la calificó, no se toca.
  insert into public.notas (evaluacion_id, estudiante_id, calificacion, detalle)
  values (v_eval, v_uid, null, jsonb_build_object('tipo','revision_autonoma','nota_sugerida',v_nota,
            'participacion',v_participa,'quiz',v_quiz,'escritura_base',v_escr,'escritura_pendiente_docente',3))
  on conflict (evaluacion_id, estudiante_id) do update set detalle = excluded.detalle
   where public.notas.calificacion is null;

  return jsonb_build_object('ok', true, 'recibido_en', now());
end $$;
revoke all on function public.enviar_revision_autonoma(jsonb) from public, anon;
grant execute on function public.enviar_revision_autonoma(jsonb) to authenticated;

-- 4. El docente da la nota (la sugerida) a quien la tenga pendiente.
create or replace function public.calificar_revision_autonoma(p_estudiante uuid default null)
returns table (estudiante text, nota numeric)
language plpgsql security definer set search_path = public as $$
begin
  if not (public.es_docente() or public.es_admin()
          or coalesce(nullif(current_setting('role', true), 'none'), session_user) in ('postgres','service_role','supabase_admin')) then
    raise exception 'Solo el docente puede calificar.';
  end if;
  return query
  with eval as (
    select e.id from public.evaluaciones e join public.cursos c on c.id = e.curso_id
     where c.nombre = 'Français B2' and e.nombre = 'Révision générale — travail autonome'),
  up as (
    update public.notas n
       set calificacion = (n.detalle->>'nota_sugerida')::numeric,
           comentario = coalesce(n.comentario, 'Révision autonome : participation, quiz et texte écrit. Merci pour ton travail !')
      from eval
     where n.evaluacion_id = eval.id and n.calificacion is null and n.detalle ? 'nota_sugerida'
       and (p_estudiante is null or n.estudiante_id = p_estudiante)
    returning n.estudiante_id, n.calificacion)
  select p.nombre_completo, up.calificacion from up join public.profiles p on p.id = up.estudiante_id;
end $$;
revoke all on function public.calificar_revision_autonoma(uuid) from public, anon;
grant execute on function public.calificar_revision_autonoma(uuid) to authenticated;
