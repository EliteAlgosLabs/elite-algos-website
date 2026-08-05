import 'server-only'

import { redirect } from 'next/navigation'
import { getSession, type SessionUser } from './session'
import { can, type Permission } from './rbac'
import { defaultLocale, isLocale, type Locale } from '@/lib/i18n/config'

/**
 * Server-side permission gate for a dashboard module.
 *
 * Call at the top of every admin page. It is the actual security boundary —
 * the sidebar hiding a link is only a courtesy, and a user who types the URL
 * must still be stopped here.
 *
 * Returns the session so callers do not have to fetch it twice.
 */
export async function requirePermission(
  permission: Permission,
  rawLocale: string,
): Promise<SessionUser> {
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale
  const session = await getSession()

  if (!session) redirect(`/${locale}/admin/login`)

  if (!can(session.role, permission)) {
    // Send them somewhere they *can* use rather than to a dead end. Every role
    // holds `viewDashboard`, so the overview is always a safe destination.
    redirect(`/${locale}/admin`)
  }

  return session
}
