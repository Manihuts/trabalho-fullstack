import axios from "axios";

const server = "http://localhost:5071";

export const AuthServices = {
  async login(data) {
    try {
      const response = await axios.post(`${server}/usuarios/login`, data);
      const { token } = response.data;
      console.log("Token de login:", token);

      const usuarioDTO = this.decodeToken(token);

      return { token, usuarioDTO };
    } catch (error) {
      console.error(
        "Erro ao realizar login:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  async register(data) {
    try {
      const { senha, ...usuarioDTO } = data;

      const queryParams = new URLSearchParams({ senha }).toString();

      const response = await axios.post(
        `${server}/usuarios/registrar?${queryParams}`,
        usuarioDTO
      );

      console.log("Usuário registrado:", response.data);

      // const loginResponse = await this.login({
      //   Email: data.email,
      //   Senha: data.senha,
      // });

      // return {
      //   ...response.data,
      //   token: loginResponse.token,
      // };
      return response.data;
    } catch (error) {
      console.error(
        "Erro ao registrar usuário:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  decodeToken(token) {
    try {
      const payloadBase64 = token.split(".")[1];
      const decodedPayload = JSON.parse(atob(payloadBase64));
      return decodedPayload.UsuarioDTO || {};
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
      throw error;
    }
  },

  logout() {
    try {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      console.log("Usuário deslogado.");
    } catch (error) {
      console.error("Erro ao fazer logout:", error.message);
    }
  },

  getUserData() {
    try {
      const userData = localStorage.getItem("user");
      return userData ? JSON.parse(userData) : {};
    } catch (error) {
      console.error("Erro ao recuperar dados do usuário:", error);
      return {};
    }
  },
};
