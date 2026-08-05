import type { CaseStudy } from '../types'

/* ============================================================================
   ⚠  SAMPLE CONTENT — MUST BE REPLACED BEFORE PUBLIC LAUNCH
   ----------------------------------------------------------------------------
   Elite Algos Labs is newly incorporated. The entries below are STRUCTURAL
   SAMPLES that exercise every feature of the portfolio system — metrics,
   before/after comparison, confidentiality handling, discipline filtering and
   media slots — so the page can be designed, reviewed and tested against
   realistic shapes.

   They describe plausible engagements, NOT delivered work, and every one is
   flagged `sample: true`. While that flag is set the UI renders a visible
   "Sample" badge and the portfolio page shows a banner, so this content cannot
   be mistaken for a client reference by a visitor or by us.

   TO GO LIVE:
     1. Replace each entry with a real engagement.
     2. Delete the `sample: true` field from that entry.
     3. `SAMPLE_CONTENT_PRESENT` below derives from the data — once no entry is
        flagged, every warning disappears automatically.

   Publishing fabricated client results would be a material misrepresentation
   in procurement and due diligence. Do not remove the flags without replacing
   the content.
   ========================================================================== */

export const caseStudies: (CaseStudy & { sample?: true })[] = [
  {
    slug: 'archival-document-pipeline',
    sample: true,
    featured: true,
    confidential: true,
    discipline: 'document-intelligence',
    year: 2025,
    title: {
      en: 'Digitising a 40-year paper archive',
      fr: 'Numériser quarante ans d’archives papier',
    },
    client: { en: 'National records institution', fr: 'Institution nationale d’archives' },
    sector: { en: 'Public sector', fr: 'Secteur public' },
    duration: { en: '5 months', fr: '5 mois' },
    summary: {
      en: 'An extraction pipeline for several million scanned pages of mixed quality, typed and handwritten, across two languages.',
      fr: 'Une chaîne d’extraction pour plusieurs millions de pages numérisées de qualité inégale, dactylographiées et manuscrites, en deux langues.',
    },
    challenge: {
      en: 'Decades of records existed only as scans of varying quality — skewed pages, faded carbon copies, marginalia and stamps. Retrieval meant a physical search taking days, and no part of the collection was queryable.',
      fr: 'Des décennies de dossiers n’existaient que sous forme de numérisations de qualité variable — pages de travers, copies carbone effacées, annotations et tampons. Toute recherche exigeait une consultation physique de plusieurs jours, et aucune partie du fonds n’était interrogeable.',
    },
    approach: {
      en: 'We measured the existing retrieval process first, then built a layout-aware extraction pipeline with per-field confidence scoring. Anything below the agreed threshold routes to a human review queue rather than being silently accepted, so the error rate is bounded by design rather than by hope.',
      fr: 'Nous avons d’abord mesuré le processus de recherche existant, puis construit une chaîne d’extraction tenant compte de la mise en page, avec score de confiance par champ. Tout élément sous le seuil convenu est orienté vers une file de revue humaine plutôt qu’accepté en silence : le taux d’erreur est ainsi borné par conception et non par espoir.',
    },
    outcome: {
      en: 'The collection became fully searchable, with a documented confidence level attached to every extracted field and a review queue that shrinks as the models improve.',
      fr: 'Le fonds est devenu entièrement interrogeable, chaque champ extrait portant un niveau de confiance documenté, avec une file de revue qui se réduit à mesure que les modèles progressent.',
    },
    metrics: [
      {
        value: { en: '3 days → 2 min', fr: '3 jours → 2 min' },
        label: { en: 'Median retrieval time', fr: 'Délai médian de recherche' },
      },
      {
        value: { en: '97.4%', fr: '97,4 %' },
        label: { en: 'Field-level accuracy', fr: 'Précision au niveau du champ' },
        detail: {
          en: 'Measured against a 5,000-page human-labelled holdout set.',
          fr: 'Mesurée sur un jeu de validation de 5 000 pages annotées par des humains.',
        },
      },
      {
        value: { en: '11%', fr: '11 %' },
        label: { en: 'Routed to human review', fr: 'Orientés vers revue humaine' },
      },
    ],
    comparison: {
      before: {
        en: 'Physical retrieval request, average three working days, no full-text search, no way to answer aggregate questions about the collection.',
        fr: 'Demande de consultation physique, trois jours ouvrés en moyenne, aucune recherche plein texte, aucune possibilité de répondre à une question globale sur le fonds.',
      },
      after: {
        en: 'Full-text and structured search in seconds, aggregate reporting across the whole collection, and a confidence score attached to every field.',
        fr: 'Recherche plein texte et structurée en quelques secondes, restitution agrégée sur l’ensemble du fonds, et un score de confiance attaché à chaque champ.',
      },
    },
    stack: ['Python', 'PyTorch', 'PostgreSQL', 'Docker', 'S3-compatible storage'],
  },
  {
    slug: 'operations-agent-platform',
    sample: true,
    featured: true,
    confidential: true,
    discipline: 'ai-agents',
    year: 2025,
    title: {
      en: 'An agent platform for back-office operations',
      fr: 'Une plateforme d’agents pour les opérations administratives',
    },
    client: { en: 'International logistics group', fr: 'Groupe logistique international' },
    sector: { en: 'Logistics', fr: 'Logistique' },
    duration: { en: '7 months', fr: '7 mois' },
    summary: {
      en: 'Agents that reconcile shipping documentation across four internal systems and escalate only genuine exceptions.',
      fr: 'Des agents qui rapprochent la documentation d’expédition entre quatre systèmes internes et ne remontent que les véritables exceptions.',
    },
    challenge: {
      en: 'A team spent most of each day reconciling the same records across four systems that had never been integrated. The work was repetitive, error-prone, and grew linearly with volume.',
      fr: 'Une équipe passait l’essentiel de ses journées à rapprocher les mêmes enregistrements entre quatre systèmes jamais intégrés. Un travail répétitif, sujet aux erreurs, et croissant linéairement avec le volume.',
    },
    approach: {
      en: 'Rather than a rewrite, we built agents that operate the existing systems through their APIs. Each action is scoped by permission, capped by spend, and logged with the reasoning that produced it. Confidence below the agreed threshold escalates to the operations team with the full trace attached.',
      fr: 'Plutôt qu’une réécriture, nous avons construit des agents qui pilotent les systèmes existants via leurs API. Chaque action est cloisonnée par permission, plafonnée en coût et journalisée avec le raisonnement qui l’a produite. Sous le seuil de confiance convenu, le dossier remonte à l’équipe des opérations avec la trace complète.',
    },
    outcome: {
      en: 'Routine reconciliation runs unattended. The team now handles the exceptions that genuinely need judgement, and every automated decision remains auditable after the fact.',
      fr: 'Le rapprochement de routine s’exécute sans surveillance. L’équipe traite désormais les exceptions qui exigent réellement du jugement, et chaque décision automatisée reste auditable a posteriori.',
    },
    metrics: [
      {
        value: { en: '82%', fr: '82 %' },
        label: { en: 'Reconciliations fully automated', fr: 'Rapprochements entièrement automatisés' },
      },
      {
        value: { en: '6.5 h/day', fr: '6,5 h/jour' },
        label: { en: 'Specialist time released', fr: 'Temps spécialiste libéré' },
      },
      {
        value: { en: '100%', fr: '100 %' },
        label: { en: 'Actions with full audit trace', fr: 'Actions avec trace d’audit complète' },
      },
    ],
    stack: ['TypeScript', 'Temporal', 'PostgreSQL', 'Redis', 'OpenTelemetry'],
  },
  {
    slug: 'sovereign-model-deployment',
    sample: true,
    featured: true,
    confidential: true,
    discipline: 'infrastructure',
    year: 2026,
    title: {
      en: 'Private model hosting under data-residency constraints',
      fr: 'Hébergement privé de modèles sous contrainte de résidence des données',
    },
    client: { en: 'Regulated financial institution', fr: 'Institution financière réglementée' },
    sector: { en: 'Financial services', fr: 'Services financiers' },
    duration: { en: '4 months', fr: '4 mois' },
    summary: {
      en: 'Open-weight models served entirely inside the client’s own network, with measured accuracy against hosted alternatives.',
      fr: 'Des modèles à poids ouverts servis intégralement au sein du réseau du client, avec une précision mesurée face aux alternatives hébergées.',
    },
    challenge: {
      en: 'Regulation prohibited customer data from leaving the institution’s infrastructure, which ruled out every hosted API. The open question was what that constraint actually costs in accuracy.',
      fr: 'La réglementation interdisait toute sortie des données clients hors de l’infrastructure de l’institution, ce qui excluait toute API hébergée. La question ouverte était le coût réel de cette contrainte en matière de précision.',
    },
    approach: {
      en: 'We built an evaluation harness on the institution’s own task set first, then benchmarked candidate open-weight models against a hosted frontier baseline. The trade-off was quantified before any infrastructure was committed, so the decision was made on numbers rather than assumption.',
      fr: 'Nous avons d’abord construit un banc d’évaluation sur le jeu de tâches propre à l’institution, puis comparé des modèles candidats à poids ouverts à une référence hébergée de pointe. Le compromis a été chiffré avant tout engagement d’infrastructure : la décision s’est prise sur des chiffres, non sur une hypothèse.',
    },
    outcome: {
      en: 'A fully self-hosted deployment with documented evidence of where data travels, and a published internal comparison showing the measured accuracy gap on their own workload.',
      fr: 'Un déploiement entièrement auto-hébergé, avec une preuve documentée du trajet des données et une comparaison interne publiée montrant l’écart de précision mesuré sur leur propre charge de travail.',
    },
    metrics: [
      {
        value: { en: '0 bytes', fr: '0 octet' },
        label: { en: 'Customer data leaving the network', fr: 'Données clients sortant du réseau' },
      },
      {
        value: { en: '−2.1 pts', fr: '−2,1 pts' },
        label: { en: 'Accuracy vs hosted baseline', fr: 'Précision vs référence hébergée' },
        detail: {
          en: 'Measured on the client’s own task set, not a public benchmark.',
          fr: 'Mesurée sur le jeu de tâches du client, non sur un banc d’essai public.',
        },
      },
      {
        value: { en: '190 ms', fr: '190 ms' },
        label: { en: 'Median inference latency', fr: 'Latence d’inférence médiane' },
      },
    ],
    stack: ['vLLM', 'Kubernetes', 'NVIDIA CUDA', 'Terraform', 'Prometheus'],
  },
  {
    slug: 'multilingual-service-platform',
    sample: true,
    featured: false,
    confidential: true,
    discipline: 'platform',
    year: 2026,
    title: {
      en: 'A bilingual service platform for a public body',
      fr: 'Une plateforme de services bilingue pour un organisme public',
    },
    client: { en: 'Government agency', fr: 'Agence gouvernementale' },
    sector: { en: 'Public sector', fr: 'Secteur public' },
    duration: { en: '6 months', fr: '6 mois' },
    summary: {
      en: 'A citizen-facing platform built bilingual from the first commit, to WCAG 2.2 AA, with performance budgets enforced in CI.',
      fr: 'Une plateforme citoyenne bilingue dès le premier commit, conforme WCAG 2.2 AA, avec budgets de performance vérifiés en intégration continue.',
    },
    challenge: {
      en: 'The existing service was English-first with French retrofitted, so the two languages had drifted apart in content and behaviour. Accessibility was assessed at the end of each release rather than built in.',
      fr: 'Le service existant était pensé en anglais avec le français ajouté après coup ; les deux langues avaient divergé en contenu comme en comportement. L’accessibilité était évaluée en fin de cycle plutôt qu’intégrée dès la conception.',
    },
    approach: {
      en: 'We made language parity a type-level constraint: the build fails if any string exists in one language and not the other. Accessibility and performance budgets became CI gates, so neither could regress silently between releases.',
      fr: 'Nous avons fait de la parité linguistique une contrainte au niveau des types : la compilation échoue si une chaîne existe dans une langue et pas dans l’autre. Accessibilité et budgets de performance sont devenus des garde-fous d’intégration continue, empêchant toute régression silencieuse.',
    },
    outcome: {
      en: 'One codebase serving both languages identically, with parity and accessibility enforced automatically rather than audited after the fact.',
      fr: 'Une base de code unique servant les deux langues à l’identique, la parité et l’accessibilité étant garanties automatiquement plutôt qu’auditées après coup.',
    },
    metrics: [
      {
        value: { en: '100%', fr: '100 %' },
        label: { en: 'String parity, enforced at build', fr: 'Parité des chaînes, vérifiée à la compilation' },
      },
      {
        value: { en: 'AA', fr: 'AA' },
        label: { en: 'WCAG 2.2 conformance', fr: 'Conformité WCAG 2.2' },
      },
      {
        value: { en: '<1.2 s', fr: '< 1,2 s' },
        label: { en: 'Largest Contentful Paint', fr: 'Largest Contentful Paint' },
      },
    ],
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS', 'Docker'],
  },
]

/**
 * True while any entry is still flagged as sample content.
 *
 * Derived rather than hand-maintained, so it cannot fall out of sync: remove
 * the last `sample: true` and every warning in the UI disappears on its own.
 */
export const SAMPLE_CONTENT_PRESENT = caseStudies.some((study) => study.sample === true)
