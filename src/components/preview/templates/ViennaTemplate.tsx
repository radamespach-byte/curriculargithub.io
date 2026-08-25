import React from 'react';
import { CVData } from '../../../types';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Terminal, Code2 } from 'lucide-react';

interface TemplateProps {
  data: CVData;
}

export const ViennaTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, summary, experiences, education, skills, languages, customSections, styling } = data;
  const primaryColor = styling.primaryColor || '#059669';

  return (
    <div className="w-full min-h-[1050px] bg-white text-slate-900 p-7 font-sans text-xs leading-snug">
      {/* Header Compact */}
      <div className="border border-slate-200 bg-slate-50/70 rounded-lg p-4 mb-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4" style={{ color: primaryColor }} />
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                {personalInfo.firstName} {personalInfo.lastName}
              </h1>
            </div>
            <p className="text-xs font-semibold mt-0.5" style={{ color: primaryColor }}>
              {personalInfo.jobTitle}
            </p>
          </div>

          {personalInfo.showPhoto && personalInfo.photoUrl && (
            <img
              src={personalInfo.photoUrl}
              alt={personalInfo.firstName}
              className={`w-16 h-16 object-cover border border-slate-300 ${
                styling.photoShape === 'circle' ? 'rounded-full' : styling.photoShape === 'rounded' ? 'rounded-md' : 'rounded-none'
              }`}
            />
          )}
        </div>

        {/* Contact Links Row */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2.5 pt-2 border-t border-slate-200/80 text-[10.5px] text-slate-600">
          {personalInfo.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-slate-400" />{personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-slate-400" />{personalInfo.phone}</span>}
          {(personalInfo.city || personalInfo.country) && (
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-slate-400" />{[personalInfo.city, personalInfo.country].filter(Boolean).join(', ')}</span>
          )}
          {personalInfo.github && <span className="flex items-center gap-1 font-mono text-[10px]"><Github className="w-3 h-3 text-slate-400" />{personalInfo.github.replace(/^https?:\/\//, '')}</span>}
          {personalInfo.linkedin && <span className="flex items-center gap-1"><Linkedin className="w-3 h-3 text-slate-400" />{personalInfo.linkedin.replace(/^https?:\/\//, '')}</span>}
          {personalInfo.website && <span className="flex items-center gap-1"><Globe className="w-3 h-3 text-slate-400" />{personalInfo.website.replace(/^https?:\/\//, '')}</span>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-4">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: primaryColor }} />
            Extracto
          </div>
          <p className="text-slate-700 text-[11px] leading-relaxed">
            {summary}
          </p>
        </div>
      )}

      {/* Grid: 2 Columns */}
      <div className="grid grid-cols-12 gap-5">
        {/* Left Col (8 cols) */}
        <div className="col-span-8 space-y-4">
          {/* Experience */}
          {experiences.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-800 pb-1 mb-2 border-b border-slate-200 flex items-center justify-between">
                <span>Experiencia Laboral</span>
                <span className="text-[9px] font-mono text-slate-400">HISTORIAL</span>
              </div>
              <div className="space-y-3">
                {experiences.map((exp) => (
                  <div key={exp.id} className="text-[11px]">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-slate-900">{exp.jobTitle}</span>
                      <span className="text-[9.5px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                        {exp.startDate} - {exp.isCurrent ? 'Presente' : exp.endDate}
                      </span>
                    </div>
                    <div className="font-medium text-[10.5px] mb-1" style={{ color: primaryColor }}>
                      {exp.company} {exp.location ? `• ${exp.location}` : ''}
                    </div>
                    {exp.description && (
                      <div className="text-slate-700 whitespace-pre-line text-[10.5px] leading-relaxed">
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
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-800 pb-1 mb-2 border-b border-slate-200">
                Educación
              </div>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id} className="text-[11px]">
                    <div className="flex justify-between items-baseline font-bold text-slate-900">
                      <span>{edu.degree}</span>
                      <span className="text-[9.5px] font-mono text-slate-500">{edu.startDate} - {edu.isCurrent ? 'Actual' : edu.endDate}</span>
                    </div>
                    <div className="text-slate-600 text-[10.5px]">{edu.school} {edu.location ? `• ${edu.location}` : ''}</div>
                    {edu.description && <p className="text-slate-700 text-[10px] mt-0.5">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Col (4 cols) */}
        <div className="col-span-4 space-y-4">
          {/* Skills Tech Tags */}
          {skills.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-800 pb-1 mb-2 border-b border-slate-200 flex items-center gap-1">
                <Code2 className="w-3 h-3" style={{ color: primaryColor }} />
                <span>Stack / Skills</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-[10px] font-medium text-slate-800"
                  >
                    <span>{skill.name}</span>
                    <span className="text-[8.5px] text-emerald-700 font-bold">★{skill.level}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-800 pb-1 mb-2 border-b border-slate-200">
                Idiomas
              </div>
              <div className="space-y-1 text-[10.5px]">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between items-center border-b border-slate-100 pb-1">
                    <span className="font-semibold text-slate-800">{lang.name}</span>
                    <span className="text-[9.5px] text-slate-500 font-mono">{lang.level.split(' ')[0]}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Custom Sections */}
          {customSections.map((sec) => (
            sec.items.length > 0 && (
              <div key={sec.id}>
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-800 pb-1 mb-2 border-b border-slate-200">
                  {sec.title}
                </div>
                <div className="space-y-2">
                  {sec.items.map((item) => (
                    <div key={item.id} className="text-[10.5px]">
                      <div className="font-bold text-slate-900">{item.title}</div>
                      {item.subtitle && <div className="text-[10px] text-slate-600">{item.subtitle}</div>}
                      {item.description && <p className="text-slate-700 text-[9.5px] mt-0.5">{item.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};
