/* ════════════════════════════════════════════════
   CARNET.JS — Mon Carnet de Voyage (localStorage)
   Privado por navegador/estudiante; no se sincroniza
   entre dispositivos en esta versión.
════════════════════════════════════════════════ */
const CARNET_KEY = 'carnet-voyage';

function leerCarnet() {
  try { return JSON.parse(localStorage.getItem(CARNET_KEY)) || []; }
  catch (e) { return []; }
}
function guardarCarnet(lista) {
  localStorage.setItem(CARNET_KEY, JSON.stringify(lista));
}

function renderCarnet(listaId) {
  const cont = document.getElementById(listaId);
  const lista = leerCarnet();
  cont.innerHTML = '';
  if (lista.length === 0) {
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
      renderCarnet(listaId);
    });
    cont.appendChild(div);
  });
}

function initCarnetForm(formId, textareaId, tipoId, listaId) {
  const form = document.getElementById(formId);
  form.addEventListener('submit', e => {
    e.preventDefault();
    const texto = document.getElementById(textareaId).value.trim();
    const tipo = document.getElementById(tipoId).value;
    if (!texto) return;
    const lista = leerCarnet();
    lista.push({ texto, tipo, fecha: new Date().toLocaleDateString('fr-FR') });
    guardarCarnet(lista);
    document.getElementById(textareaId).value = '';
    renderCarnet(listaId);
  });
}
