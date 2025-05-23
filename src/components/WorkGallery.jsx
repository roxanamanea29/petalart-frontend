import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import '../App.css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

//se decaran las imágenes que se van a utilizar en la galería
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
    // Se utiliza el  hook de estado para manejar el swiper de miniaturas. thumbsSwiper es la variable que contiene el swiper de miniaturas y setThumbsSwiper es la función que se utiliza para actualizar el estado.
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    //si no hay imágenes en la galería, se muestra un mensaje indicando que no hay imágenes
    if (!images || images.length === 0) {
        return <p>No hay imágenes en la galería.</p>;
    }

    //si hay imágenes en la galería, se muestra el swiper con las imágenes
    return (
        <>
            {/* se añade un texto descriptivo para la galeria. */}

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
            <Swiper
                // Se utiliza el Swiper principal para mostrar las imágenes grandes
                className=" bg-black w-full h-[600px] overflow-hidden border-8 border-gray-500 rounded-lg mb-4"
                // Se utiliza el Swiper de navegación y paginación y paginación
                modules={[Navigation, Pagination, Thumbs]}
                spaceBetween={30}
                slidesPerView={1}
                //la navegación habilita los botones laterales
                navigation style={{ color: 'white'}}
                // se utiliza la paginación de tipo dynamicBullets para mostrar los puntos de paginación
                pagination={{ clickable: true, dynamicBullets: true }}
                thumbs={{ swiper: thumbsSwiper }}
            >
                {/* Se mapean las imágenes para crear los slides */}
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

            {/* Se utiliza el Swiper de miniaturas para mostrar las imágenes en miniaturas */}
            <Swiper
                //se activa el swiper de miniaturas
                modules={[Thumbs]}
                //guarda la referencia al swiper de miniaturas
                onSwiper={setThumbsSwiper}
                //se define el espacio entre las miniaturas
                spaceBetween={10}
                //se define el número de miniaturas que se mostrarán en la pantalla
                slidesPerView={6}
                //observa el movimiento de las miniaturas
                watchSlidesProgress
                //free mode permite que las miniaturas se desplacen libremente
                freeMode={true}
                className="w-full h-[100px]"
            >
                {/* Se mapean las imágenes para crear los slides de miniaturas */}
                {images.map((src, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={src}
                            alt={`Miniatura ${index + 1}`}
                            className="w-full h-full object-cover cursor-pointer border border-gray-300 rounded hover:border-green-500 transition duration-300 ease-in-out"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
        </>
    );
}