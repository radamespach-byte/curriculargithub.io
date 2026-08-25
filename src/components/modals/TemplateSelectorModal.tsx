import React from 'react';
import { TemplateId } from '../../types';
import { TEMPLATES_CONFIG } from '../../data/initialData';
import { X, Check, Sparkles, Layout } from 'lucide-react';

interface TemplateSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTemplateId: TemplateId;
  onSelectTemplate: (id: TemplateId) => void;
}

export const TemplateSelectorModal: React.FC<TemplateSelectorModalProps> = ({
  isOpen,
  onClose,
  selectedTemplateId,
  onSelectTemplate,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Layout className="w-5 h-5 text-blue-600" />
              Selecciona una Plantilla Profesional
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Cambia el diseño visual de tu currículum sin perder ninguno de tus datos.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Templates Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TEMPLATES_CONFIG.map((template) => {
            const isSelected = selectedTemplateId === template.id;
            return (
              <div
                key={template.id}
                onClick={() => {
                  onSelectTemplate(template.id as TemplateId);
                }}
                className={`relative rounded-xl border-2 p-4 cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/30 ring-4 ring-blue-500/10 shadow-md'
                    : 'border-slate-200 hover:border-slate-300 hover:shadow-md bg-white'
                }`}
              >
                {/* Visual Thumbnail Representation */}
                <div className="w-full h-36 bg-slate-100 rounded-lg mb-3 p-3 overflow-hidden border border-slate-200/80 flex flex-col justify-between relative select-none">
                  {/* Miniature Wireframe based on template type */}
                  {template.id === 'oslo' && (
                    <div className="flex h-full gap-2">
                      <div className="w-1/3 bg-blue-600 rounded-xs p-1 flex flex-col gap-1">
                        <div className="w-5 h-5 rounded-full bg-white/40 mx-auto" />
                        <div className="w-full h-1 bg-white/50 rounded-xs" />
                        <div className="w-3/4 h-1 bg-white/30 rounded-xs" />
                        <div className="w-1/2 h-1 bg-white/30 rounded-xs mt-2" />
                      </div>
                      <div className="flex-1 space-y-1.5 p-1">
                        <div className="w-3/4 h-2 bg-slate-800 rounded-xs" />
                        <div className="w-1/2 h-1.5 bg-blue-500 rounded-xs" />
                        <div className="w-full h-1 bg-slate-200 rounded-xs mt-2" />
                        <div className="w-full h-1 bg-slate-200 rounded-xs" />
                        <div className="w-4/5 h-1 bg-slate-200 rounded-xs" />
                      </div>
                    </div>
                  )}

                  {template.id === 'harvard' && (
                    <div className="h-full flex flex-col items-center justify-between p-1">
                      <div className="w-2/3 h-2.5 bg-slate-900 rounded-xs mx-auto mb-1" />
                      <div className="w-1/3 h-1 bg-slate-500 rounded-xs mx-auto mb-2" />
                      <div className="w-full h-0.5 bg-slate-300 mb-1" />
                      <div className="w-full space-y-1">
                        <div className="w-full h-1 bg-slate-200 rounded-xs" />
                        <div className="w-full h-1 bg-slate-200 rounded-xs" />
                        <div className="w-3/4 h-1 bg-slate-200 rounded-xs" />
                      </div>
                    </div>
                  )}

                  {template.id === 'stockholm' && (
                    <div className="h-full flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <div className="w-4 h-1 bg-teal-600 rounded-xs" />
                          <div className="w-16 h-2 bg-slate-800 rounded-xs" />
                        </div>
                        <div className="w-6 h-6 rounded-md bg-teal-100" />
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div className="space-y-1 bg-white p-1 rounded-xs border border-slate-200">
                          <div className="w-full h-1 bg-slate-200 rounded-xs" />
                          <div className="w-3/4 h-1 bg-slate-200 rounded-xs" />
                        </div>
                        <div className="space-y-1 bg-white p-1 rounded-xs border border-slate-200">
                          <div className="w-full h-1 bg-slate-200 rounded-xs" />
                          <div className="w-1/2 h-1 bg-slate-200 rounded-xs" />
                        </div>
                      </div>
                    </div>
                  )}

                  {template.id === 'berlin' && (
                    <div className="h-full flex flex-col">
                      <div className="w-full bg-purple-600 h-8 rounded-t-xs p-1 flex justify-between items-center">
                        <div className="w-1/2 h-1.5 bg-white rounded-xs" />
                        <div className="w-4 h-4 rounded-full bg-white/40" />
                      </div>
                      <div className="p-2 space-y-1 bg-white flex-1 border-t border-slate-100">
                        <div className="w-full h-1 bg-slate-200 rounded-xs" />
                        <div className="w-4/5 h-1 bg-slate-200 rounded-xs" />
                      </div>
                    </div>
                  )}

                  {template.id === 'madrid' && (
                    <div className="h-full flex flex-col border-t-2 border-slate-900 bg-white p-2">
                      <div className="w-2/3 h-2 bg-slate-900 rounded-xs mb-2" />
                      <div className="w-full h-0.5 bg-slate-200 mb-2" />
                      <div className="space-y-1 pl-2 border-l border-slate-300">
                        <div className="w-full h-1 bg-slate-200 rounded-xs" />
                        <div className="w-3/4 h-1 bg-slate-200 rounded-xs" />
                      </div>
                    </div>
                  )}

                  {template.id === 'vienna' && (
                    <div className="h-full bg-white p-2 space-y-1.5 font-mono">
                      <div className="bg-slate-100 p-1 rounded-xs flex justify-between items-center">
                        <div className="w-1/2 h-1.5 bg-emerald-600 rounded-xs" />
                        <div className="w-3 h-3 bg-slate-300 rounded-xs" />
                      </div>
                      <div className="flex gap-1">
                        <div className="w-8 h-2 bg-emerald-100 rounded-xs" />
                        <div className="w-8 h-2 bg-slate-100 rounded-xs" />
                      </div>
                      <div className="w-full h-1 bg-slate-200 rounded-xs" />
                    </div>
                  )}

                  {/* Active Selected Badge */}
                  {isSelected && (
                    <div className="absolute top-2 right-2 bg-blue-600 text-white p-1 rounded-full shadow-sm">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>

                {/* Template Info */}
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 text-sm">{template.name}</h3>
                    <span className="text-[10px] font-semibold px-2 py-0.5 bg-slate-100 text-slate-700 rounded-full">
                      {template.tag}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium mt-0.5">{template.subtitle}</p>
                  <p className="text-[11px] text-slate-500 mt-1.5 leading-snug">{template.description}</p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onSelectTemplate(template.id as TemplateId);
                    onClose();
                  }}
                  className={`mt-4 w-full py-1.5 text-xs font-bold rounded-lg transition ${
                    isSelected
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {isSelected ? 'Plantilla en uso' : 'Usar esta plantilla'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg shadow-sm transition"
          >
            Listo / Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
