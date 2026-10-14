"""Une la documentación en un solo HTML (y de ahí un solo PDF).

Uso:  python generar-documento-unico.py
Genera Vive-el-frances-Documentacion-completa.html en esta carpeta.
Las fuentes son los HTML de cada parte, el índice de capturas,
el registro de cambios y el informe de privacidad: se editan allí.
"""
import html
import os
import re

AQUI = os.path.dirname(os.path.abspath(__file__))
leer = lambda r: open(os.path.join(AQUI, r), encoding='utf-8').read()


def cuerpo(ruta):
    s = leer(ruta)
    b = re.search(r'<body[^>]*>([\s\S]*)</body>', s).group(1)
    return b


def md_a_html(md):
    """Conversor mínimo para los .md de esta carpeta: títulos, tablas, listas, párrafos."""
    def linea(t):
        t = html.escape(t, quote=False)
        t = re.sub(r'`([^`]+)`', r'<code>\1</code>', t)
        t = re.sub(r'\*\*([^*]+)\*\*', r'<strong>\1</strong>', t)
        t = re.sub(r'(?<![*\w])\*([^*]+)\*(?!\w)', r'<em>\1</em>', t)
        return t
    out, tabla, lista, parrafo = [], [], [], []

    def cerrar():
        nonlocal tabla, lista, parrafo
        if tabla:
            filas = [f for f in tabla if not re.match(r'^\|[\s|:-]+\|$', f)]
            celdas = [[c.strip() for c in f.strip('|').split('|')] for f in filas]
            h = ''.join(f'<th>{linea(c)}</th>' for c in celdas[0])
            cuerpo_t = ''.join('<tr>' + ''.join(f'<td>{linea(c)}</td>' for c in fila) + '</tr>' for fila in celdas[1:])
            out.append(f'<table><thead><tr>{h}</tr></thead><tbody>{cuerpo_t}</tbody></table>')
            tabla = []
        if lista:
            out.append('<ul>' + ''.join(f'<li>{linea(x)}</li>' for x in lista) + '</ul>')
            lista = []
        if parrafo:
            out.append('<p>' + linea(' '.join(parrafo)) + '</p>')
            parrafo = []

    for l in md.splitlines():
        t = l.rstrip()
        if t.startswith('|'):
            if lista or parrafo:
                cerrar()
            tabla.append(t)
            continue
        if tabla:
            cerrar()
        if not t.strip() or t.strip() == '---':
            cerrar()
        elif t.startswith('# '):
            cerrar()
        elif t.startswith('## '):
            cerrar(); out.append(f'<h3>{linea(t[3:])}</h3>')
        elif t.startswith('### '):
            cerrar(); out.append(f'<h4>{linea(t[4:])}</h4>')
        elif re.match(r'^\s*[-*] ', t):
            if parrafo:
                cerrar()
            lista.append(re.sub(r'^\s*[-*] ', '', t))
        elif lista and t.startswith('  '):
            lista[-1] += ' ' + t.strip()
        else:
            parrafo.append(t.strip())
    cerrar()
    return '\n'.join(out)


estilo = re.search(r'<style>([\s\S]*?)</style>', leer('2-Manual/manual-funciones.html')).group(1)
estilo += """
.parte { break-before: page; }
.figuras figure { break-inside: avoid; margin: 0 0 1.6rem; }
.figuras figure img { max-height: 190mm; object-fit: contain; }
.guia td:first-child { white-space: nowrap; }
"""

# Figuras, con el pie tomado del índice de capturas
figuras = []
for fila in re.findall(r'^\| \*\*(\d+)\*\* \| `([^`]+\.png)` \| (.+?) \| (.+?) \|$', leer('4-Capturas/LEEME.md'), re.M):
    n, archivo, que, origen = fila
    pie = re.sub(r'\*\*([^*]+)\*\*', r'<b>\1</b>', html.escape(que, quote=False))
    figuras.append(
        f'<figure><img src="4-Capturas/capturas/{archivo}" alt="Figura {n}">'
        f'<figcaption><b>Figura {n}.</b> {pie} <em>({html.escape(origen)})</em></figcaption></figure>')

guia = """
<header class="portada">
    <div class="marca">Miguel <span>Tillero</span></div>
    <p class="eyebrow">Plataforma educativa · Documentación completa para revisión</p>
    <h1>Vive el francés<br><em>Todo el proyecto en un solo documento</em></h1>
    <p class="sub">Presentación, manual de funciones, capturas, anexo técnico y registro de cambios.
       Documento dirigido a colegas docentes de francés.</p>
    <p class="pie-portada">
        Miguel David Tillero Álvarez · Profesor de FLE<br>
        San Cristóbal de Las Casas, Chiapas, México<br>
        Octubre de 2026 · Versión 2.0 · estado de la plataforma al 14 de octubre
    </p>
</header>

<h2>Qué encontrarás en este documento</h2>
<p>Este archivo reúne, en un solo lugar y en este orden, todo lo que hace falta para entender
la plataforma «Vive el francés» sin leer el código ni haber estado presente mientras se
construía. Cada parte se lee sola: no hace falta terminar una para empezar la siguiente.</p>

<table class="guia">
    <thead><tr><th>Parte</th><th>Qué contiene</th><th>Para quién</th><th>Tiempo</th></tr></thead>
    <tbody>
    <tr><td><strong>1 · Presentación</strong></td><td>Por qué existe la plataforma, los problemas que resuelve, el objetivo y la visión, la cronología en siete fases con sus fechas reales, las cifras y la hoja de ruta. <strong>Empieza aquí.</strong></td><td>Todos</td><td>unos 20 min</td></tr>
    <tr><td><strong>2 · Manual de funciones</strong></td><td>Dieciocho fichas, una por función, organizadas por perfil (docente y administración, estudiante, familia). Cada ficha dice para qué sirve, quién la usa, el paso a paso y sus límites.</td><td>Todos, a consulta</td><td>unos 30 min</td></tr>
    <tr><td><strong>3 · Capturas</strong></td><td>Las catorce pantallas que cita el manual, con su pie explicativo.</td><td>Todos</td><td>—</td></tr>
    <tr><td><strong>4 · Anexo técnico</strong></td><td>Arquitectura, las 30 tablas, la seguridad por filas, el orden de los 29 guiones de base de datos, las decisiones con su porqué y la deuda técnica reconocida. <strong>Opcional.</strong></td><td>Perfil técnico</td><td>unos 20 min</td></tr>
    <tr><td><strong>5 · Registro de cambios</strong></td><td>Los cambios sustantivos del 7 de septiembre al 9 de octubre de 2026, con fecha y código, agrupados en siete fases.</td><td>Perfil técnico</td><td>a consulta</td></tr>
    <tr><td><strong>6 · Informe de privacidad</strong></td><td>Qué se retiró o se tapó antes de compartir este material, y el resultado de la búsqueda automática de datos sensibles.</td><td>Todos</td><td>2 min</td></tr>
    </tbody>
</table>

<div class="nota">
    <span class="et">Si solo hay tiempo para una cosa</span>
    Lee la presentación (parte 1). Está pensada para entenderse sola. Si la pregunta es
    «¿esto qué hace exactamente?», busca la ficha correspondiente en el manual (parte 2).
</div>

<h3>Qué cambió respecto de la primera versión (9 de octubre)</h3>
<ul>
<li>La cronología suma la <strong>fase 7</strong> (4 al 9 de octubre): el libro virtual, el segundo grupo (B2), los boletines para cualquier grupo y los enlaces de Zoom fuera del repositorio.</li>
<li>El libro virtual y el grupo B2 aparecían como «no construidos»: <strong>ya funcionan</strong>, y el manual tiene tres fichas nuevas o corregidas (1, 14 y 16).</li>
<li>Se corrigieron la ficha de la prueba oral (ahora publica en el boletín) y la de boletines (página con selector de grupo y envío por WhatsApp).</li>
<li>Las cifras se actualizaron y verificaron contra el repositorio: 212 cambios, 26 días de trabajo, 49 páginas, 30 tablas, 29 guiones, 2 grupos y 24 sesiones.</li>
<li>Se añadieron cuatro capturas (figuras 11 a 14).</li>
</ul>

<h3>Qué agradecería que me dijeran</h3>
<ul>
<li><strong>Qué función falta</strong>, de las que ustedes echan de menos cada semana en su propia práctica docente.</li>
<li><strong>Qué parte no se entiende</strong> leyendo el manual. Si no se entiende escrito, tampoco se entenderá usándola.</li>
<li><strong>Dónde ven un riesgo</strong>, sobre todo en lo que toca a datos de menores de edad.</li>
</ul>

<div class="nota">
    <span class="et">Privacidad</span>
    Los estudiantes son, en su mayoría, menores de edad. En este documento no aparecen sus
    nombres, correos ni teléfonos; tampoco claves, identificadores de la base de datos, datos
    bancarios, enlaces de acceso ni conversaciones de WhatsApp. Las capturas con datos reales
    llevan bloques opacos. Por favor, no reenvíes este documento fuera del grupo de revisión.
</div>
"""


def parte(n, titulo, contenido):
    return f'<section class="parte" id="parte-{n}">{contenido}</section>'


def portada_simple(n, titulo, sub):
    return (f'<header class="portada"><div class="marca">Miguel <span>Tillero</span></div>'
            f'<p class="eyebrow">Parte {n}</p><h1>{titulo}</h1><p class="sub">{sub}</p></header>')


def interior(ruta):
    # Quita el envoltorio .hoja de cada documento para anidarlo en el único
    b = cuerpo(ruta).strip()
    b = re.sub(r'^<div class="hoja">', '', b)
    b = re.sub(r'</div>\s*$', '', b)
    return b


doc = f"""<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Vive el francés · Documentación completa</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Syne:wght@400;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
<style>{estilo}</style>
</head>
<body>
<div class="hoja">
{guia}
{parte(1, 'Presentación', interior('1-Presentacion/presentacion.html'))}
{parte(2, 'Manual de funciones', interior('2-Manual/manual-funciones.html'))}
{parte(3, 'Capturas', portada_simple(3, 'Capturas', 'Las catorce pantallas que cita el manual, numeradas y con su pie explicativo. Los datos personales aparecen tapados con bloques opacos.') + '<div class="figuras">' + ''.join(figuras) + '</div>')}
{parte(4, 'Anexo técnico', interior('3-Anexo-tecnico/anexo-tecnico.html'))}
{parte(5, 'Registro de cambios', portada_simple(5, 'Registro de cambios', 'Qué se hizo, cuándo y en qué cambio del historial, del 7 de septiembre al 9 de octubre de 2026.') + md_a_html(leer('registro-de-cambios.md')))}
{parte(6, 'Informe de privacidad', '<h2>6 · Informe de privacidad</h2>' + md_a_html(leer('informe-privacidad.md')))}
<p class="pie-doc">Vive el francés · Plataforma educativa<br>
Miguel David Tillero Álvarez · Profesor de francés (FLE)<br>
Documentación completa · Versión 2.0 · Octubre de 2026</p>
</div>
</body>
</html>"""

salida = os.path.join(AQUI, 'Vive-el-frances-Documentacion-completa.html')
open(salida, 'w', encoding='utf-8').write(doc)
print('ok', salida, len(figuras), 'figuras')
