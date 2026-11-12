import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Github, Linkedin, Mail, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { profile } from '../data/site'

export const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
}

export function Reveal({ children, className = '', delay = 0, as = 'div' }) {
  const Component = motion[as] || motion.div
  const reduce = useReducedMotion()
  const variants = reduce ? { hidden: { opacity: 1 }, visible: { opacity: 1 } } : fadeUp
  return <Component className={className} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={variants} transition={{ delay: reduce ? 0 : delay }}>{children}</Component>
}

export function SectionHeading({ eyebrow, title, copy }) {
  return <Reveal className="section-heading">
    <span className="eyebrow">{eyebrow}</span>
    <h2>{title}</h2>
    {copy && <p>{copy}</p>}
  </Reveal>
}

export function ButtonLink({ href, children, variant = 'primary', download, onClick, className = '', target, rel }) {
  function move(event) {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left - rect.width / 2) * 0.07
    const y = (event.clientY - rect.top - rect.height / 2) * 0.07
    event.currentTarget.style.setProperty('--mag-x', `${x}px`)
    event.currentTarget.style.setProperty('--mag-y', `${y}px`)
  }
  function reset(event) {
    event.currentTarget.style.setProperty('--mag-x', '0px')
    event.currentTarget.style.setProperty('--mag-y', '0px')
  }
  return <a className={`button button-${variant} ${className}`} href={href} download={download} target={target} rel={rel} onClick={onClick} onPointerMove={move} onPointerLeave={reset}>
    {children}<ArrowUpRight size={16} aria-hidden="true" />
  </a>
}

export function SocialLinks({ compact = false }) {
  const items = [
    { href: profile.github, label: 'GitHub', icon: Github },
    { href: profile.linkedin, label: 'LinkedIn', icon: Linkedin },
    { href: `mailto:${profile.email}`, label: 'Email', icon: Mail }
  ]
  return <div className={`social-links ${compact ? 'compact' : ''}`}>{items.map(({ href, label, icon: Icon }) =>
    <a key={label} href={href} aria-label={label} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"><Icon size={18} /></a>
  )}</div>
}

export function Modal({ open, onClose, children, label }) {
  const panelRef = useRef(null)
  const reduce = useReducedMotion()
  useEffect(() => {
    if (!open) return
    const previousFocus = document.activeElement
    document.body.classList.add('modal-open')
    const panel = panelRef.current
    const focusable = panel?.querySelectorAll('button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')
    const first = focusable?.[0]
    first?.focus()
    const onKeyDown = event => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab' || !focusable?.length) return
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.classList.remove('modal-open')
      if (previousFocus instanceof HTMLElement) previousFocus.focus()
    }
  }, [open, onClose])
  if (!open) return null
  return <div className="modal-backdrop" data-lenis-prevent onMouseDown={event => event.target === event.currentTarget && onClose()}>
    <motion.div ref={panelRef} className="modal-panel" role="dialog" aria-modal="true" aria-label={label} initial={reduce ? false : { opacity: 0, y: 20, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }}>
      <button className="icon-button modal-close" type="button" onClick={onClose} aria-label="Close dialog"><X /></button>
      {children}
    </motion.div>
  </div>
}

