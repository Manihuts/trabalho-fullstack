import React from "react";
import { Col, Card, Button } from "react-bootstrap";

const ProductCard = ({
  product,
  handleDelete,
  handleIncreaseQuantity,
  isCartContext,
  isAdmin,
  handleEdit,
}) => {
  return (
    <Col
      xs={10}
      sm={6}
      md={4}
      lg={3}
      xl={3}
      className="mb-4 d-flex justify-content-center"
    >
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={product.productImage} />
        <Card.Body>
          <Card.Title>{product.Nome}</Card.Title>
          <Card.Title>R$ {product.Preco.toFixed(2)}</Card.Title>
          <Card.Text>{product.Descricao}</Card.Text>
          <Card.Text>Quantidade: {product.Quantidade}</Card.Text>
          {isCartContext ? (
            <div className="d-flex justify-content-between">
              <Button
                variant="danger"
                onClick={handleDelete}
                style={{ marginRight: "0.5rem" }}
              >
                Remover
              </Button>
              <Button variant="primary" onClick={handleIncreaseQuantity}>
                +1
              </Button>
            </div>
          ) : isAdmin ? (
            <Button variant="warning" onClick={handleEdit}>
              Editar Produto
            </Button>
          ) : null}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ProductCard;
