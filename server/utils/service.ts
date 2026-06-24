/** Incializar servicio clinete de supabase */
import type { H3Event } from 'h3'
import { type SupabaseClient } from '@supabase/supabase-js';
import { createClient } from '@supabase/supabase-js';

// Cliente normal
export async function initClient(e: H3Event): Promise<SupabaseClient> {
  const config = useRuntimeConfig(e);
  return createClient(config.public.supabaseUrl, config.public.supabaseAnonKey);
}

// Cliente Admin -
export function initService(e: H3Event): SupabaseClient {
  const config = useRuntimeConfig(e);
  return createClient(
    config.public.supabaseUrl,
    config.supabaseServiceRoleKey,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
