'use server'

import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { authenticate, users } from './users'
import { createSession, destroySession } from './session'
import { isLocale, defaultLocale } from '@/lib/i18n/config'

/**
 * Sign-in and sign-out Server Actions.
 *
 * Server Actions rather than a route handler: Next.js protects them against
 * cross-origin invocation automatically, and the credentials never appear in a
 * URL, a fetch call in the client bundle, or the browser's network tab as a
 * separate JSON endpoint that could be probed independently.
 */

export type SignInState = { error: 'invalid' | 'locked' | null }

/* --------------------------------------------------------------------------
   Login throttling. In-memory, therefore per-process — see the same caveat on
   the contact endpoint. Keyed by IP *and* email so one attacker cannot lock a
   legitimate operator out by hammering their address from elsewhere.
   -------------------------------------------------------------------------- */

const WINDOW_MS = 15 * 60 * 1000
const MAX_ATTEMPTS = 8
const attempts = new Map<string, number[]>()

function throttled(key: string): boolean {
  const now = Date.now()
  const recent = (attempts.get(key) ?? []).filter((time) => now - time < WINDOW_MS)
  attempts.set(key, recent)
  return recent.length >= MAX_ATTEMPTS
}

function recordAttempt(key: string): void {
  const now = Date.now()
  const recent = (attempts.get(key) ?? []).filter((time) => now - time < WINDOW_MS)
  recent.push(now)
  attempts.set(key, recent)
}

export async function signIn(
  _previous: SignInState,
  formData: FormData,
): Promise<SignInState> {
  const email = String(formData.get('email') ?? '')
  const password = String(formData.get('password') ?? '')
  const rawLocale = String(formData.get('locale') ?? '')
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale

  const headerList = await headers()
  const ip = headerList.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'
  const key = `${ip}:${email.toLowerCase()}`

  if (throttled(key)) return { error: 'locked' }

  // No operators configured. Fail closed and say nothing more specific.
  if ((await users.count()) === 0) {
    console.error('[auth] sign-in attempted but ADMIN_ACCOUNTS is empty or unset.')
    recordAttempt(key)
    return { error: 'invalid' }
  }

  const account = await authenticate(email, password)
  if (!account) {
    recordAttempt(key)
    return { error: 'invalid' }
  }

  attempts.delete(key)

  await createSession({
    id: account.id,
    email: account.email,
    name: account.name,
    role: account.role,
  })

  // `redirect` throws internally to unwind — it must be outside any try/catch.
  redirect(`/${locale}/admin`)
}

export async function signOut(formData: FormData): Promise<void> {
  const rawLocale = String(formData.get('locale') ?? '')
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale

  await destroySession()
  redirect(`/${locale}/admin/login`)
}
