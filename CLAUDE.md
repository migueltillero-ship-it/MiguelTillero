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

## Al escribir a las familias

El registro con los padres y madres **no es el mismo** que con los estudiantes
ni el de un cobro. Es cercano, cálido y amable, y trata de lo que de verdad
importa: cómo va su hijo o su hija.

- **El dinero nunca es el asunto del mensaje.** Si hay una mensualidad
  pendiente, se menciona al final, de pasada y sin señalar: «quedó pendiente
  desde finales de octubre», no «tiene usted un pago vencido». Nunca se abre
  un mensaje con eso, nunca se pone en el asunto, y nunca se condiciona nada
  a que paguen.
- **El centro es el avance del representado**, y en concreto: qué ha
  trabajado, qué se le da bien, qué le cuesta.
- **Dar fechas concretas de los informes**, para que sepan cuándo esperar las
  apreciaciones del ciclo.
- **Nada de listas de tareas ni de tono administrativo.** Se escribe como se
  habla a la salida de clase.
- Si hace falta algo de ellos —un correo, una cuenta—, se pide explicando
  para qué les sirve a ellos, no por qué lo necesita la plataforma.
- **Cuando algo falló de nuestro lado, se dice primero.** Si un recordatorio
  no llegó porque faltaba un dato, eso se cuenta antes de mencionar lo que
  quedó pendiente: una disculpa cambia por completo cómo se lee la frase
  siguiente, y además es verdad.

Esto vale para WhatsApp, para los avisos de la plataforma y para los correos.

## Fechas de clases y asistencia: se verifican, no se suponen

- **Nunca dar por dada una clase ni marcar asistencia** sin confirmarlo con
  Miguel o con el chat de la persona. Un SQL que siembra «clase del día X, con
  asistencia» a partir de lo que se creyó entender de un chat deja un dato
  falso que luego cuenta horas que no se dieron y se arrastra al acuerdo, al
  calendario y a los correos.
- **La fecha de la primera clase de cada estudiante se confirma antes de
  escribirla** en el acuerdo, el calendario, la asistencia o un correo, y se
  guarda en la propia plataforma (no en archivos del chat, que no sobreviven
  a un reinicio de la sesión y no se suben al repositorio).
- Si Miguel manda un chat, se lee ahí mismo y se anotan en la plataforma las
  fechas y horas **acordadas**, con el día exacto (no «el sábado»), antes de
  construir nada encima.
- Un cambio de fecha toca cuatro sitios a la vez: **asistencia**, **calendario
  de la plataforma**, **texto del acuerdo** y **invitaciones de Google
  Calendar**. Revisar los cuatro y también los borradores de correo pendientes.

## Cursos nuevos: siempre empiezan por el Módulo 1

- **Todo curso particular empieza por el módulo introductorio** de fonética:
  vocales una por una y compuestas, nasales, silbantes, lectoescritura, acento,
  ritmo y silabación. **También quien ya sabe francés.** En la base es el plan
  `modulo-introductorio` («Módulo 1 · Introducción: las bases del francés») y
  sus materiales son los de fonética (vocales y «Les sons et les voyelles»).
- **No se pone nivel (A1, B1…) a quien todavía no se ha ubicado**: el curso se
  llama «Curso particular de <nombre>» y queda sin nivel hasta la evaluación.
- **La puesta en marcha, en este orden**, y nada antes de que el estudiante
  confirme por escrito sus horas y su horario:
  1. Acuerdo con `crear_acuerdo_desde_prospecto`, con el plan del Módulo 1 ya
     asignado (después de emitido, el plan no se puede cambiar sin rehacerlo).
  2. Calendario del grupo (sesiones y horario) y enlace de Zoom en
     `grupo_enlaces`.
  3. Evento en Google Calendar **creado sin invitados y con el enlace de Zoom
     en la ubicación**; el invitado se añade después (si se invita al crearlo,
     Google le pega un Google Meet que no se usa).
  4. Un solo correo con fecha y hora, enlace de Zoom, acceso a su espacio,
     acuerdo por aceptar y el pago (sin condicionar nada).
  5. Se anota la confirmación, con fecha y hora exactas, en las notas de su
     acuerdo y de su ficha de solicitud.

## Comentarios de las notas: el modelo de Miguel

Los comentarios de cada nota los leen el estudiante y su familia, y se tratan
como una carta, no como una nota al margen. Siempre en **prosa corrida, sin
listas ni viñetas**, de **más de cinco líneas**, con **párrafos bien separados**
por una línea en blanco, cordiales y pulidos. Estructura en cuatro bloques:

1. **Reconocimiento y validación afectiva.** Saludo cordial, mención explícita de
   la evaluación y felicitación sincera por la disposición, el compromiso y el
   esfuerzo.
2. **Recomendaciones técnicas prioritarias.** Dos aspectos esenciales a mejorar,
   explicados en prosa: por qué importan y cómo ejercitarlos de forma natural.
3. **Elevación discursiva.** Hacia dónde crecer (conectores, tiempos verbales,
   subordinación, léxico), adaptado al nivel de la persona.
4. **Cierre motivacional.** Confianza en sus capacidades, invitación a seguir
   practicando, tanto en la plataforma como en clase, y respaldo del docente.

Lo que dice cada comentario sale de lo que Miguel observó de esa persona; no se
rellena con generalidades ni se repite el mismo texto para dos estudiantes. En
las páginas se muestran con los saltos de párrafo respetados y justificados.

## Al escribir

- Comentarios y textos de cara al usuario **en español**, explicando el porqué
  de una decisión, no lo que ya dice el código.
- Verificar en un navegador real antes de dar algo por hecho, y decir qué se
  comprobó.
