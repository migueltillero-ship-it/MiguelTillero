-- ============================================================================
-- Plataforma docente / estudiantil — Miguel Tillero
-- ESQUEMA V6 — corrige un error de schema_v5.sql y completa la progresión
-- real de Défi 2 a Défi 5, todo tomado directamente del índice del PDF que
-- Miguel compartió (Défi, Biras et al., CLE International).
--
-- CORRECCIÓN: schema_v5.sql cargó 8 unidades bajo el nombre "Défi 3", pero
-- esas 8 unidades ("À quoi ça sert ?"...) en realidad son de "Défi 2" —
-- error de lectura del PDF. Este archivo:
--   1) Borra esas 8 filas mal asignadas a Défi 3.
--   2) Borra las unidades genéricas ("Unité 3"…"Unité 8") que traía Défi 2
--      desde schema_v2.sql — eran un placeholder, no el índice real.
--   3) Inserta el índice real y completo de Défi 2, Défi 3, Défi 4 y Défi 5.
--
-- CÓMO USAR: ejecuta este archivo DESPUÉS de schema_v5.sql. Es seguro volver
-- a ejecutarlo las veces que haga falta.
-- ============================================================================

-- 1) Limpieza de lo mal cargado.
delete from public.metodo_unidades
where metodo_id = (select id from public.metodos where nombre = 'Défi 3');

delete from public.metodo_unidades
where metodo_id = (select id from public.metodos where nombre = 'Défi 2');

-- 2) Défi 2 — 8 unidades reales.
insert into public.metodo_unidades (metodo_id, orden, titulo)
select m.id, u.orden, u.titulo
from public.metodos m
join (values
  (1,'À quoi ça sert ?'),
  (2,'Un comprimé matin, midi et soir'),
  (3,'Un vrai cordon bleu'),
  (4,'En pleine forme'),
  (5,'Mention très bien'),
  (6,'Gagner sa vie'),
  (7,'Un chef-d''œuvre !'),
  (8,'Ça vaut le détour !')
) as u(orden, titulo) on true
where m.nombre = 'Défi 2'
on conflict (metodo_id, orden) do nothing;

-- 3) Défi 3 — 9 unidades reales (no 8: no comparte estructura con Défi 2).
insert into public.metodo_unidades (metodo_id, orden, titulo)
select m.id, u.orden, u.titulo
from public.metodos m
join (values
  (1,'Des racines et des ailes'),
  (2,'Allez, raconte !'),
  (3,'Langues vivantes'),
  (4,'Bêtes de scène'),
  (5,'Le monde 2.0'),
  (6,'À consommer avec modération'),
  (7,'Planète pas nette'),
  (8,'On lâche rien !'),
  (9,'Êtres différents')
) as u(orden, titulo) on true
where m.nombre = 'Défi 3'
on conflict (metodo_id, orden) do nothing;

-- 4) Défi 4 — 9 unidades reales.
insert into public.metodo_unidades (metodo_id, orden, titulo)
select m.id, u.orden, u.titulo
from public.metodos m
join (values
  (1,'Ville en vie'),
  (2,'De la fourche à la fourchette'),
  (3,'De la tête aux pieds'),
  (4,'D''amour ou d''amitié'),
  (5,'Le cœur à l''ouvrage'),
  (6,'L''art et la manière'),
  (7,'Sur le bout de la langue'),
  (8,'La règle du jeu'),
  (9,'Mort de rire')
) as u(orden, titulo) on true
where m.nombre = 'Défi 4'
on conflict (metodo_id, orden) do nothing;

-- 5) Défi 5 — 12 unidades reales (nivel C1, el más extenso de la serie).
insert into public.metodo_unidades (metodo_id, orden, titulo)
select m.id, u.orden, u.titulo
from public.metodos m
join (values
  (1,'L''harmonie'),
  (2,'La notation'),
  (3,'Limites et transgression'),
  (4,'Le plaisir'),
  (5,'Le pardon'),
  (6,'La violence'),
  (7,'La politesse'),
  (8,'Mystère...'),
  (9,'La peur'),
  (10,'L''argent'),
  (11,'Points de vue'),
  (12,'Identités et appartenances')
) as u(orden, titulo) on true
where m.nombre = 'Défi 5'
on conflict (metodo_id, orden) do nothing;
