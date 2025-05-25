import {useState, useEffect} from "react";//manejo de estadosy efeqtos secundarios en los componentes
import "bootstrap/dist/css/bootstrap.min.css";//importa el css de bootstrap
import Table from "react-bootstrap/Table";//importa el componente Table de react-bootstrap
import Container from "react-bootstrap/Container";//importa el componente Container de react-bootstrap
import Button from "react-bootstrap/Button";
import UsersFormModal from "@/components_admin/UsersFormModal.jsx";
import Footer from "@/components/Footer.jsx";
import {Link} from "react-router-dom";
import {Navbar} from "react-bootstrap";





//funcion que se encarga de mostrar la lista de usuarios
function UserView() {
    //Declara el estado para almacenar los usuarios
    const [user, setUser] = useState([]);
    //Declara el estado para mostrar el modal
    const [showModal, setShowModal] = useState(false);
    //Declara el estado para almacenar el usuario seleccionado
    const [selectedUser, setSelectedUser] = useState(null);
const authHeaders = () => ({
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    });


    //useEffect se ejecuta una sola vez al montar el componente
    useEffect(() => {
        fetch("http://127.0.0.1:8080/admin/users", {
            method: "GET",
            headers: authHeaders(),
        })
            .then(res => {
                if (!res.ok) throw new Error(`Error ${res.status}`);
                return res.json();
            })
            .then(setUser)
            .catch((error) => console.error("Error al obtener usuarios:", error));
    }, []);
    //funcion que se encarga de eliminar un usuario
    const handleDelete = async (id) => {
        try{
            const res = await fetch(`http://127.0.0.1:8080/admin/user/${id}`, {
                method: "DELETE",
                headers: authHeaders(),
        });
        if (!res.ok) throw new Error(`Error ${res.status}`);
        setUser((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
        console.error("Error al eliminar categoría:", error);
        alert("No se pudo eliminar la categoría.");
    }
    };
//función que se encarga de guardar los datos de los empleados en db
    const handleSave = async (userData) => {
        try {
            const isEdit = Boolean(userData.id);//verifica si el usuario ya existe
            const url = isEdit
                ? `http://127.0.0.1:8080/admin/user/${userData.id}`
                : `http://127.0.0.1:8080/auth/register`;

            const res = await fetch(url, {
                method: isEdit ? "PUT" : "POST",
                headers: authHeaders(),
                body: JSON.stringify(userData),
            });

            if (!res.ok) throw new Error(`Error ${res.status}: ${await res.text()}`);
            // Si es una edición, actualiza el usuario en la lista
            const updated = await fetch("http://127.0.0.1:8080/admin/users",{
                headers: authHeaders(),
            }).then((r) => r.json());
            setUser(updated);
            setShowModal(false);
        } catch (error) {
            console.error("Error al guardar el usuario:", error);
            alert("Hubo un error al guardar el usuario. Revisa la consola.");
        }
    };
//retorna un contenedor con una tabla que muestra los usuarios y el modal para agregar o editar los usuarios
    return (
        <>
            <Navbar />

        <Container className="mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="text-center mb-4">Gestión Completa de usuarios</h2>
            <Link to="/admin" className="btn btn-outline-secondary">Volver al Panel</Link>
        </div>

            <div className="d-flex justify-content-start mb-2">
                <Button variant="success" onClick={() => {
                    {/*boton para agregar un usuario*/
                    }
                    setSelectedUser(null);//selecciona un usuario
                    setShowModal(true);//muestra el modal
                }}>Crear</Button>
            </div>

            <Table striped bordered hover responsive>{/*tabla que muestra los usuarios*/}
                <thead>{/*cabecera de la tabla*/}
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>Role</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>{/*cuerpo de la tabla*/}
                {user.map(user => (//recorre los usuarios
                    //Muestra los datos de los usuarios en la tabla
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{user.role}</td>


                        <td>
                            {/*botones para editar y eliminar un usuario*/}
                            <Button variant="warning" className="me-2" onClick={() => {
                                setSelectedUser(user);
                                setShowModal(true);
                            }}>
                                Editar
                            </Button>
                            <Button variant="danger" onClick={() => handleDelete(user.id)}>
                                Eliminar
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            {/* */}
            <UsersFormModal
                show={showModal}//muestra el modal
                handleClose={() => setShowModal(false)}//cierra el modal
                user={selectedUser}//usuario seleccionado
                onSave={handleSave}//guarda los datos del usuario utilizando la funcion handleSave
            />


        </Container>
            <Footer />
        </>
    );
}

export default UserView;//exporta el componente EmployeeList para que pueda ser utilizado en App.jsx
