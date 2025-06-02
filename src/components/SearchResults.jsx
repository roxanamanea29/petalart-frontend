import React, {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import LOCALSERVERBASEURL from "@/Configuration/ConectionConfig.js";
import NavbarH from "@/components/NavbarH.jsx";
import Footer from "@/components/Footer.jsx";

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const res = await fetch(`${LOCALSERVERBASEURL}/products/search?query=${encodeURIComponent(query)}`);
                const data = await res.json();
                setResults(data);
            } catch (err) {
                console.error("Error al buscar resultados:", err);
            } finally {
                setLoading(false);
            }
        };
        if (query) {
            fetchResults();
        }
    }, [query]);

    if (loading) return <p className="p-4">Cargando resultados...</p>;
    if (results.length === 0) return <p className="p-4">No se encontraron resultados para "{query}"</p>;

    return (
        <>

            <NavbarH/>
            <div className="main-content">
                <header className="public-home-header">
                    <p className="sub-heading mb-6">VENTA ONLINE DE FLORES - EVENTOS</p>
                    <p className=" text-5xl con font-semibold">PetalArt</p>
                    <h1 className="text-3xl mt-2">Arte en cada petalo</h1>

                </header>
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {results.map((product) => (
                        <div key={product.id} className="border rounded shadow p-4">
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full h-48 object-cover mb-2"
                            />
                            <h3 className="text-lg font-bold">{product.name}</h3>
                            <p className="text-gray-600">{product.price} €</p>
                            <p className="text-sm">{product.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <Footer/>
        </>
    );
};

export default SearchResults;