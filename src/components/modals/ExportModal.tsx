import React, { useEffect } from 'react';
import { CVData } from '../../types';
import { X, Download, Printer, FileJson, CheckCircle2, AlertCircle, ShieldCheck, Sparkles, Upload } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  cvData: CVData;
  onImportData: (data: CVData) => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  cvData,
  onImportData,
}) => {
  useEffect(() => {
    if (isOpen) {
      // Fire subtle celebratory confetti
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2563eb', '#38bdf8', '#34d399', '#f59e0b'],
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePrintPDF = () => {
    window.print();
  };

  const handleDownloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(cvData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${cvData.documentTitle.replace(/\s+/g, '_')}_Backup.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleJSONUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed && parsed.personalInfo) {
            onImportData(parsed);
            onClose();
          }
        } catch {
          alert('El archivo seleccionado no tiene un formato de currículum válido.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-300" />
              <h2 className="text-xl font-bold">¡Tu CV está listo para exportar!</h2>
            </div>
            <p className="text-xs text-blue-100 mt-1">
              Descarga tu documento en formato PDF de alta resolución o guarda una copia de seguridad.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Options */}
        <div className="p-6 space-y-4">
          {/* Primary Action: Print / PDF */}
          <button
            onClick={handlePrintPDF}
            className="w-full p-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl shadow-md flex items-center justify-between group transition transform active:scale-[0.99]"
          >
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center text-white">
                <Printer className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Descargar como PDF / Imprimir</h3>
                <p className="text-xs text-blue-100">
                  Guarda en PDF vectorial nítido para enviar a empresas o imprimir en papel A4.
                </p>
              </div>
            </div>
            <Download className="w-5 h-5 text-white/80 group-hover:text-white group-hover:translate-x-0.5 transition" />
          </button>

          {/* Secondary Action: Backup JSON */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleDownloadJSON}
              className="p-3.5 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-xl border border-slate-200 flex items-center gap-2.5 transition text-left"
            >
              <FileJson className="w-5 h-5 text-amber-600 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">Guardar Backup JSON</h4>
                <p className="text-[10px] text-slate-500">Para editarlo más adelante</p>
              </div>
            </button>

            <label className="p-3.5 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-xl border border-slate-200 flex items-center gap-2.5 transition text-left cursor-pointer">
              <Upload className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">Restaurar desde JSON</h4>
                <p className="text-[10px] text-slate-500">Cargar datos guardados</p>
              </div>
              <input
                type="file"
                accept=".json"
                onChange={handleJSONUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Quality & ATS Guarantees */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2 mt-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Garantía de Formato Profesional</span>
            </div>
            <ul className="text-[11px] text-slate-600 space-y-1 pl-6 list-disc">
              <li>Estructura compatible con lectores automáticos de currículum (ATS).</li>
              <li>Tipografías vectoriales escalables a cualquier resolución de impresión.</li>
              <li>Sin marcas de agua ni restricciones de uso comercial.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-lg transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
