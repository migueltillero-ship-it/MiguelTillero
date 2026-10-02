> ## ⏸ Decidido en octubre de 2026: no se hace
>
> Miguel prefiere quedarse en GitHub Pages, en
> `migueltillero-ship-it.github.io/MiguelTillero/`, y el correo sigue
> saliendo por Gmail (ver `GUIA-correo-resend.md` → opción 2, que es la que
> está en marcha y funciona).
>
> Esta guía se queda aquí por si algún día cambia la decisión. **No hay nada
> pendiente de hacer en ella.** Las opciones gratuitas que se miraron
> —`eu.org`, `is-a.dev`, renombrar la cuenta de GitHub— se descartaron: las
> dos primeras por nombre poco presentable y por tardanza, y la tercera
> porque rompería los enlaces de inscripción y los boletines que las
> familias ya tienen en la mano.

---

# Pasar la plataforma a migueltillero.com

De `migueltillero-ship-it.github.io/MiguelTillero/` a **`migueltillero.com`**,
y de paso el correo saliendo de tu propio dominio en vez de tu Gmail.

**Cuatro fases.** Las dos primeras las haces tú (unos 25 minutos, más la
espera del DNS); la tercera la hago yo; la cuarta la hacemos juntos.

> **El orden importa.** Si cambio las direcciones del sitio antes de que el
> dominio funcione, el sitio se cae. Por eso la fase 3 va después de la 2, y
> no al revés.

---

## Fase 1 · Comprar el dominio · 10 min

Comprobado hoy: **`migueltillero.com` no tiene servidores de nombres**, o sea
que o no está registrado, o está comprado y sin configurar. Si ya lo tienes
comprado en algún sitio, dímelo y nos saltamos esta fase.

### Dónde comprarlo

| | Precio aprox. | Por qué |
|---|---|---|
| **Cloudflare Registrar** ← recomendado | ~10 USD/año | Lo vende a precio de costo, sin margen, y su panel de DNS es el más sencillo. Además el DNS es suyo y propaga en segundos. |
| Porkbun | ~11 USD/año | Buena alternativa, panel claro. |
| Namecheap | ~13 USD/año | Conocido, algo más caro al renovar. |

**Evita GoDaddy:** barato el primer año, caro al renovar, y su panel de DNS
esconde lo que necesitas.

### En Cloudflare

1. **https://dash.cloudflare.com/sign-up** — crea la cuenta con
   `migueltillero@gmail.com`.
2. Menú izquierdo → **Domain Registration** → **Register Domains**.
3. Busca `migueltillero.com`. Si está libre, **Purchase**.
4. **Activa la renovación automática.** Un dominio que caduca se lo queda
   cualquiera, y recuperarlo cuesta mucho más que renovarlo.

> **Si está ocupado:** avísame y vemos alternativas —`migueltillero.mx`,
> `migueltillero.fr`, `tillero.com`—. El `.mx` tiene sentido: es donde das
> clase.

---

## Fase 2 · Apuntarlo a GitHub Pages · 15 min + espera

### 2a · Los registros DNS

En Cloudflare: tu dominio → **DNS** → **Records** → **Add record**.

**Cuatro registros A** (son los servidores de GitHub Pages):

| Type | Name | IPv4 address | Proxy |
|---|---|---|---|
| A | `@` | `185.199.108.153` | **DNS only** (nube gris) |
| A | `@` | `185.199.109.153` | **DNS only** |
| A | `@` | `185.199.110.153` | **DNS only** |
| A | `@` | `185.199.111.153` | **DNS only** |

**Y un CNAME para el www:**

| Type | Name | Target | Proxy |
|---|---|---|---|
| CNAME | `www` | `migueltillero-ship-it.github.io` | **DNS only** |

> **La nube naranja apagada** en los cinco. Si la dejas encendida, GitHub no
> puede emitir el certificado HTTPS y el sitio sale con aviso de «no seguro».
> Se puede encender después, cuando el certificado ya esté.

### 2b · Decírselo a GitHub

1. **https://github.com/migueltillero-ship-it/MiguelTillero/settings/pages**
2. En **Custom domain** escribe `migueltillero.com` → **Save**.
3. GitHub comprueba el DNS. Puede tardar unos minutos.
4. Cuando aparezca el aviso verde, marca **Enforce HTTPS**.

> Esa casilla tarda en poderse marcar: GitHub tiene que emitir el
> certificado, y eso son entre 10 minutos y una hora. Si sale «Unavailable
> for your site», espera y vuelve. No es un error.

Al guardar, GitHub crea un archivo `CNAME` en el repositorio. **Eso es
normal, déjalo**: es lo que mantiene el dominio.

### 2c · Avísame

Cuando **https://migueltillero.com** abra el sitio, dímelo. Ahí entro yo.

---

## Fase 3 · Actualizar el sitio · lo hago yo

Hay **16 archivos** con la dirección vieja escrita dentro. La mayoría son
etiquetas de buscadores y de redes sociales (`canonical`, `og:url`,
`og:image`), pero tres sí son funcionales:

- El **enlace de inscripción** que genera el panel docente.
- Los enlaces de **materiales** que ve el estudiante.
- La configuración de Jekyll (`_config.yml`), que todavía dice
  `baseurl: /MiguelTillero`.

Eso último importa más de lo que parece: **con dominio propio el sitio pasa
a servirse desde la raíz**, sin `/MiguelTillero/` delante. La navegación
interna no se rompe porque todos los enlaces del sitio son relativos —lo
comprobé—, pero el `baseurl` y las direcciones absolutas sí hay que
cambiarlas.

También te preparo los SQL para que los enlaces guardados en la base de
datos apunten al dominio nuevo.

**El sitio viejo seguirá funcionando:** GitHub redirige
`migueltillero-ship-it.github.io/MiguelTillero/` al dominio nuevo, así que
los enlaces que ya repartiste no se mueren.

---

## Fase 4 · El correo desde tu dominio · 20 min

Esto es lo que querías desde el principio: que los correos salgan de
`hola@migueltillero.com` en vez de tu Gmail personal.

El paso a paso completo está en **`GUIA-correo-resend.md`**. Resumido:

1. Cuenta en **https://resend.com/signup** (gratis: 3.000 correos al mes).
2. **Domains → Add Domain** → `migueltillero.com` → región
   **North Virginia**.
3. Resend te da tres o cuatro registros DNS (SPF, DKIM, DMARC). Los pegas en
   Cloudflare igual que los de la fase 2a. **Con Cloudflare, verifica en
   segundos.**
4. **API Keys → Create API Key** → permiso *Sending access*. Te da una clave
   `re_...`. Cópiala: solo se muestra una vez.
5. En Supabase →
   **https://supabase.com/dashboard/project/yfrdlzveleevkjqekdoq/auth/smtp**
   cambias cinco campos:

| Campo | Antes (Gmail) | Después (Resend) |
|---|---|---|
| Sender email | `migueltillero@gmail.com` | `hola@migueltillero.com` |
| Host | `smtp.gmail.com` | `smtp.resend.com` |
| Port | `587` | `587` *(igual)* |
| Username | `migueltillero@gmail.com` | `resend` ← esa palabra, literal |
| Password | las 16 letras de Google | la clave `re_...` |

6. **Borra la contraseña de aplicación de Google** en
   https://myaccount.google.com/apppasswords — ya no hace falta, y una
   credencial que no se usa es una credencial que sobra.

> El aviso amarillo de Supabase sobre «correo personal» desaparece: Resend
> sí es un proveedor transaccional.

---

## Y una cosa más, cuando el dominio esté

En **Supabase → Authentication → URL Configuration** hay que cambiar la
**Site URL** al dominio nuevo, y añadir las direcciones de redirección. Si
no, los enlaces de los correos de confirmación seguirán llevando a la
dirección vieja. Te lo recuerdo cuando lleguemos ahí.

---

## Resumen de qué hace cada uno

| | Tú | Yo |
|---|---|---|
| Comprar el dominio | ✓ | |
| Registros DNS en Cloudflare | ✓ | |
| Custom domain en GitHub | ✓ | |
| Cambiar las 16 direcciones del sitio | | ✓ |
| `_config.yml` y los SQL | | ✓ |
| Resend: dominio y clave | ✓ | |
| Los cinco campos de Supabase | ✓ | |
| Probar que todo sigue en pie | | ✓ |
