/**
 * Carrusel horizontal de vídeos.
 *
 * Se activa sobre cualquier elemento con [data-carrusel-videos] y lee la
 * lista de vídeos de assets/videos/videos.json (ver LEEME.md en esa
 * carpeta). Los archivos solo se descargan cuando alguien pulsa play.
 */
(function () {
  var MANIFIESTO = 'assets/videos/videos.json';

  function idioma() {
    try { return localStorage.getItem('preferenciaIdioma_MT') || 'es'; }
    catch (e) { return 'es'; }
  }

  function crear(tag, clase, texto) {
    var el = document.createElement(tag);
    if (clase) el.className = clase;
    if (texto) el.textContent = texto;
    return el;
  }

  /* Los títulos y descripciones aceptan sufijos _fr y _en; se usan como
     atributos data-* igual que el resto del sitio. */
  function traducciones(el, video, campo) {
    var base = video[campo];
    if (!base) return;
    el.textContent = base;
    el.setAttribute('data-es', base);
    if (video[campo + '_fr']) el.setAttribute('data-fr', video[campo + '_fr']);
    if (video[campo + '_en']) el.setAttribute('data-en', video[campo + '_en']);
    var actual = video[campo + '_' + idioma()];
    if (actual) el.textContent = actual;
  }

  /* Descartamos los vídeos cuyo archivo no existe para no mostrar tarjetas
     rotas. Si la petición falla por completo (abrir el sitio como file://,
     sin red) damos el archivo por bueno: no sabemos si falta. */
  function existe(url) {
    return fetch(url, { method: 'HEAD' })
      .then(function (r) { return r.ok; })
      .catch(function () { return true; });
  }

  function construirDiapositiva(video, indice, total) {
    var slide = crear('article', 'vc-slide');
    var titulo = video.titulo || 'Vídeo ' + (indice + 1);
    slide.setAttribute('role', 'group');
    slide.setAttribute('aria-roledescription', 'diapositiva');
    slide.setAttribute('aria-label', 'Vídeo ' + (indice + 1) + ' de ' + total + ': ' + titulo);

    var marco = crear('div', 'vc-frame');
    ['tl', 'tr', 'bl', 'br'].forEach(function (pos) {
      marco.appendChild(crear('span', 'vc-corner ' + pos));
    });

    var el = crear('video', 'vc-video');
    el.preload = 'none';
    el.playsInline = true;
    el.setAttribute('playsinline', '');
    el.dataset.src = video.archivo;
    if (video.poster) el.poster = video.poster;
    marco.appendChild(el);

    var boton = crear('button', 'vc-play');
    boton.type = 'button';
    boton.setAttribute('aria-label', 'Reproducir: ' + titulo);
    var circulo = crear('span', 'vc-play-circle');
    circulo.appendChild(crear('i', 'fa fa-play'));
    boton.appendChild(circulo);
    marco.appendChild(boton);

    var meta = crear('div', 'vc-meta');
    meta.appendChild(crear('span', 'vc-num', ('0' + (indice + 1)).slice(-2) + ' / ' + ('0' + total).slice(-2)));
    var h = crear('h3', 'vc-title');
    traducciones(h, video, 'titulo');
    if (!h.textContent) h.textContent = titulo;
    meta.appendChild(h);
    if (video.descripcion) {
      var p = crear('p', 'vc-desc');
      traducciones(p, video, 'descripcion');
      meta.appendChild(p);
    }

    slide.appendChild(marco);
    slide.appendChild(meta);
    return slide;
  }

  function construir(contenedor, videos) {
    var track = crear('div', 'vc-track');
    track.setAttribute('role', 'group');
    track.setAttribute('aria-roledescription', 'carrusel');
    track.setAttribute('aria-label', 'Vídeos de Miguel Tillero');

    videos.forEach(function (video, i) {
      track.appendChild(construirDiapositiva(video, i, videos.length));
    });

    var controles = crear('div', 'vc-controles');
    var anterior = crear('button', 'vc-nav vc-prev');
    anterior.type = 'button';
    anterior.setAttribute('aria-label', 'Vídeo anterior');
    anterior.appendChild(crear('i', 'fa fa-chevron-left'));

    var siguiente = crear('button', 'vc-nav vc-next');
    siguiente.type = 'button';
    siguiente.setAttribute('aria-label', 'Vídeo siguiente');
    siguiente.appendChild(crear('i', 'fa fa-chevron-right'));

    var puntos = crear('div', 'vc-dots');
    videos.forEach(function (video, i) {
      var punto = crear('button', 'vc-dot');
      punto.type = 'button';
      punto.setAttribute('aria-label', 'Ir al vídeo ' + (i + 1));
      punto.addEventListener('click', function () { irA(i); });
      puntos.appendChild(punto);
    });

    controles.appendChild(anterior);
    controles.appendChild(puntos);
    controles.appendChild(siguiente);

    contenedor.classList.add('vc');
    contenedor.appendChild(track);
    contenedor.appendChild(controles);

    var slides = Array.prototype.slice.call(track.querySelectorAll('.vc-slide'));
    var activo = 0;

    function irA(i) {
      var destino = slides[Math.max(0, Math.min(slides.length - 1, i))];
      if (!destino) return;
      track.scrollTo({
        left: destino.offsetLeft - (track.clientWidth - destino.clientWidth) / 2,
        behavior: 'smooth'
      });
    }

    function sincronizar() {
      var centro = track.scrollLeft + track.clientWidth / 2;
      var cercano = 0, minima = Infinity;
      slides.forEach(function (s, i) {
        var d = Math.abs(s.offsetLeft + s.clientWidth / 2 - centro);
        if (d < minima) { minima = d; cercano = i; }
      });
      activo = cercano;
      puntos.querySelectorAll('.vc-dot').forEach(function (p, i) {
        p.setAttribute('aria-current', i === activo ? 'true' : 'false');
      });
      anterior.disabled = activo === 0;
      siguiente.disabled = activo === slides.length - 1;
    }

    anterior.addEventListener('click', function () { irA(activo - 1); });
    siguiente.addEventListener('click', function () { irA(activo + 1); });

    var esperando = false;
    track.addEventListener('scroll', function () {
      if (esperando) return;
      esperando = true;
      requestAnimationFrame(function () { sincronizar(); esperando = false; });
    }, { passive: true });

    /* Con el vídeo enfocado las flechas ya sirven para avanzar la
       reproducción; ahí no movemos el carrusel. */
    contenedor.addEventListener('keydown', function (e) {
      if (e.target.tagName === 'VIDEO') return;
      if (e.key === 'ArrowLeft') { e.preventDefault(); irA(activo - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); irA(activo + 1); }
    });

    slides.forEach(function (slide) {
      var video = slide.querySelector('video');
      var boton = slide.querySelector('.vc-play');
      var marco = slide.querySelector('.vc-frame');

      video.addEventListener('error', function () {
        if (marco.querySelector('.vc-aviso')) return;
        marco.appendChild(crear('div', 'vc-aviso', 'No se pudo cargar este vídeo'));
        boton.classList.add('is-hidden');
      });
      video.addEventListener('pause', function () { boton.classList.remove('is-hidden'); });
      video.addEventListener('ended', function () { boton.classList.remove('is-hidden'); });

      boton.addEventListener('click', function () {
        if (!video.src) video.src = video.dataset.src;
        slides.forEach(function (otro) {
          var v = otro.querySelector('video');
          if (v !== video) v.pause();
        });
        video.controls = true;
        video.play().then(function () {
          video.classList.add('is-playing');
          boton.classList.add('is-hidden');
        }).catch(function (e) {
          console.warn('No se pudo reproducir el vídeo:', e);
        });
      });
    });

    sincronizar();
    window.addEventListener('resize', sincronizar, { passive: true });
  }

  function ocultarSeccion(contenedor) {
    var seccion = contenedor.closest('section') || contenedor;
    seccion.style.display = 'none';
  }

  function iniciar(contenedor) {
    fetch(contenedor.dataset.manifiesto || MANIFIESTO)
      .then(function (r) {
        if (!r.ok) throw new Error('No se pudo leer la lista de vídeos');
        return r.json();
      })
      .then(function (datos) {
        var videos = (datos && datos.videos || []).filter(function (v) { return v && v.archivo; });
        return Promise.all(videos.map(function (v) { return existe(v.archivo); }))
          .then(function (resultados) {
            return videos.filter(function (v, i) { return resultados[i]; });
          });
      })
      .then(function (videos) {
        if (!videos.length) { ocultarSeccion(contenedor); return; }
        construir(contenedor, videos);
      })
      .catch(function (e) {
        console.warn('Carrusel de vídeos:', e);
        ocultarSeccion(contenedor);
      });
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-carrusel-videos]').forEach(iniciar);
  });
})();
