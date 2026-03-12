// Firebase configuration
// Replace these values with your Firebase project configuration
// To get your config: Go to Firebase Console → Project Settings → General → Your apps → Web app
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import.meta.env;

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
const senderId = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID;
const appId = import.meta.env.VITE_FIREBASE_APP_ID;
const measurementId = import.meta.env.VITE_MEASUREMENT_ID;

export const firebaseConfig = {
  apiKey,
  authDomain: projectId + ".firebaseapp.com",
  projectId,
  storageBucket: projectId + ".firebasestorage.app",
  messagingSenderId: senderId,
  appId,
  measurementId,
};

// Initialize Firebase (uncomment after adding your config)
// const app = initializeApp(firebaseConfig);
// Firestore collection names
export const COLLECTIONS = {
  PROFILE: "profile",
  EXPERIENCE: "experience",
  PROJECTS: "projects",
  SKILLS: "skills",
  SOCIAL: "social",
  CONTACT: "contact",
};
