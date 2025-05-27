import React from "react";

export default function About() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-10 text-center">
            <h1 className="text-4xl font-bold text-pink-600 mb-6">Sobre PetalArt</h1>
            <p className="text-lg text-gray-700 mb-4">
                En <strong>PetalArt</strong> creemos que cada flor cuenta una historia.
                Nacimos con el propósito de llevar belleza, emoción y arte floral a cada hogar y ocasión especial.
            </p>

            <p className="text-gray-600 mb-4">
                Somos una floristería online apasionada por los detalles, donde cada arreglo se realiza con dedicación,
                amor y un toque único. Ya sea para un cumpleaños, una boda o simplemente para decir "te pienso",
                nuestras flores están pensadas para emocionar.
            </p>

            <p className="text-gray-600 mb-4">
                Trabajamos con flores frescas de temporada y ofrecemos consejos de cuidado a través de nuestro blog,
                para que disfrutes de su belleza por más tiempo.
            </p>

            <h2 className="text-2xl font-semibold text-pink-500 mt-8 mb-2">Nuestra misión</h2>
            <p className="text-gray-600 mb-4">
                Crear experiencias memorables a través del arte floral, uniendo belleza natural y emociones humanas.
            </p>

            <h2 className="text-2xl font-semibold text-pink-500 mt-8 mb-2">Nuestros valores</h2>
            <ul className="list-disc list-inside text-left text-gray-600 mx-auto max-w-xl">
                <li>❤️ Cercanía y empatía con nuestros clientes</li>
                <li>🌿 Respeto por la naturaleza y uso de flores de temporada</li>
                <li>🎨 Creatividad en cada diseño floral</li>
                <li>📦 Compromiso con la entrega puntual y segura</li>
            </ul>
        </div>
    );
}