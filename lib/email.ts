import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = 'Digital Access Now <hello@digitalaccessnow.org>'
const SITE = 'https://www.digitalaccessnow.org'

// ─── Send OTP verification email ───────────────────────────────────────────
export async function sendOtpEmail(to: string, name: string, otp: string) {
  return resend.emails.send({
    from: FROM,
    to: [to],
    subject: 'Your Digital Access Now verification code',
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;border:1px solid #e5e7eb;border-radius:10px;overflow:hidden">
        <div style="background:#00BCD4;padding:24px;text-align:center">
          <h1 style="color:#fff;margin:0;font-size:22px;font-weight:900">Digital Access Now</h1>
        </div>
        <div style="padding:32px;background:#fff">
          <h2 style="color:#111827;margin-top:0">Verify your email</h2>
          <p style="color:#4b5563;font-size:16px">Hi ${name},</p>
          <p style="color:#4b5563;font-size:16px">Use the 6-digit code below to verify your email address. It expires in <strong>10 minutes</strong>.</p>
          <div style="text-align:center;margin:32px 0">
            <div style="display:inline-block;padding:20px 40px;background:#f0f9ff;border:2px dashed #00BCD4;border-radius:10px">
              <span style="font-size:40px;font-weight:900;letter-spacing:10px;color:#00BCD4">${otp}</span>
            </div>
          </div>
          <p style="color:#6b7280;font-size:13px;border-top:1px solid #e5e7eb;padding-top:20px;margin-top:32px">If you didn't create an account, ignore this email.</p>
        </div>
      </div>
    `,
  })
}

// ─── Send magic link email ──────────────────────────────────────────────────
export async function sendMagicLinkEmail(to: string, name: string, token: string) {
  const url = `${SITE}/api/auth/magic?token=${token}`
  return resend.emails.send({
    from: FROM,
    to: [to],
    subject: 'Your sign-in link for Digital Access Now',
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;border:1px solid #e5e7eb;border-radius:10px;overflow:hidden">
        <div style="background:#00BCD4;padding:24px;text-align:center">
          <h1 style="color:#fff;margin:0;font-size:22px;font-weight:900">Digital Access Now</h1>
        </div>
        <div style="padding:32px;background:#fff">
          <h2 style="color:#111827;margin-top:0">Your sign-in link</h2>
          <p style="color:#4b5563;font-size:16px">Hi ${name || 'there'},</p>
          <p style="color:#4b5563;font-size:16px">Click the button below to sign in. This link expires in <strong>15 minutes</strong>.</p>
          <div style="text-align:center;margin:32px 0">
            <a href="${url}" style="display:inline-block;padding:14px 28px;background:#00BCD4;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold;font-size:16px">Sign In →</a>
          </div>
          <p style="color:#6b7280;font-size:13px;border-top:1px solid #e5e7eb;padding-top:20px;margin-top:32px">If you didn't request this, ignore this email.</p>
        </div>
      </div>
    `,
  })
}

// ─── Send password reset email ─────────────────────────────────────────────
export async function sendPasswordResetEmail(to: string, name: string, otp: string) {
  return resend.emails.send({
    from: FROM,
    to: [to],
    subject: 'Reset your Digital Access Now password',
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;border:1px solid #e5e7eb;border-radius:10px;overflow:hidden">
        <div style="background:#00BCD4;padding:24px;text-align:center">
          <h1 style="color:#fff;margin:0;font-size:22px;font-weight:900">Digital Access Now</h1>
        </div>
        <div style="padding:32px;background:#fff">
          <h2 style="color:#111827;margin-top:0">Password Reset Code</h2>
          <p style="color:#4b5563;font-size:16px">Hi ${name || 'there'},</p>
          <p style="color:#4b5563;font-size:16px">Use this code to reset your password. It expires in <strong>10 minutes</strong>.</p>
          <div style="text-align:center;margin:32px 0">
            <div style="display:inline-block;padding:20px 40px;background:#f0f9ff;border:2px dashed #00BCD4;border-radius:10px">
              <span style="font-size:40px;font-weight:900;letter-spacing:10px;color:#00BCD4">${otp}</span>
            </div>
          </div>
          <p style="color:#6b7280;font-size:13px;border-top:1px solid #e5e7eb;padding-top:20px;margin-top:32px">If you didn't request this, ignore this email.</p>
        </div>
      </div>
    `,
  })
}

// ─── Send admin approval/rejection email ────────────────────────────────────
export async function sendApprovalEmail(
  to: string,
  name: string,
  itemTitle: string,
  approved: boolean,
  reason?: string
) {
  const status = approved ? 'Approved ✅' : 'Requires Revision ❌'
  const color = approved ? '#16a34a' : '#dc2626'
  return resend.emails.send({
    from: FROM,
    to: [to],
    subject: `Submission ${approved ? 'approved' : 'rejected'}: ${itemTitle}`,
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;border:1px solid #e5e7eb;border-radius:10px;overflow:hidden">
        <div style="background:#00BCD4;padding:24px;text-align:center">
          <h1 style="color:#fff;margin:0;font-size:22px;font-weight:900">Digital Access Now</h1>
        </div>
        <div style="padding:32px;background:#fff">
          <h2 style="color:${color};margin-top:0">${status}</h2>
          <p style="color:#4b5563;font-size:16px">Hi ${name || 'there'},</p>
          <p style="color:#4b5563;font-size:16px">Your submission <strong>"${itemTitle}"</strong> has been reviewed by an admin.</p>
          ${reason ? `<div style="padding:16px;background:#f9fafb;border-left:4px solid ${color};border-radius:4px;margin:16px 0"><p style="margin:0;color:#374151;font-size:14px"><strong>Admin note:</strong> ${reason}</p></div>` : ''}
          <div style="text-align:center;margin:24px 0">
            <a href="${SITE}/portal" style="display:inline-block;padding:12px 24px;background:#00BCD4;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold;font-size:14px">View in Portal →</a>
          </div>
        </div>
      </div>
    `,
  })
}
