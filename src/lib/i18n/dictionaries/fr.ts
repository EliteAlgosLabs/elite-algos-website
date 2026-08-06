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
    tagline: "Bâtir les fondations de l'intelligence mondiale.",
    taglineShort: 'Précision. Confiance. Innovation.',
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
      title: 'Elite Algos Labs — L’ingénierie des logiciels intelligents',
      description:
        'Nous concevons et développons des systèmes d’intelligence artificielle, des agents autonomes et des automatisations d’entreprise que les organisations exploitent en production. Une ingénierie de précision pour un marché mondial.',
    },
    solutions: {
      title: 'Solutions',
      description:
        'Plateformes d’IA prêtes pour la production : agents intelligents, compréhension documentaire, automatisation d’entreprise, déploiements privés et intelligence des données — conçus pour l’échelle et l’auditabilité.',
    },
    services: {
      title: 'Services',
      description:
        'Conseil en IA, ingénierie de plateformes sur mesure, intégration de systèmes et infrastructure cloud. Des ingénieurs seniors, des résultats mesurables, aucune sous-traitance à des équipes juniors.',
    },
    portfolio: {
      title: 'Réalisations',
      description:
        'Une sélection de projets d’Elite Algos Labs — des études de cas aux résultats réellement mesurés, en intelligence documentaire, agents autonomes et automatisation d’entreprise.',
    },
    about: {
      title: 'À propos',
      description:
        'Elite Algos Labs est une société d’ingénierie en IA qui construit les systèmes dont dépendent entreprises, gouvernements et institutions. Nos principes, nos exigences et notre méthode.',
    },
    contact: {
      title: 'Contact',
      description:
        'Échangez avec les ingénieurs qui construiront votre système. Décrivez votre objectif et nous vous dirons honnêtement si nous sommes les bons interlocuteurs.',
    },
    careers: {
      title: 'Carrières',
      description:
        'Nous constituons une équipe restreinte d’ingénieurs, de designers et de chercheurs d’exception. Postes ouverts prochainement — manifestez votre intérêt.',
    },
    insights: {
      title: 'Analyses',
      description:
        'Notes d’ingénierie, décisions d’architecture et retours de terrain de l’équipe Elite Algos Labs. Écrits par celles et ceux qui font le travail.',
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
      eyebrow: 'Ingénierie en intelligence artificielle',
      titleLine1: 'L’intelligence,',
      titleLine2: 'par l’ingénierie.',
      lead: 'Elite Algos Labs conçoit des systèmes d’intelligence artificielle que les organisations exploitent en production — agents autonomes, compréhension documentaire et automatisation d’entreprise, pensés pour être fiables, auditables et dignes de confiance.',
      primaryCta: 'Entamer la conversation',
      secondaryCta: 'Découvrir nos réalisations',
      scrollHint: 'Défiler',
    },

    mission: {
      eyebrow: 'Mission',
      title: 'Nous bâtissons les systèmes sur lesquels l’intelligence repose.',
      body: 'La plupart des systèmes d’intelligence artificielle ne survivent pas au contact de la production. Ils impressionnent en démonstration puis échouent en silence — sans supervision, sans responsable, incapables de s’expliquer. Nous existons pour combler cet écart. Chaque système que nous livrons est conçu pour le jour où l’on comptera sur lui : observable, réversible et responsable devant celles et ceux dont le travail en dépend.',
      pillars: {
        precision: {
          title: 'Précision',
          body: 'Les systèmes sont spécifiés avant d’être construits et mesurés après leur mise en service. Nous rapportons ce que les chiffres disent réellement.',
        },
        trust: {
          title: 'Confiance',
          body: 'Des décisions auditables, des frontières de données explicites et des déploiements que vous maîtrisez entièrement — y compris au sein de votre propre infrastructure.',
        },
        longevity: {
          title: 'Longévité',
          body: 'Nous écrivons des logiciels destinés à être maintenus par des personnes qui n’étaient pas dans la pièce. Documentés, typés et volontairement sans surprise.',
        },
      },
    },

    services: {
      eyebrow: 'Notre métier',
      title: 'Une ingénierie sur toute la chaîne de l’intelligence.',
      lead: 'De la couche modèle jusqu’à l’interface que vos équipes utilisent chaque matin.',
      cta: 'Tous nos services',
    },

    why: {
      eyebrow: 'Pourquoi Elite Algos Labs',
      title: 'Des ingénieurs seniors. Des résultats mesurés. Aucune sous-traitance.',
      lead: 'Ce qui change lorsque les personnes qui cadrent votre système sont celles qui le construisent.',
      points: {
        seniority: {
          title: 'Ceux qui cadrent sont ceux qui construisent',
          body: 'Pas de pyramide de sous-traitance. Les ingénieurs de votre premier échange sont ceux qui écrivent le code — et ceux que vous appellerez dans dix-huit mois.',
        },
        ownership: {
          title: 'Vous êtes propriétaire de tout',
          body: 'Code source, poids de modèles le cas échéant, définitions d’infrastructure et documentation. Aucune dépendance forcée, aucune boîte noire, aucune donnée retenue en otage.',
        },
        measurement: {
          title: 'Des résultats, pas de l’activité',
          body: 'Nous définissons ensemble la métrique du succès avant de commencer, nous l’instrumentons et nous la rapportons honnêtement — y compris lorsqu’elle déçoit.',
        },
        sovereignty: {
          title: 'Vos données restent les vôtres',
          body: 'Les déploiements privés et sur site sont une option de premier plan, pas une réflexion après coup. Certaines charges de travail ne doivent jamais quitter vos murs.',
        },
      },
    },

    philosophy: {
      eyebrow: 'Philosophie d’ingénierie',
      title: 'Construire pour des décennies, pas pour des trimestres.',
      lead: 'Cinq engagements qui orientent chacune de nos décisions techniques.',
      principles: {
        one: {
          index: '01',
          title: 'La justesse avant l’ingéniosité',
          body: 'Un système simple et correct vaut mieux qu’un système brillant et fragile. Nous optimisons pour l’ingénieur qui en héritera dans trois ans.',
        },
        two: {
          index: '02',
          title: 'Un système doit pouvoir s’expliquer',
          body: 'Chaque décision automatisée doit être traçable jusqu’à ses données d’entrée. Si nous ne pouvons pas expliquer un résultat, nous ne le mettons pas en production dans un processus critique.',
        },
        three: {
          index: '03',
          title: 'Concevoir pour la panne',
          body: 'Les modèles dérivent, les API disparaissent, les réseaux se coupent. Nous concevons délibérément le mode dégradé plutôt que de le découvrir en production.',
        },
        four: {
          index: '04',
          title: 'La documentation fait partie de la livraison',
          body: 'Décisions d’architecture, arbitrages et alternatives écartées sont consignés au fil du travail. La mémoire institutionnelle est une infrastructure.',
        },
        five: {
          index: '05',
          title: 'Mériter le droit d’automatiser',
          body: 'Nous mesurons le processus manuel avant de le remplacer. Automatiser sans référence de départ, c’est deviner en costume.',
        },
      },
    },

    solutions: {
      eyebrow: 'Solutions phares',
      title: 'Des plateformes, pas des prototypes.',
      lead: 'Des systèmes que nous avons conçus et que nous pouvons déployer pour votre organisation.',
      cta: 'Toutes nos solutions',
    },

    portfolio: {
      eyebrow: 'Sélection de projets',
      title: 'Des résultats mesurés.',
      lead: 'Un aperçu de ce que nous avons livré, avec les chiffres qui comptaient pour le client.',
      cta: 'Voir les réalisations',
    },

    cta: {
      eyebrow: 'Commencer ici',
      title: 'Dites-nous ce que vous cherchez à accomplir.',
      body: 'Pas un appel commercial. Un échange technique avec les ingénieurs qui construiraient votre système — et une réponse honnête sur notre capacité à vous aider.',
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
      title: 'Des systèmes conçus pour la production.',
      lead: 'Chacune de ces solutions est une plateforme que nous avons conçue, développée et exploitée. Ce sont des points de départ que nous façonnons selon vos exigences, non des licences vendues sur étagère.',
    },
    capabilitiesLabel: 'Capacités',
    outcomesLabel: 'Résultats habituels',
    stackLabel: 'Pile technique représentative',
    cta: {
      title: 'Laquelle se rapproche le plus de votre problème ?',
      body: 'La plupart de nos missions commencent comme une variante de ce qui précède et aboutissent à quelque chose de plus spécifique. Décrivez-nous la vôtre.',
      action: 'Entamer la conversation',
    },
  },

  // ==========================================================================
  // SERVICES
  // ==========================================================================
  services: {
    hero: {
      eyebrow: 'Services',
      title: 'Nos modes de collaboration.',
      lead: 'Quatre façons de travailler ensemble, d’un audit de deux semaines à la prise en charge complète d’une plateforme. Chacune assurée par des ingénieurs seniors.',
    },
    includesLabel: 'Ce que cela comprend',
    deliverableLabel: 'Ce que vous recevez',
    timelineLabel: 'Durée habituelle',
    process: {
      eyebrow: 'Méthode',
      title: 'Comment se déroule réellement une mission.',
      lead: 'Volontairement peu spectaculaire. C’est la raison pour laquelle nos systèmes passent leur première année.',
      steps: {
        one: {
          index: '01',
          title: 'Comprendre',
          body: 'Nous cartographions le processus actuel, échangeons avec celles et ceux qui le vivent, et établissons la métrique de référence. Rien n’est conçu tant que le problème n’est pas mesuré.',
        },
        two: {
          index: '02',
          title: 'Spécifier',
          body: 'Une spécification technique écrite : architecture, frontières de données, critères de succès, modes de défaillance et la liste explicite de ce que nous ne construirons pas.',
        },
        three: {
          index: '03',
          title: 'Concevoir',
          body: 'Des itérations courtes conformes à la spécification, avec un logiciel fonctionnel entre vos mains rapidement. La documentation s’écrit en même temps, jamais après coup.',
        },
        four: {
          index: '04',
          title: 'Déployer',
          body: 'Dans votre infrastructure, avec supervision, procédures d’exploitation et chemins de retour arrière en place avant l’arrivée du trafic.',
        },
        five: {
          index: '05',
          title: 'Pérenniser',
          body: 'Nous mesurons par rapport à la référence, corrigeons les dérives et transmettons un système que vos équipes peuvent réellement s’approprier.',
        },
      },
    },
    cta: {
      title: 'Vous hésitez sur la formule adaptée ?',
      body: 'Décrivez le problème et nous vous dirons quelle mission convient — ou que vous n’avez pas encore besoin de nous.',
      action: 'Parler à un ingénieur',
    },
  },

  // ==========================================================================
  // RÉALISATIONS
  // ==========================================================================
  portfolio: {
    hero: {
      eyebrow: 'Réalisations',
      title: 'Nos projets, et ce qu’ils ont changé.',
      lead: 'Une sélection de missions avec les résultats effectivement mesurés par nos clients. Lorsqu’un client est soumis à une clause de confidentialité, nous nommons le secteur, jamais l’organisation.',
    },
    filterAll: 'Tous les projets',
    filterLabel: 'Filtrer par discipline',
    resultsLabel: 'Résultats',
    challengeLabel: 'Le défi',
    approachLabel: 'Notre approche',
    outcomeLabel: 'Le résultat',
    stackLabel: 'Conçu avec',
    sectorLabel: 'Secteur',
    yearLabel: 'Année',
    durationLabel: 'Durée',
    beforeLabel: 'Avant',
    afterLabel: 'Après',
    confidential: 'Client sous accord de confidentialité',
    empty: 'Aucun projet ne correspond encore à ce filtre.',
    nextCase: 'Étude de cas suivante',
    cta: {
      title: 'Votre système pourrait être le prochain ici.',
      body: 'Dites-nous ce que vous cherchez à transformer et à quoi ressemblerait le succès en chiffres.',
      action: 'Entamer la conversation',
    },
  },

  // ==========================================================================
  // À PROPOS
  // ==========================================================================
  about: {
    hero: {
      eyebrow: 'À propos',
      title: 'Avant tout, une société d’ingénierie.',
      lead: 'Elite Algos Labs LTD conçoit des systèmes d’intelligence artificielle pour des organisations qui ont besoin qu’ils fonctionnent — pas qu’ils impressionnent. Nous sommes des ingénieurs, et nous répondons de ce que nous livrons.',
    },
    story: {
      eyebrow: 'Qui nous sommes',
      title: 'Née d’une frustration précise.',
      body1:
        'L’écart entre ce que l’intelligence artificielle sait faire en démonstration et ce qu’elle accomplit réellement au sein d’une organisation est immense — et il relève presque entièrement de l’ingénierie. Frontières de données, gestion des défaillances, observabilité, revue humaine, maîtrise des coûts, dérive des modèles, et le travail ingrat consistant à rendre un système maintenable par quelqu’un d’autre.',
      body2:
        'Elite Algos Labs a été fondée pour faire ce travail correctement. Nous construisons un petit nombre de systèmes pour un petit nombre d’organisations, et nous les construisons pour qu’on puisse s’y fier. Nous sommes immatriculés au Rwanda et travaillons avec des clients dans le monde entier.',
    },
    principles: {
      eyebrow: 'Exigences',
      title: 'Ce à quoi nous nous tenons.',
      lead: 'Ce ne sont pas des aspirations. Ce sont les critères selon lesquels nous évaluons notre propre travail.',
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
      title: 'Les personnes responsables du travail.',
      lead: 'Volontairement restreinte. Chaque mission est portée par des personnes dont vous connaîtrez le nom.',
    },
    cta: {
      title: 'Travaillons ensemble.',
      body: 'Nous acceptons un nombre limité de missions simultanées. Si ce que vous construisez compte, parlez-nous-en.',
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
      lead: 'Pas un formulaire qui alimente une file commerciale. Décrivez le problème et quelqu’un capable de construire la solution vous répondra.',
    },
    channels: {
      title: 'Contacts directs',
      business: {
        label: 'Nouveaux projets',
        description: 'Cadrage, propositions et discussions techniques.',
      },
      general: {
        label: 'Demandes générales',
        description: 'Tout le reste — partenariats, presse, achats.',
      },
      founder: {
        label: 'Bureau du fondateur',
        description: 'Sujets stratégiques, confidentiels ou de direction.',
      },
    },
    response: {
      title: 'La suite',
      steps: {
        one: 'Nous lisons chaque message nous-mêmes — aucun tri automatique.',
        two: 'Vous recevez une réponse sous deux jours ouvrés, écrite par une personne.',
        three: 'S’il y a une adéquation, nous organisons un échange technique. Sinon, nous le disons et vous orientons vers un meilleur interlocuteur.',
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
      topic: 'De quoi s’agit-il ?',
      topicOptions: {
        project: 'Un nouveau projet',
        consulting: 'Conseil ou audit en IA',
        partnership: 'Partenariat',
        careers: 'Carrières',
        other: 'Autre sujet',
      },
      budget: 'Budget indicatif',
      budgetOptional: 'facultatif',
      budgetOptions: {
        undecided: 'Non défini à ce stade',
        under25: 'Moins de 25 000 $',
        from25: '25 000 $ – 100 000 $',
        from100: '100 000 $ – 500 000 $',
        over500: 'Plus de 500 000 $',
      },
      message: 'Votre message',
      messagePlaceholder:
        'Que cherchez-vous à accomplir, à quoi ressemble la situation actuelle, et à quoi ressemblerait le succès en chiffres ?',
      consent:
        'J’accepte qu’Elite Algos Labs conserve ce message afin de répondre à ma demande.',
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
      lead: 'Elite Algos Labs réunit un groupe restreint d’ingénieurs, de designers et de chercheurs d’exception. Les postes sont en cours de définition.',
      badge: 'Ouverture prochaine',
    },
    what: {
      eyebrow: 'Ce que nous rechercherons',
      title: 'Un profil d’ingénieur bien particulier.',
      lead: 'Les postes seront publiés ici en premier. D’ici là, voici le niveau d’exigence auquel nous recrutons.',
      traits: {
        depth: {
          title: 'La profondeur plutôt que l’étendue',
          body: 'Des personnes qui sont allées réellement loin sur un sujet et savent expliquer pourquoi les parties difficiles l’étaient.',
        },
        ownership: {
          title: 'Le sens de la responsabilité',
          body: 'Des ingénieurs qui considèrent l’incident de production, le test manquant et la documentation confuse comme étant à eux de corriger.',
        },
        clarity: {
          title: 'La clarté à l’écrit',
          body: 'Nous travaillons sur plusieurs fuseaux horaires et documentons tout. Bien écrire est ici une compétence d’ingénierie fondamentale, pas un bonus.',
        },
        judgement: {
          title: 'Le discernement sur le périmètre',
          body: 'Savoir ce qu’il ne faut pas construire vaut davantage que la capacité à tout construire.',
        },
      },
    },
    register: {
      eyebrow: 'Manifester son intérêt',
      title: 'Être prévenu en premier.',
      body: 'Envoyez-nous ce que vous avez construit et nous vous contacterons lorsqu’un poste correspondra. Joignez quelque chose dont vous êtes fier — du code, un article, un système, un produit.',
      action: 'Écrire au fondateur',
      note: 'Écrivez à founder@elitealgoslabs.com avec pour objet « Carrières ».',
    },
  },

  // ==========================================================================
  // ANALYSES
  // ==========================================================================
  insights: {
    hero: {
      eyebrow: 'Analyses',
      title: 'Notes de terrain.',
      lead: 'Décisions d’architecture, arbitrages d’ingénierie et observations de terrain — écrits par celles et ceux qui construisent, pour celles et ceux qui devront trancher les mêmes questions.',
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
    empty: 'Aucun article publié pour le moment. Les premiers sont en cours d’écriture.',
    tocTitle: 'Sur cette page',
  },

  // ==========================================================================
  // PIED DE PAGE
  // ==========================================================================
  footer: {
    blurb:
      'Elite Algos Labs LTD conçoit des systèmes d’intelligence artificielle pour les organisations qui en dépendent. Précision, confiance et longévité — par conception.',
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
    required: 'Ce champ est obligatoire.',
    nameTooShort: 'Veuillez saisir votre nom complet.',
    emailInvalid: 'Veuillez saisir une adresse email valide.',
    messageTooShort: 'Merci de préciser un peu davantage — au moins 20 caractères.',
    messageTooLong: 'Ce message dépasse la limite du formulaire. Merci de nous écrire directement.',
    consentRequired: 'Votre accord est nécessaire pour conserver votre message et y répondre.',
    rateLimited: 'Trop de messages envoyés depuis cette adresse. Merci de réessayer sous peu.',
    serverError: 'Nous n’avons pas pu traiter votre demande. Merci de réessayer.',
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
    body: 'Une erreur inattendue a interrompu cette page. L’incident a été consigné. Vous pouvez réessayer ou revenir à l’accueil.',
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
