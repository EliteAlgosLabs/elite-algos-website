/**
 * English dictionary — the source of truth for the entire interface.
 *
 * The `Dictionary` type is derived from this object, so every other language
 * file must match its shape exactly. Add a key here first, then translate.
 *
 * Copy principles for this brand:
 *   • Concrete over abstract. "Cuts document handling from days to minutes",
 *     not "leverages cutting-edge AI to drive synergies".
 *   • Outcome over mechanism. Clients buy the result; engineers read the spec.
 *   • Confident, never boastful. State what is true and stop talking.
 */

export const en = {
  // ==========================================================================
  // GLOBAL
  // ==========================================================================
  common: {
    company: 'Elite Algos Labs',
    companyLegal: 'Elite Algos Labs LTD',
    tagline: 'Building the foundations of global intelligence.',
    taglineShort: 'Precision. Trust. Innovation.',
    sealMotto: 'Precision · Enterprise Intelligence',
    sealSub: 'Engineering smart algorithms',

    // Actions
    learnMore: 'Learn more',
    getInTouch: 'Get in touch',
    startConversation: 'Start a conversation',
    viewAll: 'View all',
    viewCaseStudy: 'View case study',
    readArticle: 'Read article',
    backTo: 'Back to',
    exploreSolutions: 'Explore solutions',
    seeOurWork: 'See our work',
    bookBriefing: 'Book a briefing',
    send: 'Send',
    sending: 'Sending…',
    submit: 'Submit',
    close: 'Close',
    menu: 'Menu',
    next: 'Next',
    previous: 'Previous',
    all: 'All',

    // System / state
    loading: 'Loading',
    error: 'Something went wrong',
    retry: 'Try again',
    notFoundShort: 'Not found',
    comingSoon: 'Coming soon',
    copied: 'Copied',
    copy: 'Copy',

    // Accessibility
    skipToContent: 'Skip to content',
    toggleTheme: 'Switch theme',
    toggleThemeLight: 'Switch to light mode',
    toggleThemeDark: 'Switch to dark mode',
    changeLanguage: 'Change language',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    homeLink: 'Elite Algos Labs — home',
  },

  nav: {
    home: 'Home',
    solutions: 'Solutions',
    services: 'Services',
    portfolio: 'Portfolio',
    about: 'About',
    insights: 'Insights',
    careers: 'Careers',
    contact: 'Contact',
  },

  // ==========================================================================
  // SEO — one entry per route
  // ==========================================================================
  meta: {
    home: {
      title: 'Elite Algos Labs — Engineering intelligent software',
      description:
        'We design and build artificial intelligence systems, autonomous agents and enterprise automation that organisations trust in production. Precision engineering for a global market.',
    },
    solutions: {
      title: 'Solutions',
      description:
        'Production-grade AI platforms: intelligent agents, document understanding, enterprise automation, private deployments and data intelligence — engineered for scale and auditability.',
    },
    services: {
      title: 'Services',
      description:
        'AI consulting, custom platform engineering, systems integration and cloud infrastructure. Senior engineers, measurable outcomes, no hand-offs to junior teams.',
    },
    portfolio: {
      title: 'Portfolio',
      description:
        'Selected work from Elite Algos Labs — case studies with real measured outcomes across document intelligence, autonomous agents and enterprise automation.',
    },
    about: {
      title: 'About',
      description:
        'Elite Algos Labs is an AI engineering company building systems that businesses, governments and institutions rely on. Our principles, our standards and how we work.',
    },
    contact: {
      title: 'Contact',
      description:
        'Talk to the engineers who will build your system. Tell us what you are trying to achieve and we will tell you honestly whether we can help.',
    },
    careers: {
      title: 'Careers',
      description:
        'We are assembling a small team of exceptional engineers, designers and researchers. Roles open soon — register your interest.',
    },
    insights: {
      title: 'Insights',
      description:
        'Engineering notes, architecture decisions and field research from the Elite Algos Labs team. Written by the people doing the work.',
    },
    notFound: {
      title: 'Page not found',
      description: 'The page you are looking for does not exist or has moved.',
    },
  },

  // ==========================================================================
  // HOME
  // ==========================================================================
  home: {
    hero: {
      eyebrow: 'Artificial intelligence engineering',
      titleLine1: 'Intelligence,',
      titleLine2: 'engineered.',
      lead: 'Elite Algos Labs builds artificial intelligence systems that organisations run in production — autonomous agents, document understanding, and enterprise automation designed to be trusted, audited and depended upon.',
      primaryCta: 'Start a conversation',
      secondaryCta: 'Explore our work',
      scrollHint: 'Scroll',
    },

    mission: {
      eyebrow: 'Mission',
      title: 'We build the systems intelligence runs on.',
      body: 'Most artificial intelligence never survives contact with production. It demos beautifully and fails quietly — unmonitored, unowned, unable to explain itself. We exist to close that gap. Every system we ship is designed for the day it is relied upon: observable, reversible, and accountable to the people whose work depends on it.',
      pillars: {
        precision: {
          title: 'Precision',
          body: 'Systems are specified before they are built and measured after they ship. We report what the numbers actually say.',
        },
        trust: {
          title: 'Trust',
          body: 'Auditable decisions, explicit data boundaries and deployments you fully control — including entirely inside your own infrastructure.',
        },
        longevity: {
          title: 'Longevity',
          body: 'We write software meant to be maintained by people who were not in the room. Documented, typed, and boring in all the right places.',
        },
      },
    },

    services: {
      eyebrow: 'What we do',
      title: 'Engineering across the full intelligence stack.',
      lead: 'From the model layer to the interface your team uses every morning.',
      cta: 'All services',
    },

    why: {
      eyebrow: 'Why Elite Algos Labs',
      title: 'Senior engineers. Measured outcomes. No hand-offs.',
      lead: 'What changes when the people who scoped your system are the people who build it.',
      points: {
        seniority: {
          title: 'The people who scope it, build it',
          body: 'No pyramid staffing. The engineers in your first conversation are the engineers writing the code — and the ones you call in eighteen months.',
        },
        ownership: {
          title: 'You own everything',
          body: 'Source code, model weights where applicable, infrastructure definitions and documentation. No lock-in, no black boxes, no hostage data.',
        },
        measurement: {
          title: 'Outcomes, not activity',
          body: 'We agree the metric that defines success before we start, instrument it, and report it honestly — including when it disappoints.',
        },
        sovereignty: {
          title: 'Your data stays yours',
          body: 'Private and on-premise deployments are a first-class option, not an afterthought. Some workloads must never leave your building.',
        },
      },
    },

    philosophy: {
      eyebrow: 'Engineering philosophy',
      title: 'Build for decades, not quarters.',
      lead: 'Five commitments that shape every technical decision we make.',
      principles: {
        one: {
          index: '01',
          title: 'Correctness before cleverness',
          body: 'A system that is simple and right beats one that is ingenious and fragile. We optimise for the engineer who inherits this in three years.',
        },
        two: {
          index: '02',
          title: 'Make the system explain itself',
          body: 'Every automated decision should be traceable to its inputs. If we cannot explain an output, we do not ship it into a workflow that matters.',
        },
        three: {
          index: '03',
          title: 'Design for the failure case',
          body: 'Models drift, APIs disappear, networks partition. We engineer the degraded path deliberately instead of discovering it in production.',
        },
        four: {
          index: '04',
          title: 'Documentation is part of the deliverable',
          body: 'Architecture decisions, trade-offs and rejected alternatives are recorded as the work happens. Institutional memory is infrastructure.',
        },
        five: {
          index: '05',
          title: 'Earn the right to automate',
          body: 'We measure the manual process before replacing it. Automation without a baseline is a guess wearing a suit.',
        },
      },
    },

    solutions: {
      eyebrow: 'Featured solutions',
      title: 'Platforms, not prototypes.',
      lead: 'Systems we have engineered and can deploy for your organisation.',
      cta: 'All solutions',
    },

    portfolio: {
      eyebrow: 'Selected work',
      title: 'Measured results.',
      lead: 'A sample of what we have shipped, with the numbers that mattered to the client.',
      cta: 'View portfolio',
    },

    cta: {
      eyebrow: 'Start here',
      title: 'Tell us what you are trying to achieve.',
      body: 'Not a sales call. A technical conversation with the engineers who would build your system — and an honest answer about whether we are the right team for it.',
      primary: 'Start a conversation',
      secondary: 'hello@elitealgoslabs.com',
    },
  },

  // ==========================================================================
  // SOLUTIONS
  // ==========================================================================
  solutions: {
    hero: {
      eyebrow: 'Solutions',
      title: 'Systems engineered for production.',
      lead: 'Each of these is a platform we have designed, built and operated. They are starting points shaped around your requirements, not licences sold off a shelf.',
    },
    capabilitiesLabel: 'Capabilities',
    outcomesLabel: 'Typical outcomes',
    stackLabel: 'Representative stack',
    cta: {
      title: 'Which of these is closest to your problem?',
      body: 'Most engagements begin as a version of one of the above and end somewhere more specific. Tell us the shape of yours.',
      action: 'Start a conversation',
    },
  },

  // ==========================================================================
  // SERVICES
  // ==========================================================================
  services: {
    hero: {
      eyebrow: 'Services',
      title: 'How we engage.',
      lead: 'Four ways of working together, from a two-week assessment to owning a platform end to end. Every one staffed by senior engineers.',
    },
    includesLabel: 'What it includes',
    deliverableLabel: 'What you receive',
    timelineLabel: 'Typical duration',
    process: {
      eyebrow: 'Process',
      title: 'How an engagement actually runs.',
      lead: 'Deliberately unglamorous. It is the reason our systems survive their first year.',
      steps: {
        one: {
          index: '01',
          title: 'Understand',
          body: 'We map the current process, talk to the people inside it, and establish the baseline metric. Nothing is designed until the problem is measured.',
        },
        two: {
          index: '02',
          title: 'Specify',
          body: 'A written technical specification: architecture, data boundaries, success criteria, failure modes and the explicit list of what we are not building.',
        },
        three: {
          index: '03',
          title: 'Engineer',
          body: 'Short iterations against the specification, with working software in your hands early. Documentation is written as we go, not retrofitted.',
        },
        four: {
          index: '04',
          title: 'Deploy',
          body: 'Into your infrastructure, with monitoring, runbooks and rollback paths in place before traffic arrives.',
        },
        five: {
          index: '05',
          title: 'Sustain',
          body: 'We measure against the baseline, tune what drifts, and hand over a system your team can genuinely own.',
        },
      },
    },
    cta: {
      title: 'Not sure which one you need?',
      body: 'Describe the problem and we will tell you which engagement fits — or that you do not need us yet.',
      action: 'Talk to an engineer',
    },
  },

  // ==========================================================================
  // PORTFOLIO
  // ==========================================================================
  portfolio: {
    hero: {
      eyebrow: 'Portfolio',
      title: 'Work, and what it changed.',
      lead: 'Selected engagements with the outcomes our clients actually measured. Where a client is under confidentiality, the sector is named and the organisation is not.',
    },
    filterAll: 'All work',
    filterLabel: 'Filter by discipline',
    resultsLabel: 'Results',
    challengeLabel: 'The challenge',
    approachLabel: 'Our approach',
    outcomeLabel: 'The outcome',
    stackLabel: 'Engineered with',
    sectorLabel: 'Sector',
    yearLabel: 'Year',
    durationLabel: 'Duration',
    beforeLabel: 'Before',
    afterLabel: 'After',
    confidential: 'Client under NDA',
    empty: 'No work matches this filter yet.',
    nextCase: 'Next case study',
    cta: {
      title: 'Your system could be the next one here.',
      body: 'Tell us what you are trying to change and what success would look like in numbers.',
      action: 'Start a conversation',
    },
  },

  // ==========================================================================
  // ABOUT
  // ==========================================================================
  about: {
    hero: {
      eyebrow: 'About',
      title: 'An engineering company, first.',
      lead: 'Elite Algos Labs LTD builds artificial intelligence systems for organisations that need them to work — not to impress. We are engineers, and we are accountable for what we ship.',
    },
    story: {
      eyebrow: 'Who we are',
      title: 'Founded on a specific frustration.',
      body1:
        'The gap between what artificial intelligence can do in a demonstration and what it reliably does inside an organisation is enormous — and almost entirely an engineering problem. Data boundaries, failure handling, observability, human review, cost control, drift, and the unglamorous work of making a system somebody else can maintain.',
      body2:
        'Elite Algos Labs was formed to do that work properly. We build a small number of systems for a small number of organisations, and we build them to be depended upon. We are incorporated in the United Kingdom and we work with clients globally.',
    },
    principles: {
      eyebrow: 'Standards',
      title: 'What we hold ourselves to.',
      lead: 'These are not aspirations. They are the criteria we review our own work against.',
    },
    numbers: {
      eyebrow: 'At a glance',
      title: 'The company in numbers.',
      incorporation: 'Incorporation no.',
      founded: 'Founded',
      foundedValue: '2025',
      jurisdiction: 'Registered',
      jurisdictionValue: 'United Kingdom',
      reach: 'Client reach',
      reachValue: 'Global',
      languages: 'Operating languages',
      languagesValue: 'English · Français',
    },
    team: {
      eyebrow: 'Team',
      title: 'The people accountable for the work.',
      lead: 'Small by design. Every engagement is staffed by people whose names you will know.',
    },
    cta: {
      title: 'Work with us.',
      body: 'We take on a limited number of engagements at a time. If what you are building matters, tell us about it.',
      action: 'Start a conversation',
    },
  },

  // ==========================================================================
  // CONTACT
  // ==========================================================================
  contact: {
    hero: {
      eyebrow: 'Contact',
      title: 'Talk to an engineer.',
      lead: 'Not a form that routes to a sales queue. Tell us the problem and someone who could actually build the solution will reply.',
    },
    channels: {
      title: 'Direct channels',
      business: {
        label: 'New projects',
        description: 'Scoping, proposals and technical discussion.',
      },
      general: {
        label: 'General enquiries',
        description: 'Everything else — partnerships, press, procurement.',
      },
      founder: {
        label: "Founder's office",
        description: 'Strategic, confidential or executive matters.',
      },
    },
    response: {
      title: 'What happens next',
      steps: {
        one: 'We read every message ourselves — no auto-triage.',
        two: 'You receive a reply within two business days, from a person.',
        three: 'If there is a fit, we schedule a technical conversation. If there is not, we say so and point you somewhere better.',
      },
    },
    form: {
      title: 'Send us a message',
      lead: 'The more specific you are, the more useful our reply will be.',
      name: 'Full name',
      namePlaceholder: 'Ada Lovelace',
      email: 'Work email',
      emailPlaceholder: 'you@company.com',
      company: 'Organisation',
      companyPlaceholder: 'Company or institution',
      companyOptional: 'optional',
      topic: 'What is this about?',
      topicOptions: {
        project: 'A new project',
        consulting: 'AI consulting or assessment',
        partnership: 'Partnership',
        careers: 'Careers',
        other: 'Something else',
      },
      budget: 'Indicative budget',
      budgetOptional: 'optional',
      budgetOptions: {
        undecided: 'Not yet determined',
        under25: 'Under $25,000',
        from25: '$25,000 – $100,000',
        from100: '$100,000 – $500,000',
        over500: 'Over $500,000',
      },
      message: 'Your message',
      messagePlaceholder:
        'What are you trying to achieve, what does it look like today, and what would success look like in numbers?',
      consent:
        'I agree that Elite Algos Labs may store this message in order to respond to my enquiry.',
      submit: 'Send message',
      submitting: 'Sending…',
      successTitle: 'Message received.',
      successBody:
        'Thank you — we have your message and will reply within two business days.',
      successAgain: 'Send another message',
      errorTitle: 'That did not send.',
      errorBody:
        'Something failed on our side. Please try again, or email us directly at hello@elitealgoslabs.com.',
    },
  },

  // ==========================================================================
  // CAREERS
  // ==========================================================================
  careers: {
    hero: {
      eyebrow: 'Careers',
      title: 'We are assembling the team.',
      lead: 'Elite Algos Labs is building a small group of exceptional engineers, designers and researchers. Formal openings are being defined now.',
      badge: 'Opening soon',
    },
    what: {
      eyebrow: 'What we will be looking for',
      title: 'A specific kind of engineer.',
      lead: 'Roles will be posted here first. In the meantime, this is the standard we hire to.',
      traits: {
        depth: {
          title: 'Depth over breadth',
          body: 'People who have gone genuinely deep on something and can explain why the hard parts were hard.',
        },
        ownership: {
          title: 'Ownership instinct',
          body: 'Engineers who treat the production incident, the missing test and the confusing docs as theirs to fix.',
        },
        clarity: {
          title: 'Written clarity',
          body: 'We work across time zones and document everything. Clear writing is a core engineering skill here, not a bonus.',
        },
        judgement: {
          title: 'Judgement about scope',
          body: 'Knowing what not to build is worth more than the ability to build anything.',
        },
      },
    },
    register: {
      eyebrow: 'Register interest',
      title: 'Get told first.',
      body: 'Send us what you have built and we will contact you when a role matches. Include something you are proud of — code, a paper, a system, a product.',
      action: 'Email the founder',
      note: 'Write to founder@elitealgoslabs.com with the subject "Careers".',
    },
  },

  // ==========================================================================
  // INSIGHTS / BLOG
  // ==========================================================================
  insights: {
    hero: {
      eyebrow: 'Insights',
      title: 'Notes from the work.',
      lead: 'Architecture decisions, engineering trade-offs and field observations — written by the people doing the building, for people who will have to make the same calls.',
    },
    featured: 'Featured',
    allArticles: 'All articles',
    readingTime: 'min read',
    publishedOn: 'Published',
    updatedOn: 'Updated',
    author: 'Written by',
    topicsLabel: 'Topics',
    shareLabel: 'Share this article',
    relatedTitle: 'Related reading',
    backToInsights: 'All insights',
    empty: 'No articles published yet. The first ones are being written.',
    tocTitle: 'On this page',
  },

  // ==========================================================================
  // FOOTER
  // ==========================================================================
  footer: {
    blurb:
      'Elite Algos Labs LTD engineers artificial intelligence systems for organisations that depend on them. Precision, trust and longevity — by design.',
    navTitle: 'Navigate',
    contactTitle: 'Contact',
    companyTitle: 'Company',
    legalTitle: 'Legal',
    incorporation: 'Incorporation no.',
    rights: 'All rights reserved.',
    privacy: 'Privacy',
    terms: 'Terms',
    builtWith: 'Designed and engineered in-house.',
    backToTop: 'Back to top',
  },

  // ==========================================================================
  // FORM VALIDATION
  // ==========================================================================
  validation: {
    required: 'This field is required.',
    nameTooShort: 'Please enter your full name.',
    emailInvalid: 'Please enter a valid email address.',
    messageTooShort: 'Please give us a little more detail — at least 20 characters.',
    messageTooLong: 'That is longer than our form accepts. Please email us directly.',
    consentRequired: 'We need your agreement in order to store and reply to your message.',
    rateLimited: 'Too many messages from this address. Please try again shortly.',
    serverError: 'We could not process that. Please try again.',
  },

  // ==========================================================================
  // ERROR PAGES
  // ==========================================================================
  notFound: {
    code: '404',
    title: 'This page does not exist.',
    body: 'The address may be mistyped, or the page may have moved. Everything else is still where you left it.',
    action: 'Return home',
    secondary: 'Contact us',
  },

  errorPage: {
    title: 'Something broke on our side.',
    body: 'An unexpected error occurred. It has been logged and we are looking at it.',
    action: 'Try again',
    secondary: 'Return home',
  },

  // ==========================================================================
  // ADMIN DASHBOARD
  // ==========================================================================
  admin: {
    brand: 'Command',
    signIn: {
      title: 'Command Center',
      subtitle: 'Elite Algos Labs internal systems',
      email: 'Email',
      password: 'Password',
      submit: 'Sign in',
      submitting: 'Verifying…',
      error: 'Those credentials were not recognised.',
      locked: 'Too many attempts. Please wait before trying again.',
      restricted: 'Authorised personnel only. All access is logged.',
      back: 'Back to website',
    },
    nav: {
      overview: 'Overview',
      analytics: 'Analytics',
      visitors: 'Visitors',
      inbox: 'Inbox',
      portfolio: 'Portfolio',
      blog: 'Insights',
      team: 'Team',
      directory: 'Directory',
      roles: 'Roles & permissions',
      agents: 'AI agents',
      github: 'GitHub',
      brain: 'Company Brain',
      notifications: 'Notifications',
      settings: 'Settings',
      groupContent: 'Content',
      groupIntelligence: 'Intelligence',
      groupPeople: 'People',
      groupSystem: 'System',
    },
    common: {
      signOut: 'Sign out',
      search: 'Search',
      searchPlaceholder: 'Search everything…',
      filter: 'Filter',
      export: 'Export',
      refresh: 'Refresh',
      save: 'Save changes',
      saving: 'Saving…',
      saved: 'Saved',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      create: 'Create',
      publish: 'Publish',
      unpublish: 'Unpublish',
      draft: 'Draft',
      published: 'Published',
      status: 'Status',
      actions: 'Actions',
      date: 'Date',
      title: 'Title',
      author: 'Author',
      role: 'Role',
      email: 'Email',
      name: 'Name',
      never: 'Never',
      today: 'Today',
      yesterday: 'Yesterday',
      viewAll: 'View all',
      noResults: 'Nothing to show yet.',
      placeholderNotice: 'Placeholder — this module is scaffolded and awaiting its data source.',
      comingSoon: 'Coming soon',
      live: 'Live',
      lastUpdated: 'Last updated',
    },
    overview: {
      title: 'Overview',
      greeting: 'Welcome back',
      subtitle: 'Everything at a glance.',
      stats: {
        visitors: 'Visitors (30d)',
        pageviews: 'Page views (30d)',
        enquiries: 'New enquiries',
        avgResponse: 'Avg. response time',
        articles: 'Published articles',
        caseStudies: 'Case studies',
      },
      recentEnquiries: 'Recent enquiries',
      systemStatus: 'System status',
      activity: 'Recent activity',
    },
    analytics: {
      title: 'Website analytics',
      subtitle: 'Traffic, engagement and acquisition.',
      range: 'Range',
      ranges: { d7: 'Last 7 days', d30: 'Last 30 days', d90: 'Last 90 days', y1: 'Last 12 months' },
      metrics: {
        visitors: 'Unique visitors',
        pageviews: 'Page views',
        avgDuration: 'Avg. session',
        bounce: 'Bounce rate',
      },
      topPages: 'Top pages',
      topSources: 'Traffic sources',
      byCountry: 'By country',
      byDevice: 'By device',
      byLanguage: 'By language',
    },
    visitors: {
      title: 'Visitor statistics',
      subtitle: 'Who is reading, from where, in which language.',
      liveNow: 'Active now',
      returning: 'Returning',
      new: 'New',
      country: 'Country',
      city: 'City',
      device: 'Device',
      browser: 'Browser',
      language: 'Language',
      landingPage: 'Landing page',
      referrer: 'Referrer',
    },
    inbox: {
      title: 'Contact inbox',
      subtitle: 'Enquiries submitted through the website.',
      unread: 'Unread',
      read: 'Read',
      archived: 'Archived',
      replied: 'Replied',
      markRead: 'Mark as read',
      markReplied: 'Mark as replied',
      archive: 'Archive',
      from: 'From',
      subject: 'Subject',
      received: 'Received',
      topic: 'Topic',
      budget: 'Budget',
      empty: 'No enquiries yet.',
      selectPrompt: 'Select a message to read it.',
    },
    portfolioMgr: {
      title: 'Portfolio manager',
      subtitle: 'Case studies, media and client results.',
      newCase: 'New case study',
      sector: 'Sector',
      year: 'Year',
      featured: 'Featured',
      translations: 'Translations',
      complete: 'Complete',
      missingFr: 'Missing French',
    },
    blogMgr: {
      title: 'Insights manager',
      subtitle: 'Articles, drafts and translations.',
      newPost: 'New article',
      readingTime: 'Reading time',
      topics: 'Topics',
      translations: 'Translations',
      complete: 'Complete',
      missingFr: 'Missing French',
    },
    team: {
      title: 'Team members',
      subtitle: 'Who is on the team and what they are accountable for.',
      addMember: 'Add member',
      position: 'Position',
      focus: 'Focus',
      joined: 'Joined',
    },
    directory: {
      title: 'Employee directory',
      subtitle: 'Contact details and reporting lines.',
      department: 'Department',
      location: 'Location',
      timezone: 'Time zone',
      reportsTo: 'Reports to',
    },
    roles: {
      title: 'Roles & permissions',
      subtitle: 'Who can do what across the command center.',
      permission: 'Permission',
      matrixNote:
        'Roles are defined in code and enforced on the server. This matrix is generated from that definition — it cannot drift from what is actually enforced.',
      capabilities: 'Capabilities',
      members: 'Members',
      names: {
        founder: 'Founder',
        administrator: 'Administrator',
        developer: 'Developer',
        marketing: 'Marketing',
        editor: 'Editor',
        readonly: 'Read only',
      },
      descriptions: {
        founder: 'Unrestricted access to every module and setting.',
        administrator: 'Full operational access; cannot alter founder-level settings.',
        developer: 'Systems, agents, deployment and repository visibility.',
        marketing: 'Analytics, visitors, content publishing and the enquiry inbox.',
        editor: 'Create and edit content; publishing requires approval.',
        readonly: 'View-only access across permitted modules.',
      },
      perms: {
        viewDashboard: 'View dashboard',
        viewAnalytics: 'View analytics',
        manageInbox: 'Manage enquiries',
        manageContent: 'Create & edit content',
        publishContent: 'Publish content',
        managePortfolio: 'Manage portfolio',
        manageTeam: 'Manage team',
        manageRoles: 'Manage roles',
        viewAgents: 'View AI agents',
        manageAgents: 'Control AI agents',
        viewRepos: 'View repositories',
        manageSettings: 'Manage settings',
      },
    },
    agents: {
      title: 'AI agent status',
      subtitle: 'Autonomous systems operating inside Elite Algos Labs.',
      status: {
        online: 'Online',
        degraded: 'Degraded',
        offline: 'Offline',
        standby: 'Standby',
      },
      uptime: 'Uptime',
      lastHeartbeat: 'Last heartbeat',
      tasksToday: 'Tasks today',
      model: 'Model',
      role: 'Responsibility',
      logs: 'Recent activity',
      lexaRole: 'Deployment, infrastructure operations and production monitoring.',
      aelynRole: 'Repository orchestration, documentation sync and engineering workflow.',
    },
    github: {
      title: 'GitHub activity',
      subtitle: 'Commits, branches and releases across the organisation.',
      repositories: 'Repositories',
      commits: 'Commits',
      openPrs: 'Open pull requests',
      lastCommit: 'Last commit',
      branch: 'Branch',
      contributors: 'Contributors',
      connectPrompt: 'Connect a GitHub token to populate this module with live data.',
    },
    brain: {
      title: 'Company Brain',
      subtitle: 'Institutional memory — architecture decisions, runbooks and lessons learned.',
      notes: 'Notes',
      lastSync: 'Last synchronised',
      categories: 'Categories',
      recentlyUpdated: 'Recently updated',
      openInObsidian: 'Open vault',
      syncNote:
        'The Company Brain is a Markdown vault versioned in Git and read through Obsidian. This module reflects its current state.',
    },
    notifications: {
      title: 'Notifications',
      subtitle: 'System events, deployments and enquiries.',
      markAllRead: 'Mark all as read',
      empty: 'You are all caught up.',
      filters: { all: 'All', unread: 'Unread', system: 'System', content: 'Content' },
    },
    settings: {
      title: 'Settings',
      subtitle: 'Workspace, appearance and integrations.',
      sections: {
        profile: 'Profile',
        appearance: 'Appearance',
        localisation: 'Localisation',
        notifications: 'Notifications',
        integrations: 'Integrations',
        security: 'Security',
      },
      theme: 'Theme',
      themeLight: 'Light',
      themeDark: 'Dark',
      themeSystem: 'System',
      language: 'Interface language',
      emailNotifications: 'Email notifications',
      emailNotificationsHelp: 'Receive an email when a new enquiry arrives.',
      twoFactor: 'Two-factor authentication',
      twoFactorHelp: 'Require a second factor when signing in to the command center.',
      apiKeys: 'API keys',
      dangerZone: 'Danger zone',
    },
  },
}

/**
 * The shape every language must satisfy.
 *
 * Note the deliberate absence of `as const` on `en` above: we want leaf values
 * typed as `string`, not as string literals. With literals, a translation would
 * only compile if it were identical to the English — which is precisely wrong.
 */
export type Dictionary = typeof en
