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
            console.log("Usuario no autenticado, redirigiendo a login...");
            localStorage.setItem("redirectAfterLogin", "/checkout");
            navigate("/login");
        } else {
            console.log("Usuario autenticado, redirigiendo a checkout...");
            navigate(`/checkout/${user.id}`);
        }
    }
    const {cart,loading, error, updateQuantity, removeFromCart, clearCart} = useCart();{/* Se utiliza el hook useCart para obtener el carrito, el estado de carga y el estado de error. */ }
    console.log("🛒 Carrito:", cart);
    if(loading) return <p>Cargar carrito...</p>
    if(error) return <p>{error}</p>;



    return (
        <>
            <NavbarH />
            <header className="public-home-header">
                <p className="sub-heading">
                    <Link to="/categorias" className="hover:underline text-blue-600">FLORISTERÍA</Link> / CARRITO
                </p>
            </header>
            <section className="p-6 max-w-3xl mx-auto">
                <h2 className="h-auto text-center my-6">Mi carrito</h2>{/* Se muestra el título del carrito */ }
                {/* Se muestra un mensaje si el carrito está vacío o se muestran los productos en el carrito */ }
                {cart.items.length === 0 ? (
                    <p className="sub-heading">Tu carrito está vacío.</p>
                ) : (
                    <>
                        <ul>

                            {cart.items.map((item , index) => (

                                <li key={item.productId || index} className="mb-4 border-2 color-gray-200 p-4 rounded flex gap-4">
                                   {/* {console.log(" item completo:", item.productId, item.productName, item.imageUrl, item.price, item.quantity)}*/}


                                    <img
                                        src={item.imageUrl || "/placeholder.svg"}
                                        alt={item.productName}
                                        className="w-40 h-40 object-cover rounded"
                                    />
                                    <div>
                                    <h3 className="text-xl font bold" >{item.productName}</h3>
                                        <p className="text-gray-600">{item.description}</p>
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
                                            <input id={`cantidad-${item.productId}`} type="number" min="1" value={item.quantity}
                                                onChange={(e) => {
                                                    const nuevaCantidad = parseInt(e.target.value);
                                                    if (!isNaN(nuevaCantidad) && nuevaCantidad > 0) {updateQuantity(item.productId, nuevaCantidad);}
                                                }} className="border w-16 text-center"
                                            />
                                            {/* Se muestra un botón para sumar la cantidad */ }
                                            <button onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">+
                                            </button>
                                        </div>


                                    <button className="bg-transparent border-2 color-black text-grey px-6  mx-2 py-2 rounded hover:bg-gray-200" onClick={() => removeFromCart(item.productId)}>Eliminar</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <h4 className=" m-6 font-bold">Total: {cart.totalPrice.toFixed(2)} €</h4>
                        <button onClick={clearCart}className="bg-transparent border-2 color-grey text-grey px-6  py-2 rounded hover:bg-gray-200">
                            Vaciar carrito
                        </button>

                        <button onClick={handleCheckout} className="bg-transparent border-2 color-grey text-grey mx-2 px-6 py-2 rounded hover:bg-gray-200">
                            Finalizar compra
                        </button>
                    </>
                )}
            </section>
            <Footer />
        </>
    );


}