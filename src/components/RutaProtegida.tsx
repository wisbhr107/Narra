// src/components/RutaProtegida.jsx
// Protege rutas para usuarios autenticados o con rol de administrador

import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import type { ReactNode } from 'react';

interface RutaProtegidaProps {
  children: ReactNode;
  requiereAdmin?: boolean;
}

export default function RutaProtegida({ children, requiereAdmin = false }: RutaProtegidaProps) {
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
