import React, { useEffect, useRef } from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { useAuth } from "../context/authContext";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  const { authToken, user, login, logout } = useAuth();
  const headerRef = useRef();

  useEffect(() => {
    const adjustScale = () => {
      const scale = 1 / window.devicePixelRatio; 
      if (headerRef.current) {
        headerRef.current.style.transform = `scale(${scale})`;
        headerRef.current.style.transformOrigin = "0 0";
        headerRef.current.style.width = '100%';
        headerRef.current.style.height = `${70}px`; 
      }
    };

    adjustScale(); 
    window.addEventListener("resize", adjustScale); 

    return () => window.removeEventListener("resize", adjustScale);
  }, []);

  return (
    <Navbar
      ref={headerRef}
      expand="lg"
      variant="dark"
      style={{
        backgroundColor: "#343a40", 
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000, 
        overflow: "hidden", 
      }}
    >
      <Container>
        <Navbar.Brand href="#">Minha Loja</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!authToken ? (
              <Button
                variant="light"
                onClick={() => login("fake-token", { name: "João" })}
              >
                Login
              </Button>
            ) : (
              <>
                <Nav.Link>Bem-vindo, {user?.name || "Usuário"}!</Nav.Link>
                <Button variant="outline-light" onClick={logout}>
                  Logout
                </Button>
                <Nav.Link href="#carrinho">
                  <img
                    src={
                      user?.cartItems > 0
                        ? "/assets/carrinho_com_items.png"
                        : "/assets/carrinho_sem_items.png"
                    }
                    alt="Carrinho"
                    style={{ width: "30px", height: "30px" }}
                  />
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
