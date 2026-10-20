/* Prueba del espacio de ejercicios B2 en un navegador real. */
const { chromium } = require('/opt/node-tools/node_modules/playwright');

(async () => {
  const navegador = await chromium.launch();
  const pagina = await navegador.newPage();
  const errores = [];
  pagina.on('pageerror', e => errores.push('JS: ' + e.message));
  pagina.on('console', m => { if (m.type() === 'error') errores.push('consola: ' + m.text()); });

  await pagina.goto('file:///home/user/MiguelTillero/estudiantes/espace-b2-exercices.html');
  await pagina.waitForTimeout(400);

  const tarjetas = await pagina.locator('#grille-fiches .carte').count();
  console.log('1. Fichas en el hub:', tarjetas, tarjetas === 9 ? '✓' : '✗ (esperaba 9)');

  /* Abrir la ficha del 21 de octubre (gramática) */
  await pagina.locator('#grille-fiches .carte').nth(2).click();
  await pagina.waitForTimeout(300);
  console.log('2. Título:', await pagina.locator('#f-titulo').textContent());
  const bloques = await pagina.locator('.ex-bloc').count();
  console.log('3. Ejercicios pintados:', bloques, bloques === 7 ? '✓' : '✗ (esperaba 7)');

  /* QCM: responder bien a la primera pregunta del ejercicio de comparativos (ex 4) */
  const qcm = pagina.locator('#ex-4');
  await qcm.locator('.opt[data-q="0"][data-o="0"]').click();
  await qcm.locator('button:has-text("Corriger")').click();
  await pagina.waitForTimeout(200);
  const veredicto = await qcm.locator('.verdict').textContent();
  console.log('4. QCM corregido →', veredicto.trim().slice(0, 60),
              veredicto.includes('1/6') ? '✓' : '✗');
  const juste = await qcm.locator('.opt.juste').count();
  console.log('5. Respuestas correctas marcadas:', juste, juste === 6 ? '✓' : '✗ (una por pregunta)');

  /* Huecos: escribir una buena y una mala */
  const trous = pagina.locator('#ex-2');
  await trous.locator('.trou[data-q="0"]').fill('ce qui');
  await trous.locator('.trou[data-q="1"]').fill('ce dont');   // mala a propósito
  await trous.locator('button:has-text("Corriger")').click();
  await pagina.waitForTimeout(200);
  const v2 = await trous.locator('.verdict').textContent();
  const corregida = await trous.locator('.trou[data-q="1"]').inputValue();
  console.log('6. Huecos →', v2.trim().slice(0, 40));
  console.log('7. Muestra la respuesta buena:', corregida.includes('→') ? '✓ ' + corregida : '✗');
  console.log('8. Acentos tolerados:',
    await pagina.evaluate(() => normalizar('Ce Qui') === normalizar('ce qui') ? '✓' : '✗'));

  /* Tri: clasificar un jetón y corregir */
  const tri = pagina.locator('#ex-1');
  const jeton = tri.locator('.jeton[data-it="0"]');
  await jeton.click();                       // va a la primera columna
  await tri.locator('button:has-text("Corriger")').click();
  await pagina.waitForTimeout(200);
  console.log('9. Clasificar →', (await tri.locator('.verdict').textContent()).trim().slice(0, 30));

  /* Emparejar */
  const paires = pagina.locator('#ex-0');
  await paires.locator('.jeton[data-lado="g"][data-k="0"]').click();
  await paires.locator('.jeton[data-lado="d"][data-k="0"]').click();
  await paires.locator('button:has-text("Corriger")').click();
  await pagina.waitForTimeout(200);
  console.log('10. Emparejar →', (await paires.locator('.verdict').textContent()).trim().slice(0, 30));

  /* El avance se guarda y se ve al volver al hub */
  await pagina.locator('button:has-text("Toutes les séances")').first().click();
  await pagina.waitForTimeout(300);
  const medalla = await pagina.locator('#grille-fiches .carte').nth(2).locator('.medaille').textContent();
  console.log('11. Avance guardado en la tarjeta:', medalla, medalla.includes('/') ? '✓' : '✗');
  const pct = await pagina.locator('#pct-global').textContent();
  console.log('12. Porcentaje global:', pct, pct !== '0 %' ? '✓' : '✗');

  /* Persistencia tras recargar */
  await pagina.reload();
  await pagina.waitForTimeout(400);
  const pct2 = await pagina.locator('#pct-global').textContent();
  console.log('13. Sigue ahí tras recargar:', pct2, pct2 === pct ? '✓' : '✗');

  /* Producción escrita: se guarda el borrador */
  await pagina.locator('#grille-fiches .carte').nth(1).click();
  await pagina.waitForTimeout(300);
  const prod = pagina.locator('.ex-bloc').last();
  await prod.locator('textarea').fill('Chez nous on mange des cachapas.');
  await prod.locator('button:has-text("Enregistrer")').click();
  await pagina.waitForTimeout(200);
  console.log('14. Borrador guardado →', (await prod.locator('.verdict').textContent()).trim().slice(0, 40));
  await pagina.reload();   // con #s5 en la URL debe volver directamente a la ficha
  await pagina.waitForTimeout(400);
  const vuelveAFicha = await pagina.locator('#vue-fiche').evaluate(e => e.classList.contains('active'));
  console.log('15a. Al recargar vuelve a la misma ficha:', vuelveAFicha ? '✓' : '✗');
  const texto = await pagina.locator('.ex-bloc').last().locator('textarea').inputValue();
  console.log('15. El texto vuelve tras recargar:', texto ? '✓ «' + texto.slice(0, 30) + '»' : '✗');

  /* Móvil: sin desbordamiento horizontal */
  await pagina.setViewportSize({ width: 390, height: 844 });
  await pagina.waitForTimeout(300);
  const desborda = await pagina.evaluate(() =>
    document.documentElement.scrollWidth > window.innerWidth + 2);
  console.log('16. Sin desbordamiento en móvil:', desborda ? '✗' : '✓');

  /* Modo oscuro */
  await pagina.locator('#btn-theme-2').click();
  await pagina.waitForTimeout(200);
  const tema = await pagina.evaluate(() => document.documentElement.dataset.theme);
  console.log('17. Modo oscuro:', tema === 'sombre' ? '✓' : '✗');

  console.log('\nErrores de JavaScript:', errores.length ? '✗\n' + errores.join('\n') : 'ninguno ✓');
  await navegador.close();
})();
