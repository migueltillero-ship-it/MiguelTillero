-- ===========================================================================
-- AVISOS EN EL PERFIL DEL ESTUDIANTE
-- ===========================================================================
-- Hay cosas que hay que decirle a una familia concreta y que no caben en un
-- mensaje de WhatsApp, porque se pierden, ni en el calendario, porque no son
-- una clase. Un cambio de precio para el ciclo siguiente, por ejemplo: se
-- acuerda hoy y se cobra dentro de dos meses, y para entonces nadie se
-- acuerda de lo que se habló.
--
-- Un aviso va en el espacio del estudiante y en el de su familia, con su
-- fecha de aparición y su fecha de caducidad. Se escribe una vez y aparece
-- cuando toca.
--
-- CÓMO USAR: ejecútalo después de representantes-acceso.sql.
-- Es seguro repetirlo.
-- Dónde: Supabase → SQL Editor → New query → pegar → Run.
-- ===========================================================================


-- ---------------------------------------------------------------------------
-- 1. La tabla
-- ---------------------------------------------------------------------------

create table if not exists public.avisos (
  id            uuid primary key default gen_random_uuid(),
  estudiante_id uuid not null references public.profiles(id) on delete cascade,
  titulo        text not null,
  mensaje       text not null,
  -- «info» es una nota; «aviso» pide atención; «importante» no se puede pasar por alto.
  tipo          text not null default 'info' check (tipo in ('info', 'aviso', 'importante')),
  -- Vacío = desde ya / para siempre. Con fecha = aparece y desaparece solo.
  desde         date,
  hasta         date,
  creado_en     timestamptz not null default now()
);
alter table public.avisos enable row level security;
create index if not exists idx_avisos_estudiante on public.avisos(estudiante_id);

comment on table public.avisos is
  'Mensajes dirigidos a un estudiante concreto, visibles en su espacio y en '
  'el de su representante, con ventana de fechas opcional.';


-- ---------------------------------------------------------------------------
-- 2. Quién ve qué
-- ---------------------------------------------------------------------------

create or replace function public.aviso_vigente(p_desde date, p_hasta date)
returns boolean language sql immutable as $$
  select (p_desde is null or p_desde <= public.hoy_mexico())
     and (p_hasta is null or p_hasta >= public.hoy_mexico());
$$;

drop policy if exists "avisos: el docente administra" on public.avisos;
create policy "avisos: el docente administra"
  on public.avisos for all
  using (public.es_admin() or exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.role in ('docente','admin')))
  with check (public.es_admin() or exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.role in ('docente','admin')));

-- El estudiante ve los suyos, y solo mientras estén vigentes: un aviso
-- programado para dentro de un mes no debe asomar antes de tiempo.
drop policy if exists "avisos: el estudiante ve los suyos" on public.avisos;
create policy "avisos: el estudiante ve los suyos"
  on public.avisos for select
  using (estudiante_id = auth.uid() and public.aviso_vigente(desde, hasta));

-- El representante ve los de sus hijos, con la misma regla de vigencia.
drop policy if exists "avisos: el representante ve los de sus hijos" on public.avisos;
create policy "avisos: el representante ve los de sus hijos"
  on public.avisos for select
  using (public.aviso_vigente(desde, hasta) and exists (
    select 1 from public.tutorias t
     where t.estudiante_id = public.avisos.estudiante_id
       and t.representante_id = auth.uid()));


-- ---------------------------------------------------------------------------
-- 3. Crear un aviso sin saberse el identificador de nadie
-- ---------------------------------------------------------------------------
-- Se busca al estudiante por su nombre de pila, como en el resto de los
-- guiones. Si hay más de uno que encaje, no adivina: lo dice.
--
--   select public.crear_aviso(
--     'Nombre', 'Título corto', 'El mensaje.', 'aviso',
--     date '2026-11-15',   -- desde cuándo se ve (null = ya)
--     null);               -- hasta cuándo (null = sin caducidad)

create or replace function public.crear_aviso(
  p_estudiante text,
  p_titulo     text,
  p_mensaje    text,
  p_tipo       text default 'info',
  p_desde      date default null,
  p_hasta      date default null
) returns text language plpgsql security definer set search_path = public as $$
declare
  v_id uuid;
  v_nombre text;
  v_cuantos integer;
begin
  select count(*) into v_cuantos
    from public.profiles p
   where p.role = 'estudiante' and p.nombre_completo ilike '%' || p_estudiante || '%';

  if v_cuantos = 0 then
    return 'No encontré a ningún estudiante que se parezca a «' || p_estudiante || '».';
  elsif v_cuantos > 1 then
    return 'Hay ' || v_cuantos || ' estudiantes que encajan con «' || p_estudiante
         || '». Escribe el nombre más completo.';
  end if;

  select p.id, p.nombre_completo into v_id, v_nombre
    from public.profiles p
   where p.role = 'estudiante' and p.nombre_completo ilike '%' || p_estudiante || '%';

  -- Repetir el mismo aviso para la misma persona no lo duplica: lo actualiza.
  delete from public.avisos
   where estudiante_id = v_id and titulo = p_titulo;

  insert into public.avisos (estudiante_id, titulo, mensaje, tipo, desde, hasta)
  values (v_id, p_titulo, p_mensaje, p_tipo, p_desde, p_hasta);

  return 'Aviso guardado para ' || v_nombre || '. '
       || case when p_desde is null then 'Lo ve desde ya.'
               else 'Aparecerá el ' || to_char(p_desde, 'DD/MM/YYYY') || '.' end;
end $$;

grant execute on function public.crear_aviso(text, text, text, text, date, date) to authenticated;
grant execute on function public.aviso_vigente(date, date) to anon, authenticated;


-- ---------------------------------------------------------------------------
-- 4. Los avisos también llegan al panel de la familia
-- ---------------------------------------------------------------------------
-- La función del panel del representante devuelve todo armado; se le añade
-- el apartado de avisos sin tocar el resto.

create or replace function public.panel_representante()
returns jsonb language plpgsql stable security definer set search_path = public as $$
declare
  v_yo uuid := auth.uid();
  v_resultado jsonb;
begin
  if v_yo is null then
    return jsonb_build_object('error', 'sin sesión');
  end if;

  select jsonb_build_object(
    'representante', (
      select jsonb_build_object('nombre', p.nombre_completo, 'rol', p.role)
        from public.profiles p where p.id = v_yo
    ),
    'hijos', coalesce((
      select jsonb_agg(hijo order by hijo->>'nombre')
      from (
        select jsonb_build_object(
          'nombre',     e.nombre_completo,
          'parentesco', t.parentesco,

          'avisos', coalesce((
            select jsonb_agg(jsonb_build_object(
                     'titulo', av.titulo, 'mensaje', av.mensaje, 'tipo', av.tipo)
                   order by case av.tipo when 'importante' then 1 when 'aviso' then 2 else 3 end,
                            av.creado_en desc)
              from public.avisos av
             where av.estudiante_id = e.id
               and public.aviso_vigente(av.desde, av.hasta)
          ), '[]'::jsonb),

          'curso', (
            select jsonb_build_object(
              'nombre',   c.nombre,
              'grupo',    g.codigo,
              'horario',  g.horario,
              'modalidad',g.modalidad,
              'inicio',   g.fecha_inicio,
              'fin',      g.fecha_fin,
              'estado_inscripcion', i.estado
            )
            from public.inscripciones i
            join public.cursos c on c.id = i.curso_id
            left join public.grupos g on g.id = i.grupo_id
            where i.estudiante_id = e.id
            order by i.created_at desc limit 1
          ),

          'asistencia', (
            select jsonb_build_object(
              'presentes', count(*) filter (where a.presente),
              'faltas',    count(*) filter (where not a.presente),
              'total',     count(*),
              'detalle',   coalesce(jsonb_agg(jsonb_build_object(
                              'fecha', s.fecha, 'tema', s.tema, 'presente', a.presente,
                              'observacion', a.observacion)
                            order by s.fecha desc) filter (where s.fecha is not null), '[]'::jsonb)
            )
            from public.asistencia a
            join public.sesiones s on s.id = a.sesion_id
            where a.estudiante_id = e.id
          ),

          'notas', coalesce((
            select jsonb_agg(jsonb_build_object(
                     'evaluacion', ev.nombre,
                     'fecha',      ev.fecha,
                     'nota',       n.calificacion,
                     'comentario', n.comentario)
                   order by ev.fecha desc nulls last)
              from public.notas n
              join public.evaluaciones ev on ev.id = n.evaluacion_id
             where n.estudiante_id = e.id
          ), '[]'::jsonb),

          'pagos', (
            select jsonb_build_object(
              'pagado',     coalesce(sum(pg.monto) filter (where pg.estado = 'pagado'), 0),
              'por_cobrar', coalesce(sum(pg.monto) filter (where pg.estado in ('pendiente','procesando')), 0),
              'detalle',    coalesce(jsonb_agg(jsonb_build_object(
                              'concepto', pg.concepto, 'monto', pg.monto,
                              'moneda', pg.moneda, 'estado', pg.estado,
                              'fecha', pg.pagado_en)
                            order by pg.created_at desc) filter (where pg.id is not null), '[]'::jsonb)
            )
            from public.inscripciones i2
            left join public.pagos pg on pg.inscripcion_id = i2.id
            where i2.estudiante_id = e.id
          ),

          'proximas_clases', coalesce((
            select jsonb_agg(jsonb_build_object(
                     'fecha', s.fecha, 'tema', s.tema, 'contenido', s.contenido)
                   order by s.fecha)
              from public.sesiones s
             where s.curso_id = (select i3.curso_id from public.inscripciones i3
                                  where i3.estudiante_id = e.id
                                  order by i3.created_at desc limit 1)
               and s.fecha >= public.hoy_mexico()
             limit 3
          ), '[]'::jsonb)
        ) as hijo
        from public.tutorias t
        join public.profiles e on e.id = t.estudiante_id
        where t.representante_id = v_yo
      ) sub
    ), '[]'::jsonb)
  ) into v_resultado;

  return v_resultado;
end $$;

grant execute on function public.panel_representante() to authenticated;


-- ---------------------------------------------------------------------------
-- 5. Comprobación
-- ---------------------------------------------------------------------------

select
  p.nombre_completo                                   as estudiante,
  a.tipo,
  a.titulo,
  coalesce(to_char(a.desde,'DD/MM/YYYY'), 'desde ya') as aparece,
  coalesce(to_char(a.hasta,'DD/MM/YYYY'), 'sin caducidad') as hasta,
  case when public.aviso_vigente(a.desde, a.hasta) then 'Visible ahora' else 'Todavía no' end as estado
from public.avisos a
join public.profiles p on p.id = a.estudiante_id
order by p.nombre_completo, a.creado_en desc;
