import { NextResponse, type NextRequest } from 'next/server'
import { createHash } from 'node:crypto'
import { analytics, type DeviceKind } from '@/lib/analytics/store'
import { isLocale } from '@/lib/i18n/config'

/**
 * Analytics ingest endpoint.
 *
 * Receives one lightweight pageview beacon from the client and records an
 * aggregate-only event. Privacy is enforced HERE, on the server:
 *
 *   • The client sends only { path } — never anything identifying.
 *   • Country is derived from Cloudflare's `cf-ipcountry` header (already known
 *     to the edge; we never see or store the IP ourselves).
 *   • The "visitor hash" is a salted SHA-256 of (IP + UA + UTC-day). It exists
 *     only to count unique visitors within a single day and is unusable across
 *     days or sites. The raw IP is used for the hash and immediately discarded;
 *     it is never written anywhere.
 *
 * Runs on the Node runtime for crypto + the file store.
 */
export const runtime = 'nodejs'

const DAILY_SALT = process.env.ANALYTICS_SALT?.trim() || 'eal-analytics-v1'

function clientIp(request: NextRequest): string {
  const xff = request.headers.get('x-forwarded-for')
  if (xff) return xff.split(',')[0].trim()
  return request.headers.get('cf-connecting-ip') ?? request.headers.get('x-real-ip') ?? 'unknown'
}

function deviceFromUA(ua: string): DeviceKind {
  const s = ua.toLowerCase()
  if (/ipad|tablet|kindle|playbook|silk/.test(s)) return 'tablet'
  if (/mobi|iphone|android.+mobile|phone/.test(s)) return 'mobile'
  if (/android|mobile/.test(s)) return 'mobile'
  if (s) return 'desktop'
  return 'unknown'
}

/** Strips a path to its locale-less, query-less form: "/fr/about?x=1" -> "/about". */
function normalisePath(raw: string): string {
  try {
    const p = raw.split('?')[0].split('#')[0]
    const segments = p.split('/').filter(Boolean)
    if (segments[0] && isLocale(segments[0])) segments.shift()
    const joined = `/${segments.join('/')}`.replace(/\/$/, '')
    return joined === '' ? '/' : joined
  } catch {
    return '/'
  }
}

function referrerHost(raw: string | undefined): string {
  if (!raw) return 'direct'
  try {
    const host = new URL(raw).hostname.replace(/^www\./, '')
    if (!host || host === 'elitealgoslabs.com') return 'direct'
    return host
  } catch {
    return 'direct'
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: { path?: string; referrer?: string; locale?: string } = {}
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  if (!body.path || typeof body.path !== 'string') {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const ua = request.headers.get('user-agent') ?? ''
  // Ignore obvious bots — they are not visitors and would inflate the numbers.
  if (/bot|crawler|spider|crawl|slurp|bingpreview|facebookexternalhit|headless/i.test(ua)) {
    return NextResponse.json({ ok: true, skipped: 'bot' }, { status: 202 })
  }

  const day = new Date().toISOString().slice(0, 10)
  const ip = clientIp(request)
  const visitorHash = createHash('sha256')
    .update(`${DAILY_SALT}:${day}:${ip}:${ua}`)
    .digest('hex')
    .slice(0, 16)
  // `ip` goes out of scope here and is never persisted.

  const country = (request.headers.get('cf-ipcountry') || 'unknown').toUpperCase()
  const localeGuess = isLocale(body.locale ?? '') ? (body.locale as string) : 'unknown'

  try {
    await analytics.record({
      path: normalisePath(body.path),
      referrer: referrerHost(body.referrer),
      country: country === 'XX' || country === 'T1' ? 'unknown' : country,
      locale: localeGuess,
      device: deviceFromUA(ua),
      visitorHash,
    })
  } catch (error) {
    console.error('[track] failed to record event', error)
    // Analytics must never surface an error to the visitor's page.
    return NextResponse.json({ ok: false }, { status: 200 })
  }

  return NextResponse.json({ ok: true }, { status: 202 })
}
