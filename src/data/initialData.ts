import { CVData } from '../types';

export const genericInitialCV: CVData = {
  documentTitle: 'Mi Currículum Vitae',
  personalInfo: {
    firstName: 'Alejandro',
    lastName: 'Navarro Gómez',
    jobTitle: 'Especialista en Desarrollo Web y UI/UX',
    email: 'alejandro.navarro@ejemplo.es',
    phone: '+34 612 345 678',
    city: 'Madrid',
    country: 'España',
    postalCode: '28001',
    website: 'https://alejandronavarro.dev',
    linkedin: 'linkedin.com/in/alejandro-navarro-ejemplo',
    github: 'github.com/alejandro-navarro',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    showPhoto: true,
  },
  summary: 'Profesional con más de 6 años de experiencia en diseño de interfaces y desarrollo de aplicaciones web interactivas. Especializado en crear experiencias digitales accesibles, rendimiento frontend optimizado y metodologías ágiles en equipos multidisciplinarios.',
  experiences: [
    {
      id: 'exp-1',
      jobTitle: 'Líder Técnico Frontend',
      company: 'Soluciones Digitales Vanguardia',
      location: 'Madrid, España',
      startDate: '2022-03',
      endDate: '',
      isCurrent: true,
      description: '• Dirección del equipo de interfaz de usuario mejorando los tiempos de carga en un 40%.\n• Implementación de un sistema de diseño escalable con React, TypeScript y Tailwind CSS.\n• Coordinación con el equipo de producto para entregar funcionalidades clave antes de plazo.',
    },
    {
      id: 'exp-2',
      jobTitle: 'Desarrollador Web Senior',
      company: 'Agencia Creativa Innova',
      location: 'Barcelona, España',
      startDate: '2019-06',
      endDate: '2022-02',
      isCurrent: false,
      description: '• Desarrollo de aplicaciones web SPA interactivas para clientes de gran volumen.\n• Integración de APIs RESTful y GraphQL con estándares de seguridad avanzados.\n• Mentoría y formación técnica a desarrolladores junior y pasantes.',
    },
    {
      id: 'exp-3',
      jobTitle: 'Diseñador UI/UX & Maquetador',
      company: 'Estudio Pixel Web',
      location: 'Valencia, España',
      startDate: '2017-09',
      endDate: '2019-05',
      isCurrent: false,
      description: '• Creación de prototipos de alta fidelidad, flujos de usuario y maquetación web responsiva.\n• Ejecución de pruebas de usabilidad y entrevistas a usuarios finales.',
    }
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'Grado en Ingeniería del Software',
      school: 'Universidad Politécnica de Madrid',
      location: 'Madrid',
      startDate: '2013-09',
      endDate: '2017-06',
      isCurrent: false,
      description: 'Mención de honor en Proyecto de Fin de Grado en aplicaciones web interactivas.',
    },
    {
      id: 'edu-2',
      degree: 'Máster en Experiencia de Usuario y Diseño de Interfaces',
      school: 'Escuela Superior de Diseño Digital',
      location: 'Barcelona',
      startDate: '2017-10',
      endDate: '2018-07',
      isCurrent: false,
      description: 'Especialización en Design Systems y accesibilidad WCAG 2.1.',
    }
  ],
  skills: [
    { id: 'sk-1', name: 'React / Next.js', level: 5, category: 'technical' },
    { id: 'sk-2', name: 'TypeScript', level: 5, category: 'technical' },
    { id: 'sk-3', name: 'Tailwind CSS', level: 5, category: 'technical' },
    { id: 'sk-4', name: 'Figma & UI Design', level: 4, category: 'tool' },
    { id: 'sk-5', name: 'Node.js & Express', level: 4, category: 'technical' },
    { id: 'sk-6', name: 'Git / CI & CD', level: 4, category: 'tool' },
    { id: 'sk-7', name: 'Liderazgo de Equipos', level: 5, category: 'soft' },
    { id: 'sk-8', name: 'Resolución de Problemas', level: 5, category: 'soft' },
  ],
  languages: [
    { id: 'lang-1', name: 'Español', level: 'Nativo' },
    { id: 'lang-2', name: 'Inglés', level: 'C1 (Avanzado)' },
    { id: 'lang-3', name: 'Francés', level: 'B1 (Intermedio)' },
  ],
  customSections: [
    {
      id: 'sec-cert',
      title: 'Certificaciones y Cursos',
      type: 'courses',
      items: [
        {
          id: 'c-1',
          title: 'Certificación Profesional en Arquitectura Frontend',
          subtitle: 'Tech Institute Global',
          date: '2023',
          description: 'Optimización de rendimiento web, microfrontends y seguridad en cliente.',
        },
        {
          id: 'c-2',
          title: 'Scrum Master Certificado (PSM I)',
          subtitle: 'Scrum.org',
          date: '2021',
          description: 'Gestión ágil de proyectos y facilitación de dinámicas de equipo.',
        }
      ]
    },
    {
      id: 'sec-proj',
      title: 'Proyectos Destacados',
      type: 'projects',
      items: [
        {
          id: 'p-1',
          title: 'Sistema de Gestión de Diseño Web',
          subtitle: 'Proyecto Open Source',
          date: '2023 - 2024',
          description: 'Librería de componentes accesibles utilizada por más de 10.000 desarrolladores.',
          link: 'https://github.com/ejemplo/design-system'
        }
      ]
    }
  ],
  styling: {
    templateId: 'oslo',
    primaryColor: '#2563eb', // Royal Blue
    fontFamily: 'sans',
    fontSize: 'normal',
    spacing: 'normal',
    photoShape: 'circle',
  }
};

export const emptyInitialCV: CVData = {
  documentTitle: 'Nuevo Currículum',
  personalInfo: {
    firstName: '',
    lastName: '',
    jobTitle: '',
    email: '',
    phone: '',
    city: '',
    country: '',
    postalCode: '',
    website: '',
    linkedin: '',
    github: '',
    photoUrl: '',
    showPhoto: true,
  },
  summary: '',
  experiences: [],
  education: [],
  skills: [],
  languages: [],
  customSections: [],
  styling: {
    templateId: 'oslo',
    primaryColor: '#2563eb',
    fontFamily: 'sans',
    fontSize: 'normal',
    spacing: 'normal',
    photoShape: 'circle',
  }
};

export const COLOR_PALETTES = [
  { name: 'Azul Real', value: '#2563eb', hex: '#2563eb' },
  { name: 'Azul Marino', value: '#1e3a8a', hex: '#1e3a8a' },
  { name: 'Verde Esmeralda', value: '#059669', hex: '#059669' },
  { name: 'Teal Profesional', value: '#0f766e', hex: '#0f766e' },
  { name: 'Púrpura Elegante', value: '#7c3aed', hex: '#7c3aed' },
  { name: 'Rojo Borgoña', value: '#b91c1c', hex: '#b91c1c' },
  { name: 'Ámbar Cálido', value: '#d97706', hex: '#d97706' },
  { name: 'Gris Grafito', value: '#334155', hex: '#334155' },
  { name: 'Negro Ébano', value: '#0f172a', hex: '#0f172a' },
];

export const TEMPLATES_CONFIG = [
  {
    id: 'oslo',
    name: 'Oslo',
    subtitle: 'Moderna con Barra Lateral',
    description: 'Estructura en dos columnas con barra lateral de acento. Ideal para destacar habilidades y contacto visualmente.',
    tag: 'Más popular',
  },
  {
    id: 'harvard',
    name: 'Harvard',
    subtitle: 'Clásica & Académica',
    description: 'Estructura de columna única tradicional y refinada con tipografía serif. Perfecta para perfiles senior y compatible con sistemas ATS.',
    tag: 'ATS Friendly',
  },
  {
    id: 'stockholm',
    name: 'Estocolmo',
    subtitle: 'Minimalista & Limpia',
    description: 'Diseño nórdico de líneas puras, márgenes generosos y jerarquía visual impecable para perfiles contemporáneos.',
    tag: 'Elegante',
  },
  {
    id: 'berlin',
    name: 'Berlín',
    subtitle: 'Creativa & Impactante',
    description: 'Cabecera prominente con bloque de color dinámico, badges circulares y estilo llamativo para creativos y marketing.',
    tag: 'Creativa',
  },
  {
    id: 'madrid',
    name: 'Madrid',
    subtitle: 'Ejecutiva & Corporativa',
    description: 'Estilo sobrio y estructurado con barras de división pulidas, ideal para administración, finanzas y gerencia.',
    tag: 'Ejecutiva',
  },
  {
    id: 'vienna',
    name: 'Viena',
    subtitle: 'Tecnológica & Compacta',
    description: 'Formato denso y moderno con visualización de etiquetas técnicas y cronología continua optimizada en 1 página.',
    tag: 'Tech',
  },
];

export const SUMMARY_SUGGESTIONS = [
  {
    role: 'Desarrollador / IT',
    text: 'Ingeniero de software orientado a resultados con experiencia probada en el diseño, desarrollo y despliegue de aplicaciones web de alto rendimiento. Apasionado por las arquitecturas limpias, la automatización y el trabajo en equipo con metodologías ágiles.'
  },
  {
    role: 'Administración & Finanzas',
    text: 'Profesional de gestión administrativa y análisis financiero con amplia experiencia en optimización de presupuestos, facturación y coordinación de auditorías. Destacada capacidad analítica y orientación a la reducción de costes operativos.'
  },
  {
    role: 'Marketing & Ventas',
    text: 'Especialista en marketing digital y crecimiento comercial con trayectoria consolidada en generación de leads, gestión de campañas multicanal y análisis de métricas ROI. Enfoque estratégico en la fidelización del cliente y posicionamiento de marca.'
  },
  {
    role: 'Diseño & Creatividad',
    text: 'Diseñador visual y de experiencia de usuario con visión estratégica para transformar problemas complejos en soluciones digitales atractivas e intuitivas. Experto en sistemas de diseño, investigación con usuarios y prototipado ágil.'
  },
  {
    role: 'Gestión de Proyectos',
    text: 'Project Manager certificado con sólida experiencia liderando equipos multidisciplinarios y garantizando la entrega de proyectos en tiempo y presupuesto. Hábil en metodologías Scrum y comunicación con stakeholders.'
  }
];

export const SKILLS_PRESETS = [
  { category: 'Desarrollo Web', items: ['React', 'TypeScript', 'Node.js', 'Next.js', 'Tailwind CSS', 'GraphQL', 'Docker', 'PostgreSQL', 'Git'] },
  { category: 'Habilidades Blandas', items: ['Trabajo en equipo', 'Liderazgo', 'Pensamiento crítico', 'Gestión del tiempo', 'Adaptabilidad', 'Comunicación asertiva'] },
  { category: 'Diseño & Producto', items: ['Figma', 'UI/UX Design', 'Design Systems', 'User Research', 'Adobe Photoshop', 'Prototipado'] },
  { category: 'Negocio & Gestión', items: ['Scrum / Agile', 'Gestión de Presupuestos', 'Análisis de Datos', 'Negociación', 'SEO / SEM', 'CRM'] },
];
