import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseReadKey = supabaseServiceRoleKey ?? process.env.SUPABASE_ANON_KEY;

export function getSupabaseAdminClient() {
  if (!supabaseUrl || !supabaseReadKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseReadKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export function getSupabaseWriteClient() {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}