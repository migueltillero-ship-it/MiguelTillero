-- ===========================================================================
-- EXAMEN SIN LÍMITE DE TIEMPO: LO CIERRA EL PROFESOR CUANDO DECIDE
-- ===========================================================================
-- Hasta ahora cada intento tenía un reloj (duracion_min) y, al agotarse, la página enviaba sola
-- y el servidor ya no aceptaba cambios. Para una evaluación individual en Zoom, con el profesor
-- presente, es más natural lo contrario: sin reloj para el estudiante, y el profesor cierra
-- cuando todos han terminado.
--
-- CÓMO SE LOGRA, SIN TOCAR LO QUE YA FUNCIONA
--   1. La duración del examen se sube a 720 minutos (12 h): el «límite» de cada intento queda
--      tan lejos que nunca llega. La página, al verlo, esconde el reloj.
--   2. Para cerrar se usa `cierra_en`: cuando es una hora pasada, ningún estudiante nuevo puede
--      empezar, y las páginas de quienes ya están dentro lo detectan (examen_estado, cada 20 s),
--      envían sus respuestas y muestran el recibo. Se califica lo último guardado.
--   3. Si alguien no responde (se quedó sin internet, cerró la computadora), `cerrar_examen(.., true)`
--      cierra además todos los intentos que sigan en curso, con lo último que hubieran guardado.
--
-- CÓMO USAR (SQL Editor: https://supabase.com/dashboard/project/yfrdlzveleevkjqekdoq/sql/new)
--   Abrir:   update examenes set abierto = true, cierra_en = null where id = 'b2-cierre-questions-de-gout';
--   Cerrar:  select public.cerrar_examen('b2-cierre-questions-de-gout');
--   Cerrar y forzar a los rezagados:
--            select public.cerrar_examen('b2-cierre-questions-de-gout', true);
-- Es seguro repetirlo.
-- ===========================================================================

update public.examenes set duracion_min = 720 where id = 'b2-cierre-questions-de-gout';

-- La página del estudiante pregunta cada 20 s si el profesor ya cerró.
create or replace function public.examen_estado(p_id uuid, p_token uuid)
returns jsonb language plpgsql security definer set search_path = public as $$
declare it public.examenes_intentos; ex public.examenes;
begin
  select * into it from public.examenes_intentos where id = p_id and token = p_token;
  if not found then raise exception 'INTENTO_INVALIDO'; end if;
  select * into ex from public.examenes where id = it.examen_id;
  return jsonb_build_object(
    'cerrado', (ex.cierra_en is not null and now() >= ex.cierra_en) or it.estado <> 'en_curso',
    'estado', it.estado, 'ahora', now());
end $$;
revoke all on function public.examen_estado(uuid, uuid) from public;
grant execute on function public.examen_estado(uuid, uuid) to anon, authenticated;

-- El profesor cierra la evaluación.
create or replace function public.cerrar_examen(p_examen text, p_forzar boolean default false)
returns jsonb language plpgsql security definer set search_path = public as $$
declare v_en_curso int; v_forzados int := 0; it record;
begin
  if not (public.es_admin() or public.es_docente()
          or coalesce(nullif(current_setting('role', true), 'none'), session_user) in ('postgres','service_role','supabase_admin')) then
    raise exception 'Solo el docente puede cerrar la evaluación.';
  end if;
  if not exists (select 1 from public.examenes where id = p_examen) then raise exception 'EXAMEN_NO_EXISTE'; end if;

  update public.examenes set abierto = false, cierra_en = now() where id = p_examen;

  if p_forzar then
    for it in select id, examen_id, respuestas from public.examenes_intentos where examen_id = p_examen and estado = 'en_curso' loop
      update public.examenes_intentos set
        estado = 'cerrado_docente', enviado_en = coalesce(enviado_en, now()),
        motivo_envio = coalesce(motivo_envio, 'cerrado_por_docente'),
        puntaje_auto = public._examen_calificar(it.examen_id, it.respuestas)
      where id = it.id;
      v_forzados := v_forzados + 1;
    end loop;
  end if;

  select count(*) into v_en_curso from public.examenes_intentos where examen_id = p_examen and estado = 'en_curso';
  return jsonb_build_object('cerrado', true, 'siguen_en_curso', v_en_curso, 'forzados', v_forzados,
    'nota', case when v_en_curso > 0 then 'Sus páginas enviarán solas en menos de 20 s; si alguno no responde, repite con true.' else 'Todos los intentos están cerrados.' end);
end $$;
revoke all on function public.cerrar_examen(text, boolean) from public, anon;
grant execute on function public.cerrar_examen(text, boolean) to authenticated;
