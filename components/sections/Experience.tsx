"use client";

import { motion } from "framer-motion";
import { Briefcase, Code2, MapPin, Users } from "lucide-react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

type ExperienceItem = {
  role: string;
  org: string;
  period: string;
  summary: string;
  bullets: string[];
  stack?: string[];
  accent: string;
};

const EXPERIENCE: ExperienceItem[] = [
  {
    role: "Cofundador y Líder Técnico",
    org: "WUJU",
    period: "2025 – presente",
    summary:
      "Coordinación técnica de iniciativas de software, datos e investigación aplicada dentro de un grupo multidisciplinario.",
    bullets: [
      "Coordino un equipo técnico de seis personas en iniciativas de software, datos e investigación aplicada",
      "Levanto requisitos con clientes y partes interesadas, defino el alcance, documento decisiones técnicas y doy seguimiento a los entregables con prácticas ágiles",
      "Participo en la arquitectura y la selección de tecnologías de CuencaOS y Terrivo, y en las guías internas de integridad de investigación, manejo responsable de datos y revisión de proyectos",
    ],
    accent: "#9b7bff",
  },
  {
    role: "Desarrollador — Sistema POS para Pizza Brava",
    org: "Servicio Social ESIT",
    period: "Nov 2025 – Mar 2026",
    summary:
      "Sistema de punto de venta con control de acceso por roles para cajero, cocina y administrador.",
    bullets: [
      "Diseñé e implementé el control de acceso por roles (RBAC) aplicando el principio de mínimo privilegio",
      "Diseñé la base de datos PostgreSQL y desarrollé funcionalidades de la aplicación",
      "Levanté los requisitos con el dueño del negocio y capacité al personal en el uso del sistema",
    ],
    stack: ["PostgreSQL", "RBAC"],
    accent: "#00ff9f",
  },
  {
    role: "Cofundador y Desarrollador del proyecto",
    org: "TuGuíaSV",
    period: "Jun 2024 – presente",
    summary:
      "Plataforma geolocalizada de turismo e información local en El Salvador, en etapa de prototipo.",
    bullets: [
      "Coordiné un equipo de cuatro personas en el desarrollo y prototipado de la plataforma",
      "Trabajé con DigitalOcean, Cloudflare CDN y SendGrid en servicios e infraestructura",
      "Presenté el proyecto en Feria Eureka 2024 (CONACYT El Salvador) e InspiraSTEM 2025",
    ],
    stack: ["DigitalOcean", "Cloudflare CDN", "SendGrid"],
    accent: "#06b6d4",
  },
];

function ExperienceCard({ item, index }: { item: ExperienceItem; index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      className="relative pl-8 sm:pl-10"
    >
      <span
        aria-hidden="true"
        className="absolute left-0 top-1.5 h-3 w-3 rounded-full border-2"
        style={{ borderColor: item.accent, background: "var(--background)" }}
      />
      {index < EXPERIENCE.length - 1 && (
        <span
          aria-hidden="true"
          className="absolute left-[5px] top-5 bottom-[-2.5rem] w-px"
          style={{ background: `${item.accent}30` }}
        />
      )}

      <div
        className="rounded-2xl border bg-[var(--card)] p-5 sm:p-6"
        style={{ borderColor: `${item.accent}40` }}
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-[var(--foreground)] leading-snug">{item.role}</h3>
            <p className="mt-1 flex items-center gap-1.5 font-mono text-xs" style={{ color: item.accent }}>
              <Briefcase size={12} aria-hidden="true" />
              {item.org}
            </p>
          </div>
          <span
            className="shrink-0 rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-wide"
            style={{ color: item.accent, borderColor: `${item.accent}45`, background: `${item.accent}10` }}
          >
            {item.period}
          </span>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{item.summary}</p>

        <ul className="mt-4 space-y-1.5">
          {item.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-2 text-sm leading-relaxed text-[var(--foreground)]">
              <span aria-hidden="true" style={{ color: item.accent }}>
                ▸
              </span>
              {bullet}
            </li>
          ))}
        </ul>

        {item.stack && (
          <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t" style={{ borderColor: `${item.accent}25` }}>
            {item.stack.map((technology) => (
              <span
                key={technology}
                className="font-mono text-[10px] px-2 py-1 rounded border"
                style={{ color: `${item.accent}dd`, background: `${item.accent}0c`, borderColor: `${item.accent}25` }}
              >
                {technology}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.li>
  );
}

export default function Experience() {
  return (
    <section id="experiencia" className="py-14 sm:py-24 px-4 sm:px-6" aria-labelledby="experiencia-titulo">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-12"
        >
          <SectionEyebrow className="mb-2">Experiencia</SectionEyebrow>
          <h2 id="experiencia-titulo" className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-3">
            Responsabilidades concretas.
          </h2>
          <p className="text-[var(--muted)] max-w-2xl leading-relaxed flex items-start gap-2">
            <Code2 size={18} className="mt-1 shrink-0 text-[var(--accent)]" aria-hidden="true" />
            <span>
              Coordinación técnica en WUJU y desarrollo en proyectos reales: requisitos, control de
              acceso por roles, bases de datos e infraestructura.
            </span>
          </p>
        </motion.div>

        <ol className="flex flex-col gap-10">
          {EXPERIENCE.map((item, index) => (
            <ExperienceCard key={item.role} item={item} index={index} />
          ))}
        </ol>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-8 flex items-center gap-2 font-mono text-xs text-[var(--muted)]"
        >
          <Users size={13} aria-hidden="true" />
          Equipos de cuatro a seis personas
          <span aria-hidden="true">·</span>
          <MapPin size={13} aria-hidden="true" />
          Santa Ana, El Salvador
        </motion.p>
      </div>
    </section>
  );
}
