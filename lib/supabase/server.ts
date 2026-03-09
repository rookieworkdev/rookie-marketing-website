import { createClient } from '@supabase/supabase-js'
import { Database } from './types'

/**
 * Creates a Supabase client for use in Server Components, Server Actions, and Route Handlers.
 * This client is optimized for server-side usage with session persistence disabled.
 */
export function createServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables')
  }

  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false, // Server doesn't need session persistence
      autoRefreshToken: false, // No need to refresh tokens on server
      detectSessionInUrl: false, // Server doesn't use URL-based auth
    },
  })
}
