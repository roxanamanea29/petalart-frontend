import React, {useRef} from "react";
import "../css/Contact.css";
import NavbarH from "@/components/NavbarH.jsx";
import Footer from "@/components/Footer.jsx";
import {Link} from "react-router-dom";
import emailjs from "@emailjs/browser";

export default function Contact() {

    const form = useRef(); //  referencia al formulario

    // Array de imágenes de los Frames
    const frames = [
        "/images/Frame1.png",
        "/images/Frame2.png",
        "/images/Frame3.png",
        "/images/Frame4.png"
    ];

    const sendEmail = (e) => {
        e.preventDefault();
        {/*servicio de emailjs  */
        }
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
            <NavbarH/>
            <header className="public-home-header">
                <p className="sub-heading">
                    <Link to="/categorias" className="hover:underline text-blue-600">FLORISTERÍA</Link> / Contacto
                </p>
            </header>

            {/* Las imágenes de frame las de Figma */}
            <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 gap-2 px-4">
                {frames.map((src, index) => (
                    <div
                        key={index}
                        className="w-full aspect-[5/5] rounded-xl overflow-hidden shadow-lg"
                    >
                        <img
                            src={src}
                            alt={`Frame ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </div>

            {/* contenedor del formulario de contacto */}
            <div className="max-w-3xl mx-auto px-4 mt-5">
                <h1 className=" text-center heading">Contácta con nosotros</h1>
                <p className=" text-5xl text-center heading">PetalArt</p>
                <h3 className="sub-heading text-start">Horario de atención</h3>
                <p className="sub-heading text-start">Lunes a Viernes: 9:00 – 18:00</p>
                <p className="sub-heading text-start">Domingos y festivos: Cerrado</p>
                <h3 className="sub-heading text-start mt-4">Teléfono de contacto</h3>
                <p className="sub-heading text-start"> 📞+34 123 456 789</p>

                <p className="contact-subtitle mt-5">
                    ¿Tienes alguna pregunta o sugerencia? ¡Estamos encantados de escucharte!
                </p>
                <p className="contact-subtitle">¡Contáctanos para cualquier pregunta o inquietud!</p>

                <form ref={form} onSubmit={sendEmail} className="contact-form">
                    <div className="form-group">
                        <label htmlFor="name">Nombre</label>
                        <input type="text" id="name" name="name" placeholder="Tu nombre" required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Correo electrónico</label>
                        <input type="email" id="email" name="email" placeholder="tucorreo@ejemplo.com" required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">Mensaje</label>
                        <textarea id="message" name="message" rows="5" placeholder="Escribe tu mensaje aquí..."
                                  required/>
                    </div>

                    <button type="submit" className="submit-btn">Enviar mensaje</button>
                </form>
            </div>

            <Footer/>
        </>
    )
        ;
}