# Informe de privacidad

Búsqueda automática de patrones sensibles sobre los **10 archivos** de texto
de la carpeta `documentacion/` —es decir, sobre el material que se va a compartir,
no sobre el código del proyecto—. Repetida el 14 de octubre, tras revisar y
corregir los documentos.

## Patrones buscados

- Correo electrónico
- Teléfono (10+ dígitos)
- CLABE (18 dígitos)
- Identificador UUID
- Clave de Supabase
- Contraseña en texto
- Referencia del proyecto
- Enlace de inscripción
- Enlace de WhatsApp

## Archivos revisados

- `LEEME.md`
- `estilo-documentos.css`
- `registro-de-cambios.md`
- `3-Anexo-tecnico/LEEME.md`
- `3-Anexo-tecnico/anexo-tecnico.html`
- `1-Presentacion/LEEME.md`
- `1-Presentacion/presentacion.html`
- `4-Capturas/LEEME.md`
- `2-Manual/LEEME.md`
- `2-Manual/manual-funciones.html`

## Resultado

**Ningún hallazgo.** Ninguno de los patrones buscados aparece en el material.

## Qué se excluyó del recuento

Los ejemplos inventados a propósito (`ejemplo.com`, «Alumno A», «Familia B»,
`CORREO-DE-…`) y este mismo informe, que enumera los patrones y se encontraría
a sí mismo. No son datos de nadie.

## Las imágenes

La búsqueda automática recorre texto, no imágenes. Las diez capturas se revisaron
**una a una, a tamaño completo**, antes de incluirse:

- Se recortó la barra del navegador de las cinco que la tenían.
- Se taparon con bloque opaco dos zonas: el enlace de inscripción (figura 2) y un
  nombre en un desplegable (figura 9).
- Cinco se generaron desde cero con datos inventados.
- Ninguna arrastra metadatos incrustados.
- El boletín de resultados y las conversaciones de WhatsApp no se incluyen.

---

*Informe generado automáticamente antes del empaquetado · 14 de octubre de 2026*
