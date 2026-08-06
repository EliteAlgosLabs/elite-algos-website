'use client'

/**
 * Global error boundary — the last line of defence.
 *
 * Catches errors thrown in the ROOT layout itself, which the per-locale
 * `error.tsx` cannot reach because it lives inside that layout. When this
 * renders, nothing else on the page is trusted to exist, so it ships its own
 * <html>/<body> and uses only inline styles — no Tailwind, no dictionary, no
 * shared components. It must render even when the rest of the app cannot.
 */

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[global-error]', error.digest ?? '', error)
  }, [error])

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#121110',
          color: '#F5F1E8',
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        }}
      >
        <div style={{ maxWidth: 520, padding: '48px 24px', textAlign: 'center' }}>
          <p
            style={{
              fontSize: 13,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#C6A664',
              margin: 0,
            }}
          >
            Error
          </p>
          <h1 style={{ fontSize: 34, lineHeight: 1.2, margin: '20px 0 0' }}>
            Something went wrong.
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: '#9B9184', margin: '20px 0 0' }}>
            An unexpected error interrupted the application. It has been logged. Please try again.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: 32,
              height: 48,
              padding: '0 28px',
              borderRadius: 999,
              border: 'none',
              background: '#F5F1E8',
              color: '#121110',
              fontSize: 15,
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
