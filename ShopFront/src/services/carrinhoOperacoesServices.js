import createAxiosInstance from "./createAxiosInstance";


export const carrinhoServices = () => {
  const apiClient = createAxiosInstance();


  return {
    // Obter o valor total do carrinho do usuário
    getTotal: async (usuarioId) => {
      try {
        const response = await apiClient.get(`/carrinho/operacoes/total/${usuarioId}`);
        return response.data; // { Total: valor }
      } catch (error) {
        console.error(`Erro ao obter o valor total do carrinho para o usuário ${usuarioId}:`, error.response?.data || error.message);
        throw error;
      }
    },

    // Alterar itens do carrinho (adicionar ou diminuir quantidade ou remover)
    alterarItem: async (usuarioId, item) => {
      try {
        const response = await apiClient.put(`/carrinho/operacoes/alterar`, { usuarioId, ...item });
        return response.data; // Resultado da operação
      } catch (error) {
        console.error(`Erro ao alterar item do carrinho para o usuário ${usuarioId}:`, error.response?.data || error.message);
        throw error;
      }
    },

    // Finalizar a compra de todos os itens do carrinho
    finalizarCompra: async (usuarioId) => {
      try {
        const response = await apiClient.post(`/carrinho/operacoes/finalizar/${usuarioId}`);
        return response.data; // Resultado da finalização
      } catch (error) {
        console.error(`Erro ao finalizar a compra para o usuário ${usuarioId}:`, error.response?.data || error.message);
        throw error;
      }
    },
  };
};
