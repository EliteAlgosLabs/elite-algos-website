'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/components/providers/theme-provider'
import { useI18n } from '@/components/providers/i18n-provider'
import { cn } from '@/lib/utils'

/**
 * Theme toggle.
 *
 * Which icon is visible is decided entirely in CSS, off the `dark:` variant
 * (which is bound to `[data-theme]`). That matters: the server cannot know the
 * visitor's theme, so branching on it in JS would either render the wrong glyph
 * on the first paint or need a `mounted` flag whose only job is to delay the
 * correct one. Letting CSS do it means the blocking theme script has already
 * settled the answer before React runs.
 *
 * The label stays "Switch theme" rather than "Switch to dark mode" for the same
 * reason — it is accurate in both states and needs no client-side branch.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { toggle } = useTheme()
  const { t } = useI18n()

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t.common.toggleTheme}
      className={cn(
        'relative inline-flex h-9 w-9 items-center justify-center rounded-full',
        'border border-transparent text-muted',
        'transition-colors duration-300 hover:border-border hover:bg-surface hover:text-foreground',
        className,
      )}
    >
      {/* Both icons are always mounted and cross-fade: no layout shift, and no
          frame where the button is empty. */}
      <Sun
        aria-hidden="true"
        className={cn(
          'absolute h-4 w-4 transition-[opacity,transform] duration-500',
          '[transition-timing-function:var(--ease-out-expo)]',
          '-rotate-90 scale-50 opacity-0',
          'dark:rotate-0 dark:scale-100 dark:opacity-100',
        )}
      />
      <Moon
        aria-hidden="true"
        className={cn(
          'absolute h-4 w-4 transition-[opacity,transform] duration-500',
          '[transition-timing-function:var(--ease-out-expo)]',
          'rotate-0 scale-100 opacity-100',
          'dark:rotate-90 dark:scale-50 dark:opacity-0',
        )}
      />
    </button>
  )
}
