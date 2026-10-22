import Link from 'next/link'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { Mark } from '@/components/brand/mark'
import { LatticeField } from '@/components/motion/lattice-field'
import { Entrance, LineReveal } from '@/components/motion/primitives'
import { AmbientField, Container } from '@/components/ui/layout'
import { Photo } from '@/components/ui/photo'
import { IMAGES } from '@/lib/imagery'
import { href, routes } from '@/lib/i18n/routes'
import type { Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/dictionaries'
import { cn } from '@/lib/utils'

/**
 * Home hero.
 *
 * Four layers, back to front:
 *   1. precision grid       — static CSS, the engineering substrate
 *   2. ambient gold wash    — CSS keyframes, warmth and depth
 *   3. lattice field        — canvas, the only interactive layer
 *   4. content              — the only layer that receives pointer events
 *
 * Everything decorative is `pointer-events-none`, so the canvas can cover the
 * full section without ever stealing a click from the buttons.
 */
export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.home.hero
  const img = dict.imagery

  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-18">
      <div
        aria-hidden="true"
        className="grid-field pointer-events-none absolute inset-0 opacity-70"
        style={{
          maskImage: 'radial-gradient(ellipse 90% 70% at 50% 40%, black, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 40%, black, transparent 75%)',
        }}
      />
      <AmbientField />
      <LatticeField />

      <Container className="relative py-24">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <Entrance delay={0.1}>
            <div className="flex items-center gap-3">
              <Mark className="h-3.5 w-auto text-accent" />
              <span className="eyebrow">{t.eyebrow}</span>
            </div>
          </Entrance>

          <h1
            className={cn(
              'mt-8 font-display text-[clamp(3rem,8vw,6.5rem)] font-light leading-[0.92]',
              'tracking-[-0.035em]',
            )}
          >
            <LineReveal
              lines={[t.titleLine1]}
              delay={0.2}
              lineClassName="text-foreground"
            />
            <LineReveal
              lines={[t.titleLine2]}
              delay={0.29}
              lineClassName="italic text-brushed"
            />
          </h1>

          <Entrance delay={0.55}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
              {t.lead}
            </p>
          </Entrance>

          <Entrance delay={0.66}>
            <div className="mt-11 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={href(routes.contact, locale)}
                className={cn(
                  'group inline-flex h-13 items-center justify-center gap-2 rounded-full px-8',
                  'bg-foreground text-base font-medium text-background',
                  'shadow-[0_1px_2px_rgb(0_0_0/0.06),0_12px_28px_-10px_rgb(0_0_0/0.3)]',
                  'transition-[background-color,color,box-shadow,transform] duration-500',
                  '[transition-timing-function:var(--ease-out-expo)]',
                  'hover:bg-accent-strong hover:text-accent-contrast active:translate-y-px',
                )}
              >
                {t.primaryCta}
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>

              <Link
                href={href(routes.services, locale)}
                className={cn(
                  'group inline-flex h-13 items-center justify-center gap-2 rounded-full px-8',
                  'border border-border bg-elevated/50 text-base font-medium text-foreground backdrop-blur-sm',
                  'transition-[border-color,background-color,color] duration-500',
                  '[transition-timing-function:var(--ease-out-expo)]',
                  'hover:border-accent hover:text-accent-strong',
                )}
              >
                {t.secondaryCta}
              </Link>
            </div>
          </Entrance>
        </div>

        {/* Photo collage. Main office photo with a floating dashboard inset and
            two glass chips. Decorative motion is transform-only. */}
        <div className="relative lg:col-span-5">
          <Entrance delay={0.35} direction="left">
            <Photo
              src={IMAGES.home.hero}
              alt={img.heroAlt}
              sizes="(min-width: 1024px) 40vw, 100vw"
              preload
              className="aspect-[4/5] w-full shadow-[0_30px_80px_-30px_rgb(0_0_0/0.45)] sm:aspect-[5/4] lg:aspect-[4/5]"
            />
          </Entrance>

          <Entrance delay={0.6} className="absolute -bottom-8 -left-4 w-[52%] sm:-left-10">
            <div className="motion-safe:animate-[float_7s_ease-in-out_infinite]">
              <Photo
                src={IMAGES.home.heroInset}
                alt={img.heroInsetAlt}
                sizes="(min-width: 1024px) 20vw, 50vw"
                rounded="rounded-2xl"
                className="aspect-[4/3] w-full border-4 border-background shadow-[0_24px_50px_-20px_rgb(0_0_0/0.5)]"
              />
            </div>
          </Entrance>

          <Entrance delay={0.75} className="absolute right-4 top-4 max-w-[calc(100%-2rem)]">
            <div className="glass flex items-center gap-2.5 rounded-full px-4 py-2.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="whitespace-nowrap font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-foreground">
                {img.heroBadge}
              </span>
            </div>
          </Entrance>

          <Entrance delay={0.85} className="absolute -right-2 bottom-16 hidden sm:-right-6 sm:block">
            <div className="glass flex items-center gap-3 rounded-2xl px-4 py-3">
              <Mark className="h-3 w-auto text-accent" />
              <span className="text-sm font-medium text-foreground">{img.heroChip}</span>
            </div>
          </Entrance>
        </div>
        </div>
      </Container>

      {/* Scroll cue — hidden from assistive tech and from short viewports where
          it would collide with the content. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-8 hidden justify-center sm:flex"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="eyebrow">{t.scrollHint}</span>
          <ArrowDown className="h-3.5 w-3.5 text-accent motion-safe:animate-[scroll-hint_2.4s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  )
}
