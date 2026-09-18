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
