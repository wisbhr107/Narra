// src/pages/Lectura.jsx
// Pantalla de lectura inmersiva de Narra (diseño fiel a Stitch)

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { HISTORIAS_INICIALES } from '../data/datosEjemplo';

export default function Lectura() {
  const { id } = useParams();
  const historia = HISTORIAS_INICIALES.find((h) => h.id === id) || HISTORIAS_INICIALES[0];

  const [capituloActual, setCapituloActual] = useState(1);
  const [progreso, setProgreso] = useState(25);

  // Barra de progreso vinculada al desplazamiento (scroll)
  useEffect(() => {
    const calcularScroll = () => {
      const top = window.scrollY || document.documentElement.scrollTop;
      const altura = document.documentElement.scrollHeight - window.innerHeight;
      if (altura > 0) {
        const porcentaje = Math.min(Math.max((top / altura) * 100, 5), 100);
        setProgreso(porcentaje);
      }
    };

    window.addEventListener('scroll', calcularScroll, { passive: true });
    return () => window.removeEventListener('scroll', calcularScroll);
  }, []);

  const capitulos = historia.capitulos || [
    {
      numero: 1,
      titulo: 'Capítulo I — La marea creciente',
      subtitulo: 'Folio 14 — Crónica Austral · Octubre 1924',
      cita: 'No hay faro que alumbre a quien no busca ser encontrado.',
      texto: [
        'El viento del norte jamás avisaba su llegada con estruendos; se filtraba, en cambio, como un murmullo helado entre las ranuras de cal que sostenían la cúpula del faro de Punta Negra. Sebastián apoyó la palma de la mano sobre el cuaderno de registros, notando la aspereza del papel secado por el salitre acumulado durante tres inviernos seguidos.',
        'Subir los ciento cuarenta y dos escalones de hierro forjado era una liturgia que realizaba con los ojos entornados. Cada peldaño emitía una queja metálica distinta, conocida y reverenciada como las notas gastadas de un viejo armonio de aldea.',
      ],
    },
  ];

  const capActivo = capitulos.find((c) => c.numero === capituloActual) || capitulos[0];

  return (
    <div className="w-full bg-background pt-20">
      {/* Barra de progreso de lectura fijada arriba */}
      <div className="sticky top-20 z-40 w-full h-[3px] bg-surface-container-high/60">
        <div className="h-full bg-primary-container transition-all duration-150" style={{ width: `${progreso}%` }} />
      </div>

      <div className="max-w-7xl mx-auto px-margin py-space-xl flex flex-col lg:flex-row gap-space-xl items-start justify-center">
        {/* Barra lateral de la obra */}
        <aside className="w-full lg:w-72 shrink-0 lg:sticky lg:top-28 space-y-space-lg">
          <div className="bg-surface-container-low rounded-lg p-space-md shadow-sm">
            <div className="w-full aspect-[3/4] rounded-md overflow-hidden relative shadow-md mb-space-md">
              <img src={historia.imagen} alt={historia.titulo} className="w-full h-full object-cover" />
            </div>
            <span className="px-space-xs py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold uppercase">
              {historia.categoria}
            </span>
            <h1 className="font-headline-sm text-headline-sm text-on-surface font-bold mt-2 leading-tight">
              {historia.titulo}
            </h1>
            <p className="font-label-sm text-label-sm text-outline mt-1">{historia.autor?.nombre || 'Elena S. Valdés'}</p>
          </div>

          {/* Índice de Capítulos interactivo */}
          <nav className="bg-surface-container-lowest rounded-lg p-space-md shadow-sm">
            <span className="font-label-sm text-label-sm text-outline uppercase font-bold block mb-space-sm">
              Índice del Relato
            </span>
            <ol className="space-y-space-xs">
              {capitulos.map((c) => (
                <li key={c.numero}>
                  <button
                    type="button"
                    onClick={() => {
                      setCapituloActual(c.numero);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-full text-left p-space-xs rounded-md transition-all flex items-center justify-between ${
                      capituloActual === c.numero ? 'bg-primary-container text-on-primary font-bold shadow-xs' : 'hover:bg-surface-container text-on-surface-variant'
                    }`}
                  >
                    <span className="font-label-md text-label-md truncate">0{c.numero}. {c.titulo}</span>
                    {capituloActual === c.numero && <span className="material-symbols-outlined text-sm">arrow_right</span>}
                  </button>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        {/* Manuscrito central */}
        <main className="w-full max-w-[720px] flex-1">
          <article className="bg-surface-container-lowest rounded-lg p-8 sm:p-12 shadow-xl border border-surface-variant/30 [background-image:repeating-linear-gradient(to_bottom,transparent,transparent_31px,rgba(74,62,53,0.045)_31px,rgba(74,62,53,0.045)_32px)]">
            <header className="mb-space-xl text-center space-y-1">
              <span className="font-label-sm text-label-sm text-outline uppercase tracking-widest">{capActivo.subtitulo}</span>
              <h2 className="font-headline-md text-headline-md text-primary italic font-normal">{capActivo.titulo}</h2>
              <div className="flex items-center justify-center gap-2 text-outline text-xs pt-1">
                <span>❦</span><span className="h-[1px] w-12 bg-outline-variant"></span><span>❦</span>
              </div>
            </header>

            {/* Prosa literaria */}
            <section className="space-y-space-lg font-body-md text-body-md text-on-surface leading-[32px]">
              {capActivo.texto.map((parrafo, i) => (
                <p key={i} className={i === 0 ? 'text-justify first-letter:float-left first-letter:text-[60px] first-letter:leading-[0.8] first-letter:font-bold first-letter:mr-3 first-letter:text-primary first-letter:font-serif' : 'text-justify indent-8'}>
                  {parrafo}
                </p>
              ))}

              {capActivo.cita && (
                <div className="my-space-lg p-space-md bg-surface-container-low/80 rounded-lg shadow-inner text-center italic text-primary">
                  «{capActivo.cita}»
                </div>
              )}
            </section>

            {/* Navegación entre capítulos al pie */}
            <div className="mt-space-xl pt-space-md border-t border-outline-variant/30 flex items-center justify-between">
              <button
                type="button"
                disabled={capituloActual === 1}
                onClick={() => setCapituloActual((p) => p - 1)}
                className="px-space-md py-1.5 rounded-full bg-surface-container font-label-md text-label-md disabled:opacity-40"
              >
                ← Capítulo anterior
              </button>
              <span className="font-label-sm text-label-sm text-outline">{capituloActual} de {capitulos.length} capítulos</span>
              <button
                type="button"
                disabled={capituloActual === capitulos.length}
                onClick={() => setCapituloActual((p) => p + 1)}
                className="px-space-md py-1.5 rounded-full bg-primary text-on-primary font-label-md text-label-md disabled:opacity-40"
              >
                Capítulo siguiente →
              </button>
            </div>
          </article>
        </main>
      </div>
    </div>
  );
}
