import { notFound } from 'next/navigation'
import { ModuleScaffold } from '@/components/admin/module-scaffold'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { isLocale } from '@/lib/i18n/config'
import { requirePermission } from '@/lib/auth/guard'

export default async function BrainPage({ params }: PageProps<'/[locale]/admin/brain'>) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  await requirePermission('viewDashboard', locale)
  const dict = await getDictionary(locale)
  const t = dict.admin.brain

  return (
    <ModuleScaffold
      title={t.title}
      subtitle={t.subtitle}
      notice={t.syncNote}
      detail={
        locale === 'fr'
          ? 'Le coffre vit dans le dépôt company-brain. Ce module lira son index une fois le dépôt monté ou son API de lecture exposée ; en attendant, la source de vérité reste Git et Obsidian.'
          : 'The vault lives in the company-brain repository. This module will read its index once that repository is mounted or its read API is exposed; until then Git and Obsidian remain the source of truth.'
      }
      tiles={[t.notes, t.categories, t.lastSync, dict.admin.common.lastUpdated]}
      panels={[{ title: t.recentlyUpdated, empty: dict.admin.common.noResults }]}
    />
  )
}
