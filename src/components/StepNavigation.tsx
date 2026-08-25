import React from 'react';
import { StepId } from '../types';
import { 
  User, 
  FileText, 
  Briefcase, 
  GraduationCap, 
  Wrench, 
  Languages, 
  Award,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

interface StepNavigationProps {
  currentStep: StepId;
  onSelectStep: (step: StepId) => void;
}

export const STEPS: { id: StepId; label: string; shortLabel: string; icon: React.ElementType }[] = [
  { id: 'personal', label: '1. Datos de Contacto', shortLabel: 'Contacto', icon: User },
  { id: 'summary', label: '2. Perfil Profesional', shortLabel: 'Perfil', icon: FileText },
  { id: 'experience', label: '3. Experiencia', shortLabel: 'Experiencia', icon: Briefcase },
  { id: 'education', label: '4. Educación', shortLabel: 'Educación', icon: GraduationCap },
  { id: 'skills', label: '5. Habilidades', shortLabel: 'Habilidades', icon: Wrench },
  { id: 'languages', label: '6. Idiomas', shortLabel: 'Idiomas', icon: Languages },
  { id: 'sections', label: '7. Extra / Proyectos', shortLabel: 'Extra', icon: Award },
];

export const StepNavigation: React.FC<StepNavigationProps> = ({
  currentStep,
  onSelectStep,
}) => {
  const currentIndex = STEPS.findIndex((s) => s.id === currentStep);

  const handleNext = () => {
    if (currentIndex < STEPS.length - 1) {
      onSelectStep(STEPS[currentIndex + 1].id);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      onSelectStep(STEPS[currentIndex - 1].id);
    }
  };

  return (
    <div className="bg-white border-b border-slate-200 sticky top-16 z-30 shadow-xs">
      {/* Scrollable Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 overflow-x-auto no-scrollbar py-2 flex items-center gap-1 sm:gap-1.5">
        {STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isActive = currentStep === step.id;
          const isPassed = idx < currentIndex;

          return (
            <button
              key={step.id}
              onClick={() => onSelectStep(step.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors shrink-0 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-xs'
                  : isPassed
                  ? 'bg-blue-50/70 text-blue-800 hover:bg-blue-100/70 border border-blue-200/60'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-transparent'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : isPassed ? 'text-blue-600' : 'text-slate-400'}`} />
              <span className="hidden md:inline">{step.label}</span>
              <span className="md:hidden">{step.shortLabel}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
