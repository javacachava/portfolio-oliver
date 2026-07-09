"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const skillStats = [
  { name: "BACKEND",     value: 85, color: "#0ea5e9", desc: "Node.js · NestJS · REST APIs" },
  { name: "JAVA/SPRING", value: 78, color: "#ef4444", desc: "Spring Boot · Maven · REST" },
  { name: "TYPESCRIPT",  value: 80, color: "#38bdf8", desc: "Tipado estricto · Patrones avanzados" },
  { name: "REACT/FRONT", value: 72, color: "#a78bfa", desc: "React · Vite · Tailwind CSS" },
  { name: "CLOUD",       value: 65, color: "#00ff9f", desc: "AWS · Google Cloud · Vertex AI" },
  { name: "DATABASES",   value: 78, color: "#0ea5e9", desc: "PostgreSQL · PostGIS · Redis" },
  { name: "SECURITY",    value: 75, color: "#a78bfa", desc: "OWASP Top 10 · JWT · RLS · Criptografía" },
  { name: "DEVOPS",      value: 62, color: "#00ff9f", desc: "Docker · Compose · GitHub Actions" },
];

const education = [
  {
    level: "Ingeniería en Desarrollo de Software",
    institution: "UNICAES · Santa Ana",
    status: "2.° año · 2025–2029",
    cum: "8.69",
    cumLabel: "CUM",
    color: "#0ea5e9",
  },
  {
    level: "TSU en Ciberseguridad",
    institution: "ESIT / MINED · aval INFOTEC México",
    status: "Graduando · Servicio social completado",
    cum: "8.89",
    cumLabel: "CUM",
    color: "#a78bfa",
  },
  {
    level: "Bachillerato Técnico Vocacional ITSI",
    institution: "Centro Escolar INSA",
    status: "Finalizado · 1.er lugar · Diploma de Honor",
    cum: null,
    cumLabel: "",
    color: "#00ff9f",
  },
];

const languages = [
  {
    lang: "Español",
    level: "Nativo",
    sublevel: "100% fluidez oral y escrita",
    value: 100,
    color: "#00ff9f",
  },
  {
    lang: "Inglés",
    level: "En progreso → B2",
    sublevel: "Lectura técnica fluida · Clases intensivas en curso",
    value: 32,
    color: "#0ea5e9",
  },
];

function StatBar({
  label,
  value,
  color,
  delay = 0,
  desc,
}: {
  label: string;
  value: number;
  color: string;
  delay?: number;
  desc?: string;
}) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-1.5">
        <span className="font-mono text-[11px] font-semibold tracking-wider text-[var(--foreground)]">
          {label}
        </span>
        <span className="font-mono text-[11px] font-bold" style={{ color }}>
          {value}%
        </span>
      </div>
      <div className="h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: "easeOut", delay }}
        />
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
          <p className="font-pixel text-[9px] text-[var(--accent)] mb-3 tracking-widest uppercase">
            ► SELECT YOUR CHARACTER ◄
          </p>
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
            style={{ "--pixel-shadow": "#fbbf24" } as React.CSSProperties}
          >
            {/* Top bar */}
            <div className="bg-[var(--gold)]/10 border-b border-[var(--gold)]/30 px-5 py-2.5 flex items-center justify-between">
              <span className="font-pixel text-[8px] text-[var(--gold)]">► PLAYER 01</span>
              <span className="font-pixel text-[8px] text-[var(--gold)]">EL SALVADOR ◄</span>
            </div>

            {/* Photo */}
            <div className="px-5 pt-5 pb-2">
              <div
                className="w-full aspect-[4/5] rounded-lg overflow-hidden relative"
                style={{
                  border: "2px solid var(--gold)",
                  boxShadow: "4px 4px 0 rgba(251,191,36,0.25), 0 0 30px rgba(251,191,36,0.08)",
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
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[var(--gold)]" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[var(--gold)]" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[var(--gold)]" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[var(--gold)]" />
              </div>
            </div>

            {/* Name & class */}
            <div className="px-5 pt-3 pb-2">
              <h3 className="font-pixel text-[10px] text-[var(--foreground)] leading-5 mb-0.5">
                OLIVER ASCENCIO
              </h3>
              <p className="font-pixel text-[8px] text-[var(--accent)] mb-4">
                FULL-STACK · 20 AÑOS
              </p>

              {/* Education GPA cards */}
              <div className="flex flex-col gap-2 mb-5">
                <div
                  className="rounded-lg px-3 py-2.5 border"
                  style={{ borderColor: "#0ea5e9" + "40", background: "#0ea5e9" + "08" }}
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
                    <span className="font-pixel text-[9px] text-[#0ea5e9] shrink-0 ml-2">
                      8.69
                    </span>
                  </div>
                </div>

                <div
                  className="rounded-lg px-3 py-2.5 border"
                  style={{ borderColor: "#a78bfa" + "40", background: "#a78bfa" + "08" }}
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
                    <span className="font-pixel text-[9px] text-[#a78bfa] shrink-0 ml-2">
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
              <span className="font-pixel text-[7px] text-[var(--muted)]">SANTA ANA, SV</span>
              <span className="font-pixel text-[7px] text-[var(--gold)] animate-pulse">PRESS START</span>
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
            {/* SKILLS */}
            <div>
              <p className="font-pixel text-[9px] text-[var(--gold)] mb-5 tracking-wider">
                ▸ SKILLS
              </p>
              <div className="flex flex-col gap-4">
                {skillStats.map((s, i) => (
                  <StatBar
                    key={s.name}
                    label={s.name}
                    value={s.value}
                    color={s.color}
                    delay={i * 0.07}
                    desc={s.desc}
                  />
                ))}
              </div>
            </div>

            {/* EDUCATION */}
            <div>
              <p className="font-pixel text-[9px] text-[var(--gold)] mb-5 tracking-wider">
                ▸ EDUCACIÓN
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
                          className="font-pixel text-[11px] block"
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
              <p className="font-pixel text-[9px] text-[var(--gold)] mb-5 tracking-wider">
                ▸ IDIOMAS
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
