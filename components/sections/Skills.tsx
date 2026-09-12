"use client";

import { motion } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import SkillIcon from "@/components/ui/SkillIcon";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";

interface IconSkill {
  name: string;
  image: string;
  width: number;
  height: number;
}

type Capability = {
  name: string;
  detail: string;
};

const SECURITY_CAPABILITIES: Capability[] = [
  {
    name: "Autenticación y autorización",
    detail: "JWT, RBAC y principio de mínimo privilegio.",
  },
  {
    name: "APIs e integraciones",
    detail: "Validación de entradas, firmas HMAC y controles para webhooks.",
  },
  {
    name: "Acceso a datos",
    detail: "RLS y diseño de permisos alineados al rol de cada usuario.",
  },
  {
    name: "Revisión de riesgos",
    detail: "OWASP Top 10 y threat modeling como guía de implementación.",
  },
];

const ENGINEERING_CAPABILITIES: Capability[] = [
  {
    name: "Pruebas automatizadas",
    detail: "Vitest y pytest para comprobar flujos críticos.",
  },
  {
    name: "Análisis y estándares",
    detail: "PHPStan, Pint y revisión continua de calidad.",
  },
  {
    name: "Documentación de APIs",
    detail: "Especificaciones y contratos con Swagger/OpenAPI.",
  },
  {
    name: "Despliegue reproducible",
    detail: "Docker y configuración explícita por entorno.",
  },
];

const BACKEND_FOUNDATIONS: IconSkill[] = [
  { name: "Laravel", image: "laravel.svg", width: 65, height: 65 },
  { name: "FastAPI", image: "fastapi.svg", width: 70, height: 70 },
  { name: "Node.js", image: "node.png", width: 80, height: 80 },
  { name: "PostgreSQL", image: "postgresql.png", width: 70, height: 70 },
  { name: "Supabase", image: "supabase.svg", width: 62, height: 62 },
  { name: "Docker", image: "docker.png", width: 70, height: 70 },
];

const COMPLEMENTARY_TECHNOLOGIES = [
  "TypeScript",
  "JavaScript",
  "PHP",
  "Python",
  "Vue 3",
  "React",
  "Next.js",
  "Django",
  "NestJS",
  "Express",
  "Firebase",
  "Redis",
  "PostGIS",
  "AWS Cloud",
  "Google Cloud",
  "Git · GitHub",
];

function CapabilityCard({
  title,
  description,
  capabilities,
  color,
  index,
}: {
  title: string;
  description: string;
  capabilities: Capability[];
  color: string;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.12 }}
      className="rounded-xl border p-5 sm:p-6"
      style={{ borderColor: `${color}45`, background: `${color}08` }}
    >
      <p
        className="font-mono text-[10px] uppercase tracking-[0.16em] mb-2"
        style={{ color }}
      >
        {title}
      </p>
      <p className="text-sm text-[var(--muted)] leading-relaxed mb-5">
        {description}
      </p>
      <ul className="space-y-3">
        {capabilities.map((capability) => (
          <li
            key={capability.name}
            className="border-l-2 pl-3"
            style={{ borderColor: color }}
          >
            <p className="text-sm font-semibold text-[var(--foreground)]">
              {capability.name}
            </p>
            <p className="font-mono text-[11px] leading-relaxed text-[var(--muted)] mt-0.5">
              {capability.detail}
            </p>
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="relative overflow-hidden py-16 sm:py-24 px-4 sm:px-6"
    >
      <div className="max-w-6xl mx-auto">
        <motion.header
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-10 sm:mb-14"
        >
          <motion.div
            variants={slideInFromTop}
            className="Welcome-box inline-flex py-[8px] px-[9px] border border-[#7042f88b] opacity-[0.9]"
          >
            <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
            <span className="Welcome-text text-[13px]">
              Seguridad de aplicaciones · ingeniería segura
            </span>
          </motion.div>

          <motion.h2
            id="skills-title"
            variants={slideInFromLeft(0.5)}
            className="text-3xl sm:text-4xl text-[var(--foreground)] font-semibold mt-4"
          >
            Tecnología al servicio de aplicaciones más seguras.
          </motion.h2>

          <motion.p
            variants={slideInFromRight(0.5)}
            className="text-base sm:text-lg text-[var(--muted)] mt-4 leading-relaxed"
          >
            Mi foco es integrar controles verificables en productos reales; el
            backend, los datos y el despliegue son la base para hacerlo bien.
          </motion.p>
        </motion.header>

        <div className="grid lg:grid-cols-2 gap-5 sm:gap-6">
          <CapabilityCard
            title="Seguridad de aplicaciones"
            description="Controles aplicados desde el diseño de la funcionalidad, no como un añadido al final."
            capabilities={SECURITY_CAPABILITIES}
            color="#06b6d4"
            index={0}
          />
          <CapabilityCard
            title="Ingeniería segura"
            description="Prácticas que hacen el código más revisable, mantenible y confiable durante su evolución."
            capabilities={ENGINEERING_CAPABILITIES}
            color="#a78bfa"
            index={1}
          />
        </div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, delay: 0.16 }}
          aria-labelledby="backend-foundations-title"
          className="mt-8 sm:mt-10 rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-7"
        >
          <div className="max-w-2xl">
            <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-[#00ff9f]">
              Base de implementación
            </p>
            <h3
              id="backend-foundations-title"
              className="text-xl font-semibold text-[var(--foreground)] mt-2"
            >
              Backend, datos y despliegue.
            </h3>
            <p className="text-sm text-[var(--muted)] leading-relaxed mt-2">
              Herramientas que uso para convertir requisitos de seguridad en
              servicios, permisos y flujos operables.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 mt-7">
            {BACKEND_FOUNDATIONS.map((skill, index) => (
              <div
                key={skill.name}
                className="min-h-28 rounded-lg border border-[var(--border)] bg-black/10 flex flex-col items-center justify-center gap-2 px-2 text-center"
              >
                <SkillIcon
                  src={skill.image}
                  name={skill.name}
                  width={skill.width}
                  height={skill.height}
                  index={index}
                />
                <span className="font-mono text-[10px] text-[var(--muted)]">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, delay: 0.22 }}
          aria-labelledby="complementary-technologies-title"
          className="mt-8 sm:mt-10"
        >
          <h3
            id="complementary-technologies-title"
            className="font-mono text-xs text-[var(--muted)] tracking-[0.14em] uppercase text-center"
          >
            Tecnologías complementarias
          </h3>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {COMPLEMENTARY_TECHNOLOGIES.map((technology) => (
              <span
                key={technology}
                className="font-mono text-[11px] px-3 py-1.5 rounded-full border border-[#7042f8]/35 bg-[#0b0322]/45 text-gray-300"
              >
                {technology}
              </span>
            ))}
          </div>
        </motion.section>
      </div>
    </section>
  );
}
