-- ===========================================================================
-- UNA CLASE PARTICULAR YA DADA: SESIÓN, ASISTENCIA Y EJERCICIO PARA CASA
-- ===========================================================================
-- Una clase que se dio y no consta es una clase que la estudiante no puede
-- repasar, que no cuenta en su asistencia, y a la que no se le puede colgar
-- el ejercicio de casa. Esto la deja asentada en tres pasos:
--
--   1. Crea la sesión en el grupo particular de esa persona.
--   2. La marca presente (cambia v_presente si no vino).
--   3. Pone el ejercicio en su apartado de materiales.
--
-- El nombre no se guarda en el archivo: este repositorio es público. Se
-- escribe al pegar, en el SQL Editor, y basta un trozo del nombre.
--
-- CÓMO USAR: cambia el bloque de abajo y ejecuta. Es seguro repetirlo:
-- reemplaza la sesión de esa fecha en lugar de duplicarla.
-- Dónde: Supabase → SQL Editor → New query → pegar → Run.
-- ===========================================================================

do $$
declare
  -- ── CAMBIA SOLO ESTE BLOQUE ────────────────────────────────────────────
  v_quien    text    := 'Nombre o trozo de nombre';
  v_fecha    date    := date 'AAAA-MM-DD';
  v_tema     text    := 'Tema de la clase';
  v_contenido text   := 'Qué se vio, en una o dos líneas.';
  v_presente boolean := true;
  v_mat_titulo text  := 'Título del ejercicio para casa';
  v_mat_desc   text  := 'Qué tiene que hacer y para qué sirve.';
  v_mat_ruta   text  := 'estudiantes/fonetica-vocales.html';   -- dentro del sitio
  -- ───────────────────────────────────────────────────────────────────────
  v_base text := 'https://migueltillero-ship-it.github.io/MiguelTillero/';
  v_est uuid; v_grupo uuid; v_curso uuid; v_sesion uuid; v_n integer;
begin
  select count(*), min(i.estudiante_id::text)::uuid, min(i.grupo_id::text)::uuid, min(g.curso_id::text)::uuid
    into v_n, v_est, v_grupo, v_curso
    from public.inscripciones i
    join public.grupos g on g.id = i.grupo_id and g.formato = 'individual'
    join public.profiles p on p.id = i.estudiante_id
   where i.estado in ('activa','pendiente')
     and p.nombre_completo ilike '%' || v_quien || '%';

  -- Ni se adivina ni se escribe en el espacio de quien no toca.
  if v_n <> 1 then
    raise exception 'Con «%» encuentro % espacios particulares activos; tiene que '
                    'haber exactamente uno. Revisa el nombre.', v_quien, v_n;
  end if;

  select s.id into v_sesion from public.sesiones s
   where s.grupo_id = v_grupo and s.fecha = v_fecha;
  if v_sesion is null then
    insert into public.sesiones (curso_id, grupo_id, fecha, tema, contenido)
    values (v_curso, v_grupo, v_fecha, v_tema, v_contenido) returning id into v_sesion;
  else
    update public.sesiones set tema = v_tema, contenido = v_contenido where id = v_sesion;
  end if;

  insert into public.asistencia (sesion_id, estudiante_id, presente)
  values (v_sesion, v_est, v_presente)
  on conflict (sesion_id, estudiante_id) do update set presente = excluded.presente;

  insert into public.materiales (grupo_id, titulo, descripcion, url, categoria, unidad, orden)
  values (v_grupo, v_mat_titulo, v_mat_desc, v_base || v_mat_ruta, 'refuerzo', null,
          coalesce((select max(orden) + 1 from public.materiales where grupo_id = v_grupo), 1))
  on conflict (coalesce(grupo_id, '00000000-0000-0000-0000-000000000000'::uuid), url)
  do update set titulo = excluded.titulo, descripcion = excluded.descripcion;

  raise notice 'Sesión del %, asistencia y ejercicio puestos en su espacio.', v_fecha;
end $$;


-- ---------------------------------------------------------------------------
-- Comprobación: cómo queda el espacio
-- ---------------------------------------------------------------------------
select g.codigo as grupo, p.nombre_completo as estudiante,
       (select count(*) from public.sesiones s where s.grupo_id = g.id) as sesiones,
       (select count(*) from public.asistencia a join public.sesiones s on s.id = a.sesion_id
         where s.grupo_id = g.id and a.estudiante_id = p.id and a.presente) as presentes,
       (select count(*) from public.materiales m where m.grupo_id = g.id) as materiales
from public.grupos g
join public.inscripciones i on i.grupo_id = g.id and i.estado in ('activa','pendiente')
join public.profiles p on p.id = i.estudiante_id
where g.formato = 'individual'
order by p.nombre_completo;
