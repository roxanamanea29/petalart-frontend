import {Link, useParams} from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarH from "@/components/NavbarH.jsx";
import Footer from "@/components/Footer.jsx";
import ProductCard from "@/components/ProductCard.jsx";

const CategoryProducts = () => {
    const { id } = useParams();
    console.log("🧪 useParams():", id);
    const [products, setProducts] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8080/products/by-category/${id}`)
            .then(res => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error al cargar productos:", err);
                setError("No se pudieron cargar los productos.");
                setLoading(false);
            });

        axios.get(`http://localhost:8080/categories/${id}`)
            .then(res => setCategoryName(res.data.categoryName))
            .catch(err => console.error("Error cargando categoría:", err));
    }, [id]);

    return (
        <>
            <NavbarH />
            <section className="p-6">
                <header className="public-home-header">
                    <p className="sub-heading">
                        <Link to="/categorias" className="hover:underline text-blue-600">FLORISTERÍA</Link> / {categoryName}
                    </p>
                </header>

                {loading && (
                    <p className="text-center text-gray-500">Cargando productos...</p>
                )}

                {error && (
                    <p className="text-center text-red-500">{error}</p>
                )}

                {!loading && !error && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.length === 0 ? (
                            <p className="text-center col-span-full text-gray-500">
                                No hay productos en esta categoría.
                            </p>
                        ) : (
                            products.map((prod) => (
                                <ProductCard
                                    key={prod.id}
                                    id={prod.id}
                                    title={prod.name}
                                    description={prod.description}
                                    imageSrc={prod.imageUrl || "/placeholder.svg"}
                                    showButton={true}
                                />
                            ))
                        )}
                    </div>
                )}
            </section>
            <Footer />
        </>
    );
};

export default CategoryProducts;