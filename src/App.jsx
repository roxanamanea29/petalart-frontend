import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

// Vistas
import PublicHome from "./pages/PublicHome";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import CategoryProducts from "@/pages/CategoryProducts.jsx";
import Contact from "./pages/Contact.jsx";
import Login from "./pages/Login.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import CartView from "@/pages/CartView.jsx";
import ErrorBoundary from "@/components/ErrorBoundary.jsx";

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
                    <Route path="/login" element={<Login />} />
                    <Route path="/contacto" element={<Contact />} />
                    <Route path="/productos/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<ErrorBoundary>
                        <CartView />
                    </ErrorBoundary>} />
                    {/* Rutas para usuarios logueados con rol USER y ADMIN */}



                    {/* Rutas para usuarios logueados con rol USER */}
                    <Route element={<ProtectedRoute allowedRoles={["ROLE_USER"]} />}>

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