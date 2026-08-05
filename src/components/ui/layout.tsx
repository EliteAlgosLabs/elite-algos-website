import { cn } from '@/lib/utils'
import { Reveal } from '@/components/motion/primitives'

/**
 * The single horizontal rhythm for the whole site.
 *
 * Every page section uses this. If a layout needs different gutters, that is a
 * signal the design is drifting — fix the design, not the container.
 */
export function Container({
  children,
  className,
  size = 'default',
}: {
  children: React.ReactNode
  className?: string
  /** `narrow` for prose, `default` for most sections, `wide` for galleries. */
  size?: 'narrow' | 'default' | 'wide'
}) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-6 sm:px-8 lg:px-12',
        size === 'narrow' && 'max-w-3xl',
        size === 'default' && 'max-w-7xl',
        size === 'wide' && 'max-w-[110rem]',
        className,
      )}
    >
      {children}
    </div>
  )
}

/** Vertical rhythm. Sections are generous — whitespace is the luxury signal. */
export function Section({
  children,
  className,
  id,
  tone = 'default',
  spacing = 'default',
}: {
  children: React.ReactNode
  className?: string
  id?: string
  tone?: 'default' | 'surface'
  spacing?: 'default' | 'tight' | 'loose'
}) {
  return (
    <section
      id={id}
      className={cn(
        'relative',
        tone === 'surface' && 'bg-surface',
        spacing === 'tight' && 'py-16 sm:py-20',
        spacing === 'default' && 'py-24 sm:py-32 lg:py-40',
        spacing === 'loose' && 'py-32 sm:py-40 lg:py-52',
        className,
      )}
    >
      {children}
    </section>
  )
}

/** Mono, wide-tracked label with the hairline gold rule. Opens every section. */
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <span aria-hidden="true" className="rule-gold h-px w-8 shrink-0" />
      <span className="eyebrow">{children}</span>
    </div>
  )
}

/**
 * Standard section header: eyebrow, headline, optional lead paragraph.
 * Used on every page so the vertical rhythm and type scale stay identical.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'left',
  className,
  as: Heading = 'h2',
}: {
  eyebrow?: string
  title: React.ReactNode
  lead?: string
  align?: 'left' | 'center'
  className?: string
  as?: 'h1' | 'h2' | 'h3'
}) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow ? (
        <Reveal>
          <Eyebrow className={align === 'center' ? 'justify-center' : undefined}>{eyebrow}</Eyebrow>
        </Reveal>
      ) : null}

      <Reveal delay={0.06}>
        <Heading
          className={cn(
            'mt-6 text-balance text-4xl leading-[1.08] sm:text-5xl lg:text-[3.5rem]',
          )}
        >
          {title}
        </Heading>
      </Reveal>

      {lead ? (
        <Reveal delay={0.12}>
          <p className="mt-6 text-lg leading-relaxed text-muted sm:text-xl">{lead}</p>
        </Reveal>
      ) : null}
    </div>
  )
}

/**
 * Slow-drifting gold wash. Purely decorative; sits behind content at low
 * opacity. CSS-only, so it costs nothing on the main thread.
 */
export function AmbientField({
  className,
  intensity = 'default',
}: {
  className?: string
  intensity?: 'subtle' | 'default' | 'strong'
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden',
        intensity === 'subtle' && 'opacity-50',
        intensity === 'strong' && 'opacity-100',
        className,
      )}
    >
      <div
        className="absolute -top-1/3 left-1/2 h-[70rem] w-[70rem] -translate-x-1/2 rounded-full blur-3xl motion-safe:animate-[drift-a_28s_ease-in-out_infinite]"
        style={{ background: 'radial-gradient(circle, var(--field-a) 0%, transparent 62%)' }}
      />
      <div
        className="absolute -bottom-1/2 right-0 h-[52rem] w-[52rem] rounded-full blur-3xl motion-safe:animate-[drift-b_34s_ease-in-out_infinite]"
        style={{ background: 'radial-gradient(circle, var(--field-b) 0%, transparent 65%)' }}
      />
    </div>
  )
}

/** Hairline divider that fades at both ends. */
export function Hairline({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn('h-px w-full', className)}
      style={{
        backgroundImage:
          'linear-gradient(to right, transparent, var(--border) 15%, var(--border) 85%, transparent)',
      }}
    />
  )
}
