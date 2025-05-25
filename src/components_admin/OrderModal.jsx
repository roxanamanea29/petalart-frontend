import PropsTypes from 'prop-types';
import {useEffect, useState} from "react";
import {Form, Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";



function OrderModal({show, handleClose, order, onSave}) {
    const [formData, setFormData] = useState({
        id: null,
        userId: "",
        addressId: "",
        orderItems: [],
        totalAmount: "",
        status: "",
    })
    useEffect(() => {
        if (order) {
            setFormData(order);
        } else {
            setFormData({
                id: null,
                userId: "",
                addressId: "",
                orderItems: [],
                totalAmount: "",
                status: "",
            });
        }
    }, [order]);
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
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
                    {order ? "Editar order" : "Agregar order"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formCategoryName" className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            name="categoryName"
                            value={formData.categoryName}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="description" className="mb-3">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange} required
                        />
                    </Form.Group>
                    <Form.Group controlId="formImageUrl" className="mb-3">
                        <Form.Label>URL de la Imagen</Form.Label>
                        <Form.Control
                            type="text"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        {order ? "Actualizar Categoria" : "Agregar Categoria"}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
OrderModal.propTypes = {
    show: PropsTypes.bool.isRequired,
    handleClose: PropsTypes.func.isRequired,
    order: PropsTypes.object,
    onSave: PropsTypes.func.isRequired,
};