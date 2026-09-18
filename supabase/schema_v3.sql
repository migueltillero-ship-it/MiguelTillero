-- ============================================================================
-- Plataforma docente / estudiantil — Miguel Tillero
-- ESQUEMA V3 — pequeño addendum a schema_v2.sql para la Fase 4: hace que el
-- alta de un estudiante nuevo (registro/inscripcion.html) quede enlazada al
-- GRUPO concreto en el que se inscribe, no solo al curso. Sin esto, las
-- inscripciones nuevas quedarían con grupo_id vacío y no contarían para el
-- cupo del grupo.
--
-- CÓMO USAR: ejecuta este archivo DESPUÉS de schema.sql y schema_v2.sql.
-- Es seguro volver a ejecutarlo las veces que haga falta.
-- ============================================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  v_curso_id uuid;
  v_grupo_id uuid;
begin
  insert into public.profiles (id, role, nombre_completo, telefono)
  values (
    new.id,
    'estudiante',
    coalesce(new.raw_user_meta_data->>'nombre_completo', new.email),
    new.raw_user_meta_data->>'telefono'
  )
  on conflict (id) do nothing;

  v_curso_id := nullif(new.raw_user_meta_data->>'curso_id', '')::uuid;
  v_grupo_id := nullif(new.raw_user_meta_data->>'grupo_id', '')::uuid;

  -- Si solo llegó el grupo (registro/inscripcion.html manda ambos, pero por
  -- si acaso), el curso se deduce del grupo.
  if v_curso_id is null and v_grupo_id is not null then
    select curso_id into v_curso_id from public.grupos where id = v_grupo_id;
  end if;

  if v_curso_id is not null then
    insert into public.inscripciones (curso_id, grupo_id, estudiante_id, estado)
    values (v_curso_id, v_grupo_id, new.id, 'pendiente')
    on conflict (curso_id, estudiante_id) do nothing;
  end if;

  return new;
end;
$$;
