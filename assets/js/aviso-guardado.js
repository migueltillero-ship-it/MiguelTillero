/* ===========================================================================
   AVISO DE «GUARDADO» QUE SE VE
   ---------------------------------------------------------------------------
   Los mensajes de confirmación salían debajo del botón, y en páginas largas
   (una tabla de notas con sus comentarios) quedaban fuera de la pantalla: se
   pulsaba «Guardar» y parecía que no pasaba nada. Este aviso flota abajo, siempre
   a la vista, dice qué pasó y a qué hora, y los errores no se quitan solos.

   Uso:  mtAviso('Notas guardadas.', 'ok')   ·   mtAviso('No se guardó: …', 'error')
   =========================================================================== */
(function () {
  'use strict';
  var caja = null, tempo = null;
  function crear() {
    caja = document.createElement('div');
    caja.setAttribute('role', 'status');
    caja.setAttribute('aria-live', 'polite');
    caja.style.cssText = 'position:fixed;left:50%;bottom:1.2rem;transform:translate(-50%,140%);z-index:2147483000;'
      + 'max-width:min(92vw,34rem);width:max-content;padding:.9rem 1.2rem;border-radius:14px;'
      + 'font:600 1rem/1.4 Syne,system-ui,sans-serif;box-shadow:0 12px 36px rgba(0,0,0,.3);'
      + 'transition:transform .35s cubic-bezier(.16,1,.3,1);display:flex;gap:.7rem;align-items:flex-start;cursor:pointer';
    caja.addEventListener('click', ocultar);
    document.body.appendChild(caja);
  }
  function ocultar() { if (caja) caja.style.transform = 'translate(-50%,140%)'; clearTimeout(tempo); }
  window.mtAviso = function (texto, tipo) {
    if (!document.body) return;
    if (!caja) crear();
    var ok = tipo !== 'error';
    var hora = new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
    caja.style.background = ok ? '#12291c' : '#a13324';
    caja.style.color = ok ? '#f1dfae' : '#fff';
    caja.textContent = '';
    var icono = document.createElement('span'); icono.textContent = ok ? '✓' : '⚠'; icono.style.cssText = 'font-size:1.3rem;line-height:1.2';
    var t = document.createElement('span'); t.textContent = texto + (ok ? ' · ' + hora : '');
    caja.appendChild(icono); caja.appendChild(t);
    requestAnimationFrame(function () { caja.style.transform = 'translate(-50%,0)'; });
    clearTimeout(tempo);
    // El éxito se retira solo; el error se queda hasta que se pulse: no debe pasar desapercibido.
    if (ok) tempo = setTimeout(ocultar, 6000);
  };
})();
