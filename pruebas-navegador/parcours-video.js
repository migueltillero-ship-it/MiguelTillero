/* El recorrido con vídeo: reproductor pegado, saltos por minuto, pasos y sello. */
const { chromium } = require('/opt/node-tools/node_modules/playwright');

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1100, height: 900 } });
  const errores = [];
  p.on('pageerror', e => errores.push(e.message));

  // YouTube no se carga en la prueba: se finge la API para no depender de la red.
  await p.addInitScript(() => {
    window.__saltos = [];
    window.YT = { Player: function(id, cfg){
      document.getElementById(id).innerHTML = '<div id="falso-iframe"></div>';
      this.seekTo = s => window.__saltos.push(s);
      this.playVideo = () => {};
      setTimeout(() => cfg.events.onReady(), 10);
    }};
  });

  await p.goto('file:///home/user/MiguelTillero/estudiantes/espace-b2-exercices.html#savoir-vivre');
  await p.waitForTimeout(500);

  console.log('1. Abre la ficha del vídeo:',
    (await p.locator('#f-titulo').textContent()).includes("Ça se fait") ? '✓' : '✗');

  const pasos = await p.locator('.pasos .paso').count();
  console.log('2. Las siete etapas del recorrido:', pasos === 7 ? '✓' : '✗ (' + pasos + ')');

  console.log('3. El reproductor se monta:',
    await p.locator('#caja-video .video-marco').count() ? '✓' : '✗');

  const pegado = await p.locator('#caja-video').evaluate(e => getComputedStyle(e).position);
  console.log('4. Se queda pegado arriba al bajar:', pegado === 'sticky' ? '✓' : '✗ ' + pegado);

  const minutos = await p.locator('.btn-minuto').count();
  console.log('5. Botones de minuto repartidos por la ficha:', minutos >= 6 ? '✓ ' + minutos : '✗ ' + minutos);

  // Saltar a 13:26 (la anécdota de la reina) = 806 segundos
  await p.locator('.btn-minuto:has-text("13:26")').first().click();
  await p.waitForTimeout(200);
  const saltos = await p.evaluate(() => window.__saltos);
  console.log('6. El botón salta al segundo exacto:',
    saltos.includes(806) ? '✓ 13:26 → 806 s' : '✗ ' + JSON.stringify(saltos));

  // El sello antes de empezar
  const sello0 = await p.locator('#sello').textContent();
  console.log('7. Al entrar dice lo que falta:',
    sello0.includes('13 exercice') ? '✓' : '✗ «' + sello0.trim().slice(0, 50) + '»');

  // Se responden mal los vrai/faux para comprobar que NO valida
  const vf = p.locator('#ex-6');     // el qcm sobre el vídeo
  for (let q = 0; q < 6; q++) await vf.locator(`.opt[data-q="${q}"][data-o="0"]`).click();
  await vf.locator('button:has-text("Corriger")').click();
  await p.waitForTimeout(200);
  const correccion = await vf.locator('#note-6-1').textContent();
  console.log('8. La corrección explica lo que SÍ es verdad:',
    correccion.includes('Juriste') ? '✓' : '✗ «' + correccion.slice(0, 40) + '»');

  const sello1 = await p.locator('#sello').textContent();
  console.log('9. Con ejercicios a medias no valida:',
    sello1.includes('reste') ? '✓' : '✗ «' + sello1.trim().slice(0, 40) + '»');

  // Se completa todo bien, por la vía rápida, para ver el sello logrado
  await p.evaluate(() => {
    const f = FICHAS.find(x => x.id === 'savoir-vivre');
    avance[f.id] = {};
    f.ejercicios.forEach((e, i) => { avance[f.id][i] = { b: 10, t: 10, cuando: Date.now() }; });
    guardarAvance(); pintarSello();
  });
  const sello2 = await p.locator('#sello').textContent();
  console.log('10. Con todo al 100 % valida:',
    sello2.includes('validée') ? '✓' : '✗ «' + sello2.trim().slice(0, 40) + '»');

  await p.evaluate(() => {
    const f = FICHAS.find(x => x.id === 'savoir-vivre');
    f.ejercicios.forEach((e, i) => { avance[f.id][i] = { b: 6, t: 10, cuando: Date.now() }; });
    guardarAvance(); pintarSello();
  });
  const sello3 = await p.locator('#sello').textContent();
  console.log('11. Con todo hecho pero al 60 % NO valida:',
    sello3.includes('80') && !sello3.includes('validée') ? '✓' : '✗ «' + sello3.trim().slice(0, 40) + '»');

  await p.setViewportSize({ width: 390, height: 844 });
  await p.waitForTimeout(300);
  const desborda = await p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 2);
  console.log('12. Sin desbordamiento en móvil:', desborda ? '✗' : '✓');

  // El vídeo se pliega y se despliega solo al saltar a un minuto
  await p.setViewportSize({ width: 1100, height: 900 });
  await p.locator('#btn-plegar').click();
  await p.waitForTimeout(350);
  console.log('13. El vídeo se pliega:',
    await p.locator('#caja-video.plegada').count() ? '✓' : '✗');
  await p.locator('.btn-minuto').first().click();
  await p.waitForTimeout(350);
  console.log('14. Y se despliega solo al saltar a un minuto:',
    await p.locator('#caja-video.plegada').count() ? '✗' : '✓');

  console.log(errores.length ? '\nErrores JS: ' + errores.join(' | ') : '\nSin errores de JavaScript ✓');
  await b.close();
})();
