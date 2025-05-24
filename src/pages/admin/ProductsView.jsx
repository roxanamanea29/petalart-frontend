import {useState, useEffect} from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import ProductsModal from "@/components_admin/ProductsModal.jsx";


export default function ProductsView() {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [categories, setCategories] = useState([])

    //funcion para obtener token
    const authHeaders = () => ({
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    });

    // 1. Carga inicial de categorías (público GET)
    useEffect(() => {
        fetch("http://localhost:8080/categories", {
            method: "GET",
            headers: authHeaders(),
        })
            .then((res) => res.json())
            .then(setCategories)
            .catch((err) => console.error("Error al obtener categorías:", err));
    }, []);


    // 1. Carga inicial de productos (GET)
    useEffect(() => {
        fetch("http://localhost:8080/products", {
            method: "GET",
            headers: authHeaders(),
        })
            .then((res) => res.json())
            .then(setProducts)
            .catch((err) => console.error("Error al obtener productos:", err));
    }, []);

    // 2. Crear / editar producto
    const handleSave = async (productData) => {
        try {
            const isEdit = Boolean(productData.id);
            const url = isEdit
                ? `http://localhost:8080/products/${productData.id}`
                : `http://localhost:8080/products`;

            const res = await fetch(url, {
                method: isEdit ? "PUT" : "POST",
                headers: authHeaders(),
                body: JSON.stringify(productData),
            });
            if (!res.ok) throw new Error(`Error ${res.status}`);

            // actuliza la lista
            const updated = await fetch("http://localhost:8080/products", {
                headers: authHeaders(),
            }).then((r) => r.json());
            setProducts(updated);
            setShowModal(false);
        } catch (error) {
            console.error("Error en handleSave:", error);
            alert("No se pudo guardar el producto.");
        }
    };
    // 3. Eliminar categoría
    const handleDelete = async (id) => {
        try {
            const res = await fetch(`http://localhost:8080/products/${id}`, {
                method: "DELETE",
                headers: authHeaders(),
            });
            if (!res.ok) throw new Error(`Error ${res.status}`);
            setProducts((prev) => prev.filter((c) => c.id !== id));
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
            alert("No se pudo eliminar el producto. :(");
        }
    };
    return (

        <Container className="mt-4">
            <h2 className="text-center mb-4">Gestión de Productos</h2>

            <div className="d-flex justify-content-start mb-2">
                <Button
                    variant="primary"
                    onClick={() => {
                        setSelectedProduct(null);
                        setShowModal(true);
                    }}
                >
                    Agregar Productos
                </Button>
            </div>

            <Table striped bordered hover responsive>
                <thead>
                <tr>

                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Imagen URL</th>
                    <th>Precio</th>
                    <th>Categoría</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product) => (
                    <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.description}</td>
                        <td>{product.imageUrl}</td>
                        <td>{product.price} €</td>
                        <td>{product.categoryName}</td>
                        <td>
                            <Button
                                variant="warning"
                                className="me-2"
                                onClick={() => {
                                    setSelectedProduct(product);
                                    setShowModal(true);
                                }}
                            >
                                Editar
                            </Button>
                            <Button variant="danger" onClick={() => handleDelete(product.id)}>
                                Eliminar
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <ProductsModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                product={selectedProduct}
                categories={categories}
                onSave={handleSave}
            />
        </Container>
    );
}