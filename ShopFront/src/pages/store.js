import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import ProductCard from "../components/productCard";
import { produtoService } from "../services/produtoService"; // Service ajustado
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Store = () => {
  const [products, setProducts] = useState([]);
  const { user } = useAuth(); // Pega informações do usuário autenticado
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const service = produtoService();
        const productsData = await service.getAll();
        setProducts(productsData); // Atualiza o estado com os produtos
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleCreateProduct = () => {
    navigate("/edit-product"); // Redireciona para a rota de criação/edição de produto
  };

  const handleEditProduct = (productId) => {
    navigate(`/edit-product/${productId}`); // Redireciona para a rota de edição com o ID do produto
  };

  return (
    <Container>
      <h2 className="my-4">Loja</h2>
      <Row>
        {/* Card adicional para criar produto, visível apenas para admins */}
        {user?.admin && (
          <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card
              className="h-100 d-flex justify-content-center align-items-center"
              style={{ border: "2px dashed gray" }}
            >
              <Card.Body>
                <Button
                  variant="success"
                  onClick={handleCreateProduct}
                  style={{ width: "100%" }}
                >
                  Registrar Produto
                </Button>
              </Card.Body>
            </Card>
          </Col>
        )}

        {/* Renderiza os produtos */}
        {products.map((product) => (
          <ProductCard
            key={product.Id}
            product={product}
            isAdmin={user?.admin} // Passa flag para o card de produto
            handleEdit={() => handleEditProduct(product.Id)} // Redireciona para edição
          />
        ))}
      </Row>
    </Container>
  );
};

export default Store;
