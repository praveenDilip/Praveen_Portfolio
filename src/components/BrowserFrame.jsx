import { useEffect, useState } from 'react'

export default function BrowserFrame({ src, title, alt, variant = 'project', loading = 'lazy' }) {
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setFailed(false)
    setLoaded(false)
  }, [src])

  return <div className={`browser-frame browser-frame--${variant}`} role="img" aria-label={`${title} website preview`}>
    <div className="browser-frame__toolbar" aria-hidden="true">
      <span /><span /><span />
      <div className="browser-frame__address">{title}</div>
    </div>
    <div className="browser-frame__viewport">
      {!loaded && <div className="browser-frame__fallback" aria-hidden="true">
        <span className="browser-frame__fallback-title">{title}</span>
        <span className="browser-frame__fallback-caption">WEBSITE PREVIEW</span>
      </div>}
      {!failed && <img
        src={src}
        alt={alt || `${title} screenshot`}
        width="1550"
        height="768"
        loading={loading}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={loaded ? 'browser-frame__image is-loaded' : 'browser-frame__image'}
      />}
    </div>
  </div>
}
