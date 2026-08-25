import React, { useState } from 'react';
import { Sparkles, FileText, Check, Wand2, Lightbulb } from 'lucide-react';
import { SUMMARY_SUGGESTIONS } from '../../data/initialData';

interface SummaryFormProps {
  summary: string;
  onChange: (summary: string) => void;
}

export const SummaryForm: React.FC<SummaryFormProps> = ({ summary, onChange }) => {
  const [selectedRole, setSelectedRole] = useState<string>('');

  const handleApplySuggestion = (text: string) => {
    onChange(text);
  };

  const wordCount = summary.trim() ? summary.trim().split(/\s+/).length : 0;

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          Perfil y Resumen Profesional
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Redacta un breve resumen de 3 a 5 líneas destacando tus principales fortalezas, años de experiencia y metas profesionales.
        </p>
      </div>

      {/* Suggestion Assistant Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600 animate-bounce" />
            <h3 className="text-xs font-bold text-blue-900">
              Asistente de Redacción Rápida
            </h3>
          </div>
          <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-semibold">
            1-Clic para usar
          </span>
        </div>

        <p className="text-xs text-blue-800/80">
          Selecciona tu sector para aplicar una plantilla optimizada por expertos que puedes personalizar:
        </p>

        {/* Suggestion Pills */}
        <div className="flex flex-wrap gap-2 pt-1">
          {SUMMARY_SUGGESTIONS.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setSelectedRole(item.role);
                handleApplySuggestion(item.text);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 shadow-2xs ${
                selectedRole === item.role
                  ? 'bg-blue-600 text-white font-bold'
                  : 'bg-white text-slate-700 hover:bg-blue-100/70 border border-blue-200'
              }`}
            >
              <Wand2 className="w-3 h-3 text-blue-500" />
              <span>{item.role}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Textarea for Summary */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs text-slate-600">
          <label htmlFor="textarea-summary" className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
            Tu Extracto / Sobre Mí
          </label>
          <div className="flex items-center gap-2">
            <span className={`text-[11px] ${wordCount > 60 ? 'text-amber-600 font-medium' : 'text-slate-400'}`}>
              {wordCount} palabras (~{summary.length} caracteres)
            </span>
          </div>
        </div>

        <textarea
          id="textarea-summary"
          rows={6}
          value={summary}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Ejemplo: Profesional con más de 5 años de trayectoria en el sector, enfocado en liderar proyectos innovadores y optimizar procesos con alto impacto comercial..."
          className="w-full p-3.5 text-sm bg-white border border-slate-300 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none leading-relaxed transition-colors shadow-2xs"
        />

        {/* Pro tips */}
        <div className="flex items-start gap-2 bg-amber-50/70 border border-amber-200/70 p-3 rounded-lg text-xs text-amber-900">
          <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-snug">
            <strong>Consejo de reclutador:</strong> Un perfil de entre 40 y 70 palabras es ideal. Menciona tu mayor logro cuantificable (ej. "aumento del 30% en ventas").
          </p>
        </div>
      </div>
    </div>
  );
};
