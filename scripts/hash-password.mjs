#!/usr/bin/env node
/**
 * Generates a password hash for ADMIN_ACCOUNTS.
 *
 *   node scripts/hash-password.mjs 'your-password'
 *
 * Prints `salt:hash`. Paste it as the fourth field of an ADMIN_ACCOUNTS entry:
 *
 *   ADMIN_ACCOUNTS="you@elitealgoslabs.com|Your Name|founder|<paste here>"
 *
 * Pass the password as a single-quoted argument so the shell does not expand
 * `$`, `!` or backticks, and remember that it will land in your shell history —
 * prefix the command with a space if your shell is configured to skip those.
 */
import { scrypt, randomBytes } from 'node:crypto'
import { promisify } from 'node:util'

const scryptAsync = promisify(scrypt)

const password = process.argv[2]

if (!password) {
  console.error("Usage: node scripts/hash-password.mjs 'your-password'")
  process.exit(1)
}

if (password.length < 12) {
  console.error('Refusing: use at least 12 characters for an operator account.')
  process.exit(1)
}

const salt = randomBytes(16)
const derived = await scryptAsync(password, salt, 64)

console.log(`${salt.toString('hex')}:${derived.toString('hex')}`)
