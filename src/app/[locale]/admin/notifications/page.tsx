import { notFound } from 'next/navigation'
import { EmptyState, PageHeader, Panel, PlaceholderNotice } from '@/components/admin/primitives'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { isLocale } from '@/lib/i18n/config'
import { requirePermission } from '@/lib/auth/guard'

export default async function NotificationsPage({
  params,
}: PageProps<'/[locale]/admin/notifications'>) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  await requirePermission('viewDashboard', locale)
  const dict = await getDictionary(locale)
  const t = dict.admin.notifications

  return (
    <>
      <PageHeader title={t.title} subtitle={t.subtitle} />

      <div className="mb-6">
        <PlaceholderNotice
          message={dict.admin.common.placeholderNotice}
          detail={
            locale === 'fr'
              ? 'Les événements proviendront de trois sources : nouvelles demandes de contact, déploiements et signaux des agents. Aucune n’est encore branchée.'
              : 'Events will come from three sources: new contact enquiries, deployments, and agent heartbeats. None is wired yet.'
          }
        />
      </div>

      <Panel>
        <EmptyState message={t.empty} />
      </Panel>
    </>
  )
}
