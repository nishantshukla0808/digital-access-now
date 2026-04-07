import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { updatePassword } from '../actions'

export default async function UpdatePasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f0f9ff_0%,#e8f4fd_100%)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <img
            src="https://i.ibb.co/F4fp0JSL/logo-DAN-removebg-preview-Picsart-Ai-Image-Enhancer.png"
            alt="Digital Access Now Logo"
            className="max-w-[200px] h-auto object-contain mb-6"
          />
          <h1 className="text-2xl font-black text-gray-950">Set new password</h1>
          <p className="mt-1 text-sm text-gray-500">Choose a strong password for your portal account.</p>
        </div>

        <Card className="border-[#00BCD4]/15 bg-white shadow-[0_8px_40px_rgba(0,188,212,0.10)]">
          <CardContent className="px-6 py-6">
            {error && (
              <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 font-medium">
                {error}
              </div>
            )}

            <form action={updatePassword} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-800" htmlFor="password">New Password</label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  minLength={8}
                  placeholder="At least 8 characters"
                  className="h-11 rounded-xl border-gray-200 bg-gray-50"
                />
              </div>
              <Button
                type="submit"
                className="h-11 w-full rounded-xl bg-primary-blue text-sm font-bold text-[#04111f] hover:bg-cyan-500"
              >
                Update Password
              </Button>
            </form>

            <p className="mt-5 text-center text-sm text-gray-500">
              <Link href="/portal/login" className="font-bold text-primary-blue hover:underline">
                Back to sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
