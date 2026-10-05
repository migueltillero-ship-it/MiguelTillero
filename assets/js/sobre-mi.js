/* Perfil · «Sobre mí»: frase que se ilumina al bajar, cifras que cuentan solas y puertas que se abren. */
(function () {
  'use strict';
  var quieto = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var frase = document.getElementById('smFrase');
  var palabras = [];

  /* ── Frase: cada palabra es un <span>; el idioma la reconstruye porque i18n reemplaza el texto ── */
  function lang() { return (document.documentElement.lang || 'es').slice(0, 2); }
  function trocear(texto, clase, destino) {
    texto.split(/\s+/).filter(Boolean).forEach(function (w) {
      var s = document.createElement('span');
      s.className = 'mf-p' + (clase ? ' ' + clase : '');
      s.textContent = w;
      destino.appendChild(s);
      destino.appendChild(document.createTextNode(' '));
    });
  }
  function construirFrase() {
    if (!frase) return;
    var texto = frase.textContent.replace(/\s+/g, ' ').trim();
    var oro = frase.getAttribute('data-oro-' + lang()) || '';
    var i = oro ? texto.indexOf(oro) : -1;
    frase.textContent = '';
    if (i < 0) { trocear(texto, '', frase); }
    else {
      /* la puntuación pegada a la frase destacada (el punto final, comillas) va con ella */
      var j = i + oro.length;
      while (j < texto.length && !/\s/.test(texto.charAt(j))) j++;
      while (i > 0 && !/\s/.test(texto.charAt(i - 1))) i--;
      trocear(texto.slice(0, i), '', frase);
      trocear(texto.slice(i, j), 'mf-oro', frase);
      trocear(texto.slice(j), '', frase);
    }
    palabras = Array.prototype.slice.call(frase.querySelectorAll('.mf-p'));
    iluminar();
  }
  function iluminar() {
    if (!frase || !palabras.length) return;
    var r = frase.getBoundingClientRect(), vh = window.innerHeight || 800;
    var p = quieto ? 1 : (vh * 0.86 - r.top) / (vh * 0.86 - vh * 0.4 + r.height * 0.5);
    p = Math.max(0, Math.min(1, p));
    var n = Math.round(p * palabras.length * 1.04);
    palabras.forEach(function (w, k) { w.classList.toggle('on', k < n); });
  }
  window.addEventListener('scroll', iluminar, { passive: true });
  window.addEventListener('resize', iluminar);

  /* i18n.js reemplaza el texto al cambiar de idioma: se vuelve a trocear después */
  var cambiar = window.setLang;
  if (typeof cambiar === 'function') {
    window.setLang = function () { var out = cambiar.apply(this, arguments); construirFrase(); return out; };
  }
  construirFrase();

  /* ── Cifras: cuentan desde 0 hasta su valor al aparecer ── */
  function formato(n, dec) {
    var t = n.toFixed(dec);
    return lang() === 'en' ? t : t.replace('.', ',');
  }
  function contar(el) {
    var meta = parseFloat(el.getAttribute('data-count')), dec = parseInt(el.getAttribute('data-dec') || '0', 10);
    if (isNaN(meta)) return;
    if (quieto) { el.textContent = formato(meta, dec); return; }
    var t0 = null, dur = 1500;
    function paso(t) {
      if (t0 === null) t0 = t;
      var k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      el.textContent = formato(meta * e, dec);
      if (k < 1) requestAnimationFrame(paso);
    }
    el.textContent = formato(0, dec);
    requestAnimationFrame(paso);
  }
  var cifras = document.querySelector('.sm-cifras');
  if (cifras && 'IntersectionObserver' in window) {
    var oc = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        oc.unobserve(e.target);
        e.target.querySelectorAll('[data-count]').forEach(contar);
      });
    }, { threshold: 0.4 });
    oc.observe(cifras);
  }

  /* ── Puertas: al aparecer se abren una tras otra, para enseñar que se pueden abrir ── */
  var puertas = document.getElementById('puertas');
  var conMouse = window.matchMedia && window.matchMedia('(hover: hover)').matches;
  if (puertas && conMouse && !quieto && 'IntersectionObserver' in window) {
    var op = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        op.unobserve(e.target);
        Array.prototype.forEach.call(e.target.querySelectorAll('.puerta'), function (p, i) {
          setTimeout(function () { p.classList.add('peek'); }, 500 + i * 420);
          setTimeout(function () { p.classList.remove('peek'); }, 500 + i * 420 + 1700);
        });
      });
    }, { threshold: 0.55 });
    op.observe(puertas);
  }
})();
