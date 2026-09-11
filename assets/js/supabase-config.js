/**
 * Configuración del cliente de Supabase.
 *
 * PASOS PARA ACTIVAR LA PLATAFORMA:
 * 1. Crea un proyecto gratuito en https://supabase.com
 * 2. Ve a Project Settings → API y copia "Project URL" y "anon public key".
 * 3. Pégalos abajo, reemplazando los placeholders.
 * 4. Ve a SQL Editor y ejecuta el contenido de /supabase/schema.sql
 *
 * Este archivo debe cargarse DESPUÉS del script del CDN de supabase-js, p. ej.:
 *   <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js"></script>
 *   <script src="/assets/js/supabase-config.js"></script>
 */
const SUPABASE_URL = 'https://TU-PROYECTO.supabase.co';
const SUPABASE_ANON_KEY = 'TU-ANON-PUBLIC-KEY';

const supabaseConfigurado = !SUPABASE_URL.includes('TU-PROYECTO') && !SUPABASE_ANON_KEY.includes('TU-ANON-PUBLIC-KEY');

let supabaseClient = null;
if (supabaseConfigurado && window.supabase) {
  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}
