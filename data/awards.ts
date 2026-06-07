export interface Award {
  title: string;
  organizer: string;
  year: string;
  project?: string;
  highlight?: boolean;
}

export const awards: Award[] = [
  {
    title: "Feria Eureka",
    organizer: "CONACYT El Salvador",
    year: "2024",
    project: "TuGuiaSV",
    highlight: true,
  },
  {
    title: "InspiraSTEM",
    organizer: "Conferencia STEM Internacional",
    year: "2025",
    project: "TuGuiaSV",
    highlight: true,
  },
  {
    title: "3.er Lugar — Tech Live",
    organizer: "MINED / Secretaría de Innovación",
    year: "Nov 2024",
  },
  {
    title: "Diploma de Mérito — TECH FEST",
    organizer: "Ministerio de Educación",
    year: "Dic 2023",
    project: "Invernadero Automatizado",
  },
  {
    title: "1.er Lugar — Bachillerato · Diploma de Honor",
    organizer: "Centro Escolar INSA",
    year: "2023",
    highlight: true,
  },
];
