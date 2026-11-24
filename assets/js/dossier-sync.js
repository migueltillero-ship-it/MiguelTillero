/* ===========================================================================
   DOSSIERS A1 y B2 · el avance también en la plataforma
   ---------------------------------------------------------------------------
   Las páginas a1.html y b2.html guardaban el avance solo en el navegador:
   cambiar de móvil o borrar los datos lo perdía, y el profesor no lo veía.
   Este archivo lo copia en fichas_avance (la misma tabla de los espacios de
   ejercicios) con una clave propia («dossier-a1», «dossier-b2»), de modo que
   NO entra en el cálculo de la nota de ejercicios, que solo lee las claves
   «mt-*». Sin sesión todo sigue funcionando en el navegador, con un aviso.

   La página define dos funciones:
     MT_DOSSIER_LOCAL()        → filas {ficha, ejercicio, bien, total} que ya tiene
     MT_DOSSIER_FUSIONAR(rows) → recibe lo guardado en la plataforma y lo mezcla
   y llama a MT_DOSSIER.guardar(...) cada vez que el estudiante responde.
   =========================================================================== */
(function(){
  'use strict';
  const sb = typeof supabaseClient !== 'undefined' ? supabaseClient : null;
  const CLAVE = window.MT_DOSSIER_CLAVE || 'dossier';
  let usuario = null;
  const listo = new Promise(res => {
    if(!sb) return res(null);
    sb.auth.getSession().then(({data}) => { usuario = data && data.session ? data.session.user.id : null; res(usuario); },
                              () => res(null));
  });
  const fila = (f, e, b, t) => ({ estudiante_id: usuario, clave: CLAVE, ficha: String(f), ejercicio: String(e),
                                  bien: b|0, total: t|0, actualizado: new Date().toISOString() });
  async function subir(filas){
    if(!usuario || !filas.length) return;
    const { error } = await sb.from('fichas_avance').upsert(filas, { onConflict: 'estudiante_id,clave,ficha,ejercicio' });
    if(error) console.warn('No se pudo copiar el avance:', error.message);
  }
  function aviso(html, fuerte){
    const d = document.createElement('div');
    d.setAttribute('role','status');
    d.style.cssText = 'margin:0 auto 1rem;max-width:1100px;padding:.8rem 1.1rem;border-radius:12px;font:15px/1.5 Syne,system-ui,sans-serif;'
      + (fuerte ? 'background:#fbeee9;border:2px solid #c2603c;color:#5b2a19' : 'background:rgba(165,130,74,.14);border:1px solid rgba(165,130,74,.4);color:#3b3426');
    d.innerHTML = html;
    const ancla = document.querySelector('.mt-bases') || document.querySelector('.conteneur') || document.body;
    ancla.parentNode.insertBefore(d, ancla);
  }
  window.MT_DOSSIER = {
    guardar(f, e, b, t){ listo.then(u => { if(u) subir([fila(f, e, b, t)]); }); },
    async borrar(){
      const u = await listo; if(!u) return;
      await sb.from('fichas_avance').delete().eq('estudiante_id', u).eq('clave', CLAVE);
    }
  };
  const dom = new Promise(r => document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', r) : r());
  Promise.all([listo, dom]).then(async ([u]) => {
    if(!sb) return;
    if(!u){
      aviso('<b>No has entrado con tu cuenta.</b> Tu avance se queda solo en este navegador y tu profesor no lo ve. '
          + '<a href="../login.html" onclick="try{sessionStorage.setItem(\'mt_volver\',\'estudiantes/\'+location.pathname.split(\'/\').pop())}catch(e){}" style="font-weight:700;color:#c2603c">Entrar con mi cuenta</a>', true);
      return;
    }
    const { data, error } = await sb.from('fichas_avance').select('ficha,ejercicio,bien,total').eq('estudiante_id', u).eq('clave', CLAVE);
    if(!error && data && typeof window.MT_DOSSIER_FUSIONAR === 'function') window.MT_DOSSIER_FUSIONAR(data);
    if(typeof window.MT_DOSSIER_LOCAL === 'function')
      subir(window.MT_DOSSIER_LOCAL().map(r => fila(r.ficha, r.ejercicio, r.bien, r.total)));
    aviso('Has entrado con tu cuenta: tu avance se guarda en la plataforma y te acompaña en cualquier dispositivo.', false);
  });
})();
