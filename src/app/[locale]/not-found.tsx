import Link from 'next/link'
// `next/root-params` exports one getter per dynamic segment above the root
// layout. Our segment is `[locale]`, so the getter is `locale`.
import { locale as rootLocale } from 'next/root-params'
import { Mark } from '@/components/brand/mark'
import { AmbientField, Container } from '@/components/ui/layout'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { defaultLocale, isLocale } from '@/lib/i18n/config'
import { href, routes } from '@/lib/i18n/routes'
import { cn } from '@/lib/utils'

/**
 * Not-found page.
 *
 * Reads the locale via `next/root-params` rather than props: `not-found.tsx`
 * never receives `params`, but because `[locale]` sits above the root layout it
 * is a root parameter and can be read directly on the server. That is the
 * payoff for rooting the layout inside `[locale]` — even error pages stay
 * correctly translated.
 */
export default async function NotFound() {
  const raw = await rootLocale()
  const locale = raw && isLocale(raw) ? raw : defaultLocale
  const dict = await getDictionary(locale)
  const t = dict.notFound

  return (
    <div className="relative isolate flex min-h-dvh items-center overflow-hidden">
      <div aria-hidden="true" className="grid-field pointer-events-none absolute inset-0 opacity-60" />
      <AmbientField />

      <Container className="relative py-24">
        <div className="mx-auto max-w-xl text-center">
          <Mark variant="gradient" idSuffix="notfound" className="mx-auto h-9 w-auto" />

          <p className="mt-10 font-mono text-sm tracking-[0.2em] text-accent-strong">{t.code}</p>
          <h1 className="mt-5 text-4xl leading-tight sm:text-5xl">{t.title}</h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">{t.body}</p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={href(routes.home, locale)}
              className={cn(
                'inline-flex h-12 items-center justify-center rounded-full px-7',
                'bg-foreground text-[0.9375rem] font-medium text-background',
                'transition-colors duration-500 hover:bg-accent-strong hover:text-accent-contrast',
              )}
            >
              {t.action}
            </Link>
            <Link
              href={href(routes.contact, locale)}
              className={cn(
                'inline-flex h-12 items-center justify-center rounded-full border border-border px-7',
                'text-[0.9375rem] font-medium text-foreground',
                'transition-colors duration-500 hover:border-accent hover:text-accent-strong',
              )}
            >
              {t.secondary}
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}
