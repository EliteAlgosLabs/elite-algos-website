import { notFound } from 'next/navigation'
import { ModuleScaffold } from '@/components/admin/module-scaffold'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { isLocale } from '@/lib/i18n/config'
import { requirePermission } from '@/lib/auth/guard'

export default async function AnalyticsPage({ params }: PageProps<'/[locale]/admin/analytics'>) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  await requirePermission('viewAnalytics', locale)
  const dict = await getDictionary(locale)
  const t = dict.admin.analytics

  return (
    <ModuleScaffold
      title={t.title}
      subtitle={t.subtitle}
      notice={dict.admin.common.placeholderNotice}
      detail={
        locale === 'fr'
          ? 'Aucun fournisseur d’analytique n’est connecté. Nous recommandons une solution respectueuse de la vie privée et sans cookie (Plausible ou Umami, auto-hébergeable sur le même serveur Oracle) afin d’éviter une bannière de consentement. Voir docs/deployment.md.'
          : 'No analytics provider is connected. We recommend a privacy-preserving, cookie-free option (Plausible or Umami, both self-hostable on the same Oracle server) so the site needs no consent banner. See docs/deployment.md.'
      }
      tiles={[t.metrics.visitors, t.metrics.pageviews, t.metrics.avgDuration, t.metrics.bounce]}
      panels={[
        { title: t.topPages, empty: dict.admin.common.noResults },
        { title: t.topSources, empty: dict.admin.common.noResults },
        { title: t.byCountry, empty: dict.admin.common.noResults },
        { title: t.byLanguage, empty: dict.admin.common.noResults },
      ]}
    />
  )
}
