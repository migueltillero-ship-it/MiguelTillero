/* La ficha del estudiante, con un cliente de Supabase simulado.
   La tabla de ayuda NO existe en el simulado a propósito: la ficha tiene que
   decirlo y seguir funcionando, porque en la base real esa tabla puede tardar
   en crearse y una pieza nueva no debe tumbar la ficha entera. */
const { chromium } = require('/opt/node-tools/node_modules/playwright');
(async () => {
  const n = await chromium.launch(); const p = await n.newPage();
  const errores = []; p.on('pageerror', e => errores.push(e.message));
  const stub = `window.supabase = { createClient: () => {
    const hoy = new Date().toISOString().slice(0,10);
    const d = (x) => { const t = new Date(); t.setDate(t.getDate() + x); return t.toISOString().slice(0,10); };
    const T = {
      profiles: [{id:'d',role:'docente',nombre_completo:'Docente'},
                 {id:'e1',role:'estudiante',nombre_completo:'Estudiante Uno',representante_nombre:'Madre Uno',representante_parentesco:'Madre',representante_email:'m@x.test'}],
      inscripciones: [{id:'i1',estudiante_id:'e1',grupo_id:'g1',curso_id:'c1',estado:'activa'}],
      grupos: [{id:'g1',codigo:'A1-OCT2026',formato:'grupal'}],
      sesiones: [{id:'s1',grupo_id:'g1',fecha:d(-9),tema:'Clase uno'},{id:'s2',grupo_id:'g1',fecha:d(-6),tema:'Clase dos'},
                 {id:'s3',grupo_id:'g1',fecha:d(-3),tema:'Clase tres'},{id:'s4',grupo_id:'g1',fecha:d(5),tema:'Futura'}],
      asistencia: [{sesion_id:'s1',estudiante_id:'e1',presente:true},{sesion_id:'s2',estudiante_id:'e1',presente:false,observacion:'Avisó con tiempo'}],
      evaluaciones: [{id:'v1',curso_id:'c1',nombre:'Examen escrito',fecha:d(-2),ponderacion:'40',nota_maxima:75},
                     {id:'v2',curso_id:'c1',nombre:'Examen oral',fecha:d(-1),ponderacion:'60',nota_maxima:25},
                     {id:'v3',curso_id:'c1',nombre:'Cierre futuro',fecha:d(20)}],
      notas: [{evaluacion_id:'v1',estudiante_id:'e1',calificacion:60}],
      pagos: [{inscripcion_id:'i1',concepto:'Ciclo A1.4',monto:1900,estado:'pagado',pagado_en:null}],
      fichas_catalogo: [{clave:'mt-a1',ficha:'posesivos',titulo:'Los posesivos',ejercicios:6,cuenta:true},
                        {clave:'mt-a1',ficha:'passe-compose',titulo:'El passé composé',ejercicios:18,cuenta:true}],
      fichas_avance: [{estudiante_id:'e1',clave:'mt-a1',ficha:'posesivos',ejercicio:'0',bien:9,total:10},{estudiante_id:'e1',clave:'mt-a1',ficha:'posesivos',ejercicio:'1',bien:8,total:10}],
      grabaciones: [{id:'g',estudiante_id:'e1',escuchado_en:null}],
      tutorias: []
      /* solicitudes_ayuda NO existe a propósito: debe degradar sin romper */
    };
    const q = (tabla) => { const st = { f: [] }; const o = {
      select(){ return o }, order(){ return o },
      eq(c,v){ st.f.push(r => r[c] === v); return o }, in(c,vs){ st.f.push(r => vs.includes(r[c])); return o },
      single(){ return Promise.resolve({ data: (T[tabla]||[]).filter(r => st.f.every(f => f(r)))[0] || null }) },
      then(res, rej){
        if(!(tabla in T)) return Promise.resolve({ data:null, error:{ message:'relation "'+tabla+'" does not exist' } }).then(res, rej);
        return Promise.resolve({ data:(T[tabla]).filter(r => st.f.every(f => f(r))), error:null }).then(res, rej); } };
      return o; };
    return { auth:{ getSession:()=>Promise.resolve({data:{session:{}}}), getUser:()=>Promise.resolve({data:{user:{id:'d'}}}) }, from:q, rpc:()=>Promise.resolve({ data:{ minutos_total:135, dias_con_uso:4, minutos_7_dias:90, desde:'2026-11-09' }, error:null }) };
  } };`;
  await p.route('**/supabase-js@2/**', r => r.fulfill({ contentType:'application/javascript', body: stub }));
  await p.goto('file:///home/user/MiguelTillero/evaluaciones/ficha-estudiante.html?id=e1');
  await p.waitForTimeout(900);
  const t = await p.locator('#ficha').innerText();
  console.log('1. Sin errores de JS:', errores.length ? '✗ ' + errores[0] : '✓');
  console.log('2. Abre la ficha de la persona pedida por la URL:', /Estudiante Uno/.test(t) ? '✓' : '✗');
  console.log('3. Muestra madre y grupo:', /A1-OCT2026/.test(t) && /Madre Uno/.test(t) ? '✓' : '✗');
  console.log('4. Asistencia: la avisada NO resta (1 de 1, 100 %):', /100 %/.test(t) && /1 de 1/.test(t) && /no restan/.test(t) ? '✓' : '✗ ' + (t.match(/Asistencia[\s\S]{0,90}/)||[''])[0].replace(/\n/g,' '));
  console.log('5. Enseña el motivo de la justificada:', /Avisó con tiempo/.test(t) ? '✓' : '✗');
  console.log('6. Marca la tercera clase como «Sin pasar»:', /Sin pasar/.test(t) ? '✓' : '✗');
  console.log('7. No cuenta la clase futura:', !/Futura/.test(t) ? '✓' : '✗');
  console.log('8. Notas: pone 60 / 75 y señala la que falta:', /60\s*\/\s*75/.test(t.replace(/\n/g,' ')) && /Falta poner/.test(t) ? '✓' : '✗');
  console.log('9. La evaluación futura es «aún no toca», no «falta»:', /aún no toca/.test(t) ? '✓' : '✗');
  console.log('10. Ejercicios: 2 de 6 en posesivos y 0 en passé composé:', /2 \/ 6/.test(t) && /0 \/ 18/.test(t) ? '✓' : '✗');
  console.log('11. La tabla de ayuda no existe y lo dice sin romper:', /todavía no está activada/.test(t) ? '✓' : '✗');
  console.log('12. Grabaciones sin escuchar:', /1 sin escuchar/.test(t) ? '✓' : '✗');
  console.log('13. Pago sin fecha se dice así:', /fecha sin confirmar/.test(t) ? '✓' : '✗');
  const chips = await p.locator('.chip').allInnerTexts();
  console.log('14. Chips de atención:', chips.join(' | '));
  console.log('15. Falta una nota y una lista, y lo avisa:', chips.some(c => /nota/.test(c)) && chips.some(c => /lista/.test(c)) ? '✓' : '✗');
  await p.setViewportSize({ width: 390, height: 844 }); await p.waitForTimeout(250);
  console.log('16. Sin desbordamiento en móvil:', await p.evaluate(() => document.documentElement.scrollWidth > innerWidth + 2) ? '✗' : '✓');
  await n.close();
})();
