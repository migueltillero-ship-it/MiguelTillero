-- ===========================================================================
-- DISPONIBILIDAD DEL DOCENTE Y RECUPERACIÓN DE LA CLASE DEL 26 DE OCTUBRE
-- ===========================================================================
-- Dos cosas que van juntas porque salen del mismo sitio: el calendario real
-- de clases que ya está en la plataforma.
--
-- CÓMO USAR: Supabase → SQL Editor → New query → pegar → Run.
-- Ejecutar DESPUÉS de contrataciones.sql. Es seguro repetirlo.
-- ===========================================================================


-- ---------------------------------------------------------------------------
-- 1. Cuándo quedan huecos libres
-- ---------------------------------------------------------------------------
-- Los grupos ocupan las noches de lunes a jueves (B2 lunes y miércoles de
-- 19:00 a 20:30; A1 martes y jueves de 19:00 a 20:00) y el sábado temprano
-- (clase individual de 9:00 a 10:30). Lo que queda libre para quien contrate
-- horas es la tarde de lunes a jueves y el sábado a partir de las 10:30.
--
-- Son franjas, no clases: dentro de 16:00–18:30 caben dos sesiones de hora y
-- media, o una de dos horas, según lo que elija cada estudiante. Lo que no
-- quepa aquí, la base lo rechaza.
--
-- «vigente_desde» hoy y sin fecha de cierre: vale hasta que se cambie. Al
-- cambiarla conviene poner «vigente_hasta» en la vieja en vez de borrarla,
-- para no dejar huérfanas las clases ya agendadas.

insert into public.disponibilidad (docente_id, dia_semana, hora_inicio, hora_fin, nota)
select v.docente_id, v.dia, v.ini, v.fin, v.nota
  from (values
    ('57cedee4-d045-4ce5-81a6-8641c82d6216'::uuid, 1, time '16:00', time '18:30', 'Tarde, antes del grupo B2 de las 19:00'),
    ('57cedee4-d045-4ce5-81a6-8641c82d6216'::uuid, 2, time '16:00', time '18:30', 'Tarde, antes del grupo A1 de las 19:00'),
    ('57cedee4-d045-4ce5-81a6-8641c82d6216'::uuid, 3, time '16:00', time '18:30', 'Tarde, antes del grupo B2 de las 19:00'),
    ('57cedee4-d045-4ce5-81a6-8641c82d6216'::uuid, 4, time '16:00', time '18:30', 'Tarde, antes del grupo A1 de las 19:00'),
    ('57cedee4-d045-4ce5-81a6-8641c82d6216'::uuid, 6, time '10:30', time '13:00', 'Sábado, después de la clase individual de las 9:00')
  ) as v(docente_id, dia, ini, fin, nota)
 where not exists (
   select 1 from public.disponibilidad d
    where d.docente_id = v.docente_id and d.dia_semana = v.dia
      and d.hora_inicio = v.ini and d.hora_fin = v.fin
      and d.vigente_hasta is null);


-- ---------------------------------------------------------------------------
-- 2. El lunes 26 no hubo clase de B2
-- ---------------------------------------------------------------------------
-- La sesión de ese día era «Communication et Grammaire · cierre de la Unité
-- 1». No se dio, así que el programa entero se corre una sesión: lo del 26
-- pasa al 28, lo del 28 al 2 de noviembre, y así hasta que la evaluación
-- individual, que cerraba el 16, pasa al miércoles 18.
--
-- Se mueven las fechas en lugar de reescribir los temas: así cada clase
-- conserva su contenido y el ciclo mantiene sus trece sesiones impartidas.
-- Se recorre de la última a la primera para que ninguna pise a otra por el
-- camino.

with curso_b2 as (
  select curso_id from public.grupos where codigo = 'B2-OCT2026'
),
-- Los días de clase del grupo, desde el que se perdió hasta uno más allá
-- del cierre previsto: lunes y miércoles.
ranura as (
  select d::date f, row_number() over (order by d) n
    from generate_series(date '2026-10-26', date '2026-11-18', interval '1 day') d
   where extract(dow from d) in (1, 3)
),
pendiente as (
  select s.id, s.fecha, row_number() over (order by s.fecha) n
    from public.sesiones s, curso_b2
   where s.curso_id = curso_b2.curso_id
     and s.fecha >= date '2026-10-26'
)
update public.sesiones s
   set fecha = r.f
  from pendiente p, ranura r
 where s.id = p.id
   and r.n = p.n + 1;      -- cada sesión baja un sitio en el calendario

-- El ciclo termina dos días más tarde de lo previsto.
update public.grupos
   set fecha_fin = date '2026-11-18',
       notas = coalesce(notas || ' · ', '') ||
               'Cierre movido del 16 al 18 de noviembre: se recupera la clase del lunes 26 de octubre.'
 where codigo = 'B2-OCT2026'
   and fecha_fin < date '2026-11-18';


-- ---------------------------------------------------------------------------
-- 3. Comprobar que quedó bien
-- ---------------------------------------------------------------------------

select 'disponibilidad' as que,
       to_char(dia_semana, '9') as dia,
       hora_inicio::text || ' – ' || hora_fin::text as franja,
       nota
  from public.disponibilidad
 where docente_id = '57cedee4-d045-4ce5-81a6-8641c82d6216'
   and vigente_hasta is null
 order by dia_semana;

select 'B2 tras la recuperación' as que, s.fecha::text as dia, s.tema
  from public.sesiones s
  join public.grupos g on g.curso_id = s.curso_id and g.codigo = 'B2-OCT2026'
 where s.fecha >= date '2026-10-26'
 order by s.fecha;
