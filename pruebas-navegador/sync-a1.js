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

  /* Sin sesión, la página pone una cortina que no se cierra (exigir-sesion.js): hay que iniciar sesión
     ahí mismo, y mientras tanto no se puede tocar nada ni se escribe nada en la base. */
  const cortina = await pagina.locator('#mt-cortina-sesion').count();
  console.log('4. Sin cuenta, sale la cortina para iniciar sesión:', cortina === 1 ? '✓' : '✗');
  console.log('5. La cortina trae su formulario de entrada:',
    await pagina.locator('#mt-c-email').count() && await pagina.locator('#mt-c-pass').count() ? '✓' : '✗');
  console.log('6. La cortina cubre la pantalla entera (no se puede pulsar lo de debajo):',
    await pagina.evaluate(() => { const c = document.getElementById('mt-cortina-sesion'); if(!c) return false;
      const r = c.getBoundingClientRect();
      const el = document.elementFromPoint(innerWidth/2, innerHeight/2);
      return r.width >= innerWidth - 1 && r.height >= innerHeight - 1 && !!(el && el.closest('#mt-cortina-sesion')); }) ? '✓' : '✗');
  console.log('7. Sin cuenta no escribe en la base:',
    escrituras.length === 0 ? '✓' : '✗ (' + escrituras.join(', ') + ')');

  console.log('\nErrores de JavaScript:',
    errores.length ? '✗ ' + errores.join(' | ') : 'ninguno ✓');
  await navegador.close();
})();
