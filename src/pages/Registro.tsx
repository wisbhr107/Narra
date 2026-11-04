// src/pages/Registro.jsx
// Pantalla de registro de Narra (diseño fiel a Stitch)

import { useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export default function Registro() {
  const [nombre, setNombre] = useState('Clara Montejo');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarClave, setMostrarClave] = useState(false);
  const [error, setError] = useState('');
  const { registrar } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const resultado = registrar(nombre, email, password);
    if (resultado.exito) {
      const destino = location.state?.from;
      navigate(destino ? `${destino.pathname || ''}${destino.search || ''}${destino.hash || ''}` : '/mis-historias', { replace: true });
    } else {
      setError(resultado.mensaje);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-margin py-space-xl flex flex-col items-center min-h-[calc(100vh-5rem)]">
      {/* Barra Superior */}
      <div className="w-full flex items-center justify-between pb-space-lg mb-space-md">
        <div className="flex items-center gap-space-sm">
          <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary shadow-sm">
            <span className="material-symbols-outlined text-xl">history_edu</span>
          </div>
          <div>
            <span className="font-headline-sm text-headline-sm text-primary font-bold tracking-tight">Narra</span>
            <span className="ml-space-xs font-label-sm text-label-sm text-secondary uppercase tracking-widest">· Cuadernos</span>
          </div>
        </div>
        <div className="flex items-center gap-space-xs font-label-lg text-label-lg">
          <span className="text-on-surface-variant font-normal">¿Ya tienes cuenta?</span>
          <Link to="/login" state={location.state} className="text-primary font-semibold hover:text-primary-container transition-colors inline-flex items-center gap-0.5">
            <span>Inicia sesión</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </div>
      </div>

      {/* Contenedor Folio */}
      <div className="w-full bg-surface-container-low rounded-xl shadow-xl overflow-hidden relative grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
        {/* Columna Izquierda: Escudo */}
        <div className="lg:col-span-5 bg-surface-container p-space-xl flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10 flex flex-col items-start">
            <div className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-container-high text-secondary font-label-sm text-label-sm uppercase tracking-wider mb-space-lg">
              <span className="material-symbols-outlined text-sm">auto_stories</span>
              <span>Cuaderno Nuevo · Folio I</span>
            </div>
            <div className="w-20 h-20 rounded-full bg-surface-container-highest shadow-md flex items-center justify-center mb-space-lg text-primary">
              <span className="material-symbols-outlined text-3xl">ink_pen</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-primary font-bold leading-tight mb-space-sm">
              Tu primera página te espera
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant font-light max-w-sm mb-space-lg">
              Crea tu cuaderno y empieza a escribir tus historias en un refugio sin algoritmos ni prisas.
            </p>
          </div>
          <div className="relative z-10 pt-space-lg flex items-center gap-space-md">
            <span className="material-symbols-outlined text-xl text-primary">verified</span>
            <span className="font-label-md text-label-md text-on-surface font-semibold">Tinta Firme & Privacidad</span>
          </div>
        </div>

        {/* Columna Derecha: Formulario */}
        <div className="lg:col-span-7 bg-surface-container-lowest p-space-xl lg:p-12 flex flex-col justify-center relative">
          <div className="max-w-md w-full mx-auto flex flex-col justify-center flex-grow py-space-md">
            <div className="mb-space-lg">
              <span className="text-secondary font-label-sm text-label-sm font-bold uppercase tracking-wider">✦ Registro de Autor</span>
              <h2 className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight mt-1">Crear cuenta</h2>
            </div>

            {error && (
              <div className="mb-space-md p-space-sm rounded-lg bg-error-container/40 text-tertiary-container font-label-sm text-label-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-base">error</span>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-space-md">
              <div className="flex flex-col gap-space-xs">
                <label className="font-label-md text-label-md text-on-surface font-semibold" htmlFor="nombre">Nombre o seudónimo</label>
                <input
                  id="nombre"
                  type="text"
                  required
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full px-space-md py-space-sm bg-surface-container-low text-on-surface rounded-DEFAULT font-body-sm text-body-sm focus:outline-none focus:bg-surface focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex flex-col gap-space-xs">
                <label className="font-label-md text-label-md text-on-surface font-semibold" htmlFor="email">Correo electrónico</label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="tu@correo.es"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-space-md py-space-sm bg-surface-container-low text-on-surface rounded-DEFAULT font-body-sm text-body-sm focus:outline-none focus:bg-surface focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex flex-col gap-space-xs">
                <label className="font-label-md text-label-md text-on-surface font-semibold" htmlFor="password">Contraseña (mínimo 8 letras)</label>
                <div className="relative">
                  <input
                    id="password"
                    type={mostrarClave ? 'text' : 'password'}
                    required
                    placeholder="Mínimo 8 caracteres"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-space-md pr-10 py-space-sm bg-surface-container-low text-on-surface rounded-DEFAULT font-body-sm text-body-sm focus:outline-none focus:bg-surface focus:ring-2 focus:ring-primary"
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarClave(!mostrarClave)}
                    className="absolute right-3 top-2.5 text-on-surface-variant hover:text-primary"
                  >
                    <span className="material-symbols-outlined text-lg">{mostrarClave ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-space-md px-space-lg rounded-full bg-primary text-on-primary font-label-lg text-label-lg font-bold shadow-md hover:bg-primary-container transition-all flex items-center justify-center gap-space-sm mt-space-sm"
              >
                <span>Crear cuenta</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
