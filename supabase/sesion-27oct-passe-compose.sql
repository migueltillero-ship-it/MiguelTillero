-- ===========================================================================
-- A1.4 · LA SESIÓN DEL 27 DE OCTUBRE PASA A SER EL PASSÉ COMPOSÉ
-- ===========================================================================
-- En la planificación, el 27 de octubre tocaba «Moments de la journée et
-- fréquence». En clase se vio otra cosa: el passé composé, por primera vez
-- en este nivel. El calendario del estudiante tiene que decir lo que pasó de
-- verdad, no lo que estaba previsto — si no, el día que alguien repase para
-- la evaluación va a buscar en el sitio equivocado.
--
-- Este guion hace tres cosas:
--   1. Reescribe el tema y el contenido de la sesión del 27.
--   2. Añade al 29 el bloque que se quedó sin dar (los momentos del día y la
--      frecuencia), porque sigue siendo de la Unité 5 y hay que verlo.
--   3. Deja el recordatorio del deber en el espacio de cada estudiante.
--
-- La ficha nueva se registra en materiales-a1-4-ejercicios.sql, donde viven
-- las otras seis: la lista de materiales tiene un solo dueño. Ejecuta ese
-- guion después de este.
-- La asistencia tampoco está aquí: va en asistencia.sql, que sirve para
-- cualquier día y cualquier grupo.
--
-- CÓMO USAR: pégalo tal cual. Es seguro repetirlo.
-- Dónde: Supabase → SQL Editor → New query → pegar → Run.
-- ===========================================================================

do $$
declare
  v_grupo uuid;
  v_fecha date := date '2026-10-27';
  v_sig   date := date '2026-10-29';
  v_desplazado text :=
    E'\n• Lo que quedó del 27: les moments de la journée (le matin, l''après-midi, '
    'le soir, la nuit; tôt / tard) y la fréquence (toujours, souvent, parfois, '
    'jamais; une fois par semaine). Se engancha con el passé composé: contar la '
    'jornada de ayer con su hora.';
begin
  select g.id into v_grupo from public.grupos g where g.codigo = 'A1-OCT2026';
  if v_grupo is null then
    raise exception 'No existe el grupo A1-OCT2026.';
  end if;

  if not exists (select 1 from public.sesiones s
                  where s.grupo_id = v_grupo and s.fecha = v_fecha) then
    raise exception 'No hay sesión del % en A1-OCT2026. Revisa la fecha.', v_fecha;
  end if;

  -- ── 1) El 27 de octubre, como fue ───────────────────────────────────────
  update public.sesiones set
    tema = 'Unité 5 — Le passé composé : raconter au passé (1re séance)',
    contenido =
      E'Primera vez que se ve el passé composé en este nivel. Sustituye lo previsto '
      'para hoy («Moments de la journée et fréquence»), que pasa a la sesión del 29.\n'
      '• Le passé composé es un tiempo compuesto: auxiliaire (être o avoir en '
      'présent) + participe passé.\n'
      '• Para qué sirve: raconter un événement passé, terminé et limité dans le temps.\n'
      '• Elegir el auxiliar: avoir por defecto; être con la maison d''être (entrer, '
      'sortir, aller, venir, arriver, partir, retourner, tomber, passer, rester, '
      'monter, descendre, mourir, naître, devenir) y con todos los verbos '
      'pronominaux.\n'
      '• Formar el participe passé: -er → é, -ir → i, y los irregulares (voir/vu, '
      'pouvoir/pu, connaître/connu, apprendre/appris, faire/fait, être/été, avoir/eu).\n'
      '• L''accord con être: Mani est arrivée, nous sommes allées, ils sont montés. '
      'Con avoir no hay acuerdo con el sujeto.\n'
      '• La négation: ne… pas a un lado y a otro del auxiliar; con los pronominaux, '
      'el ne va antes del pronombre (je ne me suis pas promenée).\n'
      '• Vídeo TV5MONDE: el viaje de Ousmane — una lista de acciones en passé '
      'composé, de principio a fin.\n'
      '• Para casa: la fiche 7 del espacio de ejercicios (siete etapas que se abren '
      'una a una) y las dos actividades de TV5MONDE que están al final.'
  where grupo_id = v_grupo and fecha = v_fecha;

  -- ── 2) Lo que se quedó sin dar se añade al 29, una sola vez ─────────────
  --     Si borras esta parte, el bloque desaparece del programa: no está en
  --     ningún otro sitio.
  update public.sesiones s set contenido = coalesce(s.contenido, '') || v_desplazado
   where s.grupo_id = v_grupo and s.fecha = v_sig
     and coalesce(s.contenido, '') not like '%Lo que quedó del 27%';

  raise notice 'Sesión del 27/10 reescrita y el bloque desplazado puesto en el 29.';
end $$;


-- ---------------------------------------------------------------------------
-- El recordatorio en el espacio de cada estudiante del grupo
-- ---------------------------------------------------------------------------
-- Sin nombres: la lista se toma del grupo. Repetirlo no lo duplica.

delete from public.avisos a
 using public.inscripciones i, public.grupos g
 where a.estudiante_id = i.estudiante_id
   and i.grupo_id = g.id and g.codigo = 'A1-OCT2026'
   and a.titulo = 'Le passé composé — à faire avant la prochaine séance';

insert into public.avisos (estudiante_id, titulo, mensaje, tipo, desde, hasta)
select distinct i.estudiante_id,
  'Le passé composé — à faire avant la prochaine séance',
  -- « Materiales » en español a propósito: es como se llama la pestaña en su
  -- panel. Traducirla aquí los mandaría a buscar algo que no existe.
  E'Dans l''onglet « Materiales », la fiche 7 vous attend : '
  '« Le passé composé, étape par étape ».\n\n'
  'Elle ne marche pas comme les autres. Il y a sept étapes, et chacune reste '
  'fermée jusqu''à ce que la précédente soit faite en entier et à 80 %. On ne '
  'peut donc pas cliquer au hasard pour avancer : il faut comprendre, et '
  'c''est le but.\n\n'
  -- En dos tandas a propósito. Dieciocho ejercicios para mañana es pedir que
  -- se hagan mal y de madrugada; las tres primeras etapas son justo la base
  -- que hace falta para la clase siguiente, y el resto llega de sobra para
  -- la evaluación. Dice lo mismo que el mensaje que reciben por WhatsApp:
  -- dos textos que se contradicen es lo que hace que no se crea ninguno.
  'Pour jeudi : les étapes 1, 2 et 3 — reconnaître le passé composé, '
  'choisir entre être et avoir, former le participe passé. Vingt minutes, '
  'pas plus.\n\n'
  'Pour le week-end : les étapes 4 à 7 — l''accord, la négation, et '
  'raconter votre journée d''hier — avec les deux exercices de TV5MONDE : '
  '« Le lycée, c''est fini » (A1) et « Reconnaître la forme du '
  'passé composé » (A2). Notez vos résultats dans le dernier exercice '
  'de la fiche.\n\n'
  'Si une étape ne s''ouvre pas, c''est normal : cliquez sur « Recommencer » '
  'et refaites les exercices en rouge. Apportez vos questions en classe.',
  'aviso',
  -- Hay que decir el tipo: con «select distinct» Postgres toma un null suelto
  -- por texto y no por fecha.
  null::date,
  date '2026-11-30'
from public.inscripciones i
join public.grupos g on g.id = i.grupo_id and g.codigo = 'A1-OCT2026'
where i.estado in ('activa', 'pendiente');


-- ---------------------------------------------------------------------------
-- Comprobación
-- ---------------------------------------------------------------------------

select to_char(s.fecha, 'TMDy DD/MM') as dia, s.tema
from public.sesiones s
join public.grupos g on g.id = s.grupo_id and g.codigo = 'A1-OCT2026'
where s.fecha between date '2026-10-22' and date '2026-10-29'
order by s.fecha;

select m.orden, m.categoria, m.titulo
from public.materiales m
join public.grupos g on g.id = m.grupo_id and g.codigo = 'A1-OCT2026'
where m.orden >= 10
order by m.orden;
