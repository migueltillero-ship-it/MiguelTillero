-- ============================================================================
-- CICLO A1 · OCTUBRE 2026 — Français A1 con Défi 1 (CLE International)
--
-- Crea de una sola vez: el curso, el grupo con su costo, el horario
-- (martes y jueves de 19:00 a 20:00), las 12 sesiones con su tema y su
-- contenido, y las dos evaluaciones de cierre del ciclo anterior.
--
-- Punto de partida real del grupo: Défi 1, Unité 4 «Entre quatre murs»,
-- Dossier 2 («Comment aménager les petits espaces», pp. 70-71) — ya visto.
-- El ciclo retoma desde el Dossier 3 y llega hasta la Unité 5
-- «Métro, boulot, dodo».
--
-- CÓMO USAR
--   1. Ejecuta antes, y en orden, schema.sql y schema_v2.sql … schema_v6.sql.
--   2. Pega este archivo completo en el SQL Editor de Supabase y dale RUN.
--   3. Es seguro volver a ejecutarlo: no duplica nada.
--
-- Si quieres cambiar el precio, las fechas o el cupo, toca SOLO el bloque
-- "DATOS DEL CICLO" de abajo y vuelve a ejecutar.
-- ============================================================================

do $$
declare
  -- ------------------------------------------------------------------------
  -- DATOS DEL CICLO — lo único que necesitas tocar
  -- ------------------------------------------------------------------------
  v_docente_email  text    := 'migueltillero@gmail.com';
  v_curso_nombre   text    := 'Français A1 — Défi 1';
  v_grupo_codigo   text    := 'A1-OCT2026';
  v_costo          numeric := 1900;          -- pesos mexicanos, ciclo completo
  v_moneda         text    := 'MXN';
  v_cupo           integer := 10;
  v_inicio         date    := date '2026-09-29';
  v_fin            date    := date '2026-11-05';
  v_hora_inicio    time    := time '19:00';
  v_hora_fin       time    := time '20:00';
  -- ------------------------------------------------------------------------

  v_docente_id uuid;
  v_curso_id   uuid;
  v_grupo_id   uuid;
  r            record;
begin
  -- 1) Docente ---------------------------------------------------------------
  -- El correo vive en auth.users, no en profiles: se busca allí y se comprueba
  -- que ese perfil tenga rol de docente (o de admin, en esquemas recientes).
  select p.id into v_docente_id
  from public.profiles p
  join auth.users u on u.id = p.id
  where lower(u.email) = lower(v_docente_email)
    and p.role in ('docente', 'admin')
  limit 1;

  if v_docente_id is null then
    select p.id into v_docente_id
    from public.profiles p
    where p.role in ('docente', 'admin')
    order by p.created_at
    limit 1;
  end if;

  if v_docente_id is null then
    raise exception 'No encontré ningún perfil con rol docente. Entra una vez a la plataforma con tu cuenta antes de ejecutar este archivo.';
  end if;

  -- 2) Curso (catálogo) ------------------------------------------------------
  select c.id into v_curso_id
  from public.cursos c
  where c.nombre = v_curso_nombre and c.docente_id = v_docente_id
  limit 1;

  if v_curso_id is null then
    insert into public.cursos (docente_id, nombre, nivel, descripcion, fecha_inicio, fecha_fin, cupo_maximo, estado)
    values (
      v_docente_id, v_curso_nombre, 'A1',
      'Curso de francés nivel A1 con el método Défi 1 (CLE International). '
      || 'Clases en vivo de una hora, martes y jueves de 19:00 a 20:00. '
      || 'Este ciclo retoma la Unité 4 «Entre quatre murs» desde el Dossier 3 '
      || 'y avanza hasta la Unité 5 «Métro, boulot, dodo».',
      v_inicio, v_fin, v_cupo, 'abierto'
    )
    returning id into v_curso_id;
  else
    update public.cursos
    set nivel = 'A1', fecha_inicio = v_inicio, fecha_fin = v_fin,
        cupo_maximo = v_cupo, estado = 'abierto'
    where id = v_curso_id;
  end if;

  -- 3) Grupo (la instancia que se vende y a la que se inscriben) -------------
  select g.id into v_grupo_id from public.grupos g where g.codigo = v_grupo_codigo limit 1;

  if v_grupo_id is null then
    insert into public.grupos (
      codigo, curso_id, docente_id, formato, modalidad, cupo_maximo,
      fecha_inicio, fecha_fin, horario, costo, moneda, estado, notas
    ) values (
      v_grupo_codigo, v_curso_id, v_docente_id, 'grupal', 'virtual', v_cupo,
      v_inicio, v_fin,
      jsonb_build_object(
        'dias', jsonb_build_array('martes', 'jueves'),
        'hora_inicio', to_char(v_hora_inicio, 'HH24:MI'),
        'hora_fin',    to_char(v_hora_fin,    'HH24:MI'),
        'zona',        'America/Mexico_City'
      ),
      v_costo, v_moneda, 'abierto',
      'Ciclo de 6 semanas. Las sesiones del 29/09 y del 01/10 son la evaluación '
      || 'de cierre del ciclo anterior (colectiva e individual).'
    )
    returning id into v_grupo_id;
  else
    update public.grupos
    set curso_id = v_curso_id, docente_id = v_docente_id, cupo_maximo = v_cupo,
        fecha_inicio = v_inicio, fecha_fin = v_fin, costo = v_costo,
        moneda = v_moneda, estado = 'abierto',
        horario = jsonb_build_object(
          'dias', jsonb_build_array('martes', 'jueves'),
          'hora_inicio', to_char(v_hora_inicio, 'HH24:MI'),
          'hora_fin',    to_char(v_hora_fin,    'HH24:MI'),
          'zona',        'America/Mexico_City'
        )
    where id = v_grupo_id;
  end if;

  -- 4) Horario semanal: martes (2) y jueves (4) ------------------------------
  delete from public.horarios where curso_id = v_curso_id;
  insert into public.horarios (curso_id, dia_semana, hora_inicio, hora_fin)
  values (v_curso_id, 2, v_hora_inicio, v_hora_fin),
         (v_curso_id, 4, v_hora_inicio, v_hora_fin);

  -- 5) Las 12 sesiones, con su tema y su contenido ---------------------------
  for r in
    select * from (values
      (date '2026-09-29',
       'Évaluation collective — cierre del ciclo anterior',
       E'Prueba en grupo de todo lo visto hasta la Unité 4 / Dossier 2.\n'
       '• Compréhension orale y compréhension écrite en equipos.\n'
       '• Tâche collective: describir un espacio y sus muebles.\n'
       '• Repaso vivo de: les pièces de la maison, les meubles, «servir à + infinitif», le verbe POUVOIR, les adjectifs de couleur.'),

      (date '2026-10-01',
       'Évaluation individuelle — cierre del ciclo anterior',
       E'Prueba individual, uno por uno.\n'
       '• Production orale: entretien dirigé (se presentar) y monologue suivi (describir dónde vives).\n'
       '• Production écrite breve: un mensaje describiendo tu habitación.\n'
       '• Cada estudiante recibe su nota y sus puntos a reforzar.'),

      (date '2026-10-06',
       'Retour sur l''évaluation + réactivation de l''Unité 4',
       E'Devolución de las dos pruebas y reactivación antes de seguir.\n'
       '• Corrección colectiva de los errores más frecuentes.\n'
       '• Reactivación: les meubles, POUVOIR au présent, «servir à + infinitif».\n'
       '• Les adjectifs de couleur: femenino, plural y los invariables (orange, marron).\n'
       'Material externo: juego de vocabulario en Wordwall sobre les meubles.'),

      (date '2026-10-08',
       'Unité 4 / Dossier 3 — Décrire son logement',
       E'Dónde están las cosas en la casa.\n'
       '• Les prépositions de lieu: sur, sous, dans, devant, derrière, entre, à côté de, en face de.\n'
       '• «Il y a» / «Il n''y a pas de» para decir lo que hay y lo que falta.\n'
       '• Production orale: describir tu casa a partir de una foto.\n'
       'Material externo: TV5Monde «Apprendre le français» A1 — le logement.'),

      (date '2026-10-13',
       'Unité 4 — Donner des conseils : l''impératif',
       E'Dar instrucciones y consejos para organizar un espacio.\n'
       '• L''impératif présent: formas afirmativa y negativa (range, ne range pas).\n'
       '• «Il faut + infinitif» y «On peut + infinitif».\n'
       '• Production: dar tres consejos para aprovechar un espacio pequeño.\n'
       'Refuerzo del Dossier 2: se retoma POUVOIR en contraste con IL FAUT.'),

      (date '2026-10-15',
       'DÉFI de l''Unité 4 — Aménager un petit espace',
       E'La tâche colaborativa que cierra la unidad.\n'
       '• En parejas: diseñar y presentar un petit espace aménagé (plano o collage).\n'
       '• Presentación oral de 3 minutos usando todo lo de la unidad.\n'
       '• Coevaluación entre compañeros con una rúbrica sencilla.\n'
       'Se entrega al grupo la rúbrica antes de empezar.'),

      (date '2026-10-20',
       'Faites le point Unité 4 + ouverture Unité 5 : l''heure',
       E'Cierre de la Unité 4 y entrada a «Métro, boulot, dodo».\n'
       '• Bilan de grammaire, lexique et phonétique de la Unité 4.\n'
       '• Phonétique: les sons [ø] / [œ] (deux, heure).\n'
       '• Apertura Unité 5: dire l''heure — hora informal y hora oficial.\n'
       'Material externo: audio de RFI en français facile (horarios).'),

      (date '2026-10-22',
       'Unité 5 — Les verbes pronominaux : ma journée',
       E'Contar la rutina diaria.\n'
       '• Les verbes pronominaux au présent: se réveiller, se lever, se doucher, s''habiller, se coucher.\n'
       '• Orden del pronombre y la negación (je ne me lève pas tôt).\n'
       '• Production orale: «Raconte-moi ta journée».\n'
       'Se repasa la hora vista la sesión anterior.'),

      (date '2026-10-27',
       'Unité 5 — Moments de la journée et fréquence',
       E'Cuándo y cada cuánto.\n'
       '• Le matin, l''après-midi, le soir, la nuit; tôt / tard.\n'
       '• Les adverbes de fréquence: toujours, souvent, parfois, rarement, ne… jamais.\n'
       '• Production écrite: escribir tu rutina de un día de semana (60-80 palabras).\n'
       'Primera revisión acumulativa del ciclo.'),

      (date '2026-10-29',
       'Unité 5 — Les professions et le monde du travail',
       E'De qué trabaja cada quien.\n'
       '• Les noms de métiers: masculino y femenino (un serveur / une serveuse, un infirmier / une infirmière).\n'
       '• «Qu''est-ce que vous faites dans la vie ?» / «Je suis + profession» (sin artículo).\n'
       '• Le lieu de travail: au bureau, à l''hôpital, dans un restaurant.\n'
       'Production orale: entrevistar a un compañero sobre su trabajo.'),

      (date '2026-11-03',
       'Unité 5 — Les transports et les trajets',
       E'Cómo te mueves por la ciudad.\n'
       '• Les moyens de transport: en bus, en métro, en voiture, à pied, à vélo.\n'
       '• «Prendre» au présent; «aller à / en»; «mettre + durée» (je mets 20 minutes).\n'
       '• Production orale: «Comment tu vas au travail ?».\n'
       'Material externo: plano del metro para una actividad de itinerarios.'),

      (date '2026-11-05',
       'Révision générale + mini-DELF A1 + cierre del ciclo',
       E'Última sesión del ciclo.\n'
       '• Revisión general de las Unités 4 y 5.\n'
       '• Mini-DELF A1: compréhension orale y production orale en formato de examen.\n'
       '• Devolución individual del avance de cada estudiante.\n'
       '• Presentación del próximo ciclo y de lo que viene en Défi 1.')
    ) as t(fecha, tema, contenido)
  loop
    if exists (select 1 from public.sesiones s where s.curso_id = v_curso_id and s.fecha = r.fecha) then
      update public.sesiones
      set tema = r.tema, contenido = r.contenido, grupo_id = v_grupo_id
      where curso_id = v_curso_id and fecha = r.fecha;
    else
      insert into public.sesiones (curso_id, grupo_id, fecha, tema, contenido)
      values (v_curso_id, v_grupo_id, r.fecha, r.tema, r.contenido);
    end if;
  end loop;

  -- 6) Las dos evaluaciones de cierre del ciclo anterior ---------------------
  if not exists (select 1 from public.evaluaciones e
                 where e.curso_id = v_curso_id and e.nombre = 'Évaluation collective (ciclo anterior)') then
    insert into public.evaluaciones (curso_id, nombre, fecha, ponderacion)
    values (v_curso_id, 'Évaluation collective (ciclo anterior)', date '2026-09-29', 40);
  end if;

  if not exists (select 1 from public.evaluaciones e
                 where e.curso_id = v_curso_id and e.nombre = 'Évaluation individuelle (ciclo anterior)') then
    insert into public.evaluaciones (curso_id, nombre, fecha, ponderacion)
    values (v_curso_id, 'Évaluation individuelle (ciclo anterior)', date '2026-10-01', 60);
  end if;

  raise notice 'Ciclo creado. Curso: %  ·  Grupo: %', v_curso_id, v_grupo_id;
end $$;


-- ============================================================================
-- COMPROBACIÓN — el enlace que le vas a mandar a tus estudiantes sale aquí
-- ============================================================================
select
  g.codigo                                   as grupo,
  c.nombre                                   as curso,
  g.fecha_inicio, g.fecha_fin,
  g.costo || ' ' || g.moneda                 as precio,
  g.cupo_maximo - g.cupo_actual              as cupos_libres,
  (select count(*) from public.sesiones s where s.grupo_id = g.id) as sesiones,
  'https://migueltillero-ship-it.github.io/MiguelTillero/registro/inscripcion.html?grupo=' || g.id
                                             as enlace_de_inscripcion
from public.grupos g
join public.cursos c on c.id = g.curso_id
where g.codigo = 'A1-OCT2026';
