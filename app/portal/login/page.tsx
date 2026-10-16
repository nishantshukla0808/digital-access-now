import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { login } from '../actions'

export default async function PortalLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>
}) {
  const { error, message } = await searchParams

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ background: '#FAFAF7' }}>
      <div className="w-full max-w-sm">

        {/* Logo + heading */}
        <div className="mb-8 text-center">
          <Link href="/portal">
            <img
              src="https://i.ibb.co/xKnvQK05/logo-DAN.jpg"
              alt="Digital Access Now"
              className="mx-auto h-14 w-auto object-contain mb-5"
              style={{ mixBlendMode: 'normal' }}
            />
          </Link>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: '#1F2933' }}>
            Sign in to your portal
          </h1>
          <p className="mt-1.5 text-sm" style={{ color: '#1F2933', opacity: 0.55 }}>
            Access your admin, chapter, or volunteer workspace.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl p-7" style={{ background: '#ffffff', border: '1px solid rgba(15,93,94,0.12)' }}>

          {/* Alerts */}
          {error && (
            <div className="mb-5 rounded-lg px-4 py-3 text-sm font-medium" style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c' }}>
              {error}
            </div>
          )}
          {message && (
            <div className="mb-5 rounded-lg px-4 py-3 text-sm font-medium" style={{ background: 'rgba(15,93,94,0.06)', border: '1px solid rgba(15,93,94,0.2)', color: '#0F5D5E' }}>
              {message}
            </div>
          )}

          <form action={login} className="space-y-5">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold" style={{ color: '#1F2933' }} htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@digitalaccessnow.org"
                className="w-full h-11 px-4 rounded-xl text-sm outline-none transition-all focus:border-[#0F5D5E]"
                style={{
                  background: '#FAFAF7',
                  border: '1.5px solid rgba(15,93,94,0.2)',
                  color: '#1F2933',
                }}
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold" style={{ color: '#1F2933' }} htmlFor="password">
                  Password
                </label>
                <Link href="/portal/forgot-password" className="text-xs font-semibold transition-opacity hover:opacity-70" style={{ color: '#0F5D5E' }}>
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Enter your password"
                className="w-full h-11 px-4 rounded-xl text-sm outline-none transition-all focus:border-[#0F5D5E]"
                style={{
                  background: '#FAFAF7',
                  border: '1.5px solid rgba(15,93,94,0.2)',
                  color: '#1F2933',
                }}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 h-11 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #0F5D5E, #238C91)' }}
            >
              Sign In <ArrowRight className="size-4" />
            </button>
          </form>

          <p className="mt-6 text-center text-sm" style={{ color: '#1F2933', opacity: 0.55 }}>
            Don&apos;t have an account?{' '}
            <Link href="/portal/register" className="font-bold transition-opacity hover:opacity-70" style={{ color: '#0F5D5E' }}>
              Register here
            </Link>
          </p>
        </div>

        {/* Back link */}
        <p className="mt-6 text-center text-xs" style={{ color: '#1F2933', opacity: 0.4 }}>
          <Link href="/" className="hover:underline">← Back to main site</Link>
        </p>
      </div>
    </div>
  )
}