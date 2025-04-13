import React from "react";
import "../css/Dashboard.css";
import Footer from "../components/Footer.jsx";
import NavbarH from "../components/NavbarH.jsx";
import { useProfile } from "../hooks/useProfile"; // Importamos el hook

const Dashboard = () => {
    const { profile, loading } = useProfile(); // Obtenemos los datos del usuario

    return (
        <div className="dashboard">
            <NavbarH />
            <div className="section-title">
                <h2 className="h22">PetalArt</h2>
                <p>VENTA DE FLORES Y PLANTAS - EVENTOS</p>

                {loading ? (
                    <p>Cargando usuario...</p>
                ) : profile ? (
                    <p>Bienvenido, <strong>{profile.name}</strong>!</p>
                ) : (
                    <p>No se pudo cargar el perfil.</p>
                )}
            </div>

            <div className="cards">
                <div className="card">
                    <img src="https://source.unsplash.com/400x250/?flowers" alt="Flores Naturales"/>
                    <div className="card-text">
                        <h3>FLORES NATURALES</h3>
                        <p>Ramos y centros de flores naturales</p>
                    </div>
                </div>
                <div className="card">
                    <img src="https://source.unsplash.com/400x250/?wedding-bouquet" alt="Ramos Novia"/>
                    <div className="card-text">
                        <h3>RAMOS NOVIA</h3>
                        <p>Ramos novia y damas de honor</p>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Dashboard;
