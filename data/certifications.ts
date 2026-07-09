export interface Certification {
  name: string;
  issuer: string;
  date: string;
}

export const certifications: Certification[] = [
  {
    name: "Java Developer",
    issuer: "Kodigo / BID Lab / Simplon",
    date: "Mar 2025",
  },
  {
    name: "AWS Cloud Fundamentals",
    issuer: "ESIT / AECID",
    date: "Jul 2025",
  },
  {
    name: "ITIL — Gobernanza de TI",
    issuer: "ESIT / AECID",
    date: "Jul 2025",
  },
  {
    name: "Google Cloud: IA/ML, Vertex AI, Transformers/BERT, Data Lakes",
    issuer: "Coursera",
    date: "2024",
  },
  {
    name: "Bootcamp en Inteligencia Artificial",
    issuer: "MINED (40h)",
    date: "Nov 2024",
  },
  {
    name: "SOLID Principles + Clean Code + Blockchain",
    issuer: "Udemy",
    date: "2024",
  },
  {
    name: "Desarrollo de Start Ups",
    issuer: "UNICAES (12h)",
    date: "Feb 2025",
  },
];
