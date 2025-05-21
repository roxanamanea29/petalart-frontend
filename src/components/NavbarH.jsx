import React, { useState,/* useEffect*/ } from "react";
import { Link, useNavigate } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import { FaUser, FaShoppingBag, FaSearch } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import logo from "@/assets/logo.png";
import { useAuth } from "@/AuthContext"; // ✅ correcto


const NavbarH = () => {
    const [menuOpen, setMenuOpen] = useState(false);
  /*  const [categorias, setCategorias] = useState([]);*/
    const navigate = useNavigate();

    const { user, logout } = useAuth();
    const isAuthenticated = !!user;

    const handleLogout = () => {
        localStorage.removeItem("cart");
        logout(); // ✅ llama a la función desde el contexto
        navigate("/");
    };

    return (
        <div className="w-screen bg-white shadow-md z-50 relative">
            {/* Navbar */}
            <nav className="flex items-center justify-between h-25 px-6  w-screen bg-white shadow-md">
                <div className="flex items-center gap-4 flex-grow">
                    {/* icono hamburguesa */}
                <button
                    onClick={() => setMenuOpen(true)}
                    className="text-black text-7xl bg-transparent border-none shadow-none outline-none"
                >
                    <HiMenu className="text-5xl" />
                </button>

                    <img src={logo} alt="Logo" className="h-20 w-auto" />
                </div>

                <div className="flex items-center gap-6 text-black-700 text-lg">
                    {/* usuario */}
                    <FaUser className="cursor-pointer hover:text-black" />

                    {/* carrito*/}
                    <FaShoppingBag
                        onClick={(e) => {
                            e.stopPropagation(); // para que no abra el menú
                            navigate("/cart");   // navegación al carrito
                        }}
                        className="cursor-pointer text-xl hover:text-black"
                        title="Ir al carrito"
                    />
                    {/* búsqueda */}
                    <FaSearch className="cursor-pointer hover:text-black" />
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
                    Categorías
                </Link>
                <Link className="sub-heading" to="/cart" onClick={() => setMenuOpen(false)}>
                    Carrito
                </Link>
                <Link className="sub-heading" to="/contacto" onClick={() => setMenuOpen(false)}>
                    Contacto
                </Link>

                {!isAuthenticated ? (
                    <Link className="sub-heading" to="/login" onClick={() => setMenuOpen(false)}>
                        Login
                    </Link>
                ) : (
                    <div className="flex items-center gap-4">
                        <span className="sub-heading"> 👤 {user.name}</span>
                    <button
                    onClick={handleLogout}
                className="sub-heading"
            >
                Cerrar sesión
            </button>
                    </div>
                )}
            </Menu>
        </div>
    );
};

export default NavbarH;