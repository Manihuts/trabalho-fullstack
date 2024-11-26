import React from "react";
import { Card, Button } from "react-bootstrap";
import { useAuth } from "../context/authContext";
import { OperacoesService } from "../services/operacoesServices";

const ProductCard = ({ product, isAdmin, handleEdit }) => {
  const { authToken, user } = useAuth();


  const handleCompra = async () => {
    if (!authToken || !user) {
      alert("Você precisa estar logado para comprar!");
      return;
    }


    const userObject = JSON.parse(user);  


    const userId = userObject.Id; 
    console.log('Tipo do user ', typeof user);
    console.log(user);

  
    const compraDto = {
      UsuarioId: userId, 
      ProdutoId: Number(product.id),  
      Quantidade: 1,  
    };


    console.log("Tipo compraDto:", typeof compraDto);
    console.log("Tipo userObject:", typeof userObject);
    console.log("Tipo do authToken:", typeof authToken);
    console.log("id usuario (compraDto.UsuarioId):", compraDto.UsuarioId);
    console.log("id usuario (userObject.Id):", userId);


    const logCompraDtoTypes = (compraDto) => {
      console.log("Tipo de id (UsuarioId):", typeof compraDto.UsuarioId);
      console.log("Tipo de produtoId:", typeof compraDto.ProdutoId);
      console.log("Tipo de quantidade:", typeof compraDto.Quantidade);

      if (typeof compraDto.UsuarioId !== 'string') {
        console.error("Erro: id (UsuarioId) deve ser uma string!");
      }

      if (typeof compraDto.ProdutoId !== 'number') {
        console.error("Erro: produtoId deve ser um número!");
      }

      if (typeof compraDto.Quantidade !== 'number') {
        console.error("Erro: quantidade deve ser um número!");
      }
    };


    logCompraDtoTypes(compraDto);

    try {

      await OperacoesService.comprarProduto(compraDto, authToken);
      alert("Compra realizada com sucesso!");
    } catch (error) {

      alert("Erro ao realizar compra: " + (error.response?.data || error.message));
    }
  };

  return (
    <div style={{ flex: 1 }}>
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
          <div style={{ flex: 1, width: "100%", alignContent: "flex-end" }}>
            {isAdmin && (
              <Button variant="warning" onClick={handleEdit} className="w-100 mt-2 btn-block">
                Editar Produto
              </Button>
            )}
            <Button variant="success" onClick={handleCompra} className="w-100 mt-2 btn-block">
              Comprar
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
  
};

export default ProductCard;
