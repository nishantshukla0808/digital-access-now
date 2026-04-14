'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/service'
import { sendOtpEmail, sendPasswordResetEmail, sendMagicLinkEmail } from '@/lib/email'
import { cookies } from 'next/headers'
import crypto from 'crypto'

// ─── Generate a cryptographically secure 6-digit OTP ──────────────────────
function generateOTP(): string {
  return Math.floor(100000 + crypto.randomInt(900000)).toString()
}

// ─── Generate a secure random token for magic links ───────────────────────
function generateToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

// ─── LOGIN ─────────────────────────────────────────────────────────────────
export async function login(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    redirect('/portal/login?error=Email+and+password+are+required')
  }

  const { error, data } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    redirect(`/portal/login?error=${encodeURIComponent(error.message)}`)
  }

  // Fetch user profile — check email verification and roles
  const { data: userData } = await supabase
    .from('users')
    .select('role, roles, is_email_verified')
    .eq('id', data.user.id)
    .single()

  // Block login if user hasn't completed our custom OTP verification
  if (!userData?.is_email_verified) {
    await supabase.auth.signOut()
    redirect(`/portal/verify-email?email=${encodeURIComponent(email)}&error=Please+verify+your+email+first.+Check+your+inbox+for+the+verification+code.`)
  }

  revalidatePath('/', 'layout')

  const roles: string[] = userData?.roles ?? [userData?.role ?? 'VOLUNTEER']
  if (roles.includes('ADMIN')) redirect('/portal/admin/dashboard')
  else if (roles.includes('CHAPTER')) redirect('/portal/chapter/dashboard')
  else redirect('/portal/volunteer/dashboard')
}

// ─── SIGNUP (custom OTP flow) ──────────────────────────────────────────────
export async function signup(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('fullName') as string
  const role = (formData.get('role') as string) || 'VOLUNTEER'

  if (!email || !password || !fullName) {
    redirect('/portal/register?error=All+fields+are+required')
  }

  const supabase = await createClient()
  const service = createServiceClient()

  // Create the Supabase auth user (email confirmation disabled in dashboard)
  const { data: signupData, error: signupError } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName, role } },
  })

  if (signupError) {
    redirect(`/portal/register?error=${encodeURIComponent(signupError.message)}`)
  }

  const userId = signupData.user?.id
  if (!userId) {
    redirect('/portal/register?error=Account+creation+failed.+Please+try+again.')
  }

  // Generate OTP and store it
  const otp = generateOTP()
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString() // 10 minutes

  const { error: otpError } = await service.from('email_verifications').insert({
    user_id: userId,
    email,
    otp,
    type: 'signup',
    expires_at: expiresAt,
  })

  if (otpError) {
    console.error('OTP insert error:', otpError)
  }

  // Send the OTP via Resend
  await sendOtpEmail(email, fullName, otp)

  // Sign the user out so they must verify before accessing the portal
  await supabase.auth.signOut()

  redirect(`/portal/verify-email?email=${encodeURIComponent(email)}`)
}

// ─── VERIFY OTP ────────────────────────────────────────────────────────────
export async function verifyOtp(formData: FormData) {
  const email = formData.get('email') as string
  const otp = formData.get('otp') as string

  if (!email || !otp) {
    redirect(`/portal/verify-email?email=${encodeURIComponent(email)}&error=Please+enter+your+verification+code`)
  }

  const service = createServiceClient()
  const supabase = await createClient()

  // Find user by email
  const { data: userData } = await service
    .from('users')
    .select('id, role, roles')
    .eq('email', email)
    .single()

  if (!userData) {
    redirect(`/portal/verify-email?email=${encodeURIComponent(email)}&error=Account+not+found`)
  }

  // Find valid OTP
  const { data: verification } = await service
    .from('email_verifications')
    .select('*')
    .eq('user_id', userData.id)
    .eq('otp', otp)
    .eq('type', 'signup')
    .is('used_at', null)
    .gt('expires_at', new Date().toISOString())
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (!verification) {
    redirect(`/portal/verify-email?email=${encodeURIComponent(email)}&error=Invalid+or+expired+code.+Please+try+again.`)
  }

  // Mark OTP as used and user as verified
  await service
    .from('email_verifications')
    .update({ used_at: new Date().toISOString() })
    .eq('id', verification.id)

  await service
    .from('users')
    .update({ is_email_verified: true })
    .eq('id', userData.id)

  // Redirect to login with success message
  redirect('/portal/login?message=Email+verified!+You+can+now+sign+in.')
}

// ─── RESEND OTP ────────────────────────────────────────────────────────────
export async function resendOtp(formData: FormData) {
  const email = formData.get('email') as string

  if (!email) {
    redirect('/portal/login')
  }

  const service = createServiceClient()

  const { data: userData } = await service
    .from('users')
    .select('id, full_name')
    .eq('email', email)
    .single()

  if (!userData) {
    redirect(`/portal/verify-email?email=${encodeURIComponent(email)}&error=Account+not+found`)
  }

  const otp = generateOTP()
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString()

  await service.from('email_verifications').insert({
    user_id: userData.id,
    email,
    otp,
    type: 'signup',
    expires_at: expiresAt,
  })

  await sendOtpEmail(email, userData.full_name || 'there', otp)

  redirect(`/portal/verify-email?email=${encodeURIComponent(email)}&message=New+code+sent!+Check+your+inbox.`)
}

// ─── MAGIC LINK REQUEST ────────────────────────────────────────────────────
export async function requestMagicLink(formData: FormData) {
  const email = formData.get('email') as string

  if (!email) {
    redirect('/portal/login?error=Email+is+required')
  }

  const service = createServiceClient()

  const { data: userData } = await service
    .from('users')
    .select('id, full_name')
    .eq('email', email)
    .single()

  if (!userData) {
    // Don't reveal if email exists — show generic message
    redirect('/portal/login?message=If+your+email+is+registered,+a+sign-in+link+has+been+sent.')
  }

  const token = generateToken()
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString() // 15 minutes

  await service.from('email_verifications').insert({
    user_id: userData.id,
    email,
    otp: token,
    type: 'magic_link',
    expires_at: expiresAt,
  })

  await sendMagicLinkEmail(email, userData.full_name || 'there', token)

  redirect('/portal/login?message=Sign-in+link+sent!+Check+your+inbox.')
}

// ─── FORGOT PASSWORD ───────────────────────────────────────────────────────
export async function resetPassword(formData: FormData) {
  const email = formData.get('email') as string

  if (!email) {
    redirect('/portal/forgot-password?error=Email+is+required')
  }

  const service = createServiceClient()

  const { data: userData } = await service
    .from('users')
    .select('id, full_name')
    .eq('email', email)
    .single()

  if (!userData) {
    redirect('/portal/forgot-password?message=If+your+email+is+registered,+a+reset+code+has+been+sent.')
  }

  const otp = generateOTP()
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString()

  await service.from('email_verifications').insert({
    user_id: userData.id,
    email,
    otp,
    type: 'password_reset',
    expires_at: expiresAt,
  })

  await sendPasswordResetEmail(email, userData.full_name || 'there', otp)

  redirect(`/portal/reset-password?email=${encodeURIComponent(email)}&message=Reset+code+sent!+Check+your+inbox.`)
}

// ─── UPDATE PASSWORD (after OTP reset) ─────────────────────────────────────
export async function updatePassword(formData: FormData) {
  const email = formData.get('email') as string
  const otp = formData.get('otp') as string
  const password = formData.get('password') as string

  if (!email || !otp || !password) {
    redirect('/portal/reset-password?error=All+fields+are+required')
  }

  const service = createServiceClient()

  const { data: userData } = await service
    .from('users')
    .select('id')
    .eq('email', email)
    .single()

  if (!userData) {
    redirect('/portal/reset-password?error=Account+not+found')
  }

  const { data: verification } = await service
    .from('email_verifications')
    .select('id')
    .eq('user_id', userData.id)
    .eq('otp', otp)
    .eq('type', 'password_reset')
    .is('used_at', null)
    .gt('expires_at', new Date().toISOString())
    .limit(1)
    .single()

  if (!verification) {
    redirect(`/portal/reset-password?email=${encodeURIComponent(email)}&error=Invalid+or+expired+code`)
  }

  // Update password via admin API
  const { error } = await service.auth.admin.updateUserById(userData.id, { password })

  if (error) {
    redirect(`/portal/reset-password?email=${encodeURIComponent(email)}&error=${encodeURIComponent(error.message)}`)
  }

  await service
    .from('email_verifications')
    .update({ used_at: new Date().toISOString() })
    .eq('id', verification.id)

  redirect('/portal/login?message=Password+updated!+You+can+now+sign+in.')
}

// ─── LOGOUT ────────────────────────────────────────────────────────────────
export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/portal/login')
}
