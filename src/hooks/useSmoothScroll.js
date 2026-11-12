import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

export function useSmoothScroll() {
  const reduce = useReducedMotion()
  useEffect(() => {
    if (reduce) return
    const lenis = new Lenis({ lerp: .16, smoothWheel: false })
    const updateScroll = () => ScrollTrigger.update()
    const updateLenis = time => lenis.raf(time * 1000)
    lenis.on('scroll', updateScroll)
    gsap.ticker.add(updateLenis)
    gsap.ticker.lagSmoothing(0)
    return () => {
      lenis.off('scroll', updateScroll)
      gsap.ticker.remove(updateLenis)
      lenis.destroy()
    }
  }, [reduce])
}
