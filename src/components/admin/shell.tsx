'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  Bell,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  ChartNoAxesColumn,
  Contact,
  FileText,
  // lucide-react no longer ships brand marks, so the repository module uses a
  // generic version-control glyph rather than the GitHub logo.
  GitBranch,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  ShieldCheck,
  Users,
  UsersRound,
  X,
} from 'lucide-react'
import { Mark } from '@/components/brand/mark'
import { LocaleSwitcher } from '@/components/layout/locale-switcher'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { signOut } from '@/lib/auth/actions'
import { adminFooterNav, adminNav, type AdminIconName, type AdminNavItem } from '@/lib/auth/nav'
import { can, type Role } from '@/lib/auth/rbac'
import type { Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/dictionaries'
import { cn } from '@/lib/utils'

const icons: Record<AdminIconName, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  ChartNoAxesColumn,
  Users,
  Inbox,
  BriefcaseBusiness,
  FileText,
  UsersRound,
  Contact,
  ShieldCheck,
  Bot,
  GitBranch,
  BrainCircuit,
  Bell,
  Settings,
}

/**
 * Dashboard chrome.
 *
 * Client-side only because of the mobile drawer and active-route highlighting.
 * The `role` arrives from the server session; filtering the navigation here is
 * a UX affordance — every page independently re-checks the permission on the
 * server, so hiding a link is never what keeps a module private.
 */
export function AdminShell({
  locale,
  dict,
  role,
  user,
  children,
}: {
  locale: Locale
  dict: Dictionary
  role: Role
  user: { name: string; email: string }
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const base = `/${locale}/admin`
  const t = dict.admin

  const visibleGroups = adminNav
    .map((group) => ({ ...group, items: group.items.filter((i) => can(role, i.permission)) }))
    .filter((group) => group.items.length > 0)

  const visibleFooter = adminFooterNav.filter((item) => can(role, item.permission))

  function isActive(item: AdminNavItem) {
    const target = `${base}${item.path}`
    return item.path === '' ? pathname === target : pathname.startsWith(target)
  }

  function NavLink({ item }: { item: AdminNavItem }) {
    const IconComponent = icons[item.icon]
    const active = isActive(item)

    return (
      <Link
        href={`${base}${item.path}`}
        onClick={() => setOpen(false)}
        aria-current={active ? 'page' : undefined}
        className={cn(
          'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors duration-200',
          active
            ? 'bg-surface text-foreground'
            : 'text-muted hover:bg-surface/60 hover:text-foreground',
        )}
      >
        <IconComponent
          className={cn('h-4 w-4 shrink-0', active ? 'text-accent' : 'text-muted')}
        />
        <span className="truncate">{t.nav[item.key]}</span>
        {active ? (
          <span aria-hidden="true" className="ml-auto h-1 w-1 rounded-full bg-accent" />
        ) : null}
      </Link>
    )
  }

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 shrink-0 items-center gap-2.5 border-b border-border px-5">
        <Mark className="h-3.5 w-auto text-accent" />
        <span className="font-wordmark text-sm font-medium uppercase tracking-[0.16em]">
          {t.brand}
        </span>
      </div>

      <nav aria-label={t.overview.title} className="flex-1 space-y-6 overflow-y-auto p-3">
        {visibleGroups.map((group) => (
          <div key={group.key}>
            <h2 className="px-3 pb-2 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted">
              {t.nav[group.key]}
            </h2>
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <NavLink key={item.key} item={item} />
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="shrink-0 space-y-0.5 border-t border-border p-3">
        {visibleFooter.map((item) => (
          <NavLink key={item.key} item={item} />
        ))}
      </div>

      <div className="shrink-0 border-t border-border p-3">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2">
          <span
            aria-hidden="true"
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-surface font-display text-xs text-accent-strong"
          >
            {initials(user.name)}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm text-foreground">{user.name}</span>
            <span className="block truncate font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted">
              {t.roles.names[role]}
            </span>
          </span>
        </div>

        <form action={signOut}>
          <input type="hidden" name="locale" value={locale} />
          <button
            type="submit"
            className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted transition-colors duration-200 hover:bg-surface/60 hover:text-foreground"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            {t.common.signOut}
          </button>
        </form>
      </div>
    </div>
  )

  return (
    <div className="min-h-dvh bg-background">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-border bg-background lg:block">
        {sidebar}
      </aside>

      {/* Mobile drawer */}
      {open ? (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <aside className="fixed inset-y-0 left-0 z-50 w-64 border-r border-border bg-background lg:hidden">
            {sidebar}
          </aside>
        </>
      ) : null}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-background/85 px-5 backdrop-blur-xl">
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? dict.common.closeMenu : dict.common.openMenu}
            aria-expanded={open}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface hover:text-foreground lg:hidden"
          >
            {open ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
          </button>

          <div className="ml-auto flex items-center gap-1">
            <LocaleSwitcher />
            <ThemeToggle />
          </div>
        </header>

        <main className="p-6 sm:p-8 lg:p-10">{children}</main>
      </div>
    </div>
  )
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}
