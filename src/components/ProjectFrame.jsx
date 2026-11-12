import BrowserFrame from './BrowserFrame'
import PhoneFrame from './PhoneFrame'
import ScreenshotFrame from './ScreenshotFrame'

export default function ProjectFrame({ project, src, alt, variant }) {
  if (project.previewMode === 'desktop') {
    return <BrowserFrame src={src} title={project.title} alt={alt} variant={variant} />
  }
  if (project.previewMode === 'phone') {
    return <PhoneFrame src={src} title={project.title} alt={alt} variant={variant} />
  }
  return <ScreenshotFrame src={src} title={project.title} alt={alt} variant={variant} />
}
