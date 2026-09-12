"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpenCheck,
  ChevronLeft,
  ChevronRight,
  Cloud,
  GraduationCap,
  LockKeyhole,
  ShieldCheck,
  Terminal,
  Workflow,
} from "lucide-react";
import { FaJava } from "react-icons/fa";
import { SiGnubash, SiJavascript, SiPython } from "react-icons/si";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

const PORTRAITS = [
  { src: "/images/oliver.png", label: "ILUSTRACIÓN" },
  { src: "/images/oliver-skin2.png", label: "RETRATO" },
];

const PURPLE = "#7042f8";
const CYAN = "#06b6d4";
const GREEN = "#00ff9f";
const VIOLET = "#a78bfa";

const FOCUS_AREAS = [
  {
    number: "01",
    eyebrow: "CIBERSEGURIDAD",
    title: "Seguridad aplicada",
    description:
      "Me interesa entender el riesgo y traducirlo en controles claros para accesos, APIs, datos y flujos de usuario.",
    signals: ["OWASP Top 10", "RBAC / JWT", "RLS / HMAC"],
    icon: ShieldCheck,
    color: CYAN,
  },
  {
    number: "02",
    eyebrow: "CLOUD",
    title: "Servicios y despliegues",
    description:
      "Combino formación en AWS y Google Cloud con práctica de entornos y configuración explícita de servicios.",
    signals: ["AWS foundations", "Google Cloud", "DigitalOcean / Cloudflare"],
    icon: Cloud,
    color: VIOLET,
  },
  {
    number: "03",
    eyebrow: "SCRUM / ÁGIL",
    title: "Trabajo visible",
    description:
      "Fortalezco una forma de trabajo ágil: dividir objetivos, priorizar tareas y documentar decisiones para entregar por incrementos.",
    signals: ["Backlog", "Sprints", "Documentación"],
    icon: Workflow,
    color: GREEN,
  },
] as const;

const TRAINING = [
  {
    title: "TSU en Ciberseguridad",
    institution: "ESIT / MINED · aval INFOTEC México",
    detail: "31/31 materias aprobadas · servicio social completado",
    badge: "EN CURSO",
    icon: GraduationCap,
    color: CYAN,
  },
  {
    title: "Fundamentos de Ciberseguridad",
    institution: "ESIT / AECID",
    detail: "CompTIA Security · 20 horas · jul 2025",
    badge: "SEGURIDAD",
    icon: LockKeyhole,
    color: GREEN,
  },
  {
    title: "Infraestructura en la Nube",
    institution: "ESIT / AECID",
    detail: "AWS · 20 horas · jul 2025",
    badge: "CLOUD",
    icon: Cloud,
    color: VIOLET,
  },
] as const;

const LANGUAGE_TOOLS = [
  {
    name: "JavaScript",
    detail: "Integraciones web y automatización",
    code: "const secure = true;",
    icon: SiJavascript,
    color: "#f7df1e",
  },
  {
    name: "Python",
    detail: "Scripts, análisis y automatización",
    code: "def review():",
    icon: SiPython,
    color: "#5ba4d8",
  },
  {
    name: "Java",
    detail: "Fundamentos de programación orientada a objetos",
    code: "class AccessPolicy {}",
    icon: FaJava,
    color: "#f89820",
  },
  {
    name: "Shell",
    detail: "Terminal, Linux y tareas de entorno",
    code: "#!/usr/bin/env bash",
    icon: SiGnubash,
    color: "#4eaa25",
  },
] as const;

function SignalCard({
  area,
  index,
}: {
  area: (typeof FOCUS_AREAS)[number];
  index: number;
}) {
  const Icon = area.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      className="group relative min-h-68 overflow-hidden rounded-xl border p-5 sm:p-6"
      style={{
        borderColor: `${area.color}50`,
        background: `linear-gradient(145deg, ${area.color}16 0%, var(--card) 54%, ${area.color}08 100%)`,
        boxShadow: `0 18px 46px ${area.color}0d`,
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.055) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage: "linear-gradient(to bottom, black, transparent 78%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -right-8 -top-8 h-32 w-32 rounded-full blur-2xl transition-transform duration-500 group-hover:scale-125"
        style={{ background: `${area.color}25` }}
      />

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] font-bold tracking-[0.18em]" style={{ color: area.color }}>
            {area.number} / {area.eyebrow}
          </p>
          <h3 className="mt-3 text-xl font-bold text-[var(--foreground)]">{area.title}</h3>
        </div>
        <span
          className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border"
          style={{
            color: area.color,
            borderColor: `${area.color}65`,
            background: `${area.color}16`,
            boxShadow: `0 0 24px ${area.color}25`,
          }}
        >
          <Icon size={24} aria-hidden="true" strokeWidth={1.75} />
        </span>
      </div>

      <p className="relative mt-4 text-sm leading-relaxed text-[var(--muted)]">{area.description}</p>

      <div className="relative mt-5 flex flex-wrap gap-1.5 border-t pt-4" style={{ borderColor: `${area.color}30` }}>
        {area.signals.map((signal) => (
          <span
            key={signal}
            className="rounded-full border px-2.5 py-1 font-mono text-[9px] font-semibold tracking-wide"
            style={{ color: area.color, borderColor: `${area.color}45`, background: `${area.color}10` }}
          >
            {signal}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

function TrainingItem({ item }: { item: (typeof TRAINING)[number] }) {
  const Icon = item.icon;

  return (
    <li
      className="relative overflow-hidden rounded-lg border px-3 py-3"
      style={{ borderColor: `${item.color}38`, background: `${item.color}08` }}
    >
      <div className="flex gap-2.5">
        <span
          className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md"
          style={{ color: item.color, background: `${item.color}18` }}
        >
          <Icon size={15} aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className="text-xs font-semibold leading-snug text-[var(--foreground)]">{item.title}</p>
            <span
              className="shrink-0 rounded border px-1.5 py-0.5 font-mono text-[8px] font-bold tracking-wide"
              style={{ color: item.color, borderColor: `${item.color}45`, background: `${item.color}10` }}
            >
              {item.badge}
            </span>
          </div>
          <p className="mt-1 font-mono text-[9px] text-[var(--muted)]">{item.institution}</p>
          <p className="mt-1 font-mono text-[9px] leading-snug" style={{ color: `${item.color}d9` }}>
            {item.detail}
          </p>
        </div>
      </div>
    </li>
  );
}

function LanguageTool({ tool, index }: { tool: (typeof LANGUAGE_TOOLS)[number]; index: number }) {
  const Icon = tool.icon;

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.96, y: 12 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35, delay: index * 0.07 }}
      className="group relative overflow-hidden rounded-xl border p-4"
      style={{ borderColor: `${tool.color}45`, background: `linear-gradient(135deg, ${tool.color}12, var(--card) 66%)` }}
    >
      <div
        aria-hidden="true"
        className="absolute -right-5 -top-5 h-20 w-20 rounded-full blur-xl transition-transform duration-500 group-hover:scale-125"
        style={{ background: `${tool.color}20` }}
      />
      <div className="relative flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] font-bold tracking-[0.14em]" style={{ color: tool.color }}>
            LENGUAJE
          </p>
          <h4 className="mt-1 text-base font-bold text-[var(--foreground)]">{tool.name}</h4>
        </div>
        <Icon size={28} aria-hidden="true" style={{ color: tool.color }} />
      </div>
      <p className="relative mt-3 min-h-10 text-xs leading-relaxed text-[var(--muted)]">{tool.detail}</p>
      <code
        className="relative mt-3 block overflow-hidden text-ellipsis whitespace-nowrap rounded-md border px-2.5 py-2 font-mono text-[9px]"
        style={{ color: `${tool.color}e8`, borderColor: `${tool.color}30`, background: `${tool.color}0d` }}
      >
        {tool.code}
      </code>
    </motion.article>
  );
}

export default function About() {
  const [portrait, setPortrait] = useState(1);
  const currentPortrait = PORTRAITS[portrait];

  const showPreviousPortrait = () => {
    setPortrait((current) => (current - 1 + PORTRAITS.length) % PORTRAITS.length);
  };

  const showNextPortrait = () => {
    setPortrait((current) => (current + 1) % PORTRAITS.length);
  };

  return (
    <section id="sobre-mi" aria-labelledby="about-title" className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-12 h-[34rem] opacity-45"
        style={{
          background:
            "radial-gradient(circle at 14% 34%, rgba(112,66,248,.18), transparent 30%), radial-gradient(circle at 86% 8%, rgba(6,182,212,.16), transparent 28%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 max-w-4xl sm:mb-12"
        >
          <SectionEyebrow className="mb-3">Perfil</SectionEyebrow>
          <h2 id="about-title" className="text-3xl font-bold text-[var(--foreground)] sm:text-4xl">
            Ciberseguridad, cloud y trabajo ágil.
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            Me formo para aportar seguridad práctica, operar mejor en la nube y colaborar con objetivos claros. Los lenguajes son herramientas para construir, automatizar y revisar con intención.
          </p>
        </motion.header>

        <div className="grid items-start gap-6 sm:gap-10 lg:grid-cols-[300px_1fr]">
          <aside className="flex flex-col gap-5" aria-label="Perfil y formación de Oliver Ascencio">
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)]"
              style={{ boxShadow: "0 18px 48px rgba(112,66,248,.10)" }}
            >
              <div className="flex items-center justify-between gap-3 border-b border-[#7042f8]/30 bg-[#7042f8]/10 px-5 py-2.5">
                <span className="font-mono text-[10px] tracking-wider text-[#b49bff]">SECURITY PROFILE // 01</span>
                <span className="font-mono text-[10px] tracking-wider text-[#b49bff]">SV</span>
              </div>

              <div className="px-5 pb-3 pt-5">
                <div
                  className="relative aspect-[4/5] w-full overflow-hidden rounded-lg border-2 border-[#7042f8] bg-[#0d0d24]"
                  style={{ boxShadow: "4px 4px 0 rgba(112,66,248,.22), 0 0 34px rgba(6,182,212,.12)" }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={portrait}
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={currentPortrait.src}
                        alt={`Oliver Ascencio — ${currentPortrait.label.toLowerCase()}`}
                        fill
                        className="object-cover object-top"
                        sizes="(min-width: 1024px) 300px, 100vw"
                      />
                    </motion.div>
                  </AnimatePresence>

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,.08) 2px, rgba(0,0,0,.08) 3px)",
                    }}
                  />
                  <div aria-hidden="true" className="absolute left-2 top-2 h-4 w-4 border-l-2 border-t-2 border-[#b49bff]" />
                  <div aria-hidden="true" className="absolute right-2 top-2 h-4 w-4 border-r-2 border-t-2 border-[#b49bff]" />
                  <div aria-hidden="true" className="absolute bottom-2 left-2 h-4 w-4 border-b-2 border-l-2 border-[#b49bff]" />
                  <div aria-hidden="true" className="absolute bottom-2 right-2 h-4 w-4 border-b-2 border-r-2 border-[#b49bff]" />

                  {PORTRAITS.length > 1 && (
                    <>
                      <button
                        type="button"
                        aria-label="Mostrar retrato anterior"
                        onClick={showPreviousPortrait}
                        className="absolute left-1.5 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-md border border-[#7042f8]/50 bg-[#030014]/75 text-[#b49bff] transition-colors hover:bg-[#7042f8]/30 hover:text-white cursor-pointer"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        type="button"
                        aria-label="Mostrar retrato siguiente"
                        onClick={showNextPortrait}
                        className="absolute right-1.5 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-md border border-[#7042f8]/50 bg-[#030014]/75 text-[#b49bff] transition-colors hover:bg-[#7042f8]/30 hover:text-white cursor-pointer"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </>
                  )}

                  <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-md border border-[#7042f8]/40 bg-[#030014]/80 px-2.5 py-1 backdrop-blur-sm">
                    <span className="font-mono text-[9px] tracking-widest text-[#b49bff]">
                      {String(portrait + 1).padStart(2, "0")}/{String(PORTRAITS.length).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[9px] tracking-widest text-[#06b6d4]">{currentPortrait.label}</span>
                  </div>
                </div>

                {PORTRAITS.length > 1 && (
                  <div className="mt-3 flex justify-center gap-1.5" aria-label="Seleccionar retrato">
                    {PORTRAITS.map((item, index) => (
                      <button
                        key={item.label}
                        type="button"
                        aria-label={`Mostrar ${item.label.toLowerCase()}`}
                        aria-pressed={index === portrait}
                        onClick={() => setPortrait(index)}
                        className="h-1.5 rounded-full transition-all cursor-pointer"
                        style={{ width: index === portrait ? 18 : 6, background: index === portrait ? PURPLE : "var(--border)" }}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="px-5 pb-4 pt-2">
                <h3 className="text-lg font-bold leading-5 text-[var(--foreground)]">Oliver Ascencio</h3>
                <p className="mb-3 mt-1 font-mono text-xs text-[var(--accent)]">Ciberseguridad · Cloud · Scrum</p>
                <p className="text-xs leading-relaxed text-[var(--muted)]">
                  TSU en Ciberseguridad en proceso de graduación. Interesado en controles útiles, infraestructura cloud y colaboración con ritmo.
                </p>
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-[var(--border)] px-5 py-3">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--muted)]">Santa Ana, SV</span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#b49bff]">Disponible</span>
              </div>
            </motion.div>

            <motion.section
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
              aria-labelledby="training-title"
              className="rounded-xl border border-[#7042f8]/30 bg-[var(--card)] p-4"
            >
              <div className="mb-3 flex items-center gap-2">
                <BookOpenCheck size={15} className="text-[#b49bff]" aria-hidden="true" />
                <h3 id="training-title" className="font-mono text-[10px] tracking-widest text-[#b49bff]">
                  FORMACIÓN RELEVANTE
                </h3>
              </div>
              <ul className="flex flex-col gap-2.5">
                {TRAINING.map((item) => (
                  <TrainingItem key={item.title} item={item} />
                ))}
              </ul>
            </motion.section>
          </aside>

          <div className="flex flex-col gap-9 sm:gap-11">
            <motion.section
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
              aria-labelledby="focus-title"
            >
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="font-mono text-xs tracking-[0.14em] text-[#06b6d4]">ÁREAS DE ENFOQUE</p>
                  <h3 id="focus-title" className="mt-2 text-2xl font-semibold text-[var(--foreground)]">
                    Una ruta técnica con propósito.
                  </h3>
                </div>
                <p className="max-w-xs font-mono text-[10px] leading-relaxed text-[var(--muted)] sm:text-right">
                  Ciberseguridad y cloud son el centro; Scrum organiza cómo colaboro y entrego.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {FOCUS_AREAS.map((area, index) => (
                  <SignalCard key={area.title} area={area} index={index} />
                ))}
              </div>
            </motion.section>

            <section aria-labelledby="languages-tools-title">
              <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex items-center gap-2">
                  <Terminal size={17} className="text-[#00ff9f]" aria-hidden="true" />
                  <div>
                    <p className="font-mono text-xs tracking-[0.14em] text-[#00ff9f]">HERRAMIENTAS DE APOYO</p>
                    <h3 id="languages-tools-title" className="mt-1 text-2xl font-semibold text-[var(--foreground)]">
                      Lenguajes para automatizar y construir.
                    </h3>
                  </div>
                </div>
                <p className="max-w-xs font-mono text-[10px] leading-relaxed text-[var(--muted)] sm:text-right">
                  No son el titular del perfil: respaldan el trabajo técnico.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {LANGUAGE_TOOLS.map((tool, index) => (
                  <LanguageTool key={tool.name} tool={tool} index={index} />
                ))}
              </div>
            </section>

          </div>
        </div>
      </div>
    </section>
  );
}
