import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row, Card, Form, Button } from "react-bootstrap";
import { createInputHandler } from "../utils/formUtils";
import { AuthServices } from "../services/authServices";
import { useAuth } from "../context/authContext";

const Login = () => {
  const [user, setUser] = useState({ email: "", senha: "" });
  const userInputHandler = createInputHandler(setUser, user);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { token, usuarioDTO } = await AuthServices.login(user);
      login(token, usuarioDTO);
      navigate("/store");
    } catch (error) {
      console.error("Erro ao fazer login:", error.message || error);
      alert("Login falhou. Verifique suas credenciais.");
    }
  };
  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <Container
      className="fluid mt-3 d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", minWidth: "100vw" }}
    >
      <Row>
        <Col xs={10} sm={10} md={10} lg={10} xl={10}>
          <Card className="shadow-lg">
            <Card.Header
              className="p-3 d-flex justify-content-center align-items-center"
              style={{ backgroundColor: "lightgray" }}
            >
              Login
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="E-mail"
                    value={user.email}
                    name="email"
                    onChange={userInputHandler}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="password"
                    placeholder="Senha"
                    name="senha"
                    value={user.senha}
                    onChange={userInputHandler}
                  />
                </Form.Group>
                <Form.Group className="mb-3 d-flex justify-content-center align-items-center">
                  <Button
                    variant="secondary"
                    className="w-75"
                    onClick={handleLogin}
                  >
                    Entrar
                  </Button>
                </Form.Group>
                <Form.Group className="mb-3 d-flex justify-content-center align-items-center">
                  <Button
                    variant="secondary"
                    className="w-75"
                    onClick={handleRegister}
                  >
                    Cadastrar
                  </Button>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
