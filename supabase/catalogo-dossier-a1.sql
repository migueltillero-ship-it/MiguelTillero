-- DOSSIER A1 convertido en fichas (estudiantes/espace-a1-dossier.js). cuenta = false: no cambia la nota del ciclo cerrado.
-- Dónde: https://supabase.com/dashboard/project/yfrdlzveleevkjqekdoq/sql/new
insert into public.fichas_catalogo (clave, ficha, titulo, ejercicios, cuenta) values
  ('mt-a1', 'dos-a1-mod1', 'Premiers Contacts (module 1)', 2, false),
  ('mt-a1', 'dos-a1-mod2', 'Portrait-robot & Nombres (module 2)', 2, false),
  ('mt-a1', 'dos-a1-mod3', 'État Civil & Identité (module 3)', 2, false),
  ('mt-a1', 'dos-a1-mod4', 'Le Logement et l''Espace (module 4)', 2, false)
on conflict (clave, ficha) do update set titulo = excluded.titulo, ejercicios = excluded.ejercicios, cuenta = excluded.cuenta;
