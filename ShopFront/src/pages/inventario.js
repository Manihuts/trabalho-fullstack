import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
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
            <h2 className="my-4" style={{ fontWeight: "bold", color: "#ffc107", textAlign: "center" }}>
                Inventário
            </h2>
            
            <Row className="g-6">
                {inventario?.map((item) => (
                    <Col xs={12} sm={6} md={4} lg={2} key={item.Id}>
                        <ProductCard
                            product={item}
                            isAdmin={user?.Admin}
                            isInventario={true}
                        />
                    </Col>
                ))}
            </Row>

            {error ? <h3 style={{ fontSize: 24, color: "red" }}>{error}</h3> : ""}
        </Container>
    )
}

export default Inventario;