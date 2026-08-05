import type { Service } from '../types'

/**
 * Engagement models.
 *
 * Written around what the client receives, not what we do. "A written technical
 * specification you own" is a deliverable; "discovery workshops" is activity.
 */
export const services: Service[] = [
  {
    slug: 'ai-consulting',
    icon: 'Compass',
    title: {
      en: 'AI assessment & consulting',
      fr: 'Audit et conseil en IA',
    },
    summary: {
      en: 'A short, intense engagement that establishes what is actually worth building — and what is not. You leave with a costed technical plan whether or not you build it with us.',
      fr: 'Une mission courte et intensive qui établit ce qui mérite réellement d’être construit — et ce qui ne le mérite pas. Vous repartez avec un plan technique chiffré, que vous le réalisiez avec nous ou non.',
    },
    includes: {
      en: [
        'Process mapping and baseline measurement of the work you want to change',
        'Technical feasibility review against your real data, not a sample',
        'Build-versus-buy analysis with named vendors and honest trade-offs',
        'Cost model covering inference, infrastructure and maintenance',
        'Risk register: data handling, regulatory exposure, failure modes',
      ],
      fr: [
        'Cartographie du processus et mesure de référence du travail à transformer',
        'Étude de faisabilité technique sur vos données réelles, pas sur un échantillon',
        'Analyse « construire ou acheter » avec fournisseurs nommés et arbitrages honnêtes',
        'Modèle de coûts couvrant inférence, infrastructure et maintenance',
        'Registre des risques : traitement des données, exposition réglementaire, modes de défaillance',
      ],
    },
    deliverable: {
      en: 'A written technical plan with costs, sequencing and a recommendation — including the recommendation not to proceed, where that is the honest answer.',
      fr: 'Un plan technique écrit, chiffré et séquencé, assorti d’une recommandation — y compris celle de ne pas poursuivre, lorsque c’est la réponse honnête.',
    },
    timeline: { en: '2–4 weeks', fr: '2 à 4 semaines' },
  },
  {
    slug: 'custom-platforms',
    icon: 'Blocks',
    title: {
      en: 'Custom AI platform engineering',
      fr: 'Ingénierie de plateformes IA sur mesure',
    },
    summary: {
      en: 'End-to-end design and build of a production system: models, pipelines, interfaces, infrastructure and the operational tooling your team needs to run it without us.',
      fr: 'Conception et développement de bout en bout d’un système en production : modèles, pipelines, interfaces, infrastructure et l’outillage opérationnel dont votre équipe a besoin pour l’exploiter sans nous.',
    },
    includes: {
      en: [
        'Architecture and written technical specification before any code',
        'Model selection, evaluation harness and regression suite',
        'Application, API and admin interfaces designed alongside the system',
        'Infrastructure as code, CI/CD, observability and alerting',
        'Runbooks, architecture decision records and handover training',
      ],
      fr: [
        'Architecture et spécification technique écrite avant toute ligne de code',
        'Sélection de modèles, banc d’évaluation et suite de non-régression',
        'Application, API et interfaces d’administration conçues avec le système',
        'Infrastructure as code, CI/CD, observabilité et alertes',
        'Procédures d’exploitation, décisions d’architecture consignées et formation à la reprise',
      ],
    },
    deliverable: {
      en: 'A running system in your infrastructure, every artefact in your repositories, and a team able to operate and extend it.',
      fr: 'Un système en fonctionnement dans votre infrastructure, tous les artefacts dans vos dépôts, et une équipe capable de l’exploiter et de le faire évoluer.',
    },
    timeline: { en: '3–9 months', fr: '3 à 9 mois' },
  },
  {
    slug: 'integration',
    icon: 'GitBranch',
    title: {
      en: 'AI integration into existing systems',
      fr: 'Intégration de l’IA aux systèmes existants',
    },
    summary: {
      en: 'Adding intelligence to software that already exists and cannot be paused. The hard part is rarely the model — it is the seams, the permissions and the migration path.',
      fr: 'Ajouter de l’intelligence à des logiciels déjà en place qui ne peuvent pas s’arrêter. La difficulté est rarement le modèle — ce sont les interfaces, les permissions et le chemin de migration.',
    },
    includes: {
      en: [
        'Audit of the existing system, its data model and its constraints',
        'Integration design that does not require a rewrite',
        'Incremental rollout behind feature flags with measurable checkpoints',
        'Human-in-the-loop review paths where decisions carry consequence',
        'Backwards-compatible APIs and a documented rollback plan',
      ],
      fr: [
        'Audit du système existant, de son modèle de données et de ses contraintes',
        'Conception d’intégration n’exigeant aucune réécriture',
        'Déploiement progressif derrière des indicateurs de fonctionnalité, avec jalons mesurables',
        'Circuits de revue humaine là où les décisions ont des conséquences',
        'API rétrocompatibles et plan de retour arrière documenté',
      ],
    },
    deliverable: {
      en: 'New capability inside your existing product, delivered incrementally, with every step reversible.',
      fr: 'De nouvelles capacités au sein de votre produit existant, livrées progressivement, chaque étape étant réversible.',
    },
    timeline: { en: '6–16 weeks', fr: '6 à 16 semaines' },
  },
  {
    slug: 'cloud-infrastructure',
    icon: 'Cloud',
    title: {
      en: 'Cloud & private infrastructure',
      fr: 'Infrastructure cloud et privée',
    },
    summary: {
      en: 'The layer everything else depends on. Designed for the cost, latency and sovereignty constraints you actually have — including deployments that never leave your own hardware.',
      fr: 'La couche dont tout le reste dépend. Conçue pour vos contraintes réelles de coût, de latence et de souveraineté — y compris des déploiements qui ne quittent jamais votre propre matériel.',
    },
    includes: {
      en: [
        'Infrastructure as code across cloud, hybrid or fully on-premise targets',
        'Container orchestration, autoscaling and cost governance',
        'Private model hosting where data cannot leave your boundary',
        'Zero-downtime deployment pipelines with automated rollback',
        'Monitoring, structured logging, tracing and on-call runbooks',
      ],
      fr: [
        'Infrastructure as code sur cible cloud, hybride ou entièrement sur site',
        'Orchestration de conteneurs, mise à l’échelle automatique et maîtrise des coûts',
        'Hébergement privé de modèles lorsque les données ne peuvent pas sortir de votre périmètre',
        'Chaînes de déploiement sans interruption avec retour arrière automatisé',
        'Supervision, journalisation structurée, traçage et procédures d’astreinte',
      ],
    },
    deliverable: {
      en: 'Reproducible infrastructure defined in code, with the operational tooling to run it and the documentation to hand it over.',
      fr: 'Une infrastructure reproductible définie dans le code, avec l’outillage opérationnel pour l’exploiter et la documentation pour la transmettre.',
    },
    timeline: { en: '4–12 weeks', fr: '4 à 12 semaines' },
  },
]
