import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

// Vistas
import PublicHome from "./pages/PublicHome";
import CategoryProducts from "@/pages/CategoryProducts.jsx";
import Contact from "./pages/Contact.jsx";
import Login from "./pages/Login.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import CartView from "@/pages/CartView.jsx";
import ErrorBoundary from "@/components/ErrorBoundary.jsx";
import Dashboard from "@/pages/admin/Dashboard.jsx";
import Checkout from "./pages/Checkout.jsx";
import ProductsCrud from "./pages/admin/ProductsCrud";
import CategoryCrud from "./pages/admin/CategoryCrud.jsx";
import CheckoutConfirmation from "./pages/CheckoutConfirmation.jsx";
import UserList from "@/pages/admin/UserList.jsx";
import OrderList from "@/pages/admin/OrderList.jsx";

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

                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/checkout/confirmation" element={<CheckoutConfirmation />} />
                    {/* Rutas para usuarios logueados con rol USER */}
                    <Route element={<ProtectedRoute allowedRoles={["ROLE_USER"]} />}>

                    </Route>

                    {/* Rutas para usuarios logueados con rol ADMIN */}
                    <Route element={<ProtectedRoute allowedRoles={["ROLE_ADMIN"]} />}>
                        <Route path="/admin" element={<Dashboard />} />
                        <Route path="/admin/productos" element={<ProductsCrud />} />
                        <Route path="/admin/categorias" element={<CategoryCrud />} />
                        <Route path={"/admin/usuarios"} element={<UserList />} />
                        <Route path={"/admin/ordenes"} element={<OrderList />} />
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