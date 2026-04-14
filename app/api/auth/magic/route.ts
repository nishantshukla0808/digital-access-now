import { createServiceClient } from '@/lib/supabase/service'
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')

  if (!token) {
    return NextResponse.redirect(new URL('/portal/login?error=Invalid+sign-in+link', req.url))
  }

  const service = createServiceClient()

  // Look up the magic link token
  const { data: verification } = await service
    .from('email_verifications')
    .select('user_id, email, expires_at, used_at')
    .eq('otp', token)
    .eq('type', 'magic_link')
    .is('used_at', null)
    .gt('expires_at', new Date().toISOString())
    .limit(1)
    .single()

  if (!verification) {
    return NextResponse.redirect(new URL('/portal/login?error=This+sign-in+link+is+invalid+or+has+expired', req.url))
  }

  // Mark token as used
  await service
    .from('email_verifications')
    .update({ used_at: new Date().toISOString() })
    .eq('otp', token)

  // Generate a one-time login link via admin API
  const { data: linkData, error } = await service.auth.admin.generateLink({
    type: 'magiclink',
    email: verification.email,
  })

  if (error || !linkData?.properties?.hashed_token) {
    return NextResponse.redirect(new URL('/portal/login?error=Sign-in+failed.+Please+try+again.', req.url))
  }

  // Redirect to Supabase confirm to establish session, then onward to dashboard
  const supabaseConfirmUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/verify?token=${linkData.properties.hashed_token}&type=magiclink&redirect_to=${encodeURIComponent(new URL('/portal/dashboard', req.url).toString())}`

  return NextResponse.redirect(supabaseConfirmUrl)
}
