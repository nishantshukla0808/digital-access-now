import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { resetPassword } from '../actions'

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>
}) {
  const { error, message } = await searchParams

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ background: '#FAFAF7' }}>
      <div className="w-full max-w-sm">
        <Link href="/portal/login" className="inline-flex items-center gap-2 text-sm font-semibold mb-8 transition-opacity hover:opacity-70" style={{ color: '#0F5D5E' }}>
          <ArrowLeft className="size-4" /> Back to login
        </Link>

        <div className="mb-6">
          <Link href="/portal">
            <img src="https://i.ibb.co/xKnvQK05/logo-DAN.jpg" alt="Digital Access Now" className="h-12 w-auto object-contain mb-5" style={{ mixBlendMode: 'normal' }} />
          </Link>
          <h1 className="text-2xl font-bold" style={{ color: '#1F2933' }}>Reset your password</h1>
          <p className="mt-1.5 text-sm" style={{ color: '#1F2933', opacity: 0.55 }}>Enter your email and we&apos;ll send a reset code.</p>
        </div>

        <div className="rounded-2xl p-7" style={{ background: '#ffffff', border: '1px solid rgba(15,93,94,0.12)' }}>
          {error && (
            <div className="mb-5 rounded-lg px-4 py-3 text-sm font-medium" style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c' }}>{error}</div>
          )}
          {message && (
            <div className="mb-5 rounded-lg px-4 py-3 text-sm font-medium" style={{ background: 'rgba(15,93,94,0.06)', border: '1px solid rgba(15,93,94,0.2)', color: '#0F5D5E' }}>{message}</div>
          )}

          <form action={resetPassword} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold" style={{ color: '#1F2933' }} htmlFor="email">Email Address</label>
              <input
                id="email" name="email" type="email" required placeholder="your@email.com"
                className="w-full h-11 px-4 rounded-xl text-sm outline-none"
                style={{ background: '#FAFAF7', border: '1.5px solid rgba(15,93,94,0.2)', color: '#1F2933' }}
              />
            </div>
            <button
              type="submit"
              className="w-full h-11 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #0F5D5E, #238C91)' }}
            >
              Send Reset Code
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
