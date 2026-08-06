'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

/**
 * First-party analytics beacon.
 *
 * Fires one lightweight POST to `/api/track` per page view. It sends only the
 * current path (plus the referrer host and the URL locale); everything
 * privacy-sensitive is derived and discarded server-side. No cookies, no
 * localStorage, no identifiers — nothing that needs a consent banner.
 *
 * Deliberately tiny and defensive: any failure is swallowed so a tracking
 * hiccup can never affect the page. Respects Do Not Track.
 */
export function AnalyticsBeacon() {
  const pathname = usePathname()
  const lastSent = useRef<string | null>(null)

  useEffect(() => {
    // Honour Do Not Track.
    if (typeof navigator !== 'undefined' && navigator.doNotTrack === '1') return
    // Guard against double-fires for the same path (e.g. Strict Mode remount).
    if (lastSent.current === pathname) return
    lastSent.current = pathname

    const locale = pathname.split('/').filter(Boolean)[0]
    const referrer =
      typeof document !== 'undefined' && document.referrer ? document.referrer : undefined

    const payload = JSON.stringify({ path: pathname, referrer, locale })

    try {
      // `keepalive` lets the request complete even if the user navigates away.
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true,
      }).catch(() => {})
    } catch {
      // no-op — analytics must never throw into the page
    }
  }, [pathname])

  return null
}
