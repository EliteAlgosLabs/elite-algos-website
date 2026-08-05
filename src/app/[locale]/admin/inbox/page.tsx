import { notFound } from 'next/navigation'
import { PageHeader, Panel, PlaceholderNotice, DataTable, Badge } from '@/components/admin/primitives'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { isLocale } from '@/lib/i18n/config'
import { requirePermission } from '@/lib/auth/guard'
import { submissions, type Submission } from '@/lib/contact/store'
import { formatDate } from '@/lib/utils'

export default async function InboxPage({ params }: PageProps<'/[locale]/admin/inbox'>) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  await requirePermission('manageInbox', locale)

  const [dict, items] = await Promise.all([getDictionary(locale), submissions.list()])
  const t = dict.admin.inbox
  const c = dict.admin.common

  return (
    <>
      <PageHeader title={t.title} subtitle={t.subtitle} />

      <div className="mb-6">
        <PlaceholderNotice
          message={
            locale === 'fr'
              ? 'Les messages sont conservés en mémoire et ne survivent pas à un redémarrage.'
              : 'Submissions are held in memory and do not survive a restart.'
          }
          detail={
            locale === 'fr'
              ? 'Le formulaire de contact fonctionne de bout en bout, mais la persistance est volontairement laissée ouverte. Branchez un adaptateur email ou une base de données dans src/lib/contact/store.ts avant de compter sur cette boîte de réception.'
              : 'The contact form works end to end, but persistence is deliberately left open. Wire an email adapter or a database into src/lib/contact/store.ts before relying on this inbox.'
          }
        />
      </div>

      <Panel>
        <DataTable<Submission>
          rows={items}
          getKey={(row) => row.id}
          empty={t.empty}
          columns={[
            {
              key: 'from',
              header: t.from,
              render: (row) => (
                <div className="min-w-0">
                  <p className="font-medium text-foreground">{row.name}</p>
                  <p className="truncate text-muted">{row.email}</p>
                  {row.company ? <p className="truncate text-muted">{row.company}</p> : null}
                </div>
              ),
            },
            {
              key: 'topic',
              header: t.topic,
              render: (row) => (
                <Badge>{dict.contact.form.topicOptions[row.topic]}</Badge>
              ),
            },
            {
              key: 'message',
              header: c.title,
              render: (row) => (
                <p className="max-w-md text-muted">{row.message.slice(0, 140)}…</p>
              ),
            },
            {
              key: 'status',
              header: c.status,
              render: (row) => (
                <Badge tone={row.status === 'unread' ? 'accent' : 'muted'}>
                  {t[row.status]}
                </Badge>
              ),
            },
            {
              key: 'received',
              header: t.received,
              render: (row) => (
                <time dateTime={row.receivedAt} className="whitespace-nowrap text-muted">
                  {formatDate(row.receivedAt, locale, { day: 'numeric', month: 'short' })}
                </time>
              ),
            },
          ]}
        />
      </Panel>
    </>
  )
}
