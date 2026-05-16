import { Link } from 'react-scroll'
import { FiGithub, FiLinkedin, FiMail, FiHeart, FiCode } from 'react-icons/fi'
import './Footer.css'

const navLinks = [
  { label: 'Home', to: 'home' },
  { label: 'About', to: 'about' },
  { label: 'Projects', to: 'projects' },
  { label: 'Contact', to: 'contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-glow" />
      <div className="container footer-inner">
        {/* Logo & tagline */}
        <div className="footer-brand">
          <div className="footer-logo">
            <div className="footer-logo-icon"><FiCode /></div>
            <span>JMC<span className="logo-dot">.</span></span>
          </div>
          <p className="footer-tagline">
            Building digital experiences that make a difference.
          </p>
          <div className="footer-socials">
            <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub" id="footer-github">
              <FiGithub />
            </a>
            <a href="https://linkedin.com/in/" target="_blank" rel="noreferrer" aria-label="LinkedIn" id="footer-linkedin">
              <FiLinkedin />
            </a>
            <a href="mailto:janmark@email.com" aria-label="Email" id="footer-email">
              <FiMail />
            </a>
          </div>
        </div>

        {/* Nav links */}
        <div className="footer-nav">
          <h4>Navigation</h4>
          <ul>
            {navLinks.map(link => (
              <li key={link.to}>
                <Link to={link.to} smooth duration={600} offset={-80} className="footer-link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick actions */}
        <div className="footer-nav">
          <h4>Quick Actions</h4>
          <ul>
            <li>
              <a href="/JanMarkCaram_CV.pdf" download className="footer-link">Download CV</a>
            </li>
            <li>
              <a href="https://github.com/" target="_blank" rel="noreferrer" className="footer-link">View GitHub</a>
            </li>
            <li>
              <a href="mailto:janmark@email.com" className="footer-link">Send Email</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© {year} Jan Mark Caram. All rights reserved.</p>
          <p className="footer-made">
            Made with <FiHeart className="heart" /> using React + Vite
          </p>
        </div>
      </div>
    </footer>
  )
}
