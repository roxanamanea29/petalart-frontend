import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Restaura user de localStorage al iniciar
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    // Login guarda estado y en localStorage para persistencia
    // Login guarda estado y en localStorage para persistencia
    const login = async (token, roles, userId, name, email) => {
        const userData = { token, roles, id: userId, name, email };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));

        // 🔄 Sincronizar carrito local con backend
        const localCart = JSON.parse(localStorage.getItem("cart") || "{}");

        if (localCart.items && localCart.items.length > 0) {
            for (let item of localCart.items) {
                try {
                    await fetch(`${import.meta.env.VITE_LOCALSERVERBASEURL || "http://localhost:8080"}/cart/add`, {
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
                    console.error(" Error al sincronizar producto:", item, e);
                }
            }

            // ✅ (opcional) Limpia el carrito local si ya se migró
            localStorage.removeItem("cart");
        }
    };

    // Logout: limpia estado y storage
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para usar el contexto
export const useAuth = () => useContext(AuthContext);