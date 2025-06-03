import {useEffect, useState} from "react";
import {Form ,Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import LOCALSERVERBASEURL from "@/Configuration/ConectionConfig.js";


// eslint-disable-next-line react-refresh/only-export-components
const EditUserForm = ({show, handleClose, user, onSave, onCancel}) => {
    // Estado para manejar los datos del formulario
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
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
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                email: user.email || "",
                phone: user.phone || "",
            });
        } else {
            // Si no hay usuario, resetea el formulario a valores por defecto
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
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

    // Maneja el envío del formulario
    const handleSubmit = async (e) => {
        // Evita envio por defecto del formulario
        e.preventDefault();
        //valida los campos del formulario
            const isEdit = Boolean(user.id);
            // Si es edición, usa PUT, si es creación, usa POST
            const url = isEdit
                ? `${LOCALSERVERBASEURL}/user/${user.id}`
                : `${LOCALSERVERBASEURL}/user`;
           // Prepara los datos del formulario para enviar
            const response = await fetch(url, {
                // Define el método HTTP según si es edición o creación
                method: isEdit ? "PUT" : "POST",
                //se usan los headers de autenticación
                headers: authHeaders,
                // Convierte los datos del formulario a JSON
                body: JSON.stringify(formData),
            });
            // Maneja la respuesta del servidor
            if (!response.ok) {
                // Si la respuesta no es OK, lanza un error
                const errorData = await response.json();
                throw new Error(errorData.message || `Error ${response.status}`);
            }

            // guarda los datos del usuario en el localStorage
        onSave(formData);
    };

    return (

            <Modal show={show} onHide={handleClose} centered>
                <Form onSubmit={handleSubmit}>
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

                    <Button variant="primary" type="submit" className="me-2">
                        Guardar
                    </Button>
                    <Button variant="secondary" onClick={onCancel}>
                        Cancelar
                    </Button>
                </Form>
            </Modal>

    );
};
export default EditUserForm;
