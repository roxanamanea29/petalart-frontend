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
import ProductsView from "./pages/admin/ProductsView.jsx";
import CheckoutConfirmation from "./pages/CheckoutConfirmation.jsx";
import CategoryView from "@/pages/admin/CategoryView.jsx";
import UserView from "@/pages/admin/UserView.jsx";
import OrderView from "@/pages/admin/OrderView.jsx";
import AddressesView from "@/pages/admin/AddressesView.jsx";

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
                        <Route path="/admin/productos" element={<ProductsView />} />
                        <Route path="/admin/categorias" element={<CategoryView />} />
                        <Route path={"/admin/usuarios"} element={<UserView />} />
                        <Route path={"/admin/ordenes"} element={<ErrorBoundary><OrderView /></ErrorBoundary>} />
                        <Route path={"/admin/addresses"} element={<AddressesView />} />
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