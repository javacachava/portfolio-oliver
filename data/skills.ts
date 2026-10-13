/**
 * Competencias separadas por naturaleza: lo que he usado en proyectos (con el proyecto
 * donde ocurrió) y lo que conozco por formación académica. Sin niveles ni porcentajes.
 */
export interface SkillGroup {
  id: string;
  title: string;
  practice: Array<{ name: string; where: string }>;
  academic: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "desarrollo",
    title: "Desarrollo de software",
    practice: [
      { name: "Python", where: "CuencaOS / Akhet, Terrivo / Atria, FlowCore" },
      { name: "JavaScript y Node.js", where: "Bot de pedidos por WhatsApp" },
      { name: "React y TypeScript", where: "Gestión de invitaciones y eventos" },
      { name: "Laravel y Vue", where: "Sistema POS para Pizza Brava" },
      { name: "SQL y PostgreSQL", where: "Sistema POS para Pizza Brava" },
      { name: "SQLite", where: "Bot de pedidos por WhatsApp, FlowCore" },
      { name: "Git y GitHub", where: "Todos los proyectos" },
    ],
    academic: ["Java y Spring Boot (bootcamp de Kodigo)", "C#", "PHP básico", "MySQL", "Firestore"],
  },
  {
    id: "ciberseguridad",
    title: "Ciberseguridad",
    practice: [
      { name: "Control de acceso por roles (RBAC) y mínimo privilegio", where: "Sistema POS para Pizza Brava" },
      { name: "Validación de la firma de un webhook", where: "Bot de pedidos por WhatsApp" },
    ],
    academic: [
      "OWASP Top 10",
      "Seguridad en redes",
      "Criptografía",
      "Respuesta a incidentes",
      "Hacking ético",
      "Fundamentos de ciberseguridad con CompTIA Security",
    ],
  },
  {
    id: "ia-datos",
    title: "IA y datos",
    practice: [
      { name: "Análisis y componentes de datos en Python", where: "CuencaOS / Akhet, Terrivo / Atria" },
      { name: "Limpieza de series temporales", where: "FlowCore" },
      {
        name: "Herramientas de IA para prototipar, analizar y apoyar el desarrollo (GPT, Claude, Gemini, Cursor)",
        where: "Uso cotidiano",
      },
    ],
    academic: [
      "Aprendizaje automático introductorio",
      "IA responsable",
      "Vertex AI Studio",
      "Transformers y BERT",
      "Data lakes y data warehouses",
    ],
  },
  {
    id: "infraestructura",
    title: "Infraestructura",
    practice: [
      { name: "DigitalOcean, Cloudflare CDN y SendGrid", where: "TuGuíaSV" },
      { name: "Docker y Docker Compose", where: "Sistema POS para Pizza Brava" },
    ],
    academic: ["Fundamentos de AWS", "Google Cloud (cursos)", "ITIL"],
  },
  {
    id: "coordinacion",
    title: "Coordinación técnica",
    practice: [
      { name: "Coordinación de equipos de seis y de cuatro personas", where: "WUJU, TuGuíaSV" },
      { name: "Levantamiento de requisitos y definición de alcance", where: "WUJU, Sistema POS" },
      { name: "Documentación de decisiones y seguimiento de entregables con prácticas ágiles", where: "WUJU" },
      { name: "Capacitación de usuarios", where: "Sistema POS para Pizza Brava" },
    ],
    academic: ["Fundamentos de ITIL", "Scrum (curso por iniciar)"],
  },
];
