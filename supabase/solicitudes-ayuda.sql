-- ===========================================================================
-- PEDIR AYUDA A MIGUEL
-- ===========================================================================
-- Si un estudiante se atasca un domingo por la noche, hoy no tiene dónde
-- decirlo: o espera a la siguiente clase, o escribe por WhatsApp en medio de
-- todo lo demás, donde se pierde. Esto le da un sitio concreto: un tema, lo
-- que no entiende, y una respuesta tuya que le espera en su espacio.
--
-- Del lado del docente aparece en «Hoy», con lo que está sin atender arriba.
--
-- SEGURIDAD
--   · El estudiante solo puede crear solicitudes a su nombre, y solo ve las
--     suyas. No hay forma de leer las de otro.
--   · Solo el docente puede responder o cambiar el estado.
--   · Hay un tope de solicitudes abiertas por persona. Sin él, un chat de
--     «ayuda» es un buzón sin fondo que cualquiera puede llenar, y lo
--     importante se pierde entre lo que no lo es.
--
-- CÓMO USAR: pégalo entero. Es seguro repetirlo.
-- Dónde: Supabase → SQL Editor → New query → pegar → Run.
-- ===========================================================================

create table if not exists public.solicitudes_ayuda (
  id            uuid primary key default gen_random_uuid(),
  estudiante_id uuid not null references public.profiles(id) on delete cascade,
  tema          text not null check (char_length(btrim(tema)) between 3 and 120),
  detalle       text check (detalle is null or char_length(detalle) <= 1500),
  estado        text not null default 'abierta'
                check (estado in ('abierta', 'respondida', 'cerrada')),
  creada_en     timestamptz not null default now(),
  respuesta     text check (respuesta is null or char_length(respuesta) <= 3000),
  respondida_en timestamptz
);

create index if not exists solicitudes_ayuda_pendientes
  on public.solicitudes_ayuda (estado, creada_en);
create index if not exists solicitudes_ayuda_por_estudiante
  on public.solicitudes_ayuda (estudiante_id, creada_en desc);

alter table public.solicitudes_ayuda enable row level security;

drop policy if exists "ayuda: el estudiante pide la suya" on public.solicitudes_ayuda;
create policy "ayuda: el estudiante pide la suya" on public.solicitudes_ayuda
  for insert to authenticated
  with check (estudiante_id = auth.uid()
              and estado = 'abierta' and respuesta is null and respondida_en is null);

drop policy if exists "ayuda: cada quien ve lo suyo, el docente todo" on public.solicitudes_ayuda;
create policy "ayuda: cada quien ve lo suyo, el docente todo" on public.solicitudes_ayuda
  for select to authenticated
  using (estudiante_id = auth.uid() or public.es_docente() or public.es_admin());

drop policy if exists "ayuda: solo el docente responde" on public.solicitudes_ayuda;
create policy "ayuda: solo el docente responde" on public.solicitudes_ayuda
  for update to authenticated
  using (public.es_docente() or public.es_admin())
  with check (public.es_docente() or public.es_admin());

drop policy if exists "ayuda: solo el docente borra" on public.solicitudes_ayuda;
create policy "ayuda: solo el docente borra" on public.solicitudes_ayuda
  for delete to authenticated
  using (public.es_docente() or public.es_admin());

revoke all on public.solicitudes_ayuda from anon;
grant select, insert, update, delete on public.solicitudes_ayuda to authenticated;


-- El tope de solicitudes abiertas. Se hace con un disparador y no con una
-- política porque una política no puede contar filas de su propia tabla sin
-- caer en recursión, y un CHECK no ve otras filas.
create or replace function public.limitar_solicitudes_ayuda()
returns trigger language plpgsql as $$
begin
  if (select count(*) from public.solicitudes_ayuda
       where estudiante_id = new.estudiante_id and estado = 'abierta') >= 5 then
    raise exception 'Ya tienes 5 peticiones de ayuda sin responder. Espera a que Miguel conteste alguna antes de enviar otra.'
      using errcode = 'P0001';
  end if;
  return new;
end $$;

drop trigger if exists limitar_solicitudes_ayuda on public.solicitudes_ayuda;
create trigger limitar_solicitudes_ayuda
  before insert on public.solicitudes_ayuda
  for each row execute function public.limitar_solicitudes_ayuda();


-- ---------------------------------------------------------------------------
-- Comprobación
-- ---------------------------------------------------------------------------
select count(*) as solicitudes,
       count(*) filter (where estado = 'abierta') as sin_atender
from public.solicitudes_ayuda;
