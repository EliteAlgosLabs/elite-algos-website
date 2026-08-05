import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // The command center and the API surface must never be crawled. The
        // dashboard is also protected by authentication — this is defence in
        // depth, not the control itself.
        disallow: ['/api/', '/en/admin', '/fr/admin'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
