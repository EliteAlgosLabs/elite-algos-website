import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge class names, with later Tailwind utilities winning over earlier ones.
 * `cn('p-2', 'p-4')` -> `'p-4'` rather than both classes fighting in the CSS.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Locale-aware date formatting. Never hand-roll date strings. */
export function formatDate(
  iso: string,
  locale: string,
  options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' },
) {
  return new Intl.DateTimeFormat(locale, options).format(new Date(iso))
}

/** Locale-aware number formatting — thin spaces in French, commas in English. */
export function formatNumber(value: number, locale: string, options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat(locale, options).format(value)
}

/** Compact form for dashboard stat tiles: 12400 -> "12.4K". */
export function formatCompact(value: number, locale: string) {
  return new Intl.NumberFormat(locale, { notation: 'compact', maximumFractionDigits: 1 }).format(
    value,
  )
}
