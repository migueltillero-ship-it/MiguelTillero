-- ===========================================================================
-- EJERCICIOS COMPLEMENTARIOS DEL CICLO B2 · OCTUBRE-NOVIEMBRE 2026
-- ===========================================================================
-- Registra en «Materiales» del espacio del estudiante las nueve fichas de
-- ejercicios del ciclo. Cada una apunta a su apartado dentro de la misma
-- página, que se corrige sola y guarda el avance en el navegador.
--
-- La página vive en el sitio, no en la base de datos:
--   estudiantes/b2-oct2026.html  +  estudiantes/b2-oct2026-fiches.js
-- Por eso esto solo son enlaces: si mañana se añade una ficha, se añade una
-- fila aquí y ya está.
--
-- CÓMO USAR: ejecútalo después de ciclo-b2-oct2026.sql y de
-- materiales-y-resultados.sql (que es quien crea la tabla «materiales»).
-- Es seguro repetirlo: actualiza en lugar de duplicar.
-- Dónde: Supabase → SQL Editor → New query → pegar → Run.
-- ===========================================================================

-- Si llegaste a ejecutar una versión anterior de este guion, las entradas
-- apuntaban a la dirección del ciclo (…/b2-oct2026.html). Esas filas se retiran
-- para que no aparezcan duplicadas junto a las nuevas.
delete from public.materiales m
 using public.grupos g
 where g.id = m.grupo_id and g.codigo = 'B2-OCT2026'
   and m.url like '%b2-oct2026.html%';

do $$
declare
  v_grupo uuid;
  v_base text := 'https://migueltillero-ship-it.github.io/MiguelTillero/estudiantes/espace-b2-exercices.html';
  r record;
begin
  select id into v_grupo from public.grupos where codigo = 'B2-OCT2026';
  if v_grupo is null then
    raise exception 'No existe el grupo B2-OCT2026. Ejecuta antes ciclo-b2-oct2026.sql.';
  end if;

  for r in
    select * from (values
      (2, 'Exercices complémentaires — toutes les séances', 'material', null::text,
       'La portada: una ficha por clase, con tu avance. Empieza por aquí.',
       ''),

      (3, 'Séances 1 à 4 · Question de goût', 'refuerzo', 'Unité 1',
       'Lo de las cuatro primeras clases por otro camino: expresiones con goût y con '
       || 'valoir, describir un estilo, las buenas maneras a la francesa.',
       '#s1-4'),

      (4, 'Séance du 19 octobre · Être éducateur au goût', 'refuerzo', 'Unité 1',
       'Las cinco saveurs —con la quinta que el libro no nombra—, las texturas, '
       || 'bruto / transformado / ultraprocesado, y cómo hablar de un plato sin juzgarlo.',
       '#s5'),

      (5, 'Séance du 21 octobre · Ce qui, ce que, comparatifs', 'refuerzo', 'Unité 1',
       'La ficha de gramática del ciclo: ce qui / ce que / ce dont / ce à quoi, la mise '
       || 'en relief, el doble comparativo con mieux y meilleur, y plutôt que.',
       '#s6'),

      (6, 'Parcours vidéo · L’art de la table et le savoir-vivre', 'juego', 'Unité 1',
       'El vídeo de Mcfly et Carlito con Carmel, convertido en recorrido: el vídeo va '
       || 'dentro y cada pregunta salta a su minuto. Léxico, doce vrai/faux, registros, '
       || 'concesión con subjuntivo y producción DELF. Se valida al 80 %.',
       '#savoir-vivre'),

      (7, 'Séance du 26 octobre · Prendre des notes', 'refuerzo', 'Unité 1',
       'Descifrar notas, abreviar, y oír cifras al vuelo. Es la técnica que decide '
       || 'la compréhension orale del examen.',
       '#s7'),

      (8, 'Séance du 28 octobre · Tellement genré !', 'refuerzo', 'Unité 2',
       'Estereotipo, prejuicio, cliché e idea recibida: cuatro palabras que no son lo '
       || 'mismo. Y la construcción exacta de ça permet de, ça aide à, ça évite de.',
       '#s8'),

      (9, 'Séance du 2 novembre · Tellement, pourvu que, avoir hâte', 'refuerzo', 'Unité 2',
       'La gramática más rentable del ciclo: los tres tellement, el subjuntivo del deseo '
       || 'y el léxico de la espera de un hijo.',
       '#s9'),

      (10, 'Révision générale du 4 novembre', 'refuerzo', 'Unité 1-2',
       'Un diagnóstico de todo el ciclo: cada pregunta que falles te dice a qué ficha '
       || 'volver. Hazlo antes del lunes 9.',
       '#s10'),

      (11, 'Épreuve blanche — écrit', 'evaluacion', 'Unité 1-2',
       'Una prueba de ensayo completa con el formato del DELF B2: comprensión oral, '
       || 'comprensión escrita y producción escrita de 250 palabras. Crono en mano.',
       '#s11'),

      (12, 'Préparer l’oral', 'evaluacion', 'Unité 1-2',
       'El formato del oral minuto a minuto, las frases que estructuran un exposé y '
       || 'tres temas para ensayar en voz alta.',
       '#s12')
    ) as t(orden, titulo, categoria, unidad, descripcion, ancla)
  loop
    insert into public.materiales (grupo_id, titulo, descripcion, url, categoria, unidad, orden)
    values (v_grupo, r.titulo, r.descripcion, v_base || r.ancla, r.categoria, r.unidad, r.orden)
    on conflict (coalesce(grupo_id, '00000000-0000-0000-0000-000000000000'::uuid), url)
    do update set titulo      = excluded.titulo,
                  descripcion = excluded.descripcion,
                  categoria   = excluded.categoria,
                  unidad      = excluded.unidad,
                  orden       = excluded.orden;
  end loop;

  raise notice 'Diez entradas de ejercicios registradas para el grupo B2-OCT2026.';
end $$;


-- ---------------------------------------------------------------------------
-- Comprobación
-- ---------------------------------------------------------------------------

select m.orden, m.categoria, coalesce(m.unidad, '—') as unidad, m.titulo
from public.materiales m
join public.grupos g on g.id = m.grupo_id and g.codigo = 'B2-OCT2026'
order by m.orden;
