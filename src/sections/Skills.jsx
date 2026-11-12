import { motion, useReducedMotion } from 'framer-motion'
import { skillGroups, marqueeRows } from '../data/site'
import { Reveal, SectionHeading } from '../components/UI'

function SkillCard({ group, index }) {
  const reduce = useReducedMotion()
  function setSpotlight(event) {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--spot-x', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--spot-y', `${event.clientY - rect.top}px`)
  }
  return <motion.article
    className={`skill-bento-card skill-bento-card--${index + 1}`}
    onPointerMove={setSpotlight}
    whileHover={reduce ? undefined : { y: -4 }}
    transition={{ type: 'spring', stiffness: 280, damping: 22 }}
  >
    <div className="skill-bento-heading"><span className="skill-count">0{index + 1}</span><h3>{group.title}</h3></div>
    <div className="skill-chips">{group.items.map(skill => <span className="skill-chip" key={skill}>{skill}</span>)}</div>
    <span className="skill-card-glow" aria-hidden="true" />
  </motion.article>
}

function MarqueeRow({ items, reverse = false }) {
  const contents = [...items, ...items]
  return <div className={`marquee-row ${reverse ? 'reverse' : ''}`} aria-hidden="true">
    <div className="marquee-track">{contents.map((item, index) => <span key={`${item}-${index}`}><i />{item}</span>)}</div>
  </div>
}

export default function Skills() {
  return <section className="section-shell section-pad skills-section" id="skills">
    <div className="container">
      <SectionHeading eyebrow="02 / TOOLKIT" title={<>Built on curiosity.<br /><span>Grounded in craft.</span></>} copy="A practical toolkit for reliable mobile products and modern web experiences." />
      <div className="skills-bento">{skillGroups.map((group, index) => <Reveal key={group.title} className="skill-reveal" delay={(index % 4) * .045}><SkillCard group={group} index={index} /></Reveal>)}</div>
    </div>
    <div className="tech-marquee" aria-label="Technology highlights">
      <MarqueeRow items={marqueeRows[0]} />
      <MarqueeRow items={marqueeRows[1]} reverse />
    </div>
  </section>
}
