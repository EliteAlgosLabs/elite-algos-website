import 'server-only'

import { scrypt, randomBytes, timingSafeEqual } from 'node:crypto'
import { promisify } from 'node:util'
import { isRole, type Role } from './rbac'

const scryptAsync = promisify(scrypt) as (
  password: string,
  salt: Buffer,
  keylen: number,
) => Promise<Buffer>

/**
 * Operator accounts.
 *
 * The same repository seam used for content and submissions. Today the store is
 * backed by environment variables; a database implementation satisfies the same
 * interface without touching the login flow.
 *
 * PASSWORD HANDLING
 * -----------------
 * scrypt with a per-password random salt, verified with `timingSafeEqual`.
 * scrypt is memory-hard, which is what makes it expensive to attack on GPUs,
 * and it is in Node's standard library — no native module, nothing to compile
 * in the Docker build.
 *
 * We deliberately do NOT ship a default account. An internal command center
 * with a shipped credential is a breach with a countdown on it. If no operator
 * is configured, `authenticate` always fails and the login screen says so.
 */

export type AccountRecord = {
  id: string
  email: string
  name: string
  role: Role
  /** `salt:hash`, both hex. */
  passwordHash: string
}

export interface UserStore {
  findByEmail(email: string): Promise<AccountRecord | null>
  count(): Promise<number>
}

/** Hashes a password for storage. Used by `scripts/hash-password.mjs`. */
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16)
  const derived = await scryptAsync(password, salt, 64)
  return `${salt.toString('hex')}:${derived.toString('hex')}`
}

/** Constant-time verification. Never short-circuits on a mismatched prefix. */
export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [saltHex, hashHex] = stored.split(':')
  if (!saltHex || !hashHex) return false

  try {
    const salt = Buffer.from(saltHex, 'hex')
    const expected = Buffer.from(hashHex, 'hex')
    const derived = await scryptAsync(password, salt, expected.length)
    return timingSafeEqual(derived, expected)
  } catch {
    return false
  }
}

/**
 * Parses operators from `ADMIN_ACCOUNTS`.
 *
 * Format (one account per entry, entries separated by `;`):
 *   email|Full Name|role|salt:hash
 *
 * Example:
 *   ADMIN_ACCOUNTS="founder@elitealgoslabs.com|R. Founder|founder|a1b2…:c3d4…"
 *
 * Generate the hash with:  node scripts/hash-password.mjs 'your-password'
 */
function parseAccounts(): AccountRecord[] {
  const raw = process.env.ADMIN_ACCOUNTS
  if (!raw) return []

  return raw
    .split(';')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .flatMap((entry, index) => {
      const [email, name, role, passwordHash] = entry.split('|').map((part) => part?.trim())

      if (!email || !name || !role || !passwordHash || !isRole(role)) {
        // Log and skip rather than throw: one malformed entry should not lock
        // every other operator out of the dashboard.
        console.error(
          `[auth] ADMIN_ACCOUNTS entry ${index + 1} is malformed or has an unknown role; skipping.`,
        )
        return []
      }

      return [{ id: `op-${index + 1}`, email: email.toLowerCase(), name, role, passwordHash }]
    })
}

class EnvUserStore implements UserStore {
  #accounts = parseAccounts()

  async findByEmail(email: string) {
    return this.#accounts.find((a) => a.email === email.toLowerCase().trim()) ?? null
  }

  async count() {
    return this.#accounts.length
  }
}

export const users: UserStore = new EnvUserStore()

/**
 * Verifies credentials.
 *
 * Runs the hash comparison even when the account does not exist, against a
 * dummy hash. Without that, a missing account returns measurably faster than a
 * wrong password, which leaks which email addresses are valid operators.
 */
const DUMMY_HASH =
  '00000000000000000000000000000000:' + '0'.repeat(128)

export async function authenticate(
  email: string,
  password: string,
): Promise<AccountRecord | null> {
  const account = await users.findByEmail(email)
  const valid = await verifyPassword(password, account?.passwordHash ?? DUMMY_HASH)
  return account && valid ? account : null
}
