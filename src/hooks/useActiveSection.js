import { useEffect, useState } from 'react'

export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const checkpoint = window.scrollY + window.innerHeight * .42
        const sections = ids
          .map(id => document.getElementById(id))
          .filter(section => section && section.getBoundingClientRect().top + window.scrollY <= checkpoint)
        setActive(sections.at(-1)?.id || ids[0])
      })
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [ids])
  return active
}
