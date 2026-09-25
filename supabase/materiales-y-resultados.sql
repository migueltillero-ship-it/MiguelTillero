-- ============================================================================
-- MATERIALES Y RESULTADOS
--
-- 1) Tabla de materiales: el repositorio de lo ya trabajado (Espace Hybride
--    A1), con sus refuerzos y sus juegos, enlazado por módulo.
-- 2) Comentario del docente en cada evaluación, para que «Mis resultados»
--    muestre la devolución y no solo un número.
--
-- CÓMO USAR: ejecútalo DESPUÉS de ciclo-a1-detalles.sql. Es seguro repetirlo.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. MATERIALES
-- ---------------------------------------------------------------------------

create table if not exists public.materiales (
  id uuid primary key default gen_random_uuid(),
  grupo_id uuid references public.grupos(id) on delete cascade,
  titulo text not null,
  descripcion text,
  url text not null,
  categoria text not null default 'material'
    check (categoria in ('material', 'refuerzo', 'juego', 'evaluacion')),
  unidad text,
  orden integer not null default 0,
  created_at timestamptz not null default now()
);
alter table public.materiales enable row level security;

create index if not exists idx_materiales_grupo on public.materiales(grupo_id);

-- Un material puede repetirse de ciclo en ciclo, pero no dentro del mismo
-- grupo: la URL lo identifica.
create unique index if not exists idx_materiales_unicos
  on public.materiales(coalesce(grupo_id, '00000000-0000-0000-0000-000000000000'::uuid), url);

drop policy if exists "materiales: docente del grupo administra" on public.materiales;
create policy "materiales: docente del grupo administra"
  on public.materiales for all
  using (public.es_admin() or (grupo_id is not null and public.es_docente_del_grupo(grupo_id)))
  with check (public.es_admin() or (grupo_id is not null and public.es_docente_del_grupo(grupo_id)));

-- El estudiante inscrito ve los de su grupo. Los materiales sin grupo
-- (grupo_id nulo) son del catálogo general y los ve cualquier estudiante
-- que haya iniciado sesión.
drop policy if exists "materiales: estudiante inscrito los ve" on public.materiales;
create policy "materiales: estudiante inscrito los ve"
  on public.materiales for select
  using (grupo_id is null or public.esta_inscrito_en_grupo(grupo_id));


-- ---------------------------------------------------------------------------
-- 2. RESULTADOS — devolución del docente
-- ---------------------------------------------------------------------------

-- notas ya tenía "comentario"; le añadimos cuándo se devolvió y sobre qué
-- se evalúa, para que el estudiante entienda la nota.
alter table public.notas add column if not exists devuelta_en timestamptz;
alter table public.evaluaciones add column if not exists descripcion text;
alter table public.evaluaciones add column if not exists nota_maxima numeric not null default 100;

-- Al escribir o cambiar un comentario, se marca la fecha de devolución.
create or replace function public.fn_nota_devuelta()
returns trigger language plpgsql as $$
begin
  if new.calificacion is not null
     and (tg_op = 'INSERT' or new.calificacion is distinct from old.calificacion
          or new.comentario is distinct from old.comentario) then
    new.devuelta_en = now();
  end if;
  return new;
end;
$$;

drop trigger if exists tr_nota_devuelta on public.notas;
create trigger tr_nota_devuelta before insert or update on public.notas
for each row execute function public.fn_nota_devuelta();


-- ---------------------------------------------------------------------------
-- 3. Carga del repositorio del grupo A1
-- ---------------------------------------------------------------------------

do $$
declare
  v_grupo_id uuid;
  v_curso_id uuid;
  v_base text := 'https://migueltillero-ship-it.github.io/MiguelTillero/estudiantes/a1.html';
  r record;
begin
  select g.id, g.curso_id into v_grupo_id, v_curso_id
  from public.grupos g where g.codigo = 'A1-OCT2026';

  if v_grupo_id is null then
    raise exception 'No existe el grupo A1-OCT2026. Ejecuta antes ciclo-a1-oct2026.sql.';
  end if;

  for r in
    select * from (values
      (1, 'Espace Hybride A1 — inicio', 'material', null::text,
       'La portada de tu espacio de estudio, con tu progreso por módulo.',
       '#vue-hub'),

      (2, 'Module 1 — Premiers Contacts', 'material', 'Unité 1',
       'Saluer et prendre congé · le verbe s''appeler · les pronoms personnels · les articles · les verbes en -ER · nationalités et jours de la semaine.',
       '#vue-mod1'),

      (3, 'Module 2 — Portrait-robot & Nombres', 'material', 'Unité 1-2',
       'Les verbes ÊTRE et AVOIR · le féminin des métiers · les nombres · le verbe FAIRE · dire l''heure · les nombres ordinaux.',
       '#vue-mod2'),

      (4, 'Module 3 — État Civil & Identité', 'material', 'Unité 3',
       'L''accord de l''adjectif et des nationalités · «C''est» vs «Il / Elle est» · les adjectifs possessifs · la famille · décrire le caractère.',
       '#vue-mod3'),

      (5, 'Module 4 — Le Logement et l''Espace', 'material', 'Unité 4',
       'La unidad que estamos trabajando: «Il y a» · les prépositions de localisation · exprimer l''obligation · le verbe ALLER et les lieux · les meubles et les pièces.',
       '#vue-mod4'),

      (6, 'Vocabulaire & Jeux', 'juego', null,
       'Flashcards con audio y juego de memoria para repasar el vocabulario de todos los módulos.',
       '#vue-jeux'),

      (7, 'Mes assignations', 'refuerzo', null,
       'Las tareas y refuerzos que te he ido asignando.',
       '#vue-assignations')
    ) as t(orden, titulo, categoria, unidad, descripcion, ancla)
  loop
    insert into public.materiales (grupo_id, titulo, descripcion, url, categoria, unidad, orden)
    values (v_grupo_id, r.titulo, r.descripcion, v_base || r.ancla, r.categoria, r.unidad, r.orden)
    on conflict (coalesce(grupo_id, '00000000-0000-0000-0000-000000000000'::uuid), url)
    do update set titulo = excluded.titulo, descripcion = excluded.descripcion,
                  categoria = excluded.categoria, unidad = excluded.unidad,
                  orden = excluded.orden;
  end loop;

  -- Descripción de las evaluaciones, para que la nota se entienda.
  update public.evaluaciones set descripcion =
    'Prueba en grupo: compréhension orale y écrite, más una tâche collective.'
  where curso_id = v_curso_id and nombre like 'Évaluation collective%';

  update public.evaluaciones set descripcion =
    'Prueba individual: production orale (entretien dirigé y monologue suivi) y production écrite breve.'
  where curso_id = v_curso_id and nombre like 'Évaluation individuelle%';

  raise notice 'Materiales y resultados listos para el grupo %', v_grupo_id;
end $$;


-- ============================================================================
-- COMPROBACIÓN
-- ============================================================================
select orden, categoria, coalesce(unidad, '—') as unidad, titulo
from public.materiales m
join public.grupos g on g.id = m.grupo_id
where g.codigo = 'A1-OCT2026'
order by orden;
