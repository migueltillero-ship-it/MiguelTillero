-- ============================================================================
-- EVALUACIONES DE CIERRE · cada examen con su puntaje y su grupo de boletines
--
-- Hasta ahora las funciones de publicación daban por hecho el formato del
-- examen A1.4 (CO /15, CE /15, PE /20 = /50) y un único grupo de boletines.
-- Los exámenes de cierre del A1.4 y del B2 necesitan:
--   · su propio puntaje máximo por sección (el B2 es /25 + /25 + /25);
--   · sus propios boletines, con enlace nuevo, para no pisar los de la
--     evaluación de entrada.
--
-- Este archivo es GENÉRICO y no trae ninguna clave ni código de acceso.
-- Cada examen concreto (preguntas, clave, código) se carga aparte desde
-- supabase/privado/, que no se publica.
--
-- CÓMO USAR: ejecútalo DESPUÉS de boletines.sql y resultados-a1-4.sql.
-- Es seguro repetirlo.
-- ============================================================================

alter table public.examenes add column if not exists max_co numeric not null default 15;
alter table public.examenes add column if not exists max_ce numeric not null default 15;
alter table public.examenes add column if not exists max_pe numeric not null default 20;
-- Grupo de boletines donde se publican sus notas (texto libre, p. ej. 'A1.4-CIERRE').
alter table public.examenes add column if not exists grupo_boletin text;


-- ---------------------------------------------------------------------------
-- Publicar en los boletines, con el puntaje y el grupo de cada examen
-- ---------------------------------------------------------------------------
drop function if exists public.publicar_examen_en_boletines(text, text);
create function public.publicar_examen_en_boletines(p_examen text, p_grupo text default null)
returns jsonb
language plpgsql
security definer set search_path = public
as $$
declare
  ex public.examenes; it record; v_bol uuid; v_est uuid; v_n int := 0; v_grupo text;
begin
  if not (public.es_admin() or public.es_docente()) then
    raise exception 'SIN_PERMISO';
  end if;
  select * into ex from public.examenes where id = p_examen;
  if not found then raise exception 'EXAMEN_NO_EXISTE'; end if;
  v_grupo := coalesce(p_grupo, ex.grupo_boletin, 'A1-OCT2026');

  for it in select * from public.examenes_intentos
            where examen_id = p_examen and nota_final is not null loop
    v_bol := null; v_est := null;
    select b.id into v_bol from public.boletines b
    where b.grupo = v_grupo and lower(trim(b.email)) = lower(trim(it.email))
    limit 1;

    select p.id into v_est
    from public.profiles p join auth.users u on u.id = p.id
    where lower(trim(it.email)) in (lower(trim(u.email)), lower(trim(coalesce(p.representante_email, ''))))
    limit 1;

    if v_bol is null then
      insert into public.boletines (grupo, alumno, email, estudiante_id)
      values (v_grupo, trim(it.nombre), lower(trim(it.email)), v_est)
      returning id into v_bol;
    elsif v_est is not null then
      update public.boletines set estudiante_id = coalesce(estudiante_id, v_est) where id = v_bol;
    end if;

    insert into public.boletin_notas (boletin_id, prueba, titulo, nota, maxima, detalle, comentario, publicado_en)
    values (
      v_bol, 'escrita', ex.titulo, it.nota_final, ex.max_co + ex.max_ce + ex.max_pe,
      jsonb_build_object('partes', jsonb_build_array(
        jsonb_build_object('n', 'Compréhension orale',  'p', coalesce((it.puntaje_auto->'secciones'->>'co')::numeric, 0), 'm', ex.max_co),
        jsonb_build_object('n', 'Compréhension écrite', 'p', coalesce((it.puntaje_auto->'secciones'->>'ce')::numeric, 0), 'm', ex.max_ce),
        jsonb_build_object('n', 'Production écrite',    'p', coalesce((it.calif_pe->>'total')::numeric, 0), 'm', ex.max_pe)
      )),
      it.comentario, now())
    on conflict (boletin_id, prueba) do update
      set titulo = excluded.titulo, nota = excluded.nota, maxima = excluded.maxima,
          detalle = excluded.detalle, comentario = excluded.comentario, publicado_en = now();
    v_n := v_n + 1;
  end loop;

  return jsonb_build_object('publicadas', v_n, 'grupo', v_grupo);
end;
$$;
revoke all on function public.publicar_examen_en_boletines(text, text) from public, anon;
grant execute on function public.publicar_examen_en_boletines(text, text) to authenticated;


-- ---------------------------------------------------------------------------
-- Publicar en «Mis resultados», con el desglose de cada examen
-- ---------------------------------------------------------------------------
create or replace function public.publicar_resultados_examen(p_examen text)
returns jsonb
language plpgsql
security definer set search_path = public
as $$
declare
  ex public.examenes; ev record; it record;
  v_est uuid; v_n int;
  v_publicadas int := 0;
  v_pendientes jsonb := '[]'::jsonb;
begin
  if not (public.es_admin() or public.es_docente()) then
    raise exception 'SIN_PERMISO';
  end if;
  select * into ex from public.examenes where id = p_examen;

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
               (select c.id from candidatos c where (select count(*) from candidatos) = 1),
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
          jsonb_build_object('n', 'Compréhension orale',  'p', coalesce((it.puntaje_auto->'secciones'->>'co')::numeric, 0), 'm', ex.max_co),
          jsonb_build_object('n', 'Compréhension écrite', 'p', coalesce((it.puntaje_auto->'secciones'->>'ce')::numeric, 0), 'm', ex.max_ce),
          jsonb_build_object('n', 'Production écrite',    'p', coalesce((it.calif_pe->>'total')::numeric, 0), 'm', ex.max_pe)
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


-- Comprobación
select id, titulo, abierto, max_co, max_ce, max_pe, coalesce(grupo_boletin, '(A1-OCT2026)') as boletines
from public.examenes order by creado_en;
