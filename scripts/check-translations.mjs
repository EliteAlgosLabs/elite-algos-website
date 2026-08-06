#!/usr/bin/env node
/**
 * Translation parity check.
 *
 *   node scripts/check-translations.mjs
 *
 * TypeScript already guarantees that every English key EXISTS in French — that
 * is what typing `fr` as `Dictionary` buys us. This catches the failure mode
 * types cannot see: a French key that exists but still holds the English text,
 * which is what happens when someone adds a string in a hurry and copies the
 * value across to make the build pass.
 *
 * Short strings are legitimately identical across the two languages ("Menu",
 * "Contact", "Solutions", "Infrastructure", brand names, e-mail addresses), so
 * only strings long enough to be real prose are flagged.
 *
 * Relies on Node's native TypeScript type-stripping (Node 22.6+, on by default
 * in 24). The dictionaries are plain object literals with `import type`, so
 * there is nothing for it to choke on.
 */
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

/** Below this length, an identical string is almost certainly correct. */
const MIN_FLAG_LENGTH = 25

/** Identical by design — proper nouns, addresses, codes. */
const ALLOWED_IDENTICAL = new Set([
  'Elite Algos Labs',
  'Elite Algos Labs LTD',
  'hello@elitealgoslabs.com',
  'info@elitealgoslabs.com',
  'founder@elitealgoslabs.com',
  'English · Français',
  'Company Brain',
  'Command',
  'GitHub',
])

const load = async (file) =>
  import(pathToFileURL(resolve(`src/lib/i18n/dictionaries/${file}`)).href)

const { en } = await load('en.ts')
const { fr } = await load('fr.ts')

const identical = []
const missing = []
let compared = 0

function walk(a, b, path = '') {
  for (const [key, valueA] of Object.entries(a)) {
    const here = path ? `${path}.${key}` : key
    const valueB = b?.[key]

    if (typeof valueA === 'string') {
      compared++
      if (typeof valueB !== 'string' || valueB.trim() === '') {
        missing.push(here)
      } else if (
        valueA === valueB &&
        valueA.length >= MIN_FLAG_LENGTH &&
        !ALLOWED_IDENTICAL.has(valueA)
      ) {
        identical.push({ path: here, value: valueA })
      }
    } else if (Array.isArray(valueA)) {
      valueA.forEach((item, index) => {
        if (typeof item === 'object' && item !== null) walk(item, valueB?.[index], `${here}[${index}]`)
      })
    } else if (typeof valueA === 'object' && valueA !== null) {
      walk(valueA, valueB, here)
    }
  }
}

walk(en, fr)

if (missing.length > 0) {
  console.error(`\n✖ ${missing.length} key(s) missing or empty in French:\n`)
  for (const path of missing) console.error(`  ${path}`)
}

if (identical.length > 0) {
  console.error(
    `\n✖ ${identical.length} French value(s) still identical to the English:\n`,
  )
  for (const { path, value } of identical) {
    console.error(`  ${path}`)
    console.error(`    "${value.slice(0, 78)}${value.length > 78 ? '…' : ''}"`)
  }
  console.error(
    '\n  If a string really is the same in both languages, add it to\n' +
      '  ALLOWED_IDENTICAL in this script with a reason.\n',
  )
}

if (missing.length > 0 || identical.length > 0) process.exit(1)

// The count is printed deliberately: a checker that silently compares nothing
// passes just as loudly as one that works.
console.log(
  `✓ Translation parity: ${compared} strings compared, all present and translated.`,
)
