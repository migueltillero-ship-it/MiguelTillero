/**
 * Configuración del cliente de Supabase.
 *
 * PASOS PARA ACTIVAR LA PLATAFORMA:
 * 1. Crea un proyecto gratuito en https://supabase.com
 * 2. Ve a Project Settings → API Keys y copia "Project URL" y la "Publishable key"
 *    (NUNCA la "Secret key" — esa es privada y solo se usa en un servidor).
 * 3. Pégalos abajo, reemplazando los placeholders.
 * 4. Ve a SQL Editor y ejecuta el contenido de /supabase/schema.sql
 *
 * Este archivo debe cargarse DESPUÉS del script del CDN de supabase-js, p. ej.:
 *   <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js"></script>
 *   <script src="assets/js/supabase-config.js"></script>
 */
const SUPABASE_URL = 'https://yfrdlzveleevkjqekdoq.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_KrCwsrcn0Y6tQ6oqYNBObg_droR0ta3';

const credencialesPuestas = !SUPABASE_URL.includes('TU-PROYECTO') && !SUPABASE_ANON_KEY.includes('TU-ANON-PUBLIC-KEY');

let supabaseClient = null;
if (credencialesPuestas && window.supabase) {
  /* En algunas ventanas (p. ej. InPrivate de Edge) el cliente no siempre adjunta
     el token de la sesión a las consultas y la base de datos nos trata como
     visitante anónimo: el panel recibe cero filas y devuelve al login. Este
     fetch añade el token guardado (si sigue vigente) cuando la petición a la
     base de datos saliera solo con la clave pública. */
  function tokenVigenteGuardado() {
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (!/^sb-.+-auth-token$/.test(k)) continue;
        var v = JSON.parse(localStorage.getItem(k) || 'null');
        var t = v && (v.access_token || (v.currentSession && v.currentSession.access_token));
        if (!t) continue;
        var exp = JSON.parse(atob(t.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))).exp;
        if (exp && exp * 1000 > Date.now() + 15000) return t;
      }
    } catch (e) { /* sin almacenamiento: seguimos con el comportamiento normal */ }
    return null;
  }
  function fetchConToken(input, init) {
    try {
      var url = typeof input === 'string' ? input : (input && input.url) || '';
      if (url.indexOf('/rest/v1/') !== -1) {
        init = init || {};
        var h = new Headers(init.headers || (typeof input !== 'string' && input.headers) || {});
        var auth = h.get('Authorization');
        if (!auth || auth === 'Bearer ' + SUPABASE_ANON_KEY) {
          var t = tokenVigenteGuardado();
          if (t) { h.set('Authorization', 'Bearer ' + t); init.headers = h; }
        }
      }
    } catch (e) { /* ante cualquier duda, la petición sale como estaba */ }
    return fetch(input, init);
  }
  /* Almacenamiento a prueba de fallos.
     Guardar la sesión son unos 3 KB. Si localStorage está lleno, o el
     navegador lo restringe, esa escritura falla EN SILENCIO: supabase-js no
     avisa, y como getSession() lee del almacenamiento, la sesión desaparece
     nada más crearse y el panel devuelve al login sin explicación.
     Aquí se comprueba con una escritura real del tamaño que hace falta, y
     si no cabe se pasa a sessionStorage (que sobrevive a moverse entre
     páginas de la misma pestaña) y, en último caso, a memoria. */
  function sirveParaGuardar(almacen) {
    try {
      var k = '__mt_prueba__', v = new Array(4097).join('x');   // 4 KB
      almacen.setItem(k, v);
      var vale = almacen.getItem(k) === v;
      almacen.removeItem(k);
      return vale;
    } catch (e) { return false; }
  }

  function almacenamientoResistente() {
    var elegido = null, cual = 'memoria';
    try { if (window.localStorage && sirveParaGuardar(window.localStorage)) { elegido = window.localStorage; cual = 'localStorage'; } } catch (e) {}
    if (!elegido) {
      try { if (window.sessionStorage && sirveParaGuardar(window.sessionStorage)) { elegido = window.sessionStorage; cual = 'sessionStorage'; } } catch (e) {}
    }
    var memoria = {};
    window.__mtAlmacenSesion = cual;   // visible para la página de diagnóstico
    return {
      getItem: function (k) {
        try { if (elegido) { var v = elegido.getItem(k); if (v !== null) return v; } } catch (e) {}
        return Object.prototype.hasOwnProperty.call(memoria, k) ? memoria[k] : null;
      },
      setItem: function (k, v) {
        /* Se verifica que lo escrito se pueda releer. Si no, se guarda en
           memoria para que al menos la página actual funcione. */
        try { if (elegido) { elegido.setItem(k, v); if (elegido.getItem(k) === v) { delete memoria[k]; return; } } } catch (e) {}
        memoria[k] = v;
      },
      removeItem: function (k) {
        try { if (elegido) elegido.removeItem(k); } catch (e) {}
        delete memoria[k];
      }
    };
  }

  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      storage: almacenamientoResistente(),
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    },
    global: { fetch: fetchConToken }
  });
}

/* La plataforma solo es utilizable si además de las credenciales llegó la
   librería del CDN. Si la descarga falla (conexión caída, bloqueador de
   anuncios), las páginas deben mostrar su aviso en vez de llamar a un
   cliente que no existe y quedarse muertas. */
const supabaseConfigurado = supabaseClient !== null;
