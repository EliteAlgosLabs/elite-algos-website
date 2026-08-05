import Link from 'next/link'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { Mark } from '@/components/brand/mark'
import { LatticeField } from '@/components/motion/lattice-field'
import { Entrance, LineReveal } from '@/components/motion/primitives'
import { AmbientField, Container } from '@/components/ui/layout'
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
        <div className="max-w-4xl">
          <Entrance delay={0.1}>
            <div className="flex items-center gap-3">
              <Mark className="h-3.5 w-auto text-accent" />
              <span className="eyebrow">{t.eyebrow}</span>
            </div>
          </Entrance>

          <h1
            className={cn(
              'mt-8 font-display text-[clamp(3rem,9vw,7.5rem)] font-light leading-[0.92]',
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
                href={href(routes.portfolio, locale)}
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
