/**
 * Popup y sección "Próximo evento" del sitio público.
 *
 * Antes este contenido vivía escrito a mano en cada página (título, fecha,
 * descripción). Ahora se lee de la tabla public.eventos, que Miguel edita
 * desde admin.html — así puede anunciar un evento nuevo sin tocar código,
 * y el popup/sección desaparecen solos cuando no hay ningún evento
 * publicado y vigente (fecha >= hoy).
 *
 * Requiere que la página ya haya cargado, en este orden:
 *   supabase-js (CDN) → assets/js/supabase-config.js → este archivo.
 * Si Supabase no está configurado, o si la consulta falla, el popup y la
 * sección se quitan del todo en vez de mostrar contenido a medias.
 */
(function () {
  function capitalizar(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }

  function formatearCuando(fechaISO, horaInicio, horaFin) {
    var d = new Date(fechaISO + 'T12:00:00');
    var dia = capitalizar(d.toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' }));
    if (!horaInicio) return dia;
    var rango = horaInicio.slice(0, 5) + (horaFin ? ' – ' + horaFin.slice(0, 5) : '');
    return dia + ' · ' + rango;
  }

  function quitar(el) { if (el && el.parentNode) el.parentNode.removeChild(el); }

  async function cargarEvento() {
    var popup = document.getElementById('event-popup');
    var seccion = document.getElementById('proximo-evento');
    if (!popup && !seccion) return;

    if (typeof supabaseConfigurado === 'undefined' || !supabaseConfigurado || !supabaseClient) {
      quitar(popup); quitar(seccion);
      return;
    }

    var hoy = new Date().toISOString().slice(0, 10);
    var evento = null;
    try {
      var resp = await supabaseClient
        .from('eventos')
        .select('*')
        .eq('publicado', true)
        .gte('fecha', hoy)
        .order('fecha', { ascending: true })
        .limit(1);
      if (!resp.error && resp.data && resp.data.length) evento = resp.data[0];
    } catch (e) { /* sin conexión: se ocultan ambos abajo */ }

    if (!evento) { quitar(popup); quitar(seccion); return; }

    var cuando = formatearCuando(evento.fecha, evento.hora_inicio, evento.hora_fin);
    var accionTexto = evento.texto_accion || 'Más información';
    var accionUrl = evento.url_accion ||
      ('https://wa.me/584122465331?text=' + encodeURIComponent('Hola Miguel, quiero saber más sobre "' + evento.titulo + '".'));

    if (popup) {
      if (!evento.destacado) {
        quitar(popup);
      } else {
        var storageKey = 'mt-evento-popup-' + evento.id;
        var yaVisto = false;
        try { yaVisto = localStorage.getItem(storageKey) === '1'; } catch (e) {}
        if (yaVisto) {
          quitar(popup);
        } else {
          var elTitulo = document.getElementById('ep-titulo');
          var elFecha = document.getElementById('ep-fecha');
          var elDesc = document.getElementById('ep-descripcion');
          var elBtnAccion = document.getElementById('ep-btn-accion');
          if (elTitulo) elTitulo.textContent = evento.titulo;
          if (elFecha) elFecha.textContent = cuando;
          if (elDesc) elDesc.textContent = evento.descripcion || '';
          if (elBtnAccion) { elBtnAccion.textContent = accionTexto; elBtnAccion.href = accionUrl; }

          setTimeout(function () { popup.classList.add('show'); }, 1400);
          var cerrar = function () {
            popup.classList.remove('show');
            try { localStorage.setItem(storageKey, '1'); } catch (e) {}
            setTimeout(function () { quitar(popup); }, 650);
          };
          var btnCerrar = document.getElementById('event-popup-close');
          if (btnCerrar) btnCerrar.addEventListener('click', cerrar);
          popup.querySelectorAll('.ep-btn').forEach(function (a) {
            a.addEventListener('click', function () { try { localStorage.setItem(storageKey, '1'); } catch (e) {} });
          });
        }
      }
    }

    if (seccion) {
      var d = new Date(evento.fecha + 'T12:00:00');
      var elPeTitulo = document.getElementById('pe-titulo');
      var elPeDia = document.getElementById('pe-dia');
      var elPeMes = document.getElementById('pe-mes');
      var elPeCuando = document.getElementById('pe-cuando');
      var elPeDesc = document.getElementById('pe-descripcion');
      var elPeChip = document.getElementById('pe-chip');
      var elPeBtn = document.getElementById('pe-btn-accion');
      if (elPeTitulo) elPeTitulo.textContent = evento.titulo;
      if (elPeDia) elPeDia.textContent = d.getDate();
      if (elPeMes) elPeMes.textContent = d.toLocaleDateString('es-MX', { month: 'long' }).toUpperCase();
      if (elPeCuando) elPeCuando.textContent = cuando;
      if (elPeDesc) elPeDesc.textContent = evento.descripcion || '';
      if (elPeChip) elPeChip.textContent = evento.entrada_libre ? 'Entrada libre' : ('Costo: ' + evento.costo + ' ' + (evento.moneda || 'MXN'));
      if (elPeBtn) {
        var span = elPeBtn.querySelector('span');
        if (span) span.textContent = accionTexto; else elPeBtn.textContent = accionTexto;
        elPeBtn.href = accionUrl;
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', cargarEvento);
  } else {
    cargarEvento();
  }
})();
