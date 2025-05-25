import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import { FaUser, FaShoppingBag, FaSearch } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import logo from "@/assets/logo.png";
import { useAuth } from "@/AuthContext";

const NavbarH = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const isAuthenticated = !!user;

    const handleLogout = () => {
        localStorage.removeItem("cart");
        logout();
        navigate("/");
    };

    return (
        <div className="w-screen bg-white shadow-md z-50 relative">
            <nav className="flex items-center justify-between h-25 px-6 w-screen bg-white shadow-md">
                <div className="flex items-center gap-4 flex-grow">
                    <button
                        onClick={() => setMenuOpen(true)}
                        className="text-black text-7xl bg-transparent border-none shadow-none outline-none"
                    >
                        <HiMenu className="text-5xl" />
                    </button>
                    <img src={logo} alt="Logo" className="h-20 w-auto" />
                </div>

                <div className="flex items-center gap-6 text-black-700 text-lg">
                    <FaUser className="cursor-pointer hover:text-black" />
                    <FaShoppingBag
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate("/cart");
                        }}
                        className="cursor-pointer text-xl hover:text-black"
                        title="Ir al carrito"
                    />
                    <FaSearch className="cursor-pointer hover:text-black" />
                </div>
            </nav>

            <Menu
                left
                isOpen={menuOpen}
                onStateChange={({ isOpen }) => setMenuOpen(isOpen)}
                width={270}
                className="!bg-white text-lg p-6"
                overlayClassName="!z-40"
            >
                <Link className="sub-heading text-start" to="/categories" onClick={() => setMenuOpen(false)}>
                    Categorías
                </Link>
                <Link className="sub-heading text-start" to="/cart" onClick={() => setMenuOpen(false)}>
                    Carrito
                </Link>
                <Link className="sub-heading text-start" to="/contacto" onClick={() => setMenuOpen(false)}>
                    Contacto
                </Link>

                {!isAuthenticated ? (
                    <Link className="sub-heading" to="/login" onClick={() => setMenuOpen(false)}>
                        Iniciar sesión
                    </Link>
                ) : (
                    <div className="flex flex-col gap-2">
                        <Link className="sub-heading" to="/dashboard" onClick={() => setMenuOpen(false)}>
                            Mi cuenta
                        </Link>
                        <div className="flex flex-col items-start gap-2 mt-4">
                            <span className="text-gray-700 font-medium">{user.name}</span>
                            <button
                                onClick={handleLogout}
                                className="text-red-600 hover:text-red-800"
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