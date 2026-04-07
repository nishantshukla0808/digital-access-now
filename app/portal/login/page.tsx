import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { login } from '../actions'

export default async function PortalLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>
}) {
  const { error, message } = await searchParams
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f0f9ff_0%,#e8f4fd_100%)] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <img
            src="https://i.ibb.co/F4fp0JSL/logo-DAN-removebg-preview-Picsart-Ai-Image-Enhancer.png"
            alt="Digital Access Now Logo"
            className="mx-auto max-w-[200px] h-auto object-contain mb-6"
          />
          <h1 className="mt-2 text-3xl font-black tracking-tight text-gray-950">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Sign in to access your portal dashboard.
          </p>
        </div>

        {/* Login Form Card */}
        <Card className="border-[#00BCD4]/15 bg-white shadow-[0_8px_40px_rgba(0,188,212,0.10)]">
          <CardContent className="px-6 py-8">
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
            <form action={login} className="space-y-6">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-800" htmlFor="email">Email Address</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="admin@digitalaccessnow.org"
                  className="h-11 rounded-xl border-gray-200 bg-gray-50"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-gray-800" htmlFor="password">Password</label>
                  <Link href="/portal/forgot-password" className="text-xs font-semibold text-primary-blue hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Enter your password"
                  className="h-11 rounded-xl border-gray-200 bg-gray-50"
                />
              </div>

              <Button
                type="submit"
                className="h-11 w-full rounded-xl bg-primary-blue text-sm font-bold text-[#04111f] hover:bg-cyan-500 gap-2"
              >
                Sign In
                <ArrowRight className="size-4" />
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500">
              Don't have an account?{' '}
              <Link href="/portal/register" className="font-bold text-primary-blue hover:underline">
                Register here
              </Link>
            </p>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}