import { EXPERIENCE_YEARS } from './config'

export const profile = {
  name: 'Praveen Rajkumar D',
  title: 'Software Developer | Android & Web',
  tagline: 'I build fast, scalable Android apps and the websites that go with them.',
  email: 'dilippraveen51@gmail.com',
  phone: '+91 8807188631',
  linkedin: 'https://linkedin.com/in/praveenrajkumar1008',
  github: 'https://github.com/praveenDilip'
}

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Web', href: '#web' }
]

export const roleCycle = [
  'Software Developer',
  'Android Developer',
  'Kotlin & Jetpack Compose',
  'Web Developer'
]

export const aboutParagraphs = [
  `I’ve spent ${EXPERIENCE_YEARS} years as a Software Developer, building dependable Android apps from first idea through release.`,
  'Across seven shipped apps, I’ve worked on commerce, marketplaces, ride booking, property discovery and on-demand services—bringing care to architecture, speed and the details people feel.',
  'I also design and build responsive websites, carrying the same mobile-first thinking and clean engineering into the browser.'
]

export const metrics = [
  { value: EXPERIENCE_YEARS, suffix: '', label: 'Years as a developer' },
  { value: 7, suffix: '+', label: 'Apps shipped' },
  { value: 40, prefix: '~', suffix: '%', label: 'API optimization' },
  { value: 100, suffix: '%', label: 'Responsive by design' }
]

export const skillGroups = [
  { title: 'Languages', items: ['Kotlin', 'Java'] },
  { title: 'Android & Jetpack', items: ['Android SDK', 'Jetpack Compose', 'XML', 'Navigation', 'WorkManager', 'CameraX', 'Paging 3', 'Room'] },
  { title: 'Architecture', items: ['MVVM', 'Clean Architecture', 'Repository Pattern', 'SOLID', 'Use Cases'] },
  { title: 'State', items: ['Coroutines', 'StateFlow', 'SharedFlow', 'LiveData', 'ViewModel'] },
  { title: 'Networking', items: ['Retrofit', 'OkHttp', 'REST', 'GraphQL', 'JSON', 'Gson / Moshi', 'Interceptors'] },
  { title: 'Firebase', items: ['FCM', 'Crashlytics', 'Realtime Database', 'Analytics'] },
  { title: 'Integrations', items: ['Google Maps SDK', 'Sinch SDK', 'PayPal', 'Stripe', 'Razorpay'] },
  { title: 'Dependency Injection', items: ['Hilt', 'Dagger'] },
  { title: 'Tools', items: ['Android Studio', 'Gradle', 'Git', 'GitHub', 'Jira', 'Android Profiler', 'Google Play Console', 'Claude AI'] },
  { title: 'Web', items: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Tailwind CSS', 'Responsive Design'] }
]

export const marqueeRows = [
  ['Kotlin', 'Jetpack Compose', 'Android', 'Coroutines', 'Firebase', 'Room', 'Retrofit', 'Clean Architecture'],
  ['React', 'JavaScript', 'Tailwind CSS', 'REST', 'GraphQL', 'Google Maps SDK', 'Git', 'Responsive Design']
]

export const webServices = [
  { title: 'Responsive Design', description: 'Useful, considered layouts from the smallest screen to the largest.' },
  { title: 'Blazing Performance', description: 'Fast-loading experiences with smooth, efficient interactions.' },
  { title: 'Clean Code', description: 'Accessible, maintainable frontends built to grow with your product.' },
  { title: 'SEO-Friendly', description: 'Semantic markup and metadata that make your site easier to discover.' }
]
