import React from "react";


export default function Boton({ onClick }) {

    return(
        <button onClick={onClick} className="bg-transparent border-2 color-black text-black px-4 py-2 rounded hover:bg-gray-200">
            X
        </button>
    );
}
