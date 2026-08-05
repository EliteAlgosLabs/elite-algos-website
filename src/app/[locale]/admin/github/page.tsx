import { notFound } from 'next/navigation'
import { ModuleScaffold } from '@/components/admin/module-scaffold'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { isLocale } from '@/lib/i18n/config'
import { requirePermission } from '@/lib/auth/guard'

export default async function GithubPage({ params }: PageProps<'/[locale]/admin/github'>) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  await requirePermission('viewRepos', locale)
  const dict = await getDictionary(locale)
  const t = dict.admin.github

  return (
    <ModuleScaffold
      title={t.title}
      subtitle={t.subtitle}
      notice={t.connectPrompt}
      detail={
        locale === 'fr'
          ? 'Définissez GITHUB_TOKEN (portée « read:org » et « repo ») ainsi que GITHUB_ORG dans l’environnement du serveur. Le jeton doit rester côté serveur : ne le préfixez jamais par NEXT_PUBLIC_, sous peine de l’exposer dans le navigateur.'
          : 'Set GITHUB_TOKEN (scoped to read:org and repo) and GITHUB_ORG in the server environment. The token must stay server-side — never prefix it with NEXT_PUBLIC_, which would ship it to the browser.'
      }
      tiles={[t.repositories, t.commits, t.openPrs, t.contributors]}
      panels={[
        { title: t.lastCommit, empty: dict.admin.common.noResults },
        { title: t.contributors, empty: dict.admin.common.noResults },
      ]}
    />
  )
}
