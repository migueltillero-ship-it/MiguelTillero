-- ============================================================================
-- Bienvenida personalizada — Vendredi entre Amis
-- Permite reconocer a un estudiante por su número de WhatsApp y mostrarle un
-- saludo con su nombre en el Carnet de Voyage, sin que tenga que "iniciar
-- sesión": basta con escribir su número una vez, igual que con el carnet
-- (ver supabase/carnet-vendredi-entre-amis.sql, que debe ejecutarse primero).
--
-- Cómo usar:
-- 1. Ve a SQL Editor → New query en el MISMO proyecto Supabase que ya usa
--    este repositorio.
-- 2. Pega y ejecuta este archivo completo. Se puede volver a ejecutar las
--    veces que haga falta: la tabla usa "if not exists" y el insert de más
--    abajo es idempotente (actualiza el nombre si el número ya existía).
-- 3. Para añadir o corregir estudiantes más adelante, vuelve a pegar solo el
--    bloque "insert ... on conflict" con los números nuevos o corregidos.
--
-- MODELO DE SEGURIDAD: igual que vea_carnet — no hay select directo sobre la
-- tabla (nadie puede "descargar la lista completa" de estudiantes con la
-- llave pública). Solo se puede pedir el nombre de UN número exacto a la
-- vez, vía la función vea_estudiante_por_telefono.
-- ============================================================================

create table if not exists public.vea_estudiantes (
  telefono text primary key,
  nombre text not null check (length(nombre) > 0)
);
alter table public.vea_estudiantes enable row level security;

-- Sin política de select: por defecto RLS deniega. El acceso pasa solo por
-- la función de abajo.

create or replace function public.vea_estudiante_por_telefono(p_telefono text)
returns text
language sql
security definer
set search_path = public
as $$
  select nombre from public.vea_estudiantes where telefono = p_telefono limit 1;
$$;
grant execute on function public.vea_estudiante_por_telefono(text) to anon, authenticated;

-- ---------------------------------------------------------------------------
-- Estudiantes conocidos (números normalizados: solo dígitos, con "+" inicial
-- — así es como el sitio normaliza lo que la persona escribe en el carnet)
-- ---------------------------------------------------------------------------
insert into public.vea_estudiantes (telefono, nombre) values
  ('+593999216695', 'Ana Lucia'),
  ('+5215533118804', 'Brendiis'),
  ('+5215522497040', 'Siulmy'),
  ('+5215515333929', 'Ricardo Daniel'),
  ('+593982212934', 'Lucetty'),
  ('+5219671292122', 'Camila'),
  ('+12499893822', 'David'),
  ('+5219616583142', 'Gloria'),
  ('+17055284675', 'Jonathan'),
  ('+593963510596', 'Maria Corina'),
  ('+593994325547', 'Lucía'),
  ('+12369992268', 'Maria Gloria')
on conflict (telefono) do update set nombre = excluded.nombre;
