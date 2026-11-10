-- ===========================================================================
-- «17 / 25» EN VEZ DE «17»: EL MÁXIMO DE CADA NOTA, PARA LA FAMILIA
-- ===========================================================================
-- El panel del representante enseñaba solo la cifra: un 17 de 25 se lee peor
-- que un 85 de 100 aunque sea mejor. Esta función da, para los representados
-- del que llama, sobre cuánto se califica cada evaluación con nota. Se añade
-- aparte para no tocar panel_representante(), que ya es larga y está repartida
-- en varios archivos. Mientras no exista, el panel muestra la cifra sola.
--
-- Seguridad: solo devuelve filas de los estudiantes vinculados a quien llama.
-- CÓMO USAR: pégalo entero. Es seguro repetirlo.
-- Dónde: https://supabase.com/dashboard/project/yfrdlzveleevkjqekdoq/sql/new
-- ===========================================================================
drop function if exists public.maximos_de_mis_representados();
create or replace function public.maximos_de_mis_representados(p_representante uuid default null)
returns table (nombre text, evaluacion text, maxima numeric)
language sql stable security definer set search_path = public
as $$
  select p.nombre_completo, ev.nombre, ev.nota_maxima
    from public.tutorias t
    join public.profiles p on p.id = t.estudiante_id
    join public.notas n on n.estudiante_id = p.id
    join public.evaluaciones ev on ev.id = n.evaluacion_id
   where t.representante_id = case when p_representante is not null and (public.es_docente() or public.es_admin())
                                   then p_representante else auth.uid() end;
$$;
revoke all on function public.maximos_de_mis_representados(uuid) from public, anon;
grant execute on function public.maximos_de_mis_representados(uuid) to authenticated;

select has_function_privilege('anon', 'public.maximos_de_mis_representados(uuid)', 'execute') as anon_puede,
       has_function_privilege('authenticated', 'public.maximos_de_mis_representados(uuid)', 'execute') as familias_si_pueden;
