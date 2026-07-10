"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

const PURPLE = "#7042f8";
const CYAN = "#06b6d4";
const GREEN = "#00ff9f";
const VIOLET = "#a78bfa";

// Autoevaluación auditada contra los repos reales — números honestos
const dominios = [
  { name: "Vue 3 · Pinia · Vitest", value: 90, desc: "899 tests · PWA offline · MSW" },
  { name: "Laravel · PHP",          value: 80, desc: "PHPStan nv6 · 550 tests · Pint" },
  { name: "Python · FastAPI",       value: 75, desc: "pytest · seguridad aplicada" },
  { name: "Django",                 value: 72, desc: "HTMX · tests de admin" },
  { name: "Supabase · Postgres",    value: 65, desc: "RLS · threat modeling" },
  { name: "Three.js · JS vanilla",  value: 65, desc: "juego completo jugable" },
  { name: "React",                  value: 62, desc: "UI en 4 proyectos" },
  { name: "Node · Express",         value: 62, desc: "bot en producción · HMAC" },
  { name: "Next.js",                value: 60, desc: "este portfolio · VPS propio" },
  { name: "Docker · DevOps",        value: 58, desc: "Compose en prod · multi-stage" },
  { name: "NestJS",                 value: 45, desc: "API geoespacial · en pausa" },
  { name: "Spring Boot · Java",     value: 10, desc: "recién empezando" },
  { name: "Flutter · Dart",         value: 5,  desc: "apenas arrancado" },
];

const transversales = [
  { name: "Seguridad",       value: 58, desc: "RLS · HMAC · CSRF · auditorías propias" },
  { name: "Testing",         value: 60, desc: "1400+ tests donde se aplica" },
  { name: "Higiene de repo", value: 55, desc: "limpieza en curso" },
  { name: "Documentación",   value: 40, desc: "en mejora activa" },
];

function tierOf(pct: number) {
  if (pct >= 80) return { color: GREEN,  label: "PRODUCCIÓN" };
  if (pct >= 60) return { color: CYAN,   label: "SÓLIDO" };
  if (pct >= 40) return { color: VIOLET, label: "EN DESARROLLO" };
  return { color: "#9a91c5", label: "APRENDIENDO" };
}

const education = [
  {
    level: "Ingeniería en Desarrollo de Software",
    institution: "UNICAES · Santa Ana",
    status: "2.° año · 2025–2029",
    cum: "8.69",
    cumLabel: "CUM",
    color: PURPLE,
  },
  {
    level: "TSU en Ciberseguridad",
    institution: "ESIT / MINED · aval INFOTEC México",
    status: "Graduando · Servicio social completado",
    cum: "8.89",
    cumLabel: "CUM",
    color: CYAN,
  },
  {
    level: "Bachillerato Técnico Vocacional ITSI",
    institution: "Centro Escolar INSA",
    status: "Finalizado · 1.er lugar · Diploma de Honor",
    cum: null,
    cumLabel: "",
    color: GREEN,
  },
];

const languages = [
  {
    lang: "Español",
    level: "Nativo",
    sublevel: "100% fluidez oral y escrita",
    value: 100,
    color: GREEN,
  },
  {
    lang: "Inglés",
    level: "En progreso → B2",
    sublevel: "Lectura técnica fluida · Clases intensivas en curso",
    value: 32,
    color: PURPLE,
  },
];

function DominioBar({
  name,
  value,
  desc,
  index,
}: {
  name: string;
  value: number;
  desc?: string;
  index: number;
}) {
  const t = tierOf(value);
  const SEGMENTS = 20;
  const filled = Math.round((value / 100) * SEGMENTS);
  return (
    <div>
      <div className="flex justify-between items-baseline mb-1.5 gap-2">
        <span className="font-mono text-[11px] font-semibold tracking-wider text-[var(--foreground)] truncate">
          {name}
        </span>
        <span className="flex items-baseline gap-2 shrink-0">
          <span
            className="font-mono text-[8px] tracking-wider px-1.5 py-px rounded"
            style={{
              color: t.color,
              background: `${t.color}14`,
              border: `1px solid ${t.color}30`,
            }}
          >
            {t.label}
          </span>
          <span
            className="font-mono text-[11px] font-bold tabular-nums"
            style={{ color: t.color }}
          >
            {value}%
          </span>
        </span>
      </div>
      <div className="flex gap-[3px]">
        {Array.from({ length: SEGMENTS }).map((_, i) => (
          <motion.span
            key={i}
            className="h-2 flex-1 rounded-[2px]"
            style={{
              background: i < filled ? t.color : "var(--border)",
              boxShadow: i < filled ? `0 0 6px ${t.color}70` : "none",
            }}
            initial={{ opacity: 0, scaleY: 0.3 }}
            whileInView={{ opacity: i < filled ? 1 : 0.45, scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25, delay: index * 0.03 + i * 0.012 }}
          />
        ))}
      </div>
      {desc && (
        <p className="font-mono text-[10px] text-[var(--muted)] mt-1 opacity-70">
          {desc}
        </p>
      )}
    </div>
  );
}

export default function About() {
  return (
    <section id="sobre-mi" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <SectionEyebrow className="mb-3">Perfil</SectionEyebrow>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)]">
            Sobre mí
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-10 items-start">

          {/* ─── CHARACTER CARD ─── */}
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

            {/* Photo */}
            <div className="px-5 pt-5 pb-2">
              <div
                className="w-full aspect-[4/5] rounded-lg overflow-hidden relative"
                style={{
                  border: "2px solid #7042f8",
                  boxShadow: "4px 4px 0 rgba(112,66,248,0.25), 0 0 30px rgba(6,182,212,0.1)",
                  background: "linear-gradient(160deg, #0d0d24 0%, #13132d 100%)",
                }}
              >
                <Image
                  src="/images/oliver.png"
                  alt="Oliver Ascencio"
                  fill
                  className="object-cover object-top"
                  sizes="280px"
                  priority
                />
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#7042f8]" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#7042f8]" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#7042f8]" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#7042f8]" />
              </div>
            </div>

            {/* Name & class */}
            <div className="px-5 pt-3 pb-2">
              <h3 className="text-base font-bold text-[var(--foreground)] leading-5 mb-0.5">
                Oliver Ascencio
              </h3>
              <p className="font-mono text-xs text-[var(--accent)] mb-4">
                Full-Stack · 20 años
              </p>

              {/* Education GPA cards */}
              <div className="flex flex-col gap-2 mb-5">
                <div
                  className="rounded-lg px-3 py-2.5 border"
                  style={{ borderColor: "#7042f8" + "40", background: "#7042f8" + "08" }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-mono text-[10px] font-semibold text-[var(--foreground)]">
                        Ing. Dev Software
                      </p>
                      <p className="font-mono text-[9px] text-[var(--muted)] mt-0.5">
                        UNICAES · 2.° año
                      </p>
                    </div>
                    <span className="font-mono text-xs font-bold text-[#7042f8] shrink-0 ml-2">
                      8.69
                    </span>
                  </div>
                </div>

                <div
                  className="rounded-lg px-3 py-2.5 border"
                  style={{ borderColor: "#06b6d4" + "40", background: "#06b6d4" + "08" }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-mono text-[10px] font-semibold text-[var(--foreground)]">
                        TSU Ciberseguridad
                      </p>
                      <p className="font-mono text-[9px] text-[var(--muted)] mt-0.5">
                        ESIT / MINED · Graduando
                      </p>
                    </div>
                    <span className="font-mono text-xs font-bold text-[#06b6d4] shrink-0 ml-2">
                      8.89
                    </span>
                  </div>
                </div>
              </div>

              {/* Short bio */}
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                Cofundador y líder técnico de Wuju. Backend TypeScript/Node.js,
                cloud AWS/GCP y sistemas en tiempo real.
              </p>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-[var(--border)] px-5 py-3 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--muted)]">Santa Ana, SV</span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#b49bff] animate-pulse">Disponible</span>
            </div>
          </motion.div>

          {/* ─── STATS PANEL ─── */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="flex flex-col gap-10"
          >
            {/* DOMINIO POR TECNOLOGÍA */}
            <div>
              <p className="font-mono text-xs text-[var(--muted)] mb-2 tracking-widest uppercase">
                Dominio por tecnología
              </p>
              <p className="text-xs text-[var(--muted)] mb-6 opacity-80">
                Autoevaluación auditada contra mis propios repos — números
                reales, no marketing.
              </p>
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-5">
                {dominios.map((d, i) => (
                  <DominioBar key={d.name} {...d} index={i} />
                ))}
              </div>
            </div>

            {/* TRANSVERSALES */}
            <div>
              <p className="font-mono text-xs text-[var(--muted)] mb-5 tracking-widest uppercase">
                Transversales
              </p>
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-5">
                {transversales.map((d, i) => (
                  <DominioBar key={d.name} {...d} index={i} />
                ))}
              </div>
            </div>

            {/* EDUCATION */}
            <div>
              <p className="font-mono text-xs text-[var(--muted)] mb-5 tracking-widest uppercase">
                Educación
              </p>
              <div className="flex flex-col gap-3">
                {education.map((e) => (
                  <div
                    key={e.level}
                    className="p-4 rounded-lg border bg-[var(--card)] flex items-start justify-between gap-3"
                    style={{ borderColor: e.color + "30" }}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[var(--foreground)] leading-snug">
                        {e.level}
                      </p>
                      <p className="text-xs text-[var(--muted)] mt-1">{e.institution}</p>
                      <p className="text-xs mt-1" style={{ color: e.color + "cc" }}>
                        {e.status}
                      </p>
                    </div>
                    {e.cum && (
                      <div className="text-right shrink-0">
                        <span
                          className="font-mono text-sm font-bold block"
                          style={{ color: e.color }}
                        >
                          {e.cum}
                        </span>
                        <span className="font-mono text-[9px] text-[var(--muted)]">/ 10</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* LANGUAGES */}
            <div>
              <p className="font-mono text-xs text-[var(--muted)] mb-5 tracking-widest uppercase">
                Idiomas
              </p>
              <div className="flex flex-col gap-5">
                {languages.map((l, i) => (
                  <div key={l.lang}>
                    <div className="flex justify-between items-baseline mb-1.5">
                      <span className="font-mono text-[13px] font-bold text-[var(--foreground)]">
                        {l.lang}
                      </span>
                      <span
                        className="font-mono text-[11px] font-semibold"
                        style={{ color: l.color }}
                      >
                        {l.level}
                      </span>
                    </div>
                    <div className="h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: l.color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${l.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.75, ease: "easeOut", delay: i * 0.15 }}
                      />
                    </div>
                    <p className="font-mono text-[10px] text-[var(--muted)] mt-1 opacity-70">
                      {l.sublevel}
                    </p>
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
