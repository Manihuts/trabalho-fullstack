import axios from "axios";

// URL do servidor
const server = "http://localhost:5071";

export const AuthServices = {
  // Função de login
  async login(data) {
    try {
      const response = await axios.post(`${server}/usuarios/login`, data);
      const { token } = response.data;
      console.log("Token de login:", token);

      // Decodificando o token para obter os dados do usuário
      const usuarioDTO = this.decodeToken(token);

      // Retorna o token e o usuário decodificado
      return { token, usuarioDTO };
    } catch (error) {
      console.error("Erro ao realizar login:", error.response?.data || error.message);
      throw error;
    }
  },

  // Função de registro de novo usuário
  async register(data) {
    try {
      const { senha, ...usuarioDTO } = data;

      // Construindo a URL com a senha na query string
      const queryParams = new URLSearchParams({ senha }).toString();

      const response = await axios.post(
        `${server}/usuarios/registrar?${queryParams}`, 
        usuarioDTO 
      );

      console.log("Usuário registrado:", response.data);

      // Realiza o login após o registro e retorna o token e os dados do usuário
      const loginResponse = await this.login({
        Email: data.email,
        Senha: data.senha,
      });

      return {
        ...response.data,
        token: loginResponse.token,
      };
    } catch (error) {
      console.error("Erro ao registrar usuário:", error.response?.data || error.message);
      throw error;
    }
  },

  // Função para decodificar o token JWT e obter os dados do usuário
  decodeToken(token) {
    try {
      const payloadBase64 = token.split(".")[1];
      const decodedPayload = JSON.parse(atob(payloadBase64));
      return decodedPayload.UsuarioDTO;  // Acessando o DTO do usuário
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
      throw error;
    }
  },

  // Função de logout, remove os dados do localStorage
  logout() {
    try {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      console.log("Usuário deslogado.");
    } catch (error) {
      console.error("Erro ao fazer logout:", error.message);
    }
  },

  // Função para obter os dados do usuário armazenados
  getUserData() {
    try {
      const userData = localStorage.getItem("user");
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Erro ao recuperar dados do usuário:", error);
      return null;
    }
  },
};
