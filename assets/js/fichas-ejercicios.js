/* ===========================================================================
   FICHAS DE EJERCICIOS · el motor
   ---------------------------------------------------------------------------
   Lo comparten todos los espacios de ejercicios. La página que lo use debe:
     1. declarar  window.MT_FICHAS_CLAVE = 'mt-<grupo>';  antes de cargarlo,
        para que cada grupo guarde su avance por separado;
     2. cargar su archivo de fichas (que define FICHAS) antes de este;
     3. tener en el HTML los mismos identificadores que espera el motor:
        vue-hub, grille-fiches, pct-global, barra-global,
        vue-fiche, f-fecha, f-titulo, f-intro, f-cuerpo.

   Añadir un tipo de ejercicio es añadir una entrada en PINTAR y otra en
   CORREGIR; el resto no se toca.
   =========================================================================== */

/* ═══════════════════════════════════════════════════════════════════════
   MOTOR DE EJERCICIOS
   Las fichas viven en b2-oct2026-fiches.js. Aquí solo está la mecánica:
   pintar, corregir y recordar. Cada tipo de ejercicio sabe pintarse y
   sabe corregirse; añadir un tipo nuevo es añadir una entrada en PINTAR
   y otra en CORREGIR.
   ═══════════════════════════════════════════════════════════════════════ */

const CLAVE = window.MT_FICHAS_CLAVE || 'mt-fichas';
let avance = cargarAvance();
let fichaActual = null;

function cargarAvance(){
  try { return JSON.parse(localStorage.getItem(CLAVE)) || {}; } catch(e){ return {}; }
}
function guardarAvance(){
  try { localStorage.setItem(CLAVE, JSON.stringify(avance)); } catch(e){}
}

/* ── Normalización para comparar respuestas escritas ──────────────────
   El estudiante no debe perder un punto por un acento olvidado o por una
   apóstrofe curva: eso se corrige en clase, no con una cruz roja. */
function normalizar(s){
  return (s||'').toString().toLowerCase().trim()
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .replace(/[''`´]/g,"'")
    .replace(/[.,;:!?«»"]/g,'')
    .replace(/\s+/g,' ');
}
function esc(s){
  return (s||'').toString().replace(/[&<>"]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));
}
function mezclar(a){
  const c = a.slice();
  for(let i=c.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [c[i],c[j]]=[c[j],c[i]]; }
  return c;
}

/* ── Voz ──────────────────────────────────────────────────────────────
   La voz del navegador no es un locutor nativo, pero sirve para oír el
   ritmo y para dictarse una frase tantas veces como haga falta. */
function hablar(texto, btn){
  if(!('speechSynthesis' in window)) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(texto);
  u.lang = 'fr-FR'; u.rate = 0.9;
  const vs = speechSynthesis.getVoices().filter(v => v.lang.startsWith('fr'));
  if(vs.length) u.voice = vs[0];
  if(btn){ const o = btn.textContent; btn.textContent = '▶ …';
           u.onend = () => { btn.textContent = o; }; }
  speechSynthesis.speak(u);
}

/* ═══ HUB ═══ */
function pintarHub(){
  let totalEj = 0, hechos = 0;
  document.getElementById('grille-fiches').innerHTML = FICHAS.map(f => {
    const n = f.ejercicios.length;
    const hecho = (avance[f.id] && Object.keys(avance[f.id]).length) || 0;
    totalEj += n; hechos += Math.min(hecho, n);
    const clase = hecho >= n && n ? 'fait' : (hecho ? 'encours' : '');
    const texto = hecho >= n && n ? 'Terminé' : (hecho ? hecho + '/' + n : 'À faire');
    return `<button class="carte ${f.tipo||''}" onclick="abrirFicha('${f.id}')">
      <div class="date">${esc(f.fecha)}</div>
      <h2>${esc(f.titulo)}</h2>
      <p>${esc(f.resumen)}</p>
      <div class="pied">
        <span class="cuantos">${n} exercice${n>1?'s':''}</span>
        <span class="medaille ${clase}">${texto}</span>
      </div></button>`;
  }).join('');

  const pct = totalEj ? Math.round(hechos*100/totalEj) : 0;
  document.getElementById('pct-global').innerHTML = pct + '&#8239;%';
  setTimeout(() => { document.getElementById('barra-global').style.width = pct + '%'; }, 80);
}

function irAlHub(){
  document.getElementById('vue-fiche').classList.remove('active');
  document.getElementById('vue-hub').classList.add('active');
  history.replaceState(null,'','#');
  pintarHub();
  window.scrollTo({top:0});
}

function borrarTodo(){
  if(!confirm('Se borra tu avance de todas las fichas. ¿Seguimos?')) return;
  avance = {}; guardarAvance(); pintarHub();
}

/* ═══ FICHA ═══ */
function abrirFicha(id){
  const f = FICHAS.find(x => x.id === id);
  if(!f) return;
  fichaActual = f;
  document.getElementById('f-fecha').textContent = f.fecha;
  document.getElementById('f-titulo').textContent = f.titulo;
  document.getElementById('f-intro').textContent = f.intro || f.resumen;

  let html = '';
  (f.secciones || []).forEach(sec => {
    html += `<div class="fiche">
      <div class="bloc-titre">${esc(sec.titulo)}</div>
      <p class="bloc-sous">${esc(sec.sous||'')}</p>
      ${(sec.rappels||[]).map(pintarRappel).join('')}
      ${(sec.ejercicios||[]).map(i => pintarEjercicio(f, i)).join('')}
    </div>`;
  });
  html += `<div class="nav-fiches">
      <button class="btn doux" onclick="irAlHub()">← Toutes les séances</button>
      ${siguienteFicha(f) ? `<button class="btn" onclick="abrirFicha('${siguienteFicha(f).id}')">Séance suivante →</button>` : ''}
    </div>`;
  document.getElementById('f-cuerpo').innerHTML = html;

  document.getElementById('vue-hub').classList.remove('active');
  document.getElementById('vue-fiche').classList.add('active');
  history.replaceState(null,'','#'+id);
  window.scrollTo({top:0});
  (f.secciones||[]).forEach(sec => (sec.ejercicios||[]).forEach(i => montar(f.ejercicios[i], i)));
}

function siguienteFicha(f){
  const i = FICHAS.indexOf(f);
  return i >= 0 && i < FICHAS.length-1 ? FICHAS[i+1] : null;
}

function pintarRappel(r){
  return `<div class="rappel">
    <h4>${esc(r.titulo)}</h4>
    ${r.html}
  </div>`;
}

/* ═══ EJERCICIOS ═══ */
function pintarEjercicio(f, i){
  const e = f.ejercicios[i];
  const hecho = avance[f.id] && avance[f.id][i];
  return `<div class="ex-bloc ${hecho?'resolu':''}" id="ex-${i}">
    <div class="ex-num">Exercice ${i+1}${e.etiqueta?' · '+esc(e.etiqueta):''}</div>
    <div class="ex-consigne">${esc(e.consigne)}
      ${e.sous?`<small>${esc(e.sous)}</small>`:''}</div>
    <div id="cuerpo-${i}">${PINTAR[e.t] ? PINTAR[e.t](e,i) : ''}</div>
    <div class="actions">
      ${e.t==='prod' ? `<button class="btn" onclick="guardarRedaccion(${i})">Enregistrer mon texte</button>
                        <button class="btn doux" onclick="verModelo(${i})">Voir un modèle</button>`
                     : `<button class="btn" onclick="corregir(${i})">Corriger</button>
                        <button class="btn doux" onclick="rehacer(${i})">Recommencer</button>`}
    </div>
    <div class="verdict" id="verdict-${i}"></div>
    ${e.aide?`<div class="aide" id="aide-${i}"><b>Pour comprendre&#8239;:</b> ${e.aide}</div>`:''}
    ${e.modele?`<div class="modele" id="modele-${i}"><b>Un modèle possible&#8239;:</b><br>${e.modele}</div>`:''}
  </div>`;
}

const PINTAR = {
  /* Elección múltiple */
  qcm: (e,i) => e.q.map((q,qi) => `<div class="q">
      <div class="enonce">${qi+1}. ${q.enonce}
        ${q.audio?` <button class="btn-audio" onclick="hablar('${q.audio.replace(/'/g,"\\'")}',this)">🔊 Écouter</button>`:''}</div>
      <div class="opts">${q.o.map((o,oi) =>
        `<button class="opt" data-q="${qi}" data-o="${oi}" onclick="elegir(${i},${qi},${oi})">${o}</button>`).join('')}</div>
      ${q.note?`<div class="aide" id="note-${i}-${qi}">${q.note}</div>`:''}
    </div>`).join(''),

  /* Rellenar huecos: ___ en el enunciado se convierte en campo */
  trous: (e,i) => e.q.map((q,qi) => `<div class="q">
      <div class="enonce">${qi+1}. ${q.enonce.replace('___',
        `<input class="trou" data-q="${qi}" size="${q.taille||14}" placeholder="…">`)}
        ${q.audio?` <button class="btn-audio" onclick="hablar('${q.audio.replace(/'/g,"\\'")}',this)">🔊</button>`:''}</div>
      ${q.note?`<div class="aide" id="note-${i}-${qi}">${q.note}</div>`:''}
    </div>`).join(''),

  /* Clasificar en columnas: se pulsa el jetón y va rotando de columna */
  tri: (e,i) => `<div class="reserve" id="reserve-${i}">
      ${mezclar(e.items.map((it,k)=>k)).map(k =>
        `<button class="jeton" data-it="${k}" data-col="-1" onclick="rotar(${i},${k})">
           ${e.items[k][0]} <span class="etiquette" data-col-nom>à classer</span></button>`).join('')}
    </div>
    <div class="tri">${e.cols.map((c,ci) => `<div class="col-tri"><h5>${esc(c)}</h5>
      <div id="col-${i}-${ci}"></div></div>`).join('')}</div>`,

  /* Emparejar: se pulsa a la izquierda y luego a la derecha */
  paires: (e,i) => {
    const der = mezclar(e.pairs.map((p,k)=>k));
    return `<div class="paires">
      <div class="colonne">${e.pairs.map((p,k) =>
        `<button class="jeton" data-lado="g" data-k="${k}" onclick="tocarPar(${i},'g',${k})">${p[0]}</button>`).join('')}</div>
      <div class="colonne">${der.map(k =>
        `<button class="jeton" data-lado="d" data-k="${k}" onclick="tocarPar(${i},'d',${k})">${e.pairs[k][1]}</button>`).join('')}</div>
    </div><p class="compte-mots">Pulsa una expresión de la izquierda y después su pareja de la derecha.</p>`;
  },

  /* Transformar una frase: se escribe y se compara con el modelo */
  transfo: (e,i) => e.q.map((q,qi) => `<div class="q">
      <div class="enonce">${qi+1}. ${q.enonce}</div>
      <input class="trou" data-q="${qi}" style="width:100%" placeholder="Réécris la phrase ici…">
      <div class="modele" id="mod-${i}-${qi}"><b>Modèle&#8239;:</b> ${q.modele}
        ${q.note?`<br><span class="note">${q.note}</span>`:''}</div>
    </div>`).join(''),

  /* Dictado: se escucha y se escribe */
  dictee: (e,i) => e.q.map((q,qi) => `<div class="q">
      <div class="enonce">${qi+1}. <button class="btn-audio"
        onclick="hablar('${q.texte.replace(/'/g,"\\'")}',this)">🔊 Écouter</button>
        <button class="btn-audio" onclick="hablar('${q.texte.replace(/'/g,"\\'").split(' ').join(', ')}',this)">🐢 Plus lentement</button></div>
      <input class="trou" data-q="${qi}" style="width:100%" placeholder="Écris ce que tu entends…">
    </div>`).join(''),

  /* Producción escrita: no se corrige con cruces, se acompaña */
  prod: (e,i) => `<textarea class="redac" id="redac-${i}" oninput="contarPalabras(${i})"
      placeholder="Écris ton texte ici. Il reste enregistré dans ce navigateur."></textarea>
    <div class="compte-mots" id="mots-${i}">0 mot${e.mots?' · objectif : '+e.mots+' mots':''}</div>
    ${e.check?`<ul class="liste-verif">${e.check.map(c=>`<li>${c}</li>`).join('')}</ul>`:''}`
};

/* ── Estado vivo de cada ejercicio (no se guarda: solo la nota) ── */
const estado = {};
function montar(e, i){
  estado[i] = { tipo:e.t, elegido:{}, cols:{}, pares:{}, ultimoG:null };
  if(e.t === 'prod'){
    const guardado = (avance[fichaActual.id]||{})['texto'+i];
    if(guardado){ document.getElementById('redac-'+i).value = guardado; contarPalabras(i); }
  }
}

function elegir(i, qi, oi){
  estado[i].elegido[qi] = oi;
  document.querySelectorAll(`#cuerpo-${i} .opt[data-q="${qi}"]`).forEach(b => {
    b.classList.remove('juste','faux');
    if(+b.dataset.o === oi) b.style.borderColor = 'var(--bleu)';
    else b.style.borderColor = '';
  });
}

function rotar(i, k){
  const e = fichaActual.ejercicios[i];
  const btn = document.querySelector(`#ex-${i} .jeton[data-it="${k}"]`);
  let col = (+btn.dataset.col + 1);
  if(col >= e.cols.length) col = -1;
  btn.dataset.col = col;
  btn.querySelector('[data-col-nom]').textContent = col < 0 ? 'à classer' : e.cols[col];
  estado[i].cols[k] = col;
  const destino = col < 0 ? document.getElementById('reserve-'+i)
                          : document.getElementById(`col-${i}-${col}`);
  destino.appendChild(btn);
}

function tocarPar(i, lado, k){
  const st = estado[i];
  const btn = document.querySelector(`#ex-${i} .jeton[data-lado="${lado}"][data-k="${k}"]`);
  if(lado === 'g'){
    document.querySelectorAll(`#ex-${i} .jeton[data-lado="g"]`).forEach(b=>b.classList.remove('choisi'));
    btn.classList.add('choisi');
    st.ultimoG = k;
  } else {
    if(st.ultimoG === null) return;
    st.pares[st.ultimoG] = k;
    document.querySelector(`#ex-${i} .jeton[data-lado="g"][data-k="${st.ultimoG}"]`)
      .innerHTML = fichaActual.ejercicios[i].pairs[st.ultimoG][0] +
        ` <span class="etiquette">→ ${esc(fichaActual.ejercicios[i].pairs[k][1])}</span>`;
    document.querySelectorAll(`#ex-${i} .jeton[data-lado="g"]`).forEach(b=>b.classList.remove('choisi'));
    st.ultimoG = null;
  }
}

function contarPalabras(i){
  const t = document.getElementById('redac-'+i).value.trim();
  const n = t ? t.split(/\s+/).length : 0;
  const e = fichaActual.ejercicios[i];
  document.getElementById('mots-'+i).textContent =
    n + ' mot' + (n>1?'s':'') + (e.mots ? ' · objectif : ' + e.mots + ' mots' : '');
}

function guardarRedaccion(i){
  const t = document.getElementById('redac-'+i).value;
  anotar(i, t.trim() ? 1 : 0, 1, 'texto'+i, t);
  mostrarVerdicto(i, t.trim() ? 1 : 0, 1,
    t.trim() ? 'Guardado. Tráelo a clase o mándamelo por WhatsApp y te lo devuelvo corregido.'
             : 'Todavía no has escrito nada.');
}
function verModelo(i){
  const m = document.getElementById('modele-'+i);
  if(m) m.classList.add('vue');
}

/* ── Corrección ── */
const CORREGIR = {
  qcm: (e,i) => {
    let bien = 0;
    e.q.forEach((q,qi) => {
      const elegido = estado[i].elegido[qi];
      document.querySelectorAll(`#cuerpo-${i} .opt[data-q="${qi}"]`).forEach(b => {
        b.disabled = true; b.style.borderColor = '';
        if(+b.dataset.o === q.r) b.classList.add('juste');
        else if(+b.dataset.o === elegido) b.classList.add('faux');
      });
      if(elegido === q.r) bien++;
      const nota = document.getElementById(`note-${i}-${qi}`);
      if(nota) nota.classList.add('vue');
    });
    return [bien, e.q.length];
  },

  trous: (e,i) => {
    let bien = 0;
    e.q.forEach((q,qi) => {
      const campo = document.querySelector(`#cuerpo-${i} .trou[data-q="${qi}"]`);
      const dado = normalizar(campo.value);
      const ok = (Array.isArray(q.r)?q.r:[q.r]).some(r => normalizar(r) === dado);
      campo.classList.add(ok ? 'juste' : 'faux');
      if(!ok) campo.value = campo.value + '  →  ' + (Array.isArray(q.r)?q.r[0]:q.r);
      if(ok) bien++;
      const nota = document.getElementById(`note-${i}-${qi}`);
      if(nota) nota.classList.add('vue');
    });
    return [bien, e.q.length];
  },

  tri: (e,i) => {
    let bien = 0;
    e.items.forEach((it,k) => {
      const btn = document.querySelector(`#ex-${i} .jeton[data-it="${k}"]`);
      const puesto = +btn.dataset.col;
      const ok = puesto === it[1];
      btn.classList.add(ok ? 'juste' : 'faux');
      btn.disabled = true;
      if(ok) bien++;
      else btn.querySelector('[data-col-nom]').textContent = '→ ' + e.cols[it[1]];
    });
    return [bien, e.items.length];
  },

  paires: (e,i) => {
    let bien = 0;
    e.pairs.forEach((p,k) => {
      const btn = document.querySelector(`#ex-${i} .jeton[data-lado="g"][data-k="${k}"]`);
      const ok = estado[i].pares[k] === k;
      btn.classList.add(ok ? 'juste' : 'faux');
      if(ok) bien++;
      else btn.innerHTML = p[0] + ` <span class="etiquette">→ ${esc(p[1])}</span>`;
    });
    document.querySelectorAll(`#ex-${i} .jeton`).forEach(b => b.disabled = true);
    return [bien, e.pairs.length];
  },

  /* Transformar y dictar no se corrigen con cruces: se comparan con el
     modelo. El estudiante es quien decide si acertó, y eso también se
     aprende. El dictado sí se puede comparar palabra por palabra. */
  transfo: (e,i) => {
    e.q.forEach((q,qi) => document.getElementById(`mod-${i}-${qi}`).classList.add('vue'));
    return [e.q.length, e.q.length];
  },

  dictee: (e,i) => {
    let bien = 0;
    e.q.forEach((q,qi) => {
      const campo = document.querySelector(`#cuerpo-${i} .trou[data-q="${qi}"]`);
      const ok = normalizar(campo.value) === normalizar(q.texte);
      campo.classList.add(ok ? 'juste' : 'faux');
      if(!ok) campo.value = campo.value + '  →  ' + q.texte;
      if(ok) bien++;
    });
    return [bien, e.q.length];
  }
};

function corregir(i){
  const e = fichaActual.ejercicios[i];
  if(!CORREGIR[e.t]) return;
  const [bien, total] = CORREGIR[e.t](e, i);
  anotar(i, bien, total);
  const aide = document.getElementById('aide-'+i);
  if(aide) aide.classList.add('vue');
  const modele = document.getElementById('modele-'+i);
  if(modele) modele.classList.add('vue');
  mostrarVerdicto(i, bien, total);
}

function mostrarVerdicto(i, bien, total, texto){
  const v = document.getElementById('verdict-'+i);
  const pct = total ? bien/total : 0;
  v.className = 'verdict ' + (pct >= 0.8 ? 'ok' : pct >= 0.5 ? 'moyen' : 'ko');
  const e = fichaActual.ejercicios[i];
  if(texto){ v.innerHTML = texto; return; }
  if(e.t === 'transfo'){
    v.innerHTML = 'Compara tu frase con el modelo. No tiene que ser idéntica: '
                + 'lo que importa es que la estructura sea la misma.';
    return;
  }
  const juicios = pct === 1 ? ['Parfait. On passe à la suite.']
    : pct >= 0.8 ? ['Très bien. Relis juste ce qui est en rouge.']
    : pct >= 0.5 ? ['Pas mal, mais il faut repasser la règle au-dessus.']
    : ['À reprendre tranquillement. Relis l’encadré et recommence : '
      + 'no pasa nada, para eso está.'];
  v.innerHTML = `<b>${bien}/${total}.</b> ${juicios[0]}`;
  document.getElementById('ex-'+i).classList.add('resolu');
}

function anotar(i, bien, total, clave, valor){
  avance[fichaActual.id] = avance[fichaActual.id] || {};
  avance[fichaActual.id][i] = { b: bien, t: total, cuando: Date.now() };
  if(clave) avance[fichaActual.id][clave] = valor;
  guardarAvance();
}

function rehacer(i){
  const cuerpo = document.getElementById('cuerpo-'+i);
  const e = fichaActual.ejercicios[i];
  cuerpo.innerHTML = PINTAR[e.t](e, i);
  montar(e, i);
  document.getElementById('verdict-'+i).className = 'verdict';
  document.getElementById('ex-'+i).classList.remove('resolu');
}

/* ═══ Tema e inicio ═══ */
function basculerTheme(){
  const sombre = document.documentElement.dataset.theme === 'sombre';
  document.documentElement.dataset.theme = sombre ? 'clair' : 'sombre';
  try { localStorage.setItem(CLAVE+'-tema', sombre ? 'clair' : 'sombre'); } catch(e){}
  textoBotonTema();
}
function textoBotonTema(){
  const t = document.documentElement.dataset.theme === 'sombre' ? 'Mode clair' : 'Mode sombre';
  ['btn-theme','btn-theme-2'].forEach(id => {
    const b = document.getElementById(id); if(b) b.textContent = t;
  });
}
(function iniciar(){
  try {
    const t = localStorage.getItem(CLAVE+'-tema');
    if(t) document.documentElement.dataset.theme = t;
  } catch(e){}
  textoBotonTema();
  pintarHub();
  if(location.hash.length > 1 && FICHAS.some(f => f.id === location.hash.slice(1))){
    abrirFicha(location.hash.slice(1));
  }
  if('speechSynthesis' in window) speechSynthesis.getVoices();
})();
