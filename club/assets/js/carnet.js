/* ════════════════════════════════════════════════
   CARNET.JS — Mon Carnet de Voyage (Cloud Firebase)
   Conectado a Firestore para guardar apuntes en la nube.
════════════════════════════════════════════════ */
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBkFBGF4iyPKTENrnHX9W8H1LWFIWFPTNw",
  authDomain: "vendredi-entre-amis.firebaseapp.com",
  projectId: "vendredi-entre-amis",
  storageBucket: "vendredi-entre-amis.firebasestorage.app",
  messagingSenderId: "428016957710",
  appId: "1:428016957710:web:48518af3a37ee005b43f5f"
};

let db;
let userId = localStorage.getItem('student_uid');
if(!userId) {
    userId = 'std_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('student_uid', userId);
}

function loadFirebase() {
    return new Promise((resolve) => {
        if (window.firebase) return resolve();
        const script1 = document.createElement('script');
        script1.src = "https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js";
        document.head.appendChild(script1);
        script1.onload = () => {
            const script2 = document.createElement('script');
            script2.src = "https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js";
            document.head.appendChild(script2);
            script2.onload = () => {
                firebase.initializeApp(FIREBASE_CONFIG);
                db = firebase.firestore();
                resolve();
            };
        };
    });
}

async function renderCarnet(listaId) {
    const cont = document.getElementById(listaId);
    if (!cont) return;
    cont.innerHTML = '<div class="empty-state">Chargement depuis le cloud... ☁️</div>';

    await loadFirebase();

    db.collection('carnets').doc(userId).collection('entries').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
        cont.innerHTML = '';
        if (snapshot.empty) {
            cont.innerHTML = '<div class="empty-state">Ton carnet est vide pour l\'instant — ajoute ton premier mot, expression ou réflexion ci-dessus.</div>';
            return;
        }
        snapshot.forEach((doc) => {
            const item = doc.data();
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
                db.collection('carnets').doc(userId).collection('entries').doc(doc.id).delete();
            });
            cont.appendChild(div);
        });
    });
}

function initCarnetForm(formId, textareaId, tipoId, listaId) {
    const form = document.getElementById(formId);
    if(!form) return;
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const texto = document.getElementById(textareaId).value.trim();
        const tipo = document.getElementById(tipoId).value;
        if (!texto) return;

        await loadFirebase();
        db.collection('carnets').doc(userId).collection('entries').add({
            texto: texto,
            tipo: tipo,
            fecha: new Date().toLocaleDateString('fr-FR'),
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        document.getElementById(textareaId).value = '';
    });
}
