"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

// Skins del personaje — agregar imágenes aquí (pixel-art, fotos reales…)
const SKINS = [
  { src: "/images/oliver.png", label: "PIXEL" },
  { src: "/images/oliver-skin2.png", label: "RETRATO" },
];

const SPECIAL_MOVES = [
  {
    name: "Requisitos y alcance",
    desc: "Con clientes y partes interesadas",
  },
  {
    name: "Control de acceso",
    desc: "RBAC y mínimo privilegio en el POS de Pizza Brava",
  },
  {
    name: "Datos e IA aplicada",
    desc: "Componentes en Python para Akhet y Atria",
  },
  {
    name: "Coordinación técnica",
    desc: "Equipo técnico de seis personas en WUJU",
  },
];

const PURPLE = "#9b7bff";
const CYAN = "#06b6d4";
const GREEN = "#00ff9f";
const VIOLET = "#a78bfa";

// Fuente: CV maestro. Sin porcentajes ni niveles: la evidencia está en Proyectos y Experiencia.
const AREAS = [
  {
    name: "Programación y software",
    color: PURPLE,
    items: ["Python", "Java", "Spring Boot", "JavaScript", "Node.js", "React", "C#", "SQL", "PHP básico", "Git y GitHub"],
  },
  {
    name: "Bases de datos e infraestructura",
    color: CYAN,
    items: ["PostgreSQL", "MySQL", "SQLite", "Firestore", "DigitalOcean", "Cloudflare", "SendGrid", "AWS (fundamentos)", "Google Cloud (cursos)"],
  },
  {
    name: "IA y datos",
    color: VIOLET,
    items: ["Análisis en Python", "ML introductorio", "IA responsable", "Vertex AI Studio", "Transformers y BERT", "Data lakes y warehouses"],
  },
  {
    name: "Ciberseguridad",
    color: GREEN,
    items: ["RBAC", "Mínimo privilegio", "Diseño seguro", "OWASP Top 10", "Redes", "Criptografía", "Respuesta a incidentes", "Hacking ético"],
  },
  {
    name: "Colaboración y gestión",
    color: "#f472b6",
    items: ["Requisitos", "Comunicación con partes interesadas", "Coordinación de equipos", "Documentación", "Seguimiento de tareas", "Ágil y Scrum", "ITIL", "Capacitación de usuarios"],
  },
  {
    name: "Herramientas de IA para desarrollo",
    color: "#f59e0b",
    items: ["GPT", "Claude", "Gemini", "Cursor"],
  },
] as const;

const EXPERIENCIA = [
  {
    role: "Cofundador y líder técnico",
    org: "WUJU",
    period: "2025 – presente",
    detail: "Equipo técnico de seis personas; requisitos, alcance, decisiones técnicas y seguimiento ágil.",
    color: PURPLE,
  },
  {
    role: "Desarrollador del sistema POS (servicio social)",
    org: "Pizza Brava / ESIT",
    period: "Nov 2025 – Mar 2026",
    detail: "RBAC para cajero, cocina y administrador, base de datos PostgreSQL y capacitación del personal.",
    color: GREEN,
  },
  {
    role: "Cofundador y desarrollador del proyecto",
    org: "TuGuíaSV",
    period: "Jun 2024 – presente",
    detail: "Equipo de cuatro personas; DigitalOcean, Cloudflare CDN y SendGrid; Feria Eureka 2024 e InspiraSTEM 2025.",
    color: CYAN,
  },
] as const;

const education = [
  {
    level: "Ingeniería en Desarrollo de Software",
    institution: "UNICAES · sede Santa Ana",
    status: "2.º año · 2025–2029 (esperado)",
    color: PURPLE,
  },
  {
    level: "TSU en Ciberseguridad",
    institution: "ESIT / MINED · aval INFOTEC México",
    status: "31/31 materias · servicio social completado · graduación pendiente",
    color: CYAN,
  },
  {
    level: "Bachillerato Técnico Vocacional",
    institution: "Centro Escolar INSA",
    status: "Finalizado · Diploma de honor: 1.er lugar de la especialidad",
    color: GREEN,
  },
];

const languages = [
  { lang: "Español", level: "Nativo", color: GREEN },
  { lang: "Inglés", level: "B1", color: PURPLE },
] as const;

export default function About() {
  const [skin, setSkin] = useState(0);
  return (
    <section id="sobre-mi" className="py-12 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-12"
        >
          <SectionEyebrow className="mb-3">Perfil</SectionEyebrow>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)]">
            Sobre mí
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-6 sm:gap-10 items-start">

          {/* ─── COLUMNA IZQUIERDA: card + special moves ─── */}
          <div className="flex flex-col gap-5">

          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="pixel-card rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden"
            style={{ "--pixel-shadow": "#7042f8" } as React.CSSProperties}
          >
            {/* Top bar */}
            <div className="bg-[#7042f8]/10 border-b border-[#7042f8]/30 px-5 py-2.5 flex items-center justify-between">
              <span className="font-mono text-[10px] tracking-wider uppercase text-[#b49bff]">Player 01</span>
              <span className="font-mono text-[10px] tracking-wider uppercase text-[#b49bff]">El Salvador</span>
            </div>

            {/* Selector de skin — estilo selección de personaje */}
            <div className="px-5 pt-5 pb-2">
              <div
                className="w-full aspect-[4/5] rounded-lg overflow-hidden relative group/skin"
                style={{
                  border: "2px solid #7042f8",
                  boxShadow: "4px 4px 0 rgba(112,66,248,0.25), 0 0 30px rgba(6,182,212,0.1)",
                  background: "linear-gradient(160deg, #0d0d24 0%, #13132d 100%)",
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={skin}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={SKINS[skin].src}
                      alt={`Oliver Ascencio — ${SKINS[skin].label}`}
                      fill
                      className="object-cover object-top"
                      sizes="280px"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Scanlines holo */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.06) 2px,rgba(0,0,0,0.06) 3px)",
                  }}
                />

                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#7042f8]" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#7042f8]" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#7042f8]" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#7042f8]" />

                {/* Flechas ◄ ► */}
                {SKINS.length > 1 && (
                  <>
                    <button
                      aria-label="Skin anterior"
                      onClick={() => setSkin((skin - 1 + SKINS.length) % SKINS.length)}
                      className="absolute left-1.5 top-1/2 -translate-y-1/2 h-8 w-8 rounded-md flex items-center justify-center border border-[#7042f8]/50 bg-[#030014]/70 text-[#b49bff] hover:bg-[#7042f8]/30 hover:text-white transition-colors cursor-pointer"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      aria-label="Skin siguiente"
                      onClick={() => setSkin((skin + 1) % SKINS.length)}
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 h-8 w-8 rounded-md flex items-center justify-center border border-[#7042f8]/50 bg-[#030014]/70 text-[#b49bff] hover:bg-[#7042f8]/30 hover:text-white transition-colors cursor-pointer"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </>
                )}

                {/* Etiqueta de skin */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 px-2.5 py-1 rounded-md border border-[#7042f8]/40 bg-[#030014]/80 backdrop-blur-sm">
                  <span className="font-mono text-[9px] tracking-widest text-[#b49bff]">
                    SKIN {String(skin + 1).padStart(2, "0")}/{String(SKINS.length).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[9px] tracking-widest text-[#06b6d4]">
                    {SKINS[skin].label}
                  </span>
                </div>
              </div>

              {/* Dots */}
              {SKINS.length > 1 && (
                <div className="flex justify-center gap-1.5 mt-2.5">
                  {SKINS.map((s, i) => (
                    <button
                      key={s.label}
                      aria-label={`Skin ${s.label}`}
                      onClick={() => setSkin(i)}
                      className="h-1.5 rounded-full transition-all cursor-pointer"
                      style={{
                        width: i === skin ? 18 : 6,
                        background: i === skin ? "#7042f8" : "var(--border)",
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Name & class */}
            <div className="px-5 pt-3 pb-2">
              <h3 className="text-base font-bold text-[var(--foreground)] leading-5 mb-0.5">
                Oliver Ascencio
              </h3>
              <p className="font-mono text-xs text-[var(--accent)] mb-4">
                Software · Ciberseguridad · IA
              </p>

              {/* Short bio */}
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                Estudiante de Ingeniería en Desarrollo de Software y
                cofundador de WUJU. TSU en Ciberseguridad pendiente de
                graduación.
              </p>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-[var(--border)] px-5 py-3 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--muted)]">Santa Ana, SV</span>
              <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[#b49bff]">
                <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[#b49bff] animate-pulse" />
                Disponible
              </span>
            </div>
          </motion.div>

          {/* ─── EDUCACIÓN ─── */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="rounded-xl border border-[#7042f8]/30 bg-[var(--card)] p-4"
          >
            <p className="font-mono text-[10px] tracking-widest uppercase text-[#b49bff] mb-3">
              ▸ Educación
            </p>
            <div className="flex flex-col gap-2.5">
              {education.map((e) => (
                <div
                  key={e.level}
                  className="rounded-lg px-3 py-2.5 border flex items-start justify-between gap-2"
                  style={{ borderColor: e.color + "35", background: e.color + "08" }}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[var(--foreground)] leading-snug">
                      {e.level}
                    </p>
                    <p className="font-mono text-[9px] text-[var(--muted)] mt-0.5">
                      {e.institution}
                    </p>
                    <p className="font-mono text-[9px] mt-0.5" style={{ color: e.color }}>
                      {e.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ─── SPECIAL MOVES ─── */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="rounded-xl border border-[#06b6d4]/30 bg-[var(--card)] p-4"
          >
            <p className="font-mono text-[10px] tracking-widest uppercase text-[#06b6d4] mb-3">
              ▸ Lo que aporto
            </p>
            <ul className="flex flex-col gap-2.5">
              {SPECIAL_MOVES.map((m) => (
                <li key={m.name}>
                  <p className="font-mono text-[11px] font-semibold text-[var(--foreground)]">
                    {m.name}
                  </p>
                  <p className="font-mono text-[10px] text-[var(--muted)] leading-snug">
                    {m.desc}
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>

          </div>

          {/* ─── PANEL DERECHO: experiencia, tecnologías e idiomas ─── */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="flex flex-col gap-10"
          >
            {/* EXPERIENCIA */}
            <div>
              <p className="font-mono text-xs text-[var(--muted)] mb-5 tracking-widest uppercase">
                Experiencia
              </p>
              <ul className="flex flex-col gap-3">
                {EXPERIENCIA.map((e) => (
                  <li
                    key={e.role}
                    className="rounded-xl border p-4"
                    style={{ borderColor: `${e.color}30`, background: `${e.color}06` }}
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                      <span className="text-sm font-semibold text-[var(--foreground)]">{e.role}</span>
                      <span className="font-mono text-[10px]" style={{ color: e.color }}>
                        {e.period}
                      </span>
                    </div>
                    <p className="font-mono text-[10px] text-[var(--muted)] mt-0.5">{e.org}</p>
                    <p className="text-xs text-[var(--muted)] leading-relaxed mt-2">{e.detail}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* TECNOLOGÍAS Y CONOCIMIENTOS */}
            <div>
              <p className="font-mono text-xs text-[var(--muted)] mb-2 tracking-widest uppercase">
                Tecnologías y conocimientos
              </p>
              <p className="text-xs text-[var(--muted)] mb-6 opacity-80">
                Tomados de mi CV maestro, sin porcentajes ni niveles: la evidencia está en Proyectos y
                Experiencia.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {AREAS.map((area) => (
                  <div
                    key={area.name}
                    className="rounded-xl border p-4"
                    style={{ borderColor: `${area.color}30`, background: `${area.color}06` }}
                  >
                    <p className="font-mono text-[11px] font-semibold tracking-wider text-[var(--foreground)] mb-3">
                      {area.name}
                    </p>
                    <ul className="flex flex-wrap gap-1.5">
                      {area.items.map((item) => (
                        <li
                          key={item}
                          className="font-mono text-[10px] px-2 py-1 rounded-full border"
                          style={{
                            color: area.color,
                            borderColor: `${area.color}40`,
                            background: `${area.color}10`,
                          }}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* IDIOMAS */}
            <div>
              <p className="font-mono text-xs text-[var(--muted)] mb-5 tracking-widest uppercase">
                Idiomas
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {languages.map((l) => (
                  <div
                    key={l.lang}
                    className="rounded-xl border p-4 flex items-center justify-between gap-2"
                    style={{ borderColor: `${l.color}30`, background: `${l.color}06` }}
                  >
                    <span className="font-mono text-[13px] font-bold text-[var(--foreground)]">{l.lang}</span>
                    <span
                      className="font-mono text-[10px] tracking-wider px-2 py-0.5 rounded"
                      style={{ color: l.color, background: `${l.color}14`, border: `1px solid ${l.color}30` }}
                    >
                      {l.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
