import { notFound } from 'next/navigation'
import { PageHeader, Panel, PlaceholderNotice, StatusDot } from '@/components/admin/primitives'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { isLocale } from '@/lib/i18n/config'
import { requirePermission } from '@/lib/auth/guard'

/**
 * AI agent status.
 *
 * Lexa and Aelyn are real systems in the Elite Algos Labs stack, but nothing
 * here is connected to them yet. Every field therefore reads "—" rather than a
 * plausible-looking number: a dashboard that invents an uptime figure is worse
 * than one that admits it has none, because the first will be believed.
 *
 * TO CONNECT: have each agent POST a heartbeat to `/api/agents/heartbeat` with
 * its status, model and task count, and replace `agents` below with a read from
 * that store. See `docs/deployment.md`.
 */
export default async function AgentsPage({ params }: PageProps<'/[locale]/admin/agents'>) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  await requirePermission('viewAgents', locale)
  const dict = await getDictionary(locale)
  const t = dict.admin.agents

  const agents = [
    { id: 'lexa', name: 'Lexa', role: t.lexaRole },
    { id: 'aelyn', name: 'Aelyn', role: t.aelynRole },
  ]

  return (
    <>
      <PageHeader title={t.title} subtitle={t.subtitle} />

      <div className="mb-6">
        <PlaceholderNotice
          message={dict.admin.common.placeholderNotice}
          detail={
            locale === 'fr'
              ? 'Aucun agent ne transmet encore de signal. Les valeurs affichées sont vides plutôt que simulées.'
              : 'No agent is reporting a heartbeat yet. Values are shown as empty rather than simulated.'
          }
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {agents.map((agent) => (
          <Panel key={agent.id}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl leading-none">{agent.name}</h2>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">{agent.role}</p>
              </div>
              <StatusDot tone="standby" label={t.status.standby} />
            </div>

            <dl className="mt-8 grid grid-cols-2 gap-5 border-t border-border pt-5 sm:grid-cols-4">
              {[t.uptime, t.lastHeartbeat, t.tasksToday, t.model].map((label) => (
                <div key={label}>
                  <dt className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted">
                    {label}
                  </dt>
                  <dd className="mt-2 text-sm text-muted">—</dd>
                </div>
              ))}
            </dl>
          </Panel>
        ))}
      </div>
    </>
  )
}
