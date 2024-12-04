import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { useAuth } from "./useAuth";

const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const { user: authUser, login, logout } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let unsubscribeFirestore = null;

    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          // Set up real-time listener for user document
          const userDocRef = doc(db, "users", currentUser.uid);

          unsubscribeFirestore = onSnapshot(userDocRef, (doc) => {
            if (doc.exists()) {
              const userData = doc.data();
              console.log("Real-time user data update:", userData);

              if (userData.role) {
                setUser({
                  ...currentUser,
                  uid: currentUser.uid,
                  email: currentUser.email,
                  role: userData.role,
                  isProfileComplete: !!userData.isProfileComplete,
                  ...userData // Include any other fields from Firestore
                });
                console.log("Updated user state:", {
                  uid: currentUser.uid,
                  email: currentUser.email,
                  role: userData.role,
                  isProfileComplete: !!userData.isProfileComplete
                });
              } else {
                console.warn("Role is missing in Firestore document:", userData);
                setError("Role is missing in Firestore document");
                setUser({
                  ...currentUser,
                  uid: currentUser.uid,
                  email: currentUser.email,
                  role: null,
                  isProfileComplete: false
                });
              }
            } else {
              console.warn("User document does not exist for UID:", currentUser.uid);
              setError("User document does not exist");
              setUser({
                ...currentUser,
                uid: currentUser.uid,
                email: currentUser.email,
                role: null,
                isProfileComplete: false
              });
            }
          }, (error) => {
            console.error("Error in Firestore listener:", error);
            setError("Error listening to user data");
          });

        } catch (error) {
          console.error("Error setting up Firestore listener:", error);
          setError("Error setting up user data listener");
          setUser({
            ...currentUser,
            uid: currentUser.uid,
            email: currentUser.email,
            role: null,
            isProfileComplete: false
          });
        }
      } else {
        if (unsubscribeFirestore) {
          unsubscribeFirestore();
          unsubscribeFirestore = null;
        }
        setUser(null);
      }
      setLoading(false);
    });

    // Cleanup function
    return () => {
      if (unsubscribeFirestore) {
        unsubscribeFirestore();
      }
      unsubscribeAuth();
    };
  }, [authUser]);

  // Debug logging for state changes
  useEffect(() => {
    if (user) {
      console.log("Auth state updated:", {
        uid: user.uid,
        role: user.role,
        isProfileComplete: user.isProfileComplete
      });
    }
  }, [user]);

  const authContextValue = {
    user,
    loading,
    error,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
}