import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {Form,Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";



function ProductsModal({show, handleClose, product, onSave,categories}) {
    const [formData, setFormData] = useState({
        id:null,
        name: "",
        description: "",
        imageUrl: "",
        price: "",
        categoryId: "",
    });

    useEffect(() => {
        if (product) {
            setFormData(product);
        } else {
            setFormData({
                id:null,
                name: "",
                description: "",
                imageUrl: "",
                price: "",
                categoryId: "",
            });
        }
    }, [product]);

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
                    {product ? "Editar producto" : "Agregar producto"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formName" className="mb-3">
                        <Form.Label column="">Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="description" className="mb-3">
                        <Form.Label column="">Descripción</Form.Label>
                        <Form.Control
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formProductImage" className="mb-3">
                        <Form.Label column="">URL de la Imagen</Form.Label>
                        <Form.Control
                            type="text"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formPrice" className="mb-3">
                        <Form.Label column="">Precio</Form.Label>
                        <Form.Control
                            type="text"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formCategory" className="mb-3">
                        <Form.Label column="">Categoría</Form.Label>
                        <Form.Select
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                            required
                        >
                        <option value=""> Selecciona categoría</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.categoryName}
                            </option>
                        ))}
                        </Form.Select>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        {product ? "Actualizar product" : "Agregar product"}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
ProductsModal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    product: PropTypes.object,
    categories: PropTypes.array.isRequired,
    onSave: PropTypes.func.isRequired,
}
export default ProductsModal;