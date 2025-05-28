import React from "react";
import NavbarH from "@/components/NavbarH.jsx";
import Footer from "@/components/Footer.jsx";
import {Link} from "react-router-dom";

export default function AboutView() {
    return (
        <>
            <NavbarH />
            <header className="public-home-header">
                <p className="sub-heading">
                    <Link to="/categorias" className="hover:underline text-blue-600">FLORISTERÍA</Link> / SOBRE NOSOTROS
                </p>
            </header>
            <div className="max-w-5xl mx-auto px-6 py-14 text-center bg-white rounded-xl shadow-md">
                <h1 className="text-5xl font-extrabold tracking-tight mb-5">Sobre PetalArt</h1>

                <p className="text-xl text-gray-700 mb-6">
                    En <strong>PetalArt</strong> creemos que cada flor cuenta una historia.
                    Nacimos con el propósito de llevar belleza, emoción y arte floral a cada hogar y ocasión especial.
                </p>

                <p className="text-lg text-gray-600 mb-4">
                    Somos una floristería online apasionada por los detalles, donde cada arreglo se realiza con
                    dedicación, amor y un toque único. Ya sea para un cumpleaños, una boda o simplemente para decir "te pienso",
                    nuestras flores están pensadas para emocionar.
                </p>

                <p className="text-lg text-gray-600 mb-6">
                    Trabajamos con flores frescas de temporada y ofrecemos consejos de cuidado a través de nuestro blog,
                    para que disfrutes de su belleza por más tiempo.
                </p>

                <h2 className="text-2xl mt-10 mb-3">Nuestra misión</h2>
                <p className="text-lg text-gray-600 mb-6">
                    Crear experiencias memorables a través del arte floral, uniendo belleza natural y emociones humanas.
                </p>

                <h2 className="text-2xl mt-10 mb-3">Nuestros valores</h2>
                <ul className="list-disc list-inside text-left text-gray-600 mx-auto max-w-2xl text-lg space-y-2">
                    <li>️Cercanía y empatía con nuestros clientes</li>
                    <li>Respeto por la naturaleza y uso de flores de temporada</li>
                    <li>Creatividad en cada diseño floral</li>
                    <li>Compromiso con la entrega puntual y segura</li>
                </ul>
            </div>
            <Footer />
        </>
    );
}