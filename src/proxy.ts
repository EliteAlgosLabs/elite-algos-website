import { NextResponse, type NextRequest } from 'next/server'
import { isLocale, locales, negotiateLocale } from '@/lib/i18n/config'

/**
 * Proxy — formerly `middleware.ts`. Renamed in Next.js 16; the named export must
 * be `proxy`, and the runtime is always Node (the edge runtime is not supported
 * here). See `node_modules/next/dist/docs/01-app/01-getting-started/16-proxy.md`.
 *
 * Two jobs, in order:
 *   1. Ensure every request carries a locale prefix.
 *   2. Apply security headers to every response.
 */

const LOCALE_COOKIE = 'eal_locale'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // one year

/**
 * Security headers.
 *
 * Note there is deliberately no `Content-Security-Policy` here. A correct CSP
 * for this app needs a per-request nonce threaded into the Next.js script tags;
 * a static policy would either be trivially bypassable (`unsafe-inline`) or
 * break hydration. It is tracked as a follow-up in the Company Brain rather
 * than shipped half-done.
 */
const SECURITY_HEADERS: Record<string, string> = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-DNS-Prefetch-Control': 'on',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
}

function withSecurityHeaders(response: NextResponse): NextResponse {
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value)
  }
  return response
}

export function proxy(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  )

  if (hasLocale) {
    // Layouts do not receive the matched pathname, but the admin layout needs
    // it to let its own login route through the auth gate. Forwarding it as a
    // request header is the supported way to give a Server Component access to
    // the current URL.
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-current-path', pathname)

    const response = withSecurityHeaders(
      NextResponse.next({ request: { headers: requestHeaders } }),
    )

    // Remember the visitor's choice when they navigate explicitly, so a later
    // visit to the bare domain lands in the language they were last reading.
    const current = pathname.split('/')[1]
    if (isLocale(current) && request.cookies.get(LOCALE_COOKIE)?.value !== current) {
      response.cookies.set(LOCALE_COOKIE, current, {
        maxAge: COOKIE_MAX_AGE,
        sameSite: 'lax',
        path: '/',
      })
    }

    return response
  }

  // No locale in the path. Prefer a previously chosen language, then the
  // browser's Accept-Language, then English.
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value
  const locale =
    cookieLocale && isLocale(cookieLocale)
      ? cookieLocale
      : negotiateLocale(request.headers.get('accept-language'))

  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`

  // 307 keeps the method and, more importantly, is not cached by browsers the
  // way a 308 would be — language negotiation must stay dynamic.
  return withSecurityHeaders(NextResponse.redirect(url, 307))
}

export const config = {
  /**
   * Skip Next internals, the API surface, and anything that looks like a static
   * file. Without the file-extension guard, `/favicon.ico` would be redirected
   * to `/en/favicon.ico` and 404.
   */
  matcher: ['/((?!_next/static|_next/image|api/|.*\\.[\\w]+$).*)'],
}
