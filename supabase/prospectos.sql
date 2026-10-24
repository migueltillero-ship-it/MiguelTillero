-- ===========================================================================
-- PROSPECTOS: LO QUE LLEGA POR LOS FORMULARIOS PÚBLICOS
-- ===========================================================================
-- Hasta ahora, cuando alguien llenaba el formulario de inscribete.html lo
-- único que ocurría era que se mandaba un correo con EmailJS. Si ese envío
-- fallaba —y falló: el 6 de septiembre de 2026 EmailJS avisó de que el
-- servicio «service_k9b1j7y» llevaba al menos tres intentos seguidos sin
-- poder enviar— la solicitud se perdía entera. No quedaba copia en ningún
-- sitio y la persona veía igualmente un «¡Listo!» en pantalla.
--
-- Esta tabla es la red de seguridad: la solicitud se guarda aquí ANTES de
-- intentar el correo. Si el correo sale, perfecto; si no sale, el prospecto
-- sigue estando aquí y se puede recuperar.
--
-- Nadie puede leerla desde fuera: quien visita el sitio solo puede insertar,
-- nunca consultar. Leer es cosa del docente y del admin.
--
-- CÓMO USAR: Supabase → SQL Editor → New query → pegar → Run.
-- Es seguro repetirlo.
-- ===========================================================================


-- ---------------------------------------------------------------------------
-- 1. La tabla
-- ---------------------------------------------------------------------------

create table if not exists public.prospectos (
  id         uuid primary key default gen_random_uuid(),
  -- De qué formulario viene: el grande de inscripción, la cita o la clase
  -- de prueba. Sirve para saber qué quiere la persona sin leerlo todo.
  origen     text not null default 'inscripcion'
             check (origen in ('inscripcion', 'cita', 'clase-prueba', 'contacto')),
  nombre     text not null,
  email      text not null,
  telefono   text,
  ciudad     text,
  -- El resto de respuestas tal y como vinieron. Se guarda en bruto porque
  -- los formularios cambian de campos cada tanto y no conviene tener que
  -- migrar la tabla cada vez que se añade una pregunta.
  respuestas jsonb not null default '{}'::jsonb,
  -- Para no perder de vista a quién ya se contactó.
  atendido   boolean not null default false,
  notas      text,
  creado_en  timestamptz not null default now()
);
alter table public.prospectos enable row level security;
create index if not exists idx_prospectos_creado  on public.prospectos(creado_en desc);
create index if not exists idx_prospectos_pendiente on public.prospectos(atendido, creado_en desc);

comment on table public.prospectos is
  'Solicitudes llegadas por los formularios públicos del sitio. Se guardan '
  'antes de intentar el correo, para que una caída del envío no haga perder '
  'al prospecto.';


-- ---------------------------------------------------------------------------
-- 2. Quién ve qué
-- ---------------------------------------------------------------------------

-- Quien visita el sitio no ha iniciado sesión: tiene que poder dejar su
-- solicitud, y nada más. Sin select, así que no puede leer los datos de
-- nadie —ni los suyos propios— una vez enviados.
drop policy if exists "prospectos: cualquiera deja su solicitud" on public.prospectos;
create policy "prospectos: cualquiera deja su solicitud"
  on public.prospectos for insert
  with check (true);

drop policy if exists "prospectos: el docente los administra" on public.prospectos;
create policy "prospectos: el docente los administra"
  on public.prospectos for all
  using (public.es_admin() or exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.role in ('docente','admin')))
  with check (public.es_admin() or exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.role in ('docente','admin')));


-- ---------------------------------------------------------------------------
-- 3. Para mirarlos de un vistazo
-- ---------------------------------------------------------------------------
-- Los que todavía no se han atendido, el más reciente arriba.

create or replace view public.v_prospectos_pendientes as
  select id, origen, nombre, email, telefono, ciudad, respuestas, creado_en
    from public.prospectos
   where not atendido
   order by creado_en desc;
