-- ===========================================================================
-- CLASES PARTICULARES: CADA ESTUDIANTE EN SU PROPIO ESPACIO
-- ===========================================================================
-- Los cursos y los grupos de clase particular ya existían, pero con cero
-- inscritos. Eso deja a la estudiante en tierra de nadie: aparece como «sin
-- grupo» en el panel, su espacio sale vacío, no se le puede pasar lista ni
-- ponerle una nota, y nada de lo que haga en la plataforma le cuenta.
--
-- POR QUÉ UN GRUPO DE UNA SOLA PERSONA Y NO OTRA COSA
-- La tentación era inventar un concepto nuevo, «estudiante individual», al
-- lado de los grupos. Habría obligado a duplicar todo lo que ya funciona:
-- asistencia, sesiones, materiales, evaluaciones, notas, el panel del
-- representante. Un grupo ya es «una instancia concreta de un curso: horario,
-- cupo, docente y costo», y una clase particular es exactamente eso con cupo
-- uno. Con formato = 'individual' el panel puede tratarlas distinto cuando
-- haga falta, sin que nada más cambie.
--
-- El nombre del curso lleva el nombre de la estudiante («Clase particular —
-- Fulana»), así que el emparejamiento se hace solo. Si un día un curso
-- particular no casa con nadie, el guion lo dice en vez de dejarlo a medias.
--
-- CÓMO USAR: pégalo entero. Es seguro repetirlo.
-- Dónde: Supabase → SQL Editor → New query → pegar → Run.
-- ===========================================================================

do $$
declare
  r record;
  v_nombre text;
  v_id uuid;
  v_cuantos integer;
  v_hechas integer := 0;
  v_sin_pareja text[] := array[]::text[];
begin
  for r in
    select c.id as curso_id, c.nombre as curso, g.id as grupo_id, g.codigo
      from public.cursos c
      join public.grupos g on g.curso_id = c.id
     where c.nombre ilike 'Clase particular%'
  loop
    -- Lo que va después del guion largo es el nombre de la estudiante.
    v_nombre := btrim(split_part(r.curso, '—', 2));
    if v_nombre = '' then
      v_sin_pareja := v_sin_pareja || (r.curso || ' (no trae nombre)')::text;
      continue;
    end if;

    select count(*), min(p.id::text)::uuid into v_cuantos, v_id
      from public.profiles p
     where p.role = 'estudiante' and p.nombre_completo ilike v_nombre;

    if v_cuantos <> 1 then
      -- Ni se adivina ni se inscribe a quien no toca: se avisa y se sigue.
      v_sin_pareja := v_sin_pareja || (v_nombre || ' (' || v_cuantos || ' coincidencias)')::text;
      continue;
    end if;

    if not exists (select 1 from public.inscripciones i
                    where i.grupo_id = r.grupo_id and i.estudiante_id = v_id) then
      insert into public.inscripciones (curso_id, grupo_id, estudiante_id, estado)
      values (r.curso_id, r.grupo_id, v_id, 'activa');
      v_hechas := v_hechas + 1;
      raise notice 'Inscrita en su propio espacio (%): %', r.codigo, v_nombre;
    end if;

    -- El cupo de una clase particular es uno. Si figura otro número, el panel
    -- enseña «1/10» y parece que faltan nueve personas por llegar.
    update public.grupos
       set cupo_maximo = 1, formato = 'individual'
     where id = r.grupo_id;
  end loop;

  if array_length(v_sin_pareja, 1) is not null then
    raise warning 'Estos cursos particulares no se pudieron emparejar: %',
                  array_to_string(v_sin_pareja, ' | ');
  end if;
  raise notice 'Listo: % inscripción(es) nueva(s).', v_hechas;
end $$;


-- ---------------------------------------------------------------------------
-- Comprobación: los espacios particulares, como quedan
-- ---------------------------------------------------------------------------

select g.codigo as grupo,
       p.nombre_completo as estudiante,
       g.formato,
       i.estado as inscripcion,
       coalesce(to_char(g.fecha_inicio,'DD/MM/YYYY'),'sin fecha') as inicio,
       (select count(*) from public.sesiones s where s.grupo_id = g.id) as sesiones,
       case when (select count(*) from public.sesiones s where s.grupo_id = g.id) = 0
            then 'FALTA el calendario de clases' else 'con calendario' end as pendiente
from public.grupos g
join public.cursos c on c.id = g.curso_id and c.nombre ilike 'Clase particular%'
left join public.inscripciones i on i.grupo_id = g.id and i.estado in ('activa','pendiente')
left join public.profiles p on p.id = i.estudiante_id
order by p.nombre_completo;
