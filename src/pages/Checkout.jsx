import { Link, useParams } from 'react-router-dom';
import NavbarH from "@/components/NavbarH.jsx";
import Footer from "@/components/Footer.jsx";
import React from "react";
import { useCart } from "@/hooks/UseCart.jsx";
import { useAuth } from "@/AuthContext.jsx";

const Checkout = () => {
    const { id } = useParams();
    const { cart, clearCart } = useCart();
    const { user } = useAuth();

    const handleConfirm = async () => {
        try {
            const response = await fetch(`http://localhost:8080/order/create/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`, // si usas JWT
                },
                body: JSON.stringify({
                    userId: id,
                    totalPrice: cart.totalPrice,
                    items: cart.items.map((item) => ({
                        productName: item.productName,
                        quantity: item.quantity,
                        price: item.price,
                        imageUrl: item.imageUrl
                    }))
                }),
            });

            if (!response.ok) throw new Error("Error al guardar el pedido");

            clearCart();
            alert("✅ Pedido realizado correctamente");
        } catch (error) {
            console.error("❌ Error al confirmar el pedido:", error);
            alert("Error al confirmar el pedido");
        }
    };

    return (
        <>
            <NavbarH />
            <header className="public-home-header">
                <p className="sub-heading">
                    <Link to="/categorias" className="hover:underline text-blue-600">FLORISTERÍA</Link> /
                    <Link to="/cart" className="hover:underline text-blue-600 mx-1">CARRITO</Link> / CHECKOUT
                </p>
            </header>

            <section className="p-6 max-w-3xl mx-auto">
                <h2 className="h-auto text-center my-6">Checkout</h2>

                {cart.items.length === 0 ? (
                    <p className="sub-heading">Tu carrito está vacío.</p>
                ) : (
                    <>
                        <ul>
                            {cart.items.map((item, index) => (
                                <li
                                    key={item.productId || index}
                                    className="mb-4 border-2 border-gray-200 p-4 rounded flex gap-4"
                                >
                                    <img
                                        src={item.imageUrl || "/placeholder.svg"}
                                        alt={item.productName}
                                        className="w-40 h-40 object-cover rounded"
                                    />
                                    <div className="flex flex-col justify-between">
                                        <h3 className="text-xl font-bold">{item.productName}</h3>
                                        <p className="text-gray-600">{item.description}</p>
                                        <p className="font-bold">Precio: {item.price} €</p>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium">Cantidad:</span>
                                            <span className="ml-2 font-semibold">{item.quantity}</span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <h4 className="m-6 font-bold">Total: {cart.totalPrice.toFixed(2)} €</h4>

                        <form onSubmit={handleConfirm}>
                            {/* Dirección de envío */}
                            <input name="address" placeholder="Dirección" required />
                            <input name="city" placeholder="Ciudad" required />
                            <input name="postalCode" placeholder="Código Postal" required />

                            {/* Método de pago */}
                            <select name="paymentMethod" required>
                                <option value="tarjeta">Tarjeta</option>
                                <option value="paypal">PayPal</option>
                                <option value="efectivo">Pago a la entrega</option>
                            </select>

                            <button type="submit">Confirmar pedido</button>
                        </form>

                        <button
                            onClick={handleConfirm}
                            className="bg-transparent border-2 text-gray-700 mx-2 px-6 py-2 rounded hover:bg-gray-100"
                        >
                            Confirmar pedido
                        </button>
                    </>
                )}
            </section>

            <Footer />
        </>
    );
};

export default Checkout;