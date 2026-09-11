/**
 * Funciones compartidas de autenticación / perfil para la plataforma
 * docente-estudiantil. Requiere que supabase-config.js ya se haya cargado
 * (variables supabaseClient y supabaseConfigurado disponibles).
 */

function mostrarAvisoSinConfigurar(elId) {
  const el = document.getElementById(elId);
  if (el) {
    el.style.display = 'block';
    el.textContent = 'La plataforma aún no está conectada a la base de datos. Miguel: pega la URL y la anon key de tu proyecto Supabase en assets/js/supabase-config.js para activarla.';
  }
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
      window.__ultimoDiagPerfil = 'sin sesión tras varios intentos (getSession/getUser no devolvieron usuario)';
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
    window.location.href = 'login.html';
    return null;
  }
  if (rolRequerido && contexto.perfil.role !== rolRequerido) {
    window.location.href = contexto.perfil.role === 'docente' ? 'panel-docente.html' : 'panel-estudiante.html';
    return null;
  }
  return contexto;
}

async function cerrarSesion() {
  if (supabaseClient) await supabaseClient.auth.signOut();
  window.location.href = 'login.html';
}
