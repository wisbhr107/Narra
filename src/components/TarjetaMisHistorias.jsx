// src/components/TarjetaMisHistorias.jsx
// Tarjeta individual para Mis Historias con menú de editar y eliminar

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function TarjetaMisHistorias({ historia, esLista, onEliminar }) {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { id, titulo, resumen, imagen, estado, visibilidad, palabras, fechaEdicion, etiquetas, marcadorColor } = historia;

  const handleEliminar = () => {
    setMenuAbierto(false);
    if (window.confirm(`¿Estás seguro de que deseas eliminar la crónica "${titulo}"?`)) {
      onEliminar(id);
    }
  };

  return (
    <article
      className={`group relative flex bg-surface-container-low rounded-2xl overflow-hidden border border-surface-variant/50 shadow-sm hover:border-secondary/30 hover:shadow-lg transition-all ${
        esLista ? 'flex-col sm:flex-row items-stretch' : 'flex-col'
      }`}
    >
      {/* Cinta de marcapáginas */}
      <div className={`absolute top-0 right-6 z-20 w-5 h-8 ${marcadorColor || 'bg-secondary'} rounded-b-sm shadow-sm flex items-end justify-center pb-1`}>
        <span className="w-1 h-1 rounded-full bg-surface-container-lowest opacity-75"></span>
      </div>

      {/* Imagen de portada */}
      <div className={`relative overflow-hidden bg-surface-container-highest ${esLista ? 'w-full sm:w-64 h-48 sm:h-auto' : 'h-48 w-full'}`}>
        <img src={imagen} alt={titulo} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute bottom-2 left-3 flex items-center gap-1.5">
          <span className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm font-bold uppercase tracking-wider ${
            estado === 'Borrador' ? 'bg-secondary-container text-on-secondary-container' : 'bg-primary-fixed text-on-primary-fixed'
          }`}>
            {estado}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-surface-container-highest/90 backdrop-blur-sm text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">{visibilidad === 'Privada' ? 'lock' : 'public'}</span>
            {visibilidad}
          </span>
        </div>
      </div>

      {/* Contenido de la tarjeta */}
      <div className="flex-1 p-space-lg flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-space-xs mb-space-xs">
            <Link to={`/editor/${id}`}>
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold group-hover:text-primary transition-colors leading-snug">
                {titulo}
              </h2>
            </Link>

            {/* Menú de opciones de tres puntos */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setMenuAbierto(!menuAbierto)}
                className="p-1 rounded-full hover:bg-surface-container-high text-on-surface-variant transition-colors"
                title="Opciones"
              >
                <span className="material-symbols-outlined text-lg">more_vert</span>
              </button>
              {menuAbierto && (
                <div className="absolute right-0 mt-1 w-36 bg-surface-container-lowest rounded-xl shadow-lg border border-surface-variant py-1 z-30">
                  <Link
                    to={`/editor/${id}`}
                    onClick={() => setMenuAbierto(false)}
                    className="flex items-center gap-2 px-3 py-1.5 font-label-md text-label-md text-on-surface hover:bg-surface-container"
                  >
                    <span className="material-symbols-outlined text-sm">edit</span>
                    <span>Editar</span>
                  </Link>
                  <button
                    type="button"
                    onClick={handleEliminar}
                    className="w-full flex items-center gap-2 px-3 py-1.5 font-label-md text-label-md text-error hover:bg-error-container/20 text-left"
                  >
                    <span className="material-symbols-outlined text-sm">delete</span>
                    <span>Eliminar</span>
                  </button>
                </div>
              )}
            </div>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mb-space-md">{resumen}</p>
        </div>

        {/* Metadatos y enlace */}
        <div className="pt-space-sm border-t border-surface-variant/40">
          <div className="flex items-center justify-between text-label-sm font-label-sm text-outline">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-secondary">history_edu</span>
              {fechaEdicion}
            </span>
            <span className="font-semibold text-on-surface-variant">{palabras} palabras</span>
          </div>
          <div className="mt-space-md flex items-center justify-between">
            <span className="text-label-sm font-label-sm text-secondary uppercase font-semibold">
              {etiquetas?.map((t) => `#${t.replace('#', '')}`).join(' • ')}
            </span>
            <Link to={`/editor/${id}`} className="inline-flex items-center gap-1 text-primary hover:text-primary-container font-label-sm text-label-sm font-bold uppercase transition-colors">
              <span>Continuar</span>
              <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
