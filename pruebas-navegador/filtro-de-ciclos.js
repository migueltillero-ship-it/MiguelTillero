/* El filtro por ciclo: lo que hace que el espacio sirva el ciclo que viene. */
const { chromium } = require('/opt/node-tools/node_modules/playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  const errores = [];
  p.on('pageerror', e => errores.push(e.message));

  await p.goto('file:///home/user/MiguelTillero/estudiantes/espace-b2-exercices.html');
  await p.waitForTimeout(300);

  const chips0 = await p.locator('#filtros-ciclo .chip-ciclo').count();
  console.log('1. Con un solo ciclo no hay filtro:', chips0 === 0 ? '✓' : '✗ (' + chips0 + ')');

  // Se simula el ciclo siguiente: dos fichas nuevas con otra etiqueta.
  await p.evaluate(() => {
    FICHAS.push({ id:'nueva1', ciclo:'Déc. 2026 - janv. 2027', fecha:'7 décembre',
      titulo:'Ficha del ciclo que viene', resumen:'Prueba', secciones:[], ejercicios:[] });
    FICHAS.push({ id:'nueva2', ciclo:'Déc. 2026 - janv. 2027', fecha:'9 décembre',
      titulo:'Otra del ciclo que viene', resumen:'Prueba', secciones:[], ejercicios:[] });
    pintarHub();
  });
  const chips = await p.locator('#filtros-ciclo .chip-ciclo').count();
  console.log('2. Con dos ciclos aparece el filtro:', chips === 3 ? '✓ (2 ciclos + «Tout voir»)' : '✗ (' + chips + ')');

  const visiblesAhora = await p.locator('#grille-fiches .carte').count();
  console.log('3. Por defecto se ve solo el ciclo en curso:',
              visiblesAhora === 10 ? '✓ 10 fichas' : '✗ (' + visiblesAhora + ')');

  await p.locator('#filtros-ciclo .chip-ciclo').nth(1).click();
  await p.waitForTimeout(150);
  const nuevas = await p.locator('#grille-fiches .carte').count();
  console.log('4. Al elegir el otro ciclo se ven sus fichas:',
              nuevas === 2 ? '✓ 2 fichas' : '✗ (' + nuevas + ')');

  await p.locator('#filtros-ciclo .chip-ciclo').last().click();
  await p.waitForTimeout(150);
  const todas = await p.locator('#grille-fiches .carte').count();
  console.log('5. «Tout voir» muestra los dos ciclos:',
              todas === 12 ? '✓ 12 fichas' : '✗ (' + todas + ')');
  const conCiclo = await p.locator('#grille-fiches .carte .date').first().textContent();
  console.log('6. Y entonces cada tarjeta dice de qué ciclo es:',
              conCiclo.includes('·') ? '✓ «' + conCiclo.trim() + '»' : '✗');

  // El enlace al espacio de curso
  const href = await p.locator('.btn-curso').first().getAttribute('href');
  console.log('7. Enlace al curso del nivel:', href === 'b2.html' ? '✓' : '✗ ' + href);

  // La dirección vieja sigue llevando a la nueva
  await p.goto('file:///home/user/MiguelTillero/estudiantes/b2-oct2026.html');
  await p.waitForTimeout(600);
  console.log('8. La dirección anterior redirige:',
              p.url().endsWith('espace-b2-exercices.html') ? '✓' : '✗ ' + p.url());

  console.log(errores.length ? '\nErrores JS: ' + errores.join(' | ') : '\nSin errores de JavaScript ✓');
  await b.close();
})();
