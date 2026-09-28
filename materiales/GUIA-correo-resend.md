# Conectar tu propio correo (Resend + Supabase)

Para que los correos de la plataforma —verificación de cuenta, recuperación de
contraseña, recordatorios— salgan **de tu dominio** en lugar del remitente de
prueba de Supabase.

**Por qué importa:** el remitente de prueba de Supabase tiene un límite bajo de
correos por hora, está pensado solo para desarrollo, y como lo comparten miles
de proyectos, **los filtros de spam lo tratan con desconfianza**. Si un
representante no encuentra el correo de verificación, su hijo no activa la
cuenta. Con Resend el correo sale de `hola@tudominio.com`, firmado, y llega a
bandeja de entrada.

**Tiempo:** 20-30 minutos, casi todo esperando a que el DNS propague.

---

## Antes de empezar: el requisito que no se puede saltar

Resend —como cualquier servicio serio de correo— **solo te deja mandar correos
a otras personas desde un dominio que puedas demostrar que es tuyo.**

Comprobé el DNS de `migueltillero.com` y **no responde**: no tiene servidores
de nombres configurados. Eso significa una de dos:

- **No lo tienes registrado todavía** (lo más probable), o
- lo tienes comprado pero sin configurar nada.

Así que el primer paso depende de tu situación:

| Tu situación | Qué hacer |
|---|---|
| **Ya tengo un dominio** (cualquiera, aunque no sea `migueltillero.com`) | Salta al **Paso 1**. Usa ese. |
| **No tengo dominio** | Cómpralo primero — ver el recuadro de abajo. Son 10-15 USD al año. |
| **No quiero comprar dominio ahora** | Entonces Resend no te sirve todavía. Usa **`GUIA-correo-gmail.md`**: el mismo resultado hoy, sin comprar nada. |

> ### Comprar el dominio (recomendado, y no solo por el correo)
>
> Ya pusiste `migueltillero.com` en la infografía, así que la decisión estaba
> medio tomada. Comprarlo te da **dos cosas de golpe**:
>
> 1. El correo profesional que necesitas ahora.
> 2. Una dirección decente para la plataforma —
>    `migueltillero.com` en lugar de
>    `migueltillero-ship-it.github.io/MiguelTillero/` — que puedo conectar a
>    GitHub Pages en cinco minutos, sin tocar nada del contenido.
>
> **Dónde:** [Cloudflare Registrar](https://dash.cloudflare.com) (lo vende a
> precio de costo, ~10 USD/año, y el DNS viene incluido y es el más fácil de
> configurar), [Porkbun](https://porkbun.com) o
> [Namecheap](https://www.namecheap.com). Evita GoDaddy: es más caro en la
> renovación y el panel de DNS es un laberinto.
>
> **Ojo con el tiempo:** la clase arranca el martes 29. Un dominio se compra en
> 10 minutos y suele estar activo en menos de una hora, pero si lo dejas para el
> lunes vas apretado. **Si no te da tiempo, manda los mensajes ya con el aviso
> del spam** (el texto que está en `mensaje-whatsapp-ciclo-a1-oct2026.md` ya lo
> incluye) y conectamos Resend la semana que viene, sin prisa.

---

## Paso 1 · Crear la cuenta de Resend

1. Entra a **https://resend.com/signup**
2. Regístrate con `migueltillero@gmail.com` (o con GitHub, es más rápido).
3. Confirma el correo que te llega.

El plan gratuito da **3.000 correos al mes y 100 al día**. Con tres estudiantes
vas a usar unos 20 al mes. No vas a pagar nada.

---

## Paso 2 · Añadir y verificar tu dominio

1. En el menú de la izquierda: **Domains** → botón **Add Domain**.
2. Escribe tu dominio **sin `www`**: `migueltillero.com`
3. Región: elige **North Virginia (us-east-1)** — es la más cercana a México.
4. **Add**.

Resend te muestra una tabla con **tres o cuatro registros DNS**. Algo así:

| Type | Name | Value |
|---|---|---|
| `MX` | `send` | `feedback-smtp.us-east-1.amazonses.com` (prioridad 10) |
| `TXT` | `send` | `v=spf1 include:amazonses.com ~all` |
| `TXT` | `resend._domainkey` | `p=MIGfMA0GCSqGSIb3...` (una cadena larguísima) |
| `TXT` | `_dmarc` | `v=DMARC1; p=none;` |

**No cierres esa pantalla.** Ahora hay que copiar esos registros al panel de tu
dominio.

### Qué hace cada uno (para que no los copies a ciegas)

- **SPF** (`v=spf1...`) — declara qué servidores tienen permiso para mandar
  correo en tu nombre.
- **DKIM** (`resend._domainkey`) — la firma criptográfica. Es la que hace que
  Gmail diga «este correo es auténtico» en vez de mandarlo a spam.
- **DMARC** — le dice a Gmail qué hacer si algo no cuadra. `p=none` significa
  «no hagas nada, solo avísame»: es lo correcto para empezar.

---

## Paso 3 · Pegar los registros en tu proveedor de DNS

Entra al panel donde compraste el dominio, busca **DNS** / **Gestión de DNS** /
**DNS Records**, y añade uno por uno los registros que te dio Resend.

**Tres detalles donde casi todo el mundo se equivoca:**

1. **El campo `Name`.** Resend te dice `send` o `resend._domainkey`. Muchos
   paneles ya añaden el dominio solos: si al guardar te queda
   `send.migueltillero.com.migueltillero.com`, escribe solo `send`. Si el panel
   pide el nombre completo, escribe `send.migueltillero.com`.
2. **El valor del DKIM es una sola línea** aunque en pantalla se vea cortada en
   varias. Cópialo con el botón de copiar de Resend, **nunca a mano**.
3. **TTL:** déjalo en automático o pon `3600`. Da igual.

En **Cloudflare**, además: en el registro `MX` y en los `TXT`, la nube naranja
(proxy) debe estar **gris/desactivada**. Los registros de correo no se
«proxean».

---

## Paso 4 · Verificar

1. Vuelve a Resend → **Domains** → tu dominio → botón **Verify DNS Records**.
2. Espera. Suele tardar **entre 5 minutos y 1 hora**. Si tu proveedor es
   Cloudflare, casi siempre es inmediato.
3. Cuando esté, el dominio aparece con la etiqueta verde **Verified**.

> **¿Sigue en «Pending» después de una hora?** Casi siempre es el punto 1 del
> paso anterior: el nombre duplicado. Entra a tus registros DNS y comprueba que
> no tengas `send.migueltillero.com.migueltillero.com`. Si te atascas, mándame
> una captura de tus registros DNS y te digo exactamente qué corregir.

---

## Paso 5 · Crear la clave de API

1. Menú izquierdo → **API Keys** → **Create API Key**.
2. Nombre: `supabase-plataforma`
3. Permission: **Sending access**
4. Domain: tu dominio.
5. **Add**.

Te muestra una clave que empieza por `re_`. **Cópiala ahora**: Resend no te la
vuelve a enseñar nunca.

⚠️ **Esa clave es una contraseña.** No la pegues en WhatsApp, ni en un archivo
del repositorio, ni me la mandes por aquí. Va únicamente en el formulario de
Supabase del paso siguiente. Si se te escapa a algún sitio, bórrala desde
**API Keys** y crea otra: se hace en diez segundos.

---

## Paso 6 · Conectarla en Supabase

1. Entra a tu proyecto: **https://supabase.com/dashboard**
2. Menú izquierdo, abajo del todo: **Project Settings** (el engranaje).
3. Dentro: **Authentication**.
4. Busca la sección **SMTP Settings** y activa el interruptor
   **Enable Custom SMTP**.
5. Rellena así:

| Campo | Qué poner |
|---|---|
| **Sender email** | `hola@migueltillero.com` |
| **Sender name** | `Miguel Tillero` |
| **Host** | `smtp.resend.com` |
| **Port number** | `587` |
| **Username** | `resend` ← literalmente esa palabra, no tu correo |
| **Password** | la clave `re_...` del paso 5 |

6. **Save**.

> El **Username es la palabra `resend`**, tal cual. Es el error número uno al
> configurar esto: la gente pone su correo y luego no entiende por qué falla.
>
> La dirección de **Sender email** no tiene que existir como buzón. Es solo el
> remitente que ve el destinatario. Pero elige una que se pueda leer bien:
> `hola@`, `cursos@` o `miguel@` funcionan; `noreply@` da mala impresión en un
> curso con tres familias.

---

## Paso 7 · Subir el límite de envío

Supabase trae un límite de **2 correos por hora** pensado para desarrollo. Con
él, si los tres estudiantes se registran en la misma tarde, **el tercero no
recibe nada**.

1. Menú izquierdo → **Authentication** → **Rate Limits**.
2. Busca **«Rate limit for sending emails»**.
3. Súbelo a **30 por hora**.
4. **Save**.

(Te sobra muchísimo, pero no cuesta nada y te cubre cualquier ciclo futuro.)

---

## Paso 8 · Probarlo de verdad

No te fíes de que la pantalla no dio error. Compruébalo:

1. Abre una **ventana privada** del navegador.
2. Ve a tu propio enlace de inscripción (el de la tabla en
   `mensaje-whatsapp-ciclo-a1-oct2026.md`) y regístrate con un correo tuyo que
   no sea el de docente — por ejemplo otro Gmail.
3. **El correo debe llegar en menos de un minuto**, de `hola@migueltillero.com`,
   **a la bandeja de entrada** (no a spam).
4. En Resend, menú izquierdo → **Logs**: ahí ves el envío con estado
   `Delivered`. Si algo falló, el motivo exacto está ahí.
5. Cuando termines, borra esa cuenta de prueba: panel docente →
   **Cursos → Estudiantes**.

Si el correo llega pero cae en spam, dale a **«No es spam»** una vez. Con DKIM
y SPF bien puestos no suele repetirse: los primeros envíos de un dominio nuevo
siempre son los más sospechosos para Gmail.

---

## Plan B, sin dominio

Si decides no comprar dominio ahora, estas son las opciones reales, con lo malo
por delante:

**1 · Seguir con el remitente de Supabase** *(lo que tienes hoy)*
Funciona. Con tres estudiantes el límite no lo alcanzas. El riesgo es el spam,
y se compensa avisando —el mensaje de WhatsApp ya lleva ese aviso— y estando
pendiente de quien no encuentre el correo. **Para arrancar el martes, es
perfectamente suficiente.**

**2 · SMTP de Gmail** — *el puente, y para arrancar es el mejor*
→ **Paso a paso en `GUIA-correo-gmail.md`.** Diez minutos, sin comprar nada y
sin esperar a ningún DNS. Los correos salen de `migueltillero@gmail.com`, una
dirección que tus representantes ya conocen, y de Gmail a Gmail entran a
bandeja de entrada casi siempre — hoy, mejor incluso que un dominio recién
comprado, que para los filtros de spam es un desconocido.
No escala a cientos de alumnos y lleva tu dirección personal, así que sigue
siendo un puente hacia la opción de arriba. Pero para tres familias y con la
clase encima, es la decisión correcta.

**3 · Resend con `onboarding@resend.dev`** — *no sirve para esto*
Resend deja usar ese remitente sin verificar dominio, pero **solo puede
mandarte correos a ti mismo**. A tus estudiantes no les llegaría nada. Lo
menciono porque aparece en la documentación y podría confundirte.

---

## Cuando lo tengas listo, avísame

Hay dos cosas que se desbloquean en cuanto el correo propio funcione, y que ya
te había mencionado:

- **Los recordatorios automáticos por correo** antes de cada clase (ahora mismo
  los tendrías que mandar tú por WhatsApp).
- **El aviso al representante** cuando entrego los resultados de una
  evaluación.

Dime cuando esté verificado y los preparamos.
