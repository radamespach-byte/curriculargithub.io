import React, { useState } from 'react';
import { LanguageItem } from '../../types';
import { Languages, Plus, Trash2, Check } from 'lucide-react';

interface LanguagesFormProps {
  languages: LanguageItem[];
  onChange: (languages: LanguageItem[]) => void;
}

const COMMON_LANGUAGES = ['Español', 'Inglés', 'Francés', 'Alemán', 'Italiano', 'Portugués', 'Chino', 'Japonés'];
const LEVELS: LanguageItem['level'][] = [
  'Nativo',
  'C2 (Maestría)',
  'C1 (Avanzado)',
  'B2 (Intermedio alto)',
  'B1 (Intermedio)',
  'A2 (Básico)'
];

export const LanguagesForm: React.FC<LanguagesFormProps> = ({ languages, onChange }) => {
  const [langName, setLangName] = useState('');
  const [langLevel, setLangLevel] = useState<LanguageItem['level']>('C1 (Avanzado)');

  const handleAddLanguage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!langName.trim()) return;

    const exists = languages.some(l => l.name.toLowerCase() === langName.trim().toLowerCase());
    if (!exists) {
      const newLang: LanguageItem = {
        id: `lang-${Date.now()}`,
        name: langName.trim(),
        level: langLevel,
      };
      onChange([...languages, newLang]);
    }
    setLangName('');
  };

  const handleAddPreset = (name: string) => {
    const exists = languages.some(l => l.name.toLowerCase() === name.toLowerCase());
    if (!exists) {
      const newLang: LanguageItem = {
        id: `lang-${Date.now()}`,
        name,
        level: 'B2 (Intermedio alto)',
      };
      onChange([...languages, newLang]);
    }
  };

  const handleUpdateLevel = (id: string, level: LanguageItem['level']) => {
    onChange(languages.map(l => l.id === id ? { ...l, level } : l));
  };

  const handleDelete = (id: string) => {
    onChange(languages.filter(l => l.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Languages className="w-5 h-5 text-blue-600" />
          Idiomas
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Indica tu lengua materna y los idiomas que dominas junto con su nivel de competencia según el marco europeo (CEFR).
        </p>
      </div>

      {/* Add Form */}
      <form onSubmit={handleAddLanguage} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
          Añadir Nuevo Idioma
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
          <div className="sm:col-span-6">
            <input
              type="text"
              value={langName}
              onChange={(e) => setLangName(e.target.value)}
              placeholder="Ej. Inglés / Catalán / Sueco..."
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={langLevel}
              onChange={(e) => setLangLevel(e.target.value as LanguageItem['level'])}
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none font-medium transition-colors"
            >
              {LEVELS.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={!langName.trim()}
              className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white text-xs font-semibold rounded-lg shadow-sm shadow-blue-100 transition-colors"
            >
              Añadir
            </button>
          </div>
        </div>
      </form>

      {/* Common languages presets */}
      <div>
        <span className="text-xs font-semibold text-slate-600 block mb-1.5">
          Idiomas habituales (Añadir rápido):
        </span>
        <div className="flex flex-wrap gap-1.5">
          {COMMON_LANGUAGES.map((lang) => {
            const isAdded = languages.some(l => l.name.toLowerCase() === lang.toLowerCase());
            return (
              <button
                key={lang}
                type="button"
                onClick={() => handleAddPreset(lang)}
                disabled={isAdded}
                className={`text-xs px-2.5 py-1 rounded-md transition flex items-center gap-1 ${
                  isAdded
                    ? 'bg-slate-100 text-slate-400 cursor-default line-through'
                    : 'bg-white hover:bg-blue-50 text-slate-700 border border-slate-200 font-medium'
                }`}
              >
                {isAdded ? <Check className="w-3 h-3 text-emerald-500" /> : <Plus className="w-3 h-3 text-blue-500" />}
                <span>{lang}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Current Languages List */}
      <div className="space-y-3 pt-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
          Idiomas en tu currículum ({languages.length})
        </h3>

        {languages.length === 0 ? (
          <p className="text-xs text-slate-400 italic text-center py-4 bg-slate-50 rounded-lg">
            No has añadido idiomas aún.
          </p>
        ) : (
          <div className="space-y-2">
            {languages.map((lang) => (
              <div
                key={lang.id}
                className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200 hover:border-slate-300 shadow-2xs"
              >
                <span className="font-bold text-sm text-slate-800">
                  {lang.name}
                </span>

                <div className="flex items-center gap-3">
                  <select
                    value={lang.level}
                    onChange={(e) => handleUpdateLevel(lang.id, e.target.value as LanguageItem['level'])}
                    className="px-2.5 py-1 text-xs bg-slate-50 border border-slate-200 rounded-md font-medium text-slate-700"
                  >
                    {LEVELS.map((lvl) => (
                      <option key={lvl} value={lvl}>
                        {lvl}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={() => handleDelete(lang.id)}
                    className="p-1.5 text-slate-300 hover:text-red-500 rounded transition"
                    title="Eliminar idioma"
                  >
                    <Trash2 className="w-4 h-4" />
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
