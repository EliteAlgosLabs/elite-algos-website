import { Entrance } from '@/components/motion/primitives'
import { AmbientField, Container, Eyebrow } from '@/components/ui/layout'
import { Photo, PhotoCaption } from '@/components/ui/photo'
import { cn } from '@/lib/utils'

/**
 * Standard interior-page hero.
 *
 * Every page except the home page opens with this, which is what makes the site
 * feel like one product rather than a collection of pages. It animates on mount
 * rather than on scroll — it is always above the fold.
 *
 * Pass `image` to get the split layout: copy on the left, a photograph on the
 * right that slides in from the side. Without it the hero is text-only.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  children,
  className,
}: {
  eyebrow: string
  title: string
  lead?: string
  image?: { src: string; alt: string; caption?: string }
  /** Badges, filters or metadata rendered under the lead. */
  children?: React.ReactNode
  className?: string
}) {
  return (
    <section className={cn('relative isolate overflow-hidden pt-18', className)}>
      <div
        aria-hidden="true"
        className="grid-field pointer-events-none absolute inset-0 opacity-60"
        style={{
          maskImage: 'radial-gradient(ellipse 80% 100% at 30% 0%, black, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 100% at 30% 0%, black, transparent 70%)',
        }}
      />
      <AmbientField intensity="subtle" />

      <Container className="relative pb-16 pt-20 sm:pb-20 sm:pt-28">
        <div className={cn(image && 'grid items-center gap-12 lg:grid-cols-12 lg:gap-14')}>
          <div className={cn(image && 'lg:col-span-7')}>
            <Entrance>
              <Eyebrow>{eyebrow}</Eyebrow>
            </Entrance>
            <Entrance delay={0.08}>
              <h1 className="mt-7 max-w-4xl text-[clamp(2.5rem,6.5vw,5rem)] leading-[1.02] tracking-[-0.03em]">
                {title}
              </h1>
            </Entrance>
            {lead ? (
              <Entrance delay={0.16}>
                <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{lead}</p>
              </Entrance>
            ) : null}
            {children ? <Entrance delay={0.24}>{children}</Entrance> : null}
          </div>

          {image ? (
            <Entrance delay={0.3} direction="left" className="lg:col-span-5">
              <Photo
                src={image.src}
                alt={image.alt}
                sizes="(min-width: 1024px) 40vw, 100vw"
                preload
                className="aspect-[16/10] w-full shadow-[0_30px_80px_-30px_rgb(0_0_0/0.45)] lg:aspect-[4/5]"
              >
                {image.caption ? <PhotoCaption>{image.caption}</PhotoCaption> : null}
              </Photo>
            </Entrance>
          ) : null}
        </div>
      </Container>
    </section>
  )
}
