import axios from "axios";

const server = "http://localhost:5071";

export const CarrinhoService = {

  async obterValorTotal(usuarioId, token) {
    try {
      const response = await axios.get(`${server}/carrinho/operacoes/total/${usuarioId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao obter valor total do carrinho:", error);
      throw error;
    }
  },


  async alterarItemCarrinho(usuarioId, itemDto, token) {
    try {
      const response = await axios.put(`${server}/carrinho/operacoes/alterar`, itemDto, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao alterar item no carrinho:", error);
      throw error;
    }
  },


  async finalizarCompra(usuarioId, token) {
    try {
      const response = await axios.post(`${server}/carrinho/operacoes/finalizar/${usuarioId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao finalizar compra:", error);
      throw error;
    }
  },
};
