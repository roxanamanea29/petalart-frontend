import {useEffect, useState} from "react";
import {Form, Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import LOCALSERVERBASEURL from "@/Configuration/ConectionConfig.js";


const EditUserForm = ({show, handleClose, user, onSave}) => {
    // Estado para manejar los datos del formulario
    const [formData, setFormData] = useState({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
    });

    // Headers de autenticación del token para las peticiones
    const authHeaders = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    // Efecto para inicializar el formulario con los datos del usuario
    useEffect(() => {
        if (user) {
            // Si el usuario tiene datos, los asigna al estado del formulario
            setFormData({
                id: user.userId || '',
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                email: user.email || "",
                phone: user.phone || "",
            });
        }
        //guardamos el usuario en el localStorage
    }, [user]);

    // Maneja los cambios en los campos del formulario
    const handleChange = (e) => {
        const {name, value} = e.target;
        // Actualiza el estado del formulario con el nuevo valor
        setFormData({...formData, [name]: value});
    };

console.log("Enviando datos...",formData);
    // Maneja el envío del formulario
    const handleSubmit = async (e) => {
        // Evita envio por defecto del formulario
        e.preventDefault();
        if(!formData.id) {
            alert("Falta el id del usuario.");
            return;
        }
        try {
            // Se realiza actualizar  datos del usuario
            const res = await fetch(`${LOCALSERVERBASEURL}/user/${formData.id}`, {
                method: "PUT",
                //se usan los headers de autenticación
                headers: authHeaders,
                // Convierte los datos del formulario a JSON
                body: JSON.stringify(formData)
            });

            // Maneja la respuesta del servidor
            if (res.ok) {
                const updatedUser = await res.json();
                onSave(updatedUser);
                handleClose();
            } else {
                // Si la respuesta no es OK, lanza un error
                const errorData = await res.json();
                alert(errorData.message || 'Error al actualizar usuario');
            }
            // guarda los datos del usuario en el localStorage
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
            alert("Error al actualizar usuario: " + error.message);
        }
    };

    return (

        <Modal show={show} onHide={handleClose} centered>
            <Form className="form m-3" onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title className="w-100 text-center">Actualizar datos</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4 ">
                    <Form.Group controlId="formFirstName" className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formLastName" className="mb-3">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control
                            type="text"
                            name="lastName"
                            value={formData.lastName}
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
                    <Form.Group controlId="formPhone" className="mb-3">
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer className="px-4 pb-4">

                    <Button variant="primary" type="submit" className="me-2">
                        Guardar
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>

    );
};
export default EditUserForm;
