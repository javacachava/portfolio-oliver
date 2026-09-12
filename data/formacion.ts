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
    label: "Base en ciberseguridad",
    color: "#7042f8",
    items: [
      {
        name: "TSU en Ciberseguridad",
        institution: "ESIT / MINED · aval INFOTEC México",
        detail: "31/31 materias aprobadas · servicio social completado",
        date: "en proceso de graduación",
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
        date: "jul 2025",
      },
    ],
  },
  {
    id: "cloud",
    label: "Cloud y gobernanza",
    color: "#00d4ff",
    items: [
      {
        name: "Fundamentos de AWS Cloud",
        institution: "ESIT / AECID",
        hours: 20,
        date: "jul 2025",
      },
      {
        name: "Normas para la Gobernanza de TI (ITIL)",
        institution: "ESIT / AECID",
        hours: 20,
        date: "jul 2025",
      },
      {
        name: "Trayecto Google Cloud",
        institution: "Google Cloud · Coursera",
        detail: "IA/ML, Vertex AI, Transformers/BERT y Data Lakes",
        date: "2024",
      },
    ],
  },
  {
    id: "agilidad",
    label: "Scrum y práctica ágil",
    color: "#a78bfa",
    items: [
      {
        name: "Coordinación técnica bajo enfoque ágil",
        institution: "Wuju",
        detail: "Equipo de 6 personas, requisitos y relación con clientes",
        date: "2025–actualidad",
      },
      {
        name: "Liderazgo de producto desde la idea al prototipo",
        institution: "TuGuiaSV",
        detail: "Equipo de 4 personas, de la idea al prototipo funcional",
        date: "2024–actualidad",
      },
    ],
  },
  {
    id: "java",
    label: "Java y Full Stack",
    color: "#ff9d4d",
    items: [
      {
        name: "Java Developer",
        institution: "Kodigo / BID Lab / Simplon",
        date: "mar 2025",
      },
      {
        name: "Bootcamp Full Stack Junior",
        institution: "Kodigo",
        detail: "en curso",
        date: "2026",
      },
      {
        name: "Curso de Java — Nivel Básico",
        institution: "Udemy",
        hours: 4.5,
        date: "oct 2024",
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
  yearRange: "2024–actualidad",
};
