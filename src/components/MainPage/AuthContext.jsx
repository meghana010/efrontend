// AuthContext.js
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [loggedInEmail, setLoggedInEmail] = useState("");

  return (
    <AuthContext.Provider value={{ loggedInEmail, setLoggedInEmail }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
