// src/components/RutaProtegida.jsx
// Protege rutas para usuarios autenticados o con rol de administrador

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export default function RutaProtegida({ children, requiereAdmin = false }) {
  const { usuario } = useAuth();
  const location = useLocation();

  // Si no hay sesión activa, redirigimos al login
  if (!usuario) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Si la ruta requiere ser admin y el usuario no lo es, redirigimos al inicio
  if (requiereAdmin && usuario.rol !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
}
