'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { signInForWebsiteDialog } from '@/app/portal/actions'

// ---------------------------------------------------------------------------
// Website login form — used ONLY inside the login dialog.
//
// One sign-in for everyone, because Supabase Auth is shared:
//   - Portal people (public.users) are sent to their portal dashboard,
//     exactly where the portal login page (/portal/login) sends them.
//   - Verified website users (public.website_users) stay on the same
//     page — the dialog closes and the page refreshes as logged in.
//   - Unverified users get a clear error (and are signed out again).
//
// "Forgot password?" goes to the PORTAL reset flow
// (/portal/forgot-password) — there is no website reset flow yet, and
// that flow only emails portal users (it looks up public.users). A
// website-only user who forgot their password has no reset path yet;
// that is a known gap, not something this dialog fixes.
// ---------------------------------------------------------------------------

type AuthLoginFormProps = {
  /** Called after a successful sign-in (closes the dialog). */
  onClose?: () => void
}

const INPUT_STYLE = {
  background: '#FAFAF7',
  border: '1.5px solid rgba(15,93,94,0.2)',
  color: '#1F2933',
} as const

const ERROR_STYLE = {
  background: '#fef2f2',
  border: '1px solid #fecaca',
  color: '#b91c1c',
} as const

export function AuthLoginForm({ onClose }: AuthLoginFormProps) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function handleSignIn(event: FormEvent) {
    event.preventDefault()
    setError(null)
    if (!email.trim() || !password) {
      setError('Email and password are required')
      return
    }
    setPending(true)
    const formData = new FormData()
    formData.set('email', email.trim())
    formData.set('password', password)
    const result = await signInForWebsiteDialog(formData)
    setPending(false)
    if (!result.ok) {
      setError(result.error || 'Could not sign in. Please try again.')
      return
    }
    if (result.redirect) {
      // Portal user: go where the portal login sends this role.
      // The session cookie was set by the server action, so the
      // navigation carries the login like the portal login's redirect.
      onClose?.()
      router.push(result.redirect)
      return
    }
    // Verified website user: close the dialog and stay on the same
    // page — refresh so the page re-renders as logged in.
    onClose?.()
    router.refresh()
  }

  return (
    <form onSubmit={handleSignIn} className="space-y-4">
      {error && (
        <div className="rounded-lg px-4 py-3 text-sm font-medium" style={ERROR_STYLE}>{error}</div>
      )}

      <div className="space-y-1.5">
        <label className="text-sm font-semibold" style={{ color: '#1F2933' }} htmlFor="login-email">Email Address</label>
        <input
          id="login-email" name="email" type="email" required placeholder="you@example.com" autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-11 px-4 rounded-xl text-sm outline-none"
          style={INPUT_STYLE}
        />
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold" style={{ color: '#1F2933' }} htmlFor="login-password">Password</label>
          <Link href="/portal/forgot-password" className="text-xs font-semibold transition-opacity hover:opacity-70" style={{ color: '#0F5D5E' }}>
            Forgot password?
          </Link>
        </div>
        <input
          id="login-password" name="password" type="password" required placeholder="Enter your password" autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-11 px-4 rounded-xl text-sm outline-none"
          style={INPUT_STYLE}
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="flex w-full items-center justify-center gap-2 h-11 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60 mt-2"
        style={{ background: 'linear-gradient(135deg, #0F5D5E, #238C91)' }}
      >
        {pending ? 'Signing in…' : <>Sign In <ArrowRight className="size-4" /></>}
      </button>
    </form>
  )
}
