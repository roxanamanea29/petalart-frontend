import React, { useState,/* useEffect*/ } from "react";
import { Link, useNavigate } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import { FaUser, FaShoppingBag, FaSearch } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import logo from "@/assets/logo.png";
import { useAuth } from "@/AuthContext.jsx"; // ✅ correcto


const NavbarH = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const { user, logout } = useAuth(); // ✅ correcto uso del AuthContext
    const isAuthenticated = !!user; // ✅ ahora sí puedes usarlo
    const handleLogout = () => {
        localStorage.removeItem("cart");
        logout(); // ✅ llama a la función desde el contexto
        navigate("/");
    };

    return (
        <div className="w-screen bg-white shadow-md z-50 relative">
            <nav className="flex items-center justify-between h-16 px-6  w-screen bg-white shadow-md">
                <button
                    onClick={() => setMenuOpen(true)}
                    className="text-black text-7xl bg-transparent border-none shadow-none outline-none"
                >
                    <HiMenu className="text-3xl" />
                </button>

                <div className="flex justify-center flex-grow md:flex-none">
                    <img src={logo} alt="Logo" className="h-12 w-auto" />
                </div>

            </nav>

            <Menu
                left
                isOpen={menuOpen}
                onStateChange={({ isOpen }) => setMenuOpen(isOpen)}
                width={270}
                className="!bg-white text-lg p-6"
                overlayClassName="!z-40" // ✅ más bajo que el navbar
            >
                <Link className="sub-heading" to="/categories" onClick={() => setMenuOpen(false)}>
                    Usuarios
                </Link>
                <Link className="sub-heading" to="/cart" onClick={() => setMenuOpen(false)}>
                    Pedidos
                </Link>
                <Link className="sub-heading" to="/contacto" onClick={() => setMenuOpen(false)}>
                    Contacto
                </Link>

                {!isAuthenticated ? (
                    <Link className="sub-heading" to="/login" onClick={() => setMenuOpen(false)}>
                        Login
                    </Link>
                ) : (
                    <button
                        onClick={handleLogout}
                        className="sub-heading"
                    >
                        Cerrar sesión
                    </button>
                )}
            </Menu>
        </div>
    );
};

export default NavbarH;