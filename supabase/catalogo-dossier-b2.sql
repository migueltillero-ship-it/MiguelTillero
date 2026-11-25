-- DOSSIER B2 convertido en fichas (estudiantes/espace-b2-dossier.js). cuenta = false: refuerzo, no cambia la nota.
-- Dónde: https://supabase.com/dashboard/project/yfrdlzveleevkjqekdoq/sql/new
insert into public.fichas_catalogo (clave, ficha, titulo, ejercicios, cuenta) values
  ('mt-b2', 'dos-b2-mod1', 'Les Indéfinis & Proportions (module 1)', 3, false),
  ('mt-b2', 'dos-b2-mod2', 'La Cause et la Conséquence (module 2)', 3, false),
  ('mt-b2', 'dos-b2-mod3', 'La Forme Passive (module 3)', 3, false),
  ('mt-b2', 'dos-b2-mod4', 'Pronoms Démonstratifs & Possessifs (module 4)', 3, false),
  ('mt-b2', 'dos-b2-mod5', 'Conditionnel & Expression du But (module 5)', 3, false),
  ('mt-b2', 'dos-b2-mod6', 'Les Émotions et les Sentiments (module 6)', 3, false),
  ('mt-b2', 'dos-b2-mod7', 'Exprimer son Opinion (module 7)', 3, false),
  ('mt-b2', 'dos-b2-mod8', 'Le Discours Argumenté (module 8)', 3, false)
on conflict (clave, ficha) do update set titulo = excluded.titulo, ejercicios = excluded.ejercicios, cuenta = excluded.cuenta;
