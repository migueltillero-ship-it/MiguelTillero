-- ============================================================================
--  TODO EN UNO — Miguel Tillero
--
--  Pega este archivo COMPLETO en el SQL Editor de Supabase y dale RUN.
--  Una sola vez. Deja la base al día y crea el ciclo A1 de octubre 2026.
--
--  Es seguro ejecutarlo aunque ya hayas corrido antes alguno de los
--  esquemas: todo está escrito para no duplicar ni borrar tus datos.
--
--  Al final te devuelve una tabla con EL ENLACE DE INSCRIPCIÓN.
--
--  Generado a partir de los archivos de supabase/. Si editas alguno de
--  ellos, vuelve a generar este.
-- ============================================================================



-- ############################################################################
-- # BASE — tablas, funciones y permisos
-- # (origen: supabase/schema.sql)
-- ############################################################################

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


-- ############################################################################
-- # GRUPOS, PAGOS, EGRESOS, EVENTOS, FERIADOS, CONSTANCIAS
-- # (origen: supabase/schema_v2.sql)
-- ############################################################################

-- ============================================================================
-- Plataforma docente / estudiantil — Miguel Tillero
-- ESQUEMA V2 — motor de gestión académica (grupos, pagos, finanzas, eventos,
-- feriados, constancias), adaptado del panel administrativo que Miguel ya usa
-- para la Alliance Française San Cristóbal, pero sin ningún contenido ni marca
-- de esa institución: aquí todo es genérico y de un solo profesor por ahora,
-- con espacio para sumar más adelante.
--
-- CÓMO USAR:
-- 1. Ejecuta este archivo DESPUÉS de supabase/schema.sql (el que ya tienes
--    corriendo). Es seguro volver a ejecutarlo las veces que haga falta:
--    usa "if not exists" / "on conflict do nothing" en todas partes, igual
--    que el original.
-- 2. No borra ni modifica los datos que ya existan en profiles/cursos/
--    inscripciones/sesiones/asistencia/evaluaciones/notas — solo agrega
--    columnas y tablas nuevas, y crea un "grupo" por cada curso que ya
--    tengas para que las inscripciones existentes queden enlazadas.
-- 3. Al terminar, en Authentication → tu usuario docente, tendrás que
--    decidir si además lo marcas como 'admin' (ver sección 1) para poder
--    entrar a admin.html; si sigues siendo el único profesor, puedes usar
--    el mismo usuario para ambas cosas.
--
-- NOTA SOBRE RLS: igual que en schema.sql, ninguna política consulta otra
-- tabla directamente — todo cruce entre tablas vive en una función
-- SECURITY DEFINER, para no disparar "42P17: infinite recursion detected".
-- ============================================================================


-- ---------------------------------------------------------------------------
-- 1. ROL "admin" — Miguel puede ser docente y admin a la vez
-- ---------------------------------------------------------------------------

alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles add constraint profiles_role_check
  check (role in ('docente', 'estudiante', 'admin'));

-- ¿El usuario actual es admin? (coordinación general, ve todo)
create or replace function public.es_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  );
$$;
grant execute on function public.es_admin() to anon, authenticated;

-- Un admin también puede hacer todo lo que un docente (Miguel, por ahora, es
-- ambos con la misma cuenta) — se reemplaza es_docente() de schema.sql para
-- que 'admin' cuente también como docente en todas las políticas existentes.
create or replace function public.es_docente()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role in ('docente', 'admin')
  );
$$;


-- ---------------------------------------------------------------------------
-- 2. GRUPOS — instancias de un curso (cupo, horario, costo, docente asignado)
--    "cursos" sigue existiendo tal cual (catálogo); "grupos" es la novedad:
--    una misma "curso" puede tener varios grupos (ej. uno en línea y otro
--    presencial, o dos horarios distintos del mismo programa).
-- ---------------------------------------------------------------------------

create table if not exists public.grupos (
  id uuid primary key default gen_random_uuid(),
  codigo text unique not null,
  curso_id uuid not null references public.cursos(id) on delete cascade,
  docente_id uuid references public.profiles(id) on delete set null,
  formato text not null default 'grupal' check (formato in ('individual', 'grupal')),
  modalidad text not null default 'virtual' check (modalidad in ('virtual', 'presencial')),
  cupo_maximo integer not null default 8 check (cupo_maximo > 0),
  cupo_actual integer not null default 0 check (cupo_actual >= 0),
  fecha_inicio date not null,
  fecha_fin date,
  horario jsonb,
  costo numeric(10,2),
  moneda text not null default 'MXN',
  estado text not null default 'abierto' check (estado in ('abierto', 'cerrado', 'en_curso', 'finalizado')),
  notas text,
  created_at timestamptz not null default now()
);
alter table public.grupos enable row level security;

create index if not exists idx_grupos_curso on public.grupos(curso_id);
create index if not exists idx_grupos_docente on public.grupos(docente_id);

-- Enlace de las inscripciones a un grupo concreto (nullable: una inscripción
-- puede seguir sin grupo asignado mientras está "pendiente" de aprobación).
alter table public.inscripciones add column if not exists grupo_id uuid references public.grupos(id) on delete set null;
create index if not exists idx_inscripciones_grupo on public.inscripciones(grupo_id);

-- Igual que en profiles: solo sesiones/asistencia ya viven bajo "cursos".
-- Añadimos grupo_id también en sesiones para poder migrar panel-docente.html
-- a trabajar por grupo sin romper lo que ya está guardado.
alter table public.sesiones add column if not exists grupo_id uuid references public.grupos(id) on delete cascade;
create index if not exists idx_sesiones_grupo on public.sesiones(grupo_id);

-- Trigger: mantener cupo_actual sincronizado con inscripciones "activa".
create or replace function public.fn_grupo_cupo()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  v_old_activa boolean := (tg_op <> 'INSERT') and old.estado = 'activa' and old.grupo_id is not null;
  v_new_activa boolean := (tg_op <> 'DELETE') and new.estado = 'activa' and new.grupo_id is not null;
begin
  if tg_op = 'DELETE' then
    if v_old_activa then
      update public.grupos set cupo_actual = greatest(0, cupo_actual - 1) where id = old.grupo_id;
    end if;
    return old;
  end if;

  if v_old_activa and (not v_new_activa or new.grupo_id is distinct from old.grupo_id) then
    update public.grupos set cupo_actual = greatest(0, cupo_actual - 1) where id = old.grupo_id;
  end if;
  if v_new_activa and (not v_old_activa or new.grupo_id is distinct from old.grupo_id) then
    update public.grupos set cupo_actual = cupo_actual + 1 where id = new.grupo_id;
  end if;
  return new;
end;
$$;

drop trigger if exists tr_grupo_cupo on public.inscripciones;
create trigger tr_grupo_cupo
after insert or update or delete on public.inscripciones
for each row execute function public.fn_grupo_cupo();

-- Back-fill: un grupo por cada curso que ya exista, con sus mismas fechas y
-- cupo, para que las inscripciones y sesiones de hoy queden enlazadas.
insert into public.grupos (codigo, curso_id, docente_id, cupo_maximo, fecha_inicio, fecha_fin, estado, created_at)
select
  'G-' || substr(c.id::text, 1, 8),
  c.id,
  c.docente_id,
  coalesce(c.cupo_maximo, 8),
  coalesce(c.fecha_inicio, current_date),
  c.fecha_fin,
  case c.estado when 'abierto' then 'abierto' when 'cerrado' then 'cerrado' when 'finalizado' then 'finalizado' else 'cerrado' end,
  c.created_at
from public.cursos c
where not exists (select 1 from public.grupos g where g.curso_id = c.id);

update public.inscripciones i
set grupo_id = g.id
from public.grupos g
where g.curso_id = i.curso_id and i.grupo_id is null;

update public.sesiones s
set grupo_id = g.id
from public.grupos g
where g.curso_id = s.curso_id and s.grupo_id is null;

-- Recalcular cupo_actual real después del back-fill (el trigger de arriba
-- solo aplica a cambios futuros, no a las filas que ya existían).
update public.grupos g
set cupo_actual = (
  select count(*) from public.inscripciones i
  where i.grupo_id = g.id and i.estado = 'activa'
);

-- Vista: grupos con cupo disponible (para inscripción pública y para el panel).
create or replace view public.v_grupos_disponibles as
select
  g.id, g.codigo, g.curso_id, c.nombre as curso_nombre, c.nivel as curso_nivel,
  g.formato, g.modalidad, g.cupo_maximo, g.cupo_actual,
  (g.cupo_maximo - g.cupo_actual) as cupo_disponible,
  g.fecha_inicio, g.fecha_fin, g.horario, g.costo, g.moneda, g.estado,
  p.nombre_completo as docente_nombre
from public.grupos g
join public.cursos c on c.id = g.curso_id
left join public.profiles p on p.id = g.docente_id
where g.estado in ('abierto', 'en_curso');

-- Helpers de permisos (mismo patrón que es_docente_del_curso en schema.sql).
create or replace function public.es_docente_del_grupo(p_grupo_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.grupos g where g.id = p_grupo_id and g.docente_id = auth.uid());
$$;

create or replace function public.esta_inscrito_en_grupo(p_grupo_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.inscripciones i
    where i.grupo_id = p_grupo_id and i.estudiante_id = auth.uid()
  );
$$;

grant execute on function
  public.es_docente_del_grupo(uuid),
  public.esta_inscrito_en_grupo(uuid)
to anon, authenticated;

-- RLS grupos ------------------------------------------------------------
drop policy if exists "grupos: cualquiera ve grupos abiertos" on public.grupos;
create policy "grupos: cualquiera ve grupos abiertos"
  on public.grupos for select
  using (estado in ('abierto', 'en_curso'));

drop policy if exists "grupos: docente ve y administra los suyos" on public.grupos;
create policy "grupos: docente ve y administra los suyos"
  on public.grupos for all
  using (docente_id = auth.uid() or public.es_admin())
  with check (docente_id = auth.uid() or public.es_admin());

drop policy if exists "grupos: estudiante ve el suyo" on public.grupos;
create policy "grupos: estudiante ve el suyo"
  on public.grupos for select
  using (public.esta_inscrito_en_grupo(id));


-- ---------------------------------------------------------------------------
-- 3. PAGOS — colegiaturas, ligadas a una inscripción. Stripe se conecta más
--    adelante (checkout_url / stripe_session_id quedan listos desde ya).
-- ---------------------------------------------------------------------------

create table if not exists public.pagos (
  id uuid primary key default gen_random_uuid(),
  inscripcion_id uuid not null references public.inscripciones(id) on delete cascade,
  monto numeric(10,2) not null,
  moneda text not null default 'MXN',
  concepto text,
  estado text not null default 'pendiente' check (estado in ('pendiente', 'procesando', 'pagado', 'rechazado', 'reembolsado')),
  metodo text default 'manual' check (metodo in ('manual', 'stripe')),
  stripe_session_id text unique,
  stripe_payment_intent text,
  checkout_url text,
  pagado_en timestamptz,
  registrado_por uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.pagos enable row level security;

create index if not exists idx_pagos_inscripcion on public.pagos(inscripcion_id);
create index if not exists idx_pagos_estado on public.pagos(estado);

create or replace function public.fn_touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists tr_pagos_touch on public.pagos;
create trigger tr_pagos_touch before update on public.pagos
for each row execute function public.fn_touch_updated_at();

create or replace function public.es_dueno_del_pago(p_inscripcion_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.inscripciones i
    where i.id = p_inscripcion_id and i.estudiante_id = auth.uid()
  );
$$;

create or replace function public.es_docente_del_pago(p_inscripcion_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.inscripciones i
    join public.grupos g on g.id = i.grupo_id
    where i.id = p_inscripcion_id and g.docente_id = auth.uid()
  );
$$;

grant execute on function
  public.es_dueno_del_pago(uuid),
  public.es_docente_del_pago(uuid)
to anon, authenticated;

drop policy if exists "pagos: admin y docente del grupo administran" on public.pagos;
create policy "pagos: admin y docente del grupo administran"
  on public.pagos for all
  using (public.es_admin() or public.es_docente_del_pago(inscripcion_id))
  with check (public.es_admin() or public.es_docente_del_pago(inscripcion_id));

drop policy if exists "pagos: estudiante ve los suyos" on public.pagos;
create policy "pagos: estudiante ve los suyos"
  on public.pagos for select
  using (public.es_dueno_del_pago(inscripcion_id));


-- ---------------------------------------------------------------------------
-- 4. EGRESOS — gastos y pagos a docentes, para el balance del panel admin.
-- ---------------------------------------------------------------------------

create table if not exists public.egresos (
  id uuid primary key default gen_random_uuid(),
  concepto text not null,
  categoria text,
  monto numeric(10,2) not null,
  moneda text not null default 'MXN',
  fecha date not null default current_date,
  docente_id uuid references public.profiles(id) on delete set null,
  notas text,
  registrado_por uuid references public.profiles(id),
  created_at timestamptz not null default now()
);
alter table public.egresos enable row level security;

create index if not exists idx_egresos_fecha on public.egresos(fecha desc);

drop policy if exists "egresos: solo admin" on public.egresos;
create policy "egresos: solo admin"
  on public.egresos for all
  using (public.es_admin())
  with check (public.es_admin());


-- ---------------------------------------------------------------------------
-- 5. EVENTOS — noticias / próximos eventos, editables desde admin.html.
--    Reemplaza el HTML fijo del popup "Próximo evento" del sitio público.
-- ---------------------------------------------------------------------------

create table if not exists public.eventos (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  descripcion text,
  fecha date not null,
  hora_inicio time,
  hora_fin time,
  lugar text,
  modalidad text default 'presencial' check (modalidad in ('presencial', 'virtual', 'hibrido')),
  entrada_libre boolean not null default true,
  costo numeric(10,2),
  url_accion text,
  texto_accion text,
  destacado boolean not null default false,
  publicado boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.eventos enable row level security;

create index if not exists idx_eventos_fecha on public.eventos(fecha desc);

drop trigger if exists tr_eventos_touch on public.eventos;
create trigger tr_eventos_touch before update on public.eventos
for each row execute function public.fn_touch_updated_at();

drop policy if exists "eventos: publico lee publicados" on public.eventos;
create policy "eventos: publico lee publicados"
  on public.eventos for select
  using (publicado = true);

drop policy if exists "eventos: admin administra" on public.eventos;
create policy "eventos: admin administra"
  on public.eventos for all
  using (public.es_admin())
  with check (public.es_admin());

-- Vista de conveniencia: el próximo evento publicado y vigente (lo que el
-- popup/sección del sitio público consulta).
create or replace view public.v_proximo_evento as
select *
from public.eventos
where publicado = true and fecha >= current_date
order by fecha asc, hora_inicio asc nulls last
limit 1;

-- Semilla: el evento que ya estaba escrito a mano en el popup/sección del
-- sitio (ahora se administra desde admin.html). Si para cuando ejecutes
-- esto la fecha ya pasó, no aparecerá en el sitio (el popup se oculta solo
-- cuando no hay eventos futuros) — simplemente crea el siguiente desde el
-- panel admin.
insert into public.eventos (titulo, descripcion, fecha, hora_inicio, hora_fin, lugar, modalidad, entrada_libre, url_accion, texto_accion, destacado, publicado)
select
  'Iniciación al francés — clase abierta',
  'Un primer encuentro con la lengua francesa, abierto al público en general, en el Centro Cultural de mi Corazón (Av. Cristóbal Colón, Barrio del Cerrillo, San Cristóbal de Las Casas). Un espacio para compartir —alrededor de una copa de vino y palomitas— la pasión por este idioma.',
  '2026-09-19', '16:00', '18:00',
  'Centro Cultural de mi Corazón, San Cristóbal de Las Casas',
  'presencial', true,
  'https://wa.me/584122465331?text=Hola%20Miguel%2C%20quiero%20saber%20m%C3%A1s%20sobre%20la%20clase%20abierta%20de%20iniciaci%C3%B3n%20al%20franc%C3%A9s%20del%20s%C3%A1bado%2019.',
  'Escribir por WhatsApp',
  true, true
where not exists (select 1 from public.eventos where titulo = 'Iniciación al francés — clase abierta' and fecha = '2026-09-19');


-- ---------------------------------------------------------------------------
-- 6. FERIADOS — para que "generar sesiones" no agende clases esos días.
-- ---------------------------------------------------------------------------

create table if not exists public.feriados (
  id uuid primary key default gen_random_uuid(),
  fecha date not null,
  nombre text not null,
  pais text not null default 'MX',
  created_at timestamptz not null default now(),
  unique (fecha, pais)
);
alter table public.feriados enable row level security;

create index if not exists idx_feriados_fecha on public.feriados(fecha);

drop policy if exists "feriados: cualquiera lee" on public.feriados;
create policy "feriados: cualquiera lee"
  on public.feriados for select
  using (true);

drop policy if exists "feriados: solo admin escribe" on public.feriados;
create policy "feriados: solo admin escribe"
  on public.feriados for all
  using (public.es_admin())
  with check (public.es_admin());

insert into public.feriados (fecha, nombre, pais) values
  ('2026-01-01', 'Año Nuevo', 'MX'),
  ('2026-02-02', 'Día de la Constitución (observado)', 'MX'),
  ('2026-03-16', 'Natalicio de Benito Juárez (observado)', 'MX'),
  ('2026-05-01', 'Día del Trabajo', 'MX'),
  ('2026-09-16', 'Día de la Independencia', 'MX'),
  ('2026-11-16', 'Día de la Revolución (observado)', 'MX'),
  ('2026-12-25', 'Navidad', 'MX')
on conflict (fecha, pais) do nothing;

-- Función helper: agenda sesiones de un grupo saltando feriados. Sustituye
-- a la generación manual de fechas que hoy hace generarSesiones() en
-- panel-docente.html — esa función pasará a llamar a este RPC (Fase 4).
create or replace function public.agendar_sesiones(p_grupo_id uuid, p_dias int[], p_hora time, p_semanas int default 6)
returns int language plpgsql security definer set search_path = public as $$
declare
  v_inicio date;
  v_curso_id uuid;
  v_dia int;
  v_semana int;
  v_fecha date;
  v_creadas int := 0;
begin
  if not public.es_docente_del_grupo(p_grupo_id) and not public.es_admin() then
    raise exception 'No tienes permiso sobre este grupo';
  end if;

  select fecha_inicio, curso_id into v_inicio, v_curso_id from public.grupos where id = p_grupo_id;
  if v_inicio is null then return 0; end if;

  for v_semana in 0..(p_semanas - 1) loop
    foreach v_dia in array p_dias loop
      v_fecha := v_inicio + (v_semana * 7) + ((v_dia - extract(dow from v_inicio)::int + 7) % 7);
      if not exists (select 1 from public.feriados f where f.fecha = v_fecha) then
        insert into public.sesiones (curso_id, grupo_id, fecha, tema)
        values (v_curso_id, p_grupo_id, v_fecha, null)
        on conflict do nothing;
        if found then v_creadas := v_creadas + 1; end if;
      end if;
    end loop;
  end loop;
  return v_creadas;
end;
$$;
grant execute on function public.agendar_sesiones(uuid, int[], time, int) to authenticated;


-- ---------------------------------------------------------------------------
-- 7. VALIDACIÓN DE NIVEL — el docente certifica que el estudiante completó
--    las competencias del nivel (complementa evaluaciones/notas, que ya
--    existían).
-- ---------------------------------------------------------------------------

create table if not exists public.validaciones_nivel (
  id uuid primary key default gen_random_uuid(),
  inscripcion_id uuid not null unique references public.inscripciones(id) on delete cascade,
  validado boolean not null default false,
  comentario_docente text,
  validado_por uuid references public.profiles(id),
  validado_en timestamptz,
  updated_at timestamptz not null default now()
);
alter table public.validaciones_nivel enable row level security;

drop trigger if exists tr_validaciones_touch on public.validaciones_nivel;
create trigger tr_validaciones_touch before update on public.validaciones_nivel
for each row execute function public.fn_touch_updated_at();

create or replace function public.es_docente_de_la_inscripcion(p_inscripcion_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.inscripciones i
    join public.grupos g on g.id = i.grupo_id
    where i.id = p_inscripcion_id and g.docente_id = auth.uid()
  );
$$;
grant execute on function public.es_docente_de_la_inscripcion(uuid) to anon, authenticated;

drop policy if exists "validaciones: docente y admin administran" on public.validaciones_nivel;
create policy "validaciones: docente y admin administran"
  on public.validaciones_nivel for all
  using (public.es_admin() or public.es_docente_de_la_inscripcion(inscripcion_id))
  with check (public.es_admin() or public.es_docente_de_la_inscripcion(inscripcion_id));

drop policy if exists "validaciones: estudiante lee la suya" on public.validaciones_nivel;
create policy "validaciones: estudiante lee la suya"
  on public.validaciones_nivel for select
  using (public.es_dueno_del_pago(inscripcion_id));


-- ---------------------------------------------------------------------------
-- 8. CONSTANCIAS — catálogo de tipos + solicitudes del estudiante.
-- ---------------------------------------------------------------------------

create table if not exists public.tipos_constancia (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  descripcion text,
  costo numeric(10,2) not null default 0,
  moneda text not null default 'MXN',
  activo boolean not null default true,
  created_at timestamptz not null default now()
);
alter table public.tipos_constancia enable row level security;

drop policy if exists "tipos_constancia: cualquiera autenticado lee activos" on public.tipos_constancia;
create policy "tipos_constancia: cualquiera autenticado lee activos"
  on public.tipos_constancia for select
  using (activo = true or public.es_admin());

drop policy if exists "tipos_constancia: solo admin escribe" on public.tipos_constancia;
create policy "tipos_constancia: solo admin escribe"
  on public.tipos_constancia for all
  using (public.es_admin())
  with check (public.es_admin());

create table if not exists public.solicitudes_constancia (
  id uuid primary key default gen_random_uuid(),
  inscripcion_id uuid not null references public.inscripciones(id) on delete cascade,
  tipo_id uuid not null references public.tipos_constancia(id),
  estado text not null default 'solicitada' check (estado in ('solicitada', 'en_proceso', 'pagada', 'emitida', 'cancelada')),
  notas text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.solicitudes_constancia enable row level security;

create index if not exists idx_solicitudes_inscripcion on public.solicitudes_constancia(inscripcion_id);

drop trigger if exists tr_solicitudes_touch on public.solicitudes_constancia;
create trigger tr_solicitudes_touch before update on public.solicitudes_constancia
for each row execute function public.fn_touch_updated_at();

drop policy if exists "solicitudes: admin y docente administran" on public.solicitudes_constancia;
create policy "solicitudes: admin y docente administran"
  on public.solicitudes_constancia for all
  using (public.es_admin() or public.es_docente_de_la_inscripcion(inscripcion_id))
  with check (public.es_admin() or public.es_docente_de_la_inscripcion(inscripcion_id));

drop policy if exists "solicitudes: estudiante crea y lee las suyas" on public.solicitudes_constancia;
create policy "solicitudes: estudiante crea y lee las suyas"
  on public.solicitudes_constancia for select
  using (public.es_dueno_del_pago(inscripcion_id));

drop policy if exists "solicitudes: estudiante crea la suya" on public.solicitudes_constancia;
create policy "solicitudes: estudiante crea la suya"
  on public.solicitudes_constancia for insert
  with check (public.es_dueno_del_pago(inscripcion_id));


-- ---------------------------------------------------------------------------
-- 9. RPC pública: consultar mis pagos (para panel-estudiante.html)
-- ---------------------------------------------------------------------------

create or replace function public.mis_pagos()
returns table(
  id uuid, monto numeric, moneda text, concepto text, estado text,
  checkout_url text, pagado_en timestamptz, created_at timestamptz
) language sql stable security definer set search_path = public as $$
  select p.id, p.monto, p.moneda, p.concepto, p.estado, p.checkout_url, p.pagado_en, p.created_at
  from public.pagos p
  join public.inscripciones i on i.id = p.inscripcion_id
  where i.estudiante_id = auth.uid()
  order by p.created_at desc;
$$;
grant execute on function public.mis_pagos() to authenticated;


-- ############################################################################
-- # AJUSTES DEL ALTA DE USUARIOS
-- # (origen: supabase/schema_v3.sql)
-- ############################################################################

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


-- ############################################################################
-- # CATÁLOGO DE MÉTODOS FLE Y SUS UNIDADES
-- # (origen: supabase/schema_v4.sql)
-- ############################################################################

-- ============================================================================
-- Plataforma docente / estudiantil — Miguel Tillero
-- ESQUEMA V4 — catálogo de métodos/manuales FLE y su progresión por unidades,
-- para elegir el método de un grupo y ver un plan sugerido repartido en las
-- semanas reales del curso (no un número fijo de semanas).
--
-- Totalmente editable desde admin.html (pestaña "Métodos"): agregar/quitar
-- métodos, marcar su nivel MCER y definir/reordenar sus unidades. Nada de
-- esto queda fijo en el código, a diferencia de como vivía en af-chiapas-web.
--
-- Semilla incluida: el catálogo de ~95 manuales FLE que ya usas (mismos
-- títulos publicados que trabajas en la Alianza Française, no contenido de
-- esa institución) y las unidades reales confirmadas de 7 de ellos (Défi 1,
-- Défi 2, Entre nous 1-4, Édito B1, Édito B2). El resto del catálogo queda
-- sin unidades hasta que tú las cargues desde el admin — igual que allá, no
-- se inventa progresión sin confirmar.
--
-- CÓMO USAR: ejecuta este archivo DESPUÉS de schema.sql, schema_v2.sql y
-- schema_v3.sql. Es seguro volver a ejecutarlo las veces que haga falta.
-- ============================================================================

create table if not exists public.metodos (
  id uuid primary key default gen_random_uuid(),
  nombre text unique not null,
  niveles text, -- lista separada por comas, ej. "A1,A2"; vacío = nivel sin confirmar
  idioma text not null default 'frances',
  activo boolean not null default true,
  notas text,
  created_at timestamptz not null default now()
);
alter table public.metodos enable row level security;

drop policy if exists "metodos: docente y admin leen" on public.metodos;
create policy "metodos: docente y admin leen"
  on public.metodos for select
  using (public.es_docente());

drop policy if exists "metodos: solo admin escribe" on public.metodos;
create policy "metodos: solo admin escribe"
  on public.metodos for all
  using (public.es_admin())
  with check (public.es_admin());

create table if not exists public.metodo_unidades (
  id uuid primary key default gen_random_uuid(),
  metodo_id uuid not null references public.metodos(id) on delete cascade,
  orden integer not null check (orden > 0),
  titulo text not null,
  unique (metodo_id, orden)
);
alter table public.metodo_unidades enable row level security;
create index if not exists idx_metodo_unidades_metodo on public.metodo_unidades(metodo_id);

drop policy if exists "metodo_unidades: docente y admin leen" on public.metodo_unidades;
create policy "metodo_unidades: docente y admin leen"
  on public.metodo_unidades for select
  using (public.es_docente());

drop policy if exists "metodo_unidades: solo admin escribe" on public.metodo_unidades;
create policy "metodo_unidades: solo admin escribe"
  on public.metodo_unidades for all
  using (public.es_admin())
  with check (public.es_admin());

-- El método elegido vive en el GRUPO (la instancia concreta del curso), no
-- en el catálogo de cursos: dos grupos del mismo curso podrían usar libros
-- distintos si algún día tienes más de un docente.
alter table public.grupos add column if not exists metodo_id uuid references public.metodos(id) on delete set null;


-- ---------------------------------------------------------------------------
-- Semilla: catálogo de métodos (mismos títulos publicados que ya trabajas)
-- ---------------------------------------------------------------------------

insert into public.metodos (nombre, niveles) values
  ('À la une 1', null), ('À la une 2', null), ('À la une 3', null), ('À la une 4', null),
  ('À plus 1', null), ('À plus 2', null), ('À plus 3', null), ('À plus 4', null), ('À plus 5', null),
  ('Cap sur... - pas à pas 1', null), ('Cap sur... - pas à pas 2', null), ('Cap sur... - pas à pas 3', null),
  ('Cap sur... - pas à pas 4', null), ('Cap sur... - pas à pas 5', null),
  ('Cap sur... 1', null), ('Cap sur... 2', null), ('Cap sur... 3', null),
  ('Capsules de phonétique [A1-A2]', 'A1,A2'),
  ('Carrousel 1', null), ('Carrousel 2', null), ('Carrousel 3', null),
  ('Club @dos 1', null), ('Club @dos 2', null), ('Club @dos 3', null), ('Club @dos 4', null),
  ('Défi 1', 'A1'), ('Défi 1 (anglophone)', 'A1'), ('Défi 2', 'A2'), ('Défi 3', 'B1'),
  ('Défi 4', null), ('Défi 5', null),
  ('Défi actuel 1', null), ('Défi actuel 2', null), ('Défi actuel 3', null), ('Défi actuel 4', null),
  ('En route vers le DELF A1', 'A1'), ('En route vers le DELF A2', 'A2'), ('En route vers le DELF B1', 'B1'),
  ('Entre nous 1', 'A1'), ('Entre nous 2', 'A2'), ('Entre nous 3', 'B1'), ('Entre nous 4', 'B2'),
  ('Édito B1', 'B1'), ('Édito B2', 'B2'),
  ('La grammaire du français A1', 'A1'), ('La grammaire du français A2', 'A2'), ('La grammaire du français B1', 'B1'),
  ('La grammaire du français sans problème', null),
  ('Les clés du Delf A2 Édition actualisée', 'A2'), ('Les clés du Delf B1 Édition actualisée', 'B1'),
  ('Les clés du Delf B1 Nouvelle édition', 'B1'), ('Les clés du Delf B2 Nouvelle édition', 'B2'),
  ('Les clés du nouveau Delf A1', 'A1'), ('Les clés du nouveau Delf A2', 'A2'),
  ('Les Globe-trotteurs 1', null), ('Les Globe-trotteurs 2', null), ('Les Globe-trotteurs 3', null),
  ('Les Globe-trotteurs 4', null), ('Les Globe-trotteurs 5', null),
  ('Les mots de la rue', null),
  ('Lexville [A1-B1]', 'A1,A2,B1'),
  ('Littérature visuelle [A2-B2]', 'A2,B1,B2'),
  ('Nouveau rond-point - pas à pas 1', null), ('Nouveau rond-point - pas à pas 2', null),
  ('Nouveau rond-point - pas à pas 3', null), ('Nouveau rond-point - pas à pas 4', null),
  ('Nouveau rond-point 1', null), ('Nouveau rond-point 2', null), ('Nouveau rond-point 3', null),
  ('Planète ados', null),
  ('Posters pour la classe', null), ('Posters à imprimer et à afficher dans la classe', null),
  ('Pourquoi pas ! 1', null), ('Pourquoi pas ! 2', null), ('Pourquoi pas ! 3', null), ('Pourquoi pas ! 4', null),
  ('Prêt-à-parler 1', null), ('Prêt-à-parler 2', null), ('Prêt-à-parler 3', null), ('Prêt-à-parler 4', null),
  ('Rencontres FLE', null),
  ('Rendez-vous en France 1', null), ('Rendez-vous en France 2', null),
  ('Tadam ! 1', null), ('Tadam ! 2', null),
  ('Version originale 1', null), ('Version originale 2', null), ('Version originale 3', null), ('Version originale 4', null),
  ('Vocabulaire en images [A1-A2]', 'A1,A2'),
  ('Activités interactives par thèmes pour travailler le lexique en contexte', null),
  ('Zoom - pas à pas 1', null), ('Zoom - pas à pas 2', null), ('Zoom - pas à pas 3', null),
  ('Zoom - pas à pas 4', null), ('Zoom - pas à pas 5', null),
  ('Zoom 1', null), ('Zoom 2', null), ('Zoom 3', null)
on conflict (nombre) do nothing;


-- ---------------------------------------------------------------------------
-- Semilla: unidades reales confirmadas (7 métodos; el resto del catálogo
-- queda sin unidades hasta que las cargues tú desde admin.html)
-- ---------------------------------------------------------------------------

insert into public.metodo_unidades (metodo_id, orden, titulo)
select m.id, u.orden, u.titulo
from public.metodos m
join (values
  (1,'Dossier de découverte'), (2,'Unité 1 — Portrait-robot'), (3,'Unité 2 — D''ici et d''ailleurs'),
  (4,'Unité 3 — Un air de famille'), (5,'Unité 4 — Entre quatre murs'), (6,'Unité 5 — Métro, boulot, dodo'),
  (7,'Unité 6 — Échappées belles'), (8,'Unité 7 — À deux pas d''ici'), (9,'Unité 8 — Une pincée de sel')
) as u(orden, titulo) on true
where m.nombre = 'Défi 1'
on conflict (metodo_id, orden) do nothing;

insert into public.metodo_unidades (metodo_id, orden, titulo)
select m.id, u.orden, u.titulo
from public.metodos m
join (values
  (1,'Unité 1 — La consommation'), (2,'Unité 2 — Objets du quotidien'), (3,'Unité 3'), (4,'Unité 4'),
  (5,'Unité 5'), (6,'Unité 6'), (7,'Unité 7'), (8,'Unité 8')
) as u(orden, titulo) on true
where m.nombre = 'Défi 2'
on conflict (metodo_id, orden) do nothing;

insert into public.metodo_unidades (metodo_id, orden, titulo)
select m.id, u.orden, u.titulo
from public.metodos m
join (values
  (1,'Unité 1'), (2,'Unité 2'), (3,'Unité 3'), (4,'Unité 4'), (5,'Unité 5'), (6,'Unité 6'), (7,'Unité 7'), (8,'Unité 8')
) as u(orden, titulo) on true
where m.nombre = 'Entre nous 1'
on conflict (metodo_id, orden) do nothing;

insert into public.metodo_unidades (metodo_id, orden, titulo)
select m.id, u.orden, u.titulo
from public.metodos m
join (values
  (1,'Unité 1'), (2,'Unité 2'), (3,'Unité 3'), (4,'Unité 4 (lexique des émotions)'), (5,'Unité 5'),
  (6,'Unité 6 (lexique de la santé, du sport)'), (7,'Unité 7'), (8,'Unité 8 (consommation, écologie, conflits de travail)')
) as u(orden, titulo) on true
where m.nombre = 'Entre nous 2'
on conflict (metodo_id, orden) do nothing;

insert into public.metodo_unidades (metodo_id, orden, titulo)
select m.id, u.orden, u.titulo
from public.metodos m
join (values
  (1,'Unité 1'), (2,'Unité 2'), (3,'Unité 3 — Oser vivre sa vie'), (4,'Unité 4 — Gérer son image'),
  (5,'Unité 5'), (6,'Unité 6'), (7,'Unité 7'), (8,'Unité 8')
) as u(orden, titulo) on true
where m.nombre = 'Entre nous 3'
on conflict (metodo_id, orden) do nothing;

insert into public.metodo_unidades (metodo_id, orden, titulo)
select m.id, u.orden, u.titulo
from public.metodos m
join (values
  (1,'Unité 1'), (2,'Unité 2 (santé, alimentation, âges de la vie, solidarité)'), (3,'Unité 3'), (4,'Unité 4'),
  (5,'Unité 5'), (6,'Unité 6 (indignation, écologie)'), (7,'Unité 7'), (8,'Unité 8 (art, exil, migrations)')
) as u(orden, titulo) on true
where m.nombre = 'Entre nous 4'
on conflict (metodo_id, orden) do nothing;

insert into public.metodo_unidades (metodo_id, orden, titulo)
select m.id, u.orden, u.titulo
from public.metodos m
join (values
  (1,'Vivre ensemble'), (2,'Le goût des nôtres'), (3,'Travailler autrement'),
  (4,'Date limite de consommation'), (5,'Le français dans le monde'), (6,'Médias en masse'),
  (7,'Et si on partait ?'), (8,'La planète en héritage'), (9,'Un tour en ville'),
  (10,'Soif d''apprendre'), (11,'Il va y avoir du sport !'), (12,'Cultiver les talents')
) as u(orden, titulo) on true
where m.nombre = 'Édito B1'
on conflict (metodo_id, orden) do nothing;

insert into public.metodo_unidades (metodo_id, orden, titulo)
select m.id, u.orden, u.titulo
from public.metodos m
join (values
  (1,'À mon avis'), (2,'Quelque chose à déclarer ?'), (3,'Ça presse !'), (4,'Partir'),
  (5,'Histoire de…'), (6,'À votre santé !'), (7,'Chassez le naturel…'), (8,'C''est de l''art !'),
  (9,'De vous à moi'), (10,'Au boulot !'), (11,'C''est pas net'), (12,'Mais où va-t-on ?')
) as u(orden, titulo) on true
where m.nombre = 'Édito B2'
on conflict (metodo_id, orden) do nothing;


-- ############################################################################
-- # UNIDADES REALES DE DÉFI 3
-- # (origen: supabase/schema_v5.sql)
-- ############################################################################

-- ============================================================================
-- Plataforma docente / estudiantil — Miguel Tillero
-- ESQUEMA V5 — unidades reales de Défi 3, confirmadas contra la tabla de
-- contenidos del propio libro (Défi, Méthode de français, Livre de l'élève,
-- Biras/Chevrier/Nitto — CLE International), niveau 3.
--
-- CÓMO USAR: ejecuta este archivo DESPUÉS de schema_v4.sql. Es seguro volver
-- a ejecutarlo las veces que haga falta.
-- ============================================================================

insert into public.metodo_unidades (metodo_id, orden, titulo)
select m.id, u.orden, u.titulo
from public.metodos m
join (values
  (1,'À quoi ça sert ?'),
  (2,'Un comprimé matin, midi et soir'),
  (3,'Un vrai cordon bleu'),
  (4,'En pleine forme'),
  (5,'Mention très bien'),
  (6,'Gagner sa vie'),
  (7,'Un chef-d''œuvre !'),
  (8,'Ça vaut le détour !')
) as u(orden, titulo) on true
where m.nombre = 'Défi 3'
on conflict (metodo_id, orden) do nothing;


-- ############################################################################
-- # CORRECCIÓN Y PROGRESIÓN COMPLETA DE DÉFI 2 A 5
-- # (origen: supabase/schema_v6.sql)
-- ############################################################################

-- ============================================================================
-- Plataforma docente / estudiantil — Miguel Tillero
-- ESQUEMA V6 — corrige un error de schema_v5.sql y completa la progresión
-- real de Défi 2 a Défi 5, todo tomado directamente del índice del PDF que
-- Miguel compartió (Défi, Biras et al., CLE International).
--
-- CORRECCIÓN: schema_v5.sql cargó 8 unidades bajo el nombre "Défi 3", pero
-- esas 8 unidades ("À quoi ça sert ?"...) en realidad son de "Défi 2" —
-- error de lectura del PDF. Este archivo:
--   1) Borra esas 8 filas mal asignadas a Défi 3.
--   2) Borra las unidades genéricas ("Unité 3"…"Unité 8") que traía Défi 2
--      desde schema_v2.sql — eran un placeholder, no el índice real.
--   3) Inserta el índice real y completo de Défi 2, Défi 3, Défi 4 y Défi 5.
--
-- CÓMO USAR: ejecuta este archivo DESPUÉS de schema_v5.sql. Es seguro volver
-- a ejecutarlo las veces que haga falta.
-- ============================================================================

-- 1) Limpieza de lo mal cargado.
delete from public.metodo_unidades
where metodo_id = (select id from public.metodos where nombre = 'Défi 3');

delete from public.metodo_unidades
where metodo_id = (select id from public.metodos where nombre = 'Défi 2');

-- 2) Défi 2 — 8 unidades reales.
insert into public.metodo_unidades (metodo_id, orden, titulo)
select m.id, u.orden, u.titulo
from public.metodos m
join (values
  (1,'À quoi ça sert ?'),
  (2,'Un comprimé matin, midi et soir'),
  (3,'Un vrai cordon bleu'),
  (4,'En pleine forme'),
  (5,'Mention très bien'),
  (6,'Gagner sa vie'),
  (7,'Un chef-d''œuvre !'),
  (8,'Ça vaut le détour !')
) as u(orden, titulo) on true
where m.nombre = 'Défi 2'
on conflict (metodo_id, orden) do nothing;

-- 3) Défi 3 — 9 unidades reales (no 8: no comparte estructura con Défi 2).
insert into public.metodo_unidades (metodo_id, orden, titulo)
select m.id, u.orden, u.titulo
from public.metodos m
join (values
  (1,'Des racines et des ailes'),
  (2,'Allez, raconte !'),
  (3,'Langues vivantes'),
  (4,'Bêtes de scène'),
  (5,'Le monde 2.0'),
  (6,'À consommer avec modération'),
  (7,'Planète pas nette'),
  (8,'On lâche rien !'),
  (9,'Êtres différents')
) as u(orden, titulo) on true
where m.nombre = 'Défi 3'
on conflict (metodo_id, orden) do nothing;

-- 4) Défi 4 — 9 unidades reales.
insert into public.metodo_unidades (metodo_id, orden, titulo)
select m.id, u.orden, u.titulo
from public.metodos m
join (values
  (1,'Ville en vie'),
  (2,'De la fourche à la fourchette'),
  (3,'De la tête aux pieds'),
  (4,'D''amour ou d''amitié'),
  (5,'Le cœur à l''ouvrage'),
  (6,'L''art et la manière'),
  (7,'Sur le bout de la langue'),
  (8,'La règle du jeu'),
  (9,'Mort de rire')
) as u(orden, titulo) on true
where m.nombre = 'Défi 4'
on conflict (metodo_id, orden) do nothing;

-- 5) Défi 5 — 12 unidades reales (nivel C1, el más extenso de la serie).
insert into public.metodo_unidades (metodo_id, orden, titulo)
select m.id, u.orden, u.titulo
from public.metodos m
join (values
  (1,'L''harmonie'),
  (2,'La notation'),
  (3,'Limites et transgression'),
  (4,'Le plaisir'),
  (5,'Le pardon'),
  (6,'La violence'),
  (7,'La politesse'),
  (8,'Mystère...'),
  (9,'La peur'),
  (10,'L''argent'),
  (11,'Points de vue'),
  (12,'Identités et appartenances')
) as u(orden, titulo) on true
where m.nombre = 'Défi 5'
on conflict (metodo_id, orden) do nothing;


-- ############################################################################
-- # EL CICLO A1 DE OCTUBRE 2026
-- # (origen: supabase/ciclo-a1-oct2026.sql)
-- ############################################################################

-- ============================================================================
-- CICLO A1 · OCTUBRE 2026 — Français A1 con Défi 1 (CLE International)
--
-- Crea de una sola vez: el curso, el grupo con su costo, el horario
-- (martes y jueves de 19:00 a 20:00), las 12 sesiones con su tema y su
-- contenido, y las dos evaluaciones de cierre del ciclo anterior.
--
-- Punto de partida real del grupo: Défi 1, Unité 4 «Entre quatre murs»,
-- Dossier 2 («Comment aménager les petits espaces», pp. 70-71) — ya visto.
-- El ciclo retoma desde el Dossier 3 y llega hasta la Unité 5
-- «Métro, boulot, dodo».
--
-- CÓMO USAR
--   1. Ejecuta antes, y en orden, schema.sql y schema_v2.sql … schema_v6.sql.
--   2. Pega este archivo completo en el SQL Editor de Supabase y dale RUN.
--   3. Es seguro volver a ejecutarlo: no duplica nada.
--
-- Si quieres cambiar el precio, las fechas o el cupo, toca SOLO el bloque
-- "DATOS DEL CICLO" de abajo y vuelve a ejecutar.
-- ============================================================================

do $$
declare
  -- ------------------------------------------------------------------------
  -- DATOS DEL CICLO — lo único que necesitas tocar
  -- ------------------------------------------------------------------------
  v_docente_email  text    := 'migueltillero@gmail.com';
  v_curso_nombre   text    := 'Français A1 — Défi 1';
  v_grupo_codigo   text    := 'A1-OCT2026';
  v_costo          numeric := 1900;          -- pesos mexicanos, ciclo completo
  v_moneda         text    := 'MXN';
  v_cupo           integer := 10;
  v_inicio         date    := date '2026-09-29';
  v_fin            date    := date '2026-11-05';
  v_hora_inicio    time    := time '19:00';
  v_hora_fin       time    := time '20:00';
  -- ------------------------------------------------------------------------

  v_docente_id uuid;
  v_curso_id   uuid;
  v_grupo_id   uuid;
  r            record;
begin
  -- 1) Docente ---------------------------------------------------------------
  -- El correo vive en auth.users, no en profiles: se busca allí y se comprueba
  -- que ese perfil tenga rol de docente (o de admin, en esquemas recientes).
  select p.id into v_docente_id
  from public.profiles p
  join auth.users u on u.id = p.id
  where lower(u.email) = lower(v_docente_email)
    and p.role in ('docente', 'admin')
  limit 1;

  if v_docente_id is null then
    select p.id into v_docente_id
    from public.profiles p
    where p.role in ('docente', 'admin')
    order by p.created_at
    limit 1;
  end if;

  if v_docente_id is null then
    raise exception 'No encontré ningún perfil con rol docente. Entra una vez a la plataforma con tu cuenta antes de ejecutar este archivo.';
  end if;

  -- 2) Curso (catálogo) ------------------------------------------------------
  select c.id into v_curso_id
  from public.cursos c
  where c.nombre = v_curso_nombre and c.docente_id = v_docente_id
  limit 1;

  if v_curso_id is null then
    insert into public.cursos (docente_id, nombre, nivel, descripcion, fecha_inicio, fecha_fin, cupo_maximo, estado)
    values (
      v_docente_id, v_curso_nombre, 'A1',
      'Curso de francés nivel A1 con el método Défi 1 (CLE International). '
      || 'Clases en vivo de una hora, martes y jueves de 19:00 a 20:00. '
      || 'Este ciclo retoma la Unité 4 «Entre quatre murs» desde el Dossier 3 '
      || 'y avanza hasta la Unité 5 «Métro, boulot, dodo».',
      v_inicio, v_fin, v_cupo, 'abierto'
    )
    returning id into v_curso_id;
  else
    update public.cursos
    set nivel = 'A1', fecha_inicio = v_inicio, fecha_fin = v_fin,
        cupo_maximo = v_cupo, estado = 'abierto'
    where id = v_curso_id;
  end if;

  -- 3) Grupo (la instancia que se vende y a la que se inscriben) -------------
  select g.id into v_grupo_id from public.grupos g where g.codigo = v_grupo_codigo limit 1;

  if v_grupo_id is null then
    insert into public.grupos (
      codigo, curso_id, docente_id, formato, modalidad, cupo_maximo,
      fecha_inicio, fecha_fin, horario, costo, moneda, estado, notas
    ) values (
      v_grupo_codigo, v_curso_id, v_docente_id, 'grupal', 'virtual', v_cupo,
      v_inicio, v_fin,
      jsonb_build_object(
        'dias', jsonb_build_array('martes', 'jueves'),
        'hora_inicio', to_char(v_hora_inicio, 'HH24:MI'),
        'hora_fin',    to_char(v_hora_fin,    'HH24:MI'),
        'zona',        'America/Mexico_City'
      ),
      v_costo, v_moneda, 'abierto',
      'Ciclo de 6 semanas. Las sesiones del 29/09 y del 01/10 son la evaluación '
      || 'de cierre del ciclo anterior (colectiva e individual).'
    )
    returning id into v_grupo_id;
  else
    update public.grupos
    set curso_id = v_curso_id, docente_id = v_docente_id, cupo_maximo = v_cupo,
        fecha_inicio = v_inicio, fecha_fin = v_fin, costo = v_costo,
        moneda = v_moneda, estado = 'abierto',
        horario = jsonb_build_object(
          'dias', jsonb_build_array('martes', 'jueves'),
          'hora_inicio', to_char(v_hora_inicio, 'HH24:MI'),
          'hora_fin',    to_char(v_hora_fin,    'HH24:MI'),
          'zona',        'America/Mexico_City'
        )
    where id = v_grupo_id;
  end if;

  -- 4) Horario semanal: martes (2) y jueves (4) ------------------------------
  delete from public.horarios where curso_id = v_curso_id;
  insert into public.horarios (curso_id, dia_semana, hora_inicio, hora_fin)
  values (v_curso_id, 2, v_hora_inicio, v_hora_fin),
         (v_curso_id, 4, v_hora_inicio, v_hora_fin);

  -- 5) Las 12 sesiones, con su tema y su contenido ---------------------------
  for r in
    select * from (values
      (date '2026-09-29',
       'Évaluation collective — cierre del ciclo anterior',
       E'Prueba en grupo de todo lo visto hasta la Unité 4 / Dossier 2.\n'
       '• Compréhension orale y compréhension écrite en equipos.\n'
       '• Tâche collective: describir un espacio y sus muebles.\n'
       '• Repaso vivo de: les pièces de la maison, les meubles, «servir à + infinitif», le verbe POUVOIR, les adjectifs de couleur.'),

      (date '2026-10-01',
       'Évaluation individuelle — cierre del ciclo anterior',
       E'Prueba individual, uno por uno.\n'
       '• Production orale: entretien dirigé (se presentar) y monologue suivi (describir dónde vives).\n'
       '• Production écrite breve: un mensaje describiendo tu habitación.\n'
       '• Cada estudiante recibe su nota y sus puntos a reforzar.'),

      (date '2026-10-06',
       'Retour sur l''évaluation + réactivation de l''Unité 4',
       E'Devolución de las dos pruebas y reactivación antes de seguir.\n'
       '• Corrección colectiva de los errores más frecuentes.\n'
       '• Reactivación: les meubles, POUVOIR au présent, «servir à + infinitif».\n'
       '• Les adjectifs de couleur: femenino, plural y los invariables (orange, marron).\n'
       'Material externo: juego de vocabulario en Wordwall sobre les meubles.'),

      (date '2026-10-08',
       'Unité 4 / Dossier 3 — Décrire son logement',
       E'Dónde están las cosas en la casa.\n'
       '• Les prépositions de lieu: sur, sous, dans, devant, derrière, entre, à côté de, en face de.\n'
       '• «Il y a» / «Il n''y a pas de» para decir lo que hay y lo que falta.\n'
       '• Production orale: describir tu casa a partir de una foto.\n'
       'Material externo: TV5Monde «Apprendre le français» A1 — le logement.'),

      (date '2026-10-13',
       'Unité 4 — Donner des conseils : l''impératif',
       E'Dar instrucciones y consejos para organizar un espacio.\n'
       '• L''impératif présent: formas afirmativa y negativa (range, ne range pas).\n'
       '• «Il faut + infinitif» y «On peut + infinitif».\n'
       '• Production: dar tres consejos para aprovechar un espacio pequeño.\n'
       'Refuerzo del Dossier 2: se retoma POUVOIR en contraste con IL FAUT.'),

      (date '2026-10-15',
       'DÉFI de l''Unité 4 — Aménager un petit espace',
       E'La tâche colaborativa que cierra la unidad.\n'
       '• En parejas: diseñar y presentar un petit espace aménagé (plano o collage).\n'
       '• Presentación oral de 3 minutos usando todo lo de la unidad.\n'
       '• Coevaluación entre compañeros con una rúbrica sencilla.\n'
       'Se entrega al grupo la rúbrica antes de empezar.'),

      (date '2026-10-20',
       'Faites le point Unité 4 + ouverture Unité 5 : l''heure',
       E'Cierre de la Unité 4 y entrada a «Métro, boulot, dodo».\n'
       '• Bilan de grammaire, lexique et phonétique de la Unité 4.\n'
       '• Phonétique: les sons [ø] / [œ] (deux, heure).\n'
       '• Apertura Unité 5: dire l''heure — hora informal y hora oficial.\n'
       'Material externo: audio de RFI en français facile (horarios).'),

      (date '2026-10-22',
       'Unité 5 — Les verbes pronominaux : ma journée',
       E'Contar la rutina diaria.\n'
       '• Les verbes pronominaux au présent: se réveiller, se lever, se doucher, s''habiller, se coucher.\n'
       '• Orden del pronombre y la negación (je ne me lève pas tôt).\n'
       '• Production orale: «Raconte-moi ta journée».\n'
       'Se repasa la hora vista la sesión anterior.'),

      (date '2026-10-27',
       'Unité 5 — Moments de la journée et fréquence',
       E'Cuándo y cada cuánto.\n'
       '• Le matin, l''après-midi, le soir, la nuit; tôt / tard.\n'
       '• Les adverbes de fréquence: toujours, souvent, parfois, rarement, ne… jamais.\n'
       '• Production écrite: escribir tu rutina de un día de semana (60-80 palabras).\n'
       'Primera revisión acumulativa del ciclo.'),

      (date '2026-10-29',
       'Unité 5 — Les professions et le monde du travail',
       E'De qué trabaja cada quien.\n'
       '• Les noms de métiers: masculino y femenino (un serveur / une serveuse, un infirmier / une infirmière).\n'
       '• «Qu''est-ce que vous faites dans la vie ?» / «Je suis + profession» (sin artículo).\n'
       '• Le lieu de travail: au bureau, à l''hôpital, dans un restaurant.\n'
       'Production orale: entrevistar a un compañero sobre su trabajo.'),

      (date '2026-11-03',
       'Unité 5 — Les transports et les trajets',
       E'Cómo te mueves por la ciudad.\n'
       '• Les moyens de transport: en bus, en métro, en voiture, à pied, à vélo.\n'
       '• «Prendre» au présent; «aller à / en»; «mettre + durée» (je mets 20 minutes).\n'
       '• Production orale: «Comment tu vas au travail ?».\n'
       'Material externo: plano del metro para una actividad de itinerarios.'),

      (date '2026-11-05',
       'Révision générale + mini-DELF A1 + cierre del ciclo',
       E'Última sesión del ciclo.\n'
       '• Revisión general de las Unités 4 y 5.\n'
       '• Mini-DELF A1: compréhension orale y production orale en formato de examen.\n'
       '• Devolución individual del avance de cada estudiante.\n'
       '• Presentación del próximo ciclo y de lo que viene en Défi 1.')
    ) as t(fecha, tema, contenido)
  loop
    if exists (select 1 from public.sesiones s where s.curso_id = v_curso_id and s.fecha = r.fecha) then
      update public.sesiones
      set tema = r.tema, contenido = r.contenido, grupo_id = v_grupo_id
      where curso_id = v_curso_id and fecha = r.fecha;
    else
      insert into public.sesiones (curso_id, grupo_id, fecha, tema, contenido)
      values (v_curso_id, v_grupo_id, r.fecha, r.tema, r.contenido);
    end if;
  end loop;

  -- 6) Las dos evaluaciones de cierre del ciclo anterior ---------------------
  if not exists (select 1 from public.evaluaciones e
                 where e.curso_id = v_curso_id and e.nombre = 'Évaluation collective (ciclo anterior)') then
    insert into public.evaluaciones (curso_id, nombre, fecha, ponderacion)
    values (v_curso_id, 'Évaluation collective (ciclo anterior)', date '2026-09-29', 40);
  end if;

  if not exists (select 1 from public.evaluaciones e
                 where e.curso_id = v_curso_id and e.nombre = 'Évaluation individuelle (ciclo anterior)') then
    insert into public.evaluaciones (curso_id, nombre, fecha, ponderacion)
    values (v_curso_id, 'Évaluation individuelle (ciclo anterior)', date '2026-10-01', 60);
  end if;

  raise notice 'Ciclo creado. Curso: %  ·  Grupo: %', v_curso_id, v_grupo_id;
end $$;


-- ============================================================================
-- COMPROBACIÓN — el enlace que le vas a mandar a tus estudiantes sale aquí
-- ============================================================================
select
  g.codigo                                   as grupo,
  c.nombre                                   as curso,
  g.fecha_inicio, g.fecha_fin,
  g.costo || ' ' || g.moneda                 as precio,
  g.cupo_maximo - g.cupo_actual              as cupos_libres,
  (select count(*) from public.sesiones s where s.grupo_id = g.id) as sesiones,
  'https://migueltillero-ship-it.github.io/MiguelTillero/registro/inscripcion.html?grupo=' || g.id
                                             as enlace_de_inscripcion
from public.grupos g
join public.cursos c on c.id = g.curso_id
where g.codigo = 'A1-OCT2026';
