import createAxiosInstance from "./createAxiosInstance";


export const produtoService = () => {
  
  const apiClient = createAxiosInstance();
  
  return {
    // Buscar todos os produtos
    getAll: async () => {
      try {
        const response = await apiClient.get("/produtos");
        return response.data;
      } catch (error) {
        console.error("Erro ao buscar todos os produtos:", error.response?.data || error.message);
        throw error;
      }
    },

    // Buscar um produto pelo ID
    getById: async (id) => {
      try {
        const response = await apiClient.get(`/produtos/${id}`);
        return response.data;
      } catch (error) {
        console.error(`Erro ao buscar o produto com ID ${id}:`, error.response?.data || error.message);
        throw error;
      }
    },

    // Criar um novo produto
    create: async (product) => {
      try {
        const response = await apiClient.post("/produtos", product);
        return response.data;
      } catch (error) {
        console.error("Erro ao criar o produto:", error.response?.data || error.message);
        throw error;
      }
    },

    // Atualizar um produto pelo ID
    update: async (id, product) => {
      try {
        const response = await apiClient.put(`/produtos/${id}`, product);
        return response.data;
      } catch (error) {
        console.error(`Erro ao atualizar o produto com ID ${id}:`, error.response?.data || error.message);
        throw error;
      }
    },

    // Excluir um produto pelo ID
    delete: async (id) => {
      try {
        const response = await apiClient.delete(`/produtos/${id}`);
        return response.data;
      } catch (error) {
        console.error(`Erro ao excluir o produto com ID ${id}:`, error.response?.data || error.message);
        throw error;
      }
    },
  };
};
