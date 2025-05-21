import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import '../App.css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

const images = [
    '/gallery/arco_banca.png',
    '/gallery/centro_mesa_novios.png',
    '/gallery/centro_mesa_paniculata.JPG',
    '/gallery/centros_escalera.jpg',
    '/gallery/centros_mesa_sin_fondo_ia.png',
    '/gallery/decoracion_boda.jpg',
    '/gallery/decoracion_mama.jpg',
    '/gallery/decoracion_mesa_verde.JPG',
    '/gallery/ram_fucisa.jpeg',
    '/gallery/ramos_pasillo.jpg'
];

export default function WorkGallery() {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    if (!images || images.length === 0) {
        return <p>No hay imágenes en la galería.</p>;
    }

    return (
        <>
            <div className="w-full max-w-7xl mx-auto px-4 mt-10 text-center text-gray-900">
                <h3 className="text-3xl mb-4">
                    En PetalArt te ofrecemos una cuidada selección de <strong>plantas naturales</strong>,
                    <strong> ramos de novia</strong>, <strong>centros florales</strong> y <strong>decoración verde</strong> para cada ocasión.
                </h3>
                <p className="text-2xl mb-6">
                    Cada categoría está pensada para aportar belleza, frescura y elegancia a tus espacios o celebraciones.
                </p>

                <p className="mt-5 text-3xl text-green-700 font-semibold">
                    Descubre algunos de nuestros trabajos más recientes a continuación:
                </p>
            </div>
        <div className="mt-20 w-full max-w-6xl mx-auto">
            {/* Swiper principal */}
            {/* Se utiliza el Swiper principal para mostrar las imágenes grandes */}
            <Swiper
                className=" bg-black w-full h-[600px] overflow-hidden border-8 border-gray-500 rounded-lg mb-4"
                modules={[Navigation, Pagination, Thumbs]}
                spaceBetween={30}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true, dynamicBullets: true }}
                thumbs={{ swiper: thumbsSwiper }}
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={image}
                            alt={`Imagen ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Swiper de las miniaturas */}
            <Swiper
                modules={[Thumbs]}
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={5}
                watchSlidesProgress
                className="w-full h-[100px]"
            >
                {images.map((src, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={src}
                            alt={`Miniatura ${index + 1}`}
                            className="w-full h-full object-cover cursor-pointer border border-gray-300 rounded"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
        </>
    );
}