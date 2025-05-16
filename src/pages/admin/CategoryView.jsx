import {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import CategoryModal from "@/components_admin/CategoryModal.jsx";


function CategoryView(){
    const [category, setCategory] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/categories/with-products")
            .then((response) => response.json())
            .then((data) => {
                console.log("🧪 Categorías del backend:", data); // ✅ aquí dentro
                setCategory(data);
            })
            .catch((error) => console.error("Error al obtener categorías:", error));
    }, []);

    //funcion que se encarga de eliminar una categoria
    const handleDelete = (id) => {
        fetch(`http://localhost:8080/categories/${id}, {method:DELETE}`)
            .then(response => {
                if (response.ok) {
                    setCategory(category.filter(category => category.id !== id));
                } else {
                    console.error("Error al eliminar la categoría");
                }
            })
            .catch(error => console.error("Error al eliminar la categoría:", error));
    };

    //funcion que se encarga de guardar los datos de las categorias en db
    const handleSave = async (categoryData) => {
        try {
            const isEdit = !!categoryData.id;
            const method = isEdit ? "PUT" : "POST";
            const url = isEdit
                ? `http://localhost:8080/categories/${categoryData.id}`
                : `http://localhost:8080/categories`;
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(categoryData),
            });
            if (!res.ok) throw new Error("Error al guardar la categoría");

            const savedCategory = await res.json();

            setCategory(prev =>
                isEdit
                    ? prev.map(c => c.id === savedCategory.id ? savedCategory : c)
                    : [...prev, savedCategory]
            );

            setShowModal(false);
        } catch (error) {
            console.error(" Error al guardar la categoría:", error);
        }
    };

    return (
        <Container className="mt-4">
            <h2 className="text-center" mb-4>Gestión Completa de Categorías: CRUD Eficiente.</h2>

            <div className="d-flex justify-content-lg-start mb-2">
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
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {category.map((cat) => (
                        <tr key={cat.id}>
                            <td>{cat.id}</td>
                            <td>{cat.name}</td>
                            <td>{cat.imageUrl}</td>
                            <td>
                                <Button
                                    variant="warning"
                                    onClick={() => {
                                        setSelectedCategory(cat);
                                        setShowModal(true);
                                    }}
                                >
                                    Editar
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDelete(cat.id)}
                                >
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
    );
}
export default CategoryView;