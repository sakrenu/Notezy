// frontend/src/config/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCmRWr4PJJDej8-7w3hXZLP7wISg8hBZtQ",
  authDomain: "notezy-7f7d9.firebaseapp.com",
  projectId: "notezy-7f7d9",
  storageBucket: "notezy-7f7d9.firebasestorage.app",
  messagingSenderId: "772266770021",
  appId: "1:772266770021:web:bdb28eeef9b5b0e62c508c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 