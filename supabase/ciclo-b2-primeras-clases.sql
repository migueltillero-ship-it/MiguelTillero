-- ===========================================================================
-- CICLO B2 · LAS DOS PRIMERAS CLASES (5 y 7 de octubre)
-- ===========================================================================
-- Eran las únicas que seguían con el título provisional «Séance 1 de 12» y
-- «Séance 2 de 12», sin contenido. Se reconstruyen con lo que consta del
-- ciclo: arrancó el 5 de octubre con libro nuevo, en la Unité 1
-- «Faute de goût ?», y las clases del 12 y del 14 ya continúan con
-- «Le fond et la forme» y la nétiquette. No se indican páginas porque no
-- constan; si hace falta, se agregan desde el panel docente → Planificación.
--
-- Solo toca las dos sesiones si todavía tienen el título provisional:
-- si ya las escribiste a mano, no las pisa.
-- No contiene ningún dato personal. Es seguro repetirlo.
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

  -- ── 5 de octubre ─────────────────────────────────────────────────────
  update public.sesiones set
    tema = 'Inicio del ciclo · Ouverture de l''Unité 1 «Faute de goût ?»',
    contenido = E'Primera clase del ciclo: el recorrido y la entrada a la unidad.\n'
      '• Presentación del ciclo: seis semanas, doce clases, el calendario y las dos evaluaciones de cierre (9 y 11 de noviembre).\n'
      '• El libro nuevo y la plataforma: dónde están el calendario, el enlace de la clase, el libro en línea y los resultados.\n'
      '• Ouverture de l''Unité 1 «Faute de goût ?»: ¿qué es tener buen o mal gusto? ¿Quién lo decide?\n'
      '• Producción oral: primeras opiniones sobre la moda, el estilo y las apariencias.\n'
      '• Léxico de entrada: le goût, le style, la mode, être tendance / démodé.'
   where grupo_id = v_grupo and fecha = date '2026-10-05' and tema like 'Séance %';

  -- ── 7 de octubre ─────────────────────────────────────────────────────
  update public.sesiones set
    tema = 'Unité 1 · Faute de goût ? — la mode, le style et comment justifier',
    contenido = E'Entramos de lleno en la unidad.\n'
      '• Léxico de la moda y del estilo para describir y valorar una apariencia.\n'
      '• Herramientas para justificar una opinión: parce que, puisque, c''est pour ça que, en effet.\n'
      '• Gramática en contexto: CE QUI / CE QUE para poner de relieve lo que gusta o molesta («ce qui me plaît, c''est…»).\n'
      '• Los comparativos paralelos: «plus… plus…», «moins… moins…».\n'
      '• PLUTÔT para matizar una opinión («c''est plutôt réussi»).\n'
      '• Producción oral: defender un estilo que te guste y otro que no, justificando cada opinión.'
   where grupo_id = v_grupo and fecha = date '2026-10-07' and tema like 'Séance %';
end $$;


-- ---------------------------------------------------------------------------
-- Comprobación: ninguna sesión del B2 debería seguir como «Séance N de 12»
-- ---------------------------------------------------------------------------
select
  to_char(s.fecha, 'TMDy DD/MM')            as dia,
  s.tema,
  length(s.contenido)                       as caracteres
from public.sesiones s
join public.grupos g on g.id = s.grupo_id and g.codigo = 'B2-OCT2026'
order by s.fecha;
