# Pruebas de navegador de los espacios de ejercicios

Comprueban en un Chromium de verdad que las fichas se pintan, se corrigen, se
guardan y se ven bien en un teléfono. No tocan la base de datos: los espacios
de ejercicios son páginas sueltas, sin cuenta ni conexión.

## Cómo ejecutarlas

```bash
PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers node pruebas-navegador/ejercicios-b2.js
PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers node pruebas-navegador/ejercicios-a1.js
PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers node pruebas-navegador/filtro-de-ciclos.js
PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers node pruebas-navegador/paliers.js
```

(En otra máquina, cambia la ruta de Playwright por la que tengas instalada.)

## Qué debe salir

Todas las líneas con ✓ y, al final, «Sin errores de JavaScript». Si alguna sale
con ✗, el número entre paréntesis dice lo que encontró en lugar de lo esperado.

| Archivo | Qué comprueba |
|---|---|
| `ejercicios-b2.js` | 17 comprobaciones: las nueve fichas, los cinco tipos de ejercicio que se autocorrigen, que la corrección perdona acentos, que el avance sobrevive a recargar, el borrador de la producción escrita, el móvil y el modo oscuro. |
| `ejercicios-a1.js` | Las mismas, sobre las fichas de A1. |
| `filtro-de-ciclos.js` | Que el filtro por ciclo no estorba cuando solo hay uno, que aparece al llegar el siguiente, que por defecto se ve el ciclo en curso, y que las direcciones del ciclo de octubre siguen redirigiendo. |
| `parcours-video.js` | El recorrido con vídeo: el reproductor pegado, los saltos por minuto al segundo exacto, las etapas, y el sello que solo valida con todo hecho y un 80 % de acierto. |
| `tipos-nuevos.js` | Los cuatro tipos que se juegan: el reto con reloj (que cuenta, corrige al vuelo y dice al final qué falló), la mesa en la que se señala, el orden del menú y la cena con decisiones. |
| `paliers.js` | Las etapas cerradas con llave de la ficha del passé composé: que al entrar solo se pinta la primera, que **las respuestas de una etapa cerrada no están en el HTML**, que con la anterior a medias no abre, que al superarla se abre sola sin recargar, y que el umbral es exactamente el 80 % (con 79 no, con 80 sí). |
| `fichas-con-fecha.js` | Que una ficha con `desde` no se ve antes de tiempo —ni en el índice ni por enlace directo— y que aparece sola el día que toca. Finge el reloj del navegador para ver el antes y el después. |

## Por qué importan los dos últimos

El espacio de ejercicios es **del nivel**, no del ciclo. Cuando empiece el
ciclo siguiente se añaden fichas nuevas con su etiqueta `ciclo` y se cambia
`window.MT_CICLO_ACTUAL` en la página: nada más. `fichas-con-fecha.js` es la
prueba que vigila que eso siga funcionando.

Y `paliers.js` vigila lo otro: que una etapa cerrada esté **de verdad**
cerrada. Si un día alguien «optimiza» el motor pintando todas las secciones y
escondiéndolas con CSS, la ficha seguiría viéndose igual pero las respuestas
estarían en el código fuente, a un clic derecho de distancia. La comprobación
3 de esa prueba es la que se daría cuenta.
