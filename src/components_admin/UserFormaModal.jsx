import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Form } from "react-bootstrap";

// Componente modal para crear o editar usuarios
function UserFormModal({ show, handleClose, user, onSave }) {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        phone_number: "",
        email: "",

    });

    useEffect(() => {
        if (user) {
            setFormData(user);
        } else {
            setFormData({
                first_name: "",
                last_name: "",
                phone_number: "",
                email: "",
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton className="justify-content-center">
                <Modal.Title className="w-100 text-center">
                    {user ? "Editar Usuario" : "Agregar Usuario"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formFirstName" className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formLastName" className="mb-3">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formPhoneNumber" className="mb-3">
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control
                            type="text"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formEmail" className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <div className="d-grid">
                        <Button variant="success" type="submit">
                            Guardar
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

UserFormModal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    user: PropTypes.object, // null si es nuevo usuario
    onSave: PropTypes.func.isRequired,
};

export default UserFormModal;