-- ===========================================================================
-- TEXTOS PERSONALES DEL ESTUDIANTE (poemas, redacciones)
-- ===========================================================================
-- Por qué existe: el repositorio es público y algunos espacios individuales
-- muestran textos que escribió el propio alumno (en el caso de una menor,
-- poemas con nombres de amigos). Esos textos no van en el HTML: se guardan
-- aquí y la página los pide con la sesión de quien entra.
--
-- Quién lee:
--   · el docente, siempre;
--   · el alumno dueño (estudiante_id = su cuenta);
--   · mientras el alumno aún no tiene cuenta, el texto queda con
--     estudiante_id vacío y un correo; cuando se registra con ese correo
--     ya puede leerlo, sin que nadie tenga que volver a tocar la fila.
-- Nadie más: ni otros alumnos ni el público.
-- ===========================================================================

create table if not exists public.textos_estudiante (
  id            uuid primary key default gen_random_uuid(),
  estudiante_id uuid references public.profiles(id) on delete cascade,
  email         text,
  tipo          text not null default 'poema',
  titulo        text not null,
  cuerpo        text not null,
  orden         integer not null default 0,
  fecha         date,
  creado_en     timestamptz not null default now(),
  constraint textos_estudiante_dueno check (estudiante_id is not null or email is not null)
);

create index if not exists idx_textos_estudiante_dueno on public.textos_estudiante(estudiante_id);

alter table public.textos_estudiante enable row level security;

drop policy if exists "textos: docente todo" on public.textos_estudiante;
create policy "textos: docente todo" on public.textos_estudiante
  for all using (public.es_docente()) with check (public.es_docente());

drop policy if exists "textos: el alumno lee los suyos" on public.textos_estudiante;
create policy "textos: el alumno lee los suyos" on public.textos_estudiante
  for select using (
    estudiante_id = auth.uid()
    or (estudiante_id is null and email is not null
        and lower(email) = lower(coalesce(auth.jwt() ->> 'email', '')))
  );

grant all    on public.textos_estudiante to authenticated;  -- la política decide
