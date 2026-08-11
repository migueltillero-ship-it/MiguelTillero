/**
 * RESPALDO EN LA NUBE — Registro de asistencia · Prof. Miguel Tillero
 *
 * Cómo instalarlo (una sola vez, ~5 minutos):
 *  1. Crea una hoja de cálculo nueva en Google Drive (sheets.new)
 *     y ponle nombre, p. ej. «Registro de clases».
 *  2. En la hoja: Extensiones → Apps Script.
 *  3. Borra el contenido del editor y pega TODO este archivo. Guarda.
 *  4. Botón «Implementar» → «Nueva implementación» → tipo «Aplicación web»:
 *       · Ejecutar como: Tú (tu cuenta)
 *       · Quién tiene acceso: Cualquier persona
 *     → «Implementar» y autoriza los permisos.
 *  5. Copia la «URL de la aplicación web» (termina en /exec) y pégala en
 *     el panel de registro → botón «Nube».
 *
 * La URL funciona como llave: no la compartas. Los datos quedan solo en
 * TU hoja de Google Drive, en las pestañas «Alumnos» y «Clases» (legibles)
 * y «_datos» (copia técnica que usa el panel).
 */

function doGet() {
  return out_(readDb_());
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var raw = e.postData.contents;
    var data = JSON.parse(raw);
    if (!data || !data.contracts) throw new Error('Formato no válido');
    writeDb_(raw);
    rebuild_(data);
    return out_(JSON.stringify({ ok: true, savedAt: new Date().toISOString() }));
  } catch (err) {
    return out_(JSON.stringify({ ok: false, error: String(err) }));
  } finally {
    lock.releaseLock();
  }
}

function out_(s) {
  return ContentService.createTextOutput(s).setMimeType(ContentService.MimeType.JSON);
}

function sheet_(name) {
  var ss = SpreadsheetApp.getActive();
  return ss.getSheetByName(name) || ss.insertSheet(name);
}

/* La copia técnica se trocea en celdas (límite de 50k caracteres por celda) */
function writeDb_(raw) {
  var sh = sheet_('_datos');
  sh.clear();
  var chunks = [];
  for (var i = 0; i < raw.length; i += 40000) chunks.push([raw.slice(i, i + 40000)]);
  sh.getRange(1, 1, chunks.length, 1).setValues(chunks);
  try { sh.hideSheet(); } catch (e) {}
}

function readDb_() {
  var ss = SpreadsheetApp.getActive();
  var sh = ss.getSheetByName('_datos');
  if (!sh || sh.getLastRow() === 0) return '{"contracts":[]}';
  return sh.getRange(1, 1, sh.getLastRow(), 1).getValues()
    .map(function (r) { return r[0]; }).join('');
}

/* Pestañas legibles para consultar desde cualquier lugar */
function rebuild_(data) {
  var stLbl = {
    present: 'Presente',
    unjustified_absence: 'Falta injustificada',
    justified_absence: 'Falta justificada',
    makeup_scheduled: 'Reposición pendiente'
  };

  var a = sheet_('Alumnos');
  a.clear();
  var rows = [['Alumno', 'WhatsApp', 'Correo', 'Horas contratadas', 'Horas consumidas', 'Saldo', 'Inicio', 'Fin proyectado']];
  (data.contracts || []).forEach(function (c) {
    var cons = (c.sessions || []).reduce(function (t, s) {
      return t + ((s.status === 'present' || s.status === 'unjustified_absence') ? Number(s.dur) : 0);
    }, 0);
    rows.push([c.name, c.phone || '', c.email || '', c.totalHours, cons, c.totalHours - cons, c.startDate, c.projectedEnd]);
  });
  a.getRange(1, 1, rows.length, rows[0].length).setValues(rows);
  a.setFrozenRows(1);

  var s = sheet_('Clases');
  s.clear();
  var r2 = [['Alumno', 'Fecha', 'Asistencia', 'Horas', 'Resolución']];
  (data.contracts || []).forEach(function (c) {
    (c.sessions || []).forEach(function (x) {
      var res = x.resolution
        ? (x.resolution.flow === 'A' ? 'Flujo A · repos. ' + (x.resolution.makeupDate || '') : 'Flujo B · fin → ' + (x.resolution.newEnd || ''))
        : '';
      r2.push([c.name, x.date, stLbl[x.status] || x.status, x.dur, res]);
    });
  });
  s.getRange(1, 1, r2.length, r2[0].length).setValues(r2);
  s.setFrozenRows(1);
}
