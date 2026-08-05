import { notFound } from 'next/navigation'
import { Check, Minus } from 'lucide-react'
import { PageHeader, Panel, PlaceholderNotice } from '@/components/admin/primitives'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { isLocale } from '@/lib/i18n/config'
import { requirePermission } from '@/lib/auth/guard'
import { PERMISSIONS, ROLE_ORDER, can } from '@/lib/auth/rbac'
import { cn } from '@/lib/utils'

/**
 * Roles & permissions.
 *
 * The matrix is *generated* from `ROLE_PERMISSIONS` — the same object the
 * server checks on every request — rather than maintained as a separate
 * document. It therefore cannot describe a policy that is not the one being
 * enforced, which is the failure mode that makes hand-written permission
 * documentation actively dangerous.
 */
export default async function RolesPage({ params }: PageProps<'/[locale]/admin/roles'>) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const session = await requirePermission('viewDashboard', locale)
  const dict = await getDictionary(locale)
  const t = dict.admin.roles

  return (
    <>
      <PageHeader title={t.title} subtitle={t.subtitle} />

      <div className="mb-6">
        <PlaceholderNotice message={t.matrixNote} />
      </div>

      <Panel title={t.capabilities}>
        <div className="-mx-5 overflow-x-auto px-5">
          <table className="w-full min-w-[52rem] border-collapse text-sm">
            <caption className="sr-only">{t.title}</caption>
            <thead>
              <tr className="border-b border-border">
                <th
                  scope="col"
                  className="py-3 pr-4 text-left font-mono text-[0.625rem] font-normal uppercase tracking-[0.14em] text-muted"
                >
                  {t.permission}
                </th>
                {ROLE_ORDER.map((role) => (
                  <th
                    key={role}
                    scope="col"
                    className={cn(
                      'px-2 py-3 text-center font-mono text-[0.625rem] font-normal uppercase tracking-[0.14em]',
                      role === session.role ? 'text-accent-strong' : 'text-muted',
                    )}
                  >
                    {t.names[role]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PERMISSIONS.map((permission) => (
                <tr key={permission} className="border-b border-border/60 last:border-0">
                  <th
                    scope="row"
                    className="py-3 pr-4 text-left font-normal text-foreground"
                  >
                    {t.perms[permission]}
                  </th>
                  {ROLE_ORDER.map((role) => {
                    const granted = can(role, permission)
                    return (
                      <td key={role} className="px-2 py-3 text-center">
                        {granted ? (
                          <>
                            <Check
                              aria-hidden="true"
                              className="mx-auto h-4 w-4 text-accent"
                            />
                            <span className="sr-only">
                              {t.names[role]}: {t.perms[permission]}
                            </span>
                          </>
                        ) : (
                          <Minus aria-hidden="true" className="mx-auto h-3.5 w-3.5 text-border" />
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ROLE_ORDER.map((role) => (
          <div
            key={role}
            className={cn(
              'rounded-xl border p-5',
              role === session.role ? 'border-accent/40 bg-accent/[0.04]' : 'border-border',
            )}
          >
            <h2 className="text-sm font-semibold text-foreground">{t.names[role]}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{t.descriptions[role]}</p>
            <p className="mt-4 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted">
              {PERMISSIONS.filter((permission) => can(role, permission)).length} / {PERMISSIONS.length}
            </p>
          </div>
        ))}
      </div>
    </>
  )
}
