import { defaultLocale, isLocale, type Locale } from './config'

/**
 * Canonical route registry.
 *
 * Every internal link in the application resolves through here. Two reasons:
 *
 *  1. Locale prefixing happens in exactly one place, so it cannot be forgotten.
 *  2. When a URL changes, it changes once — and TypeScript finds every caller.
 *
 * Paths are stored *without* a locale prefix; `href()` adds it.
 */
export const routes = {
  home: '/',
  solutions: '/solutions',
  services: '/services',
  portfolio: '/portfolio',
  portfolioCase: (slug: string) => `/portfolio/${slug}`,
  about: '/about',
  insights: '/insights',
  insightsPost: (slug: string) => `/insights/${slug}`,
  careers: '/careers',
  contact: '/contact',
} as const

/** Builds a locale-prefixed href. `href('/about', 'fr')` -> `/fr/about`. */
export function href(path: string, locale: Locale): string {
  const clean = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`
  return `/${locale}${clean}` || `/${locale}`
}

/**
 * Splits a pathname into its locale and the remainder.
 * `/fr/portfolio/atlas` -> `{ locale: 'fr', path: '/portfolio/atlas' }`
 */
export function splitLocale(pathname: string): { locale: Locale; path: string } {
  const segments = pathname.split('/').filter(Boolean)
  const [first, ...rest] = segments

  if (first && isLocale(first)) {
    return { locale: first, path: `/${rest.join('/')}`.replace(/\/$/, '') || '/' }
  }
  return { locale: defaultLocale, path: pathname || '/' }
}

/**
 * Rewrites the current pathname into another locale, preserving the page.
 * This is what makes the language switcher land on the *same* page rather than
 * dumping the visitor back on the home page.
 */
export function swapLocale(pathname: string, next: Locale): string {
  const { path } = splitLocale(pathname)
  return href(path, next)
}

/** Primary navigation, in display order. Keys index into `dict.nav`. */
export const primaryNav = [
  { key: 'solutions', path: routes.solutions },
  { key: 'services', path: routes.services },
  { key: 'about', path: routes.about },
  // portfolio, insights, careers intentionally hidden from nav (2026-08-06).
  // Re-add here to restore the menu entries when the pages go live again.
] as const satisfies ReadonlyArray<{ key: string; path: string }>
