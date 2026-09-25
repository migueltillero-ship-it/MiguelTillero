/**
 * Funciones compartidas de autenticación / perfil para la plataforma
 * docente-estudiantil. Requiere que supabase-config.js ya se haya cargado
 * (variables supabaseClient y supabaseConfigurado disponibles).
 */

function mostrarAvisoSinConfigurar(elId) {
  const el = document.getElementById(elId);
  if (!el) return;
  el.style.display = 'block';
  /* Dos causas muy distintas: o faltan las credenciales, que es cosa de
     Miguel, o no llegó la librería, que es cosa del visitante. */
  el.textContent = window.supabase
    ? 'La plataforma aún no está conectada a la base de datos. Miguel: pega la URL y la anon key de tu proyecto Supabase en assets/js/supabase-config.js para activarla.'
    : 'No pudimos cargar la plataforma. Revisa tu conexión y vuelve a intentarlo. Si usas un bloqueador de anuncios, desactívalo en esta página.';
}

/**
 * Lee la sesión y el perfil actuales. Usa getSession() (lectura local,
 * espera a que el cliente termine de restaurar la sesión guardada) en
 * vez de getUser() (siempre hace una llamada de red y puede devolver
 * "sin usuario" si se llama justo al cargar la página, antes de que la
 * sesión termine de restaurarse desde el almacenamiento del navegador).
 * Reintenta una vez más si la primera lectura no encuentra sesión, por
 * si el cliente todavía estaba inicializándose.
 */
/**
 * Cuando el cliente no encuentra sesión pero en el navegador sí quedó un
 * token, lo normal no es que haya un fallo: es que ese token está rancio
 * (caducó y su refresh token ya no sirve, o es de otro proyecto de
 * Supabase). Mientras siga ahí, cada visita al panel vuelve a rebotar y el
 * usuario se queda encerrado sin entender por qué.
 *
 * Esta función lo limpia para que el siguiente intento parta de cero, y
 * devuelve en pocas palabras qué se encontró.
 */
function limpiarSesionRancia() {
  var refProyecto = '';
  try {
    refProyecto = (SUPABASE_URL || '').replace(/^https?:\/\//, '').split('.')[0];
  } catch (e) { /* sin config: se limpia igual lo que parezca de Supabase */ }

  var hallados = 0, borradosOtroProyecto = 0, borradosCaducados = 0, conservados = 0;
  var bloqueado = false;

  /* Hay que mirar los DOS almacenes: el cliente usa localStorage cuando
     puede, y sessionStorage cuando aquel no admite los 3 KB de una sesión.
     Mirar solo uno daba un diagnóstico falso. */
  [['localStorage', window.localStorage], ['sessionStorage', window.sessionStorage]].forEach(function (par) {
    var almacen = par[1];
    var aBorrar = [];
    try {
      for (var i = 0; i < almacen.length; i++) {
        var k = almacen.key(i);
        if (!/^sb-.+-auth-token$/.test(k)) continue;
        hallados++;

        // De otro proyecto de Supabase: no nos sirve, fuera.
        if (refProyecto && k.indexOf('sb-' + refProyecto + '-') !== 0) {
          aBorrar.push(k); borradosOtroProyecto++; continue;
        }

        // De este proyecto: solo se retira si está demostrablemente caducado
        // o ilegible. Un token que todavía vale NO se toca: si el cliente no
        // lo leyó puede ser un problema de tiempos, y borrarlo convertiría un
        // fallo pasajero en quedarse fuera para siempre.
        var caducado = null;
        try {
          var v = JSON.parse(almacen.getItem(k) || 'null');
          var t = v && (v.access_token || (v.currentSession && v.currentSession.access_token));
          if (!t) { caducado = true; }
          else {
            var exp = JSON.parse(atob(t.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))).exp;
            caducado = !exp || exp * 1000 <= Date.now();
          }
        } catch (e) { caducado = true; }

        if (caducado) { aBorrar.push(k); borradosCaducados++; }
        else { conservados++; }
      }
      aBorrar.forEach(function (k) { almacen.removeItem(k); });
    } catch (e) { bloqueado = true; }
  });

  if (bloqueado && !hallados) return 'el navegador bloquea el almacenamiento';
  if (!hallados) return 'sin token guardado';
  if (conservados) return 'el token guardado sigue vigente pero el cliente no lo usó (no se borró)';
  if (borradosCaducados) return 'la sesión guardada había caducado; se limpió';
  if (borradosOtroProyecto) return 'había un token de otro proyecto de Supabase; se limpió';
  return 'la sesión guardada ya no era válida; se limpió';
}

async function obtenerPerfilActual() {
  if (!supabaseClient) { window.__ultimoDiagPerfil = 'no hay supabaseClient'; return null; }
  try {
    let user = null;
    for (let intento = 0; intento < 4 && !user; intento++) {
      if (intento > 0) await new Promise(r => setTimeout(r, 500));
      // Alternamos entre getSession() (lectura local) y getUser() (llamada
      // de red) porque en algunos navegadores/ventanas de incógnito el
      // mecanismo de Supabase que coordina la sesión entre pestañas puede
      // fallar en leer con uno de los dos métodos pero no con el otro.
      const metodo = intento % 2 === 0 ? 'getSession' : 'getUser';
      if (metodo === 'getSession') {
        const { data, error } = await supabaseClient.auth.getSession();
        if (error) window.__ultimoDiagPerfil = 'error getSession: ' + error.message;
        user = data && data.session && data.session.user;
      } else {
        const { data, error } = await supabaseClient.auth.getUser();
        if (error) window.__ultimoDiagPerfil = 'error getUser: ' + error.message;
        user = data && data.user;
      }
    }
    if (!user) {
      window.__ultimoDiagPerfil = 'sin sesión · ' + limpiarSesionRancia();
      return null;
    }
    const { data: perfil, error } = await supabaseClient
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    if (error) {
      window.__ultimoDiagPerfil = `error leyendo profiles (código ${error.code || '?'}): ${error.message}`;
      return null;
    }
    return { user, perfil };
  } catch (e) {
    window.__ultimoDiagPerfil = 'excepción: ' + (e && e.message ? e.message : String(e));
    return null;
  }
}

/**
 * Protege una página: si no hay sesión, redirige a login.
 * Si se especifica rolRequerido y el perfil no coincide, redirige al panel correcto.
 */
/**
 * Cuando no se puede confirmar la sesión pero SÍ había algo guardado, se
 * muestra aquí mismo qué ocurrió en vez de rebotar al login. Rebotar
 * escondía el problema: el login volvía a mandar al panel y el usuario
 * daba vueltas sin ver nunca una explicación.
 */
function mostrarSesionNoConfirmada(detalle) {
  var caja = document.createElement('div');
  caja.id = 'sesion-no-confirmada';
  caja.style.cssText = 'max-width:640px; margin:3rem auto; padding:1.8rem 2rem;'
    + 'background:#fff; border:1px solid rgba(165,130,74,0.35); border-radius:16px;'
    + 'font-family:Syne,sans-serif; color:#1a2e24; line-height:1.7;'
    + 'box-shadow:0 4px 20px rgba(20,45,32,0.07);';
  caja.innerHTML =
      '<h2 style="font-family:\'Cormorant Garamond\',serif; font-size:1.6rem; color:#2b4535; margin:0 0 0.8rem;">'
    + 'No pudimos confirmar tu sesión</h2>'
    + '<p style="margin:0 0 1rem; font-size:0.95rem;">Tu cuenta está bien; lo que falla es que este navegador '
    + 'no conserva la sesión entre páginas. Prueba a reintentar; si se repite, cierra las demás pestañas '
    + 'de este sitio, o borra los datos del sitio en tu navegador.</p>'
    + '<p style="margin:0 0 1.4rem; font-family:\'Space Mono\',monospace; font-size:0.72rem; color:#8c734b; word-break:break-word;">'
    + 'Detalle para Miguel: ' + String(detalle).replace(/[<>&]/g, '')
    + ' · almacén: ' + (window.__mtAlmacenSesion || '?') + '</p>'
    + '<button id="btn-reintentar-sesion" style="background:#8c734b; color:#fff; border:none; padding:0.8rem 1.6rem;'
    + 'border-radius:999px; font-family:Syne,sans-serif; font-weight:600; cursor:pointer; margin-right:0.6rem;">'
    + 'Reintentar</button>'
    + '<a href="login.html" style="color:#8c734b; font-size:0.85rem;">Ir a iniciar sesión</a>';

  var main = document.querySelector('main') || document.body;
  main.innerHTML = '';
  main.appendChild(caja);
  var btn = document.getElementById('btn-reintentar-sesion');
  if (btn) btn.addEventListener('click', function () { window.location.reload(); });
}

async function requerirSesion(rolRequerido) {
  if (!supabaseConfigurado) return null;
  const contexto = await obtenerPerfilActual();
  if (!contexto) {
    var detalle = window.__ultimoDiagPerfil || 'sin detalle';
    var origen = (window.location.pathname.split('/').pop() || 'desconocida');

    /* Si la sesión sencillamente terminó —no había nada guardado, o lo que
       había estaba caducado y se ha retirado—, lo correcto es ir al login.
       El caso que NO debe rebotar es el desconcertante: hay un token válido
       y aun así el cliente no lo usa. Ahí el ir y venir entre panel y login
       impide ver nada, así que la página se queda y lo explica. */
    var sesionTerminada = detalle.indexOf('sin token guardado') !== -1
                       || detalle.indexOf('se limpió') !== -1;
    if (sesionTerminada) {
      try { sessionStorage.setItem('mt_diag', detalle + ' · desde ' + origen); } catch (e) {}
      window.location.href = 'login.html';
      return null;
    }

    mostrarSesionNoConfirmada(detalle);
    return null;
  }
  const rol = contexto.perfil.role;
  // 'admin' cumple también los requisitos de 'docente': en esta plataforma,
  // por ahora, la coordinación general es la misma persona que da clases.
  const cumpleRol = !rolRequerido || rol === rolRequerido || (rolRequerido === 'docente' && rol === 'admin');
  if (!cumpleRol) {
    window.location.href = (rol === 'docente' || rol === 'admin') ? 'panel-docente.html' : 'panel-estudiante.html';
    return null;
  }
  return contexto;
}

async function cerrarSesion() {
  if (supabaseClient) await supabaseClient.auth.signOut();
  window.location.href = 'login.html';
}
