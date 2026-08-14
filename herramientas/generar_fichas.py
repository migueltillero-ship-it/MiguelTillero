#!/usr/bin/env python3
"""
Convierte datos/grupos.txt (dictado) en fichas, calendarios y saldos.

    python3 herramientas/generar_fichas.py

Genera datos/generado/{grupos,estudiantes,calendario}.json y avisa de
cualquier línea que no haya podido interpretar, en lugar de descartarla
en silencio. Cuando a un grupo le faltan datos para calcular su
calendario, lo dice en vez de inventar fechas.
"""
import json
import os
import re
import sys
import unicodedata
from datetime import date, timedelta

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ENTRADA = os.path.join(RAIZ, "datos", "grupos.txt")
SALIDA = os.path.join(RAIZ, "datos", "generado")

CAMPOS = {
    "grupo": "grupo", "nombre del grupo": "grupo", "curso": "grupo",
    "tipo": "tipo",
    "nivel": "nivel",
    "dias": "dias", "dia": "dias", "dias de clase": "dias",
    "hora": "hora", "horario": "hora", "horarios": "hora",
    "modalidad": "modalidad",
    "inicio": "inicio", "fecha de inicio": "inicio", "comienza": "inicio",
    "primera": "primera", "primera sesion": "primera",
    "desde": "desde", "reanuda": "desde", "retoma": "desde",
    "paquete": "paquete", "total": "paquete", "horas": "paquete",
    "tomadas": "tomadas", "impartidas": "tomadas", "cursadas": "tomadas",
    "fin": "fin", "fecha de fin": "fin", "termina": "fin",
    "notas": "notas", "nota": "notas", "observaciones": "notas",
    "estudiantes": "estudiantes", "alumnos": "estudiantes",
}

SEMANA = {"lunes": 0, "martes": 1, "miercoles": 2, "jueves": 3,
          "viernes": 4, "sabado": 5, "domingo": 6}
NOMBRE_DIA = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"]
MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio",
         "agosto", "septiembre", "octubre", "noviembre", "diciembre"]


def sin_acentos(t):
    return "".join(c for c in unicodedata.normalize("NFD", t)
                   if unicodedata.category(c) != "Mn")


def clave(texto):
    return re.sub(r"\s+", " ", sin_acentos(texto).strip().lower())


def id_desde(nombre, usados):
    base = re.sub(r"[^a-z0-9]+", "-", sin_acentos(nombre).lower()).strip("-") or "x"
    ident, n = base, 2
    while ident in usados:
        ident, n = f"{base}-{n}", n + 1
    usados.add(ident)
    return ident


def en_letra(d):
    return f"{NOMBRE_DIA[d.weekday()]} {d.day} de {MESES[d.month - 1]} de {d.year}"


def parte_es_correo(p):
    return "@" in p and "." in p.split("@")[-1]


def parte_es_telefono(p):
    return len(re.sub(r"\D", "", p)) >= 7 and not parte_es_correo(p)


def parte_es_nivel(p):
    return bool(re.fullmatch(r"[ABC][12](\.[0-9])?", p.strip().upper()))


def parte_es_menor(p):
    return clave(p) in ("menor", "menor de edad", "es menor", "es menor de edad")


def parte_es_representante(p):
    """'representante: Santiago Mena' o 'papá Santiago Mena' -> el nombre."""
    k = clave(p)
    for pref in ("representante legal", "representante", "tutora", "tutor",
                 "responsable", "mama", "madre", "papa", "padre"):
        if k.startswith(pref):
            resto = p[len(pref):].lstrip(" :-·.")
            return resto.strip() or None
    return None


def leer_estudiante(linea):
    partes = [p.strip() for p in linea.split(",") if p.strip()]
    if not partes:
        return None
    f = {"nombre": partes[0], "correo": "", "telefono": "", "nivel": "",
         "menor": False, "representante": "", "tel_representante": ""}
    for p in partes[1:]:
        rep = parte_es_representante(p)
        if parte_es_menor(p):
            f["menor"] = True
        elif rep is not None:
            f["representante"] = rep
            f["menor"] = True          # tener representante implica ser menor
        elif parte_es_correo(p) and not f["correo"]:
            f["correo"] = p
        elif parte_es_nivel(p) and not f["nivel"]:
            f["nivel"] = p.strip().upper()
        elif parte_es_telefono(p):
            # el primer teléfono es del estudiante; el segundo, del representante
            if not f["telefono"] and not f["representante"]:
                f["telefono"] = p
            elif f["representante"] and not f["tel_representante"]:
                f["tel_representante"] = p
            elif not f["telefono"]:
                f["telefono"] = p
        else:
            f["nombre"] += ", " + p
    return f


def leer_fecha(txt):
    m = re.search(r"(\d{4})-(\d{1,2})-(\d{1,2})", txt or "")
    return date(*map(int, m.groups())) if m else None


def leer_dias(txt):
    return sorted({SEMANA[k] for k in SEMANA if k in clave(txt or "")})


def leer_duracion(txt):
    """'19:00-20:00' -> 1.0 ; '18:00 a 19:30' -> 1.5"""
    h = re.findall(r"(\d{1,2}):(\d{2})", txt or "")
    if len(h) < 2:
        return None
    ini = int(h[0][0]) * 60 + int(h[0][1])
    fin = int(h[1][0]) * 60 + int(h[1][1])
    return round((fin - ini) / 60, 2) if fin > ini else None


def leer_horas(txt):
    m = re.search(r"(\d+(?:[.,]\d+)?)", txt or "")
    return float(m.group(1).replace(",", ".")) if m else None


def calendario(g, hoy=None):
    """Calcula las sesiones del ciclo y la fecha de cierre.

    Dos modos, según cómo empezó el curso:

      INICIO  el ciclo se planifica entero desde esa fecha, incluidas las
              sesiones ya impartidas (marcadas como pasadas). Es lo que
              necesita un contrato: el ciclo completo de principio a fin.

      DESDE   solo se agendan las horas que faltan, a partir de esa fecha.
              Sirve cuando las horas ya tomadas fueron en fechas sueltas
              y no siguen el patrón semanal.

    Devuelve (sesiones, motivo_si_no_se_puede). Nunca inventa una fecha:
    si falta un dato, lo nombra para poder pedirlo.
    """
    hoy = hoy or date.today()
    total = leer_horas(g.get("paquete"))
    if total is None:
        return [], "falta el total de horas del ciclo (PAQUETE)"
    dur = leer_duracion(g.get("hora"))
    if dur is None:
        return [], "falta el horario con hora de inicio y fin (HORA)"

    dias = leer_dias(g.get("dias"))
    primera = leer_fecha(g.get("primera"))
    inicio = leer_fecha(g.get("inicio"))
    desde = leer_fecha(g.get("desde"))
    tomadas = leer_horas(g.get("tomadas")) or 0.0

    if desde:
        por_agendar, arranque = total - tomadas, desde
        if por_agendar <= 0:
            return [], "el paquete ya está consumido"
    elif inicio or primera:
        por_agendar, arranque = total, inicio or primera
    else:
        return [], "falta la fecha de inicio (INICIO) o de reanudación (DESDE)"

    if not dias and not primera:
        return [], "faltan los días de clase (DIAS)"

    sesiones, acumulado, restantes = [], 0.0, por_agendar

    if primera and not desde:
        h = min(dur, restantes)
        acumulado += h
        sesiones.append({"fecha": primera.isoformat(), "en_letra": en_letra(primera),
                         "horas": h, "acumulado": round(acumulado, 2),
                         "suelta": True, "pasada": primera < hoy})
        restantes -= h

    if restantes > 0 and not dias:
        return sesiones, "faltan los días de clase (DIAS) para agendar el resto"

    d = arranque
    if primera and not desde and d <= primera:
        d = primera + timedelta(days=1)
    tope = 0
    while restantes > 0 and tope < 800:
        if d.weekday() in dias:
            h = min(dur, restantes)
            acumulado += h
            sesiones.append({"fecha": d.isoformat(), "en_letra": en_letra(d),
                             "horas": h, "acumulado": round(acumulado, 2),
                             "suelta": False, "pasada": d < hoy})
            restantes -= h
        d += timedelta(days=1)
        tope += 1

    return sesiones, None


def analizar(texto):
    grupos, avisos = [], []
    actual, en_est = None, False
    for n, cruda in enumerate(texto.split("\n"), 1):
        linea = cruda.strip()
        if not linea or linea.startswith("#"):
            continue
        if linea.startswith("-"):
            if actual is None:
                avisos.append(f"línea {n}: estudiante fuera de un GRUPO -> {linea[:44]}")
                continue
            if not en_est:
                avisos.append(f"línea {n}: falta 'ESTUDIANTES:' antes de la lista")
                en_est = True
            e = leer_estudiante(linea.lstrip("-").strip())
            if e:
                actual["estudiantes"].append(e)
            continue
        if ":" not in linea:
            # continuación de una NOTAS multilínea
            if actual and actual.get("notas"):
                actual["notas"] += " " + linea
            else:
                avisos.append(f"línea {n}: no entiendo esta línea -> {linea[:44]}")
            continue
        etiqueta, valor = linea.split(":", 1)
        campo = CAMPOS.get(clave(etiqueta))
        valor = valor.strip()
        if campo is None:
            if actual and actual.get("notas"):
                actual["notas"] += " " + linea
            else:
                avisos.append(f"línea {n}: etiqueta desconocida '{etiqueta.strip()}'")
            continue
        if campo == "nivel" and parte_es_nivel(valor):
            valor = valor.strip().upper()
        if campo == "grupo":
            actual = {"grupo": valor, "tipo": "", "nivel": "", "dias": "", "hora": "",
                      "inicio": "", "primera": "", "desde": "", "paquete": "",
                      "tomadas": "", "modalidad": "", "fin": "", "notas": "",
                      "estudiantes": []}
            grupos.append(actual)
            en_est = False
        elif actual is None:
            avisos.append(f"línea {n}: '{etiqueta.strip()}' antes de cualquier GRUPO")
        elif campo == "estudiantes":
            en_est = True
            if valor:
                for nom in valor.split(";"):
                    e = leer_estudiante(nom)
                    if e:
                        actual["estudiantes"].append(e)
        else:
            actual[campo] = valor
            en_est = False
    return grupos, avisos


def main():
    if not os.path.exists(ENTRADA):
        sys.exit(f"No encuentro {ENTRADA}")
    grupos, avisos = analizar(open(ENTRADA, encoding="utf-8").read())

    usados, estudiantes, sin_calendario = set(), [], []
    for g in grupos:
        g["id"] = id_desde(g["grupo"], usados)
        ses, motivo = calendario(g)
        g["sesiones"] = ses
        g["cierre"] = ses[-1]["fecha"] if ses and not motivo else ""
        g["cierre_letra"] = ses[-1]["en_letra"] if ses and not motivo else ""
        g["motivo_sin_calendario"] = motivo or ""
        if motivo:
            sin_calendario.append((g["grupo"], motivo))
        total = leer_horas(g.get("paquete"))
        tomadas = leer_horas(g.get("tomadas")) or 0.0
        g["horas_total"] = total or 0
        g["horas_tomadas"] = tomadas
        g["horas_restantes"] = round(total - tomadas, 2) if total else 0
        for e in g["estudiantes"]:
            e["id"] = id_desde(e["nombre"], usados)
            e["grupo"], e["grupo_id"] = g["grupo"], g["id"]
            e["nivel"] = e["nivel"] or g["nivel"]
            contacto = bool(e["correo"] and e["telefono"])
            e["ficha_completa"] = contacto and (not e["menor"] or bool(e["representante"]))
            estudiantes.append(e)

    os.makedirs(SALIDA, exist_ok=True)
    meta = {"generado": date.today().isoformat()}
    agenda = sorted(
        [{**s, "grupo": g["grupo"], "grupo_id": g["id"]} for g in grupos for s in g["sesiones"]],
        key=lambda s: s["fecha"])
    for nombre, datos in (("grupos", grupos), ("estudiantes", estudiantes),
                          ("calendario", agenda)):
        with open(os.path.join(SALIDA, f"{nombre}.json"), "w", encoding="utf-8") as f:
            json.dump({**meta, nombre: datos}, f, ensure_ascii=False, indent=2)

    print(f"Grupos: {len(grupos)}   Estudiantes: {len(estudiantes)}\n")
    for g in grupos:
        cab = f"  · {g['grupo']}"
        if g["horas_total"]:
            cab += f"  [{g['horas_tomadas']:g}/{g['horas_total']:g} h, faltan {g['horas_restantes']:g}]"
        print(cab)
        print(f"      {len(g['estudiantes'])} estudiante(s)"
              + (f" · {g['dias']} {g['hora']}" if g["dias"] else ""))
        if g["cierre"]:
            print(f"      cierre: {g['cierre_letra']}  ({len(g['sesiones'])} sesiones)")
        elif g["motivo_sin_calendario"]:
            print(f"      sin calendario: {g['motivo_sin_calendario']}")

    faltan = [e for e in estudiantes if not e["ficha_completa"]]
    if faltan:
        print(f"\nFichas por completar ({len(faltan)}) — enviarles el enlace:")
        for e in faltan:
            f = [c for c in ("correo", "telefono") if not e[c]]
            print(f"  · {e['nombre']} ({e['grupo']}): falta {' y '.join(f)}")

    menores = [e for e in estudiantes if e["menor"]]
    if menores:
        print(f"\nMenores de edad ({len(menores)}) — el contrato va a nombre del representante:")
        for e in menores:
            rep = e["representante"] or "SIN REPRESENTANTE REGISTRADO"
            print(f"  · {e['nombre']} ({e['grupo']}) → {rep}")

    if avisos:
        print(f"\nNo pude interpretar {len(avisos)} línea(s):")
        for a in avisos:
            print(f"  ! {a}")

    print("\nEscrito en datos/generado/")


if __name__ == "__main__":
    main()
