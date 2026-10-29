-- ============================================================================
-- CICLO B2 · se recorre el contenido desde el 28 de octubre
-- El 28 se vio la nétiquette; la apertura de la Unité 2 pasa al 2 de noviembre
-- y «Bébés et jouets» al 4. El repaso general queda en la ficha de révision.
-- (ciclo-b2-planificacion.sql ya está actualizado con esto mismo.)
-- Supabase → SQL Editor → pegar → Run. Es seguro repetirlo.
-- ============================================================================

do $$
declare v_grupo uuid;
begin
  select id into v_grupo from public.grupos where codigo = 'B2-OCT2026';
  if v_grupo is null then raise exception 'No existe el grupo B2-OCT2026.'; end if;

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

end $$;

select to_char(s.fecha, 'TMDy DD/MM') as dia, s.tema
from public.sesiones s
join public.grupos g on g.id = s.grupo_id and g.codigo = 'B2-OCT2026'
where s.fecha between date '2026-10-26' and date '2026-11-11'
order by s.fecha;
