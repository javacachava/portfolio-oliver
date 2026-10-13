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
    label: "Educación formal",
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
      },
    ],
  },
  {
    id: "seguridad",
    label: "Ciberseguridad",
    color: "#06b6d4",
    items: [
      {
        name: "Fundamentos de Ciberseguridad con CompTIA Security",
        institution: "ESIT / AECID",
        hours: 20,
        date: "2025",
        detail: "Curso; no es una certificación profesional",
      },
    ],
  },
  {
    id: "cloud",
    label: "Cloud y gobernanza de TI",
    color: "#00d4ff",
    items: [
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
    id: "agilidad",
    label: "Gestión, emprendimiento y complementarios",
    color: "#a78bfa",
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
      {
        name: "Bitcoin",
        institution: "Node Nation / INSA",
        date: "2024",
      },
      {
        name: "Lengua de Señas Salvadoreña básica",
        institution: "ITCA-FEPADE / Fundación Helen Keller",
        hours: 15,
        date: "2023",
      },
    ],
  },
  {
    id: "java",
    label: "Programación y desarrollo",
    color: "#ff9d4d",
    items: [
      {
        name: "Bootcamp de Java Developer",
        institution: "Kodigo",
        detail: "Diploma otorgado",
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
        date: "mayo 2024",
      },
    ],
  },
  {
    id: "datos",
    label: "IA y datos",
    color: "#f59e0b",
    items: [
      {
        name: "Bootcamp de Inteligencia Artificial",
        institution: "MINED",
        hours: 40,
        date: "nov 2024",
      },
      {
        name: "Google Cloud",
        institution: "Google Cloud · Coursera",
        detail: "IA y ML, IA responsable, Vertex AI Studio, Transformers/BERT, data lakes y data warehouses",
        date: "jun 2024",
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
