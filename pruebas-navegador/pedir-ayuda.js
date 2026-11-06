/* Pedir ayuda a Miguel: el lado del estudiante y el del docente.
   Corre sobre copias de los paneles sin el guardián de sesión (auth-helpers),
   porque sin sesión los paneles redirigen a login y no se podría mirar nada.
   Los clientes de Supabase son simulados: no se escribe nada en la base.
   Uso: copiar panel-estudiante.html a .est-prueba.html y panel-docente.html a
   .doc-prueba.html quitando el <script> de auth-helpers, y borrarlas después. */
const { chromium } = require('/opt/node-tools/node_modules/playwright');
(async () => {
  const n = await chromium.launch();
  const errores = [];
  // ── ESTUDIANTE ────────────────────────────────────────────────────────
  let p = await n.newPage(); p.on('pageerror', e => errores.push('est: ' + e.message));
  await p.goto('file:///home/user/MiguelTillero/.est-prueba.html'); await p.waitForTimeout(1200);
  await p.evaluate(() => {
    perfilEstudiante = { id: 'e1', nombre_completo: 'Estudiante Prueba' };
    window.__insertado = null;
    const filas = [
      { id:'a', tema:'Los posesivos', detalle:'No sé si es sa o son', estado:'respondida', creada_en:'2026-11-05T10:00:00Z', respuesta:'Depende de la cosa, no del dueño.' },
      { id:'b', tema:'El passé composé', detalle:null, estado:'abierta', creada_en:'2026-11-06T10:00:00Z', respuesta:null }];
    supabaseClient = { from: () => ({
      select(){ return this }, eq(){ return this },
      order(){ return Promise.resolve({ data: filas, error: null }) },
      insert(v){ window.__insertado = v; return Promise.resolve({ error: null }) } }) };
  });
  // La página muestra su contenedor al terminar iniciar(); aquí no corre.
  await p.evaluate(() => { for (let e = document.getElementById('sec-ayuda'); e; e = e.parentElement) {
      if (e.style && e.style.display === 'none' && e.id !== 'sec-ayuda') e.style.display = 'block'; } });
  await p.evaluate(() => cargarAyuda());
  console.log('E1. La pestaña «Pedir ayuda» existe:', await p.locator('.sec-btn[data-sec="ayuda"]').count() ? '✓' : '✗');
  console.log('E2. Pinta las dos peticiones:', await p.locator('.peticion').count() === 2 ? '✓' : '✗');
  console.log('E3. Enseña la respuesta de Miguel:', /Depende de la cosa/.test(await p.locator('.peticion.respondida').textContent()) ? '✓' : '✗');
  const punto = await p.locator('#punto-ayuda');
  console.log('E4. El punto avisa de 1 respuesta nueva:', (await punto.textContent()) === '1' && await punto.isVisible() ? '✓' : '✗');
  await p.evaluate(() => cambiarSeccion('ayuda'));
  await p.locator('#ay-enviar').click(); await p.waitForTimeout(150);
  console.log('E5. Sin tema no envía y lo dice:', /sobre qué tema/.test(await p.locator('#ay-msg').textContent()) && !(await p.evaluate(() => window.__insertado)) ? '✓' : '✗');
  await p.locator('#ay-tema').fill('El participio de dormir');
  await p.locator('#ay-detalle').fill('No entiendo por qué no va con être');
  await p.locator('#ay-enviar').click(); await p.waitForTimeout(250);
  const ins = await p.evaluate(() => window.__insertado);
  console.log('E6. Envía tema, detalle y su id:', ins && ins.tema === 'El participio de dormir' && ins.estudiante_id === 'e1' && ins.detalle ? '✓' : '✗ ' + JSON.stringify(ins));
  console.log('E7. Confirma y vacía el formulario:', /Enviada/.test(await p.locator('#ay-msg').textContent()) && !(await p.locator('#ay-tema').inputValue()) ? '✓' : '✗');
  await p.setViewportSize({ width: 390, height: 844 }); await p.waitForTimeout(200);
  console.log('E8. Sin desbordamiento en móvil:', await p.evaluate(() => document.documentElement.scrollWidth > innerWidth + 2) ? '✗' : '✓');
  // ── DOCENTE ───────────────────────────────────────────────────────────
  p = await n.newPage(); p.on('pageerror', e => errores.push('doc: ' + e.message));
  await p.goto('file:///home/user/MiguelTillero/.doc-prueba.html'); await p.waitForTimeout(1200);
  await p.evaluate(() => {
    window.__upd = null; let abiertas = [{ id:'x1', estudiante_id:'e1', tema:'El participio de dormir', detalle:'No entiendo', estado:'abierta', creada_en:'2026-11-06T09:00:00Z' }];
    supabaseClient = { from: t => ({
      select(){ return this }, eq(){ return this },
      order(){ return Promise.resolve({ data: abiertas, error: null }) },
      in(){ return Promise.resolve({ data: [{ id:'e1', nombre_completo:'Estudiante Prueba' }], error: null }) },
      update(v){ window.__upd = v; return { eq: () => { abiertas = []; return Promise.resolve({ error: null }); } }; } }) };
  });
  await p.evaluate(() => cargarAyudaPendiente());
  await p.evaluate(() => { for (let e = document.getElementById('panel-ayuda'); e; e = e.parentElement) {
      if (e.id !== 'panel-ayuda' && (e.style.display === 'none' || getComputedStyle(e).display === 'none')) e.style.display = 'block'; } });
  console.log('D1. El bloque aparece con una petición:', await p.locator('#panel-ayuda').isVisible() && await p.locator('.peticion-d').count() === 1 ? '✓' : '✗');
  console.log('D2. Dice quién y sobre qué:', /Estudiante Prueba/.test(await p.locator('.p-quien').textContent()) && /participio/.test(await p.locator('.p-tema').textContent()) ? '✓' : '✗');
  console.log('D3. El contador dice «1 sin atender»:', (await p.locator('#n-ayuda').textContent()).trim());
  await p.locator('.peticion-d .btn').click(); await p.waitForTimeout(200);
  console.log('D4. Sin texto no responde:', !(await p.evaluate(() => window.__upd)) ? '✓' : '✗');
  await p.locator('.peticion-d textarea').fill('Porque dormir no es de la casa de être.');
  await p.locator('.peticion-d .btn').click(); await p.waitForTimeout(300);
  const u = await p.evaluate(() => window.__upd);
  console.log('D5. Responder manda respuesta, estado y fecha:', u && u.respuesta && u.estado === 'respondida' && u.respondida_en ? '✓' : '✗');
  console.log('D6. Al atenderla, el bloque desaparece:', await p.locator('#panel-ayuda').isHidden() ? '✓' : '✗');
  console.log('\nErrores de JS:', errores.length ? '✗ ' + errores.join(' | ') : 'ninguno ✓');
  await n.close();
})();
