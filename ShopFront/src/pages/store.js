import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import ProductCard from "../components/productCard";
import { ProdutoService } from "../services/produtoService";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Store = () => {
  const [products, setProducts] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await ProdutoService.getAll();
        setProducts(productsData);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleCreateProduct = () => {
    navigate("/edit-product");
  };

  const handleEditProduct = (productId) => {
    navigate(`/edit-product/${productId}`);
  };

  return (
    <Container>
      <h2
        className="my-4"
        style={{ fontWeight: "bold", color: "#ffc107", textAlign: "center" }}
      >
        Loja de Produtos
      </h2>
      <Row className="g-6">
        {user?.admin && (
          <Col xs={12} sm={6} md={4} lg={3}>
            <Card
              className="h-100 d-flex justify-content-center align-items-center"
              style={{
                border: "2px dashed gray",
                backgroundColor: "#2c2c2c",
                color: "white",
              }}
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
        {products.map((product) => (
          <Col xs={12} sm={6} md={4} lg={2} key={product.Id}>
            <ProductCard
              product={product}
              isAdmin={user?.Admin}
              handleEdit={() => handleEditProduct(product.Id)}
              isInventario={false}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Store;