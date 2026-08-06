import { notFound } from 'next/navigation'
import { PageHeader, Panel, DataTable, Badge } from '@/components/admin/primitives'
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
