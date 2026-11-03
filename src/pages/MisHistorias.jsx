// src/pages/MisHistorias.jsx
// Pantalla de Mis Historias de Narra (diseño fiel a Stitch)

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HISTORIAS_INICIALES } from '../data/datosEjemplo';
import BarraLateralMisHistorias from '../components/BarraLateralMisHistorias';
import TarjetaMisHistorias from '../components/TarjetaMisHistorias';

const TEMAS = ['#Todos', '#Faro', '#Viajes', '#Borradores', '#Naturaleza'];

export default function MisHistorias() {
  const [historias, setHistorias] = useState(HISTORIAS_INICIALES);
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState('Todas');
  const [etiqueta, setEtiqueta] = useState('Todas');
  const [orden, setOrden] = useState('Recientes');
  const [temaSeleccionado, setTemaSeleccionado] = useState('#Todos');
  const [esLista, setEsLista] = useState(false);

  // Filtrado reactivo de historias
  const historiasFiltradas = historias
    .filter((h) => {
      const matchBusqueda = !busqueda || h.titulo.toLowerCase().includes(busqueda.toLowerCase()) || h.resumen.toLowerCase().includes(busqueda.toLowerCase());
      const matchCat = categoria === 'Todas' || h.categoria === categoria;
      const matchTag = etiqueta === 'Todas' || h.etiquetas?.includes(etiqueta);
      const matchTema = temaSeleccionado === '#Todos' || h.temaTag === temaSeleccionado || h.etiquetas?.some((t) => `#${t}` === temaSeleccionado);
      return matchBusqueda && matchCat && matchTag && matchTema;
    })
    .sort((a, b) => {
      if (orden === 'Palabras') return b.palabras - a.palabras;
      if (orden === 'Título') return a.titulo.localeCompare(b.titulo);
      return 0; // Por defecto 'Recientes' mantiene el orden cronológico
    });

  const eliminarHistoria = (id) => {
    setHistorias((prev) => prev.filter((h) => h.id !== id));
  };

  const totalPalabras = historias.reduce((acc, h) => acc + h.palabras, 0);

  return (
    <div className="flex w-full min-h-screen bg-background">
      <BarraLateralMisHistorias />

      {/* Contenedor principal con margen para la barra fija */}
      <div className="pl-72 w-full">
        <main className="pt-24 pb-space-xl px-space-lg lg:px-margin max-w-7xl mx-auto">
          {/* Cabecera y acciones */}
          <section className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
            <div>
              <div className="flex items-center gap-space-xs text-secondary mb-1">
                <span className="material-symbols-outlined text-base">mobile_arrow_right</span>
                <span className="font-label-sm text-label-sm uppercase tracking-wider">Espacio Personal del Cronista</span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">Mis historias</h1>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                {historias.length} relatos catalogados • <span className="text-outline">{totalPalabras} palabras totales</span>
              </p>
            </div>
            <Link
              to="/editor/nueva"
              className="inline-flex items-center gap-space-xs px-space-lg py-space-sm rounded-full bg-primary text-on-primary font-label-lg text-label-lg hover:bg-primary-container shadow-md transition-all"
            >
              <span className="material-symbols-outlined text-lg">edit_note</span>
              <span className="font-semibold">+ Nueva historia</span>
            </Link>
          </section>

          {/* Barra de Filtros y Búsqueda */}
          <div className="bg-surface-container-low rounded-2xl p-space-md mb-space-lg shadow-sm flex flex-col lg:flex-row gap-space-md items-center justify-between">
            <div className="relative flex-1 w-full min-w-[240px]">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-lg">search</span>
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar por título, verso o lugar..."
                className="w-full pl-10 pr-4 py-2 bg-surface rounded-xl text-on-surface font-body-sm text-body-sm focus:outline-none focus:bg-surface-container-lowest"
              />
            </div>
            <div className="flex items-center gap-space-xs flex-wrap w-full lg:w-auto">
              {/* Desplegable Categoría */}
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="px-3 py-2 rounded-xl bg-surface text-on-surface font-label-md text-label-md focus:outline-none"
              >
                <option value="Todas">Categoría: Todas</option>
                <option value="Fantasía">Fantasía</option>
                <option value="Memorias">Memorias</option>
                <option value="Misterio">Misterio</option>
                <option value="Poesía">Poesía</option>
              </select>

              {/* Desplegable Etiqueta */}
              <select
                value={etiqueta}
                onChange={(e) => setEtiqueta(e.target.value)}
                className="px-3 py-2 rounded-xl bg-surface text-on-surface font-label-md text-label-md focus:outline-none"
              >
                <option value="Todas">Etiqueta: Todas</option>
                <option value="Faro">Faro</option>
                <option value="Naturaleza">Naturaleza</option>
                <option value="Viajes">Viajes</option>
                <option value="Botánica">Botánica</option>
              </select>

              {/* Desplegable Orden */}
              <select
                value={orden}
                onChange={(e) => setOrden(e.target.value)}
                className="px-3 py-2 rounded-xl bg-surface text-on-surface font-label-md text-label-md focus:outline-none"
              >
                <option value="Recientes">Orden: Recientes</option>
                <option value="Palabras">Orden: Palabras</option>
                <option value="Título">Orden: Título</option>
              </select>

              {/* Conmutador Cuadrícula / Lista */}
              <div className="flex items-center bg-surface p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setEsLista(false)}
                  className={`p-1.5 rounded-lg ${!esLista ? 'bg-surface-container text-primary' : 'text-outline hover:text-on-surface'}`}
                  title="Cuadrícula"
                >
                  <span className="material-symbols-outlined text-lg">grid_view</span>
                </button>
                <button
                  type="button"
                  onClick={() => setEsLista(true)}
                  className={`p-1.5 rounded-lg ${esLista ? 'bg-surface-container text-primary' : 'text-outline hover:text-on-surface'}`}
                  title="Lista"
                >
                  <span className="material-symbols-outlined text-lg">view_agenda</span>
                </button>
              </div>
            </div>
          </div>

          {/* Chips de temas */}
          <div className="flex items-center gap-space-xs flex-wrap mb-space-lg font-label-sm text-label-sm">
            <span className="text-outline uppercase tracking-wider">Filtrar por tema:</span>
            {TEMAS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTemaSeleccionado(t)}
                className={`px-space-sm py-0.5 rounded-full transition-colors ${
                  temaSeleccionado === t ? 'bg-secondary-fixed text-on-secondary-fixed font-bold' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Rejilla o Lista de Historias */}
          <div className={esLista ? 'flex flex-col gap-space-lg' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg'}>
            {historiasFiltradas.map((h) => (
              <TarjetaMisHistorias key={h.id} historia={h} esLista={esLista} onEliminar={eliminarHistoria} />
            ))}

            {/* Tarjeta interactiva punteada "Crear nueva historia" */}
            <Link
              to="/editor/nueva"
              className="group relative flex flex-col items-center justify-center p-space-xl text-center min-h-[340px] rounded-2xl border-2 border-dashed border-outline-variant/60 bg-surface-container/40 hover:bg-surface-container transition-all"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 group-hover:bg-primary group-hover:text-on-primary text-primary flex items-center justify-center transition-all mb-space-md">
                <span className="material-symbols-outlined text-3xl">add</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-1 group-hover:text-primary transition-colors">
                Crear nueva historia
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant max-w-[220px]">
                Empieza una página en blanco para dar vida a tu crónica.
              </p>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
