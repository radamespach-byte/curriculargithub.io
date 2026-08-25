import React, { useState } from 'react';
import { ExperienceItem } from '../../types';
import { Briefcase, Plus, Trash2, ChevronDown, ChevronUp, Calendar, MapPin, Building, ListPlus, Sparkles } from 'lucide-react';

interface ExperienceFormProps {
  experiences: ExperienceItem[];
  onChange: (experiences: ExperienceItem[]) => void;
}

const BULLET_TEMPLATES = [
  '• Lideré la implementación de mejoras que incrementaron la productividad del equipo en un 25%.',
  '• Coordiné proyectos clave con clientes asegurando la entrega a tiempo y dentro del presupuesto.',
  '• Automaticé procesos manuales reduciendo los tiempos de respuesta en un 40%.',
  '• Colaboré con departamentos multidisciplinarios para el diseño de nuevas estrategias operativas.',
];

export const ExperienceForm: React.FC<ExperienceFormProps> = ({ experiences, onChange }) => {
  const [expandedId, setExpandedId] = useState<string | null>(experiences[0]?.id || null);

  const handleAddExperience = () => {
    const newExp: ExperienceItem = {
      id: `exp-${Date.now()}`,
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      description: '',
    };
    onChange([...experiences, newExp]);
    setExpandedId(newExp.id);
  };

  const handleUpdate = (id: string, updates: Partial<ExperienceItem>) => {
    onChange(
      experiences.map((exp) => (exp.id === id ? { ...exp, ...updates } : exp))
    );
  };

  const handleDelete = (id: string) => {
    onChange(experiences.filter((exp) => exp.id !== id));
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= experiences.length) return;
    const newArr = [...experiences];
    const [moved] = newArr.splice(index, 1);
    newArr.splice(newIndex, 0, moved);
    onChange(newArr);
  };

  const handleAddBullet = (id: string, bulletText: string) => {
    const current = experiences.find((e) => e.id === id);
    if (!current) return;
    const newDesc = current.description ? `${current.description}\n${bulletText}` : bulletText;
    handleUpdate(id, { description: newDesc });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4 flex justify-between items-center flex-wrap gap-2">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-600" />
            Experiencia Laboral
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Añade tus puestos de trabajo más relevantes en orden cronológico inverso.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddExperience}
          className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm shadow-blue-100 transition-colors active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Añadir Puesto
        </button>
      </div>

      {/* Experience List */}
      <div className="space-y-4">
        {experiences.length === 0 ? (
          <div className="text-center py-10 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 p-6 space-y-3">
            <Briefcase className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-sm font-medium text-slate-600">
              Aún no has añadido ninguna experiencia laboral.
            </p>
            <button
              type="button"
              onClick={handleAddExperience}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              Añadir mi primera experiencia
            </button>
          </div>
        ) : (
          experiences.map((exp, index) => {
            const isExpanded = expandedId === exp.id;
            return (
              <div
                key={exp.id}
                className={`bg-white rounded-xl border transition shadow-2xs overflow-hidden ${
                  isExpanded ? 'border-blue-400 ring-2 ring-blue-500/10' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Accordion Header */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                  className="px-4 py-3.5 flex items-center justify-between cursor-pointer bg-blue-50/40 hover:bg-blue-50/80 transition-colors select-none"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        {exp.jobTitle || '(Puesto sin especificar)'}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {exp.company || 'Empresa no indicada'} 
                        {exp.startDate ? ` • ${exp.startDate} a ${exp.isCurrent ? 'Actual' : exp.endDate || 'Presente'}` : ''}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMove(index, 'up');
                      }}
                      disabled={index === 0}
                      className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded"
                      title="Mover arriba"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMove(index, 'down');
                      }}
                      disabled={index === experiences.length - 1}
                      className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded"
                      title="Mover abajo"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(exp.id);
                      }}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded transition"
                      title="Eliminar este puesto"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Accordion Body Form */}
                {isExpanded && (
                  <div className="p-5 border-t border-slate-100 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Job Title */}
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                          Puesto o Cargo <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={exp.jobTitle}
                          onChange={(e) => handleUpdate(exp.id, { jobTitle: e.target.value })}
                          placeholder="Ej. Diseñador Senior / Contador"
                          className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                        />
                      </div>

                      {/* Company */}
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                          Empresa u Organización <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Building className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => handleUpdate(exp.id, { company: e.target.value })}
                            placeholder="Ej. Grupo Empresarial Acme"
                            className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                          />
                        </div>
                      </div>

                      {/* Location */}
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                          Ubicación
                        </label>
                        <div className="relative">
                          <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                          <input
                            type="text"
                            value={exp.location}
                            onChange={(e) => handleUpdate(exp.id, { location: e.target.value })}
                            placeholder="Ej. Barcelona / Remoto"
                            className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                          />
                        </div>
                      </div>

                      {/* Start / End Dates */}
                      <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                              Fecha Inicio
                            </label>
                            <input
                              type="text"
                              value={exp.startDate}
                              onChange={(e) => handleUpdate(exp.id, { startDate: e.target.value })}
                              placeholder="MM/AAAA o 2021"
                              className="w-full px-2.5 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                              Fecha Fin
                            </label>
                            <input
                              type="text"
                              disabled={exp.isCurrent}
                              value={exp.isCurrent ? 'Presente' : exp.endDate}
                              onChange={(e) => handleUpdate(exp.id, { endDate: e.target.value })}
                              placeholder="MM/AAAA"
                              className="w-full px-2.5 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors disabled:bg-slate-100 disabled:text-slate-400"
                            />
                          </div>
                        </div>

                        {/* Is Current Checkbox */}
                        <label className="flex items-center gap-2 cursor-pointer pt-1">
                          <input
                            type="checkbox"
                            checked={exp.isCurrent}
                            onChange={(e) => handleUpdate(exp.id, { isCurrent: e.target.checked })}
                            className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                          />
                          <span className="text-xs text-slate-700 font-medium select-none">
                            Actualmente trabajo en este puesto
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* Description and Responsibilities */}
                    <div className="space-y-2 pt-2">
                      <div className="flex justify-between items-center">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                          Responsabilidades y Logros
                        </label>
                      </div>

                      <textarea
                        rows={4}
                        value={exp.description}
                        onChange={(e) => handleUpdate(exp.id, { description: e.target.value })}
                        placeholder="• Describe tus funciones principales y aportes de valor..."
                        className="w-full p-3 text-xs bg-white border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none font-sans leading-relaxed transition-colors"
                      />

                      {/* Quick Bullet suggestions */}
                      <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                        <span className="text-[11px] font-semibold text-slate-600 flex items-center gap-1 mb-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                          Sugerencias de viñetas rápidas para insertar:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {BULLET_TEMPLATES.map((b, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => handleAddBullet(exp.id, b)}
                              className="text-[10.5px] bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 rounded-md px-2 py-1 text-left transition-colors flex items-center gap-1"
                            >
                              <ListPlus className="w-3 h-3 text-blue-500 shrink-0" />
                              <span className="truncate max-w-[280px]">{b}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}

        {/* Big Dashed Add Button at Bottom of List */}
        {experiences.length > 0 && (
          <button
            type="button"
            onClick={handleAddExperience}
            className="w-full border-2 border-dashed border-slate-300 rounded-lg py-3 text-slate-500 text-sm font-semibold hover:bg-slate-50 hover:border-slate-400 transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4 text-slate-500" />
            <span>Añadir otra experiencia</span>
          </button>
        )}
      </div>
    </div>
  );
};
