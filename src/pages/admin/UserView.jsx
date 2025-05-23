import {useState, useEffect} from "react";//manejo de estadosy efeqtos secundarios en los componentes
import "bootstrap/dist/css/bootstrap.min.css";//importa el css de bootstrap
import Table from "react-bootstrap/Table";//importa el componente Table de react-bootstrap
import Container from "react-bootstrap/Container";//importa el componente Container de react-bootstrap
import Button from "react-bootstrap/Button";
import UsersFormModal from "@/components_admin/UsersFormModal.jsx";
import Footer from "@/components/Footer.jsx";
import NavbarH from "@/components/NavbarH.jsx";
import {Link} from "react-router-dom";
//importa el componente Button de react-bootstrap




//funcion que se encarga de mostrar la lista de usuarios
function UserView() {
    //Declara el estado para almacenar los usuarios
    const [user, setUser] = useState([]);
    //Declara el estado para mostrar el modal
    const [showModal, setShowModal] = useState(false);
    //Declara el estado para almacenar el usuario seleccionado
    const [selectedUser, setSelectedUser] = useState(null);



    //useEffect se ejecuta una sola vez al montar el componente
    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch("http://127.0.0.1:8080/admin/users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Usuarios del backend:", data);
                setUser(data);
            })
            .catch((error) => console.error("❌ Error al obtener usuarios:", error));
    }, []);
    //funcion que se encarga de eliminar un usuario
    const handleDelete = (id) => {
        //hace una peticion delete a la api de usuarios
        fetch(`http://127.0.0.1:8080/admin/user/${id}`, {method: "DELETE"})
            //se ejecuta cuando se obtiene una respuesta
            .then(response => {
                //si la respuesta es correcta
                if (response.ok) {
                    //actualiza el estado de empleados eliminando el empleado con el id especificado
                    setUser(user.filter(user => user.id !== id));
                } else {
                    //si la respuesta no es correcta muestra un mensaje de error
                    console.error("Error al eliminar el usuario");
                }
            })
            //muestra un mensaje de error si no se pudo eliminar el usuario
            .catch(error => console.error("Error al eliminar el usuario:", error));
    };
//función que se encarga de guardar los datos de los empleados en db
    const handleSave = async (userData) => {
        try {
            const isEdit = !!userData.id;
            const method = isEdit ? "PUT" : "POST";
            const url = isEdit
                ? `http://127.0.0.1:8080/admin/user/${userData.id}`
                : `http://127.0.0.1:8080/auth/register`;

            const token = localStorage.getItem("token");
            const bodyToSend = { ...userData };
            //evita que se envíe campo vacio como contraseña si no se ha modificado
            if (!bodyToSend.password) delete bodyToSend.password;
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" ,
                    Authorization: `Bearer ${token}`},
                body: JSON.stringify(bodyToSend),
            });
            /*{console.log(res)}*/
            if (!res.ok) throw new Error("Error al guardar el usuario");

            const savedUser = await res.json();
            //
            setUser(prev =>
                isEdit
                    ? prev.map(u => u.id === savedUser.id ? savedUser : u)
                    : [...prev, savedUser]
            );

            setShowModal(false);
        } catch (error) {
            console.error("❌ Error al guardar el usuario:", error);
            alert("Hubo un error al guardar el usuario. Revisa la consola.");
        }
    };
//retorna un contenedor con una tabla que muestra los usuarios y el modal para agregar o editar los usuarios
    return (
        <>
            <NavbarH />
            <Link to={"/admin"} type="button" className="mt-5 border-2 border-danger  ml-13 btn btn-light">
                Back
            </Link>

        <Container className="mt-4">
            <h2 className="text-center mb-4">Gestión Completa de usuarios</h2>{/*titulo de la tabla*/}
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
