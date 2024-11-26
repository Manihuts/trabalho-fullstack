import axios from "axios";

const server = "http://localhost:5071";

export const InventarioServices = {


  async getByUsuario(usuarioId, token) {
    try {
      const response = await axios.get(`${server}/inventario/${usuarioId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao obter inventário:", error);
      throw error;
    }
  },

};
