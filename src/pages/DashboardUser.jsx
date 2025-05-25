import NavbarH from "../components/NavbarH.jsx";
import Footer from "../components/Footer.jsx";

import {FaBox} from "react-icons/fa";
import React from "react";
import {Link} from "react-router-dom";


const DashboardUser = () => {
    const cards = [
        {
            title: "Productos",
            description: "Gestiona los productos de la tienda",
            icon: FaBox,
            link: "/user/productos",
        },
        {
            title: "Órdenes",
            description: "Gestiona tus órdenes",
            icon: FaBox,
            link: "/admin/ordenes",
        },
        {
            title: "Direcciones",
            description: "Gestiona tus direcciones",
            icon: FaBox,
            link: "/user/address",
        }
    ];

    return (
        <>
            <NavbarH />
            <div className="p-6">
                <h1 className="text-4xl  text-center ">SU CUENTA</h1>

                <header className="public-home-header">
                    <p className="sub-heading">
                        <Link to="/categorias" className="hover:underline text-blue-600">FLORISTERÍA</Link> / DASHBOARD
                    </p>
                </header>
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
}
export default DashboardUser;
