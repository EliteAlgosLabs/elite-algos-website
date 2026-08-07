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
      en: 'AI advice & review',
      fr: 'Audit et conseil en IA',
    },
    summary: {
      en: 'A short, focused project that works out what is worth building — and what is not. You leave with a clear plan and costs, whether or not you build it with us.',
      fr: 'Une mission courte et ciblée qui détermine ce qui vaut la peine d’être construit — et ce qui ne le vaut pas. Vous repartez avec un plan clair et chiffré, que vous le réalisiez avec nous ou non.',
    },
    includes: {
      en: [
        'We map how the work is done today and measure the starting point',
        'We test what is possible using your real data, not a sample',
        'A clear “build or buy” comparison with named options and honest trade-offs',
        'A cost estimate covering running costs, setup and upkeep',
        'A list of risks: data safety, rules to follow, and what could go wrong',
      ],
      fr: [
        'Nous étudions comment le travail est fait aujourd’hui et mesurons le point de départ',
        'Nous testons ce qui est possible avec vos vraies données, pas un échantillon',
        'Une comparaison claire « construire ou acheter », avec options nommées et arbitrages honnêtes',
        'Une estimation des coûts : fonctionnement, mise en place et entretien',
        'Une liste des risques : sécurité des données, règles à respecter, et ce qui pourrait mal tourner',
      ],
    },
    deliverable: {
      en: 'A written plan with costs, an order of work, and a clear recommendation — including “do not build this” when that is the honest answer.',
      fr: 'Un plan écrit, chiffré et ordonné, avec une recommandation claire — y compris « ne pas construire ceci » lorsque c’est la réponse honnête.',
    },
    timeline: { en: '2–4 weeks', fr: '2 à 4 semaines' },
  },
  {
    slug: 'custom-platforms',
    icon: 'Blocks',
    title: {
      en: 'Custom AI software, built for you',
      fr: 'Ingénierie de plateformes IA sur mesure',
    },
    summary: {
      en: 'We design and build a complete working system for you — the AI, the screens your team uses, and everything needed to run it without us.',
      fr: 'Nous concevons et construisons pour vous un système complet et fonctionnel — l’IA, les écrans que votre équipe utilise, et tout ce qu’il faut pour le faire tourner sans nous.',
    },
    includes: {
      en: [
        'A clear written plan before we write any code',
        'We pick the right AI models and test them properly',
        'The apps and admin screens your team will actually use',
        'A reliable setup with monitoring and automatic alerts',
        'Guides, notes on our choices, and training so you can take over',
      ],
      fr: [
        'Un plan écrit et clair avant d’écrire la moindre ligne de code',
        'Nous choisissons les bons modèles d’IA et les testons correctement',
        'Les applications et les écrans d’administration que votre équipe utilisera vraiment',
        'Une mise en place fiable, avec supervision et alertes automatiques',
        'Des guides, nos choix expliqués, et une formation pour que vous puissiez reprendre la main',
      ],
    },
    deliverable: {
      en: 'A working system running on your own setup, all the code and files in your hands, and a team able to run and grow it.',
      fr: 'Un système en fonctionnement sur votre propre infrastructure, tout le code et les fichiers entre vos mains, et une équipe capable de le faire tourner et de le faire évoluer.',
    },
    timeline: { en: '3–9 months', fr: '3 à 9 mois' },
  },
  {
    slug: 'integration',
    icon: 'GitBranch',
    title: {
      en: 'Adding AI to systems you already use',
      fr: 'Intégration de l’IA aux systèmes existants',
    },
    summary: {
      en: 'Adding AI to software you already rely on and cannot switch off. The hard part is rarely the AI itself — it is fitting it in safely without breaking what works.',
      fr: 'Ajouter de l’IA à des logiciels dont vous dépendez déjà et que vous ne pouvez pas arrêter. Le plus difficile est rarement l’IA elle-même — c’est de l’intégrer sans casser ce qui fonctionne.',
    },
    includes: {
      en: [
        'A review of your current system, its data and its limits',
        'A plan that adds AI without rebuilding everything',
        'A step-by-step rollout you can measure at each stage',
        'A person reviews the important decisions before they take effect',
        'Nothing breaks, and we can safely undo any change',
      ],
      fr: [
        'Une revue de votre système actuel, de ses données et de ses limites',
        'Un plan qui ajoute l’IA sans tout reconstruire',
        'Un déploiement progressif que vous pouvez mesurer à chaque étape',
        'Une personne vérifie les décisions importantes avant qu’elles ne s’appliquent',
        'Rien ne casse, et nous pouvons annuler tout changement en toute sécurité',
      ],
    },
    deliverable: {
      en: 'New features inside the product you already have, delivered step by step, with every step safe to undo.',
      fr: 'De nouvelles fonctionnalités dans le produit que vous avez déjà, livrées étape par étape, chaque étape pouvant être annulée.',
    },
    timeline: { en: '6–16 weeks', fr: '6 à 16 semaines' },
  },
  {
    slug: 'cloud-infrastructure',
    icon: 'Cloud',
    title: {
      en: 'Cloud & private setup',
      fr: 'Infrastructure cloud et privée',
    },
    summary: {
      en: 'The foundation everything else runs on. Set up around your real needs for cost, speed and data control — including options that never leave your own servers.',
      fr: 'La base sur laquelle tout le reste fonctionne. Mise en place selon vos vrais besoins de coût, de rapidité et de contrôle des données — y compris des options qui ne quittent jamais vos propres serveurs.',
    },
    includes: {
      en: [
        'Setup on the cloud, your own servers, or a mix of both',
        'Grows with demand automatically, and keeps costs under control',
        'Private AI hosting when your data cannot leave your building',
        'Updates with no downtime, and a safe automatic rollback',
        'Monitoring and clear guides for when something needs attention',
      ],
      fr: [
        'Mise en place sur le cloud, vos propres serveurs, ou un mélange des deux',
        'S’adapte automatiquement à la demande et garde les coûts sous contrôle',
        'Hébergement d’IA privé lorsque vos données ne peuvent pas quitter votre bâtiment',
        'Des mises à jour sans interruption, avec une annulation automatique et sûre',
        'Une supervision et des guides clairs pour quand quelque chose demande attention',
      ],
    },
    deliverable: {
      en: 'A reliable, repeatable setup, with the tools to run it and the guides to hand it over.',
      fr: 'Une mise en place fiable et reproductible, avec les outils pour la faire tourner et les guides pour la transmettre.',
    },
    timeline: { en: '4–12 weeks', fr: '4 à 12 semaines' },
  },
]
