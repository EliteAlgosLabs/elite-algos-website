'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { Mark } from '@/components/brand/mark'
import { LatticeField } from '@/components/motion/lattice-field'
import { Entrance, LineReveal } from '@/components/motion/primitives'
import { href, routes } from '@/lib/i18n/routes'
import { IMAGES } from '@/lib/imagery'
import type { Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/dictionaries'
import { cn } from '@/lib/utils'

/**
 * Home hero: a cinematic panel.
 *
 * A rounded, full-height media panel inset from the page edge. Inside it,
 * back to front:
 *   1. a crossfading photo sequence with a slow Ken Burns push on each slide
 *   2. a dark cinematic grade, so white type keeps contrast on any photo
 *   3. the lattice field (canvas), the brand's moving structure
 *   4. a soft gold spotlight that follows the pointer (transform only)
 *   5. film grain
 *   6. content, glass chips and the slide progress rail
 *
 * Reduced motion: the first slide stays put, with no rotation, Ken Burns or
 * spotlight. Hidden tab: the timer pauses with the page.
 */

const SLIDE_MS = 6500

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.home.hero
  const img = dict.imagery
  const reduced = useReducedMotion()

  const slides = [
    { src: IMAGES.home.heroSlides[0], alt: img.heroSlides.one, caption: img.heroSlides.oneCaption },
    { src: IMAGES.home.heroSlides[1], alt: img.heroSlides.two, caption: img.heroSlides.twoCaption },
    { src: IMAGES.home.heroSlides[2], alt: img.heroSlides.three, caption: img.heroSlides.threeCaption },
    { src: IMAGES.home.heroSlides[3], alt: img.heroSlides.four, caption: img.heroSlides.fourCaption },
  ]

  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduced) return
    let timer: number | undefined
    const start = () => {
      stop()
      timer = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), SLIDE_MS)
    }
    const stop = () => {
      if (timer) window.clearInterval(timer)
    }
    const onVisibility = () => (document.hidden ? stop() : start())
    start()
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      stop()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reduced, slides.length])

  // Pointer spotlight. Spring-smoothed and transform-only.
  const panelRef = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(-400)
  const my = useMotionValue(-400)
  const sx = useSpring(mx, { stiffness: 120, damping: 20, mass: 0.6 })
  const sy = useSpring(my, { stiffness: 120, damping: 20, mass: 0.6 })

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || event.pointerType !== 'mouse') return
    const rect = panelRef.current?.getBoundingClientRect()
    if (!rect) return
    mx.set(event.clientX - rect.left - 300)
    my.set(event.clientY - rect.top - 300)
  }

  const slide = slides[index]

  return (
    <section className="relative isolate px-2 pb-4 pt-20 sm:px-4 sm:pt-22 lg:px-6">
      <div
        ref={panelRef}
        onPointerMove={onPointerMove}
        className={cn(
          'relative isolate flex min-h-[calc(100svh-6rem)] flex-col overflow-hidden',
          'rounded-[1.5rem] bg-ink-950 sm:rounded-[2rem]',
          'shadow-[0_40px_120px_-40px_rgb(0_0_0/0.6)]',
        )}
      >
        {/* 1. Photo sequence */}
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <AnimatePresence initial={false}>
            <motion.div
              key={slide.src}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                className="absolute inset-0"
                initial={{ scale: reduced ? 1 : 1.12 }}
                animate={{ scale: 1 }}
                transition={{ duration: reduced ? 0 : (SLIDE_MS + 1600) / 1000, ease: 'linear' }}
              >
                <Image
                  src={slide.src}
                  alt=""
                  fill
                  sizes="100vw"
                  preload={index === 0}
                  quality={90}
                  className="object-cover"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 2. Cinematic grade */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/40 to-black/30"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-black/70 via-black/25 to-transparent"
        />

        {/* 3. Lattice */}
        <LatticeField className="-z-10 opacity-60 mix-blend-screen" />

        {/* 4. Spotlight */}
        {!reduced ? (
          <motion.div
            aria-hidden="true"
            style={{ x: sx, y: sy }}
            className="pointer-events-none absolute left-0 top-0 -z-10 hidden h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgb(198_166_100/0.28),transparent_62%)] md:block"
          />
        ) : null}

        {/* 5. Grain */}
        <div aria-hidden="true" className="film-grain pointer-events-none absolute inset-0 -z-10" />

        {/* 6. Content */}
        <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 py-16 sm:px-10 lg:px-14">
          <Entrance delay={0.1}>
            <div className="glass-dark inline-flex items-center gap-2.5 rounded-full py-2 pl-3 pr-4">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-70 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-400" />
              </span>
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-white/85">
                {img.heroBadge}
              </span>
            </div>
          </Entrance>

          <h1
            className={cn(
              'mt-7 max-w-5xl font-display text-[clamp(2.75rem,8.5vw,7.25rem)] font-light leading-[0.94]',
              'tracking-[-0.035em] text-white',
            )}
          >
            <LineReveal lines={[t.titleLine1]} delay={0.2} lineClassName="text-white" />
            <LineReveal lines={[t.titleLine2]} delay={0.32} lineClassName="italic text-gold-shimmer" />
          </h1>

          <Entrance delay={0.55}>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/75 sm:text-xl">{t.lead}</p>
          </Entrance>

          <Entrance delay={0.66}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={href(routes.contact, locale)}
                className={cn(
                  'group relative inline-flex h-13 items-center justify-center gap-2 overflow-hidden rounded-full px-8',
                  'bg-gold-400 text-base font-medium text-ink-950',
                  'shadow-[0_0_0_1px_rgb(255_255_255/0.15),0_18px_40px_-12px_rgb(198_166_100/0.7)]',
                  'transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] active:translate-y-px',
                )}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-1000 group-hover:translate-x-full"
                />
                <span className="relative">{t.primaryCta}</span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="relative h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>

              <Link
                href={href(routes.services, locale)}
                className={cn(
                  'glass-dark inline-flex h-13 items-center justify-center gap-2 rounded-full px-8',
                  'text-base font-medium text-white transition-colors duration-500 hover:text-gold-300',
                )}
              >
                {t.secondaryCta}
              </Link>
            </div>
          </Entrance>
        </div>

        {/* Bottom rail: slide caption + progress */}
        <div className="relative mx-auto flex w-full max-w-7xl items-end justify-between gap-6 px-5 pb-6 sm:px-10 sm:pb-8 lg:px-14">
          <div className="min-w-0">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={slide.caption}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-2.5 truncate font-mono text-[0.625rem] uppercase tracking-[0.14em] text-white/70"
              >
                <Mark className="h-2.5 w-auto shrink-0 text-gold-400" />
                <span className="truncate">{slide.caption}</span>
              </motion.p>
            </AnimatePresence>
            <span className="sr-only">{slide.alt}</span>
          </div>

          <div className="flex shrink-0 items-center gap-2" role="tablist" aria-label={img.heroSlidesLabel}>
            {slides.map((s, i) => (
              <button
                key={s.src}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`${i + 1} / ${slides.length}`}
                onClick={() => setIndex(i)}
                className="group relative h-8 w-8 sm:w-12"
              >
                <span className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 overflow-hidden rounded-full bg-white/25">
                  <span
                    key={i === index ? `on-${index}` : `off-${i}`}
                    className={cn(
                      'absolute inset-0 origin-left rounded-full bg-gold-400',
                      i === index
                        ? reduced
                          ? 'scale-x-100'
                          : 'animate-[progress_6.5s_linear_forwards]'
                        : i < index
                          ? 'scale-x-100 opacity-60'
                          : 'scale-x-0',
                    )}
                  />
                </span>
              </button>
            ))}
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-24 hidden justify-center sm:flex"
        >
          <ArrowDown className="h-4 w-4 text-white/60 motion-safe:animate-[scroll-hint_2.4s_ease-in-out_infinite]" />
        </div>

        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/10"
        />
      </div>
    </section>
  )
}
