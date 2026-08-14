#!/usr/bin/env python3
"""
Convierte datos/grupos.txt (dictado) en fichas de estudiante y de grupo.

    python3 herramientas/generar_fichas.py

Genera datos/generado/grupos.json y datos/generado/estudiantes.json,
y avisa de cualquier línea que no haya podido interpretar en lugar de
descartarla en silencio.
"""
import json
import os
import re
import sys
import unicodedata
from datetime import date

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ENTRADA = os.path.join(RAIZ, "datos", "grupos.txt")
SALIDA = os.path.join(RAIZ, "datos", "generado")

# Un mismo campo puede dictarse de varias formas; todas caen en la misma clave.
CAMPOS = {
    "grupo": "grupo", "nombre del grupo": "grupo", "curso": "grupo",
    "nivel": "nivel",
    "horario": "horario", "horarios": "horario",
    "modalidad": "modalidad",
    "inicio": "inicio", "fecha de inicio": "inicio", "comienza": "inicio",
    "fin": "fin", "fecha de fin": "fin", "termina": "fin",
    "notas": "notas", "nota": "notas", "observaciones": "notas",
    "estudiantes": "estudiantes", "alumnos": "estudiantes",
}


def sin_acentos(t):
    return "".join(c for c in unicodedata.normalize("NFD", t)
                   if unicodedata.category(c) != "Mn")


def clave(texto):
    """Normaliza una etiqueta dictada para buscarla en CAMPOS."""
    return re.sub(r"\s+", " ", sin_acentos(texto).strip().lower())


def id_desde(nombre, usados):
    base = re.sub(r"[^a-z0-9]+", "-", sin_acentos(nombre).lower()).strip("-")
    base = base or "estudiante"
    ident, n = base, 2
    while ident in usados:
        ident, n = f"{base}-{n}", n + 1
    usados.add(ident)
    return ident


def parte_es_correo(p):
    return "@" in p and "." in p.split("@")[-1]


def parte_es_telefono(p):
    return len(re.sub(r"\D", "", p)) >= 7 and not parte_es_correo(p)


def parte_es_nivel(p):
    return bool(re.fullmatch(r"[ABC][12](\.[12])?", p.strip().upper()))


def leer_estudiante(linea):
    """'Ana López, ana@x.com, +52 967 123 4567, B2' -> dict.

    El orden es orientativo: cada parte se clasifica por su forma, así que
    dictarlas en otro orden no rompe la ficha.
    """
    partes = [p.strip() for p in linea.split(",") if p.strip()]
    if not partes:
        return None
    ficha = {"nombre": partes[0], "correo": "", "telefono": "", "nivel": ""}
    for p in partes[1:]:
        if parte_es_correo(p) and not ficha["correo"]:
            ficha["correo"] = p
        elif parte_es_nivel(p) and not ficha["nivel"]:
            ficha["nivel"] = p.strip().upper()
        elif parte_es_telefono(p) and not ficha["telefono"]:
            ficha["telefono"] = p
        else:
            # Apellido dictado tras una coma: se une al nombre.
            ficha["nombre"] += ", " + p
    return ficha


def analizar(texto):
    grupos, avisos = [], []
    actual, en_estudiantes = None, False

    for n, cruda in enumerate(texto.split("\n"), 1):
        linea = cruda.strip()
        if not linea or linea.startswith("#"):
            continue

        if linea.startswith("-"):
            if actual is None:
                avisos.append(f"línea {n}: estudiante fuera de un GRUPO -> {linea[:50]}")
                continue
            if not en_estudiantes:
                avisos.append(f"línea {n}: falta 'ESTUDIANTES:' antes de la lista")
                en_estudiantes = True
            e = leer_estudiante(linea.lstrip("-").strip())
            if e:
                actual["estudiantes"].append(e)
            continue

        if ":" not in linea:
            avisos.append(f"línea {n}: no entiendo esta línea -> {linea[:50]}")
            continue

        etiqueta, valor = linea.split(":", 1)
        campo = CAMPOS.get(clave(etiqueta))
        valor = valor.strip()

        if campo is None:
            avisos.append(f"línea {n}: etiqueta desconocida '{etiqueta.strip()}'")
            continue

        if campo == "nivel" and parte_es_nivel(valor):
            valor = valor.strip().upper()

        if campo == "grupo":
            actual = {"grupo": valor, "nivel": "", "horario": "", "modalidad": "",
                      "inicio": "", "fin": "", "notas": "", "estudiantes": []}
            grupos.append(actual)
            en_estudiantes = False
        elif actual is None:
            avisos.append(f"línea {n}: '{etiqueta.strip()}' aparece antes de cualquier GRUPO")
        elif campo == "estudiantes":
            en_estudiantes = True
            if valor:  # 'ESTUDIANTES: Ana, Luis' dictado en una sola línea
                for nombre in valor.split(";"):
                    e = leer_estudiante(nombre)
                    if e:
                        actual["estudiantes"].append(e)
        else:
            actual[campo] = valor
            en_estudiantes = False

    return grupos, avisos


def main():
    if not os.path.exists(ENTRADA):
        sys.exit(f"No encuentro {ENTRADA}")

    grupos, avisos = analizar(open(ENTRADA, encoding="utf-8").read())

    usados, estudiantes = set(), []
    for g in grupos:
        g["id"] = id_desde(g["grupo"], usados)
        for e in g["estudiantes"]:
            e["id"] = id_desde(e["nombre"], usados)
            e["grupo"] = g["grupo"]
            e["grupo_id"] = g["id"]
            e["nivel"] = e["nivel"] or g["nivel"]
            e["ficha_completa"] = bool(e["correo"] and e["telefono"])
            estudiantes.append(e)

    os.makedirs(SALIDA, exist_ok=True)
    meta = {"generado": date.today().isoformat()}
    for nombre, datos in (("grupos", grupos), ("estudiantes", estudiantes)):
        with open(os.path.join(SALIDA, f"{nombre}.json"), "w", encoding="utf-8") as f:
            json.dump({**meta, nombre: datos}, f, ensure_ascii=False, indent=2)

    print(f"Grupos: {len(grupos)}   Estudiantes: {len(estudiantes)}")
    for g in grupos:
        print(f"  · {g['grupo']} ({g['nivel'] or 'sin nivel'}) — {len(g['estudiantes'])} estudiantes")

    faltan = [e for e in estudiantes if not e["ficha_completa"]]
    if faltan:
        print(f"\nFichas por completar ({len(faltan)}) — a estas personas conviene enviarles el enlace:")
        for e in faltan:
            falta = [c for c in ("correo", "telefono") if not e[c]]
            print(f"  · {e['nombre']}: falta {' y '.join(falta)}")

    if avisos:
        print(f"\nNo pude interpretar {len(avisos)} línea(s):")
        for a in avisos:
            print(f"  ! {a}")

    print(f"\nEscrito en datos/generado/")


if __name__ == "__main__":
    main()
