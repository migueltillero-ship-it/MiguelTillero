-- CATÁLOGO DE FICHAS DE B2 (espace-b2-fiches.js): cuántos ejercicios tiene cada ficha.
-- La nota y el seguimiento de ejercicios se calculan sobre TODO lo que se ofreció, así que la
-- base necesita este número. Si una ficha cambia en el sitio, se actualiza aquí; la prueba
-- pruebas-navegador/catalogo-al-dia.js avisa si se separan.
-- No cambia la nota de nadie: solo permite ver qué ha hecho cada estudiante (v_ejercicios_por_ficha).
-- Dónde: https://supabase.com/dashboard/project/yfrdlzveleevkjqekdoq/sql/new
insert into public.fichas_catalogo (clave, ficha, titulo, ejercicios) values
  ('mt-b2', 'u1-p12', 'Les enfants et leurs goûts', 6),
  ('mt-b2', 'u1-p14', 'Faux pas vestimentaires', 7),
  ('mt-b2', 'u1-p16', 'C’est plutôt joli — le « bon mauvais goût »', 7),
  ('mt-b2', 'savoir-vivre', 'Ça se fait, ça ne se fait pas — à table, au travail, en rendez-vous', 24),
  ('mt-b2', 's5', 'Être éducateur au goût', 7),
  ('mt-b2', 's6', 'Communication et grammaire — toute l’unité', 8),
  ('mt-b2', 's7', 'Prendre des notes — méthodologie DELF', 7),
  ('mt-b2', 'netiquette', 'La nétiquette — ce qui se fait, ce qui ne se fait pas', 18),
  ('mt-b2', 's8', 'Tellement genré ! — nommer les clichés', 13),
  ('mt-b2', 's9', 'Bébés et jouets — tellement, pourvu que, avoir hâte', 13),
  ('mt-b2', 's10', 'Révision générale — tout le cycle', 5),
  ('mt-b2', 's11', 'Épreuve blanche — écrit', 4),
  ('mt-b2', 's12', 'Préparer l’oral', 4)
on conflict (clave, ficha) do update set titulo = excluded.titulo, ejercicios = excluded.ejercicios;
