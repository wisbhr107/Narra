// src/pages/Inicio.jsx
// Pantalla de Inicio de Narra (diseño fiel a Stitch)

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIAS_INICIALES, HISTORIAS_INICIALES } from '../data/datosEjemplo';
import TarjetaHistoria from '../components/TarjetaHistoria';

export default function Inicio() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');
  const [busqueda, setBusqueda] = useState('');
  const [historiasVisibles, setHistoriasVisibles] = useState(6);
  const [cargandoMas, setCargandoMas] = useState(false);

  // Filtrado reactivo por categoría y término de búsqueda
  const historiasFiltradas = HISTORIAS_INICIALES.filter((h) => {
    const coincideCat = categoriaSeleccionada === 'Todas' || h.categoria === categoriaSeleccionada;
    const termino = busqueda.toLowerCase().trim();
    const coincideTexto =
      !termino ||
      h.titulo.toLowerCase().includes(termino) ||
      h.resumen.toLowerCase().includes(termino) ||
      h.categoria.toLowerCase().includes(termino) ||
      h.etiquetas?.some((tag) => tag.toLowerCase().includes(termino));

    return coincideCat && coincideTexto;
  });

  const handleCargarMas = () => {
    setCargandoMas(true);
    setTimeout(() => {
      setHistoriasVisibles((prev) => prev + 3);
      setCargandoMas(false);
    }, 600);
  };

  return (
    <div className="w-full bg-background pt-20">
      {/* Sección Hero Editorial */}
      <section className="relative w-full overflow-hidden pb-space-xl pt-space-lg">
        <div className="max-w-6xl mx-auto px-margin">
          {/* Fila de Bienvenida */}
          <div className="flex items-center justify-between gap-space-sm mb-space-xl py-space-xs px-space-md bg-surface-container-low/75 rounded-full border border-surface-variant/60 shadow-sm">
            <div className="flex min-w-0 items-center gap-space-xs text-outline font-label-md text-label-md">
              <span className="material-symbols-outlined text-secondary text-base">auto_stories</span>
              <span className="truncate text-on-surface-variant">Escribe y lee sin prisa</span>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <Link to="/login" className="rounded-full px-space-sm py-1.5 font-label-md text-label-md font-semibold text-primary hover:bg-surface-container transition-colors">
                Iniciar sesión
              </Link>
              <Link to="/registro" className="inline-flex items-center gap-1 rounded-full bg-primary px-space-md py-1.5 font-label-md text-label-md font-semibold text-on-primary shadow-sm hover:bg-primary-container transition-colors">
                <span>Registrarse</span>
                <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* Bloque principal del Hero */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
            <div className="lg:col-span-8 flex flex-col z-10">
              <div className="flex items-center gap-space-xs mb-space-sm">
                <span className="text-secondary tracking-widest font-label-sm text-label-sm uppercase">Edición Manuscrita • Cuaderno Abierto</span>
                <span className="text-secondary font-serif text-sm">❦</span>
              </div>
              <h1 className="font-display text-4xl sm:text-display text-on-surface tracking-tight leading-tight mb-space-md">
                Escribe tu historia, <br />
                <span className="italic text-primary font-serif font-light">lee las de otros.</span>
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mb-space-lg leading-relaxed">
                Un rincón artesanal para narradores, diarios íntimos y relatos compartidos bajo la luz cálida de la tinta y la memoria.
              </p>

              {/* Buscador táctil */}
              <div className="relative w-full max-w-2xl bg-surface-container-lowest rounded-full p-1.5 shadow-[0_4px_20px_rgba(45,36,30,0.06)] flex items-center">
                <div className="pl-space-md pr-space-xs text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined">search</span>
                </div>
                <input
                  type="text"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  placeholder="Buscar historias por título, categoría o etiqueta..."
                  className="w-full bg-transparent font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none py-space-xs"
                />
                <button type="button" onClick={() => document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })} className="ml-auto px-space-lg py-2.5 bg-primary text-on-primary rounded-full font-label-md text-label-md hover:bg-primary-container transition-all flex items-center gap-1 shadow-sm shrink-0">
                  <span>Explorar</span>
                  <span className="material-symbols-outlined text-sm">history_edu</span>
                </button>
              </div>

              {/* Métricas editoriales */}
              <div className="flex items-center gap-space-lg mt-space-lg pt-space-xs">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-headline-sm text-headline-sm text-primary font-bold">14.8k</span>
                  <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Hojas escritas</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-outline-variant"></div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-headline-sm text-headline-sm text-secondary font-bold">3.2k</span>
                  <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Cronistas</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-outline-variant"></div>
                <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-xs text-secondary">verified</span>
                  <span>Lectura sin distracciones</span>
                </div>
              </div>
            </div>

            {/* Escudo artesanal de pluma y tintero */}
            <div className="lg:col-span-4 flex justify-center relative">
              <div className="hero-emblem relative w-72 h-72 sm:w-80 sm:h-80 rounded-full flex items-center justify-center p-space-md">
                <div className="absolute inset-5 rounded-full border border-secondary/15" aria-hidden="true" />
                <div className="absolute -top-1 right-5 sm:right-8 rounded-full bg-surface-container-lowest px-3 py-2 shadow-md border border-surface-variant/70 flex items-center gap-2 -rotate-3">
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Cuaderno abierto · 01</span>
                </div>
                <div className="hero-folio relative w-52 sm:w-56 min-h-64 rounded-lg bg-surface-container-lowest px-6 py-7 shadow-xl border border-surface-variant/60 -rotate-3">
                  <div className="flex items-center justify-between border-b border-surface-variant/70 pb-3">
                    <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Narra</span>
                    <span className="material-symbols-outlined text-primary text-lg" aria-hidden="true">ink_pen</span>
                  </div>
                  <p className="mt-5 font-headline-sm text-headline-sm text-on-surface leading-snug">Toda historia empieza con una primera línea.</p>
                  <div className="mt-5 space-y-2" aria-hidden="true">
                    <span className="block h-px w-full bg-outline-variant/50" />
                    <span className="block h-px w-5/6 bg-outline-variant/50" />
                    <span className="block h-px w-2/3 bg-outline-variant/50" />
                  </div>
                  <span className="absolute -bottom-3 -right-2 w-8 h-12 bg-secondary-container rounded-b-md shadow-md flex items-center justify-center text-on-secondary-container" aria-hidden="true">
                    <span className="material-symbols-outlined text-sm">bookmark</span>
                  </span>
                </div>
                <span className="absolute bottom-5 left-2 sm:left-3 rotate-[-8deg] rounded-full bg-primary text-on-primary px-4 py-2 shadow-lg font-label-sm text-label-sm tracking-wide">
                  Hecho para escribir
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catálogo de Memorias */}
      <section className="w-full py-space-xl bg-surface-container-low/40" id="catalogo">
        <div className="max-w-6xl mx-auto px-margin">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-lg">
            <div>
              <div className="flex items-center gap-space-xs text-secondary mb-1">
                <span className="font-serif text-base">❦</span>
                <span className="font-label-sm text-label-sm tracking-widest uppercase">Catálogo de Memorias</span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">Historias para descubrir</h2>
            </div>
            <div className="flex items-center gap-space-xs text-outline font-label-md text-label-md">
              <span>Páginas vivas escritas hoy</span>
              <span className="material-symbols-outlined text-sm">auto_stories</span>
            </div>
          </div>

          {/* Filtros de Categorías */}
          <div className="flex items-center gap-space-xs overflow-x-auto pb-space-sm mb-space-lg">
            {['Todas', ...CATEGORIAS_INICIALES.map((c) => c.nombre)].map((cat) => (
              <button
                key={cat}
                type="button"
                aria-pressed={categoriaSeleccionada === cat}
                onClick={() => setCategoriaSeleccionada(cat)}
                className={`px-space-md py-1.5 rounded-full font-label-md text-label-md transition-all ${
                  categoriaSeleccionada === cat
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Rejilla de Historias */}
          {historiasFiltradas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
              {historiasFiltradas.slice(0, historiasVisibles).map((h) => (
                <TarjetaHistoria key={h.id} historia={h} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-outline-variant bg-surface-container-lowest/70 px-space-lg py-space-xl text-center">
              <span className="material-symbols-outlined text-3xl text-secondary" aria-hidden="true">menu_book</span>
              <h3 className="mt-2 font-headline-sm text-headline-sm text-on-surface">No encontramos esas páginas</h3>
              <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant">Prueba otra búsqueda o elige una categoría distinta.</p>
              <button type="button" onClick={() => { setBusqueda(''); setCategoriaSeleccionada('Todas'); }} className="mt-4 rounded-full bg-primary px-4 py-2 font-label-md text-label-md text-on-primary hover:bg-primary-container transition-colors">
                Ver todas las historias
              </button>
            </div>
          )}

          {/* Botón Desplegar más crónicas */}
          {historiasFiltradas.length > historiasVisibles && (
            <div className="mt-space-xl flex flex-col items-center justify-center gap-space-xs">
              <button
                type="button"
                onClick={handleCargarMas}
                disabled={cargandoMas}
                className="px-space-xl py-space-sm rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-all shadow-sm flex items-center gap-2"
              >
                <span className={`material-symbols-outlined text-sm ${cargandoMas ? 'animate-spin' : ''}`}>
                  {cargandoMas ? 'sync' : 'unfold_more'}
                </span>
                <span>{cargandoMas ? 'Abriendo el archivo...' : 'Desplegar más crónicas'}</span>
              </button>
              <span className="font-label-sm text-label-sm text-outline">
                Mostrando {Math.min(historiasVisibles, historiasFiltradas.length)} de {historiasFiltradas.length} historias
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Invitación a escritores */}
      <section className="max-w-6xl mx-auto px-margin py-space-xl w-full">
        <div className="bg-surface-container rounded-xl p-space-xl md:p-12 flex flex-col md:flex-row items-center justify-between gap-space-lg shadow-sm">
          <div className="max-w-xl">
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-bold">Un cuaderno siempre listo</span>
            <h3 className="font-headline-lg text-headline-lg text-on-surface mt-space-xs mb-space-sm">
              ¿Tienes una historia que solo tú puedes contar?
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Escribe sin algoritmos ruidosos. Guarda tus memorias en páginas protegidas y compártelas cuando quieras.
            </p>
          </div>
          <Link
            to="/editor/nueva"
            className="px-space-xl py-space-md rounded-full bg-primary text-on-primary font-label-lg text-label-lg hover:bg-primary-container shadow-md transition-all flex items-center gap-2 shrink-0"
          >
            <span className="material-symbols-outlined text-base">ink_pen</span>
            <span>Comenzar a escribir</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
