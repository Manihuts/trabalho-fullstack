import axios from "axios";

const server = "http://localhost:5071";

export const ProdutoService = {

  async getAll() {
    try {
      const response = await axios.get(`${server}/produtos`);
      return response.data;
    } catch (error) {
      console.error("Erro ao obter produtos:", error);
      throw error;
    }
  },


  async getById(id) {
    try {
      console.log("Id e o tipo do id do produto buscado: ", id, typeof id)
      const response = await axios.get(`${server}/produtos/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao obter produto:", error);
      throw error;
    }
  },


  async create(data, token) {
    try {
      const response = await axios.post(`${server}/produtos`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      throw error;
    }
  },


  async update(id, data, token) {
    try {
      const response = await axios.put(`${server}/produtos/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      throw error;
    }
  },


  async delete(id, token) {
    try {
      const response = await axios.delete(`${server}/produtos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
      throw error;
    }
  },
};
