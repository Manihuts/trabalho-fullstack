import React, { createContext, useState, useContext } from "react";


export const AuthContext = createContext();


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


  const login = (token, userData) => {
    try {
      setAuthToken(token);
      setUser(userData);
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Erro ao salvar dados no localStorage:", error);
    }
  };

  const logout = () => {
    try {
      setAuthToken(null);
      setUser(null);
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

export default AuthProvider;
