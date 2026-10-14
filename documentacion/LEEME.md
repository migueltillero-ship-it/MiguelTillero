# Vive el francés · Documentación del proyecto

**Plataforma educativa de Miguel David Tillero Álvarez, profesor de francés (FLE).**
Versión 2.0 · estado de la plataforma al 14 de octubre de 2026.

Esta carpeta reúne todo lo necesario para entender el proyecto sin tener que
leer el código ni haber estado presente mientras se construía.

---

## La forma más fácil: un solo documento

**`Vive-el-frances-Documentacion-completa.pdf`** contiene todo, en este orden:

| Parte | Qué es | Para quién | Tiempo |
|---|---|---|---|
| Guía inicial | Qué hay en el documento, qué cambió desde la primera versión y qué comentarios serían útiles | Todos | 3 min |
| **1 · Presentación** | Por qué existe, qué resuelve, cómo se hizo (siete fases con fechas reales), cifras y hoja de ruta. **Empieza aquí.** | Todos | ~20 min |
| **2 · Manual de funciones** | 18 fichas, una por función, por perfil: para qué sirve, quién la usa, paso a paso y límites | Todos, a consulta | ~30 min |
| **3 · Capturas** | Las 14 pantallas que cita el manual, con su pie explicativo | Todos | — |
| **4 · Anexo técnico** | Arquitectura, 30 tablas, seguridad, los 29 guiones de base de datos, decisiones y deuda técnica. **Opcional** | Perfil técnico | ~20 min |
| **5 · Registro de cambios** | 157 cambios sustantivos del 7 de septiembre al 9 de octubre, en siete fases | Perfil técnico | a consulta |
| **6 · Informe de privacidad** | Qué se retiró o se tapó y el resultado de la búsqueda automática | Todos | 2 min |

**Si solo hay tiempo para una cosa:** la presentación.

---

## Los mismos documentos, por separado

| Carpeta | Contenido |
|---|---|
| `1-Presentacion/` | `presentacion.pdf` y `.html` |
| `2-Manual/` | `manual-funciones.pdf` y `.html` |
| `3-Anexo-tecnico/` | `anexo-tecnico.pdf` y `.html` |
| `4-Capturas/` | Las 14 figuras en PNG y su índice (`LEEME.md`) con qué hay debajo de cada bloque opaco |
| esta carpeta | `registro-de-cambios.md`, `informe-privacidad.md` y `generar-documento-unico.py`, que vuelve a armar el documento único si se edita alguna parte |

Cada carpeta tiene su propio `LEEME.md`.

---

## Qué cambió respecto de la versión 1.0 (9 de octubre)

- **Fase 7** en la cronología (4 al 9 de octubre): libro virtual, segundo grupo (B2), boletines para cualquier grupo y enlaces de Zoom fuera del repositorio.
- El libro virtual y el grupo B2 figuraban como «no construidos»: **ya funcionan**. Fichas nuevas o corregidas: 1, 10, 12, 14, 16 y 17.
- Cifras actualizadas y verificadas contra el repositorio.
- Cuatro capturas nuevas (figuras 11 a 14).
- Se retiró el nombre de una alumna que aparecía en el registro de cambios.

---

## Sobre la privacidad

Esta documentación está pensada para compartirse, y **los estudiantes son
menores de edad**:

- No aparecen nombres, correos ni teléfonos de estudiantes o familias. Donde
  hacía falta un ejemplo, se inventó uno («Alumno A», «Familia B»).
- No se incluyen claves, identificadores de la base de datos, datos bancarios,
  códigos de acceso, enlaces de inscripción ni enlaces de clase.
- Las capturas con datos reales llevan **bloques opacos**, no desenfoque.
- **No se incluye ninguna conversación de WhatsApp.**
- El resultado de la búsqueda automática está en `informe-privacidad.md`.

Por favor, no reenvíes este material fuera del grupo de revisión.

---

## Qué agradecería

- **Qué función falta**, de las que ustedes echan de menos cada semana en su
  propia práctica docente.
- **Qué parte no se entiende** leyendo el manual.
- **Dónde ven un riesgo**, sobre todo en lo que toca a datos de menores.

---

*Miguel David Tillero Álvarez · San Cristóbal de Las Casas, Chiapas, México · Octubre de 2026*
