import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row, Card, Form, Button } from "react-bootstrap";
import { createInputHandler } from "../utils/formUtils";
import { authServices } from "../services/authServices";

const Register = () => {
  const [user, setUser] = useState({
    userEmail: "",
    userPassword: "",
    userName: "",
  });
  const userInputHandler = createInputHandler(setUser, user);
  const navigate = useNavigate();
  const service = authServices();

  const handleRegister = async () => {
    try {
      await service.register(user.userEmail, user.userPassword, user.userName);

      navigate("/login", {
        state: { email: user.userEmail, password: user.userPassword },
      });
    } catch (error) {
      console.error(
        "Erro ao registrar usuário:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <>
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
                Registrar
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Nome"
                      value={user.userName}
                      name="userName"
                      onChange={userInputHandler}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="email"
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
                      variant="success"
                      className="w-75"
                      onClick={handleRegister}
                    >
                      Registrar
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

export default Register;
