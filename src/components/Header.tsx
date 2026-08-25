import React, { useState } from 'react';
import { CVData } from '../types';
import { 
  FileText, 
  Edit3, 
  Sparkles, 
  Palette, 
  Layout, 
  Download, 
  RotateCcw, 
  RefreshCw, 
  Check, 
  HelpCircle,
  Eye,
  PenTool,
  Columns
} from 'lucide-react';

interface HeaderProps {
  cvData: CVData;
  onUpdateTitle: (title: string) => void;
  onOpenTemplateModal: () => void;
  onOpenDesignModal: () => void;
  onOpenExportModal: () => void;
  onLoadSampleData: () => void;
  onResetData: () => void;
  activeViewMode: 'split' | 'editor' | 'preview';
  onViewModeChange: (mode: 'split' | 'editor' | 'preview') => void;
}

export const Header: React.FC<HeaderProps> = ({
  cvData,
  onUpdateTitle,
  onOpenTemplateModal,
  onOpenDesignModal,
  onOpenExportModal,
  onLoadSampleData,
  onResetData,
  activeViewMode,
  onViewModeChange,
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleInput, setTitleInput] = useState(cvData.documentTitle);

  // Calculate CV Strength Score (0 to 100%)
  const calculateScore = () => {
    let score = 0;
    if (cvData.personalInfo.firstName && cvData.personalInfo.lastName) score += 20;
    if (cvData.personalInfo.email && cvData.personalInfo.phone) score += 15;
    if (cvData.summary.length > 30) score += 20;
    if (cvData.experiences.length > 0) score += 20;
    if (cvData.education.length > 0) score += 10;
    if (cvData.skills.length >= 3) score += 10;
    if (cvData.languages.length > 0) score += 5;
    return Math.min(100, score);
  };

  const score = calculateScore();

  const handleTitleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (titleInput.trim()) {
      onUpdateTitle(titleInput.trim());
    }
    setIsEditingTitle(false);
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand & Document Title */}
        <div className="flex items-center gap-4 min-w-0">
          {/* Logo */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-sm shadow-sm select-none">
              CV
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-lg tracking-tight text-slate-900">
                CV<span className="text-blue-600">-GENIUS</span>
              </span>
            </div>
          </div>

          <div className="h-5 w-px bg-slate-200 hidden sm:block" />

          {/* Editable Document Title */}
          <div className="min-w-0">
            {isEditingTitle ? (
              <form onSubmit={handleTitleSubmit} className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  onBlur={handleTitleSubmit}
                  autoFocus
                  className="px-2.5 py-1 text-xs font-semibold text-slate-900 border border-blue-500 rounded-md focus:ring-1 focus:ring-blue-500 outline-hidden"
                />
                <button type="submit" className="p-1 text-emerald-600 hover:bg-emerald-50 rounded">
                  <Check className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <div
                onClick={() => {
                  setTitleInput(cvData.documentTitle);
                  setIsEditingTitle(true);
                }}
                className="group flex items-center gap-1.5 cursor-pointer py-1 px-2 -ml-2 rounded-lg hover:bg-slate-100 transition truncate"
                title="Haz clic para renombrar tu currículum"
              >
                <span className="text-xs font-bold text-slate-700 truncate max-w-[150px] sm:max-w-[220px]">
                  {cvData.documentTitle}
                </span>
                <Edit3 className="w-3 h-3 text-slate-400 group-hover:text-blue-600 transition shrink-0" />
              </div>
            )}
          </div>
        </div>

        {/* Center: CV Strength Score */}
        <div className="hidden md:flex items-center gap-3 bg-slate-50 px-3.5 py-1.5 rounded-lg border border-slate-200">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Fuerza:</span>
          </div>
          <div className="w-24 bg-slate-200 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                score >= 80 ? 'bg-emerald-500' : score >= 50 ? 'bg-amber-500' : 'bg-blue-600'
              }`}
              style={{ width: `${score}%` }}
            />
          </div>
          <span className="text-xs font-bold font-mono text-slate-800">{score}%</span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5">
          {/* View Mode Toggle (Mobile / Tablet / Small screens) */}
          <div className="flex lg:hidden bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
            <button
              onClick={() => onViewModeChange('editor')}
              className={`p-1.5 rounded-md flex items-center gap-1 font-medium transition ${
                activeViewMode === 'editor' ? 'bg-white shadow-xs text-blue-600 font-bold' : 'text-slate-600'
              }`}
              title="Ver solo editor"
            >
              <PenTool className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Editor</span>
            </button>
            <button
              onClick={() => onViewModeChange('preview')}
              className={`p-1.5 rounded-md flex items-center gap-1 font-medium transition ${
                activeViewMode === 'preview' ? 'bg-white shadow-xs text-blue-600 font-bold' : 'text-slate-600'
              }`}
              title="Ver solo vista previa"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Previa</span>
            </button>
          </div>

          {/* Quick Sample Data / Reset Menu */}
          <div className="hidden sm:flex items-center gap-1">
            <button
              onClick={onLoadSampleData}
              className="px-2.5 py-1.5 text-xs text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition font-medium flex items-center gap-1"
              title="Cargar datos de ejemplo genéricos"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Ejemplo</span>
            </button>
            <button
              onClick={onResetData}
              className="px-2.5 py-1.5 text-xs text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition font-medium flex items-center gap-1"
              title="Limpiar formulario"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Limpiar</span>
            </button>
          </div>

          {/* Main Download / Finalize Button */}
          <button
            id="btn-header-export"
            onClick={onOpenExportModal}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-5 py-2 rounded-lg font-semibold text-xs sm:text-sm transition-colors shadow-md shadow-blue-100 active:scale-95 shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Finalizar</span>
          </button>
        </div>
      </div>
    </header>
  );
};
