import { createServerClient } from '@supabase/ssr'

// Use the service role key to bypass RLS for trusted server-side operations
// (OTP inserts, user verification updates, etc.)
export function createServiceClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() { return [] },
        setAll() {},
      },
    }
  )
}
