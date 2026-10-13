/**
 * Casos de proyecto. Cada afirmación debe tener respaldo: CV maestro, repositorio,
 * documentación del proyecto o una demo publicada. Lo que no se pueda sostener se omite.
 * Fuentes y pendientes de confirmación: docs/CONTENIDO.md.
 */
import type { ProjectCase } from "./project-types";

export * from "./project-types";

export const projects: ProjectCase[] = [
  {
    slug: "cuencaos",
    title: "CuencaOS / Akhet",
    summary:
      "Plataforma de monitoreo y análisis hidrológico de WUJU Labs, con caso base en Santa Ana.",
    kinds: ["investigacion", "ia-datos", "software"],
    organization: "WUJU Labs",
    status: { label: "En desarrollo", tone: "development" },
    featured: true,
    teamNote: "Proyecto colectivo de WUJU. Aquí se describe solo mi parte.",
    problem: [
      "Las decisiones sobre riesgo hídrico requieren datos de lluvia y nivel de agua, y un análisis que se pueda revisar. CuencaOS busca reunir esos datos, calcular indicadores de riesgo y apoyar la decisión con análisis predictivo.",
    ],
    context: [
      "Iniciativa de WUJU Labs con caso base en Santa Ana, El Salvador. Combina datos de lluvia y nivel de agua, sensores conectados, mapeo de cuencas e indicadores de riesgo.",
      "Akhet es el motor analítico de la plataforma. El proyecto se desarrolla con un grupo multidisciplinario.",
    ],
    solution: [
      "Según su documentación, CuencaOS es una plataforma modular, en español y pensada para operar sin conexión continua. Incluye mapa y telemetría de sensores, un módulo de tamizaje geotécnico por parcela (inundación y estabilidad de taludes) y un simulador hidráulico para validar el motor de cálculo.",
      "Es un sistema de apoyo a la decisión: no emite alertas oficiales.",
    ],
    role: {
      title: "Desarrollo de componentes de análisis y participación en decisiones técnicas",
      contributions: [
        "Desarrollo de componentes en Python para Akhet, el motor analítico.",
        "Documentación de datos e investigación sobre validación de modelos.",
        "Revisión humana de las salidas relacionadas con riesgo, como parte del proceso del proyecto.",
        "Participación en la arquitectura y la selección de tecnologías, y en las guías internas de integridad de investigación y manejo responsable de datos.",
      ],
      notMine:
        "Sensores, firmware, plataforma web y demás módulos son trabajo del equipo de WUJU y no se atribuyen a una sola persona.",
    },
    stack: [
      { name: "Python", use: "Componentes del motor analítico Akhet", scope: "mine" },
      {
        name: "PostgreSQL/PostGIS y SQLite",
        use: "Persistencia de la plataforma, según su documentación",
        scope: "project",
      },
      {
        name: "ESP32 y Raspberry Pi",
        use: "Nodos de sensores y agente en el borde, según su documentación",
        scope: "project",
      },
    ],
    decisions: [
      {
        title: "Lo no validado se declara como tal",
        body: "La documentación del proyecto rotula como «no validado en campo» lo que aún no se ha contrastado con mediciones reales, y los informes declaran sus límites.",
      },
      {
        title: "Revisión humana de resultados de riesgo",
        body: "Las salidas del análisis que afectan decisiones de riesgo pasan por revisión de una persona antes de usarse. El modelo asiste; no decide.",
      },
      {
        title: "Alertas sobre la serie sin suavizar",
        body: "Según su diseño, las alertas se evalúan sobre la serie cruda para que el filtrado no oculte una crecida real.",
      },
    ],
    currentState: [
      "En desarrollo. La documentación del proyecto (septiembre de 2026) declara que todavía no hay pilotos, clientes ni validación de campo.",
    ],
    evidence: [
      "Finalista de StartupSTEM 2026 (UNICAES), una de cinco finalistas seleccionadas entre 37 propuestas.",
      "Presentado como póster científico en InspiraSTEM 2026.",
    ],
    links: [],
    noPublicResources:
      "El repositorio es privado y aún no hay capturas ni demostración pública.",
  },
  {
    slug: "terrivo",
    title: "Terrivo / Atria",
    summary:
      "Monitoreo agropecuario de ganado y cultivos con registros RFID, datos ambientales e imágenes.",
    kinds: ["ia-datos", "emprendimiento"],
    organization: "WUJU",
    status: { label: "En desarrollo", tone: "development" },
    featured: true,
    teamNote: "Proyecto colectivo de WUJU. Aquí se describe solo mi parte.",
    problem: [
      "En el sector agropecuario la información proviene de fuentes distintas: registros de identificación, historial de finca, datos ambientales e imágenes. Terrivo busca integrarla para apoyar decisiones operativas.",
    ],
    context: [
      "Iniciativa de WUJU que parte del sector agropecuario, con ganado y cultivos como primer campo. Su línea de trabajo combina identificación por RFID, monitoreo con drones y una plataforma de gestión del campo.",
      "Atria es el componente de datos y análisis.",
    ],
    solution: [
      "Una plataforma que reúne registros RFID, historial de finca, datos ambientales e imágenes, y explora modelos analíticos para generar predicciones y recomendaciones operativas, siempre sujetas a revisión humana.",
    ],
    role: {
      title: "Desarrollo de componentes de datos en Python y decisiones de arquitectura",
      contributions: [
        "Desarrollo de componentes de datos en Python para Atria.",
        "Exploración de modelos analíticos para predicciones y recomendaciones operativas.",
        "Participación en la arquitectura y la selección de tecnologías del proyecto.",
      ],
      notMine:
        "El resto del trabajo (negocio, hardware, operación en campo) corresponde a otras personas del equipo.",
    },
    stack: [
      { name: "Python", use: "Componentes de datos de Atria y exploración de modelos", scope: "mine" },
      {
        name: "Next.js, TypeScript y Tailwind CSS",
        use: "Sitio web del proyecto",
        scope: "project",
      },
    ],
    decisions: [
      {
        title: "Recomendaciones sujetas a revisión humana",
        body: "Las predicciones y recomendaciones operativas se tratan como apoyo a la decisión de quien conoce el campo, no como instrucciones automáticas.",
      },
    ],
    currentState: [
      "En desarrollo. Los precios y cifras financieras del sitio del proyecto son referencias o proyecciones, no resultados históricos.",
    ],
    evidence: ["Todavía no hay resultados, pilotos ni datos de campo publicables."],
    links: [],
    noPublicResources: "El repositorio es privado y aún no hay capturas ni demostración pública.",
  },
  {
    slug: "pos-pizza-brava",
    title: "Sistema POS para Pizza Brava",
    summary:
      "Punto de venta para restaurante con control de acceso por roles, desarrollado como servicio social.",
    kinds: ["software"],
    organization: "Pizza Brava / ESIT (servicio social)",
    period: "Nov 2025 – Mar 2026",
    status: { label: "Versión 1.0", tone: "delivered" },
    featured: true,
    problem: [
      "Un restaurante necesita que cada persona vea y haga solo lo que le corresponde: quien toma pedidos no debería poder anular cobros, y quien administra no debería depender de otras personas para consultar la operación.",
    ],
    context: [
      "Pizza Brava, restaurante en Santa Ana. Los usuarios son el personal de atención, cocina, caja y administración, además de reparto.",
      "Se desarrolló como proyecto de servicio social de la ESIT. Los requisitos se levantaron directamente con el dueño del negocio.",
    ],
    solution: [
      "Un monolito modular con interfaz web de una sola página y API propia. Separa cuatro dominios operativos (atención, cocina, caja y administración) y suma reparto, impresión de tickets ESC/POS, facturación adaptada a El Salvador, tiempo real y modo sin conexión.",
    ],
    role: {
      title: "Desarrollador del sistema",
      contributions: [
        "Diseño e implementación del control de acceso por roles (RBAC) con principio de mínimo privilegio.",
        "Diseño de la base de datos PostgreSQL.",
        "Levantamiento de requisitos con el dueño del negocio.",
        "Capacitación del personal en el uso de la aplicación.",
      ],
    },
    stack: [
      { name: "Laravel 13 (PHP 8.4)", use: "API y lógica de negocio con arquitectura por capas", scope: "mine" },
      { name: "Vue 3 y TypeScript", use: "Aplicación web de una sola página", scope: "mine" },
      { name: "PostgreSQL 16", use: "Base de datos transaccional", scope: "mine" },
      { name: "spatie/laravel-permission", use: "Roles y permisos del RBAC", scope: "mine" },
      { name: "Redis y Laravel Reverb", use: "Colas y actualizaciones en tiempo real", scope: "mine" },
      { name: "Docker Compose", use: "Entorno de desarrollo y despliegue", scope: "mine" },
    ],
    decisions: [
      {
        title: "Permisos aplicados en la API, no solo en la interfaz",
        body: "Los roles de atención, cocina, caja y administración se validan en el servidor mediante políticas y casos de uso. Ocultar un botón no cuenta como control de acceso.",
      },
      {
        title: "Arquitectura por capas",
        body: "Dominio, casos de uso e infraestructura separados: los controladores validan, delegan en un caso de uso y devuelven JSON. Eso permite probar la lógica de negocio sin depender del framework.",
      },
      {
        title: "Operación sin internet",
        body: "La aplicación guarda operaciones localmente y las sincroniza al recuperar la conexión, porque un restaurante no puede detener el servicio por una caída de red.",
      },
    ],
    currentState: [
      "El repositorio cuenta con la versión 1.0.0 etiquetada y suites de pruebas automatizadas (PHPUnit, Vitest y Playwright).",
    ],
    evidence: [
      "Demostración interactiva con datos simulados que reproduce los flujos de atención, cocina y caja. No es el sistema real ni usa datos del negocio.",
    ],
    links: [
      {
        label: "Demostración interactiva (datos simulados)",
        href: "/demos/pos",
        kind: "demo",
        note: "Se abre en una pestaña nueva.",
        external: true,
      },
    ],
    noPublicResources: "El repositorio es privado.",
  },
  {
    slug: "tuguiasv",
    title: "TuGuíaSV",
    summary:
      "Plataforma geolocalizada de turismo e información local en El Salvador, en etapa de prototipo.",
    kinds: ["emprendimiento", "software"],
    organization: "TuGuíaSV",
    period: "Jun 2024 – actualidad",
    status: { label: "Prototipo", tone: "prototype" },
    featured: true,
    teamNote: "Equipo de cuatro personas.",
    problem: [
      "El proyecto parte de que quien visita un lugar de El Salvador necesita información local confiable según dónde se encuentra, y de que los negocios locales necesitan darse a conocer a esos visitantes.",
    ],
    context: [
      "Iniciativa de emprendimiento con un equipo de cuatro personas. Está orientada a visitantes y a negocios locales.",
    ],
    solution: [
      "Una plataforma geolocalizada para consultar información turística y local, prototipada por el equipo.",
    ],
    role: {
      title: "Cofundador y desarrollador del proyecto",
      contributions: [
        "Coordinación de un equipo de cuatro personas.",
        "Desarrollo y prototipado de la plataforma.",
        "Trabajo con DigitalOcean, Cloudflare CDN y SendGrid en servicios e infraestructura.",
      ],
    },
    stack: [
      { name: "DigitalOcean", use: "Infraestructura de la plataforma", scope: "mine" },
      { name: "Cloudflare CDN", use: "Distribución de contenido", scope: "mine" },
      { name: "SendGrid", use: "Envío de correo transaccional", scope: "mine" },
    ],
    decisions: [],
    currentState: ["Prototipo. En desarrollo desde junio de 2024."],
    evidence: [
      "Presentado en Feria Eureka 2024 (CONACYT El Salvador).",
      "Presentado como póster en InspiraSTEM 2025.",
    ],
    links: [],
    noPublicResources: "El repositorio es privado y no hay demostración pública.",
  },
  {
    slug: "bot-pedidos-whatsapp",
    title: "Bot de pedidos por WhatsApp",
    summary:
      "Bot que toma pedidos de un restaurante por WhatsApp, con menú editable sin tocar código.",
    kinds: ["software"],
    organization: "Pizza Brava",
    status: { label: "Funcional", tone: "functional" },
    featured: false,
    problem: [
      "Un restaurante recibe pedidos por mensajería a cualquier hora, y atenderlos a mano consume tiempo de quien también está operando el local.",
    ],
    context: [
      "Desarrollado para Pizza Brava. El dueño recibe una notificación por cada pedido y puede usar comandos para gestionarlos.",
    ],
    solution: [
      "Un bot que conversa con el cliente por WhatsApp, arma el carrito, recuerda a clientes recurrentes, sugiere combos y notifica al dueño. El menú y las reglas de negocio viven en archivos JSON, de modo que se actualizan sin modificar el código.",
    ],
    role: {
      title: "Desarrollo del bot",
      contributions: [
        "Implementación del bot de pedidos y de su flujo conversacional.",
        "Integración con la API de WhatsApp Business (Meta Cloud API).",
      ],
    },
    stack: [
      { name: "Node.js (JavaScript)", use: "Servidor del webhook y flujo conversacional", scope: "mine" },
      { name: "SQLite", use: "Sesiones de conversación, clientes y estadísticas", scope: "mine" },
      { name: "Meta Cloud API", use: "Envío y recepción de mensajes de WhatsApp", scope: "mine" },
    ],
    decisions: [
      {
        title: "Validación de la firma del webhook",
        body: "Con el secreto de la aplicación configurado, el bot verifica que cada solicitud provenga de Meta y rechaza las falsificadas. Sin ese secreto solo debe usarse en desarrollo.",
      },
      {
        title: "Máquina de estados en lugar de un modelo de lenguaje",
        body: "La conversación sigue un flujo determinista con reconocimiento de productos. Es predecible, barata de operar y fácil de probar.",
      },
      {
        title: "Menú y reglas como datos",
        body: "Precios, productos, horarios y costo de envío se editan en JSON, sin desplegar código nuevo.",
      },
      {
        title: "Protección contra spam",
        body: "Límite de mensajes por teléfono para evitar abusos.",
      },
    ],
    currentState: [
      "Funcional, con un conjunto de pruebas incluido en el repositorio.",
    ],
    evidence: [
      "Demostración interactiva con un menú ficticio que reproduce el flujo de conversación. No usa datos reales.",
    ],
    links: [
      {
        label: "Demostración interactiva (datos ficticios)",
        href: "/demos/restaurante-chatbot",
        kind: "demo",
        note: "Se abre en una pestaña nueva.",
        external: true,
      },
    ],
    noPublicResources: "El repositorio es privado.",
  },
  {
    slug: "gestion-invitaciones",
    title: "Gestión de invitaciones y eventos",
    summary:
      "Invitaciones digitales con código QR, control de asistencia y panel de administración.",
    kinds: ["software"],
    organization: "Proyecto propio",
    period: "2026",
    status: { label: "Funcional", tone: "functional" },
    featured: false,
    problem: [
      "Organizar un evento implica enviar invitaciones, confirmar asistentes y controlar el acceso el día del evento, normalmente con listas y mensajes dispersos.",
    ],
    context: [
      "Nació como invitación digital para un baby shower y creció hasta convertirse en un sistema de gestión de eventos. Tiene una parte pública para invitados y un panel de administración para quien organiza.",
    ],
    solution: [
      "Cada invitado recibe un pase digital con un código QR único. El panel permite gestionar invitados, leer los códigos con la cámara, asignar asientos y enviar comunicados. La aplicación puede empaquetarse como app Android con Capacitor.",
    ],
    role: {
      title: "Desarrollo individual",
      contributions: [
        "Diseño y desarrollo de la aplicación completa, de forma individual.",
        "Esquema y funciones SQL en Supabase.",
        "Documentación de seguridad: modelo de amenazas y manual de operación.",
      ],
    },
    stack: [
      { name: "React 19 y TypeScript", use: "Aplicación web de invitados y panel", scope: "mine" },
      { name: "Vite y Tailwind CSS", use: "Compilación y estilos", scope: "mine" },
      { name: "Supabase", use: "Base de datos y autenticación", scope: "mine" },
      { name: "qrcode y PapaParse", use: "Generación de códigos QR e importación de invitados por CSV", scope: "mine" },
      { name: "Capacitor", use: "Empaquetado como app Android", scope: "mine" },
    ],
    decisions: [
      {
        title: "Seguridad documentada",
        body: "El repositorio incluye un modelo de amenazas y un manual de operación de seguridad, no solo código.",
      },
    ],
    currentState: ["Funcional y desplegado en Vercel."],
    evidence: ["Sitio desplegado y repositorio público con el historial completo."],
    links: [
      {
        label: "Sitio desplegado",
        href: "https://invitacion-baby-shower-zeta.vercel.app",
        kind: "demo",
        external: true,
      },
      {
        label: "Repositorio en GitHub",
        href: "https://github.com/javacachava/invitacion-baby-shower",
        kind: "repo",
        external: true,
      },
    ],
  },
  {
    slug: "flowcore",
    title: "FlowCore",
    summary:
      "Simulador hidráulico de redes de alcantarillado que limpia series de datos y calcula caudal.",
    kinds: ["investigacion", "ia-datos"],
    organization: "Proyecto de equipo",
    status: { label: "Funcional", tone: "functional" },
    featured: false,
    problem: [
      "Para probar un motor de análisis hidrológico hacen falta series de nivel y caudal con comportamiento conocido, incluidas anomalías, algo difícil de obtener con datos reales.",
    ],
    context: [
      "Simulador de uso individual, pensado para correr sin conexión a internet y sin servicios externos.",
    ],
    solution: [
      "Genera series temporales sintéticas de nivel y caudal con patrón diario, ruido, anomalías programables y eventos de lluvia. Aplica una limpieza determinista (filtro de mediana, z-score y tasa de cambio) y calcula el caudal con la ecuación de Manning en tres geometrías: rectangular, circular y trapezoidal.",
    ],
    role: {
      title: "Desarrollo (proyecto de equipo)",
      contributions: ["Participación en el desarrollo del simulador."],
      notMine: "El proyecto se desarrolló en equipo.",
    },
    stack: [
      { name: "Python", use: "Motor de simulación, limpieza de datos y servidor web", scope: "project" },
      { name: "SQLite (WAL)", use: "Persistencia local de proyectos y simulaciones", scope: "project" },
      { name: "HTML y JavaScript", use: "Interfaz de usuario", scope: "project" },
    ],
    decisions: [
      {
        title: "Valores de referencia para las pruebas",
        body: "Las pruebas del motor comparan contra valores de referencia calculados aparte, de modo que un cambio en la física se detecta.",
      },
      {
        title: "Separación estricta por capas",
        body: "Una prueba automatizada verifica que las dependencias fluyan en un solo sentido, del servidor web hacia el motor.",
      },
    ],
    currentState: ["Funcional en entorno local. El repositorio es privado."],
    evidence: ["Todavía no hay demostración pública ni resultados publicables."],
    links: [],
    noPublicResources: "El repositorio es privado.",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string): ProjectCase | undefined {
  return projects.find((p) => p.slug === slug);
}
