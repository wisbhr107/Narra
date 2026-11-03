// src/layouts/LayoutPrincipal.jsx
// Layout común que envuelve las páginas con Cabecera, Pie y Aviso de Escritorio

import React from 'react';
import { Outlet } from 'react-router-dom';
import Cabecera from '../components/Cabecera';
import Pie from '../components/Pie';
import AvisoEscritorio from '../components/AvisoEscritorio';

export default function LayoutPrincipal() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface">
      {/* Aviso amable para pantallas menores a 1024px */}
      <AvisoEscritorio />

      {/* Cabecera común fija */}
      <Cabecera />

      {/* Contenido principal de la página */}
      <div className="flex-1 w-full">
        <Outlet />
      </div>

      {/* Pie de página editorial */}
      <Pie />
    </div>
  );
}
