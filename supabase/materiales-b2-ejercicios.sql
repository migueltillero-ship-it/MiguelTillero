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
   and (m.url like '%b2-oct2026.html%'      -- la dirección del ciclo, ya sustituida
     or m.url like '%#s1-4');               -- la ficha de las páginas 14-19, ahora dividida en dos

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

      (3, 'Unité 1 · p. 12-13 — Les enfants et leurs goûts', 'refuerzo', 'Unité 1',
       'La apertura de la unidad: las seis viñetas, el vocabulario del gusto dudoso, '
       || 'la familia de «n’importe quoi» y el doble comparativo tal como aparece por '
       || 'primera vez, sin que nadie lo anuncie.',
       '#u1-p12'),

      (4, 'Unité 1 · p. 14-15 — Faux pas vestimentaires', 'refuerzo', 'Unité 1',
       'El artículo de Manu, el léxico de la ropa con un esquema dibujado, las '
       || 'expresiones con «pire» y las impresiones: ça fait…, on dirait…',
       '#u1-p14'),

      (5, 'Unité 1 · p. 16-17 — C’est plutôt joli', 'refuerzo', 'Unité 1',
       'El artículo del «bon mauvais goût», definir un concepto (c’est quand, c’est '
       || 'ce qui/ce que, c’est une question de), atenuar o exagerar, y plutôt.',
       '#u1-p16'),

      (7, 'Séance du 21 octobre · Être éducateur au goût', 'refuerzo', 'Unité 1',
       'Las cinco saveurs —con la quinta que el libro no nombra—, las texturas, '
       || 'bruto / transformado / ultraprocesado, y cómo hablar de un plato sin juzgarlo.',
       '#s5'),

      (8, 'Séance du 26 octobre · Ce qui, ce que, comparatifs', 'refuerzo', 'Unité 1',
       'La ficha de gramática del ciclo: ce qui / ce que / ce dont / ce à quoi, la mise '
       || 'en relief, el doble comparativo con mieux y meilleur, y plutôt que.',
       '#s6'),

      (6, 'Parcours · Ça se fait, ça ne se fait pas (p. 19)', 'juego', 'Unité 1',
       'Las expresiones de la actividad 22, lo que se hace y lo que no en una mesa '
       || 'francesa, y la comparación con lo de aquí. Con el vídeo dentro: cada pregunta '
       || 'salta a su minuto. Se valida al 80 %.',
       '#savoir-vivre'),

      (9, 'Séance du 28 octobre · Prendre des notes', 'refuerzo', 'Unité 1',
       'Descifrar notas, abreviar, y oír cifras al vuelo. Es la técnica que decide '
       || 'la compréhension orale del examen.',
       '#s7'),

      (10, 'Séance du 2 novembre · Tellement genré !', 'refuerzo', 'Unité 2',
       'Estereotipo, prejuicio, cliché e idea recibida: cuatro palabras que no son lo '
       || 'mismo. Y la construcción exacta de ça permet de, ça aide à, ça évite de.',
       '#s8'),

      (11, 'Séance du 4 novembre · Tellement, pourvu que, avoir hâte', 'refuerzo', 'Unité 2',
       'La gramática más rentable del ciclo: los tres tellement, el subjuntivo del deseo '
       || 'y el léxico de la espera de un hijo.',
       '#s9'),

      (12, 'Révision générale du 9 novembre', 'refuerzo', 'Unité 1-2',
       'Un diagnóstico de todo el ciclo: cada pregunta que falles te dice a qué ficha '
       || 'volver. Hazlo antes del miércoles 11.',
       '#s10'),

      (13, 'Épreuve blanche — écrit', 'evaluacion', 'Unité 1-2',
       'Una prueba de ensayo completa con el formato del DELF B2: comprensión oral, '
       || 'comprensión escrita y producción escrita de 250 palabras. Crono en mano.',
       '#s11'),

      (14, 'Préparer l’oral (16 novembre)', 'evaluacion', 'Unité 1-2',
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

  raise notice 'Entradas de ejercicios registradas para el grupo B2-OCT2026.';
end $$;


-- ---------------------------------------------------------------------------
-- Comprobación
-- ---------------------------------------------------------------------------

select m.orden, m.categoria, coalesce(m.unidad, '—') as unidad, m.titulo
from public.materiales m
join public.grupos g on g.id = m.grupo_id and g.codigo = 'B2-OCT2026'
order by m.orden;
