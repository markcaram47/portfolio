// ============================================================
//  🗄️ FIRESTORE SERVICES — src/firebase/projectService.js
//  All Firestore CRUD operations for projects
// ============================================================

import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp
} from 'firebase/firestore'
import { db } from './config'

const COLLECTION = 'projects'

function normalizeTags(tags) {
  if (Array.isArray(tags)) return tags
  if (typeof tags === 'string') {
    return tags.split(',').map((tag) => tag.trim()).filter(Boolean)
  }
  return []
}

function normalizeProject(data, id) {
  return {
    id,
    title: data.title || 'Untitled Project',
    description: data.description || '',
    tags: normalizeTags(data.tags),
    category: data.category || 'Frontend',
    color: data.color || '#8b5cf6',
    gradient: data.gradient || 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
    github: data.github || '',
    demo: data.demo || '',
    featured: Boolean(data.featured),
    createdAt: data.createdAt || null,
    updatedAt: data.updatedAt || null
  }
}

function projectTimestamp(project) {
  const value = project.createdAt

  if (!value) return 0
  if (typeof value.toMillis === 'function') return value.toMillis()
  if (typeof value.seconds === 'number') return value.seconds * 1000
  if (typeof value === 'number') return value

  return 0
}

function sortProjects(projectList) {
  return [...projectList].sort((a, b) => {
    const timeDelta = projectTimestamp(b) - projectTimestamp(a)

    if (timeDelta !== 0) return timeDelta

    return String(a.title).localeCompare(String(b.title))
  })
}

// ─── READ ────────────────────────────────────────────────────
export async function fetchProjects() {
  try {
    const snapshot = await getDocs(collection(db, COLLECTION))
    const projects = snapshot.docs.map((doc) => normalizeProject(doc.data(), doc.id))
    return sortProjects(projects)
  } catch (error) {
    console.error('Failed to load projects:', error)
    throw error
  }
}

// ─── CREATE ──────────────────────────────────────────────────
export async function addProject(projectData) {
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...projectData,
    createdAt: serverTimestamp()
  })
  return docRef.id
}

// ─── UPDATE ──────────────────────────────────────────────────
export async function updateProject(id, projectData) {
  const docRef = doc(db, COLLECTION, id)
  await updateDoc(docRef, {
    ...projectData,
    updatedAt: serverTimestamp()
  })
}

// ─── DELETE ──────────────────────────────────────────────────
export async function deleteProject(id) {
  const docRef = doc(db, COLLECTION, id)
  await deleteDoc(docRef)
}
