#!/bin/bash
# Prepara las copias sin guardián, corre la prueba y las borra.
cd "$(dirname "$0")/.." || exit 1
sed 's#<script src="assets/js/auth-helpers.js[^"]*"></script>##' panel-estudiante.html > .est-prueba.html
sed 's#<script src="assets/js/auth-helpers.js[^"]*"></script>##' panel-docente.html  > .doc-prueba.html
PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers node pruebas-navegador/pedir-ayuda.js
rm -f .est-prueba.html .doc-prueba.html
