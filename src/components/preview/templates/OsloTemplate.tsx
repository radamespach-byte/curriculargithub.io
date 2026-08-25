import React from 'react';
import { CVData } from '../../../types';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Calendar, Briefcase, GraduationCap, Award, CheckCircle2 } from 'lucide-react';

interface TemplateProps {
  data: CVData;
}

export const OsloTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, summary, experiences, education, skills, languages, customSections, styling } = data;
  const primaryColor = styling.primaryColor || '#2563eb';

  return (
    <div className="w-full min-h-[1050px] bg-white text-slate-800 grid grid-cols-12 font-sans text-xs leading-relaxed">
      {/* Left Sidebar (4 cols) */}
      <div 
        className="col-span-4 p-6 text-white flex flex-col justify-between"
        style={{ backgroundColor: primaryColor }}
      >
        <div className="space-y-6">
          {/* Photo */}
          {personalInfo.showPhoto && personalInfo.photoUrl && (
            <div className="flex justify-center">
              <img
                src={personalInfo.photoUrl}
                alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
                className={`w-28 h-28 object-cover border-4 border-white/30 shadow-md ${
                  styling.photoShape === 'circle' ? 'rounded-full' : styling.photoShape === 'rounded' ? 'rounded-xl' : 'rounded-none'
                }`}
              />
            </div>
          )}

          {/* Contact Details */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider border-b border-white/25 pb-1 mb-3">
              Contacto
            </h3>
            <div className="space-y-2 text-white/90 text-[11px]">
              {personalInfo.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 shrink-0 opacity-80" />
                  <span className="truncate">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 shrink-0 opacity-80" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {(personalInfo.city || personalInfo.country) && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 shrink-0 opacity-80" />
                  <span>{[personalInfo.city, personalInfo.country].filter(Boolean).join(', ')}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 shrink-0 opacity-80" />
                  <span className="truncate">{personalInfo.website.replace(/^https?:\/\//, '')}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-2">
                  <Linkedin className="w-3.5 h-3.5 shrink-0 opacity-80" />
                  <span className="truncate">{personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</span>
                </div>
              )}
              {personalInfo.github && (
                <div className="flex items-center gap-2">
                  <Github className="w-3.5 h-3.5 shrink-0 opacity-80" />
                  <span className="truncate">{personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider border-b border-white/25 pb-1 mb-3">
                Competencias
              </h3>
              <div className="space-y-2.5">
                {skills.map((skill) => (
                  <div key={skill.id} className="text-[11px]">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-white/95">{skill.name}</span>
                    </div>
                    {/* Level Bar */}
                    <div className="w-full bg-black/20 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-white h-full rounded-full transition-all duration-300"
                        style={{ width: `${(skill.level / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider border-b border-white/25 pb-1 mb-3">
                Idiomas
              </h3>
              <div className="space-y-2 text-[11px]">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between items-baseline border-b border-white/10 pb-1">
                    <span className="font-medium text-white">{lang.name}</span>
                    <span className="text-white/75 text-[10px]">{lang.level}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content (8 cols) */}
      <div className="col-span-8 p-7 space-y-5 bg-white">
        {/* Header Name & Title */}
        <div className="border-b-2 pb-4" style={{ borderColor: `${primaryColor}25` }}>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase">
            {personalInfo.firstName} <span style={{ color: primaryColor }}>{personalInfo.lastName}</span>
          </h1>
          <p className="text-sm font-medium tracking-wide text-slate-600 mt-0.5">
            {personalInfo.jobTitle}
          </p>
        </div>

        {/* Profile Summary */}
        {summary && (
          <div>
            <h2 
              className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 pb-1 mb-2 border-b"
              style={{ color: primaryColor, borderColor: `${primaryColor}30` }}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Perfil Profesional
            </h2>
            <p className="text-slate-700 leading-relaxed text-[11.5px] text-justify">
              {summary}
            </p>
          </div>
        )}

        {/* Work Experience */}
        {experiences.length > 0 && (
          <div>
            <h2 
              className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 pb-1 mb-3 border-b"
              style={{ color: primaryColor, borderColor: `${primaryColor}30` }}
            >
              <Briefcase className="w-3.5 h-3.5" />
              Experiencia Laboral
            </h2>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative pl-3 border-l-2" style={{ borderColor: `${primaryColor}40` }}>
                  <div className="flex justify-between items-baseline flex-wrap gap-1">
                    <h3 className="font-bold text-slate-900 text-xs">
                      {exp.jobTitle}
                    </h3>
                    <span className="text-[10px] font-medium text-slate-500 flex items-center gap-1">
                      <Calendar className="w-2.5 h-2.5" />
                      {exp.startDate} - {exp.isCurrent ? 'Presente' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-[11px] font-medium text-slate-600 mb-1">
                    {exp.company} {exp.location ? `• ${exp.location}` : ''}
                  </div>
                  {exp.description && (
                    <div className="text-slate-700 text-[11px] whitespace-pre-line leading-relaxed">
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
            <h2 
              className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 pb-1 mb-3 border-b"
              style={{ color: primaryColor, borderColor: `${primaryColor}30` }}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              Educación & Formación
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="relative pl-3 border-l-2" style={{ borderColor: `${primaryColor}40` }}>
                  <div className="flex justify-between items-baseline flex-wrap gap-1">
                    <h3 className="font-bold text-slate-900 text-xs">
                      {edu.degree}
                    </h3>
                    <span className="text-[10px] font-medium text-slate-500">
                      {edu.startDate} - {edu.isCurrent ? 'Cursando' : edu.endDate}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-600">
                    {edu.school} {edu.location ? `• ${edu.location}` : ''}
                  </div>
                  {edu.description && (
                    <p className="text-slate-700 text-[10.5px] mt-0.5">
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Custom Sections */}
        {customSections.map((sec) => (
          sec.items.length > 0 && (
            <div key={sec.id}>
              <h2 
                className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 pb-1 mb-3 border-b"
                style={{ color: primaryColor, borderColor: `${primaryColor}30` }}
              >
                <Award className="w-3.5 h-3.5" />
                {sec.title}
              </h2>
              <div className="space-y-2.5">
                {sec.items.map((item) => (
                  <div key={item.id} className="text-[11px]">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-slate-900">{item.title}</span>
                      {item.date && <span className="text-[10px] text-slate-500">{item.date}</span>}
                    </div>
                    {item.subtitle && <div className="text-slate-600 font-medium">{item.subtitle}</div>}
                    {item.description && <p className="text-slate-700 mt-0.5">{item.description}</p>}
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
