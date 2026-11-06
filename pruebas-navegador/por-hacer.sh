#!/bin/bash
cd "$(dirname "$0")/.." || exit 1
sed 's#<script src="assets/js/auth-helpers.js[^"]*"></script>##' panel-docente.html > .doc-prueba.html
PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers node pruebas-navegador/por-hacer.js
rm -f .doc-prueba.html
