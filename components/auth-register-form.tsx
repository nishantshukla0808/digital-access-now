'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, RotateCcw } from 'lucide-react'
import {
  signupForWebsiteDialog,
  verifyOtpForWebsiteDialog,
  resendOtpForWebsiteDialog,
} from '@/app/portal/actions'

// ---------------------------------------------------------------------------
// Website register form — used ONLY inside the register dialog.
//
// This is the WEBSITE registration: the visitor becomes a website user
// (public.website_users), NOT a portal user. There is NO role field —
// Volunteer / Chapter / Admin belong to the admin portal only, and portal
// people register as website users through this same form.
//
// Flow: form → account created + 6-digit code emailed → OTP step inside
// the dialog → on a verified code the dialog closes and the user is
// logged in on the SAME page (no navigation).
//
// If the email already belongs to a portal account, the server action
// creates the website profile on that same auth identity instead of a
// second account, and the OTP step still runs. The email IS verified by
// the OTP — but the auto sign-in then fails, because the password typed
// in this dialog is not the portal password. That case returns
// needsLogin, and the form shows a green success state with a Sign in
// button instead of a red error box.
// ---------------------------------------------------------------------------

type AuthRegisterFormProps = {
  /** Called after a verified sign-in (closes the dialog). */
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

const INFO_STYLE = {
  background: 'rgba(15,93,94,0.06)',
  border: '1px solid rgba(15,93,94,0.2)',
  color: '#0F5D5E',
} as const

export function AuthRegisterForm({ onClose }: AuthRegisterFormProps) {
  const router = useRouter()
  const [step, setStep] = useState<'form' | 'otp' | 'done'>('form')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [newsletterOptIn, setNewsletterOptIn] = useState(false)
  const [otp, setOtp] = useState('')
  const [registeredEmail, setRegisteredEmail] = useState('')
  const [registeredPassword, setRegisteredPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)
  const [pending, setPending] = useState(false)
  const [resending, setResending] = useState(false)

  async function handleSignup(event: FormEvent) {
    event.preventDefault()
    setError(null)
    setInfo(null)
    if (!fullName.trim() || !email.trim() || !password) {
      setError('All fields are required')
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    setPending(true)
    const formData = new FormData()
    formData.set('fullName', fullName.trim())
    formData.set('email', email.trim())
    formData.set('password', password)
    if (newsletterOptIn) formData.set('newsletterOptIn', 'on')
    const result = await signupForWebsiteDialog(formData)
    setPending(false)
    if (!result.ok) {
      setError(result.error || 'Something went wrong. Please try again.')
      return
    }
    setRegisteredEmail(result.email || email.trim())
    setRegisteredPassword(password)
    setStep('otp')
  }

  async function handleVerify(event: FormEvent) {
    event.preventDefault()
    setError(null)
    setInfo(null)
    if (otp.trim().length !== 6) {
      setError('Enter the 6-digit code from your email')
      return
    }
    setPending(true)
    const formData = new FormData()
    formData.set('email', registeredEmail)
    formData.set('otp', otp.trim())
    formData.set('password', registeredPassword)
    const result = await verifyOtpForWebsiteDialog(formData)
    setPending(false)
    if (!result.ok) {
      setError(result.error || 'Could not verify the code. Please try again.')
      return
    }
    if (result.needsLogin) {
      // Email verified, but the auto sign-in could not log them in (the
      // email belongs to a portal account with a different password).
      // Show the green success state with a Sign in button.
      setStep('done')
      return
    }
    // Signed in as a website user. Close the dialog and stay on the same
    // page — refresh so the page re-renders as logged in.
    onClose?.()
    router.refresh()
  }

  async function handleResend() {
    setError(null)
    setInfo(null)
    setResending(true)
    const formData = new FormData()
    formData.set('email', registeredEmail)
    const result = await resendOtpForWebsiteDialog(formData)
    setResending(false)
    if (!result.ok) {
      setError(result.error || 'Could not resend the code.')
      return
    }
    setInfo(result.message || 'New code sent! Check your inbox.')
  }

  function startOver() {
    setStep('form')
    setOtp('')
    setError(null)
    setInfo(null)
  }

  if (step === 'done') {
    return (
      <div className="space-y-5">
        <div className="rounded-lg px-4 py-3 text-sm font-medium" style={INFO_STYLE}>
          Email verified! Your website account is ready.
        </div>
        <p className="text-center text-sm" style={{ color: '#1F2933', opacity: 0.75 }}>
          Please sign in with your password to continue.
        </p>
        <a
          href="/portal/login"
          className="flex w-full items-center justify-center gap-2 h-11 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
          style={{ background: 'linear-gradient(135deg, #0F5D5E, #238C91)' }}
        >
          Sign in <ArrowRight className="size-4" />
        </a>
        <p className="text-center text-sm" style={{ color: '#1F2933', opacity: 0.55 }}>
          <button type="button" onClick={() => onClose?.()} className="font-bold hover:opacity-70" style={{ color: '#0F5D5E' }}>
            Close
          </button>
        </p>
      </div>
    )
  }

  if (step === 'otp') {
    return (
      <div className="space-y-5">
        <p className="text-center text-sm" style={{ color: '#1F2933', opacity: 0.75 }}>
          We sent a 6-digit code to{' '}
          <span className="font-semibold" style={{ color: '#1F2933' }}>{registeredEmail}</span>
        </p>

        {error && (
          <div className="rounded-lg px-4 py-3 text-sm font-medium" style={ERROR_STYLE}>{error}</div>
        )}
        {info && (
          <div className="rounded-lg px-4 py-3 text-sm font-medium" style={INFO_STYLE}>{info}</div>
        )}

        <form onSubmit={handleVerify} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold" style={{ color: '#1F2933' }} htmlFor="otp">Verification Code</label>
            <input
              id="otp" name="otp" required maxLength={6} placeholder="123456" autoFocus
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="w-full h-14 px-4 rounded-xl text-2xl font-black tracking-[0.4em] text-center outline-none"
              style={INPUT_STYLE}
            />
          </div>
          <button
            type="submit"
            disabled={pending}
            className="flex w-full items-center justify-center gap-2 h-11 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            style={{ background: 'linear-gradient(135deg, #0F5D5E, #238C91)' }}
          >
            {pending ? 'Verifying…' : <>Verify Email <ArrowRight className="size-4" /></>}
          </button>
        </form>

        <div className="pt-5" style={{ borderTop: '1px solid rgba(15,93,94,0.1)' }}>
          <p className="text-center text-sm mb-3" style={{ color: '#1F2933', opacity: 0.55 }}>Didn&apos;t receive the code?</p>
          <button
            type="button"
            onClick={handleResend}
            disabled={resending}
            className="flex items-center gap-2 text-sm font-semibold mx-auto transition-opacity hover:opacity-70 disabled:opacity-60"
            style={{ color: '#0F5D5E' }}
          >
            <RotateCcw className="size-3.5" /> {resending ? 'Sending…' : 'Resend code'}
          </button>
        </div>

        <p className="text-center text-sm" style={{ color: '#1F2933', opacity: 0.55 }}>
          Wrong email?{' '}
          <button type="button" onClick={startOver} className="font-bold hover:opacity-70" style={{ color: '#0F5D5E' }}>
            Go back
          </button>
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSignup} className="space-y-4">
      {error && (
        <div className="rounded-lg px-4 py-3 text-sm font-medium" style={ERROR_STYLE}>{error}</div>
      )}
      {info && (
        <div className="rounded-lg px-4 py-3 text-sm font-medium" style={INFO_STYLE}>{info}</div>
      )}

      {[
        { id: 'fullName', label: 'Full Name', type: 'text', placeholder: 'Your full name', value: fullName, onChange: setFullName, autoComplete: 'name' },
        { id: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com', value: email, onChange: setEmail, autoComplete: 'email' },
        { id: 'password', label: 'Password', type: 'password', placeholder: 'At least 8 characters', value: password, onChange: setPassword, autoComplete: 'new-password' },
        { id: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: 'Repeat your password', value: confirmPassword, onChange: setConfirmPassword, autoComplete: 'new-password' },
      ].map(({ id, label, type, placeholder, value, onChange, autoComplete }) => (
        <div key={id} className="space-y-1.5">
          <label className="text-sm font-semibold" style={{ color: '#1F2933' }} htmlFor={id}>{label}</label>
          <input
            id={id} name={id} type={type} required placeholder={placeholder} autoComplete={autoComplete}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-11 px-4 rounded-xl text-sm outline-none"
            style={INPUT_STYLE}
          />
        </div>
      ))}

      <label className="flex items-start gap-2.5 cursor-pointer" htmlFor="newsletterOptIn">
        <input
          id="newsletterOptIn" name="newsletterOptIn" type="checkbox"
          checked={newsletterOptIn}
          onChange={(e) => setNewsletterOptIn(e.target.checked)}
          className="mt-0.5 size-4 shrink-0 accent-[#0F5D5E]"
        />
        <span className="text-sm" style={{ color: '#1F2933', opacity: 0.75 }}>
          Send me <span className="font-semibold" style={{ color: '#1F2933', opacity: 1 }}>The Bridge</span> newsletter
        </span>
      </label>

      <button
        type="submit"
        disabled={pending}
        className="flex w-full items-center justify-center gap-2 h-11 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60 mt-2"
        style={{ background: 'linear-gradient(135deg, #0F5D5E, #238C91)' }}
      >
        {pending ? 'Creating your account…' : <>Create Account <ArrowRight className="size-4" /></>}
      </button>

      <p className="text-center text-xs leading-relaxed" style={{ color: '#1F2933', opacity: 0.5 }}>
        By creating an account, you agree to Digital Access Now&apos;s Terms of Service and Privacy Policy.
      </p>
    </form>
  )
}
