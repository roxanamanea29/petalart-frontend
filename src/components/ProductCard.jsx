import { Link } from "react-router-dom";
import React from "react";

export default function ProductCard({ id, title, imageSrc }) {
    return (
        <div className="w-full h-[650px] relative overflow-hidden group shadow-lg">
            <img
                src={imageSrc}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-center px-5">
                <h2 className="text-xl font-bold mb-2">{title}</h2>
                <Link
                    to={`/productos/${id}`}
                    className="bg-transparent border-2 color-white text-white  px-4 py-2 rounded shadow hover:bg-gray-100 transition"
                >
                    Lo quiero
                </Link>
            </div>
        </div>
    );
}