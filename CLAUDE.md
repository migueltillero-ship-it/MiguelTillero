# Notas del proyecto

## Cómo entregar el trabajo

**Siempre, sin excepción, cuando algo requiera una acción de Miguel fuera de este
chat, hay que darle las dos cosas juntas:**

1. **La dirección web exacta** donde tiene que ir (enlace completo, no «ve al
   panel de X»).
2. **Lo que tiene que correr o pegar**, literal y completo.

Esto vale para SQL de Supabase, ajustes en EmailJS, cambios en GitHub y
cualquier otro panel. Nunca describir el camino de menús sin dar el enlace, y
nunca decir «ejecuta el archivo tal» sin decir dónde está y cómo copiarlo.

### Enlaces que se repiten

| Para qué | Dirección |
|---|---|
| SQL Editor de Supabase | https://supabase.com/dashboard/project/yfrdlzveleevkjqekdoq/sql/new |
| Panel de EmailJS | https://dashboard.emailjs.com/admin |
| Plantilla del correo | https://dashboard.emailjs.com/admin/templates |
| Sitio publicado | https://migueltillero-ship-it.github.io/MiguelTillero/ |
| Archivos del repositorio | https://github.com/migueltillero-ship-it/MiguelTillero/blob/main/ |

Para que copie un archivo SQL largo, enlazar a su vista en GitHub, que trae
botón de copiar:
`https://github.com/migueltillero-ship-it/MiguelTillero/blob/main/supabase/<archivo>.sql`

## Contexto del sitio

- Sitio estático en GitHub Pages. **Se publica desde `main`**: trabajar en otra
  rama no cambia nada de lo que ve el público.
- El repositorio es **público**. El gancho `.githooks/pre-commit` bloquea
  enlaces y contraseñas de Zoom y invitaciones de grupos de WhatsApp; esos
  datos van en la tabla `grupo_enlaces`, nunca en un archivo. El gancho solo
  funciona tras `git config core.hooksPath .githooks`.
- Proyecto de Supabase en uso: `yfrdlzveleevkjqekdoq`
  («miguel-tillero-plataforma»). Hay otros tres en la cuenta, inactivos.
- Los formularios públicos envían por EmailJS (`service_uv779js`,
  `template_sp4hl5f`) **y además** guardan la solicitud en la tabla
  `prospectos` antes de intentar el correo, para que una caída del envío no
  pierda al prospecto.

## Decisiones del negocio

- **Ningún precio visible antes del primer contacto.** La cifra solo aparece
  en el paso de pago, después de enviar la inscripción. «Gratuito» sí se puede
  anunciar: no es un costo.
- **El pago nunca condiciona el acceso.** Inscribirse, entrar a la plataforma y
  aceptar el contrato funcionan sin haber pagado. El comprobante se envía
  después, subido o por WhatsApp, y lo verifica Miguel.
- El estudiante debe **aceptar el contrato y confirmar la lectura del
  reglamento** como dos actos separados, cada uno con su registro.

## Al escribir

- Comentarios y textos de cara al usuario **en español**, explicando el porqué
  de una decisión, no lo que ya dice el código.
- Verificar en un navegador real antes de dar algo por hecho, y decir qué se
  comprobó.
