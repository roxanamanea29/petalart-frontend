import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../AuthContext";

const ProtectedRoute = ({ allowedRoles }) => {
    const { user } = useAuth();

    if (!user || !user.roles) {
        return <Navigate to="/login" />;
    }

    const hasAccess = user.roles.some((r) => allowedRoles.includes(r));
    return hasAccess ? <Outlet /> : <Navigate to="/unauthorized" />;
};

export default ProtectedRoute;