
import React from 'react';

const HeroBanner = () => {
    return (
        <div className="relative w-full h-[500px] bg-cover bg-center" style={{ backgroundImage: "url('/public/images/e.png)" }}>
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Flores que Hablan por Ti</h1>
                <p className="text-lg md:text-xl max-w-2xl">Descubre nuestra colección de arreglos florales hechos con amor para cada ocasión especial.</p>
            </div>
        </div>
    );
};

export default HeroBanner;
