import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { aboutParagraphs, metrics } from '../data/site'
import { SectionHeading } from '../components/UI'

gsap.registerPlugin(ScrollTrigger)

function WordReveal({ text }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const words = text.split(' ')
  useLayoutEffect(() => {
    if (reduce || !ref.current) return
    const words = ref.current.querySelectorAll('.word-reveal-word')
    const context = gsap.context(() => {
      gsap.fromTo(words,
        { opacity: .16, filter: 'blur(2px)' },
        { opacity: 1, filter: 'blur(0px)', stagger: .045, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top 84%', end: 'bottom 47%', scrub: .6 } }
      )
    }, ref)
    return () => context.revert()
  }, [reduce, text])
  return <p className="word-reveal" ref={ref} aria-label={text}>
    <span className="sr-only">{text}</span>
    <span className="word-reveal-visual" aria-hidden="true">{words.map((word, index) => <span className="word-reveal-word" key={`${word}-${index}`}>{word}{index < words.length - 1 ? ' ' : ''}</span>)}</span>
  </p>
}

function Counter({ metric }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: .55 })
  const reduce = useReducedMotion()
  const [whole, setWhole] = useState(reduce ? metric.value : 0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setWhole(metric.value)
      return
    }
    const controls = animate(0, metric.value, { duration: 1.05, ease: [.22, 1, .36, 1], onUpdate: setWhole })
    return () => controls.stop()
  }, [inView, metric.value, reduce])

  return <div className="metric-card" ref={ref}>
    <span className="metric-value">{metric.prefix || ''}{Math.round(whole)}{metric.suffix}</span>
    <span className="metric-label">{metric.label}</span>
  </div>
}

export default function About() {
  return <section className="section-shell section-pad about-section" id="about">
    <div className="container">
      <SectionHeading eyebrow="01 / ABOUT" title={<>Software with<br /><span>a human point of view.</span></>} />
      <div className="about-grid">
        <div className="about-copy">
          {aboutParagraphs.map(paragraph => <WordReveal text={paragraph} key={paragraph} />)}
        </div>
        <div className="metrics-grid">
          {metrics.map((metric, index) => <Counter metric={metric} key={metric.label} />)}
        </div>
      </div>
    </div>
  </section>
}
