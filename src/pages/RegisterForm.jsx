import React, { useState } from 'react';
import LOCALSERVERBASEURL from "@/Configuration/ConectionConfig.js";
import {useNavigate} from "react-router-dom";

const RegisterForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: ''
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${LOCALSERVERBASEURL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                //dirige al login despues de regisrtrar
                navigate('/login');
            } else {
                const errorData = await res.json();
                console.error('Algo falló al registrar usuario:', errorData.message);
                alert(errorData.message || 'Error al registrar usuario');

            }
        } catch (error) {
            alert(error.message);
        }
    };
    return (
        <form className="form" onSubmit={handleSubmit}>
            <p className="title">Register</p>
            <p className="message">Signup now and get full access to our app.</p>

            {/* Campo ID */}
            <label className="lab">
                <input
                    required
                    placeholder="Enter your ID"
                    type="text"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                />
                <span>ID</span>
            </label>

            {/* Campo Firstname */}
            <label className="lab">
                <input
                    required
                    placeholder="Enter your First Name"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                />
                <span>Firstname</span>
            </label>

            {/* Campo Lastname */}
            <label className="lab">
                <input
                    required
                    placeholder="Enter your Last Name"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                />
                <span>Lastname</span>
            </label>

            {/* Campo Email */}
            <label className="lab">
                <input
                    required
                    placeholder="Enter your Email"
                    type="email"
                    className="input"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <span>Email</span>
            </label>

            {/* Campo Password */}
            <label className="lab">
                <input
                    required
                    placeholder="Enter your Password"
                    type="password"
                    className="input"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <span>Password</span>
            </label>



            {/* Campo Phone */}
            <label className="lab">
                <input
                    required
                    placeholder="Enter your Phone"
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                />
                <span>Phone</span>
            </label>

            {/* Botón Submit */}
            <button className="submit" type="submit">Submit</button>

            {/* Enlace a la página de login */}
            <p className="signin">Already have an account? <a href="#" className="register_link">Sign In</a></p>
        </form>

    );
};

export default RegisterForm;
