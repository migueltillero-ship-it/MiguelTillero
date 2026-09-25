/**
 * Relato de trayectoria: capítulos con cita, texto y pruebas (foto/vídeo)
 * que aparecen al bajar. Lee assets/data/relato.json — para sumar una foto
 * basta dejar el archivo y agregarlo a "medios" de su capítulo. Un capítulo
 * sin ningún archivo disponible no se muestra (nunca hay marcos vacíos).
 */
(function () {
  var DATOS = 'assets/data/relato.json';

  function idioma() {
    try { return localStorage.getItem('preferenciaIdioma_MT') || 'es'; } catch (e) { return 'es'; }
  }
  function el(tag, clase, txt) {
    var n = document.createElement(tag);
    if (clase) n.className = clase;
    if (txt) n.textContent = txt;
    return n;
  }
  /* Textos en tres idiomas: mismo patrón data-es/fr/en que el resto del sitio,
     así setLang() los cambia solo al pulsar ES/FR/EN. */
  function tri(n, obj) {
    n.textContent = obj[idioma()] || obj.es;
    ['es', 'fr', 'en'].forEach(function (l) { if (obj[l]) n.setAttribute('data-' + l, obj[l]); });
    return n;
  }
  function existe(url) {
    return fetch(url, { method: 'HEAD' }).then(function (r) { return r.ok; }).catch(function () { return true; });
  }

  function foto(m, i) {
    var f = el('figure', 'rel-foto'); f.style.setProperty('--i', i);
    var img = el('img'); img.loading = 'lazy'; img.alt = m.alt || ''; img.src = m.archivo;
    f.appendChild(img);
    f.appendChild(tri(el('figcaption'), m.pie));
    f.addEventListener('click', function () {
      if (window.openLBdrive) window.openLBdrive(m.archivo, m.alt); else window.open(m.archivo, '_blank', 'noopener');
    });
    return f;
  }

  function video(m, i) {
    var f = el('figure', 'rel-foto es-video'); f.style.setProperty('--i', i);
    var v = el('video'); v.preload = 'none'; v.playsInline = true; v.setAttribute('playsinline', '');
    if (m.poster) v.poster = m.poster;
    f.appendChild(v);
    var b = el('button', 'rel-play'); b.type = 'button'; b.setAttribute('aria-label', m.alt || 'Reproducir');
    var icono = el('span'); icono.appendChild(el('i', 'fa fa-play')); b.appendChild(icono);
    b.addEventListener('click', function () {
      if (!v.src) v.src = m.archivo;
      v.controls = true;
      v.play().then(function () { b.classList.add('oculto'); }).catch(function () {});
    });
    v.addEventListener('pause', function () { b.classList.remove('oculto'); });
    v.addEventListener('ended', function () { b.classList.remove('oculto'); });
    f.appendChild(b);
    f.appendChild(tri(el('figcaption'), m.pie));
    return f;
  }

  function capitulo(c, medios) {
    var art = el('article', 'rel-cap'); art.id = 'rel-' + c.id;
    var txt = el('div', 'rel-txt');
    var meta = el('p', 'rel-meta'); meta.appendChild(el('b', null, c.anio));
    meta.appendChild(document.createTextNode(' · ' + c.lugar));
    txt.appendChild(meta);
    txt.appendChild(tri(el('h3', 'rel-titulo'), c.titulo));
    txt.appendChild(tri(el('blockquote', 'rel-cita'), c.cita));
    txt.appendChild(tri(el('p', 'rel-texto'), c.texto));
    if (c.cta) {
      var cta = el('div', 'rel-cta');
      c.cta.forEach(function (b, k) {
        var a = el('a', k === 0 ? 'btn btn-gold' : 'rel-btn2'); a.href = b.href;
        a.appendChild(tri(el('span'), b.texto));
        cta.appendChild(a);
      });
      txt.appendChild(cta);
    }
    var galeria = el('div', 'rel-media');
    medios.forEach(function (m, i) { galeria.appendChild(m.tipo === 'video' ? video(m, i) : foto(m, i)); });
    art.appendChild(txt); art.appendChild(galeria);
    return art;
  }

  function construir(raiz, datos, capitulos) {
    var ap = el('header', 'rel-apertura reveal on');
    var eb = el('p', 'eyebrow'); ap.appendChild(tri(eb, datos.apertura.eyebrow));
    ap.appendChild(tri(el('blockquote', 'rel-cita-grande'), datos.apertura.cita));
    ap.appendChild(tri(el('p', 'rel-sub'), datos.apertura.sub));
    raiz.appendChild(ap);

    var cuerpo = el('div', 'rel-cuerpo');
    var hilo = el('div', 'rel-hilo'); hilo.appendChild(el('i')); cuerpo.appendChild(hilo);
    capitulos.forEach(function (x) { cuerpo.appendChild(capitulo(x.c, x.medios)); });
    raiz.appendChild(cuerpo);

    var caps = cuerpo.querySelectorAll('.rel-cap');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); } });
      }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
      caps.forEach(function (c) { io.observe(c); });
    } else { caps.forEach(function (c) { c.classList.add('on'); }); }

    var espera = false;
    function progreso() {
      espera = false;
      var r = cuerpo.getBoundingClientRect(), vh = window.innerHeight;
      var p = (vh * 0.55 - r.top) / r.height;
      cuerpo.style.setProperty('--p', Math.max(0, Math.min(1, p)).toFixed(3));
    }
    window.addEventListener('scroll', function () { if (!espera) { espera = true; requestAnimationFrame(progreso); } }, { passive: true });
    progreso();
  }

  function iniciar(raiz) {
    fetch(raiz.dataset.relato || DATOS).then(function (r) {
      if (!r.ok) throw new Error('sin datos'); return r.json();
    }).then(function (datos) {
      return Promise.all(datos.capitulos.map(function (c) {
        var vivos = c.medios.filter(function (m) { return !m.pendiente; });
        return Promise.all(vivos.map(function (m) { return existe(m.archivo); })).then(function (ok) {
          return { c: c, medios: vivos.filter(function (m, i) { return ok[i]; }) };
        });
      })).then(function (cap) {
        construir(raiz, datos, cap.filter(function (x) { return x.medios.length; }));
      });
    }).catch(function (e) { console.warn('Relato:', e); raiz.style.display = 'none'; });
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-relato]').forEach(iniciar);
  });
})();
