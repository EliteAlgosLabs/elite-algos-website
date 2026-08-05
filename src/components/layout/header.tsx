'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { Logo } from '@/components/brand/logo'
import { LocaleSwitcher } from './locale-switcher'
import { ThemeToggle } from './theme-toggle'
import { useI18n } from '@/components/providers/i18n-provider'
import { useScrolled } from '@/lib/hooks/use-scrolled'
import { href, primaryNav, routes, splitLocale } from '@/lib/i18n/routes'
import { cn } from '@/lib/utils'

export function Header() {
  const { locale, t } = useI18n()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // The header gains its glass background only once the hero has begun to
  // scroll past, so it sits invisibly over the hero on first paint.
  const scrolled = useScrolled(24)

  const { path: currentPath } = splitLocale(pathname)

  // The drawer closes in each link's own click handler rather than in an effect
  // watching `pathname`. Same result, one fewer render, and it also closes when
  // a link targets the page you are already on — which a pathname effect misses.

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <>
      <a
        href="#main"
        className={cn(
          'sr-only z-[100] focus:not-sr-only focus:fixed focus:left-4 focus:top-4',
          'focus:rounded-full focus:bg-foreground focus:px-5 focus:py-2.5',
          'focus:text-sm focus:font-medium focus:text-background',
        )}
      >
        {t.common.skipToContent}
      </a>

      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500',
          '[transition-timing-function:var(--ease-out-expo)]',
          scrolled || open
            ? 'border-b border-border bg-background/80 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <nav
          aria-label={t.nav.home}
          className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-6 sm:px-8 lg:px-12"
        >
          <Logo locale={locale} label={t.common.homeLink} idSuffix="header" />

          <ul className="hidden items-center gap-1 lg:flex">
            {primaryNav.map((item) => {
              const active =
                currentPath === item.path || currentPath.startsWith(`${item.path}/`)
              return (
                <li key={item.key}>
                  <Link
                    href={href(item.path, locale)}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'relative inline-flex h-9 items-center rounded-full px-3.5 text-sm',
                      'transition-colors duration-300',
                      active ? 'text-foreground' : 'text-muted hover:text-foreground',
                    )}
                  >
                    {t.nav[item.key]}
                    {/* Gold dot marks the current section — quieter than an
                        underline and it never shifts the text baseline. */}
                    {active ? (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-3.5 -bottom-px h-px bg-accent"
                      />
                    ) : null}
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-1">
            <div className="hidden items-center gap-1 sm:flex">
              <LocaleSwitcher />
              <ThemeToggle />
            </div>

            <Link
              href={href(routes.contact, locale)}
              className={cn(
                'group ml-1 hidden h-9 items-center gap-1.5 rounded-full border border-border',
                'bg-elevated/60 px-4 text-sm font-medium text-foreground backdrop-blur-sm',
                'transition-[border-color,background-color,color] duration-300',
                'hover:border-accent hover:text-accent-strong lg:inline-flex',
              )}
            >
              {t.nav.contact}
              <ArrowUpRight
                aria-hidden="true"
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.common.closeMenu : t.common.openMenu}
              className={cn(
                'inline-flex h-9 w-9 items-center justify-center rounded-full',
                'text-muted transition-colors duration-300 hover:bg-surface hover:text-foreground lg:hidden',
              )}
            >
              {open ? (
                <X aria-hidden="true" className="h-4.5 w-4.5" />
              ) : (
                <Menu aria-hidden="true" className="h-4.5 w-4.5" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      {open ? (
        <div
          id="mobile-menu"
          className={cn(
            'fixed inset-x-0 top-18 z-40 border-b border-border bg-background/95 backdrop-blur-xl lg:hidden',
            'motion-safe:animate-[drawer-in_280ms_var(--ease-out-expo)]',
          )}
        >
          <div className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto px-6 py-6 sm:px-8">
            <ul className="flex flex-col">
              {primaryNav.map((item, index) => {
                const active =
                  currentPath === item.path || currentPath.startsWith(`${item.path}/`)
                return (
                  <li key={item.key} className="border-b border-border/60 last:border-0">
                    <Link
                      href={href(item.path, locale)}
                      onClick={() => setOpen(false)}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'flex items-center justify-between py-4 font-display text-2xl',
                        active ? 'text-accent-strong' : 'text-foreground',
                      )}
                    >
                      {t.nav[item.key]}
                      <span className="font-mono text-[0.625rem] tracking-[0.12em] text-muted">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>

            <Link
              href={href(routes.contact, locale)}
              onClick={() => setOpen(false)}
              className={cn(
                'mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full',
                'bg-foreground text-[0.9375rem] font-medium text-background',
              )}
            >
              {t.common.startConversation}
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </Link>

            <div className="mt-6 flex items-center justify-between border-t border-border pt-6 sm:hidden">
              <LocaleSwitcher />
              <ThemeToggle />
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
