/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState} from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (email, password) => {
    if (email === "admin@ekarsoavy.mg" && password === "admin123") {
      const userData = { email, nom: "Père Administrateur", role: "admin" };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData)); //important
      return { success: true };
    }
    return { success: false, message: "Email ou mot de passe incorrect" };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // important
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuth: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
