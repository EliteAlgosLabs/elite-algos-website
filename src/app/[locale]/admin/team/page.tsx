import { notFound } from 'next/navigation'
import { DataTable, PageHeader, Panel, PlaceholderNotice } from '@/components/admin/primitives'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { isLocale } from '@/lib/i18n/config'
import { requirePermission } from '@/lib/auth/guard'
import { content } from '@/lib/content/repository'
import type { TeamMember } from '@/lib/content/types'

export default async function TeamPage({ params }: PageProps<'/[locale]/admin/team'>) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  await requirePermission('manageTeam', locale)
  const [dict, members] = await Promise.all([getDictionary(locale), content.listTeam()])
  const t = dict.admin.team

  return (
    <>
      <PageHeader title={t.title} subtitle={t.subtitle} />

      <div className="mb-6">
        <PlaceholderNotice
          message={
            locale === 'fr'
              ? 'Aucun membre n’est enregistré.'
              : 'No team members are recorded.'
          }
          detail={
            locale === 'fr'
              ? 'Ajoutez de vraies personnes dans src/lib/content/data/team.ts : la grille apparaîtra automatiquement sur la page À propos et ici. Aucun profil fictif n’a été créé — nommer quelqu’un sur le site public est une affirmation factuelle.'
              : 'Add real people in src/lib/content/data/team.ts and the grid appears automatically on the About page and here. No placeholder profiles were created — naming someone on a public site is a factual claim.'
          }
        />
      </div>

      <Panel>
        <DataTable<TeamMember>
          rows={members}
          getKey={(row) => row.id}
          empty={dict.admin.common.noResults}
          columns={[
            {
              key: 'name',
              header: dict.admin.common.name,
              render: (row) => <span className="font-medium text-foreground">{row.name}</span>,
            },
            {
              key: 'role',
              header: t.position,
              render: (row) => <span className="text-muted">{row.role[locale]}</span>,
            },
            {
              key: 'focus',
              header: t.focus,
              render: (row) => <span className="text-muted">{row.focus[locale]}</span>,
            },
          ]}
        />
      </Panel>
    </>
  )
}
