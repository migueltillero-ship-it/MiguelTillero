// Recibe el aviso de Zoom «la grabación está lista» y la publica sola en
// «Mis grabaciones» del curso que corresponde.
//
// Cómo sabe de qué curso es: el número de reunión del enlace de Zoom guardado
// en grupo_enlaces. Si no coincide con ninguno, la deja en «sin asignar» para
// que la asignes tú con un botón: nunca se pierde y nunca se publica en el
// curso equivocado.
//
// Secretos (se ponen en el panel de Supabase, nunca en este archivo):
//   ZOOM_WEBHOOK_SECRET_TOKEN  el «Secret Token» de la app de Zoom.
// SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY ya los pone Supabase.
import { createClient } from 'npm:@supabase/supabase-js@2';
import { firmaValida, leerGrabacion, respuestaReto, tituloDe } from './logica.ts';

const json = (o: unknown, status = 200) =>
  new Response(JSON.stringify(o), { status, headers: { 'Content-Type': 'application/json' } });

Deno.serve(async (req) => {
  if (req.method !== 'POST') return json({ error: 'método no permitido' }, 405);
  const secreto = Deno.env.get('ZOOM_WEBHOOK_SECRET_TOKEN') ?? '';
  const cuerpo = await req.text();

  let evento: any;
  try { evento = JSON.parse(cuerpo); } catch { return json({ error: 'cuerpo inválido' }, 400); }

  // El reto de validación lo manda Zoom al registrar la dirección.
  if (evento?.event === 'endpoint.url_validation' && evento?.payload?.plainToken && secreto) {
    return json(await respuestaReto(secreto, evento.payload.plainToken));
  }

  const ok = await firmaValida(secreto, req.headers.get('x-zm-request-timestamp'),
                               req.headers.get('x-zm-signature'), cuerpo);
  if (!ok) return json({ error: 'firma no válida' }, 401);

  if (evento.event !== 'recording.completed') return json({ ignorado: evento.event });
  const g = leerGrabacion(evento);
  if (!g) return json({ ignorado: 'sin enlace de grabación' });

  const db = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);

  // ¿De qué grupo es esta reunión? El número va dentro del enlace de Zoom.
  const { data: enlaces, error: e1 } = await db.from('grupo_enlaces')
    .select('grupo_id, enlace_zoom').like('enlace_zoom', `%/j/${g.idReunion}%`);
  if (e1) return json({ error: e1.message }, 500);   // 500: que Zoom reintente

  let cursoId: string | null = null;
  if (enlaces && enlaces.length === 1) {
    const { data: gr } = await db.from('grupos').select('curso_id').eq('id', enlaces[0].grupo_id).single();
    cursoId = gr?.curso_id ?? null;
  }

  if (cursoId) {
    const { error } = await db.from('clases_grabadas').upsert({
      curso_id: cursoId, titulo: tituloDe(g.fechaMx), fecha: g.fechaMx, enlace: g.enlace,
      codigo: g.codigo, zoom_uuid: g.uuid, origen: 'zoom',
    }, { onConflict: 'zoom_uuid', ignoreDuplicates: true });
    if (error) return json({ error: error.message }, 500);
    return json({ publicada: true });
  }

  const { error } = await db.from('grabaciones_sin_asignar').upsert({
    zoom_uuid: g.uuid, id_reunion: g.idReunion, tema: g.tema, fecha: g.fechaMx,
    enlace: g.enlace, codigo: g.codigo,
  }, { onConflict: 'zoom_uuid', ignoreDuplicates: true });
  if (error) return json({ error: error.message }, 500);
  return json({ publicada: false, motivo: 'sin curso que coincida' });
});
