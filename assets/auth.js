/* ═══════════════════════════════════════════════════════════
   AUTENTICACIÓN — Firebase, con modo demostración
   ═══════════════════════════════════════════════════════════
   Expone window.Auth con una interfaz única, de modo que las
   páginas del portal no tengan que saber si hay Firebase detrás
   o si están corriendo en demostración.

     Auth.hayFirebase()                    -> bool
     Auth.iniciar()                        -> promesa, arranca la sesión
     Auth.alCambiar(fn)                    -> fn(usuario|null)
     Auth.conGoogle()                      -> promesa
     Auth.crearCuenta(correo, clave, nombre)
     Auth.entrar(correo, clave)
     Auth.recuperar(correo)
     Auth.salir()
     Auth.usuario()                        -> usuario|null
     Auth.esAdmin(usuario)                 -> bool

   Los errores llegan traducidos al español mediante Auth.mensaje().
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var cfg = window.FIREBASE_CONFIG || {};
  var activo = !!(cfg.apiKey && cfg.projectId);
  var app = null, auth = null, db = null;
  var oyentes = [];
  var actual = null;
  var CLAVE_DEMO = 'vf_usuario_demo';

  var ERRORES = {
    'auth/invalid-email':            'Ese correo no parece válido.',
    'auth/user-disabled':            'Esta cuenta está desactivada. Escríbeme para reactivarla.',
    'auth/user-not-found':           'No encuentro ninguna cuenta con ese correo.',
    'auth/wrong-password':           'La contraseña no es correcta.',
    'auth/invalid-credential':       'El correo o la contraseña no coinciden.',
    'auth/email-already-in-use':     'Ya existe una cuenta con ese correo. Prueba a iniciar sesión.',
    'auth/weak-password':            'La contraseña necesita al menos 6 caracteres.',
    'auth/popup-closed-by-user':     'Cerraste la ventana de Google antes de terminar.',
    'auth/popup-blocked':            'El navegador bloqueó la ventana de Google. Permítela e inténtalo otra vez.',
    'auth/cancelled-popup-request':  'Se canceló el intento anterior.',
    'auth/network-request-failed':   'No hay conexión con el servidor. Revisa tu internet.',
    'auth/too-many-requests':        'Demasiados intentos seguidos. Espera un momento.',
    'auth/unauthorized-domain':      'Este dominio no está autorizado en Firebase todavía.',
    'auth/operation-not-allowed':    'Ese método de acceso no está habilitado en Firebase.'
  };

  function mensaje(e) {
    if (!e) return 'Algo salió mal. Inténtalo de nuevo.';
    return ERRORES[e.code] || e.message || 'Algo salió mal. Inténtalo de nuevo.';
  }

  function avisar(u) {
    actual = u;
    oyentes.forEach(function (fn) {
      try { fn(u); } catch (err) { console.error(err); }
    });
  }

  /* ── Modo demostración ─────────────────────────────────
     Guarda una sesión simulada en el navegador para poder
     recorrer el portal completo antes de conectar Firebase. */
  var demo = {
    leer: function () {
      try { return JSON.parse(localStorage.getItem(CLAVE_DEMO) || 'null'); }
      catch (e) { return null; }
    },
    guardar: function (u) {
      localStorage.setItem(CLAVE_DEMO, JSON.stringify(u));
      avisar(u);
      return Promise.resolve(u);
    },
    entrar: function (correo, nombre) {
      if (!correo) return Promise.reject(new Error('Falta el correo'));
      return demo.guardar({
        uid: 'demo-' + correo.replace(/[^a-z0-9]/gi, ''),
        email: correo,
        displayName: nombre || correo.split('@')[0],
        photoURL: '',
        demo: true
      });
    }
  };

  function cargarSDK() {
    /* Los módulos de Firebase se piden solo si hay configuración,
       para que la página no arrastre descargas inútiles en demo. */
    return Promise.all([
      import('https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js'),
      import('https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js'),
      import('https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js')
    ]);
  }

  var listo = null;
  var api = {};

  api.hayFirebase = function () { return activo; };

  api.iniciar = function () {
    if (listo) return listo;

    if (!activo) {
      listo = Promise.resolve().then(function () {
        setTimeout(function () { avisar(demo.leer()); }, 0);
      });
      return listo;
    }

    listo = cargarSDK().then(function (mods) {
      var fbApp = mods[0], fbAuth = mods[1], fbStore = mods[2];
      app = fbApp.initializeApp(cfg);
      auth = fbAuth.getAuth(app);
      db = fbStore.getFirestore(app);
      api._m = { auth: fbAuth, store: fbStore };
      fbAuth.onAuthStateChanged(auth, avisar);
    }).catch(function (e) {
      /* Si Firebase no carga (sin red, configuración incompleta), el
         portal no debe quedarse en blanco: cae a demostración. */
      console.warn('Firebase no disponible, se usa modo demostración:', e);
      activo = false;
      setTimeout(function () { avisar(demo.leer()); }, 0);
    });
    return listo;
  };

  api.alCambiar = function (fn) {
    oyentes.push(fn);
    if (actual) fn(actual);
    return function () { oyentes = oyentes.filter(function (f) { return f !== fn; }); };
  };

  api.usuario = function () { return actual; };

  api.esAdmin = function (u) {
    var lista = (window.ADMINS || []).map(function (c) { return c.toLowerCase(); });
    return !!(u && u.email && lista.indexOf(u.email.toLowerCase()) !== -1);
  };

  api.conGoogle = function () {
    if (!activo) return demo.entrar('estudiante@ejemplo.com', 'Estudiante de prueba');
    var m = api._m.auth;
    var prov = new m.GoogleAuthProvider();
    prov.setCustomParameters({ prompt: 'select_account' });
    return m.signInWithPopup(auth, prov).then(function (r) { return r.user; });
  };

  api.crearCuenta = function (correo, clave, nombre) {
    if (!activo) return demo.entrar(correo, nombre);
    var m = api._m.auth;
    return m.createUserWithEmailAndPassword(auth, correo, clave).then(function (r) {
      return nombre
        ? m.updateProfile(r.user, { displayName: nombre }).then(function () { return r.user; })
        : r.user;
    });
  };

  api.entrar = function (correo, clave) {
    if (!activo) return demo.entrar(correo);
    return api._m.auth.signInWithEmailAndPassword(auth, correo, clave)
      .then(function (r) { return r.user; });
  };

  api.recuperar = function (correo) {
    if (!activo) return Promise.resolve();
    return api._m.auth.sendPasswordResetEmail(auth, correo);
  };

  api.salir = function () {
    if (!activo) {
      localStorage.removeItem(CLAVE_DEMO);
      avisar(null);
      return Promise.resolve();
    }
    return api._m.auth.signOut(auth);
  };

  api.mensaje = mensaje;
  api.db = function () { return db; };

  window.Auth = api;
})();
