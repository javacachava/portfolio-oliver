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

export const projects: Project[] = [
  {
    id: "tuguiasv",
    iconName: "Globe",
    title: "TuGuiaSV",
    tagline: "Plataforma geolocalizada para turismo y negocios locales en El Salvador",
    description:
      "Cofundé y lidero esta plataforma que conecta turismo y negocios locales en El Salvador: reseñas verificadas y mapa interactivo para descubrir lugares. Dirijo un equipo de 4 personas desde la idea hasta el prototipo funcional.",
    stack: ["DigitalOcean", "Cloudflare CDN", "SendGrid"],
    highlights: [
      "Sistema de reseñas y mapa interactivo",
      "Equipo de 4 personas, de la idea al prototipo funcional",
      "Infraestructura propia: DigitalOcean, Cloudflare CDN y SendGrid",
      "Presentado en Feria Eureka 2024 (CONACYT El Salvador) e InspiraSTEM 2025",
    ],
    status: "Prototipo funcional · Jun 2024 – presente",
    statusType: "functional",
    accentColor: "#06b6d4",   // cyan
    featured: true,
  },
  {
    id: "whatsapp-order-bot",
    iconName: "MessageCircle",
    title: "Bot de Pedidos WhatsApp",
    tagline: "Pedidos 24/7 sin mesero — en producción real",
    description:
      "Bot de WhatsApp para un restaurante local. Toma pedidos a cualquier hora, recuerda clientes frecuentes, sugiere combos y notifica al dueño. El menú se actualiza desde un JSON — sin tocar código.",
    stack: ["JavaScript", "Node.js", "Meta Cloud API", "WhatsApp Business"],
    highlights: [
      "En producción con cliente real",
      "Sistema data-driven: menú y config editables sin código",
      "Tests incluidos",
      "Webhook con validación de firma Meta (listo para producción)",
    ],
    status: "En producción ✓ · Cliente real",
    statusType: "live",
    accentColor: "#00ff9f",   // green — LIVE = operational
    featured: true,
    demo: "/demos/restaurante-chatbot/",
    securityCase: {
      risk: "Recepción de solicitudes falsificadas en una integración expuesta por webhook.",
      control: "Validación de la firma enviada por Meta antes de procesar eventos del webhook.",
      evidence: "Control documentado en la integración del bot de pedidos en producción.",
    },
  },
  {
    id: "restaurant-pos",
    iconName: "Monitor",
    title: "POS para Restaurante",
    tagline: "Sistema de punto de venta completo — v1.0 en producción",
    description:
      "Sistema de punto de venta con 4 dominios operativos aislados: mesero, cocina (KDS), caja y administración. Tiempo real con WebSockets (Laravel Reverb), PWA offline-first con sincronización y impresión térmica de tickets.",
    stack: ["Laravel 13 (PHP 8.4)", "Vue 3", "TypeScript", "Pinia", "PostgreSQL 16", "Redis", "Laravel Reverb", "Docker"],
    highlights: [
      "v1.0 lanzado y operando en producción",
      "RBAC real con spatie/laravel-permission: mesero, cocina, caja y administración estrictamente separados",
      "KDS (Kitchen Display System) en tiempo real vía WebSockets (Laravel Reverb)",
      "1,600+ tests: 567 PHPUnit + 936 Vitest + 109 E2E Playwright",
      "PWA offline-first: la operación sigue sin internet y sincroniza al volver",
    ],
    status: "En producción ✓ · v1.0",
    statusType: "live",
    accentColor: "#00ff9f",   // green — LIVE = operational
    featured: true,
    demo: "/demos/pos/",
    note: "Iniciado como proyecto de servicio social ESIT · v1.0 en producción",
    securityCase: {
      risk: "Exposición de operaciones sensibles de caja, cocina o administración al rol equivocado.",
      control: "RBAC con spatie/laravel-permission: roles y permisos separan mesero, cocina, caja y administración a nivel de API, no solo de interfaz.",
      evidence: "Cuatro módulos operativos aislados y 109 pruebas E2E de Playwright que verifican el control de acceso, en un sistema con tag v1.0.0 en producción.",
    },
  },
  {
    id: "invitaciones",
    iconName: "Calendar",
    title: "Gestión de Invitaciones y Eventos",
    tagline: "Invitaciones digitales con QR, control de asistencia y app Android — todo en uno",
    description:
      "Sistema completo de gestión de eventos con invitaciones digitales personalizadas, check-in por código QR, importación masiva de invitados por CSV y exportación en lote. Empacado como app Android nativa con Capacitor.",
    stack: ["React 19", "TypeScript", "Supabase", "Tailwind CSS", "Capacitor", "QR Code", "PapaParse", "Vite"],
    highlights: [
      "Invitaciones digitales con QR único por invitado",
      "Importación/exportación masiva de invitados por CSV",
      "App Android nativa empacada con Capacitor",
      "Check-in en tiempo real con Supabase Realtime",
    ],
    status: "Funcional · Deploy en Vercel",
    statusType: "functional",
    accentColor: "#06b6d4",   // cyan
    github: "https://github.com/javacachava/invitacion-baby-shower",
  },
  {
    id: "flowcore",
    iconName: "Waves",
    title: "FlowCore",
    tagline: "¿Cómo fluye el agua por una red de tuberías? Este simulador lo calcula.",
    description:
      "Simula redes de alcantarillado sanitario y pluvial en tiempo real. Detecta datos corruptos automáticamente, limpia las series temporales y calcula caudal con la ecuación de Manning. Sin internet, sin servicios externos — corre en cualquier máquina.",
    stack: ["Python 3.10+", "SQLite (WAL)", "HTML", "JavaScript"],
    highlights: [
      "Detecta y limpia datos corruptos: filtro mediana + z-score + tasa de cambio",
      "Ecuación de Manning en 3 geometrías: rectangular, circular y trapezoidal",
      "Genera series temporales de nivel y caudal para análisis de infraestructura",
      "100% offline — sin dependencias externas post-instalación",
    ],
    status: "Funcional · Deploy disponible",
    statusType: "functional",
    accentColor: "#a78bfa",   // violet
  },
];
