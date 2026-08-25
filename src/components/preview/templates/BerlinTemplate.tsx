import React from 'react';
import { CVData } from '../../../types';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Sparkles } from 'lucide-react';

interface TemplateProps {
  data: CVData;
}

export const BerlinTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, summary, experiences, education, skills, languages, customSections, styling } = data;
  const primaryColor = styling.primaryColor || '#7c3aed';

  return (
    <div className="w-full min-h-[1050px] bg-white text-slate-800 font-sans text-xs leading-relaxed">
      {/* Top Bold Hero Banner */}
      <div 
        className="p-8 text-white relative overflow-hidden"
        style={{ backgroundColor: primaryColor }}
      >
        <div className="flex items-center justify-between gap-6 relative z-10">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight">
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            <p className="text-sm font-medium text-white/90 tracking-wide">
              {personalInfo.jobTitle}
            </p>

            <div className="flex flex-wrap gap-x-4 gap-y-1 pt-3 text-[11px] text-white/80">
              {personalInfo.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{personalInfo.email}</span>}
              {personalInfo.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{personalInfo.phone}</span>}
              {(personalInfo.city || personalInfo.country) && (
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{[personalInfo.city, personalInfo.country].filter(Boolean).join(', ')}</span>
              )}
              {personalInfo.linkedin && <span className="flex items-center gap-1"><Linkedin className="w-3 h-3" />{personalInfo.linkedin.replace(/^https?:\/\//, '')}</span>}
              {personalInfo.github && <span className="flex items-center gap-1"><Github className="w-3 h-3" />{personalInfo.github.replace(/^https?:\/\//, '')}</span>}
              {personalInfo.website && <span className="flex items-center gap-1"><Globe className="w-3 h-3" />{personalInfo.website.replace(/^https?:\/\//, '')}</span>}
            </div>
          </div>

          {personalInfo.showPhoto && personalInfo.photoUrl && (
            <img
              src={personalInfo.photoUrl}
              alt={personalInfo.firstName}
              className={`w-24 h-24 object-cover border-4 border-white shadow-xl ${
                styling.photoShape === 'circle' ? 'rounded-full' : styling.photoShape === 'rounded' ? 'rounded-xl' : 'rounded-none'
              }`}
            />
          )}
        </div>
      </div>

      {/* Body Content */}
      <div className="p-8 space-y-6">
        {/* Summary */}
        {summary && (
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1 flex items-center gap-1.5" style={{ color: primaryColor }}>
              <Sparkles className="w-3.5 h-3.5" />
              Perfil
            </h2>
            <p className="text-slate-700 text-[11.5px] leading-relaxed">
              {summary}
            </p>
          </div>
        )}

        {/* 2 Columns: Main & Side */}
        <div className="grid grid-cols-12 gap-6">
          {/* Main (7 cols) */}
          <div className="col-span-7 space-y-6">
            {/* Experience */}
            {experiences.length > 0 && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider pb-1 mb-3 border-b-2" style={{ color: primaryColor, borderColor: primaryColor }}>
                  Experiencia Laboral
                </h2>
                <div className="space-y-4">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="space-y-0.5">
                      <div className="flex justify-between items-baseline font-bold text-slate-900">
                        <span className="text-xs">{exp.jobTitle}</span>
                        <span className="text-[10px] font-medium text-slate-400">
                          {exp.startDate} - {exp.isCurrent ? 'Actual' : exp.endDate}
                        </span>
                      </div>
                      <div className="text-[11px] font-semibold" style={{ color: primaryColor }}>
                        {exp.company} {exp.location ? `• ${exp.location}` : ''}
                      </div>
                      {exp.description && (
                        <div className="text-slate-700 whitespace-pre-line text-[11px] pt-1">
                          {exp.description}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {education.length > 0 && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider pb-1 mb-3 border-b-2" style={{ color: primaryColor, borderColor: primaryColor }}>
                  Educación
                </h2>
                <div className="space-y-3">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <div className="flex justify-between items-baseline font-bold text-slate-900">
                        <span className="text-xs">{edu.degree}</span>
                        <span className="text-[10px] text-slate-400">{edu.startDate} - {edu.isCurrent ? 'Actual' : edu.endDate}</span>
                      </div>
                      <div className="text-[11px] text-slate-600">{edu.school}</div>
                      {edu.description && <p className="text-slate-700 text-[10.5px] mt-0.5">{edu.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Side (5 cols) */}
          <div className="col-span-5 space-y-6">
            {/* Skills Badge Cloud */}
            {skills.length > 0 && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider pb-1 mb-3 border-b-2" style={{ color: primaryColor, borderColor: primaryColor }}>
                  Habilidades Clave
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((skill) => (
                    <span
                      key={skill.id}
                      className="px-2.5 py-1 rounded-md text-[10.5px] font-semibold border"
                      style={{
                        backgroundColor: `${primaryColor}10`,
                        borderColor: `${primaryColor}30`,
                        color: primaryColor
                      }}
                    >
                      {skill.name} • {skill.level}/5
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider pb-1 mb-3 border-b-2" style={{ color: primaryColor, borderColor: primaryColor }}>
                  Idiomas
                </h2>
                <div className="space-y-1.5">
                  {languages.map((lang) => (
                    <div key={lang.id} className="flex justify-between items-center text-[11px] bg-slate-50 p-2 rounded border border-slate-200">
                      <span className="font-bold text-slate-800">{lang.name}</span>
                      <span className="text-[10px] text-slate-600">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Sections */}
            {customSections.map((sec) => (
              sec.items.length > 0 && (
                <div key={sec.id}>
                  <h2 className="text-xs font-bold uppercase tracking-wider pb-1 mb-3 border-b-2" style={{ color: primaryColor, borderColor: primaryColor }}>
                    {sec.title}
                  </h2>
                  <div className="space-y-2">
                    {sec.items.map((item) => (
                      <div key={item.id} className="text-[11px] bg-slate-50 p-2 rounded border border-slate-200">
                        <div className="font-bold text-slate-900">{item.title}</div>
                        {item.subtitle && <div className="text-[10.5px] text-slate-600">{item.subtitle}</div>}
                        {item.description && <p className="text-slate-700 text-[10.5px] mt-0.5">{item.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
