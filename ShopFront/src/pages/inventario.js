import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ProductCard from "../components/productCard.js";
import { useAuth } from "../context/authContext.js";
import { InventarioServices } from "../services/inventarioServices.js";
import { ProdutoService } from "../services/produtoService.js";

const Inventario = () => {
    const [inventario, setInventario] = useState([]);
    const [error, setError] = useState("");
    const { user, authToken } = useAuth();

    const fetchInventario = async () => {
        setError("");
        
        try {
            const inventarioData = await InventarioServices.getByUsuario(user.Id, authToken);
            console.log(inventarioData);
            
            const novoInventario = await Promise.all(
                inventarioData.map(async (item) => {
                    const produtoData = await ProdutoService.getById(item.produtoId);
                    return {
                        ...item,
                        id: produtoData.id, 
                        nome: produtoData.nome,
                        descricao: produtoData.descricao,
                        quantidade: item.quantidade,
                        preco: produtoData.preco,
                        imagem: produtoData.imagem,
                    }
                })
            );
            
            console.log('Novo inventário:', novoInventario);

            setInventario(novoInventario);
        } catch (error) {
            console.error("Erro buscando inventário: ", error);
            setError(error);
        }
    };

    useEffect(() => {
        fetchInventario();
    },[]);

    return (
        <Container>
            <h2 className="my-4" style={styles.title}>
                Inventário
            </h2>
            
            <div style={styles.scrollContainer} className="d-flex">
                <Row className="g-6 scrollContainer">
                    {inventario?.map((item) => (
                        <Col xs={12} sm={6} md={4} lg={3} key={item.Id}>
                            <ProductCard
                                product={item}
                                isAdmin={user?.Admin}
                                isInventario={true}
                            />
                        </Col>
                    ))}
                </Row>
            </div>

            {error ? <h3 style={styles.error}>{error}</h3> : ""}
        </Container>
    )
}

const styles = {
    title: {
      fontWeight: "bold",
      fontSize: 50,
      color: "#ede43b",
      textAlign: "center",
      webkitTextStrokeWidth: "2px",
      webkitTextStrokeColor: "#000",
    },
    scrollContainer: {
        display: "flex",
        overflowX: "auto",
        gap: "1rem",
        padding: "1rem",
    },
    error: {
        fontSize: 24,
        color: "red"
    }
};

export default Inventario;