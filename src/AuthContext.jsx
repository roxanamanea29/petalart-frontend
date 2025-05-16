import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Restaurar usuario desde localStorage
    useEffect(() => {
        const token = localStorage.getItem("token");
        const roles = JSON.parse(localStorage.getItem("roles"));
        const userId = localStorage.getItem("userId");
        const name = localStorage.getItem("name");
        const email = localStorage.getItem("email");

        if (token && userId && name) {
            setUser({
                token,
                roles,
                id: userId,
                name,
                email
            });
        }
    }, []);

    // Login correcto
    const login = (token, roles, userId, name, email) => {
        const userData = { token, roles, id: userId, name, email };
        setUser(userData);

        localStorage.setItem("token", token);
        localStorage.setItem("roles", JSON.stringify(roles));
        localStorage.setItem("userId", userId);
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("roles");
        localStorage.removeItem("userId");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);