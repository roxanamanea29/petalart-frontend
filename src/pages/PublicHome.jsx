import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoryCard from "../components/CategoryCard";
import Footer from "../components/Footer";
import "../css/PublicHome.css";
import NavbarH from "../components/NavbarH.jsx";
import BlogFeed from "@/components/Blog.jsx";
import Banner_gallery from "@/components/Banner_gallery.jsx";


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
                <p className=" text-5xl con font-semibold uppercase">FLORISTERÍA</p>
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

                <div className="mt-10 px-4 text-center text-gray-900 max-w-3xl mx-auto">
                    <h3>
                        En PetalArt te ofrecemos una cuidada selección de <strong>plantas naturales</strong>, <strong>ramos de novia</strong>,
                        <strong>centros florales</strong> y <strong>decoración verde</strong> para cada ocasión.
                    </h3>
                    <p>Cada categoría está pensada para
                        aportar belleza, frescura y elegancia a tus espacios o celebraciones.</p>
                </div>

                <Banner_gallery />
                <BlogFeed />
                <div className="m-12 text-center text-gray-900">
                    <h2 className="mt-10 text-2xl font-bold text-gray-900">
                        “Donde florecen las flores, también lo hace la esperanza.”
                    </h2><p> – Lady Bird Johnson</p>
                </div>

                <a
                    href="/categorias/52"
                    className="my-16 flex justify-center items-center w-full max-w-[1350px] h-auto mx-auto px-4"
                >
                    <img
                        src="/images/banner_1350.png"
                        alt="Banner flores"
                        className="w-full h-auto"
                    />
                </a>
            </main >

            <Footer />
        </div>
        </>
    );
};

export default PublicHome;
