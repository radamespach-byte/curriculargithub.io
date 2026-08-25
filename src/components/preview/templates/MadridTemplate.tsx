import React from 'react';
import { CVData } from '../../../types';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface TemplateProps {
  data: CVData;
}

export const MadridTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, summary, experiences, education, skills, languages, customSections, styling } = data;
  const primaryColor = styling.primaryColor || '#0f172a';

  return (
    <div className="w-full min-h-[1050px] bg-white text-slate-800 p-8 font-sans text-xs leading-relaxed">
      {/* Top Header with Dark Bar */}
      <div className="border-t-8 pt-5 pb-4 border-b-2" style={{ borderColor: primaryColor }}>
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-black uppercase tracking-wider text-slate-900">
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            <p className="text-xs font-bold tracking-widest uppercase text-slate-600 mt-0.5">
              {personalInfo.jobTitle}
            </p>
          </div>
          {personalInfo.showPhoto && personalInfo.photoUrl && (
            <img
              src={personalInfo.photoUrl}
              alt={personalInfo.firstName}
              className={`w-20 h-20 object-cover border-2 border-slate-300 ${
                styling.photoShape === 'circle' ? 'rounded-full' : styling.photoShape === 'rounded' ? 'rounded-lg' : 'rounded-none'
              }`}
            />
          )}
        </div>

        {/* Contact info row */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mt-3 pt-2 text-[10.5px] text-slate-600 border-t border-slate-100">
          {personalInfo.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-slate-400" />{personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-slate-400" />{personalInfo.phone}</span>}
          {(personalInfo.city || personalInfo.country) && (
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-slate-400" />{[personalInfo.city, personalInfo.country].filter(Boolean).join(', ')}</span>
          )}
          {personalInfo.linkedin && <span className="flex items-center gap-1"><Linkedin className="w-3 h-3 text-slate-400" />{personalInfo.linkedin.replace(/^https?:\/\//, '')}</span>}
          {personalInfo.github && <span className="flex items-center gap-1"><Github className="w-3 h-3 text-slate-400" />{personalInfo.github.replace(/^https?:\/\//, '')}</span>}
          {personalInfo.website && <span className="flex items-center gap-1"><Globe className="w-3 h-3 text-slate-400" />{personalInfo.website.replace(/^https?:\/\//, '')}</span>}
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="mt-5 space-y-5">
        {/* Summary */}
        {summary && (
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 bg-slate-900" style={{ backgroundColor: primaryColor }} />
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-900">
                Perfil Ejecutivo
              </h2>
            </div>
            <p className="text-slate-700 text-[11px] leading-relaxed text-justify pl-4 border-l border-slate-200">
              {summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 bg-slate-900" style={{ backgroundColor: primaryColor }} />
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-900">
                Trayectoria Profesional
              </h2>
            </div>
            <div className="space-y-3.5 pl-4 border-l border-slate-200">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-slate-900 text-xs">{exp.jobTitle}</h3>
                    <span className="text-[10px] font-semibold text-slate-500">
                      {exp.startDate} — {exp.isCurrent ? 'Presente' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-[11px] font-semibold text-slate-600 mb-0.5">
                    {exp.company} {exp.location ? `| ${exp.location}` : ''}
                  </div>
                  {exp.description && (
                    <div className="text-slate-700 whitespace-pre-line text-[11px] leading-relaxed">
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
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 bg-slate-900" style={{ backgroundColor: primaryColor }} />
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-900">
                Formación Académica
              </h2>
            </div>
            <div className="space-y-2 pl-4 border-l border-slate-200">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900 text-xs">{edu.degree}</span>
                    <span className="text-[10px] text-slate-500">{edu.startDate} — {edu.isCurrent ? 'Presente' : edu.endDate}</span>
                  </div>
                  <div className="text-[11px] text-slate-600">{edu.school} {edu.location ? `| ${edu.location}` : ''}</div>
                  {edu.description && <p className="text-slate-700 text-[10.5px] mt-0.5">{edu.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills & Languages Grid */}
        <div className="grid grid-cols-2 gap-6 pl-4 border-l border-slate-200">
          {skills.length > 0 && (
            <div>
              <h3 className="text-[11px] font-black uppercase tracking-wider text-slate-900 mb-2">
                Habilidades y Conocimientos
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <span key={skill.id} className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-[10.5px] font-medium border border-slate-200">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {languages.length > 0 && (
            <div>
              <h3 className="text-[11px] font-black uppercase tracking-wider text-slate-900 mb-2">
                Idiomas
              </h3>
              <div className="space-y-1 text-[11px]">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between">
                    <span className="font-medium text-slate-800">{lang.name}</span>
                    <span className="text-slate-500 text-[10px] font-medium">{lang.level}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Custom Sections */}
        {customSections.map((sec) => (
          sec.items.length > 0 && (
            <div key={sec.id}>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 bg-slate-900" style={{ backgroundColor: primaryColor }} />
                <h2 className="text-xs font-black uppercase tracking-wider text-slate-900">
                  {sec.title}
                </h2>
              </div>
              <div className="space-y-2 pl-4 border-l border-slate-200">
                {sec.items.map((item) => (
                  <div key={item.id}>
                    <div className="flex justify-between items-baseline font-bold text-slate-900">
                      <span>{item.title}</span>
                      {item.date && <span className="text-[10px] text-slate-500 font-normal">{item.date}</span>}
                    </div>
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
  );
};
