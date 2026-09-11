-- ============================================================================
-- Plataforma docente / estudiantil — Miguel Tillero
-- Esquema de base de datos para Supabase (Postgres + Auth + RLS)
--
-- Cómo usar:
-- 1. Ve a SQL Editor → New query en tu proyecto de Supabase
-- 2. Pega y ejecuta este archivo completo. Se puede volver a ejecutar las
--    veces que haga falta: las tablas usan "if not exists" y las políticas
--    se eliminan y se recrean cada vez.
-- 3. Copia Project URL y publishable key en assets/js/supabase-config.js
--
-- Cómo crear tu propia cuenta de DOCENTE (Miguel):
-- El formulario público de inscripcion.html solo crea cuentas de ESTUDIANTE.
--   1. Authentication → Users → Add user (marca "Auto Confirm User").
--   2. Copia el UUID de ese usuario (columna "UID").
--   3. Ejecuta en SQL Editor:
--        update public.profiles set role = 'docente', nombre_completo = 'Miguel Tillero'
--        where id = 'PEGA-AQUI-EL-UUID';
--
-- NOTA IMPORTANTE SOBRE LAS POLÍTICAS (RLS):
-- Las políticas NO consultan otras tablas directamente. Si lo hicieran, se
-- llamarían en círculo (la política de "cursos" mira "inscripciones", y la de
-- "inscripciones" mira "cursos") y Postgres aborta con el error
-- "42P17: infinite recursion detected in policy". Para evitarlo, toda
-- comprobación que cruza tablas vive en una función SECURITY DEFINER, que se
-- ejecuta con los permisos del dueño y por tanto no vuelve a disparar RLS.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. TABLAS
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
-- 2. FUNCIONES DE APOYO (SECURITY DEFINER — rompen la recursión de RLS)
--    Solo devuelven true/false y filtran siempre por auth.uid(), así que no
--    exponen datos de nadie más.
-- ---------------------------------------------------------------------------

-- ¿El usuario actual tiene rol de docente? (sin esto, cualquier estudiante
-- podría crearse cursos poniéndose a sí mismo como docente).
create or replace function public.es_docente()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'docente'
  );
$$;

create or replace function public.es_docente_del_curso(p_curso_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.cursos c
    where c.id = p_curso_id and c.docente_id = auth.uid()
  );
$$;

create or replace function public.esta_inscrito_en_curso(p_curso_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.inscripciones i
    where i.curso_id = p_curso_id and i.estudiante_id = auth.uid()
  );
$$;

create or replace function public.esta_inscrito_activo(p_curso_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.inscripciones i
    where i.curso_id = p_curso_id
      and i.estudiante_id = auth.uid()
      and i.estado = 'activa'
  );
$$;

create or replace function public.curso_esta_abierto(p_curso_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.cursos c
    where c.id = p_curso_id and c.estado = 'abierto'
  );
$$;

create or replace function public.es_estudiante_de_mis_cursos(p_estudiante_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1
    from public.inscripciones i
    join public.cursos c on c.id = i.curso_id
    where i.estudiante_id = p_estudiante_id
      and c.docente_id = auth.uid()
  );
$$;

create or replace function public.es_docente_de_la_sesion(p_sesion_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1
    from public.sesiones s
    join public.cursos c on c.id = s.curso_id
    where s.id = p_sesion_id and c.docente_id = auth.uid()
  );
$$;

create or replace function public.es_docente_de_la_evaluacion(p_evaluacion_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1
    from public.evaluaciones e
    join public.cursos c on c.id = e.curso_id
    where e.id = p_evaluacion_id and c.docente_id = auth.uid()
  );
$$;

grant execute on function
  public.es_docente(),
  public.es_docente_del_curso(uuid),
  public.esta_inscrito_en_curso(uuid),
  public.esta_inscrito_activo(uuid),
  public.curso_esta_abierto(uuid),
  public.es_estudiante_de_mis_cursos(uuid),
  public.es_docente_de_la_sesion(uuid),
  public.es_docente_de_la_evaluacion(uuid)
to anon, authenticated;

-- ---------------------------------------------------------------------------
-- 3. POLÍTICAS
-- ---------------------------------------------------------------------------

-- profiles ------------------------------------------------------------------
drop policy if exists "profiles: el usuario ve su propio perfil" on public.profiles;
create policy "profiles: el usuario ve su propio perfil"
  on public.profiles for select
  using (auth.uid() = id);

-- Solo se puede crear el propio perfil, y siempre como estudiante: el rol de
-- docente se asigna a mano desde el SQL Editor, nunca desde el navegador.
drop policy if exists "profiles: el usuario crea su propio perfil" on public.profiles;
create policy "profiles: el usuario crea su propio perfil"
  on public.profiles for insert
  with check (auth.uid() = id and role = 'estudiante');

drop policy if exists "profiles: el usuario edita su propio perfil" on public.profiles;
create policy "profiles: el usuario edita su propio perfil"
  on public.profiles for update
  using (auth.uid() = id);

drop policy if exists "profiles: docente ve perfiles de sus estudiantes inscritos" on public.profiles;
create policy "profiles: docente ve perfiles de sus estudiantes inscritos"
  on public.profiles for select
  using (public.es_estudiante_de_mis_cursos(id));

-- cursos --------------------------------------------------------------------
drop policy if exists "cursos: cualquiera ve cursos abiertos" on public.cursos;
create policy "cursos: cualquiera ve cursos abiertos"
  on public.cursos for select
  using (estado = 'abierto' or docente_id = auth.uid());

drop policy if exists "cursos: estudiante inscrito ve su curso aunque ya no esté abierto" on public.cursos;
create policy "cursos: estudiante inscrito ve su curso aunque ya no esté abierto"
  on public.cursos for select
  using (public.esta_inscrito_en_curso(id));

drop policy if exists "cursos: docente administra sus cursos" on public.cursos;
create policy "cursos: docente administra sus cursos"
  on public.cursos for all
  using (docente_id = auth.uid() and public.es_docente())
  with check (docente_id = auth.uid() and public.es_docente());

-- horarios ------------------------------------------------------------------
drop policy if exists "horarios: visibles si el curso es visible" on public.horarios;
create policy "horarios: visibles si el curso es visible"
  on public.horarios for select
  using (
    public.curso_esta_abierto(curso_id)
    or public.es_docente_del_curso(curso_id)
    or public.esta_inscrito_en_curso(curso_id)
  );

drop policy if exists "horarios: docente administra horarios de sus cursos" on public.horarios;
create policy "horarios: docente administra horarios de sus cursos"
  on public.horarios for all
  using (public.es_docente_del_curso(curso_id))
  with check (public.es_docente_del_curso(curso_id));

-- inscripciones -------------------------------------------------------------
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
  using (public.es_docente_del_curso(curso_id));

drop policy if exists "inscripciones: docente administra inscripciones de sus cursos" on public.inscripciones;
create policy "inscripciones: docente administra inscripciones de sus cursos"
  on public.inscripciones for update
  using (public.es_docente_del_curso(curso_id))
  with check (public.es_docente_del_curso(curso_id));

drop policy if exists "inscripciones: docente elimina inscripciones de sus cursos" on public.inscripciones;
create policy "inscripciones: docente elimina inscripciones de sus cursos"
  on public.inscripciones for delete
  using (public.es_docente_del_curso(curso_id));

-- sesiones ------------------------------------------------------------------
drop policy if exists "sesiones: docente administra sesiones de sus cursos" on public.sesiones;
create policy "sesiones: docente administra sesiones de sus cursos"
  on public.sesiones for all
  using (public.es_docente_del_curso(curso_id))
  with check (public.es_docente_del_curso(curso_id));

drop policy if exists "sesiones: estudiante inscrito ve las sesiones de su curso" on public.sesiones;
create policy "sesiones: estudiante inscrito ve las sesiones de su curso"
  on public.sesiones for select
  using (public.esta_inscrito_activo(curso_id));

-- asistencia ----------------------------------------------------------------
drop policy if exists "asistencia: docente administra asistencia de sus cursos" on public.asistencia;
create policy "asistencia: docente administra asistencia de sus cursos"
  on public.asistencia for all
  using (public.es_docente_de_la_sesion(sesion_id))
  with check (public.es_docente_de_la_sesion(sesion_id));

drop policy if exists "asistencia: estudiante ve su propia asistencia" on public.asistencia;
create policy "asistencia: estudiante ve su propia asistencia"
  on public.asistencia for select
  using (estudiante_id = auth.uid());

-- evaluaciones --------------------------------------------------------------
drop policy if exists "evaluaciones: docente administra evaluaciones de sus cursos" on public.evaluaciones;
create policy "evaluaciones: docente administra evaluaciones de sus cursos"
  on public.evaluaciones for all
  using (public.es_docente_del_curso(curso_id))
  with check (public.es_docente_del_curso(curso_id));

drop policy if exists "evaluaciones: estudiante inscrito ve evaluaciones de su curso" on public.evaluaciones;
create policy "evaluaciones: estudiante inscrito ve evaluaciones de su curso"
  on public.evaluaciones for select
  using (public.esta_inscrito_activo(curso_id));

-- notas ---------------------------------------------------------------------
drop policy if exists "notas: docente administra notas de sus cursos" on public.notas;
create policy "notas: docente administra notas de sus cursos"
  on public.notas for all
  using (public.es_docente_de_la_evaluacion(evaluacion_id))
  with check (public.es_docente_de_la_evaluacion(evaluacion_id));

drop policy if exists "notas: estudiante ve sus propias notas" on public.notas;
create policy "notas: estudiante ve sus propias notas"
  on public.notas for select
  using (estudiante_id = auth.uid());

-- ---------------------------------------------------------------------------
-- 4. PROTECCIÓN DEL ROL
--    Nadie puede cambiarse el rol a sí mismo desde el navegador. El cambio
--    solo se permite cuando no hay usuario autenticado en la petición, es
--    decir desde el SQL Editor de Supabase o con la clave de servicio.
-- ---------------------------------------------------------------------------
create or replace function public.proteger_rol()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  if new.role is distinct from old.role and auth.uid() is not null then
    raise exception 'No puedes cambiar tu propio rol';
  end if;
  return new;
end;
$$;

drop trigger if exists proteger_rol_perfil on public.profiles;
create trigger proteger_rol_perfil
  before update on public.profiles
  for each row execute function public.proteger_rol();

-- ---------------------------------------------------------------------------
-- 5. TRIGGER: crea el perfil (y, si aplica, la inscripción) automáticamente
--    cuando se registra un usuario nuevo. El rol siempre es 'estudiante':
--    el formulario público no puede pedir ser docente.
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
    'estudiante',
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
