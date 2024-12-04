import { useEffect, useState } from "react";
import { auth } from "../config/firebaseConfig";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

export function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth);

  return { user, login, logout };
}