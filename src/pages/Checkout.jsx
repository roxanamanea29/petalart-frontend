
import NavbarH from "@/components/NavbarH.jsx";
import Footer from "@/components/Footer.jsx";
import React, {useState} from "react";
import {useCart} from "@/hooks/UseCart.jsx";
import {useAuth} from "@/AuthContext.jsx";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import LOCALSERVERBASEURL from "@/Configuration/ConectionConfig.js";
const Checkout = () => {
    const { user } = useAuth();
    const {cart, clearCart} = useCart();
    const navigate = useNavigate();

    const getAuthHeaders = () => ({
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    });
    const [form, setForm] = useState({
        street: "",
        streetNumber: "",
        city: "",
        state: "",
        country: "",
        zipCode: "",
        addressType: "",
        paymentMethod: "",
        shippingMethod: "",
    });


    const handleConfirm = async () => {
        try {
            if (!user || !user.token) {
                alert("Por favor inicia sesión para confirmar tu pedido");
                return;
            }

            if(!cart || cart.items.length === 0) {
                throw new Error("El carrito está vacío");
            }

            // Validar los campos obligatorios para enviar eñ formulario
            if (!form.addressType) {
                alert("Debes seleccionar un tipo de dirección.");
                return;
            }

            if (!form.paymentMethod) {
                alert("Selecciona un método de pago.");
                return;
            }

            // 1. Guardar dirección
            const responseAddress = await fetch(`${LOCALSERVERBASEURL}/address/save`, {
                method: "POST",
                headers:getAuthHeaders(),
                body: JSON.stringify(form),
            });

            if (!responseAddress.ok) throw new Error("Error al guardar la dirección");
            const addressData = await responseAddress.json();
            console.log("Dirección guardada:", addressData);

            const addressId = addressData.id;

            // 2. Crear orden
            const responseCreate = await fetch(`${LOCALSERVERBASEURL}/order/create`,  {
                method: "POST",
                headers:getAuthHeaders(),
                body: JSON.stringify({
                    addressIds: [addressId],
                    items: cart.items.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity,
                    })),
                    paymentMethod: form.paymentMethod,
                    shippingMethod: form.shippingMethod,
                    addressType: form.addressType,
                }),
            });

            if (!responseCreate.ok) throw new Error("Error al guardar el pedido");

            const createdOrder = await responseCreate.json();
            console.log("Pedido realizado:", createdOrder);


            // Confirmar pago
            const resConfirm = await fetch(
                `${LOCALSERVERBASEURL}/order/${createdOrder.id}/confirm-payment`,
                {
                    method: "POST",
                    headers: getAuthHeaders(),
                }
            );
            if (!resConfirm.ok) {
                throw new Error("Error al confirmar el pago del pedido");
            }
            const confirmedOrder = await resConfirm.json();
            console.log("Pago confirmado para el pedido:", confirmedOrder);


            clearCart();
            alert(`Dirección y pedido realizado correctamente #${createdOrder.id}#`);
            // antes de redirigir  a la página de confirmación del pedido incluimos el email del usuario
            console.log("📧 Email del usuario:", user?.email);
            // Redirigir a la página de confirmación del pedido
            const createdOrderWithEmail = {
                ...confirmedOrder,
                userEmail: user.email || "",
            }
            navigate("/checkout/confirmation", { state: { order: createdOrderWithEmail } });

        } catch (error) {
            console.error("Error al confirmar la dirección o el pedido:", error);
            alert("Ocurrió un error al confirmar el pedido");
        }
    };
    return (
        <>
            <NavbarH/>
            <header className="public-home-header">
                <p className="sub-heading">
                    <Link to="/categorias" className="hover:underline text-blue-600">FLORISTERÍA</Link> /
                    <Link to="/cart" className="hover:underline text-blue-600 mx-1">CARRITO</Link> / CHECKOUT
                </p>
            </header>


            <section className="p-6 max-w-3xl mx-auto">
                <h2 className="text-center text-gray-800 text-3xl font-bold my-6">Checkout</h2>

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


                        <form
                            //formulario para confirmar el pedido
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleConfirm();
                            }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 border-2 border-gray-200 p-4 rounded"
                        >
                            <div className="col-span-full text-right text-lg font-semibold mt-4 border-t pt-4">
                                <h4 className="m-6 my-5 py-5 font-bold">Total: {cart.totalPrice.toFixed(2)} €</h4> {/*toFixed es un metodo que representa un número con decimales fijos. */}
                            </div>

                            <h3 className="text-xl font-bold col-span-full mt-6">Dirección</h3>
                            <input name="street" value={form.street}
                                   onChange={(e) => setForm({...form, street: e.target.value})} placeholder="Calle"
                                   className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                                   required />
                            <input name="streetNumber" value={form.streetNumber}
                                   onChange={(e) => setForm({...form, streetNumber: e.target.value})} placeholder="Número"
                                   className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                                   required />
                            <input name="city" value={form.city}
                                   onChange={(e) => setForm({...form, city: e.target.value})} placeholder="Ciudad"
                                   className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                                   required />
                            <input name="state" value={form.state}
                                   onChange={(e) => setForm({...form, state: e.target.value})} placeholder="Comunidad"
                                   className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                                   required />
                            <input name="country" value={form.country}
                                   onChange={(e) => setForm({...form, country: e.target.value})} placeholder="País"
                                   className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                                   required />
                            <input name="zipCode" value={form.zipCode}
                                   onChange={(e) => setForm({...form, zipCode: e.target.value})} placeholder="Código Postal"
                                   className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                                   required />

                            <select name="addressType" value={form.addressType}
                                    onChange={(e) => setForm({...form, addressType: e.target.value})}
                                    className="col-span-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 transition"
                                    required>
                                <option value="">Tipo de dirección</option>
                                <option value="SHIPPING">Dirección de envío</option>
                                <option value="BILLING">Dirección de facturación</option>
                                <option value="BOTH">Ambas direcciones</option>
                            </select>

                            <h3 className="text-xl font-bold col-span-full mt-6">Método de pago</h3>

                            <select name="paymentMethod" value={form.paymentMethod}
                                    onChange={(e) => setForm({...form, paymentMethod: e.target.value})}
                                    className="col-span-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 transition"
                                    required>
                                <option value="">Selecciona método de pago</option>
                                <option value="CREDIT_CARD">Tarjeta de crédito</option>
                                <option value="PAYPAL">PayPal</option>
                                <option value="CASH_ON_DELIVERY">Pago a la entrega</option>
                            </select>

                            <h3 className="text-xl font-bold col-span-full mt-6">Método de envío</h3>
                            <select name="shippingMethod" value={form.shippingMethod}
                                    onChange={(e) => setForm({...form, shippingMethod: e.target.value})}
                                    className="col-span-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 transition"
                                    required>
                                <option value="">Selecciona método de envío</option>
                                <option value="STANDARD">Standard</option>
                                <option value="EXPRESS">Express</option>
                                <option value="PICKUP">Recoger en tienda</option>
                            </select>

                            <button
                                type="submit"
                                className="col-span-full mt-4 bg-transparent border-2 border-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-200"
                            >
                                Confirmar pedido
                            </button>
                        </form>
                    </>

                )}
            </section>

            <Footer/>
        </>
    );
};

export default Checkout;