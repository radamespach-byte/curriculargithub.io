import React, { useState, useEffect } from 'react';
import { CVData, StepId } from './types';
import { genericInitialCV, emptyInitialCV } from './data/initialData';
import { Header } from './components/Header';
import { StepNavigation, STEPS } from './components/StepNavigation';
import { PersonalInfoForm } from './components/forms/PersonalInfoForm';
import { SummaryForm } from './components/forms/SummaryForm';
import { ExperienceForm } from './components/forms/ExperienceForm';
import { EducationForm } from './components/forms/EducationForm';
import { SkillsForm } from './components/forms/SkillsForm';
import { LanguagesForm } from './components/forms/LanguagesForm';
import { CustomSectionsForm } from './components/forms/CustomSectionsForm';
import { CVPreview } from './components/preview/CVPreview';
import { TemplateSelectorModal } from './components/modals/TemplateSelectorModal';
import { DesignModal } from './components/modals/DesignModal';
import { ExportModal } from './components/modals/ExportModal';
import { ChevronLeft, ChevronRight, Eye, Layout, Palette, Download } from 'lucide-react';

const STORAGE_KEY = 'onlinecv_builder_draft_v1';

export default function App() {
  // Initialize state with stored data or generic sample data
  const [cvData, setCvData] = useState<CVData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return genericInitialCV;
  });

  const [currentStep, setCurrentStep] = useState<StepId>('personal');
  const [activeViewMode, setActiveViewMode] = useState<'split' | 'editor' | 'preview'>('split');

  // Modal visibility states
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isDesignModalOpen, setIsDesignModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Auto-save to localStorage on every state change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cvData));
    } catch (e) {
      console.error('Error saving draft:', e);
    }
  }, [cvData]);

  // Handlers for CV Data updates
  const updatePersonalInfo = (info: Partial<CVData['personalInfo']>) => {
    setCvData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info },
    }));
  };

  const updateSummary = (summary: string) => {
    setCvData((prev) => ({ ...prev, summary }));
  };

  const updateExperiences = (experiences: CVData['experiences']) => {
    setCvData((prev) => ({ ...prev, experiences }));
  };

  const updateEducation = (education: CVData['education']) => {
    setCvData((prev) => ({ ...prev, education }));
  };

  const updateSkills = (skills: CVData['skills']) => {
    setCvData((prev) => ({ ...prev, skills }));
  };

  const updateLanguages = (languages: CVData['languages']) => {
    setCvData((prev) => ({ ...prev, languages }));
  };

  const updateCustomSections = (customSections: CVData['customSections']) => {
    setCvData((prev) => ({ ...prev, customSections }));
  };

  const updateStyling = (styling: Partial<CVData['styling']>) => {
    setCvData((prev) => ({
      ...prev,
      styling: { ...prev.styling, ...styling },
    }));
  };

  const updateDocumentTitle = (title: string) => {
    setCvData((prev) => ({ ...prev, documentTitle: title }));
  };

  const handleLoadSampleData = () => {
    if (window.confirm('¿Deseas rellenar el currículum con datos genéricos de ejemplo?')) {
      setCvData(genericInitialCV);
    }
  };

  const handleResetData = () => {
    if (window.confirm('¿Estás seguro de que deseas vaciar todos los campos del currículum?')) {
      setCvData(emptyInitialCV);
    }
  };

  const handleImportData = (newData: CVData) => {
    setCvData(newData);
  };

  // Step navigation helper
  const currentStepIndex = STEPS.findIndex((s) => s.id === currentStep);
  const nextStep = currentStepIndex < STEPS.length - 1 ? STEPS[currentStepIndex + 1] : null;
  const prevStep = currentStepIndex > 0 ? STEPS[currentStepIndex - 1] : null;

  // Render current active form
  const renderCurrentForm = () => {
    switch (currentStep) {
      case 'personal':
        return (
          <PersonalInfoForm
            personalInfo={cvData.personalInfo}
            styling={cvData.styling}
            onChange={updatePersonalInfo}
            onStylingChange={updateStyling}
          />
        );
      case 'summary':
        return (
          <SummaryForm
            summary={cvData.summary}
            onChange={updateSummary}
          />
        );
      case 'experience':
        return (
          <ExperienceForm
            experiences={cvData.experiences}
            onChange={updateExperiences}
          />
        );
      case 'education':
        return (
          <EducationForm
            education={cvData.education}
            onChange={updateEducation}
          />
        );
      case 'skills':
        return (
          <SkillsForm
            skills={cvData.skills}
            onChange={updateSkills}
          />
        );
      case 'languages':
        return (
          <LanguagesForm
            languages={cvData.languages}
            onChange={updateLanguages}
          />
        );
      case 'sections':
        return (
          <CustomSectionsForm
            customSections={cvData.customSections}
            onChange={updateCustomSections}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex flex-col font-sans text-slate-800">
      {/* Top Main Navigation Header */}
      <Header
        cvData={cvData}
        onUpdateTitle={updateDocumentTitle}
        onOpenTemplateModal={() => setIsTemplateModalOpen(true)}
        onOpenDesignModal={() => setIsDesignModalOpen(true)}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        onLoadSampleData={handleLoadSampleData}
        onResetData={handleResetData}
        activeViewMode={activeViewMode}
        onViewModeChange={setActiveViewMode}
      />

      {/* Step Navigator Bar */}
      <StepNavigation
        currentStep={currentStep}
        onSelectStep={setCurrentStep}
      />

      {/* Main Workspace: Split Screen Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Form Editor Panel */}
        <div
          className={`lg:col-span-6 flex flex-col bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden ${
            activeViewMode === 'preview' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {/* Form Content Area */}
          <div className="p-5 sm:p-7 flex-1 min-h-[550px]">
            {renderCurrentForm()}
          </div>

          {/* Form Footer Navigation (Paso Anterior / Siguiente) */}
          <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
            {prevStep ? (
              <button
                type="button"
                onClick={() => setCurrentStep(prevStep.id)}
                className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg border border-slate-300 transition-colors shadow-xs"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Anterior: {prevStep.shortLabel}</span>
              </button>
            ) : (
              <div />
            )}

            {nextStep ? (
              <button
                type="button"
                onClick={() => setCurrentStep(nextStep.id)}
                className="flex items-center gap-1.5 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm shadow-blue-100 transition-colors active:scale-95 ml-auto"
              >
                <span>Siguiente: {nextStep.shortLabel}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsExportModalOpen(true)}
                className="flex items-center gap-1.5 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm shadow-emerald-100 transition-colors active:scale-95 ml-auto"
              >
                <Download className="w-4 h-4" />
                <span>¡Finalizar y Descargar!</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Side: Live A4 Document Preview */}
        <div
          className={`lg:col-span-6 sticky top-32 h-[calc(100vh-160px)] min-h-[600px] rounded-xl overflow-hidden shadow-sm border border-slate-300/80 ${
            activeViewMode === 'editor' ? 'hidden lg:block' : 'block'
          }`}
        >
          <CVPreview
            data={cvData}
            onUpdateStyling={updateStyling}
            onOpenExportModal={() => setIsExportModalOpen(true)}
            onOpenTemplateModal={() => setIsTemplateModalOpen(true)}
            onOpenDesignModal={() => setIsDesignModalOpen(true)}
          />
        </div>
      </main>

      {/* Floating Action Buttons for quick access on smaller screens */}
      <div className="lg:hidden fixed bottom-5 right-5 z-40 flex flex-col gap-2">
        <button
          onClick={() => setActiveViewMode(activeViewMode === 'preview' ? 'editor' : 'preview')}
          className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-transform active:scale-95"
          title={activeViewMode === 'preview' ? 'Volver al editor' : 'Ver hoja de CV'}
        >
          {activeViewMode === 'preview' ? <ChevronLeft className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
        </button>
      </div>

      {/* Modals */}
      <TemplateSelectorModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        selectedTemplateId={cvData.styling.templateId}
        onSelectTemplate={(id) => updateStyling({ templateId: id })}
      />

      <DesignModal
        isOpen={isDesignModalOpen}
        onClose={() => setIsDesignModalOpen(false)}
        styling={cvData.styling}
        onChange={updateStyling}
      />

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        cvData={cvData}
        onImportData={handleImportData}
      />
    </div>
  );
}
