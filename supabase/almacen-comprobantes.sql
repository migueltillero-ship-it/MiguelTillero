-- ===========================================================================
-- ALMACÉN DE COMPROBANTES DE PAGO
-- ===========================================================================
-- Un comprobante es el resguardo de una transferencia: lleva el nombre de la
-- persona, su banco y a veces su número de cuenta. No puede quedar en un
-- contenedor público. Este es privado y cada quien solo alcanza lo suyo.
--
-- Los archivos se guardan en carpetas con el identificador de la
-- contratación: «<contratacion_id>/1730000000-recibo.pdf». Esa carpeta es lo
-- que usan las políticas para saber de quién es cada archivo, así que la
-- página no puede inventarse una ruta ajena.
--
-- CÓMO USAR: Supabase → SQL Editor → New query → pegar → Run.
-- Ejecutar DESPUÉS de contrataciones.sql. Es seguro repetirlo.
-- ===========================================================================

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('comprobantes', 'comprobantes', false, 8388608,
        array['image/jpeg','image/png','image/webp','image/heic','application/pdf'])
on conflict (id) do update
   set public = false,
       file_size_limit = excluded.file_size_limit,
       allowed_mime_types = excluded.allowed_mime_types;


-- ---------------------------------------------------------------------------
-- Quién puede qué
-- ---------------------------------------------------------------------------
-- La primera carpeta de la ruta es el identificador de la contratación. Se
-- comprueba que esa contratación sea de quien sube o mira; si no, no hay
-- acceso, aunque adivine el nombre del archivo.

drop policy if exists "comprobantes: el estudiante sube el suyo" on storage.objects;
create policy "comprobantes: el estudiante sube el suyo"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'comprobantes'
    and exists (
      select 1 from public.contrataciones c
       where c.id::text = (storage.foldername(name))[1]
         and c.estudiante_id = auth.uid()));

drop policy if exists "comprobantes: el estudiante ve el suyo" on storage.objects;
create policy "comprobantes: el estudiante ve el suyo"
  on storage.objects for select to authenticated
  using (
    bucket_id = 'comprobantes'
    and exists (
      select 1 from public.contrataciones c
       where c.id::text = (storage.foldername(name))[1]
         and c.estudiante_id = auth.uid()));

-- El docente revisa y, si hace falta, retira un archivo subido por error.
drop policy if exists "comprobantes: el docente los administra" on storage.objects;
create policy "comprobantes: el docente los administra"
  on storage.objects for all to authenticated
  using (bucket_id = 'comprobantes' and public.es_docente())
  with check (bucket_id = 'comprobantes' and public.es_docente());


-- Comprobar que quedó
select id, public, file_size_limit, allowed_mime_types
  from storage.buckets where id = 'comprobantes';
