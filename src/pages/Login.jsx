import React, { useState } from "react";
import "../css/Contact.css"; // Reutilizamos los estilos del contacto
import NavbarH from "@/components/NavbarH.jsx";
import Footer from "@/components/Footer.jsx";
import {Link, useNavigate} from "react-router-dom";
import { useAuth } from "@/AuthContext";

const Login = () => {
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
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isLoginForm
            ? "http://localhost:8080/auth/login"
            : "http://localhost:8080/auth/register";

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
            console.log("🧪 JWT recibido:", data.accessToken);
            console.log("🧪 Roles recibidos:", data.roles);

            login(data.accessToken, data.roles); // Guardar el token y el userId en el contexto

            navigate("/");
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <>
            <NavbarH />
            <header className="public-home-header">
                <p className="sub-heading">
                    <Link to="/categorias" className="hover:underline text-blue-600">FLORISTERÍA</Link> / INICIAR SESIÖN EN LA CUENTA
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

                    <button type="submit" className="submit-btn">
                        {isLoginForm ? "Iniciar sesión" : "Registrarse"}
                    </button>

                    <p className="signin">
                        {isLoginForm ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
                        <span
                            onClick={() => setIsLoginForm(!isLoginForm)}
                            className="register-link"
                        >
                            {isLoginForm ? "Regístrate aquí" : "Inicia sesión"}
                        </span>
                    </p>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default Login;