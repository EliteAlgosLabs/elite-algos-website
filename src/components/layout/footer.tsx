import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Mark } from '@/components/brand/mark'
import { Container, Hairline } from '@/components/ui/layout'
import { COMPANY } from '@/lib/brand'
import { href, primaryNav, routes } from '@/lib/i18n/routes'
import type { Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/dictionaries'
import { cn } from '@/lib/utils'

/**
 * Site footer. A Server Component — it is entirely static, so none of these
 * strings need to reach the client bundle.
 */
export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear()

  const contactLinks = [
    { label: dict.contact.channels.business.label, email: COMPANY.email.business },
    { label: dict.contact.channels.general.label, email: COMPANY.email.general },
    { label: dict.contact.channels.founder.label, email: COMPANY.email.founder },
  ]

  return (
    <footer className="relative overflow-hidden border-t border-border bg-surface">
      {/* Oversized mark bled off the bottom edge — a quiet brand signature that
          costs one SVG and no images. */}
      <Mark
        className={cn(
          'pointer-events-none absolute -bottom-24 -right-16 h-64 w-auto',
          'text-accent opacity-[0.045] sm:-bottom-32 sm:h-96',
        )}
      />

      <Container className="relative">
        <div className="grid gap-12 py-20 lg:grid-cols-12 lg:gap-8">
          {/* Identity */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <Mark className="h-5 w-auto text-accent" />
              <span className="font-wordmark text-base font-medium uppercase tracking-[0.16em]">
                {COMPANY.shortName}
              </span>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">{dict.footer.blurb}</p>
            <p className="mt-6 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
              {dict.common.sealMotto}
            </p>
          </div>

          {/* Navigate */}
          <nav className="lg:col-span-3" aria-label={dict.footer.navTitle}>
            <h2 className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted">
              {dict.footer.navTitle}
            </h2>
            <ul className="mt-5 space-y-3">
              {primaryNav.map((item) => (
                <li key={item.key}>
                  <Link
                    href={href(item.path, locale)}
                    className="text-sm text-foreground transition-colors duration-300 hover:text-accent-strong"
                  >
                    {dict.nav[item.key]}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={href(routes.contact, locale)}
                  className="text-sm text-foreground transition-colors duration-300 hover:text-accent-strong"
                >
                  {dict.nav.contact}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h2 className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted">
              {dict.footer.contactTitle}
            </h2>
            <ul className="mt-5 space-y-4">
              {contactLinks.map((item) => (
                <li key={item.email}>
                  <a
                    href={`mailto:${item.email}`}
                    className="group inline-flex flex-col gap-0.5"
                  >
                    <span className="text-[0.8125rem] text-muted">{item.label}</span>
                    <span className="inline-flex items-center gap-1 text-sm text-foreground transition-colors duration-300 group-hover:text-accent-strong">
                      {item.email}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-3 w-3 opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                      />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Hairline />

        <div className="flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.6875rem] tracking-[0.08em] text-muted">
            © {year} {COMPANY.legalName}. {dict.footer.rights}
          </p>
          {COMPANY.incorporationNumber ? (
            <p className="font-mono text-[0.6875rem] tracking-[0.08em] text-muted">
              {dict.footer.incorporation} {COMPANY.incorporationNumber}
            </p>
          ) : null}
        </div>
      </Container>
    </footer>
  )
}
