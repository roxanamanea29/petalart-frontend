import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {Form, Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";



function CategoryModal({show, handleClose, category, onSave}) {
    const [formData, setFormData] = useState({
        id:null,
        categoryName: "",
        description: "",
        imageUrl: "",
    });

    useEffect(() => {
        if (category) {
            setFormData(category);
        } else {
            setFormData({
                id:null,
                categoryName: "",
                description: "",
                imageUrl: "",
            });
        }
    }, [category]);

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
                    {category ? "Editar Categoria" : "Agregar Categoria"}
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
                            onChange={handleChange}
                            required
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
                        {category ? "Actualizar Categoria" : "Agregar Categoria"}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
     )
}
CategoryModal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    category: PropTypes.object,
    onSave: PropTypes.func.isRequired,
}
export default CategoryModal;