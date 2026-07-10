export interface Project {
  id: string;
  iconName: string;
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  highlights: string[];
  github: string;
  demo?: string;
  image?: string;
  status: string;
  statusType: "live" | "active" | "functional";
  accentColor: string;
  featured?: boolean;
  note?: string;
}

export const projects: Project[] = [
  {
    id: "tuguiasv",
    iconName: "Globe",
    title: "TuGuiaSV",
    tagline: "Infraestructura nacional de datos geoespaciales verificados de El Salvador",
    description:
      "Plataforma B2B que provee datos de Puntos de Interés (POIs) verificados en El Salvador. No es un directorio — es infraestructura. Las empresas consumen la API para integrar datos locales confiables sin depender de Google Maps.",
    stack: ["NestJS", "TypeScript", "PostgreSQL", "PostGIS", "Redis", "MinIO", "Docker", "JWT", "Swagger"],
    highlights: [
      "Sistema de roles: admin / verifier / commerce / api_consumer",
      "Score de confianza con degradación automática (algoritmo propio)",
      "Consultas geoespaciales PostGIS — búsqueda por proximidad en km",
      "Planes B2B con precios reales: Free($0) / Basic($29.99) / Pro($99.99) / Enterprise",
      "Offline-first con OpenStreetMap",
    ],
    github: "https://github.com/javacachava/TuGuiaSV",
    status: "Backend funcional · Demo disponible",
    statusType: "functional",
    accentColor: "#06b6d4",   // cyan
    featured: true,
  },
  {
    id: "chismecito",
    iconName: "TrendingUp",
    title: "chismeci.to",
    tagline: "Mercados de predicción impulsados por inteligencia colectiva",
    description:
      "Plataforma serverless de predicciones con créditos de participación (sin dinero real). Ingesta mercados automáticamente desde X (Twitter) y los resuelve con Edge Functions.",
    stack: ["Supabase", "PostgreSQL", "Edge Functions", "Realtime", "X API", "JWT", "RLS"],
    highlights: [
      "Arquitectura 100% serverless (Edge Functions + Supabase)",
      "Ingesta automática de mercados desde X vía cron",
      "Row Level Security (RLS) con permisos mínimos",
      "Admin solo por JWT role claim",
    ],
    github: "https://github.com/javacachava/chismeci.to",
    status: "Serverless · En desarrollo activo",
    statusType: "active",
    accentColor: "#a78bfa",   // violet
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
    github: "https://github.com/javacachava/pizzabrava-bot",
    status: "En producción ✓ · Cliente real",
    statusType: "live",
    accentColor: "#00ff9f",   // green — LIVE = operational
    featured: true,
  },
  {
    id: "restaurant-pos",
    iconName: "Monitor",
    title: "POS para Restaurante",
    tagline: "Sistema de punto de venta completo — v1.0 en producción",
    description:
      "Sistema de punto de venta con 4 dominios operativos aislados: mesero, cocina (KDS), caja y administración. Tiempo real con WebSockets (Laravel Reverb), PWA offline-first con sincronización y impresión térmica de tickets.",
    stack: ["Laravel PHP 8.4", "Vue 3", "TypeScript", "Pinia", "PostgreSQL 16", "Redis", "Laravel Reverb", "Docker"],
    highlights: [
      "v1.0 lanzado y operando en producción",
      "4 módulos por rol con acceso estrictamente separado",
      "KDS (Kitchen Display System) en tiempo real vía WebSockets",
      "1,400+ tests: 550 PHPUnit + 899 Vitest + 26 E2E Playwright",
      "PWA offline-first: la operación sigue sin internet y sincroniza al volver",
    ],
    github: "https://github.com/javacachava/POS",
    status: "En producción ✓ · v1.0",
    statusType: "live",
    accentColor: "#00ff9f",   // green — LIVE = operational
    featured: true,
    note: "Iniciado como proyecto de servicio social ESIT · v1.0 en producción desde Jul 2026",
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
    github: "https://github.com/javacachava/invitacion-baby-shower",
    status: "Funcional · Deploy en Vercel",
    statusType: "functional",
    accentColor: "#06b6d4",   // cyan
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
    github: "https://github.com/javacachava/FlowCore",
    status: "Funcional · Deploy disponible",
    statusType: "functional",
    accentColor: "#a78bfa",   // violet
  },
];
