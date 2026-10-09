-- ============================================================================
-- LIBRO VIRTUAL · el libro del curso, solo para alumnos con inscripción activa
--
-- Los alumnos compraron el libro; aquí lo leen en línea desde su espacio.
--
--   · El PDF NO vive en el repositorio (que es público): va a un bucket
--     PRIVADO de Supabase Storage, «libros».
--   · Como el plan gratuito limita cada archivo a 50 MB, la página de carga
--     (libro/subir.html) parte el PDF en trozos en el navegador del docente
--     y los sube como libros/<grupo_id>/<libro_id>/parte-01.pdf, …
--   · Solo lo leen el docente/admin y quien tenga inscripción ACTIVA en el
--     grupo, con enlaces firmados que caducan en minutos.
--
-- CÓMO USAR: ejecútalo DESPUÉS de representante-y-enlaces.sql. Es seguro
-- repetirlo.
-- ============================================================================

-- 1. Bucket privado ----------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('libros', 'libros', false, 52428800, array['application/pdf'])
on conflict (id) do update
  set public = false, file_size_limit = 52428800, allowed_mime_types = array['application/pdf'];


-- 2. Ficha del libro ----------------------------------------------------------
create table if not exists public.libros (
  id             uuid primary key default gen_random_uuid(),
  grupo_id       uuid not null references public.grupos(id) on delete cascade,
  titulo         text not null,
  total_paginas  integer not null default 0,
  -- [{"path":"<grupo>/<libro>/parte-01.pdf","desde":1,"hasta":40}, …]
  partes         jsonb not null default '[]'::jsonb,
  -- [{"titulo":"Unité 1","pagina":12}, …]
  indice         jsonb not null default '[]'::jsonb,
  publicado      boolean not null default false,
  creado_en      timestamptz not null default now()
);
alter table public.libros enable row level security;
create index if not exists idx_libros_grupo on public.libros(grupo_id);

drop policy if exists "libros: staff administra" on public.libros;
create policy "libros: staff administra" on public.libros for all to authenticated
  using (public.es_admin() or public.es_docente_del_grupo(grupo_id))
  with check (public.es_admin() or public.es_docente_del_grupo(grupo_id));

drop policy if exists "libros: alumno activo lo ve" on public.libros;
create policy "libros: alumno activo lo ve" on public.libros for select to authenticated
  using (publicado and public.esta_inscrito_activo_en_grupo(grupo_id));


-- 3. Acceso a los archivos ----------------------------------------------------
-- La primera carpeta de la ruta es el grupo: libros/<grupo_id>/...
create or replace function public.puede_leer_libro(p_nombre text)
returns boolean language plpgsql stable security definer set search_path = public as $$
declare v_grupo uuid;
begin
  begin
    v_grupo := split_part(p_nombre, '/', 1)::uuid;
  exception when others then
    return false;
  end;
  return public.es_admin()
      or public.es_docente_del_grupo(v_grupo)
      or (public.esta_inscrito_activo_en_grupo(v_grupo)
          and exists (select 1 from public.libros l where l.grupo_id = v_grupo and l.publicado));
end $$;
grant execute on function public.puede_leer_libro(text) to authenticated;

create or replace function public.puede_subir_libro(p_nombre text)
returns boolean language plpgsql stable security definer set search_path = public as $$
declare v_grupo uuid;
begin
  begin
    v_grupo := split_part(p_nombre, '/', 1)::uuid;
  exception when others then
    return false;
  end;
  return public.es_admin() or public.es_docente_del_grupo(v_grupo);
end $$;
grant execute on function public.puede_subir_libro(text) to authenticated;

drop policy if exists "libros: leer" on storage.objects;
create policy "libros: leer" on storage.objects for select to authenticated
  using (bucket_id = 'libros' and public.puede_leer_libro(name));

drop policy if exists "libros: subir" on storage.objects;
create policy "libros: subir" on storage.objects for insert to authenticated
  with check (bucket_id = 'libros' and public.puede_subir_libro(name));

drop policy if exists "libros: reemplazar" on storage.objects;
create policy "libros: reemplazar" on storage.objects for update to authenticated
  using (bucket_id = 'libros' and public.puede_subir_libro(name))
  with check (bucket_id = 'libros' and public.puede_subir_libro(name));

drop policy if exists "libros: borrar" on storage.objects;
create policy "libros: borrar" on storage.objects for delete to authenticated
  using (bucket_id = 'libros' and public.puede_subir_libro(name));


-- 4. Acceso directo en «Materiales» del grupo A1-OCT2026 --------------------
do $$
declare v_grupo uuid;
begin
  select id into v_grupo from public.grupos where codigo = 'A1-OCT2026';
  if v_grupo is not null then
    insert into public.materiales (grupo_id, titulo, descripcion, url, categoria, unidad, orden)
    values (v_grupo, 'Mi libro · Défi 1',
            'El libro del curso, para leerlo en línea desde cualquier dispositivo.',
            'https://migueltillero-ship-it.github.io/MiguelTillero/libro/', 'material', null, 0)
    on conflict (coalesce(grupo_id, '00000000-0000-0000-0000-000000000000'::uuid), url)
    do update set titulo = excluded.titulo, descripcion = excluded.descripcion, orden = 0;
  end if;
end $$;


-- COMPROBACIÓN
select id, public, file_size_limit from storage.buckets where id = 'libros';
