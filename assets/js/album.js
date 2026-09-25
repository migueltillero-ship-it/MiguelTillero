/**
 * Álbum de la trayectoria (galeria.html): rejilla filtrable con visor a pantalla
 * completa. Lee assets/data/galeria.json — para sumar una foto basta dejar el
 * archivo (y su miniatura) en assets/images/galeria/ y agregarla al JSON.
 */
(function () {
  var DATOS = 'assets/data/galeria.json';
  var fotos = [], visibles = [], actual = -1, filtro = 'todo', ultimoFoco = null;
  var visor, imgVisor, pieVisor, cuenta;

  function idioma() {
    try { return localStorage.getItem('preferenciaIdioma_MT') || 'es'; } catch (e) { return 'es'; }
  }
  function el(tag, clase, txt) {
    var n = document.createElement(tag);
    if (clase) n.className = clase;
    if (txt) n.textContent = txt;
    return n;
  }
  function tri(n, obj) {
    n.textContent = obj[idioma()] || obj.es;
    ['es', 'fr', 'en'].forEach(function (l) { if (obj[l]) n.setAttribute('data-' + l, obj[l]); });
    return n;
  }

  function construirVisor() {
    visor = el('div', 'alb-visor'); visor.setAttribute('role', 'dialog'); visor.setAttribute('aria-modal', 'true');
    visor.setAttribute('aria-label', 'Visor de fotos'); visor.hidden = true;
    var cerrar = el('button', 'alb-x'); cerrar.type = 'button'; cerrar.setAttribute('aria-label', 'Cerrar');
    cerrar.appendChild(el('i', 'fa fa-xmark'));
    var ant = el('button', 'alb-nav alb-ant'); ant.type = 'button'; ant.setAttribute('aria-label', 'Foto anterior');
    ant.appendChild(el('i', 'fa fa-chevron-left'));
    var sig = el('button', 'alb-nav alb-sig'); sig.type = 'button'; sig.setAttribute('aria-label', 'Foto siguiente');
    sig.appendChild(el('i', 'fa fa-chevron-right'));
    var fig = el('figure', 'alb-fig'); imgVisor = el('img'); pieVisor = el('figcaption'); cuenta = el('span', 'alb-cuenta');
    fig.appendChild(imgVisor);
    var pie = el('div', 'alb-pie'); pie.appendChild(pieVisor); pie.appendChild(cuenta); fig.appendChild(pie);
    [cerrar, ant, sig, fig].forEach(function (n) { visor.appendChild(n); });
    document.body.appendChild(visor);
    cerrar.addEventListener('click', cerrarVisor);
    ant.addEventListener('click', function () { ir(-1); });
    sig.addEventListener('click', function () { ir(1); });
    visor.addEventListener('click', function (e) { if (e.target === visor || e.target === fig) cerrarVisor(); });
    document.addEventListener('keydown', function (e) {
      if (visor.hidden) return;
      if (e.key === 'Escape') cerrarVisor();
      else if (e.key === 'ArrowLeft') ir(-1);
      else if (e.key === 'ArrowRight') ir(1);
    });
    var x0 = null;
    visor.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    visor.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 50) ir(dx < 0 ? 1 : -1);
    });
  }

  function mostrar(i) {
    actual = (i + visibles.length) % visibles.length;
    var f = visibles[actual];
    imgVisor.src = f.src; imgVisor.alt = f.alt || '';
    var p = f.pie || {}; pieVisor.textContent = p[idioma()] || p.es || '';
    cuenta.textContent = (actual + 1) + ' / ' + visibles.length;
    [1, -1].forEach(function (d) {   // precarga de las vecinas
      var v = visibles[(actual + d + visibles.length) % visibles.length]; if (v) new Image().src = v.src;
    });
  }
  function abrirVisor(i) {
    ultimoFoco = document.activeElement;
    visor.hidden = false; document.body.style.overflow = 'hidden';
    mostrar(i); visor.querySelector('.alb-x').focus();
  }
  function cerrarVisor() {
    visor.hidden = true; document.body.style.overflow = ''; imgVisor.removeAttribute('src');
    if (ultimoFoco && ultimoFoco.focus) ultimoFoco.focus();
  }
  function ir(d) { mostrar(actual + d); }

  function aplicarFiltro(rejilla, chips) {
    visibles = fotos.filter(function (f) { return filtro === 'todo' || f.cat === filtro; });
    rejilla.querySelectorAll('.alb-foto').forEach(function (b) {
      b.hidden = !(filtro === 'todo' || b.getAttribute('data-cat') === filtro);
    });
    chips.querySelectorAll('.alb-chip').forEach(function (c) {
      var on = c.getAttribute('data-cat') === filtro;
      c.classList.toggle('on', on); c.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  function construir(raiz, datos) {
    fotos = datos.fotos;
    var chips = el('div', 'alb-chips'); chips.setAttribute('role', 'group'); chips.setAttribute('aria-label', 'Filtrar fotos');
    datos.categorias.forEach(function (c) {
      var n = c.id === 'todo' ? fotos.length : fotos.filter(function (f) { return f.cat === c.id; }).length;
      if (!n) return;
      var b = el('button', 'alb-chip'); b.type = 'button'; b.setAttribute('data-cat', c.id);
      b.appendChild(tri(el('span'), c)); b.appendChild(el('b', null, String(n)));
      b.addEventListener('click', function () { filtro = c.id; aplicarFiltro(rejilla, chips); });
      chips.appendChild(b);
    });
    var rejilla = el('div', 'alb-rejilla');
    fotos.forEach(function (f) {
      var b = el('button', 'alb-foto'); b.type = 'button'; b.setAttribute('data-cat', f.cat);
      b.style.aspectRatio = f.w + '/' + f.h;
      var im = el('img'); im.loading = 'lazy'; im.decoding = 'async'; im.src = f.thumb; im.alt = f.alt || '';
      im.width = f.w; im.height = f.h;
      im.addEventListener('load', function () { b.classList.add('lista'); });
      b.appendChild(im);
      var cap = el('span', 'alb-cap'); tri(cap, f.pie || {}); b.appendChild(cap);
      b.addEventListener('click', function () { abrirVisor(visibles.indexOf(f)); });
      rejilla.appendChild(b);
    });
    raiz.appendChild(chips); raiz.appendChild(rejilla);
    construirVisor();
    aplicarFiltro(rejilla, chips);
  }

  document.addEventListener('DOMContentLoaded', function () {
    var raiz = document.querySelector('[data-album]');
    if (!raiz) return;
    fetch(raiz.getAttribute('data-album') || DATOS).then(function (r) {
      if (!r.ok) throw new Error('sin datos'); return r.json();
    }).then(function (d) { construir(raiz, d); }).catch(function (e) { console.warn('Álbum:', e); raiz.style.display = 'none'; });
  });
})();
