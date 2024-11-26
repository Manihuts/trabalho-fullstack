import React from "react";
import { Card, Button } from "react-bootstrap";

const ProductCard = ({ product, isAdmin, handleEdit }) => {
  return (
    <Card className="mb-4">
      <Card.Img
        variant="top"
        src={product.Image || "https://via.placeholder.com/150"}
        alt={product.Name}
      />
      <Card.Body>
        <Card.Title>{product.Name}</Card.Title>
        <Card.Text>
          <strong>Preço:</strong> R$ {product.Price}
        </Card.Text>
        <Card.Text>{product.Description}</Card.Text>
        {/* Botão de edição visível apenas para admins */}
        {isAdmin && (
          <Button
            variant="warning"
            onClick={handleEdit}
            className="w-100 mt-2"
          >
            Editar Produto
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
