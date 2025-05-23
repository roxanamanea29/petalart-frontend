import Navbar from "@/components_admin/Navbar.jsx";
import Footer from "@/components/Footer.jsx";
import {FaBox, FaTags, FaUsers, FaShoppingCart, FaCog, FaChartLine} from "react-icons/fa";



const Dashboard = () => {
    // se crean los cards que se mostraran en el dashboard que contienen
    const cards = [
        {
            title: "Productos",
            description: "Gestiona los productos de la tienda",
            icon: FaBox,
            link: "/admin/productos",
        },
        {
            title: "Categorías",
            description: "Gestiona las categorías de la tienda",
            icon: FaTags,
            link: "/admin/categorias",
        },
        {
            title: "Usuarios",
            description: "Gestiona los usuarios de la tienda",
            icon: FaUsers,
            link: "/admin/usuarios",
        },
        {
            title: "Órdenes",
            description: "Gestiona las órdenes de la tienda",
            icon: FaShoppingCart,
            link: "/admin/ordenes",
        },
        {
            title: "Addresses",
            description: "Gestiona las direcciones de la tienda",
            icon: FaCog,
            link: "/admin/addresses",
        },
        {
            title: "Reportes",
            description: "Genera reportes de la tienda",
            icon:FaChartLine,
            link: "/admin/reportes",
        },
    ]
    return (
        <>
            <Navbar/>
            <div className="p-6">
                <h1 className="text-4xl  text-center ">Panel de Administración</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                    {cards.map((card, index) => {
                        const Icon = card.icon;
                        return (
                            <div key={index}
                                 className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
                                <Icon className={`${card.icon} text-4xl mb-2`}></Icon>
                                <h2 className="text-xl font-bold">{card.title}</h2>
                                <p className="text-gray-600">{card.description}</p>
                                <a href={card.link} className="mt-5 border-2 border-danger  ml-13 btn btn-light">Entrar
                                </a>
                            </div>
                        );
                    })}
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default Dashboard;