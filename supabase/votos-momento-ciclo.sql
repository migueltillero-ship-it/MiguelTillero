-- ===========================================================================
-- VOTOS DEL «MOMENTO FAVORITO» DE LA CLASE (espacio de opinión)
-- ===========================================================================
-- La página opinion.html pide esta función para enseñar cuántas personas eligieron
-- cada momento favorito. No existía: la barra de votos nunca mostraba nada y
-- siempre decía «Eres de las primeras personas en responder».
--
-- Solo devuelve CONTEOS (momento y votos), nunca nombres ni textos. Como el
-- espacio de opinión no pide cuenta, se abre también a visitantes (anon).
--
-- CÓMO USAR: pégalo entero. Es seguro repetirlo.
-- Dónde: https://supabase.com/dashboard/project/yfrdlzveleevkjqekdoq/sql/new
-- ===========================================================================
create or replace function public.votos_momento_ciclo(p_ciclo text default 'A1-OCT2026')
returns table (momento text, votos bigint)
language sql stable security definer set search_path = public
as $$
  select o.momento, count(*)::bigint as votos
    from public.opiniones_ciclo o
   where o.ciclo = p_ciclo and o.momento is not null and btrim(o.momento) <> ''
   group by o.momento
   order by count(*) desc, o.momento;
$$;
revoke all on function public.votos_momento_ciclo(text) from public;
grant execute on function public.votos_momento_ciclo(text) to anon, authenticated;

select has_function_privilege('anon', 'public.votos_momento_ciclo(text)', 'execute') as anon_la_usa;
