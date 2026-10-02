-- ============================================================================
-- BOLETINES DE RESULTADOS · enlace privado para cada alumno y su familia
--
-- Las notas no pueden esperar a que cada familia cree su cuenta en la
-- plataforma. Cada alumno tiene un boletín con un enlace secreto
-- (evaluaciones/boletin.html?t=...) que los padres abren sin contraseña.
--
--   · boletines ....... un alumno de un grupo: nombre, correo, representante,
--                       teléfono y el token del enlace.
--   · boletin_notas ... sus resultados: prueba escrita y prueba oral.
--
-- Seguridad:
--   · Solo el docente/admin lee y escribe las tablas.
--   · El público solo puede llamar ver_boletin(token): sin el token exacto
--     (un UUID imposible de adivinar) no se ve nada, y no se puede listar.
--   · Si el alumno sí tiene cuenta, la nota también va a «Mis resultados».
--
-- CÓMO USAR: ejecútalo DESPUÉS de resultados-a1-4.sql. Es seguro repetirlo.
-- ============================================================================

create table if not exists public.boletines (
  id             uuid primary key default gen_random_uuid(),
  token          uuid not null unique default gen_random_uuid(),
  grupo          text not null default 'A1-OCT2026',
  alumno         text not null,
  email          text,
  representante  text,
  telefono       text,
  estudiante_id  uuid references public.profiles(id) on delete set null,
  creado_en      timestamptz not null default now()
);

create table if not exists public.boletin_notas (
  boletin_id    uuid not null references public.boletines(id) on delete cascade,
  prueba        text not null check (prueba in ('escrita', 'oral')),
  titulo        text not null,
  nota          numeric,
  maxima        numeric not null,
  detalle       jsonb,
  comentario    text,
  publicado_en  timestamptz not null default now(),
  primary key (boletin_id, prueba)
);

alter table public.boletines     enable row level security;
alter table public.boletin_notas enable row level security;

drop policy if exists "boletines: staff" on public.boletines;
create policy "boletines: staff" on public.boletines for all to authenticated
  using (public.es_admin() or public.es_docente())
  with check (public.es_admin() or public.es_docente());

drop policy if exists "boletin_notas: staff" on public.boletin_notas;
create policy "boletin_notas: staff" on public.boletin_notas for all to authenticated
  using (public.es_admin() or public.es_docente())
  with check (public.es_admin() or public.es_docente());


-- ---------------------------------------------------------------------------
-- Lectura pública por token
-- ---------------------------------------------------------------------------
create or replace function public.ver_boletin(p_token uuid)
returns jsonb
language sql stable security definer set search_path = public
as $$
  select jsonb_build_object(
    'alumno', b.alumno,
    'grupo', b.grupo,
    'notas', coalesce((
      select jsonb_agg(jsonb_build_object(
               'prueba', n.prueba, 'titulo', n.titulo, 'nota', n.nota, 'maxima', n.maxima,
               'detalle', n.detalle, 'comentario', n.comentario, 'publicado_en', n.publicado_en)
             order by case n.prueba when 'escrita' then 1 else 2 end)
      from public.boletin_notas n where n.boletin_id = b.id), '[]'::jsonb))
  from public.boletines b
  where b.token = p_token;
$$;
revoke all on function public.ver_boletin(uuid) from public;
grant execute on function public.ver_boletin(uuid) to anon, authenticated;


-- ---------------------------------------------------------------------------
-- Prueba escrita: de Sentinelle a los boletines
-- ---------------------------------------------------------------------------
-- Toma los intentos ya revisados (con nota_final). Busca el boletín del
-- alumno por su correo y, si no existe, lo crea con el nombre que escribió
-- en la prueba. Si ese correo es el de una cuenta de la plataforma, lo enlaza.
create or replace function public.publicar_examen_en_boletines(p_examen text, p_grupo text default 'A1-OCT2026')
returns jsonb
language plpgsql
security definer set search_path = public
as $$
declare
  it record; v_bol uuid; v_est uuid; v_titulo text; v_n int := 0;
begin
  if not (public.es_admin() or public.es_docente()) then
    raise exception 'SIN_PERMISO';
  end if;
  select titulo into v_titulo from public.examenes where id = p_examen;

  for it in select * from public.examenes_intentos
            where examen_id = p_examen and nota_final is not null loop
    select b.id into v_bol from public.boletines b
    where b.grupo = p_grupo and lower(trim(b.email)) = lower(trim(it.email))
    limit 1;

    select p.id into v_est
    from public.profiles p join auth.users u on u.id = p.id
    where lower(trim(it.email)) in (lower(trim(u.email)), lower(trim(coalesce(p.representante_email, ''))))
    limit 1;

    if v_bol is null then
      insert into public.boletines (grupo, alumno, email, estudiante_id)
      values (p_grupo, trim(it.nombre), lower(trim(it.email)), v_est)
      returning id into v_bol;
    elsif v_est is not null then
      update public.boletines set estudiante_id = coalesce(estudiante_id, v_est) where id = v_bol;
    end if;

    insert into public.boletin_notas (boletin_id, prueba, titulo, nota, maxima, detalle, comentario, publicado_en)
    values (
      v_bol, 'escrita', coalesce(v_titulo, 'Prueba escrita'), it.nota_final, 50,
      jsonb_build_object('partes', jsonb_build_array(
        jsonb_build_object('n', 'Compréhension orale',  'p', coalesce((it.puntaje_auto->'secciones'->>'co')::numeric, 0), 'm', 15),
        jsonb_build_object('n', 'Compréhension écrite', 'p', coalesce((it.puntaje_auto->'secciones'->>'ce')::numeric, 0), 'm', 15),
        jsonb_build_object('n', 'Production écrite',    'p', coalesce((it.calif_pe->>'total')::numeric, 0), 'm', 20)
      )),
      it.comentario, now())
    on conflict (boletin_id, prueba) do update
      set titulo = excluded.titulo, nota = excluded.nota, maxima = excluded.maxima,
          detalle = excluded.detalle, comentario = excluded.comentario, publicado_en = now();

    v_n := v_n + 1;
  end loop;

  return jsonb_build_object('publicadas', v_n);
end;
$$;
revoke all on function public.publicar_examen_en_boletines(text, text) from public, anon;
grant execute on function public.publicar_examen_en_boletines(text, text) to authenticated;


-- ============================================================================
-- COMPROBACIÓN: cuántos intentos de la prueba escrita están listos
-- ============================================================================
select count(*) filter (where nota_final is not null) as revisados,
       count(*) as intentos
from public.examenes_intentos where examen_id = 'a14-chez-les-moreau';
