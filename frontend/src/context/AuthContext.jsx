/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // Mock login - sera remplacé par l'API
    if (email === "admin@ekarsoavy.mg" && password === "admin123") {
      const userData = { email, nom: "Père Administrateur", role: "admin" };
      setUser(userData);
      return { success: true };
    }
    return { success: false, message: "Email ou mot de passe incorrect" };
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuth: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
