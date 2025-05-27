import {useState, useEffect} from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import ProductsModal from "@/components_admin/ProductsModal.jsx";
import {Link} from "react-router-dom";
import {Navbar} from "react-bootstrap";
import LOCALSERVERBASEURL from "@/Configuration/ConectionConfig.js";


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
        fetch(`${LOCALSERVERBASEURL}/categories`, {
            method: "GET",
            headers: authHeaders(),
        })
            .then((res) => res.json())
            .then(setCategories)
            .catch((err) => console.error("Error al obtener categorías:", err));
    }, []);


    // 1. Carga inicial de productos (GET)
    useEffect(() => {
        fetch(`${LOCALSERVERBASEURL}/products`, {
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
                ? `${LOCALSERVERBASEURL}/products/${productData.id}`
                : `${LOCALSERVERBASEURL}/products`;

            const res = await fetch(url, {
                method: isEdit ? "PUT" : "POST",
                headers: authHeaders(),
                body: JSON.stringify(productData),
            });
            if (!res.ok) throw new Error(`Error ${res.status}`);

            // actuliza la lista
            const updated = await fetch(`${LOCALSERVERBASEURL}/products`, {
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
            const res = await fetch(`${LOCALSERVERBASEURL}/products/${id}`, {
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
        <>
            <Navbar />


            <Container className="mt-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className="text-center mb-4">Gestión de Productos</h2>
                    <Link to="/admin" className="btn btn-outline-secondary">Volver al Panel</Link>
                </div>
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
                <div className="table-responsive">
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
                </div>
                <ProductsModal
                    show={showModal}
                    handleClose={() => setShowModal(false)}
                    product={selectedProduct}
                    categories={categories}
                    onSave={handleSave}
                />
            </Container>
        </>
    );
}