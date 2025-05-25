import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {Form, Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";


function AddressModal({show, handleClose, address, onSave}) {
    const [formData, setFormData] = useState({
        street: "",
        streetNumber: "",
        city: "",
        state: "",
        country: "",
        zipCode: "",
        addressType: "",
    });

    useEffect(() => {
        if (address) {
            setFormData(address);
        } else {
            setFormData({
                street: "",
                streetNumber: "",
                city: "",
                state: "",
                country: "",
                zipCode: "",
                addressType: "",
            });
        }
    },[address]);
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
                    {address ? "Editar Dirección" : "Agregar Dirección"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formStreet" className="mb-3">
                        <Form.Label>Calle</Form.Label>
                        <Form.Control
                            type="text"
                            name="street"
                            value={formData.street}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formStreetNumber" className="mb-3">
                        <Form.Label>Número de Calle</Form.Label>
                        <Form.Control
                            type="text"
                            name="streetNumber"
                            value={formData.streetNumber}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formCity" className="mb-3">
                        <Form.Label>Ciudad</Form.Label>
                        <Form.Control
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formState" className="mb-3">
                        <Form.Label>Estado/Provincia</Form.Label>
                        <Form.Control
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formCountry" className="mb-3">
                        <Form.Label>País</Form.Label>
                        <Form.Control
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formZipCode" className="mb-3">
                        <Form.Label>Código Postal</Form.Label>
                        <Form.Control
                            type="text"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formAddressType">
                        <Form.Label>Tipo de Dirección</Form.Label>
                        <Form.Control
                            as="select"
                            name="addressType"
                            value={formData.addressType}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccione un tipo</option>
                            <option value="SHIPPING">Dirección de envío</option>
                            <option value="BILLING">Dirección de facturación</option>
                            <option value="BOTH">Ambas direcciones</option>
                        </Form.Control>
                    </Form.Group>
                    <div className="text-center mt-4">
                        <Button variant="primary" type="submit">
                            {address ? "Guardar Cambios" : "Agregar Dirección"}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>

        </Modal>
    );
}
AddressModal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    address: PropTypes.object,
    onSave: PropTypes.func.isRequired,
};
export default AddressModal;