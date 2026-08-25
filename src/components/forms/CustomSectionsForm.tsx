import React, { useState } from 'react';
import { CustomSection, CustomItem } from '../../types';
import { Award, Plus, Trash2, FolderGit2, BookOpen, Trophy, Sparkles } from 'lucide-react';

interface CustomSectionsFormProps {
  customSections: CustomSection[];
  onChange: (sections: CustomSection[]) => void;
}

const SECTION_TEMPLATES = [
  { title: 'Certificaciones y Cursos', type: 'courses' as const, icon: BookOpen },
  { title: 'Proyectos Destacados', type: 'projects' as const, icon: FolderGit2 },
  { title: 'Premios y Reconocimientos', type: 'awards' as const, icon: Trophy },
  { title: 'Voluntariado e Impacto Social', type: 'custom' as const, icon: Award },
];

export const CustomSectionsForm: React.FC<CustomSectionsFormProps> = ({
  customSections,
  onChange,
}) => {
  const [newSectionTitle, setNewSectionTitle] = useState('');

  const handleAddSection = (title: string, type: CustomSection['type'] = 'custom') => {
    if (!title.trim()) return;
    const newSec: CustomSection = {
      id: `sec-${Date.now()}`,
      title: title.trim(),
      type,
      items: [
        {
          id: `item-${Date.now()}`,
          title: '',
          subtitle: '',
          date: '',
          description: '',
        }
      ]
    };
    onChange([...customSections, newSec]);
    setNewSectionTitle('');
  };

  const handleDeleteSection = (sectionId: string) => {
    onChange(customSections.filter((s) => s.id !== sectionId));
  };

  const handleAddItem = (sectionId: string) => {
    const newItem: CustomItem = {
      id: `item-${Date.now()}`,
      title: '',
      subtitle: '',
      date: '',
      description: '',
    };
    onChange(
      customSections.map((s) =>
        s.id === sectionId ? { ...s, items: [...s.items, newItem] } : s
      )
    );
  };

  const handleUpdateItem = (
    sectionId: string,
    itemId: string,
    updates: Partial<CustomItem>
  ) => {
    onChange(
      customSections.map((s) => {
        if (s.id !== sectionId) return s;
        return {
          ...s,
          items: s.items.map((item) =>
            item.id === itemId ? { ...item, ...updates } : item
          ),
        };
      })
    );
  };

  const handleDeleteItem = (sectionId: string, itemId: string) => {
    onChange(
      customSections.map((s) => {
        if (s.id !== sectionId) return s;
        return {
          ...s,
          items: s.items.filter((item) => item.id !== itemId),
        };
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Award className="w-5 h-5 text-blue-600" />
          Secciones Adicionales
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Personaliza tu CV con secciones extra para destacar proyectos, certificaciones, reconocimientos o actividades extracurriculares.
        </p>
      </div>

      {/* Suggested Sections to Add */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2.5">
        <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-blue-600" />
          Añadir secciones recomendadas con 1 clic:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {SECTION_TEMPLATES.map((tmpl) => {
            const Icon = tmpl.icon;
            const isAlreadyAdded = customSections.some(
              (s) => s.title.toLowerCase() === tmpl.title.toLowerCase()
            );
            return (
              <button
                key={tmpl.title}
                type="button"
                onClick={() => handleAddSection(tmpl.title, tmpl.type)}
                disabled={isAlreadyAdded}
                className={`p-2.5 rounded-lg border text-left flex items-center justify-between transition ${
                  isAlreadyAdded
                    ? 'bg-slate-100/60 border-slate-200 text-slate-400 opacity-60'
                    : 'bg-white hover:bg-blue-50/70 border-slate-200 text-slate-800 hover:border-blue-300 shadow-2xs'
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <Icon className="w-4 h-4 text-blue-600" />
                  <span>{tmpl.title}</span>
                </div>
                <Plus className="w-3.5 h-3.5 text-blue-600" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Title Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newSectionTitle}
          onChange={(e) => setNewSectionTitle(e.target.value)}
          placeholder="O crea una sección personalizada (ej. Publicaciones, Patentes...)"
          className="flex-1 px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
        />
        <button
          type="button"
          onClick={() => handleAddSection(newSectionTitle, 'custom')}
          disabled={!newSectionTitle.trim()}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white text-xs font-semibold rounded-lg shadow-sm shadow-blue-100 transition-colors"
        >
          Crear Sección
        </button>
      </div>

      {/* Active Custom Sections */}
      <div className="space-y-6 pt-2">
        {customSections.map((section) => (
          <div
            key={section.id}
            className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 space-y-4"
          >
            {/* Section Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Award className="w-4 h-4 text-blue-600" />
                {section.title}
              </h3>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleAddItem(section.id)}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-blue-50 text-blue-600 text-xs font-semibold rounded-md border border-slate-200 transition-colors flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  Añadir elemento
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteSection(section.id)}
                  className="p-1 text-slate-400 hover:text-red-500 rounded transition-colors"
                  title="Eliminar esta sección completa"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Section Items */}
            <div className="space-y-3">
              {section.items.map((item, idx) => (
                <div
                  key={item.id}
                  className="bg-slate-50/70 p-3.5 rounded-lg border border-slate-200/80 space-y-2.5 relative group"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Elemento #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDeleteItem(section.id, item.id)}
                      className="text-slate-400 hover:text-red-500 text-xs transition-colors"
                      title="Eliminar este elemento"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="sm:col-span-2">
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) =>
                          handleUpdateItem(section.id, item.id, {
                            title: e.target.value,
                          })
                        }
                        placeholder="Título del proyecto, curso o premio"
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none font-medium transition-colors"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        value={item.date}
                        onChange={(e) =>
                          handleUpdateItem(section.id, item.id, {
                            date: e.target.value,
                          })
                        }
                        placeholder="Año o Fecha (2024)"
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={item.subtitle}
                      onChange={(e) =>
                        handleUpdateItem(section.id, item.id, {
                          subtitle: e.target.value,
                        })
                      }
                      placeholder="Entidad emisora / Institución / Rol"
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                    />
                    <input
                      type="text"
                      value={item.link || ''}
                      onChange={(e) =>
                        handleUpdateItem(section.id, item.id, {
                          link: e.target.value,
                        })
                      }
                      placeholder="Enlace URL (opcional)"
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                    />
                  </div>

                  <textarea
                    rows={2}
                    value={item.description}
                    onChange={(e) =>
                      handleUpdateItem(section.id, item.id, {
                        description: e.target.value,
                      })
                    }
                    placeholder="Descripción breve de los logros o competencias adquiridas..."
                    className="w-full p-2 text-xs bg-white border border-slate-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
