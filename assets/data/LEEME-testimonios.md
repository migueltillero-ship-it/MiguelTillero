# Testimonios en video o audio

La página **Testimonios** muestra una sección «Voces de mis estudiantes» solo cuando
hay al menos un testimonio autorizado en `testimonios-media.json`. Mientras la lista
esté vacía, la sección no aparece.

## Cómo publicar uno

1. Copia el archivo a `assets/videos/testimonios/` (video: `.mp4`; audio: `.mp3` o `.m4a`).
   Nombre sin espacios ni acentos, por ejemplo `ana-delf-b1.mp4`.
2. Abre `testimonios-media.json` y agrega un bloque dentro de `"items"`
   (separados por coma):

```json
{
  "tipo": "video",
  "archivo": "assets/videos/testimonios/ana-delf-b1.mp4",
  "poster": "assets/images/testimonios/ana-delf-b1.jpg",
  "nombre": "Ana",
  "detalle": "DELF B1 · Cuenca",
  "cita": {
    "es": "Con Miguel el francés dejó de darme miedo.",
    "fr": "Avec Miguel, le français ne me fait plus peur.",
    "en": "With Miguel, French stopped scaring me."
  },
  "autorizado": true
}
```

- `"tipo"`: `"video"` o `"audio"`.
- `"poster"`: imagen previa (solo video; opcional).
- `"cita"`: texto corto bajo el reproductor, en los tres idiomas (si falta uno, se usa el español).
- `"autorizado": true` es obligatorio: sin él, el testimonio no se muestra.
