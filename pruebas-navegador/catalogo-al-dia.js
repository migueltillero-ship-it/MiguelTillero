/* El catálogo de fichas de la base, contra las fichas del sitio.
   -------------------------------------------------------------------------
   La nota de ejercicios se calcula sobre TODO lo que se ofreció, así que la
   base necesita saber cuántos ejercicios tiene cada ficha. Ese número vive
   en dos sitios —el archivo de fichas y supabase/nota-de-ejercicios.sql— y
   dos sitios siempre acaban separándose.

   Si se separan, nadie se entera: la nota simplemente sale mal. Una ficha
   nueva que falte en el catálogo no cuenta para nadie; una ficha que creció
   y no se actualizó reparte la nota sobre menos ejercicios de los que hay.

   Esta prueba no abre el navegador: solo lee los dos archivos y los compara.
   Se ejecuta igual que las demás.                                          */
const fs = require('fs');
const path = require('path');
const RAIZ = path.join(__dirname, '..');

function fichasDelSitio(ruta){
  const FICHAS = [];
  const src = fs.readFileSync(ruta, 'utf8').replace(/^const FICHAS = \[\];$/m, '');
  new Function('FICHAS', src)(FICHAS);
  return FICHAS.map(f => ({ id: f.id, titulo: f.titulo, n: f.ejercicios.length }));
}

function catalogoDelSql(ruta, clave){
  const sql = fs.readFileSync(ruta, 'utf8');
  const filas = [];
  const re = new RegExp("\\('" + clave + "',\\s*'([^']+)',\\s*'((?:[^']|'')*)',\\s*(\\d+)\\)", 'g');
  let m;
  while ((m = re.exec(sql)) !== null) {
    filas.push({ id: m[1], titulo: m[2].replace(/''/g, "'"), n: +m[3] });
  }
  return filas;
}

const espacios = [
  { nombre: 'A1.4', clave: 'mt-a1', fichas: 'estudiantes/espace-a1-fiches.js' }
];

let fallos = 0;
espacios.forEach(e => {
  const sitio = fichasDelSitio(path.join(RAIZ, e.fichas));
  const base  = catalogoDelSql(path.join(RAIZ, 'supabase/nota-de-ejercicios.sql'), e.clave);
  console.log(`── ${e.nombre} (${e.clave}) ──`);
  console.log(`   ${sitio.length} fichas en el sitio · ${base.length} en el catálogo`);

  const porId = Object.fromEntries(base.map(f => [f.id, f]));
  sitio.forEach(f => {
    const b = porId[f.id];
    if (!b) {
      console.log(`✗ «${f.titulo}» está en el sitio y NO en el catálogo: no cuenta para la nota de nadie.`);
      fallos++; return;
    }
    if (b.n !== f.n) {
      console.log(`✗ «${f.titulo}»: el sitio tiene ${f.n} ejercicios, el catálogo dice ${b.n}.`);
      fallos++;
    }
    if (b.titulo !== f.titulo) {
      console.log(`✗ «${f.id}»: el título del catálogo no coincide («${b.titulo}»).`);
      fallos++;
    }
    delete porId[f.id];
  });
  Object.values(porId).forEach(b => {
    console.log(`✗ «${b.titulo}» está en el catálogo y ya no en el sitio: resta nota sin existir.`);
    fallos++;
  });

  if (!fallos) {
    const total = sitio.reduce((a, f) => a + f.n, 0);
    console.log(`✓ Coinciden las ${sitio.length}, ${total} ejercicios en total.`);
  }
});

console.log(fallos ? `\n${fallos} diferencia(s) ✗` : '\nCatálogo al día ✓');
process.exit(fallos ? 1 : 0);
