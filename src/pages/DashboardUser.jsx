import NavbarH from "../components/NavbarH.jsx";
import Footer from "../components/Footer.jsx";


const DashboardUser = () => {
    return (
        <>

        <NavbarH />
        <div>
            <h1>Dashboard de usuario</h1>
            <p>Bienvenido a tu cuenta de usuario.</p>
            <h2>Opciones disponibles:</h2>
            <ul>
                <li>Ver pedidos</li>
                <li>Editar perfil</li>
                <li>Cambiar contraseña</li>
            </ul>
        </div>
            <Footer />
        </>
    );
}
export default DashboardUser;
