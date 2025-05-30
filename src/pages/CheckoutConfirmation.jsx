import { Link, useLocation, useNavigate } from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
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

    // Estado para mostrar/ocultar tips de cuidado de flores
    const [showTips, setShowTips] = useState(false);

    // 1️⃣ Si no hay order, redirige al catálogo
    useEffect(() => {
        if (!order) {
            navigate("/categorias");
            return;
        }

        emailjs
            .sendForm(SERVICE_ID, TEMPLATE_ID,formRef.current)
            .then((response) => {
                console.log(" Email de confirmación enviado:", response.status, response.text);
            })
            .catch((err) => {
                console.error(" Error enviando email de confirmación:", err);
            });
    }, [order, navigate]);

    if (!order) return null; // mientras redirige, no renderices nada

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
                    Tu pedido #{order.id} ha sido registrado y pagado con éxito.
                    Hemos enviado un correo a <strong>{order.userEmail}</strong> con los detalles.
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

                {showTips && (
                    <div className="bg-white py-16 px-6 sm:px-12 md:px-20 lg:px-32">
                        {/* …tu sección de tips… */}
                    </div>
                )}

            </div>
            {/* ——— Formulario oculto para EmailJS ——— */}
            <form ref={formRef} style={{ display: "none" }}>
                {/* Campos raíz */}
                <input type="hidden" name="email"       value={order.userEmail} />
                <input type="hidden" name="order_id"    value={order.id} />
                <input type="hidden" name="order_date"  value={new Date(order.date).toLocaleString()} />

                {/* Items: Mustache iterará {{#orders}}…{{/orders}} */}
                {order.items.map((item, idx) => (
                    <React.Fragment key={idx}>
                        <input
                            type="hidden"
                            name={`orders[${idx}].name`}
                            value={item.productName}
                        />
                        <input
                            type="hidden"
                            name={`orders[${idx}].units`}
                            value={item.quantity}
                        />
                        <input
                            type="hidden"
                            name={`orders[${idx}].price`}
                            value={item.price.toFixed(2)}
                        />
                        <input
                            type="hidden"
                            name={`orders[${idx}].image_url`}
                            value={item.imageUrl}
                        />
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