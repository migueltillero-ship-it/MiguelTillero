-- ════════════════════════════════════════════════════════════════════════════
-- EVALUACIONES EN LÍNEA · Sentinelle (Vive el francés · Prof. Miguel Tillero)
-- Ejecutar UNA vez en Supabase Studio → SQL Editor → Run.
-- Es idempotente: se puede volver a ejecutar sin romper nada.
--
-- Principios de seguridad:
--   · Los alumnos NO tienen acceso a ninguna tabla. Solo pueden llamar 3
--     funciones (iniciar, guardar, enviar) con su token de intento.
--   · La clave de respuestas vive solo en la base: nunca viaja al navegador
--     del alumno, así que no se puede leer con "inspeccionar elemento".
--   · El reloj es del servidor: cambiar la hora de la computadora no sirve.
--   · Un solo intento por correo y por examen (se puede reanudar si se cae
--     la conexión, pero el tiempo sigue corriendo y queda registrado).
--   · Se registran IP y navegador en cada guardado (detecta colusión).
-- ════════════════════════════════════════════════════════════════════════════

create extension if not exists pgcrypto;

-- 1. Catálogo de exámenes ─────────────────────────────────────────────────────
create table if not exists public.examenes (
  id            text primary key,
  titulo        text not null,
  codigo_acceso text not null,
  duracion_min  int  not null default 60,
  abierto       boolean not null default false,
  cierra_en     timestamptz,
  creado_en     timestamptz not null default now()
);

-- 2. Clave de respuestas (solo admin) ─────────────────────────────────────────
create table if not exists public.examenes_claves (
  examen_id text primary key references public.examenes(id) on delete cascade,
  clave     jsonb not null
);

-- 3. Intentos ────────────────────────────────────────────────────────────────
create table if not exists public.examenes_intentos (
  id              uuid primary key default gen_random_uuid(),
  examen_id       text not null references public.examenes(id) on delete cascade,
  nombre          text not null,
  email           text not null,
  token           uuid not null default gen_random_uuid(),
  semilla         int  not null default (floor(random()*2147483647))::int,
  estado          text not null default 'en_curso'
                  check (estado in ('en_curso','enviado','cerrado_docente')),
  iniciado_en     timestamptz not null default now(),
  limite_en       timestamptz not null,
  enviado_en      timestamptz,
  ultimo_guardado timestamptz,
  enviado_tarde   boolean not null default false,
  motivo_envio    text,
  respuestas      jsonb not null default '{}'::jsonb,
  eventos         jsonb not null default '[]'::jsonb,
  escritura       jsonb not null default '{}'::jsonb,
  dispositivos    jsonb not null default '[]'::jsonb,
  ips             text[] not null default '{}',
  reanudaciones   int  not null default 0,
  puntaje_auto    jsonb,
  calif_pe        jsonb,
  nota_final      numeric(5,2),
  comentario      text,
  revisado_en     timestamptz
);
create unique index if not exists ux_intento_examen_email
  on public.examenes_intentos (examen_id, lower(trim(email)));

alter table public.examenes          enable row level security;
alter table public.examenes_claves   enable row level security;
alter table public.examenes_intentos enable row level security;

-- Solo tú (admin/docente de la plataforma) lees y calificas.
drop policy if exists "staff examenes" on public.examenes;
create policy "staff examenes" on public.examenes for all to authenticated
  using (public.es_admin()) with check (public.es_admin());

drop policy if exists "staff claves" on public.examenes_claves;
create policy "staff claves" on public.examenes_claves for select to authenticated
  using (public.es_admin() or public.es_docente());

drop policy if exists "staff lee intentos" on public.examenes_intentos;
create policy "staff lee intentos" on public.examenes_intentos for select to authenticated
  using (public.es_admin() or public.es_docente());

drop policy if exists "staff califica intentos" on public.examenes_intentos;
create policy "staff califica intentos" on public.examenes_intentos for update to authenticated
  using (public.es_admin() or public.es_docente())
  with check (public.es_admin() or public.es_docente());

-- 4. Utilidades internas ─────────────────────────────────────────────────────
create or replace function public._examen_ip()
returns text language sql stable as $$
  select coalesce(
    nullif(split_part(coalesce(current_setting('request.headers', true)::json->>'x-forwarded-for',''), ',', 1), ''),
    current_setting('request.headers', true)::json->>'cf-connecting-ip',
    '?');
$$;

-- Calificación automática (CO y CE). Formato de la clave por ítem:
--   {"r":"valor","p":1}                    → coincidencia exacta
--   {"t":"any","r":["a","b"],"p":1}        → cualquiera de la lista
--   {"t":"set","r":["a","b","c"],"p":4}    → selección múltiple, crédito parcial
-- La sección es el prefijo de 2 letras del id del ítem (co, ce).
create or replace function public._examen_calificar(p_examen text, p_resp jsonb)
returns jsonb language plpgsql stable security definer set search_path = public as $$
declare
  k record; v text; pts numeric; tipo text;
  sel text[]; good text[]; c int; w int;
  tot jsonb := '{}'::jsonb; det jsonb := '{}'::jsonb; sec text;
begin
  for k in select key, value from jsonb_each(
      (select clave from public.examenes_claves where examen_id = p_examen)) loop
    v    := lower(regexp_replace(coalesce(p_resp->>k.key, ''), '\s', '', 'g'));
    tipo := coalesce(k.value->>'t', 'eq');
    pts  := 0;
    if tipo = 'eq' then
      if v <> '' and v = lower(k.value->>'r') then pts := (k.value->>'p')::numeric; end if;
    elsif tipo = 'any' then
      if v <> '' and v in (select lower(x) from jsonb_array_elements_text(k.value->'r') x) then
        pts := (k.value->>'p')::numeric;
      end if;
    elsif tipo = 'set' then
      sel  := case when v = '' then '{}'::text[] else string_to_array(v, ',') end;
      good := array(select lower(x) from jsonb_array_elements_text(k.value->'r') x);
      c := cardinality(array(select unnest(sel) intersect select unnest(good)));
      w := cardinality(array(select unnest(sel) except    select unnest(good)));
      pts := round(greatest(0, c - w)::numeric * (k.value->>'p')::numeric / cardinality(good), 2);
    end if;
    sec := left(k.key, 2);
    det := det || jsonb_build_object(k.key, pts);
    tot := tot || jsonb_build_object(sec, coalesce((tot->>sec)::numeric, 0) + pts);
  end loop;
  return jsonb_build_object('secciones', tot, 'detalle', det);
end $$;
revoke all on function public._examen_calificar(text, jsonb) from public, anon, authenticated;

-- 5. API pública del alumno ──────────────────────────────────────────────────

-- Iniciar (o reanudar) un intento.
create or replace function public.examen_iniciar(
  p_examen text, p_codigo text, p_nombre text, p_email text, p_dispositivo jsonb)
returns jsonb language plpgsql security definer set search_path = public as $$
declare ex public.examenes; it public.examenes_intentos; em text;
begin
  em := lower(trim(p_email));
  if em !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' then raise exception 'EMAIL_INVALIDO'; end if;
  if length(trim(coalesce(p_nombre,''))) < 3 then raise exception 'NOMBRE_INVALIDO'; end if;

  select * into ex from public.examenes where id = p_examen;
  if not found then raise exception 'EXAMEN_NO_EXISTE'; end if;
  if upper(trim(p_codigo)) <> upper(ex.codigo_acceso) then raise exception 'CODIGO_INCORRECTO'; end if;

  select * into it from public.examenes_intentos
   where examen_id = p_examen and lower(trim(email)) = em;

  if found then
    if it.estado <> 'en_curso' then raise exception 'YA_ENVIADO'; end if;
    update public.examenes_intentos set
      reanudaciones = reanudaciones + 1,
      dispositivos  = dispositivos || jsonb_build_array(
                        coalesce(p_dispositivo,'{}'::jsonb) || jsonb_build_object('t', now(), 'ip', public._examen_ip(), 'reanudacion', true)),
      ips = case when public._examen_ip() = any(ips) then ips else ips || public._examen_ip() end,
      eventos = eventos || jsonb_build_array(jsonb_build_object('k','reanudacion','ts', now()))
    where id = it.id returning * into it;
  else
    if not ex.abierto or (ex.cierra_en is not null and now() > ex.cierra_en) then
      raise exception 'EXAMEN_CERRADO';
    end if;
    insert into public.examenes_intentos (examen_id, nombre, email, limite_en, dispositivos, ips)
    values (p_examen, trim(p_nombre), em, now() + make_interval(mins => ex.duracion_min),
            jsonb_build_array(coalesce(p_dispositivo,'{}'::jsonb) || jsonb_build_object('t', now(), 'ip', public._examen_ip())),
            array[public._examen_ip()])
    returning * into it;
  end if;

  return jsonb_build_object(
    'id', it.id, 'token', it.token, 'semilla', it.semilla,
    'limite_en', it.limite_en, 'ahora', now(),
    'respuestas', it.respuestas, 'escritura', it.escritura,
    'reanudado', it.reanudaciones > 0, 'nombre', it.nombre);
end $$;

-- Autoguardado (cada ~15 s y en cada cambio de sección).
create or replace function public.examen_guardar(
  p_id uuid, p_token uuid, p_respuestas jsonb, p_eventos jsonb, p_escritura jsonb)
returns jsonb language plpgsql security definer set search_path = public as $$
declare it public.examenes_intentos; ip text := public._examen_ip();
begin
  select * into it from public.examenes_intentos where id = p_id and token = p_token;
  if not found then raise exception 'INTENTO_INVALIDO'; end if;
  if it.estado <> 'en_curso' then raise exception 'YA_ENVIADO'; end if;
  -- Tras el límite (+3 min de gracia) ya no se aceptan cambios de respuestas.
  if now() > it.limite_en + interval '3 minutes' then
    update public.examenes_intentos set
      eventos = eventos || coalesce(p_eventos,'[]'::jsonb)
    where id = p_id;
    return jsonb_build_object('ok', false, 'motivo', 'TIEMPO_AGOTADO', 'ahora', now(), 'limite_en', it.limite_en);
  end if;
  update public.examenes_intentos set
    respuestas = coalesce(p_respuestas, respuestas),
    eventos    = eventos || coalesce(p_eventos,'[]'::jsonb),
    escritura  = coalesce(p_escritura, escritura),
    ultimo_guardado = now(),
    ips = case when ip = any(ips) then ips else ips || ip end
  where id = p_id;
  return jsonb_build_object('ok', true, 'ahora', now(), 'limite_en', it.limite_en);
end $$;

-- Envío final (manual o automático al agotarse el tiempo).
create or replace function public.examen_enviar(
  p_id uuid, p_token uuid, p_respuestas jsonb, p_eventos jsonb, p_escritura jsonb, p_motivo text)
returns jsonb language plpgsql security definer set search_path = public as $$
declare it public.examenes_intentos; tarde boolean; resp jsonb;
begin
  select * into it from public.examenes_intentos where id = p_id and token = p_token for update;
  if not found then raise exception 'INTENTO_INVALIDO'; end if;
  if it.estado <> 'en_curso' then
    return jsonb_build_object('ok', true, 'ya', true, 'recibo', upper(left(replace(it.id::text,'-',''), 8)));
  end if;
  tarde := now() > it.limite_en + interval '3 minutes';
  -- Si llega tarde, se califica lo último guardado a tiempo, no lo nuevo.
  resp := case when tarde then it.respuestas else coalesce(p_respuestas, it.respuestas) end;
  update public.examenes_intentos set
    respuestas = resp,
    eventos    = eventos || coalesce(p_eventos,'[]'::jsonb),
    escritura  = case when tarde then escritura else coalesce(p_escritura, escritura) end,
    estado     = 'enviado',
    enviado_en = now(),
    enviado_tarde = tarde,
    motivo_envio  = p_motivo,
    puntaje_auto  = public._examen_calificar(it.examen_id, resp),
    ips = case when public._examen_ip() = any(ips) then ips else ips || public._examen_ip() end
  where id = p_id;
  return jsonb_build_object('ok', true, 'recibo', upper(left(replace(it.id::text,'-',''), 8)), 'tarde', tarde);
end $$;

-- Cierre por el docente (alumno que abandonó sin enviar): califica lo guardado.
create or replace function public.examen_cerrar_docente(p_id uuid)
returns jsonb language plpgsql security definer set search_path = public as $$
declare it public.examenes_intentos;
begin
  if not (public.es_admin() or public.es_docente()) then raise exception 'SIN_PERMISO'; end if;
  select * into it from public.examenes_intentos where id = p_id for update;
  if not found then raise exception 'INTENTO_INVALIDO'; end if;
  update public.examenes_intentos set
    estado = 'cerrado_docente', enviado_en = coalesce(enviado_en, now()),
    motivo_envio = coalesce(motivo_envio, 'cerrado_por_docente'),
    puntaje_auto = public._examen_calificar(it.examen_id, it.respuestas)
  where id = p_id;
  return jsonb_build_object('ok', true);
end $$;

-- Recalcular puntajes (si corriges la clave después).
create or replace function public.examen_recalificar(p_examen text)
returns int language plpgsql security definer set search_path = public as $$
declare n int;
begin
  if not public.es_admin() then raise exception 'SIN_PERMISO'; end if;
  update public.examenes_intentos
     set puntaje_auto = public._examen_calificar(examen_id, respuestas)
   where examen_id = p_examen and estado <> 'en_curso';
  get diagnostics n = row_count;
  return n;
end $$;

revoke all on function public.examen_iniciar(text,text,text,text,jsonb)            from public;
revoke all on function public.examen_guardar(uuid,uuid,jsonb,jsonb,jsonb)          from public;
revoke all on function public.examen_enviar(uuid,uuid,jsonb,jsonb,jsonb,text)      from public;
revoke all on function public.examen_cerrar_docente(uuid)                          from public;
revoke all on function public.examen_recalificar(text)                             from public;
grant execute on function public.examen_iniciar(text,text,text,text,jsonb)         to anon, authenticated;
grant execute on function public.examen_guardar(uuid,uuid,jsonb,jsonb,jsonb)       to anon, authenticated;
grant execute on function public.examen_enviar(uuid,uuid,jsonb,jsonb,jsonb,text)   to anon, authenticated;
grant execute on function public.examen_cerrar_docente(uuid)                       to authenticated;
grant execute on function public.examen_recalificar(text)                          to authenticated;

-- 6. Évaluation collective A1.4 · « Chez les Moreau » (versión corta, 40 min) ──
-- Evalúa: Dossier de découverte, Unités 1, 2, 3 y Unité 4 hasta el Dossier 2.
-- CO 15 pts · CE 15 pts · PE 20 pts (la PE la calificas tú en el panel) = 50 pts
-- Código de acceso para los alumnos: MOREAU4  (cámbialo aquí si quieres)
insert into public.examenes (id, titulo, codigo_acceso, duracion_min, abierto)
values ('a14-chez-les-moreau', 'A1.4 · Évaluation collective · Chez les Moreau', 'MOREAU4', 40, true)
on conflict (id) do update set titulo = excluded.titulo, duracion_min = excluded.duracion_min;

insert into public.examenes_claves (examen_id, clave) values ('a14-chez-les-moreau', '{
  "co1a":{"r":"a15","p":1}, "co1b":{"r":"moreau","p":1}, "co1c":{"r":"blonde","p":1},
  "co1d":{"r":"frere12","p":1}, "co1e":{"r":"foot","p":1},
  "co2a":{"t":"set","r":["lit","bureau","armoire","lampe"],"p":3},
  "co2b":{"r":"bleue","p":1}, "co2c":{"r":"lire","p":1},
  "co3paul":{"r":"A","p":1}, "co3claire":{"r":"C","p":1}, "co3henri":{"r":"E","p":1}, "co3hugo":{"r":"F","p":1}, "co3chat":{"r":"caramel","p":1},

  "ce1valeria":{"r":"B","p":2}, "ce1santiago":{"r":"A","p":2}, "ce1mateo":{"r":"C","p":2},
  "ce2v1":{"r":"F","p":1}, "ce2p1":{"t":"any","r":["s3"],"p":1.25},
  "ce2v2":{"r":"V","p":1}, "ce2p2":{"t":"any","r":["s7"],"p":1.25},
  "ce2v3":{"r":"F","p":1}, "ce2p3":{"t":"any","r":["s9","s10"],"p":1.25},
  "ce2v4":{"r":"V","p":1}, "ce2p4":{"t":"any","r":["s12"],"p":1.25}
}'::jsonb)
on conflict (examen_id) do update set clave = excluded.clave;
