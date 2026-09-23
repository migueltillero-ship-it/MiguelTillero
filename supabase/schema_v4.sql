-- ============================================================================
-- Plataforma docente / estudiantil — Miguel Tillero
-- ESQUEMA V4 — catálogo de métodos/manuales FLE y su progresión por unidades,
-- para elegir el método de un grupo y ver un plan sugerido repartido en las
-- semanas reales del curso (no un número fijo de semanas).
--
-- Totalmente editable desde admin.html (pestaña "Métodos"): agregar/quitar
-- métodos, marcar su nivel MCER y definir/reordenar sus unidades. Nada de
-- esto queda fijo en el código, a diferencia de como vivía en af-chiapas-web.
--
-- Semilla incluida: el catálogo de ~95 manuales FLE que ya usas (mismos
-- títulos publicados que trabajas en la Alianza Française, no contenido de
-- esa institución) y las unidades reales confirmadas de 7 de ellos (Défi 1,
-- Défi 2, Entre nous 1-4, Édito B1, Édito B2). El resto del catálogo queda
-- sin unidades hasta que tú las cargues desde el admin — igual que allá, no
-- se inventa progresión sin confirmar.
--
-- CÓMO USAR: ejecuta este archivo DESPUÉS de schema.sql, schema_v2.sql y
-- schema_v3.sql. Es seguro volver a ejecutarlo las veces que haga falta.
-- ============================================================================

create table if not exists public.metodos (
  id uuid primary key default gen_random_uuid(),
  nombre text unique not null,
  niveles text, -- lista separada por comas, ej. "A1,A2"; vacío = nivel sin confirmar
  idioma text not null default 'frances',
  activo boolean not null default true,
  notas text,
  created_at timestamptz not null default now()
);
alter table public.metodos enable row level security;

drop policy if exists "metodos: docente y admin leen" on public.metodos;
create policy "metodos: docente y admin leen"
  on public.metodos for select
  using (public.es_docente());

drop policy if exists "metodos: solo admin escribe" on public.metodos;
create policy "metodos: solo admin escribe"
  on public.metodos for all
  using (public.es_admin())
  with check (public.es_admin());

create table if not exists public.metodo_unidades (
  id uuid primary key default gen_random_uuid(),
  metodo_id uuid not null references public.metodos(id) on delete cascade,
  orden integer not null check (orden > 0),
  titulo text not null,
  unique (metodo_id, orden)
);
alter table public.metodo_unidades enable row level security;
create index if not exists idx_metodo_unidades_metodo on public.metodo_unidades(metodo_id);

drop policy if exists "metodo_unidades: docente y admin leen" on public.metodo_unidades;
create policy "metodo_unidades: docente y admin leen"
  on public.metodo_unidades for select
  using (public.es_docente());

drop policy if exists "metodo_unidades: solo admin escribe" on public.metodo_unidades;
create policy "metodo_unidades: solo admin escribe"
  on public.metodo_unidades for all
  using (public.es_admin())
  with check (public.es_admin());

-- El método elegido vive en el GRUPO (la instancia concreta del curso), no
-- en el catálogo de cursos: dos grupos del mismo curso podrían usar libros
-- distintos si algún día tienes más de un docente.
alter table public.grupos add column if not exists metodo_id uuid references public.metodos(id) on delete set null;


-- ---------------------------------------------------------------------------
-- Semilla: catálogo de métodos (mismos títulos publicados que ya trabajas)
-- ---------------------------------------------------------------------------

insert into public.metodos (nombre, niveles) values
  ('À la une 1', null), ('À la une 2', null), ('À la une 3', null), ('À la une 4', null),
  ('À plus 1', null), ('À plus 2', null), ('À plus 3', null), ('À plus 4', null), ('À plus 5', null),
  ('Cap sur... - pas à pas 1', null), ('Cap sur... - pas à pas 2', null), ('Cap sur... - pas à pas 3', null),
  ('Cap sur... - pas à pas 4', null), ('Cap sur... - pas à pas 5', null),
  ('Cap sur... 1', null), ('Cap sur... 2', null), ('Cap sur... 3', null),
  ('Capsules de phonétique [A1-A2]', 'A1,A2'),
  ('Carrousel 1', null), ('Carrousel 2', null), ('Carrousel 3', null),
  ('Club @dos 1', null), ('Club @dos 2', null), ('Club @dos 3', null), ('Club @dos 4', null),
  ('Défi 1', 'A1'), ('Défi 1 (anglophone)', 'A1'), ('Défi 2', 'A2'), ('Défi 3', 'B1'),
  ('Défi 4', null), ('Défi 5', null),
  ('Défi actuel 1', null), ('Défi actuel 2', null), ('Défi actuel 3', null), ('Défi actuel 4', null),
  ('En route vers le DELF A1', 'A1'), ('En route vers le DELF A2', 'A2'), ('En route vers le DELF B1', 'B1'),
  ('Entre nous 1', 'A1'), ('Entre nous 2', 'A2'), ('Entre nous 3', 'B1'), ('Entre nous 4', 'B2'),
  ('Édito B1', 'B1'), ('Édito B2', 'B2'),
  ('La grammaire du français A1', 'A1'), ('La grammaire du français A2', 'A2'), ('La grammaire du français B1', 'B1'),
  ('La grammaire du français sans problème', null),
  ('Les clés du Delf A2 Édition actualisée', 'A2'), ('Les clés du Delf B1 Édition actualisée', 'B1'),
  ('Les clés du Delf B1 Nouvelle édition', 'B1'), ('Les clés du Delf B2 Nouvelle édition', 'B2'),
  ('Les clés du nouveau Delf A1', 'A1'), ('Les clés du nouveau Delf A2', 'A2'),
  ('Les Globe-trotteurs 1', null), ('Les Globe-trotteurs 2', null), ('Les Globe-trotteurs 3', null),
  ('Les Globe-trotteurs 4', null), ('Les Globe-trotteurs 5', null),
  ('Les mots de la rue', null),
  ('Lexville [A1-B1]', 'A1,A2,B1'),
  ('Littérature visuelle [A2-B2]', 'A2,B1,B2'),
  ('Nouveau rond-point - pas à pas 1', null), ('Nouveau rond-point - pas à pas 2', null),
  ('Nouveau rond-point - pas à pas 3', null), ('Nouveau rond-point - pas à pas 4', null),
  ('Nouveau rond-point 1', null), ('Nouveau rond-point 2', null), ('Nouveau rond-point 3', null),
  ('Planète ados', null),
  ('Posters pour la classe', null), ('Posters à imprimer et à afficher dans la classe', null),
  ('Pourquoi pas ! 1', null), ('Pourquoi pas ! 2', null), ('Pourquoi pas ! 3', null), ('Pourquoi pas ! 4', null),
  ('Prêt-à-parler 1', null), ('Prêt-à-parler 2', null), ('Prêt-à-parler 3', null), ('Prêt-à-parler 4', null),
  ('Rencontres FLE', null),
  ('Rendez-vous en France 1', null), ('Rendez-vous en France 2', null),
  ('Tadam ! 1', null), ('Tadam ! 2', null),
  ('Version originale 1', null), ('Version originale 2', null), ('Version originale 3', null), ('Version originale 4', null),
  ('Vocabulaire en images [A1-A2]', 'A1,A2'),
  ('Activités interactives par thèmes pour travailler le lexique en contexte', null),
  ('Zoom - pas à pas 1', null), ('Zoom - pas à pas 2', null), ('Zoom - pas à pas 3', null),
  ('Zoom - pas à pas 4', null), ('Zoom - pas à pas 5', null),
  ('Zoom 1', null), ('Zoom 2', null), ('Zoom 3', null)
on conflict (nombre) do nothing;


-- ---------------------------------------------------------------------------
-- Semilla: unidades reales confirmadas (7 métodos; el resto del catálogo
-- queda sin unidades hasta que las cargues tú desde admin.html)
-- ---------------------------------------------------------------------------

insert into public.metodo_unidades (metodo_id, orden, titulo)
select m.id, u.orden, u.titulo
from public.metodos m
join (values
  (1,'Dossier de découverte'), (2,'Unité 1 — Portrait-robot'), (3,'Unité 2 — D''ici et d''ailleurs'),
  (4,'Unité 3 — Un air de famille'), (5,'Unité 4 — Entre quatre murs'), (6,'Unité 5 — Métro, boulot, dodo'),
  (7,'Unité 6 — Échappées belles'), (8,'Unité 7 — À deux pas d''ici'), (9,'Unité 8 — Une pincée de sel')
) as u(orden, titulo) on true
where m.nombre = 'Défi 1'
on conflict (metodo_id, orden) do nothing;

insert into public.metodo_unidades (metodo_id, orden, titulo)
select m.id, u.orden, u.titulo
from public.metodos m
join (values
  (1,'Unité 1 — La consommation'), (2,'Unité 2 — Objets du quotidien'), (3,'Unité 3'), (4,'Unité 4'),
  (5,'Unité 5'), (6,'Unité 6'), (7,'Unité 7'), (8,'Unité 8')
) as u(orden, titulo) on true
where m.nombre = 'Défi 2'
on conflict (metodo_id, orden) do nothing;

insert into public.metodo_unidades (metodo_id, orden, titulo)
select m.id, u.orden, u.titulo
from public.metodos m
join (values
  (1,'Unité 1'), (2,'Unité 2'), (3,'Unité 3'), (4,'Unité 4'), (5,'Unité 5'), (6,'Unité 6'), (7,'Unité 7'), (8,'Unité 8')
) as u(orden, titulo) on true
where m.nombre = 'Entre nous 1'
on conflict (metodo_id, orden) do nothing;

insert into public.metodo_unidades (metodo_id, orden, titulo)
select m.id, u.orden, u.titulo
from public.metodos m
join (values
  (1,'Unité 1'), (2,'Unité 2'), (3,'Unité 3'), (4,'Unité 4 (lexique des émotions)'), (5,'Unité 5'),
  (6,'Unité 6 (lexique de la santé, du sport)'), (7,'Unité 7'), (8,'Unité 8 (consommation, écologie, conflits de travail)')
) as u(orden, titulo) on true
where m.nombre = 'Entre nous 2'
on conflict (metodo_id, orden) do nothing;

insert into public.metodo_unidades (metodo_id, orden, titulo)
select m.id, u.orden, u.titulo
from public.metodos m
join (values
  (1,'Unité 1'), (2,'Unité 2'), (3,'Unité 3 — Oser vivre sa vie'), (4,'Unité 4 — Gérer son image'),
  (5,'Unité 5'), (6,'Unité 6'), (7,'Unité 7'), (8,'Unité 8')
) as u(orden, titulo) on true
where m.nombre = 'Entre nous 3'
on conflict (metodo_id, orden) do nothing;

insert into public.metodo_unidades (metodo_id, orden, titulo)
select m.id, u.orden, u.titulo
from public.metodos m
join (values
  (1,'Unité 1'), (2,'Unité 2 (santé, alimentation, âges de la vie, solidarité)'), (3,'Unité 3'), (4,'Unité 4'),
  (5,'Unité 5'), (6,'Unité 6 (indignation, écologie)'), (7,'Unité 7'), (8,'Unité 8 (art, exil, migrations)')
) as u(orden, titulo) on true
where m.nombre = 'Entre nous 4'
on conflict (metodo_id, orden) do nothing;

insert into public.metodo_unidades (metodo_id, orden, titulo)
select m.id, u.orden, u.titulo
from public.metodos m
join (values
  (1,'Vivre ensemble'), (2,'Le goût des nôtres'), (3,'Travailler autrement'),
  (4,'Date limite de consommation'), (5,'Le français dans le monde'), (6,'Médias en masse'),
  (7,'Et si on partait ?'), (8,'La planète en héritage'), (9,'Un tour en ville'),
  (10,'Soif d''apprendre'), (11,'Il va y avoir du sport !'), (12,'Cultiver les talents')
) as u(orden, titulo) on true
where m.nombre = 'Édito B1'
on conflict (metodo_id, orden) do nothing;

insert into public.metodo_unidades (metodo_id, orden, titulo)
select m.id, u.orden, u.titulo
from public.metodos m
join (values
  (1,'À mon avis'), (2,'Quelque chose à déclarer ?'), (3,'Ça presse !'), (4,'Partir'),
  (5,'Histoire de…'), (6,'À votre santé !'), (7,'Chassez le naturel…'), (8,'C''est de l''art !'),
  (9,'De vous à moi'), (10,'Au boulot !'), (11,'C''est pas net'), (12,'Mais où va-t-on ?')
) as u(orden, titulo) on true
where m.nombre = 'Édito B2'
on conflict (metodo_id, orden) do nothing;
