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

  const service = createServiceClient()

  // Fetch user profile — check email verification and roles
  // Use service client to avoid session set-cookie delay/RLS issues in the same tick
  const { data: userData, error: fetchError } = await service
    .from('users')
    .select('role, roles, is_email_verified')
    .eq('id', data.user.id)
    .single()

  if (fetchError) {
    console.error('Failed to fetch user after login:', fetchError)
  }

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
  // Portal signup only. Admin is NEVER self-chosen at registration — an
  // admin grants it later from the admin users page. Reject it outright
  // (the form no longer offers it, but the server must not trust that).
  const submittedRole = (formData.get('role') as string) || 'VOLUNTEER'
  if (submittedRole === 'ADMIN') {
    redirect('/portal/register?error=Admin+accounts+are+created+by+an+administrator.+Please+choose+Chapter+Lead+or+Volunteer.')
  }
  const role = submittedRole === 'CHAPTER' ? 'CHAPTER' : 'VOLUNTEER'
  // Newsletter opt-in (The Bridge). Unchecked checkboxes submit nothing,
  // so only an explicit tick counts as consent.
  const newsletterOptIn = formData.get('newsletterOptIn') === 'on'

  if (!email || !password || !fullName) {
    redirect('/portal/register?error=All+fields+are+required')
  }

  const service = createServiceClient()

  // Use admin.createUser instead of signUp — the admin API creates users silently
  // without triggering any Supabase confirmation email whatsoever.
  // email_confirm: false so Supabase marks the user unconfirmed; we confirm
  // it ourselves via admin.updateUserById in verifyOtp after the OTP code.
  const { data: signupData, error: signupError } = await service.auth.admin.createUser({
    email,
    password,
    email_confirm: false, // Supabase marks unconfirmed — blocks signIn until we call admin.updateUserById after OTP
    user_metadata: { full_name: fullName, role },
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

  // Record the newsletter choice on the profile row. The users row is
  // created by the handle_new_user trigger during createUser above.
  // If the columns don't exist yet (supabase/add-newsletter-optin.sql
  // not run), log and continue — registration must not fail over this.
  if (newsletterOptIn) {
    const { error: optInError } = await service
      .from('users')
      .update({ newsletter_opt_in: true, newsletter_opt_in_at: new Date().toISOString() })
      .eq('id', userId)
    if (optInError) {
      console.error('Newsletter opt-in update failed (run supabase/add-newsletter-optin.sql):', optInError)
    }
  }

  // Send the OTP via Resend
  await sendOtpEmail(email, fullName, otp)

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

  // Mark OTP as used and user as verified in our table
  await service
    .from('email_verifications')
    .update({ used_at: new Date().toISOString() })
    .eq('id', verification.id)

  await service
    .from('users')
    .update({ is_email_verified: true })
    .eq('id', userData.id)

  // CRITICAL: Also confirm email in Supabase Auth itself.
  // Without this, signInWithPassword returns "Email not confirmed" regardless of our custom flag.
  await service.auth.admin.updateUserById(userData.id, {
    email_confirm: true,
  })

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

// ─── WEBSITE SIGNUP (dialog variants — no redirects) ─────────────────────
// Website visitors register as WEBSITE users (public.website_users), not
// portal users. These three mirror signup / verifyOtp / resendOtp step for
// step (same OTP table, same Resend email, same 10-minute expiry) but:
//   - they create NO portal users row (the gated handle_new_user trigger
//     skips account_type = 'website'; see supabase/add-website-users.sql),
//   - they return result objects instead of redirecting, so the dialog can
//     show the OTP step inside itself and sign the user in on the same page.
// Deliberately duplicated rather than refactored: the live redirect flows
// stay byte-identical. Extract a shared helper later, once the dialog flow
// is proven live.
// ────────────────────────────────────────────────────────────────────────────

// ─── SIGNUP (website dialog variant) ───────────────────────────────────────
export async function signupForWebsiteDialog(
  formData: FormData
): Promise<{ ok: boolean; email?: string; error?: string }> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('fullName') as string
  // Newsletter opt-in (The Bridge). Unchecked checkboxes submit nothing,
  // so only an explicit tick counts as consent.
  const newsletterOptIn = formData.get('newsletterOptIn') === 'on'

  if (!email || !password || !fullName) {
    return { ok: false, error: 'All fields are required' }
  }

  const service = createServiceClient()

  // Already a website user? Point them at sign-in instead of failing
  // cryptically on a duplicate email below.
  const { data: existingWebsite } = await service
    .from('website_users')
    .select('id')
    .eq('email', email)
    .single()
  if (existingWebsite) {
    return { ok: false, error: 'An account with this email already exists. Please sign in instead.' }
  }

  // Create the auth identity. account_type = 'website' is the marker the
  // gated handle_new_user trigger reads: with it, NO portal users row is
  // created. No role is passed at all — roles belong to the portal only.
  const { data: signupData, error: signupError } = await service.auth.admin.createUser({
    email,
    password,
    email_confirm: false, // Unconfirmed until the OTP step; confirmed in verifyOtpForWebsiteDialog.
    user_metadata: { full_name: fullName, account_type: 'website' },
  })

  let userId = signupData.user?.id

  if (signupError || !userId) {
    // This email may already belong to a PORTAL account (a volunteer,
    // chapter lead or admin registering as a website user too). Auth
    // identities are unique per email, so a second account is impossible —
    // instead, create the website profile on the SAME auth identity.
    // Supabase's duplicate message is "A user with this email address
    // has already been registered" — note "already BEEN registered", so
    // the match must allow words between "already" and "registered".
    if (signupError && /already.*registered/i.test(signupError.message)) {
      const { data: portalUser } = await service
        .from('users')
        .select('id, full_name, is_email_verified')
        .eq('email', email)
        .single()
      if (!portalUser) {
        return { ok: false, error: 'An account with this email already exists. Please sign in instead.' }
      }
      userId = portalUser.id
      const { error: linkError } = await service
        .from('website_users')
        .upsert(
          {
            id: userId,
            email,
            full_name: fullName || portalUser.full_name,
            newsletter_opt_in: newsletterOptIn,
            newsletter_opt_in_at: newsletterOptIn ? new Date().toISOString() : null,
            is_email_verified: portalUser.is_email_verified ?? false,
          },
          { onConflict: 'id', ignoreDuplicates: true },
        )
      if (linkError) {
        console.error('Website profile link failed (run supabase/add-website-users.sql):', linkError)
        return { ok: false, error: 'Could not create your website account. Please try again.' }
      }
      // Fall through to the OTP step below with the existing identity.
    } else {
      return { ok: false, error: signupError?.message || 'Account creation failed. Please try again.' }
    }
  }

  if (!userId) {
    return { ok: false, error: 'Account creation failed. Please try again.' }
  }

  // Brand-new auth user: create the website profile row.
  // (Skipped for the existing-portal-account path above, which already
  // upserted it.)
  if (!signupError) {
    const { error: profileError } = await service
      .from('website_users')
      .upsert(
        {
          id: userId,
          email,
          full_name: fullName,
          newsletter_opt_in: newsletterOptIn,
          newsletter_opt_in_at: newsletterOptIn ? new Date().toISOString() : null,
          is_email_verified: false,
        },
        { onConflict: 'id', ignoreDuplicates: true },
      )
    if (profileError) {
      // Most likely the website_users table does not exist yet — the SQL
      // file was not run. Remove the just-created auth user so the visitor
      // can retry cleanly once it is run, instead of hitting
      // "already registered" with no profile row.
      console.error('Website profile insert failed (run supabase/add-website-users.sql):', profileError)
      await service.auth.admin.deleteUser(userId).catch(() => {})
      return { ok: false, error: 'Could not create your website account. Please try again.' }
    }

    // Safety net for the window before supabase/add-website-users.sql is
    // run: the OLD trigger creates a portal users row for every signup.
    // A brand-new auth id can only have a portal row from that trigger, so
    // removing it is safe. With the gated trigger live this deletes 0 rows.
    await service.from('users').delete().eq('id', userId)
  }

  // Generate OTP and store it (same table and rules as the portal flow).
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

  return { ok: true, email }
}

// ─── VERIFY OTP (website dialog variant — verifies AND signs in) ───────────
export async function verifyOtpForWebsiteDialog(
  formData: FormData
): Promise<{ ok: boolean; error?: string }> {
  const email = formData.get('email') as string
  const otp = formData.get('otp') as string
  const password = formData.get('password') as string

  if (!email || !otp) {
    return { ok: false, error: 'Please enter your verification code' }
  }

  const service = createServiceClient()
  const supabase = await createClient()

  // Website profile — NOT the portal users table.
  const { data: websiteUser } = await service
    .from('website_users')
    .select('id')
    .eq('email', email)
    .single()

  if (!websiteUser) {
    return { ok: false, error: 'Account not found' }
  }

  // Find valid OTP (same table and rules as the portal flow).
  const { data: verification } = await service
    .from('email_verifications')
    .select('*')
    .eq('user_id', websiteUser.id)
    .eq('otp', otp)
    .eq('type', 'signup')
    .is('used_at', null)
    .gt('expires_at', new Date().toISOString())
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (!verification) {
    return { ok: false, error: 'Invalid or expired code. Please try again.' }
  }

  // Mark OTP as used and the website profile as verified.
  await service
    .from('email_verifications')
    .update({ used_at: new Date().toISOString() })
    .eq('id', verification.id)

  await service
    .from('website_users')
    .update({ is_email_verified: true })
    .eq('id', websiteUser.id)

  // CRITICAL: Also confirm email in Supabase Auth itself.
  // Without this, signInWithPassword returns "Email not confirmed".
  await service.auth.admin.updateUserById(websiteUser.id, {
    email_confirm: true,
  })

  // Sign the user in on this same page — no navigation.
  // The password is the one they just registered with.
  if (!password) {
    return { ok: false, error: 'Email verified! Please sign in from the login page.' }
  }
  const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
  if (signInError) {
    console.error('Sign-in after OTP verify failed:', signInError)
    return { ok: false, error: 'Email verified! Please sign in from the login page.' }
  }

  return { ok: true }
}

// ─── RESEND OTP (website dialog variant) ───────────────────────────────────
export async function resendOtpForWebsiteDialog(
  formData: FormData
): Promise<{ ok: boolean; error?: string; message?: string }> {
  const email = formData.get('email') as string

  if (!email) {
    return { ok: false, error: 'Email is required' }
  }

  const service = createServiceClient()

  const { data: websiteUser } = await service
    .from('website_users')
    .select('id, full_name')
    .eq('email', email)
    .single()

  if (!websiteUser) {
    return { ok: false, error: 'Account not found' }
  }

  const otp = generateOTP()
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString()

  await service.from('email_verifications').insert({
    user_id: websiteUser.id,
    email,
    otp,
    type: 'signup',
    expires_at: expiresAt,
  })

  await sendOtpEmail(email, websiteUser.full_name || 'there', otp)

  return { ok: true, message: 'New code sent! Check your inbox.' }
}

