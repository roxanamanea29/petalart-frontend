import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavbarH from "@/components/NavbarH.jsx";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Footer from "@/components/Footer.jsx";
import Button from "react-bootstrap/Button";
import AddressModal from "@/components/AddressModal.jsx";

export const AddressView = () => {
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [showModal, setShowModal] = useState(false); // Puedes usarlo si tienes AddressModal

    const getAuthHeaders = () => ({
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    });

    useEffect(() => {
        fetch("http://localhost:8080/address/my-addresses", {
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

    const handleSave = async (addressData) => {
        try {
            const isEdit = Boolean(addressData.id);
            const url = isEdit
                ? `http://localhost:8080/address/update/${addressData.id}`
                : `http://localhost:8080/address/save`;

            const res = await fetch(url, {
                method: isEdit ? "PUT" : "POST",
                headers: getAuthHeaders(),
                body: JSON.stringify(addressData),
            });
            if (!res.ok) throw new Error(`Error ${res.status}: ${await res.text()}`);

            // Refresca la lista
            const updated = await fetch("http://localhost:8080/address/my-addresses", {
                headers: getAuthHeaders(),
            }).then((r) => r.json());
            setAddresses(updated);
            setShowModal(false);
        } catch (error) {
            console.error("Error en handleSave:", error);
            alert("No se pudo guardar la dirección.");
        }
    }
    const handleDelete = async (id) => {
        if (!window.confirm("¿Estás seguro de eliminar esta dirección?")) return;

        try {
            const res = await fetch(`http://localhost:8080/address/delete/${id}`, {
                method: "DELETE",
                headers: getAuthHeaders(),
            });
            if (!res.ok) throw new Error(`Error ${res.status}: ${await res.text()}`);

            setAddresses(addresses.filter((adr) => adr.id !== id));
        } catch (error) {
            console.error("Error al eliminar la dirección:", error);
            alert("No se pudo eliminar la dirección.");
        }
    };

    return (
        <>
            <NavbarH />
            <Container className="mt-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className="text-center mb-4">Mis direcciones guardadas</h2>
                    <Link to="/dashboard" className="btn btn-outline-secondary">Volver al Panel</Link>
                </div>

                <div className="d-flex justify-content-start mb-2">

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
                        <th>Acciones</th>
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
                                <Button
                                    variant="warning"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => {
                                        setSelectedAddress(adr);
                                        setShowModal(true);
                                    }}
                                >
                                    Editar
                                </Button>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleDelete(adr.id)}
                                >
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>

                {/* Modal oculto por ahora */}
                 <AddressModal
                    show={showModal}
                    handleClose={() => setShowModal(false)}
                    address={selectedAddress}
                    onSave={handleSave}
                />
            </Container>
            <Footer />
        </>
    );
};