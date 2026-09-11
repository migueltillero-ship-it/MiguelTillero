# Cómo añadir un video al carrusel

El carrusel aparece en `index.html` y en `galeria.html`, y los dos leen la
misma lista: el archivo `videos.json` de esta carpeta. Añadir un video son
dos pasos.

## 1. Sube el archivo

Copia el `.mp4` dentro de esta carpeta (`assets/videos/`). Dale un nombre
sin espacios ni acentos, por ejemplo `clase-b2-septiembre.mp4`.

## 2. Añádelo a `videos.json`

Abre `videos.json` y agrega un bloque más dentro de `"videos"`, separado
del anterior por una coma:

```json
{
  "archivo": "assets/videos/clase-b2-septiembre.mp4",
  "poster": "assets/images/portrait-miguel-1.jpg",
  "titulo": "Una clase de B2",
  "descripcion": "De qué trata el video, en una línea."
}
```

- **`archivo`** es obligatorio: la ruta tal como se ve desde la raíz del
  sitio. Los videos que ya estaban en la raíz se escriben sin carpeta
  (`profesor-miguel-tillero.mp4`); los nuevos van con la suya
  (`assets/videos/nombre.mp4`).
- **`poster`** es la imagen que se ve antes de darle play. Si la omites,
  el recuadro queda en negro hasta que el video arranca.
- **`titulo`** y **`descripcion`** son opcionales. Puedes añadir las
  versiones en francés e inglés con `titulo_fr`, `titulo_en`,
  `descripcion_fr` y `descripcion_en`.

El orden de la lista es el orden en que se ven en el carrusel.

## Detalles que conviene saber

- **Los videos no se descargan hasta que alguien le da play.** Antes solo
  se carga el póster, así que tener videos pesados en la lista no hace
  lenta la página.
- **Si un archivo no existe, su tarjeta no se muestra** en vez de romper
  el carrusel. Si subes un video y no aparece, casi siempre es que el
  nombre en `videos.json` no coincide con el del archivo (ojo con
  mayúsculas y minúsculas: para el servidor no son lo mismo).
- **Si la lista queda vacía, la sección entera desaparece** de las dos
  páginas.
- GitHub rechaza archivos de más de 100 MB. Si un video pesa más, hay que
  comprimirlo antes de subirlo.
