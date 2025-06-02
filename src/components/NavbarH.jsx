import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import { FaUser, FaShoppingBag, FaSearch } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import logo from "@/assets/logo.png";
import { useAuth } from "@/AuthContext";

const NavbarH = () => {
    // Estado para controlar si el menú lateral está abierto
    const [menuOpen, setMenuOpen] = useState(false);
    // Estado para controlar si el campo de búsqueda (lupa) está abierto
    const [searchOpen, setSearchOpen] = useState(false);
    // Texto actual del input de búsqueda
    const [searchTerm, setSearchTerm] = useState("");
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const isAuthenticated = !!user;

    // Cuando "searchOpen" cambia a true, ponemos el foco en el input
    useEffect(() => {
        if (searchOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [searchOpen]);

    // Función para cerrar sesión
    const handleLogout = () => {
        localStorage.removeItem("cart");
        logout();
        navigate("/");
    };

    // Solo el botón que envuelve a <HiMenu> disparará setMenuOpen(true).
    // Los demás iconos NO tienen onClick que llame a setMenuOpen.
    return (
        <div className="w-screen bg-white shadow-md z-50 relative">
            <nav className="flex items-center justify-between h-25 px-6 w-screen bg-white shadow-md">
                {/* -----------------------------------------------
            1) BOTÓN QUE ABRE EL MENÚ LATERAL (Burger Menu)
            ----------------------------------------------- */}
                <div className="flex items-center gap-4 flex-grow">
                    <button
                        onClick={() => setMenuOpen(true)}
                        className="text-black text-7xl bg-transparent border-none outline-none focus:outline-none"
                        // Aseguramos que solo este botón maneje el click
                    >
                        <HiMenu className="text-5xl" />
                    </button>

                    <img src={logo} alt="Logo" className="h-20 w-auto" />
                </div>

                {/* -----------------------------------------------
            2) ICONOS DE USUARIO, CARRITO Y LUPA
            ----------------------------------------------- */}
                <div className="flex items-center gap-6 text-black-700 text-lg">
                    {/* Icono de usuario: sin onClick, no abre nada */}
                    <FaUser
                        className="cursor-pointer hover:text-black"
                        title="Mi cuenta"
                        onClick={(e) => {
                            e.stopPropagation(); // Evita que el click se propague y abra el menú
                            if (isAuthenticated) {
                                navigate("/dashboard");
                            } else {
                                navigate("/login");
                            }
                        }}
                    />

                    {/* Icono de carrito: solo navega a /cart, no abre menú */}
                    <FaShoppingBag
                        className="cursor-pointer text-xl hover:text-black"
                        title="Ir al carrito"
                        onClick={(e) => {
                            e.stopPropagation(); // Para que no abra el menú
                            navigate("/cart");
                        }}
                    />

                    {/* Icono de lupa: solo abre/cierra el campo de búsqueda */}
                    <FaSearch
                        className="cursor-pointer hover:text-black"
                        title="Buscar"
                        onClick={(e) => {
                            e.stopPropagation();      // No queremos que abra el menú
                            setSearchOpen((prev) => !prev);
                        }}
                    />
                </div>
            </nav>

            {/* -----------------------------------------------------------
          3) CAMPO DE BÚSQUEDA (se muestra solo si searchOpen === true)
          ----------------------------------------------------------- */}
            {searchOpen && (
                <div className="absolute top-16 left-0 w-full bg-white shadow-lg p-4 z-50">
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

            {/* Burger Menu de react-burger-menu */}
            <Menu
                left
                isOpen={menuOpen}
                onStateChange={({ isOpen }) => setMenuOpen(isOpen)}
                width={270}
                className="!bg-white text-lg p-6"
                overlayClassName="!z-40"
            >
                {/* Cada enlace dentro del menú sidebar cierra el menú al hacer clic */}
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
        </div>
    );
};

export default NavbarH;