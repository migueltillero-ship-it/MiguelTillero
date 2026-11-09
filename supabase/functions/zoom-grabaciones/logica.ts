// Lógica pura del aviso de Zoom, aparte del servidor para poder probarla sin
// red ni base de datos. Solo usa la API web estándar (crypto.subtle).

const enc = new TextEncoder();

async function hmacHex(secreto: string, mensaje: string): Promise<string> {
  const clave = await crypto.subtle.importKey('raw', enc.encode(secreto),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const firma = await crypto.subtle.sign('HMAC', clave, enc.encode(mensaje));
  return [...new Uint8Array(firma)].map(b => b.toString(16).padStart(2, '0')).join('');
}

// Comparación en tiempo constante: una comparación normal se corta en el primer
// carácter distinto y deja adivinar la firma byte a byte.
function iguales(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}

/** Zoom firma cada aviso: v0=HMAC(secreto, "v0:{marca de tiempo}:{cuerpo}"). */
export async function firmaValida(secreto: string, marca: string | null, firma: string | null,
                                  cuerpo: string, ahoraMs = Date.now()): Promise<boolean> {
  if (!secreto || !marca || !firma) return false;
  const t = Number(marca) * 1000;
  // Un aviso viejo es un aviso repetido por alguien: se rechaza pasados 5 minutos.
  if (!Number.isFinite(t) || Math.abs(ahoraMs - t) > 5 * 60 * 1000) return false;
  return iguales('v0=' + await hmacHex(secreto, `v0:${marca}:${cuerpo}`), firma);
}

/** Respuesta al reto con el que Zoom comprueba que la dirección es nuestra. */
export async function respuestaReto(secreto: string, plainToken: string) {
  return { plainToken, encryptedToken: await hmacHex(secreto, plainToken) };
}

export interface Grabacion {
  idReunion: string; uuid: string; tema: string; fechaMx: string;
  enlace: string; codigo: string | null;
}

/** Saca de un «recording.completed» lo único que hace falta, o null si no sirve. */
export function leerGrabacion(evento: any): Grabacion | null {
  const o = evento?.payload?.object;
  if (!o || !o.id || !o.uuid || typeof o.share_url !== 'string') return null;
  // Solo https: el enlace acaba en un botón que el estudiante pulsa.
  if (!/^https:\/\//i.test(o.share_url)) return null;
  const inicio = new Date(o.start_time);
  if (isNaN(inicio.getTime())) return null;
  // La fecha es la de México, no la UTC: una clase de las 19:00 es del mismo
  // día aunque en UTC ya sea el siguiente.
  const fechaMx = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Mexico_City',
    year: 'numeric', month: '2-digit', day: '2-digit' }).format(inicio);
  return { idReunion: String(o.id), uuid: String(o.uuid), tema: String(o.topic || ''),
           fechaMx, enlace: o.share_url, codigo: o.password ? String(o.password).slice(0, 80) : null };
}

export function tituloDe(fechaMx: string): string {
  const [a, m, d] = fechaMx.split('-').map(Number);
  const mes = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'][m - 1];
  return `Clase del ${d} de ${mes}`;
}
