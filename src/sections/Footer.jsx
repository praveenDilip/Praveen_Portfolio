import { ArrowUpRight, Heart } from 'lucide-react'
import { SocialLinks } from '../components/UI'

export default function Footer() {
  return <footer className="site-footer">
    <div className="container footer-main">
      <div className="footer-identity">
        <a className="brand" href="#home" aria-label="Back to top"><span>PR</span></a>
        <p>Built with intention.<br />Made to be useful.</p>
      </div>
      <div className="footer-actions">
        <SocialLinks compact />
        <a href="#home" className="back-top">Back to top <ArrowUpRight size={15} /></a>
      </div>
    </div>
    <div className="container footer-bottom">
      <span>© 2026 Praveen Rajkumar D</span>
      <span>Made with care <Heart size={12} /></span>
    </div>
  </footer>
}
