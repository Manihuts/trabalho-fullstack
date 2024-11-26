import React from "react";
import { Card, Button } from "react-bootstrap";
import { useAuth } from "../context/authContext";
import { OperacoesService } from "../services/operacoesServices";

const ProductCard = ({ product, isAdmin, handleEdit }) => {
  const { authToken, user } = useAuth();
  const token = JSON.parse(authToken);
  const userData  = JSON.parse(user)
  const handleCompra = async () => {
    if (!authToken || !user) {
      alert("Você precisa estar logado para comprar!");
      return;
    }
    console.log(typeof user)
    console.log(typeof authToken)
    console.log("User:",user)
    console.log("user id " , user.Id)
    console.log("Product",product)
    const compraDto = {
      id: userData.Id,
      produtoId: product.id,
      quantidade: 1,
    };
    console.log("CompraDTO:",compraDto)
    console.log(authToken)
    try {
      await OperacoesService.comprarProduto(compraDto, token);
      alert("Compra realizada com sucesso!");
    } catch (error) {
      alert("Erro ao realizar compra: " + (error.response?.data || error.message));
    }
  };

  const handleAddCarrinho = async () => {
    if (!authToken || !user) {
      alert("Você precisa estar logado para adicionar ao carrinho!");
      return;
    }

    const itemDto = {
      usuarioId: user.id,
      produtoId: product.id,
      quantidade: 1,
    };

    try {
      alert("Produto adicionado ao carrinho com sucesso!");
    } catch (error) {
      alert("Erro ao adicionar ao carrinho: " + (error.response?.data || error.message));
    }
  };

  return (
    <Card
      className="mb-4"
      style={{
        width: "18rem",
        backgroundColor: "#2c2c2c",
        color: "white",
        borderRadius: "8px",
      }}
    >
      <Card.Img
        variant="top"
        src={product.imagem || "https://via.placeholder.com/150"}
        alt={product.nome}
        style={{
          width: "100%",
          height: "auto",
          padding:10,
          objectFit: "cover",
          borderRadius: "8px 8px 0 0",
        }}
      />
      <Card.Body>
        <Card.Title style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
          {product.nome}
        </Card.Title>
        <Card.Text style={{ fontWeight: "bold" }}>
          Preço: <span style={{ color: "#ffc107" }}>R$ {product.preco}</span>
        </Card.Text>
        <Card.Text>
          <strong>Quantidade:</strong> {product.quantidade}
        </Card.Text>
        <Card.Text style={{ fontStyle: "italic" }}>{product.descricao}</Card.Text>
        {isAdmin && (
          <Button variant="warning" onClick={handleEdit} className="w-100 mt-2">
            Editar Produto
          </Button>
        )}
        <Button variant="success" onClick={handleCompra} className="w-100 mt-2">
          Comprar
        </Button>
        <Button variant="primary" onClick={handleAddCarrinho} className="w-100 mt-2">
          Adicionar ao Carrinho
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
