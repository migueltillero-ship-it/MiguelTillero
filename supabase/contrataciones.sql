-- ===========================================================================
-- CONTRATACIÓN DE HORAS, CALENDARIO Y CONTRATO DE APRENDIZAJE
-- ===========================================================================
-- Hasta ahora el horario vivía pegado al curso: una franja fija por día de la
-- semana, igual para todo el mundo y para siempre. Eso sirve para un grupo,
-- no para quien contrata horas sueltas y cambia de disponibilidad según la
-- semana.
--
-- Aquí entran cuatro piezas:
--
--   disponibilidad   cuándo puede dar clase el docente. Es la verdad contra
--                    la que se valida todo lo demás: si no cabe aquí, no se
--                    puede agendar. Evita que a las 19:00 le agenden a dos.
--   contrataciones   el paquete: cuántas horas se pagan, cuántas se reciben
--                    (pueden no coincidir: a veces se regalan), a qué precio
--                    y entre qué fechas.
--   clases           cada sesión concreta con su fecha y su hora.
--   contratos        el documento, congelado tal y como se aceptó, con el
--                    registro de quién lo aceptó y cuándo.
--
-- Una contratación puede ser de dos tipos. En «bolsa» hay un saldo de horas
-- que se va gastando a medida que se agenda, sin patrón. En «patron» hay unos
-- días y horas que se repiten; las clases se generan de una vez y se pueden
-- mover una a una. Se elige al crearla, según el alumno.
--
-- CÓMO USAR: Supabase → SQL Editor → New query → pegar → Run.
-- Es seguro repetirlo.
-- ===========================================================================

-- Para impedir solapes con una restricción de la propia base, no con código
-- que se pueda olvidar de comprobarlo.
create extension if not exists btree_gist;

-- Postgres trae rangos de fecha y de marca de tiempo, pero no de hora suelta,
-- y aquí se comparan horas dentro de un mismo día. Se define el tipo una vez;
-- si ya existe, se deja como está.
do $$ begin
  create type public.timerange as range (subtype = time);
exception when duplicate_object then null;
end $$;


-- ---------------------------------------------------------------------------
-- 1. Cuándo puede dar clase el docente
-- ---------------------------------------------------------------------------
-- Franjas que se repiten cada semana. «vigente_hasta» en blanco significa
-- «hasta nuevo aviso»: así se puede cambiar de horario en marzo sin borrar lo
-- que valía en febrero, que es lo que sostiene las clases ya agendadas.

create table if not exists public.disponibilidad (
  id             uuid primary key default gen_random_uuid(),
  docente_id     uuid not null references public.profiles(id) on delete cascade,
  dia_semana     smallint not null check (dia_semana between 0 and 6),  -- 0 = domingo
  hora_inicio    time not null,
  hora_fin       time not null,
  vigente_desde  date not null default current_date,
  vigente_hasta  date,
  activo         boolean not null default true,
  nota           text,
  creado_en      timestamptz not null default now(),
  check (hora_fin > hora_inicio),
  check (vigente_hasta is null or vigente_hasta >= vigente_desde)
);
alter table public.disponibilidad enable row level security;
create index if not exists idx_disponibilidad_docente on public.disponibilidad(docente_id, dia_semana);

comment on table public.disponibilidad is
  'Franjas semanales en las que el docente acepta clases. El estudiante solo '
  'puede elegir huecos que caigan dentro de una de estas franjas.';


-- Días sueltos en los que no hay clase aunque toque: un festivo, un viaje.
create table if not exists public.disponibilidad_bloqueos (
  id          uuid primary key default gen_random_uuid(),
  docente_id  uuid not null references public.profiles(id) on delete cascade,
  fecha       date not null,
  hora_inicio time,              -- en blanco = el día entero
  hora_fin    time,
  motivo      text,
  creado_en   timestamptz not null default now(),
  check (hora_fin is null or hora_inicio is null or hora_fin > hora_inicio)
);
alter table public.disponibilidad_bloqueos enable row level security;
create index if not exists idx_bloqueos_fecha on public.disponibilidad_bloqueos(docente_id, fecha);


-- ---------------------------------------------------------------------------
-- 2. El paquete contratado
-- ---------------------------------------------------------------------------
-- «horas_pagadas» y «horas_totales» se guardan por separado a propósito: hay
-- contrataciones en las que se regalan horas, y el contrato tiene que poder
-- decir las dos cosas sin que una se deduzca mal de la otra.

create table if not exists public.contrataciones (
  id              uuid primary key default gen_random_uuid(),
  estudiante_id   uuid not null references public.profiles(id) on delete cascade,
  docente_id      uuid not null references public.profiles(id) on delete restrict,
  tipo            text not null default 'patron' check (tipo in ('bolsa', 'patron')),
  horas_pagadas   numeric(5,1) not null check (horas_pagadas > 0),
  horas_totales   numeric(5,1) not null check (horas_totales > 0),
  precio_hora     numeric(10,2) not null check (precio_hora >= 0),
  moneda          text not null default 'MXN',
  -- Lo que se cobra. No se calcula al vuelo: si mañana cambia la tarifa, lo
  -- firmado tiene que seguir diciendo lo que se firmó.
  importe_total   numeric(10,2) not null check (importe_total >= 0),
  modalidad       text not null default 'en_linea' check (modalidad in ('en_linea', 'presencial', 'mixta')),
  fecha_inicio    date not null,
  fecha_fin       date,
  estado          text not null default 'propuesta'
                  check (estado in ('propuesta', 'aceptada', 'en_curso', 'finalizada', 'cancelada')),
  notas           text,
  creado_en       timestamptz not null default now(),
  check (horas_totales >= horas_pagadas),
  check (fecha_fin is null or fecha_fin >= fecha_inicio)
);
alter table public.contrataciones enable row level security;
create index if not exists idx_contrataciones_estudiante on public.contrataciones(estudiante_id, estado);

comment on column public.contrataciones.horas_totales is
  'Horas que recibe el estudiante. Puede ser mayor que horas_pagadas cuando '
  'se regalan horas; el contrato lo dice explícitamente.';


-- ---------------------------------------------------------------------------
-- 3. Cada clase
-- ---------------------------------------------------------------------------

create table if not exists public.clases (
  id               uuid primary key default gen_random_uuid(),
  contratacion_id  uuid not null references public.contrataciones(id) on delete cascade,
  -- Repetido desde la contratación para poder impedir solapes con una sola
  -- restricción, sin subconsultas.
  docente_id       uuid not null references public.profiles(id) on delete restrict,
  fecha            date not null,
  hora_inicio      time not null,
  hora_fin         time not null,
  estado           text not null default 'confirmada'
                   check (estado in ('propuesta', 'confirmada', 'impartida', 'cancelada', 'reprogramada')),
  enlace           text,
  nota             text,
  creado_en        timestamptz not null default now(),
  check (hora_fin > hora_inicio)
);
alter table public.clases enable row level security;
create index if not exists idx_clases_contratacion on public.clases(contratacion_id, fecha);
create index if not exists idx_clases_agenda on public.clases(docente_id, fecha);

-- Dos clases del mismo docente no pueden pisarse. Las canceladas no cuentan:
-- el hueco que libera una clase cancelada vuelve a estar disponible.
alter table public.clases drop constraint if exists clases_sin_solape;
alter table public.clases add constraint clases_sin_solape
  exclude using gist (
    docente_id with =,
    fecha with =,
    timerange(hora_inicio, hora_fin, '[)') with &&
  ) where (estado <> 'cancelada');

-- Horas que dura cada clase, para poder sumarlas.
create or replace function public.horas_de_clase(p_inicio time, p_fin time)
returns numeric language sql immutable as $$
  select round(extract(epoch from (p_fin - p_inicio)) / 3600.0, 2)::numeric;
$$;


-- ---------------------------------------------------------------------------
-- 4. Saldo
-- ---------------------------------------------------------------------------
-- Lo contratado menos lo que ya está en el calendario. Las canceladas no
-- descuentan: devuelven la hora al saldo.

create or replace view public.v_contrataciones_saldo as
  select c.*,
         coalesce(cl.horas_agendadas, 0)              as horas_agendadas,
         coalesce(cl.horas_impartidas, 0)             as horas_impartidas,
         c.horas_totales - coalesce(cl.horas_agendadas, 0) as horas_libres
    from public.contrataciones c
    left join (
      select contratacion_id,
             sum(public.horas_de_clase(hora_inicio, hora_fin))
               filter (where estado <> 'cancelada')   as horas_agendadas,
             sum(public.horas_de_clase(hora_inicio, hora_fin))
               filter (where estado = 'impartida')    as horas_impartidas
        from public.clases group by contratacion_id
    ) cl on cl.contratacion_id = c.id;


-- ---------------------------------------------------------------------------
-- 5. Agendar una clase
-- ---------------------------------------------------------------------------
-- Se agenda por esta función y no escribiendo en la tabla directamente, para
-- que las cuatro comprobaciones ocurran siempre: que la contratación sea de
-- quien la pide, que quede saldo, que el hueco esté dentro de la
-- disponibilidad del docente y que ese día no esté bloqueado. El solape lo
-- impide la restricción de la tabla.

create or replace function public.agendar_clase(
  p_contratacion uuid, p_fecha date, p_inicio time, p_fin time
) returns uuid
language plpgsql security definer set search_path = public as $$
declare
  v contrataciones%rowtype;
  v_horas numeric;
  v_libres numeric;
  v_id uuid;
begin
  select * into v from contrataciones where id = p_contratacion;
  if not found then raise exception 'La contratación no existe.'; end if;

  if not (es_admin()
          or v.estudiante_id = auth.uid()
          or v.docente_id = auth.uid()) then
    raise exception 'Esta contratación no es tuya.';
  end if;

  if v.estado in ('cancelada', 'finalizada') then
    raise exception 'Esta contratación ya está %.', v.estado;
  end if;

  if p_fin <= p_inicio then raise exception 'La hora de fin va antes que la de inicio.'; end if;
  if p_fecha < current_date then raise exception 'No se puede agendar en una fecha pasada.'; end if;

  v_horas := horas_de_clase(p_inicio, p_fin);
  select horas_libres into v_libres from v_contrataciones_saldo where id = p_contratacion;
  if v_horas > v_libres then
    raise exception 'Solo quedan % horas libres y esta clase pide %.', v_libres, v_horas;
  end if;

  if not exists (
    select 1 from disponibilidad d
     where d.docente_id = v.docente_id
       and d.activo
       and d.dia_semana = extract(dow from p_fecha)
       and d.hora_inicio <= p_inicio and d.hora_fin >= p_fin
       and d.vigente_desde <= p_fecha
       and (d.vigente_hasta is null or d.vigente_hasta >= p_fecha)
  ) then
    raise exception 'Ese horario queda fuera de la disponibilidad del docente.';
  end if;

  if exists (
    select 1 from disponibilidad_bloqueos b
     where b.docente_id = v.docente_id and b.fecha = p_fecha
       and (b.hora_inicio is null
            or timerange(b.hora_inicio, b.hora_fin, '[)') && timerange(p_inicio, p_fin, '[)'))
  ) then
    raise exception 'Ese día no hay clase.';
  end if;

  insert into clases (contratacion_id, docente_id, fecha, hora_inicio, hora_fin)
  values (p_contratacion, v.docente_id, p_fecha, p_inicio, p_fin)
  returning id into v_id;
  return v_id;
end;
$$;
grant execute on function public.agendar_clase(uuid, date, time, time) to authenticated;


-- ---------------------------------------------------------------------------
-- 6. El contrato
-- ---------------------------------------------------------------------------
-- El cuerpo se guarda ya redactado, no como plantilla: dentro de un año el
-- texto de la plantilla habrá cambiado y lo que vale es lo que la persona leyó
-- el día que aceptó. Junto a la aceptación se guarda la fecha, el navegador y
-- la IP, que es lo que convierte un clic en una prueba.

create table if not exists public.contratos (
  id               uuid primary key default gen_random_uuid(),
  contratacion_id  uuid not null unique references public.contrataciones(id) on delete cascade,
  numero           text unique not null,
  cuerpo           text not null,
  aceptado_en      timestamptz,
  aceptado_por     uuid references public.profiles(id),
  aceptado_nombre  text,
  aceptado_ip      text,
  aceptado_agente  text,
  -- El reglamento se acepta aparte del contrato, con su propia marca de
  -- tiempo y su versión. Son dos documentos distintos y conviene poder
  -- demostrar cada uno por separado; además el reglamento cambia con el
  -- tiempo y hay que saber cuál leyó esta persona, no cuál está hoy en línea.
  reglamento_version    text,
  reglamento_aceptado_en timestamptz,
  creado_en        timestamptz not null default now()
);
alter table public.contratos enable row level security;

comment on table public.contratos is
  'El contrato tal y como se aceptó. El cuerpo no se regenera nunca: vale lo '
  'que la persona leyó, no lo que diría hoy la plantilla.';

-- Numeración legible y correlativa por año: CA-2026-0001.
create sequence if not exists public.contratos_num_seq;
create or replace function public.nuevo_numero_contrato()
returns text language sql as $$
  select 'CA-' || to_char(now(), 'YYYY') || '-' ||
         lpad(nextval('public.contratos_num_seq')::text, 4, '0');
$$;

-- Aceptar es un acto del estudiante y solo se puede hacer una vez. Hay que
-- aceptar las dos cosas: el contrato y haber leído el reglamento. Sin las
-- dos no se guarda ninguna, para que no quede media aceptación.
create or replace function public.aceptar_contrato(
  p_contrato uuid, p_nombre text,
  p_acepta_reglamento boolean default false,
  p_reglamento_version text default null,
  p_ip text default null, p_agente text default null
) returns void
language plpgsql security definer set search_path = public as $$
declare v_est uuid;
begin
  if not p_acepta_reglamento then
    raise exception 'Hay que confirmar también la lectura del reglamento.';
  end if;
  select c.estudiante_id into v_est
    from contratos k join contrataciones c on c.id = k.contratacion_id
   where k.id = p_contrato;
  if not found then raise exception 'El contrato no existe.'; end if;
  if v_est <> auth.uid() and not es_admin() then
    raise exception 'Solo quien contrata puede aceptar su contrato.';
  end if;
  if exists (select 1 from contratos where id = p_contrato and aceptado_en is not null) then
    raise exception 'Este contrato ya fue aceptado.';
  end if;

  update contratos
     set aceptado_en = now(), aceptado_por = auth.uid(),
         aceptado_nombre = p_nombre, aceptado_ip = p_ip, aceptado_agente = p_agente,
         reglamento_aceptado_en = now(), reglamento_version = p_reglamento_version
   where id = p_contrato;

  update contrataciones set estado = 'aceptada'
   where id = (select contratacion_id from contratos where id = p_contrato)
     and estado = 'propuesta';
end;
$$;
grant execute on function public.aceptar_contrato(uuid, text, boolean, text, text, text) to authenticated;
-- La firma de la función cambió al sumar el reglamento: se retira la anterior.
drop function if exists public.aceptar_contrato(uuid, text, text, text);


-- ---------------------------------------------------------------------------
-- 7. El pago, que va al final y no condiciona nada
-- ---------------------------------------------------------------------------
-- Inscribirse, tener acceso y aceptar el contrato no dependen de haber
-- pagado: la contratación queda «aceptada» sin tocar esta tabla. Aquí solo se
-- deja constancia de lo que la persona envía, sea un archivo subido o un
-- aviso de que lo mandó por WhatsApp. Quien decide si está pagado es el
-- docente, al marcarlo verificado.

create table if not exists public.comprobantes_pago (
  id               uuid primary key default gen_random_uuid(),
  contratacion_id  uuid not null references public.contrataciones(id) on delete cascade,
  via              text not null default 'archivo' check (via in ('archivo', 'whatsapp', 'efectivo', 'otro')),
  -- Ruta dentro del almacenamiento de Supabase. En blanco cuando se avisa de
  -- que el comprobante va por WhatsApp.
  archivo          text,
  monto            numeric(10,2),
  moneda           text not null default 'MXN',
  referencia       text,
  estado           text not null default 'recibido'
                   check (estado in ('recibido', 'verificado', 'rechazado')),
  nota             text,
  enviado_en       timestamptz not null default now(),
  verificado_en    timestamptz,
  verificado_por   uuid references public.profiles(id)
);
alter table public.comprobantes_pago enable row level security;
create index if not exists idx_comprobantes_contratacion on public.comprobantes_pago(contratacion_id, enviado_en desc);

comment on table public.comprobantes_pago is
  'Lo que el estudiante envía como prueba de pago. No bloquea nada: el acceso '
  'y el contrato funcionan antes y sin esto.';

-- Cuánto se ha reconocido como pagado de cada contratación.
create or replace view public.v_contrataciones_pago as
  select c.id as contratacion_id, c.importe_total, c.moneda,
         coalesce(sum(p.monto) filter (where p.estado = 'verificado'), 0) as pagado,
         c.importe_total - coalesce(sum(p.monto) filter (where p.estado = 'verificado'), 0) as pendiente,
         count(p.id) filter (where p.estado = 'recibido') as por_revisar
    from public.contrataciones c
    left join public.comprobantes_pago p on p.contratacion_id = c.id
   group by c.id, c.importe_total, c.moneda;


-- ---------------------------------------------------------------------------
-- 8. Quién ve qué
-- ---------------------------------------------------------------------------
-- El docente y el admin administran todo. El estudiante ve lo suyo y nada
-- más: ni las contrataciones de otros, ni la agenda completa del docente.

create or replace function public.es_docente()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles p
                  where p.id = auth.uid() and p.role in ('docente','admin'));
$$;
grant execute on function public.es_docente() to authenticated;

do $$
declare t text;
begin
  foreach t in array array['disponibilidad','disponibilidad_bloqueos',
                           'contrataciones','clases','contratos',
                           'comprobantes_pago'] loop
    execute format('drop policy if exists "%s: el docente administra" on public.%I', t, t);
    execute format(
      'create policy "%s: el docente administra" on public.%I for all '
      'using (public.es_docente()) with check (public.es_docente())', t, t);
  end loop;
end $$;

-- La disponibilidad la puede leer cualquiera que haya entrado: es lo que
-- necesita ver el estudiante para elegir hueco.
drop policy if exists "disponibilidad: visible al elegir horario" on public.disponibilidad;
create policy "disponibilidad: visible al elegir horario"
  on public.disponibilidad for select using (auth.uid() is not null);

drop policy if exists "bloqueos: visibles al elegir horario" on public.disponibilidad_bloqueos;
create policy "bloqueos: visibles al elegir horario"
  on public.disponibilidad_bloqueos for select using (auth.uid() is not null);

drop policy if exists "contrataciones: el estudiante ve la suya" on public.contrataciones;
create policy "contrataciones: el estudiante ve la suya"
  on public.contrataciones for select using (estudiante_id = auth.uid());

drop policy if exists "clases: el estudiante ve las suyas" on public.clases;
create policy "clases: el estudiante ve las suyas"
  on public.clases for select using (exists (
    select 1 from public.contrataciones c
     where c.id = clases.contratacion_id and c.estudiante_id = auth.uid()));

drop policy if exists "contratos: el estudiante ve el suyo" on public.contratos;
create policy "contratos: el estudiante ve el suyo"
  on public.contratos for select using (exists (
    select 1 from public.contrataciones c
     where c.id = contratos.contratacion_id and c.estudiante_id = auth.uid()));

-- El estudiante puede enviar su comprobante y ver los suyos, pero no decidir
-- si están verificados: eso lo marca el docente.
drop policy if exists "comprobantes: el estudiante ve los suyos" on public.comprobantes_pago;
create policy "comprobantes: el estudiante ve los suyos"
  on public.comprobantes_pago for select using (exists (
    select 1 from public.contrataciones c
     where c.id = comprobantes_pago.contratacion_id and c.estudiante_id = auth.uid()));

drop policy if exists "comprobantes: el estudiante envia el suyo" on public.comprobantes_pago;
create policy "comprobantes: el estudiante envia el suyo"
  on public.comprobantes_pago for insert with check (
    estado = 'recibido' and exists (
      select 1 from public.contrataciones c
       where c.id = comprobantes_pago.contratacion_id and c.estudiante_id = auth.uid()));
