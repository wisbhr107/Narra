// src/pages/Editor.jsx
// Pantalla del Editor de Manuscritos con TipTap, autoguardado y paneles CSS

import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Editor as TiptapEditor } from '@tiptap/core';
import { HISTORIAS_INICIALES, ASSETS } from '../data/datosEjemplo';
import PanelLateral from '../components/PanelLateral';
import HojaEscritura from '../components/HojaEscritura';
import Pluma from '../components/Pluma';
import type { AparienciaEditor, BorradorEditor, PaginaManuscrito } from '../types';

const PAGINAS_INICIALES: Record<number, PaginaManuscrito> = {
  1: { capitulo: 'Capítulo I — La marea creciente', html: '<p>El viejo faro de Punta Niebla llevaba treinta inviernos en silencio, o al menos eso decían los pescadores de la cala. Sin embargo, anoche la linterna volvió a proyectar su haz ámbar sobre los acantilados de basalto. Clara ajustó su abrigo de lana, abrió su libreta de campo y comenzó a anotar cada destello con caligrafía apresurada.</p><p>El salitre impregnaba las páginas amarillentas, pero había algo más en la brisa: el aroma seco del cedro tallado y la cera derretida.</p>' },
  2: { capitulo: 'Capítulo II — La escalera de caracol', html: '<p>Los peldaños de hierro forjado quejaban bajo el peso de sus pasos. Ciento cuarenta escalones en espiral ascendían en la penumbra, iluminados solo por rendijas estrechas donde el viento silbaba notas graves.</p>' },
  3: { capitulo: 'Capítulo III — El libro de bitácora', html: '<p>Sobre el atril de roble de la cámara alta descansaba el compendio encuadernado en cuero crudo. Al abrirlo, la caligrafía sepia del último torrero relataba no tormentas, sino nombres de quienes habían llegado buscando refugio.</p>' },
  4: { capitulo: 'Capítulo IV — El primer destello', html: '<p>Clara encendió la mecha con pulso firme. El prisma de Fresnel giró lentamente sobre su baño de mercurio y una cascada de luz dorada barrió la inmensidad del océano.</p>' },
};

function leerBorrador(clave: string): BorradorEditor | null {
  try {
    const guardado = localStorage.getItem(clave);
    return guardado ? JSON.parse(guardado) : null;
  } catch {
    return null;
  }
}

export default function EditorRuta() {
  const { id } = useParams();
  return <Editor key={id || 'nueva'} id={id} />;
}

function Editor({ id }: { id?: string }) {
  const historia = HISTORIAS_INICIALES.find((h) => h.id === id);

  const claveBorrador = `narra_borrador_${id || 'nueva'}`;
  const [titulo, setTitulo] = useState(() => leerBorrador(claveBorrador)?.titulo || historia?.titulo || 'El susurro del faro olvidado');
  const [paginaActual, setPaginaActual] = useState(1);
  const [paginas, setPaginas] = useState<Record<number, PaginaManuscrito>>(() => {
    return leerBorrador(claveBorrador)?.paginas || PAGINAS_INICIALES;
  });

  const [palabras, setPalabras] = useState(0);
  const [panelAbierto, setPanelAbierto] = useState<string | null>(null);
  const [guardadoManual, setGuardadoManual] = useState(false);
  const [textoGuardado, setTextoGuardado] = useState('hace 2 min');
  const [apariencia, setApariencia] = useState<AparienciaEditor>({ colorPapel: '#ffffff', fuente: 'Merriweather' });
  const [editor, setEditor] = useState<TiptapEditor | null>(null);
  const [toolbarVersion, setTick] = useState(0);
  const actualizarEstadoEditor = useCallback(() => setTick((tick) => tick + 1), []);

  // Autoguardado simple en localStorage con temporizador (debounce)
  useEffect(() => {
    const temporizador = setTimeout(() => {
      try {
        localStorage.setItem(
          claveBorrador,
          JSON.stringify({ titulo, paginas })
        );
        setTextoGuardado('hace unos segundos');
      } catch {
        // En caso de cuota excedida
      }
    }, 2500);

    return () => clearTimeout(temporizador);
  }, [paginas, titulo, claveBorrador]);

  const togglePanel = (nombre: string) => {
    setPanelAbierto((prev) => (prev === nombre ? null : nombre));
  };

  const handleGuardarManual = () => {
    setGuardadoManual(true);
    try {
      localStorage.setItem(claveBorrador, JSON.stringify({ titulo, paginas }));
      setTextoGuardado('ahora mismo');
    } catch {
      setTextoGuardado('no se pudo guardar');
    }
    setTimeout(() => {
      setGuardadoManual(false);
      setTextoGuardado('ahora mismo');
    }, 2000);
  };

  const handleActualizarContenido = useCallback((html: string, totalPalabras: number) => {
    setPaginas((prev) => ({
      ...prev,
      [paginaActual]: { ...prev[paginaActual], html },
    }));
    setPalabras(totalPalabras);
  }, [paginaActual]);

  const handleCambiarCapitulo = useCallback((capitulo: string) => {
    setPaginas((prev) => ({
      ...prev,
      [paginaActual]: { ...prev[paginaActual], capitulo },
    }));
  }, [paginaActual]);

  return (
    <div className="w-full pt-20 bg-background min-h-screen">
      <div className="relative w-full py-space-lg px-margin flex justify-center items-start overflow-hidden bg-[radial-gradient(#f0dfd6_1px,transparent_1px)] [background-size:24px_24px] min-h-[calc(100vh-5rem)]">
        {/* Pestañas fijas a la izquierda */}
        <aside className="hidden lg:flex flex-col gap-space-xs fixed left-6 top-32 z-30">
          {[
            { id: 'texto', label: 'Texto', icono: 'edit_note' },
            { id: 'pegatinas', label: 'Pegatinas', icono: 'sentiment_satisfied' },
            { id: 'imagenes', label: 'Imágenes', icono: 'add_photo_alternate' },
            { id: 'apariencia', label: 'Apariencia', icono: 'palette' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => togglePanel(tab.id)}
              className={`flex items-center gap-2 pl-4 pr-6 py-2.5 rounded-r-2xl shadow-sm hover:translate-x-1.5 transition-all text-left ${
                panelAbierto === tab.id ? 'bg-primary text-on-primary font-bold' : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-lg">{tab.icono}</span>
              <span className="font-label-md text-label-md">{tab.label}</span>
            </button>
          ))}
        </aside>

        {/* Panel lateral desplegable */}
        <PanelLateral
          panelAbierto={panelAbierto}
          onCerrar={() => setPanelAbierto(null)}
          editor={editor}
          toolbarVersion={toolbarVersion}
          apariencia={apariencia}
          onCambiarApariencia={setApariencia}
        />

        {/* Espacio central de escritura: se desplaza a la derecha con CSS al abrir el panel */}
        <div
          className="w-full max-w-4xl flex flex-col items-center z-10 transition-transform duration-300"
          style={{ transform: panelAbierto ? 'translateX(110px)' : 'translateX(0)' }}
        >
          {/* Barra superior de métricas y guardado */}
          <div className="w-full max-w-[760px] mb-space-md flex items-center justify-between gap-space-sm px-2">
            <div className="flex items-center gap-space-sm">
              <span className="px-space-md py-1 rounded-full bg-surface-container-low shadow-sm font-label-sm text-label-sm font-semibold text-on-surface">
                Palabras: <span className="text-primary font-bold">{palabras}</span>
              </span>
              <span className="w-8 h-8 rounded-full bg-surface-container-low shadow-sm flex items-center justify-center font-label-sm text-label-sm font-bold">
                {paginaActual}/4
              </span>
              <span className="hidden sm:inline text-on-surface-variant font-label-sm text-label-sm">
                Borrador guardado {textoGuardado}
              </span>
            </div>

            <div className="flex items-center gap-space-md">
              <button
                type="button"
                onClick={handleGuardarManual}
                className="px-space-lg py-1.5 rounded-full bg-primary text-on-primary font-label-lg text-label-lg shadow-md hover:bg-primary-container transition-all"
              >
                {guardadoManual ? '✓ Guardado' : 'Guardar'}
              </button>
              <img alt="Autor" src={ASSETS.avatar} className="w-7 h-7 rounded-full object-cover ring-1 ring-surface-variant" />
            </div>
          </div>

          {/* Hoja editable TipTap */}
          <HojaEscritura
            contenidoInicial={paginas[paginaActual]?.html || ''}
            onActualizarContenido={handleActualizarContenido}
            onEditorCreado={setEditor}
            onEstadoEditor={actualizarEstadoEditor}
            tituloHistoria={titulo}
            onCambiarTitulo={setTitulo}
            capituloTexto={paginas[paginaActual]?.capitulo || `Capítulo ${paginaActual}`}
            onCambiarCapitulo={handleCambiarCapitulo}
            paginaActual={paginaActual}
            totalPaginas={4}
            apariencia={apariencia}
          />

          {/* Paginador inferior */}
          <div className="w-full max-w-[760px] mt-space-md flex items-center justify-between px-2 font-label-md text-label-md text-on-surface-variant">
            <button
              type="button"
              disabled={paginaActual === 1}
              onClick={() => setPaginaActual((p) => p - 1)}
              className="py-1 px-3 rounded-full hover:bg-surface-container disabled:opacity-40"
            >
              ← Página anterior
            </button>
            <span className="text-xs text-outline font-semibold">Página {paginaActual} de 4</span>
            <button
              type="button"
              disabled={paginaActual === 4}
              onClick={() => setPaginaActual((p) => p + 1)}
              className="py-1 px-3 rounded-full hover:bg-surface-container disabled:opacity-40"
            >
              Página siguiente →
            </button>
          </div>
        </div>

        {/* Pluma flotante */}
        <Pluma onInsertarIdea={(ideaHtml) => editor?.chain().focus().insertContent(ideaHtml).run()} />
      </div>
    </div>
  );
}
