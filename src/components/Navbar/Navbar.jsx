import { useState, useEffect } from 'react'
import { Link } from 'react-scroll'
import { FiMenu, FiX, FiCode, FiSun, FiMoon } from 'react-icons/fi'
import './Navbar.css'

const navLinks = [
  { label: 'Home', to: 'home' },
  { label: 'About', to: 'about' },
  { label: 'Projects', to: 'projects' },
  { label: 'Contact', to: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('home')
  const [isLight, setIsLight] = useState(() => {
    return localStorage.getItem('theme') === 'light'
  })

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isLight) {
      document.documentElement.setAttribute('data-theme', 'light')
      localStorage.setItem('theme', 'light')
    } else {
      document.documentElement.removeAttribute('data-theme')
      localStorage.setItem('theme', 'dark')
    }
  }, [isLight])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="container navbar-inner">
        {/* Logo */}
        <Link to="home" smooth duration={600} className="navbar-logo" onClick={() => setMenuOpen(false)}>
          <div className="logo-icon">
            <FiCode />
          </div>
          <span className="logo-text">JMC<span className="logo-dot">.</span></span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="navbar-links">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                smooth
                duration={600}
                spy
                offset={-80}
                onSetActive={() => setActive(link.to)}
                className={`nav-link ${active === link.to ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Theme Toggle */}
        <button
          id="theme-toggle"
          className="theme-toggle"
          onClick={() => setIsLight(!isLight)}
          aria-label="Toggle theme"
          title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        >
          {isLight ? <FiMoon /> : <FiSun />}
        </button>

        {/* CTA */}
        <a
          href="/JanMarkCaram_CV.pdf"
          download
          className="btn btn-primary navbar-cta"
        >
          Download CV
        </a>

        {/* Mobile Hamburger */}
        <button
          id="mobile-menu-btn"
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <ul>
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                smooth
                duration={600}
                offset={-80}
                className="mobile-nav-link"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <a href="/JanMarkCaram_CV.pdf" download className="btn btn-primary mobile-cv-btn">
              Download CV
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
