"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion, useReducedMotion } from "framer-motion";
import {
  CloudCog,
  KeyRound,
  ListChecks,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { FaAws, FaJava, FaTerminal } from "react-icons/fa";
import type { IconType } from "react-icons";
import { SiGooglecloud, SiJavascript, SiPython } from "react-icons/si";
import { useInView } from "react-intersection-observer";

type FocusArea = {
  eyebrow: string;
  title: string;
  description: string;
  signals: string[];
  Icon: LucideIcon;
  accent: string;
};

type LanguageSkill = {
  name: string;
  description: string;
  Icon: IconType;
  accent: string;
  glow: string;
};

const FOCUS_AREAS: FocusArea[] = [
  {
    eyebrow: "01 / PROTECCIÓN",
    title: "Ciberseguridad",
    description:
      "Seguridad de aplicaciones con controles pensados desde el acceso hasta las integraciones.",
    signals: ["OWASP Top 10", "Autenticación y permisos", "APIs y webhooks"],
    Icon: ShieldCheck,
    accent: "#22d3ee",
  },
  {
    eyebrow: "02 / INFRAESTRUCTURA",
    title: "Cloud",
    description:
      "Fundamentos de infraestructura en la nube y despliegues reproducibles para servicios web.",
    signals: ["AWS foundations", "Google Cloud", "DigitalOcean / Cloudflare"],
    Icon: CloudCog,
    accent: "#a78bfa",
  },
  {
    eyebrow: "03 / FORMA DE TRABAJO",
    title: "Scrum",
    description:
      "Trabajo iterativo para convertir prioridades en entregas claras y revisables.",
    signals: ["Equipos de 4-6 personas", "Requisitos con cliente", "Entregas incrementales"],
    Icon: ListChecks,
    accent: "#34d399",
  },
];

const LANGUAGE_SKILLS: LanguageSkill[] = [
  {
    name: "Java",
    description: "Lógica y orientación a objetos",
    Icon: FaJava,
    accent: "#f89820",
    glow: "rgba(248, 152, 32, 0.24)",
  },
  {
    name: "JavaScript",
    description: "Automatización e integraciones web",
    Icon: SiJavascript,
    accent: "#f7df1e",
    glow: "rgba(247, 223, 30, 0.2)",
  },
  {
    name: "Python",
    description: "Scripting y análisis",
    Icon: SiPython,
    accent: "#60a5fa",
    glow: "rgba(96, 165, 250, 0.24)",
  },
  {
    name: "Shell",
    description: "Automatización de tareas",
    Icon: FaTerminal,
    accent: "#4ade80",
    glow: "rgba(74, 222, 128, 0.22)",
  },
];

function FocusCard({
  area,
  index,
  reducedMotion,
}: {
  area: FocusArea;
  index: number;
  reducedMotion: boolean | null;
}) {
  const { Icon } = area;

  return (
    <motion.article
      initial={reducedMotion ? false : { opacity: 0, y: 26 }}
      whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
      whileHover={reducedMotion ? undefined : { y: -6 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: reducedMotion ? 0 : 0.45,
        delay: reducedMotion ? 0 : index * 0.1,
      }}
      className="group relative overflow-hidden rounded-2xl border bg-[#08031d]/80 p-5 backdrop-blur-sm sm:p-6"
      style={{
        borderColor: `${area.accent}52`,
        boxShadow: `0 16px 42px -30px ${area.accent}`,
      }}
    >
      <div
        aria-hidden="true"
        className="absolute -right-8 -top-8 h-28 w-28 rounded-full blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ backgroundColor: `${area.accent}2b` }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${area.accent}, transparent)`,
        }}
      />

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] font-semibold tracking-[0.18em] text-[var(--muted)]">
            {area.eyebrow}
          </p>
          <h3 className="mt-3 text-xl font-semibold text-white">{area.title}</h3>
        </div>
        <span
          aria-hidden="true"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border"
          style={{
            color: area.accent,
            borderColor: `${area.accent}65`,
            backgroundColor: `${area.accent}15`,
            boxShadow: `0 0 28px -8px ${area.accent}`,
          }}
        >
          <Icon size={24} strokeWidth={1.75} />
        </span>
      </div>

      <p className="relative mt-4 text-sm leading-6 text-gray-300">
        {area.description}
      </p>

      <ul
        className="relative mt-5 flex flex-wrap gap-2"
        aria-label={`Enfoques de ${area.title}`}
      >
        {area.signals.map((signal) => (
          <li
            key={signal}
            className="rounded-full border px-2.5 py-1 font-mono text-[10px] leading-none"
            style={{
              borderColor: `${area.accent}3f`,
              backgroundColor: `${area.accent}10`,
              color: area.accent,
            }}
          >
            {signal}
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
            <span className="Welcome-text text-[13px]">
              Ciberseguridad · Cloud · Scrum
            </span>
          </div>
          <h2
            id="skills-title"
            className="mt-5 text-3xl font-semibold leading-tight text-white sm:text-4xl"
          >
            Herramientas para proteger, desplegar y avanzar.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-300 sm:text-lg">
            Un stack intencional: seguridad de aplicaciones, fundamentos cloud,
            trabajo ágil y lenguajes para automatizar tareas técnicas.
          </p>
        </motion.header>

        <div className="mt-10 grid gap-4 md:grid-cols-3 sm:mt-12 sm:gap-5">
          {FOCUS_AREAS.map((area, index) => (
            <FocusCard
              key={area.title}
              area={area}
              index={index}
              reducedMotion={prefersReducedMotion}
            />
          ))}
        </div>

        <motion.section
          initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.5,
            delay: prefersReducedMotion ? 0 : 0.16,
          }}
          aria-labelledby="languages-title"
          className="relative mt-8 overflow-hidden rounded-2xl border border-[#7042f8]/35 bg-[#08031d]/75 p-5 shadow-[0_18px_52px_-36px_rgba(112,66,248,0.72)] backdrop-blur-sm sm:mt-10 sm:p-7"
        >
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b49bff] to-transparent"
          />
          <div className="relative flex flex-col gap-3 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
            <div>
              <p className="font-mono text-[10px] font-semibold tracking-[0.18em] text-[#b49bff]">
                LENGUAJES
              </p>
              <h3 id="languages-title" className="mt-2 text-2xl font-semibold text-white">
                Base técnica para automatizar y analizar.
              </h3>
            </div>
            <div className="flex items-center justify-center gap-2 font-mono text-[10px] text-gray-400 sm:justify-end">
              <KeyRound aria-hidden="true" size={14} className="text-cyan-300" />
              <span>scripts · integraciones · utilidades</span>
            </div>
          </div>

          <ul className="relative mt-6 grid grid-cols-2 gap-3 sm:mt-7 sm:gap-4 lg:grid-cols-4">
            {LANGUAGE_SKILLS.map((skill, index) => {
              const { Icon } = skill;

              return (
                <motion.li
                  key={skill.name}
                  initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.94 }}
                  whileInView={prefersReducedMotion ? {} : { opacity: 1, scale: 1 }}
                  whileHover={prefersReducedMotion ? undefined : { y: -5, scale: 1.015 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.35,
                    delay: prefersReducedMotion ? 0 : 0.24 + index * 0.08,
                  }}
                  className="group relative min-h-44 overflow-hidden rounded-xl border bg-[#050114]/80 p-4 text-center sm:min-h-48 sm:p-5"
                  style={{
                    borderColor: `${skill.accent}48`,
                    boxShadow: `inset 0 1px 0 rgba(255,255,255,0.04), 0 16px 35px -29px ${skill.glow}`,
                  }}
                >
                  <div
                    aria-hidden="true"
                    className="absolute left-1/2 top-8 h-20 w-20 -translate-x-1/2 rounded-full blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: skill.glow }}
                  />
                  <Icon
                    aria-hidden="true"
                    className="relative mx-auto h-16 w-16 transition-transform duration-300 group-hover:scale-110 sm:h-[4.5rem] sm:w-[4.5rem]"
                    style={{
                      color: skill.accent,
                      filter: `drop-shadow(0 0 12px ${skill.glow})`,
                    }}
                  />
                  <p className="relative mt-4 font-mono text-sm font-semibold text-white">
                    {skill.name}
                  </p>
                  <p className="relative mx-auto mt-1 max-w-[10rem] text-xs leading-5 text-gray-400">
                    {skill.description}
                  </p>
                </motion.li>
              );
            })}
          </ul>

          <div className="relative mt-6 flex flex-wrap justify-center gap-2 border-t border-white/5 pt-5 sm:justify-between">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-300/25 bg-orange-300/10 px-3 py-1.5 font-mono text-[10px] text-orange-100">
              <FaAws aria-hidden="true" className="text-orange-300" />
              AWS · fundamentos cloud
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-300/25 bg-blue-300/10 px-3 py-1.5 font-mono text-[10px] text-blue-100">
              <SiGooglecloud aria-hidden="true" className="text-blue-300" />
              Google Cloud · formación complementaria
            </span>
          </div>
        </motion.section>
      </div>
    </section>
  );
}
