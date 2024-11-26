import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useAuth } from "../context/authContext";
import { InventarioService } from "../services/inventarioServices";
const ItemCard = ({ item, isAdmin, handleEdit }) => {
  const { authToken, user } = useAuth();
  const [produto, setProduto] = useState(null);

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const produtoData = await InventarioService.getProdutoById(
          item.ProdutoId
        );
        setProduto(produtoData);
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
      }
    };

    fetchProduto();
  }, [item]);

  const handleVenda = async () => {
    if (!authToken || !user) {
      alert("Você precisa estar logado para vender!");
      return;
    }

    const userObject = JSON.parse(user);
    const userId = userObject.Id;

    if (item.Quantidade <= 0) {
      alert("Você não tem quantidade suficiente para vender!");
      return;
    }

    const vendaDto = {
      UsuarioId: userId,
      ProdutoId: item.ProdutoId,
      Quantidade: 1,
    };

    try {
      await InventarioService.venderProduto(vendaDto, authToken);
      alert("Venda realizada com sucesso!");
    } catch (error) {
      alert(
        "Erro ao realizar venda: " + (error.response?.data || error.message)
      );
    }
  };

  return produto ? (
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
          src={produto.imagem || "https://via.placeholder.com/150"}
          alt={produto.nome}
          style={{
            width: "80%",
            marginTop: 10,
            objectFit: "cover",
            borderRadius: "8px 8px 0 0",
          }}
        />

        <Card.Body
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Card.Title
            style={{
              fontWeight: "bold",
              fontSize: "1.3rem",
              textAlign: "center",
            }}
          >
            {produto.nome}
          </Card.Title>
          <Card.Text style={{ fontWeight: "bold" }}>
            Preço: <span style={{ color: "#ffc107" }}>R$ {produto.preco}</span>
          </Card.Text>
          <Card.Text>
            <strong>Quantidade em Estoque:</strong> {item.Quantidade}
          </Card.Text>
          <Card.Text style={{ fontStyle: "italic", fontSize: "0.9rem" }}>
            {produto.descricao}
          </Card.Text>
          <div style={{ flex: 1, width: "100%", alignContent: "flex-end" }}>
            {isAdmin && (
              <Button
                variant="warning"
                onClick={handleEdit}
                className="w-100 mt-2 btn-block"
              >
                Editar Item
              </Button>
            )}
            <Button
              variant="danger"
              onClick={handleVenda}
              className="w-100 mt-2 btn-block"
            >
              Vender
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  ) : (
    <div>Carregando produto...</div>
  );
};

export default ItemCard;
