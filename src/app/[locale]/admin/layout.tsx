import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { AdminShell } from '@/components/admin/shell'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { isLocale } from '@/lib/i18n/config'
import { getSession } from '@/lib/auth/session'

export const metadata: Metadata = {
  title: 'Command Center',
  robots: { index: false, follow: false, nocache: true },
}

/**
 * Admin layout — the authentication boundary.
 *
 * Every module below this point is guarded here, on the server, before any
 * child renders. The login page is nested inside `/admin` too, so this layout
 * has to let it through: the check is skipped only for that exact path.
 *
 * `getSession()` reads cookies, which makes this subtree dynamic. That is
 * correct and intended — a cached dashboard shell would be a data leak.
 */
export default async function AdminLayout({ children, params }: LayoutProps<'/[locale]/admin'>) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  // Next does not expose the matched pathname to a layout, so we read it from
  // the header the proxy leaves on every request.
  const headerList = await headers()
  const pathname = headerList.get('x-current-path') ?? ''
  const isLoginRoute = pathname.endsWith('/admin/login')

  const session = await getSession()

  if (!session) {
    // The login page renders its own full-screen layout, without the shell.
    if (isLoginRoute) return <>{children}</>
    redirect(`/${locale}/admin/login`)
  }

  // Signed in and sitting on the login page: the page itself redirects, but
  // rendering the shell around it first would flash the dashboard chrome.
  if (isLoginRoute) return <>{children}</>

  const dict = await getDictionary(locale)

  return (
    <AdminShell
      locale={locale}
      dict={dict}
      role={session.role}
      user={{ name: session.name, email: session.email }}
    >
      {children}
    </AdminShell>
  )
}
