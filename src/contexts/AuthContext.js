import React, { useContext, useState, useEffect } from "react";
import { auth } from "../config/firebase";
import { db } from "../config/firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateName(name) {
    return auth.currentUser.updateProfile({
      displayName: name,
      photoURL: null,
    });
  }

  function updatePassword(password) {
    return auth.currentUser.updatePassword(password);
  }

  function updateFormClass(formclass) {
    const uid = auth.currentUser?.uid;
    db.collection("formclass").doc(uid).set({ form_class: formclass });
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    logout,
    signup,
    updateName,
    resetPassword,
    updatePassword,
    updateFormClass
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
