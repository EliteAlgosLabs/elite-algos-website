import type { Dictionary } from './en'

/**
 * French dictionary.
 *
 * Typed as `Dictionary`, so this file will not compile if a single key is
 * missing or misspelled. That is the enforcement mechanism for the project's
 * "every string exists in both languages" requirement.
 *
 * Typography note: French requires a narrow no-break space before `; : ! ?`
 * and inside `« »`. We use U+202F (narrow no-break space) directly in the
 * strings below so the rendering is correct without runtime post-processing.
 */
export const fr: Dictionary = {
  // ==========================================================================
  // GLOBAL
  // ==========================================================================
  common: {
    company: 'Elite Algos Labs',
    companyLegal: 'Elite Algos Labs LTD',
    tagline: 'Nous créons des logiciels et de l’IA qui aident votre entreprise à mieux fonctionner.',
    taglineShort: 'Clair. Fiable. Durable.',
    sealMotto: 'Précision · Intelligence d’entreprise',
    sealSub: 'Ingénierie d’algorithmes intelligents',

    learnMore: 'En savoir plus',
    getInTouch: 'Nous contacter',
    startConversation: 'Entamer la conversation',
    viewAll: 'Tout voir',
    viewCaseStudy: 'Voir l’étude de cas',
    readArticle: 'Lire l’article',
    backTo: 'Retour à',
    exploreSolutions: 'Découvrir nos solutions',
    seeOurWork: 'Voir nos réalisations',
    bookBriefing: 'Planifier un échange',
    send: 'Envoyer',
    sending: 'Envoi en cours…',
    submit: 'Valider',
    close: 'Fermer',
    menu: 'Menu',
    next: 'Suivant',
    previous: 'Précédent',
    all: 'Tout',

    loading: 'Chargement',
    error: 'Une erreur est survenue',
    retry: 'Réessayer',
    notFoundShort: 'Introuvable',
    comingSoon: 'Bientôt disponible',
    copied: 'Copié',
    copy: 'Copier',

    skipToContent: 'Aller au contenu',
    toggleTheme: 'Changer de thème',
    toggleThemeLight: 'Passer en mode clair',
    toggleThemeDark: 'Passer en mode sombre',
    changeLanguage: 'Changer de langue',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    homeLink: 'Elite Algos Labs — accueil',
  },

  nav: {
    home: 'Accueil',
    solutions: 'Solutions',
    services: 'Services',
    portfolio: 'Réalisations',
    about: 'À propos',
    insights: 'Analyses',
    careers: 'Carrières',
    contact: 'Contact',
  },

  // ==========================================================================
  // SEO
  // ==========================================================================
  meta: {
    home: {
      title: 'Elite Algos Labs — L’IA et les logiciels pour votre entreprise',
      description:
        'Nous créons des logiciels et de l’IA que les entreprises, gouvernements et institutions utilisent chaque jour. De l’automatisation intelligente aux logiciels sur mesure, nous vous aidons à gagner du temps, à réduire le travail manuel et à mieux décider.',
    },
    solutions: {
      title: 'Solutions',
      description:
        'Des outils d’IA qui résolvent de vrais problèmes : assistants IA, traitement de documents, automatisation des tâches, IA privée sous votre contrôle et réponses claires à partir de vos propres données.',
    },
    services: {
      title: 'Services',
      description:
        'Conseil en IA, logiciels sur mesure, ajout d’IA aux systèmes que vous utilisez déjà, et mise en place cloud. Vous travaillez directement avec des ingénieurs seniors — sans sous-traitance à des juniors.',
    },
    portfolio: {
      title: 'Réalisations',
      description:
        'Une sélection de projets d’Elite Algos Labs, avec les vrais résultats mesurés par nos clients : traitement de documents, assistants IA et automatisation.',
    },
    about: {
      title: 'À propos',
      description:
        'Elite Algos Labs est une société de logiciels et d’IA sur laquelle entreprises, gouvernements et institutions comptent. Voici ce en quoi nous croyons et comment nous travaillons.',
    },
    contact: {
      title: 'Contact',
      description:
        'Échangez avec les ingénieurs qui construiront votre système. Dites-nous ce que vous voulez accomplir et nous vous dirons honnêtement si nous pouvons vous aider.',
    },
    careers: {
      title: 'Carrières',
      description:
        'Nous constituons une petite équipe d’ingénieurs, de designers et de chercheurs talentueux. Postes ouverts prochainement — dites-nous que vous êtes intéressé.',
    },
    insights: {
      title: 'Analyses',
      description:
        'Des notes pratiques et des enseignements de l’équipe Elite Algos Labs, écrits par celles et ceux qui font le travail.',
    },
    notFound: {
      title: 'Page introuvable',
      description: 'La page que vous cherchez n’existe pas ou a été déplacée.',
    },
  },

  // ==========================================================================
  // ACCUEIL
  // ==========================================================================
  home: {
    hero: {
      eyebrow: 'Ingénierie logicielle et IA',
      titleLine1: 'L’IA et les logiciels',
      titleLine2: 'pour votre entreprise.',
      lead: 'Elite Algos Labs crée des logiciels et de l’IA que les entreprises utilisent chaque jour — assistants IA, traitement de documents et automatisation qui font gagner du temps, réduisent le travail manuel et aident vos équipes à avancer plus vite.',
      primaryCta: 'Entamer la conversation',
      secondaryCta: 'Voir nos réalisations',
      scrollHint: 'Défiler',
    },

    mission: {
      eyebrow: 'Ce en quoi nous croyons',
      title: 'Nous créons une IA qui fonctionne vraiment dans le monde réel.',
      body: 'Beaucoup d’IA fait forte impression en démonstration, puis échoue une fois confrontée au travail réel. Nous créons celle qui dure. Chaque système que nous livrons est conçu pour être fiable dès le premier jour : vous voyez ce qu’il fait, vous pouvez l’annuler si besoin, et vous pouvez compter dessus pour de vrai.',
      pillars: {
        precision: {
          title: 'Précision',
          body: 'Nous définissons ce qu’est le succès avant de construire, puis nous le mesurons après. Nous vous disons ce que les chiffres montrent vraiment.',
        },
        trust: {
          title: 'Confiance',
          body: 'Vous voyez comment chaque décision a été prise, vous contrôlez où vont vos données, et vous pouvez tout faire tourner sur vos propres systèmes si vous le souhaitez.',
        },
        longevity: {
          title: 'Conçu pour durer',
          body: 'Nous écrivons des logiciels que votre propre équipe peut continuer à faire tourner longtemps après notre départ. Clairs, bien documentés et faciles à maintenir.',
        },
      },
    },

    services: {
      eyebrow: 'Notre métier',
      title: 'Tout ce qu’il vous faut, de l’idée au système fonctionnel.',
      lead: 'De l’IA en coulisses jusqu’aux écrans que vos équipes utilisent chaque matin.',
      cta: 'Tous nos services',
    },

    why: {
      eyebrow: 'Pourquoi Elite Algos Labs',
      title: 'Des ingénieurs seniors. De vrais résultats. Aucune sous-traitance.',
      lead: 'Les personnes qui planifient votre projet sont celles qui le construisent.',
      points: {
        seniority: {
          title: 'Ceux qui planifient sont ceux qui construisent',
          body: 'Les ingénieurs que vous rencontrez au premier échange sont ceux qui écrivent le code — et ceux que vous pourrez encore appeler un an plus tard.',
        },
        ownership: {
          title: 'Vous êtes propriétaire de tout',
          body: 'Le code, la mise en place et la documentation sont à vous. Aucune dépendance forcée, aucune partie cachée, aucune donnée retenue en otage.',
        },
        measurement: {
          title: 'Des résultats, pas de l’agitation',
          body: 'Nous convenons de la façon de mesurer le succès avant de commencer, nous la suivons et nous la rapportons honnêtement — même quand la nouvelle n’est pas bonne.',
        },
        sovereignty: {
          title: 'Vos données restent les vôtres',
          body: 'Nous pouvons tout faire tourner sur vos propres serveurs quand vous en avez besoin. Certaines données ne doivent jamais quitter vos murs, et c’est très bien ainsi.',
        },
      },
    },

    philosophy: {
      eyebrow: 'Notre façon de travailler',
      title: 'Nous construisons pour des années, pas pour des trimestres.',
      lead: 'Cinq règles derrière chacune de nos décisions.',
      principles: {
        one: {
          index: '01',
          title: 'Bien faire avant de faire malin',
          body: 'Simple et correct vaut mieux que malin et fragile. Nous construisons pour que la personne suivante puisse comprendre et maintenir le système des années plus tard.',
        },
        two: {
          index: '02',
          title: 'Le système doit s’expliquer lui-même',
          body: 'Vous devez toujours pouvoir voir pourquoi le système a pris une décision. Si nous ne pouvons pas expliquer un résultat, nous ne le plaçons pas dans un travail important.',
        },
        three: {
          index: '03',
          title: 'Prévoir les imprévus',
          body: 'Les outils tombent en panne, les connexions se coupent, les données changent. Nous prévoyons le mauvais jour exprès, pour qu’il ne vous surprenne pas plus tard.',
        },
        four: {
          index: '04',
          title: 'La documentation fait partie du travail',
          body: 'Nous notons comment les choses fonctionnent et pourquoi nous avons fait chaque choix, au fil de l’eau. Ce savoir vous reste.',
        },
        five: {
          index: '05',
          title: 'Mesurer avant d’automatiser',
          body: 'Nous mesurons comment le travail manuel est fait aujourd’hui avant de le remplacer. Automatiser sans mesurer d’abord, c’est deviner.',
        },
      },
    },

    solutions: {
      eyebrow: 'Ce que nous pouvons construire',
      title: 'De vrais systèmes, pas juste des démonstrations.',
      lead: 'Des solutions que nous avons déjà construites et que nous pouvons mettre en place pour votre organisation.',
      cta: 'Toutes nos solutions',
    },

    portfolio: {
      eyebrow: 'Nos réalisations',
      title: 'De vrais résultats.',
      lead: 'Un aperçu de ce que nous avons livré, avec les chiffres qui comptaient pour le client.',
      cta: 'Voir les réalisations',
    },

    cta: {
      eyebrow: 'Commencer ici',
      title: 'Dites-nous ce que vous voulez accomplir.',
      body: 'Ce n’est pas un appel commercial. C’est un échange direct avec les ingénieurs qui construiraient votre système — et une réponse honnête sur le fait que nous soyons ou non la bonne équipe.',
      primary: 'Entamer la conversation',
      secondary: 'hello@elitealgoslabs.com',
    },
  },

  // ==========================================================================
  // SOLUTIONS
  // ==========================================================================
  solutions: {
    hero: {
      eyebrow: 'Solutions',
      title: 'Ce que nous pouvons construire pour vous.',
      lead: 'Chacune de ces solutions est quelque chose que nous avons déjà construit et fait tourner. Ce sont des points de départ que nous adaptons à vos besoins — pas des produits tout faits vendus sur étagère.',
    },
    capabilitiesLabel: 'Ce que ça fait',
    outcomesLabel: 'Ce que vous obtenez',
    stackLabel: 'Construit avec',
    cta: {
      title: 'Laquelle se rapproche le plus de votre problème ?',
      body: 'La plupart des projets commencent par l’une de ces solutions, puis sont adaptés pour coller exactement à vos besoins. Parlez-nous du vôtre.',
      action: 'Entamer la conversation',
    },
  },

  // ==========================================================================
  // SERVICES
  // ==========================================================================
  services: {
    hero: {
      eyebrow: 'Services',
      title: 'Comment nous travaillons avec vous.',
      lead: 'Quatre façons de travailler ensemble, d’une courte revue de deux semaines à la construction et à l’exploitation d’un système complet pour vous. Chacune menée par des ingénieurs seniors.',
    },
    includesLabel: 'Ce que cela comprend',
    deliverableLabel: 'Ce que vous obtenez',
    timelineLabel: 'Durée habituelle',
    process: {
      eyebrow: 'Notre méthode',
      title: 'Comment se déroule vraiment un projet.',
      lead: 'Simple et régulière. C’est pour ça que nos systèmes fonctionnent encore un an plus tard.',
      steps: {
        one: {
          index: '01',
          title: 'Comprendre',
          body: 'Nous apprenons comment le travail est fait aujourd’hui, parlons avec les personnes qui le font, et mesurons le point de départ. Nous ne concevons rien tant que nous n’avons pas compris le problème.',
        },
        two: {
          index: '02',
          title: 'Planifier',
          body: 'Nous rédigeons un plan clair : comment ça va fonctionner, où vont vos données, à quoi ressemble le succès, ce qui pourrait mal tourner, et ce que nous ne construisons pas.',
        },
        three: {
          index: '03',
          title: 'Construire',
          body: 'Nous construisons par petites étapes et mettons un logiciel fonctionnel entre vos mains rapidement. Nous écrivons la documentation au fil de l’eau, pas à la fin.',
        },
        four: {
          index: '04',
          title: 'Lancer',
          body: 'Nous l’installons sur vos systèmes, avec la supervision et un moyen sûr de revenir en arrière, tout en place avant l’arrivée des vrais utilisateurs.',
        },
        five: {
          index: '05',
          title: 'Accompagner',
          body: 'Nous comparons les résultats au point de départ, corrigeons ce qui dérive, et transmettons un système que votre équipe peut vraiment s’approprier.',
        },
      },
    },
    cta: {
      title: 'Vous ne savez pas laquelle vous convient ?',
      body: 'Dites-nous le problème et nous vous dirons quelle option convient — ou si vous n’avez pas encore besoin de nous.',
      action: 'Parler à un ingénieur',
    },
  },

  // ==========================================================================
  // RÉALISATIONS
  // ==========================================================================
  portfolio: {
    hero: {
      eyebrow: 'Réalisations',
      title: 'Nos réalisations, et ce qu’elles ont changé.',
      lead: 'Une sélection de projets avec les résultats réellement mesurés par nos clients. Lorsqu’un client nous demande de rester discrets, nous nommons le secteur mais pas l’entreprise.',
    },
    filterAll: 'Tous les projets',
    filterLabel: 'Filtrer par type',
    resultsLabel: 'Résultats',
    challengeLabel: 'Le problème',
    approachLabel: 'Ce que nous avons fait',
    outcomeLabel: 'Le résultat',
    stackLabel: 'Construit avec',
    sectorLabel: 'Secteur',
    yearLabel: 'Année',
    durationLabel: 'Durée',
    beforeLabel: 'Avant',
    afterLabel: 'Après',
    confidential: 'Client gardé confidentiel',
    empty: 'Aucun projet ne correspond encore à ce filtre.',
    nextCase: 'Projet suivant',
    cta: {
      title: 'Votre projet pourrait être le prochain ici.',
      body: 'Dites-nous ce que vous voulez changer et à quoi ressemblerait le succès en chiffres.',
      action: 'Entamer la conversation',
    },
  },

  // ==========================================================================
  // À PROPOS
  // ==========================================================================
  about: {
    hero: {
      eyebrow: 'À propos',
      title: 'Une société de logiciels et d’IA sur laquelle compter.',
      lead: 'Elite Algos Labs LTD crée des logiciels et de l’IA pour des organisations qui ont besoin que ça fonctionne — pas seulement que ça fasse bonne impression. Nous sommes des ingénieurs, et nous assumons ce que nous livrons.',
    },
    story: {
      eyebrow: 'Qui nous sommes',
      title: 'Nous sommes partis d’une frustration simple.',
      body1:
        'L’IA fait souvent forte impression en démonstration, puis peine à fonctionner de manière fiable dans une vraie entreprise. Corriger cela est un travail d’ingénierie : garder les données en sécurité, gérer les erreurs, permettre aux gens de vérifier les résultats, maîtriser les coûts, et construire quelque chose que votre équipe peut réellement maintenir.',
      body2:
        'Nous avons créé Elite Algos Labs pour faire ce travail correctement. Nous prenons un petit nombre de clients et construisons des systèmes sur lesquels ils peuvent compter. Nous sommes immatriculés au Rwanda et travaillons avec des clients partout dans le monde.',
    },
    principles: {
      eyebrow: 'Nos exigences',
      title: 'Ce à quoi nous nous tenons.',
      lead: 'Ce ne sont pas des slogans. Ce sont les critères selon lesquels nous vérifions notre propre travail.',
    },
    numbers: {
      eyebrow: 'En bref',
      title: 'La société en chiffres.',
      incorporation: 'N° d’immatriculation',
      founded: 'Fondée en',
      foundedValue: '2025',
      jurisdiction: 'Immatriculée',
      jurisdictionValue: 'Rwanda',
      reach: 'Portée client',
      reachValue: 'Mondiale',
      languages: 'Langues de travail',
      languagesValue: 'English · Français',
    },
    team: {
      eyebrow: 'Équipe',
      title: 'Les personnes derrière le travail.',
      lead: 'Volontairement petite. Sur chaque projet, vous travaillez avec des personnes dont vous connaîtrez le nom.',
    },
    cta: {
      title: 'Travaillons ensemble.',
      body: 'Nous ne prenons que quelques projets à la fois. Si ce que vous construisez compte, parlez-nous-en.',
      action: 'Entamer la conversation',
    },
  },

  // ==========================================================================
  // CONTACT
  // ==========================================================================
  contact: {
    hero: {
      eyebrow: 'Contact',
      title: 'Parlez à un ingénieur.',
      lead: 'Ce n’est pas un formulaire qui atterrit dans une file commerciale. Décrivez le problème et quelqu’un capable de construire la solution vous répondra.',
    },
    channels: {
      title: 'Écrivez-nous directement',
      business: {
        label: 'Nouveaux projets',
        description: 'Devis, propositions et questions sur votre projet.',
      },
      general: {
        label: 'Demandes générales',
        description: 'Tout le reste — partenariats, presse et fournisseurs.',
      },
      founder: {
        label: 'Bureau du fondateur',
        description: 'Sujets privés ou de direction.',
      },
    },
    response: {
      title: 'La suite',
      steps: {
        one: 'Nous lisons chaque message nous-mêmes. Rien n’est trié par un robot.',
        two: 'Une vraie personne vous répond sous deux jours ouvrés.',
        three: 'Si nous sommes faits pour travailler ensemble, nous organisons un appel. Sinon, nous vous le disons et vous orientons vers un meilleur interlocuteur.',
      },
    },
    form: {
      title: 'Envoyez-nous un message',
      lead: 'Plus vous serez précis, plus notre réponse vous sera utile.',
      name: 'Nom complet',
      namePlaceholder: 'Ada Lovelace',
      email: 'Email professionnel',
      emailPlaceholder: 'vous@entreprise.com',
      company: 'Organisation',
      companyPlaceholder: 'Entreprise ou institution',
      companyOptional: 'facultatif',
      topic: 'De quoi s’agit-il ?',
      topicOptions: {
        project: 'Un nouveau projet',
        consulting: 'Conseil ou revue en IA',
        partnership: 'Partenariat',
        careers: 'Carrières',
        other: 'Autre sujet',
      },
      budget: 'Budget approximatif',
      budgetOptional: 'facultatif',
      budgetOptions: {
        undecided: 'Pas encore sûr',
        under25: 'Moins de 25 000 $',
        from25: '25 000 $ – 100 000 $',
        from100: '100 000 $ – 500 000 $',
        over500: 'Plus de 500 000 $',
      },
      message: 'Votre message',
      messagePlaceholder:
        'Que voulez-vous accomplir ? Comment cela se passe-t-il aujourd’hui, et à quoi ressemblerait le succès en chiffres ?',
      consent:
        'J’accepte qu’Elite Algos Labs conserve ce message afin de me répondre.',
      submit: 'Envoyer le message',
      submitting: 'Envoi en cours…',
      successTitle: 'Message bien reçu.',
      successBody:
        'Merci — nous avons votre message et vous répondrons sous deux jours ouvrés.',
      successAgain: 'Envoyer un autre message',
      errorTitle: 'L’envoi a échoué.',
      errorBody:
        'Un problème est survenu de notre côté. Merci de réessayer, ou écrivez-nous directement à hello@elitealgoslabs.com.',
    },
  },

  // ==========================================================================
  // CARRIÈRES
  // ==========================================================================
  careers: {
    hero: {
      eyebrow: 'Carrières',
      title: 'Nous constituons l’équipe.',
      lead: 'Elite Algos Labs réunit une petite équipe d’ingénieurs, de designers et de chercheurs talentueux. Nous définissons les premiers postes en ce moment.',
      badge: 'Ouverture prochaine',
    },
    what: {
      eyebrow: 'Ce que nous recherchons',
      title: 'Un certain type d’ingénieur.',
      lead: 'Les postes seront publiés ici en premier. D’ici là, voici le niveau d’exigence auquel nous recrutons.',
      traits: {
        depth: {
          title: 'Une vraie profondeur',
          body: 'Des personnes qui sont allées loin sur un sujet et savent expliquer pourquoi les parties difficiles l’étaient.',
        },
        ownership: {
          title: 'Le sens de la responsabilité',
          body: 'Des ingénieurs qui, face à un problème — une fonctionnalité cassée, un test manquant, une doc peu claire — le corrigent sans qu’on le leur demande.',
        },
        clarity: {
          title: 'Une écriture claire',
          body: 'Nous travaillons sur plusieurs fuseaux horaires et notons tout par écrit. Bien écrire compte ici autant qu’un code propre.',
        },
        judgement: {
          title: 'Un bon jugement',
          body: 'Savoir ce qu’il ne faut pas construire vaut plus que la capacité à tout construire.',
        },
      },
    },
    register: {
      eyebrow: 'Manifester son intérêt',
      title: 'Être informé en premier.',
      body: 'Envoyez-nous quelque chose que vous avez construit et nous vous recontacterons quand un poste correspondra. Partagez quelque chose dont vous êtes fier — du code, un article, un système ou un produit.',
      action: 'Écrire au fondateur',
      note: 'Écrivez à founder@elitealgoslabs.com avec pour objet « Carrières ».',
    },
  },

  // ==========================================================================
  // ANALYSES
  // ==========================================================================
  insights: {
    hero: {
      eyebrow: 'Analyses',
      title: 'Notes de terrain.',
      lead: 'Des enseignements pratiques et des arbitrages honnêtes tirés de nos projets — écrits par celles et ceux qui construisent, pour celles et ceux qui font face aux mêmes choix.',
    },
    featured: 'À la une',
    allArticles: 'Tous les articles',
    readingTime: 'min de lecture',
    publishedOn: 'Publié le',
    updatedOn: 'Mis à jour le',
    author: 'Écrit par',
    topicsLabel: 'Sujets',
    shareLabel: 'Partager cet article',
    relatedTitle: 'À lire également',
    backToInsights: 'Toutes les analyses',
    empty: 'Aucun article pour le moment. Les premiers sont en cours d’écriture.',
    tocTitle: 'Sur cette page',
  },

  // ==========================================================================
  // PIED DE PAGE
  // ==========================================================================
  footer: {
    blurb:
      'Elite Algos Labs LTD crée des logiciels et de l’IA pour les organisations qui en dépendent. Clair, fiable et conçu pour durer.',
    navTitle: 'Navigation',
    contactTitle: 'Contact',
    companyTitle: 'Société',
    legalTitle: 'Mentions légales',
    incorporation: 'N° d’immatriculation',
    rights: 'Tous droits réservés.',
    privacy: 'Confidentialité',
    terms: 'Conditions',
    builtWith: 'Conçu et développé en interne.',
    backToTop: 'Haut de page',
  },

  // ==========================================================================
  // VALIDATION
  // ==========================================================================
  validation: {
    required: 'Merci de remplir ce champ.',
    nameTooShort: 'Veuillez saisir votre nom complet.',
    emailInvalid: 'Veuillez saisir une adresse email valide.',
    messageTooShort: 'Merci d’en dire un peu plus — au moins 20 caractères.',
    messageTooLong: 'Ce message dépasse la limite du formulaire. Merci de nous écrire directement.',
    consentRequired: 'Votre accord est nécessaire pour conserver votre message et y répondre.',
    rateLimited: 'Trop de messages envoyés depuis cette adresse. Merci de réessayer bientôt.',
    serverError: 'Nous n’avons pas pu envoyer votre message. Merci de réessayer.',
  },

  // ==========================================================================
  // PAGES D’ERREUR
  // ==========================================================================
  notFound: {
    code: '404',
    title: 'Cette page n’existe pas.',
    body: 'L’adresse est peut-être mal saisie, ou la page a été déplacée. Tout le reste est resté à sa place.',
    action: 'Retour à l’accueil',
    secondary: 'Nous contacter',
  },
  error: {
    code: 'Erreur',
    title: 'Une erreur est survenue.',
    body: 'Une erreur inattendue a empêché cette page de se charger. Nous l’avons enregistrée. Vous pouvez réessayer ou revenir à l’accueil.',
    retry: 'Réessayer',
    action: 'Retour à l’accueil',
  },

  errorPage: {
    title: 'Une erreur est survenue de notre côté.',
    body: 'Une erreur inattendue s’est produite. Elle a été enregistrée et nous l’examinons.',
    action: 'Réessayer',
    secondary: 'Retour à l’accueil',
  },

  // ==========================================================================
  // TABLEAU DE BORD
  // ==========================================================================
  admin: {
    brand: 'Command',
    signIn: {
      title: 'Centre de commande',
      subtitle: 'Systèmes internes Elite Algos Labs',
      email: 'Email',
      password: 'Mot de passe',
      submit: 'Se connecter',
      submitting: 'Vérification…',
      error: 'Ces identifiants n’ont pas été reconnus.',
      locked: 'Trop de tentatives. Merci de patienter avant de réessayer.',
      restricted: 'Accès réservé au personnel autorisé. Toute connexion est journalisée.',
      back: 'Retour au site',
    },
    nav: {
      overview: 'Vue d’ensemble',
      analytics: 'Statistiques',
      visitors: 'Visiteurs',
      inbox: 'Messages',
      portfolio: 'Réalisations',
      blog: 'Analyses',
      team: 'Équipe',
      directory: 'Annuaire',
      roles: 'Rôles et permissions',
      agents: 'Agents IA',
      github: 'GitHub',
      brain: 'Company Brain',
      notifications: 'Notifications',
      settings: 'Paramètres',
      groupContent: 'Contenu',
      groupIntelligence: 'Intelligence',
      groupPeople: 'Personnes',
      groupSystem: 'Système',
    },
    common: {
      signOut: 'Se déconnecter',
      search: 'Rechercher',
      searchPlaceholder: 'Rechercher partout…',
      filter: 'Filtrer',
      export: 'Exporter',
      refresh: 'Actualiser',
      save: 'Enregistrer',
      saving: 'Enregistrement…',
      saved: 'Enregistré',
      cancel: 'Annuler',
      delete: 'Supprimer',
      edit: 'Modifier',
      create: 'Créer',
      publish: 'Publier',
      unpublish: 'Dépublier',
      draft: 'Brouillon',
      published: 'Publié',
      status: 'Statut',
      actions: 'Actions',
      date: 'Date',
      title: 'Titre',
      author: 'Auteur',
      role: 'Rôle',
      email: 'Email',
      name: 'Nom',
      never: 'Jamais',
      today: 'Aujourd’hui',
      yesterday: 'Hier',
      viewAll: 'Tout voir',
      noResults: 'Rien à afficher pour le moment.',
      placeholderNotice:
        'Espace réservé — ce module est en place et attend sa source de données.',
      comingSoon: 'Bientôt disponible',
      live: 'En direct',
      lastUpdated: 'Dernière mise à jour',
    },
    overview: {
      title: 'Vue d’ensemble',
      greeting: 'Bon retour',
      subtitle: 'Tout en un coup d’œil.',
      stats: {
        visitors: 'Visiteurs (30 j)',
        pageviews: 'Pages vues (30 j)',
        enquiries: 'Nouvelles demandes',
        avgResponse: 'Délai de réponse moyen',
        articles: 'Articles publiés',
        caseStudies: 'Études de cas',
      },
      recentEnquiries: 'Demandes récentes',
      systemStatus: 'État des systèmes',
      activity: 'Activité récente',
    },
    analytics: {
      title: 'Statistiques du site',
      subtitle: 'Trafic, engagement et acquisition.',
      range: 'Période',
      ranges: {
        d7: '7 derniers jours',
        d30: '30 derniers jours',
        d90: '90 derniers jours',
        y1: '12 derniers mois',
      },
      metrics: {
        visitors: 'Visiteurs uniques',
        pageviews: 'Pages vues',
        avgDuration: 'Session moyenne',
        bounce: 'Taux de rebond',
      },
      topPages: 'Pages les plus vues',
      topSources: 'Sources de trafic',
      byCountry: 'Par pays',
      byDevice: 'Par appareil',
      byLanguage: 'Par langue',
    },
    visitors: {
      title: 'Statistiques visiteurs',
      subtitle: 'Qui vous lit, depuis où, et dans quelle langue.',
      liveNow: 'Actifs maintenant',
      returning: 'Récurrents',
      new: 'Nouveaux',
      country: 'Pays',
      city: 'Ville',
      device: 'Appareil',
      browser: 'Navigateur',
      language: 'Langue',
      landingPage: 'Page d’entrée',
      referrer: 'Référent',
    },
    inbox: {
      title: 'Boîte de réception',
      subtitle: 'Demandes envoyées depuis le site.',
      unread: 'Non lus',
      read: 'Lus',
      archived: 'Archivés',
      replied: 'Répondus',
      markRead: 'Marquer comme lu',
      markReplied: 'Marquer comme répondu',
      archive: 'Archiver',
      from: 'De',
      subject: 'Objet',
      received: 'Reçu',
      topic: 'Sujet',
      budget: 'Budget',
      empty: 'Aucune demande pour le moment.',
      selectPrompt: 'Sélectionnez un message pour le lire.',
    },
    portfolioMgr: {
      title: 'Gestion des réalisations',
      subtitle: 'Études de cas, médias et résultats clients.',
      newCase: 'Nouvelle étude de cas',
      sector: 'Secteur',
      year: 'Année',
      featured: 'À la une',
      translations: 'Traductions',
      complete: 'Complet',
      missingFr: 'Français manquant',
    },
    blogMgr: {
      title: 'Gestion des analyses',
      subtitle: 'Articles, brouillons et traductions.',
      newPost: 'Nouvel article',
      readingTime: 'Temps de lecture',
      topics: 'Sujets',
      translations: 'Traductions',
      complete: 'Complet',
      missingFr: 'Français manquant',
    },
    team: {
      title: 'Membres de l’équipe',
      subtitle: 'Qui compose l’équipe et de quoi chacun répond.',
      addMember: 'Ajouter un membre',
      position: 'Poste',
      focus: 'Domaine',
      joined: 'Arrivée',
    },
    directory: {
      title: 'Annuaire du personnel',
      subtitle: 'Coordonnées et lignes hiérarchiques.',
      department: 'Département',
      location: 'Localisation',
      timezone: 'Fuseau horaire',
      reportsTo: 'Rattaché à',
    },
    roles: {
      title: 'Rôles et permissions',
      subtitle: 'Qui peut faire quoi dans le centre de commande.',
      permission: 'Permission',
      matrixNote:
        'Les rôles sont définis dans le code et appliqués côté serveur. Cette matrice est générée à partir de cette définition — elle ne peut pas diverger de ce qui est réellement appliqué.',
      capabilities: 'Capacités',
      members: 'Membres',
      names: {
        founder: 'Fondateur',
        administrator: 'Administrateur',
        developer: 'Développeur',
        marketing: 'Marketing',
        editor: 'Éditeur',
        readonly: 'Lecture seule',
      },
      descriptions: {
        founder: 'Accès sans restriction à tous les modules et paramètres.',
        administrator:
          'Accès opérationnel complet ; ne peut pas modifier les paramètres réservés au fondateur.',
        developer: 'Systèmes, agents, déploiement et visibilité sur les dépôts.',
        marketing:
          'Statistiques, visiteurs, publication de contenu et boîte de réception des demandes.',
        editor: 'Créer et modifier du contenu ; la publication requiert une approbation.',
        readonly: 'Accès en lecture seule aux modules autorisés.',
      },
      perms: {
        viewDashboard: 'Voir le tableau de bord',
        viewAnalytics: 'Voir les statistiques',
        manageInbox: 'Gérer les demandes',
        manageContent: 'Créer et modifier du contenu',
        publishContent: 'Publier du contenu',
        managePortfolio: 'Gérer les réalisations',
        manageTeam: 'Gérer l’équipe',
        manageRoles: 'Gérer les rôles',
        viewAgents: 'Voir les agents IA',
        manageAgents: 'Piloter les agents IA',
        viewRepos: 'Voir les dépôts',
        manageSettings: 'Gérer les paramètres',
      },
    },
    agents: {
      title: 'État des agents IA',
      subtitle: 'Systèmes autonomes en activité chez Elite Algos Labs.',
      status: {
        online: 'En ligne',
        degraded: 'Dégradé',
        offline: 'Hors ligne',
        standby: 'En veille',
      },
      currentTask: 'Tâche en cours',
      neverSeen: 'Jamais signalé',
      idle: 'Inactif',
      justNow: 'à l’instant',
      minutesAgo: 'min',
      hoursAgo: 'h',
      daysAgo: 'j',
      uptime: 'Disponibilité',
      lastHeartbeat: 'Dernier signal',
      tasksToday: 'Tâches aujourd’hui',
      model: 'Modèle',
      role: 'Responsabilité',
      logs: 'Activité récente',
      lexaRole: 'Déploiement, exploitation de l’infrastructure et supervision de la production.',
      aelynRole:
        'Orchestration des dépôts, synchronisation documentaire et flux d’ingénierie.',
    },
    github: {
      title: 'Activité GitHub',
      subtitle: 'Commits, branches et versions à l’échelle de l’organisation.',
      repositories: 'Dépôts',
      commits: 'Commits',
      openPrs: 'Pull requests ouvertes',
      lastCommit: 'Dernier commit',
      branch: 'Branche',
      contributors: 'Contributeurs',
      connectPrompt:
        'Connectez un jeton GitHub pour alimenter ce module avec des données en direct.',
    },
    brain: {
      title: 'Company Brain',
      subtitle:
        'Mémoire institutionnelle — décisions d’architecture, procédures et enseignements tirés.',
      notes: 'Notes',
      lastSync: 'Dernière synchronisation',
      categories: 'Catégories',
      recentlyUpdated: 'Récemment mis à jour',
      openInObsidian: 'Ouvrir le coffre',
      syncNote:
        'Le Company Brain est un coffre Markdown versionné dans Git et consulté via Obsidian. Ce module en reflète l’état actuel.',
    },
    notifications: {
      title: 'Notifications',
      subtitle: 'Événements système, déploiements et demandes.',
      markAllRead: 'Tout marquer comme lu',
      empty: 'Vous êtes à jour.',
      filters: { all: 'Toutes', unread: 'Non lues', system: 'Système', content: 'Contenu' },
    },
    settings: {
      title: 'Paramètres',
      subtitle: 'Espace de travail, apparence et intégrations.',
      sections: {
        profile: 'Profil',
        appearance: 'Apparence',
        localisation: 'Localisation',
        notifications: 'Notifications',
        integrations: 'Intégrations',
        security: 'Sécurité',
        email: 'Email & SMTP',
      },
      email: {
        title: 'Livraison des emails',
        statusConfigured: 'Configuré',
        statusNotConfigured: 'Non configuré',
        statusConnected: 'Connecté',
        statusError: 'Erreur de connexion',
        host: 'Serveur SMTP',
        port: 'Port',
        inbox: 'Demandes livrées à',
        connectedHelp: 'Le serveur de messagerie a accepté nos identifiants. Les demandes du formulaire de contact sont livrées par email et les visiteurs reçoivent un accusé de réception.',
        errorHelp: 'Le SMTP est configuré mais le serveur a rejeté la connexion. Les demandes sont toujours enregistrées dans la boîte de réception ; vérifiez les identifiants et le serveur.',
        notConfiguredHelp: 'Aucun identifiant SMTP n’est défini. Le formulaire de contact valide et enregistre chaque demande dans la boîte de réception, mais aucun email n’est envoyé. Définissez SMTP_* dans l’environnement pour activer la livraison.',
      },
      theme: 'Thème',
      themeLight: 'Clair',
      themeDark: 'Sombre',
      themeSystem: 'Système',
      language: 'Langue de l’interface',
      emailNotifications: 'Notifications par email',
      emailNotificationsHelp: 'Recevoir un email à chaque nouvelle demande.',
      twoFactor: 'Authentification à deux facteurs',
      twoFactorHelp:
        'Exiger un second facteur lors de la connexion au centre de commande.',
      apiKeys: 'Clés API',
      dangerZone: 'Zone sensible',
    },
  },
}
