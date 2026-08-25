export interface PersonalInfo {
  firstName: string;
  lastName: string;
  jobTitle: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  postalCode: string;
  website: string;
  linkedin: string;
  github: string;
  photoUrl: string;
  showPhoto: boolean;
}

export interface ExperienceItem {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  school: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
}

export interface SkillItem {
  id: string;
  name: string;
  level: number; // 1 to 5
  category?: 'technical' | 'soft' | 'tool';
}

export interface LanguageItem {
  id: string;
  name: string;
  level: 'Nativo' | 'C2 (Maestría)' | 'C1 (Avanzado)' | 'B2 (Intermedio alto)' | 'B1 (Intermedio)' | 'A2 (Básico)';
}

export interface CustomItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
  link?: string;
}

export interface CustomSection {
  id: string;
  title: string;
  type: 'projects' | 'courses' | 'awards' | 'custom';
  items: CustomItem[];
}

export type TemplateId = 'oslo' | 'harvard' | 'stockholm' | 'berlin' | 'madrid' | 'vienna';

export interface StylingConfig {
  templateId: TemplateId;
  primaryColor: string;
  fontFamily: 'sans' | 'serif' | 'display' | 'mono';
  fontSize: 'compact' | 'normal' | 'relaxed';
  spacing: 'compact' | 'normal' | 'spacious';
  photoShape: 'circle' | 'rounded' | 'square';
}

export interface CVData {
  documentTitle: string;
  personalInfo: PersonalInfo;
  summary: string;
  experiences: ExperienceItem[];
  education: EducationItem[];
  skills: SkillItem[];
  languages: LanguageItem[];
  customSections: CustomSection[];
  styling: StylingConfig;
}

export type StepId = 
  | 'personal' 
  | 'summary' 
  | 'experience' 
  | 'education' 
  | 'skills' 
  | 'languages' 
  | 'sections';
