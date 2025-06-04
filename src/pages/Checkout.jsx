import NavbarH from "@/components/NavbarH.jsx";
import Footer from "@/components/Footer.jsx";
import React, { useState } from "react";
import { useCart } from "@/hooks/UseCart.jsx";
import { useAuth } from "@/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import LOCALSERVERBASEURL from "@/Configuration/ConectionConfig.js";

const Checkout = () => {
    const { user } = useAuth();
    const { cart, clearCart } = useCart();
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
            if (!cart || cart.items.length === 0) {
              alert("El carrito está vacío");
            }
            if (!form.addressType) {
                alert("Debes seleccionar un tipo de dirección.");
                return;
            }
            if (!form.paymentMethod) {
                alert("Selecciona un método de pago.");
                return;
            }

            // 1. Guardar dirección
            const responseAddress = await fetch(
                `${LOCALSERVERBASEURL}/address/save`,
                {
                    method: "POST",
                    headers: getAuthHeaders(),
                    body: JSON.stringify(form),
                }
            );
            if (!responseAddress.ok) {
                alert("Error al guardar la dirección");
            }
            const addressData = await responseAddress.json();
            console.log("Dirección guardada:", addressData);

            const addressId = addressData.id;

            // 2. Crear orden
            const responseCreate = await fetch(
                `${LOCALSERVERBASEURL}/order/create`,
                {
                    method: "POST",
                    headers: getAuthHeaders(),
                    body: JSON.stringify({
                        addressIds: [addressId],
                        items: cart.items.map((item) => ({
                            productId: item.productId,
                            quantity: item.quantity,
                        })),
                        paymentMethod: form.paymentMethod,
                        shippingMethod: form.shippingMethod,
                        addressType: form.addressType,
                    }),
                }
            );
            if (!responseCreate.ok) {
                alert("Error al guardar el pedido");
            }
            const createdOrder = await responseCreate.json();
            console.log("Pedido realizado:", createdOrder);

            // 3. Si fue Pago a la entrega, confirmamos:
            let confirmedOrder = createdOrder;
            if (form.paymentMethod === "CASH_ON_DELIVERY") {
                const resConfirm = await fetch(
                    `${LOCALSERVERBASEURL}/order/${createdOrder.id}/confirm-payment`,
                    {
                        method: "POST",
                        headers: getAuthHeaders(),
                    }
                );
                if (!resConfirm.ok) {
                    const errorBody = await resConfirm.json();
                    alert(errorBody.detail || "Error al confirmar el pago");
                    return;
                }
                confirmedOrder = await resConfirm.json();
                console.log("Pago confirmado para el pedido:", confirmedOrder);
            } else {
                console.log(
                    "No es Cash on Delivery: el backend ya dejó el pedido como pagado."
                );
            }

            // 4. Limpiar carrito y redirigir
            clearCart();
            alert(`Dirección y pedido realizado correctamente #${createdOrder.id}#`);
            const createdOrderWithEmail = {
                ...confirmedOrder,
                userEmail: user.email || "",
            };
            navigate("/checkout/confirmation", {
                state: { order: createdOrderWithEmail },
            });
        } catch (error) {
            console.error("Error al confirmar la dirección o el pedido:", error);
            alert(error.message || "Ocurrió un error al confirmar el pedido");
        }
    };

    return (
        <>
            <NavbarH />
            <header className="public-home-header">
                <p className="sub-heading">
                    <Link to="/categorias" className="hover:underline text-blue-600">
                        FLORISTERÍA
                    </Link>{" "}
                    / <Link to="/cart" className="hover:underline text-blue-600 mx-1">
                    CARRITO
                </Link>{" "}
                    / CHECKOUT
                </p>
            </header>

            <section className="p-6 max-w-3xl mx-auto">
                <h2 className="text-center text-gray-800 text-3xl font-bold my-6">
                    Checkout
                </h2>

                {cart.items.length === 0 ? (
                    <p className="sub-heading">Tu carrito está vacío.</p>
                ) : (
                    <>
                        <ul>
                            {cart.items.map((item, index) => (
                                <li
                                    key={item.productId || index}
                                    className="mb-4 border-2 border-gray-200 p-4 rounded flex flex-col sm:flex-row gap-4"
                                >
                                    <img
                                        src={item.imageUrl || "/placeholder.svg"}
                                        alt={item.productName}
                                        className="w-40 h-40 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold">
                                            {item.productName}
                                        </h3>
                                        <p className="text-gray-600">{item.description}</p>
                                        <p className="font-bold">Precio: {item.price} €</p>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium">Cantidad:</span>
                                            <span className="ml-2 font-semibold">
                        {item.quantity}
                      </span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleConfirm();
                            }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4 border-2 border-gray-200 p-4 rounded"
                        >
                            {/*total*/}
                            <div className="col-span-1 md:col-span-2 text-right text-lg font-semibold border-t pt-4">
                                <h4 className="font-bold">
                                    Total: {cart.totalPrice.toFixed(2)} €
                                </h4>
                            </div>

                            {/* Dirección */}
                            <div className="col-span-1 md:col-span-2">
                            <h3 className="text-xl font-bold col-span-full mt-6">Dirección</h3>
                            </div>
                            <input
                                name="street"
                                value={form.street}
                                onChange={(e) =>
                                    setForm({ ...form, street: e.target.value })
                                }
                                placeholder="Calle"
                                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                                required
                            />
                            <input
                                name="streetNumber"
                                value={form.streetNumber}
                                onChange={(e) =>
                                    setForm({ ...form, streetNumber: e.target.value })
                                }
                                placeholder="Número"
                                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                                required
                            />
                            <input
                                name="city"
                                value={form.city}
                                onChange={(e) =>
                                    setForm({ ...form, city: e.target.value })
                                }
                                placeholder="Ciudad"
                                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                                required
                            />
                            <input
                                name="state"
                                value={form.state}
                                onChange={(e) =>
                                    setForm({ ...form, state: e.target.value })
                                }
                                placeholder="Comunidad"
                                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                                required
                            />
                            <input
                                name="country"
                                value={form.country}
                                onChange={(e) =>
                                    setForm({ ...form, country: e.target.value })
                                }
                                placeholder="País"
                                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                                required
                            />
                            <input
                                name="zipCode"
                                value={form.zipCode}
                                onChange={(e) =>
                                    setForm({ ...form, zipCode: e.target.value })
                                }
                                placeholder="Código Postal"
                                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                                required
                            />

                            {/*Tipo de direccion*/}
                            <div className="col-span-1 md:col-span-2">
                            <h3 className="text-xl font-bold col-span-full mt-6">
                                Tipo de dirección
                            </h3>
                            <select
                                name="addressType"
                                value={form.addressType}
                                onChange={(e) =>
                                    setForm({ ...form, addressType: e.target.value })
                                }
                                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                                required
                            >
                                <option value="">Tipo de dirección</option>
                                <option value="SHIPPING">Dirección de envío</option>
                                <option value="BILLING">Dirección de facturación</option>
                                <option value="BOTH">Ambas direcciones</option>
                            </select>
                            </div>

                            {/*Método de pago*/}
                            <div className="col-span-1 md:col-span-2">
                            <h3 className="text-xl font-bold col-span-full mt-6">
                                Método de pago
                            </h3>
                            <select
                                name="paymentMethod"
                                value={form.paymentMethod}
                                onChange={(e) =>
                                    setForm({ ...form, paymentMethod: e.target.value })
                                }
                                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                                required
                            >
                                <option value="">Selecciona método de pago</option>
                                <option value="CREDIT_CARD">Tarjeta de crédito</option>
                                <option value="PAYPAL">PayPal</option>
                                <option value="CASH_ON_DELIVERY">Pago a la entrega</option>
                            </select>
                            </div>

                            {/*Método de envío*/}
                            <div className="col-span-1 md:col-span-2">
                            <h3 className="text-xl font-bold col-span-full mt-6">
                                Método de envío
                            </h3>
                            <select
                                name="shippingMethod"
                                value={form.shippingMethod}
                                onChange={(e) =>
                                    setForm({ ...form, shippingMethod: e.target.value })
                                }
                                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                                required
                            >
                                <option value="">Selecciona método de envío</option>
                                <option value="STANDARD">Standard</option>
                                <option value="EXPRESS">Express</option>
                                <option value="PICKUP">Recoger en tienda</option>
                            </select>
                            </div>
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

            <Footer />
        </>
    );
};

export default Checkout;