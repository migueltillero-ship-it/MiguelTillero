/* ════════════════════════════════════════════════
   VENDREDI ENTRE AMIS — lógica del club
   Todo el progreso (carnet, retos, favoritos) vive en
   localStorage del navegador del estudiante: es privado
   y personal, no se comparte entre dispositivos.
════════════════════════════════════════════════ */

/* ───────────────────────────────────────────────
   1) SEMANA ACTUAL
   Miguel actualiza este único número cada viernes
   antes de la sesión (1 a 52). Todo el resto de la
   página se ajusta solo a partir de este valor.
   ─────────────────────────────────────────────── */
const SEMANA_ACTUAL = 1;

/* Preguntas de "Entre Amis" — una por semana. Se puede
   ampliar libremente; si falta la de la semana, se usa una genérica. */
const PREGUNTAS_ENTRE_AMIS = {
  1: "Quel est votre café ou restaurant préféré, et pourquoi ?",
  2: "Quel plat représente le mieux votre ville ou région ?",
  6: "Que représente pour vous le mot « chez-soi » ?",
  8: "Quelle est une tradition d'hospitalité de votre pays ?",
};

let DATA = null;
let currentEntryLevel = "a1a2";

/* ───────────────────────────────────────────────
   CARGA DE DATOS
   ─────────────────────────────────────────────── */
async function cargarDatos(){
  const res = await fetch('data/semaines.json');
  DATA = await res.json();
  return DATA;
}

function semanaPorNumero(n){
  return DATA.semanas.find(s => s.semana === n);
}

/* ───────────────────────────────────────────────
   ROUTING (pestañas tipo SPA)
   ─────────────────────────────────────────────── */
function irA(vista){
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('#tabs button').forEach(b => b.classList.remove('active'));
  const target = document.getElementById('view-' + vista);
  const btn = document.querySelector(`#tabs button[data-view="${vista}"]`);
  if(target) target.classList.add('active');
  if(btn) btn.classList.add('active');
  window.scrollTo({top:0, behavior:'smooth'});
  location.hash = vista;
}

/* ───────────────────────────────────────────────
   ACCUEIL
   ─────────────────────────────────────────────── */
function renderAccueil(){
  const semana = semanaPorNumero(SEMANA_ACTUAL);
  const nombreDestino = semana.destino ? `${semana.destino}, ${semana.pais}` : semana.tema;
  document.getElementById('accueil-tema-actual').textContent = nombreDestino;
  document.getElementById('accueil-semana-num').textContent = `Semaine ${semana.semana}`;
  document.getElementById('accueil-temporada').textContent = semana.temporada_nombre;

  const pct = Math.round((SEMANA_ACTUAL / DATA.total_semanas) * 100);
  document.getElementById('accueil-progress-bar').style.width = pct + '%';
  document.getElementById('accueil-progress-label').textContent =
    `Étape ${SEMANA_ACTUAL} sur ${DATA.total_semanas} — ${pct}% du parcours`;

  const proxima = semanaPorNumero(SEMANA_ACTUAL + 1);
  document.getElementById('accueil-proxima').textContent = proxima
    ? (proxima.destino ? `${proxima.destino}, ${proxima.pais}` : proxima.tema)
    : "Bilan de fin d'année 🎉";
}

/* ───────────────────────────────────────────────
   LE CAFÉ DU VENDREDI
   ─────────────────────────────────────────────── */
function poblarSelectorSemanas(){
  const select = document.getElementById('week-select');
  select.innerHTML = '';
  DATA.semanas.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s.semana;
    const label = s.destino ? `${s.destino} — ${s.tema}` : s.tema;
    opt.textContent = `Semaine ${s.semana} · ${label}`;
    if(s.semana === SEMANA_ACTUAL) opt.selected = true;
    select.appendChild(opt);
  });
  select.addEventListener('change', e => renderCafe(parseInt(e.target.value, 10)));
}

function chipCompletado(semana){
  return localStorage.getItem('reto-completado-' + semana) === '1';
}

function renderCafe(numSemana){
  const semana = semanaPorNumero(numSemana);
  if(!semana) return;

  document.getElementById('cafe-destino').textContent = semana.destino || semana.temporada_nombre;
  document.getElementById('cafe-pais').textContent = semana.pais || semana.tema_desc || '';
  document.getElementById('cafe-tema').textContent = semana.tema;

  renderVocab('a1a2', semana);
  renderVocab('b1b2', semana);

  document.getElementById('expr-a1a2-fr').textContent = semana.a1a2.expresion.fr;
  document.getElementById('expr-a1a2-es').textContent = semana.a1a2.expresion.es;
  document.getElementById('expr-b1b2-fr').textContent = semana.b1b2.expresion.fr;
  document.getElementById('expr-b1b2-es').textContent = semana.b1b2.expresion.es;

  document.getElementById('reto-a1a2-texto').textContent = semana.a1a2.reto;
  document.getElementById('reto-b1b2-texto').textContent = semana.b1b2.reto;

  const culturaWrap = document.getElementById('cultura-wrap');
  if(semana.cultura){
    culturaWrap.style.display = '';
    document.getElementById('cultura-texto').textContent = semana.cultura;
  } else {
    culturaWrap.style.display = 'none';
  }

  ['a1a2','b1b2'].forEach(nivel => {
    const check = document.getElementById('reto-check-' + nivel);
    check.checked = chipCompletado(numSemana + '-' + nivel);
    check.onchange = () => {
      localStorage.setItem('reto-completado-' + numSemana + '-' + nivel, check.checked ? '1' : '0');
      renderPassport();
    };
  });
}

function renderVocab(nivel, semana){
  const ul = document.getElementById('vocab-' + nivel);
  ul.innerHTML = '';
  semana[nivel].vocabulario.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div>
        <div class="vocab-fr">${item.fr}</div>
        <div class="vocab-es">${item.es}</div>
      </div>
      <button class="say-btn" aria-label="Écouter ${item.fr}" title="Écouter">🔊</button>
    `;
    li.querySelector('.say-btn').addEventListener('click', () => decirFrances(item.fr));
    ul.appendChild(li);
  });
}

function decirFrances(texto){
  if(!('speechSynthesis' in window)) return;
  const u = new SpeechSynthesisUtterance(texto);
  u.lang = 'fr-FR';
  u.rate = 0.92;
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}

function activarLevelTabs(){
  document.querySelectorAll('.level-tabs button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.level-tabs button').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.level-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('panel-' + btn.dataset.level).classList.add('active');
    });
  });
}

/* ───────────────────────────────────────────────
   PASSEPORT FRANCOPHONE (temporada 1: ciudades visitadas)
   ─────────────────────────────────────────────── */
function renderPassport(){
  const wrap = document.getElementById('passport-grid');
  if(!wrap) return;
  wrap.innerHTML = '';
  DATA.semanas.filter(s => s.temporada === 1).forEach(s => {
    const visitado = s.semana <= SEMANA_ACTUAL;
    const div = document.createElement('div');
    div.className = 'stamp' + (visitado ? ' done' : '');
    div.innerHTML = `
      <div class="flag">${visitado ? '✅' : '⏳'}</div>
      <div class="nom">${s.destino}</div>
      <div class="estado">${s.pais}</div>
    `;
    wrap.appendChild(div);
  });
}

/* ───────────────────────────────────────────────
   LA BOÎTE À EXPRESSIONS (acumulativa hasta la semana actual)
   ─────────────────────────────────────────────── */
function todasLasExpresiones(){
  const lista = [];
  DATA.semanas.filter(s => s.semana <= SEMANA_ACTUAL).forEach(s => {
    lista.push({ nivel:'a1a2', fr:s.a1a2.expresion.fr, es:s.a1a2.expresion.es, semana:s.semana });
    lista.push({ nivel:'b1b2', fr:s.b1b2.expresion.fr, es:s.b1b2.expresion.es, semana:s.semana });
  });
  return lista;
}

function renderExpresiones(filtroNivel='todos', busqueda=''){
  const cont = document.getElementById('expr-list');
  const datos = todasLasExpresiones().filter(e => {
    const pasaNivel = filtroNivel === 'todos' || e.nivel === filtroNivel;
    const pasaBusqueda = !busqueda || e.fr.toLowerCase().includes(busqueda.toLowerCase()) || e.es.toLowerCase().includes(busqueda.toLowerCase());
    return pasaNivel && pasaBusqueda;
  });
  cont.innerHTML = '';
  if(datos.length === 0){
    cont.innerHTML = '<div class="empty-state">Aucune expression ne correspond à ta recherche.</div>';
    return;
  }
  datos.forEach(e => {
    const div = document.createElement('div');
    div.className = 'entry';
    div.innerHTML = `
      <div>
        <div class="vocab-fr">${e.fr} <button class="say-btn" style="width:1.7rem;height:1.7rem;font-size:.85rem;vertical-align:middle;" aria-label="Écouter">🔊</button></div>
        <div class="vocab-es">${e.es} · Semaine ${e.semana} · ${e.nivel.toUpperCase()}</div>
      </div>
    `;
    div.querySelector('.say-btn').addEventListener('click', () => decirFrances(e.fr));
    cont.appendChild(div);
  });
}

/* ───────────────────────────────────────────────
   LE COIN CULTURE (acumulativo, solo temporada 1 trae "cultura")
   ─────────────────────────────────────────────── */
function renderCulture(){
  const cont = document.getElementById('culture-list');
  const items = DATA.semanas.filter(s => s.semana <= SEMANA_ACTUAL && s.cultura);
  cont.innerHTML = '';
  if(items.length === 0){
    cont.innerHTML = '<div class="empty-state">Le Coin Culture se remplit à partir de la semaine 1.</div>';
    return;
  }
  items.slice().reverse().forEach(s => {
    const div = document.createElement('div');
    div.className = 'culture-card';
    div.innerHTML = `<h3>${s.destino}, ${s.pais}</h3><p>${s.cultura}</p>`;
    cont.appendChild(div);
  });
}

/* ───────────────────────────────────────────────
   MON CARNET DE VOYAGE (localStorage)
   ─────────────────────────────────────────────── */
const CARNET_KEY = 'carnet-voyage';

function leerCarnet(){
  try{ return JSON.parse(localStorage.getItem(CARNET_KEY)) || []; }
  catch(e){ return []; }
}
function guardarCarnet(lista){
  localStorage.setItem(CARNET_KEY, JSON.stringify(lista));
}

function renderCarnet(){
  const cont = document.getElementById('carnet-list');
  const lista = leerCarnet();
  cont.innerHTML = '';
  if(lista.length === 0){
    cont.innerHTML = '<div class="empty-state">Ton carnet est vide pour l\'instant — ajoute ton premier mot, expression ou réflexion ci-dessus.</div>';
    return;
  }
  lista.slice().reverse().forEach((item) => {
    const idxReal = lista.indexOf(item);
    const div = document.createElement('div');
    div.className = 'entry';
    div.innerHTML = `
      <div>
        <div class="vocab-fr">${item.texto}</div>
        <div class="vocab-es">${item.tipo} · ${item.fecha}</div>
      </div>
      <button class="del" aria-label="Supprimer">✕</button>
    `;
    div.querySelector('.del').addEventListener('click', () => {
      const actual = leerCarnet();
      actual.splice(idxReal, 1);
      guardarCarnet(actual);
      renderCarnet();
    });
    cont.appendChild(div);
  });
}

function initCarnetForm(){
  const form = document.getElementById('carnet-form');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const texto = document.getElementById('carnet-texto').value.trim();
    const tipo = document.getElementById('carnet-tipo').value;
    if(!texto) return;
    const lista = leerCarnet();
    lista.push({ texto, tipo, fecha: new Date().toLocaleDateString('fr-FR') });
    guardarCarnet(lista);
    document.getElementById('carnet-texto').value = '';
    renderCarnet();
  });
}

/* ───────────────────────────────────────────────
   ENTRE AMIS
   ─────────────────────────────────────────────── */
function renderEntreAmis(){
  const pregunta = PREGUNTAS_ENTRE_AMIS[SEMANA_ACTUAL] || "Quel est un souvenir que vous aimez raconter ?";
  document.getElementById('entre-amis-pregunta').textContent = pregunta;

  const key = 'entre-amis-reponse-' + SEMANA_ACTUAL;
  const textarea = document.getElementById('entre-amis-texto');
  textarea.value = localStorage.getItem(key) || '';
  textarea.addEventListener('input', () => localStorage.setItem(key, textarea.value));

  document.getElementById('entre-amis-whatsapp').addEventListener('click', () => {
    const texto = encodeURIComponent(`${pregunta}\n\n${textarea.value}`);
    window.open(`https://wa.me/?text=${texto}`, '_blank');
  });
}

/* ───────────────────────────────────────────────
   ACCESSIBILITÉ — Coin Sérénité
   ─────────────────────────────────────────────── */
function initA11y(){
  const html = document.documentElement;
  const guardado = JSON.parse(localStorage.getItem('a11y-prefs') || '{}');
  if(guardado.tamano) html.classList.add(guardado.tamano);
  if(guardado.contraste) html.classList.add('contraste');
  actualizarBotonesA11y();

  document.getElementById('btn-a-normal').addEventListener('click', () => setTamano(null));
  document.getElementById('btn-a-plus').addEventListener('click', () => setTamano('confort'));
  document.getElementById('btn-a-plusplus').addEventListener('click', () => setTamano('confort-plus'));
  document.getElementById('btn-contraste').addEventListener('click', () => {
    html.classList.toggle('contraste');
    guardarPrefsA11y();
    actualizarBotonesA11y();
  });
}
function setTamano(clase){
  const html = document.documentElement;
  html.classList.remove('confort','confort-plus');
  if(clase) html.classList.add(clase);
  guardarPrefsA11y();
  actualizarBotonesA11y();
}
function guardarPrefsA11y(){
  const html = document.documentElement;
  const tamano = html.classList.contains('confort-plus') ? 'confort-plus' : (html.classList.contains('confort') ? 'confort' : null);
  localStorage.setItem('a11y-prefs', JSON.stringify({ tamano, contraste: html.classList.contains('contraste') }));
}
function actualizarBotonesA11y(){
  const html = document.documentElement;
  document.getElementById('btn-a-normal').setAttribute('aria-pressed', String(!html.classList.contains('confort') && !html.classList.contains('confort-plus')));
  document.getElementById('btn-a-plus').setAttribute('aria-pressed', String(html.classList.contains('confort')));
  document.getElementById('btn-a-plusplus').setAttribute('aria-pressed', String(html.classList.contains('confort-plus')));
  document.getElementById('btn-contraste').setAttribute('aria-pressed', String(html.classList.contains('contraste')));
}

/* ───────────────────────────────────────────────
   INIT
   ─────────────────────────────────────────────── */
async function init(){
  await cargarDatos();
  initA11y();

  renderAccueil();
  poblarSelectorSemanas();
  renderCafe(SEMANA_ACTUAL);
  activarLevelTabs();
  renderPassport();
  renderCarnet();
  initCarnetForm();
  renderEntreAmis();

  document.getElementById('expr-search').addEventListener('input', e => {
    const nivel = document.querySelector('.pill-filters button.active').dataset.nivel;
    renderExpresiones(nivel, e.target.value);
  });
  document.querySelectorAll('.pill-filters button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.pill-filters button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderExpresiones(btn.dataset.nivel, document.getElementById('expr-search').value);
    });
  });
  renderExpresiones();
  renderCulture();

  document.querySelectorAll('#tabs button, [data-goto]').forEach(el => {
    el.addEventListener('click', () => irA(el.dataset.view || el.dataset.goto));
  });

  const inicial = (location.hash || '#accueil').replace('#','');
  irA(document.getElementById('view-' + inicial) ? inicial : 'accueil');
}

document.addEventListener('DOMContentLoaded', init);
