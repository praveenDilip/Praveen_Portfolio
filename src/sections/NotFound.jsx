import { useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  useEffect(() => {
    document.title = 'Page Not Found | Praveen Rajkumar D'
  }, [])
  return <main className="not-found-page">
    <span className="eyebrow">404 / NOT FOUND</span>
    <h1>This page is<br /><span>off the map.</span></h1>
    <p>The page you’re looking for doesn’t exist or may have moved.</p>
    <a className="button button-primary" href="/"><ArrowLeft size={16} /> Back to home</a>
  </main>
}
