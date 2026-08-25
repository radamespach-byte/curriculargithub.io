import React from 'react';
import { CVData } from '../../../types';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface TemplateProps {
  data: CVData;
}

export const HarvardTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, summary, experiences, education, skills, languages, customSections, styling } = data;
  const primaryColor = styling.primaryColor || '#1e3a8a';

  return (
    <div className="w-full min-h-[1050px] bg-white text-slate-900 p-10 font-serif text-[11.5px] leading-relaxed">
      {/* Header Centered */}
      <div className="text-center pb-4 border-b-2" style={{ borderColor: primaryColor }}>
        <h1 className="text-2xl font-bold uppercase tracking-wider text-slate-900">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <p className="text-xs font-semibold text-slate-700 mt-1 uppercase tracking-widest" style={{ color: primaryColor }}>
          {personalInfo.jobTitle}
        </p>

        {/* Contact list horizontal */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mt-2 text-[10.5px] text-slate-600 font-sans">
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3 text-slate-400" /> {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3 text-slate-400" /> {personalInfo.phone}
            </span>
          )}
          {(personalInfo.city || personalInfo.country) && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400" /> {[personalInfo.city, personalInfo.country].filter(Boolean).join(', ')}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1">
              <Linkedin className="w-3 h-3 text-slate-400" /> {personalInfo.linkedin.replace(/^https?:\/\//, '')}
            </span>
          )}
          {personalInfo.github && (
            <span className="flex items-center gap-1">
              <Github className="w-3 h-3 text-slate-400" /> {personalInfo.github.replace(/^https?:\/\//, '')}
            </span>
          )}
          {personalInfo.website && (
            <span className="flex items-center gap-1">
              <Globe className="w-3 h-3 text-slate-400" /> {personalInfo.website.replace(/^https?:\/\//, '')}
            </span>
          )}
        </div>
      </div>

      {/* Main Column Content */}
      <div className="mt-5 space-y-4">
        {/* Professional Summary */}
        {summary && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider pb-1 border-b mb-1.5" style={{ color: primaryColor, borderColor: `${primaryColor}40` }}>
              Resumen Profesional
            </h2>
            <p className="text-slate-800 text-justify leading-relaxed">
              {summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider pb-1 border-b mb-2" style={{ color: primaryColor, borderColor: `${primaryColor}40` }}>
              Experiencia Laboral
            </h2>
            <div className="space-y-3">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline font-bold text-slate-900">
                    <span className="text-xs">{exp.jobTitle}</span>
                    <span className="text-[10px] font-normal text-slate-600 font-sans">
                      {exp.startDate} – {exp.isCurrent ? 'Presente' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-[11px] italic text-slate-700 font-medium mb-1">
                    {exp.company} {exp.location ? `, ${exp.location}` : ''}
                  </div>
                  {exp.description && (
                    <div className="text-slate-800 whitespace-pre-line leading-relaxed pl-2 text-[11px]">
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
            <h2 className="text-xs font-bold uppercase tracking-wider pb-1 border-b mb-2" style={{ color: primaryColor, borderColor: `${primaryColor}40` }}>
              Educación y Formación
            </h2>
            <div className="space-y-2.5">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline font-bold text-slate-900">
                    <span className="text-xs">{edu.degree}</span>
                    <span className="text-[10px] font-normal text-slate-600 font-sans">
                      {edu.startDate} – {edu.isCurrent ? 'Cursando' : edu.endDate}
                    </span>
                  </div>
                  <div className="text-[11px] italic text-slate-700">
                    {edu.school} {edu.location ? `, ${edu.location}` : ''}
                  </div>
                  {edu.description && (
                    <p className="text-slate-800 text-[10.5px] mt-0.5 pl-2">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills & Languages in 2 Columns */}
        <div className="grid grid-cols-2 gap-6 pt-1">
          {skills.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider pb-1 border-b mb-2" style={{ color: primaryColor, borderColor: `${primaryColor}40` }}>
                Competencias
              </h2>
              <div className="flex flex-wrap gap-1.5 font-sans">
                {skills.map((skill) => (
                  <span 
                    key={skill.id} 
                    className="inline-block bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-[10.5px] font-medium border border-slate-200"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {languages.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider pb-1 border-b mb-2" style={{ color: primaryColor, borderColor: `${primaryColor}40` }}>
                Idiomas
              </h2>
              <ul className="space-y-1 font-sans text-[11px]">
                {languages.map((lang) => (
                  <li key={lang.id} className="flex justify-between border-b border-slate-100 pb-0.5">
                    <span className="font-medium text-slate-800">{lang.name}</span>
                    <span className="text-slate-500 text-[10px]">{lang.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Custom Sections */}
        {customSections.map((sec) => (
          sec.items.length > 0 && (
            <div key={sec.id}>
              <h2 className="text-xs font-bold uppercase tracking-wider pb-1 border-b mb-2" style={{ color: primaryColor, borderColor: `${primaryColor}40` }}>
                {sec.title}
              </h2>
              <div className="space-y-2">
                {sec.items.map((item) => (
                  <div key={item.id}>
                    <div className="flex justify-between items-baseline font-bold text-slate-900">
                      <span>{item.title}</span>
                      {item.date && <span className="text-[10px] font-normal text-slate-500 font-sans">{item.date}</span>}
                    </div>
                    {item.subtitle && <div className="text-[10.5px] italic text-slate-600">{item.subtitle}</div>}
                    {item.description && <p className="text-slate-800 text-[10.5px] mt-0.5 pl-2">{item.description}</p>}
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
