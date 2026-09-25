// Auditoría del sitio en escritorio y en móvil.
// Mide en vez de opinar: desborde horizontal, texto ilegible, botones
// pequeños para el dedo, etiqueta viewport, imágenes sin tamaño y errores.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE = 'http://localhost:8934/MiguelTillero';
const MOCK_JS = fs.readFileSync(path.join(__dirname, 'mock-supabase.js'), 'utf8');

const PAGINAS = process.env.PAGINAS
  ? process.env.PAGINAS.split(',')
  : ['index.html','perfil.html','servicios.html','cursos.html','galeria.html','testimonios.html',
     'contacto.html','reglamento.html','pagos.html','inscribete.html','reservar.html',
     'mi-espacio.html','login.html','restablecer.html','gracias.html',
     'registro/inscripcion.html','registro/alta.html',
     'cursos/ninos.html','cursos/adolescentes.html','cursos/adultos.html','cursos/docentes.html',
     'examenes/delf-a1.html','examenes/delf-a2.html','examenes/delf-b1.html',
     'examenes/delf-b2.html','examenes/dalf-c1.html','examenes/dalf-c2.html',
     'estudiantes/a1.html','estudiantes/b2.html','club/index.html'];

const VISTAS = [
  { nombre: 'movil',      width: 390, height: 844, movil: true },
  { nombre: 'escritorio', width: 1440, height: 900, movil: false }
];

// Lo que se mide dentro de la página ya cargada.
function medir(esMovil) {
  const doc = document.documentElement;
  const r = { desborde: 0, culpables: [], textoPequeno: [], tapChicos: [],
              viewport: null, imgSinTamano: 0, imgEnormes: [], horizScroll: false };

  r.viewport = (document.querySelector('meta[name="viewport"]') || {}).content || null;
  r.horizScroll = doc.scrollWidth > doc.clientWidth + 1;
  r.desborde = Math.max(0, doc.scrollWidth - doc.clientWidth);

  const anchoVis = doc.clientWidth;
  const vistos = new Set();
  document.querySelectorAll('body *').forEach(el => {
    const c = el.getBoundingClientRect();
    if (c.width === 0 || c.height === 0) return;
    const est = getComputedStyle(el);
    if (est.visibility === 'hidden' || est.display === 'none' || est.opacity === '0') return;

    // Elementos que se salen por la derecha o por la izquierda
    const der = c.right + window.scrollX;
    if (der > anchoVis + 2 || c.left + window.scrollX < -2) {
      const llave = el.tagName + (el.id ? '#' + el.id : '') + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/)[0] : '');
      if (!vistos.has(llave) && r.culpables.length < 6) { vistos.add(llave); r.culpables.push({ sel: llave, sobra: Math.round(der - anchoVis) }); }
    }

    if (esMovil) {
      // Texto por debajo de 12px es difícil de leer en un teléfono
      const txt = (el.textContent || '').trim();
      const hijoTexto = el.children.length === 0 && txt.length > 12;
      const px = parseFloat(est.fontSize);
      if (hijoTexto && px && px < 12 && r.textoPequeno.length < 8) {
        r.textoPequeno.push({ sel: el.tagName + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/)[0] : ''), px: Math.round(px * 10) / 10, txt: txt.slice(0, 32) });
      }
      // Objetivos táctiles: se recomiendan 44x44 o más
      if (/^(A|BUTTON)$/.test(el.tagName) || el.getAttribute('role') === 'button') {
        const soloIcono = txt.length === 0;
        if ((c.height < 32 || (c.width < 32 && soloIcono)) && r.tapChicos.length < 8) {
          r.tapChicos.push({ sel: el.tagName + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/)[0] : ''), w: Math.round(c.width), h: Math.round(c.height), txt: txt.slice(0, 24) });
        }
      }
    }
  });

  document.querySelectorAll('img').forEach(img => {
    if (!img.getAttribute('width') && !img.getAttribute('height') &&
        !img.style.width && !img.style.height && !img.style.aspectRatio) r.imgSinTamano++;
    const c = img.getBoundingClientRect();
    if (img.naturalWidth && c.width > 0 && img.naturalWidth > c.width * 3 && r.imgEnormes.length < 5) {
      r.imgEnormes.push({ src: (img.currentSrc || img.src).split('/').pop().slice(0, 34), natural: img.naturalWidth, mostrado: Math.round(c.width) });
    }
  });
  return r;
}

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const informe = [];

  for (const vista of VISTAS) {
    const ctx = await browser.newContext({
      viewport: { width: vista.width, height: vista.height },
      deviceScaleFactor: vista.movil ? 3 : 1,
      isMobile: vista.movil,
      hasTouch: vista.movil,
      userAgent: vista.movil
        ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
        : undefined
    });
    await ctx.route('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js', r =>
      r.fulfill({ status: 200, headers: { 'content-type': 'application/javascript' }, body: MOCK_JS }));
    await ctx.route(/fonts\.googleapis\.com|fonts\.gstatic\.com|cdnjs\.cloudflare\.com/, r =>
      r.fulfill({ status: 200, headers: { 'content-type': 'text/css' }, body: '/* stub */' }));
    // Los vídeos e imágenes remotas no deben falsear la medición
    await ctx.route(/\.(mp4|webm)$/, r => r.abort());

    for (const pagina of PAGINAS) {
      const page = await ctx.newPage();
      const errores = [];
      page.on('pageerror', e => errores.push(e.message.slice(0, 90)));
      page.on('console', m => { if (m.type() === 'error') errores.push('console: ' + m.text().slice(0, 80)); });
      try {
        await page.goto(`${BASE}/${pagina}`, { waitUntil: 'load', timeout: 25000 });
        await page.waitForTimeout(1100);
        const m = await page.evaluate(medir, vista.movil);
        informe.push({ pagina, vista: vista.nombre, ...m, errores });
      } catch (e) {
        informe.push({ pagina, vista: vista.nombre, fallo: e.message.slice(0, 80), errores });
      }
      await page.close();
    }
    await ctx.close();
  }

  await browser.close();
  fs.writeFileSync(path.join(__dirname, 'informe-auditoria.json'), JSON.stringify(informe, null, 1));

  // ---- Resumen legible ----
  const movil = informe.filter(r => r.vista === 'movil');
  const esc = informe.filter(r => r.vista === 'escritorio');

  console.log('\n================ DESBORDE HORIZONTAL (lo peor en móvil) ================');
  let hayDesborde = false;
  movil.forEach(r => {
    if (r.desborde > 2) {
      hayDesborde = true;
      console.log(`  ${r.pagina.padEnd(34)} +${r.desborde}px  ${r.culpables.map(c => c.sel + '(+' + c.sobra + ')').join(' ')}`);
    }
  });
  if (!hayDesborde) console.log('  ninguna página se desborda en móvil');

  console.log('\n================ DESBORDE EN ESCRITORIO ================');
  const dEsc = esc.filter(r => r.desborde > 2);
  if (!dEsc.length) console.log('  ninguna');
  dEsc.forEach(r => console.log(`  ${r.pagina.padEnd(34)} +${r.desborde}px  ${r.culpables.map(c => c.sel).join(' ')}`));

  console.log('\n================ ETIQUETA VIEWPORT ================');
  const sinVp = movil.filter(r => !r.viewport);
  if (!sinVp.length) console.log('  todas la tienen');
  sinVp.forEach(r => console.log('  FALTA en ' + r.pagina));

  console.log('\n================ TEXTO POR DEBAJO DE 12px EN MÓVIL ================');
  const chico = movil.filter(r => r.textoPequeno && r.textoPequeno.length);
  if (!chico.length) console.log('  ninguno');
  chico.forEach(r => console.log(`  ${r.pagina.padEnd(34)} ${r.textoPequeno.slice(0,3).map(t => t.px + 'px ' + t.sel).join(' · ')}`));

  console.log('\n================ BOTONES/ENLACES < 32px DE ALTO EN MÓVIL ================');
  const tap = movil.filter(r => r.tapChicos && r.tapChicos.length);
  if (!tap.length) console.log('  ninguno');
  tap.forEach(r => console.log(`  ${r.pagina.padEnd(34)} ${r.tapChicos.length} · ${r.tapChicos.slice(0,3).map(t => `${t.sel} ${t.w}x${t.h}`).join(' · ')}`));

  console.log('\n================ IMÁGENES SERVIDAS MUCHO MÁS GRANDES DE LO QUE SE VEN ================');
  const gordas = movil.filter(r => r.imgEnormes && r.imgEnormes.length);
  if (!gordas.length) console.log('  ninguna');
  gordas.forEach(r => console.log(`  ${r.pagina.padEnd(34)} ${r.imgEnormes.slice(0,3).map(i => `${i.src} ${i.natural}px→${i.mostrado}px`).join(' · ')}`));

  console.log('\n================ ERRORES DE JAVASCRIPT ================');
  const conErr = informe.filter(r => r.errores && r.errores.length);
  if (!conErr.length) console.log('  ninguno');
  const yaVisto = new Set();
  conErr.forEach(r => {
    const k = r.pagina + r.errores[0];
    if (yaVisto.has(k)) return;
    yaVisto.add(k);
    console.log(`  ${r.pagina.padEnd(34)} [${r.vista}] ${r.errores[0]}`);
  });

  console.log('\n================ PÁGINAS QUE NO CARGARON ================');
  const fallos = informe.filter(r => r.fallo);
  if (!fallos.length) console.log('  ninguna');
  fallos.forEach(r => console.log(`  ${r.pagina} [${r.vista}] ${r.fallo}`));

  console.log(`\nInforme completo en informe-auditoria.json (${informe.length} mediciones)`);
})();
