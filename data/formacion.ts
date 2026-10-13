export interface FormacionItem {
  name: string;
  institution: string;
  hours?: number;
  date?: string;
  detail?: string;
}

export interface FormacionCategory {
  id: string;
  label: string;
  color: string;
  items: FormacionItem[];
}

export const formacion: FormacionCategory[] = [
  {
    id: "academica",
    label: "Formación académica",
    color: "#7042f8",
    items: [
      {
        name: "Ingeniería en Desarrollo de Software",
        institution: "UNICAES",
        date: "2.° año · en curso",
      },
      {
        name: "TSU en Ciberseguridad",
        institution: "ESIT / MINED · aval INFOTEC México",
        date: "Graduando",
      },
      {
        name: "Bachiller Técnico Vocacional ITSI",
        institution: "Centro Escolar INSA",
        date: "2022–2024",
      },
    ],
  },
  {
    id: "gubernamentales",
    label: "Certificaciones gubernamentales",
    color: "#06b6d4",
    items: [
      {
        name: "Fundamentos de Ciberseguridad con CompTIA Security",
        institution: "ESIT / Secretaría de Innovación",
        hours: 20,
        date: "jul 2025",
      },
      {
        name: "Introducción a la Infraestructura en la Nube con AWS",
        institution: "ESIT / Secretaría de Innovación",
        hours: 20,
        date: "jul 2025",
      },
      {
        name: "Normas para la Gobernanza de TI (ITIL)",
        institution: "ESIT / Secretaría de Innovación",
        hours: 20,
        date: "jul 2025",
      },
    ],
  },
  {
    id: "bootcamps",
    label: "Bootcamps MINED",
    color: "#00ff9f",
    items: [
      {
        name: "Bootcamp en Programación 2024",
        institution: "MINED · cohorte 2",
        hours: 70,
        date: "may 2024",
      },
      {
        name: "Bootcamp en Inteligencia Artificial",
        institution: "MINED",
        hours: 40,
        date: "nov 2024",
      },
    ],
  },
  {
    id: "cloud",
    label: "Google Cloud / Coursera",
    color: "#a78bfa",
    items: [
      {
        name: "Google Workspace",
        institution: "Coursera",
        detail: "5 cursos: Calendar, Docs, Gmail, Meet, Drive",
        date: "jun 2024",
      },
      {
        name: "Modernizing Data Lakes and Data Warehouses with GCP",
        institution: "Google Cloud · Coursera",
        date: "jun 2024",
      },
      {
        name: "Smart Analytics, Machine Learning, and AI on GCP",
        institution: "Google Cloud · Coursera",
        date: "jun 2024",
      },
      {
        name: "Introduction to Image Generation",
        institution: "Google Cloud · Coursera",
        date: "jun 2024",
      },
      {
        name: "Introduction to Gemini for Google Workspace",
        institution: "Google Cloud · Coursera",
        date: "jun 2024",
      },
      {
        name: "Introduction to Responsible AI",
        institution: "Google Cloud · Coursera",
        date: "jun 2024",
      },
    ],
  },
  {
    id: "programacion",
    label: "Programación y tecnología",
    color: "#06b6d4",
    items: [
      {
        name: "Principios SOLID y Clean Code",
        institution: "Udemy",
        hours: 3.5,
        date: "oct 2024",
      },
      {
        name: "Curso de Java — Nivel Básico",
        institution: "Udemy",
        hours: 4.5,
        date: "oct 2024",
      },
      {
        name: "Blockchain y Bitcoin: Fundamentos Esenciales",
        institution: "Udemy",
        hours: 1.5,
        date: "oct 2024",
      },
    ],
  },
  {
    id: "blockchain",
    label: "Blockchain / Bitcoin",
    color: "#7042f8",
    items: [
      {
        name: "Certificado técnico Node Nation",
        institution: "Oficina Nacional de Bitcoin El Salvador · INSA",
        date: "ago 2024",
      },
    ],
  },
  {
    id: "complementaria",
    label: "Emprendimiento & LESSA",
    color: "#00ff9f",
    items: [
      {
        name: "Desarrollo de Start Ups",
        institution: "Universidad Católica de El Salvador",
        hours: 12,
        date: "feb 2025",
      },
      {
        name: "Curso Básico de Lengua de Señas",
        institution: "ITSI / Centro Escolar INSA",
        date: "nov 2023",
      },
      {
        name: "Curso Básico de Lengua de Señas Salvadoreña",
        institution: "ITCA FEPADE / Fundación Hellen Keller",
        hours: 15,
        date: "dic 2023",
      },
    ],
  },
  {
    id: "reconocimientos",
    label: "Reconocimientos",
    color: "#b49bff",
    items: [
      {
        name: "TechLIVE — reconocimiento por participación",
        institution: "Secretaría de Innovación / MINED",
        date: "nov 2024",
      },
    ],
  },
];

export const formacionStats = {
  totalHours: Math.floor(
    formacion.reduce(
      (acc, c) => acc + c.items.reduce((a, i) => a + (i.hours ?? 0), 0),
      0
    )
  ),
  totalItems: formacion.reduce((acc, c) => acc + c.items.length, 0),
  totalInstitutions: new Set(
    formacion.flatMap((c) => c.items.map((i) => i.institution.split(" · ")[0]))
  ).size,
  yearRange: "2022–2025",
};
