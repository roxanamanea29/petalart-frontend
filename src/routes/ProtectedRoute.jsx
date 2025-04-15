import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
    const { user } = useAuth();
    const location = useLocation();

    if (!user || !user.roles) {
        // Usuario no autenticado
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    // ¿Tiene al menos uno de los roles requeridos?
    const hasPermission = user.roles.some(role => allowedRoles.includes(role));

    return hasPermission ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export default ProtectedRoute;