'use client'

import { createContext, use, useCallback, useSyncExternalStore } from 'react'

export type ThemeChoice = 'light' | 'dark' | 'system'
export type ResolvedTheme = 'light' | 'dark'

const STORAGE_KEY = 'eal-theme'

/* ============================================================================
   THEME STORE
   ----------------------------------------------------------------------------
   The theme lives in `localStorage` and `matchMedia` — both *external* stores.
   Mirroring them into `useState` inside an effect is the obvious approach and
   the wrong one: it renders once with a wrong value, then again with the right
   one, and React flags the cascading render.

   `useSyncExternalStore` is the primitive built for exactly this. It also gives
   us a `getServerSnapshot`, so server and hydration render agree and React
   swaps to the real value in the same commit — no flash, no mismatch warning.

   The snapshot is encoded as a single string (`"choice|resolved"`) because
   `useSyncExternalStore` compares snapshots with `Object.is`. Returning a fresh
   object each call would loop forever; strings compare by value.
   ========================================================================== */

type Snapshot = `${ThemeChoice}|${ResolvedTheme}`

const SERVER_SNAPSHOT: Snapshot = 'system|light'

const listeners = new Set<() => void>()

function prefersDark(): boolean {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function readChoice(): ThemeChoice {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system'
  } catch {
    // Private browsing modes can throw on localStorage access.
    return 'system'
  }
}

function computeSnapshot(): Snapshot {
  const choice = readChoice()
  const resolved: ResolvedTheme = choice === 'system' ? (prefersDark() ? 'dark' : 'light') : choice
  return `${choice}|${resolved}`
}

function applyToDocument(resolved: ResolvedTheme) {
  document.documentElement.dataset.theme = resolved
  document.documentElement.style.colorScheme = resolved
}

/** Re-reads the store, syncs the DOM, and notifies subscribers. */
function emit() {
  const [, resolved] = computeSnapshot().split('|') as [ThemeChoice, ResolvedTheme]
  applyToDocument(resolved)
  for (const listener of listeners) listener()
}

function subscribe(onStoreChange: () => void): () => void {
  listeners.add(onStoreChange)

  const media = window.matchMedia('(prefers-color-scheme: dark)')
  // Only meaningful while the choice is 'system', but subscribing
  // unconditionally keeps the store logic branch-free — `computeSnapshot`
  // already ignores the OS preference when an explicit choice is set.
  media.addEventListener('change', emit)
  // Keeps other tabs in sync when the theme changes in one of them.
  window.addEventListener('storage', emit)

  return () => {
    listeners.delete(onStoreChange)
    media.removeEventListener('change', emit)
    window.removeEventListener('storage', emit)
  }
}

/* ========================================================================== */

type ThemeContextValue = {
  /** What the user picked, including "follow the system". */
  theme: ThemeChoice
  /** What is actually on screen right now. */
  resolved: ResolvedTheme
  setTheme: (theme: ThemeChoice) => void
  /** Flips between light and dark, leaving "system" behind. */
  toggle: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const snapshot = useSyncExternalStore(
    subscribe,
    computeSnapshot,
    () => SERVER_SNAPSHOT,
  )

  const [theme, resolved] = snapshot.split('|') as [ThemeChoice, ResolvedTheme]

  const setTheme = useCallback((next: ThemeChoice) => {
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Non-fatal: the theme still applies for this session.
    }
    emit()
  }, [])

  const toggle = useCallback(() => {
    setTheme(resolved === 'dark' ? 'light' : 'dark')
  }, [resolved, setTheme])

  return <ThemeContext value={{ theme, resolved, setTheme, toggle }}>{children}</ThemeContext>
}

export function useTheme() {
  const context = use(ThemeContext)
  if (!context) throw new Error('useTheme must be used inside <ThemeProvider>')
  return context
}

/**
 * Runs before first paint to set the theme attribute, preventing the white
 * flash a dark-mode visitor would otherwise get on every navigation.
 *
 * Injected via `dangerouslySetInnerHTML` because it must execute synchronously
 * in `<head>` — there is no React equivalent. The content is a fixed string
 * with no interpolation, so there is no injection surface.
 */
export const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('${STORAGE_KEY}');
    var dark = stored === 'dark' || ((!stored || stored === 'system') &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);
    var t = dark ? 'dark' : 'light';
    document.documentElement.dataset.theme = t;
    document.documentElement.style.colorScheme = t;
  } catch (e) {}
})();
`.trim()
