-- ===========================================================================
-- DESEMPEÑO EN COMPETENCIAS (MCER) + AUTOEVALUACIÓN + BALANCE DE ASISTENCIA
-- ===========================================================================
-- El centro de la evaluación no es una nota final, sino qué competencias se
-- esperaban en el nivel y qué desempeño tiene cada estudiante en ellas.
--
--  · desempeno_competencias: lo que valora el docente, 1 a 4, por competencia.
--      1 «Lo estamos construyendo» · 2 «Lo logro con apoyo»
--      3 «Lo logro»                · 4 «Lo logro con soltura»
--    Nace SIN publicar: el estudiante y la familia no lo ven hasta que se publique.
--  · autoevaluacion_competencias: de qué se siente capaz el propio estudiante.
--  · Asistencia con recuperaciones. Estos campos nacen VACÍOS a propósito: no se
--    suponen recuperaciones; las confirma el docente.
--      asistencia.recuperada_en  — el estudiante faltó y recuperó ese día
--      sesiones.anulada / anulada_motivo / recuperada_en — el profesor faltó
--
-- Todo se lee por UNA función (desempeno_competencias_de) que comprueba quién
-- pregunta: el propio estudiante, su representante o el docente.
-- CÓMO USAR: Supabase → SQL Editor → pegar → Run. Es seguro repetirlo.
-- https://supabase.com/dashboard/project/yfrdlzveleevkjqekdoq/sql/new
-- ===========================================================================

alter table public.asistencia add column if not exists recuperada_en date;
alter table public.sesiones   add column if not exists anulada boolean not null default false;
alter table public.sesiones   add column if not exists anulada_motivo text;
alter table public.sesiones   add column if not exists recuperada_en date;

create table if not exists public.desempeno_competencias (
  estudiante_id uuid not null references public.profiles(id),
  ciclo         text not null,
  competencia   text not null check (competencia in ('comprension-oral','comprension-escrita','produccion-oral','produccion-escrita')),
  logro         smallint not null check (logro between 1 and 4),
  comentario    text,
  publicado     boolean not null default false,
  actualizado   timestamptz not null default now(),
  primary key (estudiante_id, ciclo, competencia)
);
create table if not exists public.autoevaluacion_competencias (
  estudiante_id uuid not null references public.profiles(id),
  ciclo         text not null,
  competencia   text not null check (competencia in ('comprension-oral','comprension-escrita','produccion-oral','produccion-escrita')),
  confianza     smallint not null check (confianza between 1 and 4),
  actualizado   timestamptz not null default now(),
  primary key (estudiante_id, ciclo, competencia)
);
alter table public.desempeno_competencias enable row level security;
alter table public.autoevaluacion_competencias enable row level security;

do $$ begin
  if not exists (select 1 from pg_policies where tablename='desempeno_competencias' and policyname='desempeno: lo gestiona el docente') then
    create policy "desempeno: lo gestiona el docente" on public.desempeno_competencias
      for all to authenticated using (public.es_docente() or public.es_admin()) with check (public.es_docente() or public.es_admin());
  end if;
  if not exists (select 1 from pg_policies where tablename='autoevaluacion_competencias' and policyname='autoevaluacion: la lee el docente') then
    create policy "autoevaluacion: la lee el docente" on public.autoevaluacion_competencias
      for select to authenticated using (public.es_docente() or public.es_admin());
  end if;
end $$;

-- Lectura: el propio estudiante, su representante o el docente.
create or replace function public.desempeno_competencias_de(p_estudiante uuid default null)
returns jsonb language plpgsql security definer set search_path = public as $$
declare
  v_yo uuid := auth.uid(); v_est uuid; v_doc boolean;
  v_nombre text; v_grupo uuid; v_ciclo text; v_nivel text; v_nivel_m text; v_comp jsonb;
  v_pres int; v_falt int; v_falt_rec int; v_anul int; v_anul_rec int;
begin
  if v_yo is null then return jsonb_build_object('error','sin sesión'); end if;
  v_est := coalesce(p_estudiante, v_yo);
  v_doc := public.es_docente() or public.es_admin();
  if not (v_est = v_yo or v_doc or exists (select 1 from tutorias t where t.representante_id = v_yo and t.estudiante_id = v_est)) then
    return jsonb_build_object('error','sin permiso');
  end if;
  select nombre_completo into v_nombre from profiles where id = v_est;

  select g.id, g.codigo, c.nivel into v_grupo, v_ciclo, v_nivel
    from inscripciones i join grupos g on g.id = i.grupo_id join cursos c on c.id = g.curso_id
   where i.estudiante_id = v_est order by g.fecha_inicio desc nulls last, g.created_at desc limit 1;
  if v_ciclo is null then
    return jsonb_build_object('estudiante', jsonb_build_object('id', v_est, 'nombre', v_nombre), 'sin_ciclo', true);
  end if;
  v_nivel_m := case when v_nivel = 'A0' then 'A1' else coalesce(v_nivel, 'A1') end;

  select coalesce(jsonb_agg(jsonb_build_object(
           'clave', m.competencia, 'titulo', m.titulo, 'descriptor', m.descriptor, 'indicador', m.indicador,
           'logro',      case when d.publicado or v_doc then d.logro end,
           'comentario', case when d.publicado or v_doc then d.comentario end,
           'publicado',  coalesce(d.publicado, false),
           'confianza',  a.confianza) order by m.orden), '[]'::jsonb)
    into v_comp
    from competencias_marco m
    left join desempeno_competencias d on d.estudiante_id = v_est and d.ciclo = v_ciclo and d.competencia = m.competencia
    left join autoevaluacion_competencias a on a.estudiante_id = v_est and a.ciclo = v_ciclo and a.competencia = m.competencia
   where m.nivel = v_nivel_m and m.publicado;

  select count(*) filter (where a.presente), count(*) filter (where not a.presente),
         count(*) filter (where not a.presente and a.recuperada_en is not null)
    into v_pres, v_falt, v_falt_rec
    from asistencia a join sesiones s on s.id = a.sesion_id
   where a.estudiante_id = v_est and s.grupo_id = v_grupo;
  select count(*) filter (where anulada), count(*) filter (where anulada and recuperada_en is not null)
    into v_anul, v_anul_rec from sesiones where grupo_id = v_grupo;

  return jsonb_build_object(
    'estudiante', jsonb_build_object('id', v_est, 'nombre', v_nombre),
    'ciclo', v_ciclo, 'nivel', v_nivel_m, 'competencias', v_comp,
    'asistencia', jsonb_build_object('presentes', v_pres, 'faltas', v_falt, 'faltas_recuperadas', v_falt_rec,
                                     'clases_anuladas_profesor', v_anul, 'anuladas_recuperadas', v_anul_rec),
    'puede_autoevaluar', (v_est = v_yo));
end $$;
grant execute on function public.desempeno_competencias_de(uuid) to authenticated;

-- Escritura de la autoevaluación: solo la hace el propio estudiante.
create or replace function public.guardar_autoevaluacion(p_competencia text, p_confianza int)
returns void language plpgsql security definer set search_path = public as $$
declare v_yo uuid := auth.uid(); v_ciclo text;
begin
  if v_yo is null or not exists (select 1 from profiles where id = v_yo and role = 'estudiante') then
    raise exception 'La autoevaluación la hace el propio estudiante.';
  end if;
  select g.codigo into v_ciclo from inscripciones i join grupos g on g.id = i.grupo_id
   where i.estudiante_id = v_yo order by g.fecha_inicio desc nulls last, g.created_at desc limit 1;
  if v_ciclo is null then raise exception 'No tienes un ciclo activo.'; end if;
  insert into autoevaluacion_competencias (estudiante_id, ciclo, competencia, confianza)
  values (v_yo, v_ciclo, p_competencia, p_confianza)
  on conflict (estudiante_id, ciclo, competencia)
  do update set confianza = excluded.confianza, actualizado = now();
end $$;
grant execute on function public.guardar_autoevaluacion(text, int) to authenticated;

-- El panel de la familia no trae el id de cada hijo: esta función lo entrega.
-- Con p_representante (solo docente) sirve también para la vista previa.
create or replace function public.mis_representados(p_representante uuid default null)
returns jsonb language plpgsql security definer set search_path = public as $$
declare v_rep uuid := auth.uid();
begin
  if v_rep is null then return '[]'::jsonb; end if;
  if p_representante is not null then
    if not (public.es_docente() or public.es_admin()) then raise exception 'Solo el docente puede consultar a otra familia.'; end if;
    v_rep := p_representante;
  end if;
  return coalesce((select jsonb_agg(jsonb_build_object('id', e.id, 'nombre', e.nombre_completo) order by e.nombre_completo)
                     from tutorias t join profiles e on e.id = t.estudiante_id where t.representante_id = v_rep), '[]'::jsonb);
end $$;
grant execute on function public.mis_representados(uuid) to authenticated;
