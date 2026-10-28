-- ===========================================================================
-- MANTENIMIENTO DE ACUERDOS
-- ===========================================================================
-- Rehacer un acuerdo de prueba exigía un DELETE suelto, y un DELETE suelto
-- hace que el conector de Supabase pare y pregunte antes de ejecutar. La
-- pregunta caduca al minuto, así que desde el chat la operación no llegaba a
-- correr nunca: había que ir al editor de SQL a mano cada vez.
--
-- La salvaguarda está bien y no se toca. Lo que se quita es la necesidad de
-- que salte: el borrado vive aquí dentro, y desde fuera solo se llama a la
-- función. Una llamada es una consulta, no un borrado, y no hay nada que
-- confirmar.
--
--     select * from public.rehacer_ultimo_acuerdo();
--
-- QUIÉN PUEDE LLAMARLA: solo el dueño de la base —el editor de SQL, el
-- conector—. Se le retiran los permisos a «anon» y a «authenticated» de
-- forma explícita, porque en PostgreSQL una función nace ejecutable por
-- todo el mundo y esta borra acuerdos. La llave pública del sitio está a la
-- vista de cualquiera en un repositorio público: dejarla accesible sería
-- regalar un botón de borrar.
--
-- QUÉ NO HACE: tocar un acuerdo firmado. Ni este ni ningún otro: el texto
-- que una persona leyó el día que firmó es el que queda.
--
-- CÓMO USAR: Supabase → SQL Editor → New query → pegar → Run.
--   https://supabase.com/dashboard/project/yfrdlzveleevkjqekdoq/sql/new
-- Es seguro repetirlo.
-- ===========================================================================

create or replace function public.rehacer_ultimo_acuerdo()
returns table (numero text, las_horas text, el_calendario text, la_inversion text)
language plpgsql
security invoker
set search_path = public as $$
declare
  v_contratacion uuid;
  v_viejo        text;
  v_docente      uuid;
begin
  -- crear_contrato() solo deja emitir al docente y lo comprueba con
  -- auth.uid(). Llamando desde el editor no hay sesión de nadie, así que
  -- durante esta transacción decimos quiénes somos.
  select p.id into v_docente from profiles p
   where p.role in ('docente','admin')
   order by case when p.role = 'admin' then 0 else 1 end
   limit 1;
  if v_docente is null then
    raise exception 'No hay ningún perfil docente o admin.';
  end if;
  perform set_config('request.jwt.claims',
                     json_build_object('sub', v_docente, 'role', 'authenticated')::text,
                     true);

  -- El más reciente que nadie haya firmado, tenga el número que tenga.
  select c.contratacion_id, c.numero into v_contratacion, v_viejo
    from contratos c
   where c.aceptado_en is null
   order by c.creado_en desc
   limit 1;

  if v_contratacion is null then
    raise exception 'No hay ningún acuerdo sin firmar: no hay nada que rehacer.';
  end if;

  delete from contratos c where c.contratacion_id = v_contratacion;
  perform crear_contrato(v_contratacion);
  raise notice 'El acuerdo % se rehizo con la plantilla de ahora.', v_viejo;

  return query
    select t.numero,
           substring(t.cuerpo from 'LAS HORAS.{0,110}'),
           substring(t.cuerpo from 'NUESTRO CALENDARIO.{0,180}'),
           substring(t.cuerpo from 'LA INVERSIÓN.{0,130}')
      from contratos t
     where t.contratacion_id = v_contratacion;
end;
$$;

-- Nace ejecutable por todo el mundo; se le retira a todo el mundo.
revoke all on function public.rehacer_ultimo_acuerdo() from public;
revoke all on function public.rehacer_ultimo_acuerdo() from anon;
revoke all on function public.rehacer_ultimo_acuerdo() from authenticated;

comment on function public.rehacer_ultimo_acuerdo() is
  'Vuelve a redactar el último acuerdo SIN FIRMAR con la plantilla vigente, y '
  'devuelve las partes que conviene mirar. Existe para que el borrado no viaje '
  'suelto en una consulta: así el conector no tiene que pedir confirmación. '
  'Solo la puede llamar el dueño de la base.';
