import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import { FiMenu } from "react-icons/fi";
import { FaUser, FaShoppingBag, FaSearch } from "react-icons/fa";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const NavbarH = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        setIsAuthenticated(!!token);
        // Cargar las categorías con los productos
        fetch("http://localhost:8080/categories/with-products")
            .then((res) => res.json())
            .then((data) => {
                console.log("📦 Categorías recibidas:", data); // <--- AGREGA ESTO
                setCategorias(data);
            })
            .catch((err) => console.error("Error cargando menú:", err));

    }, []);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        setIsAuthenticated(false);
        navigate("/");
    };

    return (
        <div className="w-screen bg-white shadow-md z-50 relative">
            {/* Navbar contenido principal */}
            <nav className="flex items-center justify-between h-16 px-6  w-screen bg-white shadow-md">
                {/* Botón hamburguesa */}
                <button
                    onClick={() => setMenuOpen(true)}
                    className="text-black text-2xl  bg-transparent border-none shadow-none outline-none focus:outline-none active:outline-none"
                >
                    <FiMenu />
                </button>

                {/* Logo */}
                <div className="flex justify-center flex-grow md:flex-none">
                    <img src={logo} alt="Logo" className="h-12 w-auto" />
                </div>

                {/* Iconos */}
                <div className="hidden md:flex items-center gap-6 text-gray-700 text-lg">
                    <FaUser className="cursor-pointer hover:text-black" />
                    <FaShoppingBag className="cursor-pointer hover:text-black" />
                    <FaSearch className="cursor-pointer hover:text-black" />
                </div>
            </nav>

            {/* Menú lateral (react-burger-menu) */}
            <Menu
                left
                isOpen={menuOpen}
                onStateChange={({ isOpen }) => setMenuOpen(isOpen)}
                width={270}
               /* overlayClassName="bm-overlay !bg-black/40 !z-40"*/
                className="!bg-white text-lg p-6"
            >
                <a className="block py-2" href="/" onClick={() => setMenuOpen(false)}>
                    Home
                </a>
                {/* Categorías y productos */}
                {categorias.map(cat => (
                    <div key={cat.categoryName} className="mb-4">
                        <Link
                            to={`/categorias/${cat.categoryId}`}
                            className="sub-heading"
                            onClick={() => setMenuOpen(false)}
                        >
                            {cat.categoryName}
                        </Link>
                        <ul className="ml-5 text-sm">
                            {cat.products.map(prod => (
                                <li key={prod.id}>
                                    <Link
                                        to={`/producto/${prod.id}`}
                                        className="sub-heading"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        {prod.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}



                <a
                    className="block py-2"
                    href="/contacto"
                    onClick={() => setMenuOpen(false)}
                >
                    Contacto
                </a>

                {!isAuthenticated ? (
                    <a
                        className="block py-2"
                        href="/login"
                        onClick={() => setMenuOpen(false)}
                    >
                        Login
                    </a>
                ) : (
                    <button
                        onClick={handleLogout}
                        className="block py-2 text-left w-full text-red-600 hover:underline"
                    >
                        Cerrar sesión
                    </button>
                )}
            </Menu>
        </div>
    );
};

export default NavbarH;