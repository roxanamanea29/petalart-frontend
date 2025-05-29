import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Restaura user de localStorage al iniciar
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    // Login guarda estado y en localStorage para persistencia
    const login = (token, roles, userId, name, email) => {
        const userData = { token, roles, id: userId, name, email };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData)); //

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