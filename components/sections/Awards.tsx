"use client";

import { motion } from "framer-motion";
import { Trophy, Medal, ArrowRight } from "lucide-react";
import { awards } from "@/data/awards";
import { formacion, formacionStats } from "@/data/formacion";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import Counter from "@/components/ui/Counter";

// Mini-constelación decorativa del teaser (posiciones fijas, una estrella por categoría)
const TEASER_STARS = [
  { x: 40,  y: 55,  r: 5 },
  { x: 105, y: 25,  r: 4 },
  { x: 175, y: 60,  r: 6 },
  { x: 240, y: 30,  r: 4 },
  { x: 285, y: 85,  r: 5 },
  { x: 215, y: 120, r: 4 },
  { x: 130, y: 100, r: 5 },
  { x: 60,  y: 130, r: 4 },
];

export default function Awards() {
  return (
    <section id="premios" className="py-24 px-4 sm:px-6 bg-[var(--card)]/20">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <SectionEyebrow className="mb-3">Logros & certificaciones</SectionEyebrow>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)]">
            Reconocimiento fuera del aula.
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* ── Achievements ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-mono text-xs text-[var(--muted)] mb-5 tracking-widest uppercase">
              Logros
            </p>
            <div className="flex flex-col gap-3">
              {awards.map((a, i) => (
                <motion.div
                  key={a.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.07 }}
                  className="rounded-xl border overflow-hidden"
                  style={
                    a.highlight
                      ? {
                          borderColor: "rgba(112,66,248,0.35)",
                          background: "rgba(112,66,248,0.05)",
                          boxShadow: "0 0 20px rgba(112,66,248,0.1)",
                        }
                      : {
                          borderColor: "var(--border)",
                          background: "var(--card)",
                        }
                  }
                >
                  {a.highlight && (
                    <div className="px-4 py-1.5 border-b flex items-center gap-2" style={{ borderColor: "rgba(112,66,248,0.2)", background: "rgba(112,66,248,0.06)" }}>
                      <span className="font-mono text-[10px] tracking-wider uppercase text-[#b49bff]">Destacado</span>
                    </div>
                  )}
                  <div className="flex items-start gap-3 p-4">
                    <div
                      className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0"
                      style={
                        a.highlight
                          ? { background: "rgba(112,66,248,0.15)", border: "1px solid rgba(112,66,248,0.3)" }
                          : { background: "var(--card-elevated)", border: "1px solid var(--border)" }
                      }
                    >
                      {a.highlight
                        ? <Trophy size={15} style={{ color: "#b49bff" }} />
                        : <Medal size={14} className="text-[var(--muted)]" />
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[var(--foreground)] leading-snug">
                        {a.title}
                      </p>
                      <p className="text-xs text-[var(--muted)] mt-0.5">{a.organizer}</p>
                      {a.project && (
                        <p className="font-mono text-xs text-[var(--accent)] mt-0.5">
                          {a.project}
                        </p>
                      )}
                    </div>
                    <span className="font-mono text-[10px] text-[var(--muted)] shrink-0 mt-0.5">
                      {a.year}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Teaser: mapa de formación ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="font-mono text-xs text-[var(--muted)] mb-5 tracking-widest uppercase">
              Formación
            </p>

            <a
              href="/formacion"
              className="group block rounded-xl border border-[#7042f8]/30 bg-[#0b0322]/60 overflow-hidden terminal-card"
              style={{
                "--t-glow":   "rgba(112,66,248,0.15)",
                "--t-accent": "rgba(112,66,248,0.4)",
              } as React.CSSProperties}
            >
              {/* Mini-constelación decorativa */}
              <div className="relative h-[170px] overflow-hidden">
                <svg viewBox="0 0 320 160" className="w-full h-full">
                  {TEASER_STARS.map((s, i) =>
                    i < TEASER_STARS.length - 1 ? (
                      <line
                        key={`l${i}`}
                        x1={s.x} y1={s.y}
                        x2={TEASER_STARS[i + 1].x} y2={TEASER_STARS[i + 1].y}
                        stroke={formacion[i % formacion.length].color}
                        strokeWidth="0.75"
                        opacity="0.25"
                        className="group-hover:opacity-60 transition-opacity duration-500"
                      />
                    ) : null
                  )}
                  {TEASER_STARS.map((s, i) => {
                    const color = formacion[i % formacion.length].color;
                    return (
                      <circle
                        key={`s${i}`}
                        cx={s.x} cy={s.y} r={s.r}
                        fill={color}
                        opacity="0.8"
                        className="animate-pulse"
                        style={{
                          animationDelay: `${i * 0.35}s`,
                          animationDuration: "3s",
                          filter: `drop-shadow(0 0 5px ${color})`,
                        }}
                      />
                    );
                  })}
                </svg>
              </div>

              {/* Counters */}
              <div className="grid grid-cols-3 border-t border-[#7042f8]/20">
                {[
                  { value: formacionStats.totalHours, suffix: "h", label: "documentadas", color: "#7042f8" },
                  { value: formacionStats.totalItems, suffix: "", label: "ítems", color: "#06b6d4" },
                  { value: formacionStats.totalInstitutions, suffix: "", label: "instituciones", color: "#00ff9f" },
                ].map((s) => (
                  <div key={s.label} className="py-4 text-center">
                    <p className="text-xl font-bold tabular-nums" style={{ color: s.color }}>
                      <Counter to={s.value} />{s.suffix}
                    </p>
                    <p className="font-mono text-[9px] text-[var(--muted)] uppercase tracking-wider mt-0.5">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex items-center justify-between px-5 py-4 border-t border-[#7042f8]/20 button-primary">
                <span className="text-sm text-white font-medium">
                  Explorar mapa de formación
                </span>
                <ArrowRight
                  size={16}
                  className="text-[#b49bff] group-hover:translate-x-1 transition-transform"
                />
              </div>
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
