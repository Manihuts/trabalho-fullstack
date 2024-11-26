import createAxiosInstance from "./createAxiosInstance";

export const authServices = () => {
  const apiClient = createAxiosInstance();

  return {
    // Método de login
    login: async (email, senha) => {
      try {
        const response = await apiClient.post("/auth/login", { email, senha });

        // Captura o token retornado
        const { token } = response.data;

        // Decodifica o token JWT para extrair os dados do usuário
        const user = authService().decodeToken(token);

        return { token, user };
      } catch (error) {
        console.error(
          "Erro ao realizar login:",
          error.response?.data || error.message
        );
        throw error;
      }
    },

    // Método para registrar um usuário
    register: async (email, senha, nome) => {
      try {
        const response = await apiClient.post("/auth/register", {
          email,
          senha,
          nome,
        });
        return response.data; // Dados do usuário criado
      } catch (error) {
        console.error(
          "Erro ao registrar usuário:",
          error.response?.data || error.message
        );
        throw error;
      }
    },

    // Método para decodificar o token JWT
    decodeToken: (token) => {
      try {
        const payloadBase64 = token.split(".")[1]; // A parte do payload no JWT
        const decodedPayload = JSON.parse(atob(payloadBase64)); // Decodifica de Base64 para JSON
        return decodedPayload.UsuarioDTO; // Retorna o campo `UsuarioDTO` armazenado no payload
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
        throw error;
      }
    },
  };
};
