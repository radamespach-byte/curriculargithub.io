import React from 'react';
import { StylingConfig } from '../../types';
import { COLOR_PALETTES } from '../../data/initialData';
import { X, Palette, Type, Check, LayoutGrid, Circle, Square } from 'lucide-react';

interface DesignModalProps {
  isOpen: boolean;
  onClose: () => void;
  styling: StylingConfig;
  onChange: (styling: Partial<StylingConfig>) => void;
}

const FONT_OPTIONS: { id: StylingConfig['fontFamily']; name: string; sample: string }[] = [
  { id: 'sans', name: 'Plus Jakarta (Moderna)', sample: 'Tipografía limpia, clara y altamente legible' },
  { id: 'serif', name: 'Merriweather (Académica)', sample: 'Elegancia clásica, sobria y tradicional' },
  { id: 'display', name: 'Outfit (Creativa)', sample: 'Aspecto dinámico, vanguardista y fresco' },
  { id: 'mono', name: 'Fira Code (Técnica)', sample: 'Estilo tecnológico, estructurado y preciso' },
];

export const DesignModal: React.FC<DesignModalProps> = ({
  isOpen,
  onClose,
  styling,
  onChange,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Palette className="w-5 h-5 text-blue-600" />
              Personalización de Diseño y Estilos
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Ajusta la paleta cromática, tipografías y proporciones de tu currículum.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Color Palettes */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Color de Acento Principal
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {COLOR_PALETTES.map((color) => {
                const isSelected = styling.primaryColor === color.hex;
                return (
                  <button
                    key={color.hex}
                    type="button"
                    onClick={() => onChange({ primaryColor: color.hex })}
                    className={`p-2.5 rounded-xl border flex flex-col items-center gap-2 transition ${
                      isSelected
                        ? 'border-blue-600 ring-2 ring-blue-500/20 bg-blue-50/30'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div
                      className="w-8 h-8 rounded-full shadow-inner flex items-center justify-center text-white"
                      style={{ backgroundColor: color.hex }}
                    >
                      {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                    </div>
                    <span className="text-[11px] font-semibold text-slate-700 truncate w-full text-center">
                      {color.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Custom Hex Color Picker */}
            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs text-slate-600 font-medium">O elige un color hexadecimal:</span>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={styling.primaryColor}
                  onChange={(e) => onChange({ primaryColor: e.target.value })}
                  className="w-8 h-8 rounded-lg cursor-pointer border border-slate-300 p-0.5 bg-white"
                />
                <input
                  type="text"
                  value={styling.primaryColor}
                  onChange={(e) => onChange({ primaryColor: e.target.value })}
                  className="w-24 px-2.5 py-1 text-xs font-mono uppercase bg-slate-50 border border-slate-300 rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Typography */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Type className="w-4 h-4 text-blue-600" />
              Familia Tipográfica
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {FONT_OPTIONS.map((font) => {
                const isSelected = styling.fontFamily === font.id;
                return (
                  <button
                    key={font.id}
                    type="button"
                    onClick={() => onChange({ fontFamily: font.id })}
                    className={`p-3.5 rounded-xl border text-left transition ${
                      isSelected
                        ? 'border-blue-600 ring-2 ring-blue-500/20 bg-blue-50/30'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-xs text-slate-900">{font.name}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-blue-600" />}
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug">{font.sample}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Photo Shape */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Forma de la Foto de Perfil
            </label>
            <div className="flex gap-3">
              {[
                { id: 'circle' as const, name: 'Circular', icon: Circle },
                { id: 'rounded' as const, name: 'Bordes Redondeados', icon: LayoutGrid },
                { id: 'square' as const, name: 'Cuadrada', icon: Square },
              ].map((item) => {
                const isSelected = styling.photoShape === item.id;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onChange({ photoShape: item.id })}
                    className={`flex-1 p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold transition ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/40 text-blue-700 font-bold'
                        : 'border-slate-200 text-slate-700 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-blue-600" />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shadow-sm transition"
          >
            Aplicar Cambios
          </button>
        </div>
      </div>
    </div>
  );
};
