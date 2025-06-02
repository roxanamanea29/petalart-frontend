import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoryCard from "../components/CategoryCard";
import Footer from "../components/Footer";
import "../css/PublicHome.css";
import NavbarH from "../components/NavbarH.jsx";
import BlogFeed from "@/components/Blog.jsx";
import WorkGallery from "@/components/WorkGallery.jsx";
import LOCALSERVERBASEURL from "@/Configuration/ConectionConfig.js";


const PublicHome = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get( `${LOCALSERVERBASEURL}/categories`)
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
                <p className="sub-heading mb-6">VENTA ONLINE DE FLORES - EVENTOS</p>
                <p className=" text-5xl con font-semibold">PetalArt</p>
                <h1 className="text-3xl mt-2">Arte en cada petalo</h1>

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
                <WorkGallery />
                <BlogFeed />
                <div className="m-12 text-center text-gray-900">
                    <h2 className="mt-10 text-2xl font-bold text-gray-900">
                        “Donde florecen las flores, también lo hace la esperanza.”
                    </h2><p> – Lady Bird Johnson</p>
                </div>

                <a
                    href="/categorias/4"
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
