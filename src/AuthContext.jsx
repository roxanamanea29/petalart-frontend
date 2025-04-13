import React, { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto
const AuthContext = createContext();

// Crear un proveedor de contexto
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ isAuthenticated: false, role: '' });

    useEffect(() => {
        // Intenta recuperar el token y el rol del localStorage (o cualquier otra forma)
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        if (token && role) {
            setAuth({ isAuthenticated: true, role });
        }
    }, []);

    const login = (token, role) => {
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        setAuth({ isAuthenticated: true, role });
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setAuth({ isAuthenticated: false, role: '' });
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para acceder al contexto
export const useAuth = () => useContext(AuthContext);
