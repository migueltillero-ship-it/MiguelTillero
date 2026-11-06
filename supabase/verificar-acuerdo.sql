-- Verificación pública de un acuerdo firmado (el QR del contrato apunta aquí).
-- Solo confirma que existe y fue firmado; no revela cláusulas, cifras ni datos
-- de contacto. El código son los 12 primeros caracteres del id del contrato:
-- sin él no se puede consultar un número por simple adivinanza (CA-2026-000N).
create or replace function public.verificar_acuerdo(p_numero text, p_codigo text)
returns table(numero text, firmante text, firmado_en timestamptz, reglamento_en timestamptz)
language sql security definer set search_path = public as $$
  select c.numero, c.aceptado_nombre, c.aceptado_en, c.reglamento_aceptado_en
  from contratos c
  where c.numero = p_numero
    and length(p_codigo) >= 12
    and left(replace(c.id::text,'-',''), 12) = lower(p_codigo)
    and c.aceptado_en is not null;
$$;
grant execute on function public.verificar_acuerdo(text,text) to anon, authenticated;
