import Container from 'react-bootstrap/Container'; // Importa el componente Container de React-Bootstrap
import Navbar from 'react-bootstrap/Navbar'; // Importa el componente Navbar de React-Bootstrap
import Nav from 'react-bootstrap/Nav'; // Importa el componente Nav de React-Bootstrap
import imagenLogo from '../assets/ER.png'; // Importa la imagen del logo de la empresa

function Header() {
    return (
        // Crea un Navbar que ocupa todo el ancho y se fija en la parte superior
        <Navbar  expand="lg" className="shadow-sm px-3 fixed-top m-3 bg-white ">
            <Container fluid>
                {/* Logo de la empresa, que actúa como enlace al inicio */}
                <Navbar.Brand href="#home" className="d-flex align-items-center">
                    <img
                        alt="Logo" // Texto alternativo para la imagen
                        src={imagenLogo} // Ruta de la imagen del logo
                        width="50" // Ancho de la imagen
                        height="50" // Altura de la imagen
                        className="d-inline-block me-2" // Clases de Bootstrap para el diseño
                    />
                </Navbar.Brand>


                {/* Título centrado en el Navbar */}
                <Navbar.Text className="mx-auto fw-bold text-center">
                    Employee Records {/* Título que se muestra en el centro */}
                </Navbar.Text>

                {/* Opciones de navegación alineadas a la derecha */}
                <Nav className="ms-auto">
                    <Nav.Link href="#login">Login</Nav.Link> {/* Enlace a la sección de inicio de sesión */}
                    <Nav.Link href="#about">About</Nav.Link> {/* Enlace a la sección "Acerca de" */}
                </Nav>
            </Container>
        </Navbar>
    );
}

export default Header; // Exporta el componente Header para que pueda ser utilizado en otros lugares
