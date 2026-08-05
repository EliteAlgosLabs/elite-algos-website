import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono, Jost, Newsreader } from 'next/font/google'
import { notFound } from 'next/navigation'
import { ThemeProvider, themeScript } from '@/components/providers/theme-provider'
import { I18nProvider } from '@/components/providers/i18n-provider'
import { getDictionary, toClientDictionary } from '@/lib/i18n/dictionaries'
import { isLocale, locales, localeMeta } from '@/lib/i18n/config'
import { buildMetadata } from '@/lib/seo'
import { PALETTE } from '@/lib/brand'
import '../globals.css'

/* ============================================================================
   ROOT LAYOUT
   ----------------------------------------------------------------------------
   This is the application's *root* layout — it owns <html> and <body> — even
   though it lives inside the [locale] segment. That placement is deliberate and
   is the pattern Next.js documents for internationalised apps:

     • `<html lang>` and `dir` can be set correctly per language. With the root
       layout at `app/layout.tsx`, `lang` could only ever be hard-coded.
     • `locale` becomes a *root parameter*, readable anywhere on the server via
       `next/root-params` without prop drilling.
     • Both languages are statically generated at build time (see
       `generateStaticParams`).

   Every route — public site and admin alike — therefore lives under [locale],
   which is also what makes the dashboard bilingual.
   ========================================================================== */

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'swap',
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
})

const jost = Jost({
  subsets: ['latin'],
  variable: '--font-jost',
  display: 'swap',
  weight: ['400', '500', '600'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  weight: ['400', '500'],
})

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: PALETTE.light.background },
    { media: '(prefers-color-scheme: dark)', color: PALETTE.dark.background },
  ],
  colorScheme: 'light dark',
  width: 'device-width',
  initialScale: 1,
}

/** Pre-render every language at build time. */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: LayoutProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = await getDictionary(locale)
  return buildMetadata({ locale, page: 'home', dict, path: '/' })
}

export default async function LocaleLayout({ children, params }: LayoutProps<'/[locale]'>) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const dict = await getDictionary(locale)
  const meta = localeMeta[locale]

  return (
    <html
      lang={meta.tag}
      dir={meta.dir}
      suppressHydrationWarning
      // Restores Next 15's behaviour of suppressing smooth scroll during route
      // transitions, so navigation is instant while in-page anchors glide.
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${newsreader.variable} ${jost.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/*
          Applies the persisted theme before first paint. Must be synchronous
          and in <head>: anything later and a dark-mode visitor sees a white
          flash on every navigation. Fixed string, no interpolation.
        */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh bg-background text-foreground antialiased">
        <ThemeProvider>
          <I18nProvider locale={locale} dictionary={toClientDictionary(dict)}>
            {children}
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
