import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-scroll'
import {
  FiGithub, FiLinkedin, FiMail,
  FiArrowDown, FiCode, FiServer, FiLayout
} from 'react-icons/fi'
import './Hero.css'

const roles = [
  'Web Developer',
  'IT Graduate',
  'Frontend Developer',
  'Fullstack Developer',
]

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => {
    const current = roles[roleIndex]
    if (!deleting && displayed.length < current.length) {
      timeoutRef.current = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length + 1))
      }, 80)
    } else if (!deleting && displayed.length === current.length) {
      timeoutRef.current = setTimeout(() => setDeleting(true), 2200)
    } else if (deleting && displayed.length > 0) {
      timeoutRef.current = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length - 1))
      }, 45)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setRoleIndex((i) => (i + 1) % roles.length)
    }
    return () => clearTimeout(timeoutRef.current)
  }, [displayed, deleting, roleIndex])

  return (
    <section className="hero section" id="home">
      {/* Background orbs */}
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />

      <div className="container hero-inner">
        {/* Left — Text Content */}
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot" />
            Available for opportunities
          </div>

          <h1 className="hero-title">
            Hi, I&apos;m <span className="gradient-text">Jan Mark</span>
            <br />
            Caram
          </h1>

          <div className="hero-role">
            <span className="role-prefix">I&apos;m a </span>
            <span className="role-typed">{displayed}</span>
            <span className="cursor-blink">|</span>
          </div>

          <p className="hero-description">
            A passionate IT graduate from the Philippines 🇵🇭, specializing in building
            clean, modern, and performant web applications from concept to deployment.
          </p>

          {/* Stat chips */}
          <div className="hero-stats">
            <div className="stat-chip">
              <FiLayout />
              <span>Frontend</span>
            </div>
            <div className="stat-chip">
              <FiServer />
              <span>Fullstack</span>
            </div>
            <div className="stat-chip">
              <FiCode />
              <span>Clean Code</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="hero-ctas">
            <Link to="projects" smooth duration={700} offset={-80}>
              <button id="hero-view-projects" className="btn btn-primary">
                View My Projects
                <FiArrowDown />
              </button>
            </Link>
            <Link to="contact" smooth duration={700} offset={-80}>
              <button id="hero-contact" className="btn btn-outline">
                Get In Touch
              </button>
            </Link>
          </div>

          {/* Social Links */}
          <div className="hero-socials">
            <a href="https://github.com/" target="_blank" rel="noreferrer" id="hero-github" aria-label="GitHub">
              <FiGithub />
            </a>
            <a href="https://linkedin.com/in/" target="_blank" rel="noreferrer" id="hero-linkedin" aria-label="LinkedIn">
              <FiLinkedin />
            </a>
            <a href="mailto:janmark@email.com" id="hero-email" aria-label="Email">
              <FiMail />
            </a>
          </div>
        </div>

        {/* Right — Avatar */}
        <div className="hero-visual">
          <div className="avatar-wrapper">
            <div className="avatar-ring" />
            <div className="avatar-ring-2" />
            <div className="avatar-container">
              <div className="avatar-placeholder">
                <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="100" cy="80" r="45" fill="url(#grad1)" />
                  <ellipse cx="100" cy="175" rx="70" ry="45" fill="url(#grad2)" />
                  <defs>
                    <linearGradient id="grad1" x1="55" y1="35" x2="145" y2="125" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#a78bfa" />
                      <stop offset="1" stopColor="#06b6d4" />
                    </linearGradient>
                    <linearGradient id="grad2" x1="30" y1="130" x2="170" y2="200" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#7c3aed" />
                      <stop offset="1" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            {/* Floating skill badges */}
            <div className="float-badge float-badge-1">
              <span>⚛️</span> React
            </div>
            <div className="float-badge float-badge-2">
              <span>🌐</span> Fullstack
            </div>
            <div className="float-badge float-badge-3">
              <span>🎓</span> IT Graduate
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <Link to="about" smooth duration={600} offset={-80}>
          <div className="scroll-arrow">
            <FiArrowDown />
          </div>
        </Link>
        <span>Scroll down</span>
      </div>
    </section>
  )
}
