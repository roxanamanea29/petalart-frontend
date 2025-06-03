import NavbarH from "@/components_admin/Navbar.jsx";
import Footer from "@/components/Footer.jsx";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import LOCALSERVERBASEURL from "@/Configuration/ConectionConfig.js";
import EditUserForm from "@/components/user/EditUserForm.jsx";



export default function PersonalView() {
    const [showEditUserForm, setEditUserForm] = React.useState(false);
    const [userData, setUserData] = useState(null);

    const authHeaders = () => ({
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    });

    useEffect(() => {
        fetch(`${LOCALSERVERBASEURL}/user/profile`, {
            method: "GET",
            headers: authHeaders(),
        })
            .then((res) => {
                if (!res.ok) throw new Error(`Error ${res.status}`);
                return res.json();
            })
            .then((data) => {
                console.log("Perfil cargado:", data);
                setUserData(data); //  Guarda los datos en el estado
            })
            .catch((err) => console.error("Error al obtener perfil:", err));
    }, [setUserData]);

    return (
        <>
            <NavbarH/>
            <header className="public-home-header">
                <p className="sub-heading">
                    <Link to="/categorias" className="hover:underline text-blue-600">FLORISTERÍA</Link> / MIS DATOS
                    PERSONALES
                </p>
            </header>


            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1 className="text-center mb-4">Información Personal</h1>
                <Link to="/dashboard" className="btn btn-outline-secondary">Volver al Panel</Link>
            </div>

            {userData && (
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <div className="card mb-4">
                                <div className="card-body">
                                    <h5 className="card-title">Datos del Usuario</h5>
                                    <p><strong>Nombre:</strong> {userData.name}</p>
                                    <p><strong>Email:</strong> {userData.email}</p>
                                    <p><strong>Role:</strong> {userData.role}</p>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => setEditUserForm(true)}
                                    >
                                        Editar Información
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {showEditUserForm && (
                        <EditUserForm
                            user={userData}
                            onClose={() => setEditUserForm(false)}
                            onSave={(updatedUser) => {
                                setUserData(updatedUser);
                                setEditUserForm(false);
                            }}
                        />
                    )}
                </div>
            )}

            <Footer/>
        </>
    );
}