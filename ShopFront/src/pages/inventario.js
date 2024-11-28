import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import ProductCard from "../components/productCard.js";
import { useAuth } from "../context/authContext.js";
import axios from "axios";

const Inventario = () => {
    const server_url = "http://localhost:5071";
    const [inventario, setInventario] = useState([]);
    consy [error, setError] = useState("");
    const { user, authToken } = useAuth();

    useEffect(() => {
        const fetchInventario = async () => {
            setError("");
            try {
                const inventarioData = await axios.get(`${server_url}/inventario/${user.Id}`);
                
                setInventario(inventarioData);
            } catch (error) {
                console.error("Erro buscando inventário: ",error);
                setError(error);
            }
        };
        fetchInventario();
    },[]);

    return (
        <Container>
            <h2 className="my-4" style={{ fontWeight: "bold", color: "#ffc107", textAlign: "center" }}>
                Inventário
            </h2>

            {inventario?.map((item) => (
                <Col xs={12} sm={6} md={4} lg={2} key={item.Id}>
                    <ProductCard
                        item={item}
                        isAdmin={user?.Admin}
                        isInventario={true}
                    />
                </Col>
            ))}
        </Container>
    )
}

export default Inventario;