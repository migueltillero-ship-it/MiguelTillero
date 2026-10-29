/* El espacio A1.4, conectado a la plataforma igual que el B2.
   Lo que se comprueba es lo que se rompe en silencio: que el SDK cargue,
   que MT_SYNC quede definido —si no, el motor copiaría en el vacío—, que
   al visitante sin cuenta se le diga cómo entrar, y sobre todo que SIN
   cuenta no se intente escribir nada en la base. */
const { chromium } = require('/opt/node-tools/node_modules/playwright');

(async () => {
  const navegador = await chromium.launch();
  const pagina = await navegador.newPage();
  const errores = [], escrituras = [];
  pagina.on('pageerror', e => errores.push(e.message));
  pagina.on('request', r => {
    if (r.url().includes('/rest/v1/fichas_avance')) escrituras.push(r.method());
  });

  await pagina.goto('file:///home/user/MiguelTillero/estudiantes/espace-a1-exercices.html');
  await pagina.waitForTimeout(2500);   // el CDN y getSession() tardan lo suyo

  console.log('1. El SDK de Supabase cargó:',
    await pagina.evaluate(() => !!window.supabase) ? '✓' : '✗');
  console.log('2. El cliente se creó:',
    await pagina.evaluate(() =>
      typeof supabaseConfigurado !== 'undefined' && supabaseConfigurado) ? '✓' : '✗');
  console.log('3. MT_SYNC existe:',
    await pagina.evaluate(() => typeof window.MT_SYNC === 'function') ? '✓' : '✗');

  const aviso = await pagina.locator('#vue-hub .note').first().textContent().catch(() => '');
  console.log('4. Sin cuenta, sale el aviso para entrar:',
    /entra con tu cuenta/i.test(aviso) ? '✓ «' + aviso.trim().slice(0, 52) + '…»'
                                       : '✗ (' + aviso.slice(0, 40) + ')');
  console.log('5. El enlace al login apunta bien:',
    await pagina.locator('#vue-hub .note a').first().getAttribute('href') === '../login.html'
      ? '✓' : '✗');

  const fichas = await pagina.locator('#grille-fiches .carte').count();
  console.log('6. Las fichas siguen ahí:', fichas, fichas === 7 ? '✓' : '✗ (esperaba 7)');

  /* Lo importante: sin sesión no se intenta escribir nada. Si esto fallara,
     cada ejercicio de cada visitante anónimo sería una petición rechazada. */
  await pagina.locator('#grille-fiches .carte').first().click();
  await pagina.waitForTimeout(300);
  await pagina.locator('#ex-0 .jeton').first().click();
  await pagina.locator('#ex-0 button:has-text("Corriger")').click();
  await pagina.waitForTimeout(800);
  console.log('7. Sin cuenta no escribe en la base:',
    escrituras.length === 0 ? '✓' : '✗ (' + escrituras.join(', ') + ')');

  console.log('\nErrores de JavaScript:',
    errores.length ? '✗ ' + errores.join(' | ') : 'ninguno ✓');
  await navegador.close();
})();
