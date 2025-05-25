import Footer from "@/components/Footer.jsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import {Navbar} from "react-bootstrap";


export default function AddressesView() {
    const [addresses, setAddresses] = useState([]);
  /*  const [selectedAddress, setSelectedAddress] = useState(null);*/
/*    const [showModal, setShowModal] = useState(false);*/

    const getAuthHeaders = () => ({
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    });

    useEffect(() => {
        fetch("http://localhost:8080/address/all", {
            method: "GET",
            headers: getAuthHeaders(),
        })
            .then((res) => {
                if (!res.ok) throw new Error(`Error ${res.status}`);
                return res.json();
            })
            .then(setAddresses)
            .catch((err) => console.error("Error al obtener direcciones:", err));
    }, []);

    return (
        <>
            <Navbar />
            <Container className="mt-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className="text-center">Listado de Direcciones</h2>
                    <Link to="/admin" className="btn btn-outline-secondary">Volver al Panel</Link>
                </div>

                <div className="d-flex justify-content-start mb-3">
                 {/*   <Button
                        variant="primary"
                        onClick={() => {
                            setSelectedAddress(null);
                            setShowModal(true);
                        }}
                    >
                        Agregar Dirección
                    </Button>*/}
                </div>

                <Table striped bordered hover responsive>
                    <thead>
                    <tr>
                        <th>Calle</th>
                        <th>Número</th>
                        <th>Ciudad</th>
                        <th>Provincia</th>
                        <th>País</th>
                        <th>Código Postal</th>
                        <th>Tipo</th>
                        <th>Usuario</th>
                    </tr>
                    </thead>
                    <tbody>
                    {addresses.map((adr) => (
                        <tr key={adr.id}>
                            <td>{adr.street}</td>
                            <td>{adr.streetNumber}</td>
                            <td>{adr.city}</td>
                            <td>{adr.state}</td>
                            <td>{adr.country}</td>
                            <td>{adr.zipCode}</td>
                            <td>{adr.addressType}</td>
                            <td>
                                <div><strong>{adr.userName}</strong></div>
                                <div className="text-muted" style={{ fontSize: "0.9em" }}>{adr.userEmail}</div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Container>
            <Footer />
        </>
    );
}