import { useState, useEffect } from "react";//manejo de estados y efeqtos secundarios en los componentes
import PropTypes from "prop-types";//importa PropTypes que ayuda a validar los tipos de datos y evitar errores
import { Modal, Button, Form } from "react-bootstrap"; //  importación de componentes de react-bootstrap para el modal

// funcion que se encarga de mostrar el formulario para agregar o editar un empleado
function UsersFormModal({ show, handleClose, user, onSave }) {//funcion que recibe los parametros show, handleClose, employee, onSave que son los props del componente, estan declarados abajo
    //estado para almacenar los datos del formulario
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        phone_number: "",
        email: "",
        address: ""
    });
//useEffect se ejecuta despues de cada renderizado del componente o cuando cambia la prop de 'employee'
    useEffect(() => {
        //si hay un empleado seleccionado se cargan los datos  del empleado en el formulario
        if (user) {
            setFormData(user);
        } else {
            //si no hay empleado seleccionado los campos son vacios
            setFormData({
                first_name: "",
                last_name: "",
                phone_number: "",
                email: "",
                address: ""
            });
        }
    }, [user]);//Se ejecuta cada vez que cambia el valor de employee

    //funcion que se encarga de manejar los cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;// Extrae el nombre y el valor del campo que se quiere modificar
        setFormData({ ...formData, [name]: value });//actualiza el estado del formulario con nuevos valores
    };
    //funcion que se encarga de guardar los datos del empleado en la base de datos
    const handleSubmit = (e) => {
        e.preventDefault();//evita que la página se recargue al enviar el formulario
        onSave(formData);//llama a la funcion onSave y le pasa los datos del formulario
        handleClose();//cierra el modal
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            {/*show controla si esta abierto, onHide se ejecuta al cerrarlo*/}
            <Modal.Header closeButton className="justify-content-center">
                {/* Encabezado del modal con el botón X para cerrarlo */}
                <Modal.Title className="w-100 text-center">
                    {user ? "Editar usuario" : "Agregar usuario"}
                    {/*titulo si hay un empleado seleccionado muestra el titulo Editar Empleado, si no muestra Agregar Empleado*/}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/*Cuerpo del modal con los siguentes campos a modificar */}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formFirstName" className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        {/*Campo de texto para el nombre del empleado */}
                        <Form.Control
                            type="text"
                            name="firstName"
                            value={formData.first_name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formLastName" className="mb-3">
                        <Form.Label>Apellido</Form.Label>
                        {/*Campo de texto para el apellido del empleado */}
                        <Form.Control
                            type="text"
                            name="lastName"
                            value={formData.last_name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formPhoneNumber" className="mb-3">
                        <Form.Label>Teléfono</Form.Label>
                        {/*Campo de texto para el telefono del empleado */}
                        <Form.Control
                            type="text"
                            name="phone"
                            value={formData.phone_number}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formEmail" className="mb-3">
                        <Form.Label>Email</Form.Label>
                        {/*Campo de texto para el email del empleado */}
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formAddress" className="mb-3">
                        <Form.Label>Dirección</Form.Label>
                        {/*Campo de texto para la direccion del empleado */}
                        <Form.Control
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <div className="d-grid">
                        <Button variant="success" type="submit">
                            {/*Boton para guardar los datos del empleado */}
                            Guardar
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

//  Agregar validaciones de tipo para evitar errores
UsersFormModal.propTypes = {
    show: PropTypes.bool.isRequired,//controla si el modal es visible o no si esta abierto o cerrado
    handleClose: PropTypes.func.isRequired,//controla la funcion para cerrar el modal
    employee: PropTypes.object,//controla el objeto empleado a editar si es vacio o es un nueavo empleado
    onSave: PropTypes.func.isRequired//controla la funcion para guardar los datos del empleado
};


export default UsersFormModal;//exporta el componente EmployeeFormModal
