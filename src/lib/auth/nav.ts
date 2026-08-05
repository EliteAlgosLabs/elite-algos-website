import type { Permission } from './rbac'
import type { Dictionary } from '@/lib/i18n/dictionaries'

/**
 * Dashboard navigation.
 *
 * Each item declares the permission required to see it, so the sidebar is
 * derived from the same RBAC matrix the pages enforce. A role that cannot open
 * a module never sees a link to it — no dead ends, no 403 pages reached by
 * clicking something that was offered.
 */

export type AdminNavItem = {
  key: keyof Dictionary['admin']['nav']
  path: string
  icon: AdminIconName
  permission: Permission
}

export type AdminNavGroup = {
  key: keyof Dictionary['admin']['nav']
  items: AdminNavItem[]
}

/** Lucide names used by the dashboard chrome. Kept separate from content icons. */
export type AdminIconName =
  | 'LayoutDashboard'
  | 'ChartNoAxesColumn'
  | 'Users'
  | 'Inbox'
  | 'BriefcaseBusiness'
  | 'FileText'
  | 'UsersRound'
  | 'Contact'
  | 'ShieldCheck'
  | 'Bot'
  | 'GitBranch'
  | 'BrainCircuit'
  | 'Bell'
  | 'Settings'

export const adminNav: AdminNavGroup[] = [
  {
    key: 'groupSystem',
    items: [
      {
        key: 'overview',
        path: '',
        icon: 'LayoutDashboard',
        permission: 'viewDashboard',
      },
      {
        key: 'analytics',
        path: '/analytics',
        icon: 'ChartNoAxesColumn',
        permission: 'viewAnalytics',
      },
      { key: 'visitors', path: '/visitors', icon: 'Users', permission: 'viewAnalytics' },
      { key: 'inbox', path: '/inbox', icon: 'Inbox', permission: 'manageInbox' },
    ],
  },
  {
    key: 'groupContent',
    items: [
      {
        key: 'portfolio',
        path: '/portfolio',
        icon: 'BriefcaseBusiness',
        permission: 'managePortfolio',
      },
      { key: 'blog', path: '/blog', icon: 'FileText', permission: 'manageContent' },
    ],
  },
  {
    key: 'groupPeople',
    items: [
      { key: 'team', path: '/team', icon: 'UsersRound', permission: 'manageTeam' },
      { key: 'directory', path: '/directory', icon: 'Contact', permission: 'manageTeam' },
      { key: 'roles', path: '/roles', icon: 'ShieldCheck', permission: 'viewDashboard' },
    ],
  },
  {
    key: 'groupIntelligence',
    items: [
      { key: 'agents', path: '/agents', icon: 'Bot', permission: 'viewAgents' },
      { key: 'github', path: '/github', icon: 'GitBranch', permission: 'viewRepos' },
      { key: 'brain', path: '/brain', icon: 'BrainCircuit', permission: 'viewDashboard' },
    ],
  },
]

export const adminFooterNav: AdminNavItem[] = [
  {
    key: 'notifications',
    path: '/notifications',
    icon: 'Bell',
    permission: 'viewDashboard',
  },
  { key: 'settings', path: '/settings', icon: 'Settings', permission: 'manageSettings' },
]
