-- ============================================================================
-- CICLO A1 · OCTUBRE 2026 — detalles del curso y progresión
--
-- Añade lo que faltaba para que el espacio del estudiante cuente una
-- historia completa:
--   · modalidad híbrida, enlace de Zoom y enlace del grupo de WhatsApp
--   · la unidad que se trabaja, para que salga en el título
--   · el histórico de unidades ya vistas, con sus objetivos lingüísticos
--   · los objetivos que hay que validar en este ciclo y hasta dónde llegamos
--   · las dos últimas clases convertidas en evaluación de CIERRE de ciclo,
--     para que el próximo ciclo no tenga que empezar evaluando
--
-- CÓMO USAR: ejecútalo DESPUÉS de ciclo-a1-oct2026.sql (o de TODO-EN-UNO.sql).
-- Es seguro repetirlo.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Columnas nuevas en grupos
-- ---------------------------------------------------------------------------

alter table public.grupos add column if not exists enlace_zoom text;
alter table public.grupos add column if not exists enlace_whatsapp text;
alter table public.grupos add column if not exists unidad_actual text;
alter table public.grupos add column if not exists mensaje_bienvenida text;
alter table public.grupos add column if not exists meta_ciclo text;

-- La modalidad admitía solo virtual o presencial; ahora también híbrido.
alter table public.grupos drop constraint if exists grupos_modalidad_check;
alter table public.grupos add constraint grupos_modalidad_check
  check (modalidad in ('virtual', 'presencial', 'hibrido'));


-- ---------------------------------------------------------------------------
-- 1 bis. SEGURIDAD — cerrar la lectura anónima de la tabla grupos
--
-- schema_v2.sql dejaba una política que permitía a CUALQUIERA (incluso sin
-- cuenta) leer las filas de grupos en estado abierto o en curso. Eso era
-- inofensivo mientras la tabla solo tenía nombre, fechas y cupo; deja de
-- serlo ahora que guarda el enlace de Zoom con su contraseña y el enlace del
-- grupo de WhatsApp: cualquiera podría colarse en la clase.
--
-- Se puede quitar sin romper nada:
--   · la página pública de inscripción NO lee esta tabla, lee la vista
--     v_grupos_disponibles, que no expone los enlaces;
--   · el estudiante inscrito sigue cubierto por "grupos: estudiante ve el suyo";
--   · el docente y el admin, por "grupos: docente ve y administra los suyos".
-- Comprobado las tres cosas sobre PostgreSQL antes de publicarlo.
-- ---------------------------------------------------------------------------

drop policy if exists "grupos: cualquiera ve grupos abiertos" on public.grupos;


-- ---------------------------------------------------------------------------
-- 2. Progresión del grupo: qué se vio antes, qué se ve ahora, qué viene
-- ---------------------------------------------------------------------------

create table if not exists public.grupo_progresion (
  id uuid primary key default gen_random_uuid(),
  grupo_id uuid not null references public.grupos(id) on delete cascade,
  orden integer not null,
  unidad text not null,
  detalle text,                 -- hasta qué dossier / páginas
  objetivos text,               -- objetivos lingüísticos de esa unidad
  estado text not null default 'prevista'
    check (estado in ('vista', 'en_curso', 'prevista')),
  created_at timestamptz not null default now(),
  unique (grupo_id, orden)
);
alter table public.grupo_progresion enable row level security;

create index if not exists idx_progresion_grupo on public.grupo_progresion(grupo_id);

-- El docente del grupo la administra; el estudiante inscrito la lee.
drop policy if exists "progresion: docente del grupo administra" on public.grupo_progresion;
create policy "progresion: docente del grupo administra"
  on public.grupo_progresion for all
  using (public.es_admin() or public.es_docente_del_grupo(grupo_id))
  with check (public.es_admin() or public.es_docente_del_grupo(grupo_id));

drop policy if exists "progresion: estudiante inscrito la ve" on public.grupo_progresion;
create policy "progresion: estudiante inscrito la ve"
  on public.grupo_progresion for select
  using (public.esta_inscrito_en_grupo(grupo_id));


-- ---------------------------------------------------------------------------
-- 3. Datos del ciclo A1 de octubre 2026
-- ---------------------------------------------------------------------------

do $$
declare
  v_grupo_id uuid;
  v_curso_id uuid;
  r record;
begin
  select g.id, g.curso_id into v_grupo_id, v_curso_id
  from public.grupos g where g.codigo = 'A1-OCT2026';

  if v_grupo_id is null then
    raise exception 'No existe el grupo A1-OCT2026. Ejecuta antes ciclo-a1-oct2026.sql.';
  end if;

  -- 3.1 Nombre del curso, con el número de módulo -------------------------
  -- Se usa la misma nomenclatura que el grupo de WhatsApp: A1.4.
  update public.cursos
  set nombre = 'Français A1.4 — Défi 1'
  where id = v_curso_id;

  -- 3.2 Detalles del grupo -------------------------------------------------
  -- El enlace de Zoom es el de la sala fija del grupo. El de WhatsApp se
  -- rellena con el UPDATE que viene al final (hace falta el enlace de
  -- invitación chat.whatsapp.com/..., que no es el mismo que el grupo).
  update public.grupos
  set modalidad      = 'hibrido',
      enlace_zoom     = coalesce(nullif(enlace_zoom, ''),
                                 'https://us02web.zoom.us/j/89400565303?pwd=GRFFqNiJyOmYAtb4ndB6jbO6B5GlRe.1'),
      enlace_whatsapp = coalesce(nullif(enlace_whatsapp, ''),
                                 'https://chat.whatsapp.com/HQ1m79IBobZ9MJZdMxNz5H'),
      unidad_actual  = 'Unités 4 et 5',
      meta_ciclo     = 'Cerrar la Unité 4 «Entre quatre murs» completa (Dossier 3, el Défi de la unidad y el Faites le point) '
                    || 'y avanzar en la Unité 5 «Métro, boulot, dodo» hasta les professions. '
                    || 'Les transports quedan para el ciclo siguiente, para no atropellar el cierre.',
      mensaje_bienvenida =
        'Me alegra tenerte de vuelta. Este ciclo retoma exactamente donde lo dejamos: cerramos la '
     || 'Unité 4 «Entre quatre murs» y entramos en la Unité 5 «Métro, boulot, dodo». '
     || 'Aquí abajo tienes de dónde venimos, lo que vamos a validar y hasta dónde vamos a llegar. '
     || 'Las dos primeras clases son la evaluación del ciclo pasado, y las dos últimas la de este. '
     || 'Nada de sorpresas: todo el recorrido está a la vista desde el primer día.'
  where id = v_grupo_id;

  -- 3.3 Progresión: de dónde viene el grupo --------------------------------
  for r in
    select * from (values
      (1, 'Dossier de découverte', 'Visto en ciclos anteriores', 'vista',
       'Saluer et prendre congé · se présenter · l''alphabet et épeler · les nombres · les jours de la semaine · les objets de la classe.'),

      (2, 'Unité 1 — Portrait-robot', 'Visto en ciclos anteriores', 'vista',
       'Se présenter et présenter quelqu''un · l''âge et la nationalité · décrire physiquement · les verbes ÊTRE et AVOIR au présent · le masculin et le féminin des adjectifs.'),

      (3, 'Unité 2 — D''ici et d''ailleurs', 'Visto en ciclos anteriores', 'vista',
       'Dire d''où l''on vient et où l''on habite · les pays et les villes · les prépositions (à, en, au, aux) · les verbes en -ER au présent · poser des questions simples.'),

      (4, 'Unité 3 — Un air de famille', 'Visto en ciclos anteriores', 'vista',
       'Parler de sa famille · les liens de parenté · les adjectifs possessifs · la négation ne… pas · exprimer les goûts (aimer, adorer, détester).'),

      (5, 'Unité 4 — Entre quatre murs', 'En curso · visto hasta el Dossier 2 (pp. 70-71)', 'en_curso',
       'Ya trabajado: les pièces de la maison et les meubles · «servir à + infinitif» · le verbe POUVOIR et «pouvoir + infinitif» · les adjectifs de couleur (féminin, pluriel et les invariables orange et marron). '
       || 'Pendiente en este ciclo: décrire son logement avec les prépositions de lieu et «il y a» · l''impératif pour donner des conseils · le Défi de l''unité.'),

      (6, 'Unité 5 — Métro, boulot, dodo', 'Se empieza en este ciclo', 'prevista',
       'Dire l''heure · les verbes pronominaux au présent (se lever, se doucher, s''habiller, se coucher) · les moments de la journée · les adverbes de fréquence · les professions au masculin et au féminin. '
       || 'Les transports et les trajets quedan para el ciclo siguiente.')
    ) as t(orden, unidad, detalle, estado, objetivos)
  loop
    insert into public.grupo_progresion (grupo_id, orden, unidad, detalle, estado, objetivos)
    values (v_grupo_id, r.orden, r.unidad, r.detalle, r.estado, r.objetivos)
    on conflict (grupo_id, orden) do update
      set unidad = excluded.unidad, detalle = excluded.detalle,
          estado = excluded.estado, objetivos = excluded.objetivos;
  end loop;

  -- 3.4 Las dos últimas clases pasan a ser la evaluación de CIERRE ---------
  -- Antes eran «les transports» y «révision + mini-DELF». Se mueven para que
  -- el ciclo cierre evaluando y el siguiente pueda arrancar con contenido.
  update public.sesiones
  set tema = 'Unité 5 — Les professions + révision générale del ciclo',
      contenido = E'Última sesión de contenido, con repaso para la evaluación.\n'
       '• Les noms de métiers: masculino y femenino (un serveur / une serveuse, un infirmier / une infirmière).\n'
       '• «Qu''est-ce que vous faites dans la vie ?» / «Je suis + profession» (sin artículo).\n'
       '• Le lieu de travail: au bureau, à l''hôpital, dans un restaurant.\n'
       '• Repaso guiado de las Unités 4 y 5 y explicación de cómo será la evaluación.'
  where curso_id = v_curso_id and fecha = date '2026-10-29';

  update public.sesiones
  set tema = 'Évaluation collective — cierre de ESTE ciclo',
      contenido = E'Primera parte de la evaluación de cierre, en grupo.\n'
       '• Compréhension orale y compréhension écrite sobre las Unités 4 y 5.\n'
       '• Tâche collective: describir un espacio y una rutina.\n'
       '• Se evalúa lo trabajado en este ciclo, no lo anterior.'
  where curso_id = v_curso_id and fecha = date '2026-11-03';

  update public.sesiones
  set tema = 'Évaluation individuelle — cierre de ESTE ciclo',
      contenido = E'Segunda parte de la evaluación de cierre, uno por uno.\n'
       '• Production orale: entretien dirigé y monologue suivi (ma maison, ma journée, mon travail).\n'
       '• Production écrite breve.\n'
       '• Devolución individual y presentación del siguiente ciclo.\n'
       '• Así el ciclo que viene arranca directamente con contenido nuevo.'
  where curso_id = v_curso_id and fecha = date '2026-11-05';

  -- 3.5 Evaluaciones de cierre de este ciclo -------------------------------
  if not exists (select 1 from public.evaluaciones e
                 where e.curso_id = v_curso_id and e.nombre = 'Évaluation collective (cierre de ciclo)') then
    insert into public.evaluaciones (curso_id, nombre, fecha, ponderacion)
    values (v_curso_id, 'Évaluation collective (cierre de ciclo)', date '2026-11-03', 40);
  end if;

  if not exists (select 1 from public.evaluaciones e
                 where e.curso_id = v_curso_id and e.nombre = 'Évaluation individuelle (cierre de ciclo)') then
    insert into public.evaluaciones (curso_id, nombre, fecha, ponderacion)
    values (v_curso_id, 'Évaluation individuelle (cierre de ciclo)', date '2026-11-05', 60);
  end if;

  raise notice 'Detalles y progresión cargados para el grupo %', v_grupo_id;
end $$;


-- ============================================================================
-- TUS ENLACES — cambia los dos textos y ejecuta solo estas líneas
-- ============================================================================
-- Los dos enlaces ya quedaron puestos arriba: la sala de Zoom del grupo y la
-- invitación al grupo de WhatsApp. Si alguno cambia, edítalo con esto:
--
-- update public.grupos
-- set enlace_zoom     = 'https://...',
--     enlace_whatsapp = 'https://chat.whatsapp.com/...'
-- where codigo = 'A1-OCT2026';


-- ============================================================================
-- COMPROBACIÓN
-- ============================================================================
select g.codigo, c.nombre as curso, g.modalidad, g.unidad_actual,
       case when g.enlace_zoom is null then '(sin poner)' else 'puesto' end     as zoom,
       case when g.enlace_whatsapp is null then '(sin poner)' else 'puesto' end as whatsapp,
       (select count(*) from public.grupo_progresion p where p.grupo_id = g.id) as unidades
from public.grupos g join public.cursos c on c.id = g.curso_id
where g.codigo = 'A1-OCT2026';
