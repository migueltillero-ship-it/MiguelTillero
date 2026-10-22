-- ===========================================================================
-- UNA CLASE QUE NO SE DIO, Y EL DÍA QUE SE AÑADE PARA RECUPERARLA
-- ===========================================================================
-- Cuando una clase se cae —salud, un corte de luz, lo que sea—, no basta con
-- no registrar nada: el estudiante y su familia ven el calendario, y una
-- sesión sin contenido parece una clase a la que nadie fue. Peor aún si
-- alguien quedó marcado como ausente de una clase que no existió.
--
-- Este guion hace las cuatro cosas que hay que hacer:
--   1. Deja dicho en la sesión que se anuló, y por qué.
--   2. Borra la asistencia de ese día, si llegó a registrarse.
--   3. Crea la sesión de recuperación en la fecha nueva.
--   4. Amplía la fecha de fin del grupo y del curso si el ciclo se alarga.
--
-- CÓMO USAR: cambia las cuatro líneas del bloque de abajo y ejecuta.
-- Es seguro repetirlo.
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
  v_borradas integer;
  v_tema text;
  v_contenido text;
begin
  select g.id, g.curso_id into v_grupo, v_curso
    from public.grupos g where g.codigo = v_codigo;
  if v_grupo is null then
    raise exception 'No existe el grupo %.', v_codigo;
  end if;

  -- 0) Lo que iba a darse ese día no se pierde: viaja al día de recuperación.
  select s.tema, s.contenido into v_tema, v_contenido
    from public.sesiones s
   where s.grupo_id = v_grupo and s.fecha = v_anulada;

  -- 1) La sesión anulada queda dicha, no en blanco.
  update public.sesiones set
    tema = 'Clase anulada — ' || v_motivo,
    contenido = 'Esta clase no se dio. Se recupera el '
             || to_char(v_nueva, 'DD/MM/YYYY') || ', con el contenido previsto.'
  where grupo_id = v_grupo and fecha = v_anulada;

  if not found then
    raise notice 'Ojo: no había ninguna sesión del % en el grupo %. '
                 'Revisa la fecha antes de seguir.', v_anulada, v_codigo;
  end if;

  -- 2) Nadie puede faltar a una clase que no hubo.
  delete from public.asistencia a
   using public.sesiones s
   where a.sesion_id = s.id and s.grupo_id = v_grupo and s.fecha = v_anulada;
  get diagnostics v_borradas = row_count;
  if v_borradas > 0 then
    raise notice 'Se borraron % registros de asistencia de ese día.', v_borradas;
  end if;

  -- 3) El día que se añade.
  if not exists (select 1 from public.sesiones s
                  where s.grupo_id = v_grupo and s.fecha = v_nueva) then
    insert into public.sesiones (curso_id, grupo_id, fecha, tema, contenido)
    values (v_curso, v_grupo, v_nueva,
            coalesce(v_tema, 'Séance de récupération'),
            'Recupera la clase del ' || to_char(v_anulada, 'DD/MM/YYYY') || '.'
            || case when v_contenido is null then ' El contenido se completa desde el panel docente.'
                    else chr(10) || chr(10) || v_contenido end);
    raise notice 'Sesión de recuperación creada para el %.', v_nueva;
  else
    -- Si ya existía (por ejemplo, al repetir el guion), se le pone el contenido
    -- de la clase caída, que es de lo que se trata.
    update public.sesiones set
      tema = coalesce(v_tema, tema),
      contenido = 'Recupera la clase del ' || to_char(v_anulada, 'DD/MM/YYYY') || '.'
               || case when v_contenido is null then '' else chr(10) || chr(10) || v_contenido end
     where grupo_id = v_grupo and fecha = v_nueva;
    raise notice 'Ya existía una sesión el %: se le pasó el contenido en lugar de duplicarla.', v_nueva;
  end if;

  -- 4) Si el ciclo se alarga, que lo diga también la ficha del grupo.
  update public.grupos
     set fecha_fin = greatest(coalesce(fecha_fin, v_nueva), v_nueva)
   where id = v_grupo;
  update public.cursos
     set fecha_fin = greatest(coalesce(fecha_fin, v_nueva), v_nueva)
   where id = v_curso;
end $$;


-- ---------------------------------------------------------------------------
-- Comprobación: el calendario como lo verá el estudiante
-- ---------------------------------------------------------------------------

select
  to_char(s.fecha, 'TMDy DD/MM') as dia,
  s.tema,
  case when s.contenido is null then '— sin contenido —'
       else left(s.contenido, 60) || '…' end as contenido
from public.sesiones s
join public.grupos g on g.id = s.grupo_id and g.codigo = 'CODIGO-DEL-GRUPO'
order by s.fecha;
