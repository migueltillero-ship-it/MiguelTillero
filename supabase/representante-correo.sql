-- ===========================================================================
-- EL CORREO DEL REPRESENTANTE: ARREGLAR LA CAUSA Y LOS CASOS YA CREADOS
-- ===========================================================================
-- Al activar el acceso de representantes salió a la luz un fallo de origen:
-- el formulario de inscripción nunca pidió el correo del representante
-- —solo nombre, parentesco y teléfono— y el alta, al no tenerlo, copiaba el
-- correo de la propia cuenta del estudiante.
--
-- El resultado era una trampa silenciosa: representante_email terminaba
-- siendo el correo del alumno, así que la madre no podía crear su cuenta con
-- él (Supabase no admite dos cuentas con el mismo correo) y el
-- emparejamiento automático nunca encontraba a nadie.
--
-- Aquí se arregla en tres frentes:
--   1. El alta deja de inventarse ese correo.
--   2. Se limpian los que quedaron mal apuntados.
--   3. Se añade una forma de enlazar a mano, para cuando el correo del
--      representante se consigue por WhatsApp y no por el formulario.
--
-- El formulario de inscripción ya pide el correo del representante y avisa
-- si coincide con el del estudiante.
--
-- CÓMO USAR: ejecútalo después de representantes-acceso.sql.
-- Es seguro repetirlo.
-- ===========================================================================


-- ---------------------------------------------------------------------------
-- 1. El alta deja de copiar el correo del estudiante
-- ---------------------------------------------------------------------------
-- Si el formulario no trae correo del representante, la columna se queda
-- vacía. Vacía es honesto: dice «no lo sabemos». El correo del alumno ahí
-- dentro era una mentira que además bloqueaba la cuenta de su madre.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  v_curso_id uuid;
  v_grupo_id uuid;
  v_rep_email text;
  v_es_representante boolean := coalesce((new.raw_user_meta_data->>'es_representante')::boolean, false);
begin
  v_rep_email := lower(nullif(trim(new.raw_user_meta_data->>'representante_email'), ''));
  -- Si coincide con el del propio estudiante no sirve para nada: lo tiramos.
  if v_rep_email = lower(new.email) then
    v_rep_email := null;
  end if;

  insert into public.profiles (
    id, role, nombre_completo, telefono,
    representante_nombre, representante_parentesco, representante_telefono, representante_email
  )
  values (
    new.id,
    case when v_es_representante then 'representante' else 'estudiante' end,
    coalesce(new.raw_user_meta_data->>'nombre_completo', new.email),
    new.raw_user_meta_data->>'telefono',
    nullif(new.raw_user_meta_data->>'representante_nombre', ''),
    nullif(new.raw_user_meta_data->>'representante_parentesco', ''),
    nullif(new.raw_user_meta_data->>'representante_telefono', ''),
    v_rep_email
  )
  on conflict (id) do nothing;

  if v_es_representante then
    perform public.emparejar_representante(new.id);
    return new;
  end if;

  v_curso_id := nullif(new.raw_user_meta_data->>'curso_id', '')::uuid;
  v_grupo_id := nullif(new.raw_user_meta_data->>'grupo_id', '')::uuid;

  if v_grupo_id is not null and not public.inscripcion_abierta(v_grupo_id) then
    v_grupo_id := null;
    v_curso_id := null;
  end if;

  if v_curso_id is null and v_grupo_id is not null then
    select curso_id into v_curso_id from public.grupos where id = v_grupo_id;
  end if;

  if v_curso_id is not null then
    insert into public.inscripciones (curso_id, grupo_id, estudiante_id, estado)
    values (v_curso_id, v_grupo_id, new.id, 'pendiente')
    on conflict (curso_id, estudiante_id) do nothing;
  end if;

  perform public.emparejar_estudiante(new.id);
  return new;
end;
$$;


-- ---------------------------------------------------------------------------
-- 2. Limpiar los que ya estaban mal
-- ---------------------------------------------------------------------------

update public.profiles p
   set representante_email = null
  from auth.users u
 where u.id = p.id
   and p.representante_email is not null
   and lower(p.representante_email) = lower(u.email);


-- ---------------------------------------------------------------------------
-- 3. Anotar el correo de un representante y enlazarlo
-- ---------------------------------------------------------------------------
-- Para cuando el correo llega por WhatsApp. Funciona en los dos momentos:
-- si la madre todavía no tiene cuenta, deja el correo anotado y el
-- emparejamiento ocurrirá solo en cuanto se registre; si ya la tiene, los
-- enlaza en el acto.
--
--   select public.anotar_representante('Annette', 'liliana@ejemplo.com', 'Madre');

create or replace function public.anotar_representante(
  p_estudiante text,
  p_correo     text,
  p_parentesco text default null
) returns text language plpgsql security definer set search_path = public as $$
declare
  v_id uuid;
  v_nombre text;
  v_cuantos integer;
  v_rep uuid;
begin
  select p.id, p.nombre_completo into v_id, v_nombre
    from public.profiles p
   where p.role = 'estudiante'
     and p.nombre_completo ilike '%' || p_estudiante || '%'
   limit 2;

  if v_id is null then
    return 'No encontré a ningún estudiante que se parezca a «' || p_estudiante || '».';
  end if;

  select count(*) into v_cuantos
    from public.profiles p
   where p.role = 'estudiante' and p.nombre_completo ilike '%' || p_estudiante || '%';
  if v_cuantos > 1 then
    return 'Hay ' || v_cuantos || ' estudiantes que encajan con «' || p_estudiante
         || '». Escribe el nombre más completo.';
  end if;

  if exists (select 1 from auth.users u where u.id = v_id and lower(u.email) = lower(p_correo)) then
    return 'Ese correo es el de la cuenta de ' || v_nombre
         || '. El del representante tiene que ser otro distinto.';
  end if;

  update public.profiles
     set representante_email = lower(p_correo),
         representante_parentesco = coalesce(p_parentesco, representante_parentesco)
   where id = v_id;

  select u.id into v_rep from auth.users u where lower(u.email) = lower(p_correo);

  if v_rep is null then
    return 'Anotado para ' || v_nombre || '. En cuanto esa persona cree su cuenta con '
         || lower(p_correo) || ', quedarán enlazados solos.';
  end if;

  update public.profiles set role = 'representante'
   where id = v_rep and role = 'estudiante'
     and not exists (select 1 from public.inscripciones i where i.estudiante_id = v_rep);

  perform public.emparejar_representante(v_rep);

  if exists (select 1 from public.tutorias t
              where t.representante_id = v_rep and t.estudiante_id = v_id) then
    return 'Listo: ya puede ver a ' || v_nombre || ' al entrar con ' || lower(p_correo) || '.';
  end if;

  insert into public.tutorias (representante_id, estudiante_id, parentesco)
  values (v_rep, v_id, p_parentesco)
  on conflict do nothing;

  return 'Enlazado a mano: ya puede ver a ' || v_nombre || '.';
end $$;

revoke execute on function public.anotar_representante(text, text, text) from anon, authenticated;
grant execute on function public.anotar_representante(text, text, text) to authenticated;


-- ---------------------------------------------------------------------------
-- 4. Cómo va cada estudiante
-- ---------------------------------------------------------------------------

select
  p.nombre_completo                                    as estudiante,
  u.email                                              as correo_del_estudiante,
  coalesce(p.representante_nombre, '—')                as representante,
  coalesce(p.representante_email, '— sin correo —')    as correo_del_representante,
  case
    when p.representante_email is null
      then 'Falta su correo: usa anotar_representante()'
    when exists (select 1 from public.tutorias t where t.estudiante_id = p.id)
      then 'Enlazado'
    else 'Anotado; falta que cree su cuenta'
  end                                                  as estado
from public.profiles p
join auth.users u on u.id = p.id
where p.role = 'estudiante'
order by p.nombre_completo;
