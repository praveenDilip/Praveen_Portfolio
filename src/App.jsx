import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import { navLinks } from './data/site'
import { useActiveSection } from './hooks/useActiveSection'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import About from './sections/About'
import Footer from './sections/Footer'
import Hero from './sections/Hero'
import NotFound from './sections/NotFound'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import WebServices from './sections/WebServices'

gsap.registerPlugin(ScrollTrigger)

function IntroLoader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const reduce = useReducedMotion()
  useEffect(() => {
    if (reduce) {
      setProgress(100)
      const timer = window.setTimeout(onComplete, 120)
      return () => window.clearTimeout(timer)
    }
    let value = 0
    let completion
    const timer = window.setInterval(() => {
      value = Math.min(value + 1, 100)
      setProgress(value)
      if (value === 100) {
        window.clearInterval(timer)
        completion = window.setTimeout(onComplete, 190)
      }
    }, 11)
    return () => {
      window.clearInterval(timer)
      window.clearTimeout(completion)
    }
  }, [onComplete, reduce])
  return <motion.div className="intro-loader" exit={{ opacity: 0 }} transition={{ duration: .28 }} aria-label="Loading portfolio" aria-busy="true">
    <motion.span
      className="loader-ambient loader-ambient--one"
      aria-hidden="true"
      animate={reduce ? undefined : { opacity: [.12, .26, .12], scale: [.85, 1.12, .85] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.span
      className="loader-ambient loader-ambient--two"
      aria-hidden="true"
      animate={reduce ? undefined : { opacity: [.08, .2, .08], scale: [1.1, .9, 1.1] }}
      transition={{ duration: 4.1, repeat: Infinity, ease: 'easeInOut' }}
    />
    <div className="loader-inner">
      <div className="loader-stage" aria-hidden="true">
        <motion.span
          className="loader-glow"
          animate={reduce ? undefined : { opacity: [.34, .72, .34], scale: [.82, 1.08, .82] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.span
          className="loader-ring loader-ring--outer"
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 5.2, repeat: Infinity, ease: 'linear' }}
        ><i /></motion.span>
        <motion.span
          className="loader-ring loader-ring--inner"
          animate={reduce ? undefined : { rotate: -360 }}
          transition={{ duration: 3.6, repeat: Infinity, ease: 'linear' }}
        ><i /></motion.span>
        <motion.span
          className="loader-mark"
          initial={reduce ? false : { opacity: 0, scale: .72, y: 28, filter: 'blur(12px)' }}
          animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
          transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 105, damping: 18, mass: .9, delay: .08 }}
        >PR</motion.span>
        <motion.span
          className="loader-energy-line"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={reduce ? { duration: 0 } : { duration: .9, ease: [.22, 1, .36, 1], delay: .24 }}
        />
      </div>
      <div className="loader-wordmark">
        <span className="loader-name">Praveen Rajkumar D</span>
        <span className="loader-subtitle">SOFTWARE DEVELOPER&nbsp; / &nbsp;ANDROID &amp; WEB</span>
      </div>
      <div className="loader-progress-block">
        <div className="loader-meta"><span>INITIALIZING EXPERIENCE</span><span>{String(progress).padStart(3, '0')}%</span></div>
        <div className="loader-track" role="progressbar" aria-label="Loading portfolio" aria-valuemin="0" aria-valuemax="100" aria-valuenow={progress}>
          <motion.span animate={{ scaleX: progress / 100 }} transition={{ type: 'spring', stiffness: 90, damping: 24 }} />
        </div>
      </div>
    </div>
  </motion.div>
}

function CurtainReveal() {
  const reduce = useReducedMotion()
  return <motion.div className="curtain-reveal" initial={{ opacity: 1 }} exit={{ opacity: 1 }} aria-hidden="true">
    <motion.span className="curtain-panel curtain-panel--left" animate={{ x: '-101%' }} transition={{ duration: reduce ? .01 : .85, ease: [.76, 0, .24, 1], delay: .08 }} />
    <motion.span className="curtain-panel curtain-panel--right" animate={{ x: '101%' }} transition={{ duration: reduce ? .01 : .85, ease: [.76, 0, .24, 1], delay: .08 }} />
  </motion.div>
}

function ScrollProgress() {
  const reduce = useReducedMotion()
  useLayoutEffect(() => {
    if (reduce) return
    const progress = document.querySelector('.scroll-progress-bar')
    if (!progress) return
    const context = gsap.context(() => {
      gsap.fromTo(progress, { scaleX: 0 }, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: .2 }
      })
    })
    return () => context.revert()
  }, [reduce])
  return <div className="scroll-progress" aria-hidden="true"><span className="scroll-progress-bar" /></div>
}

function CursorGlow() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const move = event => {
      document.documentElement.style.setProperty('--cursor-x', `${event.clientX}px`)
      document.documentElement.style.setProperty('--cursor-y', `${event.clientY}px`)
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [])
  return <span className="cursor-glow" aria-hidden="true" />
}

function Portfolio() {
  useSmoothScroll()
  const sectionIds = useMemo(() => navLinks.map(link => link.href.slice(1)), [])
  const active = useActiveSection(sectionIds)
  return <div className="portfolio">
    <div className="film-grain" aria-hidden="true" />
    <div className="global-aurora global-aurora--a" aria-hidden="true" />
    <div className="global-aurora global-aurora--b" aria-hidden="true" />
    <ScrollProgress />
    <CursorGlow />
    <Navbar active={active} />
    <main>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <WebServices />
    </main>
    <Footer />
  </div>
}

export default function App() {
  const [phase, setPhase] = useState('loading')
  const reduce = useReducedMotion()
  const isHome = window.location.pathname === '/' || window.location.pathname === '/index.html'
  const finishLoading = useCallback(() => setPhase('curtain'), [])

  useEffect(() => {
    if (phase !== 'curtain') return
    const timer = window.setTimeout(() => setPhase('ready'), reduce ? 30 : 960)
    return () => window.clearTimeout(timer)
  }, [phase, reduce])

  if (!isHome) return <NotFound />
  return <>
    <Portfolio />
    <AnimatePresence>{phase === 'loading' && <IntroLoader key="loader" onComplete={finishLoading} />}</AnimatePresence>
    <AnimatePresence>{phase === 'curtain' && <CurtainReveal key="curtain" />}</AnimatePresence>
  </>
}
