/**
 * i18n configuration.
 *
 * Adding a language is a three-line change:
 *   1. add the code to `locales` below
 *   2. add its metadata to `localeMeta`
 *   3. create `dictionaries/<code>.ts` and register it in `dictionaries/index.ts`
 *
 * Step 3 will not compile until every single key present in English also exists
 * in the new language — the `Dictionary` type is derived from the English
 * dictionary, so parity is enforced by the compiler rather than by discipline.
 */

export const locales = ['en', 'fr'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export const localeMeta: Record<
  Locale,
  {
    /** Endonym — always show a language in its own language. */
    label: string
    /** Short form for the compact switcher. */
    short: string
    /** BCP 47 tag for `<html lang>`, `hreflang`, and `Intl` formatting. */
    tag: string
    dir: 'ltr' | 'rtl'
  }
> = {
  en: { label: 'English', short: 'EN', tag: 'en', dir: 'ltr' },
  fr: { label: 'Français', short: 'FR', tag: 'fr', dir: 'ltr' },
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

/**
 * Countries where French is an official / dominant language. A first-time
 * visitor coming from one of these lands on `/fr`; everyone else defaults to
 * English. This is a first-visit convenience only — an explicit language choice
 * (stored in a cookie) and the browser's own Accept-Language always take
 * priority over this list.
 *
 * ISO 3166-1 alpha-2 codes. Covers France, Belgium, Switzerland, Luxembourg,
 * Monaco, Québec (Canada is handled by browser language, not here) and the
 * Francophone countries of Africa most relevant to our market.
 */
const FRENCH_COUNTRIES = new Set<string>([
  'FR', 'BE', 'CH', 'LU', 'MC', // Western Europe
  'CD', 'CG', 'CI', 'CM', 'SN', 'ML', 'BF', 'NE', 'GN', 'TG', 'BJ', 'GA',
  'TD', 'CF', 'DJ', 'KM', 'MG', 'RW', 'BI', 'MR', 'GQ', // Africa (incl. Rwanda, Burundi)
  'HT', 'GP', 'MQ', 'GF', 'RE', 'YT', 'NC', 'PF', // Caribbean / overseas
])

/**
 * Best locale for a visitor from a given country code (e.g. Cloudflare's
 * `CF-IPCountry` header). Returns null when the country does not clearly map
 * to a non-default language, so the caller can fall back to Accept-Language.
 */
export function localeForCountry(country: string | null): Locale | null {
  if (!country) return null
  const code = country.trim().toUpperCase()
  if (code === 'XX' || code === 'T1' || code.length !== 2) return null // unknown / Tor
  if (FRENCH_COUNTRIES.has(code)) return 'fr'
  return null
}

/**
 * Negotiates the best locale from an `Accept-Language` header.
 *
 * Deliberately dependency-free: the full BCP 47 lookup algorithm is overkill
 * for a two-language site, and this keeps the proxy bundle small. Handles
 * quality values and falls back to the primary subtag so `fr-CA` matches `fr`.
 */
export function negotiateLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale

  const ranked = acceptLanguage
    .split(',')
    .map((part) => {
      const [tag, ...params] = part.trim().split(';')
      const q = params.find((p) => p.trim().startsWith('q='))
      const quality = q ? Number.parseFloat(q.trim().slice(2)) : 1
      return { tag: tag.trim().toLowerCase(), quality: Number.isNaN(quality) ? 0 : quality }
    })
    .filter((entry) => entry.tag.length > 0)
    .sort((a, b) => b.quality - a.quality)

  for (const { tag } of ranked) {
    if (isLocale(tag)) return tag
    const primary = tag.split('-')[0]
    if (isLocale(primary)) return primary
  }

  return defaultLocale
}
