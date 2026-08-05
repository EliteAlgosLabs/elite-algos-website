import { notFound } from 'next/navigation'
import { PageHeader, Panel, PlaceholderNotice } from '@/components/admin/primitives'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { LocaleSwitcher } from '@/components/layout/locale-switcher'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { isLocale } from '@/lib/i18n/config'
import { requirePermission } from '@/lib/auth/guard'

export default async function SettingsPage({ params }: PageProps<'/[locale]/admin/settings'>) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const session = await requirePermission('manageSettings', locale)
  const dict = await getDictionary(locale)
  const t = dict.admin.settings

  return (
    <>
      <PageHeader title={t.title} subtitle={t.subtitle} />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Profile — real data from the session. */}
        <Panel title={t.sections.profile}>
          <dl className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-sm text-muted">{dict.admin.common.name}</dt>
              <dd className="text-sm text-foreground">{session.name}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-sm text-muted">{dict.admin.common.email}</dt>
              <dd className="text-sm text-foreground">{session.email}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-sm text-muted">{dict.admin.common.role}</dt>
              <dd className="text-sm text-foreground">{dict.admin.roles.names[session.role]}</dd>
            </div>
          </dl>
        </Panel>

        {/* Appearance and language — genuinely functional. */}
        <Panel title={t.sections.appearance}>
          <div className="space-y-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-foreground">{t.theme}</p>
                <p className="mt-1 text-sm text-muted">
                  {t.themeLight} · {t.themeDark}
                </p>
              </div>
              <ThemeToggle />
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-border pt-5">
              <p className="text-sm text-foreground">{t.language}</p>
              <LocaleSwitcher />
            </div>
          </div>
        </Panel>

        <Panel title={t.sections.security} className="lg:col-span-2">
          <PlaceholderNotice
            message={dict.admin.common.placeholderNotice}
            detail={
              locale === 'fr'
                ? 'Les comptes opérateurs sont définis via la variable d’environnement ADMIN_ACCOUNTS et les mots de passe sont hachés avec scrypt. L’authentification à deux facteurs et la gestion des clés API restent à implémenter — voir docs/deployment.md.'
                : 'Operator accounts are defined through the ADMIN_ACCOUNTS environment variable and passwords are hashed with scrypt. Two-factor authentication and API key management are not yet implemented — see docs/deployment.md.'
            }
          />
        </Panel>
      </div>
    </>
  )
}
