import 'server-only'

import { cookies } from 'next/headers'
import { SignJWT, jwtVerify } from 'jose'
import { isRole, type Permission, type Role, can } from './rbac'

/**
 * Session management.
 *
 * A signed JWT in an httpOnly cookie. Deliberately hand-rolled rather than
 * pulled from an auth library: the requirement is a small, fixed set of internal
 * operators with role claims, and a dependency-light implementation we fully
 * understand is easier to audit than a framework configured to do one tenth of
 * what it can.
 *
 * Security properties:
 *   • httpOnly    — the token is unreachable from JavaScript, so XSS cannot
 *                   exfiltrate it
 *   • sameSite    — 'lax', which blocks cross-site POSTs (CSRF) while still
 *                   allowing normal top-level navigation into the dashboard
 *   • secure      — always on in production
 *   • HS256       — symmetric, correct for single-issuer/single-verifier
 *   • exp         — enforced by `jwtVerify`, not merely stored
 */

const COOKIE_NAME = 'eal_session'
const MAX_AGE_SECONDS = 60 * 60 * 8 // one working day
const ISSUER = 'elitealgoslabs.com'
const AUDIENCE = 'eal-command'

export type SessionUser = {
  id: string
  email: string
  name: string
  role: Role
}

/**
 * Resolves the signing secret.
 *
 * Throws rather than falling back to a default. A hard failure at boot is
 * vastly preferable to a production deployment silently signing sessions with a
 * value that is in the public repository.
 */
function secret(): Uint8Array {
  const value = process.env.AUTH_SECRET
  if (!value || value.length < 32) {
    throw new Error(
      'AUTH_SECRET is missing or too short. Set a random value of at least 32 characters — ' +
        'generate one with: openssl rand -base64 48',
    )
  }
  return new TextEncoder().encode(value)
}

export async function createSession(user: SessionUser): Promise<void> {
  const token = await new SignJWT({
    email: user.email,
    name: user.name,
    role: user.role,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(user.id)
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE_SECONDS}s`)
    .sign(secret())

  const store = await cookies()
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: MAX_AGE_SECONDS,
  })
}

export async function destroySession(): Promise<void> {
  const store = await cookies()
  store.delete(COOKIE_NAME)
}

/**
 * Returns the signed-in user, or null.
 *
 * Every failure mode — no cookie, bad signature, expired, unknown role — maps
 * to null. The caller cannot accidentally treat a malformed token as a partial
 * success.
 */
export async function getSession(): Promise<SessionUser | null> {
  const store = await cookies()
  const token = store.get(COOKIE_NAME)?.value
  if (!token) return null

  try {
    const { payload } = await jwtVerify(token, secret(), {
      issuer: ISSUER,
      audience: AUDIENCE,
      algorithms: ['HS256'],
    })

    const role = payload.role
    if (typeof role !== 'string' || !isRole(role)) return null
    if (typeof payload.sub !== 'string') return null

    return {
      id: payload.sub,
      email: typeof payload.email === 'string' ? payload.email : '',
      name: typeof payload.name === 'string' ? payload.name : '',
      role,
    }
  } catch {
    // Invalid signature, expired, wrong issuer/audience — all "not signed in".
    return null
  }
}

/** True when a signed-in user holds the permission. Server-side only. */
export async function hasPermission(permission: Permission): Promise<boolean> {
  const session = await getSession()
  return session ? can(session.role, permission) : false
}
