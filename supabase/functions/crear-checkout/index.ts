// ────────────────────────────────────────────────────────────────────────────
// Edge Function: crear-checkout
//
// La invoca el panel administrativo (o el panel docente, para sus propios
// grupos) con un pago_id: crea una sesión de Stripe Checkout y guarda su
// enlace en pagos.checkout_url, listo para copiar y mandar al estudiante.
//
// Variables de entorno (se configuran con `supabase secrets set`, nunca en
// este archivo ni en el repositorio):
//   STRIPE_SECRET_KEY          → sk_test_... en pruebas, sk_live_... en real
//   SUPABASE_URL                (Supabase lo pone solo al hacer deploy)
//   SUPABASE_ANON_KEY            "        "        "        "
//   SUPABASE_SERVICE_ROLE_KEY    "        "        "        "
//   SITE_URL                   → https://migueltillero-ship-it.github.io/MiguelTillero
// ────────────────────────────────────────────────────────────────────────────

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

interface Req { pago_id: string }

const STRIPE_KEY = Deno.env.get('STRIPE_SECRET_KEY') ?? '';
const SUPA_URL   = Deno.env.get('SUPABASE_URL') ?? '';
const SUPA_ANON  = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
const SUPA_SRK   = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
const SITE_URL   = Deno.env.get('SITE_URL') ?? 'https://migueltillero-ship-it.github.io/MiguelTillero';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    if (!STRIPE_KEY) return bad('STRIPE_SECRET_KEY no configurada en los secrets de la función.', 500);

    // Solo el administrador puede generar un cobro (hoy, la pestaña Finanzas
    // solo existe en admin.html): se comprueba con el propio token de quien
    // llama, nunca confiando en el body a ciegas.
    const auth = req.headers.get('Authorization') ?? '';
    const solicitante = createClient(SUPA_URL, SUPA_ANON, {
      global: { headers: { Authorization: auth } },
      auth: { persistSession: false },
    });
    const { data: esAdmin } = await solicitante.rpc('es_admin');
    if (!esAdmin) return bad('Solo el administrador puede generar un cobro.', 403);

    const { pago_id } = await req.json() as Req;
    if (!pago_id) return bad('pago_id requerido', 400);

    const sb = createClient(SUPA_URL, SUPA_SRK, { auth: { persistSession: false } });

    const { data: pago, error: pErr } = await sb
      .from('pagos')
      .select('*, inscripciones(estudiante_id, profiles(nombre_completo))')
      .eq('id', pago_id).single();
    if (pErr || !pago) return bad('Pago no encontrado: ' + pErr?.message, 404);

    const insc = (pago as any).inscripciones;
    const { data: usuario } = await sb.auth.admin.getUserById(insc.estudiante_id);
    const email = usuario?.user?.email ?? undefined;
    const nombre = insc?.profiles?.nombre_completo ?? 'Estudiante';

    const form = new URLSearchParams();
    form.append('mode', 'payment');
    form.append('payment_method_types[0]', 'card');
    if (email) form.append('customer_email', email);
    form.append('client_reference_id', pago_id);
    form.append('success_url', `${SITE_URL}/panel-estudiante.html?pago=ok`);
    form.append('cancel_url', `${SITE_URL}/panel-estudiante.html?pago=cancelado`);
    form.append('line_items[0][price_data][currency]', (pago.moneda || 'MXN').toLowerCase());
    form.append('line_items[0][price_data][product_data][name]', pago.concepto || 'Clases de francés');
    form.append('line_items[0][price_data][product_data][description]', `Miguel Tillero · ${nombre}`);
    form.append('line_items[0][price_data][unit_amount]', Math.round(Number(pago.monto) * 100).toString());
    form.append('line_items[0][quantity]', '1');
    form.append('metadata[pago_id]', pago_id);

    const r = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${STRIPE_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: form,
    });
    const session = await r.json();
    if (!r.ok) return bad('Stripe: ' + (session?.error?.message || JSON.stringify(session)), 502);

    await sb.from('pagos').update({
      stripe_session_id: session.id,
      checkout_url: session.url,
      metodo: 'stripe',
      estado: 'procesando',
    }).eq('id', pago_id);

    return ok({ url: session.url, session_id: session.id });
  } catch (err) {
    console.error(err);
    return bad(String((err as any)?.message ?? err), 500);
  }
});

function ok(body: unknown) {
  return new Response(JSON.stringify(body), { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
}
function bad(msg: string, status: number) {
  return new Response(JSON.stringify({ error: msg }), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
}
