'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

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

  // Fetch role to redirect correctly
  const { data: userData } = await supabase
    .from('users')
    .select('role')
    .eq('id', data.user.id)
    .single()

  revalidatePath('/', 'layout')

  const role = userData?.role || 'VOLUNTEER'
  if (role === 'ADMIN') redirect('/portal/admin/dashboard')
  else if (role === 'CHAPTER') redirect('/portal/chapter/dashboard')
  else redirect('/portal/volunteer/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('fullName') as string
  const role = (formData.get('role') as string) || 'VOLUNTEER'

  if (!email || !password || !fullName) {
    redirect('/portal/register?error=All+fields+are+required')
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName, role },
    },
  })

  if (error) {
    redirect(`/portal/register?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/', 'layout')
  redirect('/portal/login?message=Check+your+email+to+confirm+your+account')
}

export async function resetPassword(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string

  if (!email) {
    redirect('/portal/forgot-password?error=Email+is+required')
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/portal/update-password`,
  })

  if (error) {
    redirect(`/portal/forgot-password?error=${encodeURIComponent(error.message)}`)
  }

  redirect('/portal/forgot-password?message=Password+reset+link+sent+to+your+email')
}

export async function updatePassword(formData: FormData) {
  const supabase = await createClient()
  const password = formData.get('password') as string

  if (!password) {
    redirect('/portal/update-password?error=Password+is+required')
  }

  const { error } = await supabase.auth.updateUser({ password })

  if (error) {
    redirect(`/portal/update-password?error=${encodeURIComponent(error.message)}`)
  }

  redirect('/portal/login?message=Password+updated+successfully')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/portal/login')
}
