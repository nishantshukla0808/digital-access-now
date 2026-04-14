import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { Webhook } from 'standardwebhooks'

const resend = new Resend(process.env.RESEND_API_KEY)

// Supabase Auth Hook payload structure
// Ref: https://supabase.com/docs/guides/auth/auth-hooks/send-email-hook
interface SupabaseEmailPayload {
  user: {
    id: string
    email: string
    phone: string
    app_metadata: Record<string, unknown>
    user_metadata: {
      full_name?: string
      role?: string
    }
  }
  email_data: {
    token: string
    token_hash: string
    redirect_to: string
    email_action_type: 'signup' | 'recovery' | 'magiclink' | 'invite' | 'email_change'
    site_url: string
    token_new?: string
    token_hash_new?: string
  }
}

export async function POST(req: Request) {
  try {
    // Supabase signs the payload using standardwebhooks.
    // Strip "v1,whsec_" prefix from secret before using it.
    const rawSecret = process.env.SUPABASE_WEBHOOK_SECRET ?? ''
    const hookSecret = rawSecret.replace(/^v1,whsec_/, '')

    if (!hookSecret) {
      return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
    }

    const payload = await req.text()

    const headers = {
      'webhook-id': req.headers.get('webhook-id') ?? '',
      'webhook-timestamp': req.headers.get('webhook-timestamp') ?? '',
      'webhook-signature': req.headers.get('webhook-signature') ?? '',
    }

    let body: SupabaseEmailPayload
    try {
      const wh = new Webhook(hookSecret)
      body = wh.verify(payload, headers) as SupabaseEmailPayload
    } catch {
      console.error('Webhook signature verification failed')
      return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 401 })
    }

    const { user, email_data } = body

    if (!user?.email || !email_data?.email_action_type) {
      return NextResponse.json({ error: 'Invalid payload structure' }, { status: 400 })
    }

    const { token_hash, email_action_type } = email_data
    const siteUrl = 'https://www.digitalaccessnow.org'
    const confirmUrl = `${siteUrl}/api/auth/confirm?token_hash=${token_hash}&type=${email_action_type}&next=${encodeURIComponent('/portal/dashboard')}`

    let subject = ''
    let htmlContent = ''
    const userName = user.user_metadata?.full_name || 'there'

    if (email_action_type === 'signup') {
      subject = 'Welcome to Digital Access Now — Confirm Your Email'
      htmlContent = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #00BCD4; padding: 24px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Digital Access Now</h1>
          </div>
          <div style="padding: 32px; background-color: #ffffff;">
            <h2 style="color: #111827; margin-top: 0;">Welcome aboard, ${userName}!</h2>
            <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">Thank you for joining the Digital Access Now portal. Your unique Credential ID has been generated and your account is ready.</p>
            <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">Please confirm your email address to access your dashboard:</p>
            <div style="text-align: center; margin: 32px 0;">
              <a href="${confirmUrl}" style="display: inline-block; padding: 14px 28px; background-color: #00BCD4; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">Confirm Email →</a>
            </div>
            <p style="color: #6b7280; font-size: 14px; margin-top: 32px; border-top: 1px solid #e5e7eb; padding-top: 24px;">If you didn't request this, please ignore this email. This link expires in 1 hour.</p>
          </div>
        </div>
      `
    } else if (email_action_type === 'recovery') {
      subject = 'Reset Your Digital Access Now Password'
      htmlContent = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #00BCD4; padding: 24px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Digital Access Now</h1>
          </div>
          <div style="padding: 32px; background-color: #ffffff;">
            <h2 style="color: #111827; margin-top: 0;">Password Reset Request</h2>
            <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">Hi ${userName},</p>
            <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">We received a request to reset your password. Click below to set a new one:</p>
            <div style="text-align: center; margin: 32px 0;">
              <a href="${confirmUrl}" style="display: inline-block; padding: 14px 28px; background-color: #00BCD4; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">Reset Password →</a>
            </div>
            <p style="color: #6b7280; font-size: 14px; margin-top: 32px; border-top: 1px solid #e5e7eb; padding-top: 24px;">If you didn't request this, please ignore this email. This link expires in 1 hour.</p>
          </div>
        </div>
      `
    } else if (email_action_type === 'magiclink') {
      subject = 'Your Digital Access Now Sign-in Link'
      htmlContent = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #00BCD4; padding: 24px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Digital Access Now</h1>
          </div>
          <div style="padding: 32px; background-color: #ffffff;">
            <h2 style="color: #111827; margin-top: 0;">Your Sign-in Link</h2>
            <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">Hi ${userName}, click the button below to sign in to your portal:</p>
            <div style="text-align: center; margin: 32px 0;">
              <a href="${confirmUrl}" style="display: inline-block; padding: 14px 28px; background-color: #00BCD4; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">Sign In →</a>
            </div>
            <p style="color: #6b7280; font-size: 14px; margin-top: 32px; border-top: 1px solid #e5e7eb; padding-top: 24px;">This link expires in 1 hour. If you didn't request this, please ignore this email.</p>
          </div>
        </div>
      `
    } else {
      subject = 'Action Required — Digital Access Now'
      htmlContent = `<p>Please visit this link to continue: <a href="${confirmUrl}">${confirmUrl}</a></p>`
    }

    const { data, error } = await resend.emails.send({
      from: 'Digital Access Now <hello@digitalaccessnow.org>',
      to: [user.email],
      subject,
      html: htmlContent,
    })

    if (error) {
      console.error('Resend send error:', error)
      return NextResponse.json({ error }, { status: 500 })
    }

    return NextResponse.json({ message: 'Email dispatched', data })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('Hook exception:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
