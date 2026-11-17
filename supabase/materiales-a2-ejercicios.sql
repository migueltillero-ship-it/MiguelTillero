-- Registra en «Materiales» del grupo A2.1-NOV2026 las cinco fichas de la Unité 5.
-- La página: estudiantes/espace-a2-exercices.html + estudiantes/espace-a2-fiches.js
-- Es seguro repetirlo: no duplica materiales.
-- Dónde: https://supabase.com/dashboard/project/yfrdlzveleevkjqekdoq/sql/new
insert into public.materiales (grupo_id, titulo, descripcion, url, categoria, unidad, orden)
select g.id, v.titulo, v.descripcion,
       'https://migueltillero-ship-it.github.io/MiguelTillero/estudiantes/espace-a2-exercices.html#' || v.ancla,
       'refuerzo', 'Unité 5', v.orden
from public.grupos g,
(values
  (1, 'u5-p80', 'Fiche 1 · Sortir, dormir, prendre — la routine (p. 80)',
      'Conjugación de los tres verbos y las expresiones del libro: prendre une douche, sortir avec des amis… Con explicación al principio.'),
  (2, 'u5-p81', 'Fiche 2 · Faire, et le défi de la routine (p. 81)',
      'El verbo faire, las expresiones con faire y cómo dar consejos con el imperativo para salir de la rutina.'),
  (3, 'u5-p82', 'Fiche 3 · Temps de travail — France, Belgique, Suisse (pp. 82-83)',
      'Leer las cifras de la infografía, comparar con plus / moins / autant y presentar el trabajo en tu país.'),
  (4, 'u5-p84', 'Fiche 4 · Les travailleurs du dimanche — la fréquence (pp. 84-85)',
      'Los adverbios de frecuencia, ne… jamais y la élision. Con dictado y una pequeña producción.'),
  (5, 'u5-p86', 'Fiche 5 · Le calendrier, les jours et les mots (pp. 86-88)',
      'Meses, estaciones, fechas y días de la semana: en, au, le lundi, tous les lundis, du lundi au vendredi.')
) as v(orden, ancla, titulo, descripcion)
where g.codigo = 'A2.1-NOV2026'
on conflict (coalesce(grupo_id, '00000000-0000-0000-0000-000000000000'::uuid), url)
do update set titulo = excluded.titulo, descripcion = excluded.descripcion,
              categoria = excluded.categoria, unidad = excluded.unidad, orden = excluded.orden;
