-- ===========================================================================
-- ETAPAS DE UN PROSPECTO
-- ===========================================================================
-- «Atendido sí o no» no dice nada útil. Entre que alguien llena el formulario
-- y que empieza a dar clases hay un recorrido con pasos que importan, y hay
-- que saber en cuál está cada persona:
--
--   nuevo        acaba de llegar, nadie lo ha mirado
--   validado     revisé su propuesta de horario y me cuadra
--   contrato     le envié su acuerdo y está esperando que lo firme
--   firmado      ya lo aceptó
--   pagado       mandó el comprobante y lo di por bueno
--   descartado   no sigue adelante
--
-- Lo que antes era «atendido = true» pasa a «validado»: era lo único que
-- podía significar.
--
-- CÓMO USAR: Supabase → SQL Editor → New query → pegar → Run.
-- Es seguro repetirlo.
-- ===========================================================================

alter table public.prospectos
  add column if not exists estado text not null default 'nuevo',
  -- Cuando el prospecto se convierte en alumno, aquí queda el enlace a su
  -- contratación: así se sabe de dónde salió cada acuerdo.
  add column if not exists contratacion_id uuid references public.contrataciones(id) on delete set null,
  -- Cuándo se le avisó por WhatsApp de que su horario quedó validado. Sirve
  -- para no escribirle dos veces y para saber cuánto lleva esperando.
  add column if not exists avisado_en timestamptz;

update public.prospectos
   set estado = case when atendido then 'validado' else 'nuevo' end
 where estado = 'nuevo' and atendido is not null and atendido;

alter table public.prospectos drop constraint if exists prospectos_estado_check;
alter table public.prospectos add constraint prospectos_estado_check
  check (estado in ('nuevo','validado','contrato','firmado','pagado','descartado'));

create index if not exists idx_prospectos_estado on public.prospectos(estado, creado_en desc);

comment on column public.prospectos.estado is
  'Dónde está la persona en el recorrido: nuevo → validado → contrato → '
  'firmado → pagado. «descartado» para quien no sigue.';

-- «atendido» se queda, sincronizada, para no romper nada que aún la lea.
create or replace function public.prospectos_sincronizar_atendido()
returns trigger language plpgsql as $$
begin
  new.atendido := new.estado <> 'nuevo';
  return new;
end;
$$;
drop trigger if exists trg_prospectos_atendido on public.prospectos;
create trigger trg_prospectos_atendido
  before insert or update of estado on public.prospectos
  for each row execute function public.prospectos_sincronizar_atendido();


-- Lo que falta por hacer, lo más antiguo primero: quien lleva más tiempo
-- esperando es quien más riesgo tiene de perderse.
create or replace view public.v_prospectos_pendientes as
  select id, estado, origen, nombre, email, telefono, ciudad, respuestas,
         creado_en, avisado_en, contratacion_id,
         extract(day from now() - creado_en)::int as dias_esperando
    from public.prospectos
   where estado not in ('pagado','descartado')
   order by creado_en;
