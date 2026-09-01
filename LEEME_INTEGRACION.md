# Vendredi entre Amis — cómo integrarlo a tu repositorio

Este paquete reemplaza al anterior (`vendredi-entre-amis.zip` de la conversación
pasada, que era una versión de una sola página). Esa versión sí funcionaba
completa, pero a mitad de la conversación se decidió pasar a páginas reales
(`cafe.html`, `defis.html`, etc.) para que cada sección tenga su propia URL,
se pueda compartir por WhatsApp y cargue más rápido. Ese cambio quedó a
medias cuando se acabaron los créditos: solo existían `index.html` y
`cafe.html`. Aquí está completo.

## 1. Qué contiene este paquete

```
club.html                    ← tu página de presentación del club (ya existía)
assets/club/*.jpg            ← las 7 fotos de esa página
club/                        ← el espacio interactivo semana a semana (nuevo, completo)
  index.html                 ← Accueil
  data/semaines.json          ← las 52 semanas, 3 temporadas (contenido completo)
  assets/css/main.css         ← base, tipografía, topbar
  assets/css/components.css   ← tarjetas, botones, vocabulario, formularios
  assets/css/accessibility.css← Le Coin Sérénité (A / A+ / A++ / contraste)
  assets/js/*.js               ← lógica compartida + una por página
  pages/cafe.html              ← Le Café du Vendredi
  pages/defis.html             ← Le Défi de la Semaine (con historial)
  pages/carnet.html            ← Mon Carnet de Voyage
  pages/expressions.html       ← La Boîte à Expressions
  pages/culture.html           ← Le Coin Culture
  pages/amis.html               ← Entre Amis
```

`club.html` y la carpeta `club/` son dos cosas distintas y así deben quedar:
- **`club.html`** es la puerta de entrada (fotos, "cómo funciona club", buzón de
  ideas). Ya tenía todo esto de tu conversación anterior; solo le agregué un
  botón nuevo en el encabezado: **"Entrer dans l'espace du club →"**, que
  lleva a `club/index.html`.
- **`club/`** es el espacio interactivo semana a semana al que ese botón
  apunta: vocabulario con pronunciación, pasaporte, carnet, expresiones,
  cultura, defis y la pregunta de "Entre Amis".

## 2. Copia todo a la raíz de tu repositorio

Copia `club.html`, la carpeta `assets/club/` (fusiónala con tu `assets/`
existente, no la reemplaces) y la carpeta `club/` completa a la raíz de tu
repositorio `MiguelTillero`, al mismo nivel que tu `index.html` actual.

## 3. Un solo cambio en tu index.html principal

No incluí tu `index.html` real porque no lo subiste, así que este paso lo
haces tú (o lo reviso si me lo compartes). Dentro de `<ul class="nav-links">`,
justo después de la línea de "Mi espacio", agrega:

```html
<li><a href="club.html" data-es="Club de conversación" data-fr="Club de conversation" data-en="Conversation club">Club de conversación</a></li>
```

No se toca ni se borra nada más de tu sitio.

## 4. Publicar en GitHub Pages (PowerShell, 3 líneas)

Desde la carpeta de tu repositorio local:

```powershell
git add club.html assets/club club index.html
git commit -m "Agregar espacio Vendredi entre Amis (club de conversación completo)"
git push
```

GitHub Pages se actualiza solo, normalmente en 1-2 minutos.

## 5. Cómo actualizar cada viernes

Abre `club/assets/js/progression.js` y cambia SOLO esta línea (está casi al
principio del archivo):

```js
const SEMANA_ACTUAL = 1;   // cámbialo a 2, 3, 4... cada viernes
```

Todo lo demás (destino, vocabulario, expresión, retos, cultura, pasaporte,
Boîte à Expressions acumulada, Coin Culture acumulado) se actualiza solo a
partir de ese número, en todas las páginas. No hay que tocar HTML ni CSS.

## 6. Contenido pedagógico

`club/data/semaines.json` contiene el año completo: 52 semanas en 3
temporadas (Voyage en Francophonie · Parler de soi · Société et Culture),
cada una con vocabulario A1-A2 y B1-B2, una expresión, un reto y —en la
Temporada 1— una nota cultural. Puedes editar cualquier semana directamente
en ese archivo, respetando la misma estructura.

Las preguntas de "Entre Amis" viven en `club/assets/js/page-amis.js` (objeto
`PREGUNTAS_ENTRE_AMIS`); solo cubre algunas semanas de ejemplo — agrega las que
quieras con el mismo formato `numero_de_semana: "pregunta"`. Si una semana no
tiene pregunta propia, se usa una genérica automáticamente.

## 7. Revisión hecha sobre lo que ya estaba construido

- **`nav.js` tenía un enlace muerto** a `pages/serenite.html`, una página que
  nunca se creó porque el "Coin Sérénité" se integró en los botones del
  encabezado (A / A+ / A++ / contraste), como se decidió en la conversación
  anterior. Lo quité del menú para que no haya un enlace que lleve a un 404.
- **El Défi de la semana** ya no vive dentro de `cafe.html` (ese archivo no
  lo mostraba), sino en su propia página `defis.html`, que además guarda un
  historial de los retos de semanas anteriores — reutilizando el helper
  `todosLosDefis()` que ya estaba escrito en `data-loader.js` pero que ninguna
  página usaba todavía.
- Las tres hojas de estilo (`main.css`, `components.css`, `accessibility.css`)
  que las páginas ya pedían no existían; las reconstruí a partir del
  `club.css` completo de la versión anterior de una sola página, que sí tenía
  todos los estilos necesarios.

## 8. Qué es local vs. qué falta para el futuro

El Carnet de Voyage, los retos marcados como completados y las respuestas de
Entre Amis se guardan en el navegador de cada estudiante (localStorage): son
privados y no se pierden entre sesiones, pero no se sincronizan entre
dispositivos ni te llegan a ti. Tu sitio ya usa Firebase
(`assets/firebase-config.js`) — si más adelante quieres que el carnet y el
progreso se guarden en la nube y tú puedas verlos, es la siguiente fase
natural y puedo construirla usando esa misma configuración.

## 9. El buzón de ideas de club.html

En `club.html`, cerca del final, el formulario de "Buzón de ideas" usa
Formspree pero todavía tiene el endpoint de ejemplo sin configurar:

```js
var ENDPOINT = 'https://formspree.io/f/TU_ID_DE_FORMSPREE';
```

Reemplaza `TU_ID_DE_FORMSPREE` por el ID real de tu formulario de Formspree
para que el buzón de ideas funcione. No lo inventé ni lo cambié porque es una
credencial tuya.
