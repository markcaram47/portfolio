// ============================================================
//  🗂️ ADMIN DASHBOARD — src/pages/admin/AdminDashboard.jsx
//  Full project management panel (CRUD with Firestore)
// ============================================================

import { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  FiPlus, FiEdit2, FiTrash2, FiLogOut, FiExternalLink,
  FiGithub, FiX, FiSave, FiFolder, FiStar, FiTag,
  FiEye, FiCheckCircle, FiAlertCircle, FiLoader
} from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'
import {
  fetchProjects,
  addProject,
  updateProject,
  deleteProject
} from '../../firebase/projectService'
import './AdminDashboard.css'

// ─── Constants ─────────────────────────────────────────────
const CATEGORIES = ['Frontend', 'Fullstack', 'Backend', 'Mobile', 'Other']

const EMPTY_FORM = {
  title: '',
  description: '',
  tags: '',
  category: 'Frontend',
  color: '#8b5cf6',
  gradient: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
  github: '',
  demo: '',
  featured: false
}

// ─── Toast Component ────────────────────────────────────────
function Toast({ message, type, onDismiss }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 3500)
    return () => clearTimeout(t)
  }, [onDismiss])

  return (
    <div className={`admin-toast ${type}`}>
      {type === 'success' ? <FiCheckCircle /> : <FiAlertCircle />}
      {message}
    </div>
  )
}

// ─── Project Form Modal ─────────────────────────────────────
function ProjectModal({ project, onSave, onClose }) {
  const isEdit = Boolean(project?.id)
  const [form, setForm] = useState(
    project
      ? { ...project, tags: Array.isArray(project.tags) ? project.tags.join(', ') : project.tags }
      : { ...EMPTY_FORM }
  )
  const [saving, setSaving] = useState(false)

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    try {
      const data = {
        ...form,
        tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean)
      }
      await onSave(data)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-card">
        <div className="modal-header">
          <h3>{isEdit ? '✏️ Edit Project' : '➕ Add New Project'}</h3>
          <button className="btn-close-modal" onClick={onClose} id="btn-close-modal">
            <FiX />
          </button>
        </div>

        <form className="modal-body" onSubmit={handleSubmit}>
          <div className="project-form">
            {/* Title & Category */}
            <div className="form-row">
              <div className="form-field">
                <label>Project Title <span className="required">*</span></label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. PowerMed E-Commerce"
                  required
                />
              </div>
              <div className="form-field">
                <label>Category <span className="required">*</span></label>
                <select name="category" value={form.category} onChange={handleChange}>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="form-field">
              <label>Description <span className="required">*</span></label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="What does this project do? What problem does it solve?"
                required
                rows={3}
              />
            </div>

            {/* Tech Tags */}
            <div className="form-field">
              <label>Tech Stack / Tags</label>
              <input
                name="tags"
                value={form.tags}
                onChange={handleChange}
                placeholder="React, Firebase, Node.js, MongoDB"
              />
              <span className="field-hint">Separate with commas</span>
            </div>

            {/* Color & Gradient */}
            <div className="form-row">
              <div className="form-field">
                <label>Accent Color</label>
                <div className="color-preview-row">
                  <input
                    name="color"
                    value={form.color}
                    onChange={handleChange}
                    placeholder="#8b5cf6"
                  />
                  <div
                    className="color-preview-swatch"
                    style={{ backgroundColor: form.color }}
                  />
                </div>
              </div>
              <div className="form-field">
                <label>Card Gradient</label>
                <input
                  name="gradient"
                  value={form.gradient}
                  onChange={handleChange}
                  placeholder="linear-gradient(135deg, #8b5cf6, #06b6d4)"
                />
              </div>
            </div>

            {/* Links */}
            <div className="form-row">
              <div className="form-field">
                <label>GitHub URL</label>
                <input
                  name="github"
                  value={form.github}
                  onChange={handleChange}
                  placeholder="https://github.com/you/repo"
                  type="url"
                />
              </div>
              <div className="form-field">
                <label>Live Demo URL</label>
                <input
                  name="demo"
                  value={form.demo}
                  onChange={handleChange}
                  placeholder="https://your-site.com (optional)"
                  type="url"
                />
              </div>
            </div>

            {/* Featured */}
            <div className="form-field">
              <label className="checkbox-field">
                <input
                  type="checkbox"
                  name="featured"
                  checked={form.featured}
                  onChange={handleChange}
                />
                <span>⭐ Mark as Featured (shows badge on project card)</span>
              </label>
            </div>
          </div>

          {/* Footer inside form so submit works */}
          <div className="modal-footer" style={{ marginTop: '8px' }}>
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn-save"
              id="btn-save-project"
              disabled={saving}
            >
              {saving ? (
                <><FiLoader className="spin" /> Saving…</>
              ) : (
                <><FiSave /> {isEdit ? 'Update Project' : 'Add Project'}</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ─── Delete Confirm Modal ───────────────────────────────────
function DeleteConfirmModal({ project, onConfirm, onClose }) {
  const [deleting, setDeleting] = useState(false)

  async function handleDelete() {
    setDeleting(true)
    try {
      await onConfirm()
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-card confirm-card">
        <div className="confirm-body">
          <div className="confirm-icon">🗑️</div>
          <h3>Delete Project?</h3>
          <p>
            Are you sure you want to delete{' '}
            <strong>"{project.title}"</strong>?
            <br />This action cannot be undone.
          </p>
          <div className="confirm-actions">
            <button className="btn-cancel" onClick={onClose}>Keep it</button>
            <button
              className="btn-confirm-delete"
              id="btn-confirm-delete"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? <FiLoader className="spin" /> : <FiTrash2 />}
              {deleting ? 'Deleting…' : 'Yes, Delete'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main Dashboard ─────────────────────────────────────────
export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editProject, setEditProject] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [toast, setToast] = useState(null)

  // ── Load Projects ────────────────────────────────────────
  const loadProjects = useCallback(async () => {
    setLoading(true)
    try {
      const data = await fetchProjects()
      setProjects(data)
    } catch (err) {
      showToast('Failed to load projects', 'error')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadProjects()
  }, [loadProjects])

  // ── Toast Helper ─────────────────────────────────────────
  function showToast(message, type = 'success') {
    setToast({ message, type, key: Date.now() })
  }

  // ── Logout ───────────────────────────────────────────────
  async function handleLogout() {
    await logout()
    navigate('/admin')
  }

  // ── Add Project ──────────────────────────────────────────
  async function handleAdd(data) {
    try {
      await addProject(data)
      await loadProjects()
      setShowAddModal(false)
      showToast('Project added successfully! 🎉')
    } catch (err) {
      showToast('Failed to add project', 'error')
      console.error(err)
    }
  }

  // ── Edit Project ─────────────────────────────────────────
  async function handleEdit(data) {
    try {
      await updateProject(editProject.id, data)
      await loadProjects()
      setEditProject(null)
      showToast('Project updated!')
    } catch (err) {
      showToast('Failed to update project', 'error')
      console.error(err)
    }
  }

  // ── Delete Project ───────────────────────────────────────
  async function handleDelete() {
    try {
      await deleteProject(deleteTarget.id)
      await loadProjects()
      setDeleteTarget(null)
      showToast('Project deleted.')
    } catch (err) {
      showToast('Failed to delete project', 'error')
      console.error(err)
    }
  }

  // ── Stats ────────────────────────────────────────────────
  const totalProjects = projects.length
  const featuredCount = projects.filter((p) => p.featured).length
  const categoriesCount = new Set(projects.map((p) => p.category)).size

  return (
    <div className="admin-dashboard">
      {/* ── Top Bar ─────────────────────────── */}
      <header className="admin-topbar">
        <div className="admin-brand">
          <div className="admin-brand-icon">⚡</div>
          <span>Portfolio Admin</span>
        </div>
        <div className="admin-topbar-actions">
          <div className="admin-user-badge">
            👤 {user?.email}
          </div>
          <Link to="/" className="btn-view-site" id="btn-view-site">
            <FiEye /> View Site
          </Link>
          <button className="btn-logout" id="btn-logout" onClick={handleLogout}>
            <FiLogOut /> Logout
          </button>
        </div>
      </header>

      {/* ── Main ────────────────────────────── */}
      <main className="admin-content">
        {/* Page Header */}
        <div className="admin-page-header">
          <div>
            <h2>Projects Manager</h2>
            <p>Add, edit, or remove projects from your portfolio</p>
          </div>
          <button
            id="btn-add-project"
            className="btn-add-project"
            onClick={() => setShowAddModal(true)}
          >
            <FiPlus /> Add Project
          </button>
        </div>

        {/* Stats */}
        <div className="admin-stats">
          <div className="stat-card">
            <div className="stat-icon purple"><FiFolder /></div>
            <div className="stat-info">
              <div className="stat-value">{totalProjects}</div>
              <div className="stat-label">Total Projects</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon cyan"><FiStar /></div>
            <div className="stat-info">
              <div className="stat-value">{featuredCount}</div>
              <div className="stat-label">Featured</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon green"><FiTag /></div>
            <div className="stat-info">
              <div className="stat-value">{categoriesCount}</div>
              <div className="stat-label">Categories</div>
            </div>
          </div>
        </div>

        {/* Projects Table */}
        {loading ? (
          <div className="admin-loading">
            <div className="loading-spinner" />
            <span>Loading projects…</span>
          </div>
        ) : projects.length === 0 ? (
          <div className="admin-empty">
            <div className="empty-icon">📂</div>
            <h3>No projects yet</h3>
            <p>Click "Add Project" to add your first one!</p>
            <button className="btn-add-project" onClick={() => setShowAddModal(true)}>
              <FiPlus /> Add First Project
            </button>
          </div>
        ) : (
          <div className="projects-table-wrap">
            <table className="projects-table">
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Category</th>
                  <th>Tech Stack</th>
                  <th>Links</th>
                  <th>Featured</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr key={p.id}>
                    {/* Title + Desc */}
                    <td>
                      <div className="project-title-cell">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span
                            className="color-swatch"
                            style={{ backgroundColor: p.color }}
                          />
                          <div className="project-name">{p.title}</div>
                        </div>
                        <div className="project-desc">{p.description}</div>
                      </div>
                    </td>

                    {/* Category */}
                    <td>
                      <span className="tag-category">{p.category}</span>
                    </td>

                    {/* Tags */}
                    <td>
                      <div className="tech-tags">
                        {(p.tags || []).slice(0, 3).map((tag) => (
                          <span key={tag} className="tech-tag">{tag}</span>
                        ))}
                        {p.tags?.length > 3 && (
                          <span className="tech-tag">+{p.tags.length - 3}</span>
                        )}
                      </div>
                    </td>

                    {/* Links */}
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        {p.github && (
                          <a href={p.github} target="_blank" rel="noreferrer"
                            style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
                            <FiGithub />
                          </a>
                        )}
                        {p.demo && (
                          <a href={p.demo} target="_blank" rel="noreferrer"
                            style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
                            <FiExternalLink />
                          </a>
                        )}
                        {!p.github && !p.demo && (
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>—</span>
                        )}
                      </div>
                    </td>

                    {/* Featured */}
                    <td>
                      {p.featured
                        ? <span className="badge-featured">⭐ Featured</span>
                        : <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>—</span>
                      }
                    </td>

                    {/* Actions */}
                    <td>
                      <div className="row-actions">
                        <button
                          className="btn-edit"
                          onClick={() => setEditProject(p)}
                          id={`btn-edit-${p.id}`}
                        >
                          <FiEdit2 /> Edit
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => setDeleteTarget(p)}
                          id={`btn-delete-${p.id}`}
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* ── Modals ──────────────────────────── */}
      {showAddModal && (
        <ProjectModal
          project={null}
          onSave={handleAdd}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {editProject && (
        <ProjectModal
          project={editProject}
          onSave={handleEdit}
          onClose={() => setEditProject(null)}
        />
      )}

      {deleteTarget && (
        <DeleteConfirmModal
          project={deleteTarget}
          onConfirm={handleDelete}
          onClose={() => setDeleteTarget(null)}
        />
      )}

      {/* ── Toast ───────────────────────────── */}
      {toast && (
        <Toast
          key={toast.key}
          message={toast.message}
          type={toast.type}
          onDismiss={() => setToast(null)}
        />
      )}
    </div>
  )
}
