import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        // Actualiza el estado para renderizar la UI de respaldo en caso de error
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // Puedes también loguear el error a un servicio de reporte de errores
        console.error("Error capturado:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <h2>Hubo un problema con la carga de la página.</h2>
                    <details>
                        {this.state.error && this.state.error.toString()}
                    </details>
                </div>
            );
        }

        return this.props.children; // Renderiza los componentes hijos si no hay errores
    }
}

export default ErrorBoundary;
