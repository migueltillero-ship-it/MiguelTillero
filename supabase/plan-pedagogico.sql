-- ===========================================================================
-- EL PLAN PEDAGÓGICO DENTRO DEL ACUERDO
-- ===========================================================================
-- Lo que se trabaja en las primeras horas forma parte de lo acordado tanto
-- como el precio: el estudiante tiene derecho a saber a qué se compromete el
-- docente, no solo cuánto paga.
--
-- No va fijo en la plantilla porque no vale para todo el mundo: el plan de
-- bases es para quien empieza de cero. A quien llega en B1 hay que ponerle
-- otro, o ninguno. Por eso se guarda en la contratación y el acuerdo lo
-- recoge si está; si no está, esa sección sencillamente no aparece.
--
-- CÓMO USAR: Supabase → SQL Editor → New query → pegar → Run.
-- Ejecutar DESPUÉS de contrataciones.sql. Es seguro repetirlo.
-- ===========================================================================

alter table public.contrataciones
  add column if not exists plan_nombre text,
  add column if not exists plan_pedagogico text;

comment on column public.contrataciones.plan_pedagogico is
  'Qué se trabaja en este ciclo, tal y como se le promete al estudiante. Se '
  'copia al acuerdo cuando se emite. En blanco, el acuerdo omite la sección.';


-- ---------------------------------------------------------------------------
-- Catálogo de planes
-- ---------------------------------------------------------------------------
-- Para no reescribir el mismo texto en cada contratación ni arriesgarse a que
-- dos estudiantes reciban versiones distintas de lo mismo.

create table if not exists public.planes_pedagogicos (
  id        text primary key,
  nombre    text not null,
  horas     numeric(5,1),
  cuerpo    text not null,
  activo    boolean not null default true,
  creado_en timestamptz not null default now()
);
alter table public.planes_pedagogicos enable row level security;

drop policy if exists "planes: el docente los administra" on public.planes_pedagogicos;
create policy "planes: el docente los administra"
  on public.planes_pedagogicos for all
  using (public.es_docente()) with check (public.es_docente());

drop policy if exists "planes: visibles a quien entró" on public.planes_pedagogicos;
create policy "planes: visibles a quien entró"
  on public.planes_pedagogicos for select using (auth.uid() is not null);


insert into public.planes_pedagogicos (id, nombre, horas, cuerpo) values (
  'bases-12h',
  'Las bases del francés — 12 horas',
  12,
  'Estas primeras horas las dedicamos íntegramente a las bases del francés, y '
  'eso empieza por la boca. Haremos trabajo fonético práctico: vas a descubrir '
  'tu propia musculatura y tus puntos articulatorios para poder pronunciar '
  'cualquier cosa en francés.' || E'\n\n' ||
  'Mi primera clase siempre arranca con la misma idea: si sabes pronunciar las '
  'cinco vocales del español, puedes pronunciar lo que quieras en francés. No '
  'es una frase bonita; es el punto de partida del método.' || E'\n\n' ||
  'Trabajaremos el acento, el ritmo y la silabación, y buscaremos sobre todo '
  'tres cosas: que ganes confianza, que domines las reglas básicas y que '
  'entiendas de forma global cómo funciona la lengua. Este método lo he '
  'construido en trece años de carrera, a partir de las dificultades reales '
  'que he visto una y otra vez en mis estudiantes.' || E'\n\n' ||
  'Hay una planificación global, pero el ritmo lo marcas tú. Al terminar estas '
  'doce horas —de las cuales las dos últimas se reservan para la evaluación— '
  'haremos una prueba que mide las cuatro competencias: comprensión oral, '
  'comprensión escrita, producción oral y producción escrita. Sirve para saber '
  'dónde estás de verdad y decidir juntos cómo seguimos.'
)
on conflict (id) do update
   set nombre = excluded.nombre, horas = excluded.horas, cuerpo = excluded.cuerpo;


-- ---------------------------------------------------------------------------
-- Asignar un plan a una contratación
-- ---------------------------------------------------------------------------
-- Copia el texto en lugar de apuntar al catálogo: si mañana se mejora la
-- redacción del plan, lo ya firmado no cambia.

create or replace function public.asignar_plan(p_contratacion uuid, p_plan text)
returns void
language plpgsql security definer set search_path = public as $$
declare v planes_pedagogicos%rowtype;
begin
  if not es_docente() then raise exception 'Solo el docente asigna el plan.'; end if;
  select * into v from planes_pedagogicos where id = p_plan and activo;
  if not found then raise exception 'No existe el plan «%».', p_plan; end if;
  if exists (select 1 from contratos where contratacion_id = p_contratacion) then
    raise exception 'El acuerdo ya está emitido: cambiar el plan ahora no lo tocaría.';
  end if;
  update contrataciones
     set plan_nombre = v.nombre, plan_pedagogico = v.cuerpo
   where id = p_contratacion;
end;
$$;
grant execute on function public.asignar_plan(uuid, text) to authenticated;


select id, nombre, horas from public.planes_pedagogicos where activo;
