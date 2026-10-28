-- ===========================================================================
-- EJERCICIOS COMPLEMENTARIOS A1.4 · OCTUBRE 2026
-- ===========================================================================
-- Dos cosas:
--   1) Registra en «Materiales» las fichas de ejercicios del grupo A1
--      híbrido: posesivos, pronombres posesivos, los números (escribirlos y
--      oírlos), género y número con sus excepciones, el repaso y —desde el 27
--      de octubre— el passé composé.
--   2) Deja un recordatorio en el espacio de CADA estudiante del grupo, para
--      que lo vean al entrar. No hace falta escribir ningún nombre: se toma
--      la lista del grupo.
--
-- La página vive en el sitio:
--   estudiantes/espace-a1-exercices.html  +  estudiantes/espace-a1-fiches.js
--
-- CÓMO USAR: después de ciclo-a1-oct2026.sql, materiales-y-resultados.sql
-- y avisos.sql. Es seguro repetirlo: ni duplica materiales ni duplica avisos.
-- Dónde: Supabase → SQL Editor → New query → pegar → Run.
-- ===========================================================================

-- Si llegaste a ejecutar una versión anterior de este guion, las entradas
-- apuntaban a la dirección del ciclo (…/a1-4-oct2026.html). Esas filas se retiran
-- para que no aparezcan duplicadas junto a las nuevas.
delete from public.materiales m
 using public.grupos g
 where g.id = m.grupo_id and g.codigo = 'A1-OCT2026'
   and m.url like '%a1-4-oct2026.html%';

do $$
declare
  v_grupo uuid;
  v_base text := 'https://migueltillero-ship-it.github.io/MiguelTillero/estudiantes/espace-a1-exercices.html';
  r record;
begin
  select id into v_grupo from public.grupos where codigo = 'A1-OCT2026';
  if v_grupo is null then
    raise exception 'No existe el grupo A1-OCT2026. Ejecuta antes ciclo-a1-oct2026.sql.';
  end if;

  -- ── 1) Las fichas, en Materiales ────────────────────────────────────────
  for r in
    select * from (values
      (10, 'Exercices complémentaires A1.4 — toutes les fiches', 'material', null::text,
       'La portada de los ejercicios del nivel, con tu avance. Empieza por aquí.',
       ''),

      (11, 'Fiche 1 · Mon, ma, mes — les adjectifs possessifs', 'refuerzo', 'Unité 4',
       'El cuadro del pizarrón, y la regla que casi nadie recuerda: por qué se dice '
       || '«mon amie» y no «ma amie». Con leur / leurs.',
       '#posesivos'),

      (12, 'Fiche 2 · Le mien, le tien — les pronoms possessifs', 'refuerzo', 'Unité 4',
       'El que reemplaza al nombre entero. Y el acento circunflejo que distingue '
       || '«notre» de «le nôtre».',
       '#pronombres'),

      (13, 'Fiche 3 · Écrire les nombres (70, 80, 90)', 'refuerzo', 'Unité 4',
       'Por qué 70 es «soixante-dix», cuándo «quatre-vingts» lleva S y cuándo no, '
       || 'el guion, y por qué «mille» nunca cambia.',
       '#numeros-escribir'),

      (14, 'Fiche 4 · Entendre les grands nombres', 'refuerzo', 'Unité 4',
       'Solo de oído: teléfonos, precios, años, y las parejas que se confunden '
       || '(13/30, 2/12, 60/70). Con audio.',
       '#numeros-oir'),

      (15, 'Fiche 5 · Masculin, féminin, singulier, pluriel', 'refuerzo', 'Unité 4',
       'Las reglas y, sobre todo, las excepciones: -al → -aux, los siete en -ou, '
       || 'los invariables y los femeninos irregulares.',
       '#genero-numero'),

      (16, 'Fiche 6 · Le bilan', 'evaluacion', 'Unité 4',
       'Un diagnóstico de las cinco fichas: cada fallo te dice a cuál volver. '
       || 'Y una presentación escrita que lo usa todo.',
       '#repaso'),

      -- La del 27 de octubre. Funciona distinto de las seis anteriores: siete
      -- etapas cerradas con llave, y la siguiente no se abre hasta tener la
      -- anterior entera y al 80 %. Es lo que impide «pasar» una gramática
      -- clicando hasta acertar.
      (17, 'Fiche 7 · Le passé composé, étape par étape', 'refuerzo', 'Unité 5',
       'Lo del 27 de octubre, para asentarlo solo: reconocerlo, elegir entre être y '
       || 'avoir, formar el participio, acordar, negar y contar. Siete etapas que se '
       || 'abren una a una. Al final, dos actividades de TV5MONDE que también hay que '
       || 'hacer.',
       '#passe-compose')
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

  raise notice 'Entradas de ejercicios registradas para el grupo A1-OCT2026.';
end $$;


-- ---------------------------------------------------------------------------
-- 2) El recordatorio en el espacio de cada estudiante del grupo
-- ---------------------------------------------------------------------------
-- Se escribe una vez por persona. Repetir este guion no lo duplica: lo
-- reemplaza, porque el título es el mismo.
-- Requiere avisos.sql. Si todavía no lo has ejecutado, este bloque fallará
-- con «relation "public.avisos" does not exist»: ejecútalo y vuelve.

delete from public.avisos a
 using public.inscripciones i, public.grupos g
 where a.estudiante_id = i.estudiante_id
   and i.grupo_id = g.id and g.codigo = 'A1-OCT2026'
   and a.titulo = 'Ejercicios para practicar en casa';

insert into public.avisos (estudiante_id, titulo, mensaje, tipo, desde, hasta)
select distinct i.estudiante_id,
  'Ejercicios para practicar en casa',
  E'Ya tienes en «Materiales» las fichas de ejercicios con todo lo que hemos '
  'trabajado este mes: los posesivos, los números —sobre todo los difíciles, '
  '70, 80 y 90— y la concordancia de género y número con sus excepciones.\n\n'
  'Se corrigen solas y puedes repetirlas las veces que quieras. La ficha 4 es '
  'de escucha: lleva audio.\n\n'
  'Dedícale veinte minutos antes de la próxima clase y trae tus dudas.',
  'aviso',
  -- El tipo hay que decirlo: con «select distinct» Postgres no adivina que un
  -- null suelto es una fecha, y lo toma por texto.
  null::date,
  date '2026-11-30'
from public.inscripciones i
join public.grupos g on g.id = i.grupo_id and g.codigo = 'A1-OCT2026'
where i.estado in ('activa', 'pendiente');


-- ---------------------------------------------------------------------------
-- Comprobación
-- ---------------------------------------------------------------------------

select m.orden, m.categoria, m.titulo
from public.materiales m
join public.grupos g on g.id = m.grupo_id and g.codigo = 'A1-OCT2026'
where m.orden >= 10
order by m.orden;

select p.nombre_completo as estudiante, a.titulo,
       coalesce(to_char(a.hasta, 'DD/MM/YYYY'), 'sin caducidad') as hasta,
       case when public.aviso_vigente(a.desde, a.hasta) then 'Lo ve ya' else 'Todavía no' end as estado
from public.avisos a
join public.profiles p on p.id = a.estudiante_id
where a.titulo = 'Ejercicios para practicar en casa'
order by p.nombre_completo;
