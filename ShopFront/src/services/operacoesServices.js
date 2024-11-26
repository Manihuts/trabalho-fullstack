import createAxiosInstance from "./createAxiosInstance";


export const operacoesService = () => {
  
  const apiClient = createAxiosInstance();

  return {
    // Comprar produto
    comprarProduto: async (compraDto) => {
      try {
        const response = await apiClient.post(`/operacoes/comprar`, compraDto);
        return response.data; // { Mensagem: resultado }
      } catch (error) {
        console.error("Erro ao comprar produto:", error.response?.data || error.message);
        throw error;
      }
    },

    // Vender produto
    venderProduto: async (vendaDto) => {
      try {
        const response = await apiClient.post(`/operacoes/vender`, vendaDto);
        return response.data; // { Mensagem: resultado }
      } catch (error) {
        console.error("Erro ao vender produto:", error.response?.data || error.message);
        throw error;
      }
    },
  };
};
