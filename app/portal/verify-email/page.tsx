import Link from 'next/link'
import { ArrowRight, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { verifyOtp, resendOtp } from '../actions'

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string; error?: string; message?: string }>
}) {
  const { email, error, message } = await searchParams

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f0f9ff_0%,#e8f4fd_100%)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <img
            src="https://i.ibb.co/F4fp0JSL/logo-DAN-removebg-preview-Picsart-Ai-Image-Enhancer.png"
            alt="Digital Access Now Logo"
            className="mx-auto max-w-[200px] h-auto object-contain mb-6"
          />
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary-blue">Email Verification</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-gray-950">Check your inbox</h1>
          <p className="mt-2 text-sm text-gray-500">
            We sent a 6-digit code to{' '}
            <span className="font-semibold text-gray-800">{email || 'your email'}</span>
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

            <form action={verifyOtp} className="space-y-5">
              <input type="hidden" name="email" value={email || ''} />
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-800" htmlFor="otp">
                  6-Digit Verification Code
                </label>
                <Input
                  id="otp"
                  name="otp"
                  required
                  maxLength={6}
                  placeholder="123456"
                  className="h-14 rounded-xl border-gray-200 bg-gray-50 text-center text-2xl font-black tracking-[0.4em]"
                  autoFocus
                />
              </div>

              <Button
                type="submit"
                className="h-11 w-full rounded-xl bg-primary-blue text-sm font-bold text-[#04111f] hover:bg-cyan-500 gap-2"
              >
                Verify Email
                <ArrowRight className="size-4" />
              </Button>
            </form>

            <div className="mt-5 border-t border-gray-100 pt-5">
              <p className="text-center text-sm text-gray-500 mb-3">Didn't receive the code?</p>
              <form action={resendOtp}>
                <input type="hidden" name="email" value={email || ''} />
                <button
                  type="submit"
                  className="flex items-center gap-2 text-sm font-semibold text-primary-blue hover:underline mx-auto"
                >
                  <RotateCcw className="size-3.5" />
                  Resend verification code
                </button>
              </form>
            </div>

            <p className="mt-4 text-center text-sm text-gray-500">
              Wrong email?{' '}
              <Link href="/portal/register" className="font-bold text-primary-blue hover:underline">
                Go back
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
