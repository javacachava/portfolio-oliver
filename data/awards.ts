export interface Award {
  title: string;
  organizer: string;
  year: string;
  project?: string;
  highlight?: boolean;
}

export const awards: Award[] = [
  {
    title: "Finalista de StartupSTEM 2026",
    organizer: "UNICAES · una de cinco finalistas entre 37 propuestas",
    year: "2026",
    project: "CuencaOS",
    highlight: true,
  },
  {
    title: "3.er lugar — Campeonato Nacional de Robótica TechLive",
    organizer: "Competencia nacional, El Salvador",
    year: "2024",
    highlight: true,
  },
  {
    title: "Diploma de Mérito Estudiantil — TECH FEST",
    organizer: "Reconocimiento a estudiante técnico",
    year: "2023",
    project: "Invernadero automatizado",
  },
  {
    title: "1.er lugar en la especialidad técnica — Diploma de honor",
    organizer: "Centro Escolar INSA",
    year: "Bachillerato",
    highlight: true,
  },
  {
    title: "InspiraSTEM — póster científico",
    organizer: "Participación",
    year: "2026",
    project: "CuencaOS",
  },
  {
    title: "InspiraSTEM — póster",
    organizer: "Participación",
    year: "2025",
    project: "TuGuíaSV",
  },
  {
    title: "Feria Eureka",
    organizer: "CONACYT El Salvador · participación",
    year: "2024",
    project: "TuGuíaSV",
  },
  {
    title: "Buildathons de AI Labs y Cursor; hackatón The Next Craft",
    organizer: "Eventos técnicos de prototipado · participación",
    year: "—",
  },
];
