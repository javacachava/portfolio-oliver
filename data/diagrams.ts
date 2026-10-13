/**
 * Diagramas de arquitectura por proyecto. Se elaboran solo con lo que está respaldado por el CV,
 * el repositorio o la documentación del proyecto. No son capturas ni representan un sistema
 * terminado: cada diagrama lleva una nota que lo aclara.
 */

export type NodeKind = "mine" | "team" | "external";

export const nodeKindLabels: Record<NodeKind, string> = {
  mine: "Mi parte",
  team: "Otros componentes",
  external: "Actor o servicio externo",
};

export interface DiagramNode {
  id: string;
  /** Columna en el sentido del flujo (de izquierda a derecha en escritorio). */
  col: number;
  row: number;
  label: string;
  /** Rótulo corto para la versión compacta. */
  short: string;
  kind: NodeKind;
}

export interface DiagramEdge {
  from: string;
  to: string;
  /** Flujo de datos (con pulso animado). Sin `flow`, es solo una relación. */
  flow?: boolean;
}

export interface ProjectDiagram {
  /** Sustituye los rótulos de la leyenda cuando los de por defecto no aplican. */
  kindLabels?: Partial<Record<NodeKind, string>>;
  title: string;
  description: string;
  note: string;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
}

/** WUJU frente a mi rol: separa el trabajo institucional del individual. */
export const wujuDiagram: ProjectDiagram = {
  kindLabels: { mine: "Mi rol", team: "WUJU y su equipo" },
  title: "WUJU y mi rol dentro de la organización",
  description: "WUJU reúne áreas permanentes. Mi rol es liderar el equipo técnico, que participa en CuencaOS y Terrivo.",
  note: "Elaborado a partir del CV y de la descripción pública de WUJU en wuju.dev. Las demás áreas son trabajo de otras personas.",
  nodes: [
    { id: "wu", col: 0, row: 1, label: "WUJU: investigación, desarrollo e innovación", short: "WUJU", kind: "team" },
    { id: "tt", col: 1, row: 0, label: "Equipo técnico de seis personas, que lidero", short: "Equipo técnico", kind: "mine" },
    { id: "ot", col: 1, row: 2, label: "Otras áreas: diseño, comunicación y alianzas", short: "Otras áreas", kind: "team" },
    { id: "cu", col: 2, row: 0, label: "CuencaOS / Akhet (WUJU Labs)", short: "CuencaOS", kind: "team" },
    { id: "te", col: 2, row: 1, label: "Terrivo / Atria", short: "Terrivo", kind: "team" },
  ],
  edges: [
    { from: "wu", to: "tt" },
    { from: "wu", to: "ot" },
    { from: "tt", to: "cu" },
    { from: "tt", to: "te" },
  ],
};

export const diagrams: Record<string, ProjectDiagram> = {
  cuencaos: {
    title: "Componentes de CuencaOS / Akhet",
    description: "Cadena de monitoreo hidrológico, desde los sensores hasta la revisión humana de los resultados de riesgo.",
    note: "Elaborado a partir de la documentación del proyecto y del CV. Muestra componentes, no un sistema terminado ni validado en campo.",
    nodes: [
      { id: "s", col: 0, row: 0, label: "Sensores de bajo costo (ESP32)", short: "Sensores", kind: "team" },
      { id: "e", col: 1, row: 0, label: "Agente en el borde (Raspberry Pi)", short: "Borde", kind: "team" },
      { id: "p", col: 2, row: 0, label: "Plataforma: mapa, telemetría y reportes", short: "Plataforma", kind: "team" },
      { id: "a", col: 3, row: 0, label: "Akhet, motor analítico en Python", short: "Akhet", kind: "mine" },
      { id: "g", col: 2, row: 1, label: "Módulo geotécnico: tamizaje por parcela", short: "Geotécnico", kind: "team" },
      { id: "h", col: 3, row: 1, label: "Revisión humana de resultados de riesgo", short: "Revisión humana", kind: "mine" },
    ],
    edges: [
      { from: "s", to: "e", flow: true },
      { from: "e", to: "p", flow: true },
      { from: "p", to: "a", flow: true },
      { from: "a", to: "h", flow: true },
      { from: "p", to: "g" },
    ],
  },
  terrivo: {
    title: "Componentes de Terrivo / Atria",
    description: "Fuentes de datos agropecuarios que Atria integra para generar recomendaciones sujetas a revisión humana.",
    note: "Elaborado a partir del CV y de la documentación del proyecto. Atria y sus modelos están en exploración: no hay datos de campo ni resultados publicables.",
    nodes: [
      { id: "r", col: 0, row: 0, label: "Registros RFID de ganado", short: "RFID", kind: "team" },
      { id: "f", col: 0, row: 1, label: "Historial de finca", short: "Historial", kind: "team" },
      { id: "m", col: 0, row: 2, label: "Datos ambientales e imágenes", short: "Ambiente", kind: "team" },
      { id: "at", col: 1, row: 1, label: "Atria: datos y análisis en Python", short: "Atria", kind: "mine" },
      { id: "mo", col: 2, row: 1, label: "Modelos de predicción en exploración", short: "Modelos", kind: "mine" },
      { id: "rr", col: 3, row: 1, label: "Recomendaciones sujetas a revisión humana", short: "Revisión humana", kind: "team" },
    ],
    edges: [
      { from: "r", to: "at", flow: true },
      { from: "f", to: "at", flow: true },
      { from: "m", to: "at", flow: true },
      { from: "at", to: "mo", flow: true },
      { from: "mo", to: "rr", flow: true },
    ],
  },
  "pos-pizza-brava": {
    title: "Arquitectura del sistema POS",
    description: "Cuatro dominios operativos que consumen una API con control de acceso por roles, con base de datos, tiempo real y modo sin conexión.",
    note: "Elaborado a partir del repositorio y del CV. Es un diagrama de componentes, no una captura de la aplicación.",
    nodes: [
      { id: "w", col: 0, row: 0, label: "Atención (mesero)", short: "Atención", kind: "mine" },
      { id: "k", col: 0, row: 1, label: "Cocina (KDS)", short: "Cocina", kind: "mine" },
      { id: "c", col: 0, row: 2, label: "Caja y administración", short: "Caja y admin", kind: "mine" },
      { id: "api", col: 1, row: 1, label: "API Laravel con roles y permisos (RBAC)", short: "API y RBAC", kind: "mine" },
      { id: "db", col: 2, row: 0, label: "Base de datos PostgreSQL", short: "PostgreSQL", kind: "mine" },
      { id: "rt", col: 2, row: 1, label: "Tiempo real: Redis y Reverb", short: "Tiempo real", kind: "mine" },
      { id: "off", col: 2, row: 2, label: "Modo sin conexión con sincronización", short: "Sin conexión", kind: "mine" },
    ],
    edges: [
      { from: "w", to: "api", flow: true },
      { from: "k", to: "api", flow: true },
      { from: "c", to: "api", flow: true },
      { from: "api", to: "db", flow: true },
      { from: "api", to: "rt", flow: true },
      { from: "off", to: "api", flow: true },
    ],
  },
  tuguiasv: {
    title: "Servicios de apoyo de TuGuíaSV",
    description: "La plataforma geolocalizada y los servicios con los que trabajé: DigitalOcean, Cloudflare CDN y SendGrid.",
    note: "Muestra la plataforma y los servicios con los que trabajé; no describe su arquitectura interna.",
    nodes: [
      { id: "u", col: 0, row: 1, label: "Visitantes y negocios locales", short: "Usuarios", kind: "external" },
      { id: "pl", col: 1, row: 1, label: "Plataforma geolocalizada de turismo e información local", short: "Plataforma", kind: "team" },
      { id: "do", col: 2, row: 0, label: "DigitalOcean: infraestructura", short: "DigitalOcean", kind: "mine" },
      { id: "cf", col: 2, row: 1, label: "Cloudflare CDN", short: "Cloudflare", kind: "mine" },
      { id: "sg", col: 2, row: 2, label: "SendGrid: correo", short: "SendGrid", kind: "mine" },
    ],
    edges: [
      { from: "u", to: "pl" },
      { from: "pl", to: "do" },
      { from: "pl", to: "cf" },
      { from: "pl", to: "sg" },
    ],
  },
  "bot-pedidos-whatsapp": {
    title: "Flujo del bot de pedidos",
    description: "Recorrido de un pedido, desde el mensaje del cliente hasta el aviso al dueño.",
    note: "Elaborado a partir del repositorio. El diagrama describe el flujo del sistema; la demostración usa un menú ficticio.",
    nodes: [
      { id: "cl", col: 0, row: 0, label: "Cliente en WhatsApp (Meta Cloud API)", short: "Cliente", kind: "external" },
      { id: "wh", col: 1, row: 0, label: "Webhook con validación de firma", short: "Webhook", kind: "mine" },
      { id: "fl", col: 2, row: 0, label: "Flujo conversacional: máquina de estados", short: "Flujo", kind: "mine" },
      { id: "ow", col: 3, row: 0, label: "Aviso al dueño con cada pedido", short: "Dueño", kind: "team" },
      { id: "db", col: 2, row: 1, label: "SQLite: sesiones y clientes", short: "SQLite", kind: "mine" },
    ],
    edges: [
      { from: "cl", to: "wh", flow: true },
      { from: "wh", to: "fl", flow: true },
      { from: "fl", to: "ow", flow: true },
      { from: "fl", to: "db" },
    ],
  },
  "gestion-invitaciones": {
    title: "Componentes de la gestión de invitaciones",
    description: "Invitados y organizadores usan una misma aplicación web conectada a Supabase, empaquetable como app Android.",
    note: "Elaborado a partir del repositorio público. Es un diagrama de componentes.",
    nodes: [
      { id: "gu", col: 0, row: 0, label: "Invitado: confirmación y pase con QR", short: "Invitado", kind: "external" },
      { id: "og", col: 0, row: 1, label: "Organizador: panel de administración", short: "Organizador", kind: "external" },
      { id: "app", col: 1, row: 0, label: "Aplicación web React y TypeScript", short: "App web", kind: "mine" },
      { id: "sb", col: 2, row: 0, label: "Supabase: datos y autenticación", short: "Supabase", kind: "mine" },
      { id: "an", col: 1, row: 1, label: "Empaquetado Android con Capacitor", short: "Android", kind: "mine" },
    ],
    edges: [
      { from: "gu", to: "app", flow: true },
      { from: "og", to: "app", flow: true },
      { from: "app", to: "sb", flow: true },
      { from: "app", to: "an" },
    ],
  },
  flowcore: {
    title: "Tubería de FlowCore",
    description: "Series sintéticas que se limpian y se convierten en caudal con la ecuación de Manning.",
    note: "Elaborado a partir del repositorio. Todavía no hay demostración pública.",
    nodes: [
      { id: "sy", col: 0, row: 0, label: "Series sintéticas de nivel y lluvia", short: "Series", kind: "team" },
      { id: "cl", col: 1, row: 0, label: "Limpieza: mediana, z-score y tasa de cambio", short: "Limpieza", kind: "team" },
      { id: "ma", col: 2, row: 0, label: "Caudal con la ecuación de Manning", short: "Manning", kind: "team" },
      { id: "an", col: 3, row: 0, label: "Análisis de series de nivel y caudal", short: "Análisis", kind: "team" },
      { id: "sq", col: 2, row: 1, label: "SQLite: proyectos y simulaciones", short: "SQLite", kind: "team" },
    ],
    edges: [
      { from: "sy", to: "cl", flow: true },
      { from: "cl", to: "ma", flow: true },
      { from: "ma", to: "an", flow: true },
      { from: "ma", to: "sq" },
    ],
  },
};
