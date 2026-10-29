-- ===========================================================================
-- CICLO B2 · PLANIFICACIÓN DE LAS DOCE SESIONES
-- ===========================================================================
-- Las sesiones se habían generado con un título provisional («Séance 5 de
-- 12»), de modo que el estudiante que entraba a su espacio veía el
-- calendario con las casillas vacías. Aquí se llenan.
--
-- El reparto sigue el ritmo real de la clase: entre una y dos páginas del
-- método por sesión, una sesión de repaso antes del cierre y las dos
-- evaluaciones finales. No entra todo el contenido del libro, y no debe:
-- se adapta lo que da tiempo a trabajar bien.
--
--   19 oct · p. 20-21 · Rendez-vous «Être éducateur au goût»
--   21 oct · p. 22-23 · Communication y Grammaire — cierre de la Unité 1
--   26 oct · p. 24-25 · Méthodologie DELF — Prendre des notes
--   28 oct · p. 26-27 · Unité 2 «Tellement genré !»
--    2 nov · p. 28-29 · Bébés et jouets
--    4 nov ·          · Repaso y preparación de la evaluación
--    9 nov ·          · Évaluation collective
--   11 nov ·          · Évaluation individuelle
--
-- No contiene ningún dato personal: es solo contenido de curso.
-- Es seguro repetirlo.
-- Dónde: Supabase → SQL Editor → New query → pegar → Run.
-- ===========================================================================

do $$
declare
  v_grupo uuid;
begin
  select id into v_grupo from public.grupos where codigo = 'B2-OCT2026';
  if v_grupo is null then
    raise exception 'No existe el grupo B2-OCT2026. Ejecuta antes ciclo-b2-oct2026.sql.';
  end if;

  -- ── 19 de octubre ────────────────────────────────────────────────────
  update public.sesiones set
    tema = 'Rendez-vous · Être éducateur au goût',
    contenido = E'Páginas 20-21 · Un oficio poco conocido como pretexto para hablar de gustos.\n'
      '• Comprensión escrita: el retrato de Quentin, educador del gusto en Occitania.\n'
      '• Act. 1 — Verdadero o falso: lo que hace y lo que NO hace su oficio (no es nutricionista, no juzga el mal gusto).\n'
      '• Act. 2 — ¿Qué es la educación del gusto según él?\n'
      '• Act. 3 — ¿Por qué querría abrir talleres para adultos?\n'
      '• Act. 4 — Producción oral en grupos: ideas recibidas sobre lo que se hace o no en cocina. ¿Qué alimentos combinan bien?\n'
      '• Léxico del texto: aliments bruts / transformés · sucré, salé, amer, acide · une assiette stylée.'
   where grupo_id = v_grupo and fecha = date '2026-10-19';

  -- ── 21 de octubre ────────────────────────────────────────────────────
  update public.sesiones set
    tema = 'Communication et Grammaire · cierre de la Unité 1',
    contenido = E'Páginas 22-23 · Ordenamos y consolidamos todo lo de la unidad.\n'
      '• COMUNICACIÓN — Expresar el gusto con énfasis, el disgusto con cortesía y el entusiasmo estético: «ça pique les yeux», «ce n''est pas très heureux», «ça en jette».\n'
      '• Describir el estilo y la ropa: décontracté / élégant / négligé · serré ≠ large · la chemise boutonnée, les manches retroussées, le col relevé.\n'
      '• Las buenas y las malas maneras, y cómo reaccionar ante ellas.\n'
      '• GRAMÁTICA — CE QUI / CE QUE: el pronombre indefinido «ce» y sus funciones en la frase (sujeto, complemento directo, indirecto, de agente).\n'
      '• Repaso del DOUBLE COMPARATIF con sustantivos («plus de», «moins de») y los comparativos irregulares: plus… mieux, moins… meilleur.\n'
      '• PLUTÔT QUE para expresar preferencia, y «plutôt» como matiz («plutôt classe»).'
   where grupo_id = v_grupo and fecha = date '2026-10-21';

  -- ── 26 de octubre ────────────────────────────────────────────────────
  update public.sesiones set
    tema = 'Méthodologie DELF · Prendre des notes',
    contenido = E'Páginas 24-25 · Una técnica que sirve para el examen y para la vida.\n'
      '• Act. 1 — ¿En qué ocasiones se toman notas y para qué? Lectura de unas notas reales de clase.\n'
      '• La ficha MÉTHODO: se habla a 150-200 palabras por minuto y se escribe a 25-40. Tomar notas es seleccionar y reformular, no transcribir.\n'
      '• Abreviaturas y símbolos corrientes: ex, mn, compr°, NRJ, VH, =, ≠, >, <, bcp, tjrs, qqch.\n'
      '• Act. 2 — Escuchar el curso y comprobar si las notas se interpretaron bien.\n'
      '• Act. 3 — PRODUCCIÓN: escuchar el pódcast «Pourquoi pas tous les mêmes goûts ?» y tomar notas apoyándose en la entonación. Comparar en grupos y verificar con la transcripción.\n'
      '• Consejos: escribir solo lo importante, poner en valor la estructura, releer justo después.'
   where grupo_id = v_grupo and fecha = date '2026-10-26';

  -- ── 28 de octubre ────────────────────────────────────────────────────
  -- Lo que se hizo de verdad: la apertura de la Unité 2 pasó al 2 de noviembre.
  update public.sesiones set
    tema = 'Révision du vocabulaire · La nétiquette (livre p. 19, act. 23-24)',
    contenido = E'Repaso general del vocabulario de la unidad.\n'
      '• Act. 23 — Vídeo: ¿qué es la nétiquette? ¿Qué se hace y qué no, según el interviniente?\n'
      '• Las fórmulas para juzgar: ça se fait / ça ne se fait pas, ce qu''il faut dire / faire, il vaut mieux, mieux vaut, proverbios con valoir.\n'
      '• Deberes para el 2 de noviembre (en «Mes devoirs»): los buenos modales en la mesa en México, con una imagen; y ceder el asiento en el transporte público.'
   where grupo_id = v_grupo and fecha = date '2026-10-28';

  -- ── 2 de noviembre ───────────────────────────────────────────────────
  update public.sesiones set
    tema = 'Unité 2 · Tellement genré ! — los estereotipos de género',
    contenido = E'Páginas 26-27 · Abrimos unidad con un juego que da mucho que hablar.\n'
      '• Al empezar: comentamos los deberes de la nétiquette (la mesa en México y ceder el asiento).\n'
      '• Act. 1 — El juego de cartas de los estereotipos: escuchar las reglas y jugar. «Vrai ou faux ?»\n'
      '• Act. 2 — ¿En qué frases hubo acuerdo mayoritario?\n'
      '• Act. 3 — Opinar sobre el juego con las expresiones de la etiqueta: ça favorise… · ça permet de… · ça aide à… · ça évite / empêche de…\n'
      '• Act. 4 — En grupos, proponer otras frases y reaccionar: «N''importe quoi ! C''est tellement cliché !»\n'
      '• Act. 5 — Comprensión oral: la crónica de radio. ¿Qué dice el estudio sobre las cualidades profesionales, la ambición y las consecuencias?\n'
      '• Act. 6 — ¿Qué carta del juego queda cuestionada por el estudio?'
   where grupo_id = v_grupo and fecha = date '2026-11-02';

  -- ── 4 de noviembre ───────────────────────────────────────────────────
  update public.sesiones set
    tema = 'Bébés et jouets · tellement, pourvu que, avoir hâte de',
    contenido = E'Páginas 28-29 · Del artículo a la gramática de la intensidad y el deseo.\n'
      '• Act. 7 — Lectura: «Grossesse : pourquoi ne pas vouloir connaître le sexe de son bébé ?». ¿Qué argumentos convencen más?\n'
      '• Act. 8-9 — Reformular las expresiones en negrita y completar de memoria.\n'
      '• GRAMÁTICA — TELLEMENT: la intensidad («je suis tellement contente»), la cantidad («tellement de vêtements») y la consecuencia («tellement… que»).\n'
      '• Act. 10-11 — Testimonios: quién quiso saber el sexo y por qué. POURVU QUE y AVOIR HÂTE DE / QUE, con subjuntivo.\n'
      '• Act. 12 — Pronunciación: imitar la entonación. ¿Se usa igual en nuestra lengua?\n'
      '• Act. 13 — En grupos: expresar deseos para el próximo curso.\n'
      '• Act. 14-16 — VÍDEO «Les jouets genrés»: a qué juegan la niña y el niño, qué valores se asocian a cada juego, y los juguetes de nuestro entorno.\n'
      '• Léxico: attendre un enfant — la grossesse, tomber enceinte, l''accouchement, la naissance.\n'
      '• Al final: dudas antes de las pruebas. El repaso de todo el ciclo se hace con la ficha «Révision générale» del espacio de ejercicios.'
   where grupo_id = v_grupo and fecha = date '2026-11-04';

  -- ── Las dos evaluaciones: decir qué se evalúa ────────────────────────
  update public.sesiones set
    contenido = E'Prueba escrita, en grupo y en línea.\n'
      '• Comprensión oral y comprensión escrita sobre los temas de las unidades 1 y 2.\n'
      '• Producción escrita.\n'
      '• Gramática: ce qui / ce que, double comparatif, plutôt que, tellement, pourvu que.\n'
      'Se hace con la herramienta de evaluación de la plataforma, con tiempo contado.'
   where grupo_id = v_grupo and fecha = date '2026-11-09';

  update public.sesiones set
    contenido = E'Prueba oral, individual, y entrega de resultados.\n'
      '• Producción oral a partir de un tema de las unidades trabajadas.\n'
      '• Interacción con el profesor.\n'
      '• Ese mismo día, entrega de los resultados del ciclo con su comentario, uno por uno.'
   where grupo_id = v_grupo and fecha = date '2026-11-11';
end $$;


-- ---------------------------------------------------------------------------
-- Comprobación
-- ---------------------------------------------------------------------------

select
  to_char(s.fecha, 'TMDy DD/MM')            as dia,
  s.tema,
  length(s.contenido)                       as caracteres
from public.sesiones s
join public.grupos g on g.id = s.grupo_id and g.codigo = 'B2-OCT2026'
order by s.fecha;
