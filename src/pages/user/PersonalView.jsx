import NavbarH from "@/components_admin/Navbar.jsx";
import Footer from "@/components/Footer.jsx";
import {Link} from "react-router-dom";
import React from "react";


export default function PersonalView() {

    return (
        <>
            <NavbarH/>
            <header className="public-home-header">
                <p className="sub-heading">
                    <Link to="/categorias" className="hover:underline text-blue-600">FLORISTERÍA</Link> / MIS DATOS PERSONALES
                </p>
            </header>

            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1 className="text-center mb-4">Información Personal</h1>
                <Link to="/dashboard" className="btn btn-outline-secondary">Volver al Panel</Link>
            </div>


            <Footer/>
        </>
    );
}