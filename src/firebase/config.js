// ============================================================
//  🔥 FIREBASE CONFIG — src/firebase/config.js
// ============================================================
//  INSTRUCTIONS:
//  1. Go to https://console.firebase.google.com
//  2. Create a new project (or use existing)
//  3. Click "Web" app icon (</>) to register a web app
//  4. Copy the firebaseConfig object and paste below
//  5. Enable Firestore Database (Build > Firestore Database)
//  6. Enable Authentication > Email/Password sign-in
// ============================================================

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// ✅ Firebase config — loaded from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Export services
export const db = getFirestore(app)
export const auth = getAuth(app)
export default app
