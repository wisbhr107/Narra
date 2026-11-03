// src/components/BarraLateralMisHistorias.jsx
// Barra lateral fija para la pantalla Mis Historias según Stitch

import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ASSETS } from '../data/datosEjemplo';
import { useAuth } from '../context/useAuth';

export default function BarraLateralMisHistorias() {
  const { usuario } = useAuth();

  const claseNav = ({ isActive }) =>
    isActive
      ? 'flex items-center gap-space-sm px-space-md py-space-sm transition-colors bg-surface-container-high text-on-surface font-semibold rounded-xl'
      : 'flex items-center gap-space-sm px-space-md py-space-sm rounded-xl text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-label-lg text-label-lg transition-colors';

  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-surface-container-low z-50 flex flex-col pt-space-lg pb-space-lg shadow-[1px_0_12px_rgba(45,36,30,0.04)]">
      {/* Logo Narra */}
      <div className="px-space-lg mb-space-lg flex items-center gap-space-sm">
        <Link to="/" className="flex items-center gap-space-sm">
          <img alt="Narra Logo" className="h-8 w-auto object-contain" src={ASSETS.logo} />
          <span className="font-headline-sm text-headline-sm text-primary font-bold">Narra</span>
        </Link>
      </div>

      {/* Botón Nueva Crónica */}
      <div className="px-space-md mb-space-lg">
        <Link
          to="/editor/nueva"
          className="flex items-center justify-center gap-space-xs w-full py-space-sm px-space-md rounded-full bg-primary text-on-primary font-label-lg text-label-lg hover:bg-primary-container transition-all shadow-sm"
        >
          <span className="material-symbols-outlined text-sm">history_edu</span>
          <span>Nueva Crónica</span>
        </Link>
      </div>

      {/* Navegación lateral */}
      <nav className="flex-1 px-space-md flex flex-col gap-space-xs">
        <NavLink to="/mis-historias" end className={claseNav}>
          <span className="material-symbols-outlined text-lg">auto_stories</span>
          <span>Mis historias</span>
        </NavLink>
        <Link to="/#catalogo" className="flex items-center gap-space-sm px-space-md py-space-sm rounded-xl text-on-surface-variant hover:bg-surface-container font-label-lg text-label-lg transition-colors">
          <span className="material-symbols-outlined text-lg">menu_book</span>
          <span>Cuadernos y Diarios</span>
        </Link>
        <Link to="/" className="flex items-center gap-space-sm px-space-md py-space-sm rounded-xl text-on-surface-variant hover:bg-surface-container font-label-lg text-label-lg transition-colors">
          <span className="material-symbols-outlined text-lg">drafts</span>
          <span>Tinta en Borrador</span>
        </Link>
        {usuario?.rol === 'admin' && (
          <NavLink to="/admin/categorias" className={claseNav}>
            <span className="material-symbols-outlined text-lg">shield_person</span>
            <span>Administrar categorías</span>
          </NavLink>
        )}
      </nav>

      {/* Perfil del Cronista al pie */}
      <div className="px-space-md pt-space-md flex items-center gap-space-sm border-t border-surface-variant/40">
        <img
          alt="Perfil"
          className="w-8 h-8 rounded-full object-cover ring-2 ring-surface-variant"
          src={usuario?.avatar || ASSETS.avatar}
        />
        <div className="flex flex-col min-w-0">
          <span className="font-label-md text-label-md text-on-surface font-semibold truncate">
            {usuario?.nombre || 'Cronista'}
          </span>
          <span className="font-label-sm text-label-sm text-outline">Tinta activa</span>
        </div>
      </div>
    </aside>
  );
}
