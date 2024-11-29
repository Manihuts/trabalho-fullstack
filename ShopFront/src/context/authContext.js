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
      return userData;
    } catch (error) {
      console.error("Erro ao recuperar dados do usuário:", error);
      return {};  
    }
  });

  const login = (token, userData) => {
    try {
      setAuthToken(token);
      setUser(JSON.parse(userData));

      localStorage.setItem("authToken", token);  
      localStorage.setItem("user", userData);  
    } catch (error) {
      console.error("Erro ao salvar dados no localStorage:", error);
    }
  };

  const logout = () => {
    try {
      setAuthToken(null);
      setUser({});  

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


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

export default AuthProvider;
