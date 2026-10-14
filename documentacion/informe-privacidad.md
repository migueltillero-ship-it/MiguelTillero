# Informe de privacidad

Búsqueda automática de patrones sensibles sobre **12 archivos** de texto
de la carpeta `documentacion/`, hecha antes de empaquetar.

## Patrones buscados

- Correo electrónico
- Teléfono (10+ dígitos)
- CLABE (18 dígitos)
- Identificador UUID
- Clave Supabase (sb_)
- Contraseña en texto (pwd=)
- Referencia del proyecto
- Enlace de inscripción
- Enlace de WhatsApp
- Enlace de reunión de Zoom
- Nombres de los estudiantes y de sus familias

## Resultado

**Un hallazgo, ya corregido.** En la revisión de la versión 2.0 (14 de octubre) apareció el nombre de una alumna en un mensaje del registro de cambios; se reemplazó por «una alumna (nombre omitido)». La única otra coincidencia es la propia palabra «pwd=» en la lista de patrones de este informe. Fuera de eso, ningún patrón aparece en el material.

## Qué se excluyó del recuento

Los ejemplos inventados a propósito (`ejemplo.com`, «Alumno A», «Familia B»,
`CORREO-DE-…`) y los marcadores de los propios documentos. No son datos de
nadie.

## Las imágenes

La búsqueda automática recorre texto, no imágenes. Las catorce capturas se
revisaron **una a una, a tamaño completo**, antes de incluirse:

- Se recortó la barra del navegador de todas las que la tenían.
- Se taparon con bloque opaco cuatro zonas: el enlace de inscripción (figura 2),
  un nombre en un desplegable (figura 9), el nombre del estudiante evaluado
  (figura 11) y la marca de agua del visor con el nombre y el correo del lector
  (figura 14).
- Cinco capturas se generaron desde cero con datos inventados.
- El boletín de resultados y las conversaciones de WhatsApp no se incluyen.

## Metadatos de las imágenes

Se comprobó además que ninguno de los catorce PNG arrastra metadatos
incrustados (autor, dispositivo, ubicación). Los catorce están limpios.

---

*Informe regenerado antes del empaquetado de la versión 2.0 · 14 de octubre de 2026*
