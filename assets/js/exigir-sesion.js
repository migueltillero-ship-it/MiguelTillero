/* ===========================================================================
   EXIGIR SESIÓN · las páginas de actividades no se pueden usar sin entrar
   ---------------------------------------------------------------------------
   Hasta ahora, abrir los deberes o un espacio de ejercicios con el enlace "a
   secas" dejaba hacerlo todo sin cuenta: nada pedía iniciar sesión, y lo
   resuelto no llegaba al profesor (una estudiante creyó estar inscrita solo
   por haber abierto el enlace). Este archivo pone una cortina que no se puede
   cerrar mientras no haya sesión, y devuelve a la persona a la misma página
   en cuanto entra.

   Se carga después de supabase-config.js. Si la plataforma no está configurada
   o la librería no cargó, no hace nada: no se bloquea a nadie por un fallo
   nuestro (el aviso propio de cada página sigue ahí).
   =========================================================================== */
(function () {
  'use strict';
  var sb = typeof supabaseClient !== 'undefined' ? supabaseClient : null;
  if (!sb || !sb.auth) return;

  var pagina = (location.pathname.match(/\/(estudiantes\/[A-Za-z0-9_-]+\.html)$/) || [])[1] || '';

  async function haySesion() {
    for (var i = 0; i < 3; i++) {
      try {
        var r = await sb.auth.getSession();
        if (r && r.data && r.data.session) return true;
      } catch (e) { /* se reintenta: la sesión guardada puede tardar en restaurarse */ }
      await new Promise(function (ok) { setTimeout(ok, 350); });
    }
    return false;
  }

  function cortina() {
    var vieneDelLogin = false;
    try { vieneDelLogin = sessionStorage.getItem('mt_viene_del_login') === '1'; } catch (e) {}
    try { if (pagina) sessionStorage.setItem('mt_volver', pagina); } catch (e) {}
    var d = document.createElement('div');
    d.id = 'mt-cortina-sesion';
    d.setAttribute('role', 'dialog'); d.setAttribute('aria-modal', 'true');
    d.style.cssText = 'position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;padding:24px;'
      + 'background:radial-gradient(circle at 80% 10%,#1f6b55 0%,#12332b 65%);color:#f3eee2;font-family:Syne,Arial,sans-serif;text-align:center';
    d.innerHTML = '<div style="max-width:520px">'
      + '<div style="font-family:\'Cormorant Garamond\',Georgia,serif;font-size:clamp(34px,7vw,52px);line-height:1.05;margin-bottom:14px">'
      + 'Entra a <em style="color:#d9bd86">tu cuenta</em></div>'
      + '<p style="font-size:17px;line-height:1.55;color:#cfe0d8;margin-bottom:6px">Para hacer tus actividades y que tu profesor vea tu trabajo, primero tienes que <b style="color:#fff">iniciar sesión</b>. Abrir el enlace no basta.</p>'
      + '<p style="font-size:15px;line-height:1.5;color:#9fbdb0;margin-bottom:22px;font-style:italic">Pour faire tes activités, connecte-toi d’abord à ton compte.</p>'
      + (vieneDelLogin
        ? '<p style="font-size:15px;color:#e8b23a;margin-bottom:18px">Acabas de entrar pero este navegador no conserva la sesión. Cierra otras pestañas de este sitio, o prueba en otro navegador, y recarga esta página.</p>'
        : '')
      + '<a href="../login.html" style="display:inline-block;background:#d9bd86;color:#12332b;font-weight:700;text-decoration:none;border-radius:999px;padding:14px 30px;font-size:16px;letter-spacing:.03em">Iniciar sesión</a>'
      + '<p style="margin-top:18px;font-size:14px"><a href="../restablecer.html" style="color:#d9bd86">¿Olvidaste tu contraseña?</a></p>'
      + '</div>';
    document.documentElement.style.overflow = 'hidden';
    document.body.appendChild(d);
  }

  function arrancar() {
    haySesion().then(function (ok) {
      if (ok) { try { sessionStorage.removeItem('mt_viene_del_login'); } catch (e) {} return; }
      cortina();
    });
  }
  if (document.body) arrancar(); else document.addEventListener('DOMContentLoaded', arrancar);
})();
