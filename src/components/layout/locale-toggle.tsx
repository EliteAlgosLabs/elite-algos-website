'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { locales, localeMeta, type Locale } from '@/lib/i18n/config'
import { swapLocale } from '@/lib/i18n/routes'
import { useI18n } from '@/components/providers/i18n-provider'
import { cn } from '@/lib/utils'

/**
 * Segmented language toggle — EN | FR shown side by side.
 *
 * Used where visibility matters more than compactness (chiefly the mobile
 * menu). Unlike the globe dropdown, both languages are always on screen, so it
 * is obvious the site is bilingual and switching is one tap. The active
 * language is highlighted; tapping the other one swaps the whole interface to
 * the same page in that language without a full reload.
 */
export function LocaleToggle({ className }: { className?: string }) {
  const { locale, t } = useI18n()
  const pathname = usePathname()
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  function select(next: Locale) {
    if (next === locale || pending) return
    startTransition(() => {
      router.replace(swapLocale(pathname, next), { scroll: false })
    })
  }

  return (
    <div
      role="group"
      aria-label={t.common.changeLanguage}
      className={cn(
        'inline-flex items-center gap-1 rounded-full border border-border bg-surface p-1',
        className,
      )}
    >
      {locales.map((code) => {
        const active = code === locale
        return (
          <button
            key={code}
            type="button"
            lang={localeMeta[code].tag}
            aria-pressed={active}
            onClick={() => select(code)}
            onMouseEnter={() => router.prefetch(swapLocale(pathname, code))}
            className={cn(
              'inline-flex h-8 min-w-11 items-center justify-center rounded-full px-3',
              'text-sm font-medium transition-colors duration-200',
              active
                ? 'bg-foreground text-background'
                : 'text-muted hover:text-foreground',
            )}
          >
            {localeMeta[code].short}
          </button>
        )
      })}
    </div>
  )
}
