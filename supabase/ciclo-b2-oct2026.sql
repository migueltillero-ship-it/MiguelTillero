-- ============================================================================
-- CICLO B2 · OCTUBRE 2026 — Français B2 (grupo «B2 virtuel»)
--
-- Las mismas funciones que el grupo A1: curso, grupo con su costo, horario,
-- las 12 sesiones del ciclo, el enlace de Zoom, las evaluaciones de cierre,
-- y los accesos en «Materiales». Los boletines y el libro virtual funcionan
-- solos en cuanto existe el grupo.
--
-- Ciclo: 6 semanas = 12 clases, lunes y miércoles de 19:00 a 20:30,
-- del lunes 5 de octubre al miércoles 11 de noviembre de 2026.
-- Todos los ciclos del grupo serán de 6 semanas. El libro se sube aparte
-- con libro/subir.html.
--
-- Miembros: Montserrat, Melissa, Rothman y Sebastián. Se inscriben con el
-- enlace que sale al final de este archivo.
--
-- CÓMO USAR: revisa el bloque «DATOS DEL CICLO» (sobre todo el costo),
-- pega el archivo en el SQL Editor de Supabase y dale RUN. Es seguro
-- repetirlo: no duplica nada.
-- ============================================================================

do $$
declare
  -- ------------------------------------------------------------------------
  -- DATOS DEL CICLO — lo único que necesitas tocar
  -- ------------------------------------------------------------------------
  v_docente_email  text    := 'migueltillero@gmail.com';
  v_curso_nombre   text    := 'Français B2';
  v_grupo_codigo   text    := 'B2-OCT2026';
  v_costo          numeric := 2300;          -- pesos mexicanos, ciclo completo
  v_moneda         text    := 'MXN';
  v_cupo           integer := 8;
  v_inicio         date    := date '2026-10-05';
  v_fin            date    := date '2026-11-11';
  v_hora_inicio    time    := time '19:00';
  v_hora_fin       time    := time '20:30';
  v_zoom           text    := 'https://us02web.zoom.us/j/2368165321';
  -- ------------------------------------------------------------------------

  v_docente_id uuid;
  v_curso_id   uuid;
  v_grupo_id   uuid;
  v_n          integer := 0;
  r            record;
begin
  -- 1) Docente ---------------------------------------------------------------
  select p.id into v_docente_id
  from public.profiles p
  join auth.users u on u.id = p.id
  where lower(u.email) = lower(v_docente_email)
    and p.role in ('docente', 'admin')
  limit 1;
  if v_docente_id is null then
    raise exception 'No encontré tu perfil de docente (%).', v_docente_email;
  end if;

  -- 2) Curso -------------------------------------------------------------------
  select c.id into v_curso_id
  from public.cursos c
  where c.nombre = v_curso_nombre and c.docente_id = v_docente_id
  limit 1;

  if v_curso_id is null then
    insert into public.cursos (docente_id, nombre, nivel, descripcion, fecha_inicio, fecha_fin, cupo_maximo, estado)
    values (
      v_docente_id, v_curso_nombre, 'B2',
      'Curso de francés nivel B2 (usuario independiente). Clases en vivo por Zoom, '
      || 'lunes y miércoles de 19:00 a 20:30: argumentación, expresión de la opinión, '
      || 'comprensión de documentos auténticos y preparación al DELF B2.',
      v_inicio, v_fin, v_cupo, 'abierto'
    )
    returning id into v_curso_id;
  else
    update public.cursos
    set nivel = 'B2', fecha_inicio = v_inicio, fecha_fin = v_fin,
        cupo_maximo = v_cupo, estado = 'abierto'
    where id = v_curso_id;
  end if;

  -- 3) Grupo -------------------------------------------------------------------
  select g.id into v_grupo_id from public.grupos g where g.codigo = v_grupo_codigo limit 1;

  if v_grupo_id is null then
    insert into public.grupos (
      codigo, curso_id, docente_id, formato, modalidad, cupo_maximo,
      fecha_inicio, fecha_fin, horario, costo, moneda, estado, notas
    ) values (
      v_grupo_codigo, v_curso_id, v_docente_id, 'grupal', 'virtual', v_cupo,
      v_inicio, v_fin,
      jsonb_build_object(
        'dias', jsonb_build_array('lunes', 'miércoles'),
        'hora_inicio', to_char(v_hora_inicio, 'HH24:MI'),
        'hora_fin',    to_char(v_hora_fin,    'HH24:MI'),
        'zona',        'America/Mexico_City'
      ),
      v_costo, v_moneda, 'abierto',
      'Ciclo de 6 semanas (12 clases), del 5 de octubre al 11 de noviembre.'
    )
    returning id into v_grupo_id;
  else
    update public.grupos
    set curso_id = v_curso_id, docente_id = v_docente_id, cupo_maximo = v_cupo,
        fecha_inicio = v_inicio, fecha_fin = v_fin, costo = v_costo,
        moneda = v_moneda, estado = 'abierto',
        horario = jsonb_build_object(
          'dias', jsonb_build_array('lunes', 'miércoles'),
          'hora_inicio', to_char(v_hora_inicio, 'HH24:MI'),
          'hora_fin',    to_char(v_hora_fin,    'HH24:MI'),
          'zona',        'America/Mexico_City'
        )
    where id = v_grupo_id;
  end if;

  update public.grupos
  set unidad_actual = 'Ciclo de octubre',
      meta_ciclo = 'Avanzar en el libro nuevo, consolidar la argumentación oral y escrita del nivel B2 y cerrar el ciclo '
                || 'con una evaluación colectiva y una individual.',
      mensaje_bienvenida =
        'Bienvenidos a su espacio del grupo B2. Este ciclo arranca con libro nuevo. Aquí tienen el calendario completo del ciclo, el enlace de Zoom '
     || 'de nuestras clases, su asistencia y, al cerrar el ciclo, sus resultados con mi comentario. '
     || 'El espacio de révision B2 sigue disponible en Materiales.'
  where id = v_grupo_id;

  -- 4) Enlace de Zoom (tabla protegida: solo inscripciones activas) ----------
  insert into public.grupo_enlaces (grupo_id, enlace_zoom)
  values (v_grupo_id, v_zoom)
  on conflict (grupo_id) do update set enlace_zoom = excluded.enlace_zoom, updated_at = now();

  -- 5) Horario semanal: lunes (1) y miércoles (3) -----------------------------
  delete from public.horarios where curso_id = v_curso_id;
  insert into public.horarios (curso_id, dia_semana, hora_inicio, hora_fin)
  values (v_curso_id, 1, v_hora_inicio, v_hora_fin),
         (v_curso_id, 3, v_hora_inicio, v_hora_fin);

  -- 6) Las 12 sesiones -------------------------------------------------------
  -- Los temas de contenido se completan desde el panel docente
  -- (pestaña Planificación); las dos últimas son la evaluación de cierre.
  for r in
    select * from (values
      (date '2026-10-05'), (date '2026-10-07'),
      (date '2026-10-12'), (date '2026-10-14'),
      (date '2026-10-19'), (date '2026-10-21'),
      (date '2026-10-26'), (date '2026-10-28'),
      (date '2026-11-02'), (date '2026-11-04'),
      (date '2026-11-09'), (date '2026-11-11')
    ) as t(fecha)
    order by 1
  loop
    v_n := v_n + 1;
    if not exists (select 1 from public.sesiones s where s.curso_id = v_curso_id and s.fecha = r.fecha) then
      insert into public.sesiones (curso_id, grupo_id, fecha, tema, contenido)
      values (
        v_curso_id, v_grupo_id, r.fecha,
        case v_n
          when 11 then 'Évaluation collective — cierre del ciclo'
          when 12 then 'Évaluation individuelle — cierre del ciclo'
          else 'Séance ' || v_n || ' de 12'
        end,
        case v_n
          when 11 then E'Primera parte de la evaluación de cierre, en grupo.\n'
                      '• Compréhension orale y compréhension écrite de documentos auténticos.\n'
                      '• Production écrite argumentée.'
          when 12 then E'Segunda parte de la evaluación de cierre, uno por uno.\n'
                      '• Production orale: exposé y débat a partir de un documento déclencheur.\n'
                      '• Devolución individual y presentación del próximo ciclo.'
          else null
        end
      );
    else
      update public.sesiones set grupo_id = v_grupo_id
      where curso_id = v_curso_id and fecha = r.fecha;
    end if;
  end loop;

  -- 7) Evaluaciones de cierre --------------------------------------------------
  if not exists (select 1 from public.evaluaciones e
                 where e.curso_id = v_curso_id and e.nombre = 'Évaluation collective (cierre de ciclo)') then
    insert into public.evaluaciones (curso_id, nombre, fecha, ponderacion, nota_maxima, descripcion)
    values (v_curso_id, 'Évaluation collective (cierre de ciclo)', date '2026-11-09', 40, 50,
            'Prueba en grupo: compréhension orale, compréhension écrite y production écrite argumentée.');
  end if;
  if not exists (select 1 from public.evaluaciones e
                 where e.curso_id = v_curso_id and e.nombre = 'Évaluation individuelle (cierre de ciclo)') then
    insert into public.evaluaciones (curso_id, nombre, fecha, ponderacion, nota_maxima, descripcion)
    values (v_curso_id, 'Évaluation individuelle (cierre de ciclo)', date '2026-11-11', 60, 25,
            'Prueba individual: production orale (exposé y débat) con grilla tipo DELF B2.');
  end if;

  -- 8) Materiales del grupo ----------------------------------------------------
  insert into public.materiales (grupo_id, titulo, descripcion, url, categoria, unidad, orden)
  values
    (v_grupo_id, 'Espace de révision B2',
     'Módulos con cours, ejercicios auto-corregidos, evaluación final y el depósito de tareas.',
     'https://migueltillero-ship-it.github.io/espace-b2/', 'refuerzo', null, 1),
    (v_grupo_id, 'Mi libro',
     'El libro del curso, para leerlo en línea desde cualquier dispositivo.',
     'https://migueltillero-ship-it.github.io/MiguelTillero/libro/', 'material', null, 0)
  on conflict (coalesce(grupo_id, '00000000-0000-0000-0000-000000000000'::uuid), url)
  do update set titulo = excluded.titulo, descripcion = excluded.descripcion,
                categoria = excluded.categoria, orden = excluded.orden;

  raise notice 'Ciclo B2 listo. Curso: %  ·  Grupo: %', v_curso_id, v_grupo_id;
end $$;


-- ============================================================================
-- COMPROBACIÓN — el enlace de inscripción para el grupo sale aquí
-- ============================================================================
select
  g.codigo                                   as grupo,
  c.nombre                                   as curso,
  g.fecha_inicio, g.fecha_fin,
  g.costo || ' ' || g.moneda                 as precio,
  (select count(*) from public.sesiones s where s.grupo_id = g.id) as sesiones,
  'https://migueltillero-ship-it.github.io/MiguelTillero/registro/inscripcion.html?grupo=' || g.id
                                             as enlace_de_inscripcion
from public.grupos g
join public.cursos c on c.id = g.curso_id
where g.codigo = 'B2-OCT2026';
