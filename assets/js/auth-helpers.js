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

  var deEsteProyecto = 0, deOtroProyecto = 0, caducados = 0;
  var aBorrar = [];

  try {
    for (var i = 0; i < localStorage.length; i++) {
      var k = localStorage.key(i);
      if (!/^sb-.+-auth-token$/.test(k)) continue;
      var esNuestro = refProyecto && k.indexOf('sb-' + refProyecto + '-') === 0;
      if (esNuestro) deEsteProyecto++; else deOtroProyecto++;

      // ¿Caducado? Se mira el "exp" del propio token, sin llamar a la red.
      try {
        var v = JSON.parse(localStorage.getItem(k) || 'null');
        var t = v && (v.access_token || (v.currentSession && v.currentSession.access_token));
        var exp = t && JSON.parse(atob(t.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))).exp;
        if (exp && exp * 1000 <= Date.now()) caducados++;
      } catch (e) { /* ilegible: se trata como rancio igualmente */ }

      aBorrar.push(k);
    }
    aBorrar.forEach(function (k) { localStorage.removeItem(k); });
  } catch (e) {
    return 'el navegador bloquea el almacenamiento local';
  }

  if (!aBorrar.length) return 'sin token guardado';
  if (deOtroProyecto && !deEsteProyecto) return 'había un token de otro proyecto de Supabase; se limpió';
  if (caducados) return 'la sesión guardada había caducado; se limpió';
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
async function requerirSesion(rolRequerido) {
  if (!supabaseConfigurado) return null;
  const contexto = await obtenerPerfilActual();
  if (!contexto) {
    /* Se guarda también de qué página vino el rebote: sin eso, el aviso del
       login no dice si falló el panel docente o el del estudiante. */
    var origen = (window.location.pathname.split('/').pop() || 'desconocida');
    try { sessionStorage.setItem('mt_diag', (window.__ultimoDiagPerfil || 'sin detalle') + ' · desde ' + origen); } catch (e) {}
    window.location.href = 'login.html';
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
