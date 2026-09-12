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
  Languages,
  LockKeyhole,
} from "lucide-react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

const PORTRAITS = [
  { src: "/images/oliver.png", label: "ILUSTRACIÓN" },
  { src: "/images/oliver-skin2.png", label: "RETRATO" },
];

const PURPLE = "#7042f8";
const CYAN = "#06b6d4";
const GREEN = "#00ff9f";
const VIOLET = "#a78bfa";

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

const IDIOMAS = [
  { name: "Español", level: "Nativo" },
  { name: "Inglés", level: "B1 — hacia B2" },
  { name: "Francés", level: "Nivel inicial" },
] as const;

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
            Software y seguridad, la misma disciplina.
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            Soy estudiante de Ingeniería en Desarrollo de Software y próximo egresado como TSU en
            Ciberseguridad. Mi interés está en la intersección entre desarrollo, datos y seguridad:
            construir sistemas y entender cómo protegerlos desde su arquitectura.
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
                <p className="mb-3 mt-1 font-mono text-xs text-[var(--accent)]">Application &amp; Cloud Security</p>
                <p className="text-xs leading-relaxed text-[var(--muted)]">
                  TSU en Ciberseguridad en proceso de graduación. Desarrollo software con controles
                  de acceso y buenas prácticas cloud desde el diseño.
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

            <motion.section
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.15 }}
              aria-labelledby="idiomas-title"
              className="rounded-xl border border-[#7042f8]/30 bg-[var(--card)] p-4"
            >
              <div className="mb-3 flex items-center gap-2">
                <Languages size={15} className="text-[#b49bff]" aria-hidden="true" />
                <h3 id="idiomas-title" className="font-mono text-[10px] tracking-widest text-[#b49bff]">
                  IDIOMAS
                </h3>
              </div>
              <ul className="flex flex-col gap-2">
                {IDIOMAS.map((idioma) => (
                  <li key={idioma.name} className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-[var(--foreground)]">{idioma.name}</span>
                    <span className="rounded-full border border-[var(--border)] px-2 py-0.5 font-mono text-[9px] text-[var(--muted)]">
                      {idioma.level}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.section>
          </aside>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <p className="text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              Como Cofundador y Líder Técnico en Wuju defino arquitectura y stack para proyectos de
              cliente, pero sigo siendo quien diseña el control de acceso y escribe el código: en el
              POS de Pizza Brava fue RBAC real, en este portfolio son las cabeceras de seguridad que
              puedes revisar en <code className="rounded bg-black/20 px-1.5 py-0.5 font-mono text-sm">next.config.ts</code>.
            </p>
            <p className="text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              Trabajo con equipos de 4 a 6 personas bajo un enfoque ágil: dividir objetivos,
              priorizar y entregar por incrementos. El detalle técnico completo — por categoría,
              con evidencia — está en{" "}
              <a href="#skills" className="text-[var(--accent)] underline underline-offset-4 hover:text-[var(--accent-hover)]">
                Habilidades
              </a>{" "}
              y{" "}
              <a href="#proyectos" className="text-[var(--accent)] underline underline-offset-4 hover:text-[var(--accent-hover)]">
                Proyectos
              </a>
              .
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
