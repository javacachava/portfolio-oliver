/**
 * Formación y reconocimientos, agrupados por naturaleza para no mezclar credenciales:
 * educación formal, formación en curso, cursos y bootcamps, reconocimientos y participaciones.
 * Fuente: CV maestro. Los cursos listados no son certificaciones profesionales.
 */

export interface FormalEducation {
  title: string;
  institution: string;
  period: string;
  status: string;
  details: string[];
}

export const formalEducation: FormalEducation[] = [
  {
    title: "Ingeniería en Desarrollo de Software",
    institution: "Universidad Católica de El Salvador (UNICAES), sede Santa Ana",
    period: "2025 – 2029 (esperado)",
    status: "En curso, 2.º año",
    details: ["Desarrollo de software, bases de datos, arquitectura de aplicaciones y trabajo por proyectos."],
  },
  {
    title: "Técnico Superior Universitario (TSU) en Ciberseguridad",
    institution: "ESIT / MINED",
    period: "2024 – 2025",
    status: "Requisitos completos; graduación pendiente",
    details: [
      "31 de 31 materias aprobadas y 64 de 64 unidades valorativas.",
      "Servicio social completado.",
      "Programa con aval de INFOTEC, México.",
    ],
  },
  {
    title: "Bachillerato Técnico Vocacional en Infraestructura Tecnológica y Servicios Informáticos",
    institution: "Centro Escolar INSA",
    period: "Finalizado",
    status: "Diploma de honor: primer lugar en la especialidad",
    details: [],
  },
];

export interface Course {
  title: string;
  provider: string;
  /** Año o fecha tal como figura en el CV. */
  date: string;
  hours?: number;
  note?: string;
  area: CourseArea;
}

export type CourseArea = "software" | "ciberseguridad" | "ia-cloud" | "gestion" | "otros";

export const courseAreaLabels: Record<CourseArea, string> = {
  software: "Desarrollo de software",
  ciberseguridad: "Ciberseguridad",
  "ia-cloud": "IA, datos y nube",
  gestion: "Gestión y emprendimiento",
  otros: "Otros",
};

/** Formación en curso o por iniciar. */
export const inProgress: Course[] = [
  {
    title: "Bootcamp Full Stack Junior (FSJ34)",
    provider: "Kodigo",
    date: "2026",
    note: "En curso",
    area: "software",
  },
  {
    title: "Scrum Fundamentals y el rol de Scrum Master",
    provider: "Fundación Caprile",
    date: "Inicia el 13 de octubre de 2026",
    hours: 16,
    note: "Inscrito; todavía no ha comenzado",
    area: "gestion",
  },
];

/** Cursos y bootcamps completados, del más reciente al más antiguo dentro de cada área. */
export const completedCourses: Course[] = [
  {
    title: "Bootcamp de Java Developer",
    provider: "Kodigo",
    date: "Marzo de 2025",
    note: "Diploma otorgado",
    area: "software",
  },
  {
    title: "Bootcamp de Programación, cohorte 2",
    provider: "MINED",
    date: "Mayo de 2024",
    hours: 70,
    area: "software",
  },
  {
    title: "Fundamentos de ciberseguridad con CompTIA Security",
    provider: "ESIT / AECID",
    date: "2025",
    hours: 20,
    area: "ciberseguridad",
  },
  {
    title: "Bootcamp de Inteligencia Artificial",
    provider: "MINED",
    date: "Noviembre de 2024",
    hours: 40,
    area: "ia-cloud",
  },
  {
    title: "Fundamentos de AWS Cloud",
    provider: "ESIT / AECID",
    date: "2025",
    hours: 20,
    area: "ia-cloud",
  },
  {
    title: "Google Cloud (Coursera)",
    provider: "Google Cloud / Coursera",
    date: "Junio de 2024",
    note: "IA y aprendizaje automático, IA responsable, Vertex AI Studio, Transformers y BERT, analítica, data lakes y data warehouses",
    area: "ia-cloud",
  },
  {
    title: "Estándares ITIL",
    provider: "ESIT / AECID",
    date: "2025",
    hours: 20,
    area: "gestion",
  },
  {
    title: "Desarrollo de Start-ups",
    provider: "UNICAES",
    date: "Febrero de 2025",
    hours: 12,
    area: "gestion",
  },
  {
    title: "Emprendimiento",
    provider: "Aprendo",
    date: "2024",
    area: "gestion",
  },
  {
    title: "Bitcoin",
    provider: "Node Nation / INSA",
    date: "2024",
    area: "otros",
  },
  {
    title: "Lengua de Señas Salvadoreña básica",
    provider: "ITCA-FEPADE / Fundación Helen Keller",
    date: "2023",
    hours: 15,
    area: "otros",
  },
];

export interface Recognition {
  title: string;
  organizer?: string;
  year: string;
  project?: string;
  detail?: string;
}

/** Premios y distinciones. */
export const recognitions: Recognition[] = [
  {
    title: "Finalista de StartupSTEM 2026",
    organizer: "UNICAES",
    year: "2026",
    project: "CuencaOS",
    detail: "Una de cinco finalistas seleccionadas entre 37 propuestas.",
  },
  {
    title: "Tercer lugar en el Campeonato Nacional de Robótica TechLive 2024",
    year: "2024",
    detail: "Competencia nacional, El Salvador.",
  },
  {
    title: "Diploma de Mérito Estudiantil, TECH FEST 2023",
    year: "2023",
    project: "Invernadero automatizado",
    detail: "Reconocimiento a estudiante técnico.",
  },
  {
    title: "Primer lugar en la especialidad técnica",
    organizer: "Centro Escolar INSA",
    year: "Bachillerato",
    detail: "Diploma de honor en Infraestructura Tecnológica y Servicios Informáticos.",
  },
];

export interface Participation {
  title: string;
  organizer?: string;
  year?: string;
  project?: string;
  detail: string;
}

/** Ferias, congresos y eventos técnicos en los que participé. */
export const participations: Participation[] = [
  {
    title: "InspiraSTEM 2026",
    year: "2026",
    project: "CuencaOS",
    detail: "Presentación de póster científico y divulgación técnica.",
  },
  {
    title: "InspiraSTEM 2025",
    year: "2025",
    project: "TuGuíaSV",
    detail: "Presentación de póster.",
  },
  {
    title: "Feria Eureka 2024",
    organizer: "CONACYT El Salvador",
    year: "2024",
    project: "TuGuíaSV",
    detail: "Presentación del proyecto.",
  },
  {
    title: "Buildathons de AI Labs y Cursor",
    detail: "Eventos técnicos de prototipado colaborativo rápido e IA aplicada.",
  },
  {
    title: "The Next Craft, hackatón de un día completo",
    detail: "Resolución colaborativa de problemas y prototipado de soluciones.",
  },
];
