import {Link} from "react-router-dom";

import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Footer from "@/components/Footer.jsx";
import React, {useEffect, useState} from "react";
import NavbarH from "@/components/NavbarH.jsx";


export default function OrdersView()  {
    const [orders, setOrders] = useState([]);
    const authHeaders = () => ({
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    });
    // Carga de órdenes (GET)
    useEffect(() => {
        fetch("http://localhost:8080/order/my-orders", {
            method: "GET",
            headers: authHeaders(),
        })
            .then((res) => {
                if (!res.ok) throw new Error(`Error ${res.status}`);
                return res.json();
            })
            .then(setOrders)
            .catch((err) => console.error("Error al obtener órdenes:", err));
    }, []);

    return (
        <>
            <NavbarH />
            <header className="public-home-header">
                <p className="sub-heading">
                    <Link to="/categorias" className="hover:underline text-blue-600">FLORISTERÍA</Link> / MIS PEDIDOS
                </p>
            </header>

            <Container className="mt-4">

                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className="text-center mb-4">Historial de Compras</h2>
                    <Link to="/dashboard" className="btn btn-outline-secondary">Volver al Panel</Link>
                </div>

                <div className="table-responsive">
                    <Table striped bordered hover responsive>
                        <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Productos</th>
                            <th>Dirección</th>
                            <th>Estado del Pedido</th>
                            <th>Total</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td>{new Date(order.date).toLocaleString()}</td>
                                <td>
                                    {order.items.map((item) => (
                                        <div key={item.orderItemId}>
                                            <img src={item.imageUrl} alt={item.productName} width="40" height="40"
                                                 style={{marginRight: "8px"}}/>
                                            {item.productName} × {item.quantity} - {item.price.toFixed(2)}€
                                        </div>
                                    ))}
                                </td>
                                {/*Address*/}
                                <td>
                                    {order.addresses.length > 0 ? (
                                        order.addresses.map((addr) => (
                                            <div key={addr.id}>
                                                <strong>{addr.addressType}:</strong> {addr.street} {addr.streetNumber}, {addr.city}, {addr.state}, {addr.country} ({addr.zipCode})
                                            </div>
                                        ))
                                    ) : (
                                        <em>Sin dirección</em>
                                    )}
                                </td>
                                <td>{order.orderStatus ?? <em>sin estado</em>}</td>

                                <td>{order.total.toFixed(2)} €</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
            </Container>
            <Footer/>
        </>
    );
}