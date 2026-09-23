-- ============================================================================
-- Plataforma docente / estudiantil — Miguel Tillero
-- ESQUEMA V5 — unidades reales de Défi 3, confirmadas contra la tabla de
-- contenidos del propio libro (Défi, Méthode de français, Livre de l'élève,
-- Biras/Chevrier/Nitto — CLE International), niveau 3.
--
-- CÓMO USAR: ejecuta este archivo DESPUÉS de schema_v4.sql. Es seguro volver
-- a ejecutarlo las veces que haga falta.
-- ============================================================================

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
where m.nombre = 'Défi 3'
on conflict (metodo_id, orden) do nothing;
