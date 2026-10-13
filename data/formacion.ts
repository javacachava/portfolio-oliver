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
    color: "#9b7bff",
    items: [
      {
        name: "Ingeniería en Desarrollo de Software",
        institution: "UNICAES",
        detail: "2.º año, en curso",
        date: "2025–2029 (esperado)",
      },
      {
        name: "TSU en Ciberseguridad",
        institution: "ESIT / MINED · aval INFOTEC México",
        detail: "31/31 materias y 64/64 UV; servicio social completado; graduación pendiente",
        date: "2024–2025",
      },
      {
        name: "Bachillerato Técnico Vocacional en Infraestructura Tecnológica y Servicios Informáticos",
        institution: "Centro Escolar INSA",
        detail: "Diploma de honor: 1.er lugar en la especialidad",
        date: "finalizado",
      },
    ],
  },
  {
    id: "gubernamentales",
    label: "Cursos ESIT / AECID",
    color: "#06b6d4",
    items: [
      {
        name: "Fundamentos de Ciberseguridad con CompTIA Security",
        institution: "ESIT / AECID",
        hours: 20,
        detail: "curso; no es una certificación profesional",
        date: "2025",
      },
      {
        name: "Fundamentos de AWS Cloud",
        institution: "ESIT / AECID",
        hours: 20,
        date: "2025",
      },
      {
        name: "Estándares ITIL",
        institution: "ESIT / AECID",
        hours: 20,
        date: "2025",
      },
    ],
  },
  {
    id: "bootcamps",
    label: "Bootcamps",
    color: "#00ff9f",
    items: [
      {
        name: "Bootcamp de Java Developer",
        institution: "Kodigo",
        detail: "diploma otorgado",
        date: "mar 2025",
      },
      {
        name: "Bootcamp Full Stack Junior (FSJ34)",
        institution: "Kodigo",
        detail: "en curso",
        date: "2026",
      },
      {
        name: "Bootcamp de Programación, cohorte 2",
        institution: "MINED",
        hours: 70,
        date: "may 2024",
      },
      {
        name: "Bootcamp de Inteligencia Artificial",
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
        name: "Google Cloud",
        institution: "Google Cloud · Coursera",
        detail: "IA y ML, IA responsable, Vertex AI Studio, Transformers/BERT, analítica, data lakes y data warehouses",
        date: "jun 2024",
      },
    ],
  },
  {
    id: "programacion",
    label: "Gestión y emprendimiento",
    color: "#f472b6",
    items: [
      {
        name: "Scrum Fundamentals y el rol de Scrum Master",
        institution: "Fundación Caprile",
        detail: "16 h · inscrito; inicia el 13 de octubre de 2026",
        date: "2026",
      },
      {
        name: "Desarrollo de Start-ups",
        institution: "UNICAES",
        hours: 12,
        date: "feb 2025",
      },
      {
        name: "Emprendimiento",
        institution: "Aprendo",
        date: "2024",
      },
    ],
  },
  {
    id: "blockchain",
    label: "Bitcoin",
    color: "#f59e0b",
    items: [
      {
        name: "Bitcoin",
        institution: "Node Nation / INSA",
        date: "2024",
      },
    ],
  },
  {
    id: "complementaria",
    label: "Lengua de Señas",
    color: "#34d399",
    items: [
      {
        name: "Lengua de Señas Salvadoreña básica",
        institution: "ITCA-FEPADE / Fundación Helen Keller",
        hours: 15,
        date: "2023",
      },
    ],
  },
  {
    id: "reconocimientos",
    label: "Reconocimientos",
    color: "#b49bff",
    items: [
      {
        name: "Finalista de StartupSTEM 2026 (CuencaOS)",
        institution: "UNICAES",
        detail: "una de cinco finalistas entre 37 propuestas",
        date: "2026",
      },
      {
        name: "3.er lugar — Campeonato Nacional de Robótica TechLive",
        institution: "Competencia nacional, El Salvador",
        date: "2024",
      },
      {
        name: "Diploma de Mérito Estudiantil — TECH FEST (Invernadero automatizado)",
        institution: "Reconocimiento a estudiante técnico",
        date: "2023",
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
  yearRange: "2023–actualidad",
};
