// src/components/Pie.jsx
// Pie de página editorial con el sello Narra

import { ASSETS } from '../data/datosEjemplo';

export default function Pie() {
  return (
    <footer className="w-full bg-surface-container-low mt-space-xl py-space-xl border-t border-surface-variant/40">
      <div className="max-w-7xl mx-auto px-margin flex flex-col md:flex-row items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-sm">
          <img alt="Narra Logo" className="h-6 w-auto object-contain opacity-70" src={ASSETS.logo} />
          <span className="font-headline-sm text-body-sm text-on-surface-variant font-bold">Narra</span>
          <span className="text-outline font-label-sm text-label-sm ml-space-xs">
            — Crónicas, memorias y cuadernos personales
          </span>
        </div>
        <div className="flex items-center gap-space-lg font-label-md text-label-md text-on-surface-variant">
          <span className="font-label-sm text-label-sm text-outline">© Narra. Tinta Firme.</span>
        </div>
      </div>
    </footer>
  );
}
