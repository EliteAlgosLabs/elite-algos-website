import { MARK_GEOMETRY } from '@/lib/brand'
import { cn } from '@/lib/utils'

type MarkProps = {
  className?: string
  /**
   * `currentColor` (default) inherits the surrounding text colour — the correct
   * choice almost everywhere. `gradient` paints the brushed-metal sweep used for
   * hero moments and the footer lockup.
   */
  variant?: 'currentColor' | 'gradient'
  /** Renders as a decorative graphic. Set a title when the mark stands alone. */
  title?: string
  /**
   * Unique suffix for the gradient id. Required when more than one gradient mark
   * is on the page, since SVG ids are document-global.
   */
  idSuffix?: string
}

/**
 * The Elite Algos Labs infinity mark.
 *
 * Two mirrored pentagonal rings meeting at the centre. Rendered as stroked
 * paths with mitre joins so the band weight stays uniform at every size, from a
 * 16px favicon to an architectural sign.
 */
export function Mark({
  className,
  variant = 'currentColor',
  title,
  idSuffix = 'default',
}: MarkProps) {
  const gradientId = `eal-mark-gradient-${idSuffix}`
  const stroke = variant === 'gradient' ? `url(#${gradientId})` : 'currentColor'

  return (
    <svg
      viewBox={MARK_GEOMETRY.viewBox}
      className={cn('block', className)}
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      fill="none"
    >
      {title ? <title>{title}</title> : null}

      {variant === 'gradient' ? (
        <defs>
          {/*
           * Brushed metal: a warm mid-gold that lifts to champagne at the
           * crossing and settles back down. Angled slightly off-horizontal so
           * the sweep reads as a machined surface rather than a flat tint.
           */}
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0.35">
            <stop offset="0%" stopColor="var(--brand-gold-700)" />
            <stop offset="28%" stopColor="var(--brand-gold-500)" />
            <stop offset="50%" stopColor="var(--brand-gold-200)" />
            <stop offset="72%" stopColor="var(--brand-gold-500)" />
            <stop offset="100%" stopColor="var(--brand-gold-700)" />
          </linearGradient>
        </defs>
      ) : null}

      <g
        stroke={stroke}
        strokeWidth={MARK_GEOMETRY.strokeWidth}
        strokeLinejoin="miter"
        strokeMiterlimit={10}
      >
        <path d={MARK_GEOMETRY.left} />
        <path d={MARK_GEOMETRY.right} />
      </g>
    </svg>
  )
}
