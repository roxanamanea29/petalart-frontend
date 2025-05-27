import NavbarH from "../components/NavbarH.jsx";
import Footer from "../components/Footer.jsx";

import {FaBox} from "react-icons/fa";
import React, {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useProfile} from "@/hooks/useProfile.jsx";


const DashboardUser = () => {
    const { profile, loading, error} =useProfile();
    const navigate = useNavigate();
    useEffect(() => {
        if(!loading && (!profile || error)){
            navigate("/login");
        }
    }, [loading, profile, error]);

    if (loading) return <p className="text-center mt-8">Cargando...</p>
    const cards = [
        {
            title: "Mis datos",
            description: "Mis datos personales y de contacto",
            icon: FaBox,
            link: "/perfil",
        },
        {
            title: "Mis pedidos",
            description: "Historial y detalles de mis pedidos",
            icon: FaBox,
            link: "/user/orders",
        },
        {
            title: "Direcciones",
            description: "Mis direcciones",
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
                                <Link to={card.link} className="mt-5 border-2 border-danger ml-13 btn btn-light">
                                    Entrar
                                </Link>
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
