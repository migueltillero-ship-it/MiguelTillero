# Ciclo A1 · Octubre 2026 — guía de puesta en marcha

Todo lo que hace falta para abrir el ciclo, en el orden en que hay que hacerlo.
Calculado para que el martes 29 de septiembre el grupo entre sin fricción.

---

## Dónde se quedó el grupo

Tomado de la página que enviaste: **Défi 1** (CLE International),
**Unité 4 «Entre quatre murs», Dossier 2** — *«Comment aménager les petits
espaces»*, pp. 70-71.

Lo que ese dossier deja ya trabajado:

- **Léxico**: les pièces de la maison y les meubles (le placard, la cuisinière,
  le lave-vaisselle, le réfrigérateur, les toilettes, la douche, la
  bibliothèque, l'escalier, le lit, l'armoire, le fauteuil, le bureau, la
  chaise, la table).
- **Estructura**: «servir à + infinitif» para decir para qué sirve una cosa.
- **Gramática**: el verbo **POUVOIR** en presente y «pouvoir + infinitif» para
  la posibilidad, con su negación (*je ne peux pas*).
- **Gramática**: los **adjetivos de color** — femenino, plural y los
  invariables (*orange*, *marron*) — más el círculo cromático
  (couleurs chaudes / froides).
- **Producción**: adivinanzas sobre muebles y descripción de los colores de
  las habitaciones.

De ahí arranca el ciclo nuevo: **Dossier 3 de la Unité 4** y después la
**Unité 5 «Métro, boulot, dodo»**.

> Una nota honesta: el Dossier 2 lo leí directamente de tu página, así que eso
> es seguro. El reparto exacto de páginas del Dossier 3 en adelante lo deduje
> del tema de la unidad y de la progresión A1, no de tu libro. Si me mandas el
> índice de Défi 1 (o las páginas 72-79) te ajusto los números de página de
> cada sesión. **El ZIP que adjuntaste llegó vacío — 0 bytes —, así que la
> última evaluación no la pude leer. Vuélvemelo a mandar y afino el plan con
> los resultados reales.**

---

## Plan de las 12 sesiones

Seis semanas, martes y jueves de 19:00 a 20:00. Las dos primeras son la
evaluación del ciclo anterior, como acordaste con el grupo.

| # | Fecha | Sesión |
|---|---|---|
| 1 | mar 29 sep | **Évaluation collective** — cierre del ciclo anterior |
| 2 | jue 1 oct | **Évaluation individuelle** — cierre del ciclo anterior |
| 3 | mar 6 oct | Retour sur l'évaluation + réactivation de l'Unité 4 |
| 4 | jue 8 oct | **U4 / Dossier 3** — Décrire son logement · prépositions de lieu · il y a |
| 5 | mar 13 oct | U4 — Donner des conseils : l'impératif · il faut / on peut |
| 6 | jue 15 oct | **DÉFI de l'Unité 4** — Aménager un petit espace (tâche colaborativa) |
| 7 | mar 20 oct | Faites le point U4 + apertura U5 : l'heure |
| 8 | jue 22 oct | **U5** — Les verbes pronominaux : ma journée |
| 9 | mar 27 oct | U5 — Moments de la journée et fréquence |
| 10 | jue 29 oct | U5 — Les professions et le monde du travail |
| 11 | mar 3 nov | U5 — Les transports et les trajets |
| 12 | jue 5 nov | Révision générale + mini-DELF A1 + cierre del ciclo |

**Por qué este reparto.** Son sesiones de una hora, dos veces por semana: hay
que dejar que cada bloque respire. La sesión 3 no introduce nada nuevo a
propósito — devuelve la evaluación y reactiva — porque el grupo llega de un
cierre y de una semana sin clase. El DÉFI de la sesión 6 cierra la unidad con
una tarea real antes de cambiar de tema. La sesión 7 hace de bisagra: cierra
la Unité 4 por la mañana y abre la 5 por la tarde, sin dejar un corte seco.
La sesión 9 incluye la primera revisión acumulativa, y la 12 funciona como
simulacro de DELF, que es lo que le da sentido al nivel.

**Materiales externos previstos** (ya anotados en el contenido de cada sesión):
juego de vocabulario en Wordwall para *les meubles*, vídeo de TV5Monde
«Apprendre le français» A1 sobre *le logement*, audio de RFI en français facile
para los horarios, y un plano de metro para la sesión de transportes.

---

## Paso 1 · Cargar el ciclo en la base de datos

1. Entra a **Supabase → SQL Editor**.
2. Si todavía no los has corrido, ejecuta en orden: `schema.sql`,
   `schema_v2.sql`, `schema_v3.sql`, `schema_v4.sql`, `schema_v5.sql`,
   `schema_v6.sql`. Son seguros de repetir.
3. Pega **`supabase/ciclo-a1-oct2026.sql`** completo y dale **RUN**.

Eso crea de una sola vez: el curso, el grupo `A1-OCT2026` con su costo de
$1.900 MXN, el horario de martes y jueves, las 12 sesiones con su tema y su
contenido, y las dos evaluaciones.

Al final el propio script te devuelve una tabla con **el enlace de inscripción**
ya armado. Cópialo: es el que vas a repartir.

> Si quieres cambiar el precio, las fechas o el cupo, toca solo el bloque
> `DATOS DEL CICLO` que está al principio del archivo y vuelve a ejecutarlo.
> No duplica nada.

---

## Paso 2 · El enlace, personalizado por estudiante

El enlace base que te devuelve el script es:

```
https://migueltillero-ship-it.github.io/MiguelTillero/registro/inscripcion.html?grupo=EL-ID-DEL-GRUPO
```

Para que cada estudiante lo reciba con su nombre ya puesto, añade `&nombre=`:

```
...?grupo=EL-ID-DEL-GRUPO&nombre=Ana%20López
```

El `%20` es el espacio. Si prefieres no pelearte con eso, escribe el nombre sin
espacio (`&nombre=Ana`) o manda el enlace base: el formulario funciona igual, el
estudiante solo tendrá que escribir su nombre a mano.

**Qué ve el estudiante al abrirlo:** el nombre del curso, el nivel, las fechas,
los cupos que quedan y el costo. Luego crea su cuenta, y **en la misma pantalla
le aparece el paso de pago** con el monto, la fecha límite y todos tus métodos
(Albo, Nu, depósito en efectivo, Remitly y Zelle), cada uno con su botón de
copiar y un enlace directo a tu WhatsApp para mandarte el comprobante.

---

## Paso 3 · El mensaje para mandar

### Por WhatsApp (con la infografía adjunta)

> Hola, **[NOMBRE]** 👋
>
> Ya está abierto el nuevo ciclo de **Français A1**. Seguimos justo donde nos
> quedamos: cerramos la *Unité 4 «Entre quatre murs»* y entramos en la
> *Unité 5 «Métro, boulot, dodo»*.
>
> 📅 Del **martes 29 de septiembre** al **jueves 5 de noviembre**
> 🕖 **Martes y jueves, de 19:00 a 20:00**
> 📚 6 semanas · 12 clases en vivo
> 💰 **$1,900 MXN** el ciclo completo
>
> Las **dos primeras clases son la evaluación del ciclo anterior**, tal como
> lo acordamos: el **martes 29 la prueba colectiva** y el **jueves 1 de octubre
> la individual**.
>
> Para apartar tu lugar, entra aquí y crea tu cuenta. Es rápido:
> 👉 [TU ENLACE PERSONALIZADO]
>
> Al terminar el formulario te van a aparecer todas las formas de pago.
> Cuando pagues, mándame el comprobante por aquí y activo tu inscripción el
> mismo día.
>
> **El cupo se aparta con el pago, antes del martes 29.**
>
> Con tu cuenta vas a tener tu propio espacio: el calendario con el contenido
> de cada clase, tu asistencia y tus notas, todo en un solo lugar.
>
> Cualquier duda me escribes. ¡Nos vemos el martes!
> — Miguel

### Por correo (asunto y cuerpo)

**Asunto:** Tu lugar en el nuevo ciclo de Français A1 — empieza el martes 29

> Hola, **[NOMBRE]**:
>
> Te escribo para confirmarte el nuevo ciclo de **Français A1**, que arranca el
> **martes 29 de septiembre**.
>
> **Cuándo:** martes y jueves, de 19:00 a 20:00 (hora de Ciudad de México)
> **Duración:** 6 semanas, 12 clases en vivo, del 29 de septiembre al 5 de noviembre
> **Contenido:** cierre de la *Unité 4 «Entre quatre murs»* y la *Unité 5
> «Métro, boulot, dodo»* de Défi 1
> **Costo:** $1,900 MXN el ciclo completo
>
> Las dos primeras sesiones son la evaluación del ciclo anterior: la prueba
> colectiva el martes 29 y la individual el jueves 1 de octubre.
>
> Para inscribirte, entra en este enlace y crea tu cuenta de estudiante:
> [TU ENLACE PERSONALIZADO]
>
> Al terminar verás las formas de pago disponibles. Manda el comprobante por
> WhatsApp (+58 412-2465331) y activo tu inscripción el mismo día. El cupo se
> aparta con el pago, antes del martes 29.
>
> Desde tu cuenta vas a poder ver el calendario con el contenido de cada clase,
> tu asistencia y tus calificaciones.
>
> Un abrazo,
> Miguel Tillero

### Recordatorio corto (para el domingo 27 y el lunes 28)

> Hola, **[NOMBRE]**. Te recuerdo que el **martes 29 arrancamos** el nuevo ciclo
> de Français A1, a las 19:00, y que esa primera clase es la **prueba colectiva**
> del ciclo anterior.
>
> Si todavía no apartas tu lugar, el enlace es este 👉 [TU ENLACE]
>
> Nos vemos. — Miguel

---

## Paso 4 · Aprobar y cobrar, desde el panel

Cuando un estudiante se registra, su inscripción entra como **pendiente**.

1. Entra a **panel-docente.html** → sección **Hoy**. Ahí te avisa cuántas
   inscripciones están esperando aprobación.
2. Ve a **Cursos** → el curso → pestaña de inscripciones, y apruébalas cuando
   te llegue el comprobante.
3. Al aprobar, el estudiante pasa a **activa**, se le descuenta un cupo al
   grupo y ya ve su calendario completo.

Desde ese momento el estudiante ve, en su espacio:

- **Planificación y progresión** — las 12 sesiones con la fecha, el tema y el
  contenido de cada una. Es el calendario visible que pediste.
- **Mi asistencia** — presentes, ausencias y su porcentaje.
- **Mis notas** — las dos evaluaciones del ciclo anterior ya están creadas y
  listas para que les cargues calificación.
- **Mis pagos**.

---

## Lo que falta y depende de ti

**Los correos automáticos todavía no salen de tu dominio.** Supabase está
usando su remitente de prueba, con límite diario y con alta probabilidad de
caer en spam. Para que los correos de verificación y los recordatorios salgan
bien hay que conectar el SMTP de Resend en Supabase — son las instrucciones
que te pasé antes. Mientras eso no esté, **los recordatorios mándalos tú por
WhatsApp** con el texto de arriba: es lo que de verdad funciona hoy.

**El ZIP llegó vacío.** Vuélvemelo a mandar y ajusto el plan con los
resultados reales de la última evaluación: si hay un punto flojo concreto
(por ejemplo los adjetivos de color o la negación con *pouvoir*), lo meto en
la sesión 3, que justamente está reservada para reactivar.

**El índice de Défi 1.** Si me lo mandas, te pongo el número de página exacto
de cada sesión en lugar de la referencia por dossier.
