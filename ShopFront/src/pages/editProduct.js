// import React, { useState, useEffect } from "react";
// import { Col, Container, Row, Card, Form, Button } from "react-bootstrap";
// import { createInputHandler } from "../utils/formUtils";
// import { updateProduct, deleteProduct } from "../services/appServices";
// import { useLocation } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// const EditProduct = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { product } = location.state || {};
//   const [productData, setProductData] = useState({
//     Nome: product?.Nome || "",
//     Preco: product?.Preco || "",
//     Quantidade: product?.Quantidade || "",
//     Descricao: product?.Descricao || "",
//     Imagem: product?.Imagem || "",
//   });

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await updateProduct({
//         id: product.Id,
//         ...productData,
//       });
//       console.log("Produto atualizado com sucesso:", response.data);
//       navigate("/store", { state: { refresh: true } });
//     } catch (error) {
//       console.error("Erro ao atualizar produto:", error);
//     }
//   };

//   const productHandler = createInputHandler(setProductData, productData);
//   const handleDelete = async () => {
//     try {
//       await deleteProduct(product.Id);
//       console.log("Produto excluído com sucesso");
//       navigate("/store", { state: { refresh: true } });
//     } catch (error) {
//       console.log(product.Id);
//       console.error("Erro ao excluir produto:", error);
//     }
//   };

//   return (
//     <>
//       <Container
//         className="fluid mt-3 d-flex justify-content-center align-items-center"
//         style={{ minHeight: "100vh", minWidth: "100vw" }}
//       >
//         <Row>
//           <Col xs={10} sm={10} md={10} lg={10} xl={10}>
//             <Card className="shadow-lg">
//               <Card.Header
//                 className="p-3 d-flex justify-content-center align-items-center"
//                 style={{ backgroundColor: "lightgray" }}
//               >
//                 Editar Produto
//               </Card.Header>
//               <Card.Body>
//                 <Form>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Nome do produto</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="Nome do produto"
//                       value={productData.Nome}
//                       name="Nome"
//                       onChange={productHandler}
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Valor do produto</Form.Label>
//                     <Form.Control
//                       type="number"
//                       min="1"
//                       placeholder="Valor do produto"
//                       value={productData.Preco}
//                       name="Preco"
//                       onChange={productHandler}
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Descrição</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="Descrição do produto"
//                       value={product.Descricao}
//                       name="Descricao"
//                       onChange={productHandler}
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Imagem do produto</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="Link da imagem"
//                       value={product.Imagem}
//                       name="Imagem"
//                       onChange={productHandler}
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Quantidade</Form.Label>
//                     <Form.Control
//                       type="number"
//                       min="1"
//                       placeholder="Quantidade"
//                       value={productData.Quantidade}
//                       name="Quantidade"
//                       onChange={productHandler}
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3 d-flex justify-content-center align-items-center ">
//                     <Button
//                       variant="success"
//                       type="submit"
//                       className="w-75"
//                       onClick={handleSubmit}
//                     >
//                       Salvar
//                     </Button>
//                   </Form.Group>
//                   <Form.Group className="mb-3 d-flex justify-content-center align-items-center">
//                     <Button
//                       variant="secondary"
//                       className="w-75"
//                       onClick={() => navigate("/home")}
//                     >
//                       Cancelar
//                     </Button>
//                   </Form.Group>
//                   <Form.Group className="mb-3 d-flex justify-content-center align-items-center">
//                     <Button
//                       variant="danger"
//                       className="w-75"
//                       onClick={handleDelete}
//                     >
//                       Excluir
//                     </Button>
//                   </Form.Group>
//                 </Form>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default EditProduct;
