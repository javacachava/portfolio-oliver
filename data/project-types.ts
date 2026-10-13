/** Tipos y rótulos de los casos de proyecto. Sin datos: es seguro importarlo desde componentes de cliente. */

export type ProjectKind = "software" | "investigacion" | "ia-datos" | "emprendimiento";

export const projectKindLabels: Record<ProjectKind, string> = {
  software: "Software",
  investigacion: "Investigación",
  "ia-datos": "IA y datos",
  emprendimiento: "Emprendimiento",
};

export type ProjectStatusTone = "development" | "prototype" | "functional" | "delivered";

export interface ProjectStatus {
  label: string;
  tone: ProjectStatusTone;
}

export interface StackItem {
  name: string;
  /** Para qué se usa, en el contexto del proyecto. */
  use: string;
  /** "mine": parte en la que trabajé yo. "project": parte del proyecto en general. */
  scope: "mine" | "project";
}

export interface ProjectLink {
  label: string;
  href: string;
  kind: "demo" | "repo" | "docs";
  note?: string;
  external?: boolean;
}

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
}

export interface ProjectCase {
  slug: string;
  title: string;
  /** Una línea para listados y metadatos. */
  summary: string;
  kinds: ProjectKind[];
  organization: string;
  period?: string;
  status: ProjectStatus;
  featured: boolean;
  teamNote?: string;
  /** 1. Problema que aborda */
  problem: string[];
  /** 2. Contexto y usuarios */
  context: string[];
  /** 3. Solución propuesta o desarrollada */
  solution: string[];
  /** 4. Mi papel y contribuciones verificables */
  role: {
    title: string;
    contributions: string[];
    /** Aclaración explícita de lo que corresponde a otras personas del equipo. */
    notMine?: string;
  };
  /** 5. Stack tecnológico */
  stack: StackItem[];
  /** 6. Decisiones técnicas relevantes */
  decisions: Array<{ title: string; body: string }>;
  /** 7. Estado actual */
  currentState: string[];
  /** 8. Resultados y evidencias */
  evidence: string[];
  /** 9. Repositorio, demostración, capturas o documentación */
  links: ProjectLink[];
  /** Mensaje cuando no hay recursos públicos. */
  noPublicResources?: string;
  images?: ProjectImage[];
}
