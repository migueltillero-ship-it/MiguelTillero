-- CATÁLOGO DE LAS BASES (estudiantes/fichas-bases.js) en los espacios A1, B2 y «bases» (particulares).
-- cuenta = false: son de refuerzo y NO cambian la nota de ejercicios de ciclos ya cerrados.
-- (En A2.1 las mismas fichas cuentan: están en catalogo-fichas-a2.sql.)
-- Dónde: https://supabase.com/dashboard/project/yfrdlzveleevkjqekdoq/sql/new
insert into public.fichas_catalogo (clave, ficha, titulo, ejercicios, cuenta) values
  ('mt-a1', 'rn-1', 'Les voyelles, simples et composées', 6, false),
  ('mt-a1', 'rn-2', 'Les sons nasaux : an, on, in, un', 5, false),
  ('mt-a1', 'rn-3', 'Les nombres de 0 à 100 : 60, 70, 80, 90', 6, false),
  ('mt-a1', 'rn-4', 'L’heure : dire, lire et écrire', 6, false),
  ('mt-a1', 'rn-5', 'Les verbes du premier groupe : -er', 6, false),
  ('mt-a1', 'rn-6', 'Les verbes du deuxième groupe : -ir, -issons', 6, false),
  ('mt-a1', 'rn-7', 'Les verbes du troisième groupe : être, avoir, aller, faire…', 6, false),
  ('mt-a1', 'rn-8', 'Les verbes de la routine : du présent au passé composé', 6, false),
  ('mt-a1', 'rn-9', 'Bilan : tout ensemble', 4, false),
  ('mt-b2', 'rn-1', 'Les voyelles, simples et composées', 6, false),
  ('mt-b2', 'rn-2', 'Les sons nasaux : an, on, in, un', 5, false),
  ('mt-b2', 'rn-3', 'Les nombres de 0 à 100 : 60, 70, 80, 90', 6, false),
  ('mt-b2', 'rn-4', 'L’heure : dire, lire et écrire', 6, false),
  ('mt-b2', 'rn-5', 'Les verbes du premier groupe : -er', 6, false),
  ('mt-b2', 'rn-6', 'Les verbes du deuxième groupe : -ir, -issons', 6, false),
  ('mt-b2', 'rn-7', 'Les verbes du troisième groupe : être, avoir, aller, faire…', 6, false),
  ('mt-b2', 'rn-8', 'Les verbes de la routine : du présent au passé composé', 6, false),
  ('mt-b2', 'rn-9', 'Bilan : tout ensemble', 4, false),
  ('mt-bases', 'rn-1', 'Les voyelles, simples et composées', 6, false),
  ('mt-bases', 'rn-2', 'Les sons nasaux : an, on, in, un', 5, false),
  ('mt-bases', 'rn-3', 'Les nombres de 0 à 100 : 60, 70, 80, 90', 6, false),
  ('mt-bases', 'rn-4', 'L’heure : dire, lire et écrire', 6, false),
  ('mt-bases', 'rn-5', 'Les verbes du premier groupe : -er', 6, false),
  ('mt-bases', 'rn-6', 'Les verbes du deuxième groupe : -ir, -issons', 6, false),
  ('mt-bases', 'rn-7', 'Les verbes du troisième groupe : être, avoir, aller, faire…', 6, false),
  ('mt-bases', 'rn-8', 'Les verbes de la routine : du présent au passé composé', 6, false),
  ('mt-bases', 'rn-9', 'Bilan : tout ensemble', 4, false)
on conflict (clave, ficha) do update set titulo = excluded.titulo, ejercicios = excluded.ejercicios, cuenta = excluded.cuenta;
