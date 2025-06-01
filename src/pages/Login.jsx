// src/Login.jsx
import React, { useState } from "react";
import "../css/Contact.css"; // Reutilizamos los estilos del contacto
import NavbarH from "@/components/NavbarH.jsx";
import Footer from "@/components/Footer.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/AuthContext";
import LOCALSERVERBASEURL from "@/Configuration/ConectionConfig.js";

export default function Login() {
    const { login } = useAuth();
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phone: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isLoginForm
            ? `${LOCALSERVERBASEURL}/auth/login`
            : `${LOCALSERVERBASEURL}/auth/register`;

        const payload = isLoginForm
            ? { email: formData.email, password: formData.password }
            : {
                email: formData.email,
                password: formData.password,
                firstName: formData.firstName,
                lastName: formData.lastName,
                phone: formData.phone,
            };

        try {
            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Error al iniciar sesión");

            // Guardar en contexto y en localStorage
            login(data.accessToken, data.roles, data.userId, data.name, data.email);
            localStorage.setItem(
                "user",
                JSON.stringify({
                    accessToken: data.accessToken,
                    roles: data.roles,
                    userId: data.userId,
                    name: data.name,
                    email: data.email,
                })
            );
            localStorage.setItem("token", data.accessToken);

            // Redirección
            const redirect = localStorage.getItem("redirectAfterLogin");
            if (redirect) {
                localStorage.removeItem("redirectAfterLogin");
                navigate(redirect);
            } else if (data.roles.includes("ROLE_ADMIN")) {
                navigate("/admin");
            } else {
                navigate("/");
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <>
            <NavbarH />
            <header className="public-home-header">
                <p className="sub-heading">
                    <Link to="/categorias" className="hover:underline text-blue-600">
                        FLORISTERÍA
                    </Link>{" "}
                    / INICIAR SESIÓN EN LA CUENTA
                </p>
            </header>

            <div className="contact-container">
                <h1 className="contact-title">
                    {isLoginForm ? "Iniciar sesión" : "Crear cuenta"}
                </h1>
                <p className="contact-subtitle">
                    {isLoginForm
                        ? "Accede con tus datos"
                        : "Crea tu cuenta para comenzar a comprar"}
                </p>

                <form onSubmit={handleSubmit} className="contact-form">
                    {!isLoginForm && (
                        <>
                            <div className="form-group">
                                <label htmlFor="firstName">Nombre</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="lastName">Apellidos</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">Teléfono</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </>
                    )}

                    <div className="form-group">
                        <label htmlFor="email">Correo electrónico</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {errorMessage && <p className="error">{errorMessage}</p>}

                    <button
                        type="submit"
                        className="bg-transparent border-2 color-black text-black px-6 py-2 rounded hover:bg-gray-100"
                    >
                        {isLoginForm ? "Iniciar sesión" : "Registrarse"}
                    </button>

                    <p className="signin">
                        {isLoginForm ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
                        <span
                            onClick={() => setIsLoginForm(!isLoginForm)}
                            className="register-link bg-transparent border-2 color-black text-black px-6 py-2 rounded hover:bg-gray-100"
                        >
              {isLoginForm ? "Regístrate aquí" : "Inicia sesión"}
            </span>
                    </p>
                </form>
            </div>

            <Footer />
        </>
    );
}