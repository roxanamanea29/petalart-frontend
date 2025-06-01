import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import NavbarH from "@/components/NavbarH.jsx";
import Footer from "@/components/Footer.jsx";

const SERVICE_ID = "service_4ah0agj";
const TEMPLATE_ID = "template_gwdtvwq";

export default function CheckoutConfirmation() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const order = state?.order;
    const formRef = useRef();
    const [showTips, setShowTips] = useState(false);

    useEffect(() => {
        if (!order) {
            navigate("/categorias");
            return;
        }

        console.log("🏷️ useEffect de CheckoutConfirmation arrancado order =", order);

        const timeoutId = setTimeout(() => {
            const formData = new FormData(formRef.current);
            console.log("📋 Contenido del formRef:", Object.fromEntries(formData.entries()));

            emailjs
                .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current)
                .then((response) => {
                    console.log("✅ Email enviado con sendForm:", response.status, response.text);
                })
                .catch((err) => {
                    console.warn("⚠️ sendForm falló, usando send():", err);
                    const params = Object.fromEntries(formData.entries());
                    emailjs
                        .send(SERVICE_ID, TEMPLATE_ID, params)
                        .then((resp2) => {
                            console.log("✅ Email enviado con send():", resp2.status, resp2.text);
                        })
                        .catch((err2) => {
                            console.error("❌ send() también falló:", err2);
                        });
                });
        }, 100);

        return () => clearTimeout(timeoutId);
    }, [order, navigate]);

    if (!order) return null;

    return (
        <>
            <NavbarH />

            <header className="public-home-header">
                <p className="sub-heading">
                    <Link to="/categorias" className="hover:underline text-blue-600">FLORISTERÍA</Link> / CONFIRMACIÓN DE COMPRA
                </p>
            </header>

            <div className="p-6 max-w-3xl mx-auto text-center">
                <h2 className="text-2xl font-semibold uppercase m-3">¡Gracias por tu compra!</h2>
                <p className="sub-heading">
                    Tu pedido #{order.id} ha sido registrado y pagado con éxito. Hemos enviado un correo a{" "}
                    <strong>{order.userEmail}</strong> con los detalles.
                </p>
                <button
                    onClick={() => navigate("/categorias")}
                    className="mt-4 px-4 py-2 border rounded hover:bg-gray-200"
                >
                    Volver a la tienda
                </button>
            </div>

            <div className="relative text-center mt-10">
                <button
                    onClick={() => setShowTips(!showTips)}
                >
                    <img
                        src="/images/BannerFlowerCareTips.png"
                        alt="Consejos para cuidar tus flores"
                        className="w-auto h-auto mx-auto"
                    />
                </button>
            </div>

            {showTips && (
                <div className="bg-white py-16 px-6 sm:px-12 md:px-20 lg:px-32">
                    <h2 className="text-3xl font-bold text-center text-pink-700 mb-4">
                        🌸 Consejos para cuidar tus flores
                    </h2>
                    <p className="text-center text-gray-600 text-lg mb-10">
                        Aprende cómo mantener tus flores frescas y radiantes por más tiempo
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        <div className="bg-pink-50 rounded-2xl p-6 shadow-md">
                            <h3 className="text-xl font-semibold text-pink-700 mb-2">💧 Riego</h3>
                            <p className="text-gray-700">Riega tus flores cada dos días y asegúrate de que el agua esté limpia y fresca.</p>
                        </div>
                        <div className="bg-pink-50 rounded-2xl p-6 shadow-md">
                            <h3 className="text-xl font-semibold text-pink-700 mb-2">🌤️ Luz</h3>
                            <p className="text-gray-700">Coloca el ramo en un lugar fresco con luz indirecta. Evita el sol directo.</p>
                        </div>
                        <div className="bg-pink-50 rounded-2xl p-6 shadow-md">
                            <h3 className="text-xl font-semibold text-pink-700 mb-2">✂️ Corte de tallos</h3>
                            <p className="text-gray-700">Corta los tallos en diagonal cada dos días para facilitar la absorción del agua.</p>
                        </div>
                        <div className="bg-pink-50 rounded-2xl p-6 shadow-md">
                            <h3 className="text-xl font-semibold text-pink-700 mb-2">🧼 Limpieza</h3>
                            <p className="text-gray-700">Limpia el jarrón cada tres días para evitar bacterias que acorten la vida de las flores.</p>
                        </div>
                        <div className="bg-pink-50 rounded-2xl p-6 shadow-md">
                            <h3 className="text-xl font-semibold text-pink-700 mb-2">🚫 Qué evitar</h3>
                            <p className="text-gray-700">No coloques las flores cerca de frutas, calefacciones o corrientes de aire.</p>
                        </div>
                        <div className="bg-pink-50 rounded-2xl p-6 shadow-md">
                            <h3 className="text-xl font-semibold text-pink-700 mb-2">✅ Bonus</h3>
                            <p className="text-gray-700">Descarga nuestra guía rápida en PDF y ten siempre a mano estos consejos.</p>
                        </div>
                    </div>
                </div>
            )}

            {/* ✅ FORMULARIO OCULTO SIEMPRE EN EL DOM */}
            <form ref={formRef} style={{ display: "none" }}>
                <input type="hidden" name="website_url" value="https://petalart-frontend.onrender.com" />
                <input type="hidden" name="email" value={order.userEmail} />
                <input type="hidden" name="to_email" value={`${order.userEmail},petalartblog@gmail.com`} />
                <input type="hidden" name="order_id" value={order.id} />
                <input type="hidden" name="order_date" value={new Date(order.date).toLocaleString()} />
                {order.items.map((item, idx) => (
                    <React.Fragment key={idx}>
                        <input type="hidden" name={`orders[${idx}].name`} value={item.productName} />
                        <input type="hidden" name={`orders[${idx}].units`} value={item.quantity} />
                        <input type="hidden" name={`orders[${idx}].price`} value={item.price.toFixed(2)} />
                        <input type="hidden" name={`orders[${idx}].image_url`} value={item.imageUrl} />
                    </React.Fragment>
                ))}
                <input type="hidden" name="cost.shipping" value="0.00" />
                <input type="hidden" name="cost.tax" value="0.00" />
                <input type="hidden" name="cost.total" value={order.total.toFixed(2)} />
            </form>

            <Footer />
        </>
    );
}