import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import LOCALSERVERBASEURL from "@/Configuration/ConectionConfig.js";

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
    );
};

export default SearchResults;