-- ============================================================================
-- Carnet de Voyage — Vendredi entre Amis
-- Sincroniza el "carnet de voyage" del club de conversación entre los
-- dispositivos de cada estudiante, usando su número de WhatsApp como
-- identificador (sin contraseña, sin cuenta — pensado para un público que
-- no debe tener que "iniciar sesión" para escribir una palabra nueva).
--
-- Cómo usar:
-- 1. Ve a SQL Editor → New query en el MISMO proyecto de Supabase que ya
--    usa este repositorio (supabase/schema.sql).
-- 2. Pega y ejecuta este archivo completo. Se puede volver a ejecutar las
--    veces que haga falta: la tabla usa "if not exists" y las políticas y
--    funciones se eliminan y se recrean cada vez.
--
-- MODELO DE SEGURIDAD (deliberadamente distinto al resto del esquema):
-- No hay auth.users de por medio — el "identificador" es el número de
-- WhatsApp que la persona escribe una vez en el club. Por eso:
--   - INSERT está abierto a cualquiera (con teléfono no vacío): así
--     cualquier estudiante puede empezar a escribir sin fricción.
--   - NO existe ninguna política de SELECT directo sobre la tabla: nadie
--     puede "descargar todos los carnets" con la llave pública, ni
--     siquiera filtrando por columna.
--   - Leer o borrar el carnet de un número solo es posible llamando a las
--     funciones vea_carnet_por_telefono / vea_carnet_borrar, que exigen
--     indicar el número EXACTO. Es decir: hace falta conocer el número de
--     alguien para ver su carnet, no basta con tener la app abierta.
-- Esto es proporcional a lo que se guarda (vocabulario, frases, ninguna
-- información sensible) — no sustituye una autenticación real si algún
-- día esta tabla llegara a guardar algo más delicado.
-- ============================================================================

create table if not exists public.vea_carnet (
  id uuid primary key default gen_random_uuid(),
  telefono text not null check (length(telefono) > 0),
  texto text not null check (length(texto) > 0),
  tipo text not null default 'Mot nouveau',
  created_at timestamptz not null default now()
);
alter table public.vea_carnet enable row level security;

create index if not exists vea_carnet_telefono_idx on public.vea_carnet (telefono);

-- ---------------------------------------------------------------------------
-- Políticas RLS
-- ---------------------------------------------------------------------------

drop policy if exists "vea_carnet: cualquiera con teléfono puede añadir una entrada" on public.vea_carnet;
create policy "vea_carnet: cualquiera con teléfono puede añadir una entrada"
  on public.vea_carnet for insert
  to anon, authenticated
  with check (telefono is not null and length(telefono) > 0);

-- Sin política de select/update/delete: por defecto RLS deniega todo lo que
-- no esté explícitamente permitido. El acceso de lectura/borrado pasa
-- únicamente por las funciones de abajo.

-- ---------------------------------------------------------------------------
-- Funciones (security definer): filtran por teléfono exacto
-- ---------------------------------------------------------------------------

create or replace function public.vea_carnet_por_telefono(p_telefono text)
returns setof public.vea_carnet
language sql
security definer
set search_path = public
as $$
  select * from public.vea_carnet
  where telefono = p_telefono
  order by created_at asc;
$$;
grant execute on function public.vea_carnet_por_telefono(text) to anon, authenticated;

create or replace function public.vea_carnet_borrar(p_id uuid, p_telefono text)
returns void
language sql
security definer
set search_path = public
as $$
  delete from public.vea_carnet
  where id = p_id and telefono = p_telefono;
$$;
grant execute on function public.vea_carnet_borrar(uuid, text) to anon, authenticated;
