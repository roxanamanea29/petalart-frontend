import React from "react";
import "../css/Contact.css";
import NavbarH from "@/components/NavbarH.jsx";
import Footer from "@/components/Footer.jsx";
import {Link} from "react-router-dom";

export default function Contact() {
    return (
        <>
        <NavbarH />
            <header className="public-home-header">
                <p className="sub-heading">
                    <Link to="/categorias" className="hover:underline text-blue-600">FLORISTERÍA</Link> / Contacto
                </p>
            </header>
        <div className="contact-container">
            <h1 className="contact-title">Contáctanos</h1>
            <p className="contact-subtitle">¿Tienes alguna pregunta o quieres hacernos una sugerencia? ¡Estamos encantados de escucharte!</p>

            <form className="contact-form">
                <div className="form-group">
                    <label htmlFor="name">Nombre</label>
                    <input type="text" id="name" name="name" placeholder="Tu nombre" required />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Correo electrónico</label>
                    <input type="email" id="email" name="email" placeholder="tucorreo@ejemplo.com" required />
                </div>

                <div className="form-group">
                    <label htmlFor="message">Mensaje</label>
                    <textarea id="message" name="message" rows="5" placeholder="Escribe tu mensaje aquí..." required />
                </div>

                <button type="submit" className="submit-btn">Enviar mensaje</button>
            </form>
        </div>
            <Footer />
        </>
    );
}