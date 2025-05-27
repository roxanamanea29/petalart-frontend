import { useState, useEffect } from "react";//manejo de estados y efeqtos secundarios en los componentes
import PropTypes from "prop-types";//importa PropTypes que ayuda a validar los tipos de datos y evitar errores
import { Modal, Button, Form } from "react-bootstrap"; //  importación de componentes de react-bootstrap para el modal

// funcion que se encarga de mostrar el formulario para agregar o editar un usuario
function UsersFormModal({ show, handleClose, user, onSave }) {//funcion que recibe los parametros show, handleClose, employee, onSave que son los props del componente, estan declarados abajo
    const [showPassword, setShowPassword] = useState(false);//estado para mostrar o ocultar la contraseña

    const [isSubmitting, setIsSubmitting] = useState(false);
    //estado para almacenar los datos del formulario
    const [formData, setFormData] = useState({
        id: null,
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        role: "",
        password: "",
    });
//useEffect se ejecuta despues de cada renderizado del componente o cuando cambia la prop de 'user'
    useEffect(() => {
        //si hay un usuario seleccionado se cargan los datos  del usuario en el formulario
        if (user) {
            setFormData({
            id: user.id ?? null,
            firstName: user.firstName ?? "",
            lastName: user.lastName ?? "",
            email: user.email ?? "",
            phone: user.phone ?? "",
            role: user.role ?? "",
            password: "",

        });
        }else {
            //si no hay usuario seleccionado los campos son vacios
            setFormData({
                id: null,
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                role: "",
                password: "",
            });
        }
    }, [user]);//Se ejecuta cada vez que cambia el valor de employee

    //funcion que se encarga de manejar los cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;// Extrae el nombre y el valor del campo que se quiere modificar
        setFormData({ ...formData, [name]: value });//actualiza el estado del formulario con nuevos valores
    };
    //funcion que se encarga de guardar los datos del usuario en la base de datos
    const handleSubmit = (e) => {
        e.preventDefault();//evita que la página se recargue al enviar el formulario
        const bodyToSend = { ...formData };
        if (!bodyToSend.password) delete bodyToSend.password;
        //llama a la función onSave y le pasa los datos del formulario
        onSave(bodyToSend);
        handleClose();

    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            {/*show controla si es abierto, onHide se ejecuta al cerrarlo*/}
            <Modal.Header closeButton className="justify-content-center">
                {/* Encabezado del modal con el botón X para cerrarlo */}
                <Modal.Title className="w-100 text-center">
                    {user ? "Editar usuario" : "Agregar usuario"}
                    {/*titulo si hay un usuario seleccionado muestra el titulo Editar User, si no muestra Agregar User*/}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/*Cuerpo del modal con los siguentes campos a modificar */}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formFirstName" className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        {/*Campo de texto para el nombre del usuario */}
                        <Form.Control
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            //declara el nombre con una expresion regular
                            pattern="[a-zA-ZÀ-ÿ\s]{1,40}"
                            title="El nombre solo puede contener letras y espacios"
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formLastName" className="mb-3">
                        <Form.Label>Apellido</Form.Label>
                        {/*Campo de texto para el apellido del usuario */}
                        <Form.Control
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            //declara el apellido con una expresion regular
                            pattern="[a-zA-ZÀ-ÿ\s]{1,40}"
                            title="El apellido solo puede contener letras y espacios"
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formEmail" className="mb-3">
                        <Form.Label>Email</Form.Label>
                        {/*Campo de texto para el email del usuario */}
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            title="El email debe tener el formato correcto"
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formPhone" className="mb-3">
                        <Form.Label>Teléfono</Form.Label>
                        {/*Campo de texto para el telefono del usuario */}
                        <Form.Control
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            //declara el telefono con una expresion regular
                            pattern="[0-9]{9}"
                            title="El teléfono debe tener 9 dígitos"
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formRole" className="mb-3">
                        <Form.Label>Role</Form.Label>
                        {/*Campo de texto para la direccion del usuario */}
                        <Form.Control
                            type="text"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            //declara el rol con una expresion regular especifica
                            pattern="^(ROLE_USER|ROLE_ADMIN)$"
                            title="El rol debe ser USER_ROLE o USER_ADMIN"
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formPassword" className="mb-3">
                        <Form.Label>Contraseña</Form.Label>
                        {/* Campo para ingresar la contraseña del usuario */}
                        <Form.Control
                            //utiliza el estado showPassword para mostrar u ocultar la contraseña
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            //declara la contraseña con una expresion regular
                           /* pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}"*/
                            title="La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número"
                            required
                        />
                        <Button variant="outline-secundary"
                        onClick={() => setShowPassword(!showPassword)}
                                className="ms-2"
                                type="button"
                        >
                            {showPassword ? "Ocultar" : "Mostrar"}
                            {/* Botón para mostrar u ocultar la contraseña */}
                        </Button>
                    </Form.Group>

                    <div className="d-grid">
                        <Button variant="success" type="submit" disabled={isSubmitting}>
                            {/*Boton para guardar los datos del usuario */}
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
    user: PropTypes.object,//controla el objeto empleado a editar si es vacio o es un nueavo usuario
    onSave: PropTypes.func.isRequired//controla la funcion para guardar los datos del usuario
};


export default UsersFormModal;//exporta el componente EmployeeFormModal
