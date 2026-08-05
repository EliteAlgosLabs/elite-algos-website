'use client'

import { createContext, use } from 'react'
import type { Locale } from '@/lib/i18n/config'
import type { ClientDictionary } from '@/lib/i18n/dictionaries'

type I18nContextValue = {
  locale: Locale
  /** Only the shared slice — see `toClientDictionary`. */
  t: ClientDictionary
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({
  locale,
  dictionary,
  children,
}: {
  locale: Locale
  dictionary: ClientDictionary
  children: React.ReactNode
}) {
  return <I18nContext value={{ locale, t: dictionary }}>{children}</I18nContext>
}

/**
 * Read the locale and shared strings from a Client Component.
 *
 * Server Components must not use this — call `getDictionary(locale)` instead
 * and keep the strings out of the client bundle entirely.
 */
export function useI18n() {
  const context = use(I18nContext)
  if (!context) throw new Error('useI18n must be used inside <I18nProvider>')
  return context
}
