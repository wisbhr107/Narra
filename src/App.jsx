// src/App.jsx
// Enrutador principal de Narra con proveedor de autenticación y rutas protegidas

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LayoutPrincipal from './layouts/LayoutPrincipal';
import RutaProtegida from './components/RutaProtegida';

import Inicio from './pages/Inicio';
import Login from './pages/Login';
import Registro from './pages/Registro';
import MisHistorias from './pages/MisHistorias';
import Editor from './pages/Editor';
import Lectura from './pages/Lectura';
import Categorias from './pages/Categorias';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<LayoutPrincipal />}>
            {/* Rutas públicas */}
            <Route path="/" element={<Inicio />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/historia/:id" element={<Lectura />} />

            {/* Rutas protegidas (requieren sesión activa) */}
            <Route
              path="/mis-historias"
              element={
                <RutaProtegida>
                  <MisHistorias />
                </RutaProtegida>
              }
            />
            <Route
              path="/editor/:id"
              element={
                <RutaProtegida>
                  <Editor />
                </RutaProtegida>
              }
            />

            {/* Ruta restringida para administradores */}
            <Route
              path="/admin/categorias"
              element={
                <RutaProtegida requiereAdmin={true}>
                  <Categorias />
                </RutaProtegida>
              }
            />
          </Route>

          {/* Redirección por defecto */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
