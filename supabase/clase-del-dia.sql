-- ===========================================================================
-- LO DE CADA CLASE: ASISTENCIA, CONTENIDO Y PAGOS
-- ===========================================================================
-- Plantilla para reutilizar en cada sesión de cualquier grupo. Se cambian
-- el código del grupo, la fecha y las listas, y se vuelve a ejecutar.
--
-- ⚠️  NO GUARDES AQUÍ LOS NOMBRES REALES DE TUS ESTUDIANTES.
--     Este archivo vive en un repositorio público y la mayoría de ellos son
--     menores de edad. Rellena los nombres directamente en el SQL Editor de
--     Supabase, ejecuta, y no los traigas de vuelta a este archivo.
--
-- Los estudiantes se buscan por su nombre de pila dentro del grupo, así que
-- no hace falta saber su correo ni su identificador. Si un nombre no encaja
-- con nadie, el bloque 0 y el bloque 4 lo dicen, en lugar de fallar en
-- silencio: lo peor que puede pasar con la asistencia es que parezca
-- registrada y no lo esté.
--
-- Es seguro repetirlo: no duplica pagos ni asistencias.
-- Dónde: Supabase → SQL Editor → New query → pegar → Run.
-- ===========================================================================


-- ---------------------------------------------------------------------------
-- 0. ANTES DE NADA: ¿quién está en el grupo y cómo va de pago?
-- ---------------------------------------------------------------------------
-- Ejecuta solo este bloque primero. Si falta alguien, lo demás no servirá.

select
  p.nombre_completo                        as estudiante,
  i.estado                                 as inscripcion,
  coalesce(sum(pg.monto) filter (where pg.estado = 'pagado'), 0) as pagado
from public.inscripciones i
join public.profiles p    on p.id = i.estudiante_id
join public.grupos  g     on g.id = i.grupo_id
left join public.pagos pg on pg.inscripcion_id = i.id
where g.codigo = 'CODIGO-DEL-GRUPO'
group by p.nombre_completo, i.estado
order by p.nombre_completo;


-- ---------------------------------------------------------------------------
-- 1. PAGOS
-- ---------------------------------------------------------------------------
-- Una fila por persona, con el monto que pagó de verdad. No pongas el precio
-- del ciclo por costumbre: si alguien pagó otra cantidad, anota esa, o las
-- cuentas dejarán de cuadrar con el banco.
-- No duplica: si ya tiene un pago cobrado, no añade otro.

with quien_pago (nombre, monto) as (
  values
    ('NOMBRE_1', 0000),
    ('NOMBRE_2', 0000)
)
insert into public.pagos (inscripcion_id, monto, moneda, concepto, estado, pagado_en)
select distinct on (i.id)
       i.id, q.monto, g.moneda, 'CONCEPTO DEL PAGO', 'pagado', now()
  from quien_pago q
  join public.profiles p      on p.nombre_completo ilike '%' || q.nombre || '%'
  join public.inscripciones i on i.estudiante_id = p.id
  join public.grupos g        on g.id = i.grupo_id and g.codigo = 'CODIGO-DEL-GRUPO'
 where not exists (select 1 from public.pagos pg
                    where pg.inscripcion_id = i.id and pg.estado = 'pagado');

-- Al quedar pagada, la inscripción pasa a activa: es lo que desbloquea el
-- enlace de la clase, el libro y el material en el espacio del estudiante.
update public.inscripciones i
   set estado = 'activa'
  from public.grupos g
 where g.id = i.grupo_id and g.codigo = 'CODIGO-DEL-GRUPO'
   and i.estado = 'pendiente'
   and exists (select 1 from public.pagos pg
                where pg.inscripcion_id = i.id and pg.estado = 'pagado');


-- ---------------------------------------------------------------------------
-- 2. ASISTENCIA DE UNA SESIÓN
-- ---------------------------------------------------------------------------
-- «presente» es verdadero o falso. La observación explica la ausencia, y es
-- lo que después lee la familia en su espacio: conviene que distinga una
-- falta justificada de una sin avisar.

with lista (nombre, presente, observacion) as (
  values
    ('NOMBRE_1', true,  null),
    ('NOMBRE_2', false, 'Falta justificada.')
)
insert into public.asistencia (sesion_id, estudiante_id, presente, observacion)
select s.id, p.id, l.presente, l.observacion
  from lista l
  join public.profiles p      on p.nombre_completo ilike '%' || l.nombre || '%'
  join public.inscripciones i on i.estudiante_id = p.id
  join public.grupos g        on g.id = i.grupo_id and g.codigo = 'CODIGO-DEL-GRUPO'
  join public.sesiones s      on s.grupo_id = g.id and s.fecha = date 'AAAA-MM-DD'
on conflict (sesion_id, estudiante_id) do update
  set presente    = excluded.presente,
      observacion = excluded.observacion;


-- ---------------------------------------------------------------------------
-- 3. CONTENIDO DE LA SESIÓN
-- ---------------------------------------------------------------------------
-- Lo que se trabajó, o lo que toca. El estudiante y su familia lo ven en
-- cuanto se guarda, así que vale la pena escribirlo como para alguien que
-- faltó a clase.

update public.sesiones s
   set tema      = 'TEMA DE LA SESIÓN',
       contenido = E'Primera línea del contenido.\n'
                   '• Un punto.\n'
                   '• Otro punto.'
  from public.grupos g
 where g.id = s.grupo_id and g.codigo = 'CODIGO-DEL-GRUPO'
   and s.fecha = date 'AAAA-MM-DD';


-- ---------------------------------------------------------------------------
-- 4. COMPROBACIÓN
-- ---------------------------------------------------------------------------

select
  p.nombre_completo                                            as estudiante,
  i.estado                                                     as inscripcion,
  coalesce(sum(pg.monto) filter (where pg.estado='pagado'), 0) as pagado,
  case when a.presente is null then '— sin registrar —'
       when a.presente then 'Presente'
       else 'Ausente' end                                      as asistencia,
  a.observacion
from public.inscripciones i
join public.profiles p      on p.id = i.estudiante_id
join public.grupos  g       on g.id = i.grupo_id and g.codigo = 'CODIGO-DEL-GRUPO'
left join public.pagos pg   on pg.inscripcion_id = i.id
left join public.sesiones s on s.grupo_id = g.id and s.fecha = date 'AAAA-MM-DD'
left join public.asistencia a on a.sesion_id = s.id and a.estudiante_id = p.id
group by p.nombre_completo, i.estado, a.presente, a.observacion
order by p.nombre_completo;
