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
async function obtenerPerfilActual(reintentar = true) {
  if (!supabaseClient) return null;
  const { data: { session } } = await supabaseClient.auth.getSession();
  if (!session || !session.user) {
    if (reintentar) {
      await new Promise(r => setTimeout(r, 400));
      return obtenerPerfilActual(false);
    }
    return null;
  }
  const { data: perfil, error } = await supabaseClient
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();
  if (error) return null;
  return { user: session.user, perfil };
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
