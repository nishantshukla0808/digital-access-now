import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Define the expected Supabase webhook payload structure
interface WebhookPayload {
  user: {
    id: string
    email: string
    user_metadata?: {
      full_name?: string
      role?: string
    }
  }
  email_data: {
    token: string
    token_hash: string
    redirect_to: string
    email_action_type: 'signup' | 'recovery' | 'magiclink' | 'invite' | 'email_change'
  }
}

export async function POST(req: Request) {
  try {
    // Supabase Auth Hooks authenticate via Bearer token in the Authorization header
    const webhookSecret = process.env.SUPABASE_WEBHOOK_SECRET
    if (!webhookSecret) {
      return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
    }

    const authHeader = req.headers.get('authorization')
    if (!authHeader || authHeader !== `Bearer ${webhookSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body: WebhookPayload = await req.json()
    const { user, email_data } = body

    if (!user || !email_data || !user.email) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }

    const { token_hash, email_action_type, redirect_to } = email_data
    
    // Construct the confirmation URL pointing to our newly created app/api/auth/confirm route
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.digitalaccessnow.org'
    const confirmUrl = `${siteUrl}/api/auth/confirm?token_hash=${token_hash}&type=${email_action_type}&next=${encodeURIComponent(redirect_to || '/portal/dashboard')}`

    let subject = ''
    let htmlContent = ''

    if (email_action_type === 'signup') {
      subject = 'Welcome to Digital Access Now - Confirm Your Email'
      htmlContent = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #00BCD4; padding: 24px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Digital Access Now</h1>
          </div>
          <div style="padding: 32px; background-color: #ffffff;">
            <h2 style="color: #111827; margin-top: 0;">Welcome aboard!</h2>
            <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">Hi ${user.user_metadata?.full_name || 'there'},</p>
            <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">Thank you for registering for the Digital Access Now portal. Your Credential ID mapping has been successfully created. We are excited to have you join our mission of closing the digital divide.</p>
            <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">Please confirm your email address to access your dashboard:</p>
            
            <div style="text-align: center; margin: 32px 0;">
              <a href="${confirmUrl}" style="display: inline-block; padding: 14px 28px; background-color: #00BCD4; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">Confirm Email</a>
            </div>
            
            <p style="color: #6b7280; font-size: 14px; margin-top: 32px; border-top: 1px solid #e5e7eb; padding-top: 24px;">If you didn't request this, please ignore this email.</p>
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
            <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">Hi ${user.user_metadata?.full_name || 'there'},</p>
            <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">We received a request to reset your password. Click the button below to securely set a new password.</p>
            
            <div style="text-align: center; margin: 32px 0;">
              <a href="${confirmUrl}" style="display: inline-block; padding: 14px 28px; background-color: #00BCD4; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">Reset Password</a>
            </div>
            
            <p style="color: #6b7280; font-size: 14px; margin-top: 32px; border-top: 1px solid #e5e7eb; padding-top: 24px;">If you didn't request this, please ignore this email.</p>
          </div>
        </div>
      `
    } else {
      // Default fallback
      subject = 'Message from Digital Access Now'
      htmlContent = `<p>Please visit this link to continue: <a href="${confirmUrl}">${confirmUrl}</a></p>`
    }

    // Attempt to send email via Resend
    // Important: While in Sandbox mode, Resend can only send to registered Dev emails.
    // The user should replace the FROM address when they attach a custom domain in Resend.
    const { data, error } = await resend.emails.send({
      from: 'Digital Access Now <hello@digitalaccessnow.org>',
      to: [user.email],
      subject: subject,
      html: htmlContent,
    })

    if (error) {
      console.error('Resend Error:', error)
      return NextResponse.json({ error }, { status: 400 })
    }

    return NextResponse.json({ message: 'Email sent successfully via Resend', data })
  } catch (err: any) {
    console.error('Hook Exception:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
