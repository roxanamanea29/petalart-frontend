import {useState, useEffect} from "react";//manejo de estadosy efeqtos secundarios en los componentes
import "bootstrap/dist/css/bootstrap.min.css";//importa el css de bootstrap
import Table from "react-bootstrap/Table";//importa el componente Table de react-bootstrap
import Container from "react-bootstrap/Container";//importa el componente Container de react-bootstrap
import Button from "react-bootstrap/Button";//importa el componente Button de react-bootstrap




//funcion que se encarga de mostrar la lista de empleados
function UsersList() {
    //Declara el estado para almacenar los empleados
    const [user, setUser] = useState([]);
    //Declara el estado para mostrar el modal
    const [showModal, setShowModal] = useState(false);
    //Declara el estado para almacenar el empleado seleccionado
    const [selectedUser, setSelectedUser] = useState(null);

    //useEffect se ejecuta una sola vez al montar el componente
    useEffect(() => {
        fetch('http://localhost:8080/auth/users')//hace una petición get a la api de empleados
            .then(response => response.json())//convierte la respuesta en un objeto json
            .then(data => setUser(data))//almacena los datos en el estado de empleados
            .catch(error => console.error("Error al obtener empleados:", error));//muestra un mensaje de error si no se pudo obtener los empleados
    }, []);// El array vacio significa que solo se ejecuta una vez al montar el componente

    //funcion que se encarga de eliminar un empleado
    const handleDelete = (id) => {
        //hace una peticion delete a la api de empleados
        fetch(`http://127.0.0.1:8000/auth/user/${id}`, {method: "DELETE"})
            //se ejecuta cuando se obtiene una respuesta
            .then(response => {
                //si la respuesta es correcta
                if (response.ok) {
                    //actualiza el estado de empleados eliminando el empleado con el id especificado
                    setUser(user.filter(user => user.id !== id));
                } else {
                    //si la respuesta no es correcta muestra un mensaje de error
                    console.error("Error al eliminar el empleado");
                }
            })
            //muestra un mensaje de error si no se pudo eliminar el empleado
            .catch(error => console.error("Error al eliminar el empleado:", error));
    };
//funciñon que se encarga de guardar los datos de los empleados en db
    const handleSave = (employee) => {//recibe un objeto empleado
        //si tiene id se utiliza put ,es para modifica, si no tinee id se utiliza post para crear
        const method = employee.id ? 'PUT' : 'POST';
        const url = employee.id
            ? `http://127.0.0.1:8000/auth/user/${user.id}`//si tiene id se utiliza put
            : 'http://localhost:8080/auth/register';//si no tinene id se utiliza post con esta url
        //  hace una peticion post o put a la api de empleados
        fetch(url, {
            method: method,//metodo de la peticion
            headers: {
                'Content-Type': 'application/json',//tipo de contenido
            },
            //convierte el objeto empleado en un string
            body: JSON.stringify(employee),
        })
            .then(response => response.json())//convierte la respuesta en un objeto json
            .then(data => {//se ejecuta cuando se obtiene una respuesta
                if (method === 'POST') {//si el metodo es post
                    setUser([...user, data]);//agrega el nuevo empleado al estado de empleados
                } else {
                    setUser(user.map(e => (e.id === data.id ? data : e)));//actualiza los datos del empleado
                }
                setShowModal(false);//cierra el modal
            })
            .catch(error => console.error('Error al guardar el usuario:', error));//muestra un mensaje de error si no se pudo guardar el empleado
    };
//retorna un contenedor con una tabla que muestra los empleados y el modal para agregar o editar los empleados
    return (
        <Container className="mt-4">
            <h2 className="text-center mb-4">Gestión Completa de usuarios: CRUD Eficiente.</h2>{/*titulo de la tabla*/}
            <div className="d-flex justify-content-start mb-2">
                <Button variant="success" onClick={() => {
                    {/*boton para agregar un empleado*/
                    }
                    setSelectedUser(null);//selecciona un empleado
                    setShowModal(true);//muestra el modal
                }}>Crear</Button>
            </div>

            <Table striped bordered hover responsive>{/*tabla que muestra los empleados*/}
                <thead>{/*cabecera de la tabla*/}
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Teléfono</th>
                    <th>Email</th>
                    <th>Dirección</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>{/*cuerpo de la tabla*/}
                {user.map(user => (//recorre los empleados
                    //Muestra los datos de los empleados
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.phone_number}</td>
                        <td>{user.email}</td>
                        <td>
                            {/*botones para editar y eliminar un empleado*/}
                            <Button variant="success" className="me-2" onClick={() => {
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
            <UserFormModal
                show={showModal}//muestra el modal
                handleClose={() => setShowModal(false)}//cierra el modal
                employee={selectedUser}//empleado seleccionado
                onSave={handleSave}//guarda los datos del empleado utilizando la funcion handleSave
            />


        </Container>
    );
}

export default UsersList;//exporta el componente EmployeeList para que pueda ser utilizado en App.jsx
