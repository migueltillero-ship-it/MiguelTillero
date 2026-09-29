// ────────────────────────────────────────────────────────────────────────────
// Edge Function: stripe-webhook
//
// Recibe los eventos que manda Stripe (pago completado, pago rechazado,
// reembolso) y actualiza pagos.estado — sin esto, un pago con Stripe nunca
// se marcaría como "pagado" en la plataforma, aunque el estudiante ya haya
// pagado de verdad.
//
// Variables: STRIPE_WEBHOOK_SECRET, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
// Configura el endpoint en https://dashboard.stripe.com/webhooks apuntando a:
//   https://yfrdlzveleevkjqekdoq.supabase.co/functions/v1/stripe-webhook
// ────────────────────────────────────────────────────────────────────────────

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

const WEBHOOK_SECRET = Deno.env.get('STRIPE_WEBHOOK_SECRET') ?? '';
const SUPA_URL = Deno.env.get('SUPABASE_URL') ?? '';
const SUPA_SRK = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });

  const body = await req.text();
  const sig = req.headers.get('stripe-signature') || '';

  if (WEBHOOK_SECRET) {
    const valido = await verificarFirma(body, sig, WEBHOOK_SECRET);
    if (!valido) return new Response('Firma inválida', { status: 400 });
  }

  let event: any;
  try { event = JSON.parse(body); }
  catch { return new Response('JSON inválido', { status: 400 }); }

  const sb = createClient(SUPA_URL, SUPA_SRK, { auth: { persistSession: false } });

  try {
    if (event.type === 'checkout.session.completed') {
      const s = event.data.object;
      const pagoId = s.metadata?.pago_id || null;
      await sb.from('pagos').update({
        estado: 'pagado',
        pagado_en: new Date().toISOString(),
        stripe_payment_intent: s.payment_intent,
      }).eq(pagoId ? 'id' : 'stripe_session_id', pagoId || s.id);
    } else if (event.type === 'payment_intent.payment_failed') {
      const pi = event.data.object;
      await sb.from('pagos').update({ estado: 'rechazado' }).eq('stripe_payment_intent', pi.id);
    } else if (event.type === 'charge.refunded') {
      const c = event.data.object;
      await sb.from('pagos').update({ estado: 'reembolsado' }).eq('stripe_payment_intent', c.payment_intent);
    }
    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(String((err as any)?.message ?? err), { status: 500 });
  }
});

async function verificarFirma(payload: string, signature: string, secret: string): Promise<boolean> {
  // Stripe firma con HMAC-SHA256 sobre `${timestamp}.${payload}`.
  const items = Object.fromEntries(signature.split(',').map((p) => p.split('=')));
  const t = items.t; const v1 = items.v1;
  if (!t || !v1) return false;
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sigBuf = await crypto.subtle.sign('HMAC', key, enc.encode(`${t}.${payload}`));
  const hex = Array.from(new Uint8Array(sigBuf)).map((b) => b.toString(16).padStart(2, '0')).join('');
  return hex === v1;
}
