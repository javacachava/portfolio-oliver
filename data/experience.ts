export interface ExperienceEntry {
  role: string;
  organization: string;
  period: string;
  /** Equipo o contexto, en una línea. */
  context: string;
  bullets: string[];
  /** Proyectos relacionados (slug en data/projects.ts). */
  projects: string[];
  technologies?: string[];
}

export const experience: ExperienceEntry[] = [
  {
    role: "Cofundador y líder técnico",
    organization: "WUJU",
    period: "2025 – actualidad",
    context: "Equipo técnico de seis personas dentro de un grupo multidisciplinario",
    bullets: [
      "Coordino un equipo técnico de seis personas en iniciativas de software, datos e investigación aplicada.",
      "Levanto requisitos con clientes y partes interesadas, defino el alcance con los equipos, documento decisiones técnicas y doy seguimiento a los entregables con prácticas ágiles.",
      "Participo en la arquitectura y la selección de tecnologías de CuencaOS y Terrivo, y en las guías internas de integridad de investigación, manejo responsable de datos y revisión de proyectos.",
    ],
    projects: ["cuencaos", "terrivo"],
  },
  {
    role: "Desarrollador del sistema POS (servicio social)",
    organization: "Pizza Brava / ESIT",
    period: "Nov 2025 – Mar 2026",
    context: "Proyecto para un negocio real, con requisitos del dueño",
    bullets: [
      "Diseñé e implementé el control de acceso por roles (RBAC) para cajero, cocina y administrador, aplicando el principio de mínimo privilegio.",
      "Diseñé la base de datos PostgreSQL y desarrollé funcionalidades de la aplicación.",
      "Levanté los requisitos con el dueño del negocio y capacité al personal en el uso del sistema.",
    ],
    projects: ["pos-pizza-brava"],
    technologies: ["PostgreSQL"],
  },
  {
    role: "Cofundador y desarrollador del proyecto",
    organization: "TuGuíaSV",
    period: "Jun 2024 – actualidad",
    context: "Equipo de cuatro personas",
    bullets: [
      "Coordiné un equipo de cuatro personas en el desarrollo y prototipado de una plataforma geolocalizada de turismo e información local en El Salvador.",
      "Trabajé con DigitalOcean, Cloudflare CDN y SendGrid en servicios e infraestructura de la plataforma.",
      "Presenté el proyecto en Feria Eureka 2024 e InspiraSTEM 2025.",
    ],
    projects: ["tuguiasv"],
    technologies: ["DigitalOcean", "Cloudflare CDN", "SendGrid"],
  },
];
