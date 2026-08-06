import { notFound } from 'next/navigation'
import { PageHeader, Panel, StatusDot } from '@/components/admin/primitives'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { isLocale, type Locale } from '@/lib/i18n/config'
import { requirePermission } from '@/lib/auth/guard'
import { agentStore, type AgentView } from '@/lib/agents/store'

/**
 * AI agent status — LIVE.
 *
 * Reads heartbeats posted by each agent to `/api/agents/heartbeat`. An agent
 * that has checked in within the last 5 minutes shows Online; 30 minutes,
 * Degraded; otherwise Offline. Fields that an agent has not reported show "—"
 * rather than an invented value.
 */
export default async function AgentsPage({ params }: PageProps<'/[locale]/admin/agents'>) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  await requirePermission('viewAgents', locale)
  const dict = await getDictionary(locale)
  const t = dict.admin.agents

  const agents = await agentStore.list()
  const meta: Record<string, { name: string; role: string }> = {
    lexa: { name: 'Lexa', role: t.lexaRole },
    aelyn: { name: 'Aelyn', role: t.aelynRole },
  }

  return (
    <>
      <PageHeader title={t.title} subtitle={t.subtitle} />

      <div className="grid gap-6 lg:grid-cols-2">
        {agents.map((agent) => {
          const info = meta[agent.agent] ?? { name: agent.agent, role: '' }
          const tone =
            agent.live === 'online' ? 'online' : agent.live === 'stale' ? 'degraded' : 'offline'
          const statusLabel =
            agent.live === 'online'
              ? t.status.online
              : agent.live === 'stale'
                ? t.status.degraded
                : t.status.offline

          return (
            <Panel key={agent.agent}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl leading-none">{info.name}</h2>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">{info.role}</p>
                </div>
                <StatusDot tone={tone} label={statusLabel} />
              </div>

              {agent.task ? (
                <div className="mt-6 rounded-lg bg-surface px-4 py-3">
                  <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted">
                    {t.currentTask}
                  </p>
                  <p className="mt-1 text-sm text-foreground">{agent.task}</p>
                </div>
              ) : null}

              <dl className="mt-8 grid grid-cols-2 gap-5 border-t border-border pt-5 sm:grid-cols-3">
                <Field label={t.lastHeartbeat} value={relativeTime(agent, t, locale)} />
                <Field
                  label={t.tasksToday}
                  value={agent.tasksToday != null ? String(agent.tasksToday) : '—'}
                />
                <Field label={t.model} value={agent.model ?? '—'} />
              </dl>
            </Panel>
          )
        })}
      </div>
    </>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted">{label}</dt>
      <dd className="mt-2 text-sm text-foreground">{value}</dd>
    </div>
  )
}

function relativeTime(
  agent: AgentView,
  t: {
    neverSeen: string
    justNow: string
    minutesAgo: string
    hoursAgo: string
    daysAgo: string
  },
  _locale: Locale,
): string {
  if (agent.ageSeconds == null) return t.neverSeen
  const s = agent.ageSeconds
  if (s < 60) return t.justNow
  if (s < 3600) return `${Math.floor(s / 60)} ${t.minutesAgo}`
  if (s < 86_400) return `${Math.floor(s / 3600)} ${t.hoursAgo}`
  return `${Math.floor(s / 86_400)} ${t.daysAgo}`
}
