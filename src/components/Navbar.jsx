// Navbar.js
import React, { useState } from 'react';
import { FaBars, FaTimes, FaUser, FaShoppingBag, FaSearch } from 'react-icons/fa';
import '../css/Navbar.css';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="navbar fixed-top">
            <div className="navbar-logo">Mi App</div>

            {/* Iconos debajo del logo */}
            <div className="navbar-icons">
                <FaUser className="icon" />
                <FaShoppingBag className="icon" />
                <FaSearch className="icon" />
            </div>

            <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
                <ul>
                    <li><a href="/src/pages/Dashboard">Inicio</a></li>
                    <li><a href="/about">Acerca de</a></li>
                    <li><a href="/services">Servicios</a></li>
                    <li><a href="/login">Login</a></li>
                    <li><button onClick={() => {
                        localStorage.removeItem("token");
                        window.location.href = "/";
                    }}>
                        Cerrar sesión
                    </button></li>
                </ul>
            </div>

            <div className="navbar-toggle" onClick={toggleMenu}>
                {menuOpen ? <FaTimes /> : <FaBars />}
            </div>
        </nav>
    );
};

export default Navbar;
