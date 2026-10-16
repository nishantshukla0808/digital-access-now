import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { updatePassword } from '../actions'

export default async function ResetPasswordPage({
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
          <h1 className="text-2xl font-bold" style={{ color: '#1F2933' }}>Set new password</h1>
          <p className="mt-1.5 text-sm" style={{ color: '#1F2933', opacity: 0.55 }}>
            Enter the code sent to <span className="font-semibold" style={{ color: '#1F2933' }}>{email || 'your email'}</span>
          </p>
        </div>

        <div className="rounded-2xl p-7" style={{ background: '#ffffff', border: '1px solid rgba(15,93,94,0.12)' }}>
          {error && (
            <div className="mb-5 rounded-lg px-4 py-3 text-sm font-medium" style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c' }}>{error}</div>
          )}
          {message && (
            <div className="mb-5 rounded-lg px-4 py-3 text-sm font-medium" style={{ background: 'rgba(15,93,94,0.06)', border: '1px solid rgba(15,93,94,0.2)', color: '#0F5D5E' }}>{message}</div>
          )}

          <form action={updatePassword} className="space-y-4">
            <input type="hidden" name="email" value={email || ''} />
            <div className="space-y-1.5">
              <label className="text-sm font-semibold" style={{ color: '#1F2933' }} htmlFor="otp">Reset Code</label>
              <input
                id="otp" name="otp" required maxLength={6} placeholder="123456" autoFocus
                className="w-full h-14 px-4 rounded-xl text-2xl font-black tracking-[0.4em] text-center outline-none"
                style={{ background: '#FAFAF7', border: '1.5px solid rgba(15,93,94,0.2)', color: '#1F2933' }}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold" style={{ color: '#1F2933' }} htmlFor="password">New Password</label>
              <input
                id="password" name="password" type="password" required minLength={8} placeholder="At least 8 characters"
                className="w-full h-11 px-4 rounded-xl text-sm outline-none"
                style={{ background: '#FAFAF7', border: '1.5px solid rgba(15,93,94,0.2)', color: '#1F2933' }}
              />
            </div>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 h-11 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #0F5D5E, #238C91)' }}
            >
              Update Password <ArrowRight className="size-4" />
            </button>
          </form>

          <p className="mt-5 text-center text-sm" style={{ color: '#1F2933', opacity: 0.55 }}>
            Remembered it?{' '}
            <Link href="/portal/login" className="font-bold hover:opacity-70" style={{ color: '#0F5D5E' }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
