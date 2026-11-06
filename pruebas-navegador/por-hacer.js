/* El bloque «Por hacer» del panel docente. Lo que importa son los casos que NO
   deben aparecer: una clase futura, una evaluación futura, una ausencia avisada
   o las notas automáticas. Un panel que avisa de lo que no es tarea acaba
   ignorado. Corre sobre una copia sin el guardián de sesión:
   sed "s#<script src=\"assets/js/auth-helpers.js[^\"]*\"></script>##" panel-docente.html > .doc-prueba.html */
const { chromium } = require('/opt/node-tools/node_modules/playwright');
(async () => {
  const n = await chromium.launch(); const p = await n.newPage();
  const errores = []; p.on('pageerror', e => errores.push(e.message));
  await p.goto('file:///home/user/MiguelTillero/.doc-prueba.html'); await p.waitForTimeout(1200);
  const r = await p.evaluate(async () => {
    const d = x => { const t = new Date(); t.setDate(t.getDate() + x); return t.toISOString().slice(0,10); };
    cursos = [{ id:'c1', nombre:'Curso A' }];
    inscripcionesTodas = [{ curso_id:'c1', estudiante_id:'e1', estado:'activa' }, { curso_id:'c1', estudiante_id:'e2', estado:'activa' }, { curso_id:'c1', estudiante_id:'e3', estado:'activa' }];
    todasSesiones = [{id:'s1',curso_id:'c1',fecha:d(-9)},{id:'s2',curso_id:'c1',fecha:d(-6)},{id:'s3',curso_id:'c1',fecha:d(-3)},{id:'s4',curso_id:'c1',fecha:d(4)}];
    sesionesConLista = new Set(['s1','s2']);          // s3 sin pasar; s4 futura
    const T = {
      evaluaciones: [{id:'v1',curso_id:'c1',nombre:'Examen oral',fecha:d(-1)},{id:'v2',curso_id:'c1',nombre:'Examen futuro',fecha:d(9)},{id:'v3',curso_id:'c1',nombre:'Exercices complémentaires — x',fecha:d(-1)}],
      notas: [{evaluacion_id:'v1',estudiante_id:'e1'}],   // e2 y e3 sin nota
      grabaciones: [{id:'g1',escuchado_en:null},{id:'g2',escuchado_en:null}],
      asistencia: [ {sesion_id:'s2',estudiante_id:'e1',presente:false}, {sesion_id:'s3',estudiante_id:'e1',presente:false},          // e1: dos faltas sin avisar → atención
                    {sesion_id:'s2',estudiante_id:'e2',presente:false,observacion:'Avisó'}, {sesion_id:'s3',estudiante_id:'e2',presente:false,observacion:'Avisó'}, // e2: avisadas → NO
                    {sesion_id:'s2',estudiante_id:'e3',presente:true}, {sesion_id:'s3',estudiante_id:'e3',presente:false} ],       // e3: una sola → NO
      profiles: [{id:'e1',nombre_completo:'Estudiante Ausente'}]
    };
    supabaseClient = { from: t => { const f = []; const o = {
      select(){ return o }, in(c,v){ f.push(x => v.includes(x[c])); return o }, is(c,v){ f.push(x => x[c] === v); return o },
      then(res, rej){ return Promise.resolve({ data: (T[t]||[]).filter(x => f.every(g => g(x))), error:null }).then(res, rej); } }; return o; } };
    await cargarPorHacer();
    return { texto: document.getElementById('por-hacer').innerText, filas: document.querySelectorAll('#por-hacer .hacer').length };
  });
  const t = r.texto.replace(/\s+/g, ' ');
  console.log('1. Sin errores de JS:', errores.length ? '✗ ' + errores[0] : '✓');
  console.log('2. Cuatro cosas por hacer (lista, notas, grabaciones, atención):', r.filas === 4 ? '✓' : '✗ ' + r.filas + ' → ' + t);
  console.log('3. Una lista sin pasar (la futura NO cuenta):', /una lista sin pasar/.test(t) ? '✓' : '✗');
  console.log('4. Dos notas sin poner del examen oral (e2 y e3):', /Examen oral.*2 de 3 sin nota/.test(t) ? '✓' : '✗');
  console.log('5. La evaluación futura NO aparece:', !/futuro/.test(t) ? '✓' : '✗');
  console.log('6. La automática de ejercicios NO aparece:', !/Exercices/.test(t) ? '✓' : '✗');
  console.log('7. Dos grabaciones sin escuchar:', /2 sin escuchar/.test(t) ? '✓' : '✗');
  console.log('8. Atención: solo quien faltó DOS veces SIN avisar:', /Estudiante Ausente/.test(t) && !/e2|e3/.test(t) ? '✓' : '✗');
  console.log('9. Cada punto lleva su botón:', await p.locator('#por-hacer .hacer .btn').count() === 4 ? '✓' : '✗');
  // Y el caso de todo al día
  const limpio = await p.evaluate(async () => {
    sesionesConLista = new Set(['s1','s2','s3']); todasSesiones = todasSesiones; 
    supabaseClient = { from: () => { const o = { select(){return o}, in(){return o}, is(){return o}, then(res){ return Promise.resolve({data:[],error:null}).then(res); } }; return o; } };
    await cargarPorHacer(); return document.getElementById('por-hacer').innerText.replace(/\s+/g,' ');
  });
  console.log('10. Sin pendientes dice «Todo al día»:', /Todo al día/.test(limpio) ? '✓' : '✗ ' + limpio);
  const orden = await p.evaluate(() => Array.from(document.querySelectorAll('#sec-hoy > section h2')).map(h => h.textContent.trim().split('\n')[0]));
  console.log('11. Orden: clases de hoy primero →', orden.join(' › '), orden[0] === 'Hoy' || /Clases de hoy/.test(orden.join()) ? '✓' : '✗');
  await p.setViewportSize({ width: 390, height: 844 }); await p.waitForTimeout(200);
  console.log('12. Sin desbordamiento en móvil:', await p.evaluate(() => document.documentElement.scrollWidth > innerWidth + 2) ? '✗' : '✓');
  await n.close();
})();
