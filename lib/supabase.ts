import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Lazy singleton — only initialises when first used so build succeeds without real credentials
let _publicClient: SupabaseClient | null = null
let _serverClient: SupabaseClient | null = null

export function getPublicClient(): SupabaseClient {
  if (!_publicClient) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
    if (!url.startsWith('http')) throw new Error('NEXT_PUBLIC_SUPABASE_URL is not set.')
    _publicClient = createClient(url, key)
  }
  return _publicClient
}

export function createServerClient(): SupabaseClient {
  if (!_serverClient) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
    if (!url.startsWith('http')) throw new Error('NEXT_PUBLIC_SUPABASE_URL is not set.')
    _serverClient = createClient(url, key, { auth: { persistSession: false } })
  }
  return _serverClient
}
