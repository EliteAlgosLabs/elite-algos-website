import type { Metadata } from 'next'
import { COMPANY } from './brand'
import { locales, localeMeta, type Locale } from './i18n/config'
import type { Dictionary } from './i18n/dictionaries'

/**
 * Site URL.
 *
 * Read from the environment so preview and production emit correct absolute
 * URLs in canonical tags, Open Graph and the sitemap. Falls back to the real
 * domain, which is the right answer in production and harmless locally.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? COMPANY.url
).replace(/\/$/, '')

type PageKey = keyof Dictionary['meta']

/**
 * Builds a complete metadata object for a page.
 *
 * Handles the three things that are easy to get wrong and expensive to miss:
 *
 *   • `alternates.languages` — every page declares its counterpart in every
 *     other language, plus `x-default`. Without this, Google treats the English
 *     and French pages as duplicates and picks one arbitrarily.
 *   • Absolute canonical URLs — relative canonicals silently resolve against
 *     whatever host served the page, including preview domains.
 *   • Locale-correct Open Graph, so a link shared in a French context previews
 *     in French.
 */
export function buildMetadata({
  locale,
  page,
  dict,
  path,
  overrides,
}: {
  locale: Locale
  page: PageKey
  dict: Dictionary
  /** Locale-less path, e.g. `/portfolio`. */
  path: string
  overrides?: {
    title?: string
    description?: string
    image?: string
    type?: 'website' | 'article'
    publishedTime?: string
    authors?: string[]
    noIndex?: boolean
  }
}): Metadata {
  const meta = dict.meta[page]
  const title = overrides?.title ?? meta.title
  const description = overrides?.description ?? meta.description

  const cleanPath = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`
  const canonical = `${SITE_URL}/${locale}${cleanPath}`

  const languages = Object.fromEntries([
    ...locales.map((code) => [localeMeta[code].tag, `${SITE_URL}/${code}${cleanPath}`]),
    // Tells search engines which version to serve when no language matches.
    ['x-default', `${SITE_URL}/en${cleanPath}`],
  ])

  // Open Graph imagery is provided by the auto-wired `opengraph-image.tsx`
  // route (one per locale), which Next injects into the metadata for every
  // page under `(site)`. We therefore only set `images` here when a page passes
  // an explicit override (e.g. an article hero); otherwise we leave it unset so
  // Next's generated image is used rather than a hardcoded — and previously
  // non-existent — PNG path.
  const ogImageOverride = overrides?.image

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    applicationName: COMPANY.shortName,
    // The home page's title is already complete; every other page gets the
    // company appended by the template in the page's own metadata.
    alternates: { canonical, languages },
    robots: overrides?.noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
        },
    // Search engine ownership verification. Rendered in <head> on every page.
    // Bing Webmaster Tools (msvalidate.01); Google (google-site-verification)
    // is added once the GSC token is issued.
    verification: {
      other: {
        'msvalidate.01': 'A6AA40165EF7C19F629A77572FF5B785',
      },
    },
    openGraph: {
      type: overrides?.type ?? 'website',
      siteName: COMPANY.legalName,
      title,
      description,
      url: canonical,
      locale: localeMeta[locale].tag,
      alternateLocale: locales.filter((c) => c !== locale).map((c) => localeMeta[c].tag),
      ...(ogImageOverride
        ? { images: [{ url: ogImageOverride, width: 1200, height: 630, alt: title }] }
        : {}),
      ...(overrides?.publishedTime ? { publishedTime: overrides.publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(ogImageOverride ? { images: [ogImageOverride] } : {}),
    },
    authors: overrides?.authors?.map((name) => ({ name })) ?? [{ name: COMPANY.legalName }],
    creator: COMPANY.legalName,
    publisher: COMPANY.legalName,
  }
}

/**
 * Page-level metadata helper. Appends the company name to the title, which the
 * home page deliberately does not do (its title already contains it).
 */
export function buildPageMetadata(args: Parameters<typeof buildMetadata>[0]): Metadata {
  const base = buildMetadata(args)
  const raw = args.overrides?.title ?? args.dict.meta[args.page].title
  return { ...base, title: `${raw} — ${COMPANY.shortName}` }
}

/** JSON-LD for the organisation. Emitted once, on the home page. */
export function organisationJsonLd(locale: Locale, dict: Dictionary) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: COMPANY.legalName,
    alternateName: COMPANY.shortName,
    url: `${SITE_URL}/${locale}`,
    logo: `${SITE_URL}/brand/mark.svg`,
    description: dict.meta.home.description,
    email: COMPANY.email.business,
    ...(COMPANY.incorporationNumber
      ? { identifier: COMPANY.incorporationNumber }
      : {}),
    sameAs: [COMPANY.github.url],
    address: { '@type': 'PostalAddress', addressCountry: 'RW' },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: COMPANY.email.business,
        availableLanguage: locales.map((code) => localeMeta[code].label),
      },
    ],
  }
}
