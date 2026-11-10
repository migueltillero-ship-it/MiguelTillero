-- ===========================================================================
-- AVISO: «entra siempre con tu cuenta»
-- ===========================================================================
-- Quien hace los ejercicios SIN iniciar sesión los hace de verdad, pero para la
-- plataforma es como si no hubiera hecho nada: el avance se queda en su
-- navegador y el profesor no lo ve ni cuenta para la nota. Este aviso se lo
-- recuerda en su espacio. Es seguro repetirlo: reemplaza el anterior.
--
-- CÓMO USAR: cambia SOLO la lista de nombres de abajo (nombre o un trozo del
-- nombre; no se escribe aquí porque este repositorio es público y los
-- estudiantes son menores) y ejecuta.
-- Dónde: https://supabase.com/dashboard/project/yfrdlzveleevkjqekdoq/sql/new
-- ===========================================================================
do $$
declare
  -- ── CAMBIA SOLO ESTA LÍNEA ─────────────────────────────────────────────
  v_a_quien text[] := array['Nombre o trozo de nombre'];
  -- ───────────────────────────────────────────────────────────────────────
  v_titulo constant text := 'Entra siempre con tu cuenta';
  v_sin_pareja text;
  v_n integer := 0;
  r record;
begin
  select string_agg(x, ', ') into v_sin_pareja from unnest(v_a_quien) x
   where not exists (select 1 from public.profiles p where p.nombre_completo ilike '%' || x || '%');
  if v_sin_pareja is not null then
    raise exception 'No hay ningún estudiante que se llame así: %. Revisa cómo lo has escrito.', v_sin_pareja;
  end if;

  delete from public.avisos where titulo = v_titulo
     and estudiante_id in (select p.id from public.profiles p
                            where exists (select 1 from unnest(v_a_quien) x where p.nombre_completo ilike '%' || x || '%'));

  for r in select p.id from public.profiles p
            where exists (select 1 from unnest(v_a_quien) x where p.nombre_completo ilike '%' || x || '%')
  loop
    insert into public.avisos (estudiante_id, titulo, mensaje, tipo, desde, hasta)
    values (r.id, v_titulo,
      'Una cosa que te ayuda: antes de empezar cualquier ejercicio, entra con tu cuenta.' || E'\n\n'
      || 'Si entras sin cuenta, lo que resuelves se queda solo en tu navegador: yo no lo veo y no cuenta para tu avance ni para tu nota, aunque lo hayas hecho muy bien.' || E'\n\n'
      || 'Con tu cuenta, cada ejercicio se guarda solo y además se mide el tiempo que le dedicas, para que en tu informe se vea todo tu trabajo.' || E'\n\n'
      || 'Gracias por mandarme tus capturas: así pude ver lo que hiciste. Para la próxima ya no hará falta.',
      'aviso', null::date, current_date + 45);
    v_n := v_n + 1;
  end loop;
  raise notice 'Aviso puesto a % estudiante(s).', v_n;
end $$;

select p.nombre_completo as estudiante, a.titulo, to_char(a.hasta, 'DD/MM/YYYY') as visible_hasta
from public.avisos a join public.profiles p on p.id = a.estudiante_id
where a.titulo = 'Entra siempre con tu cuenta' order by 1;
