import axios from "axios";

const server = "http://localhost:5071";


export const OperacoesService = {

  async comprarProduto(compraDto, token) {
    try {
      console.log("Compraproduto token ", token, typeof token )
      console.log("compra dto", compraDto)
      const response = await axios.post(`${server}/operacoes/comprar`, compraDto, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao comprar produto:", error);
      throw error;
    }
  },

  async venderProduto(vendaDto, token) {
    try {
      const response = await axios.post(`${server}/operacoes/vender`, vendaDto, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao vender produto:", error);
      throw error;
    }
  },
};
