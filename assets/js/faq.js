/* Contacto · Preguntas frecuentes: buscador, categorías, acordeón animado y una tarjeta con foto.
   Mejora el <details> que ya está en la página: si este script no corre, las preguntas siguen funcionando. */
(function () {
  'use strict';
  var sec = document.getElementById('faq');
  if (!sec) return;
  var lista = sec.querySelector('.faq-list');
  if (!lista) return;
  var items = Array.prototype.slice.call(lista.querySelectorAll('.faq-item'));
  if (!items.length) return;

  var CATS = [
    { id: 'todas',     es: 'Todas',               fr: 'Toutes',            en: 'All',             icono: 'fa-layer-group' },
    { id: 'empezar',   es: 'Para empezar',        fr: 'Pour commencer',    en: 'Getting started', icono: 'fa-seedling' },
    { id: 'examenes',  es: 'Exámenes',            fr: 'Examens',           en: 'Exams',           icono: 'fa-certificate' },
    { id: 'migracion', es: 'Quebec y Francia',    fr: 'Québec et France',  en: 'Quebec & France', icono: 'fa-plane-departure' },
    { id: 'pagos',     es: 'Pagos',               fr: 'Paiements',         en: 'Payments',        icono: 'fa-credit-card' }
  ];
  var POR_PREGUNTA = ['empezar', 'empezar', 'empezar', 'examenes', 'migracion', 'examenes', 'examenes', 'empezar', 'pagos'];

  function tri(tag, cls, es, fr, en) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    n.textContent = es;
    n.setAttribute('data-es', es); n.setAttribute('data-fr', fr); n.setAttribute('data-en', en);
    return n;
  }
  function quitarAcentos(t) { return (t || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase(); }

  items.forEach(function (d, i) {
    d.setAttribute('data-cat', POR_PREGUNTA[i] || 'empezar');
    d.style.setProperty('--n', i + 1);
  });

  /* estructura nueva alrededor de la lista */
  var layout = document.createElement('div'); layout.className = 'faq-layout';
  var lado = document.createElement('aside'); lado.className = 'faq-lado reveal';
  lado.innerHTML =
    '<figure class="faq-foto"><img src="assets/images/portrait-miguel-1.jpg" alt="Miguel Tillero sonriendo" loading="lazy" width="1024" height="1201"></figure>' +
    '<div class="faq-lado-txt"></div>';
  var txt = lado.querySelector('.faq-lado-txt');
  txt.appendChild(tri('h3', 'faq-lado-t', '¿No encuentras tu respuesta?', 'Vous ne trouvez pas votre réponse ?', "Can't find your answer?"));
  txt.appendChild(tri('p', 'faq-lado-p', 'Pregúntame directamente: respondo yo, en persona y sin prisa.', 'Posez-moi la question directement : je réponds moi-même, sans me presser.', "Ask me directly: I answer personally, with no rush."));
  var wa = document.createElement('a');
  wa.className = 'btn btn-gold'; wa.href = 'https://wa.me/584122465331'; wa.target = '_blank'; wa.rel = 'noopener';
  wa.innerHTML = '<i class="fab fa-whatsapp"></i>';
  wa.appendChild(tri('span', '', 'Escribirme por WhatsApp', 'M’écrire sur WhatsApp', 'Message me on WhatsApp'));
  var cl = document.createElement('button');
  cl.type = 'button'; cl.className = 'btn btn-ghost';
  cl.innerHTML = '<i class="fa fa-graduation-cap"></i>';
  cl.appendChild(tri('span', '', 'Clase de prueba gratuita', 'Cours d’essai gratuit', 'Free trial class'));
  cl.addEventListener('click', function () { if (typeof openModal === 'function') openModal('modal-clase'); });
  var bot = document.createElement('div'); bot.className = 'faq-lado-btn'; bot.appendChild(wa); bot.appendChild(cl);
  txt.appendChild(bot);

  var principal = document.createElement('div'); principal.className = 'faq-principal';
  var barra = document.createElement('div'); barra.className = 'faq-barra reveal';
  var buscar = document.createElement('label'); buscar.className = 'faq-buscar';
  buscar.innerHTML = '<i class="fa fa-magnifying-glass" aria-hidden="true"></i>';
  var inp = document.createElement('input');
  inp.type = 'search'; inp.autocomplete = 'off';
  inp.setAttribute('data-es-placeholder', 'Busca una palabra: DELF, pago, Quebec…');
  inp.setAttribute('data-fr-placeholder', 'Cherchez un mot : DELF, paiement, Québec…');
  inp.setAttribute('data-en-placeholder', 'Search a word: DELF, payment, Quebec…');
  inp.placeholder = 'Busca una palabra: DELF, pago, Quebec…';
  inp.setAttribute('aria-label', 'Buscar en las preguntas frecuentes');
  buscar.appendChild(inp);
  barra.appendChild(buscar);
  var chips = document.createElement('div'); chips.className = 'faq-chips'; chips.setAttribute('role', 'tablist');
  CATS.forEach(function (c, k) {
    var b = document.createElement('button'); b.type = 'button'; b.className = 'faq-chip' + (k === 0 ? ' on' : ''); b.setAttribute('data-cat', c.id);
    b.innerHTML = '<i class="fa ' + c.icono + '" aria-hidden="true"></i>';
    b.appendChild(tri('span', '', c.es, c.fr, c.en));
    chips.appendChild(b);
  });
  barra.appendChild(chips);
  var cuenta = document.createElement('p'); cuenta.className = 'faq-cuenta';
  var nCuenta = document.createElement('b'); var tCuenta = tri('span', '', 'preguntas', 'questions', 'questions');
  cuenta.appendChild(nCuenta); cuenta.appendChild(document.createTextNode(' ')); cuenta.appendChild(tCuenta);
  var vacio = tri('p', 'faq-vacio', 'Ninguna pregunta coincide. Prueba con otra palabra o escríbeme: te respondo.', 'Aucune question ne correspond. Essayez un autre mot ou écrivez-moi : je vous réponds.', 'No question matches. Try another word or write to me: I will answer.');
  vacio.hidden = true;

  lista.parentNode.insertBefore(layout, lista);
  principal.appendChild(barra); principal.appendChild(cuenta); principal.appendChild(lista); principal.appendChild(vacio);
  layout.appendChild(lado); layout.appendChild(principal);

  /* filtros */
  var cat = 'todas';
  function aplicar() {
    var q = quitarAcentos(inp.value.trim()), n = 0;
    items.forEach(function (d) {
      var okCat = cat === 'todas' || d.getAttribute('data-cat') === cat;
      var okTxt = !q || quitarAcentos(d.textContent).indexOf(q) !== -1;
      var ver = okCat && okTxt;
      d.hidden = !ver;
      if (ver) n++; else d.removeAttribute('open');
    });
    nCuenta.textContent = n;
    vacio.hidden = n !== 0;
  }
  inp.addEventListener('input', aplicar);
  chips.addEventListener('click', function (e) {
    var b = e.target.closest('.faq-chip'); if (!b) return;
    cat = b.getAttribute('data-cat');
    Array.prototype.forEach.call(chips.children, function (c) { c.classList.toggle('on', c === b); });
    aplicar();
  });
  /* una abierta a la vez */
  items.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (!d.open) return;
      items.forEach(function (o) { if (o !== d) o.removeAttribute('open'); });
    });
  });
  aplicar();
  if (typeof setLang === 'function') { try { setLang(document.documentElement.lang || 'es'); } catch (e) {} }
})();
