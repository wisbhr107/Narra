// src/components/HojaEscritura.jsx
// Hoja de escritura manuscrita con TipTap, papel pautado y estilo artesanal

import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';
import { FontFamily, FontSize } from '@tiptap/extension-text-style';

export default function HojaEscritura({
  contenidoInicial,
  onActualizarContenido,
  onEditorCreado,
  tituloHistoria,
  onCambiarTitulo,
  capituloTexto,
  onCambiarCapitulo,
  onEstadoEditor,
  paginaActual,
  totalPaginas,
  apariencia,
}) {
  // Inicializamos TipTap con las extensiones requeridas
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2] },
      }),
      Underline,
      Highlight,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        placeholder: 'Había una vez...',
      }),
      CharacterCount,
      FontFamily,
      FontSize,
    ],
    content: contenidoInicial,
    editorProps: {
      attributes: {
        class: 'ProseMirror font-body-lg text-body-lg text-on-surface leading-loose selection:bg-secondary-container selection:text-on-secondary-container',
      },
    },
    // Cada vez que el usuario escribe, emitimos el HTML y el total de palabras
    onUpdate: ({ editor: ed }) => {
      const html = ed.getHTML();
      const palabras = ed.storage.characterCount.words();
      onActualizarContenido(html, palabras);
    },
    onSelectionUpdate: () => onEstadoEditor(),
    onTransaction: () => onEstadoEditor(),
  });

  // Avisamos al componente padre de la instancia del editor para la barra de formato
  useEffect(() => {
    if (editor) {
      onEditorCreado(editor);
      const palabras = editor.storage.characterCount.words();
      onActualizarContenido(editor.getHTML(), palabras);
    }
  }, [editor, onEditorCreado, onActualizarContenido]);

  // Sincronizamos el contenido cuando cambiamos de página (1/4, 2/4...)
  useEffect(() => {
    if (editor && contenidoInicial !== undefined) {
      if (editor.getHTML() !== contenidoInicial) {
        editor.commands.setContent(contenidoInicial, false);
      }
    }
  }, [contenidoInicial, editor]);

  return (
    <article
      className="w-full max-w-[760px] rounded-2xl shadow-xl p-8 sm:p-14 relative border border-surface-variant/40 transition-colors"
      style={{
        backgroundColor: apariencia.colorPapel,
        fontFamily: apariencia.fuente,
      }}
    >
      {/* Fondo con pauta de cuaderno artesanal (líneas tenues cada 32px) */}
      <div className="w-full h-full [background-image:repeating-linear-gradient(transparent,transparent_31px,rgba(74,62,53,0.05)_31px,rgba(74,62,53,0.05)_32px)] bg-local">
        {/* Título de la historia */}
        <div className="mb-space-sm text-center">
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-bold block mb-1">
            Título de la historia
          </span>
          <input
            type="text"
            value={tituloHistoria}
            onChange={(e) => onCambiarTitulo(e.target.value)}
            className="w-full bg-transparent font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight text-center focus:outline-none focus:border-b focus:border-secondary border-b border-transparent transition-colors"
          />
          <div className="flex items-center justify-center gap-2 my-2 text-outline opacity-60">
            <span>——</span><span>✦</span><span>——</span>
          </div>
        </div>

        {/* Encabezado del capítulo */}
        <div className="mb-space-lg">
          <label className="block font-label-sm text-label-sm text-secondary uppercase tracking-widest font-bold mb-1" htmlFor={`chapter-title-${paginaActual}`}>
            Nombre del capítulo
          </label>
          <input
            id={`chapter-title-${paginaActual}`}
            type="text"
            value={capituloTexto}
            onChange={(event) => onCambiarCapitulo(event.target.value)}
            aria-label={`Nombre del capítulo de la página ${paginaActual}`}
            className="w-full bg-transparent font-headline-md text-headline-md text-on-surface italic border-b border-transparent focus:border-secondary focus:outline-none focus:ring-2 focus:ring-primary/30 rounded-sm"
          />
          <div className="w-12 h-0.5 bg-secondary-container mt-2" />
        </div>

        {/* Lienzo oficial de TipTap */}
        <div className="min-h-[320px]">
          <EditorContent editor={editor} />
        </div>

        {/* Pie del manuscrito */}
        <div className="mt-space-xl pt-space-lg flex items-center justify-between text-outline font-label-sm text-label-sm border-t border-outline-variant/20">
          <span className="text-secondary">❧ Registrado con Tinta Firme</span>
          <span className="tracking-widest uppercase">Página {paginaActual} de {totalPaginas}</span>
        </div>
      </div>
    </article>
  );
}
