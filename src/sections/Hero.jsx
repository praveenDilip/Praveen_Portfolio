import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowDown, Code2, Layers2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { EXPERIENCE_YEARS } from '../data/config'
import { profile, roleCycle } from '../data/site'
import { projects } from '../data/projects'
import ScreenshotFrame from '../components/ScreenshotFrame'
import { ButtonLink, SocialLinks } from '../components/UI'

const lineReveal = {
  hidden: { y: '110%', opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 90, damping: 20 } }
}

function RotatingRole() {
  const [index, setIndex] = useState(0)
  const reduce = useReducedMotion()
  useEffect(() => {
    if (reduce) return
    const timer = window.setInterval(() => setIndex(value => (value + 1) % roleCycle.length), 2600)
    return () => window.clearInterval(timer)
  }, [reduce])
  return <span className="role-window" aria-live="polite">
    <AnimatePresence mode="sync" initial={false}>
      <motion.span
        className="role-word"
        key={reduce ? roleCycle[0] : roleCycle[index]}
        initial={reduce ? false : { opacity: 0, y: 14, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={reduce ? undefined : { opacity: 0, y: -12, filter: 'blur(6px)' }}
        transition={{ duration: .38, ease: [.22, 1, .36, 1] }}
      >{reduce ? roleCycle[0] : roleCycle[index]}</motion.span>
    </AnimatePresence>
  </span>
}

function HeroPhone() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '100px' })
  const [shot, setShot] = useState(0)
  const reduce = useReducedMotion()
  const project = projects[0]
  useEffect(() => {
    if (reduce || !isInView) return
    const timer = window.setInterval(() => setShot(index => (index + 1) % project.screenshots.length), 4600)
    return () => window.clearInterval(timer)
  }, [isInView, project.screenshots.length, reduce])

  return <div className="hero-visual" ref={ref} aria-label="Featured app preview">
    <div className="hero-aurora" aria-hidden="true" />
    <motion.div className="hero-orb hero-orb--one" aria-hidden="true" animate={reduce ? undefined : { x: [0, 18, -8, 0], y: [0, -14, 8, 0] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }} />
    <motion.div className="hero-orb hero-orb--two" aria-hidden="true" animate={reduce ? undefined : { x: [0, -15, 10, 0], y: [0, 10, -12, 0] }} transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }} />
    <motion.div className="hero-phone-wrap" initial={reduce ? false : { opacity: 0, y: 38, rotateY: -10 }} animate={{ opacity: 1, y: 0, rotateY: 0 }} transition={{ type: 'spring', stiffness: 70, damping: 18, delay: .4 }}>
      <AnimatePresence mode="wait">
        <motion.div key={shot} className="hero-phone-shot" initial={reduce ? false : { opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} exit={reduce ? undefined : { opacity: 0, scale: .99 }} transition={{ duration: .45 }}>
          <ScreenshotFrame src={project.screenshots[shot]} title={project.title} variant="hero" loading="eager" />
        </motion.div>
      </AnimatePresence>
      <span className="hero-phone-caption"><i /> {project.title} / PREVIEW 0{shot + 1}</span>
    </motion.div>
    <motion.div className="tech-float tech-float--kotlin" animate={reduce ? undefined : { y: [0, -9, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}><span className="tech-glyph kotlin-glyph">K</span>Kotlin</motion.div>
    <motion.div className="tech-float tech-float--compose" animate={reduce ? undefined : { y: [0, 8, 0] }} transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}><Layers2 size={16} />Compose</motion.div>
    <motion.div className="tech-float tech-float--firebase" animate={reduce ? undefined : { y: [0, -7, 0] }} transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}><span className="firebase-glyph">✦</span>Firebase</motion.div>
    <motion.div className="tech-float tech-float--react" animate={reduce ? undefined : { y: [0, 6, 0] }} transition={{ duration: 5.6, repeat: Infinity, ease: 'easeInOut' }}><Code2 size={16} />React</motion.div>
  </div>
}

export default function Hero() {
  const reduce = useReducedMotion()
  return <section className="hero-section section-shell" id="home">
    <div className="container hero-layout">
      <div className="hero-copy">
        <motion.div className="availability-pill" initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .15 }}>
          <span className="availability-pulse" /> AVAILABLE FOR OPPORTUNITIES
        </motion.div>
        <h1 className="hero-name" aria-label={profile.name}>
          <span className="line-mask"><motion.span variants={lineReveal} initial={reduce ? false : 'hidden'} animate="visible" transition={{ delay: reduce ? 0 : .2 }}>Praveen</motion.span></span>
          <span className="line-mask hero-name-last"><motion.span variants={lineReveal} initial={reduce ? false : 'hidden'} animate="visible" transition={{ delay: reduce ? 0 : .34 }}>Rajkumar D<span className="name-period">.</span></motion.span></span>
        </h1>
        <div className="hero-role-row" role="group" aria-label={profile.title}><span className="role-arrow">↳</span><RotatingRole /></div>
        <motion.p className="hero-intro" initial={reduce ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .5, duration: .7 }}>{profile.tagline}</motion.p>
        <motion.div className="hero-actions" initial={reduce ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .62, duration: .65 }}>
          <ButtonLink href="#projects">View projects</ButtonLink>
          <ButtonLink href={`mailto:${profile.email}`} variant="secondary">Contact me</ButtonLink>
        </motion.div>
        <motion.div className="hero-footer" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .82 }}>
          <SocialLinks />
          <span className="hero-experience"><b>{String(EXPERIENCE_YEARS).padStart(2, '0')}</b> YEARS BUILDING SOFTWARE</span>
        </motion.div>
      </div>
      <HeroPhone />
    </div>
    <a className="scroll-indicator" href="#about"><span>SCROLL TO EXPLORE</span><ArrowDown size={14} /></a>
  </section>
}
