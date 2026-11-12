import { useEffect, useState } from 'react'
import { Aperture } from 'lucide-react'

export default function ScreenshotFrame({ src, title, alt, variant = 'project', loading = 'lazy' }) {
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setFailed(false)
    setLoaded(false)
  }, [src])

  return <div className={`screenshot-frame screenshot-frame--${variant}`} role="img" aria-label={`${title} screenshot preview`}>
    {!loaded && <div className="screenshot-frame__fallback" aria-hidden="true">
      <Aperture size={22} />
      <span>{title}</span>
      <small>PROJECT PREVIEW</small>
    </div>}
    {!failed && <img
      src={src}
      alt={alt || `${title} screenshot`}
      width="768"
      height="1536"
      loading={loading}
      decoding="async"
      onLoad={() => setLoaded(true)}
      onError={() => setFailed(true)}
      className={loaded ? 'screenshot-frame__image is-loaded' : 'screenshot-frame__image'}
    />}
  </div>
}
