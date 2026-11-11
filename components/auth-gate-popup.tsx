'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { Mail, X } from 'lucide-react'
import { openRegisterDialog } from '@/lib/register-dialog'

// ---------------------------------------------------------------------------
// Auth gate pop-up
//
// Small modal that asks a visitor to register or log in before using a
// feature that needs an account (newsletter subscribe, portal features…).
//
// Rules (per product decision, 2026-11-12):
//  - It NEVER opens by itself. It only appears when the visitor taps a
//    gated feature (the Subscribe button below, or any other trigger that
//    renders <AuthGatePopup open={...} />).
//  - Closing it remembers the dismissal in a cookie (`dan_auth_gate_dismissed`,
//    7 days) so the visitor is not asked again on every tap.
//  - It is never shown to a logged-in user — pages decide that server-side
//    (via supabase.auth.getUser()) and simply don't render the trigger.
//  - Register opens the WEBSITE register dialog on the same page
//    (2026-11-12 rebuild). Website visitors register as website users
//    (public.website_users); /portal/register is the PORTAL registration
//    page (Volunteer / Chapter Lead only) and is not linked from here.
// ---------------------------------------------------------------------------

const DISMISSED_COOKIE = 'dan_auth_gate_dismissed'
const DISMISSED_MAX_AGE_SECONDS = 60 * 60 * 24 * 7 // 7 days

/** True when this visitor has dismissed the pop-up within the last 7 days. */
export function hasDismissedAuthGate(): boolean {
  if (typeof document === 'undefined') return false
  return document.cookie
    .split(';')
    .some((part) => part.trim().startsWith(`${DISMISSED_COOKIE}=`))
}

/** Remember the dismissal for 7 days (site-wide). */
export function dismissAuthGate(): void {
  if (typeof document === 'undefined') return
  document.cookie = `${DISMISSED_COOKIE}=1; max-age=${DISMISSED_MAX_AGE_SECONDS}; path=/; SameSite=Lax`
}

type AuthGatePopupProps = {
  /** Controlled visibility — the parent decides when it opens. */
  open: boolean
  /** Called when the pop-up is closed (X, overlay click, Escape, "Maybe later"). */
  onClose: () => void
}

/**
 * The modal itself. Renders nothing while closed. Every close path records
 * the dismissal cookie, so the visitor is not nagged again on the next tap.
 */
export function AuthGatePopup({ open, onClose }: AuthGatePopupProps) {
  const close = useCallback(() => {
    dismissAuthGate()
    onClose()
  }, [onClose])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open, close])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label="Register or log in to continue"
    >
      {/* Backdrop — click to close. */}
      <button
        type="button"
        aria-label="Close"
        onClick={close}
        className="absolute inset-0 cursor-default"
        style={{ background: 'rgba(11, 26, 26, 0.65)' }}
      />

      <div
        className="relative w-full max-w-sm rounded-2xl p-6 shadow-xl"
        style={{ background: '#ffffff', border: '1px solid #E7ECEF' }}
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close dialog"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full transition-opacity hover:opacity-70"
          style={{ color: '#1F2933', background: '#FAFAF7' }}
        >
          <X size={16} />
        </button>

        <div
          className="mb-4 flex h-11 w-11 items-center justify-center rounded-full"
          style={{ background: '#EAF7FC' }}
        >
          <Mail size={20} style={{ color: '#0F5D5E' }} />
        </div>

        <h2
          className="mb-2 pr-8 text-xl font-bold"
          style={{ color: '#0F5D5E' }}
        >
          Register or log in to continue
        </h2>
        <p
          className="mb-6 text-sm leading-relaxed"
          style={{ color: '#1F2933', opacity: 0.75 }}
        >
          Create a free account to subscribe to The Bridge and use member
          features. It only takes a minute.
        </p>

        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => {
              close()
              openRegisterDialog()
            }}
            className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-bold text-white transition-all duration-200 hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #0F5D5E, #238C91)' }}
          >
            Register
          </button>
          <Link
            href="/portal/login"
            className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-bold transition-all duration-200 hover:opacity-90"
            style={{
              background: '#ffffff',
              color: '#0F5D5E',
              border: '1px solid #0F5D5E',
            }}
          >
            Log in
          </Link>
          <button
            type="button"
            onClick={close}
            className="mt-1 text-sm font-semibold transition-opacity hover:opacity-70"
            style={{ color: '#1F2933', opacity: 0.65 }}
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  )
}

/**
 * Subscribe button for The Bridge page (logged-out visitors only).
 * Opens the pop-up on tap — unless the visitor dismissed it in the last
 * 7 days, in which case it shows a quiet inline hint with a plain link
 * instead of asking again.
 */
export function SubscribeButton() {
  const [open, setOpen] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [showHint, setShowHint] = useState(false)

  // Read the cookie client-side only, so server and client render the same
  // button on first paint (no hydration mismatch).
  useEffect(() => {
    setDismissed(hasDismissedAuthGate())
  }, [])

  const handleClick = () => {
    if (dismissed || hasDismissedAuthGate()) {
      setDismissed(true)
      setShowHint(true)
      return
    }
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    // Closed once → don't ask again on the next tap (cookie is set too).
    setDismissed(true)
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90"
        style={{ background: 'linear-gradient(135deg, #0F5D5E, #238C91)' }}
      >
        <Mail size={15} /> Subscribe to The Bridge
      </button>

      <AuthGatePopup open={open} onClose={handleClose} />

      {showHint && (
        <p
          className="mt-3 text-sm"
          style={{ color: '#1F2933', opacity: 0.75 }}
        >
          You can register any time — just tap{' '}
          <button
            type="button"
            onClick={openRegisterDialog}
            className="font-bold hover:opacity-70"
            style={{ color: '#0F5D5E' }}
          >
            Join us
          </button>{' '}
          in the menu. It only takes a minute.
        </p>
      )}
    </div>
  )
}
