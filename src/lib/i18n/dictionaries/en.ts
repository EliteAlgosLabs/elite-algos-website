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
    tagline: 'We build AI and software that helps your business work better.',
    taglineShort: 'Clear. Reliable. Built to last.',
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
      title: 'Elite Algos Labs — AI and software for your business',
      description:
        'We build AI and software that businesses, governments and institutions use every day. From smart automation to custom software, we help you save time, cut manual work and make better decisions.',
    },
    solutions: {
      title: 'Solutions',
      description:
        'AI tools that solve real business problems: AI assistants, document processing, workflow automation, private AI you control, and clear answers from your own data.',
    },
    services: {
      title: 'Services',
      description:
        'AI advice, custom software, adding AI to systems you already use, and cloud setup. You work directly with senior engineers — no junior hand-offs.',
    },
    portfolio: {
      title: 'Portfolio',
      description:
        'Selected work from Elite Algos Labs, with the real results our clients measured across document processing, AI assistants and automation.',
    },
    about: {
      title: 'About',
      description:
        'Elite Algos Labs is an AI and software company that businesses, governments and institutions rely on. Here is what we believe and how we work.',
    },
    contact: {
      title: 'Contact',
      description:
        'Talk to the engineers who will build your system. Tell us what you want to achieve and we will tell you honestly whether we can help.',
    },
    careers: {
      title: 'Careers',
      description:
        'We are building a small team of talented engineers, designers and researchers. Roles open soon — tell us you are interested.',
    },
    insights: {
      title: 'Insights',
      description:
        'Practical notes and lessons from the Elite Algos Labs team, written by the people doing the work.',
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
      eyebrow: 'AI and software engineering',
      titleLine1: 'AI and software',
      titleLine2: 'for your business.',
      lead: 'Elite Algos Labs builds AI and software that businesses use every day — AI assistants, document processing and automation that saves time, cuts manual work and helps your team move faster.',
      primaryCta: 'Start a conversation',
      secondaryCta: 'See our work',
      scrollHint: 'Scroll',
    },

    mission: {
      eyebrow: 'What we believe',
      title: 'We build AI that actually works in the real world.',
      body: 'A lot of AI looks great in a demo, then fails once it meets real work. We build the kind that lasts. Every system we deliver is made to be trusted from day one: you can see what it is doing, undo it if needed, and rely on it for real business.',
      pillars: {
        precision: {
          title: 'Precision',
          body: 'We agree what success looks like before we build, then measure it after. We tell you what the numbers really say.',
        },
        trust: {
          title: 'Trust',
          body: 'You can see how every decision was made, you control where your data goes, and you can run everything on your own systems if you want.',
        },
        longevity: {
          title: 'Built to last',
          body: 'We write software your own team can keep running long after we finish. Clear, well documented and easy to maintain.',
        },
      },
    },

    services: {
      eyebrow: 'What we do',
      title: 'Everything you need, from idea to working system.',
      lead: 'From the AI behind the scenes to the screens your team uses every morning.',
      cta: 'All services',
    },

    why: {
      eyebrow: 'Why Elite Algos Labs',
      title: 'Senior engineers. Real results. No hand-offs.',
      lead: 'The people who plan your project are the same people who build it.',
      points: {
        seniority: {
          title: 'The people who plan it, build it',
          body: 'The engineers you meet in the first conversation are the ones who write the code — and the ones you can still call a year later.',
        },
        ownership: {
          title: 'You own everything',
          body: 'The code, the setup and the documentation are all yours. No lock-in, no hidden parts, no holding your data hostage.',
        },
        measurement: {
          title: 'Results, not busywork',
          body: 'We agree on how we measure success before we start, track it, and report it honestly — even when the news is not great.',
        },
        sovereignty: {
          title: 'Your data stays yours',
          body: 'We can run everything on your own servers when you need it. Some data should never leave your building, and that is fine.',
        },
      },
    },

    philosophy: {
      eyebrow: 'How we work',
      title: 'We build for years, not quarters.',
      lead: 'Five rules behind every decision we make.',
      principles: {
        one: {
          index: '01',
          title: 'Get it right before getting clever',
          body: 'Simple and correct beats clever and fragile. We build so the next person can understand and maintain it years from now.',
        },
        two: {
          index: '02',
          title: 'The system should explain itself',
          body: 'You should always be able to see why the system made a decision. If we cannot explain a result, we do not put it into important work.',
        },
        three: {
          index: '03',
          title: 'Plan for things going wrong',
          body: 'Tools fail, connections drop, data changes. We plan for the bad day on purpose, so it does not surprise you later.',
        },
        four: {
          index: '04',
          title: 'Documentation is part of the job',
          body: 'We write down how things work and why we made each choice, as we go. That knowledge stays with you.',
        },
        five: {
          index: '05',
          title: 'Measure before you automate',
          body: 'We measure how the manual work is done today before we replace it. Automating without measuring first is just guessing.',
        },
      },
    },

    solutions: {
      eyebrow: 'What we can build',
      title: 'Real systems, not just demos.',
      lead: 'Solutions we have built before and can set up for your organisation.',
      cta: 'All solutions',
    },

    portfolio: {
      eyebrow: 'Our work',
      title: 'Real results.',
      lead: 'A sample of what we have delivered, with the numbers that mattered to the client.',
      cta: 'View portfolio',
    },

    cta: {
      eyebrow: 'Start here',
      title: 'Tell us what you want to achieve.',
      body: 'This is not a sales call. It is a straight conversation with the engineers who would build your system — and an honest answer about whether we are the right team for the job.',
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
      title: 'What we can build for you.',
      lead: 'Each of these is something we have already built and run. They are starting points that we shape around your needs — not fixed products sold off a shelf.',
    },
    capabilitiesLabel: 'What it does',
    outcomesLabel: 'What you get',
    stackLabel: 'Built with',
    cta: {
      title: 'Which one is closest to your problem?',
      body: 'Most projects start as one of these and then get shaped to fit exactly what you need. Tell us about yours.',
      action: 'Start a conversation',
    },
  },

  // ==========================================================================
  // SERVICES
  // ==========================================================================
  services: {
    hero: {
      eyebrow: 'Services',
      title: 'How we work with you.',
      lead: 'Four ways to work together, from a short two-week review to building and running a full system for you. Every one led by senior engineers.',
    },
    includesLabel: 'What it includes',
    deliverableLabel: 'What you get',
    timelineLabel: 'Typical time',
    process: {
      eyebrow: 'Our process',
      title: 'How a project actually runs.',
      lead: 'Simple and steady. This is why our systems are still working a year later.',
      steps: {
        one: {
          index: '01',
          title: 'Understand',
          body: 'We learn how the work is done today, talk to the people who do it, and measure the starting point. We do not design anything until we understand the problem.',
        },
        two: {
          index: '02',
          title: 'Plan',
          body: 'We write a clear plan: how it will work, where your data goes, what success looks like, what could go wrong, and what we are not building.',
        },
        three: {
          index: '03',
          title: 'Build',
          body: 'We build in short steps and put working software in your hands early. We write the documentation as we go, not at the end.',
        },
        four: {
          index: '04',
          title: 'Launch',
          body: 'We set it up on your systems, with monitoring and a safe way to roll back, all in place before real users arrive.',
        },
        five: {
          index: '05',
          title: 'Support',
          body: 'We check the results against the starting point, fix what drifts, and hand over a system your team can truly own.',
        },
      },
    },
    cta: {
      title: 'Not sure which one you need?',
      body: 'Tell us the problem and we will tell you which option fits — or if you do not need us yet.',
      action: 'Talk to an engineer',
    },
  },

  // ==========================================================================
  // PORTFOLIO
  // ==========================================================================
  portfolio: {
    hero: {
      eyebrow: 'Portfolio',
      title: 'Our work, and what it changed.',
      lead: 'Selected projects with the results our clients actually measured. When a client asks us to stay private, we name the industry but not the company.',
    },
    filterAll: 'All work',
    filterLabel: 'Filter by type',
    resultsLabel: 'Results',
    challengeLabel: 'The problem',
    approachLabel: 'What we did',
    outcomeLabel: 'The result',
    stackLabel: 'Built with',
    sectorLabel: 'Industry',
    yearLabel: 'Year',
    durationLabel: 'Duration',
    beforeLabel: 'Before',
    afterLabel: 'After',
    confidential: 'Client kept private',
    empty: 'No work matches this filter yet.',
    nextCase: 'Next project',
    cta: {
      title: 'Your project could be the next one here.',
      body: 'Tell us what you want to change and what success would look like in numbers.',
      action: 'Start a conversation',
    },
  },

  // ==========================================================================
  // ABOUT
  // ==========================================================================
  about: {
    hero: {
      eyebrow: 'About',
      title: 'A software and AI company you can rely on.',
      lead: 'Elite Algos Labs LTD builds AI and software for organisations that need it to work — not just to look good. We are engineers, and we stand behind what we deliver.',
    },
    story: {
      eyebrow: 'Who we are',
      title: 'We started with one simple frustration.',
      body1:
        'AI often looks amazing in a demo, but then struggles to work reliably inside a real business. Fixing that is an engineering job: keeping data safe, handling errors, letting people check the results, controlling costs, and building something your team can actually maintain.',
      body2:
        'We started Elite Algos Labs to do that work properly. We take on a small number of clients and build systems they can depend on. We are registered in Rwanda and we work with clients around the world.',
    },
    principles: {
      eyebrow: 'Our standards',
      title: 'What we hold ourselves to.',
      lead: 'These are not slogans. They are the standards we check our own work against.',
    },
    numbers: {
      eyebrow: 'At a glance',
      title: 'The company in numbers.',
      incorporation: 'Incorporation no.',
      founded: 'Founded',
      foundedValue: '2025',
      jurisdiction: 'Registered',
      jurisdictionValue: 'Rwanda',
      reach: 'Client reach',
      reachValue: 'Global',
      languages: 'Operating languages',
      languagesValue: 'English · Français',
    },
    team: {
      eyebrow: 'Team',
      title: 'The people behind the work.',
      lead: 'Small on purpose. On every project you work with people whose names you will know.',
    },
    cta: {
      title: 'Work with us.',
      body: 'We take on only a few projects at a time. If what you are building matters, tell us about it.',
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
      lead: 'This is not a form that lands in a sales queue. Tell us the problem and someone who could actually build the solution will reply.',
    },
    channels: {
      title: 'Email us directly',
      business: {
        label: 'New projects',
        description: 'Quotes, proposals and questions about your project.',
      },
      general: {
        label: 'General enquiries',
        description: 'Everything else — partnerships, press and suppliers.',
      },
      founder: {
        label: "Founder's office",
        description: 'Private or executive matters.',
      },
    },
    response: {
      title: 'What happens next',
      steps: {
        one: 'We read every message ourselves. Nothing is sorted by a robot.',
        two: 'A real person replies within two working days.',
        three: 'If we are a good fit, we set up a call. If we are not, we tell you and point you somewhere better.',
      },
    },
    form: {
      title: 'Send us a message',
      lead: 'The more detail you give us, the more useful our reply will be.',
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
        consulting: 'AI advice or a review',
        partnership: 'Partnership',
        careers: 'Careers',
        other: 'Something else',
      },
      budget: 'Rough budget',
      budgetOptional: 'optional',
      budgetOptions: {
        undecided: 'Not sure yet',
        under25: 'Under $25,000',
        from25: '$25,000 – $100,000',
        from100: '$100,000 – $500,000',
        over500: 'Over $500,000',
      },
      message: 'Your message',
      messagePlaceholder:
        'What do you want to achieve? How is it done today, and what would success look like in numbers?',
      consent:
        'I agree that Elite Algos Labs may keep this message in order to reply to me.',
      submit: 'Send message',
      submitting: 'Sending…',
      successTitle: 'Message received.',
      successBody:
        'Thank you — we have your message and will reply within two working days.',
      successAgain: 'Send another message',
      errorTitle: 'That did not send.',
      errorBody:
        'Something went wrong on our side. Please try again, or email us directly at hello@elitealgoslabs.com.',
    },
  },

  // ==========================================================================
  // CAREERS
  // ==========================================================================
  careers: {
    hero: {
      eyebrow: 'Careers',
      title: 'We are building the team.',
      lead: 'Elite Algos Labs is putting together a small group of talented engineers, designers and researchers. We are defining the first roles now.',
      badge: 'Opening soon',
    },
    what: {
      eyebrow: 'What we look for',
      title: 'A certain kind of engineer.',
      lead: 'Jobs will be posted here first. Until then, this is the bar we hire to.',
      traits: {
        depth: {
          title: 'Real depth',
          body: 'People who have gone deep on something and can explain why the hard parts were hard.',
        },
        ownership: {
          title: 'Takes ownership',
          body: 'Engineers who see a problem — a broken feature, a missing test, unclear docs — and fix it without being asked.',
        },
        clarity: {
          title: 'Writes clearly',
          body: 'We work across time zones and write things down. Clear writing matters here as much as clean code.',
        },
        judgement: {
          title: 'Good judgement',
          body: 'Knowing what not to build is worth more than being able to build anything.',
        },
      },
    },
    register: {
      eyebrow: 'Register interest',
      title: 'Hear about roles first.',
      body: 'Send us something you have built and we will reach out when a role fits. Share something you are proud of — code, a paper, a system or a product.',
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
      lead: 'Practical lessons and honest trade-offs from our projects — written by the people doing the building, for people facing the same choices.',
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
    empty: 'No articles yet. The first ones are being written.',
    tocTitle: 'On this page',
  },

  // ==========================================================================
  // FOOTER
  // ==========================================================================
  footer: {
    blurb:
      'Elite Algos Labs LTD builds AI and software for organisations that rely on it. Clear, reliable and built to last.',
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
    required: 'Please fill in this field.',
    nameTooShort: 'Please enter your full name.',
    emailInvalid: 'Please enter a valid email address.',
    messageTooShort: 'Please tell us a bit more — at least 20 characters.',
    messageTooLong: 'That is longer than the form allows. Please email us directly.',
    consentRequired: 'We need your agreement so we can keep and reply to your message.',
    rateLimited: 'Too many messages from this address. Please try again soon.',
    serverError: 'We could not send that. Please try again.',
  },

  // ==========================================================================
  // ERROR PAGES
  // ==========================================================================
  notFound: {
    code: '404',
    title: 'This page does not exist.',
    body: 'The address may be misspelt, or the page may have moved. Everything else is still where you left it.',
    action: 'Return home',
    secondary: 'Contact us',
  },
  error: {
    code: 'Error',
    title: 'Something went wrong.',
    body: 'An unexpected error stopped this page from loading. We have logged it. You can try again, or go back home.',
    retry: 'Try again',
    action: 'Return home',
  },

  errorPage: {
    title: 'Something went wrong on our side.',
    body: 'An unexpected error happened. We have logged it and we are looking into it.',
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
      currentTask: 'Current task',
      neverSeen: 'Never reported',
      idle: 'Idle',
      justNow: 'just now',
      minutesAgo: 'min ago',
      hoursAgo: 'h ago',
      daysAgo: 'd ago',
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
        email: 'Email & SMTP',
      },
      email: {
        title: 'Email delivery',
        statusConfigured: 'Configured',
        statusNotConfigured: 'Not configured',
        statusConnected: 'Connected',
        statusError: 'Connection error',
        host: 'SMTP host',
        port: 'Port',
        inbox: 'Enquiries delivered to',
        connectedHelp: 'The mail server accepted our credentials. Contact-form enquiries are delivered by email and visitors receive an acknowledgement.',
        errorHelp: 'SMTP is configured but the server rejected the connection. Enquiries are still stored in the inbox; check the credentials and host.',
        notConfiguredHelp: 'No SMTP credentials are set. The contact form still validates and stores every enquiry in the inbox, but no email is sent. Set SMTP_* in the environment to enable delivery.',
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
