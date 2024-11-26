import React, { createContext, useState, useContext } from "react";

// Criação do contexto
export const AuthContext = createContext();

// Provedor do AuthContext
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => {
    const token = localStorage.getItem("authToken");
    return token ? token : null;
  });

  const [user, setUser] = useState(() => {
    try {
      const userData = localStorage.getItem("user");
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Erro ao recuperar dados do usuário:", error);
      return null;
    }
  });

  // Método para login: salva token e dados do usuário
  const login = (token, userData) => {
    try {
      setAuthToken(token);
      setUser(userData);

      // Salva no localStorage
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Erro ao salvar dados no localStorage:", error);
    }
  };

  // Método para logout: limpa token e dados do usuário
  const logout = () => {
    try {
      setAuthToken(null);
      setUser(null);

      // Remove do localStorage
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Erro ao remover dados do localStorage:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ authToken, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para consumir o AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

export default AuthProvider;
