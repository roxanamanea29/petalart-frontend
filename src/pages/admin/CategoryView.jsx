import {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import CategoryModal from "@/components_admin/CategoryModal.jsx";
import NavbarH from "@/components/NavbarH.jsx";
import {Link} from "react-router-dom";

function CategoryView() {
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Función para obtener siempre el token más reciente
    const getAuthHeaders = () => ({
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    });

    // 1. Carga inicial de categorías (público GET)
    useEffect(() => {
        fetch("http://localhost:8080/categories", {
            method: "GET",
            headers: getAuthHeaders(),
        })
            .then((res) => {
                if (!res.ok) throw new Error(`Error ${res.status}`);
                return res.json();
            })
            .then(setCategories)
            .catch((err) => console.error("Error al obtener categorías:", err));
    }, []);

    // 2. Crear / editar categoría
    const handleSave = async (categoryData) => {
        try {
            const isEdit = Boolean(categoryData.id);
            const url = isEdit
                ? `http://localhost:8080/categories/${categoryData.id}`
                : `http://localhost:8080/categories`;

            const res = await fetch(url, {
                method: isEdit ? "PUT" : "POST",
                headers: getAuthHeaders(),
                body: JSON.stringify(categoryData),
            });
            if (!res.ok) throw new Error(`Error ${res.status}: ${await res.text()}`);

            // Refresca la lista
            const updated = await fetch("http://localhost:8080/categories", {
                headers: getAuthHeaders(),
            }).then((r) => r.json());
            setCategories(updated);
            setShowModal(false);
        } catch (error) {
            console.error("Error en handleSave:", error);
            alert("No se pudo guardar la categoría.");
        }
    };

    // 3. Eliminar categoría
    const handleDelete = async (id) => {
        try {
            const res = await fetch(`http://localhost:8080/categories/${id}`, {
                method: "DELETE",
                headers: getAuthHeaders(),
            });
            if (!res.ok) throw new Error(`Error ${res.status}`);
            setCategories((prev) => prev.filter((c) => c.id !== id));
        } catch (error) {
            console.error("Error al eliminar categoría:", error);
            alert("No se pudo eliminar la categoría.");
        }
    };

    return (
        <>
            <NavbarH/>

            <Container className="mt-14">

                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className="text-center mb-4">Gestión de Categorías</h2>
                    <Link to="/admin" className="btn btn-outline-secondary">Volver al Panel</Link>
                </div>
                <div className="d-flex justify-content-start mb-2">
                    <Button
                        variant="primary"
                        onClick={() => {
                            setSelectedCategory(null);
                            setShowModal(true);
                        }}
                    >
                        Agregar Categoría
                    </Button>
                </div>

                <Table striped bordered hover responsive>
                    <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>URL Imagen</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {categories.map((cat) => (
                        <tr key={cat.id}>
                            <td>{cat.categoryName}</td>
                            <td>{cat.description}</td>
                            <td>{cat.imageUrl}</td>
                            <td>
                                <Button
                                    variant="warning"
                                    className="me-2"
                                    onClick={() => {
                                        setSelectedCategory(cat);
                                        setShowModal(true);
                                    }}
                                >
                                    Editar
                                </Button>
                                <Button variant="danger" onClick={() => handleDelete(cat.id)}>
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>

                <CategoryModal
                    show={showModal}
                    handleClose={() => setShowModal(false)}
                    category={selectedCategory}
                    onSave={handleSave}
                />
            </Container>
        </>
    );
}

export default CategoryView;