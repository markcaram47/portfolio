import { useState, useRef } from 'react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import {
  FiMail, FiMapPin, FiGithub, FiLinkedin,
  FiSend, FiCheckCircle, FiAlertCircle, FiPhone
} from 'react-icons/fi'
import './Contact.css'

const contactInfo = [
  {
    icon: <FiMail />,
    label: 'Email',
    value: 'janmark@email.com',
    href: 'mailto:janmark@email.com',
    color: '#7c3aed',
  },
  {
    icon: <FiPhone />,
    label: 'Phone',
    value: '+63 9XX XXX XXXX',
    href: 'tel:+639XXXXXXXXX',
    color: '#06b6d4',
  },
  {
    icon: <FiMapPin />,
    label: 'Location',
    value: 'Philippines 🇵🇭',
    href: null,
    color: '#ec4899',
  },
]

const socials = [
  { icon: <FiGithub />, label: 'GitHub', href: 'https://github.com/', id: 'contact-github' },
  { icon: <FiLinkedin />, label: 'LinkedIn', href: 'https://linkedin.com/in/', id: 'contact-linkedin' },
  { icon: <FiMail />, label: 'Email', href: 'mailto:janmark@email.com', id: 'contact-email' },
]

export default function Contact() {
  const ref = useScrollAnimation()
  const formRef = useRef(null)
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState(null) // 'loading' | 'success' | 'error'
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!formData.name.trim()) e.name = 'Name is required'
    if (!formData.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Enter a valid email'
    if (!formData.message.trim()) e.message = 'Message is required'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setStatus('loading')

    // Simulate submission (replace with EmailJS later)
    await new Promise(r => setTimeout(r, 1800))
    setStatus('success')
    setFormData({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setStatus(null), 5000)
  }

  return (
    <section className="section contact-section" id="contact" ref={ref}>
      <div className="contact-bg-orb-1" />
      <div className="contact-bg-orb-2" />

      <div className="container">
        <div className="section-heading fade-in-up">
          <span className="section-badge">Get In Touch</span>
          <h2>Let&apos;s <span className="gradient-text">Connect</span></h2>
          <p>Open for full-time roles, freelance projects, and collaborations. Don&apos;t hesitate to reach out!</p>
        </div>

        <div className="contact-grid">
          {/* Left — Info */}
          <div className="contact-info fade-in-left delay-1">
            <div className="contact-intro glass-card">
              <h3>Let&apos;s Build Something Together</h3>
              <p>
                Whether you&apos;re a company looking to hire, a fellow developer wanting to collaborate,
                or someone with a great idea — I&apos;d love to hear from you.
              </p>

              <div className="contact-details">
                {contactInfo.map(item => (
                  <div className="contact-detail-item" key={item.label}>
                    <div className="contact-detail-icon" style={{ background: `${item.color}20`, color: item.color }}>
                      {item.icon}
                    </div>
                    <div>
                      <span className="contact-detail-label">{item.label}</span>
                      {item.href ? (
                        <a href={item.href} className="contact-detail-value">{item.value}</a>
                      ) : (
                        <span className="contact-detail-value">{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Icons */}
              <div className="contact-socials">
                <p className="socials-label">Find me on</p>
                <div className="social-icons">
                  {socials.map(s => (
                    <a
                      key={s.id}
                      id={s.id}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                      className="social-icon-btn"
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="contact-form-wrapper fade-in-right delay-2">
            <form
              ref={formRef}
              id="contact-form"
              className="contact-form glass-card"
              onSubmit={handleSubmit}
              noValidate
            >
              <h3>Send a Message</h3>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="contact-name">Full Name *</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    placeholder="Jan Mark Caram"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? 'error' : ''}
                  />
                  {errors.name && <span className="field-error">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email">Email Address *</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="field-error">{errors.email}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="contact-subject">Subject</label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  placeholder="Job Opportunity / Collaboration / Hello"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-message">Message *</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  placeholder="Tell me about the opportunity or project..."
                  value={formData.message}
                  onChange={handleChange}
                  className={errors.message ? 'error' : ''}
                />
                {errors.message && <span className="field-error">{errors.message}</span>}
              </div>

              <button
                type="submit"
                id="contact-submit"
                className={`btn btn-primary submit-btn ${status === 'loading' ? 'loading' : ''}`}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <><span className="spinner" /> Sending...</>
                ) : status === 'success' ? (
                  <><FiCheckCircle /> Message Sent!</>
                ) : (
                  <><FiSend /> Send Message</>
                )}
              </button>

              {status === 'success' && (
                <div className="form-success">
                  <FiCheckCircle />
                  <p>Thanks for reaching out! I&apos;ll get back to you soon.</p>
                </div>
              )}

              {status === 'error' && (
                <div className="form-error-msg">
                  <FiAlertCircle />
                  <p>Something went wrong. Please try again.</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
