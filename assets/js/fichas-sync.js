/* ===========================================================================
   FICHAS · copia del avance en la plataforma
   ---------------------------------------------------------------------------
   El motor (fichas-ejercicios.js) guarda el avance en el navegador. Si el
   alumno ha entrado con su cuenta, este archivo copia además cada ejercicio
   resuelto en la tabla fichas_avance, para que el profesor lo vea en
   evaluaciones/seguimiento.html. Sin cuenta, todo sigue funcionando igual:
   solo aparece un aviso para entrar.

   Se carga después de supabase-config.js y del motor.
   =========================================================================== */
(function(){
  'use strict';
  const sb = typeof supabaseClient !== 'undefined' ? supabaseClient : null;
  const CLAVE_ESPACIO = window.MT_FICHAS_CLAVE || 'mt-fichas';
  let usuario = null;

  function fila(ficha, ej, bien, total, texto){
    return { estudiante_id: usuario, clave: CLAVE_ESPACIO, ficha: ficha, ejercicio: String(ej),
             bien: bien || 0, total: total || 0, texto: texto || null,
             actualizado: new Date().toISOString() };
  }
  async function subir(filas){
    if(!filas.length) return;
    const { error } = await sb.from('fichas_avance')
      .upsert(filas, { onConflict: 'estudiante_id,clave,ficha,ejercicio' });
    if(error) console.warn('No se pudo copiar el avance:', error.message);
  }

  window.MT_SYNC = function(ficha, ej, bien, total, texto){
    if(!usuario) return;
    subir([fila(ficha, ej, bien, total, texto)]);
  };

  // Lo que ya estaba resuelto en este navegador antes de entrar, también.
  function subirLoGuardado(){
    let avance = {};
    try { avance = JSON.parse(localStorage.getItem(CLAVE_ESPACIO)) || {}; } catch(e){}
    const filas = [];
    Object.keys(avance).forEach(f => {
      const a = avance[f] || {};
      Object.keys(a).forEach(k => {
        if(!/^\d+$/.test(k) || !a[k] || typeof a[k] !== 'object') return;
        filas.push(fila(f, k, a[k].b, a[k].t, a['texto' + k] || null));
      });
    });
    return subir(filas);
  }

  function aviso(html){
    const hub = document.querySelector('#vue-hub .conteneur');
    if(!hub) return;
    const d = document.createElement('p');
    d.className = 'note';
    d.style.cssText = 'margin:0 0 1rem;padding:.7rem 1rem;border-radius:12px;background:rgba(165,130,74,.12)';
    d.innerHTML = html;
    hub.insertBefore(d, hub.firstChild);
  }

  if(!sb) return;
  sb.auth.getSession().then(({ data }) => {
    const s = data && data.session;
    if(!s){
      aviso('Para que tu profesor vea tu avance, <a href="../login.html">entra con tu cuenta</a> '
          + 'y vuelve a esta página. Lo que ya resolviste aquí se copiará solo.');
      return;
    }
    usuario = s.user.id;
    subirLoGuardado();
    aviso('Has entrado con tu cuenta: tu profesor ve lo que resuelves. '
        + '<a href="devoirs.html"><b>Mes devoirs</b></a> — los deberes por entregar.');
  });
})();
