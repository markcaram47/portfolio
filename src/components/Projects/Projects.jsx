import { useState, useEffect } from 'react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import {
  FiExternalLink, FiGithub, FiFolder, FiLoader
} from 'react-icons/fi'
import { fetchProjects } from '../../firebase/projectService'
import './Projects.css'

export default function Projects() {
  const ref = useScrollAnimation()
  const [activeFilter, setActiveFilter] = useState('All')
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
      .then((data) => setProjects(data))
      .catch((err) => console.error('Failed to load projects:', err))
      .finally(() => setLoading(false))
  }, [])

  const filters = ['All', ...new Set(projects.map((p) => p.category))]

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter)


  return (
    <section className="section projects-section" id="projects" ref={ref}>
      <div className="projects-bg-orb" />

      <div className="container">
        <div className="section-heading fade-in-up">
          <span className="section-badge">My Work</span>
          <h2>Featured <span className="gradient-text">Projects</span></h2>
          <p>A collection of projects that reflect my skills and growth as a web developer.</p>
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs fade-in-up delay-1">
          {filters.map(f => (
            <button
              key={f}
              id={`filter-${f.toLowerCase()}`}
              className={`filter-tab ${activeFilter === f ? 'active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
            <FiLoader style={{ fontSize: '2rem', animation: 'spin 0.8s linear infinite', display: 'block', margin: '0 auto 12px' }} />
            <p>Loading projects…</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && projects.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px', opacity: 0.4 }}>📂</div>
            <p>No projects yet</p>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && projects.length > 0 && (
          <div className="projects-grid">
            {filtered.map((project, i) => (
              <div
                key={project.id}
                className={`project-card glass-card fade-in-up delay-${(i % 3) + 1} ${project.featured ? 'featured' : ''}`}
                style={{ '--project-color': project.color }}
              >
                {/* Card Top — Color Banner */}
                <div className="project-banner" style={{ background: project.gradient }}>
                  {project.featured && (
                    <span className="featured-badge">⭐ Featured</span>
                  )}
                  <div className="project-icon">
                    <FiFolder />
                  </div>
                </div>

                {/* Card Body */}
                <div className="project-body">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.description}</p>

                  {/* Tags */}
                  <div className="project-tags">
                    {(project.tags || []).map(tag => (
                      <span key={tag} className="project-tag" style={{ '--tag-color': project.color }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="project-links">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="project-link-btn"
                        id={`github-project-${project.id}`}
                      >
                        <FiGithub />
                        <span>GitHub</span>
                      </a>
                    )}
                    {project.demo ? (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="project-link-btn primary"
                        id={`demo-project-${project.id}`}
                      >
                        <FiExternalLink />
                        <span>Live Demo</span>
                      </a>
                    ) : (
                      <span className="project-link-btn disabled">
                        <FiExternalLink />
                        <span>Coming Soon</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}


        {/* GitHub CTA */}
        <div className="projects-cta fade-in-up">
          <p>Want to see more of my work?</p>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            id="view-all-github"
            className="btn btn-outline"
          >
            <FiGithub />
            View All on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
