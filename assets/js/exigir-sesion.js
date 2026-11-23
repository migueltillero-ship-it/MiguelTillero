/* ===========================================================================
   EXIGIR SESIÓN · las páginas de actividades no se pueden usar sin entrar
   ---------------------------------------------------------------------------
   Hasta ahora, abrir los deberes o un espacio de ejercicios con el enlace "a
   secas" dejaba hacerlo todo sin cuenta: nada pedía iniciar sesión, y lo
   resuelto no llegaba al profesor (una estudiante creyó estar inscrita solo
   por haber abierto el enlace). Este archivo pone una cortina que no se puede
   cerrar mientras no haya sesión.

   La cortina trae su propio formulario de correo y contraseña: se entra ahí
   mismo y la página se recarga. Se hizo así a propósito, en vez de mandar al
   login y volver, porque ese viaje de ida y vuelta falla justo en los
   navegadores que no conservan la sesión (el login devuelve a la página, la
   página no la ve y vuelta a empezar), y dejaba un aviso engañoso.

   Se carga después de supabase-config.js. Si la plataforma no está configurada
   o la librería no cargó, no hace nada: no se bloquea a nadie por un fallo
   nuestro (el aviso propio de cada página sigue ahí).
   =========================================================================== */
(function () {
  'use strict';
  var sb = typeof supabaseClient !== 'undefined' ? supabaseClient : null;
  if (!sb || !sb.auth) return;

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

  var CAMPO = 'width:100%;padding:12px 14px;margin:0 0 12px;border-radius:12px;border:1.5px solid rgba(255,255,255,.28);'
    + 'background:rgba(0,0,0,.25);color:#fff;font:16px Syne,Arial,sans-serif;outline:none;box-sizing:border-box';

  function cortina() {
    var d = document.createElement('div');
    d.id = 'mt-cortina-sesion';
    d.setAttribute('role', 'dialog'); d.setAttribute('aria-modal', 'true');
    d.style.cssText = 'position:fixed;inset:0;z-index:2147483647;overflow:auto;display:flex;align-items:center;justify-content:center;padding:24px;'
      + 'background:radial-gradient(circle at 80% 10%,#1f6b55 0%,#12332b 65%);color:#f3eee2;font-family:Syne,Arial,sans-serif;text-align:center';
    d.innerHTML = '<div style="width:100%;max-width:440px">'
      + '<div style="font-family:\'Cormorant Garamond\',Georgia,serif;font-size:clamp(34px,7vw,50px);line-height:1.05;margin-bottom:12px">'
      + 'Entra a <em style="color:#d9bd86">tu cuenta</em></div>'
      + '<p style="font-size:16px;line-height:1.55;color:#cfe0d8;margin:0 0 4px">Para hacer tus actividades y que tu profesor vea tu trabajo, primero tienes que <b style="color:#fff">iniciar sesión</b>. Abrir el enlace no basta.</p>'
      + '<p style="font-size:14px;line-height:1.5;color:#9fbdb0;margin:0 0 20px;font-style:italic">Pour faire tes activités, connecte-toi d’abord à ton compte.</p>'
      + '<form id="mt-cortina-form" style="text-align:left">'
      + '<input id="mt-c-email" type="email" autocomplete="email" placeholder="Tu correo" required style="' + CAMPO + '">'
      + '<input id="mt-c-pass" type="password" autocomplete="current-password" placeholder="Tu contraseña" required style="' + CAMPO + '">'
      + '<button id="mt-c-btn" type="submit" style="width:100%;background:#d9bd86;color:#12332b;font:700 16px Syne,Arial,sans-serif;border:0;border-radius:999px;padding:14px;cursor:pointer;letter-spacing:.03em">Iniciar sesión</button>'
      + '<p id="mt-c-msg" style="display:none;margin:12px 0 0;font-size:14px;color:#ffb4a8"></p>'
      + '</form>'
      + '<p style="margin:16px 0 0;font-size:14px"><a href="../restablecer.html" style="color:#d9bd86">¿Olvidaste tu contraseña?</a>'
      + ' · <a href="../registro/inscripcion.html" style="color:#d9bd86">Crear mi cuenta</a></p>'
      + '</div>';
    document.documentElement.style.overflow = 'hidden';
    document.body.appendChild(d);

    var form = document.getElementById('mt-cortina-form');
    var btn = document.getElementById('mt-c-btn');
    var msg = document.getElementById('mt-c-msg');
    function aviso(t) { msg.textContent = t; msg.style.display = 'block'; }
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      btn.disabled = true; msg.style.display = 'none';
      try {
        var r = await sb.auth.signInWithPassword({
          email: document.getElementById('mt-c-email').value.trim(),
          password: document.getElementById('mt-c-pass').value
        });
        if (r.error || !r.data || !r.data.session) { aviso('Correo o contraseña incorrectos.'); btn.disabled = false; return; }
      } catch (err) { aviso('No pudimos conectar. Revisa tu conexión e inténtalo de nuevo.'); btn.disabled = false; return; }
      /* La página ya cargó sin sesión (y puede haber pintado su aviso), así que se
         recarga para que arranque con ella. Si este navegador no puede conservar la
         sesión (solo memoria), recargar la perdería: ahí se avisa en vez de dar vueltas. */
      if (window.__mtAlmacenSesion === 'memoria') {
        aviso('Entraste, pero este navegador no guarda la sesión. Prueba con otro navegador o sin modo privado.');
        btn.disabled = false; return;
      }
      location.reload();
    });
    setTimeout(function () { var i = document.getElementById('mt-c-email'); if (i) i.focus(); }, 50);
  }

  function arrancar() {
    haySesion().then(function (ok) { if (!ok) cortina(); });
  }
  if (document.body) arrancar(); else document.addEventListener('DOMContentLoaded', arrancar);
})();
