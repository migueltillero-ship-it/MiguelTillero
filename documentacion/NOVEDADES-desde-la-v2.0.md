# Novedades posteriores a la versión 2.0

La documentación (el documento único y los tres documentos por separado)
describe la plataforma **tal como estaba el 14 de octubre de 2026**. Esto es lo
que se ha añadido desde entonces, para que quien lea el paquete sepa qué falta
en él.

*Actualizado el 15 de octubre de 2026.*

---

## 1. Planificación completa del ciclo B2 (octubre-noviembre)

Las doce sesiones tenían un título provisional («Séance 5 de 12») y el
estudiante veía su calendario con las casillas vacías. Ahora cada sesión lleva
su tema y su contenido detallado: las páginas del método, las actividades y la
gramática que entra en cada clase, repartidos a razón de una página y media por
sesión, con una sesión de repaso y las dos evaluaciones de cierre.

> Dónde se ve: espacio del estudiante → *Mi curso* → Planificación y progresión.
> Archivo: `supabase/ciclo-b2-planificacion.sql`.

## 2. Registro de clase: pagos, asistencia y contenido en un solo guion

Una plantilla reutilizable para cada sesión de cualquier grupo: quién está en el
grupo y cómo va de pago, el registro de los pagos del día, la asistencia con su
justificación —que es lo que después lee la familia— y el contenido de la
sesión. Busca a cada estudiante por su nombre de pila dentro del grupo, de modo
que no hace falta manejar ningún identificador, y avisa si un nombre no
encaja con nadie en lugar de fallar en silencio.

> Archivo: `supabase/clase-del-dia.sql`. No contiene ningún nombre real.

## 3. Avisos en el perfil del estudiante y de su familia

Hay cosas que se acuerdan hoy y se aplican dentro de dos meses —un cambio de
precio para el ciclo siguiente, por ejemplo—, y para entonces nadie se acuerda
de lo que se habló por WhatsApp. Un aviso se escribe una vez, con su fecha de
aparición y su fecha de caducidad, y aparece solo cuando toca, en el espacio del
estudiante y en el de su representante.

Tres reglas de acceso: el docente administra; el estudiante ve los suyos
mientras estén vigentes; el representante ve los de sus hijos con la misma
regla. Un aviso programado para dentro de un mes no asoma antes de tiempo, y uno
caducado deja de verse solo.

> Archivos: `supabase/avisos.sql` y `supabase/pruebas/06-avisos.sql`
> (once comprobaciones automáticas).

## 4. Ejercicios complementarios del ciclo B2

Un espacio de trabajo autónomo, una ficha por sesión, con dos partes en cada
una: lo trabajado en clase revisado por otro camino, y ejercicios nuevos que van
un paso más lejos. Se corrigen solos, guardan el avance en el navegador del
estudiante y no requieren cuenta ni conexión con la base de datos.

> Dónde se ve: espacio del estudiante → *Materiales*.
> Archivos: `estudiantes/b2-oct2026.html` y `estudiantes/b2-oct2026-fiches.js`.

---

## Lo que sigue pendiente

Lo que el anexo técnico recoge como deuda técnica sigue vigente. Se añaden:

- El libro virtual del nivel B2 todavía no está cargado.
- Los documentos en PDF de este paquete no se regeneran automáticamente: hay que
  rehacerlos cuando los cambios sean suficientes para justificarlo. Esta nota
  existe precisamente por eso.
