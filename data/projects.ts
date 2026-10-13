export interface Project {
  id: string;
  iconName: string;
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  highlights: string[];
  /** Solo para repos públicos — omitir si el repo es privado */
  github?: string;
  demo?: string;
  /** Capturas para la galería (rutas bajo /public), ej. "/projects/pos-1.png" */
  images?: string[];
  status: string;
  statusType: "live" | "active" | "functional" | "prototype";
  accentColor: string;
  featured?: boolean;
  note?: string;
}

/**
 * Fuente de verdad: el CV maestro de Oliver Ascencio. Solo se muestran proyectos y detalles
 * que figuran ahí; lo que no se pudo verificar (producción, cifras de pruebas, clientes)
 * se omite.
 */
export const projects: Project[] = [
  {
    id: "cuencaos",
    iconName: "Waves",
    title: "CuencaOS / Akhet",
    tagline: "Plataforma de monitoreo y análisis hidrológico de WUJU Labs",
    description:
      "Iniciativa de monitoreo hidrológico con datos de lluvia y nivel de agua, sensores conectados, mapeo de cuencas, indicadores de riesgo y análisis predictivo para apoyar decisiones. Akhet es su motor analítico. Proyecto colectivo de WUJU Labs.",
    stack: ["Python", "Sensores conectados", "Análisis de datos"],
    highlights: [
      "Mi parte: componentes en Python de Akhet, documentación de datos e investigación de validación de modelos",
      "Participo en la arquitectura, la selección de tecnologías y las guías de integridad de investigación",
      "Los resultados relacionados con riesgo pasan por revisión humana",
      "Finalista de StartupSTEM 2026 (una de cinco entre 37) y presentado en InspiraSTEM 2026",
    ],
    status: "En desarrollo · proyecto colectivo",
    statusType: "active",
    accentColor: "#06b6d4",
    featured: true,
    note: "Proyecto de WUJU Labs: aquí se describe solo mi parte.",
  },
  {
    id: "terrivo",
    iconName: "Sprout",
    title: "Terrivo / Atria",
    tagline: "Monitoreo agropecuario de ganado y cultivos",
    description:
      "Iniciativa de monitoreo agropecuario que combina registros RFID, historial de finca, datos ambientales e imágenes. Atria es su componente de datos y análisis, con modelos exploratorios para predicciones y recomendaciones operativas sujetas a revisión humana.",
    stack: ["Python", "RFID", "Datos ambientales", "Imágenes"],
    highlights: [
      "Mi parte: componentes de datos en Python para Atria y exploración de modelos analíticos",
      "Participo en la arquitectura y la selección de tecnologías del proyecto",
      "Las recomendaciones operativas quedan sujetas a revisión humana",
    ],
    status: "En desarrollo · proyecto colectivo",
    statusType: "active",
    accentColor: "#34d399",
    featured: true,
    note: "Proyecto de WUJU: aquí se describe solo mi parte.",
  },
  {
    id: "tuguiasv",
    iconName: "Globe",
    title: "TuGuíaSV",
    tagline: "Plataforma geolocalizada de turismo e información local en El Salvador",
    description:
      "Plataforma geolocalizada de turismo e información local, desarrollada y prototipada por un equipo de cuatro personas. Cofundador y desarrollador del proyecto desde junio de 2024.",
    stack: ["DigitalOcean", "Cloudflare CDN", "SendGrid"],
    highlights: [
      "Coordinación de un equipo de cuatro personas",
      "Servicios e infraestructura con DigitalOcean, Cloudflare CDN y SendGrid",
      "Presentado en Feria Eureka 2024 (CONACYT El Salvador) e InspiraSTEM 2025",
    ],
    status: "Prototipo · Jun 2024 – presente",
    statusType: "prototype",
    accentColor: "#a78bfa",
    featured: true,
  },
  {
    id: "restaurant-pos",
    iconName: "Monitor",
    title: "Sistema POS para Pizza Brava",
    tagline: "Punto de venta con control de acceso por roles (servicio social)",
    description:
      "Sistema de punto de venta para un restaurante, con cuentas de cajero, cocina y administrador. Desarrollado como servicio social con ESIT entre noviembre de 2025 y marzo de 2026.",
    stack: ["React", "Node.js", "PostgreSQL", "Firestore", "RBAC"],
    highlights: [
      "Diseñé e implementé el control de acceso por roles (RBAC) con mínimo privilegio",
      "Diseñé la base de datos PostgreSQL y su sincronización con Firestore; desarrollé la funcionalidad con React y Node.js",
      "Levanté requisitos con el dueño del negocio y capacité al personal",
    ],
    status: "Servicio social · Nov 2025 – Mar 2026",
    statusType: "functional",
    accentColor: "#00ff9f",
    featured: true,
    note: "Servicio social ESIT.",
  },
];
