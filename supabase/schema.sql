-- ============================================================================
-- Plataforma docente / estudiantil — Miguel Tillero
-- Esquema de base de datos para Supabase (Postgres + Auth + RLS)
--
-- Cómo usar:
-- 1. Crea un proyecto en https://supabase.com
-- 2. Ve a SQL Editor → New query
-- 3. Pega y ejecuta este archivo completo (se puede volver a correr sin
--    problema: las tablas usan "if not exists" y las políticas se
--    eliminan y recrean cada vez).
-- 4. Copia Project URL y publishable key en assets/js/supabase-config.js
--
-- Cómo crear tu propia cuenta de DOCENTE (Miguel):
-- El formulario público de inscripcion.html solo crea cuentas de ESTUDIANTE.
-- Para tu cuenta de docente:
--   1. Ve a Authentication → Users → Add user (en el dashboard de Supabase)
--      y crea tu usuario con tu correo y una contraseña (marca "Auto Confirm User").
--   2. Copia el UUID de ese usuario (columna "UID").
--   3. Ejecuta en SQL Editor:
--        update public.profiles set role = 'docente', nombre_completo = 'Miguel Tillero'
--        where id = 'PEGA-AQUI-EL-UUID';
--   4. Entra en login.html con ese correo y contraseña → te llevará a panel-docente.html
-- ============================================================================

-- ---------------------------------------------------------------------------
-- TABLAS (primero se crean todas, sin políticas, para evitar referencias
-- cruzadas entre tablas que todavía no existen)
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

create table if not exists public.horarios (
  id uuid primary key default gen_random_uuid(),
  curso_id uuid not null references public.cursos(id) on delete cascade,
  dia_semana smallint not null check (dia_semana between 0 and 6),
  hora_inicio time not null,
  hora_fin time not null
);
alter table public.horarios enable row level security;

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

create table if not exists public.sesiones (
  id uuid primary key default gen_random_uuid(),
  curso_id uuid not null references public.cursos(id) on delete cascade,
  fecha date not null,
  tema text,
  contenido text,
  created_at timestamptz not null default now()
);
alter table public.sesiones enable row level security;

create table if not exists public.asistencia (
  id uuid primary key default gen_random_uuid(),
  sesion_id uuid not null references public.sesiones(id) on delete cascade,
  estudiante_id uuid not null references public.profiles(id) on delete cascade,
  presente boolean not null default false,
  observacion text,
  unique (sesion_id, estudiante_id)
);
alter table public.asistencia enable row level security;

create table if not exists public.evaluaciones (
  id uuid primary key default gen_random_uuid(),
  curso_id uuid not null references public.cursos(id) on delete cascade,
  nombre text not null,
  fecha date,
  ponderacion numeric,
  created_at timestamptz not null default now()
);
alter table public.evaluaciones enable row level security;

create table if not exists public.notas (
  id uuid primary key default gen_random_uuid(),
  evaluacion_id uuid not null references public.evaluaciones(id) on delete cascade,
  estudiante_id uuid not null references public.profiles(id) on delete cascade,
  calificacion numeric,
  comentario text,
  unique (evaluacion_id, estudiante_id)
);
alter table public.notas enable row level security;

-- ---------------------------------------------------------------------------
-- POLÍTICAS (todas las tablas ya existen, así que el orden no importa)
-- ---------------------------------------------------------------------------

-- profiles
drop policy if exists "profiles: el usuario ve su propio perfil" on public.profiles;
create policy "profiles: el usuario ve su propio perfil"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "profiles: el usuario crea su propio perfil" on public.profiles;
create policy "profiles: el usuario crea su propio perfil"
  on public.profiles for insert
  with check (auth.uid() = id);

drop policy if exists "profiles: el usuario edita su propio perfil" on public.profiles;
create policy "profiles: el usuario edita su propio perfil"
  on public.profiles for update
  using (auth.uid() = id);

drop policy if exists "profiles: docente ve perfiles de sus estudiantes inscritos" on public.profiles;
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

-- cursos
drop policy if exists "cursos: cualquiera ve cursos abiertos" on public.cursos;
create policy "cursos: cualquiera ve cursos abiertos"
  on public.cursos for select
  using (estado = 'abierto' or docente_id = auth.uid());

drop policy if exists "cursos: estudiante inscrito ve su curso aunque ya no esté abierto" on public.cursos;
create policy "cursos: estudiante inscrito ve su curso aunque ya no esté abierto"
  on public.cursos for select
  using (
    exists (
      select 1 from public.inscripciones i
      where i.curso_id = cursos.id and i.estudiante_id = auth.uid()
    )
  );

drop policy if exists "cursos: docente administra sus cursos" on public.cursos;
create policy "cursos: docente administra sus cursos"
  on public.cursos for all
  using (docente_id = auth.uid())
  with check (docente_id = auth.uid());

-- horarios
drop policy if exists "horarios: visibles si el curso es visible" on public.horarios;
create policy "horarios: visibles si el curso es visible"
  on public.horarios for select
  using (
    exists (
      select 1 from public.cursos c
      where c.id = horarios.curso_id
        and (c.estado = 'abierto' or c.docente_id = auth.uid())
    )
  );

drop policy if exists "horarios: docente administra horarios de sus cursos" on public.horarios;
create policy "horarios: docente administra horarios de sus cursos"
  on public.horarios for all
  using (exists (select 1 from public.cursos c where c.id = horarios.curso_id and c.docente_id = auth.uid()))
  with check (exists (select 1 from public.cursos c where c.id = horarios.curso_id and c.docente_id = auth.uid()));

-- inscripciones
drop policy if exists "inscripciones: estudiante ve las suyas" on public.inscripciones;
create policy "inscripciones: estudiante ve las suyas"
  on public.inscripciones for select
  using (estudiante_id = auth.uid());

drop policy if exists "inscripciones: estudiante se autoinscribe" on public.inscripciones;
create policy "inscripciones: estudiante se autoinscribe"
  on public.inscripciones for insert
  with check (estudiante_id = auth.uid());

drop policy if exists "inscripciones: docente ve inscripciones de sus cursos" on public.inscripciones;
create policy "inscripciones: docente ve inscripciones de sus cursos"
  on public.inscripciones for select
  using (exists (select 1 from public.cursos c where c.id = inscripciones.curso_id and c.docente_id = auth.uid()));

drop policy if exists "inscripciones: docente administra inscripciones de sus cursos" on public.inscripciones;
create policy "inscripciones: docente administra inscripciones de sus cursos"
  on public.inscripciones for update
  using (exists (select 1 from public.cursos c where c.id = inscripciones.curso_id and c.docente_id = auth.uid()));

drop policy if exists "inscripciones: docente elimina inscripciones de sus cursos" on public.inscripciones;
create policy "inscripciones: docente elimina inscripciones de sus cursos"
  on public.inscripciones for delete
  using (exists (select 1 from public.cursos c where c.id = inscripciones.curso_id and c.docente_id = auth.uid()));

-- sesiones
drop policy if exists "sesiones: docente administra sesiones de sus cursos" on public.sesiones;
create policy "sesiones: docente administra sesiones de sus cursos"
  on public.sesiones for all
  using (exists (select 1 from public.cursos c where c.id = sesiones.curso_id and c.docente_id = auth.uid()))
  with check (exists (select 1 from public.cursos c where c.id = sesiones.curso_id and c.docente_id = auth.uid()));

drop policy if exists "sesiones: estudiante inscrito ve las sesiones de su curso" on public.sesiones;
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

-- asistencia
drop policy if exists "asistencia: docente administra asistencia de sus cursos" on public.asistencia;
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

drop policy if exists "asistencia: estudiante ve su propia asistencia" on public.asistencia;
create policy "asistencia: estudiante ve su propia asistencia"
  on public.asistencia for select
  using (estudiante_id = auth.uid());

-- evaluaciones
drop policy if exists "evaluaciones: docente administra evaluaciones de sus cursos" on public.evaluaciones;
create policy "evaluaciones: docente administra evaluaciones de sus cursos"
  on public.evaluaciones for all
  using (exists (select 1 from public.cursos c where c.id = evaluaciones.curso_id and c.docente_id = auth.uid()))
  with check (exists (select 1 from public.cursos c where c.id = evaluaciones.curso_id and c.docente_id = auth.uid()));

drop policy if exists "evaluaciones: estudiante inscrito ve evaluaciones de su curso" on public.evaluaciones;
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

-- notas
drop policy if exists "notas: docente administra notas de sus cursos" on public.notas;
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

drop policy if exists "notas: estudiante ve sus propias notas" on public.notas;
create policy "notas: estudiante ve sus propias notas"
  on public.notas for select
  using (estudiante_id = auth.uid());

-- ---------------------------------------------------------------------------
-- TRIGGER: crea el perfil (y, si aplica, la inscripción) automáticamente
-- cuando se registra un usuario nuevo.
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  v_curso_id uuid;
begin
  insert into public.profiles (id, role, nombre_completo, telefono)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'role', 'estudiante'),
    coalesce(new.raw_user_meta_data->>'nombre_completo', new.email),
    new.raw_user_meta_data->>'telefono'
  )
  on conflict (id) do nothing;

  v_curso_id := nullif(new.raw_user_meta_data->>'curso_id', '')::uuid;
  if v_curso_id is not null then
    insert into public.inscripciones (curso_id, estudiante_id, estado)
    values (v_curso_id, new.id, 'pendiente')
    on conflict (curso_id, estudiante_id) do nothing;
  end if;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
