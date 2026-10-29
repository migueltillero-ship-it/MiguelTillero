/* Las fichas con fecha de apertura: no deben verse antes de tiempo. */
const { chromium } = require('/opt/node-tools/node_modules/playwright');

(async () => {
  const b = await chromium.launch();
  const errores = [];

  async function abrir(fechaFalsa) {
    const p = await b.newPage();
    p.on('pageerror', e => errores.push(e.message));
    // Se finge la fecha del navegador para ver el antes y el después.
    await p.addInitScript(`{
      const Real = Date;
      const falsa = new Real('${fechaFalsa}T12:00:00');
      window.Date = class extends Real {
        constructor(...a){ return a.length ? new Real(...a) : new Real(falsa); }
        static now(){ return falsa.getTime(); }
      };
    }`);
    await p.goto('file:///home/user/MiguelTillero/estudiantes/espace-b2-exercices.html');
    await p.waitForTimeout(400);
    return p;
  }

  const antes = await abrir('2026-10-25');
  const nAntes = await antes.locator('#grille-fiches .carte').count();
  console.log('1. El 25 de octubre se ven 11 fichas (sin las dos pruebas):',
              nAntes === 11 ? '✓' : '✗ (' + nAntes + ')');
  const textoAntes = await antes.locator('#grille-fiches').innerText();
  console.log('2. La épreuve blanche no aparece:',
              textoAntes.includes('Épreuve blanche') ? '✗' : '✓');

  await antes.goto('file:///home/user/MiguelTillero/estudiantes/espace-b2-exercices.html#s11');
  await antes.reload();   // cambiar solo el ancla no recarga la página
  await antes.waitForTimeout(400);
  const aviso = await antes.locator('#f-cuerpo').innerText();
  console.log('3. Por enlace directo dice cuándo se abre:',
              aviso.includes('9 novembre') ? '✓' : '✗ «' + aviso.slice(0, 60) + '»');

  const durante = await abrir('2026-11-09');
  const nDurante = await durante.locator('#grille-fiches .carte').count();
  console.log('4. El 9 de noviembre aparece la épreuve blanche (12):',
              nDurante === 12 ? '✓' : '✗ (' + nDurante + ')');

  const despues = await abrir('2026-11-16');
  const nDespues = await despues.locator('#grille-fiches .carte').count();
  console.log('5. El 16 están las trece:', nDespues === 13 ? '✓' : '✗ (' + nDespues + ')');

  console.log(errores.length ? '\nErrores JS: ' + errores.join(' | ') : '\nSin errores de JavaScript ✓');
  await b.close();
})();
