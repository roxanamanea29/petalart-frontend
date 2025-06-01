import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";        // ✔
import NavbarH from "@/components/NavbarH.jsx";
import Footer from "@/components/Footer.jsx";

const SERVICE_ID  = "service_4ah0agj";         // Tu Service ID
const TEMPLATE_ID = "template_gwdtvwq";        // Tu Template ID

export default function CheckoutConfirmation() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const order = state?.order;
    const formRef = useRef(); // referencia al formulario

    const [showTips, setShowTips] = useState(false);

    // 1️⃣ Si no hay order, redirige al catálogo
    useEffect(() => {
        if (!order) {
            navigate("/categorias");
            return;
        }

        console.log("🏷️ useEffect de CheckoutConfirmation arrancado order =", order);
        //añadir timeout para dejar tiempo al usuario de que realize el pedido
        const timeoutId = setTimeout(() => {


        // Antes de enviar, volcamos el contenido del form oculto:
        const formData = new FormData(formRef.current);
        console.log("📋 Contenido del formRef:", Object.fromEntries(formData.entries()));

        // Intentamos primero sendForm
        emailjs
            .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current)
            .then((response) => {
                console.log(" Email enviado con sendForm OK:", response.status, response.text);
            })
            .catch((err) => {
                console.warn(" sendForm falló, probamos con send():", err);
                // Fallback a send() con parámetros
                const params = Object.fromEntries(formData.entries());
                emailjs
                    .send(SERVICE_ID, TEMPLATE_ID, params)
                    .then((resp2) => {
                        console.log("Email enviado con send() OK:", resp2.status, resp2.text);
                    })
                    .catch((err2) => {
                        console.error(" send() también falló:", err2);
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
                    <Link to="/categorias" className="hover:underline text-blue-600">
                        FLORISTERÍA
                    </Link>{" "}
                    / CONFIRMACIÓN DE COMPRA
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
                <div className="relative text-center mt-10">
                    <button onClick={() => setShowTips(!showTips)}>
                        <img
                            src="/images/BannerFlowerCareTips.png"
                            alt="Consejos para cuidar tus flores"
                            className="w-auto h-auto mx-auto"
                        />
                    </button>
                </div>
                {showTips && <div className="bg-white py-16 px-6">…tus tips…</div>}
            </div>

            <form ref={formRef} style={{ display: "none" }}>
                {/* …resto de campos… */}
                <input type="hidden" name="website_url"    value="https://petalart-frontend.onrender.com" />
                <input type="hidden" name="email"          value={order.userEmail} />
                <input type="hidden" name="order_id"       value={order.id} />
                <input type="hidden" name="order_date"     value={new Date(order.date).toLocaleString()} />
                {order.items.map((item, idx) => (
                    <React.Fragment key={idx}>
                        <input type="hidden" name={`orders[${idx}].name`}      value={item.productName} />
                        <input type="hidden" name={`orders[${idx}].units`}     value={item.quantity} />
                        <input type="hidden" name={`orders[${idx}].price`}     value={item.price.toFixed(2)} />
                        <input type="hidden" name={`orders[${idx}].image_url`} value={item.imageUrl} />
                    </React.Fragment>
                ))}
                <input type="hidden" name="cost.shipping" value="0.00" />
                <input type="hidden" name="cost.tax"      value="0.00" />
                <input type="hidden" name="cost.total"    value={order.total.toFixed(2)} />
            </form>

            <Footer />
        </>
    );
}