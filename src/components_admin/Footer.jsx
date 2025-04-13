import Card from 'react-bootstrap/Card';//importar el componente Card de react-bootstrap

function WithHeaderAndQuoteExample() {//funcion que retorna el componente
    return (
        <Card expand="lg" className="shadow-sm px-3 fixed-bottom m-3 bg-white border-0 rounded-0">
            <Card.Header>Employee Records</Card.Header>
            <Card.Body>
                <blockquote className="blockquote mb-3 bg-light-subtle " >
                    <p>
                        Proyecto que integra una API de empleados en Laravel con un frontend en React Vite y Bootstrap, optimizando la gestión de datos.
                    </p>
                    <footer className="blockquote-footer">
                        Realizado por <cite title="Source Title">Roxana</cite>
                    </footer>
                </blockquote>
            </Card.Body>
        </Card>
    );
}

export default WithHeaderAndQuoteExample;//exporta el componente WithHeaderAndQuoteExample