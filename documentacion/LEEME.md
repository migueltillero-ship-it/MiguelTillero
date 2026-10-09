# Vive el francés · Documentación del proyecto

**Plataforma educativa de Miguel David Tillero Álvarez, profesor de francés (FLE).**
Estado documentado: el del 3 de octubre de 2026.

Esta carpeta reúne todo lo necesario para entender el proyecto sin tener que
leer el código ni haber estado presente mientras se construía.

---

## En qué orden leerlo

| | Carpeta | Qué contiene | Tiempo |
|---|---|---|---|
| **1** | `1-Presentacion/` | **Empieza aquí.** Por qué existe, qué resuelve, cómo se hizo y hacia dónde va. | ~20 min |
| **2** | `2-Manual/` | Qué hace exactamente, función por función, por perfil de usuario. | ~30 min, o a consulta |
| **3** | `3-Anexo-tecnico/` | Cómo está construido por dentro. **Opcional.** | ~20 min |
| **4** | `4-Capturas/` | Las pantallas reales, numeradas. Se consultan desde el manual. | — |

**Si solo hay tiempo para una cosa:** la presentación. Está pensada para
entenderse sola.

**Si la pregunta es «¿esto qué hace exactamente?»:** el manual, apartado por
apartado. Cada ficha se lee sola, sin necesidad de las anteriores.

---

## Qué hay en cada archivo

### 1-Presentacion
- `presentacion.pdf` · `presentacion.html` — el documento, en los dos formatos.
- `LEEME.md` — su índice.

### 2-Manual
- `manual-funciones.pdf` · `manual-funciones.html` — 16 fichas de función.
- `LEEME.md` — cómo está organizado y qué significa cada apartado de la ficha.

### 3-Anexo-tecnico
- `anexo-tecnico.pdf` · `anexo-tecnico.html` — arquitectura, datos, seguridad y
  decisiones.
- `LEEME.md` — su índice.

### 4-Capturas
- `capturas/` — diez figuras en PNG, numeradas.
- `LEEME.md` — qué muestra cada una, de dónde salió y qué hay debajo de cada
  bloque opaco.

### En esta carpeta
- `registro-de-cambios.md` — qué se hizo, cuándo y en qué cambio del historial.
  146 cambios sustantivos agrupados en seis fases.
- `estilo-documentos.css` — la hoja de estilo común de los tres documentos.
- `informe-privacidad.md` — el resultado de la búsqueda automática de datos
  sensibles, hecha antes de empaquetar.

---

## Sobre la privacidad

Esta documentación está pensada para compartirse, y **los estudiantes son
menores de edad**. Antes de empaquetarla:

- Se retiraron claves, identificadores de la base de datos, datos bancarios,
  códigos de acceso y enlaces de inscripción.
- Los nombres, correos y teléfonos de estudiantes y familias **no aparecen**:
  ni en el texto, ni en las tablas, ni en las capturas. Donde hacía falta un
  ejemplo, se inventó uno («Alumno A», «Familia B»).
- Las capturas con datos reales se taparon con **bloques opacos**, no con
  desenfoque.
- Las pantallas que mostraban información de estudiantes **se rehicieron desde
  cero** con datos que nunca existieron.
- **No se incluye ninguna conversación de WhatsApp.** Lo ocurrido en ellas se
  relata, sin reproducir mensajes.
- Se ejecutó una **búsqueda automática** de correos, teléfonos, cuentas
  bancarias, identificadores y claves sobre todo el material. El resultado está
  en `informe-privacidad.md`.

---

## Una nota sobre el tono

Los documentos dicen también lo que **no** funciona: las funciones a medias, la
deuda técnica, los errores cometidos y los que costaron una tarde entera. No es
modestia: es que una documentación que solo cuenta los aciertos no sirve para
que nadie la revise de verdad.

---

## Qué agradecería

Más que una valoración general:

- **Qué función falta**, de las que ustedes echan de menos cada semana en su
  propia práctica docente.
- **Qué parte no se entiende** leyendo el manual. Si no se entiende escrito,
  tampoco se entenderá usándola.
- **Dónde ven un riesgo**, sobre todo en lo que toca a datos de menores.

---

*Miguel David Tillero Álvarez · San Cristóbal de Las Casas, Chiapas, México · Octubre de 2026*
