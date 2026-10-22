-- ===========================================================================
-- UNA CLASE QUE NO SE DIO: TODO EL CICLO SE CORRE UN DÍA
-- ===========================================================================
-- Cuando una clase se cae —salud, un corte de luz, lo que sea—, lo que no se
-- dio no desaparece: se da la clase siguiente, y lo de la siguiente la otra.
-- El ciclo entero se corre un lugar y termina un día más tarde.
--
-- Hacerlo a mano es donde se cometen los errores: se olvida mover las
-- evaluaciones, o se deja a alguien marcado como ausente de una clase que no
-- existió, o el calendario del estudiante se queda con un hueco.
--
-- Este guion hace las seis cosas:
--   1. Añade la sesión nueva al final del ciclo.
--   2. Corre un lugar el tema y el contenido de todas las sesiones, desde la
--      que se cayó hasta la última.
--   3. Deja dicho en la sesión caída que se anuló, y por qué.
--   4. Borra la asistencia de ese día, si llegó a registrarse.
--   5. Mueve las evaluaciones al día que les toca ahora.
--   6. Amplía la fecha de fin del grupo y del curso.
--
-- CÓMO USAR: cambia las cuatro líneas del bloque de abajo y ejecuta.
-- Es seguro repetirlo UNA vez por cada clase que se caiga: si lo ejecutas dos
-- veces para la misma fecha, el ciclo se correría dos días. El bloque 0 avisa.
-- Dónde: Supabase → SQL Editor → New query → pegar → Run.
-- ===========================================================================

do $$
declare
  -- ── CAMBIA SOLO ESTAS CUATRO LÍNEAS ────────────────────────────────────
  v_codigo  text := 'CODIGO-DEL-GRUPO';
  v_anulada date := date 'AAAA-MM-DD';   -- el día que no hubo clase
  v_nueva   date := date 'AAAA-MM-DD';   -- el día que se añade al final
  v_motivo  text := 'motivo de salud';   -- lo que verá la familia
  -- ───────────────────────────────────────────────────────────────────────
  v_grupo uuid;
  v_curso uuid;
  v_anterior date;
  v_borradas integer;
  r record;
begin
  select g.id, g.curso_id into v_grupo, v_curso
    from public.grupos g where g.codigo = v_codigo;
  if v_grupo is null then
    raise exception 'No existe el grupo %.', v_codigo;
  end if;

  -- 0) Avisos antes de tocar nada.
  if not exists (select 1 from public.sesiones s
                  where s.grupo_id = v_grupo and s.fecha = v_anulada) then
    raise exception 'No hay ninguna sesión del % en el grupo %. Revisa la fecha.',
                    v_anulada, v_codigo;
  end if;

  if exists (select 1 from public.sesiones s
              where s.grupo_id = v_grupo and s.fecha = v_anulada
                and s.tema like 'Clase anulada%') then
    raise exception 'La sesión del % ya figura como anulada. Si la ejecutas otra vez, '
                    'el ciclo se correría un segundo día.', v_anulada;
  end if;

  -- 1) El día que se añade al final, todavía vacío.
  if not exists (select 1 from public.sesiones s
                  where s.grupo_id = v_grupo and s.fecha = v_nueva) then
    insert into public.sesiones (curso_id, grupo_id, fecha, tema, contenido)
    values (v_curso, v_grupo, v_nueva, null, null);
  end if;

  -- 2) Cada sesión toma el contenido de la anterior. De atrás hacia delante,
  --    para no pisar lo que todavía no se ha leído.
  for r in
    select s.fecha from public.sesiones s
     where s.grupo_id = v_grupo and s.fecha >= v_anulada
     order by s.fecha desc
  loop
    select max(s.fecha) into v_anterior
      from public.sesiones s
     where s.grupo_id = v_grupo and s.fecha < r.fecha and s.fecha >= v_anulada;

    if v_anterior is not null then
      update public.sesiones destino
         set tema      = origen.tema,
             contenido = origen.contenido
        from public.sesiones origen
       where origen.grupo_id = v_grupo and origen.fecha = v_anterior
         and destino.grupo_id = v_grupo and destino.fecha = r.fecha;
    end if;
  end loop;

  -- 3) La sesión caída queda dicha, no en blanco.
  update public.sesiones set
    tema = 'Clase anulada — ' || v_motivo,
    contenido = 'Esta clase no se dio. El programa se corre un día: lo previsto para hoy '
             || 'pasa a la clase siguiente, y el ciclo termina el '
             || to_char(v_nueva, 'DD/MM/YYYY') || '.'
  where grupo_id = v_grupo and fecha = v_anulada;

  -- 4) Nadie puede faltar a una clase que no hubo.
  delete from public.asistencia a
   using public.sesiones s
   where a.sesion_id = s.id and s.grupo_id = v_grupo and s.fecha = v_anulada;
  get diagnostics v_borradas = row_count;
  if v_borradas > 0 then
    raise notice 'Se borraron % registros de asistencia del %.', v_borradas, v_anulada;
  end if;

  -- 5) Las evaluaciones se mueven al día que les toca ahora.
  --    (Están en su propia tabla: es lo que más se olvida.)
  update public.evaluaciones e
     set fecha = (select min(s.fecha) from public.sesiones s
                   where s.grupo_id = v_grupo and s.fecha > e.fecha)
   where e.curso_id = v_curso
     and e.fecha >= v_anulada
     and exists (select 1 from public.sesiones s
                  where s.grupo_id = v_grupo and s.fecha > e.fecha);

  -- 6) El ciclo termina más tarde, y la ficha del grupo debe decirlo.
  update public.grupos
     set fecha_fin = greatest(coalesce(fecha_fin, v_nueva), v_nueva)
   where id = v_grupo;
  update public.cursos
     set fecha_fin = greatest(coalesce(fecha_fin, v_nueva), v_nueva)
   where id = v_curso;

  raise notice 'Listo: el ciclo del grupo % se corre un día y termina el %.',
               v_codigo, v_nueva;
end $$;


-- ---------------------------------------------------------------------------
-- Comprobación: el calendario como lo verá el estudiante
-- ---------------------------------------------------------------------------

select
  to_char(s.fecha, 'TMDy DD/MM') as dia,
  coalesce(s.tema, '— por definir —') as tema,
  case when s.contenido is null then '—' else left(s.contenido, 55) || '…' end as contenido
from public.sesiones s
join public.grupos g on g.id = s.grupo_id and g.codigo = 'CODIGO-DEL-GRUPO'
order by s.fecha;

select to_char(e.fecha, 'TMDy DD/MM') as dia, e.nombre as evaluacion
from public.evaluaciones e
join public.cursos c on c.id = e.curso_id
join public.grupos g on g.curso_id = c.id and g.codigo = 'CODIGO-DEL-GRUPO'
order by e.fecha;
