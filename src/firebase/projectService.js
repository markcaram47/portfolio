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
  query,
  orderBy,
  serverTimestamp
} from 'firebase/firestore'
import { db } from './config'

const COLLECTION = 'projects'

// ─── READ ────────────────────────────────────────────────────
export async function fetchProjects() {
  const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }))
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
