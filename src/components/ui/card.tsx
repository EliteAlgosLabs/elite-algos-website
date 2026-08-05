import Link from 'next/link'
import { cn } from '@/lib/utils'

/* ============================================================================
   CARD
   ----------------------------------------------------------------------------
   Soft glass with a warm shadow. The hover state does three things at once —
   lift, shadow bloom, and a gold hairline appearing along the top edge — which
   together read as one gesture rather than three effects.
   ========================================================================== */

export function Card({
  children,
  className,
  interactive = false,
  as: Component = 'div',
}: {
  children: React.ReactNode
  className?: string
  /** Adds the lift + gold-edge hover. Use only when the card is clickable. */
  interactive?: boolean
  as?: 'div' | 'article' | 'li'
}) {
  return (
    <Component
      className={cn(
        'glass group relative overflow-hidden rounded-2xl',
        'transition-[transform,box-shadow,border-color] duration-500',
        '[transition-timing-function:var(--ease-out-expo)]',
        interactive && 'hover:-translate-y-1 hover:[box-shadow:var(--glass-shadow-hover)]',
        className,
      )}
    >
      {/* Gold hairline that wipes in along the top edge on hover. */}
      {interactive ? (
        <span
          aria-hidden="true"
          className={cn(
            'absolute inset-x-0 top-0 h-px origin-left scale-x-0 opacity-0',
            'bg-gradient-to-r from-transparent via-accent to-transparent',
            'transition-[transform,opacity] duration-700',
            '[transition-timing-function:var(--ease-out-expo)]',
            'group-hover:scale-x-100 group-hover:opacity-100',
          )}
        />
      ) : null}
      {children}
    </Component>
  )
}

/**
 * A card that is entirely one link.
 *
 * The anchor is a stretched overlay rather than a wrapper around the content,
 * so nested interactive elements stay reachable and the accessible name comes
 * from `label` instead of the whole card's text content.
 */
export function LinkCard({
  href,
  label,
  children,
  className,
}: {
  href: string
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <Card interactive className={className} as="article">
      {children}
      <Link href={href} className="absolute inset-0 z-10 rounded-2xl" aria-label={label}>
        <span className="sr-only">{label}</span>
      </Link>
    </Card>
  )
}

export function Badge({
  children,
  className,
  tone = 'default',
}: {
  children: React.ReactNode
  className?: string
  tone?: 'default' | 'accent' | 'muted' | 'success' | 'warning'
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1',
        'font-mono text-[0.6875rem] uppercase leading-none tracking-[0.12em]',
        tone === 'default' && 'border-border bg-surface text-muted',
        tone === 'accent' && 'border-accent/35 bg-accent/10 text-accent-strong',
        tone === 'muted' && 'border-transparent bg-surface text-muted',
        tone === 'success' && 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
        tone === 'warning' && 'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400',
        className,
      )}
    >
      {children}
    </span>
  )
}

/**
 * A large measured figure with its label — the "40% faster" moments.
 * The numeral carries the brushed-metal fill; the label stays quiet.
 */
export function Metric({
  value,
  label,
  detail,
  className,
}: {
  value: string
  label: string
  detail?: string
  className?: string
}) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <span className="font-display text-4xl leading-none tracking-tight text-brushed sm:text-5xl">
        {value}
      </span>
      <span className="text-sm font-medium text-foreground">{label}</span>
      {detail ? <span className="text-sm leading-relaxed text-muted">{detail}</span> : null}
    </div>
  )
}
