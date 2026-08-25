import React, { useRef } from 'react';
import { PersonalInfo, StylingConfig } from '../../types';
import { User, Mail, Phone, MapPin, Globe, Linkedin, Github, Camera, Sparkles, Image, Check, Eye, EyeOff } from 'lucide-react';

interface PersonalInfoFormProps {
  personalInfo: PersonalInfo;
  styling: StylingConfig;
  onChange: (info: Partial<PersonalInfo>) => void;
  onStylingChange: (styling: Partial<StylingConfig>) => void;
}

const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80'
];

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  personalInfo,
  styling,
  onChange,
  onStylingChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onChange({ photoUrl: event.target.result as string, showPhoto: true });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600" />
          Datos Personales y de Contacto
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Introduce tu información de contacto profesional para que los reclutadores puedan comunicarse contigo fácilmente.
        </p>
      </div>

      {/* Photo Uploader and Options */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
            <Camera className="w-4 h-4 text-slate-600" />
            Fotografía de Perfil (Opcional)
          </span>
          <button
            type="button"
            onClick={() => onChange({ showPhoto: !personalInfo.showPhoto })}
            className="flex items-center gap-1 text-xs text-slate-600 hover:text-blue-600 font-medium transition"
          >
            {personalInfo.showPhoto ? (
              <>
                <Eye className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-blue-600">Visible en CV</span>
              </>
            ) : (
              <>
                <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                <span>Oculta</span>
              </>
            )}
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {/* Current Avatar */}
          <div className="relative group">
            <div className={`w-16 h-16 bg-slate-200 overflow-hidden border-2 border-white shadow-sm ${
              styling.photoShape === 'circle' ? 'rounded-full' : styling.photoShape === 'rounded' ? 'rounded-xl' : 'rounded-none'
            }`}>
              {personalInfo.photoUrl ? (
                <img
                  src={personalInfo.photoUrl}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  <User className="w-8 h-8" />
                </div>
              )}
            </div>
          </div>

          {/* Upload Button */}
          <div className="flex flex-col gap-1.5 flex-1">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />
            <div className="flex gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg border border-slate-300 shadow-xs transition"
              >
                Subir foto desde equipo
              </button>
              {personalInfo.photoUrl && (
                <button
                  type="button"
                  onClick={() => onChange({ photoUrl: '', showPhoto: false })}
                  className="px-2.5 py-1.5 text-red-600 hover:text-red-700 text-xs font-medium transition"
                >
                  Quitar foto
                </button>
              )}
            </div>

            {/* Shape options */}
            <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-600">
              <span>Forma:</span>
              {(['circle', 'rounded', 'square'] as const).map((shape) => (
                <button
                  key={shape}
                  type="button"
                  onClick={() => onStylingChange({ photoShape: shape })}
                  className={`px-2 py-0.5 rounded capitalize ${
                    styling.photoShape === shape ? 'bg-blue-100 text-blue-700 font-bold' : 'bg-slate-200/70 text-slate-700'
                  }`}
                >
                  {shape === 'circle' ? 'Circular' : shape === 'rounded' ? 'Redondeado' : 'Cuadrado'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Quick generic avatars */}
        <div className="pt-2 border-t border-slate-200">
          <span className="text-[11px] text-slate-500 block mb-1.5">O elige un avatar de muestra genérico:</span>
          <div className="flex gap-2">
            {AVATAR_PRESETS.map((url, i) => (
              <button
                key={i}
                type="button"
                onClick={() => onChange({ photoUrl: url, showPhoto: true })}
                className={`w-7 h-7 rounded-full overflow-hidden border transition ${
                  personalInfo.photoUrl === url ? 'ring-2 ring-blue-500 border-transparent scale-110' : 'border-slate-300 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={url} alt={`Preset ${i}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Form Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* First Name */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Nombre <span className="text-red-500">*</span>
          </label>
          <input
            id="input-firstname"
            type="text"
            value={personalInfo.firstName}
            onChange={(e) => onChange({ firstName: e.target.value })}
            placeholder="Ej. Juan"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Apellidos <span className="text-red-500">*</span>
          </label>
          <input
            id="input-lastname"
            type="text"
            value={personalInfo.lastName}
            onChange={(e) => onChange({ lastName: e.target.value })}
            placeholder="Ej. Pérez García"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
          />
        </div>

        {/* Job Title */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Puesto o Titular Profesional <span className="text-red-500">*</span>
          </label>
          <input
            id="input-jobtitle"
            type="text"
            value={personalInfo.jobTitle}
            onChange={(e) => onChange({ jobTitle: e.target.value })}
            placeholder="Ej. Desarrollador Full Stack / Especialista en Marketing"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Correo Electrónico <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              id="input-email"
              type="email"
              value={personalInfo.email}
              onChange={(e) => onChange({ email: e.target.value })}
              placeholder="juan.perez@ejemplo.com"
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Teléfono de Contacto
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              id="input-phone"
              type="tel"
              value={personalInfo.phone}
              onChange={(e) => onChange({ phone: e.target.value })}
              placeholder="+34 600 123 456"
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
            />
          </div>
        </div>

        {/* City */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Ciudad
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              id="input-city"
              type="text"
              value={personalInfo.city}
              onChange={(e) => onChange({ city: e.target.value })}
              placeholder="Madrid"
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
            />
          </div>
        </div>

        {/* Country */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            País
          </label>
          <input
            id="input-country"
            type="text"
            value={personalInfo.country}
            onChange={(e) => onChange({ country: e.target.value })}
            placeholder="España"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
          />
        </div>

        {/* Postal Code */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Código Postal
          </label>
          <input
            id="input-postalcode"
            type="text"
            value={personalInfo.postalCode}
            onChange={(e) => onChange({ postalCode: e.target.value })}
            placeholder="28001"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
          />
        </div>

        {/* Website / Portfolio */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Sitio Web / Portfolio
          </label>
          <div className="relative">
            <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              id="input-website"
              type="text"
              value={personalInfo.website}
              onChange={(e) => onChange({ website: e.target.value })}
              placeholder="https://misitioweb.com"
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
            />
          </div>
        </div>

        {/* LinkedIn */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Perfil de LinkedIn
          </label>
          <div className="relative">
            <Linkedin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              id="input-linkedin"
              type="text"
              value={personalInfo.linkedin}
              onChange={(e) => onChange({ linkedin: e.target.value })}
              placeholder="linkedin.com/in/usuario"
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
            />
          </div>
        </div>

        {/* GitHub / Red Social */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            GitHub u otra red profesional
          </label>
          <div className="relative">
            <Github className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              id="input-github"
              type="text"
              value={personalInfo.github}
              onChange={(e) => onChange({ github: e.target.value })}
              placeholder="github.com/usuario"
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
