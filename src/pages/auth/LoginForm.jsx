import React, { useState } from "react";
import "../../css/login_styles.css";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
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
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Función para decodificar el JWT manualmente
    const decodeJwt = (token) => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        const decoded = JSON.parse(atob(base64));
        return decoded;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = isLoginForm
                ? "http://localhost:8080/auth/login"
                : "http://localhost:8080/auth/register";

            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                    isLoginForm
                        ? { email: formData.email, password: formData.password }
                        : {
                            email: formData.email,
                            password: formData.password,
                            firstName: formData.firstName,
                            lastName: formData.lastName,
                            phone: formData.phone,
                        }
                ),
            };

            const response = await fetch(url, requestOptions);
            const data = await response.json();

            if (response.ok && data.accessToken) {
                localStorage.setItem("token", data.accessToken);

                // Decodificar el token manualmente
                const decodedToken = decodeJwt(data.accessToken);
                const roles = decodedToken.a;  // Suponiendo que los roles están en el campo 'a'

                if (Array.isArray(roles)) {
                    localStorage.setItem("roles", JSON.stringify(roles));

                    if (roles.includes("ROLE_ADMIN")) {
                        navigate("/dashboard_admin");
                    } else {
                        navigate("/");
                    }
                } else {
                    throw new Error("No roles received in the response.");
                }
            } else {
                throw new Error("Invalid credentials or missing token");
            }
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage(error.message);
        }
    };


    return (
        <div className="login">
            <div className="login-container">
                <h2>{isLoginForm ? "Iniciar sesión" : "Registrar cuenta"}</h2>
                <form onSubmit={handleSubmit}>
                    {!isLoginForm && (
                        <>
                            <div>
                                <label htmlFor="firstName">Nombre:</label>
                                <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
                            </div>
                            <div>
                                <label htmlFor="lastName">Apellido:</label>
                                <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                            </div>
                            <div>
                                <label htmlFor="phone">Teléfono:</label>
                                <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                            </div>
                        </>
                    )}
                    <div>
                        <label htmlFor="email">Correo electrónico:</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="password">Contraseña:</label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                    </div>
                    {errorMessage && <p className="error">{errorMessage}</p>}
                    <button type="submit">{isLoginForm ? "Iniciar sesión" : "Registrar"}</button>
                </form>

                <p className="signin">
                    {isLoginForm ? "¿No tienes cuenta?" : "¿Ya tienes una cuenta?"}
                    <span onClick={() => setIsLoginForm(!isLoginForm)} className="register-link">
                        {isLoginForm ? " Regístrate aquí" : " Inicia sesión"}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;
