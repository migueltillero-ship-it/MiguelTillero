-- ===========================================================================
-- GRABACIONES DE CLASE
-- ===========================================================================
-- Al terminar una clase, el docente deja aquí el enlace de la grabación y el
-- estudiante la encuentra en «Mis grabaciones» de su espacio, para repasar.
--
-- POR QUÉ UN ENLACE Y NO EL ARCHIVO
-- Una clase de dos horas pesa cientos de megas, y el almacenamiento gratuito
-- de Supabase rechaza archivos de más de 50 MB. Zoom (nube), Drive o YouTube
-- sin listar ya guardan el vídeo; aquí solo se guarda dónde está y quién puede
-- verlo. Si la grabación lleva código de acceso, se guarda aparte y solo lo ve
-- quien tiene la inscripción activa.
--
-- SEGURIDAD
--   · El estudiante solo ve las grabaciones de cursos en los que tiene la
--     inscripción ACTIVA. Pendiente, rechazada o finalizada no cuentan.
--   · Solo el docente (o el admin) crea, cambia o borra grabaciones.
--   · Un visitante sin cuenta no ve nada.
--   · El enlace y el código viven en la base, nunca en un archivo del
--     repositorio, que es público.
--
-- CÓMO USAR: pégalo entero. Es seguro repetirlo.
-- Dónde: https://supabase.com/dashboard/project/yfrdlzveleevkjqekdoq/sql/new
-- ===========================================================================

create table if not exists public.clases_grabadas (
  id          uuid primary key default gen_random_uuid(),
  curso_id    uuid not null references public.cursos(id) on delete cascade,
  sesion_id   uuid references public.sesiones(id) on delete set null,
  titulo      text not null check (char_length(btrim(titulo)) between 3 and 140),
  fecha       date not null default current_date,
  enlace      text not null check (enlace ~* '^https://'),
  codigo      text check (codigo is null or char_length(codigo) <= 80),
  notas       text check (notas is null or char_length(notas) <= 1000),
  creada_en   timestamptz not null default now()
);

create index if not exists clases_grabadas_por_curso
  on public.clases_grabadas (curso_id, fecha desc);

alter table public.clases_grabadas enable row level security;

drop policy if exists "grabaciones de clase: el docente gestiona" on public.clases_grabadas;
create policy "grabaciones de clase: el docente gestiona" on public.clases_grabadas
  for all to authenticated
  using (public.es_docente() or public.es_admin())
  with check (public.es_docente() or public.es_admin());

drop policy if exists "grabaciones de clase: ve quien está inscrito" on public.clases_grabadas;
create policy "grabaciones de clase: ve quien está inscrito" on public.clases_grabadas
  for select to authenticated
  using (exists (select 1 from public.inscripciones i
                  where i.curso_id = clases_grabadas.curso_id
                    and i.estudiante_id = auth.uid()
                    and i.estado = 'activa'));

revoke all on public.clases_grabadas from anon;
grant select, insert, update, delete on public.clases_grabadas to authenticated;

-- Comprobación
select count(*) as grabaciones from public.clases_grabadas;
