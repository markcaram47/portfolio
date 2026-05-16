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

// ✅ Firebase config — portfolio-d0242
const firebaseConfig = {
  apiKey: "AIzaSyB77Vj_WdU9vRHnO6gsC3G-GQ1E3KLsOFY",
  authDomain: "portfolio-d0242.firebaseapp.com",
  projectId: "portfolio-d0242",
  storageBucket: "portfolio-d0242.firebasestorage.app",
  messagingSenderId: "799829841307",
  appId: "1:799829841307:web:8cf92e2873257f02abfd3e"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Export services
export const db = getFirestore(app)
export const auth = getAuth(app)
export default app
