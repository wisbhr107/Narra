// src/components/PanelLateral.jsx
// Panel lateral deslizable con herramientas de formato TipTap, pegatinas y apariencia

import type { Dispatch, SetStateAction } from 'react';
import type { Editor as TiptapEditor } from '@tiptap/core';
import type { AparienciaEditor } from '../types';

interface PanelLateralProps {
  panelAbierto: string | null;
  onCerrar: () => void;
  editor: TiptapEditor | null;
  toolbarVersion: number;
  apariencia: AparienciaEditor;
  onCambiarApariencia: Dispatch<SetStateAction<AparienciaEditor>>;
}

export default function PanelLateral({
  panelAbierto,
  onCerrar,
  editor,
  toolbarVersion,
  apariencia,
  onCambiarApariencia,
}: PanelLateralProps) {
  if (!panelAbierto) return null;

  // Clase común para marcar botones activos con el color teal del diseño
  const botonClase = (activo: boolean, deshabilitado = false) =>
    `p-2 rounded-xl font-label-md text-label-md flex items-center justify-center gap-1.5 transition-colors ${
      deshabilitado
        ? 'opacity-30 cursor-not-allowed bg-surface text-outline'
        : activo
        ? 'bg-primary text-on-primary font-bold shadow-xs'
        : 'bg-surface hover:bg-surface-container text-on-surface'
    }`;

  return (
    <aside className="fixed left-44 top-28 z-20 w-80 max-h-[calc(100vh-8.5rem)] bg-surface-container-low/95 backdrop-blur-md rounded-2xl p-space-md shadow-2xl border border-surface-variant flex flex-col overflow-hidden transition-all duration-300">
      {/* Cabecera del panel */}
      <div className="flex items-center justify-between pb-space-sm mb-space-sm border-b border-surface-variant">
        <h3 className="font-headline-sm text-body-sm font-bold text-on-surface capitalize">
          Panel de {panelAbierto}
        </h3>
        <button type="button" onClick={onCerrar} className="p-1 rounded-full text-outline hover:text-on-surface" title="Cerrar">
          <span className="material-symbols-outlined text-base">close</span>
        </button>
      </div>

      <div
        className="editor-panel-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain space-y-space-md text-body-sm pr-1"
        data-toolbar-version={toolbarVersion}
        tabIndex={0}
        aria-label="Herramientas del panel del editor; desplázate para ver todas las opciones"
      >
        {/* PANEL: TEXTO (Barra de formato TipTap) */}
        {panelAbierto === 'texto' && editor && (
          <div className="space-y-space-md">
            <section aria-labelledby="texto-fuente-heading" className="space-y-2 border-b border-outline-variant/50 pb-space-md">
              <h4 id="texto-fuente-heading" className="font-label-sm text-label-sm text-secondary uppercase tracking-wide font-bold">Tipografía</h4>
              <label className="block text-xs font-semibold text-on-surface" htmlFor="editor-font-family">Tipo de letra</label>
              <select id="editor-font-family" className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary" value={editor.getAttributes('textStyle').fontFamily || ''} onChange={(event) => {
                const chain = editor.chain().focus();
                if (event.target.value) chain.setFontFamily(event.target.value).run();
                else chain.unsetFontFamily().run();
              }}>
                <option value="">Predeterminada</option>
                <option value="Merriweather">Merriweather</option>
                <option value="Georgia">Georgia</option>
                <option value="Arial">Arial</option>
                <option value="Plus Jakarta Sans">Plus Jakarta Sans</option>
              </select>
              <label className="block text-xs font-semibold text-on-surface" htmlFor="editor-font-size">Tamaño de letra</label>
              <select id="editor-font-size" className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary" value={editor.getAttributes('textStyle').fontSize || '18px'} onChange={(event) => editor.chain().focus().setFontSize(event.target.value).run()}>
                <option value="14px">Pequeña · 14 px</option>
                <option value="16px">Normal · 16 px</option>
                <option value="18px">Mediana · 18 px</option>
                <option value="22px">Grande · 22 px</option>
                <option value="28px">Muy grande · 28 px</option>
              </select>
            </section>

            <section aria-labelledby="texto-estilo-heading" className="space-y-2 border-b border-outline-variant/50 pb-space-md">
              <h4 id="texto-estilo-heading" className="font-label-sm text-label-sm text-secondary uppercase tracking-wide font-bold">Estilo de texto</h4>
              <div className="grid grid-cols-3 gap-1.5">
                {([
                  ['bold', 'Negrita', 'format_bold', () => editor.chain().focus().toggleBold().run()],
                  ['italic', 'Cursiva', 'format_italic', () => editor.chain().focus().toggleItalic().run()],
                  ['underline', 'Subrayado', 'format_underlined', () => editor.chain().focus().toggleUnderline().run()],
                ] as const).map(([mark, label, icon, action]) => {
                  const active = editor.isActive(mark);
                  return <button key={mark} type="button" aria-pressed={active} onClick={action} className={`${botonClase(active)} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`}>
                    <span className="material-symbols-outlined text-base" aria-hidden="true">{icon}</span><span>{label}</span>
                  </button>;
                })}
              </div>
            </section>

            <section aria-labelledby="texto-estructura-heading" className="space-y-2 border-b border-outline-variant/50 pb-space-md">
              <h4 id="texto-estructura-heading" className="font-label-sm text-label-sm text-secondary uppercase tracking-wide font-bold">Estructura</h4>
              <div className="grid grid-cols-2 gap-1.5">
                {([
                  ['heading', 'Encabezado', 'title', () => editor.chain().focus().toggleHeading({ level: 2 }).run(), editor.isActive('heading', { level: 2 })],
                  ['blockquote', 'Cita', 'format_quote', () => editor.chain().focus().toggleBlockquote().run(), editor.isActive('blockquote')],
                  ['bulletList', 'Lista con viñetas', 'format_list_bulleted', () => editor.chain().focus().toggleBulletList().run(), editor.isActive('bulletList')],
                  ['orderedList', 'Lista numerada', 'format_list_numbered', () => editor.chain().focus().toggleOrderedList().run(), editor.isActive('orderedList')],
                ] as const).map(([key, label, icon, action, active]) => <button key={key} type="button" aria-pressed={active} onClick={action} className={`${botonClase(active)} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`}>
                  <span className="material-symbols-outlined text-base" aria-hidden="true">{icon}</span><span>{label}</span>
                </button>)}
              </div>
            </section>

            <section aria-labelledby="texto-alineacion-heading" className="space-y-2 border-b border-outline-variant/50 pb-space-md">
              <h4 id="texto-alineacion-heading" className="font-label-sm text-label-sm text-secondary uppercase tracking-wide font-bold">Alineación y resaltado</h4>
              <div className="grid grid-cols-2 gap-1.5">
                {([
                  ['left', 'Alinear a la izquierda', 'format_align_left'],
                  ['center', 'Centrar', 'format_align_center'],
                  ['right', 'Alinear a la derecha', 'format_align_right'],
                  ['justify', 'Justificar', 'format_align_justify'],
                ] as const).map(([align, label, icon]) => {
                  const active = editor.isActive({ textAlign: align });
                  return <button key={align} type="button" aria-label={label} aria-pressed={active} title={label} onClick={() => editor.chain().focus().setTextAlign(align).run()} className={`${botonClase(active)} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`}>
                    <span className="material-symbols-outlined text-base" aria-hidden="true">{icon}</span><span>{label}</span>
                  </button>;
                })}
                <button type="button" aria-pressed={editor.isActive('highlight')} onClick={() => editor.chain().focus().toggleHighlight().run()} className={`${botonClase(editor.isActive('highlight'))} col-span-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`}>
                  <span className="material-symbols-outlined text-base" aria-hidden="true">ink_highlighter</span><span>Resaltar texto en ámbar</span>
                </button>
              </div>
            </section>

            <section aria-labelledby="texto-historial-heading" className="space-y-2">
              <h4 id="texto-historial-heading" className="font-label-sm text-label-sm text-secondary uppercase tracking-wide font-bold">Historial de edición</h4>
              <div className="grid grid-cols-2 gap-1.5">
                {([
                  ['undo', 'Deshacer', 'undo', editor.can().undo()],
                  ['redo', 'Rehacer', 'redo', editor.can().redo()],
                ] as const).map(([command, label, icon, available]) => <button key={command} type="button" disabled={!available} aria-describedby="historial-ayuda" onClick={() => editor.chain().focus()[command]().run()} className={`${botonClase(false, !available)} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`}>
                  <span className="material-symbols-outlined text-base" aria-hidden="true">{icon}</span><span>{label}</span>
                </button>)}
              </div>
              <p id="historial-ayuda" aria-live="polite" className="text-xs text-on-surface-variant">
                {!editor.can().undo() && !editor.can().redo() ? 'Aún no hay cambios que deshacer o rehacer.' : !editor.can().undo() ? 'No hay cambios anteriores para deshacer.' : !editor.can().redo() ? 'No hay cambios deshechos para rehacer.' : 'Puedes deshacer o rehacer cambios recientes.'}
              </p>
            </section>
          </div>
        )}

        {/* PANEL: PEGATINAS */}
        {panelAbierto === 'pegatinas' && (
          <div className="space-y-space-md">
            <span className="font-label-sm text-label-sm text-outline uppercase block mb-1">Sellos y Florituras</span>
            <div className="grid grid-cols-4 gap-2">
              {['✦', '❦', '❧', '✶', '✿', '⚓', '⚜', '✧'].map((simbolo) => (
                <button
                  key={simbolo}
                  type="button"
                  onClick={() => editor?.chain().focus().insertContent(` ${simbolo} `).run()}
                  className="h-12 bg-surface hover:bg-secondary-fixed/50 text-secondary text-xl rounded-xl flex items-center justify-center transition-all shadow-xs"
                >
                  {simbolo}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* PANEL: IMÁGENES */}
        {panelAbierto === 'imagenes' && (
          <div className="space-y-space-md">
            <span className="font-label-sm text-label-sm text-outline uppercase block mb-1">Grabados de Archivo</span>
            <div className="grid grid-cols-2 gap-2">
              <div
                onClick={() => editor?.chain().focus().insertContent('<p style="text-align:center; color:#7e5713; font-style:italic;">⚜ [Grabado de Botánica Antigua] ⚜</p>').run()}
                className="p-3 rounded-xl bg-surface hover:bg-surface-container text-center cursor-pointer border border-outline-variant/40"
              >
                <span className="material-symbols-outlined text-3xl text-secondary">spa</span>
                <span className="block font-label-sm text-xs mt-1">Botánica</span>
              </div>
              <div
                onClick={() => editor?.chain().focus().insertContent('<p style="text-align:center; color:#7e5713; font-style:italic;">⚓ [Grabado de Navíos & Faros] ⚓</p>').run()}
                className="p-3 rounded-xl bg-surface hover:bg-surface-container text-center cursor-pointer border border-outline-variant/40"
              >
                <span className="material-symbols-outlined text-3xl text-secondary">sailing</span>
                <span className="block font-label-sm text-xs mt-1">Faros & Mar</span>
              </div>
            </div>
          </div>
        )}

        {/* PANEL: APARIENCIA */}
        {panelAbierto === 'apariencia' && (
          <div className="space-y-space-md">
            <div>
              <span className="font-label-sm text-label-sm text-outline uppercase block mb-1">Color del Papel</span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'blanco', label: 'Crema clásico', hex: '#ffffff' },
                  { id: 'pergamino', label: 'Pergamino cálido', hex: '#fef8ee' },
                  { id: 'marfil', label: 'Marfil rústico', hex: '#f7f1e7' },
                  { id: 'arena', label: 'Papiro suave', hex: '#fbf5eb' },
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => onCambiarApariencia({ ...apariencia, colorPapel: p.hex })}
                    className={`flex items-center gap-2 p-2 rounded-xl border text-left ${
                      apariencia.colorPapel === p.hex ? 'border-primary ring-2 ring-primary/20 bg-surface-container' : 'border-outline-variant/40'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full border border-black/10 shadow-xs" style={{ backgroundColor: p.hex }} />
                    <span className="font-label-sm text-xs text-on-surface">{p.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="font-label-sm text-label-sm text-outline uppercase block mb-1">Tipografía</span>
              <div className="flex flex-col gap-1.5">
                {[
                  { id: 'Merriweather', label: 'Merriweather (Serif Literaria)' },
                  { id: 'Plus Jakarta Sans', label: 'Plus Jakarta (Sans Moderna)' },
                  { id: 'Georgia', label: 'Georgia (Editorial Clásica)' },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => onCambiarApariencia({ ...apariencia, fuente: f.id })}
                    className={`p-2 rounded-xl text-left font-label-md text-label-md ${
                      apariencia.fuente === f.id ? 'bg-primary text-on-primary' : 'bg-surface hover:bg-surface-container'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
