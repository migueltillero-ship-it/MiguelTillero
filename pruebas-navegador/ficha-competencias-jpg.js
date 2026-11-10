/* Convierte la ficha «Desempeño en competencias» de un estudiante en JPG, tal
   como la ve su familia, para mandarla por WhatsApp.
   Uso: node pruebas-navegador/ficha-competencias-jpg.js <datos.json> <carpeta> <nombre-del-archivo>
   <datos.json> es lo que devuelve desempeno_competencias_de(<id>) en la base. Ese
   archivo lleva datos de un menor: guárdalo fuera del repositorio y bórralo después.
   Las tarjetas aparecen al llegar a ellas, por eso se recorre la página entera
   antes de fotografiarla. Genera una versión para teléfono y otra ancha. */
const { chromium } = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'), path = require('path');
const [, , datosPath, salida, nombre] = process.argv;
if (!datosPath || !salida || !nombre) { console.error('Uso: node ficha-competencias-jpg.js <datos.json> <carpeta> <nombre-del-archivo>'); process.exit(1); }
const raiz = path.resolve(__dirname, '..');
const D = JSON.parse(fs.readFileSync(datosPath, 'utf8'));
const stub = '<script>const supabaseConfigurado=true; async function requerirSesion(){return {perfil:{role:"representante"}}} function destinoParaRol(){return "#"} const supabaseClient={rpc:async()=>({data:' + JSON.stringify(D) + ',error:null})};</script>';
const html = fs.readFileSync(raiz + '/desempeno.html', 'utf8')
  .replace(/<script src="https:\/\/cdn\.jsdelivr[^>]*><\/script>/, '')
  .replace(/<script src="assets\/js\/auth-helpers[^>]*><\/script>/, '')
  .replace(/<script src="assets\/js\/supabase-config[^>]*><\/script>/, stub);
const tmp = raiz + '/.ficha-jpg.html'; fs.writeFileSync(tmp, html);
(async () => {
  const n = await chromium.launch(); const errores = [];
  try {
    for (const [w, tag] of [[430, 'movil'], [1100, 'escritorio']]) {
      const p = await n.newPage({ viewport: { width: w, height: 900 }, deviceScaleFactor: 2 });
      p.on('pageerror', e => errores.push(e.message));
      await p.goto('file://' + tmp); await p.waitForTimeout(2500);
      const alto = await p.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y < alto; y += 300) { await p.evaluate(v => window.scrollTo(0, v), y); await p.waitForTimeout(250); }
      await p.waitForTimeout(1800); await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(600);
      await p.screenshot({ path: path.join(salida, nombre + '-' + tag + '.jpg'), type: 'jpeg', quality: 92, fullPage: true });
      await p.close();
    }
  } finally { fs.unlinkSync(tmp); await n.close(); }
  console.log(errores.length ? 'ERRORES: ' + errores.join(' | ') : 'Listo, sin errores de JavaScript.');
})();
