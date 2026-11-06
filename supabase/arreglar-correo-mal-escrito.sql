-- ===========================================================================
-- UN CORREO MAL ESCRITO AL REGISTRARSE
-- ===========================================================================
-- Una estudiante se registró con el dominio mal tecleado: «@gmai.com» en vez
-- de «@gmail.com». Es un fallo que no avisa de nada y lo deja a uno fuera del
-- todo: el correo de confirmación sale hacia una dirección que no existe, la
-- cuenta se queda sin confirmar, y con una cuenta sin confirmar no se puede
-- entrar. Desde fuera parece que «la plataforma no funciona».
--
-- POR QUÉ NO BASTA CON CAMBIARLO EN UN SITIO
-- Supabase guarda el correo DOS veces: en auth.users y dentro de
-- auth.identities, que es contra lo que se valida al entrar. Si se cambia
-- solo el primero, la cuenta queda descuadrada y deja de funcionar del todo.
--
-- La dirección no se escribe aquí: se corrige solo el dominio, así que nadie
-- tiene que teclear el correo de una menor en ningún sitio.
--
-- CÓMO USAR: mira primero el bloque 1, que no cambia nada. Si lo que sale es
-- lo que esperas, ejecuta el 2. Es seguro repetirlo: la segunda vez no
-- encuentra nada que arreglar.
-- Dónde: Supabase → SQL Editor → New query → pegar → Run.
-- ===========================================================================


-- ---------------------------------------------------------------------------
-- 1) Antes de tocar nada: ¿a quién afecta?
-- ---------------------------------------------------------------------------

select p.nombre_completo as estudiante,
       left(u.email, 4) || '***@' || split_part(u.email, '@', 2) as como_esta,
       left(u.email, 4) || '***@gmail.com' as como_quedaria,
       u.email_confirmed_at is not null as confirmado,
       coalesce(to_char(u.last_sign_in_at, 'DD/MM/YYYY'), 'nunca') as ultimo_acceso
from auth.users u
join public.profiles p on p.id = u.id
where u.email like '%@gmai.com';


-- ---------------------------------------------------------------------------
-- 2) El arreglo
-- ---------------------------------------------------------------------------

do $$
declare
  v_cuantos integer;
begin
  -- Se para si hubiera alguien ya registrado con la dirección buena: dos
  -- cuentas con el mismo correo no pueden existir, y el error que daría
  -- Postgres no diría de quién se trata.
  if exists (
    select 1 from auth.users malo
     where malo.email like '%@gmai.com'
       and exists (select 1 from auth.users bueno
                    where bueno.email = replace(malo.email, '@gmai.com', '@gmail.com'))
  ) then
    raise exception 'Ya existe una cuenta con la dirección corregida. '
                    'Hay que decidir cuál se queda antes de tocar nada.';
  end if;

  update auth.users
     set email = replace(email, '@gmai.com', '@gmail.com'),
         -- Se da por confirmado: la confirmación original salió hacia una
         -- dirección inexistente y no va a llegar nunca. Sin esto, la cuenta
         -- sigue sin poder usarse aunque el correo ya esté bien.
         email_confirmed_at = coalesce(email_confirmed_at, now()),
         updated_at = now()
   where email like '%@gmai.com';
  get diagnostics v_cuantos = row_count;

  -- Y el mismo correo dentro de la identidad, que es contra lo que se valida
  -- al entrar. Este es el paso que se olvida.
  update auth.identities
     set identity_data = jsonb_set(identity_data, '{email}',
                           to_jsonb(replace(identity_data->>'email', '@gmai.com', '@gmail.com'))),
         updated_at = now()
   where identity_data->>'email' like '%@gmai.com';

  raise notice 'Corregidas % cuenta(s). Ahora mándale el correo para que ponga '
               'contraseña: Authentication → Users → los tres puntos → '
               'Send password recovery.', v_cuantos;
end $$;


-- ---------------------------------------------------------------------------
-- 3) Comprobación: los dos sitios tienen que decir lo mismo
-- ---------------------------------------------------------------------------

select p.nombre_completo as estudiante,
       left(u.email, 4) || '***@' || split_part(u.email, '@', 2) as en_la_cuenta,
       left(i.identity_data->>'email', 4) || '***@'
         || split_part(i.identity_data->>'email', '@', 2) as en_la_identidad,
       u.email = i.identity_data->>'email' as cuadran,
       u.email_confirmed_at is not null as confirmado
from auth.users u
join auth.identities i on i.user_id = u.id
join public.profiles p on p.id = u.id
where p.nombre_completo ilike '%melissa%';
