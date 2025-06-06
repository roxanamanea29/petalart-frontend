import Footer from "@/components/Footer.jsx";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import LOCALSERVERBASEURL from "@/Configuration/ConectionConfig.js";
import EditUserForm from "@/pages/user/EditUserForm.jsx";
import NavbarH from "@/components/NavbarH.jsx";
import Container from "react-bootstrap/Container";


export default function PersonalView() {
    const [showEditUserForm, setEditUserForm] = useState(false);
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
    }, []);

    return (
        <>
            <NavbarH/>
            <header className="public-home-header">
                <p className="sub-heading">
                    <Link to="/categorias" className="hover:underline text-blue-600">FLORISTERÍA</Link> / MIS DATOS
                    PERSONALES
                </p>
            </header>
            <Container className="mt-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3 className="text-center mb-4">Información Personal</h3>
                    <Link to="/dashboard" className="btn btn-outline-secondary">Volver</Link>
                </div>

                <div className="table-responsive">

                    {userData && (
                        <>
                            <div className="row">
                                <div className="col-md-6 offset-md-3">
                                    <div className="card mb-4">
                                        <div className="card-body">
                                            <h5 className="card-title">Mis datos</h5>
                                            <p><strong>Nombre:</strong> {userData.firstName}</p>
                                            <p><strong>Apellido:</strong> {userData.lastName}</p>
                                            <p><strong>Email:</strong> {userData.email}</p>
                                            <p><strong>Teléfono:</strong> {userData.phone}</p>
                                            <button
                                                className="mt-5 border-2 border-danger  ml-13 btn btn-light"
                                                onClick={() => setEditUserForm(true)}
                                            >
                                                Actualizar mis datos
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {showEditUserForm && (
                                <EditUserForm
                                    user={userData}
                                    show={showEditUserForm}
                                    handleClose={() => setEditUserForm(false)}
                                    onClose={() => setEditUserForm(false)}
                                    onSave={(updatedUser) => {
                                        setUserData(updatedUser);
                                        setEditUserForm(false);
                                    }}
                                    onCancel={() => setEditUserForm(false)}
                                />
                            )}
                        </>
                    )}
                </div>
            </Container>
            <Footer/>
        </>
    )
        ;
}