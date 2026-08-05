import { notFound } from 'next/navigation'
import { ModuleScaffold } from '@/components/admin/module-scaffold'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { isLocale } from '@/lib/i18n/config'
import { requirePermission } from '@/lib/auth/guard'

export default async function DirectoryPage({ params }: PageProps<'/[locale]/admin/directory'>) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  await requirePermission('manageTeam', locale)
  const dict = await getDictionary(locale)
  const t = dict.admin.directory

  return (
    <ModuleScaffold
      title={t.title}
      subtitle={t.subtitle}
      notice={dict.admin.common.placeholderNotice}
      detail={
        locale === 'fr'
          ? 'L’annuaire s’alimentera à partir du module Équipe une fois des membres enregistrés. Les coordonnées internes ne sont jamais exposées sur le site public.'
          : 'The directory will populate from the Team module once members are recorded. Internal contact details are never exposed on the public site.'
      }
      tiles={[t.department, t.location, t.timezone, t.reportsTo]}
    />
  )
}
