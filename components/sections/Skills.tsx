"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion, useReducedMotion } from "framer-motion";
import {
  CloudCog,
  Database,
  LayoutTemplate,
  ServerCog,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

type SkillCategory = {
  eyebrow: string;
  title: string;
  description: string;
  skills: string[];
  Icon: LucideIcon;
  accent: string;
};

/**
 * Solo tecnologías con evidencia real: CV de Oliver Ascencio o inspección
 * directa de sus repositorios (FlowCore = Python/FastAPI, POS = Laravel/Vue,
 * invitacion-baby-shower = Supabase, este mismo portfolio = TypeScript/Next.js).
 * Nada de Docker/Terraform/Kubernetes/Burp Suite aunque aparezcan en algún
 * repo — no se listan como dominadas sin confirmación explícita.
 */
const SKILL_CATEGORIES: SkillCategory[] = [
  {
    eyebrow: "01 / SEGURIDAD",
    title: "Security",
    description: "Controles de acceso y fundamentos de seguridad aplicados a productos reales.",
    skills: ["OWASP Top 10", "RBAC", "Ethical Hacking", "Criptografía", "Redes", "Respuesta a incidentes"],
    Icon: ShieldCheck,
    accent: "#22d3ee",
  },
  {
    eyebrow: "02 / DATOS",
    title: "Database",
    description: "Modelado relacional y no relacional, en producción y en formación.",
    skills: ["PostgreSQL", "MySQL", "SQLite", "Firebase Firestore", "Supabase", "Modelado ER"],
    Icon: Database,
    accent: "#a78bfa",
  },
  {
    eyebrow: "03 / SERVIDOR",
    title: "Backend",
    description: "Lenguajes y frameworks de servidor usados en proyectos reales, no solo en cursos.",
    skills: ["Node.js", "JavaScript", "TypeScript", "Java", "Spring Boot", "Python", "C#", "PHP", "Bash / Shell"],
    Icon: ServerCog,
    accent: "#34d399",
  },
  {
    eyebrow: "04 / INTERFAZ",
    title: "Frontend",
    description: "Interfaces con foco en accesibilidad y consistencia visual.",
    skills: ["React", "Vite", "Tailwind CSS", "HTML5", "CSS3"],
    Icon: LayoutTemplate,
    accent: "#f59e0b",
  },
  {
    eyebrow: "05 / INFRAESTRUCTURA",
    title: "Cloud",
    description: "Fundamentos de infraestructura en la nube y control de versiones.",
    skills: ["AWS foundations", "Google Cloud", "DigitalOcean", "Cloudflare", "Git", "GitHub"],
    Icon: CloudCog,
    accent: "#06b6d4",
  },
];

function CategoryCard({
  category,
  index,
  reducedMotion,
}: {
  category: SkillCategory;
  index: number;
  reducedMotion: boolean | null;
}) {
  const { Icon } = category;

  return (
    <motion.article
      initial={reducedMotion ? false : { opacity: 0, y: 26 }}
      whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
      whileHover={reducedMotion ? undefined : { y: -6 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: reducedMotion ? 0 : 0.45,
        delay: reducedMotion ? 0 : index * 0.08,
      }}
      className="group relative overflow-hidden rounded-2xl border bg-[#08031d]/80 p-5 backdrop-blur-sm sm:p-6"
      style={{
        borderColor: `${category.accent}52`,
        boxShadow: `0 16px 42px -30px ${category.accent}`,
      }}
    >
      <div
        aria-hidden="true"
        className="absolute -right-8 -top-8 h-28 w-28 rounded-full blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ backgroundColor: `${category.accent}2b` }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${category.accent}, transparent)`,
        }}
      />

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] font-semibold tracking-[0.18em] text-[var(--muted)]">
            {category.eyebrow}
          </p>
          <h3 className="mt-3 text-xl font-semibold text-white">{category.title}</h3>
        </div>
        <span
          aria-hidden="true"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border"
          style={{
            color: category.accent,
            borderColor: `${category.accent}65`,
            backgroundColor: `${category.accent}15`,
            boxShadow: `0 0 28px -8px ${category.accent}`,
          }}
        >
          <Icon size={24} strokeWidth={1.75} />
        </span>
      </div>

      <p className="relative mt-4 text-sm leading-6 text-gray-300">{category.description}</p>

      <ul className="relative mt-5 flex flex-wrap gap-2" aria-label={`Tecnologías de ${category.title}`}>
        {category.skills.map((skill) => (
          <li
            key={skill}
            className="rounded-full border px-2.5 py-1 font-mono text-[10px] leading-none"
            style={{
              borderColor: `${category.accent}3f`,
              backgroundColor: `${category.accent}10`,
              color: category.accent,
            }}
          >
            {skill}
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

export default function Skills() {
  const { ref: sectionRef, inView } = useInView({
    triggerOnce: true,
    rootMargin: "180px 0px",
  });
  const prefersReducedMotion = useReducedMotion();
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (!inView || prefersReducedMotion) {
      setShowVideo(false);
      return;
    }

    const connection = navigator as Navigator & {
      connection?: { saveData?: boolean };
    };

    if (connection.connection?.saveData) {
      setShowVideo(false);
      return;
    }

    const timeoutId = window.setTimeout(() => setShowVideo(true), 180);
    return () => window.clearTimeout(timeoutId);
  }, [inView, prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="skills"
      aria-labelledby="skills-title"
      className="relative isolate overflow-hidden px-4 py-16 sm:px-6 sm:py-24"
    >
      {showVideo && (
        <div className="pointer-events-none absolute inset-0 -z-20" aria-hidden="true">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            className="h-full w-full object-cover opacity-35"
          >
            <source src="/videos/skills-bg.webm" type="video/webm" />
          </video>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,0,20,0.87),rgba(3,0,20,0.48),rgba(3,0,20,0.9))]" />
        </div>
      )}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(rgba(112, 66, 248, 0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.07) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage:
            "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(112,66,248,0.25),rgba(6,182,212,0.08)_35%,transparent_68%)]"
      />
      <motion.div
        aria-hidden="true"
        animate={prefersReducedMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 42, ease: "linear", repeat: Infinity }}
        className="pointer-events-none absolute left-[6%] top-28 -z-10 hidden h-24 w-24 rounded-full border border-cyan-300/20 lg:block"
      >
        <span className="absolute -right-1 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_16px_#67e8f9]" />
      </motion.div>
      <motion.div
        aria-hidden="true"
        animate={prefersReducedMotion ? undefined : { rotate: -360 }}
        transition={{ duration: 54, ease: "linear", repeat: Infinity }}
        className="pointer-events-none absolute bottom-20 right-[7%] -z-10 hidden h-32 w-32 rounded-full border border-violet-300/20 lg:block"
      >
        <span className="absolute -left-1 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-violet-300 shadow-[0_0_16px_#c4b5fd]" />
      </motion.div>

      <div className="mx-auto max-w-6xl">
        <motion.header
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="Welcome-box mx-auto border border-[#7042f88b] px-[9px] py-[8px] opacity-95">
            <SparklesIcon className="mr-[10px] h-5 w-5 text-[#b49bff]" />
            <span className="Welcome-text text-[13px]">Habilidades técnicas</span>
          </div>
          <h2
            id="skills-title"
            className="mt-5 text-3xl font-semibold leading-tight text-white sm:text-4xl"
          >
            Sin porcentajes inventados — evidencia por categoría.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-300 sm:text-lg">
            Cinco áreas: seguridad, datos, backend, frontend y cloud. Cada una respaldada por
            formación real o por un proyecto que la usa en producción.
          </p>
        </motion.header>

        <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {SKILL_CATEGORIES.map((category, index) => (
            <CategoryCard
              key={category.title}
              category={category}
              index={index}
              reducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
