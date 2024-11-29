import React, { useState, useEffect } from "react";
import { Col, Container, Row, Card, Form, Button } from "react-bootstrap";
import { createInputHandler } from "../utils/formUtils"; 
import { ProdutoService } from "../services/produtoService"; 
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {useAuth} from "../context/authContext"
const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const {authToken} = useAuth();
  const [productData, setProductData] = useState({
    Nome: "",
    Preco: "",
    Quantidade: "",
    Descricao: "",
    Imagem: "",
    Id:"", 
  });
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {

        const product = await ProdutoService.getById(id); 
        console.log("produto buscado: ", product, typeof product)
        setProductData({
          Nome: product.nome,
          Preco: product.preco,
          Quantidade:product.quantidade,
          Descricao: product.descricao,
          Imagem: product.imagem,
          Id:product.id
        });
      } catch (error) {
        setError("Erro ao carregar dados do produto.");
        console.error("Erro ao carregar produto:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const productHandler = createInputHandler(setProductData, productData); 
  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true); 

    try {

      const response = await ProdutoService.update(productData.Id, productData,authToken )
      console.log("Produto atualizado com sucesso:", response);
      navigate("/store", { state: { refresh: true } });
    } catch (error) {
      setError("Erro ao atualizar produto. Tente novamente.");
      console.error("Erro ao atualizar produto:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await ProdutoService.delete(productData.Id, authToken);
      console.log("Produto excluído com sucesso");
      navigate("/store", { state: { refresh: true } });
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container className="fluid mt-3 d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", minWidth: "100vw" }}>
        <Row>
          <Col xs={10} sm={10} md={10} lg={10} xl={10}>
            <Card className="shadow-lg">
              <Card.Header className="p-3 d-flex justify-content-center align-items-center" style={{ backgroundColor: "lightgray" }}>
                Editar Produto
              </Card.Header>
              <Card.Body>
                {error && <p className="text-danger">{error}</p>}
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Nome do produto</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nome do produto"
                      value={productData.Nome}
                      name="Nome"
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
                      value={productData.Preco}
                      name="Preco"
                      onChange={productHandler}
                      disabled={loading} 
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Descrição do produto"
                      value={productData.Descricao}
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
                      value={productData.Imagem}
                      name="Imagem"
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
                      value={productData.Quantidade}
                      name="Quantidade"
                      onChange={productHandler}
                      disabled={loading} 
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 d-flex justify-content-center align-items-center">
                    <Button variant="success" type="submit" className="w-75" onClick={handleSubmit} disabled={loading}>
                      {loading ? "Atualizando..." : "Salvar"}
                    </Button>
                  </Form.Group>
                  <Form.Group className="mb-3 d-flex justify-content-center align-items-center">
                    <Button variant="secondary" className="w-75" onClick={() => navigate("/store")}>
                      Cancelar
                    </Button>
                  </Form.Group>
                  <Form.Group className="mb-3 d-flex justify-content-center align-items-center">
                    <Button variant="danger" className="w-75" onClick={handleDelete} disabled={loading}>
                      {loading ? "Excluindo..." : "Excluir"}
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

export default EditProduct;
