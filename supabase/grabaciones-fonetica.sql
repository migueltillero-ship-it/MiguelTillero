-- ===========================================================================
-- GRABACIONES DE FONÉTICA
-- ===========================================================================
-- El estudiante se graba pronunciando los pares mínimos y Miguel los escucha
-- cuando puede. La pronunciación no se corrige leyendo: hay que oírla, y una
-- clase de dos horas no da para repetir cincuenta pares.
--
-- Cada grabación guarda el par concreto de un ejercicio concreto, para poder
-- oír cómo evoluciona «bé / bè» a lo largo del curso.
--
-- CÓMO USAR: Supabase → SQL Editor → New query → pegar → Run.
--   https://supabase.com/dashboard/project/yfrdlzveleevkjqekdoq/sql/new
-- Es seguro repetirlo.
-- ===========================================================================

create table if not exists public.grabaciones (
  id            uuid primary key default gen_random_uuid(),
  estudiante_id uuid not null references public.profiles(id) on delete cascade,
  ejercicio     text not null,        -- 'e-cerrada-abierta', 'i-u', …
  item          text not null,        -- 'bé / bè'
  archivo       text not null,        -- ruta en el almacén «grabaciones»
  segundos      numeric,
  enviado_en    timestamptz not null default now(),
  escuchado_en  timestamptz,
  comentario    text                  -- lo que Miguel le devuelve
);

alter table public.grabaciones enable row level security;

create index if not exists idx_grabaciones_estudiante
  on public.grabaciones(estudiante_id, ejercicio, enviado_en desc);

drop policy if exists "grabaciones: el estudiante sube las suyas" on public.grabaciones;
create policy "grabaciones: el estudiante sube las suyas"
  on public.grabaciones for insert to authenticated
  with check (estudiante_id = auth.uid());

drop policy if exists "grabaciones: cada quien oye lo suyo" on public.grabaciones;
create policy "grabaciones: cada quien oye lo suyo"
  on public.grabaciones for select to authenticated
  using (estudiante_id = auth.uid() or public.es_docente());

-- Rehacer un intento malo es parte de practicar, mientras Miguel no lo haya
-- escuchado todavía.
drop policy if exists "grabaciones: el estudiante rehace la suya" on public.grabaciones;
create policy "grabaciones: el estudiante rehace la suya"
  on public.grabaciones for delete to authenticated
  using (estudiante_id = auth.uid() and escuchado_en is null);

drop policy if exists "grabaciones: solo el docente comenta" on public.grabaciones;
create policy "grabaciones: solo el docente comenta"
  on public.grabaciones for update to authenticated
  using (public.es_docente()) with check (public.es_docente());

comment on table public.grabaciones is
  'Audios del estudiante practicando pares mínimos. El estudiante puede '
  'borrar los suyos mientras Miguel no los haya escuchado.';

-- Almacén privado: es la voz de una persona aprendiendo, con sus titubeos.
insert into storage.buckets (id, name, public)
values ('grabaciones', 'grabaciones', false)
on conflict (id) do nothing;

drop policy if exists "grabaciones: subir la propia" on storage.objects;
create policy "grabaciones: subir la propia"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'grabaciones'
              and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "grabaciones: oir la propia o todas si es docente" on storage.objects;
create policy "grabaciones: oir la propia o todas si es docente"
  on storage.objects for select to authenticated
  using (bucket_id = 'grabaciones'
         and ((storage.foldername(name))[1] = auth.uid()::text or public.es_docente()));

drop policy if exists "grabaciones: borrar la propia" on storage.objects;
create policy "grabaciones: borrar la propia"
  on storage.objects for delete to authenticated
  using (bucket_id = 'grabaciones'
         and ((storage.foldername(name))[1] = auth.uid()::text or public.es_docente()));
