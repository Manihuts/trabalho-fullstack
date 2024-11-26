import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row, Card, Form, Button } from "react-bootstrap";
import { createInputHandler } from "../utils/formUtils";
import { authServices } from "../services/authServices";
import { useAuth } from "../context/authContext"; 

const Login = () => {
  const [user, setUser] = useState({ userEmail: "", userPassword: "" });
  const userInputHandler = createInputHandler(setUser, user);
  const { login } = useAuth(); 
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const service = authServices();
      const { token, user: userData } = await service.login(
        user.userEmail,
        user.userPassword
      );


      login(token, userData);


      navigate("/store");
    } catch (error) {
      console.error("Erro ao fazer login:", error.message || error);
      alert("Login falhou. Verifique suas credenciais.");
    }
  };

  return (
    <>
      <Container
        className="fluid mt-3 d-flex justify-content-center align-items-center overflow-hidden"
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
                      type="text"
                      placeholder="E-mail"
                      value={user.userEmail}
                      name="userEmail"
                      onChange={userInputHandler}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="password"
                      placeholder="Senha"
                      name="userPassword"
                      value={user.userPassword}
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
                      onClick={navigate("/register")}
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
    </>
  );
};

export default Login;
