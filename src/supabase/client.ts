import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

/**
 * The public brochure and questionnaire must remain usable without a local
 * backend configuration.  Previously this module threw while either route was
 * being lazy-loaded, leaving Vite's loading indicator on screen forever.
 */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabasePublishableKey)

// This client is never used for a request when configuration is absent: the
// submission and admin sign-in flows check `isSupabaseConfigured` first. A
// syntactically valid fallback lets the public UI render and report the setup
// issue in context instead of failing during module evaluation.
export const supabase = createClient(
  supabaseUrl ?? 'https://unconfigured.supabase.co',
  supabasePublishableKey ?? 'unconfigured-publishable-key',
)
