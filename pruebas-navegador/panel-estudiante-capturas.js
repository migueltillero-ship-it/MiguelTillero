/* Capturas del panel del estudiante con datos inventados, en escritorio y móvil.
   Sirve para mirar el aspecto sin una sesión real: sustituye los scripts de
   Supabase por un cliente simulado, así que no se lee ni se escribe nada.
   Uso: node pruebas-navegador/panel-estudiante-capturas.js <carpeta-de-salida> */
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const fs = require('fs');
const salida = process.argv[2] || '.';
const raiz = require('path').resolve(__dirname, '..');
const html = fs.readFileSync(raiz + '/panel-estudiante.html', 'utf8')
  .replace(/<script src="https:\/\/cdn\.jsdelivr[^>]*><\/script>/g, '')
  .replace(/<script src="assets\/js\/(supabase-config|auth-helpers)[^>]*><\/script>/g, '')
  .replace('<script>\nlet perfilEstudiante', '<script>' + `
    const supabaseConfigurado = true;
    async function requerirSesion(){ return { perfil:{ id:'e1', nombre_completo:'Alumno A Prueba' } }; }
    function cerrarSesion(){} function mostrarAvisoSinConfigurar(){}
    const DATOS = {
      inscripciones:[{ id:'i1', estado:'activa', created_at:'2026-09-29', cursos:{ id:'c1', nombre:'Français A1', nivel:'A1' },
        grupos:{ id:'g1', codigo:'A1-OCT2026', formato:'grupal', fecha_inicio:'2026-09-29', fecha_fin:'2026-12-03', costo:1900, moneda:'MXN' } }],
      sesiones:[1,2,3,4,5,6].map(n=>({ id:'s'+n, fecha:'2026-10-'+String(5+n*3).padStart(2,'0'), tema:'Sesión '+n+' · Les possessifs', contenido:'Mon, ma, mes y los números del 70 al 99' })),
      asistencia:[{ sesion_id:'s1', presente:true },{ sesion_id:'s2', presente:true },{ sesion_id:'s3', presente:false, observacion:'Avisó con tiempo' },{ sesion_id:'s4', presente:true }],
      evaluaciones:[{ id:'v1', nombre:'A1.4 · Prueba oral', fecha:'2026-11-05', nota_maxima:25, descripcion:'Chez les Moreau' },{ id:'v2', nombre:'Desempeño final del ciclo', fecha:'2026-11-08', nota_maxima:100, descripcion:'La nota del ciclo' },{ id:'v3', nombre:'Prueba escrita', fecha:'2026-11-03', nota_maxima:75, descripcion:null }],
      notas:[{ evaluacion_id:'v1', calificacion:21, comentario:'Muy buena pronunciación; cuida el género.', detalle:null },{ evaluacion_id:'v2', calificacion:85, comentario:'Felicidades por todo tu trabajo en este ciclo.', detalle:null }],
      materiales:[{ id:'m1', titulo:'Fonética: las vocales', descripcion:'Los sonidos y las vocales del francés.', url:'#', categoria:'material', unidad:null, orden:1 },{ id:'m2', titulo:'Ejercicios A1', descripcion:'Posesivos, números y pronombres.', url:'#', categoria:'refuerzo', unidad:null, orden:2 },{ id:'m3', titulo:'Juego de números', descripcion:'Repasa del 70 al 99.', url:'#', categoria:'juego', unidad:null, orden:3 }],
      avisos:[{ id:'a1', titulo:'Pago de noviembre 2026', mensaje:'Las clases se pagan por mes.\\n\\nFecha límite: 13/11/2026.', tipo:'importante', creado_en:'2026-11-06' },{ id:'a2', titulo:'Clase del jueves', mensaje:'Traigan su cuaderno.', tipo:'info', creado_en:'2026-11-05' }],
      solicitudes_ayuda:[{ id:'h1', tema:'Los posesivos', detalle:'No sé si es sa o son', estado:'respondida', creada_en:'2026-11-05T10:00:00Z', respuesta:'Depende de la cosa, no del dueño.' },{ id:'h2', tema:'El passé composé', detalle:null, estado:'abierta', creada_en:'2026-11-06T10:00:00Z', respuesta:null }],
      clases_grabadas:[{ id:'r1', curso_id:'c1', titulo:'Clase del 3 de noviembre', fecha:'2026-11-03', enlace:'https://zoom.example/rec/abc', codigo:'clave-1', notas:'Escucha el minuto 40: es lo de los posesivos.' },{ id:'r2', curso_id:'c1', titulo:'Clase del 29 de octubre', fecha:'2026-10-29', enlace:'https://zoom.example/rec/def', codigo:null, notas:null }],
      grupo_progresion:[], tipos_constancia:[], solicitudes_constancia:[], grupo_enlaces:[], propuestas:[], pruebas_ubicacion:[]
    };
    function cons(t){ const q={ _t:t, select(){return q}, eq(){return q}, is(){return q}, order(){return q}, limit(){return q}, in(){return q}, maybeSingle(){return q}, single(){return q}, insert(){return Promise.resolve({error:null})},
      then(r,j){ return Promise.resolve({ data: DATOS[t]||[], error:null }).then(r,j); } }; return q; }
    const supabaseClient = { from:cons, storage:{ from:()=>({ upload:async()=>({error:null}) }) },
      rpc: async(n)=> n==='resumen_actividad' ? ({ data:{ minutos_total:315, dias_con_uso:6, minutos_7_dias:140, desde:'2026-11-09' }, error:null }) : ({ data:[{ concepto:'Ciclo Français A1.4 · Défi 1', monto:1900, moneda:'MXN', estado:'pagado', pagado_en:'2026-10-02' },{ concepto:'Mes 2 · noviembre 2026', monto:1900, moneda:'MXN', estado:'pendiente', pagado_en:null }], error:null }) };
  </script><script>let perfilEstudiante`);
(async () => {
  const n = await chromium.launch(); const errores = [];
  fs.writeFileSync(raiz + '/.captura-est.html', html);
  for (const [w, h, tag] of [[1280, 900, 'escritorio'], [390, 844, 'movil']]) {
    const p = await n.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
    p.on('pageerror', e => errores.push(tag + ': ' + e.message));
    await p.goto('file://' + raiz + '/.captura-est.html'); await p.waitForTimeout(1800);
    for (const s of ['inicio', 'curso', 'resultados', 'materiales', 'grabaciones', 'ayuda', 'pagos']) {
      await p.evaluate(x => cambiarSeccion(x), s); await p.waitForTimeout(250);
      await p.screenshot({ path: `${salida}/panel-${tag}-${s}.png`, fullPage: true });
    }
    await p.close();
  }
  fs.unlinkSync(raiz + '/.captura-est.html');
  console.log(errores.length ? 'ERRORES:\n' + errores.join('\n') : 'Sin errores de JavaScript.');
  await n.close();
})();
