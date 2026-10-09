/* Testimonios · «Voces de mis estudiantes»: lee assets/data/testimonios-media.json y muestra
   video o audio de cada testimonio autorizado. Si no hay ninguno, la sección sigue oculta. */
(function () {
  'use strict';
  var caja = document.getElementById('voces');
  var rejilla = document.getElementById('voces-grid');
  if (!caja || !rejilla) return;
  fetch('assets/data/testimonios-media.json', { cache: 'no-cache' })
    .then(function (r) { return r.ok ? r.json() : { items: [] }; })
    .catch(function () { return { items: [] }; })
    .then(function (d) {
      var items = (d.items || []).filter(function (x) { return x && x.autorizado === true && x.archivo; });
      if (!items.length) return;
      items.forEach(function (x) {
        var card = document.createElement('article');
        card.className = 'voz-card ' + (x.tipo === 'audio' ? 'es-audio' : 'es-video');
        var medio;
        if (x.tipo === 'audio') {
          medio = document.createElement('div'); medio.className = 'voz-audio';
          var ini = document.createElement('span'); ini.className = 'voz-inicial';
          ini.textContent = (x.nombre || '?').trim().charAt(0).toUpperCase();
          var au = document.createElement('audio'); au.controls = true; au.preload = 'none'; au.src = x.archivo;
          medio.appendChild(ini); medio.appendChild(au);
        } else {
          medio = document.createElement('div'); medio.className = 'voz-video';
          var v = document.createElement('video'); v.controls = true; v.preload = 'none'; v.playsInline = true;
          v.setAttribute('playsinline', '');
          if (x.poster) v.poster = x.poster;
          v.src = x.archivo;
          medio.appendChild(v);
        }
        card.appendChild(medio);
        if (x.cita) {
          var q = document.createElement('p'); q.className = 'voz-cita';
          q.textContent = x.cita.es || '';
          ['es', 'fr', 'en'].forEach(function (l) { if (x.cita[l]) q.setAttribute('data-' + l, x.cita[l]); });
          card.appendChild(q);
        }
        var pie = document.createElement('p'); pie.className = 'voz-pie';
        var nom = document.createElement('b'); nom.textContent = x.nombre || '';
        var det = document.createElement('span'); det.textContent = x.detalle || '';
        pie.appendChild(nom); pie.appendChild(det);
        card.appendChild(pie);
        rejilla.appendChild(card);
      });
      caja.hidden = false;
      if (typeof setLang === 'function') { try { setLang(document.documentElement.lang || 'es'); } catch (e) {} }
    });
})();
