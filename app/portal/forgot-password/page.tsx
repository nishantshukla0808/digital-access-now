import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { resetPassword } from '../actions'

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>
}) {
  const { error, message } = await searchParams

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f0f9ff_0%,#e8f4fd_100%)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link
          href="/portal/login"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-primary-blue mb-8 transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to login
        </Link>

        <div className="mb-6">
          <img
            src="https://i.ibb.co/F4fp0JSL/logo-DAN-removebg-preview-Picsart-Ai-Image-Enhancer.png"
            alt="Digital Access Now Logo"
            className="max-w-[200px] h-auto object-contain mb-6"
          />
          <h1 className="text-2xl font-black text-gray-950">Reset your password</h1>
          <p className="mt-1 text-sm text-gray-500">
            Enter your email and we'll send a secure reset link.
          </p>
        </div>

        <Card className="border-[#00BCD4]/15 bg-white shadow-[0_8px_40px_rgba(0,188,212,0.10)]">
          <CardContent className="px-6 py-6">
            {error && (
              <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 font-medium">
                {error}
              </div>
            )}
            {message && (
              <div className="mb-4 rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700 font-medium">
                {message}
              </div>
            )}

            <form action={resetPassword} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-800" htmlFor="email">Email Address</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="h-11 rounded-xl border-gray-200 bg-gray-50"
                />
              </div>
              <Button
                type="submit"
                className="h-11 w-full rounded-xl bg-primary-blue text-sm font-bold text-[#04111f] hover:bg-cyan-500"
              >
                Send Reset Link
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
