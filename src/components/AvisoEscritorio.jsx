// src/components/AvisoEscritorio.jsx
// Muestra un aviso amable en pantallas menores a 1024px

import React from 'react';
import { ASSETS } from '../data/datosEjemplo';

export default function AvisoEscritorio() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-space-lg bg-background text-on-surface text-center lg:hidden">
      <div className="max-w-md p-space-xl bg-surface-container-lowest rounded-2xl shadow-xl border border-surface-variant flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center mb-space-md shadow-inner">
          <img src={ASSETS.logo} alt="Narra Logo" className="h-10 w-auto object-contain" />
        </div>

        <div className="flex items-center gap-space-xs text-secondary mb-space-xs">
          <span className="font-serif text-sm">❦</span>
          <span className="font-label-sm text-label-sm uppercase tracking-widest font-bold">
            Cuaderno de Escritorio
          </span>
          <span className="font-serif text-sm">❦</span>
        </div>

        <h2 className="font-headline-md text-headline-md text-on-surface font-bold mb-space-sm leading-tight">
          Un refugio para pantallas amplias
        </h2>

        <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-lg leading-relaxed">
          Narra está concebido como una mesa de escritorio artesanal con espacio para páginas abiertas.
        </p>

        <div className="p-space-sm px-space-md rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary text-base">desktop_windows</span>
          <span>Por favor, amplía tu ventana a un mínimo de 1024 px</span>
        </div>
      </div>
    </div>
  );
}
