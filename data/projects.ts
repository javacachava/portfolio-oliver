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
  /** Texto del enlace a `demo`; por defecto, una demostración con datos simulados. */
  demoLabel?: string;
  /** Capturas para la galería (rutas bajo /public), ej. "/projects/pos-1.png" */
  images?: string[];
  status: string;
  statusType: "live" | "active" | "functional";
  accentColor: string;
  featured?: boolean;
  note?: string;
  /** Evidencia de seguridad publicada: no se muestra si no hay un control concreto. */
  securityCase?: {
    risk: string;
    control: string;
    evidence: string;
  };
}

/**
 * Cada afirmación tiene respaldo: CV maestro, repositorio, documentación del proyecto o una
 * demo publicada. Lo que no se pudo verificar (producción, cifras de pruebas, clientes) se omite.
 */
export const projects: Project[] = [
  {
    id: "cuencaos",
    iconName: "Waves",
    title: "CuencaOS / Akhet",
    tagline: "Plataforma de monitoreo y análisis hidrológico de WUJU Labs",
    description:
      "Iniciativa colectiva de WUJU Labs con caso base en Santa Ana. Reúne datos de lluvia y nivel de agua, sensores conectados, mapeo de cuencas e indicadores de riesgo para apoyar decisiones; Akhet es su motor analítico. Es un sistema de apoyo a la decisión: no emite alertas oficiales.",
    stack: ["Python", "PostgreSQL / PostGIS y SQLite", "ESP32 y Raspberry Pi"],
    highlights: [
      "Mi parte: componentes en Python de Akhet, documentación de datos e investigación sobre validación de modelos",
      "Participo en la arquitectura, la selección de tecnologías y las guías de integridad de investigación y manejo responsable de datos",
      "Los resultados relacionados con riesgo pasan por revisión humana antes de usarse",
      "Finalista de StartupSTEM 2026 (una de cinco entre 37 propuestas) y póster en InspiraSTEM 2026",
    ],
    status: "En desarrollo · proyecto colectivo",
    statusType: "active",
    accentColor: "#06b6d4",
    featured: true,
    note: "Proyecto de WUJU: aquí se describe solo mi parte. Su documentación (sept. 2026) declara que aún no hay pilotos ni validación de campo. Repositorio privado.",
  },
  {
    id: "terrivo",
    iconName: "Sprout",
    title: "Terrivo / Atria",
    tagline: "Monitoreo agropecuario de ganado y cultivos",
    description:
      "Iniciativa colectiva de WUJU que integra registros RFID, historial de finca, datos ambientales e imágenes para generar análisis y recomendaciones operativas sujetas a revisión humana. Atria es su componente de datos y análisis.",
    stack: ["Python", "Next.js y TypeScript (sitio del proyecto)"],
    highlights: [
      "Mi parte: componentes de datos en Python para Atria y exploración de modelos analíticos",
      "Participo en la arquitectura y la selección de tecnologías del proyecto",
      "Aún no hay datos de campo, pilotos ni resultados publicables",
    ],
    status: "En desarrollo · proyecto colectivo",
    statusType: "active",
    accentColor: "#34d399",
    featured: true,
    note: "Proyecto de WUJU: aquí se describe solo mi parte. Repositorio privado.",
  },
  {
    id: "tuguiasv",
    iconName: "Globe",
    title: "TuGuíaSV",
    tagline: "Plataforma geolocalizada de turismo e información local en El Salvador",
    description:
      "Cofundé y desarrollo esta plataforma con un equipo de cuatro personas. Está en etapa de prototipo y se orienta a visitantes y a negocios locales.",
    stack: ["DigitalOcean", "Cloudflare CDN", "SendGrid"],
    highlights: [
      "Coordinación de un equipo de cuatro personas, de la idea al prototipo",
      "Trabajo con DigitalOcean, Cloudflare CDN y SendGrid en servicios e infraestructura",
      "Presentado en Feria Eureka 2024 (CONACYT El Salvador) e InspiraSTEM 2025",
    ],
    status: "Prototipo · Jun 2024 – actualidad",
    statusType: "functional",
    accentColor: "#a78bfa",
    featured: true,
    note: "Repositorio privado.",
  },
  {
    id: "restaurant-pos",
    iconName: "Monitor",
    title: "POS para Pizza Brava",
    tagline: "Punto de venta para restaurante con control de acceso por roles",
    description:
      "Sistema con cuatro dominios operativos separados (atención, cocina, caja y administración), tiempo real con Laravel Reverb, modo sin conexión (PWA) e impresión térmica de tickets. Desarrollado como proyecto de servicio social de la ESIT.",
    stack: ["Laravel 13 (PHP 8.4)", "Vue 3", "TypeScript", "PostgreSQL 16", "Redis", "Laravel Reverb", "Docker"],
    highlights: [
      "Versión 1.0 etiquetada en el repositorio",
      "RBAC con spatie/laravel-permission: los permisos se validan en la API, no solo en la interfaz",
      "Pantalla de cocina (KDS) en tiempo real con WebSockets",
      "Suites de pruebas automatizadas: PHPUnit, Vitest y Playwright",
      "Operación sin internet con sincronización al reconectar",
    ],
    status: "Versión 1.0 · Nov 2025 – Mar 2026",
    statusType: "functional",
    accentColor: "#00ff9f",
    featured: true,
    demo: "/demos/pos",
    note: "Servicio social ESIT. Repositorio privado.",
    securityCase: {
      risk: "Exposición de operaciones sensibles de caja, cocina o administración al rol equivocado.",
      control:
        "RBAC con spatie/laravel-permission: roles y permisos separan atención, cocina, caja y administración a nivel de API, no solo de interfaz.",
      evidence:
        "Cuatro módulos operativos separados y pruebas E2E por rol (mesero, cocina, caja y administración) en el repositorio.",
    },
  },
  {
    id: "whatsapp-order-bot",
    iconName: "MessageCircle",
    title: "Bot de pedidos por WhatsApp",
    tagline: "Toma pedidos de un restaurante por WhatsApp",
    description:
      "Bot para Pizza Brava que toma pedidos a cualquier hora, recuerda a clientes frecuentes, sugiere combos y avisa al dueño. El menú y las reglas de negocio se editan en archivos JSON, sin tocar código.",
    stack: ["JavaScript", "Node.js", "SQLite", "Meta Cloud API"],
    highlights: [
      "Flujo conversacional determinista (máquina de estados), sin modelo de lenguaje",
      "Webhook con validación de la firma de Meta antes de procesar eventos",
      "Límite de mensajes por teléfono contra abuso",
      "Pruebas automatizadas en el repositorio",
    ],
    status: "Funcional",
    statusType: "functional",
    accentColor: "#22d3ee",
    demo: "/demos/restaurante-chatbot",
    note: "Repositorio privado.",
    securityCase: {
      risk: "Recepción de solicitudes falsificadas en una integración expuesta por webhook.",
      control: "Validación de la firma enviada por Meta antes de procesar eventos del webhook.",
      evidence: "La verificación vive en webhook_security.js y tiene pruebas de firma válida e inválida.",
    },
  },
  {
    id: "invitaciones",
    iconName: "Calendar",
    title: "Gestión de invitaciones y eventos",
    tagline: "Invitaciones digitales con QR y panel de administración",
    description:
      "Sistema de gestión de eventos con un pase digital por invitado, lector de QR, importación de invitados por CSV, asignación de asientos y comunicados. Puede empaquetarse como app Android con Capacitor.",
    stack: ["React 19", "TypeScript", "Supabase", "Tailwind CSS", "Capacitor", "Vite"],
    highlights: [
      "Pase digital con código QR único por invitado",
      "Importación de invitados por CSV",
      "Panel con lector de QR, asientos y comunicados",
      "Modelo de amenazas y manual de seguridad en el repositorio",
    ],
    status: "Funcional · desplegado en Vercel",
    statusType: "functional",
    accentColor: "#f59e0b",
    demo: "https://invitacion-baby-shower-zeta.vercel.app",
    demoLabel: "Ver sitio desplegado",
    github: "https://github.com/javacachava/invitacion-baby-shower",
  },
  {
    id: "flowcore",
    iconName: "Waves",
    title: "FlowCore",
    tagline: "Simulador hidráulico de redes de alcantarillado",
    description:
      "Genera series temporales sintéticas de nivel y caudal, las limpia con un pipeline determinista y calcula el caudal con la ecuación de Manning. Funciona sin conexión tras la instalación. Proyecto de equipo.",
    stack: ["Python 3.10+", "FastAPI", "SQLite (WAL)", "HTML y JavaScript"],
    highlights: [
      "Limpieza de datos: filtro de mediana, z-score y tasa de cambio",
      "Ecuación de Manning en tres geometrías: rectangular, circular y trapezoidal",
      "Series de nivel y caudal con anomalías y eventos de lluvia programables",
    ],
    status: "Funcional · uso local",
    statusType: "functional",
    accentColor: "#f472b6",
    note: "Repositorio privado.",
  },
];
