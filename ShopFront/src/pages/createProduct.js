import React, { useState } from "react";
import { Col, Container, Row, Card, Form, Button } from "react-bootstrap";
import { createInputHandler } from "../utils/formUtils";
import { ProdutoService } from "../services/produtoService"; 
import { useNavigate } from "react-router-dom";
import {useAuth} from "../context/authContext"
const CreateProduct = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        Nome: "",
        Preco: "",
        Descricao: "",
        Quantidade: "",
        Imagem: "",
    });
    const {authToken, user} = useAuth();
    const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 


  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); 
    try {
      const token = authToken; 
      const response = await ProdutoService.create(product, token); 
      console.log("Produto criado com sucesso:", response);
      navigate("/dashboard", { state: { refresh: true } }); 
    } catch (error) {
      setError("Erro ao criar produto. Tente novamente.");
      console.error("Erro ao criar produto:", error);
    } finally {
      setLoading(false);
    }
  };

  const productHandler = createInputHandler(setProduct, product); 
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
                Cadastrar Produto
              </Card.Header>
              <Card.Body>
                {error && <p className="text-danger">{error}</p>} 
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Nome do produto</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nome do produto"
                      value={product.Nome}
                      name="Nome"
                      onChange={productHandler}
                      disabled={loading}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Descrição do produto"
                      value={product.Descricao}
                      name="Descricao"
                      onChange={productHandler}
                      disabled={loading} 
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Imagem do produto</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Link da imagem"
                      value={product.Imagem}
                      name="Imagem"
                      onChange={productHandler}
                      disabled={loading} 
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Valor do produto</Form.Label>
                    <Form.Control
                      type="number"
                      min="1"
                      placeholder="Valor do produto"
                      value={product.Preco}
                      name="Preco"
                      onChange={productHandler}
                      disabled={loading} 
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Quantidade</Form.Label>
                    <Form.Control
                      type="number"
                      min="1"
                      placeholder="Quantidade"
                      value={product.Quantidade}
                      name="Quantidade"
                      onChange={productHandler}
                      disabled={loading} 
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 d-flex justify-content-center align-items-center">
                    <Button
                      variant="success"
                      type="submit"
                      className="w-75"
                      onClick={handleSubmit}
                      disabled={loading} 
                    >
                      {loading ? "Criando..." : "Cadastrar"}
                    </Button>
                  </Form.Group>

                  <Form.Group className="mb-3 d-flex justify-content-center align-items-center">
                    <Button variant="secondary" className="w-75" onClick={() => navigate("/home")}>
                      Cancelar
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

export default CreateProduct;
