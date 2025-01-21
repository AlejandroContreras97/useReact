import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    // Redirige al login si el usuario no está autenticado
    return <Navigate to="/" replace />;
  }

  // Renderiza el contenido protegido si está autenticado
  return children;
};

export default ProtectedRoute;
