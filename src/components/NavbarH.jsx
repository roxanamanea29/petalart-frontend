import React, { useState, useEffect } from "react";
import { slide as Menu } from "react-burger-menu";
import { FiMenu } from "react-icons/fi";
import { FaUser, FaShoppingBag, FaSearch } from "react-icons/fa";
import logo from "../assets/q.png";
import "../css/NavbarH.css";
import { useNavigate } from 'react-router-dom';

const NavbarH = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        setIsAuthenticated(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
                <FiMenu size={30} color="black" />
            </div>

            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />

                <div className="icons-container">
                    <FaUser className="icon" />
                    <FaShoppingBag className="icon" />
                    <FaSearch className="icon" />
                </div>
            </div>

            <div className="right-space"></div>

            <Menu
                isOpen={menuOpen}
                onStateChange={({ isOpen }) => setMenuOpen(isOpen)}
                right={false}  // Menú a la izquierda
                width={270}
                onMouseLeave={() => setMenuOpen(false)} // Al salir del menú se cierra
            >
                <a className="menu-item" href="/" onClick={() => setMenuOpen(false)}>Inicio</a>
                <a className="menu-item" href="/categories" onClick={() => setMenuOpen(false)}>Productos</a>
                <a className="menu-item" href="/contacto" onClick={() => setMenuOpen(false)}>Contacto</a>

                {!isAuthenticated && (
                    <a href="/login" onClick={() => setMenuOpen(false)}>Login</a>
                )}

                {isAuthenticated && (
                    <button onClick={handleLogout}>Cerrar sesión</button>
                )}
            </Menu>
        </nav>
    );
};

export default NavbarH;
