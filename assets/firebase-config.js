/* ═══════════════════════════════════════════════════════════
   CONFIGURACIÓN DE FIREBASE
   ═══════════════════════════════════════════════════════════

   Pega aquí los datos de tu proyecto. Mientras estén vacíos, el
   portal funciona en MODO DEMOSTRACIÓN: se puede recorrer entero
   con datos de prueba, pero no guarda nada real.

   Cómo obtenerlos (unos 10 minutos, una sola vez):

     1. Entra en https://console.firebase.google.com y pulsa
        «Crear un proyecto». Llámalo por ejemplo "vive-el-frances".
        Puedes desactivar Google Analytics.

     2. Dentro del proyecto, en el icono </> («Web»), registra una
        aplicación. Copia el bloque firebaseConfig que te muestra
        y pega sus valores abajo.

     3. En el menú «Compilación → Authentication → Sign-in method»,
        habilita estos dos proveedores:
              · Google
              · Correo electrónico/contraseña

     4. En «Compilación → Firestore Database», pulsa «Crear base de
        datos» y elige el modo de producción.

     5. En «Authentication → Settings → Dominios autorizados»,
        añade:  migueltillero-ship-it.github.io

   Estos datos son públicos por diseño: identifican tu proyecto, no
   dan acceso a él. Quien protege la información son las reglas de
   Firestore, que están en herramientas/reglas-firestore.txt.
   ═══════════════════════════════════════════════════════════ */

window.FIREBASE_CONFIG = {
  apiKey:            "",
  authDomain:        "",
  projectId:         "",
  storageBucket:     "",
  messagingSenderId: "",
  appId:             ""
};

/* Correos con acceso al panel de administración.
   El resto de cuentas entran como estudiantes. */
window.ADMINS = [
  "direccionsancristobal@alianzafr.edu.mx"
];
