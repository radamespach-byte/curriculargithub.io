import React, { useState, useRef } from 'react';
import { CVData } from '../../types';
import { OsloTemplate } from './templates/OsloTemplate';
import { HarvardTemplate } from './templates/HarvardTemplate';
import { StockholmTemplate } from './templates/StockholmTemplate';
import { BerlinTemplate } from './templates/BerlinTemplate';
import { MadridTemplate } from './templates/MadridTemplate';
import { ViennaTemplate } from './templates/ViennaTemplate';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Eye, 
  Palette, 
  Layout, 
  Download, 
  Printer,
  Sparkles,
  Maximize2
} from 'lucide-react';
import { TEMPLATES_CONFIG, COLOR_PALETTES } from '../../data/initialData';

interface CVPreviewProps {
  data: CVData;
  onUpdateStyling: (styling: Partial<CVData['styling']>) => void;
  onOpenExportModal: () => void;
  onOpenTemplateModal: () => void;
  onOpenDesignModal: () => void;
}

export const CVPreview: React.FC<CVPreviewProps> = ({
  data,
  onUpdateStyling,
  onOpenExportModal,
  onOpenTemplateModal,
  onOpenDesignModal,
}) => {
  const [zoom, setZoom] = useState<number>(85);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const sheetRef = useRef<HTMLDivElement>(null);

  const renderTemplate = () => {
    switch (data.styling.templateId) {
      case 'oslo':
        return <OsloTemplate data={data} />;
      case 'harvard':
        return <HarvardTemplate data={data} />;
      case 'stockholm':
        return <StockholmTemplate data={data} />;
      case 'berlin':
        return <BerlinTemplate data={data} />;
      case 'madrid':
        return <MadridTemplate data={data} />;
      case 'vienna':
        return <ViennaTemplate data={data} />;
      default:
        return <OsloTemplate data={data} />;
    }
  };

  const getFontFamilyClass = () => {
    switch (data.styling.fontFamily) {
      case 'serif':
        return 'font-serif';
      case 'display':
        return 'font-["Outfit",sans-serif]';
      case 'mono':
        return 'font-mono';
      case 'sans':
      default:
        return 'font-["Plus_Jakarta_Sans",sans-serif]';
    }
  };

  const currentTemplate = TEMPLATES_CONFIG.find(t => t.id === data.styling.templateId);

  return (
    <div className={`relative flex flex-col h-full bg-slate-600 text-slate-100 ${isFullscreen ? 'fixed inset-0 z-50 bg-slate-900 p-4' : ''}`}>
      {/* Top Floating Toolbar */}
      <div className="bg-slate-800/90 backdrop-blur-sm border-b border-slate-700/80 px-4 py-2.5 flex items-center justify-between gap-2 flex-wrap shadow-sm z-10">
        {/* Left: Current template info & quick switch */}
        <div className="flex items-center gap-2">
          <button
            id="btn-open-templates"
            onClick={onOpenTemplateModal}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700/80 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-600 transition-colors shadow-xs"
            title="Cambiar plantilla de CV"
          >
            <Layout className="w-3.5 h-3.5 text-blue-400" />
            <span>Plantilla: <strong className="text-white">{currentTemplate?.name}</strong></span>
          </button>

          <button
            id="btn-open-design"
            onClick={onOpenDesignModal}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700/80 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-600 transition-colors shadow-xs"
            title="Personalizar color y fuentes"
          >
            <Palette className="w-3.5 h-3.5" style={{ color: data.styling.primaryColor }} />
            <span>Color & Fuente</span>
          </button>
        </div>

        {/* Center: Quick Color Chips */}
        <div className="hidden lg:flex items-center gap-1.5 bg-slate-900/60 px-2.5 py-1 rounded-lg border border-slate-700">
          <span className="text-[11px] text-slate-300 mr-1 font-medium">Color:</span>
          {COLOR_PALETTES.slice(0, 6).map((c) => (
            <button
              key={c.hex}
              onClick={() => onUpdateStyling({ primaryColor: c.hex })}
              title={c.name}
              className={`w-4 h-4 rounded-full transition transform hover:scale-110 ${
                data.styling.primaryColor === c.hex ? 'ring-2 ring-white scale-110' : 'opacity-80 hover:opacity-100'
              }`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>

        {/* Right: Zoom controls & Export */}
        <div className="flex items-center gap-2">
          {/* Zoom Buttons */}
          <div className="flex items-center bg-slate-700/80 rounded-lg p-0.5 border border-slate-600 text-xs">
            <button
              id="btn-zoom-out"
              onClick={() => setZoom(prev => Math.max(45, prev - 10))}
              className="p-1.5 hover:bg-slate-600 text-slate-300 hover:text-white rounded transition-colors"
              title="Reducir zoom"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 text-[11px] font-mono text-slate-200 select-none">{zoom}%</span>
            <button
              id="btn-zoom-in"
              onClick={() => setZoom(prev => Math.min(130, prev + 10))}
              className="p-1.5 hover:bg-slate-600 text-slate-300 hover:text-white rounded transition-colors"
              title="Aumentar zoom"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              id="btn-zoom-reset"
              onClick={() => setZoom(85)}
              className="p-1.5 hover:bg-slate-600 text-slate-300 hover:text-white rounded border-l border-slate-600 transition-colors"
              title="Restablecer zoom al 85%"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          {/* Fullscreen Toggle */}
          <button
            id="btn-fullscreen-toggle"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 bg-slate-700/80 hover:bg-slate-600 text-slate-300 hover:text-white rounded-lg border border-slate-600 text-xs transition-colors shadow-xs"
            title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>

          {/* Main Export Action */}
          <button
            id="btn-export-cv"
            onClick={onOpenExportModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Descargar PDF</span>
          </button>
        </div>
      </div>

      {/* Main Document Canvas Viewport */}
      <div className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center items-start bg-slate-500/90">
        <div 
          className="transition-transform duration-200 origin-top shadow-2xl rounded-xs"
          style={{ transform: `scale(${zoom / 100})` }}
        >
          {/* A4 Sheet Container */}
          <div
            id="cv-preview-sheet"
            ref={sheetRef}
            className={`w-[794px] min-h-[1123px] bg-white text-slate-900 shadow-2xl overflow-hidden rounded-xs border border-slate-200/50 print:m-0 print:border-0 print:shadow-none ${getFontFamilyClass()}`}
            style={{ 
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 0, 0, 0.1)' 
            }}
          >
            {renderTemplate()}
          </div>
        </div>
      </div>

      {/* Bottom Floating Pill Badge */}
      <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
        <div className="bg-white/20 backdrop-blur-md rounded-lg px-3.5 py-1.5 text-white text-xs font-medium border border-white/10 shadow-sm flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Vista Previa en Tiempo Real (A4)</span>
        </div>
      </div>

      {/* Bottom Right Floating Action Controls */}
      <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
        <button
          onClick={() => setZoom(prev => Math.min(130, prev + 10))}
          className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-700 hover:text-blue-600 transition-colors border border-slate-200 active:scale-95"
          title="Acercar (+)"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => setZoom(prev => Math.max(45, prev - 10))}
          className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-700 hover:text-blue-600 transition-colors border border-slate-200 active:scale-95"
          title="Alejar (-)"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={onOpenExportModal}
          className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-colors shadow-blue-500/20 active:scale-95"
          title="Descargar Currículum"
        >
          <Download className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
