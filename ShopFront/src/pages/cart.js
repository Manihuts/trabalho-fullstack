import React, { useState, useEffect } from "react";
import { Container, Row, Button } from "react-bootstrap";
import ProductCard from "./ProductCard";

const Cart = ({ cartItems, setCartItems }) => {
  const [totalPrice, setTotalPrice] = useState(0);


  useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.Preco * item.Quantidade,
      0
    );
    setTotalPrice(total);
  }, [cartItems]);


  const handleDelete = (productId) => {
    const updatedCart = cartItems.filter((item) => item.Id !== productId);
    setCartItems(updatedCart);
  };


  const handleIncreaseQuantity = (productId) => {
    const updatedCart = cartItems.map((item) =>
      item.Id === productId
        ? { ...item, Quantidade: item.Quantidade + 1 }
        : item
    );
    setCartItems(updatedCart);
  };

  return (
    <Container>
      <h2 className="my-4">Meu Carrinho</h2>
      <Row>
        {cartItems.map((item) => (
          <ProductCard
            key={item.Id}
            product={item}
            handleDelete={() => handleDelete(item.Id)}
            handleIncreaseQuantity={() => handleIncreaseQuantity(item.Id)}
          />
        ))}
      </Row>
      <div className="d-flex justify-content-between align-items-center mt-4">
        <h4>Total: R$ {totalPrice.toFixed(2)}</h4>
        <Button variant="success" disabled={cartItems.length === 0}>
          Finalizar Compra
        </Button>
      </div>
    </Container>
  );
};

export default Cart;
