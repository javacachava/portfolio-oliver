"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

const PORTRAITS = [
  { src: "/images/oliver.png", label: "ILUSTRACIÓN" },
  { src: "/images/oliver-skin2.png", label: "RETRATO" },
];

const PURPLE = "#7042f8";
const CYAN = "#06b6d4";
const GREEN = "#00ff9f";
const VIOLET = "#a78bfa";

type FocusArea = {
  label: string;
  title: string;
  description: string;
  evidence: string;
  color: string;
};

const FOCUS_AREAS: FocusArea[] = [
  {
    label: "APLICADO EN PROYECTOS",
    title: "Seguridad de aplicaciones",
    description:
      "Integro autenticación, roles y controles de acceso desde el diseño de APIs y flujos de usuario.",
    evidence: "RBAC · JWT · RLS · HMAC · OWASP Top 10",
    color: CYAN,
  },
  {
    label: "INGENIERÍA SEGURA",
    title: "Calidad verificable",
    description:
      "Uso pruebas, análisis estático y documentación técnica para detectar riesgos y regresiones antes del despliegue.",
    evidence: "Vitest · pytest · PHPStan · Pint · OpenAPI",
    color: VIOLET,
  },
  {
    label: "BASE DE IMPLEMENTACIÓN",
    title: "Backend y datos",
    description:
      "Diseño servicios, modelos relacionales y permisos que permiten aplicar controles de seguridad de forma consistente.",
    evidence: "Laravel · FastAPI · Node.js · PostgreSQL · Supabase",
    color: GREEN,
  },
  {
    label: "EN FORMACIÓN CONTINUA",
    title: "Ciberseguridad",
    description:
      "Profundizo la práctica responsable mediante modelado de amenazas, revisión de riesgos y hardening en entornos propios.",
    evidence: "TSU en Ciberseguridad · threat modeling · hardening",
    color: PURPLE,
  },
];

const education = [
  {
    level: "TSU en Ciberseguridad",
    institution: "ESIT / MINED · aval INFOTEC México",
    status: "En proceso de graduación · Servicio social completado",
    cum: "8.89",
    color: CYAN,
  },
  {
    level: "Ingeniería en Desarrollo de Software",
    institution: "UNICAES · Santa Ana",
    status: "2.º año · 2025–2029",
    cum: "8.69",
    color: PURPLE,
  },
  {
    level: "Bachillerato Técnico Vocacional ITSI",
    institution: "Centro Escolar INSA",
    status: "Finalizado · 1.er lugar · Diploma de Honor",
    cum: null,
    color: GREEN,
  },
];

const languages = [
  {
    lang: "Español",
    level: "Nativo",
    sublevel: "Comunicación oral y escrita",
    color: GREEN,
  },
  {
    lang: "Inglés",
    level: "En progreso hacia B2",
    sublevel: "Lectura técnica fluida · clases intensivas en curso",
    color: PURPLE,
  },
];

function FocusAreaCard({ area, index }: { area: FocusArea; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="rounded-xl border p-4 sm:p-5"
      style={{ borderColor: `${area.color}35`, background: `${area.color}08` }}
    >
      <p
        className="font-mono text-[9px] tracking-[0.14em] uppercase mb-2"
        style={{ color: area.color }}
      >
        {area.label}
      </p>
      <h3 className="text-base font-semibold text-[var(--foreground)]">
        {area.title}
      </h3>
      <p className="text-xs text-[var(--muted)] leading-relaxed mt-2">
        {area.description}
      </p>
      <p
        className="font-mono text-[10px] leading-relaxed mt-3 pt-3 border-t"
        style={{ color: `${area.color}dd`, borderColor: `${area.color}28` }}
      >
        {area.evidence}
      </p>
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
    <section id="sobre-mi" aria-labelledby="about-title" className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-8 sm:mb-12"
        >
          <SectionEyebrow className="mb-3">Perfil profesional</SectionEyebrow>
          <h2 id="about-title" className="text-3xl sm:text-4xl font-bold text-[var(--foreground)]">
            Seguridad de aplicaciones, con base en backend.
          </h2>
          <p className="text-base sm:text-lg text-[var(--muted)] leading-relaxed mt-4">
            El desarrollo es mi medio para implementar controles de seguridad
            útiles, mantenibles y verificables en productos reales.
          </p>
        </motion.header>

        <div className="grid lg:grid-cols-[300px_1fr] gap-6 sm:gap-10 items-start">
          <aside className="flex flex-col gap-5" aria-label="Perfil y formación de Oliver Ascencio">
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden"
            >
              <div className="bg-[#7042f8]/10 border-b border-[#7042f8]/30 px-5 py-2.5 flex items-center justify-between gap-3">
                <span className="font-mono text-[10px] tracking-wider uppercase text-[#b49bff]">
                  Perfil
                </span>
                <span className="font-mono text-[10px] tracking-wider uppercase text-[#b49bff]">
                  El Salvador
                </span>
              </div>

              <div className="px-5 pt-5 pb-3">
                <div className="w-full aspect-[4/5] rounded-lg overflow-hidden relative border border-[#7042f8]/60 bg-[#0d0d24]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={portrait}
                      initial={{ opacity: 0, scale: 1.02 }}
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
                        priority={false}
                      />
                    </motion.div>
                  </AnimatePresence>

                  {PORTRAITS.length > 1 && (
                    <>
                      <button
                        type="button"
                        aria-label="Mostrar retrato anterior"
                        onClick={showPreviousPortrait}
                        className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-md flex items-center justify-center border border-white/20 bg-black/55 text-white hover:bg-[#7042f8]/70 transition-colors cursor-pointer"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        type="button"
                        aria-label="Mostrar retrato siguiente"
                        onClick={showNextPortrait}
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-md flex items-center justify-center border border-white/20 bg-black/55 text-white hover:bg-[#7042f8]/70 transition-colors cursor-pointer"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </>
                  )}

                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md border border-white/15 bg-black/65 backdrop-blur-sm">
                    <span className="font-mono text-[9px] tracking-widest text-white/85">
                      {currentPortrait.label} {portrait + 1}/{PORTRAITS.length}
                    </span>
                  </div>
                </div>

                {PORTRAITS.length > 1 && (
                  <div className="flex justify-center gap-1.5 mt-3" aria-label="Seleccionar retrato">
                    {PORTRAITS.map((item, index) => (
                      <button
                        key={item.label}
                        type="button"
                        aria-label={`Mostrar ${item.label.toLowerCase()}`}
                        aria-pressed={index === portrait}
                        onClick={() => setPortrait(index)}
                        className="h-1.5 rounded-full transition-all cursor-pointer"
                        style={{
                          width: index === portrait ? 18 : 6,
                          background: index === portrait ? PURPLE : "var(--border)",
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="px-5 pt-2 pb-4">
                <h3 className="text-lg font-bold text-[var(--foreground)] leading-5 mb-1">
                  Oliver Ascencio
                </h3>
                <p className="font-mono text-xs text-[var(--accent)] mb-3">
                  Seguridad de aplicaciones &amp; backend seguro
                </p>
                <p className="text-xs text-[var(--muted)] leading-relaxed">
                  Formación en ciberseguridad y desarrollo de software, con foco
                  en controles de acceso, APIs y datos desde el inicio.
                </p>
              </div>

              <div className="border-t border-[var(--border)] px-5 py-3 flex items-center justify-between gap-3">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--muted)]">
                  Santa Ana, SV
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#b49bff]">
                  Disponible
                </span>
              </div>
            </motion.div>

            <motion.section
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
              aria-labelledby="education-title"
              className="rounded-xl border border-[#7042f8]/30 bg-[var(--card)] p-4"
            >
              <h3
                id="education-title"
                className="font-mono text-[10px] tracking-widest uppercase text-[#b49bff] mb-3"
              >
                Formación
              </h3>
              <div className="flex flex-col gap-2.5">
                {education.map((item) => (
                  <div
                    key={item.level}
                    className="rounded-lg px-3 py-2.5 border flex items-start justify-between gap-2"
                    style={{ borderColor: `${item.color}35`, background: `${item.color}08` }}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[var(--foreground)] leading-snug">
                        {item.level}
                      </p>
                      <p className="font-mono text-[9px] text-[var(--muted)] mt-0.5">
                        {item.institution}
                      </p>
                      <p className="font-mono text-[9px] mt-0.5" style={{ color: `${item.color}cc` }}>
                        {item.status}
                      </p>
                    </div>
                    {item.cum && (
                      <span className="font-mono text-[10px] font-bold shrink-0" style={{ color: item.color }}>
                        CUM {item.cum}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </motion.section>
          </aside>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="flex flex-col gap-8 sm:gap-10"
          >
            <section aria-labelledby="focus-title">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5">
                <div>
                  <p className="font-mono text-xs text-[#06b6d4] tracking-[0.14em] uppercase">
                    Enfoque de trabajo
                  </p>
                  <h3 id="focus-title" className="text-2xl font-semibold text-[var(--foreground)] mt-2">
                    Seguridad aplicada, con evidencia técnica.
                  </h3>
                </div>
                <p className="font-mono text-[10px] text-[var(--muted)] sm:text-right max-w-xs">
                  Sin porcentajes de autoevaluación: el contexto y los controles
                  implementados importan más.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {FOCUS_AREAS.map((area, index) => (
                  <FocusAreaCard key={area.title} area={area} index={index} />
                ))}
              </div>
            </section>

            <motion.section
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: 0.18 }}
              aria-labelledby="evidence-title"
              className="rounded-xl border border-[#06b6d4]/30 bg-[#06b6d4]/[0.04] p-5 sm:p-6"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#06b6d4]">
                Evidencia de práctica
              </p>
              <h3 id="evidence-title" className="text-xl font-semibold text-[var(--foreground)] mt-2">
                Controles que se pueden revisar.
              </h3>
              <ul className="grid sm:grid-cols-3 gap-4 mt-5">
                <li className="border-l-2 border-[#06b6d4] pl-3">
                  <p className="font-mono text-[11px] font-semibold text-[var(--foreground)]">
                    Pruebas automatizadas
                  </p>
                  <p className="text-xs text-[var(--muted)] leading-relaxed mt-1">
                    Más de 1,400 pruebas en los repos donde aplican.
                  </p>
                </li>
                <li className="border-l-2 border-[#06b6d4] pl-3">
                  <p className="font-mono text-[11px] font-semibold text-[var(--foreground)]">
                    Control de acceso
                  </p>
                  <p className="text-xs text-[var(--muted)] leading-relaxed mt-1">
                    Roles, RLS y validación HMAC en productos e integraciones.
                  </p>
                </li>
                <li className="border-l-2 border-[#06b6d4] pl-3">
                  <p className="font-mono text-[11px] font-semibold text-[var(--foreground)]">
                    Decisiones documentadas
                  </p>
                  <p className="text-xs text-[var(--muted)] leading-relaxed mt-1">
                    Requisitos, diagramas y especificaciones para flujos críticos.
                  </p>
                </li>
              </ul>
            </motion.section>

            <section aria-labelledby="languages-title">
              <h3
                id="languages-title"
                className="font-mono text-xs text-[var(--muted)] mb-4 tracking-[0.14em] uppercase"
              >
                Idiomas
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {languages.map((language, index) => (
                  <motion.div
                    key={language.lang}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="rounded-xl border p-4"
                    style={{
                      borderColor: `${language.color}30`,
                      background: `${language.color}06`,
                    }}
                  >
                    <div className="flex justify-between items-baseline gap-2">
                      <span className="font-mono text-[13px] font-bold text-[var(--foreground)]">
                        {language.lang}
                      </span>
                      <span
                        className="font-mono text-[9px] tracking-wider px-1.5 py-px rounded shrink-0"
                        style={{
                          color: language.color,
                          background: `${language.color}14`,
                          border: `1px solid ${language.color}30`,
                        }}
                      >
                        {language.level}
                      </span>
                    </div>
                    <p className="font-mono text-[10px] text-[var(--muted)] mt-2 opacity-80">
                      {language.sublevel}
                    </p>
                  </motion.div>
                ))}
              </div>
            </section>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
