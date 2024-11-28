import React, { createContext, useState, useContext } from "react";

// Criação do contexto de autenticação
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Recuperando authToken e user do localStorage
  const [authToken, setAuthToken] = useState(() => {
    const token = localStorage.getItem("authToken");
    return token ? token : null;  // O token é uma string
  });

  const [user, setUser] = useState(() => {
    try {
      const userData = localStorage.getItem("user");
      return userData ? JSON.parse(userData) : null;  // O user é um objeto JSON
    } catch (error) {
      console.error("Erro ao recuperar dados do usuário:", error);
      return null;
    }
  });

  // Função de login que armazena os dados no localStorage
  const login = (token, userData) => {
    try {
      setAuthToken(token);
      setUser(userData);

      // Armazenando os dados no localStorage de maneira correta
      localStorage.setItem("authToken", token);  // Armazenando o token como string
      localStorage.setItem("user", userData);  // Armazenando o user como string JSON
    } catch (error) {
      console.error("Erro ao salvar dados no localStorage:", error);
    }
  };

  // Função de logout que remove os dados do localStorage
  const logout = () => {
    try {
      setAuthToken(null);
      setUser(null);

      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Erro ao fazer logout:", error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ authToken, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook customizado para acessar o contexto de autenticação
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

export default AuthProvider;
