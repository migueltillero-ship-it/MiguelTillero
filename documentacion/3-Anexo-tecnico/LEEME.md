# 3 · Anexo técnico

Cómo está construida la plataforma por dentro.

| Archivo | Qué es |
|---|---|
| `anexo-tecnico.pdf` | Para leer o imprimir. |
| `anexo-tecnico.html` | La misma versión, para el navegador. |

**Extensión:** 11 páginas.

## Para quién es

Para quien quiera comprobar que lo descrito en el manual está realmente
construido, y cómo. **No hace falta leerlo** para hacerse una idea del
proyecto: para eso está la presentación.

## Contenido

1. **Arquitectura** — dos piezas: alojamiento estático y base de datos con
   autenticación. Sin servidor propio, y qué consecuencia tiene eso.
2. **Modelo de datos** — las 28 tablas, agrupadas por función.
3. **Seguridad por filas** — el mecanismo que sostiene toda la privacidad,
   contado a través de los tres fallos reales que hubo que corregir: una
   recursión en las reglas y dos huecos por los que se filtraban datos.
4. **Orden de ejecución** — los 25 guiones de base de datos y sus dependencias.
5. **Decisiones técnicas y su porqué** — ocho decisiones explicadas, incluida
   una función que se construyó y se retiró una semana después.
6. **Deuda técnica reconocida** — lo que un revisor encontraría, dicho antes de
   que lo encuentre.
