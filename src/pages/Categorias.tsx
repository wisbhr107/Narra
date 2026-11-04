// src/pages/Categorias.jsx
// Gestión de Categorías para el Administrador (diseño fiel a Stitch)

import { useState, type FormEvent } from 'react';
import { CATEGORIAS_INICIALES, HISTORIAS_INICIALES } from '../data/datosEjemplo';
import type { Categoria } from '../types';

interface CategoriaBloqueada extends Categoria {
  numHistorias: number;
}

export default function Categorias() {
  const [categorias, setCategorias] = useState<Categoria[]>(CATEGORIAS_INICIALES);
  const [mostrarCrear, setMostrarCrear] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [categoriaBloqueada, setCategoriaBloqueada] = useState<CategoriaBloqueada | null>(null);

  // Calcular historias asociadas por categoría
  const contarHistorias = (catNombre: string) => {
    return HISTORIAS_INICIALES.filter((h) => h.categoria === catNombre).length;
  };

  const handleCrear = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!nuevoNombre.trim()) return;
    const nueva = {
      id: `cat-${Date.now()}`,
      nombre: nuevoNombre.trim(),
      descripcion: 'Categoría personalizada',
      icono: '✦',
      fecha: 'Hoy',
    };
    setCategorias([...categorias, nueva]);
    setNuevoNombre('');
    setMostrarCrear(false);
  };

  const handleEliminar = (cat: Categoria) => {
    const num = contarHistorias(cat.nombre);
    if (num > 0) {
      setCategoriaBloqueada({ ...cat, numHistorias: num });
    } else {
      setCategorias(categorias.filter((c) => c.id !== cat.id));
    }
  };

  const handleRenombrar = (cat: Categoria) => {
    const nombre = window.prompt('Nuevo nombre para la categoría:', cat.nombre);
    if (nombre && nombre.trim()) {
      setCategorias(categorias.map((c) => (c.id === cat.id ? { ...c, nombre: nombre.trim() } : c)));
    }
  };

  const filtradas = categorias.filter((c) =>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="w-full bg-background pt-24 pb-space-xl">
      <div className="max-w-7xl mx-auto px-margin">
        {/* Cabecera de administración */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
          <div>
            <div className="inline-flex items-center gap-space-xs text-secondary mb-1">
              <span className="material-symbols-outlined text-sm">shield_person</span>
              <span className="font-label-sm text-label-sm uppercase font-bold tracking-wider">Gabinete de Archivo</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-primary font-bold">Categorías</h1>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">
              Organiza los géneros y cuadernos canónicos que los autores pueden elegir.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setMostrarCrear(!mostrarCrear)}
            className="inline-flex items-center gap-space-xs px-space-lg py-space-sm rounded-full bg-primary text-on-primary font-label-lg text-label-lg shadow-md hover:bg-primary-container transition-all"
          >
            <span className="material-symbols-outlined text-base">add</span>
            <span>Nueva categoría</span>
          </button>
        </div>

        {/* Panel desplegable para inscribir nueva categoría */}
        {mostrarCrear && (
          <form onSubmit={handleCrear} className="mb-space-lg p-space-lg rounded-xl bg-surface-container shadow-sm flex flex-col sm:flex-row gap-space-md items-center">
            <input
              type="text"
              required
              placeholder="p. ej. Crónica de Indias, Realismo Onírico..."
              value={nuevoNombre}
              onChange={(e) => setNuevoNombre(e.target.value)}
              className="flex-1 w-full px-space-md py-2.5 rounded-full bg-surface-container-lowest text-on-surface font-body-sm text-body-sm focus:outline-none"
            />
            <div className="flex items-center gap-space-sm">
              <button type="button" onClick={() => setMostrarCrear(false)} className="px-space-md py-2 rounded-full bg-surface-container-high font-label-md text-label-md">
                Cancelar
              </button>
              <button type="submit" className="px-space-md py-2 rounded-full bg-primary text-on-primary font-label-md text-label-md shadow-sm">
                Guardar en libro
              </button>
            </div>
          </form>
        )}

        {/* Tabla de Categorías */}
        <div className="bg-surface-container-low rounded-xl shadow-sm overflow-hidden">
          <div className="p-space-md bg-surface-container flex items-center justify-between">
            <span className="font-headline-sm text-body-lg font-bold text-on-surface">Índice general de cuadernos</span>
            <input
              type="search"
              placeholder="Buscar..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="px-space-md py-1 rounded-full bg-surface-container-lowest font-body-sm text-body-sm focus:outline-none"
            />
          </div>

          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-high/60 text-on-surface-variant font-label-md text-label-md uppercase">
                <th className="py-3 px-space-lg">Nombre del Género</th>
                <th className="py-3 px-space-lg">Historias asociadas</th>
                <th className="py-3 px-space-lg">Última modificación</th>
                <th className="py-3 px-space-lg text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-high">
              {filtradas.map((cat) => {
                const total = contarHistorias(cat.nombre);
                return (
                  <tr key={cat.id} className="hover:bg-surface-container/60 transition-colors">
                    <td className="py-4 px-space-lg flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-secondary-container/60 text-on-secondary-container flex items-center justify-center font-bold">
                        {cat.icono}
                      </span>
                      <div>
                        <span className="font-headline-sm text-base text-primary font-bold block">{cat.nombre}</span>
                        <span className="font-body-sm text-xs text-outline">{cat.descripcion}</span>
                      </div>
                    </td>
                    <td className="py-4 px-space-lg font-label-md text-label-md">
                      <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-semibold">
                        {total} historias
                      </span>
                    </td>
                    <td className="py-4 px-space-lg font-body-sm text-xs text-on-surface-variant">{cat.fecha}</td>
                    <td className="py-4 px-space-lg text-right space-x-2">
                      <button type="button" onClick={() => handleRenombrar(cat)} className="p-1 text-on-surface-variant hover:text-primary" title="Renombrar">
                        <span className="material-symbols-outlined text-sm">edit</span>
                      </button>
                      <button type="button" onClick={() => handleEliminar(cat)} className="p-1 text-on-surface-variant hover:text-error" title="Eliminar">
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Diálogo de bloqueo al intentar eliminar categoría con historias */}
      {categoriaBloqueada && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-space-md bg-inverse-surface/40 backdrop-blur-sm">
          <div className="w-full max-w-md bg-surface-container-lowest p-space-xl rounded-2xl shadow-2xl border border-surface-variant">
            <div className="flex items-center gap-3 mb-space-md text-tertiary">
              <span className="material-symbols-outlined text-3xl">warning</span>
              <div>
                <span className="font-label-sm text-xs uppercase font-bold text-tertiary block">Acción Restringida</span>
                <h3 className="font-headline-md text-lg text-primary font-bold">Eliminar categoría</h3>
              </div>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface mb-2">
              Esta categoría tiene <span className="font-bold text-tertiary">{categoriaBloqueada.numHistorias} historias asociadas</span>. No se puede eliminar hasta reasignarlas.
            </p>
            <div className="flex justify-end gap-space-sm mt-space-lg">
              <button type="button" onClick={() => setCategoriaBloqueada(null)} className="px-space-lg py-1.5 rounded-full bg-surface-container-high text-on-surface font-label-md text-label-md">
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
