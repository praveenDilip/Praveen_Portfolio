const shotPaths = (slug) => [1, 2, 3].map((number) => `/images/projects/${slug}/${number}.webp`)

export const projects = [
  {
    slug: 'cliqbuy',
    title: 'CliqBuy',
    category: 'E-commerce',
    type: 'Android',
    description: 'A considered shopping flow, from product discovery to checkout.',
    tech: ['Kotlin', 'Compose', 'Clean MVVM', 'REST', 'FCM', 'PayPal', 'Stripe'],
    highlights: ['Product listing, search and filters', 'Cart and checkout flows', 'Payments and push notifications'],
    cover: '/images/projects/cliqbuy/1.webp',
    screenshots: shotPaths('cliqbuy')
  },
  {
    slug: 'passup',
    title: 'PassUp',
    category: 'Marketplace',
    type: 'Android',
    description: 'A faster way to browse, find and trade marketplace listings.',
    tech: ['Java', 'Kotlin', 'GraphQL', 'Clean Architecture', 'Room', 'Retrofit'],
    highlights: ['Secure sign-in and listing flows', 'Category browsing and search', 'Around 40% faster data fetching'],
    cover: '/images/projects/passup/1.webp',
    screenshots: shotPaths('passup')
  },
  {
    slug: 'gofer-taxi',
    title: 'Gofer Taxi',
    category: 'Ride booking',
    type: 'Android',
    description: 'A real-time ride booking experience with live trip visibility.',
    tech: ['Kotlin', 'Google Maps SDK', 'Coroutines', 'StateFlow', 'Firebase'],
    highlights: ['Live driver and trip tracking', 'Driver assignment and fare estimates', 'Location refresh under five seconds'],
    cover: '/images/projects/gofer-taxi/1.webp',
    screenshots: shotPaths('gofer-taxi')
  },
  {
    slug: 'goferjekx',
    title: 'GoferjekX',
    category: 'On-demand multi-service',
    type: 'Android',
    description: 'One modular platform for customers, providers and restaurant stores.',
    tech: ['Kotlin', 'Clean Architecture', 'REST', 'Multi-Module'],
    highlights: ['Seven on-demand services', 'Customer and provider experiences', 'Dedicated restaurant store module'],
    cover: '/images/projects/goferjekx/1.webp',
    screenshots: shotPaths('goferjekx')
  },
  {
    slug: 'makentx',
    title: 'MakentX',
    category: 'Property rental',
    type: 'Android',
    description: 'A map-led property discovery and booking experience.',
    tech: ['Compose', 'Kotlin', 'Clean MVVM', 'Google Maps SDK'],
    highlights: ['Flexible property search filters', 'Radius-based discovery', 'A streamlined booking journey'],
    cover: '/images/projects/makentx/1.webp',
    screenshots: shotPaths('makentx')
  },
  {
    slug: 'gofer-handyman',
    title: 'Gofer Handyman',
    category: 'On-demand services',
    type: 'Android',
    description: 'Book a local service and stay connected from dispatch to completion.',
    tech: ['Kotlin', 'Google Maps SDK', 'Sinch SDK', 'REST'],
    highlights: ['Real-time job tracking', 'In-app voice calling', 'Customer and provider chat'],
    cover: '/images/projects/gofer-handyman/1.webp',
    screenshots: shotPaths('gofer-handyman')
  },
  {
    slug: 'tickclick',
    title: 'Tickclick',
    category: 'Productivity',
    type: 'Android',
    description: 'A focused Kotlin productivity app for notes, lists, budgets and reminders.',
    tech: ['Kotlin', 'Jetpack Compose', 'Material 3', 'Compose Animations'],
    highlights: ['Search, priorities and progress filters', 'Reminder calendar and budget tracking', 'Statistics dashboard and user-selectable themes'],
    cover: '/images/projects/tickclick/1.webp',
    screenshots: shotPaths('tickclick')
  },
  {
    slug: 'custom-website',
    title: 'Custom Website',
    category: 'Business website',
    type: 'Web',
    previewMode: 'desktop',
    description: 'A polished business website shaped around clear branding, useful content and a memorable first impression.',
    tech: ['[PLACEHOLDER: Confirm website stack]', 'Responsive Design'],
    highlights: ['Custom landing page', 'Clear content and service sections', 'Desktop-ready presentation'],
    cover: '/images/projects/custom-website/1.webp',
    screenshots: shotPaths('custom-website')
  },
  {
    slug: 'custom-website-mobile',
    title: 'Custom Website — Mobile',
    category: 'Responsive website',
    type: 'Web',
    previewMode: 'mobile',
    description: 'A responsive version of the custom website, tailored for comfortable reading and touch-friendly navigation.',
    tech: ['[PLACEHOLDER: Confirm website stack]', 'Mobile-first UI'],
    highlights: ['Responsive mobile layout', 'Touch-friendly navigation', 'Portrait screenshots shown in full'],
    cover: '/images/projects/custom-website-mobile/1.webp',
    screenshots: shotPaths('custom-website-mobile')
  }
]
