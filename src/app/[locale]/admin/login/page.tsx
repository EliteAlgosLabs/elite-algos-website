import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { SignInForm } from '@/components/admin/sign-in-form'
import { Mark } from '@/components/brand/mark'
import { AmbientField } from '@/components/ui/layout'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { isLocale } from '@/lib/i18n/config'
import { href, routes } from '@/lib/i18n/routes'
import { getSession } from '@/lib/auth/session'

export const metadata: Metadata = {
  title: 'Command Center',
  robots: { index: false, follow: false },
}

export default async function LoginPage({ params }: PageProps<'/[locale]/admin/login'>) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  // Already signed in — no reason to show the form again.
  if (await getSession()) redirect(`/${locale}/admin`)

  const dict = await getDictionary(locale)
  const t = dict.admin.signIn

  return (
    <div className="relative isolate flex min-h-dvh items-center justify-center overflow-hidden px-6 py-16">
      <div aria-hidden="true" className="grid-field pointer-events-none absolute inset-0 opacity-60" />
      <AmbientField intensity="subtle" />

      <div className="relative w-full max-w-sm">
        <div className="flex flex-col items-center text-center">
          <Mark variant="gradient" idSuffix="login" className="h-8 w-auto" />
          <h1 className="mt-8 font-display text-3xl leading-tight">{t.title}</h1>
          <p className="mt-2 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
            {t.subtitle}
          </p>
        </div>

        <div className="glass mt-10 rounded-2xl p-8">
          <SignInForm locale={locale} dict={dict} />
        </div>

        <p className="mt-6 text-center text-xs leading-relaxed text-muted">{t.restricted}</p>

        <div className="mt-6 flex justify-center">
          <Link
            href={href(routes.home, locale)}
            className="group inline-flex items-center gap-2 text-sm text-muted transition-colors duration-300 hover:text-foreground"
          >
            <ArrowLeft
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-500 group-hover:-translate-x-1"
            />
            {t.back}
          </Link>
        </div>
      </div>
    </div>
  )
}
