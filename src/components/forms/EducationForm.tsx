import React, { useState } from 'react';
import { EducationItem } from '../../types';
import { GraduationCap, Plus, Trash2, ChevronDown, ChevronUp, School, Calendar, MapPin } from 'lucide-react';

interface EducationFormProps {
  education: EducationItem[];
  onChange: (education: EducationItem[]) => void;
}

export const EducationForm: React.FC<EducationFormProps> = ({ education, onChange }) => {
  const [expandedId, setExpandedId] = useState<string | null>(education[0]?.id || null);

  const handleAddEducation = () => {
    const newEdu: EducationItem = {
      id: `edu-${Date.now()}`,
      degree: '',
      school: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      description: '',
    };
    onChange([...education, newEdu]);
    setExpandedId(newEdu.id);
  };

  const handleUpdate = (id: string, updates: Partial<EducationItem>) => {
    onChange(
      education.map((edu) => (edu.id === id ? { ...edu, ...updates } : edu))
    );
  };

  const handleDelete = (id: string) => {
    onChange(education.filter((edu) => edu.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4 flex justify-between items-center flex-wrap gap-2">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-blue-600" />
            Educación y Formación
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Incluye tus títulos universitarios, formación profesional, maestrías o certificaciones académicas.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddEducation}
          className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm shadow-blue-100 transition-colors active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Añadir Titulación
        </button>
      </div>

      {/* Education List */}
      <div className="space-y-4">
        {education.length === 0 ? (
          <div className="text-center py-10 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 p-6 space-y-3">
            <GraduationCap className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-sm font-medium text-slate-600">
              No has añadido formación académica aún.
            </p>
            <button
              type="button"
              onClick={handleAddEducation}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              Añadir mi titulación
            </button>
          </div>
        ) : (
          education.map((edu, index) => {
            const isExpanded = expandedId === edu.id;
            return (
              <div
                key={edu.id}
                className={`bg-white rounded-xl border transition shadow-2xs overflow-hidden ${
                  isExpanded ? 'border-blue-400 ring-2 ring-blue-500/10' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Accordion Header */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : edu.id)}
                  className="px-4 py-3.5 flex items-center justify-between cursor-pointer bg-blue-50/40 hover:bg-blue-50/80 transition-colors select-none"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        {edu.degree || '(Título no especificado)'}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {edu.school || 'Institución no indicada'}
                        {edu.startDate ? ` • ${edu.startDate} a ${edu.isCurrent ? 'Actualidad' : edu.endDate || 'Fin'}` : ''}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(edu.id);
                      }}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded transition"
                      title="Eliminar titulación"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Body Form */}
                {isExpanded && (
                  <div className="p-5 border-t border-slate-100 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Degree */}
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                          Título o Grado Obtenido <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => handleUpdate(edu.id, { degree: e.target.value })}
                          placeholder="Ej. Grado en Administración y Dirección de Empresas"
                          className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                        />
                      </div>

                      {/* School */}
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                          Universidad / Instituto / Escuela <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <School className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                          <input
                            type="text"
                            value={edu.school}
                            onChange={(e) => handleUpdate(edu.id, { school: e.target.value })}
                            placeholder="Ej. Universidad Complutense de Madrid"
                            className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                          />
                        </div>
                      </div>

                      {/* Location */}
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                          Ciudad / País
                        </label>
                        <div className="relative">
                          <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                          <input
                            type="text"
                            value={edu.location}
                            onChange={(e) => handleUpdate(edu.id, { location: e.target.value })}
                            placeholder="Ej. Madrid, España"
                            className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                          />
                        </div>
                      </div>

                      {/* Dates */}
                      <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                              Año de Inicio
                            </label>
                            <input
                              type="text"
                              value={edu.startDate}
                              onChange={(e) => handleUpdate(edu.id, { startDate: e.target.value })}
                              placeholder="2018"
                              className="w-full px-2.5 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                              Año de Graduación
                            </label>
                            <input
                              type="text"
                              disabled={edu.isCurrent}
                              value={edu.isCurrent ? 'En curso' : edu.endDate}
                              onChange={(e) => handleUpdate(edu.id, { endDate: e.target.value })}
                              placeholder="2022"
                              className="w-full px-2.5 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors disabled:bg-slate-100 disabled:text-slate-400"
                            />
                          </div>
                        </div>

                        <label className="flex items-center gap-2 cursor-pointer pt-1">
                          <input
                            type="checkbox"
                            checked={edu.isCurrent}
                            onChange={(e) => handleUpdate(edu.id, { isCurrent: e.target.checked })}
                            className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                          />
                          <span className="text-xs text-slate-700 font-medium select-none">
                            Actualmente cursando estos estudios
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* Additional Description */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                        Detalles destacados o Mención especial (Opcional)
                      </label>
                      <input
                        type="text"
                        value={edu.description}
                        onChange={(e) => handleUpdate(edu.id, { description: e.target.value })}
                        placeholder="Ej. Matrícula de Honor en Proyecto Fin de Grado / Promedio 9.2"
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}

        {/* Big Dashed Add Button at Bottom of List */}
        {education.length > 0 && (
          <button
            type="button"
            onClick={handleAddEducation}
            className="w-full border-2 border-dashed border-slate-300 rounded-lg py-3 text-slate-500 text-sm font-semibold hover:bg-slate-50 hover:border-slate-400 transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4 text-slate-500" />
            <span>Añadir otra titulación</span>
          </button>
        )}
      </div>
    </div>
  );
};
