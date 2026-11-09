-- ===========================================================================
-- OPINIONES DE FIN DE CICLO (estudiantes y familias)
-- ===========================================================================
-- Un espacio para que cada estudiante, y cada madre o padre, cuente cómo vivió
-- el ciclo: qué le gustó, qué no, qué mejoraría, y elegir su momento favorito
-- de la clase. Es una sola respuesta por persona y ciclo, que se puede corregir.
--
-- Quién ve qué:
--  · cada persona ve y cambia SOLO lo suyo;
--  · el docente lo ve todo;
--  · el resto del grupo solo ve cuántos votos tuvo cada momento favorito
--    (conteos, nunca nombres ni textos).
--
-- El campo «rol» no lo manda el navegador: lo pone la base según la cuenta, para
-- que nadie se haga pasar por otra cosa. Solo estudiantes y representantes
-- pueden responder.
--
-- CÓMO USAR: Supabase → SQL Editor → New query → pegar → Run. Es seguro repetirlo.
-- https://supabase.com/dashboard/project/yfrdlzveleevkjqekdoq/sql/new
-- ===========================================================================

create table if not exists public.opiniones (
  id             uuid primary key default gen_random_uuid(),
  autor_id       uuid not null default auth.uid() references public.profiles(id),
  ciclo          text not null default 'A1-OCT2026',
  rol            text not null default 'estudiante' check (rol in ('estudiante','representante')),
  valoracion     int  check (valoracion between 1 and 5),   -- cómo fue el ciclo, de 1 a 5
  momento        text,                                      -- su momento favorito de la clase
  gusto          text,                                      -- qué le gustó
  no_gusto       text,                                      -- qué no le gustó
  mejorar        text,                                      -- qué cree que se puede mejorar
  seguir         text check (seguir in ('si','quiza','aun-no')),
  creado_en      timestamptz not null default now(),
  actualizado_en timestamptz not null default now(),
  unique (autor_id, ciclo)
);
alter table public.opiniones enable row level security;

-- El rol sale de la cuenta, no del formulario.
create or replace function public.tr_opinion_rol()
returns trigger language plpgsql security definer set search_path = public as $$
declare v_rol text;
begin
  select role into v_rol from profiles where id = auth.uid();
  if v_rol not in ('estudiante','representante') then
    raise exception 'Este espacio es para estudiantes y familias.';
  end if;
  new.autor_id := auth.uid();
  new.rol := v_rol;
  new.actualizado_en := now();
  return new;
end $$;

create or replace trigger trg_opinion_rol
  before insert or update on public.opiniones
  for each row execute function public.tr_opinion_rol();

do $$ begin
  if not exists (select 1 from pg_policies where tablename='opiniones' and policyname='opiniones: cada quien ve la suya') then
    create policy "opiniones: cada quien ve la suya" on public.opiniones
      for select to authenticated using (autor_id = auth.uid() or public.es_docente());
  end if;
  if not exists (select 1 from pg_policies where tablename='opiniones' and policyname='opiniones: cada quien envía la suya') then
    create policy "opiniones: cada quien envía la suya" on public.opiniones
      for insert to authenticated with check (autor_id = auth.uid());
  end if;
  if not exists (select 1 from pg_policies where tablename='opiniones' and policyname='opiniones: cada quien corrige la suya') then
    create policy "opiniones: cada quien corrige la suya" on public.opiniones
      for update to authenticated using (autor_id = auth.uid()) with check (autor_id = auth.uid());
  end if;
end $$;

-- Lo único que ve el grupo: cuántos votos tuvo cada momento. Sin nombres.
create or replace function public.votos_momento(p_ciclo text default 'A1-OCT2026')
returns table(momento text, votos bigint)
language sql security definer set search_path = public as $$
  select o.momento, count(*) from opiniones o
   where o.ciclo = p_ciclo and o.momento is not null
   group by o.momento order by count(*) desc;
$$;
grant execute on function public.votos_momento(text) to authenticated;
