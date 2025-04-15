import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

// Vistas
import LoginForm from "./pages/LoginForm";
import PublicHome from "./pages/PublicHome";
import DashboardUser from "./pages/DashboardUser";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import CategoryProducts from "@/components/CategoryProducts.jsx";
import Contact from "./pages/Contact.jsx";

/*import ProductosCrud from "./pages/admin/ProductosCrud";
import CategoriasCrud from "./pages/admin/CategoriasCrud";*/

function App() {
    return (
        <>

        <AuthProvider>

            <Router>
                <Routes>

                    {/* Públicas */}
                    <Route path="/" element={<PublicHome />} />
                    <Route path="/categorias/:id" element={<CategoryProducts />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/contacto" element={<Contact />} />

                    {/* Rutas para usuarios logueados con rol USER */}
                    <Route element={<ProtectedRoute allowedRoles={["ROLE_USER"]} />}>
                        <Route path="/dashboard" element={<DashboardUser />} />
                    </Route>

                    {/* Rutas para usuarios logueados con rol ADMIN */}
                    <Route element={<ProtectedRoute allowedRoles={["ROLE_ADMIN"]} />}>
                        <Route path="/admin" element={<DashboardAdmin />} />
                  {/*      <Route path="/admin/productos" element={<ProductosCrud />} />
                        <Route path="/admin/categorias" element={<CategoriasCrud />} />*/}
                    </Route>

                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>

        </AuthProvider>
        </>
    );
}

export default App;