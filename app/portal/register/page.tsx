import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { signup } from '../actions'

export default async function PortalRegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>
}) {
  const { error, message } = await searchParams

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ background: '#FAFAF7' }}>
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Link href="/portal">
            <img src="https://i.ibb.co/xKnvQK05/logo-DAN.jpg" alt="Digital Access Now" className="mx-auto h-12 w-auto object-contain mb-5" style={{ mixBlendMode: 'normal' }} />
          </Link>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: '#1F2933' }}>Create your account</h1>
          <p className="mt-1.5 text-sm" style={{ color: '#1F2933', opacity: 0.55 }}>Register to access your portal workspace.</p>
        </div>

        <div className="rounded-2xl p-7" style={{ background: '#ffffff', border: '1px solid rgba(15,93,94,0.12)' }}>
          {error && (
            <div className="mb-5 rounded-lg px-4 py-3 text-sm font-medium" style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c' }}>{error}</div>
          )}
          {message && (
            <div className="mb-5 rounded-lg px-4 py-3 text-sm font-medium" style={{ background: 'rgba(15,93,94,0.06)', border: '1px solid rgba(15,93,94,0.2)', color: '#0F5D5E' }}>{message}</div>
          )}

          <form action={signup} className="space-y-4">
            {[
              { id: 'fullName', name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'Your full name' },
              { id: 'email', name: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com' },
              { id: 'password', name: 'password', label: 'Password', type: 'password', placeholder: 'Create a strong password' },
            ].map(({ id, name, label, type, placeholder }) => (
              <div key={id} className="space-y-1.5">
                <label className="text-sm font-semibold" style={{ color: '#1F2933' }} htmlFor={id}>{label}</label>
                <input
                  id={id} name={name} type={type} required placeholder={placeholder}
                  className="w-full h-11 px-4 rounded-xl text-sm outline-none"
                  style={{ background: '#FAFAF7', border: '1.5px solid rgba(15,93,94,0.2)', color: '#1F2933' }}
                />
              </div>
            ))}

            <div className="space-y-1.5">
              <label className="text-sm font-semibold" style={{ color: '#1F2933' }} htmlFor="role">Role</label>
              <select
                id="role" name="role" required
                className="w-full h-11 px-4 rounded-xl text-sm outline-none"
                style={{ background: '#FAFAF7', border: '1.5px solid rgba(15,93,94,0.2)', color: '#1F2933' }}
              >
                <option value="ADMIN">Admin</option>
                <option value="CHAPTER">Chapter Lead</option>
                <option value="VOLUNTEER">Volunteer</option>
              </select>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 h-11 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90 mt-2"
              style={{ background: 'linear-gradient(135deg, #0F5D5E, #238C91)' }}
            >
              Create Account <ArrowRight className="size-4" />
            </button>
          </form>

          <p className="mt-5 text-center text-sm" style={{ color: '#1F2933', opacity: 0.55 }}>
            Already have an account?{' '}
            <Link href="/portal/login" className="font-bold hover:opacity-70" style={{ color: '#0F5D5E' }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
