import React, { createContext, useContext, useState } from "react";
import LOCALSERVERBASEURL from "@/Configuration/ConectionConfig.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = async (token, roles, userId, name, email) => {
        const userData = { token, roles, id: userId, name, email };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", token);

        // Sincronizar carrito local con backend
        const localCart = JSON.parse(localStorage.getItem("cart") || "{}");

        if (localCart.items && localCart.items.length > 0) {
            for (let item of localCart.items) {
                try {
                    await fetch(`${LOCALSERVERBASEURL}/cart/add`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            productId: item.productId,
                            quantity: item.quantity,
                        }),
                    });
                } catch (e) {
                    console.error(" Error al sincronizar el producto:", item, e);
                }
            }

            // ✅ Limpiar carrito local tras sincronización
            localStorage.removeItem("cart");
        }

        try {
            // Verificar si el usuario tiene un carrito existente
            const response = await fetch(`${LOCALSERVERBASEURL}/cart/my-cart`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error("Error al obtener el carrito");

            const backendCart = await response.json();

            // ✅ Guarda el carrito sincronizado (nombre de clave limpio)
            localStorage.setItem("syncedCart", JSON.stringify(backendCart));
            console.log("✅ Carrito sincronizado y recargado:", backendCart);

            // ✅ (OPCIONAL) Si tienes un context de carrito, actualízalo también
            // setCart(backendCart); ← si usas useCart o useContext

        } catch (error) {
            console.error(" Error al cargar el carrito del backend:", error);
            alert("Ocurrió un error al cargar tu carrito. Intenta de nuevo.");
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);