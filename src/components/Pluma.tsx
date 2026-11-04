// src/components/Pluma.jsx
// Tintero flotante y Asistente de Escritura con animación CSS pura

import { useState } from 'react';

const IDEAS = [
  'Alguien dejó una lámpara tibia en el tercer descansillo, como si acabara de huir.',
  'El viento arrastraba un olor a madera de cedro quemada y sal marina.',
  'Entre las páginas del diario descansaba una flor de sauco con fecha de 1952.',
];

interface PlumaProps {
  onInsertarIdea?: (ideaHtml: string) => void;
}

export default function Pluma({ onInsertarIdea }: PlumaProps) {
  const [abierto, setAbierto] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
        {/* Botón flotante artesanal */}
        <button
          type="button"
          onClick={() => setAbierto(!abierto)}
          className="w-14 h-14 rounded-full bg-primary-container text-on-primary-container shadow-lg hover:bg-primary transition-all duration-300 flex items-center justify-center hover:scale-105 active:scale-95"
          title="Asistente de inspiración"
        >
          <span className="material-symbols-outlined text-2xl text-primary-fixed">ink_pen</span>
        </button>
      </div>

      {/* Ventana flotante del Asistente */}
      {abierto && (
        <div className="fixed bottom-24 right-6 z-50 w-80 bg-surface-container-lowest rounded-2xl shadow-2xl border border-surface-variant p-space-md text-on-surface transition-all duration-300 animate-in fade-in">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-surface-variant">
            <div className="flex items-center gap-1.5 text-secondary">
              <span className="material-symbols-outlined text-base">auto_awesome</span>
              <h4 className="font-headline-sm text-sm font-bold text-on-surface">Asistente de Escritura</h4>
            </div>
            <button type="button" onClick={() => setAbierto(false)} className="text-outline hover:text-on-surface">
              <span className="material-symbols-outlined text-base">close</span>
            </button>
          </div>
          <p className="font-body-sm text-xs text-on-surface-variant mb-3">
            Inspiración viva para enriquecer tu relato:
          </p>
          <div className="space-y-2 mb-3">
            {IDEAS.map((idea, i) => (
              <div
                key={i}
                onClick={() => onInsertarIdea?.(`<p class="italic text-primary">«${idea}»</p>`)}
                className="p-2 rounded-xl bg-surface hover:bg-surface-container-high border border-outline-variant/30 text-xs italic text-on-surface-variant cursor-pointer transition-colors"
              >
                «{idea}»
              </div>
            ))}
          </div>
          <span className="font-label-sm text-[10px] text-outline block text-center">
            Pulsa una idea para plasmarla en la hoja
          </span>
        </div>
      )}
    </>
  );
}
