/* Inscríbete: el formulario largo pasa a ser un recorrido por pasos, con barra de progreso.
   Los campos, sus nombres y el envío no cambian: solo se muestran de a un grupo. Sin este script, el formulario sigue completo. */
(function () {
  'use strict';
  var form = document.getElementById('inscForm');
  if (!form) return;
  var grupos = Array.prototype.slice.call(form.querySelectorAll('.insc-group'));
  if (grupos.length < 2) return;
  var actual = 0;
  form.classList.add('wizard');

  var cab = document.createElement('div'); cab.className = 'wz-cab';
  var pasos = document.createElement('ol'); pasos.className = 'wz-pasos';
  var titulo = document.createElement('p'); titulo.className = 'wz-titulo';
  grupos.forEach(function (g, i) {
    var li = document.createElement('li'); li.className = 'wz-paso';
    var ic = g.querySelector('.insc-legend i');
    li.innerHTML = '<span class="wz-bola"><i class="fa ' + (ic ? ic.className.replace(/^fa\s*/, '').replace(/^fa-solid\s*/, '') : 'fa-circle') + '" aria-hidden="true"></i></span>';
    li.addEventListener('click', function () { if (i < actual) ir(i); });
    pasos.appendChild(li);
  });
  var barra = document.createElement('div'); barra.className = 'wz-barra'; barra.innerHTML = '<i></i>';
  cab.appendChild(pasos); cab.appendChild(barra); cab.appendChild(titulo);
  form.insertBefore(cab, grupos[0]);

  var nav = document.createElement('div'); nav.className = 'wz-nav';
  var atras = document.createElement('button'); atras.type = 'button'; atras.className = 'wz-atras';
  atras.innerHTML = '<i class="fa fa-arrow-left" aria-hidden="true"></i><span data-es="Atrás" data-fr="Retour" data-en="Back">Atrás</span>';
  var sig = document.createElement('button'); sig.type = 'button'; sig.className = 'wz-sig';
  sig.innerHTML = '<span data-es="Siguiente" data-fr="Suivant" data-en="Next">Siguiente</span><i class="fa fa-arrow-right" aria-hidden="true"></i>';
  var cuenta = document.createElement('span'); cuenta.className = 'wz-cuenta';
  nav.appendChild(atras); nav.appendChild(cuenta); nav.appendChild(sig);
  var submit = form.querySelector('.insc-submit');
  form.insertBefore(nav, submit || null);

  function textoTitulo(g) {
    var s = g.querySelector('.insc-legend span');
    return s ? s.textContent : '';
  }
  function ir(n) {
    actual = Math.max(0, Math.min(grupos.length - 1, n));
    grupos.forEach(function (g, i) { g.classList.toggle('on', i === actual); });
    Array.prototype.forEach.call(pasos.children, function (li, i) {
      li.classList.toggle('hecho', i < actual); li.classList.toggle('on', i === actual);
    });
    barra.firstChild.style.width = (actual / (grupos.length - 1) * 100) + '%';
    titulo.textContent = textoTitulo(grupos[actual]);
    cuenta.textContent = (actual + 1) + ' / ' + grupos.length;
    atras.style.visibility = actual === 0 ? 'hidden' : 'visible';
    var ultimo = actual === grupos.length - 1;
    form.classList.toggle('ultimo', ultimo);
    sig.style.display = ultimo ? 'none' : '';
    var top = form.getBoundingClientRect().top + window.pageYOffset - 110;
    if (window.pageYOffset > top) window.scrollTo({ top: top, behavior: 'smooth' });
  }
  function valido() {
    var campos = grupos[actual].querySelectorAll('input, select, textarea');
    for (var i = 0; i < campos.length; i++) {
      if (!campos[i].checkValidity()) { campos[i].reportValidity(); return false; }
    }
    return true;
  }
  function siguiente() { if (valido()) ir(actual + 1); }
  sig.addEventListener('click', siguiente);
  atras.addEventListener('click', function () { ir(actual - 1); });
  form.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA' && actual < grupos.length - 1) { e.preventDefault(); siguiente(); }
  });
  /* si el idioma cambia, el título del paso se actualiza */
  var setOriginal = window.setLang;
  if (typeof setOriginal === 'function') {
    window.setLang = function () { var r = setOriginal.apply(this, arguments); titulo.textContent = textoTitulo(grupos[actual]); return r; };
  }
  ir(0);
  if (typeof setLang === 'function') { try { setLang(document.documentElement.lang || 'es'); } catch (e) {} }
})();
