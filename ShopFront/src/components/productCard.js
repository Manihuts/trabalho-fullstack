import React from "react";
import { Card, Button } from "react-bootstrap";
import { useAuth } from "../context/authContext";
import { OperacoesService } from "../services/operacoesServices";

const ProductCard = ({ product, isAdmin, handleEdit = null, isInventario }) => {
  const { authToken, user } = useAuth();  // Acessa diretamente o authToken (string) e user (objeto)

  const handleCompra = async () => {
    if (!authToken || !user) {
      alert("Você precisa estar logado para comprar!");
      return;
    }

    console.log("Tipo do user:", typeof user);  // Verifique que agora é 'object'
    console.log("Tipo do authToken:",typeof authToken);  // Isso vai ser 'string'
    console.log("User:", user);  // O objeto user
    console.log("user id ", user.Id);
    console.log("Product", product);

    const compraDto = {
      id: user.Id,  // Acessando diretamente o id do objeto user
      produtoId: product.id,
      quantidade: 1,
    };

    console.log("CompraDTO:", compraDto);

    try {
      await OperacoesService.comprarProduto(compraDto, authToken);  // Passando authToken diretamente
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
      usuarioId: user.id,  // Acessando diretamente a propriedade 'id' do objeto user
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
    <div style={{flex: 1}}>
      <Card
        className="mb-4"
        style={{
          flex: 1,
          alignItems: "center",
          width: "100%",
          height: "40rem",
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
              width: "80%",
              marginTop: 10,
              objectFit: "cover",
              borderRadius: "8px 8px 0 0",
            }}
          />
        
        <Card.Body style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Card.Title style={{ fontWeight: "bold", fontSize: "1.3rem", textAlign: "center" }}>
            {product.nome}
          </Card.Title>
          <Card.Text style={{ fontWeight: "bold" }}>
            Preço: <span style={{ color: "#ffc107" }}>R$ {product.preco}</span>
          </Card.Text>
          <Card.Text>
            <strong>Quantidade:</strong> {product.quantidade}
          </Card.Text>
          <Card.Text style={{ fontStyle: "italic", fontSize: "0.9rem" }}>{product.descricao}</Card.Text>
          <div style={{flex: 1, width: "100%", alignContent: "flex-end"}}>
            {isAdmin && (
              <Button variant="warning" onClick={handleEdit} className="w-100 mt-2 btn-block" >
                Editar Produto
              </Button>
            )}
            {!isInventario && (
              <Button variant="success" onClick={handleCompra} className="w-100 mt-2 btn-block" >
                Comprar
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
    
  );
};

export default ProductCard;
