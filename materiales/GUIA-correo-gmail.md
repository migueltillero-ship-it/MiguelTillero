# Correo propio sin comprar dominio (Gmail + Supabase)

**Para hacerlo hoy, en 10 minutos, sin registrar nada ni esperar a ningún DNS.**

Los correos de la plataforma —verificación de cuenta, recuperación de
contraseña— saldrían de **`migueltillero@gmail.com`**, tu dirección de siempre,
en lugar del remitente de prueba de Supabase.

> **¿Y la guía de Resend?** Sigue siendo el destino final, cuando tengas
> dominio y sin prisa: ver `GUIA-correo-resend.md`. Esto de aquí es el puente.

---

## Por qué esto es suficiente para tu caso

Cuando escribí la guía de Resend te dije que el SMTP de Gmail no lo
recomendaba. **Con la clase mañana, esa recomendación cambia**, y por razones
concretas:

- **Tus destinatarios son tres familias, probablemente con cuentas de Gmail.**
  Un correo de Gmail a Gmail llega a bandeja de entrada prácticamente siempre.
- **`migueltillero@gmail.com` es una dirección que ellos ya conocen.** Un
  dominio recién comprado, en cambio, es *nuevo* para los filtros de spam: los
  primeros envíos de un dominio sin historial son justamente los más
  sospechosos. Es decir, hoy Gmail te da **mejor** entregabilidad que un
  `migueltillero.com` estrenado ayer.
- **El límite de Google es de unos 100 destinatarios al día.** Tú vas a mandar
  unos diez correos este mes.

Lo que sí es verdad de los inconvenientes: no escala a cientos de alumnos, los
correos llevan tu dirección personal, y Google puede poner pegas si algún día
el volumen sube. Por eso es un puente, no el destino.

---

## Paso 1 · Activar la verificación en dos pasos

Sin esto, Google no te deja crear la contraseña de aplicación. Si ya la tienes
activada, salta al paso 2.

1. Entra a **https://myaccount.google.com/security**
2. Busca **«Verificación en dos pasos»** → **Activar**.
3. Sigue lo que te pida (normalmente confirmar en tu teléfono).

---

## Paso 2 · Crear la contraseña de aplicación

Una contraseña de aplicación es una clave **aparte** de tu contraseña de Gmail,
que sirve **solo** para esta conexión y que puedes revocar cuando quieras sin
tocar tu cuenta. No es tu contraseña personal.

1. Entra a **https://myaccount.google.com/apppasswords**
2. En el nombre escribe: `Supabase plataforma`
3. **Crear**.
4. Google te muestra **16 letras en cuatro grupos**, tipo `abcd efgh ijkl mnop`.

**Cópiala ahora**: Google no la vuelve a mostrar. Y **quítale los espacios** al
pegarla — `abcdefghijklmnop`.

⚠️ Esa clave es una contraseña. No la mandes por WhatsApp, no la pegues en un
archivo del repositorio, no me la mandes por aquí. Va solo en el formulario del
paso 3. Si se te escapa a algún sitio, la borras desde esa misma página de
Google y creas otra en diez segundos.

> **¿La página dice que no está disponible?** Es porque la verificación en dos
> pasos no está activa (paso 1), o porque tu cuenta tiene activada la
> Protección Avanzada de Google, que bloquea las contraseñas de aplicación. En
> ese segundo caso, el camino es el de Resend con dominio.

---

## Paso 3 · Conectarla en Supabase

1. Entra a **https://supabase.com/dashboard** y abre tu proyecto.
2. Menú izquierdo, abajo del todo: **Project Settings** (el engranaje).
3. Dentro: **Authentication**.
4. Busca **SMTP Settings** y activa **Enable Custom SMTP**.
5. Rellena exactamente así:

| Campo | Qué poner |
|---|---|
| **Sender email** | `migueltillero@gmail.com` |
| **Sender name** | `Miguel Tillero` |
| **Host** | `smtp.gmail.com` |
| **Port number** | `587` |
| **Username** | `migueltillero@gmail.com` |
| **Password** | las 16 letras del paso 2, **sin espacios** |

6. **Save**.

> **El «Sender email» tiene que ser tu propia dirección de Gmail.** A
> diferencia de Resend, aquí no puedes inventarte el remitente: Google solo te
> deja mandar como la cuenta que se autentica. Si pones otra cosa, los correos
> se rechazan.

---

## Paso 4 · Subir el límite de envío

Supabase trae un límite de **2 correos por hora**, pensado para desarrollo. Con
él, **si las tres familias se registran la misma tarde, la tercera no recibe
nada** — y mañana es el primer día, así que se van a registrar todas a la vez.

1. Menú izquierdo → **Authentication** → **Rate Limits**.
2. **«Rate limit for sending emails»** → ponlo en **30** por hora.
3. **Save**.

---

## Paso 5 · Probarlo de verdad antes de mandar los enlaces

No te fíes de que la pantalla no diera error.

1. Abre una **ventana privada** del navegador.
2. Entra a tu enlace de inscripción (están en
   `mensaje-whatsapp-ciclo-a1-oct2026.md`) y regístrate con **otro correo
   tuyo**, no el de docente.
3. El correo debe llegar **en menos de un minuto**, de `migueltillero@gmail.com`,
   **a la bandeja de entrada**.
4. Confirma que el enlace del correo te lleva al login y que puedes entrar.
5. Borra la cuenta de prueba desde el panel docente →
   **Cursos → Estudiantes**.

**Si no llega:**

| Lo que ves | Qué es |
|---|---|
| Error al guardar en Supabase, o nada llega | Contraseña mal copiada — casi siempre los espacios. Vuelve a pegarla sin ellos. |
| «Invalid login» en los logs | El Username no es tu correo completo, o la verificación en dos pasos se desactivó. |
| Llega, pero a spam | Dale a **«No es spam»** una vez. De Gmail a Gmail es raro; suele pasar solo con dominios corporativos. |
| Tarda varios minutos | Normal la primera vez. A partir del segundo es inmediato. |

---

## Después del arranque: el plan largo

Cuando pase el martes y tengas aire, **compra el dominio y pásate a Resend**.
La razón no es el correo de verificación —esto ya lo resuelve— sino lo que
viene detrás:

- Los correos dejan de salir de tu Gmail personal y pasan a `hola@migueltillero.com`.
- Sin límite diario, con estadísticas de entrega y sin depender de las reglas de Google.
- Y de paso la plataforma deja de vivir en
  `migueltillero-ship-it.github.io/MiguelTillero/` y pasa a `migueltillero.com`,
  que es lo que ya dice tu infografía.

El cambio, cuando lo hagas, es **reemplazar cinco campos en la misma pantalla
de Supabase del paso 3**. Nada más. Lo que construyas ahora no se tira.
