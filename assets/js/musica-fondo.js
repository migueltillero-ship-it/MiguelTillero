/**
 * Música de fondo del sitio.
 *
 * Dos reglas, pedidas por Miguel:
 *
 *  1. Suena UNA SOLA VEZ por visita. Ya no está en bucle, y al cambiar de
 *     página continúa por donde iba en lugar de empezar otra vez desde el
 *     principio. Cuando la canción termina, no vuelve a arrancar sola en
 *     ninguna página de la visita.
 *
 *  2. Si el visitante reproduce un vídeo, la música se corta en el acto y
 *     queda anulada para el resto de la visita: tampoco vuelve al cambiar
 *     de página.
 *
 * El botón del altavoz sigue funcionando siempre. Solo desaparece el
 * arranque automático; si alguien quiere oír la música otra vez, la pide.
 *
 * El estado se guarda en localStorage con la hora de la última anotación.
 * Se usa localStorage y no sessionStorage porque este último es de cada
 * pestaña: quien abriera una página en pestaña nueva volvería a oír la
 * canción desde el principio, que es justo lo que queremos evitar. A cambio,
 * localStorage no caduca solo, así que damos la visita por cerrada tras un
 * par de horas de silencio y quien vuelva otro día la escuchará de nuevo,
 * una vez.
 */
(function () {
  'use strict';

  var CLAVE_ESTADO   = 'mt-musica-estado';
  var CLAVE_POSICION = 'mt-musica-posicion';
  var CLAVE_MOMENTO  = 'mt-musica-momento';
  var VENTANA_VISITA = 2 * 60 * 60 * 1000;   /* 2 horas */
  var VOLUMEN = 0.4;

  /* Vídeos que son parte de la puesta en escena del sitio, no algo que el
     visitante haya pedido ver: la cortinilla entre páginas y el vídeo de
     entrada (que además termina cediéndole el turno a la música). */
  var VIDEOS_DE_LA_CASA = ['intro-video', 'page-transition-video'];

  var audio = document.getElementById('bg-audio');
  var boton = document.getElementById('audio-btn');
  if (!audio) return;

  audio.loop = false;
  audio.removeAttribute('loop');
  audio.volume = VOLUMEN;

  function leer(clave) {
    try { return localStorage.getItem(clave); } catch (e) { return null; }
  }
  function guardar(clave, valor) {
    try {
      localStorage.setItem(clave, valor);
      localStorage.setItem(CLAVE_MOMENTO, String(Date.now()));
    } catch (e) {}
  }

  /* Si hace más de dos horas de la última anotación, esto ya es otra visita:
     la canción vuelve a estar disponible desde el principio. */
  function visitaCaducada() {
    var momento = parseInt(leer(CLAVE_MOMENTO) || '0', 10);
    return !momento || (Date.now() - momento) > VENTANA_VISITA;
  }

  /* pendiente · terminada · anulada */
  var estado;
  if (visitaCaducada()) {
    estado = 'pendiente';
    guardar(CLAVE_POSICION, '0');
    guardar(CLAVE_ESTADO, estado);
  } else {
    estado = leer(CLAVE_ESTADO) || 'pendiente';
  }
  var sonando = false;

  function puedeArrancarSola() { return estado === 'pendiente'; }

  function pintarBoton() {
    if (!boton) return;
    boton.classList.toggle('playing', sonando);
    boton.innerHTML = sonando
      ? '<i class="fa fa-pause"></i>'
      : '<i class="fa fa-music"></i>';
  }

  /* Al cambiar de página retomamos el segundo en el que iba. Si los metadatos
     aún no han llegado, el navegador rechaza la asignación, así que esperamos
     a tenerlos. */
  function recuperarPosicion() {
    var guardada = parseFloat(leer(CLAVE_POSICION) || '0');
    if (!guardada || guardada < 0.5) return;
    var colocar = function () {
      if (audio.duration && guardada < audio.duration - 0.5) {
        try { audio.currentTime = guardada; } catch (e) {}
      }
    };
    if (audio.readyState >= 1) colocar();
    else audio.addEventListener('loadedmetadata', colocar, { once: true });
  }

  function arrancar(esAutomatico) {
    if (esAutomatico && !puedeArrancarSola()) return;
    if (!audio.paused) { sonando = true; pintarBoton(); return; }

    /* Una petición manual después de que la canción terminara empieza otra
       vez desde el principio; es lo que espera quien pulsa el botón. */
    if (!esAutomatico && estado === 'terminada') {
      estado = 'pendiente';
      guardar(CLAVE_ESTADO, estado);
      guardar(CLAVE_POSICION, '0');
      try { audio.currentTime = 0; } catch (e) {}
    } else {
      recuperarPosicion();
    }

    var promesa = audio.play();
    sonando = true;
    pintarBoton();

    if (promesa && promesa.then) {
      promesa.then(function () {
        /* Puede haberse anulado mientras la promesa estaba en el aire: por
           ejemplo, el mismo clic que desbloquea el audio es el que arranca
           un vídeo. Entonces gana el vídeo. */
        if (estado !== 'pendiente') { audio.pause(); sonando = false; pintarBoton(); }
      }).catch(function () {
        sonando = false;
        pintarBoton();
      });
    }
  }

  function detener(nuevoEstado) {
    audio.pause();
    sonando = false;
    if (nuevoEstado) {
      estado = nuevoEstado;
      guardar(CLAVE_ESTADO, estado);
    }
    pintarBoton();
  }

  /* ── Botón ─────────────────────────────────────────────── */
  if (boton) {
    boton.addEventListener('click', function () {
      if (sonando || !audio.paused) detener(null);
      else arrancar(false);
    });
  }

  /* ── Guardar por dónde va ──────────────────────────────── */
  var ultimoGuardado = 0;
  audio.addEventListener('timeupdate', function () {
    var ahora = Date.now();
    if (ahora - ultimoGuardado < 1000) return;
    ultimoGuardado = ahora;
    if (estado === 'pendiente') guardar(CLAVE_POSICION, String(audio.currentTime));
  });

  /* ── Fin de la canción: no vuelve a sonar sola ─────────── */
  audio.addEventListener('ended', function () {
    sonando = false;
    estado = 'terminada';
    guardar(CLAVE_ESTADO, estado);
    guardar(CLAVE_POSICION, '0');
    pintarBoton();
  });

  /* ── Un vídeo manda sobre la música ────────────────────── */
  function esVideoDelVisitante(el) {
    if (!el || (el.tagName !== 'VIDEO' && el.tagName !== 'AUDIO')) return false;
    if (el === audio) return false;
    if (el.hasAttribute && el.hasAttribute('data-musica-sigue')) return false;
    if (VIDEOS_DE_LA_CASA.indexOf(el.id) !== -1) return false;
    /* Los vídeos silenciados son decoración o vista previa: no compiten con
       la música, así que no la cortan. */
    if (el.muted || el.volume === 0) return false;
    return true;
  }

  /* En fase de captura, porque el evento «play» de los medios no burbujea.
     Así también alcanza a los vídeos que se crean después, como los del
     carrusel de la galería. */
  document.addEventListener('play', function (ev) {
    if (esVideoDelVisitante(ev.target)) detener('anulada');
  }, true);

  /* Un vídeo puede empezar silenciado y que el visitante le quite el mute
     después, o subir el volumen desde cero. */
  document.addEventListener('volumechange', function (ev) {
    var el = ev.target;
    if (el === audio || !el || el.paused) return;
    if (esVideoDelVisitante(el)) detener('anulada');
  }, true);

  /* ── Arranque automático ───────────────────────────────── */
  /* Los navegadores bloquean el audio con sonido si no viene de un gesto del
     visitante. Si el intento directo falla, queda armado para el primer
     gesto que haya, sea cual sea. */
  function intentarArranqueAutomatico() {
    if (!puedeArrancarSola() || !audio.paused) return;

    var promesa = audio.play();
    if (!promesa || !promesa.then) { sonando = !audio.paused; pintarBoton(); return; }

    promesa.then(function () {
      if (!puedeArrancarSola()) { audio.pause(); return; }
      sonando = true;
      recuperarPosicion();
      pintarBoton();
    }).catch(function () {
      var eventos = ['click', 'touchstart', 'keydown', 'scroll'];
      var desbloquear = function () {
        eventos.forEach(function (ev) { document.removeEventListener(ev, desbloquear); });
        /* Al final de la cola: si este mismo gesto era el play de un vídeo,
           el vídeo ya habrá anulado la música cuando lleguemos aquí. */
        setTimeout(intentarArranqueAutomatico, 0);
      };
      eventos.forEach(function (ev) {
        document.addEventListener(ev, desbloquear, { once: true, passive: true });
      });
    });
  }

  /* La usa el vídeo de entrada de la portada al terminar: la música toma el
     relevo. Sigue respetando las dos reglas de arriba. */
  window.startBgMusic = function () { arrancar(true); };

  /* Y por si alguna página necesita cortarla a mano. */
  window.detenerMusicaFondo = function () { detener('anulada'); };

  pintarBoton();
  intentarArranqueAutomatico();
})();
