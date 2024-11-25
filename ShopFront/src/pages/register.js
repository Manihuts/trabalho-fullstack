// import React, { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Col, Container, Row, Card, Form, Button } from "react-bootstrap";
// import { createInputHandler } from "../utils/formUtils";
// import { AuthContext } from "../context/authContext";


// const Register = () => {
//   const [user, setUser] = useState({ userEmail: "", userPassword: "" });
//   const userInputHandler = createInputHandler(setUser, user);
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogin = async (user) => {
//     try {
//       const response = await login(user);
//       const { token, user: userData } = response.data.data;
//       login(token, userData);
//       navigate("/store");
//     } catch (error) {
//       console.error("Erro ao fazer login:", error);
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
//                 Login
//               </Card.Header>
//               <Card.Body>
//                 <Form>
//                   <Form.Group className="mb-3">
//                     <Form.Control
//                       type="text"
//                       placeholder="E-mail"
//                       value={user.userEmail}
//                       name="userEmail"
//                       onChange={userInputHandler}
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Control
//                       type="password"
//                       placeholder="Senha"
//                       name="userPassword"
//                       value={user.userPassword}
//                       onChange={userInputHandler}
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3 d-flex justify-content-center align-items-center">
//                     <Button variant="secondary" className="w-75" onClick={() => handleLogin({ ...user })}>
//                       Entrar
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

// export default Register;