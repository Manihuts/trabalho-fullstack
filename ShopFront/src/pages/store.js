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
      console.log(user);

      try {
        const productsData = await ProdutoService.getAll();
        setProducts(productsData);
        console.log("products data ", productsData, typeof productsData)
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleCreateProduct = () => {
    navigate("/create-product");
  };

  return (
    <Container>
      <h2 className="my-4" style={styles.title}>
        Loja de Produtos
      </h2>

      <Row className="g-6">
        {products.map((product) => (
          <Col xs={12} sm={6} md={4} lg={2} key={product.Id}>
            <ProductCard
              product={product}
              isAdmin={user?.Admin}
             // handleEdit={() => handleEditProduct(product.Id)}
              isInventario={false}
            />
          </Col>
        ))}
      </Row>

      <div
        style={{
          display: "flex",
          alignItems: "self",
          justifyContent: "center",
        }}
      >
        {user?.Admin && (
          <Col xs={12} sm={6} md={4} lg={2}>
            <Card
              className="h-100 d-flex justify-content-center align-items-center"
              style={{
                border: "2px solid #000",
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
      </div>
    </Container>
  );
};

const styles = {
  title: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#ede43b",
    textAlign: "center",
    webkitTextStrokeWidth: "2px",
    webkitTextStrokeColor: "#000",
  },
  scrollContainer: {
    overflowX: "auto",
    whiteSpace: "nowrap",
    paddingBottom: "1rem",
  },
  error: {
    fontSize: 24,
    color: "red",
  },
};

export default Store;
