// NavbarH.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { slide as Menu } from "react-burger-menu"; // react-burger-menu
import { FaUser, FaShoppingBag, FaSearch } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import logo from "@/assets/logo.png";
import { useAuth } from "@/AuthContext";

const NavbarH = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const isAuthenticated = !!user;

    // Cuando abrimos el campo de búsqueda, enfocamos el input:
    useEffect(() => {
        if (searchOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [searchOpen]);

    const handleLogout = () => {
        localStorage.removeItem("cart");
        logout();
        navigate("/");
    };

    return (
        <>
            {/* NAVBAR PRINCIPAL */}
            <div className="w-screen bg-white shadow-md z-50 fixed top-0 left-0">
                <nav className="flex items-center justify-between h-24 px-6 w-full bg-white shadow-md">
                    {/* 1) Botón burger (solo este abre el menú lateral) */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setMenuOpen(true)}
                            className="text-black text-7xl bg-transparent border-none outline-none focus:outline-none"
                        >
                            <HiMenu className="text-5xl" />
                        </button>
                        <img src={logo} alt="Logo" className="h-20 w-auto" />
                    </div>

                    {/* 2) Iconos: Usuario, Carrito, Lupa */}
                    <div className="flex items-center gap-6 text-black-700 text-lg">
                        {/* Icono Usuario */}
                        <FaUser
                            className="cursor-pointer hover:text-black"
                            title="Mi cuenta"
                            onClick={(e) => {
                                e.stopPropagation();
                                if (isAuthenticated) navigate("/dashboard");
                                else navigate("/login");
                            }}
                        />

                        {/* Icono Carrito */}
                        <FaShoppingBag
                            className="cursor-pointer text-xl hover:text-black"
                            title="Ir al carrito"
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate("/cart");
                            }}
                        />

                        {/* Icono Lupa */}
                        <FaSearch
                            className="cursor-pointer hover:text-black"
                            title="Buscar"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSearchOpen((prev) => !prev);
                            }}
                        />
                    </div>
                </nav>

                {/* 3) Campo de búsqueda desplegable */}
                {searchOpen && (
                    <div className="absolute top-24 left-0 w-full bg-white shadow-md p-4 z-50">
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Buscar productos..."
                            aria-label="Buscar productos"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    const trimmed = searchTerm.trim();
                                    if (trimmed) {
                                        navigate(`/search?query=${encodeURIComponent(trimmed)}`);
                                        setSearchOpen(false);
                                        setSearchTerm("");
                                    }
                                }
                                if (e.key === "Escape") {
                                    setSearchOpen(false);
                                }
                            }}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                        />
                    </div>
                )}
            </div>

            {/* MENÚ LATERAL con react-burger-menu */}
            <Menu
                left
                isOpen={menuOpen}
                onStateChange={({ isOpen }) => setMenuOpen(isOpen)}
                width={270}
                pageWrapId={"page-wrap"}
                outerContainerId={"outer-container"}
                className="!bg-white text-lg p-6"
            >
                <Link
                    className="sub-heading text-start"
                    to="/categories"
                    onClick={() => setMenuOpen(false)}
                >
                    Categorías
                </Link>
                <Link
                    className="sub-heading text-start"
                    to="/cart"
                    onClick={() => setMenuOpen(false)}
                >
                    Carrito
                </Link>
                <Link
                    className="sub-heading text-start"
                    to="/contacto"
                    onClick={() => setMenuOpen(false)}
                >
                    Contacto
                </Link>
                <Link
                    className="sub-heading text-start"
                    to="/about"
                    onClick={() => setMenuOpen(false)}
                >
                    Sobre nosotros
                </Link>

                <Link
                    className="sub-heading text-start"
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                >
                    Registrarse
                </Link>

                {!isAuthenticated ? (
                    <Link
                        className="sub-heading text-start"
                        to="/login"
                        onClick={() => setMenuOpen(false)}
                    >
                        Iniciar sesión
                    </Link>
                ) : (
                    <div className="flex flex-col gap-2">
                        <Link
                            className="sub-heading"
                            to="/dashboard"
                            onClick={() => setMenuOpen(false)}
                        >
                            Mi cuenta
                        </Link>
                        <div className="sub-heading text-start">
                            <span className="text-gray-700 font-medium">{user.name}</span>
                            <button
                                onClick={handleLogout}
                                className="text-red-600 hover:text-red-800 block mt-2"
                            >
                                Cerrar sesión
                            </button>
                        </div>
                    </div>
                )}
            </Menu>
        </>
    );
};

export default NavbarH;