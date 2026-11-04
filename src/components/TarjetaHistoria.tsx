// src/components/TarjetaHistoria.jsx
// Tarjeta individual para mostrar una historia en Inicio o Mis historias

import { Link } from 'react-router-dom';
import type { Historia } from '../types';

interface TarjetaHistoriaProps {
  historia: Historia;
}

export default function TarjetaHistoria({ historia }: TarjetaHistoriaProps) {
  const { id, titulo, resumen, imagen, categoria, etiquetas, tiempoLectura, fechaPublicacion, autor, marcador, marcadorColor } = historia;

  return (
    <article className="story-card group relative flex h-full flex-col bg-surface-container-lowest rounded-2xl p-space-md hover:shadow-[0_12px_32px_rgba(45,36,30,0.1)] transition-all duration-300 hover:-translate-y-1">
      {/* Contenedor de Imagen y marcadores */}
      <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-space-md bg-surface-variant">
        <img
          src={imagen}
          alt={titulo}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm text-primary font-label-sm text-label-sm uppercase tracking-wider shadow-sm">
          {categoria}
        </div>
        {marcador && (
          <div className={`absolute top-2.5 right-2.5 w-6 h-8 ${marcadorColor || 'bg-secondary'} rounded-b shadow-sm flex items-center justify-center text-on-secondary`}>
            <span className="text-[9px]">{marcador}</span>
          </div>
        )}
      </div>

      {/* Metadatos superiores */}
      <div className="flex items-center gap-space-xs text-outline font-label-sm text-label-sm mb-1.5">
        <span className="material-symbols-outlined text-xs text-secondary">schedule</span>
        <span>{tiempoLectura || '8 min de lectura'}</span>
        <span>•</span>
        <span className="text-on-surface-variant">{fechaPublicacion || 'Reciente'}</span>
      </div>

      {/* Titular con enlace a lectura */}
      <Link to={`/historia/${id}`}>
        <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors line-clamp-2 mb-1.5">
          {titulo}
        </h3>
      </Link>

      {/* Resumen */}
      <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mb-space-md">
        {resumen}
      </p>

      {/* Pie de la tarjeta: autor y etiqueta */}
      <div className="mt-auto pt-space-sm flex items-center justify-between">
        <div className="flex items-center gap-space-xs">
          <div className={`w-6 h-6 rounded-full ${autor?.colorBg || 'bg-primary-fixed'} flex items-center justify-center ${autor?.colorTexto || 'text-on-primary-fixed'} font-bold text-xs`}>
            {autor?.inicial || autor?.nombre?.charAt(0) || 'C'}
          </div>
          <span className="font-label-md text-label-md text-on-surface font-medium">
            {autor?.nombre || 'Elena S. Valdés'}
          </span>
        </div>

        {etiquetas && etiquetas.length > 0 && (
          <div className="flex items-center gap-1 font-label-sm text-label-sm text-secondary">
            <span className="bg-surface-container px-2 py-0.5 rounded-full">
              #{etiquetas[0].replace('#', '')}
            </span>
          </div>
        )}
      </div>
    </article>
  );
}
