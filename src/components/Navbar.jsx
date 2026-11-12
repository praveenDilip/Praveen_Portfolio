import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { navLinks, profile } from '../data/site'
import { ButtonLink } from './UI'

export default function Navbar({ active }) {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    let previousY = window.scrollY
    const update = () => {
      const currentY = window.scrollY
      setScrolled(currentY > 24)
      if (open || currentY < 48 || currentY < previousY - 5) setVisible(true)
      else if (currentY > previousY + 8) setVisible(false)
      previousY = currentY
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [open])

  useEffect(() => {
    const escape = event => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', escape)
    document.body.classList.toggle('menu-open', open)
    return () => {
      window.removeEventListener('keydown', escape)
      document.body.classList.remove('menu-open')
    }
  }, [open])

  const close = () => setOpen(false)
  return <>
    <motion.header
      className={`floating-nav ${scrolled ? 'is-scrolled' : ''}`}
      initial={false}
      animate={{ y: visible || open ? 0 : -120, opacity: visible || open ? 1 : 0 }}
      transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 260, damping: 28 }}
    >
      <a className="brand" href="#home" aria-label="Praveen Rajkumar D, home" onClick={close}><span>PR</span></a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {navLinks.map(link => <a
          href={link.href}
          key={link.href}
          className={active === link.href.slice(1) ? 'active' : ''}
          aria-current={active === link.href.slice(1) ? 'location' : undefined}
        >
          {active === link.href.slice(1) && <motion.span className="nav-active-pill" layoutId="nav-active-pill" transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 32 }} />}
          <span>{link.label}</span>
        </a>)}
      </nav>
      <ButtonLink className="nav-talk" href={`mailto:${profile.email}`}>Let’s talk</ButtonLink>
      <button className="menu-toggle icon-button" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(value => !value)}>
        {open ? <X /> : <Menu />}
      </button>
    </motion.header>
    <AnimatePresence>
      {open && <motion.div
        id="mobile-menu"
        className="mobile-menu"
        data-lenis-prevent
        initial={reduce ? false : { opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
        animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
        exit={reduce ? undefined : { opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
        transition={{ duration: .42, ease: [.22, 1, .36, 1] }}
        aria-label="Mobile navigation"
      >
        <div className="mobile-menu-head"><span className="eyebrow">MENU / PR</span><button className="icon-button" onClick={close} aria-label="Close menu"><X /></button></div>
        <nav aria-label="Mobile navigation">
          {navLinks.map((link, index) => <motion.a
            href={link.href}
            key={link.href}
            onClick={close}
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduce ? 0 : .08 + index * .045, type: 'spring', stiffness: 260, damping: 24 }}
          >
            <span className="mobile-link-index">0{index + 1}</span>{link.label}<ArrowUpRight size={19} />
          </motion.a>)}
        </nav>
        <ButtonLink className="mobile-talk" href={`mailto:${profile.email}`} onClick={close}>Let’s talk</ButtonLink>
        <span className="mobile-menu-note">AVAILABLE FOR OPPORTUNITIES</span>
      </motion.div>}
    </AnimatePresence>
  </>
}
