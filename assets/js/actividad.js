/* ===========================================================================
   TIEMPO EN LA PLATAFORMA · el aviso de cada minuto
   ---------------------------------------------------------------------------
   Mientras el estudiante tiene la página a la vista y la está usando (ratón,
   teclado, deslizar, tocar), avisa a la base cada minuto. El servidor suma UN
   minuto por aviso y no admite más de uno cada 50 segundos, así que dejar la
   pestaña abierta sin tocarla no suma nada.

   No necesita configuración: si no hay sesión, o la base no responde, no hace
   nada y no molesta. El docente y los visitantes no cuentan (lo decide el
   servidor, no este archivo).

   Se carga después de supabase-config.js.
   =========================================================================== */
(function () {
  'use strict';
  if (typeof supabaseClient === 'undefined' || !supabaseClient) return;

  const CADA_MS = 60 * 1000;          // un aviso por minuto
  const INACTIVO_MS = 2 * 60 * 1000;  // sin tocar nada en 2 minutos, no cuenta
  let ultimoToque = Date.now();
  let hayCuenta = null;               // se averigua una vez

  ['mousemove', 'keydown', 'scroll', 'touchstart', 'click'].forEach(function (ev) {
    window.addEventListener(ev, function () { ultimoToque = Date.now(); }, { passive: true });
  });

  async function avisar() {
    // Pestaña oculta o sin usar: ese minuto no cuenta.
    if (document.visibilityState !== 'visible') return;
    if (Date.now() - ultimoToque > INACTIVO_MS) return;
    try {
      if (hayCuenta === null) {
        const { data } = await supabaseClient.auth.getSession();
        hayCuenta = !!(data && data.session);
      }
      if (!hayCuenta) return;
      await supabaseClient.rpc('registrar_actividad');
    } catch (e) { /* un fallo de medición nunca debe estorbar el estudio */ }
  }

  setInterval(avisar, CADA_MS);
})();
