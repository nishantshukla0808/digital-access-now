'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { AuthRegisterForm } from '@/components/auth-register-form'
import { DanLogo } from '@/components/dan-logo'
import { REGISTER_DIALOG_OPEN_EVENT } from '@/lib/register-dialog'

// ---------------------------------------------------------------------------
// Website register dialog — the registration entry point for visitors.
//
// Mounted once, inside the Navbar (which is rendered on every public page).
// It opens when anything calls openRegisterDialog() — the navbar "Join us"
// button or the AuthGatePopup Register button. The dialog holds the website
// register form, so the whole flow (form → 6-digit email code → signed in)
// happens on the same page: on a verified code the dialog closes and the
// page refreshes as logged in. No navigation to /portal/register.
//
// The Radix Dialog unmounts its content on close, so the form state resets
// on every open.
//
// This registers a WEBSITE user (public.website_users). Volunteer /
// Chapter / Admin belong to the admin portal only — portal registration
// stays on /portal/register.
// ---------------------------------------------------------------------------

export function AuthRegisterDialog() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener(REGISTER_DIALOG_OPEN_EVENT, handler)
    return () => window.removeEventListener(REGISTER_DIALOG_OPEN_EVENT, handler)
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="sm:max-w-md rounded-2xl p-7"
        style={{ background: '#ffffff', border: '1px solid rgba(15,93,94,0.12)' }}
      >
        <div className="text-center">
          <DanLogo className="mx-auto h-12 w-auto object-contain mb-5" />
        </div>

        <DialogHeader className="text-center sm:text-center">
          <DialogTitle className="text-2xl font-bold tracking-tight" style={{ color: '#1F2933' }}>
            Create your account
          </DialogTitle>
          <DialogDescription className="mt-1.5 text-sm" style={{ color: '#1F2933', opacity: 0.55 }}>
            Join Digital Access Now — subscribe to The Bridge, follow chapters and events.
          </DialogDescription>
        </DialogHeader>

        <AuthRegisterForm onClose={() => setOpen(false)} />

        <p className="mt-5 text-center text-sm" style={{ color: '#1F2933', opacity: 0.55 }}>
          Already have an account?{' '}
          <Link href="/portal/login" className="font-bold hover:opacity-70" style={{ color: '#0F5D5E' }}>
            Sign in
          </Link>
        </p>
      </DialogContent>
    </Dialog>
  )
}
