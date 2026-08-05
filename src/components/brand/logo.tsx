import Link from 'next/link'
import { Mark } from './mark'
import { COMPANY } from '@/lib/brand'
import { href } from '@/lib/i18n/routes'
import type { Locale } from '@/lib/i18n/config'
import { cn } from '@/lib/utils'

/**
 * The lockup: mark plus wordmark.
 *
 * The wordmark is live text in the brand's geometric sans rather than an image
 * or outlined paths. It stays crisp at every size, scales with the user's font
 * settings, is selectable and translatable, and costs nothing extra to load.
 */
export function Logo({
  locale,
  label,
  className,
  markClassName,
  showWordmark = true,
  variant = 'currentColor',
  idSuffix,
}: {
  locale: Locale
  /** Accessible name for the home link. */
  label: string
  className?: string
  markClassName?: string
  showWordmark?: boolean
  variant?: 'currentColor' | 'gradient'
  idSuffix?: string
}) {
  return (
    <Link
      href={href('/', locale)}
      aria-label={label}
      className={cn(
        'group inline-flex items-center gap-2.5 transition-opacity duration-300 hover:opacity-80',
        className,
      )}
    >
      <Mark
        variant={variant}
        idSuffix={idSuffix}
        className={cn('h-[1.15rem] w-auto text-accent', markClassName)}
      />
      {showWordmark ? (
        <span
          className={cn(
            'font-wordmark text-[0.9375rem] font-medium uppercase leading-none',
            'tracking-[0.16em] text-foreground',
          )}
        >
          {COMPANY.shortName}
        </span>
      ) : null}
    </Link>
  )
}
