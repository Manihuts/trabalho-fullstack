import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row, Card, Form, Button, Alert } from "react-bootstrap";
import { createInputHandler } from "../utils/formUtils";
import { AuthServices } from "../services/authServices";

const Register = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });
  const [error, setError] = useState("");
  const userInputHandler = createInputHandler(setUser, user);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      if (user.senha !== user.confirmarSenha) {
        setError("As senhas não coincidem.");
        return;
      }

      const { confirmarSenha, ...userData } = user;


      const payload = {
        ...userData,
        id: "", 
        admin: false, 
        saldo: 1000, 
        carrinho: [], 
      };

      await AuthServices.register(payload);

      alert("Registro bem-sucedido!");
    } catch (error) {
      console.error("Erro ao registrar usuário:", error.response?.data || error.message);
      setErrorMessage("Falha ao registrar. Verifique os dados e tente novamente.");
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
                  {errorMessage && (
                    <Alert variant="danger" className="mb-3">
                      {errorMessage}
                    </Alert>
                  )}
                  {error && (
                    <Alert variant="danger" className="mb-3">
                      {error}
                    </Alert>
                  )}
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Nome"
                      value={user.nome}
                      name="nome"
                      onChange={userInputHandler}
                    />
                  </Form.Group>
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
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="password"
                      placeholder="Confirmação de Senha"
                      name="confirmarSenha"
                      value={user.confirmarSenha}
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
