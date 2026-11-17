-- CATÁLOGO DE FICHAS DE A2.1 (espace-a2-fiches.js): cuántos ejercicios tiene cada ficha.
-- Es un espacio propio (clave 'mt-a2') para que las fichas de A2.1 NO se mezclen con las de A1.4
-- ni cambien la nota de ejercicios de ese ciclo, que ya está cerrado.
-- La prueba pruebas-navegador/catalogo-al-dia.js avisa si el sitio y este catálogo se separan.
-- Dónde: https://supabase.com/dashboard/project/yfrdlzveleevkjqekdoq/sql/new
insert into public.fichas_catalogo (clave, ficha, titulo, ejercicios) values
  ('mt-a2', 'u5-p80', 'Sortir, dormir, prendre — la routine', 7),
  ('mt-a2', 'u5-p81', 'Faire, et le défi de la routine', 7),
  ('mt-a2', 'u5-p82', 'Temps de travail — France, Belgique, Suisse', 6),
  ('mt-a2', 'u5-p84', 'Les travailleurs du dimanche — la fréquence', 6),
  ('mt-a2', 'u5-p86', 'Le calendrier, les jours et les mots', 8)
on conflict (clave, ficha) do update set titulo = excluded.titulo, ejercicios = excluded.ejercicios;
