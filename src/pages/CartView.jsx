import React from "react";
import {useCart} from "@/hooks/UseCart.jsx";
import Footer from "@/components/Footer.jsx";
import NavbarH from "@/components/NavbarH.jsx";
import {Link, useNavigate} from "react-router-dom";
import  { useAuth} from "@/AuthContext.jsx";

export default function CartView() {
    const { user }= useAuth();
    const navigate = useNavigate();
    const handleCheckout = () => {
        if (!user) {
            console.log("Usuario no autenticado redirigie a login...");
            localStorage.setItem("redirectAfterLogin", "/checkout");
            navigate("/login");
        } else {
            console.log("Usuario autenticado redirige a checkout...");
            navigate(`/checkout`);
        }
    }
 // Se utiliza el hook useCart para obtener el carrito, el estado de carga y el estado de error.
    const {cart,loading, error, updateQuantity, removeFromCart, clearCart} = useCart();
    if(loading) return <p>Cargar carrito...</p>
    if(error) return <p>Error: {error.message || String(error)}</p>;



    return (
        <>
            <NavbarH />
            <header className="public-home-header">
                <p className="sub-heading">
                    <Link to="/categorias" className="hover:underline text-blue-600">FLORISTERÍA</Link> / CARRITO
                </p>
            </header>
            <section className="p-6 max-w-3xl mx-auto">
                <h2 className="text-center text-gray-800 text-3xl font-bold my-6">Carrito</h2>
                {cart.items.length === 0 ? (
                    <p className="sub-heading">Tu carrito está vacío. <Link to="/categorias" className="text-blue-600 underline">Seguir comprando </Link></p>

                ) : (
                    <>
                        <ul>

                            {cart.items.map((item , index) => (

                                <li key={item.productId || index} className="mb-4 border-2 border-gray-200 p-4 rounded flex gap-4">
                                   {/* {console.log(" item completo:", item.productId, item.productName, item.imageUrl, item.price, item.quantity)}*/}


                                    <img
                                        src={item.imageUrl || "/placeholder.svg"}
                                        alt={item.productName}
                                        className="w-40 h-40 object-cover rounded"
                                    />
                                    <div>
                                    <h3 className="heading text-xl font-bold" >{item.productName}</h3>
                                        <p className="sub-heading text-gray-600">{item.description}</p>
                                        <p className="font-bold">Precio: {item.price} €</p>
                                        {/* cantidad-> añadir o restar*/ }
                                        <div className="flex items-center gap-2">{/* Se muestra un input para modificar la cantidad del producto */ }
                                            <label htmlFor={`cantidad-${item.productId}`} className="text-sm font-medium">{/* Se muestra un label para la cantidad */ }
                                                Cantidad:
                                            </label>
                                            {/* Se muestra un botón para restar la cantidad */ }
                                            <button

                                                onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                                                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">−
                                            </button>
                                            {/* Se muestra un input para modificar la cantidad del producto */ }
                                            <input id={`cantidad-${item.productId}`} type="number" min="1"
                                                   value={item.quantity}
                                                   onChange={(e) => {
                                                       const nuevaCantidad = parseInt(e.target.value);
                                                       console.log("input cambiado : ",nuevaCantidad);
                                                       if (!isNaN(nuevaCantidad) && nuevaCantidad > 0) {
                                                           removeFromCart(item.productId);
                                                       }
                                                   }}
                                                   className="border w-16 text-center"
                                            />
                                            {/* Se muestra un botón para sumar la cantidad */ }
                                            <button onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 gap-2">+
                                            </button>
                                        </div>


                                   <button className="bg-transparent border-2 border-gray-200 text-grey-800 px-4 my-2 mx-2 py-2 rounded hover:bg-gray-200 gap-2 " onClick={() => removeFromCart(item.productId)}>Eliminar</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <h4 className=" m-6 font-bold">Total: {cart.totalPrice.toFixed(2)} €</h4>
                        <button onClick={clearCart} className="bg-transparent border-2 border-gray-200 text-grey px-6  py-2 rounded hover:bg-gray-200">
                            Vaciar carrito
                        </button>

                        <button onClick={handleCheckout} className="bg-transparent border-2 border-gray-200 text-grey mx-2 px-6 py-2 rounded hover:bg-gray-200">
                            Finalizar compra
                        </button>
                    </>
                )}
            </section>
            <Footer />
        </>
    );


}