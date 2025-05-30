import {Link, useParams} from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarH from "@/components/NavbarH.jsx";
import Footer from "@/components/Footer.jsx";
import ProductCard from "@/components/ProductCard.jsx";
import Banner_gallery from "@/components/Banner_gallery.jsx";
import LOCALSERVERBASEURL from "@/Configuration/ConectionConfig.js";

const CategoryProducts = () => {
    const { id } = useParams();
/*    console.log("🧪 useParams():", id);*/
    const [products, setProducts] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`${LOCALSERVERBASEURL}/products/by-category/${id}`)
            .then(res => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error al cargar productos:", err);
                setError("No se pudieron cargar los productos.");
                setLoading(false);
            });

        axios.get(`${LOCALSERVERBASEURL}/categories/${id}`)
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

                <h2 className="text-3xl font-semibold text-center mt-8 text-gray-800">
                    Productos en {categoryName}
                </h2>
                <p className="text-center text-gray-600 mt-2 mb-6 max-w-2xl mx-auto">
                    Descubre nuestras mejores creaciones florales diseñadas para esta categoría. Ramos, arreglos y detalles que enamoran.
                </p>

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

            <div className="mt-12 text-center text-gray-600 ">
                Regalar flores es regalar emoción.
                Cultivar flores es cuidar del alma.
            </div>

            <Banner_gallery />
            <Link to="/categorias" className="flex justify-center items-center h-screen">
                {/* Opción 1: template string */}
                <img
                    src={`${LOCALSERVERBASEURL}/images/banner.png`}
                    alt="Banner flores"
                />

            </Link>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm text-gray-600">
                <div>🌱 Flores frescas de temporada</div>
                <div>🎁 Entrega en 24h en tu ciudad</div>
                <div>🖐️ Diseños artesanales y únicos</div>
                <div>💬 Atención personalizada</div>

            </div>
            <Footer />
        </>
    );
};
export default CategoryProducts;