import Link from 'next/link'
import { cn } from '@/lib/utils'

/* ============================================================================
   BUTTON
   ----------------------------------------------------------------------------
   One component, two element types. `href` renders a `<Link>`, otherwise a
   `<button>` — so a "button" that navigates is never a div with an onClick,
   and keyboard and middle-click behaviour stay correct for free.
   ========================================================================== */

type Variant = 'primary' | 'secondary' | 'ghost' | 'link'
type Size = 'sm' | 'md' | 'lg'

const base =
  'relative inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap ' +
  'transition-[background-color,border-color,color,box-shadow,transform] duration-300 ' +
  '[transition-timing-function:var(--ease-out-expo)] ' +
  'disabled:pointer-events-none disabled:opacity-50 ' +
  'active:translate-y-px'

const variants: Record<Variant, string> = {
  // Solid charcoal in light mode, soft white in dark: maximum contrast against
  // the page, with gold reserved for accents so it never becomes wallpaper.
  primary:
    'bg-foreground text-background hover:bg-accent-strong hover:text-accent-contrast ' +
    'shadow-[0_1px_2px_rgb(0_0_0/0.06),0_8px_20px_-8px_rgb(0_0_0/0.25)] ' +
    'hover:shadow-[0_1px_2px_rgb(0_0_0/0.08),0_16px_32px_-12px_rgb(0_0_0/0.35)]',
  secondary:
    'border border-border bg-elevated/60 text-foreground backdrop-blur-sm ' +
    'hover:border-accent hover:bg-elevated hover:text-accent-strong',
  ghost: 'text-foreground hover:bg-surface',
  link: 'text-accent-strong underline-offset-4 hover:underline p-0 h-auto',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 rounded-full px-4 text-sm',
  md: 'h-11 rounded-full px-6 text-[0.9375rem]',
  lg: 'h-13 rounded-full px-8 text-base',
}

type CommonProps = {
  variant?: Variant
  size?: Size
  className?: string
  children: React.ReactNode
}

type ButtonAsLink = CommonProps & {
  href: string
  external?: boolean
} & Omit<React.ComponentPropsWithoutRef<typeof Link>, 'href' | 'className' | 'children'>

type ButtonAsButton = CommonProps & {
  href?: never
  external?: never
} & Omit<React.ComponentPropsWithoutRef<'button'>, 'className' | 'children'>

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = 'primary', size = 'md', className, children } = props

  const classes = cn(
    base,
    variants[variant],
    variant === 'link' ? undefined : sizes[size],
    className,
  )

  if ('href' in props && props.href !== undefined) {
    const { href, external, variant: _v, size: _s, className: _c, children: _ch, ...rest } = props
    void _v
    void _s
    void _c
    void _ch

    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          {...(rest as React.ComponentPropsWithoutRef<'a'>)}
        >
          {children}
        </a>
      )
    }

    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    )
  }

  const { variant: _v, size: _s, className: _c, children: _ch, ...rest } = props as ButtonAsButton
  void _v
  void _s
  void _c
  void _ch

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  )
}
