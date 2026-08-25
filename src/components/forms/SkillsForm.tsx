import React, { useState } from 'react';
import { SkillItem } from '../../types';
import { Wrench, Plus, Trash2, Star, Sparkles, Check, Tag } from 'lucide-react';
import { SKILLS_PRESETS } from '../../data/initialData';

interface SkillsFormProps {
  skills: SkillItem[];
  onChange: (skills: SkillItem[]) => void;
}

export const SkillsForm: React.FC<SkillsFormProps> = ({ skills, onChange }) => {
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState<number>(4);

  const handleAddCustomSkill = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newSkillName.trim()) return;

    const exists = skills.some(s => s.name.toLowerCase() === newSkillName.trim().toLowerCase());
    if (!exists) {
      const newSkill: SkillItem = {
        id: `sk-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        name: newSkillName.trim(),
        level: newSkillLevel,
        category: 'technical',
      };
      onChange([...skills, newSkill]);
    }
    setNewSkillName('');
  };

  const handleAddPresetSkill = (name: string) => {
    const exists = skills.some(s => s.name.toLowerCase() === name.toLowerCase());
    if (!exists) {
      const newSkill: SkillItem = {
        id: `sk-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        name,
        level: 4,
        category: 'technical',
      };
      onChange([...skills, newSkill]);
    }
  };

  const handleUpdateLevel = (id: string, level: number) => {
    onChange(skills.map(s => s.id === id ? { ...s, level } : s));
  };

  const handleDelete = (id: string) => {
    onChange(skills.filter(s => s.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Wrench className="w-5 h-5 text-blue-600" />
          Habilidades y Competencias
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Añade tus conocimientos técnicos, herramientas y habilidades interpersonales para destacar ante los reclutadores.
        </p>
      </div>

      {/* Manual Add Input Box */}
      <form onSubmit={handleAddCustomSkill} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
          Añadir Habilidad Personalizada
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={newSkillName}
            onChange={(e) => setNewSkillName(e.target.value)}
            placeholder="Ej. React, Liderazgo, Gestión de Datos, Excel Avanzado..."
            className="flex-1 px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
          />

          {/* Level Selector */}
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-300">
            <span className="text-xs text-slate-500 font-medium">Nivel:</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setNewSkillLevel(lvl)}
                  className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold transition ${
                    newSkillLevel >= lvl ? 'bg-amber-400 text-amber-950 shadow-2xs' : 'bg-slate-100 text-slate-400'
                  }`}
                  title={`Nivel ${lvl} de 5`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!newSkillName.trim()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white text-xs font-semibold rounded-lg shadow-sm shadow-blue-100 transition-colors shrink-0"
          >
            Añadir
          </button>
        </div>
      </form>

      {/* Suggested Skills Preset Cloud */}
      <div className="space-y-3">
        <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-blue-600" />
          Sugerencias populares (Haz clic para agregar al instante):
        </span>
        <div className="space-y-2">
          {SKILLS_PRESETS.map((group, idx) => (
            <div key={idx} className="bg-white p-3 rounded-lg border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                {group.category}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => {
                  const isAdded = skills.some(s => s.name.toLowerCase() === item.toLowerCase());
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleAddPresetSkill(item)}
                      disabled={isAdded}
                      className={`text-xs px-2.5 py-1 rounded-md transition flex items-center gap-1 ${
                        isAdded
                          ? 'bg-slate-100 text-slate-400 cursor-default line-through'
                          : 'bg-slate-100 hover:bg-blue-100 hover:text-blue-800 text-slate-700 font-medium'
                      }`}
                    >
                      {isAdded ? <Check className="w-3 h-3 text-emerald-500" /> : <Plus className="w-3 h-3 text-blue-500" />}
                      <span>{item}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Current Skills List */}
      <div className="space-y-3 pt-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex justify-between items-center">
          <span>Habilidades en tu CV ({skills.length})</span>
        </h3>

        {skills.length === 0 ? (
          <p className="text-xs text-slate-400 italic text-center py-4 bg-slate-50 rounded-lg">
            No has agregado habilidades todavía. Elige alguna de las sugerencias o escribe una arriba.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-200 hover:border-slate-300 shadow-2xs group"
              >
                <div className="font-semibold text-xs text-slate-800 truncate pr-2">
                  {skill.name}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {/* Star Rating buttons */}
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => handleUpdateLevel(skill.id, lvl)}
                        className={`text-xs p-0.5 ${
                          lvl <= skill.level ? 'text-amber-500' : 'text-slate-200 hover:text-amber-300'
                        }`}
                        title={`Nivel ${lvl}/5`}
                      >
                        ★
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDelete(skill.id)}
                    className="p-1 text-slate-300 hover:text-red-500 rounded transition ml-1"
                    title="Eliminar habilidad"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
