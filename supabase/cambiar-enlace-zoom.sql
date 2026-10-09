-- ============================================================================
-- CAMBIAR EL ENLACE DE ZOOM DE UN GRUPO
--
-- El enlace de Zoom vive SOLO en la base de datos (tabla grupo_enlaces) y la
-- base se lo entrega únicamente al estudiante con inscripción activa, o a su
-- representante, ya con la sesión iniciada. Nunca debe escribirse en un archivo
-- del proyecto: el repositorio es público.
--
-- CÓMO USAR
--   1. Copia este contenido al editor de Supabase (no edites este archivo).
--   2. Escribe el código del grupo y pega el enlace entre las comillas de v_zoom.
--   3. Ejecuta. No guardes ni subas la copia con el enlace puesto.
--      (Si necesitas conservarla, guárdala en supabase/privado/: git la ignora.)
-- ============================================================================

do $$
declare
  v_codigo text := 'B2-OCT2026';   -- código del grupo (A1-OCT2026, B2-OCT2026…)
  v_zoom   text := '';             -- pega aquí el enlace de Zoom, solo al ejecutar
  v_n      integer;
begin
  if v_zoom !~* '^https://' then
    raise exception 'Pega el enlace de Zoom en v_zoom (debe empezar con https://).';
  end if;

  insert into public.grupo_enlaces (grupo_id, enlace_zoom)
  select g.id, v_zoom from public.grupos g where g.codigo = v_codigo
  on conflict (grupo_id) do update
    set enlace_zoom = excluded.enlace_zoom, updated_at = now();

  get diagnostics v_n = row_count;
  if v_n = 0 then
    raise exception 'No existe el grupo %.', v_codigo;
  end if;
  raise notice 'Enlace de Zoom actualizado para el grupo %.', v_codigo;
end $$;
