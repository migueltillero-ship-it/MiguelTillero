-- ============================================================================
-- PANEL DEL REPRESENTANTE: ENLACE DE LA CLASE (ZOOM)
--
-- El representante, ya con su sesión iniciada, ve en el panel de cada estudiante
-- el botón «Entrar a la clase». El enlace NO está en ningún archivo del sitio:
-- sale de la tabla protegida grupo_enlaces, y solo se entrega cuando la
-- inscripción de ese estudiante está activa (o finalizada). Quien no tiene la
-- sesión del representante, o tiene la inscripción pendiente, no lo recibe.
--
-- CÓMO USAR: ejecútalo en el editor de Supabase DESPUÉS de
-- representante-y-enlaces.sql y representantes-acceso.sql. Es seguro repetirlo.
-- ============================================================================

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

          'curso', (
            select jsonb_build_object(
              'nombre',   c.nombre,
              'grupo',    g.codigo,
              'horario',  g.horario,
              'modalidad',g.modalidad,
              'inicio',   g.fecha_inicio,
              'fin',      g.fecha_fin,
              'estado_inscripcion', i.estado,
              -- El enlace de la clase solo sale con la inscripción activa (igual que en
              -- el panel del estudiante: política «enlaces: solo inscripciones activas»).
              'enlace_zoom', case when i.estado in ('activa', 'finalizada')
                                  then (select ge.enlace_zoom from public.grupo_enlaces ge
                                         where ge.grupo_id = i.grupo_id)
                             end
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
