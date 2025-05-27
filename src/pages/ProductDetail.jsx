import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import NavbarH from "@/components/NavbarH.jsx";
import Footer from "@/components/Footer.jsx";
import {useCart} from "@/hooks/UseCart.jsx";
import {useParams} from "react-router-dom";
import AddToCartModal from "@/components/AddToCartModal.jsx";
import LOCALSERVERBASEURL from "@/Configuration/ConectionConfig.js";

const ProductDetail = () => {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [cantidad, setCantidad] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const { addToCart } = useCart();

    useEffect(() => {
        if (id) {
            axios.get(`${LOCALSERVERBASEURL}/products/${id}`)
                .then(res => {
                    console.log("🧪 Detalle recibido del backend:", res.data);
                    setProduct(res.data)
                })

                .catch(err => console.error("Error cargando producto:", err));
        }
    }, [id]);

    const handleAddToCart = () => {
        if(product) {
            console.log("🧪 Enviando a addToCart:", product);
            addToCart({
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                imageUrl: product.imageUrl
            }, cantidad);
            setModalOpen(true);
        }
    };
    if (!product) {
        return <p>Cargando producto...</p>;
    }
    return (
        <>
            <AddToCartModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
            <NavbarH/>
            <header className="public-home-header">
                <p className="sub-heading">
                    <Link to="/categorias" className="hover:underline text-blue-600">FLORISTERÍA</Link>{" / "}
                    {product.categoryId ? (
                        <Link
                            to={`/categorias/${product.categoryId}`}
                            className="hover:underline text-blue-600"
                        >
                            {product.categoryName}
                        </Link>
                    ) : (
                        product.categoryName
                    )} / {product.name}
                </p>
            </header>
             <main className="p-6 max-w-4xl mx-auto">

                <img src={product.imageUrl || "/placeholder.svg"} alt={product.name} className="w-full max-w-md mx-auto rounded mb-4" />
                <p className="sub-heading">{product.categoryName}</p>
                <h1 className="h-auto">{product.name}</h1>
                <p className="text-gray-700 mb-4">{product.description}</p>


                    <label htmlFor="cantidad" className="text-sm font-medium">Cantidad:</label>
                    <input
                        id="cantidad"
                        type="number"
                        min="1"
                        value={cantidad}
                        onChange={(e) => setCantidad(Number(e.target.value))}
                        className="w-16 text-center border border-gray-300 rounded px-2 py-1"
                    />

                <p className="text-xl font-semibold text-black-600 mb-6">{product.price} €</p>
                <button

                    onClick={handleAddToCart}
                    className="bg-transparent border-2 color-black text-grey px-6 py-2 rounded hover:bg-gray-200"
                >
                    Añadir al carrito
                </button>

            </main>
            <Footer/>
        </>
    );
}
export default ProductDetail;