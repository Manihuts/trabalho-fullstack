import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import ProductCard from "./ProductCard";
import { fetchProducts } from "../services/appServices"; 
import { useAuth } from "../context/authContext";

const Store = () => {
  const [products, setProducts] = useState([]);
  const { user } = useAuth(); 


  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetchProducts(); 
        setProducts(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };
    getProducts();
  }, []);


  const handleCreateProduct = () => {
    console.log("Navegar para a página de criação de produto");

  };

  return (
    <Container>
      <h2 className="my-4">Loja</h2>
      <Row>
   
        {user.admin && (
          <Col xs={10} sm={6} md={4} lg={3} xl={3} className="mb-4">
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
                  Criar Produto
                </Button>
              </Card.Body>
            </Card>
          </Col>
        )}

        {products.map((product) => (
          <ProductCard
            key={product.Id}
            product={product}
            isCartContext={false} 
            isAdmin={user.admin} 
            handleEdit={() =>
              console.log("Editar Produto:", product) 
            }
          />
        ))}
      </Row>
    </Container>
  );
};

export default Store;
