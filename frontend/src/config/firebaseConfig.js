import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB30ewdq0CaU-q2y060ZdtwGm36yPpJzFI",
  authDomain: "notezy-12eed.firebaseapp.com",
  projectId: "notezy-12eed",
  storageBucket: "notezy-12eed.firebasestorage.app",
  messagingSenderId: "255027042400",
  appId: "1:255027042400:web:024527586ce4845249cb05",
  measurementId: "G-NG8VQD6PF7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 