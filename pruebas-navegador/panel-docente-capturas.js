/* Capturas del panel del docente con datos inventados, en escritorio y móvil.
   Igual que panel-estudiante-capturas.js: cliente de Supabase simulado, no se
   lee ni se escribe nada. Fechas relativas a hoy, para que «Hoy» tenga clases.
   Uso: node pruebas-navegador/panel-docente-capturas.js <carpeta-de-salida> */
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const fs = require('fs');
const salida = process.argv[2] || '.';
const raiz = require('path').resolve(__dirname, '..');
const stub = `
const supabaseConfigurado = true;
async function requerirSesion(){ return { perfil:{ id:'d1', nombre_completo:'Miguel Docente', role:'docente' } }; }
function cerrarSesion(){} function mostrarAvisoSinConfigurar(){}
const iso = n => { const d = new Date(); d.setDate(d.getDate()+n); return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); };
const dow = n => { const d = new Date(); d.setDate(d.getDate()+n); return d.getDay(); };
const DATOS = {
  cursos:[{ id:'c1', nombre:'Français A1 · Oct 2026', nivel:'A1', estado:'abierto', cupo_maximo:8, fecha_inicio:iso(-40), fecha_fin:iso(25), docente_id:'d1', created_at:iso(-40) },
          { id:'c2', nombre:'Français B2 · Oct 2026', nivel:'B2', estado:'abierto', cupo_maximo:6, fecha_inicio:iso(-35), fecha_fin:iso(9), docente_id:'d1', created_at:iso(-35) },
          { id:'c3', nombre:'Clase particular · Alumno C', nivel:'A0', estado:'cerrado', cupo_maximo:1, fecha_inicio:iso(1), fecha_fin:iso(30), docente_id:'d1', created_at:iso(-3) }],
  grupos:[{ id:'g1', curso_id:'c1', codigo:'A1-OCT2026', formato:'grupal', cupo_actual:2, cupo_maximo:8 },{ id:'g2', curso_id:'c2', codigo:'B2-OCT2026', formato:'grupal', cupo_actual:2, cupo_maximo:6 },{ id:'g3', curso_id:'c3', codigo:'PART-1', formato:'individual', cupo_actual:1, cupo_maximo:1 }],
  sesiones:[ {id:'s1',curso_id:'c1',fecha:iso(-7),tema:'Les possessifs'},{id:'s2',curso_id:'c1',fecha:iso(-4),tema:'Les nombres'},{id:'s3',curso_id:'c1',fecha:iso(0),tema:'Le passé composé'},{id:'s4',curso_id:'c1',fecha:iso(3),tema:''},
             {id:'s5',curso_id:'c2',fecha:iso(-2),tema:'Le subjonctif'},{id:'s6',curso_id:'c2',fecha:iso(0),tema:'Débat'},{id:'s7',curso_id:'c2',fecha:iso(2),tema:''},{id:'s8',curso_id:'c3',fecha:iso(1),tema:'Les sons et les voyelles'} ],
  horarios:[0,1,2,3,4,5,6].flatMap(d=>[ { curso_id:'c1', dia_semana:d, hora_inicio:'16:00', hora_fin:'18:00' } ]).filter(h=>[2,4].includes(h.dia_semana)).concat([{curso_id:'c2',dia_semana:dow(0),hora_inicio:'19:00',hora_fin:'21:00'},{curso_id:'c2',dia_semana:dow(2),hora_inicio:'19:00',hora_fin:'21:00'},{curso_id:'c1',dia_semana:dow(0),hora_inicio:'16:00',hora_fin:'18:00'}]),
  inscripciones:[ {id:'i1',curso_id:'c1',estudiante_id:'e1',estado:'activa'},{id:'i2',curso_id:'c1',estudiante_id:'e2',estado:'activa'},{id:'i3',curso_id:'c2',estudiante_id:'e3',estado:'activa'},{id:'i4',curso_id:'c2',estudiante_id:'e4',estado:'activa'},{id:'i5',curso_id:'c3',estudiante_id:'e5',estado:'activa'} ],
  asistencia:[ {sesion_id:'s1',estudiante_id:'e1',presente:true},{sesion_id:'s1',estudiante_id:'e2',presente:true},{sesion_id:'s2',estudiante_id:'e1',presente:true},{sesion_id:'s2',estudiante_id:'e2',presente:false} ],
  evaluaciones:[ {id:'v1',curso_id:'c1',nombre:'Évaluation collective (cierre de ciclo)',fecha:iso(-6)},{id:'v2',curso_id:'c1',nombre:'Évaluation individuelle (cierre de ciclo)',fecha:iso(-4)} ],
  notas:[], profiles:[ {id:'e1',nombre_completo:'Alumno A'},{id:'e2',nombre_completo:'Alumno B'},{id:'e3',nombre_completo:'Alumno C'},{id:'e4',nombre_completo:'Alumno D'},{id:'e5',nombre_completo:'Alumno E'} ],
  solicitudes_ayuda:[ {id:'h1',estudiante_id:'e1',tema:'El passé composé',detalle:'No sé cuándo usar être',estado:'abierta',creada_en:new Date().toISOString()} ],
  grabaciones_sin_asignar:[{ id:'z1', tema:'Reunión de Zoom de prueba', fecha:iso(-1), enlace:'https://zoom.example/rec/zzz', codigo:null, zoom_uuid:'u1' }], clases_grabadas:[{ id:'r1', curso_id:'c1', titulo:'Clase del 3 de noviembre', fecha:iso(-6), enlace:'https://zoom.example/rec/abc', codigo:'clave-1', notas:'Escucha el minuto 40' }], grabaciones:[{id:'r1'},{id:'r2'}], feriados:[], metodos:[], metodo_unidades:[]
};
function cons(t){ const q={ select(){return q}, eq(){return q}, in(){return q}, is(){return q}, order(){return q}, limit(){return q}, maybeSingle(){return q}, single(){return q},
  insert(){return Promise.resolve({error:null})}, update(){return {eq:()=>Promise.resolve({error:null})}},
  then(r,j){ return Promise.resolve({ data: DATOS[t]||[], error:null }).then(r,j); } }; return q; }
const supabaseClient = { from:cons, rpc: async()=>({data:[],error:null}) };
`;
const html = fs.readFileSync(raiz + '/panel-docente.html', 'utf8')
  .replace(/<script src="https:\/\/cdn\.jsdelivr[^>]*><\/script>/g, '')
  .replace(/<script src="assets\/js\/(supabase-config|auth-helpers)[^>]*><\/script>/g, '')
  .replace(/<script>\s*\n?(let perfilDocente|let cursos)/, m => '<script>' + stub + '</script><script>' + m.replace('<script>', ''));
(async () => {
  const n = await chromium.launch(); const errores = [];
  const tmp = raiz + '/.captura-doc.html'; fs.writeFileSync(tmp, html);
  for (const [w, h, tag] of [[1280, 900, 'escritorio'], [390, 844, 'movil']]) {
    const p = await n.newPage({ viewport: { width: w, height: h } });
    p.on('pageerror', e => errores.push(tag + ': ' + e.message));
    await p.goto('file://' + tmp); await p.waitForTimeout(2000);
    for (const s of ['hoy', 'cursos', 'calendario']) {
      await p.evaluate(x => cambiarSeccion(x), s); await p.waitForTimeout(250);
      await p.screenshot({ path: `${salida}/docente-${tag}-${s}.png`, fullPage: true });
    }
    await p.evaluate(() => { cambiarSeccion('cursos'); return seleccionarCurso('c1'); }); await p.waitForTimeout(700);
    for (const t of ['planificacion', 'asistencia', 'estudiantes', 'notas', 'grabaciones']) {
      await p.evaluate(x => cambiarTab(x), t); await p.waitForTimeout(300);
      await p.screenshot({ path: `${salida}/docente-${tag}-curso-${t}.png`, fullPage: true });
    }
    await p.close();
  }
  fs.unlinkSync(tmp);
  console.log(errores.length ? 'ERRORES:\n' + errores.join('\n') : 'Sin errores de JavaScript.');
  await n.close();
})();
