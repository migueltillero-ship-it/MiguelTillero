# Pagos con Stripe — puesta en marcha (modo de prueba)

Ya tengo tu clave **publicable** de prueba, pero en este tipo de integración
—Stripe Checkout, con redirección— esa clave no se usa en ningún archivo: solo
hace falta la clave **secreta**, y esa la vas a pegar tú mismo, directo en tu
terminal, sin que pase por este chat.

Ya preparé y dejé en el repositorio:
- `supabase/functions/crear-checkout/` — genera el enlace de pago cuando pulsas
  "Cobrar con Stripe" en **admin.html → Finanzas**.
- `supabase/functions/stripe-webhook/` — Stripe le avisa a esta función cuando
  el estudiante ya pagó, y ella marca el pago como `pagado` en tu base.
- Un botón nuevo en la tabla de pagos: **Cobrar con Stripe** (genera el enlace)
  y **Copiar enlace** (una vez generado), para que se lo mandes al estudiante
  por WhatsApp.

Lo que sigue lo tienes que hacer tú, porque necesita tu cuenta de Stripe y tu
sesión de Supabase — yo no tengo acceso a ninguna de las dos.

---

## Paso 1 · Instalar la herramienta de línea de comandos de Supabase

Abre PowerShell y pega:

```powershell
winget install Supabase.CLI
```

Cierra y vuelve a abrir PowerShell después de instalarlo.

---

## Paso 2 · Iniciar sesión y enlazar tu proyecto

Desde la carpeta del repositorio (`MiguelTillero`):

```powershell
supabase login
```

Se abre el navegador — inicia sesión con tu cuenta de Supabase, la misma con
la que entras al panel.

```powershell
supabase link --project-ref yfrdlzveleevkjqekdoq
```

---

## Paso 3 · Publicar las dos funciones

```powershell
supabase functions deploy crear-checkout
supabase functions deploy stripe-webhook --no-verify-jwt
```

El `--no-verify-jwt` en la segunda es obligatorio: a esa función la llama
Stripe, no un usuario con sesión, así que no tiene un token de Supabase que
verificar.

---

## Paso 4 · Guardar tu clave secreta de Stripe

1. Ve a **https://dashboard.stripe.com/test/apikeys** (asegúrate de que arriba
   a la derecha diga **"Modo de prueba"**).
2. Copia la que dice **Clave secreta**, empieza con `sk_test_...`.
3. Pégala en este comando, **reemplazando** `sk_test_TU_CLAVE` por la tuya —
   esto se queda en tu computadora, no me lo mandes a mí:

```powershell
supabase secrets set STRIPE_SECRET_KEY=sk_test_TU_CLAVE SITE_URL=https://migueltillero-ship-it.github.io/MiguelTillero
```

---

## Paso 5 · Conectar el webhook (para que un pago se marque solo)

1. Ve a **https://dashboard.stripe.com/test/webhooks** → **Add endpoint**.
2. **Endpoint URL**:
   ```
   https://yfrdlzveleevkjqekdoq.supabase.co/functions/v1/stripe-webhook
   ```
3. En **Select events**, marca estos tres:
   - `checkout.session.completed`
   - `payment_intent.payment_failed`
   - `charge.refunded`
4. **Add endpoint**. En la página del webhook que se crea, haz clic en
   **"Reveal"** junto a **Signing secret** — empieza con `whsec_...`.
5. Pégalo aquí, reemplazando `whsec_TU_CLAVE`:

```powershell
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_TU_CLAVE
```

---

## Paso 6 · Probarlo con una tarjeta de prueba

1. Entra a **admin.html → Finanzas**, registra un pago de prueba (o usa uno
   existente en estado *pendiente*).
2. Pulsa **Cobrar con Stripe**. Se genera el enlace y queda copiado.
3. Ábrelo (o mándatelo a ti mismo) y paga con la tarjeta de prueba de Stripe:
   - Número: `4242 4242 4242 4242`
   - Fecha: cualquier fecha futura
   - CVC: cualquier 3 dígitos
4. El pago debe quedar en estado **pagado** en la tabla, sin que tengas que
   tocar nada — eso confirma que el webhook funciona.

**Nunca** uses una tarjeta real hasta que cambies `sk_test_`/`whsec_` de
prueba por las de producción (`sk_live_`/el webhook de producción), y hazlo
solo cuando hayas probado esto a fondo.

---

## Si algo falla

- **"Solo el administrador puede generar un cobro"** → entraste con la cuenta
  docente o estudiante, no con `migueltillero@gmail.com`.
- **El botón dice "Stripe: ..." con un error** → revisa que
  `STRIPE_SECRET_KEY` sea la de **prueba** y que no le sobren espacios al
  pegarla.
- **El pago se queda en "procesando" después de pagar** → revisa que el
  webhook esté conectado (paso 5) y que el `STRIPE_WEBHOOK_SECRET` sea
  correcto; en Stripe, la página del webhook muestra el historial de intentos
  y el error exacto si algo no llegó.
