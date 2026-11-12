import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, Maximize2 } from 'lucide-react'
import { projects } from '../data/projects'
import ProjectFrame from '../components/ProjectFrame'
import { Modal, SectionHeading } from '../components/UI'

const filters = ['All', 'Android', 'Web']

function ProjectCard({ project, index, onOpen }) {
  const [shot, setShot] = useState(0)
  const next = direction => setShot(value => (value + direction + project.screenshots.length) % project.screenshots.length)
  return <article className="project-card">
    <div className="project-card-visual">
      <button className="project-image-button" type="button" onClick={() => onOpen(project)} aria-label={`Open ${project.title} screenshots`}>
        <ProjectFrame project={project} src={project.screenshots[shot]} alt={`${project.title} ${project.category} screen ${shot + 1}`} variant="project" />
        <span className="project-image-overlay"><Maximize2 size={15} /> OPEN PREVIEW</span>
      </button>
      {project.screenshots.length > 1 && <div className="project-shot-controls">
        <button className="icon-button" type="button" onClick={() => next(-1)} aria-label={`Previous ${project.title} screenshot`}><ArrowLeft size={16} /></button>
        <span className="mono">0{shot + 1} / 0{project.screenshots.length}</span>
        <button className="icon-button" type="button" onClick={() => next(1)} aria-label={`Next ${project.title} screenshot`}><ArrowRight size={16} /></button>
      </div>}
    </div>
    <div className="project-card-content">
      <div className="project-overline"><span>{project.category}</span><span>{project.type} / 0{index + 1}</span></div>
      <h3>{project.title}</h3>
      <p className="project-description">{project.description}</p>
      <div className="project-highlights">{project.highlights.map(item => <span key={item}><Check size={14} />{item}</span>)}</div>
      <div className="project-tech">{project.tech.map(tech => <span key={tech}>{tech}</span>)}</div>
    </div>
  </article>
}

function ProjectModal({ project, onClose }) {
  const [shot, setShot] = useState(0)
  const touchStart = useRef(null)
  const reduce = useReducedMotion()
  useEffect(() => {
    if (!project) return
    const browse = event => {
      if (event.key === 'ArrowRight') setShot(value => (value + 1) % project.screenshots.length)
      if (event.key === 'ArrowLeft') setShot(value => (value + project.screenshots.length - 1) % project.screenshots.length)
    }
    document.addEventListener('keydown', browse)
    return () => document.removeEventListener('keydown', browse)
  }, [project])
  if (!project) return null
  const change = direction => setShot(value => (value + direction + project.screenshots.length) % project.screenshots.length)
  const touchEnd = event => {
    if (touchStart.current === null) return
    const distance = event.changedTouches[0].clientX - touchStart.current
    if (Math.abs(distance) > 42) change(distance < 0 ? 1 : -1)
    touchStart.current = null
  }
  return <Modal open onClose={onClose} label={`${project.title} project preview`}>
    <div className="project-modal">
      <div className="modal-project-heading"><span className="eyebrow">{project.type} / {project.category}</span><h2>{project.title}</h2><p>{project.description}</p></div>
      <div className="modal-phone-carousel" onTouchStart={event => { touchStart.current = event.touches[0].clientX }} onTouchEnd={touchEnd} data-lenis-prevent tabIndex={0} aria-label="Swipe or use arrow keys to browse project screenshots">
        <button className="carousel-arrow" type="button" aria-label="Previous screenshot" onClick={() => change(-1)}><ArrowLeft /></button>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div className="modal-phone-slide" key={project.screenshots[shot]} initial={reduce ? false : { opacity: 0, scale: .97, filter: 'blur(6px)' }} animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} exit={reduce ? undefined : { opacity: 0, scale: 1.02, filter: 'blur(4px)' }} transition={reduce ? { duration: 0 } : { duration: .34, ease: [.22, 1, .36, 1] }}>
            <ProjectFrame project={project} src={project.screenshots[shot]} alt={`${project.title} screenshot ${shot + 1}`} variant="modal" />
          </motion.div>
        </AnimatePresence>
        <button className="carousel-arrow" type="button" aria-label="Next screenshot" onClick={() => change(1)}><ArrowRight /></button>
      </div>
      <div className="modal-slide-indicator" aria-live="polite">SCREEN 0{shot + 1} <span>/</span> 0{project.screenshots.length}</div>
      <div className="modal-project-meta"><h3>Highlights</h3><ul>{project.highlights.map(item => <li key={item}><Check size={15} />{item}</li>)}</ul><div className="project-tech">{project.tech.map(tech => <span key={tech}>{tech}</span>)}</div></div>
    </div>
  </Modal>
}

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const [activeProject, setActiveProject] = useState(null)
  const shown = projects.filter(project => filter === 'All' || project.type === filter)

  return <section className="section-shell section-pad projects-section" id="projects">
    <div className="container">
      <div className="projects-heading">
        <SectionHeading eyebrow="03 / SELECTED WORK" title={<>Useful things,<br /><span>thoughtfully made.</span></>} copy="A few products shaped around real needs, clear interfaces and reliable engineering." />
        <div className="project-filters" role="group" aria-label="Filter projects">
          {filters.map(item => <button key={item} type="button" onClick={() => setFilter(item)} aria-pressed={filter === item} className={filter === item ? 'is-selected' : ''}>{item}<span>{item === 'All' ? projects.length : projects.filter(project => project.type === item).length}</span></button>)}
        </div>
      </div>
      <div className="project-scene">
        {shown.map((project, index) => <div className="project-card-wrap" key={project.slug}>
          <ProjectCard project={project} index={index} onOpen={setActiveProject} />
        </div>)}
      </div>
    </div>
    <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
  </section>
}
