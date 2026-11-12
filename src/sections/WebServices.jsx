import { motion, useReducedMotion } from 'framer-motion'
import { Gauge, LayoutTemplate, SearchCheck, Workflow } from 'lucide-react'
import { profile, webServices } from '../data/site'
import { ButtonLink, Reveal, SectionHeading } from '../components/UI'

const icons = [LayoutTemplate, Gauge, Workflow, SearchCheck]

export default function WebServices() {
  const reduce = useReducedMotion()
  return <section className="web-band section-shell" id="web">
    <div className="web-band-aurora" aria-hidden="true" />
    <div className="container web-band-layout">
      <Reveal className="web-band-copy">
        <span className="eyebrow">04 / BEYOND MOBILE</span>
        <h2>I build<br /><span>websites too.</span></h2>
        <p>Thoughtful web experiences, built to feel clear, quick and useful on every screen.</p>
        <ButtonLink href={`mailto:${profile.email}`}>Start a project</ButtonLink>
      </Reveal>
      <div className="web-service-grid">
        {webServices.map((service, index) => {
          const Icon = icons[index]
          return <motion.article className="web-service-card" key={service.title} whileHover={reduce ? undefined : { y: -5 }} transition={{ type: 'spring', stiffness: 280, damping: 22 }}>
            <span className="service-index">0{index + 1}</span>
            <span className="service-icon"><Icon size={19} /></span>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </motion.article>
        })}
      </div>
    </div>
  </section>
}
