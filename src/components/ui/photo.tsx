'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { cn } from '@/lib/utils'

/* ============================================================================
   PHOTOGRAPHY
   ----------------------------------------------------------------------------
   Every photograph on the site goes through <Photo>. It is what makes stock
   imagery from different photographers read as one brand:

     • a warm gold wash (soft-light) pulls cold blues toward the palette
     • a slight desaturation keeps photos from shouting over the type
     • dark mode dims them a touch so they never glare against ink
     • an inner hairline border matches the glass cards

   `parallax` adds a slow scroll-linked drift. It animates `transform` only and
   renders static under `prefers-reduced-motion`. `zoomOnHover` is for photos
   inside interactive cards and expects a `group` ancestor.
   ========================================================================== */

export function Photo({
  src,
  alt,
  sizes,
  className,
  imageClassName,
  preload = false,
  parallax = false,
  zoomOnHover = false,
  tint = true,
  rounded = 'rounded-3xl',
  children,
}: {
  src: string
  /** Empty string marks the photo decorative. */
  alt: string
  sizes: string
  className?: string
  imageClassName?: string
  preload?: boolean
  parallax?: boolean
  zoomOnHover?: boolean
  tint?: boolean
  rounded?: string
  /** Overlay content (captions, badges). Rendered above the tint. */
  children?: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-7%', '7%'])
  const drift = parallax && !reduced

  return (
    <div
      ref={ref}
      className={cn(
        'relative isolate overflow-hidden bg-surface',
        rounded,
        className,
      )}
    >
      <motion.div
        className={cn('absolute inset-0', drift && '-inset-y-[9%]')}
        style={drift ? { y } : undefined}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          preload={preload}
          quality={preload ? 90 : 75}
          className={cn(
            'object-cover saturate-[0.92] dark:brightness-[0.82]',
            zoomOnHover &&
              'transition-transform duration-[1400ms] [transition-timing-function:var(--ease-out-expo)] group-hover:scale-[1.06]',
            imageClassName,
          )}
        />
      </motion.div>

      {tint ? (
        <>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-accent/15 mix-blend-soft-light"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"
          />
        </>
      ) : null}

      <span
        aria-hidden="true"
        className={cn('pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10', rounded)}
      />

      {children}
    </div>
  )
}

/** Small mono caption pinned to the bottom-left of a photo. */
export function PhotoCaption({
  children,
  position = 'bottom-left',
}: {
  children: React.ReactNode
  position?: 'bottom-left' | 'top-left' | 'bottom-right'
}) {
  return (
    <span
      className={cn(
        'absolute z-10',
        position === 'bottom-left' && 'bottom-4 left-4',
        position === 'top-left' && 'left-4 top-4',
        position === 'bottom-right' && 'bottom-4 right-4',
        'rounded-full bg-black/45 px-3 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-white backdrop-blur-md',
      )}
    >
      {children}
    </span>
  )
}
