/* ===========================================================================
   FICHAS · PARCOURS IMMERSIF
   ---------------------------------------------------------------------------
   Convierte cualquier ficha de los espacios A1, A2 y B2 en un recorrido a
   pantalla completa, paso a paso, con el mismo ritmo que las presentaciones:
   una portada, cada explicación en su pantalla, cada ejercicio en la suya y
   un balance final. NO duplica nada: lee la misma ficha (FICHAS) y mueve a la
   pantalla los mismos bloques de ejercicio, de modo que la corrección, el
   avance guardado y la copia a la plataforma son exactamente los de siempre.

   Principios (los de la revisión autónoma de B2): una idea por pantalla,
   explicación antes de práctica, el progreso siempre a la vista, y un balance
   que dice qué repasar. Se carga después del motor (fichas-ejercicios.js).
   =========================================================================== */
(function(){
  'use strict';
  if(typeof FICHAS === 'undefined' || typeof abrirFicha !== 'function') return;

  let pasos = [], k = 0, ficha = null, huesped = null, marcador = null;
  let ov = null;

  function construir(f){
    const P = [{ t:'portada' }];
    (f.secciones || []).forEach((sec, si) => {
      if(!seccionAbierta(f, si)) return;
      P.push({ t:'seccion', sec, si });
      (sec.rappels || []).forEach(r => P.push({ t:'rappel', r, sec }));
      (sec.ejercicios || []).forEach(i => P.push({ t:'ej', i, sec }));
    });
    P.push({ t:'balance' });
    return P;
  }

  function hecho(p){
    if(p.t === 'ej'){ const r = (avance[ficha.id] || {})[p.i]; return !!(r && typeof r.t === 'number'); }
    return false;
  }

  function devolverHuesped(){
    if(huesped && marcador && marcador.parentNode){ marcador.parentNode.insertBefore(huesped, marcador); marcador.remove(); }
    huesped = null; marcador = null;
  }
  function alojar(el){
    devolverHuesped();
    if(!el) return null;
    marcador = document.createComment('inm');
    el.parentNode.insertBefore(marcador, el);
    huesped = el;
    return el;
  }

  function puntos(){
    return pasos.map((p, i) => `<i class="${i === k ? 'ahora' : (p.t === 'ej' ? (hecho(p) ? 'ok' : '') : (i < k ? 'ok' : ''))}"></i>`).join('');
  }

  function pintar(){
    const p = pasos[k], cuerpo = ov.querySelector('.inm-cuerpo');
    devolverHuesped();
    cuerpo.className = 'inm-cuerpo p-' + p.t;
    cuerpo.scrollTop = 0;
    let h = '';
    ov.querySelector('.inm-arte').style.backgroundImage = (p.t === 'portada' && ficha.arte) ? `url(${ficha.arte})` : 'none';
    ov.classList.toggle('con-arte', p.t === 'portada' && !!ficha.arte);
    if(p.t === 'portada'){
      h = `<div class="inm-k">${esc(ficha.fecha || '')}</div>
           <h2 class="inm-h">${esc(ficha.titulo)}</h2>
           <p class="inm-lead">${esc(ficha.intro || ficha.resumen || '')}</p>
           <p class="inm-meta">${pasos.filter(x => x.t === 'rappel').length} explication${pasos.filter(x => x.t === 'rappel').length > 1 ? 's' : ''} ·
              ${ficha.ejercicios.length} exercice${ficha.ejercicios.length > 1 ? 's' : ''} · un balance à la fin</p>`;
    } else if(p.t === 'seccion'){
      h = `<div class="inm-k">Partie ${p.si + 1}</div><h2 class="inm-h">${esc(p.sec.titulo)}</h2>
           <p class="inm-lead">${esc(p.sec.sous || '')}</p>`;
    } else if(p.t === 'rappel'){
      h = `<div class="inm-k">Pour comprendre</div><h2 class="inm-h pet">${esc(p.r.titulo)}</h2>
           <div class="inm-carte inm-texto">${p.r.html}</div>`;
    } else if(p.t === 'ej'){
      h = `<div class="inm-hueco"></div>`;
    } else {
      h = `<div class="inm-k">Balance</div><h2 class="inm-h pet">Où en es-tu ?</h2><div class="inm-hueco"></div>`;
    }
    cuerpo.innerHTML = h;
    if(p.t === 'ej'){
      const el = document.getElementById('ex-' + p.i);
      if(el) cuerpo.querySelector('.inm-hueco').appendChild(alojar(el));
    } else if(p.t === 'balance'){
      pintarSello();
      const hueco = cuerpo.querySelector('.inm-hueco');
      const s = document.getElementById('sello'), b = document.getElementById('balance');
      if(s) hueco.appendChild(s);
      if(b) hueco.appendChild(b);
      marcador = document.createComment('inm'); huesped = null;
      ov._finales = [s, b];
    }
    ov.querySelector('.inm-pt').innerHTML = puntos();
    ov.querySelector('.inm-cuenta').textContent = (k + 1) + ' / ' + pasos.length;
    ov.querySelector('.inm-ant').disabled = k === 0;
    const sig = ov.querySelector('.inm-sig');
    const ultimo = k === pasos.length - 1;
    sig.textContent = ultimo ? 'Terminer' : (k === 0 ? 'Commencer →' : 'Suivant →');
    sig.classList.toggle('pulso', p.t === 'ej' && hecho(p));
  }

  function devolverFinales(){
    if(ov && ov._finales){
      const sec = document.getElementById('cuerpo-sec-0');
      const cont = document.getElementById('f-cuerpo');
      const nav = cont && cont.querySelector('.nav-fiches');
      ov._finales.forEach(el => { if(el && cont) cont.insertBefore(el, nav); });
      ov._finales = null;
    }
  }

  function ir(n){
    k = Math.max(0, Math.min(pasos.length - 1, n));
    const cuerpo = ov.querySelector('.inm-cuerpo');
    cuerpo.classList.remove('entra'); void cuerpo.offsetWidth;
    devolverFinales(); pintar(); cuerpo.classList.add('entra');
  }

  function cerrar(){
    if(!ov) return;
    devolverHuesped(); devolverFinales();
    document.removeEventListener('keydown', teclas);
    document.body.style.overflow = ov._overflow || '';
    ov.remove(); ov = null;
    if(typeof pintarSello === 'function') pintarSello();
    if(typeof pintarPasosEstado === 'function') pintarPasosEstado();
  }

  function teclas(e){
    if(!ov) return;
    const enCampo = /^(INPUT|TEXTAREA|SELECT)$/.test((e.target || {}).tagName || '');
    if(e.key === 'Escape'){ cerrar(); }
    else if(!enCampo && (e.key === 'ArrowRight')){ if(k < pasos.length - 1) ir(k + 1); }
    else if(!enCampo && (e.key === 'ArrowLeft')){ ir(k - 1); }
  }

  window.abrirInmersivo = function(){
    if(!fichaActual) return;
    ficha = fichaActual; pasos = construir(ficha); k = 0;
    if(ov) cerrar();
    ov = document.createElement('div');
    ov.id = 'inm'; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true');
    ov.setAttribute('aria-label', 'Parcours immersif · ' + ficha.titulo);
    ov.innerHTML = `<div class="inm-arte"></div><div class="inm-veta"></div>
      <div class="inm-top"><span class="inm-marca">${esc(ficha.titulo)}</span>
        <span class="inm-cuenta"></span>
        <button class="inm-x" type="button" aria-label="Fermer le parcours">✕</button></div>
      <div class="inm-pt" aria-hidden="true"></div>
      <div class="inm-cuerpo"></div>
      <div class="inm-pie"><button class="inm-ant" type="button">← Précédent</button>
        <span class="inm-ayuda">← → pour avancer · Échap pour sortir</span>
        <button class="inm-sig" type="button">Suivant →</button></div>`;
    document.body.appendChild(ov);
    ov._overflow = document.body.style.overflow; document.body.style.overflow = 'hidden';
    ov.querySelector('.inm-x').onclick = cerrar;
    ov.querySelector('.inm-ant').onclick = () => ir(k - 1);
    ov.querySelector('.inm-sig').onclick = () => { if(k === pasos.length - 1) cerrar(); else ir(k + 1); };
    document.addEventListener('keydown', teclas);
    // al corregir un ejercicio, el botón «Suivant» se anima y los puntos se actualizan
    ov._vigia = setInterval(() => { if(!ov) return; ov.querySelector('.inm-pt').innerHTML = puntos();
      const p = pasos[k]; ov.querySelector('.inm-sig').classList.toggle('pulso', p.t === 'ej' && hecho(p)); }, 600);
    const cerrarOrig = cerrar;
    pintar(); ov.querySelector('.inm-cuerpo').classList.add('entra');
    ov.querySelector('.inm-sig').focus();
  };

  // El botón de entrada, en la cabecera de cada ficha y en el hub si lo piden.
  const abrirOrig = abrirFicha;
  window.abrirFicha = abrirFicha = function(id){
    abrirOrig(id);
    const f = FICHAS.find(x => x.id === id), cont = document.getElementById('f-cuerpo');
    if(!f || !cont || !fichaDisponible(f) || document.getElementById('btn-inm')) return;
    const b = document.createElement('div');
    b.id = 'btn-inm'; b.className = 'inm-entrada';
    b.innerHTML = `<div><b>Parcours immersif</b><span>La fiche en plein écran, une idée par écran, avec ton balance à la fin.</span></div>
      <button class="btn" type="button" onclick="abrirInmersivo()">▶ Commencer</button>`;
    cont.insertBefore(b, cont.firstChild);
    // El recorrido inmersivo es la forma NORMAL de hacer una ficha: se abre solo.
    // Al salir queda la ficha en página corrida y el botón «Commencer» para volver.
    if(!/sin-inmersivo/.test(location.search)) window.abrirInmersivo();
  };
})();
