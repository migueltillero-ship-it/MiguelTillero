/* Prueba de los paliers: las etapas cerradas con llave.
   Lo que se comprueba no es que se pinte un candado bonito, sino las dos
   cosas de las que depende todo: que las respuestas de una etapa cerrada
   NO estén en la página, y que la etapa se abra sola —sin recargar— en el
   momento en que la anterior queda superada. */
const { chromium } = require('/opt/node-tools/node_modules/playwright');

(async () => {
  const navegador = await chromium.launch();
  const pagina = await navegador.newPage();
  const errores = [];
  pagina.on('pageerror', e => errores.push('JS: ' + e.message));
  pagina.on('console', m => { if (m.type() === 'error') errores.push('consola: ' + m.text()); });

  const URL = 'file:///home/user/MiguelTillero/estudiantes/espace-a1-exercices.html';
  await pagina.goto(URL + '#passe-compose');
  await pagina.waitForTimeout(400);

  console.log('1. Ficha abierta:', await pagina.locator('#f-titulo').textContent());

  const pasos = await pagina.locator('.pasos .paso').count();
  console.log('2. Etapas:', pasos, pasos === 7 ? '✓' : '✗ (esperaba 7)');

  const cerrados = await pagina.locator('.candado').count();
  console.log('3. Etapas con llave al entrar:', cerrados, cerrados === 6 ? '✓' : '✗ (esperaba 6)');

  const bloques = await pagina.locator('.ex-bloc').count();
  console.log('4. Solo se pintan los de la etapa 1:', bloques,
              bloques === 3 ? '✓' : '✗ (esperaba 3)');

  /* Lo importante: la respuesta de un ejercicio cerrado no está en el HTML.
     Si estuviera, bastaría con mirar el código fuente para «pasar» la ficha. */
  const html = await pagina.content();
  const filtrada = ['maison d’être', 'participe passé de', 'Les irréguliers',
                    'Ousmane'].filter(t => html.includes(t));
  console.log('5. Nada de las etapas cerradas se filtra al HTML:',
              filtrada.length ? '✗ se ve: ' + filtrada.join(', ') : '✓');

  /* Mal: tres de nueve en el tri. No abre. */
  const tri = pagina.locator('#ex-0');
  for (const k of [0, 1, 2]) await tri.locator(`.jeton[data-it="${k}"]`).click();
  await tri.locator('button:has-text("Corriger")').click();
  await pagina.waitForTimeout(200);
  console.log('6. Tri a medias →', (await tri.locator('.verdict').textContent()).trim().slice(0, 24));
  let abiertas = await pagina.locator('.ex-bloc').count();
  console.log('7. La etapa 2 sigue cerrada con la 1 sin terminar:',
              abiertas === 3 ? '✓' : '✗ (hay ' + abiertas + ' bloques)');
  const recado = await pagina.locator('.candado').first().textContent();
  console.log('8. El candado dice qué falta:',
              /exercices? à faire/.test(recado) ? '✓ «…' + recado.match(/Il te reste[^.]*/)[0].replace(/\s+/g, ' ').slice(0, 52) + '»' : '✗');

  /* Bien: las tres de la etapa 1 enteras y perfectas. */
  await pagina.evaluate(() => {
    const f = FICHAS.find(x => x.id === 'passe-compose');
    avance[f.id] = {};
    f.secciones[0].ejercicios.forEach(i => {
      const e = f.ejercicios[i];
      const total = e.q ? e.q.length : e.items.length;
      avance[f.id][i] = { b: total, t: total, cuando: Date.now() };
    });
    guardarAvance();
    revisarPaliers();
  });
  await pagina.waitForTimeout(300);

  const cerrados2 = await pagina.locator('.candado').count();
  console.log('9. Tras superar la etapa 1 se abre la 2 (sin recargar):',
              cerrados2 === 5 ? '✓' : '✗ (quedan ' + cerrados2 + ' candados)');
  const bloques2 = await pagina.locator('.ex-bloc').count();
  console.log('10. Ejercicios visibles ahora:', bloques2,
              bloques2 === 6 ? '✓' : '✗ (esperaba 6)');
  const vivo = await pagina.locator('#ex-3 .jeton').count();
  console.log('11. Los de la etapa nueva están montados y se pueden usar:',
              vivo === 14 ? '✓' : '✗ (' + vivo + ' jetones)');
  const marcado = await pagina.locator('.pasos .paso').first()
    .evaluate(e => e.classList.contains('paso-hecho'));
  console.log('12. El paso 1 queda marcado como hecho:', marcado ? '✓' : '✗');

  /* Al 80 % justo también abre; por debajo, no. */
  const pruebaUmbral = await pagina.evaluate(() => {
    const f = FICHAS.find(x => x.id === 'passe-compose');
    const idx = f.secciones[1].ejercicios;
    const total = idx.reduce((a, i) => a + (f.ejercicios[i].q || f.ejercicios[i].items).length, 0);
    const poner = pct => {
      let quedan = Math.round(total * pct / 100);
      avance[f.id] = Object.assign({}, avance[f.id]);
      idx.forEach(i => {
        const t = (f.ejercicios[i].q || f.ejercicios[i].items).length;
        const b = Math.min(t, quedan); quedan -= b;
        avance[f.id][i] = { b, t, cuando: Date.now() };
      });
      guardarAvance();
      return seccionAbierta(f, 2);
    };
    return { a79: poner(79), a80: poner(80) };
  });
  console.log('13. Con el 79 % no abre:', pruebaUmbral.a79 === false ? '✓' : '✗');
  console.log('14. Con el 80 % abre:', pruebaUmbral.a80 === true ? '✓' : '✗');

  /* El candado del porcentaje se redacta solo cuando falta nota, no ejercicios. */
  await pagina.evaluate(() => {
    const f = FICHAS.find(x => x.id === 'passe-compose');
    f.secciones[1].ejercicios.forEach(i => {
      const t = (f.ejercicios[i].q || f.ejercicios[i].items).length;
      avance[f.id][i] = { b: Math.floor(t / 2), t, cuando: Date.now() };
    });
    guardarAvance();
    revisarPaliers();
  });
  await pagina.waitForTimeout(250);
  const texto = (await pagina.locator('.candado').first().textContent()).replace(/\s+/g, ' ');
  console.log('15. Con todo hecho pero flojo, el candado da el porcentaje:',
              /Tu es à \d+ ?%/.test(texto) ? '✓ «' + texto.match(/Tu es à[^;]*/)[0].slice(0, 46) + '»' : '✗ ' + texto.slice(0, 80));

  /* El avance sobrevive a la recarga y la ficha vuelve donde estaba. */
  await pagina.reload();
  await pagina.waitForTimeout(400);
  const tras = await pagina.locator('.candado').count();
  console.log('16. Tras recargar, los mismos candados:', tras === 5 ? '✓' : '✗ (' + tras + ')');

  /* Móvil */
  await pagina.setViewportSize({ width: 390, height: 844 });
  await pagina.waitForTimeout(300);
  const desborda = await pagina.evaluate(() =>
    document.documentElement.scrollWidth > window.innerWidth + 2);
  console.log('17. Sin desbordamiento en móvil:', desborda ? '✗' : '✓');

  console.log('\nErrores de JavaScript:', errores.length ? '✗\n' + errores.join('\n') : 'ninguno ✓');
  await navegador.close();
})();
