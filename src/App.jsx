import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthContext"; // Asegúrate de importar AuthProvider
import ProtectedRoute from "./components/ProtectedRoute"; // Ruta protegida
import LoginForm from "./pages/auth/LoginForm.jsx";
import Dashboard_admin from "./pages/admin/Dashboard_admin.jsx";
import Dashboard from "./pages/Dashboard.jsx"; // Dashboard de usuario
import ErrorBoundary from "./components/ErrorBoundary.jsx";

function App() {
    return (
        <AuthProvider>
            <Router>
                    <Routes>
                        <Route path="/login" element={<LoginForm />} />

                        {/* Ruta protegida para Admin */}
                        <Route path="/dashboard_admin" element={<ProtectedRoute />}>
                            <Route path="" element={<Dashboard_admin />} />
                        </Route>

                        {/* Ruta para la página principal (raíz) */}
                        <Route path="/" element={<Dashboard />} />

                        {/* Ruta protegida para User */}
                        <Route path="/dashboard" element={<ProtectedRoute />}>
                            <Route path="" element={<Dashboard />} />
                        </Route>

                        {/* Otras rutas */}
                    </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
