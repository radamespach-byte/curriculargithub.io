import React from 'react';
import { CVData } from '../../../types';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface TemplateProps {
  data: CVData;
}

export const StockholmTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, summary, experiences, education, skills, languages, customSections, styling } = data;
  const primaryColor = styling.primaryColor || '#0f766e';

  return (
    <div className="w-full min-h-[1050px] bg-slate-50/50 text-slate-800 p-9 font-sans text-xs leading-relaxed">
      {/* Top Header Card */}
      <div className="flex items-start justify-between gap-6 pb-6 border-b border-slate-200">
        <div className="space-y-1.5 flex-1">
          <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white" style={{ backgroundColor: primaryColor }}>
            Currículum Vitae
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <p className="text-sm font-semibold text-slate-600">
            {personalInfo.jobTitle}
          </p>

          {/* Contact pill grid */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 pt-2 text-[11px] text-slate-600">
            {personalInfo.email && (
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" /> {personalInfo.email}
              </span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" /> {personalInfo.phone}
              </span>
            )}
            {(personalInfo.city || personalInfo.country) && (
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" /> {[personalInfo.city, personalInfo.country].filter(Boolean).join(', ')}
              </span>
            )}
            {personalInfo.linkedin && (
              <span className="flex items-center gap-1.5">
                <Linkedin className="w-3.5 h-3.5 text-slate-400" /> {personalInfo.linkedin.replace(/^https?:\/\//, '')}
              </span>
            )}
            {personalInfo.github && (
              <span className="flex items-center gap-1.5">
                <Github className="w-3.5 h-3.5 text-slate-400" /> {personalInfo.github.replace(/^https?:\/\//, '')}
              </span>
            )}
            {personalInfo.website && (
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-slate-400" /> {personalInfo.website.replace(/^https?:\/\//, '')}
              </span>
            )}
          </div>
        </div>

        {personalInfo.showPhoto && personalInfo.photoUrl && (
          <img
            src={personalInfo.photoUrl}
            alt={personalInfo.firstName}
            className={`w-24 h-24 object-cover shadow-sm ring-4 ring-slate-100 ${
              styling.photoShape === 'circle' ? 'rounded-full' : styling.photoShape === 'rounded' ? 'rounded-2xl' : 'rounded-none'
            }`}
          />
        )}
      </div>

      {/* 2 Asymmetric Columns Layout */}
      <div className="grid grid-cols-12 gap-7 mt-6">
        {/* Left main content (8 cols) */}
        <div className="col-span-8 space-y-6">
          {/* Summary */}
          {summary && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }} />
                Sobre Mí
              </h2>
              <p className="text-slate-700 leading-relaxed text-[11.5px] bg-white p-3.5 rounded-lg border border-slate-200/80 shadow-xs">
                {summary}
              </p>
            </div>
          )}

          {/* Work Experience */}
          {experiences.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }} />
                Experiencia Laboral
              </h2>
              <div className="space-y-3.5">
                {experiences.map((exp) => (
                  <div key={exp.id} className="bg-white p-3.5 rounded-lg border border-slate-200/80 shadow-xs space-y-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-slate-900 text-xs">{exp.jobTitle}</h3>
                        <span className="text-[11px] font-semibold" style={{ color: primaryColor }}>
                          {exp.company} {exp.location ? `• ${exp.location}` : ''}
                        </span>
                      </div>
                      <span className="text-[10px] font-medium bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                        {exp.startDate} - {exp.isCurrent ? 'Actual' : exp.endDate}
                      </span>
                    </div>
                    {exp.description && (
                      <div className="text-slate-700 whitespace-pre-line text-[11px] pt-1 leading-relaxed">
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
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }} />
                Educación
              </h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="bg-white p-3 rounded-lg border border-slate-200/80 shadow-xs">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-slate-900 text-xs">{edu.degree}</h3>
                        <div className="text-[11px] text-slate-600">{edu.school} {edu.location ? `• ${edu.location}` : ''}</div>
                      </div>
                      <span className="text-[10px] text-slate-500">{edu.startDate} - {edu.isCurrent ? 'Actual' : edu.endDate}</span>
                    </div>
                    {edu.description && <p className="text-slate-700 text-[10.5px] mt-1">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right sidebar (4 cols) */}
        <div className="col-span-4 space-y-6">
          {/* Skills */}
          {skills.length > 0 && (
            <div className="bg-white p-4 rounded-lg border border-slate-200/80 shadow-xs">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 pb-1 border-b border-slate-100">
                Habilidades
              </h2>
              <div className="space-y-2.5">
                {skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between text-[11px] font-medium text-slate-700 mb-1">
                      <span>{skill.name}</span>
                      <span className="text-[10px] text-slate-400">{skill.level}/5</span>
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((lvl) => (
                        <div
                          key={lvl}
                          className="h-1.5 flex-1 rounded-full"
                          style={{
                            backgroundColor: lvl <= skill.level ? primaryColor : '#e2e8f0'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div className="bg-white p-4 rounded-lg border border-slate-200/80 shadow-xs">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 pb-1 border-b border-slate-100">
                Idiomas
              </h2>
              <div className="space-y-2">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between items-center text-[11px]">
                    <span className="font-semibold text-slate-800">{lang.name}</span>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                      {lang.level.split(' ')[0]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Custom Sections */}
          {customSections.map((sec) => (
            sec.items.length > 0 && (
              <div key={sec.id} className="bg-white p-4 rounded-lg border border-slate-200/80 shadow-xs">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 pb-1 border-b border-slate-100">
                  {sec.title}
                </h2>
                <div className="space-y-2.5">
                  {sec.items.map((item) => (
                    <div key={item.id} className="text-[11px]">
                      <div className="font-bold text-slate-900">{item.title}</div>
                      {item.subtitle && <div className="text-[10.5px] text-slate-600">{item.subtitle}</div>}
                      {item.date && <div className="text-[10px] text-slate-400">{item.date}</div>}
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
  );
};
