import React from "react";


export default function Contact() {
    return (
        <div className="contact">
            <h1 className="contact-title">Contáctanos</h1>
            <form className="contact-form">
                <input type="text" placeholder="Nombre" required />
                <input type="email" placeholder="Correo electrónico" required />
                <textarea placeholder="Mensaje" required></textarea>
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}