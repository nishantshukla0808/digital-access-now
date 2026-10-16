import Link from 'next/link'
import { ArrowRight, RotateCcw } from 'lucide-react'
import { verifyOtp, resendOtp } from '../actions'

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string; error?: string; message?: string }>
}) {
  const { email, error, message } = await searchParams

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ background: '#FAFAF7' }}>
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Link href="/portal">
            <img src="https://i.ibb.co/xKnvQK05/logo-DAN.jpg" alt="Digital Access Now" className="mx-auto h-12 w-auto object-contain mb-5" style={{ mixBlendMode: 'normal' }} />
          </Link>
          <h1 className="text-2xl font-bold" style={{ color: '#1F2933' }}>Check your inbox</h1>
          <p className="mt-1.5 text-sm" style={{ color: '#1F2933', opacity: 0.55 }}>
            We sent a 6-digit code to <span className="font-semibold" style={{ color: '#1F2933' }}>{email || 'your email'}</span>
          </p>
        </div>

        <div className="rounded-2xl p-7" style={{ background: '#ffffff', border: '1px solid rgba(15,93,94,0.12)' }}>
          {error && (
            <div className="mb-5 rounded-lg px-4 py-3 text-sm font-medium" style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c' }}>{error}</div>
          )}
          {message && (
            <div className="mb-5 rounded-lg px-4 py-3 text-sm font-medium" style={{ background: 'rgba(15,93,94,0.06)', border: '1px solid rgba(15,93,94,0.2)', color: '#0F5D5E' }}>{message}</div>
          )}

          <form action={verifyOtp} className="space-y-5">
            <input type="hidden" name="email" value={email || ''} />
            <div className="space-y-1.5">
              <label className="text-sm font-semibold" style={{ color: '#1F2933' }} htmlFor="otp">Verification Code</label>
              <input
                id="otp" name="otp" required maxLength={6} placeholder="123456" autoFocus
                className="w-full h-14 px-4 rounded-xl text-2xl font-black tracking-[0.4em] text-center outline-none"
                style={{ background: '#FAFAF7', border: '1.5px solid rgba(15,93,94,0.2)', color: '#1F2933' }}
              />
            </div>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 h-11 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #0F5D5E, #238C91)' }}
            >
              Verify Email <ArrowRight className="size-4" />
            </button>
          </form>

          <div className="mt-5 pt-5" style={{ borderTop: '1px solid rgba(15,93,94,0.1)' }}>
            <p className="text-center text-sm mb-3" style={{ color: '#1F2933', opacity: 0.55 }}>Didn&apos;t receive the code?</p>
            <form action={resendOtp}>
              <input type="hidden" name="email" value={email || ''} />
              <button type="submit" className="flex items-center gap-2 text-sm font-semibold mx-auto transition-opacity hover:opacity-70" style={{ color: '#0F5D5E' }}>
                <RotateCcw className="size-3.5" /> Resend code
              </button>
            </form>
          </div>

          <p className="mt-4 text-center text-sm" style={{ color: '#1F2933', opacity: 0.55 }}>
            Wrong email?{' '}
            <Link href="/portal/register" className="font-bold hover:opacity-70" style={{ color: '#0F5D5E' }}>Go back</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
