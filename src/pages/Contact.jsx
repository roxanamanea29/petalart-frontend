import React, { useRef } from "react";
import "../css/Contact.css";
import NavbarH from "@/components/NavbarH.jsx";
import Footer from "@/components/Footer.jsx";
import { Link } from "react-router-dom";
import emailjs from "emailjs-com";

export default function Contact() {

    const form = useRef(); //  referencia al formulario

    const sendEmail = (e) => {
        e.preventDefault();
        {/*servicio de emailjs  */}
        emailjs.sendForm(
            "service_4ah0agj",         //  SERVICE ID de cuenta de emailJS
            "template_gwdtvwq",        // el TEMPLATE ID
            form.current,
            "CI45b8UMxUYMyNhFT"      //  la PUBLIC KEY de emailJS
        ).then(
            (result) => {
                alert("Mensaje enviado con éxito");
                console.log(result.text);
                form.current.reset(); // limpia el formulario
            },
            (error) => {
                alert("Error al enviar el mensaje");
                console.log(error.text);
            }
        );
    };

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
                <p className="contact-subtitle">
                    ¿Tienes alguna pregunta o sugerencia? ¡Estamos encantados de escucharte!
                </p>

                <form ref={form} onSubmit={sendEmail} className="contact-form">
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