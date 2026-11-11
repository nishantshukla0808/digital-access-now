'use client'

import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { AuthLoginForm } from '@/components/auth-login-form'
import { DanLogo } from '@/components/dan-logo'
import { LOGIN_DIALOG_OPEN_EVENT } from '@/lib/login-dialog'
import { openRegisterDialog } from '@/lib/register-dialog'

// ---------------------------------------------------------------------------
// Website login dialog — the sign-in entry point for everyone.
//
// Mounted once, inside the Navbar (which is rendered on every public
// page), next to the register dialog. It opens when anything calls
// openLoginDialog() — the navbar "Sign in" button, the AuthGatePopup
// "Log in" button, or the register dialog's "Sign in" link. The dialog
// holds the website login form, so the whole sign-in happens on the same
// page: a verified website user stays where they are (dialog closes,
// page refreshes as logged in); a portal user is sent to their portal
// dashboard, exactly where /portal/login sends them.
//
// The Radix Dialog unmounts its content on close, so the form state
// resets on every open. The dialog does NOT know session state — it
// always opens when asked (same known gap as the register dialog).
//
// This does NOT replace /portal/login — that page stays as the portal
// fallback. It only changes what the website's own "Sign in" buttons do.
// ---------------------------------------------------------------------------

export function AuthLoginDialog() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener(LOGIN_DIALOG_OPEN_EVENT, handler)
    return () => window.removeEventListener(LOGIN_DIALOG_OPEN_EVENT, handler)
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="sm:max-w-md max-h-[90dvh] overflow-y-auto rounded-2xl p-7"
        style={{ background: '#ffffff', border: '1px solid rgba(15,93,94,0.12)' }}
      >
        <div className="text-center">
          <DanLogo className="mx-auto h-12 w-auto object-contain mb-5" />
        </div>

        <DialogHeader className="text-center sm:text-center">
          <DialogTitle className="text-2xl font-bold tracking-tight" style={{ color: '#1F2933' }}>
            Welcome back
          </DialogTitle>
          <DialogDescription className="mt-1.5 text-sm" style={{ color: '#1F2933', opacity: 0.55 }}>
            Sign in to your Digital Access Now account.
          </DialogDescription>
        </DialogHeader>

        <AuthLoginForm onClose={() => setOpen(false)} />

        <p className="mt-5 text-center text-sm" style={{ color: '#1F2933', opacity: 0.55 }}>
          Don&apos;t have an account?{' '}
          <button
            type="button"
            onClick={() => { setOpen(false); openRegisterDialog() }}
            className="font-bold hover:opacity-70"
            style={{ color: '#0F5D5E' }}
          >
            Register
          </button>
        </p>
      </DialogContent>
    </Dialog>
  )
}
