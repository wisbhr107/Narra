// src/pages/Login.jsx
// Pantalla de inicio de sesión de Narra (diseño fiel a Stitch)

import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export default function Login() {
  const [email, setEmail] = useState('cronista@narra.es');
  const [password, setPassword] = useState('tinta12345');
  const [mostrarClave, setMostrarClave] = useState(false);
  const [error, setError] = useState('');
  const { iniciarSesion } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const resultado = iniciarSesion(email, password);
    if (resultado.exito) {
      const destino = location.state?.from;
      navigate(destino ? `${destino.pathname || ''}${destino.search || ''}${destino.hash || ''}` : '/mis-historias', { replace: true });
    } else {
      setError(resultado.mensaje);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-5rem)] flex flex-col justify-between py-space-md sm:py-space-xl px-margin-mobile sm:px-margin">
      {/* Barra superior contextual */}
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between py-space-sm">
        <div className="flex items-center gap-space-sm">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-surface-container-high text-primary">
            <span className="material-symbols-outlined text-lg">history_edu</span>
          </span>
          <span className="font-label-sm text-label-sm tracking-widest uppercase text-outline">Acceso al Archivo</span>
        </div>
        <div className="flex items-center gap-space-xs">
          <span className="font-body-sm text-body-sm text-on-surface-variant hidden sm:inline">¿Aún no tienes cuaderno?</span>
          <Link to="/registro" state={location.state} className="font-label-lg text-label-lg text-primary hover:text-primary-container transition-colors inline-flex items-center gap-space-xs font-semibold">
            <span>Crear cuenta</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </div>
      </div>

      {/* Contenedor central de dos columnas estilo folio encuadernado */}
      <div className="w-full max-w-5xl mx-auto my-auto relative">
        <div className="relative w-full bg-surface-container-lowest rounded-xl shadow-[0_12px_40px_rgba(45,36,30,0.08)] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Marcapáginas colgante */}
          <div className="absolute top-0 right-12 w-8 h-12 bg-secondary-container rounded-b-md shadow-sm z-20 flex items-end justify-center pb-1">
            <span className="material-symbols-outlined text-on-secondary-container text-xs">bookmark</span>
          </div>

          {/* Columna Izquierda: Escudo y bienvenida */}
          <div className="lg:col-span-5 bg-surface-container-low/75 p-space-xl sm:p-12 flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10 flex flex-col items-start gap-space-lg">
              <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-surface-container-high shadow-inner">
                <div className="w-16 h-16 rounded-full bg-surface-container-lowest flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-3xl text-primary">ink_pen</span>
                </div>
              </div>
              <div className="space-y-space-sm pt-space-xs">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">Cuaderno Personal</span>
                <h1 className="font-headline-lg text-headline-lg text-on-surface leading-tight font-bold">
                  Qué bueno verte de nuevo.
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant font-light pt-space-xs">
                  Tu cuaderno sigue donde lo dejaste. Las palabras inacabadas y la tinta viva aguardan tu trazo.
                </p>
              </div>
            </div>
            <div className="relative z-10 pt-space-xl mt-space-lg flex items-center gap-space-md">
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary-container">
                <span className="material-symbols-outlined text-xl">auto_stories</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Estado de tu tomo</span>
                <span className="font-label-lg text-label-lg text-on-surface font-semibold">Tinta lista para continuar</span>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Formulario de Entrada */}
          <div className="lg:col-span-7 bg-surface-container-lowest p-space-xl sm:p-12 flex flex-col justify-center relative">
            <div className="max-w-md w-full mx-auto flex flex-col gap-space-lg">
              <div className="space-y-space-xs">
                <span className="font-label-sm text-label-sm text-outline tracking-wider uppercase font-semibold">Ingreso de Cronista</span>
                <h2 className="font-headline-md text-headline-md text-on-surface font-bold">Iniciar sesión</h2>
              </div>

              {/* Banner de error */}
              {error && (
                <div className="w-full rounded-xl bg-error-container/40 p-space-md flex items-start gap-space-sm text-on-surface shadow-sm">
                  <div className="w-7 h-7 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-base">lock_reset</span>
                  </div>
                  <div className="flex-1 flex flex-col">
                    <span className="font-label-lg text-label-lg font-bold text-tertiary">Credenciales no coincidentes</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">{error}</span>
                  </div>
                  <button type="button" onClick={() => setError('')} className="text-tertiary hover:opacity-75">
                    <span className="material-symbols-outlined text-base">close</span>
                  </button>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-space-md flex flex-col">
                <div className="space-y-space-xs">
                  <label className="font-label-lg text-label-lg text-on-surface font-semibold" htmlFor="email">Correo electrónico</label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-4 text-outline text-xl pointer-events-none">mail</span>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="cronista@narra.es"
                      className="w-full pl-12 pr-4 py-3.5 bg-surface-container-low rounded-DEFAULT text-on-surface font-body-sm text-body-sm focus:outline-none focus:bg-surface-container focus:ring-2 focus:ring-primary-container"
                    />
                  </div>
                </div>

                <div className="space-y-space-xs">
                  <label className="font-label-lg text-label-lg text-on-surface font-semibold" htmlFor="password">Contraseña</label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-4 text-outline text-xl pointer-events-none">lock</span>
                    <input
                      id="password"
                      type={mostrarClave ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Escribe tu clave secreta"
                      className="w-full pl-12 pr-12 py-3.5 bg-surface-container-low rounded-DEFAULT text-on-surface font-body-sm text-body-sm focus:outline-none focus:bg-surface-container focus:ring-2 focus:ring-primary-container"
                    />
                    <button
                      type="button"
                      onClick={() => setMostrarClave(!mostrarClave)}
                      className="absolute right-3.5 text-outline hover:text-on-surface p-1"
                    >
                      <span className="material-symbols-outlined text-xl">{mostrarClave ? 'visibility_off' : 'visibility'}</span>
                    </button>
                  </div>
                </div>

                <div className="pt-space-sm">
                  <button type="submit" className="w-full py-4 px-space-xl rounded-full bg-primary text-on-primary font-label-lg text-label-lg font-bold hover:bg-primary-container shadow-md transition-all flex items-center justify-center gap-space-sm">
                    <span>Entrar</span>
                    <span className="material-symbols-outlined text-xl">arrow_forward</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
