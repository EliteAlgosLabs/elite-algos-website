import { notFound } from 'next/navigation'
import { ModuleScaffold } from '@/components/admin/module-scaffold'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { isLocale } from '@/lib/i18n/config'
import { requirePermission } from '@/lib/auth/guard'

export default async function VisitorsPage({ params }: PageProps<'/[locale]/admin/visitors'>) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  await requirePermission('viewAnalytics', locale)
  const dict = await getDictionary(locale)
  const t = dict.admin.visitors

  return (
    <ModuleScaffold
      title={t.title}
      subtitle={t.subtitle}
      notice={dict.admin.common.placeholderNotice}
      detail={
        locale === 'fr'
          ? 'Ce module partagera la source de données du module Statistiques. Il n’enregistrera aucune donnée personnelle identifiable — pays et langue agrégés uniquement, jamais d’adresses IP conservées.'
          : 'This module will share the Analytics data source. It will record no personally identifying data — aggregate country and language only, never retained IP addresses.'
      }
      tiles={[t.liveNow, t.new, t.returning, t.language]}
      panels={[
        { title: t.country, empty: dict.admin.common.noResults },
        { title: t.device, empty: dict.admin.common.noResults },
        { title: t.landingPage, empty: dict.admin.common.noResults },
        { title: t.referrer, empty: dict.admin.common.noResults },
      ]}
    />
  )
}
