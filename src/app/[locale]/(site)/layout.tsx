import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { isLocale } from '@/lib/i18n/config'

/**
 * Public site shell.
 *
 * A route group `(site)` rather than a path segment, so the marketing chrome
 * wraps every public page without appearing in any URL. `/admin` sits outside
 * this group and therefore gets its own shell — the two never share chrome.
 */
export default async function SiteLayout({ children, params }: LayoutProps<'/[locale]'>) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const dict = await getDictionary(locale)

  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      {/* Target of the skip link. `scroll-mt` keeps anchored headings clear of
          the fixed header. */}
      <main id="main" className="flex-1 scroll-mt-24">
        {children}
      </main>
      <Footer locale={locale} dict={dict} />
    </div>
  )
}
