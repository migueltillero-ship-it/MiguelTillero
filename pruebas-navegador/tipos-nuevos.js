/* Los cuatro tipos que se juegan: ordre, défi, dialogue y points. */
const { chromium } = require('/opt/node-tools/node_modules/playwright');

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1000, height: 900 } });
  const errores = [];
  p.on('pageerror', e => errores.push(e.message));
  await p.addInitScript(() => { window.YT = { Player: function(id, cfg){
    this.seekTo=()=>{}; this.playVideo=()=>{}; setTimeout(()=>cfg.events.onReady(),10); }};});

  await p.goto('file:///home/user/MiguelTillero/estudiantes/espace-b2-exercices.html#savoir-vivre');
  await p.waitForTimeout(500);

  /* ── DÉFI ── */
  const defi = p.locator('#ex-2');
  console.log('1. El défi empieza cerrado, con su botón:',
    await defi.locator('button:has-text("Commencer le défi")').count() ? '✓' : '✗');
  await defi.locator('button:has-text("Commencer le défi")').click();
  await p.waitForTimeout(300);
  const carta1 = await defi.locator('.defi-carta').textContent();
  console.log('2. Sale una carta y el reloj corre:',
    carta1.trim().length > 5 ? '✓ «' + carta1.trim().slice(0, 35) + '…»' : '✗');
  // se responde a todas, siempre la primera columna
  for (let k = 0; k < 12; k++) {
    await defi.locator('.defi-botones .btn').first().click();
    await p.waitForTimeout(340);
  }
  const fin = await defi.locator('.defi-fin').textContent();
  console.log('3. Al acabar da la nota y lo que falló:',
    fin.includes('/ 12') && fin.includes('revoir') ? '✓ ' + fin.trim().slice(0, 18) : '✗ ' + fin.slice(0,40));
  console.log('4. Y queda anotado en el avance:',
    (await p.evaluate(() => JSON.stringify(avance['savoir-vivre'][2]))).includes('"t":12') ? '✓' : '✗');

  /* ── POINTS ── */
  const pts = p.locator('#ex-3');
  const consigna = await pts.locator('.pts-consigna').textContent();
  console.log('5. La mesa pide lo primero:',
    consigna.includes('assiette') ? '✓ «' + consigna.trim() + '»' : '✗ ' + consigna);
  await pts.locator('[data-punto="assiette"]').click();
  await p.waitForTimeout(400);
  const consigna2 = await pts.locator('.pts-consigna').textContent();
  console.log('6. Al acertar pasa a la siguiente:',
    consigna2.includes('fourchette') ? '✓' : '✗ ' + consigna2);
  await pts.locator('[data-punto="couteau"]').click();   // fallo a propósito
  await p.waitForTimeout(800);
  console.log('7. Al fallar señala dónde estaba:',
    await pts.locator('[data-punto="fourchette"].punto-pista').count() ? '✓' : '✗');

  /* ── ORDRE ── */
  const ord = p.locator('#ex-4');
  console.log('8. Siete pasos del menú, desordenados:',
    await ord.locator('.orden-fila').count() === 7 ? '✓' : '✗');
  await ord.locator('.orden-fila').nth(3).locator('.sube').click();
  await p.waitForTimeout(150);
  await ord.locator('button:has-text("Vérifier l’ordre")').click();
  await p.waitForTimeout(250);
  console.log('9. Verifica y da la nota:',
    (await ord.locator('.verdict').textContent()).includes('/7') ? '✓' : '✗');

  /* ── DIALOGUE ── */
  const dial = p.locator('#ex-5');
  const escena = await dial.locator('.dial-scene').textContent();
  console.log('10. La cena empieza por la invitación:',
    escena.includes('20') ? '✓' : '✗ ' + escena.slice(0, 40));
  await dial.locator('.opt').nth(1).click();          // la buena
  await p.waitForTimeout(250);
  const replica = await dial.locator('.dial-replica').textContent();
  console.log('11. Responde con la consecuencia:',
    replica.includes('quart d’heure') ? '✓' : '✗ ' + replica.slice(0, 40));
  console.log('12. Y marca cuál era la correcta:',
    await dial.locator('.opt.juste').count() === 1 ? '✓' : '✗');
  for (let k = 0; k < 6; k++) {
    const seguir = dial.locator('button:has-text("Continuer")');
    if (await seguir.count()) { await seguir.click(); await p.waitForTimeout(200); }
    const opts = dial.locator('.opt:not([disabled])');
    if (await opts.count()) { await opts.first().click(); await p.waitForTimeout(200); }
  }
  const seguir = dial.locator('button:has-text("Continuer")');
  if (await seguir.count()) { await seguir.click(); await p.waitForTimeout(250); }
  console.log('13. Al final de la cena da el resultado:',
    await dial.locator('.dial-fin').count() ? '✓' : '✗');

  await p.setViewportSize({ width: 390, height: 844 });
  await p.waitForTimeout(300);
  console.log('14. Sin desbordamiento en móvil:',
    await p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 2) ? '✗' : '✓');

  console.log(errores.length ? '\nErrores JS: ' + errores.join(' | ') : '\nSin errores de JavaScript ✓');
  await b.close();
})();
