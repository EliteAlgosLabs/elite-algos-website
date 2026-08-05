import type { Solution } from '../types'

/**
 * Platform-level solutions.
 *
 * Each entry is a system shape we have built and can rebuild around a client's
 * constraints. They are not products and they are not licences — the copy is
 * careful about that distinction because overpromising here is how agencies
 * lose enterprise deals in procurement.
 */
export const solutions: Solution[] = [
  {
    slug: 'autonomous-agents',
    icon: 'Bot',
    featured: true,
    title: { en: 'Autonomous AI agents', fr: 'Agents IA autonomes' },
    tagline: {
      en: 'Systems that carry out multi-step work and know when to stop.',
      fr: 'Des systèmes qui mènent un travail en plusieurs étapes et savent quand s’arrêter.',
    },
    description: {
      en: 'Agents that plan, call tools, act inside your systems and escalate to a person when confidence drops below an agreed threshold. Every action is logged with its reasoning, its inputs and its cost, so an operator can audit any decision after the fact.',
      fr: 'Des agents qui planifient, appellent des outils, agissent dans vos systèmes et remontent à un humain dès que la confiance passe sous un seuil convenu. Chaque action est journalisée avec son raisonnement, ses données d’entrée et son coût, afin qu’un opérateur puisse auditer n’importe quelle décision a posteriori.',
    },
    capabilities: {
      en: [
        'Tool use against your own APIs, databases and internal services',
        'Explicit confidence thresholds with human escalation paths',
        'Full decision traces: inputs, reasoning, tool calls, cost per action',
        'Guardrails, permission scoping and per-action spend limits',
        'Evaluation harness so behaviour changes are caught before release',
      ],
      fr: [
        'Utilisation d’outils sur vos propres API, bases de données et services internes',
        'Seuils de confiance explicites avec circuits d’escalade humaine',
        'Traces de décision complètes : entrées, raisonnement, appels d’outils, coût par action',
        'Garde-fous, cloisonnement des permissions et plafonds de dépense par action',
        'Banc d’évaluation pour détecter les changements de comportement avant mise en service',
      ],
    },
    outcomes: {
      en: [
        'Routine multi-step processes run without a person in the loop',
        'Specialist time redirected to the exceptions that need judgement',
        'A complete audit trail for every automated decision',
      ],
      fr: [
        'Les processus routiniers en plusieurs étapes s’exécutent sans intervention humaine',
        'Le temps des spécialistes est redirigé vers les exceptions qui exigent du jugement',
        'Une piste d’audit complète pour chaque décision automatisée',
      ],
    },
    stack: ['TypeScript', 'Python', 'PostgreSQL', 'Redis', 'OpenTelemetry'],
  },
  {
    slug: 'document-intelligence',
    icon: 'ScanText',
    featured: true,
    title: { en: 'Document intelligence & OCR', fr: 'Intelligence documentaire et OCR' },
    tagline: {
      en: 'Turning unstructured documents into data you can query.',
      fr: 'Transformer des documents non structurés en données interrogeables.',
    },
    description: {
      en: 'Extraction pipelines for invoices, contracts, identity documents, medical records and archival scans. Built for the documents that actually arrive — skewed, stamped, handwritten, multi-language, photographed at an angle — rather than the clean samples in a vendor demonstration.',
      fr: 'Des chaînes d’extraction pour factures, contrats, pièces d’identité, dossiers médicaux et archives numérisées. Conçues pour les documents qui arrivent réellement — de travers, tamponnés, manuscrits, multilingues, photographiés en biais — et non pour les échantillons impeccables des démonstrations commerciales.',
    },
    capabilities: {
      en: [
        'Layout-aware extraction across mixed formats and scan quality',
        'Multilingual recognition including handwriting and stamps',
        'Per-field confidence scores routing low-certainty items to review',
        'Validation against your business rules before anything is committed',
        'Structured output into your database, ERP or downstream workflow',
      ],
      fr: [
        'Extraction tenant compte de la mise en page, tous formats et qualités de numérisation confondus',
        'Reconnaissance multilingue, y compris écriture manuscrite et tampons',
        'Scores de confiance par champ orientant les éléments incertains vers une revue humaine',
        'Validation selon vos règles métier avant tout enregistrement',
        'Sortie structurée vers votre base de données, votre ERP ou le flux aval',
      ],
    },
    outcomes: {
      en: [
        'Document handling measured in minutes rather than days',
        'Manual keying reduced to the genuinely ambiguous cases',
        'Searchable, structured data where there were previously only files',
      ],
      fr: [
        'Un traitement documentaire mesuré en minutes plutôt qu’en jours',
        'La saisie manuelle réduite aux seuls cas réellement ambigus',
        'Des données structurées et interrogeables là où il n’y avait que des fichiers',
      ],
    },
    stack: ['Python', 'PyTorch', 'Tesseract', 'PostgreSQL', 'S3-compatible storage'],
  },
  {
    slug: 'enterprise-automation',
    icon: 'Workflow',
    featured: true,
    title: { en: 'Enterprise automation', fr: 'Automatisation d’entreprise' },
    tagline: {
      en: 'Removing the work nobody should be doing by hand.',
      fr: 'Supprimer le travail que personne ne devrait faire à la main.',
    },
    description: {
      en: 'We instrument an existing process, find where the time and errors actually accumulate, and automate that — not the part that is easiest to demonstrate. Every automation ships with the measurement that proves it worked.',
      fr: 'Nous instrumentons un processus existant, identifions où le temps et les erreurs s’accumulent réellement, et automatisons cela — pas la partie la plus facile à mettre en démonstration. Chaque automatisation est livrée avec la mesure qui prouve son efficacité.',
    },
    capabilities: {
      en: [
        'Process instrumentation and baseline measurement before design',
        'Orchestration across systems that were never meant to talk',
        'Exception handling and review queues for the cases that need a person',
        'Approval chains, audit logging and role-scoped access',
        'Dashboards showing the metric that justified the project',
      ],
      fr: [
        'Instrumentation du processus et mesure de référence avant conception',
        'Orchestration entre des systèmes qui n’ont jamais été conçus pour communiquer',
        'Gestion des exceptions et files de revue pour les cas nécessitant un humain',
        'Circuits d’approbation, journalisation d’audit et accès cloisonné par rôle',
        'Tableaux de bord affichant la métrique qui a justifié le projet',
      ],
    },
    outcomes: {
      en: [
        'Cycle times cut against a measured, agreed baseline',
        'Error rates that fall and stay down because they are monitored',
        'Capacity released without adding headcount',
      ],
      fr: [
        'Des délais de traitement réduits par rapport à une référence mesurée et convenue',
        'Des taux d’erreur qui baissent et le restent parce qu’ils sont supervisés',
        'De la capacité libérée sans augmenter les effectifs',
      ],
    },
    stack: ['TypeScript', 'Temporal', 'PostgreSQL', 'Docker', 'Grafana'],
  },
  {
    slug: 'private-deployments',
    icon: 'ShieldCheck',
    featured: true,
    title: { en: 'Private & sovereign AI', fr: 'IA privée et souveraine' },
    tagline: {
      en: 'Intelligence that never leaves your boundary.',
      fr: 'Une intelligence qui ne quitte jamais votre périmètre.',
    },
    description: {
      en: 'For workloads where data cannot cross a border, a vendor boundary or a regulatory line. Open-weight models hosted on your infrastructure, with the evaluation work to show you what the trade-off against a frontier API actually costs you in accuracy.',
      fr: 'Pour les charges de travail dont les données ne peuvent franchir ni frontière, ni périmètre fournisseur, ni ligne réglementaire. Des modèles à poids ouverts hébergés sur votre infrastructure, accompagnés du travail d’évaluation montrant ce que le compromis face à une API de pointe vous coûte réellement en précision.',
    },
    capabilities: {
      en: [
        'On-premise or private-cloud model hosting with GPU capacity planning',
        'Open-weight model selection, quantisation and serving',
        'Fine-tuning and retrieval on your own corpus',
        'Measured accuracy comparison against hosted frontier alternatives',
        'Air-gapped operation where the environment demands it',
      ],
      fr: [
        'Hébergement de modèles sur site ou en cloud privé, avec dimensionnement GPU',
        'Sélection, quantification et service de modèles à poids ouverts',
        'Affinage et recherche augmentée sur votre propre corpus',
        'Comparaison de précision mesurée face aux alternatives hébergées de pointe',
        'Fonctionnement en environnement isolé lorsque le contexte l’exige',
      ],
    },
    outcomes: {
      en: [
        'Regulated and confidential workloads become addressable',
        'No per-token dependency on a third party’s pricing or availability',
        'Documented evidence of where your data goes — and does not',
      ],
      fr: [
        'Les charges de travail réglementées et confidentielles deviennent traitables',
        'Aucune dépendance au jeton envers la tarification ou la disponibilité d’un tiers',
        'Une preuve documentée de la destination de vos données — et de ce qu’elles ne franchissent pas',
      ],
    },
    stack: ['vLLM', 'Kubernetes', 'NVIDIA CUDA', 'Terraform', 'Vector storage'],
  },
  {
    slug: 'data-intelligence',
    icon: 'LineChart',
    featured: false,
    title: { en: 'Data intelligence', fr: 'Intelligence des données' },
    tagline: {
      en: 'Making the data you already hold answer questions.',
      fr: 'Faire parler les données que vous détenez déjà.',
    },
    description: {
      en: 'Most organisations are not short of data; they are short of a path from data to decision. We build the pipelines, semantic layer and interfaces that let a non-technical person ask a real question and get a defensible answer.',
      fr: 'La plupart des organisations ne manquent pas de données ; elles manquent d’un chemin allant de la donnée à la décision. Nous construisons les pipelines, la couche sémantique et les interfaces permettant à une personne non technique de poser une vraie question et d’obtenir une réponse défendable.',
    },
    capabilities: {
      en: [
        'Ingestion and normalisation across fragmented internal sources',
        'A semantic layer so metrics mean one thing across the organisation',
        'Natural-language querying with the generated query shown, not hidden',
        'Anomaly detection and forecasting where the data supports it',
        'Row-level access control aligned to your existing permissions',
      ],
      fr: [
        'Ingestion et normalisation de sources internes fragmentées',
        'Une couche sémantique pour que chaque métrique ait un sens unique dans l’organisation',
        'Interrogation en langage naturel avec la requête générée affichée, non masquée',
        'Détection d’anomalies et prévision lorsque les données le permettent',
        'Contrôle d’accès au niveau de la ligne, aligné sur vos permissions existantes',
      ],
    },
    outcomes: {
      en: [
        'Decisions made on one agreed set of numbers',
        'Analyst time spent on interpretation instead of extraction',
        'Questions answered in minutes that used to need a ticket',
      ],
      fr: [
        'Des décisions prises sur un jeu de chiffres unique et partagé',
        'Le temps des analystes consacré à l’interprétation plutôt qu’à l’extraction',
        'Des questions résolues en minutes là où il fallait auparavant ouvrir un ticket',
      ],
    },
    stack: ['dbt', 'PostgreSQL', 'DuckDB', 'Python', 'TypeScript'],
  },
  {
    slug: 'web-platforms',
    icon: 'Layers',
    featured: false,
    title: { en: 'Web platforms & applications', fr: 'Plateformes et applications web' },
    tagline: {
      en: 'The interface people actually use, built to the same standard.',
      fr: 'L’interface que les gens utilisent réellement, au même niveau d’exigence.',
    },
    description: {
      en: 'An intelligent system is only as good as the surface people touch. We design and build the applications, portals and internal tools that sit on top — accessible, fast, multilingual, and held to the same engineering standard as everything beneath them.',
      fr: 'Un système intelligent ne vaut que par la surface avec laquelle les gens interagissent. Nous concevons et développons les applications, portails et outils internes qui le surmontent — accessibles, rapides, multilingues, et tenus au même niveau d’exigence que tout ce qui se trouve en dessous.',
    },
    capabilities: {
      en: [
        'Product design and interface engineering in one team',
        'Accessibility to WCAG 2.2 AA as a build requirement, not an audit',
        'Multilingual architecture from the first commit',
        'Performance budgets enforced in continuous integration',
        'Design systems your own team can extend without us',
      ],
      fr: [
        'Design produit et ingénierie d’interface au sein d’une même équipe',
        'Accessibilité WCAG 2.2 AA comme exigence de construction, non comme audit final',
        'Architecture multilingue dès le premier commit',
        'Budgets de performance vérifiés en intégration continue',
        'Des systèmes de design que vos équipes peuvent étendre sans nous',
      ],
    },
    outcomes: {
      en: [
        'Interfaces that people adopt without being told to',
        'Measurably fast pages on real devices and real networks',
        'One codebase serving every language you operate in',
      ],
      fr: [
        'Des interfaces adoptées spontanément, sans consigne',
        'Des pages mesurablement rapides sur appareils et réseaux réels',
        'Une base de code unique servant toutes vos langues d’exploitation',
      ],
    },
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS', 'Docker'],
  },
]
