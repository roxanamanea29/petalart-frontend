import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import Footer from "@/components/Footer.jsx";
import NavbarH from "@/components/NavbarH.jsx";

const CheckoutConfirmation = () => {
    const navigate = useNavigate();
    const handleContinueShopping = () => {
        navigate("/categorias");
    }
    const [showTips, setShowTips] = useState(false);

        return (
            <>
                <NavbarH />

                <header className="public-home-header">
                    <p className="sub-heading">
                        <Link to="/categorias" className="hover:underline text-blue-600">FLORISTERÍA</Link> / CONFIRMACIÓN DE COMPRA
                    </p>
                </header>

                        <h2 className=" text-2xl text-center con font-semibold uppercase m-3">¡Gracias por tu compra!</h2>
                        <p className="sub-heading">
                            Tu pedido ha sido registrado correctamente. Pronto recibirás un correo de confirmación con los detalles.
                        </p>





                        <div className="flex justify-center">
                            <button
                                onClick={handleContinueShopping}
                                type="submit"
                                className="col-span-full mt-4 bg-transparent border-2 border-gray-200 text-gray-800  px-4 py-2 rounded hover:bg-gray-200"
                            >
                                Volver a la tienda
                            </button>
                        </div>

                <div className="relative text-center mt-10">


                    <button
                        onClick={() => setShowTips(!showTips)}
                      /*  className="mt-4 inline-block bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition"*/
                    > <img
                        src="/images/BannerFlowerCareTips.png"
                        alt="Consejos para cuidar tus flores"
                        className="w-auto h-auto mx-auto"
                    />
                        {/*{showTips ? "Ocultar consejos" : "Leer consejos"}*/}
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



                <div className="mt-10 flex flex-wrap justify-center items-center gap-6 text-sm text-gray-700">
                    <img src="/images/frescas.png" alt="🌱 Flores frescas de temporada" className="h-80" />
                    <img src="/images/entrega.png" alt="🎁 Entrega en 24h en tu ciudad" className="h-80" />
                    <img src="/images/disenno.png" alt="🖐️ Diseños artesanales y únicos" className="h-80" />
                    <img src="/images/atencion.png" alt="💬 Atención personalizada" className="h-80" />
                </div>

                <Footer />
            </>
        )
    }
export default CheckoutConfirmation;