-- ===========================================================================
-- B2 · LISTA DEL MIÉRCOLES 4 DE NOVIEMBRE
-- ===========================================================================
-- Melissa no pudo asistir. Montserrat y Rothman sí.
--
-- Rothman creó su cuenta el 5 de noviembre pero no tenía inscripción en el
-- grupo, así que no figuraba en ninguna lista. Se inscribe aquí primero: sin
-- inscripción no hay a quién pasarle lista.
--
-- Sebastián no aparece porque todavía no tiene cuenta en la plataforma. La
-- asistencia cuelga de un perfil, de modo que su presencia del miércoles no
-- se puede registrar hasta que se registre. Cuando lo haga, se le inscribe
-- igual que a su hermano y se vuelve a ejecutar este guion.
--
-- CÓMO USAR: pégalo entero. Es seguro repetirlo.
-- Dónde: Supabase → SQL Editor → New query → pegar → Run.
-- ===========================================================================

do $$
declare
  v_grupo uuid;
  v_curso uuid;
  v_sesion uuid;
  v_id uuid;
begin
  select g.id, g.curso_id into v_grupo, v_curso
    from public.grupos g where g.codigo = 'B2-OCT2026';

  select s.id into v_sesion from public.sesiones s
   where s.grupo_id = v_grupo and s.fecha = date '2026-11-04';
  if v_sesion is null then
    raise exception 'No hay sesión del 04/11 en B2-OCT2026.';
  end if;

  -- 1) Rothman entra al grupo. Su padre ya pagó por él y por su hermano.
  select p.id into v_id from public.profiles p
   where p.nombre_completo ilike '%roth%man%' or p.nombre_completo ilike '%rotman%';
  if v_id is not null and not exists (
       select 1 from public.inscripciones i
        where i.estudiante_id = v_id and i.grupo_id = v_grupo) then
    insert into public.inscripciones (curso_id, grupo_id, estudiante_id, estado)
    values (v_curso, v_grupo, v_id, 'activa');
    raise notice 'Rothman queda inscrito en B2-OCT2026.';
  end if;

  -- 2) La lista del miércoles.
  insert into public.asistencia (sesion_id, estudiante_id, presente, observacion)
  select v_sesion, i.estudiante_id,
         not (p.nombre_completo ilike '%melissa%'),
         case when p.nombre_completo ilike '%melissa%'
              then 'No pudo asistir' end
    from public.inscripciones i
    join public.profiles p on p.id = i.estudiante_id
   where i.grupo_id = v_grupo and i.estado in ('activa','pendiente')
  on conflict (sesion_id, estudiante_id)
  do update set presente = excluded.presente, observacion = excluded.observacion;

  raise notice 'Lista del 04/11 pasada. Sebastián no figura: todavía no tiene cuenta.';
end $$;

select p.nombre_completo as estudiante,
       case when a.presente then 'Presente' else 'No asistió' end as estado,
       coalesce(a.observacion,'') as nota
from public.asistencia a
join public.sesiones s on s.id = a.sesion_id
join public.grupos g on g.id = s.grupo_id and g.codigo = 'B2-OCT2026'
join public.profiles p on p.id = a.estudiante_id
where s.fecha = date '2026-11-04'
order by 1;
