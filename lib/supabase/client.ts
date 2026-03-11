import { createClient } from '@supabase/supabase-js'
import { Database } from './types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!

/**
 * Supabase client for use in Client Components only.
 * For Server Components and Server Actions, use createServerClient() from './server'
 */
export const supabase = createClient<Database>(supabaseUrl, supabaseKey)

