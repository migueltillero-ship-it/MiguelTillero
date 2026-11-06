-- ===========================================================================
-- PROPUESTAS PERSONALES
-- ===========================================================================
-- Un correo con una lista de condiciones no es una bienvenida, y tampoco deja
-- rastro: no se sabe si la persona lo abrió, qué le pareció ni si quiere decir
-- algo antes de aceptar. Esta tabla guarda una propuesta por estudiante, con
-- su horario, su cotización y lo que incluye, y la página propuesta.html la
-- presenta con la marca del sitio.
--
-- Las cifras viven aquí, detrás de la sesión de cada persona. Ni el correo ni
-- la web pública las llevan: es la regla del sitio de no anunciar precios
-- antes del primer contacto.
--
-- El estudiante nunca escribe en estas tablas directamente. Responde a través
-- de responder_propuesta(), que comprueba que la propuesta sea suya y que
-- hace todo junto o nada.
--
-- CÓMO USAR: Supabase → SQL Editor → New query → pegar → Run.
--   https://supabase.com/dashboard/project/yfrdlzveleevkjqekdoq/sql/new
-- Es seguro repetirlo.
-- ===========================================================================

create table if not exists public.propuestas (
  id               uuid primary key default gen_random_uuid(),
  estudiante_id    uuid not null references public.profiles(id) on delete cascade,
  creado_en        timestamptz not null default now(),
  mensaje          text,                       -- la bienvenida, con su nombre
  horario          jsonb not null default '{}'::jsonb,
                   -- {"confirmados":[{"dia","hora"}], "alternativas":[{"dia","hora","nota"}], "inicio":"…"}
  duracion_minutos int,
  tarifa           numeric not null,
  moneda           text not null default 'MXN',
  horas_paquete    numeric not null,
  horas_regalo     numeric not null default 0,
  incluye          jsonb not null default '[]'::jsonb,   -- lista de frases
  nota_incluye     text,                       -- lo que sí tiene costo aparte
  compromiso       text,
  estado           text not null default 'enviada'
                   check (estado in ('enviada','aceptada','descartada')),
  visto_en         timestamptz,                -- la primera vez que la abrió
  aceptada_en      timestamptz
);

create table if not exists public.propuesta_respuestas (
  id           uuid primary key default gen_random_uuid(),
  propuesta_id uuid not null references public.propuestas(id) on delete cascade,
  tipo         text not null check (tipo in ('acepta','comentario')),
  texto        text,
  creado_en    timestamptz not null default now()
);

create index if not exists idx_propuestas_estudiante
  on public.propuestas(estudiante_id, creado_en desc);
create index if not exists idx_respuestas_propuesta
  on public.propuesta_respuestas(propuesta_id, creado_en);

alter table public.propuestas enable row level security;
alter table public.propuesta_respuestas enable row level security;

-- Cada quien ve la suya; el docente ve todas y es el único que las escribe.
drop policy if exists "propuestas: cada quien ve la suya" on public.propuestas;
create policy "propuestas: cada quien ve la suya"
  on public.propuestas for select to authenticated
  using (estudiante_id = auth.uid() or public.es_docente());

drop policy if exists "propuestas: el docente las crea" on public.propuestas;
create policy "propuestas: el docente las crea"
  on public.propuestas for insert to authenticated
  with check (public.es_docente());

drop policy if exists "propuestas: el docente las edita" on public.propuestas;
create policy "propuestas: el docente las edita"
  on public.propuestas for update to authenticated
  using (public.es_docente()) with check (public.es_docente());

drop policy if exists "respuestas: cada quien ve las suyas" on public.propuesta_respuestas;
create policy "respuestas: cada quien ve las suyas"
  on public.propuesta_respuestas for select to authenticated
  using (public.es_docente() or exists (
    select 1 from public.propuestas p
     where p.id = propuesta_id and p.estudiante_id = auth.uid()));


-- ---------------------------------------------------------------------------
-- Lo que el estudiante puede hacer: abrirla, aceptarla o comentarla
-- ---------------------------------------------------------------------------

create or replace function public.marcar_propuesta_vista(p_propuesta uuid)
returns void
language plpgsql security definer set search_path = public as $$
begin
  update propuestas
     set visto_en = now()
   where id = p_propuesta and estudiante_id = auth.uid() and visto_en is null;
end;
$$;
grant execute on function public.marcar_propuesta_vista(uuid) to authenticated;

create or replace function public.responder_propuesta(
  p_propuesta uuid,
  p_tipo      text,
  p_texto     text default null
) returns void
language plpgsql security definer set search_path = public as $$
declare
  v_est   uuid;
  v_email text;
begin
  if auth.uid() is null then
    raise exception 'Hace falta iniciar sesión.';
  end if;

  select estudiante_id into v_est from propuestas where id = p_propuesta;
  if v_est is null or v_est <> auth.uid() then
    raise exception 'Esta propuesta no es suya.';
  end if;
  if p_tipo not in ('acepta','comentario') then
    raise exception 'Respuesta no válida.';
  end if;
  if p_tipo = 'comentario' and coalesce(trim(p_texto), '') = '' then
    raise exception 'El comentario está vacío.';
  end if;

  insert into propuesta_respuestas (propuesta_id, tipo, texto)
  values (p_propuesta, p_tipo, nullif(trim(p_texto), ''));

  -- Aceptar mueve también la etapa de su ficha: así el panel de prospectos
  -- refleja lo que pasó sin que nadie tenga que acordarse de moverla.
  if p_tipo = 'acepta' then
    update propuestas
       set estado = 'aceptada', aceptada_en = coalesce(aceptada_en, now())
     where id = p_propuesta;
    select email into v_email from auth.users where id = v_est;
    update prospectos set estado = 'validado'
     where lower(email) = lower(v_email) and estado = 'nuevo';
  end if;
end;
$$;
grant execute on function public.responder_propuesta(uuid, text, text) to authenticated;

comment on table public.propuestas is
  'Propuesta personal para un estudiante: horario, cotización y lo que '
  'incluye. Las cifras solo se ven con la sesión de esa persona.';
