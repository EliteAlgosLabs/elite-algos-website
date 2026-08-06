import { ImageResponse } from 'next/og'
import { COMPANY, PALETTE } from '@/lib/brand'
import { isLocale, type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'

/**
 * Open Graph image, generated at request/build time.
 *
 * Next.js auto-wires this file: any page under `(site)` inherits it as its
 * `og:image` and `twitter:image` unless it exports its own. This replaces the
 * previous hardcoded `/og/<locale>/<path>.png` references, which pointed at
 * files that never existed and made every social share preview blank.
 *
 * Rendered with `next/og` (Satori) using system fonts and inline SVG — no
 * external font fetch, no raster assets, so it works offline in the build and
 * never blocks on the network.
 */

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Both locales are pre-generated at build time.
export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }]
}

const GOLD = PALETTE.gold[500]
const DARK_BG = '#121110'
const INK = '#F5F1E8'
const MUTED = '#9B9184'

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const locale: Locale = isLocale(raw) ? raw : 'en'
  const dict = await getDictionary(locale)

  const title =
    locale === 'fr'
      ? 'Ingénierie de logiciels intelligents'
      : 'Engineering intelligent software'
  const tagline = dict.common.taglineShort ?? 'Precision. Trust. Innovation.'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: DARK_BG,
          padding: '72px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top-of-frame gold rule */}
        <div style={{ display: 'flex', height: 6, width: 120, background: GOLD }} />

        {/* Centre block */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 26,
              letterSpacing: 8,
              textTransform: 'uppercase',
              color: GOLD,
              marginBottom: 28,
            }}
          >
            {COMPANY.shortName}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.1,
              color: INK,
              maxWidth: 900,
            }}
          >
            {title}
          </div>
        </div>

        {/* Footer row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: `1px solid #2E2A24`,
            paddingTop: 28,
          }}
        >
          <div style={{ display: 'flex', fontSize: 26, color: MUTED }}>{tagline}</div>
          <div style={{ display: 'flex', fontSize: 26, color: MUTED }}>{COMPANY.domain}</div>
        </div>
      </div>
    ),
    size,
  )
}
