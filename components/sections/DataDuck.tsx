"use client";

import { motion } from "framer-motion";
import { Mail, Globe } from "lucide-react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import Counter from "@/components/ui/Counter";

const metrics = [
  { to: 7, from: 0, label: "integrantes", color: "#7042f8" },
  { to: 5, from: 0, label: "productos", color: "#a78bfa" },
  { to: 2, from: 0, label: "clientes activos", color: "#00ff9f" },
  { to: 2026, from: 2020, label: "desde", color: "#06b6d4" },
];

const pillars = [
  {
    number: "01",
    title: "Aprendemos",
    description: "Compartimos criterio, herramientas y experiencia de proyectos reales.",
    color: "#7042f8",
  },
  {
    number: "02",
    title: "Construimos",
    description: "Convertimos problemas locales en productos útiles y mantenibles.",
    color: "#06b6d4",
  },
  {
    number: "03",
    title: "Colaboramos",
    description: "Conectamos talento, empresas e iniciativas con propósito.",
    color: "#00ff9f",
  },
];

const gitLog = [
  { hash: "a4f2c", ref: "prod", msg: "order-bot: WhatsApp order bot · cliente real",      live: true  },
  { hash: "d8e9f", ref: "prod", msg: "restaurant-pos: v1.0 · 1,400+ tests · producción",  live: true  },
  { hash: "c2b7e", ref: "dev",  msg: "tuguiasv: geospatial B2B infra · CONACYT",          live: false },
  { hash: "e5c8b", ref: "dev",  msg: "flowcore: hydraulic sim · 121 reqs",                live: false },
];

export default function Wuju() {
  return (
    <section id="wuju" className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <SectionEyebrow className="mb-3">Wuju · comunidad y producto</SectionEyebrow>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-3">
            Tecnología útil, construida
            <br className="hidden sm:block" /> en comunidad.
          </h2>
          <p className="text-[var(--muted)] max-w-xl">
            Una comunidad de desarrolladores de Santa Ana que aprende, construye
            y colabora para resolver problemas reales en El Salvador.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* ── Left: description + stats + CTAs ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[var(--muted)] leading-relaxed mb-8">
              Wuju nació para acercar talento técnico y necesidades locales. No
              hacemos demos genéricas: creamos sistemas B2B, bots de producción,
              software de ingeniería y productos que pueden sostenerse en el tiempo.
            </p>

            <div className="grid sm:grid-cols-3 gap-3 mb-8">
              {pillars.map((pillar) => (
                <div
                  key={pillar.number}
                  className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4"
                  style={{ borderTopColor: pillar.color, borderTopWidth: "2px" }}
                >
                  <p className="font-mono text-[10px] tracking-widest mb-3" style={{ color: pillar.color }}>
                    {pillar.number}
                  </p>
                  <h3 className="font-semibold text-[var(--foreground)] mb-1.5">
                    {pillar.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-[var(--muted)]">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between gap-4 mb-3">
              <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)]">
                Impacto actual
              </p>
              <span className="font-mono text-[10px] text-[#b49bff]">Santa Ana, SV</span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {metrics.map((m) => (
                <div
                  key={m.label}
                  className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] text-center"
                  style={{ borderTopColor: m.color, borderTopWidth: "2px" }}
                >
                  <p
                    className="text-3xl font-bold tabular-nums mb-1"
                    style={{ color: m.color }}
                  >
                    <Counter from={m.from} to={m.to} />
                  </p>
                  <p className="text-xs text-[var(--muted)] capitalize">{m.label}</p>
                </div>
              ))}
            </div>

            <p className="text-sm text-[var(--muted)] mb-4">
              ¿Querés construir, aprender o llevar una idea a producción?
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="mailto:contacto@wuju.dev?subject=Quiero%20sumarme%20a%20Wuju"
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-sm font-medium transition-all hover:-translate-y-0.5"
              >
                <Mail size={14} />
                Quiero sumarme
              </a>
              <a
                href="mailto:contacto@wuju.dev?subject=Quiero%20proponer%20un%20proyecto"
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-[var(--border)] hover:border-[var(--accent)]/50 text-[var(--foreground)] text-sm font-medium transition-all hover:-translate-y-0.5"
              >
                <Mail size={14} />
                Proponer un proyecto
              </a>
            </div>

            <a
              href="https://wuju.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
            >
              <Globe size={14} />
              Conocer más en wuju.dev
            </a>
          </motion.div>

          {/* ── Right: git log terminal ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="terminal-card rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden"
            style={{
              "--t-glow":   "rgba(112,66,248,0.12)",
              "--t-accent": "rgba(112,66,248,0.3)",
            } as React.CSSProperties}
          >
            {/* Terminal header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border)] bg-[var(--accent)]/5">
              <div className="flex gap-1.5">
                {(["#ff5f57", "#febc2e", "#28c840"] as const).map((c) => (
                  <span key={c} className="block w-2.5 h-2.5 rounded-full" style={{ background: c }} />
                ))}
              </div>
              <span className="font-mono text-[11px] text-[var(--muted)]">
                ~/wuju <span className="text-[var(--accent)]">$</span> cat proyectos-en-marcha.md
              </span>
            </div>

            <div className="p-5 flex flex-col gap-3">
              <div className="pb-4 border-b border-[var(--border)]">
                <p className="font-mono text-[10px] uppercase tracking-widest text-[#b49bff] mb-1.5">
                  Prueba de trabajo real
                </p>
                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  Productos en producción y exploraciones que responden a problemas concretos.
                </p>
              </div>

              {gitLog.map((entry, i) => (
                <motion.div
                  key={entry.hash}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 + i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <span className="font-mono text-[11px] text-[var(--muted)] shrink-0 mt-0.5 tabular-nums">
                    {entry.hash}
                  </span>
                  <span
                    className="font-mono text-[10px] px-1.5 py-0.5 rounded shrink-0 mt-0.5"
                    style={
                      entry.live
                        ? { color: "#00ff9f", background: "rgba(0,255,159,0.12)", border: "1px solid rgba(0,255,159,0.25)" }
                        : { color: "#06b6d4", background: "rgba(6,182,212,0.10)", border: "1px solid rgba(6,182,212,0.2)" }
                    }
                  >
                    {entry.live ? "prod" : "dev"}
                  </span>
                  <span className="text-sm text-[var(--muted)] leading-snug">{entry.msg}</span>
                </motion.div>
              ))}

              <div className="mt-2 pt-4 border-t border-[var(--border)] flex items-center justify-between">
                <span className="font-mono text-[10px] text-[var(--muted)]">
                  2 productos en producción · 2 en desarrollo
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#b49bff]">
                  Construimos aquí
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[11px] text-[var(--muted)]">
                  ~/wuju <span className="text-[var(--accent)]">$</span>
                </span>
                <span className="cursor-blink font-mono text-[11px] text-[var(--accent)]" />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
