
import Navbar from "@/components_admin/Navbar.jsx";
import Footer from "@/components/Footer.jsx";



const Dashboard = () => {
    const cards =[
        {
            title: "Productos",
            description: "Gestiona los productos de la tienda",
            icon: "fa-solid fa-box",
            link: "/admin/productos",
        },
        {
            title: "Categorías",
            description: "Gestiona las categorías de la tienda",
            icon: "fa-solid fa-tags",
            link: "/admin/categorias",
        },
        {
            title: "Usuarios",
            description: "Gestiona los usuarios de la tienda",
            icon: "fa-solid fa-users",
            link: "/admin/usuarios",
        },
        {
            title: "Órdenes",
            description: "Gestiona las órdenes de la tienda",
            icon: "fa-solid fa-shopping-cart",
            link: "/admin/ordenes",
        },
        {
            title: "Addresses",
            description: "Gestiona las direcciones de la tienda",
            icon: "fa-solid fa-cog",
            link: "/admin/addresses",
        },
        {
            title: "Reportes",
            description: "Genera reportes de la tienda",
            icon: "fa-solid fa-chart-line",
            link: "/admin/reportes",
        },
    ]
    return (
        <>
       <Navbar />
        <div className="p-6">
            <h1 className="text-4xl  text-center ">Panel de Administración</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {cards.map((card, index) => (
                    <div key={index} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
                        <i className={`${card.icon} text-4xl mb-2`}></i>
                        <h2 className="text-xl font-bold">{card.title}</h2>
                        <p className="text-gray-600">{card.description}</p>
                        <a href={card.link} className="mt-4 text-black border-2 border-danger px-3 py-2 ">Entrar
                        </a>
                    </div>
                ))}
            </div>

        </div>
            <Footer />
        </>
    );
};

export default Dashboard;