// src/components/Cabecera.jsx
// Barra de navegación superior con enlaces, botón de escribir y menú de usuario

import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ASSETS } from '../data/datosEjemplo';
import { useAuth } from '../context/useAuth';

interface NavClassProps {
  isActive: boolean;
}

export default function Cabecera() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { usuario, cerrarSesion } = useAuth();
  const navigate = useNavigate();

  const handleCerrar = () => {
    setMenuAbierto(false);
    cerrarSesion();
    navigate('/login');
  };

  // Clases dinámicas para marcar el enlace activo
  const claseEnlace = ({ isActive }: NavClassProps) =>
    isActive
      ? 'px-space-md py-space-xs transition-colors bg-surface-container-high text-on-surface font-semibold rounded-full font-label-lg text-label-lg shadow-xs'
      : 'px-space-md py-space-xs rounded-full font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-surface-variant/50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(45,36,30,0.05)]">
      <div className="h-20 max-w-7xl mx-auto px-margin flex items-center justify-between gap-gutter">
        {/* Logo y Enlaces principales */}
        <div className="flex items-center gap-space-lg">
          <Link to="/" className="flex items-center gap-space-sm group">
            <img alt="Narra Logo" className="h-8 w-auto object-contain transition-transform group-hover:scale-105" src={ASSETS.logo} />
            <span className="font-headline-sm text-headline-sm text-primary tracking-tight font-bold group-hover:text-primary-container transition-colors">
              Narra
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-space-xs p-space-xs bg-surface-container-low/70 rounded-full">
            <NavLink to="/" end className={claseEnlace}>Inicio</NavLink>
            <NavLink to="/mis-historias" className={claseEnlace}>Mis historias</NavLink>
            <NavLink to="/historia/el-susurro-del-faro-olvidado" className={claseEnlace}>Lectura</NavLink>
            {usuario?.rol === 'admin' && (
              <NavLink to="/admin/categorias" className={claseEnlace}>Categorías</NavLink>
            )}
          </nav>
        </div>

        {/* Acciones de la derecha: Escribir y Perfil / Acceso */}
        <div className="flex items-center gap-space-md">
          <Link
            to="/editor/nueva"
            className="inline-flex items-center gap-space-xs px-space-lg py-space-xs rounded-full bg-primary text-on-primary font-label-lg text-label-lg hover:bg-primary-container transition-all shadow-[0_2px_8px_rgba(0,68,67,0.18)]"
          >
            <span className="material-symbols-outlined text-sm">edit</span>
            <span>Escribir</span>
          </Link>

          {usuario ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setMenuAbierto(!menuAbierto)}
                className="flex items-center gap-space-sm pl-space-xs focus:outline-none"
              >
                <img
                  alt="Perfil"
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-surface-variant hover:ring-secondary transition-all"
                  src={usuario.avatar || ASSETS.avatar}
                />
              </button>

              {/* Menú desplegable del avatar */}
              {menuAbierto && (
                <div className="absolute right-0 mt-2 w-56 bg-surface-container-lowest rounded-2xl shadow-xl border border-surface-variant py-space-xs z-50">
                  <div className="px-space-md py-space-xs border-b border-surface-variant/50">
                    <p className="font-label-md text-label-md text-on-surface font-semibold truncate">{usuario.nombre}</p>
                    <p className="font-label-sm text-label-sm text-outline truncate">{usuario.email}</p>
                  </div>
                  <Link
                    to="/mis-historias"
                    onClick={() => setMenuAbierto(false)}
                    className="flex items-center gap-2 px-space-md py-2 font-label-md text-label-md text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                  >
                    <span className="material-symbols-outlined text-sm text-secondary">auto_stories</span>
                    <span>Mis historias</span>
                  </Link>
                  {usuario.rol === 'admin' && (
                    <Link
                      to="/admin/categorias"
                      onClick={() => setMenuAbierto(false)}
                      className="flex items-center gap-2 px-space-md py-2 font-label-md text-label-md text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                    >
                      <span className="material-symbols-outlined text-sm text-secondary">shield_person</span>
                      <span>Administrar categorías</span>
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={handleCerrar}
                    className="w-full flex items-center gap-2 px-space-md py-2 font-label-md text-label-md text-error hover:bg-error-container/20 text-left border-t border-surface-variant/50"
                  >
                    <span className="material-symbols-outlined text-sm">logout</span>
                    <span>Cerrar sesión</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-space-xs">
              <Link to="/login" className="px-space-md py-1.5 rounded-full font-label-md text-label-md text-primary hover:bg-surface-container transition-colors">
                Iniciar sesión
              </Link>
              <Link to="/registro" className="px-space-md py-1.5 rounded-full bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container shadow-sm transition-all flex items-center gap-1">
                <span>Registrarse</span>
                <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
