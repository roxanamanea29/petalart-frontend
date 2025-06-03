import React, {useEffect, useState} from "react";
import { Modal} from "react-bootstrap";
import LOCALSERVERBASEURL from "@/Configuration/ConectionConfig.js";


const EditUserForm = ({show, handleClose, user, onSave}) => {
    // Estado para manejar los datos del formulario
    const [formData, setFormData] = useState({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
    });

    // Headers de autenticación del token para las peticiones
    const authHeaders = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    // Efecto para inicializar el formulario con los datos del usuario
    useEffect(() => {
        if (user) {
            // Si el usuario tiene datos, los asigna al estado del formulario
            setFormData({
                id: user.userId || '',
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                email: user.email || "",
                phone: user.phone || "",
            });
        }
        //guardamos el usuario en el localStorage
    }, [user]);

    // Maneja los cambios en los campos del formulario
    const handleChange = (e) => {
        const {name, value} = e.target;
        // Actualiza el estado del formulario con el nuevo valor
        setFormData({...formData, [name]: value});
    };


    // Maneja el envío del formulario
    const handleSubmit = async (e) => {
        if(!formData.id) {
            alert("Falta el id del usuario.");
            return;
        }
        // Evita envio por defecto del formulario
        e.preventDefault();
        try {
            // Se realiza actualizar  datos del usuario
            const res = await fetch(`${LOCALSERVERBASEURL}/user/${formData.id}`, {
                method: "PUT",
                //se usan los headers de autenticación
                headers: authHeaders,
                // Convierte los datos del formulario a JSON
                body: JSON.stringify(formData)
            });

            // Maneja la respuesta del servidor
            if (res.ok) {
                const updatedUser = await res.json();
                onSave(updatedUser);
                handleClose();
            } else {
                // Si la respuesta no es OK, lanza un error
                const errorData = await res.json();
                alert(errorData.message || 'Error al actualizar usuario');
            }
            // guarda los datos del usuario en el localStorage
        }catch (error) {
            console.error("Error al actualizar usuario:", error);
            alert("Error al actualizar usuario: " + error.message);
        }
    };

    return (

        <Modal show={show} onHide={handleClose} centered>
            <form className="form" onSubmit={handleSubmit}>
                <p className="title">Register</p>
                <p className="message">Signup now and get full access to our app.</p>

                {/* Campo Firstname */}
                <label className="lab">
                    <input
                        required
                        placeholder="Enter your First Name"
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    <span>Firstname</span>
                </label>

                {/* Campo Lastname */}
                <label className="lab">
                    <input
                        required
                        placeholder="Enter your Last Name"
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                    <span>Lastname</span>
                </label>

                {/* Campo Email */}
                <label className="lab">
                    <input
                        required
                        placeholder="Enter your Email"
                        type="email"
                        className="input"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <span>Email</span>
                </label>

        {/*         Campo Password
                <label className="lab">
                    <input
                        required
                        placeholder="Enter your Password"
                        type="password"
                        className="input"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <span>Password</span>
                </label>*/}



                {/* Campo Phone */}
                <label className="lab">
                    <input
                        required
                        placeholder="Enter your Phone"
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    <span>Phone</span>
                </label>

                {/* Botón Submit */}
                <button className="submit" type="submit">Submit</button>

                {/* Enlace a la página de login */}
                <p className="signin">Already have an account? <a href="#" className="register_link">Sign In</a></p>
            </form>
        </Modal>

    );
};
export default EditUserForm;
