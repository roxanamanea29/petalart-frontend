import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {slide as Menu} from "react-burger-menu";
import {HiMenu} from "react-icons/hi";
import logo from "@/assets/logo.png";
import {useAuth} from "@/AuthContext";

const NavbarH = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const {user, logout} = useAuth();
    const isAuthenticated = !!user;

    const handleLogout = () => {
        localStorage.removeItem("cart");
        logout();
        navigate("/");
    };

    return (
        <div className="w-screen bg-white shadow-md z-50 relative">
            <nav className="flex items-center justify-between h-25 px-6 w-screen bg-white shadow-md">
                {/* Botón burger a la izquierda */}
                <button
                    onClick={() => setMenuOpen(true)}
                    className="text-black text-7xl bg-transparent border-none shadow-none outline-none"
                >
                    <HiMenu className="text-5xl"/>
                </button>

                {/* Logo a la derecha */}
                <img src={logo} alt="Logo" className="h-20 w-auto"/>
            </nav>

            {/* Menú lateral */}
            <Menu
                left
                isOpen={menuOpen}
                onStateChange={({isOpen}) => setMenuOpen(isOpen)}
                width={270}
                className="!bg-white text-lg p-6"
                overlayClassName="!z-40"
                pageWrapId="page-wrap"
                outerContainerId="outer-container"
            >
                {/* Contenedor flex-column para que mt-auto funcione */}
                <div className="flex flex-col h-full">
                    {/* Enlaces en la parte superior */}
                    <div>
                        <Link
                            className="sub-heading text-start mb-4 block"
                            to="/categories"
                            onClick={() => setMenuOpen(false)}
                        >
                            Categorías
                        </Link>
                        <Link
                            className="sub-heading text-start mb-4 block"
                            to="/cart"
                            onClick={() => setMenuOpen(false)}
                        >
                            Carrito
                        </Link>
                        <Link
                            className="sub-heading text-start mb-4 block"
                            to="/contacto"
                            onClick={() => setMenuOpen(false)}
                        >
                            Contacto
                        </Link>
                        <Link
                            className="sub-heading text-start mb-4 block"
                            to="/about"
                            onClick={() => setMenuOpen(false)}
                        >
                            Sobre nosotros
                        </Link>

                        {!isAuthenticated ? (
                            <Link
                                className="sub-heading text-start mb-4 block"
                                to="/login"
                                onClick={() => setMenuOpen(false)}
                            >
                                Iniciar sesión
                            </Link>
                        ) : (
                            <div className="flex flex-col gap-2 mb-4">
                                {/* Mostramos el nombre del usuario */}
                                <span className="sub-heading text-start">
                                    {user.fullName || user.name}
                                </span>

                                <Link
                                    className="sub-heading text-start mb-4 block"
                                    to="/dashboard"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Mi cuenta
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-red-600 hover:text-red-800 text-left"
                                >
                                    Cerrar sesión
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Logo abajo en el menu */}
                    <div className="mt-auto flex justify-center pb-6">
                        <img src={logo} alt="Logo" className="h-20 w-auto"/>
                    </div>
                </div>
            </Menu>
        </div>
    );
};

export default NavbarH;