'use client'

import { motion, useReducedMotion, type Variants } from 'motion/react'
import { cn } from '@/lib/utils'

/* ============================================================================
   MOTION LANGUAGE
   ----------------------------------------------------------------------------
   Three rules hold the whole site together:

     1. Entrances move on ONE axis, 16-24px, over 0.7-0.9s on `ease-out-expo`.
        Anything faster reads cheap; anything further reads like a slideshow.
     2. Only `opacity` and `transform` are ever animated — both composited, so
        nothing here can cause layout thrash.
     3. `prefers-reduced-motion` snaps to the FINAL state, never to hidden.
        A reduced-motion visitor sees a complete page, just an instant one.
   ========================================================================== */

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 24 },
  down: { x: 0, y: -24 },
  left: { x: 24, y: 0 },
  right: { x: -24, y: 0 },
  none: { x: 0, y: 0 },
}

/**
 * Reveals its children when scrolled into view. The workhorse of the site.
 *
 * `delay` is for deliberate choreography (a heading before its paragraph).
 * For lists, prefer `<Stagger>` so the rhythm stays even as items are added.
 */
export function Reveal({
  children,
  className,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  amount = 0.25,
  as = 'div',
}: {
  children: React.ReactNode
  className?: string
  direction?: Direction
  delay?: number
  duration?: number
  /** Fraction of the element that must be visible before it fires. */
  amount?: number
  as?: 'div' | 'section' | 'span' | 'li' | 'article' | 'header' | 'footer'
}) {
  const reduced = useReducedMotion()
  const offset = offsets[direction]
  const Component = motion[as]

  if (reduced) return <Component className={className}>{children}</Component>

  return (
    <Component
      className={className}
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: EASE_OUT_EXPO }}
    >
      {children}
    </Component>
  )
}

/**
 * Parent for a staggered group. Children must be `<StaggerItem>`.
 * The stagger is driven by the parent so item components stay unaware of their
 * own index — adding or reordering items cannot desynchronise the rhythm.
 */
export function Stagger({
  children,
  className,
  gap = 0.08,
  delay = 0,
  amount = 0.15,
  as = 'div',
}: {
  children: React.ReactNode
  className?: string
  /** Seconds between consecutive children. */
  gap?: number
  delay?: number
  amount?: number
  as?: 'div' | 'ul' | 'section'
}) {
  const reduced = useReducedMotion()
  const Component = motion[as]

  if (reduced) return <Component className={className}>{children}</Component>

  const variants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: gap, delayChildren: delay } },
  }

  return (
    <Component
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
    >
      {children}
    </Component>
  )
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE_OUT_EXPO } },
}

export function StaggerItem({
  children,
  className,
  as = 'div',
}: {
  children: React.ReactNode
  className?: string
  as?: 'div' | 'li' | 'article'
}) {
  const reduced = useReducedMotion()
  const Component = motion[as]

  if (reduced) return <Component className={className}>{children}</Component>

  return (
    <Component className={className} variants={itemVariants}>
      {children}
    </Component>
  )
}

/**
 * Display-headline entrance: each line rises out of an overflow-hidden mask, as
 * though the type were set on a physical slug. Reserved for hero and section
 * headings — used everywhere it would become noise.
 *
 * Lines are passed explicitly rather than split from a string, because
 * line-breaking a translated headline correctly is a typographic decision, not
 * something to compute at runtime.
 */
export function LineReveal({
  lines,
  className,
  lineClassName,
  delay = 0,
}: {
  lines: string[]
  className?: string
  lineClassName?: string
  delay?: number
}) {
  const reduced = useReducedMotion()

  if (reduced) {
    return (
      <span className={className}>
        {lines.map((line) => (
          <span key={line} className={cn('block', lineClassName)}>
            {line}
          </span>
        ))}
      </span>
    )
  }

  return (
    <span className={className}>
      {lines.map((line, index) => (
        // `overflow-hidden` is the mask; the inner span is what actually moves.
        <span key={line} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className={cn('block', lineClassName)}
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{
              duration: 1.05,
              delay: delay + index * 0.09,
              ease: EASE_OUT_EXPO,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

/** Simple fade-and-rise on mount, for above-the-fold content that must not wait
 *  for a scroll event to appear. */
export function Entrance({
  children,
  className,
  delay = 0,
  duration = 0.9,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
}) {
  const reduced = useReducedMotion()

  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: EASE_OUT_EXPO }}
    >
      {children}
    </motion.div>
  )
}
