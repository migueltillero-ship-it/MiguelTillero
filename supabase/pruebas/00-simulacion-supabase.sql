-- Simulación mínima del entorno de Supabase para poder probar el esquema
-- y sus políticas RLS en un Postgres local.

drop database if exists plataforma_test;
create database plataforma_test;
\c plataforma_test

-- Roles que Supabase define
do $$
begin
  if not exists (select 1 from pg_roles where rolname = 'authenticated') then
    create role authenticated nologin;
  end if;
  if not exists (select 1 from pg_roles where rolname = 'anon') then
    create role anon nologin;
  end if;
end $$;

-- Esquema auth con la tabla users y la función uid() como en Supabase
create schema if not exists auth;

create table if not exists auth.users (
  id uuid primary key default gen_random_uuid(),
  email text unique,
  raw_user_meta_data jsonb default '{}'::jsonb
);

-- auth.uid() lee el claim del "JWT" simulado vía variable de sesión
create or replace function auth.uid()
returns uuid
language sql
stable
as $$
  select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid;
$$;

grant usage on schema auth to authenticated, anon;
grant select on auth.users to authenticated, anon;
grant usage on schema public to authenticated, anon;
alter default privileges in schema public grant all on tables to authenticated;
