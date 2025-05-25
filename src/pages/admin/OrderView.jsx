import NavbarH from "@/components/NavbarH.jsx";
import Footer from "@/components/Footer.jsx";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Navbar} from "react-bootstrap";

export default function OrderView() {
    const [orders, setOrders] = useState([]);
    // Función para obtener siempre el token más recient

    const authHeaders = () => ({
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    });

    //Carga de ordenes (GET)
    useEffect(() => {
        fetch("http://localhost:8080/order/all", {
            method: "GET",
            headers: authHeaders(),
        })
            .then((res) => res.json())
            .then(setOrders)
            .catch((err) => console.error("Error al obtener órdenes:", err));
    }, []);

    // Eliminar orden
   /* const handleDelete = async (orderId) => {
        if (!window.confirm("¿Estás seguro de que quieres eliminar esta orden?")) return;

        try {
            const res = await fetch(`http://localhost:8080/order/${orderId}`, {
                method: "DELETE",
                headers: authHeaders(),
            });
            if (!res.ok) {
                const errorData = await res.json();
              const message = errorData.message || `Error al eliminar la orden: ${res.status}`;
                throw new Error(message);
            };

            alert("Orden eliminada correctamente.");
            // Actualiza la lista
            setOrders(prev => prev.filter(c => c.id !== orderId));
        } catch (error) {
            console.error("Error al eliminar la orden:", error);
            alert(error.message);

        }
    };*/

    return (
        <>
            <Navbar />


            <Container className="mt-4">

                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className="text-center mb-4">Gestión de Órdenes</h2>
                    <Link to="/admin" className="btn btn-outline-secondary">Volver al Panel</Link>
                </div>

                <div className="table-responsive">
                    <Table striped bordered hover responsive>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Usuario</th>
                            <th>Fecha</th>
                            <th>Productos</th>
                            <th>Dirección</th>
                            <th>Estado del Pedido</th>
                            <th>Método de Pago</th>
                            <th>Estado del Pago</th>
                            <th>Método de Envío</th>
                            <th>Total</th>
                            <th>Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td>#{order.id}</td>
                                <td>{order.userId ?? <em>Sin usuario</em>}</td>
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
                                <td>{order.paymentMethod ?? <em>sin método</em>}</td>
                                <td>{order.paymentStatus ?? <em>sin estado</em>}</td>
                                <td>{order.shippingMethod ?? <em>sin método</em>}</td>

                                <td>{order.total.toFixed(2)} €</td>

                                <td>

                                  {/*  <Button variant="danger" onClick={() => handleDelete(order.id)}>
                                        Eliminar
                                    </Button>*/}
                                </td>
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
