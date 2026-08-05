'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState, useTransition } from 'react'
import { Check, Globe, Loader2 } from 'lucide-react'
import { locales, localeMeta, type Locale } from '@/lib/i18n/config'
import { swapLocale } from '@/lib/i18n/routes'
import { useI18n } from '@/components/providers/i18n-provider'
import { cn } from '@/lib/utils'

/**
 * Language switcher.
 *
 * The brief requires that switching language translates the whole interface
 * "instantly, without requiring another page". Two design decisions deliver
 * that while keeping the site properly indexable:
 *
 *   • The locale stays in the URL (`/en/...`, `/fr/...`) so each language is a
 *     real, crawlable, linkable address with correct `hreflang`. A client-side
 *     language toggle with one URL would be invisible to search engines and
 *     impossible to share.
 *
 *   • The swap is a client-side `router.replace` to the SAME page in the other
 *     locale. No document reload, no scroll jump, and `replace` rather than
 *     `push` so the back button does not walk through language changes.
 *
 * The alternate route is prefetched on hover/focus, so by the time the visitor
 * clicks, the translated payload is usually already in cache.
 */
export function LocaleSwitcher({ className }: { className?: string }) {
  const { locale, t } = useI18n()
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [pending, startTransition] = useTransition()
  const containerRef = useRef<HTMLDivElement>(null)

  // Close on outside click and on Escape.
  useEffect(() => {
    if (!open) return

    function onPointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as globalThis.Node)) setOpen(false)
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  function select(next: Locale) {
    setOpen(false)
    if (next === locale) return
    startTransition(() => {
      router.replace(swapLocale(pathname, next), { scroll: false })
    })
  }

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t.common.changeLanguage}
        className={cn(
          'inline-flex h-9 items-center gap-1.5 rounded-full border border-transparent px-3',
          'font-mono text-xs tracking-[0.1em] text-muted',
          'transition-colors duration-300 hover:border-border hover:bg-surface hover:text-foreground',
        )}
      >
        {pending ? (
          <Loader2 aria-hidden="true" className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <Globe aria-hidden="true" className="h-3.5 w-3.5" />
        )}
        {localeMeta[locale].short}
      </button>

      {open ? (
        <ul
          role="listbox"
          aria-label={t.common.changeLanguage}
          className={cn(
            'glass absolute right-0 top-full z-50 mt-2 min-w-44 overflow-hidden rounded-xl p-1',
            'origin-top-right motion-safe:animate-[menu-in_200ms_var(--ease-out-expo)]',
          )}
        >
          {locales.map((code) => {
            const active = code === locale
            return (
              <li key={code} role="none">
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  lang={localeMeta[code].tag}
                  onClick={() => select(code)}
                  onMouseEnter={() => router.prefetch(swapLocale(pathname, code))}
                  onFocus={() => router.prefetch(swapLocale(pathname, code))}
                  className={cn(
                    'flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm',
                    'transition-colors duration-200',
                    active ? 'text-accent-strong' : 'text-foreground hover:bg-surface',
                  )}
                >
                  <span>{localeMeta[code].label}</span>
                  <span className="flex items-center gap-2">
                    <span className="font-mono text-[0.625rem] tracking-[0.12em] text-muted">
                      {localeMeta[code].short}
                    </span>
                    {active ? <Check aria-hidden="true" className="h-3.5 w-3.5" /> : null}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}
