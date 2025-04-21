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

    const { user, logout } = useAuth(); // ✅ correcto uso del AuthContext
    const isAuthenticated = !!user; // ✅ ahora sí puedes usarlo

   /* useEffect(() => {
        fetch("http://localhost:8080/categories/with-products")
            .then((res) => res.json())
            .then((data) => {
                console.log("📦 Categorías recibidas:", data);
                setCategorias(data);
            })
            .catch((err) => console.error("Error cargando menú:", err));
    }, []);
*/
    const handleLogout = () => {
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

                <div className="hidden md:flex items-center gap-6 text-black-700 text-lg">
                    <FaUser className="cursor-pointer hover:text-black" />
                    <FaShoppingBag
                        onClick={() => {
                            console.log("🛍 Icono clicado");
                            navigate("/cart");
                        }}
                        className="cursor-pointer text-xl hover:text-black"
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
                overlayClassName="!z-40" // ✅ más bajo que el navbar
            >
              {/*  {categorias.map((cat) => (
                    <div key={cat.categoryId} className="mb-4">
                        <Link
                            to={`/categorias/${cat.categoryId}`}
                            className="sub-heading"
                            onClick={() => setMenuOpen(false)}
                        >
                            {cat.categoryName}
                        </Link>
                        <ul className="ml-5 text-sm">
                            {cat.products.map((prod) => (
                                <li key={prod.id}>
                                    <Link
                                        to={`/productos/${prod.id}`}
                                        className="sub-heading"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        {prod.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}*/}
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