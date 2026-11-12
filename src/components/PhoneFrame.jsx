import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Aperture } from 'lucide-react'

export default function PhoneFrame({ src, title, alt, variant = 'project', loading = 'lazy' }) {
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const reduce = useReducedMotion()
  useEffect(() => {
    setFailed(false)
    setLoaded(false)
  }, [src])

  function tilt(event) {
    if (reduce || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    event.currentTarget.style.setProperty('--tilt-x', `${-y * 7}deg`)
    event.currentTarget.style.setProperty('--tilt-y', `${x * 8}deg`)
  }

  function resetTilt(event) {
    event.currentTarget.style.setProperty('--tilt-x', '0deg')
    event.currentTarget.style.setProperty('--tilt-y', '0deg')
  }

  return <div
    className={`phone-frame phone-frame--${variant}`}
    onPointerMove={tilt}
    onPointerLeave={resetTilt}
    role="img"
    aria-label={`${title} app preview`}
  >
    <div className="phone-frame__bezel">
      <div className="phone-frame__glass">
        <div className="phone-frame__screen">
          {!loaded && <div className="phone-fallback" aria-hidden="true">
            <span className="phone-fallback__icon"><Aperture size={21} /></span>
            <span className="phone-fallback__title">{title}</span>
            <span className="phone-fallback__caption">APP PREVIEW</span>
            <span className="phone-fallback__skeleton skeleton-one" />
            <span className="phone-fallback__skeleton skeleton-two" />
            <span className="phone-fallback__skeleton skeleton-three" />
            <span className="phone-fallback__shimmer" />
          </div>}
          {!failed && <img
            src={src}
            alt={alt || `${title} screenshot`}
            width="1080"
            height="2340"
            loading={loading}
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            className={loaded ? 'phone-frame__image is-loaded' : 'phone-frame__image'}
          />}
          <span className="phone-frame__reflection" aria-hidden="true" />
        </div>
        <span className="phone-frame__island" aria-hidden="true" />
        <span className="phone-frame__home-indicator" aria-hidden="true" />
      </div>
    </div>
  </div>
}
