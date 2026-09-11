-- ============================================================================
-- Plataforma docente / estudiantil — Miguel Tillero
-- Esquema de base de datos para Supabase (Postgres + Auth + RLS)
--
-- Cómo usar:
-- 1. Crea un proyecto en https://supabase.com
-- 2. Ve a SQL Editor → New query
-- 3. Pega y ejecuta este archivo completo
-- 4. Copia Project URL y anon public key en assets/js/supabase-config.js
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. PERFILES (extiende auth.users con rol, nombre, teléfono, etc.)
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('docente', 'estudiante')) default 'estudiante',
  nombre_completo text not null,
  telefono text,
  avatar_url text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles: el usuario ve su propio perfil"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles: el usuario crea su propio perfil"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "profiles: el usuario edita su propio perfil"
  on public.profiles for update
  using (auth.uid() = id);

-- Los docentes necesitan ver el nombre de los estudiantes inscritos en sus cursos.
create policy "profiles: docente ve perfiles de sus estudiantes inscritos"
  on public.profiles for select
  using (
    exists (
      select 1
      from public.inscripciones i
      join public.cursos c on c.id = i.curso_id
      where i.estudiante_id = profiles.id
        and c.docente_id = auth.uid()
    )
  );

-- ---------------------------------------------------------------------------
-- 2. CURSOS
-- ---------------------------------------------------------------------------
create table if not exists public.cursos (
  id uuid primary key default gen_random_uuid(),
  docente_id uuid not null references public.profiles(id) on delete cascade,
  nombre text not null,
  nivel text,
  descripcion text,
  fecha_inicio date,
  fecha_fin date,
  cupo_maximo integer,
  estado text not null check (estado in ('borrador', 'abierto', 'cerrado', 'finalizado')) default 'borrador',
  created_at timestamptz not null default now()
);

alter table public.cursos enable row level security;

create policy "cursos: cualquiera ve cursos abiertos"
  on public.cursos for select
  using (estado = 'abierto' or docente_id = auth.uid());

create policy "cursos: docente administra sus cursos"
  on public.cursos for all
  using (docente_id = auth.uid())
  with check (docente_id = auth.uid());

-- ---------------------------------------------------------------------------
-- 3. HORARIOS (bloques semanales recurrentes de un curso)
-- ---------------------------------------------------------------------------
create table if not exists public.horarios (
  id uuid primary key default gen_random_uuid(),
  curso_id uuid not null references public.cursos(id) on delete cascade,
  dia_semana smallint not null check (dia_semana between 0 and 6), -- 0=domingo
  hora_inicio time not null,
  hora_fin time not null
);

alter table public.horarios enable row level security;

create policy "horarios: visibles si el curso es visible"
  on public.horarios for select
  using (
    exists (
      select 1 from public.cursos c
      where c.id = horarios.curso_id
        and (c.estado = 'abierto' or c.docente_id = auth.uid())
    )
  );

create policy "horarios: docente administra horarios de sus cursos"
  on public.horarios for all
  using (exists (select 1 from public.cursos c where c.id = horarios.curso_id and c.docente_id = auth.uid()))
  with check (exists (select 1 from public.cursos c where c.id = horarios.curso_id and c.docente_id = auth.uid()));

-- ---------------------------------------------------------------------------
-- 4. INSCRIPCIONES (relación estudiante ↔ curso, con estado de aprobación)
-- ---------------------------------------------------------------------------
create table if not exists public.inscripciones (
  id uuid primary key default gen_random_uuid(),
  curso_id uuid not null references public.cursos(id) on delete cascade,
  estudiante_id uuid not null references public.profiles(id) on delete cascade,
  estado text not null check (estado in ('pendiente', 'activa', 'rechazada', 'finalizada')) default 'pendiente',
  notas text,
  created_at timestamptz not null default now(),
  unique (curso_id, estudiante_id)
);

alter table public.inscripciones enable row level security;

create policy "inscripciones: estudiante ve las suyas"
  on public.inscripciones for select
  using (estudiante_id = auth.uid());

create policy "inscripciones: estudiante se autoinscribe"
  on public.inscripciones for insert
  with check (estudiante_id = auth.uid());

create policy "inscripciones: docente ve inscripciones de sus cursos"
  on public.inscripciones for select
  using (exists (select 1 from public.cursos c where c.id = inscripciones.curso_id and c.docente_id = auth.uid()));

create policy "inscripciones: docente administra inscripciones de sus cursos"
  on public.inscripciones for update
  using (exists (select 1 from public.cursos c where c.id = inscripciones.curso_id and c.docente_id = auth.uid()));

create policy "inscripciones: docente elimina inscripciones de sus cursos"
  on public.inscripciones for delete
  using (exists (select 1 from public.cursos c where c.id = inscripciones.curso_id and c.docente_id = auth.uid()));

-- ---------------------------------------------------------------------------
-- 5. SESIONES (planificación: una fila por clase/fecha, con tema y contenido)
-- ---------------------------------------------------------------------------
create table if not exists public.sesiones (
  id uuid primary key default gen_random_uuid(),
  curso_id uuid not null references public.cursos(id) on delete cascade,
  fecha date not null,
  tema text,
  contenido text,
  created_at timestamptz not null default now()
);

alter table public.sesiones enable row level security;

create policy "sesiones: docente administra sesiones de sus cursos"
  on public.sesiones for all
  using (exists (select 1 from public.cursos c where c.id = sesiones.curso_id and c.docente_id = auth.uid()))
  with check (exists (select 1 from public.cursos c where c.id = sesiones.curso_id and c.docente_id = auth.uid()));

create policy "sesiones: estudiante inscrito ve las sesiones de su curso"
  on public.sesiones for select
  using (
    exists (
      select 1 from public.inscripciones i
      where i.curso_id = sesiones.curso_id
        and i.estudiante_id = auth.uid()
        and i.estado = 'activa'
    )
  );

-- ---------------------------------------------------------------------------
-- 6. ASISTENCIA (por sesión y estudiante)
-- ---------------------------------------------------------------------------
create table if not exists public.asistencia (
  id uuid primary key default gen_random_uuid(),
  sesion_id uuid not null references public.sesiones(id) on delete cascade,
  estudiante_id uuid not null references public.profiles(id) on delete cascade,
  presente boolean not null default false,
  observacion text,
  unique (sesion_id, estudiante_id)
);

alter table public.asistencia enable row level security;

create policy "asistencia: docente administra asistencia de sus cursos"
  on public.asistencia for all
  using (
    exists (
      select 1 from public.sesiones s
      join public.cursos c on c.id = s.curso_id
      where s.id = asistencia.sesion_id and c.docente_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.sesiones s
      join public.cursos c on c.id = s.curso_id
      where s.id = asistencia.sesion_id and c.docente_id = auth.uid()
    )
  );

create policy "asistencia: estudiante ve su propia asistencia"
  on public.asistencia for select
  using (estudiante_id = auth.uid());

-- ---------------------------------------------------------------------------
-- 7. EVALUACIONES (exámenes/tareas de un curso) y NOTAS (calificación por estudiante)
-- ---------------------------------------------------------------------------
create table if not exists public.evaluaciones (
  id uuid primary key default gen_random_uuid(),
  curso_id uuid not null references public.cursos(id) on delete cascade,
  nombre text not null,
  fecha date,
  ponderacion numeric,
  created_at timestamptz not null default now()
);

alter table public.evaluaciones enable row level security;

create policy "evaluaciones: docente administra evaluaciones de sus cursos"
  on public.evaluaciones for all
  using (exists (select 1 from public.cursos c where c.id = evaluaciones.curso_id and c.docente_id = auth.uid()))
  with check (exists (select 1 from public.cursos c where c.id = evaluaciones.curso_id and c.docente_id = auth.uid()));

create policy "evaluaciones: estudiante inscrito ve evaluaciones de su curso"
  on public.evaluaciones for select
  using (
    exists (
      select 1 from public.inscripciones i
      where i.curso_id = evaluaciones.curso_id
        and i.estudiante_id = auth.uid()
        and i.estado = 'activa'
    )
  );

create table if not exists public.notas (
  id uuid primary key default gen_random_uuid(),
  evaluacion_id uuid not null references public.evaluaciones(id) on delete cascade,
  estudiante_id uuid not null references public.profiles(id) on delete cascade,
  calificacion numeric,
  comentario text,
  unique (evaluacion_id, estudiante_id)
);

alter table public.notas enable row level security;

create policy "notas: docente administra notas de sus cursos"
  on public.notas for all
  using (
    exists (
      select 1 from public.evaluaciones e
      join public.cursos c on c.id = e.curso_id
      where e.id = notas.evaluacion_id and c.docente_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.evaluaciones e
      join public.cursos c on c.id = e.curso_id
      where e.id = notas.evaluacion_id and c.docente_id = auth.uid()
    )
  );

create policy "notas: estudiante ve sus propias notas"
  on public.notas for select
  using (estudiante_id = auth.uid());

-- ---------------------------------------------------------------------------
-- 8. Trigger opcional: crear perfil automáticamente al confirmar un usuario
--    (el frontend también inserta el perfil explícitamente en el registro;
--    este trigger es un respaldo por si el insert del frontend falla).
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, role, nombre_completo)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'role', 'estudiante'),
    coalesce(new.raw_user_meta_data->>'nombre_completo', new.email)
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
