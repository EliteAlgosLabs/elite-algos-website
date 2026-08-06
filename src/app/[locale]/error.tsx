'use client'

/**
 * Route-level error boundary for the localized app.
 *
 * Catches render/data errors thrown anywhere below `[locale]` and presents a
 * calm, on-brand recovery screen instead of a raw stack trace. Client Component
 * by requirement (error boundaries must run on the client to offer `reset()`).
 *
 * It is deliberately dependency-light and does NOT read the dictionary: a
 * failure may itself be in i18n loading, so the copy is inlined bilingually and
 * chosen from the URL locale prefix. The goal is to never fail while reporting a
 * failure.
 */

import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const COPY = {
  en: {
    code: 'Error',
    title: 'Something went wrong.',
    body: 'An unexpected error interrupted this page. It has been logged. You can try again, or head back to safety.',
    retry: 'Try again',
    home: 'Back to home',
  },
  fr: {
    code: 'Erreur',
    title: 'Une erreur est survenue.',
    body: 'Une erreur inattendue a interrompu cette page. Elle a été enregistrée. Vous pouvez réessayer ou revenir à l’accueil.',
    retry: 'Réessayer',
    home: 'Retour à l’accueil',
  },
} as const

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const pathname = usePathname()
  const locale = pathname.startsWith('/fr') ? 'fr' : 'en'
  const t = COPY[locale]

  useEffect(() => {
    // Surface to the server logs / browser console for diagnosis. The digest is
    // the stable id Next assigns so a report can be correlated with the server.
    console.error('[app-error]', error.digest ?? '', error)
  }, [error])

  return (
    <div className="relative isolate flex min-h-dvh items-center overflow-hidden bg-background text-foreground">
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <p className="font-mono text-sm tracking-[0.2em] text-accent-strong">{t.code}</p>
        <h1 className="mt-5 text-4xl leading-tight sm:text-5xl">{t.title}</h1>
        <p className="mt-6 text-lg leading-relaxed text-muted">{t.body}</p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-7 text-[0.9375rem] font-medium text-background transition-colors duration-300 hover:opacity-90"
          >
            {t.retry}
          </button>
          <Link
            href={`/${locale}`}
            className="inline-flex h-12 items-center justify-center rounded-full border border-border px-7 text-[0.9375rem] font-medium text-foreground transition-colors duration-300 hover:border-accent hover:text-accent-strong"
          >
            {t.home}
          </Link>
        </div>
      </div>
    </div>
  )
}
