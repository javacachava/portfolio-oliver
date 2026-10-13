/** Datos de identidad y contacto. Fuente: CV maestro. */
export const profile = {
  name: "Oliver Alexander Ascencio Pleitez",
  shortName: "Oliver Ascencio",
  siteUrl: "https://oliver-ascencio.wuju.dev",
  location: "Santa Ana, El Salvador",
  email: "oliver.a.ascencio@gmail.com",
  github: { label: "github.com/javacachava", href: "https://github.com/javacachava" },
  linkedin: {
    label: "linkedin.com/in/oliver-ascencio",
    href: "https://linkedin.com/in/oliver-ascencio",
  },
  cv: "/cv/CV_Oliver_Ascencio.pdf",
  languages: "Español: Nativo | Inglés: B1",
  /** Rótulo corto para metadatos y barra de título. */
  role: "Desarrollo de software, ciberseguridad e IA aplicada",
  tagline:
    "Estudiante de Ingeniería en Desarrollo de Software y cofundador de WUJU. Desarrollo software, coordino equipos técnicos y participo en proyectos de datos e IA aplicada, con la ciberseguridad como base.",
  /** Fecha de la última revisión de contenido (ISO). Alimenta el sitemap. */
  lastUpdated: "2026-10-12",
} as const;

/** Ficha de la portada: hechos, no métricas. */
export const heroFacts: ReadonlyArray<{ label: string; value: string }> = [
  { label: "Estudios", value: "Ingeniería en Desarrollo de Software, UNICAES (2.º año)" },
  {
    label: "Formación técnica",
    value: "TSU en Ciberseguridad, ESIT / MINED. Requisitos completos; graduación pendiente",
  },
  { label: "Organización", value: "Cofundador y líder técnico en WUJU" },
  { label: "Ubicación", value: "Santa Ana, El Salvador" },
  { label: "Idiomas", value: "Español: Nativo | Inglés: B1" },
];
