import { Link } from "react-router-dom";
import React from "react";


export default function AddToCartModal({ isOpen, onClose }){
    if(!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center">
                <h2 className="heading">¡Producto añadido al carrito!</h2>
                <p className="sub-heading">¿Qué quieres hacer ahora?</p>

                <div className="flex justify-center gap-4">
                    <button
                        onClick={onClose}
                        className="bg-transparent border-2 color-black text-black px-6 py-2 rounded hover:bg-gray-800"
                    >
                        Seguir comprando
                    </button>

                    <Link
                        to="/cart"
                        className="bg-transparent border-2 color-black text-black px-6 py-2 rounded hover:bg-gray-800"
                    >
                        Ir al carrito
                    </Link>
                </div>
            </div>
        </div>
    )
}