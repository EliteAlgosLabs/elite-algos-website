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
    title: { en: 'AI assistants that get work done', fr: 'Assistants IA qui font le travail' },
    tagline: {
      en: 'Software that handles multi-step tasks and knows when to ask a person.',
      fr: 'Un logiciel qui gère des tâches en plusieurs étapes et sait quand demander à une personne.',
    },
    description: {
      en: 'These AI assistants plan a task, use your tools, act inside your systems, and hand over to a person when they are not sure enough. Every action is recorded — what it did, why, and what it cost — so you can always check any decision later.',
      fr: 'Ces assistants IA planifient une tâche, utilisent vos outils, agissent dans vos systèmes et passent la main à une personne lorsqu’ils ne sont pas assez sûrs. Chaque action est enregistrée — ce qu’elle a fait, pourquoi et ce qu’elle a coûté — afin que vous puissiez toujours vérifier une décision plus tard.',
    },
    capabilities: {
      en: [
        'Works with your own apps, databases and internal tools',
        'Hands over to a person whenever it is not confident enough',
        'A full record of every action: what, why, which tools, and the cost',
        'Safety limits, controlled access and spending caps on each action',
        'Tested before every release so nothing changes by surprise',
      ],
      fr: [
        'Fonctionne avec vos propres applications, bases de données et outils internes',
        'Passe la main à une personne dès qu’il n’est pas assez sûr',
        'Un enregistrement complet de chaque action : quoi, pourquoi, quels outils et le coût',
        'Des limites de sécurité, un accès contrôlé et des plafonds de dépense par action',
        'Testé avant chaque mise en service, pour qu’aucun comportement ne change par surprise',
      ],
    },
    outcomes: {
      en: [
        'Routine multi-step tasks run on their own',
        'Your experts spend time on the tricky cases that need judgement',
        'A full record you can check for every automated decision',
      ],
      fr: [
        'Les tâches routinières en plusieurs étapes s’exécutent toutes seules',
        'Vos experts consacrent leur temps aux cas délicats qui demandent du jugement',
        'Un enregistrement complet et vérifiable pour chaque décision automatisée',
      ],
    },
    stack: ['TypeScript', 'Python', 'PostgreSQL', 'Redis', 'OpenTelemetry'],
  },
  {
    slug: 'document-intelligence',
    icon: 'ScanText',
    featured: true,
    title: { en: 'Document processing', fr: 'Traitement de documents' },
    tagline: {
      en: 'Turn piles of documents into data you can search and use.',
      fr: 'Transformez des piles de documents en données que vous pouvez chercher et utiliser.',
    },
    description: {
      en: 'We read invoices, contracts, ID documents, medical records and scanned files, and pull out the information automatically. Built for real documents — crooked, stamped, handwritten, in many languages, photographed at an angle — not the perfect samples you see in a sales demo.',
      fr: 'Nous lisons factures, contrats, pièces d’identité, dossiers médicaux et fichiers numérisés, et en extrayons l’information automatiquement. Conçu pour de vrais documents — de travers, tamponnés, manuscrits, en plusieurs langues, photographiés en biais — et non pour les échantillons parfaits des démonstrations commerciales.',
    },
    capabilities: {
      en: [
        'Reads many document types and layouts, even poor-quality scans',
        'Handles several languages, plus handwriting and stamps',
        'Sends anything it is unsure about to a person to check',
        'Checks the data against your rules before saving it',
        'Sends clean, organised data straight into your database or system',
      ],
      fr: [
        'Lit de nombreux types et mises en page, même les numérisations de mauvaise qualité',
        'Gère plusieurs langues, ainsi que l’écriture manuscrite et les tampons',
        'Envoie tout ce dont il n’est pas sûr à une personne pour vérification',
        'Vérifie les données selon vos règles avant de les enregistrer',
        'Envoie des données propres et organisées directement dans votre base ou votre système',
      ],
    },
    outcomes: {
      en: [
        'Documents handled in minutes instead of days',
        'Manual typing cut down to only the tricky cases',
        'Searchable, organised data where there used to be only files',
      ],
      fr: [
        'Des documents traités en minutes plutôt qu’en jours',
        'La saisie manuelle réduite aux seuls cas délicats',
        'Des données organisées et faciles à chercher là où il n’y avait que des fichiers',
      ],
    },
    stack: ['Python', 'PyTorch', 'Tesseract', 'PostgreSQL', 'S3-compatible storage'],
  },
  {
    slug: 'enterprise-automation',
    icon: 'Workflow',
    featured: true,
    title: { en: 'Workflow automation', fr: 'Automatisation des tâches' },
    tagline: {
      en: 'Take away the repetitive work nobody should be doing by hand.',
      fr: 'Supprimer le travail répétitif que personne ne devrait faire à la main.',
    },
    description: {
      en: 'We look closely at how a task is done today, find where the time and mistakes really pile up, and automate that part — not just the part that is easy to show off. Every automation comes with proof that it actually saved time.',
      fr: 'Nous examinons de près comment une tâche est faite aujourd’hui, trouvons où le temps et les erreurs s’accumulent vraiment, et automatisons cette partie — pas seulement celle qui est facile à montrer. Chaque automatisation est livrée avec la preuve qu’elle a bien fait gagner du temps.',
    },
    capabilities: {
      en: [
        'We measure how the work is done today before we change anything',
        'We connect systems that were never built to work together',
        'The tricky cases are sent to a person to handle',
        'Approval steps, a full activity log, and access set by role',
        'Dashboards that show the time and money the project saved',
      ],
      fr: [
        'Nous mesurons comment le travail est fait aujourd’hui avant de rien changer',
        'Nous relions des systèmes qui n’ont jamais été conçus pour fonctionner ensemble',
        'Les cas délicats sont envoyés à une personne pour être traités',
        'Des étapes d’approbation, un journal d’activité complet et un accès défini par rôle',
        'Des tableaux de bord qui montrent le temps et l’argent économisés par le projet',
      ],
    },
    outcomes: {
      en: [
        'Tasks finished faster, measured against a clear starting point',
        'Fewer mistakes that stay low because we keep watching them',
        'More gets done without hiring more people',
      ],
      fr: [
        'Des tâches terminées plus vite, mesurées par rapport à un point de départ clair',
        'Moins d’erreurs, qui le restent parce que nous continuons de les surveiller',
        'Plus de travail accompli sans embaucher plus de personnes',
      ],
    },
    stack: ['TypeScript', 'Temporal', 'PostgreSQL', 'Docker', 'Grafana'],
  },
  {
    slug: 'private-deployments',
    icon: 'ShieldCheck',
    featured: true,
    title: { en: 'Private AI you control', fr: 'IA privée sous votre contrôle' },
    tagline: {
      en: 'AI that runs on your servers, so your data never leaves.',
      fr: 'Une IA qui tourne sur vos serveurs, pour que vos données ne sortent jamais.',
    },
    description: {
      en: 'For work where your data cannot leave the country, the building, or a set of rules you must follow. We run AI models on your own systems, and we test them honestly so you know exactly what you gain or lose compared with a public AI service.',
      fr: 'Pour les travaux dont les données ne peuvent pas quitter le pays, le bâtiment, ou un ensemble de règles que vous devez respecter. Nous faisons tourner des modèles d’IA sur vos propres systèmes, et nous les testons honnêtement pour que vous sachiez exactement ce que vous gagnez ou perdez face à un service d’IA public.',
    },
    capabilities: {
      en: [
        'AI hosted on your own servers or private cloud, sized to your needs',
        'We pick and set up the right open AI models for you',
        'We tune the AI on your own information so answers fit your business',
        'Honest accuracy tests versus the big public AI services',
        'Can run fully offline when the rules require it',
      ],
      fr: [
        'Une IA hébergée sur vos propres serveurs ou votre cloud privé, dimensionnée à vos besoins',
        'Nous choisissons et installons les bons modèles d’IA ouverts pour vous',
        'Nous ajustons l’IA sur vos propres informations pour que les réponses collent à votre activité',
        'Des tests de précision honnêtes face aux grands services d’IA publics',
        'Peut fonctionner totalement hors ligne lorsque les règles l’exigent',
      ],
    },
    outcomes: {
      en: [
        'You can finally use AI on sensitive and regulated work',
        'No dependence on another company’s prices or uptime',
        'Clear proof of where your data goes — and where it does not',
      ],
      fr: [
        'Vous pouvez enfin utiliser l’IA sur des travaux sensibles et réglementés',
        'Aucune dépendance aux prix ou à la disponibilité d’une autre entreprise',
        'Une preuve claire de là où vont vos données — et de là où elles ne vont pas',
      ],
    },
    stack: ['vLLM', 'Kubernetes', 'NVIDIA CUDA', 'Terraform', 'Vector storage'],
  },
  {
    slug: 'data-intelligence',
    icon: 'LineChart',
    featured: false,
    title: { en: 'Answers from your data', fr: 'Des réponses à partir de vos données' },
    tagline: {
      en: 'Get clear answers from the data you already have.',
      fr: 'Obtenez des réponses claires à partir des données que vous avez déjà.',
    },
    description: {
      en: 'Most organisations have plenty of data — what they lack is an easy way to turn it into decisions. We connect your data and build simple tools so anyone, technical or not, can ask a real question and get an answer they can trust.',
      fr: 'La plupart des organisations ont beaucoup de données — ce qui leur manque, c’est un moyen simple d’en tirer des décisions. Nous relions vos données et créons des outils simples pour que n’importe qui, technicien ou non, puisse poser une vraie question et obtenir une réponse fiable.',
    },
    capabilities: {
      en: [
        'We bring together data spread across different systems',
        'One shared meaning for each number, across the whole organisation',
        'Ask questions in plain language and see how the answer was worked out',
        'Spot unusual patterns and forecast trends where the data allows',
        'Everyone sees only the data they are allowed to see',
      ],
      fr: [
        'Nous rassemblons des données dispersées dans différents systèmes',
        'Un sens commun et unique pour chaque chiffre, dans toute l’organisation',
        'Posez des questions en langage courant et voyez comment la réponse a été obtenue',
        'Repérez les anomalies et anticipez les tendances lorsque les données le permettent',
        'Chacun ne voit que les données qu’il est autorisé à voir',
      ],
    },
    outcomes: {
      en: [
        'Everyone makes decisions from the same, agreed numbers',
        'Your analysts explain the numbers instead of hunting for them',
        'Answers in minutes that used to take a request and a wait',
      ],
      fr: [
        'Chacun décide à partir des mêmes chiffres, validés et partagés',
        'Vos analystes expliquent les chiffres au lieu de passer leur temps à les chercher',
        'Des réponses en minutes là où il fallait auparavant faire une demande et attendre',
      ],
    },
    stack: ['dbt', 'PostgreSQL', 'DuckDB', 'Python', 'TypeScript'],
  },
  {
    slug: 'web-platforms',
    icon: 'Layers',
    featured: false,
    title: { en: 'Websites & web apps', fr: 'Sites et applications web' },
    tagline: {
      en: 'The screens people actually use, built to the same high standard.',
      fr: 'Les écrans que les gens utilisent vraiment, au même niveau d’exigence.',
    },
    description: {
      en: 'A smart system is only as good as the screen people use. We design and build the websites, apps, portals and internal tools that sit on top — easy to use, fast, multilingual, and built to the same high standard as everything behind them.',
      fr: 'Un système intelligent ne vaut que par l’écran que les gens utilisent. Nous concevons et développons les sites, applications, portails et outils internes qui les accompagnent — faciles à utiliser, rapides, multilingues, et conçus au même niveau d’exigence que tout ce qui se trouve derrière.',
    },
    capabilities: {
      en: [
        'Design and engineering handled by one team',
        'Built to work for people with disabilities, from the start',
        'Multiple languages built in from day one',
        'Kept fast and checked automatically on every change',
        'A design your own team can build on without us',
      ],
      fr: [
        'Design et développement pris en charge par une seule équipe',
        'Conçu dès le départ pour fonctionner pour les personnes en situation de handicap',
        'Plusieurs langues intégrées dès le premier jour',
        'Gardé rapide et vérifié automatiquement à chaque changement',
        'Un design que votre propre équipe peut faire évoluer sans nous',
      ],
    },
    outcomes: {
      en: [
        'Screens people are happy to use, without being told to',
        'Genuinely fast on real phones and real connections',
        'One system that serves every language you work in',
      ],
      fr: [
        'Des écrans que les gens utilisent volontiers, sans qu’on les y oblige',
        'Vraiment rapides sur de vrais téléphones et de vraies connexions',
        'Un seul système qui sert toutes les langues dans lesquelles vous travaillez',
      ],
    },
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS', 'Docker'],
  },
]
