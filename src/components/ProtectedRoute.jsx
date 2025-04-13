import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const ProtectedRoute = () => {
    const { user } = useAuth(); // Obtén el usuario desde el contexto

    if (!user || !user.roles) {
        return <Navigate to="/" />; // Si no hay usuario o roles, redirige al login
    }

    // Verifica si el usuario tiene el rol de administrador
    if (user.roles.includes("ROLE_ADMIN")) {
        return <Navigate to="/Dashboard_admin" />;
    }

    // Verifica si el usuario es un usuario normal
    if (user.roles.includes("ROLE_USER")) {
        return <Navigate to="/" />;
    }

    return <Navigate to="/login" />; // Si no tiene un rol reconocido, redirige al login
};

export default ProtectedRoute;
