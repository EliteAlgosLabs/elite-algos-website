import type { MetadataRoute } from 'next'
import { locales, localeMeta } from '@/lib/i18n/config'
import { SITE_URL } from '@/lib/seo'

/**
 * Sitemap.
 *
 * Every URL declares its counterparts in the other languages via `alternates`,
 * which is what stops search engines treating `/en/about` and `/fr/about` as
 * competing duplicates.
 *
 * `/careers` is deliberately absent: it is `noindex` until roles are posted.
 */
type Entry = {
  path: string
  priority: number
  changeFrequency: 'weekly' | 'monthly'
  lastModified?: Date
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths: Entry[] = [
    { path: '', priority: 1, changeFrequency: 'weekly' },
    { path: '/solutions', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.6, changeFrequency: 'monthly' },
    // portfolio, insights, careers omitted while hidden from the live site
    // (2026-08-06). Restore the entries here when the pages return.
  ]

  const all: Entry[] = [...staticPaths]

  return all.flatMap((entry) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${entry.path}`,
      lastModified: entry.lastModified ?? new Date(),
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
      alternates: {
        languages: Object.fromEntries(
          locales.map((code) => [localeMeta[code].tag, `${SITE_URL}/${code}${entry.path}`]),
        ),
      },
    })),
  )
}
