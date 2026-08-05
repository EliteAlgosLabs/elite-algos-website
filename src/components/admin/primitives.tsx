import { Info } from 'lucide-react'
import { Badge } from '@/components/ui/card'
import { cn } from '@/lib/utils'

/* ============================================================================
   DASHBOARD PRIMITIVES
   ----------------------------------------------------------------------------
   The dashboard uses a tighter, denser scale than the marketing site: smaller
   type, less whitespace, more information per screen. These primitives encode
   that so no module has to re-decide it.
   ========================================================================== */

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string
  subtitle?: string
  actions?: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-4 pb-8 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="font-display text-3xl leading-tight tracking-tight">{title}</h1>
        {subtitle ? <p className="mt-2 text-sm text-muted">{subtitle}</p> : null}
      </div>
      {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
    </div>
  )
}

export function Panel({
  title,
  action,
  children,
  className,
}: {
  title?: string
  action?: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  return (
    <section className={cn('rounded-xl border border-border bg-elevated/40', className)}>
      {title ? (
        <header className="flex items-center justify-between gap-4 border-b border-border px-5 py-3.5">
          <h2 className="text-sm font-semibold text-foreground">{title}</h2>
          {action}
        </header>
      ) : null}
      <div className="p-5">{children}</div>
    </section>
  )
}

/**
 * A single figure. `trend` is rendered but intentionally unstyled as
 * green/red — until the analytics source is real, colouring a made-up delta
 * would imply a measurement we do not have.
 */
export function StatTile({
  label,
  value,
  hint,
}: {
  label: string
  value: string
  hint?: string
}) {
  return (
    <div className="rounded-xl border border-border bg-elevated/40 p-5">
      <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted">{label}</p>
      <p className="mt-3 font-display text-3xl leading-none tracking-tight text-foreground">
        {value}
      </p>
      {hint ? <p className="mt-2 text-xs text-muted">{hint}</p> : null}
    </div>
  )
}

/**
 * Marks a module whose data source is not yet connected.
 *
 * Every scaffolded screen carries one. It states plainly what is missing and
 * what would connect it, so nobody — including us in six months — mistakes a
 * layout for a working integration.
 */
export function PlaceholderNotice({
  message,
  detail,
}: {
  message: string
  detail?: string
}) {
  return (
    <div className="flex gap-3 rounded-xl border border-dashed border-border bg-surface/50 p-5">
      <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-muted" />
      <div>
        <p className="text-sm text-foreground">{message}</p>
        {detail ? <p className="mt-1.5 text-sm leading-relaxed text-muted">{detail}</p> : null}
      </div>
    </div>
  )
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-dashed border-border px-5 py-12 text-center">
      <p className="text-sm text-muted">{message}</p>
    </div>
  )
}

/** Simple, accessible data table. Wrapped so wide tables scroll rather than
 *  forcing the page to scroll horizontally. */
export function DataTable<T>({
  columns,
  rows,
  getKey,
  empty,
}: {
  columns: { key: string; header: string; render: (row: T) => React.ReactNode; className?: string }[]
  rows: T[]
  getKey: (row: T) => string
  empty: string
}) {
  if (rows.length === 0) return <EmptyState message={empty} />

  return (
    <div className="-mx-5 overflow-x-auto px-5">
      <table className="w-full min-w-[36rem] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border">
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={cn(
                  'py-2.5 pr-4 text-left font-mono text-[0.625rem] uppercase tracking-[0.14em] font-normal text-muted',
                  column.className,
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={getKey(row)} className="border-b border-border/60 last:border-0">
              {columns.map((column) => (
                <td key={column.key} className={cn('py-3.5 pr-4 align-top', column.className)}>
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function StatusDot({
  tone,
  label,
}: {
  tone: 'online' | 'degraded' | 'offline' | 'standby'
  label: string
}) {
  const colour = {
    online: 'bg-emerald-500',
    degraded: 'bg-amber-500',
    offline: 'bg-red-500',
    standby: 'bg-ink-400',
  }[tone]

  return (
    <span className="inline-flex items-center gap-2">
      <span aria-hidden="true" className="relative inline-flex h-2 w-2">
        {tone === 'online' ? (
          <span
            className={cn(
              'absolute inline-flex h-2 w-2 rounded-full opacity-70',
              colour,
              'motion-safe:animate-[pulse-ring_2.4s_ease-out_infinite]',
            )}
          />
        ) : null}
        <span className={cn('relative inline-flex h-2 w-2 rounded-full', colour)} />
      </span>
      <span className="text-sm text-foreground">{label}</span>
    </span>
  )
}

export { Badge }
