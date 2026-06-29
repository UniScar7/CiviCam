import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
 apiKey: "AIzaSyATuI8alF_2KE37ZziMzqzK-eovACqWSRk",
  authDomain: "civicam-34d6f.firebaseapp.com",
  projectId: "civicam-34d6f",
  storageBucket: "civicam-34d6f.firebasestorage.app",
  messagingSenderId: "798992650038",
  appId: "1:798992650038:web:63fe0cc38102e68663ed97",
  measurementId: "G-GN6XP37XYP",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);

export default app;