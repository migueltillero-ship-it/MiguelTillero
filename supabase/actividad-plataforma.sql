-- ===========================================================================
-- TIEMPO EN LA PLATAFORMA
-- ===========================================================================
-- Cuánto usa cada estudiante la plataforma, para el informe a las familias y
-- para que el docente lo vea en su ficha. Hasta ahora no se medía: solo se
-- sabía cuándo se creó la cuenta.
--
-- CÓMO SE MIDE
-- Mientras el estudiante tiene una página abierta, a la vista y activa (mueve
-- el ratón, teclea, desliza), el navegador avisa cada minuto. Cada aviso suma
-- UN minuto, y el servidor no admite más de uno cada 50 segundos por persona:
-- dejar la pestaña abierta toda la noche no suma horas.
--
-- SEGURIDAD
--   · Nadie escribe en la tabla directamente: solo la función
--     registrar_actividad(), y solo suma para quien tiene sesión y es
--     estudiante. Un estudiante no puede sumarle minutos a otro, ni
--     ponerse los suyos a mano.
--   · Cada estudiante ve lo suyo, su representante vinculado ve lo de su
--     representado, y el docente o el admin ven todo.
--   · Un visitante sin cuenta no ve nada.
--
-- LÍMITES, DICHOS CLARO
--   · Cuenta desde que se instala esto: lo anterior no se puede recuperar.
--   · Mide tiempo con la página activa, no «tiempo estudiando». Quien lee en
--     papel con la plataforma abierta, puede quedarse corto o pasarse un poco.
--   · Tope de 600 minutos por día: más que eso no es una persona estudiando.
--
-- CÓMO USAR: pégalo entero. Es seguro repetirlo.
-- Dónde: https://supabase.com/dashboard/project/yfrdlzveleevkjqekdoq/sql/new
-- ===========================================================================

create table if not exists public.actividad_plataforma (
  estudiante_id uuid not null references public.profiles(id) on delete cascade,
  dia           date not null,
  minutos       integer not null default 0 check (minutos between 0 and 600),
  ultimo_aviso  timestamptz not null default now(),
  primary key (estudiante_id, dia)
);

alter table public.actividad_plataforma enable row level security;

drop policy if exists "actividad: cada quien ve la suya" on public.actividad_plataforma;
create policy "actividad: cada quien ve la suya" on public.actividad_plataforma
  for select to authenticated
  using (estudiante_id = auth.uid()
         or exists (select 1 from public.tutorias t
                     where t.estudiante_id = actividad_plataforma.estudiante_id
                       and t.representante_id = auth.uid())
         or public.es_docente() or public.es_admin());

-- Sin políticas de insert/update/delete a propósito: todo pasa por la función.
revoke all on public.actividad_plataforma from anon, authenticated;
grant select on public.actividad_plataforma to authenticated;

-- ---------------------------------------------------------------------------
-- Un minuto más para quien llama
-- ---------------------------------------------------------------------------
create or replace function public.registrar_actividad()
returns void
language plpgsql security definer set search_path = public
as $$
declare
  v_yo uuid := auth.uid();
  v_hoy date := public.hoy_mexico();
begin
  if v_yo is null then return; end if;
  -- Solo cuenta quien es estudiante: el tiempo del docente no es de nadie.
  if not exists (select 1 from public.profiles p where p.id = v_yo and p.role = 'estudiante') then
    return;
  end if;

  insert into public.actividad_plataforma (estudiante_id, dia, minutos, ultimo_aviso)
  values (v_yo, v_hoy, 1, now())
  on conflict (estudiante_id, dia) do update
     set minutos = least(600, actividad_plataforma.minutos + 1),
         ultimo_aviso = now()
   where actividad_plataforma.ultimo_aviso <= now() - interval '50 seconds';
end $$;

revoke all on function public.registrar_actividad() from public, anon;
grant execute on function public.registrar_actividad() to authenticated;

-- ---------------------------------------------------------------------------
-- Resumen para mostrar: total, días con uso, últimos 7 días y desde cuándo
-- ---------------------------------------------------------------------------
create or replace function public.resumen_actividad(p_estudiante uuid)
returns jsonb
language plpgsql stable security definer set search_path = public
as $$
declare
  v_yo uuid := auth.uid();
  v_hoy date := public.hoy_mexico();
begin
  if v_yo is null then raise exception 'SIN_SESION'; end if;
  if not (v_yo = p_estudiante
          or public.es_docente() or public.es_admin()
          or exists (select 1 from public.tutorias t
                      where t.estudiante_id = p_estudiante and t.representante_id = v_yo)) then
    raise exception 'SIN_PERMISO';
  end if;
  return public._resumen_actividad(p_estudiante, v_hoy);
end $$;

-- El cálculo en sí, sin comprobar quién llama: lo usan el resumen (ya
-- comprobado) y el boletín público (que se identifica por su token).
create or replace function public._resumen_actividad(p_estudiante uuid, p_hoy date)
returns jsonb
language sql stable security definer set search_path = public
as $$
  select jsonb_build_object(
    'minutos_total',   coalesce(sum(minutos), 0),
    'dias_con_uso',    count(*) filter (where minutos > 0),
    'minutos_7_dias',  coalesce(sum(minutos) filter (where dia > p_hoy - 7), 0),
    'desde',           min(dia))
  from public.actividad_plataforma where estudiante_id = p_estudiante;
$$;
revoke all on function public._resumen_actividad(uuid, date) from public, anon, authenticated;
revoke all on function public.resumen_actividad(uuid) from public, anon;
grant execute on function public.resumen_actividad(uuid) to authenticated;

-- ---------------------------------------------------------------------------
-- El boletín de la familia lo incluye: mismo contenido de siempre, más
-- «actividad» cuando el boletín está enlazado a una cuenta de estudiante.
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
      from public.boletin_notas n where n.boletin_id = b.id), '[]'::jsonb),
    'actividad', case when b.estudiante_id is null then null
                      else public._resumen_actividad(b.estudiante_id, public.hoy_mexico()) end)
  from public.boletines b
  where b.token = p_token;
$$;
revoke all on function public.ver_boletin(uuid) from public;
grant execute on function public.ver_boletin(uuid) to anon, authenticated;

select count(*) as filas from public.actividad_plataforma;
