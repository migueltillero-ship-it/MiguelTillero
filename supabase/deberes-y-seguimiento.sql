-- ============================================================================
-- DEBERES Y SEGUIMIENTO
--
-- Dos cosas que hasta ahora se quedaban en el navegador de cada alumno y que
-- el profesor no veía:
--
--   1. Los DEBERES: el profesor los publica por grupo; el alumno los entrega
--      en estudiantes/devoirs.html (texto y, si hace falta, una imagen o una
--      diapositiva); el profesor los lee y comenta en evaluaciones/seguimiento.html.
--   2. El AVANCE EN LAS FICHAS de ejercicios: cada ejercicio resuelto se copia
--      en la base de datos cuando el alumno ha entrado con su cuenta.
--
-- Los archivos van a un bucket PRIVADO («deberes»): cada alumno solo ve los
-- suyos; el profesor los abre con un enlace temporal.
--
-- CÓMO USAR: Supabase → SQL Editor → pegar → Run. Es seguro repetirlo.
-- Al final se registran los dos deberes del B2 del 28 de octubre.
-- ============================================================================


-- 1. Deberes ------------------------------------------------------------------
create table if not exists public.deberes (
  id             uuid primary key default gen_random_uuid(),
  grupo_id       uuid not null references public.grupos(id) on delete cascade,
  clave          text not null,                 -- identificador estable, p. ej. 'b2-2026-10-28-table'
  titulo         text not null,
  consigna       text not null,                 -- HTML sencillo, lo escribe el profesor
  ficha          text,                          -- enlace a la ficha relacionada (opcional)
  pide_archivo   boolean not null default false,
  palabras       integer,                       -- extensión orientativa
  asignado_el    date not null default current_date,
  entregar_antes date,
  orden          integer not null default 0,
  publicado      boolean not null default true,
  creado_en      timestamptz not null default now(),
  unique (grupo_id, clave)
);
alter table public.deberes enable row level security;
create index if not exists idx_deberes_grupo on public.deberes(grupo_id);

drop policy if exists "deberes: staff administra" on public.deberes;
create policy "deberes: staff administra" on public.deberes for all to authenticated
  using (public.es_admin() or public.es_docente_del_grupo(grupo_id))
  with check (public.es_admin() or public.es_docente_del_grupo(grupo_id));

drop policy if exists "deberes: alumno del grupo los ve" on public.deberes;
create policy "deberes: alumno del grupo los ve" on public.deberes for select to authenticated
  using (publicado and public.esta_inscrito_en_grupo(grupo_id));


-- 2. Entregas -------------------------------------------------------------------
-- El alumno no escribe directamente en la tabla: entrega con entregar_deber(),
-- así no puede tocar el comentario ni el estado. Solo lee lo suyo.
create table if not exists public.deberes_entregas (
  id             uuid primary key default gen_random_uuid(),
  deber_id       uuid not null references public.deberes(id) on delete cascade,
  estudiante_id  uuid not null references public.profiles(id) on delete cascade,
  texto          text,
  archivo        text,                          -- ruta dentro del bucket «deberes»
  archivo_nombre text,
  estado         text not null default 'entregado' check (estado in ('entregado', 'revisado')),
  comentario     text,
  entregado_en   timestamptz not null default now(),
  revisado_en    timestamptz,
  unique (deber_id, estudiante_id)
);
alter table public.deberes_entregas enable row level security;
create index if not exists idx_entregas_deber on public.deberes_entregas(deber_id);

drop policy if exists "entregas: cada quien la suya, staff todas" on public.deberes_entregas;
create policy "entregas: cada quien la suya, staff todas" on public.deberes_entregas for select to authenticated
  using (
    estudiante_id = auth.uid()
    or public.es_admin()
    or exists (select 1 from public.deberes d where d.id = deber_id and public.es_docente_del_grupo(d.grupo_id))
  );

create or replace function public.entregar_deber(p_deber uuid, p_texto text, p_archivo text default null, p_archivo_nombre text default null)
returns public.deberes_entregas
language plpgsql security definer set search_path = public as $$
declare
  v_grupo uuid;
  v_fila  public.deberes_entregas;
begin
  if auth.uid() is null then raise exception 'Hay que entrar con tu cuenta.'; end if;
  select d.grupo_id into v_grupo from public.deberes d where d.id = p_deber and d.publicado;
  if v_grupo is null or not public.esta_inscrito_en_grupo(v_grupo) then
    raise exception 'Este deber no es de tu grupo.';
  end if;
  if coalesce(trim(p_texto), '') = '' and p_archivo is null then
    raise exception 'La entrega está vacía.';
  end if;
  -- El archivo tiene que estar en la carpeta del propio alumno.
  if p_archivo is not null and split_part(p_archivo, '/', 1) <> auth.uid()::text then
    raise exception 'Archivo no válido.';
  end if;

  insert into public.deberes_entregas (deber_id, estudiante_id, texto, archivo, archivo_nombre)
  values (p_deber, auth.uid(), left(p_texto, 20000), p_archivo, left(p_archivo_nombre, 200))
  on conflict (deber_id, estudiante_id) do update
    set texto          = excluded.texto,
        archivo        = coalesce(excluded.archivo, deberes_entregas.archivo),
        archivo_nombre = case when excluded.archivo is null then deberes_entregas.archivo_nombre
                              else excluded.archivo_nombre end,
        estado         = 'entregado',     -- si la rehace, vuelve a la pila del profesor
        entregado_en   = now()
  returning * into v_fila;
  return v_fila;
end $$;
revoke all on function public.entregar_deber(uuid, text, text, text) from public, anon;
grant execute on function public.entregar_deber(uuid, text, text, text) to authenticated;

create or replace function public.revisar_entrega(p_entrega uuid, p_comentario text)
returns void
language plpgsql security definer set search_path = public as $$
begin
  if not exists (
    select 1 from public.deberes_entregas e join public.deberes d on d.id = e.deber_id
    where e.id = p_entrega and (public.es_admin() or public.es_docente_del_grupo(d.grupo_id))
  ) then
    raise exception 'Sin permiso.';
  end if;
  update public.deberes_entregas
     set comentario = nullif(trim(p_comentario), ''), estado = 'revisado', revisado_en = now()
   where id = p_entrega;
end $$;
revoke all on function public.revisar_entrega(uuid, text) from public, anon;
grant execute on function public.revisar_entrega(uuid, text) to authenticated;


-- 3. Archivos de las entregas -------------------------------------------------
-- Ruta: <id del alumno>/<id del deber>/<nombre>. 10 MB, imágenes, PDF o PowerPoint.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('deberes', 'deberes', false, 10485760, array[
  'image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/heic',
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation'])
on conflict (id) do update
  set public = false, file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "deberes: el alumno sube a su carpeta" on storage.objects;
create policy "deberes: el alumno sube a su carpeta" on storage.objects for insert to authenticated
  with check (bucket_id = 'deberes' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "deberes: el alumno cambia lo suyo" on storage.objects;
create policy "deberes: el alumno cambia lo suyo" on storage.objects for update to authenticated
  using (bucket_id = 'deberes' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "deberes: lectura alumno y staff" on storage.objects;
create policy "deberes: lectura alumno y staff" on storage.objects for select to authenticated
  using (bucket_id = 'deberes' and ((storage.foldername(name))[1] = auth.uid()::text or public.es_docente()));


-- 4. Avance en las fichas -----------------------------------------------------
-- Una fila por alumno y ejercicio. «clave» es la del espacio de ejercicios
-- (mt-b2, mt-a1); «texto» guarda las producciones escritas.
create table if not exists public.fichas_avance (
  estudiante_id uuid not null references public.profiles(id) on delete cascade default auth.uid(),
  clave         text not null,
  ficha         text not null,
  ejercicio     text not null,
  bien          integer not null default 0,
  total         integer not null default 0,
  texto         text,
  actualizado   timestamptz not null default now(),
  primary key (estudiante_id, clave, ficha, ejercicio)
);
alter table public.fichas_avance enable row level security;

drop policy if exists "fichas_avance: lo suyo" on public.fichas_avance;
create policy "fichas_avance: lo suyo" on public.fichas_avance for all to authenticated
  using (estudiante_id = auth.uid())
  with check (estudiante_id = auth.uid() and length(coalesce(texto, '')) <= 20000);

drop policy if exists "fichas_avance: staff lee" on public.fichas_avance;
create policy "fichas_avance: staff lee" on public.fichas_avance for select to authenticated
  using (public.es_docente());


-- 5. Lo que ve el profesor ------------------------------------------------------
-- Todo el grupo de una vez: alumnos, deberes, entregas y avance en las fichas.
create or replace function public.seguimiento_grupo(p_grupo text, p_clave text)
returns jsonb
language plpgsql stable security definer set search_path = public as $$
declare v_grupo uuid;
begin
  select id into v_grupo from public.grupos where codigo = p_grupo;
  if v_grupo is null then raise exception 'No existe el grupo %.', p_grupo; end if;
  if not (public.es_admin() or public.es_docente_del_grupo(v_grupo)) then
    raise exception 'Sin permiso.';
  end if;

  return jsonb_build_object(
    'alumnos', coalesce((
      select jsonb_agg(jsonb_build_object('id', p.id, 'nombre', p.nombre_completo, 'estado', i.estado)
                       order by p.nombre_completo)
      from public.inscripciones i join public.profiles p on p.id = i.estudiante_id
      where i.grupo_id = v_grupo and i.estado in ('activa', 'pendiente', 'finalizada')), '[]'::jsonb),
    'deberes', coalesce((
      select jsonb_agg(to_jsonb(d) order by d.asignado_el desc, d.orden)
      from public.deberes d where d.grupo_id = v_grupo), '[]'::jsonb),
    'entregas', coalesce((
      select jsonb_agg(to_jsonb(e))
      from public.deberes_entregas e join public.deberes d on d.id = e.deber_id
      where d.grupo_id = v_grupo), '[]'::jsonb),
    'fichas', coalesce((
      select jsonb_agg(to_jsonb(f))
      from public.fichas_avance f
      join public.inscripciones i on i.estudiante_id = f.estudiante_id and i.grupo_id = v_grupo
      where f.clave = p_clave), '[]'::jsonb)
  );
end $$;
revoke all on function public.seguimiento_grupo(text, text) from public, anon;
grant execute on function public.seguimiento_grupo(text, text) to authenticated;


-- 6. Los deberes del B2 del miércoles 28 de octubre ---------------------------
do $$
declare v_grupo uuid;
begin
  select id into v_grupo from public.grupos where codigo = 'B2-OCT2026';
  if v_grupo is null then raise exception 'No existe el grupo B2-OCT2026.'; end if;

  insert into public.deberes (grupo_id, clave, titulo, consigna, ficha, pide_archivo, palabras, asignado_el, entregar_antes, orden)
  values
    (v_grupo, 'b2-2026-10-28-table',
     'À table, au Mexique : ce qui se fait et ce qui ne se fait pas',
     '<p>Décris les bonnes manières au <b>déjeuner</b> ou au <b>dîner</b> au Mexique : '
     || 'ce qu’il faut faire et ce qu’il ne faut pas faire.</p>'
     || '<p>Ajoute <b>une image ou une diapositive</b> qui illustre, pour toi, cette scène.</p>'
     || '<p class="pista">Utilise : <i>ça se fait / ça ne se fait pas</i>, les expressions de '
     || 'l’activité 22, <i>ce qu’il faut faire, c’est…</i>, <i>il vaut mieux</i> + infinitif '
     || 'et un proverbe avec <i>valoir</i>.</p>',
     'espace-b2-exercices.html#netiquette', true, 150, date '2026-10-28', date '2026-11-02', 1),

    (v_grupo, 'b2-2026-10-28-place',
     'Céder sa place dans les transports : une bonne habitude ?',
     '<p>Céder sa place à une personne âgée — ou céder sa place tout court — dans les '
     || 'transports en commun, est-ce une bonne habitude ? <b>Te sens-tu obligé(e) de le faire ?</b> '
     || 'Pourquoi ?</p>'
     || '<p class="pista">Donne ton opinion et un exemple vécu. Utilise : <i>ça se fait / ça ne '
     || 'se fait pas</i>, <i>c’est la base</i>, <i>ça met mal à l’aise</i>, <i>il vaut mieux</i>, '
     || '<i>ce qu’il ne faut pas faire, c’est…</i></p>',
     'espace-b2-exercices.html#netiquette', false, 150, date '2026-10-28', date '2026-11-02', 2)
  on conflict (grupo_id, clave) do update
    set titulo = excluded.titulo, consigna = excluded.consigna, ficha = excluded.ficha,
        pide_archivo = excluded.pide_archivo, palabras = excluded.palabras,
        asignado_el = excluded.asignado_el, entregar_antes = excluded.entregar_antes,
        orden = excluded.orden;

  -- Lo que se vio de verdad el 28 de octubre, en la planificación del grupo.
  update public.sesiones set
    tema = 'Révision du vocabulaire · La nétiquette (livre p. 19, act. 23-24)',
    contenido = E'Repaso general del vocabulario de la unidad.
'
      '• Act. 23 — Vídeo: ¿qué es la nétiquette? ¿Qué se hace y qué no, según el interviniente?
'
      '• Las fórmulas para juzgar: ça se fait / ça ne se fait pas, ce qu''il faut dire / faire, il vaut mieux, mieux vaut, proverbios con valoir.
'
      '• Deberes para el 2 de noviembre (en «Mes devoirs»): los buenos modales en la mesa en México, con una imagen; y ceder el asiento en el transporte público.'
   where grupo_id = v_grupo and fecha = date '2026-10-28';

  -- «Prendre des notes» se queda como ficha de método, sin la fecha de hoy.
  update public.materiales
     set titulo = 'Méthodologie DELF · Prendre des notes', orden = 15
   where grupo_id = v_grupo and url like '%espace-b2-exercices.html#s7';

  -- Las dos entradas en «Materiales» del espacio del estudiante.
  insert into public.materiales (grupo_id, titulo, descripcion, url, categoria, unidad, orden)
  values
    (v_grupo, 'Mes devoirs — à rendre en ligne',
     'Los deberes de cada clase. Los escribes y los entregas aquí; el profesor los ve y te '
     || 'devuelve un comentario.',
     'https://migueltillero-ship-it.github.io/MiguelTillero/estudiantes/devoirs.html', 'material', null, 1),
    (v_grupo, 'Séance du 28 octobre · La nétiquette',
     'El vídeo de la actividad 23, las reglas de la buena educación en línea y las fórmulas '
     || 'para juzgar: ce qu’il faut faire, il vaut mieux, ça ne se fait pas. Con los deberes.',
     'https://migueltillero-ship-it.github.io/MiguelTillero/estudiantes/espace-b2-exercices.html#netiquette',
     'refuerzo', 'Unité 1', 9)
  on conflict (coalesce(grupo_id, '00000000-0000-0000-0000-000000000000'::uuid), url)
  do update set titulo = excluded.titulo, descripcion = excluded.descripcion,
                categoria = excluded.categoria, unidad = excluded.unidad, orden = excluded.orden;
end $$;


-- Comprobación
select d.titulo, d.entregar_antes, d.pide_archivo,
       (select count(*) from public.deberes_entregas e where e.deber_id = d.id) as entregas
from public.deberes d join public.grupos g on g.id = d.grupo_id
where g.codigo = 'B2-OCT2026'
order by d.asignado_el desc, d.orden;
