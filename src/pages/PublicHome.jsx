import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoryCard from "../components/CategoryCard";
import Footer from "../components/Footer";
import "../css/PublicHome.css";
import NavbarH from "../components/NavbarH.jsx";

const PublicHome = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8080/categories")
            .then(res => {
                setCategories(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error al cargar categorías:", err);
                setError("No se pudieron cargar las categorías.");
                setLoading(false);
            });
    }, []);

    return (
        <>
        <NavbarH />
        <div className="main-content">
            <header className="public-home-header">
                <p className="sub-heading">FLORISTERÍA</p>
                <h1 className="h-auto">Arte en cada petalo</h1>
                <p className="sub-heading">VENTA ONLINE DE FLORES - EVENTOS</p>
            </header>

            <main className="category-section" style={{ paddingBottom: "200px" }}>
                {loading && <p>Cargando categorías...</p>}
                {error && <p className="error">{error}</p>}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
                    {categories.map((cat) => (
                        <CategoryCard
                            key={cat.id}
                            id={cat.id}
                            title={cat.categoryName}
                            description={cat.description}
                            imageSrc={cat.imageUrl || "/placeholder.svg"}

                        />
                    ))}
                </div>
            </main >

            <Footer />
        </div>
        </>
    );
};

export default PublicHome;
