import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import {
  FiCode, FiDatabase, FiLayout, FiGitBranch,
  FiPackage, FiSmartphone
} from 'react-icons/fi'
import './About.css'

const skills = [
  { name: 'HTML5', color: '#e34f26' },
  { name: 'CSS3', color: '#1572b6' },
  { name: 'JavaScript', color: '#f7df1e' },
  { name: 'React', color: '#61dafb' },
  { name: 'PHP', color: '#8892be' },
  { name: 'MySQL', color: '#4479a1' },
  { name: 'Node.js', color: '#68a063' },
  { name: 'Express.js', color: '#aaaaaa' },
  { name: 'MongoDB', color: '#47a248' },
  { name: 'Git & GitHub', color: '#f05032' },
  { name: 'Figma', color: '#f24e1e' },
  { name: 'Tailwind CSS', color: '#38bdf8' },
  { name: 'Bootstrap', color: '#7952b3' },
  { name: 'REST APIs', color: '#06b6d4' },
]

const competencies = [
  {
    icon: <FiLayout />,
    title: 'Frontend Development',
    desc: 'Crafting responsive, pixel-perfect UIs using React, HTML, CSS, and modern design systems.',
  },
  {
    icon: <FiDatabase />,
    title: 'Backend & Database',
    desc: 'Building robust APIs with Node.js, Express, PHP, and managing data with MySQL & MongoDB.',
  },
  {
    icon: <FiCode />,
    title: 'Clean Code Practices',
    desc: 'Writing maintainable, readable code with attention to structure, reusability, and best practices.',
  },
  {
    icon: <FiGitBranch />,
    title: 'Version Control',
    desc: 'Proficient with Git workflows, branching strategies, and collaborative development via GitHub.',
  },
  {
    icon: <FiPackage />,
    title: 'Project Architecture',
    desc: 'Experienced in designing scalable project structures for fullstack applications.',
  },
  {
    icon: <FiSmartphone />,
    title: 'Responsive Design',
    desc: 'Ensuring seamless experiences across all devices through mobile-first development.',
  },
]

export default function About() {
  const ref = useScrollAnimation()

  return (
    <section className="section about-section" id="about" ref={ref}>
      {/* Background accent */}
      <div className="about-bg-orb" />

      <div className="container">
        <div className="section-heading fade-in-up">
          <span className="section-badge">Who I Am</span>
          <h2>About <span className="gradient-text">Me</span></h2>
          <p>A little background about who I am, what I do, and what drives me.</p>
        </div>

        {/* Top: bio + education */}
        <div className="about-top fade-in-up delay-1">
          {/* Bio Card */}
          <div className="bio-card glass-card">
            <div className="bio-avatar">
              <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="60" cy="45" r="28" fill="url(#bioGrad1)" />
                <ellipse cx="60" cy="105" rx="45" ry="28" fill="url(#bioGrad2)" />
                <defs>
                  <linearGradient id="bioGrad1" x1="32" y1="17" x2="88" y2="73" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#a78bfa" />
                    <stop offset="1" stopColor="#06b6d4" />
                  </linearGradient>
                  <linearGradient id="bioGrad2" x1="15" y1="77" x2="105" y2="133" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#7c3aed" />
                    <stop offset="1" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="bio-content">
              <h3>Jan Mark Caram</h3>
              <p className="bio-title">IT Graduate &amp; Web Developer 🇵🇭</p>
              <p className="bio-desc">
                I&apos;m a graduating Bachelor of Science in Information Technology student with a strong
                passion for web development. I enjoy turning complex problems into elegant, user-friendly
                digital experiences.
              </p>
              <p className="bio-desc">
                Whether it&apos;s building a sleek front-end interface or architecting a backend API, I
                bring dedication and creativity to every project I take on. I&apos;m actively seeking
                opportunities to grow as a professional developer.
              </p>
              <div className="bio-info-chips">
                <span>📍 Philippines</span>
                <span>🎓 BSIT Graduate</span>
                <span>💼 Open to Work</span>
              </div>
            </div>
          </div>

          {/* Education Timeline */}
          <div className="education-card glass-card">
            <h3 className="edu-heading">Education</h3>
            <div className="timeline">
              <div className="timeline-item active">
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <span className="timeline-year">2022 – 2026</span>
                  <h4>BS Information Technology</h4>
                  <p>Major in Web &amp; Mobile Development</p>
                  <p className="timeline-school">Your University Name</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <span className="timeline-year">2018 – 2022</span>
                  <h4>Senior High School — ICT Strand</h4>
                  <p>Information and Communications Technology</p>
                  <p className="timeline-school">Your Senior High School</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="skills-section fade-in-up delay-2">
          <h3 className="skills-heading">Tech Stack &amp; Tools</h3>
          <div className="skills-grid">
            {skills.map((skill, i) => (
              <div
                key={skill.name}
                className="skill-pill"
                style={{ '--skill-color': skill.color, animationDelay: `${i * 0.05}s` }}
              >
                <span
                  className="skill-dot"
                  style={{ background: skill.color }}
                />
                {skill.name}
              </div>
            ))}
          </div>
        </div>

        {/* Competencies Grid */}
        <div className="competencies-grid">
          {competencies.map((item, i) => (
            <div key={item.title} className={`competency-card glass-card fade-in-up delay-${i + 1}`}>
              <div className="comp-icon">{item.icon}</div>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
