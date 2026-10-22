/* Sustituto de la librería de Supabase para la auditoría.
 *
 * auditoria-movil.js intercepta la descarga del paquete del CDN y sirve este
 * archivo en su lugar. Así las páginas se cargan y se miden sin tocar la base
 * de datos real, sin cuenta y sin red.
 *
 * Responde a todo lo que el sitio llama, siempre sin datos y sin error: la
 * medida se toma sobre la página tal y como la ve alguien que no ha entrado.
 */
(function () {
  'use strict';

  var SIN_FILAS = { data: [], error: null, count: 0, status: 200, statusText: 'OK' };
  var SIN_FILA  = { data: null, error: null, count: 0, status: 200, statusText: 'OK' };

  /* Constructor de consultas. Cualquier método (select, eq, order, insert,
     upsert, in, limit, delete…) devuelve otra consulta, así que las cadenas
     del sitio funcionan sin enumerarlas una por una; y como la consulta es
     "thenable", se puede esperar con await en cualquier punto de la cadena. */
  function consulta(resultado) {
    return new Proxy(function () {}, {
      get: function (_destino, prop) {
        if (typeof prop === 'symbol') return undefined;
        if (prop === 'then') {
          return function (ok, mal) { return Promise.resolve(resultado).then(ok, mal); };
        }
        if (prop === 'catch')   return function (f) { return Promise.resolve(resultado).catch(f); };
        if (prop === 'finally') return function (f) { return Promise.resolve(resultado).finally(f); };
        /* single() y maybeSingle() devuelven una fila, no una lista. */
        if (prop === 'single' || prop === 'maybeSingle') {
          return function () { return consulta(SIN_FILA); };
        }
        return function () { return consulta(resultado); };
      },
      apply: function () { return consulta(resultado); }
    });
  }

  var autenticacion = {
    storageKey: 'sb-auditoria-auth-token',
    getSession:             function () { return Promise.resolve({ data: { session: null }, error: null }); },
    getUser:                function () { return Promise.resolve({ data: { user: null }, error: null }); },
    setSession:             function () { return Promise.resolve({ data: { session: null }, error: null }); },
    signInWithPassword:     function () { return Promise.resolve({ data: { session: null, user: null }, error: null }); },
    signUp:                 function () { return Promise.resolve({ data: { session: null, user: null }, error: null }); },
    signOut:                function () { return Promise.resolve({ error: null }); },
    updateUser:             function () { return Promise.resolve({ data: { user: null }, error: null }); },
    resetPasswordForEmail:  function () { return Promise.resolve({ data: {}, error: null }); },
    onAuthStateChange:      function () { return { data: { subscription: { unsubscribe: function () {} } } }; }
  };

  var almacenamiento = {
    from: function () {
      return {
        upload:          function () { return Promise.resolve({ data: null, error: null }); },
        remove:          function () { return Promise.resolve({ data: [], error: null }); },
        createSignedUrl: function () { return Promise.resolve({ data: null, error: null }); },
        getPublicUrl:    function () { return { data: { publicUrl: '' } }; }
      };
    }
  };

  window.supabase = {
    createClient: function () {
      return {
        auth: autenticacion,
        storage: almacenamiento,
        from: function () { return consulta(SIN_FILAS); },
        rpc:  function () { return consulta(SIN_FILAS); },
        removeChannel: function () { return Promise.resolve('ok'); },
        channel: function () {
          var canal = { on: function () { return canal; }, subscribe: function () { return canal; },
                        unsubscribe: function () { return Promise.resolve('ok'); } };
          return canal;
        }
      };
    }
  };
})();
