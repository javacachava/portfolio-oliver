"use client";

import { motion } from "framer-motion";
import { Trophy, Medal } from "lucide-react";
import { awards } from "@/data/awards";
import { certifications } from "@/data/certifications";

const CERT_COLORS = [
  "#10b981", // emerald — Java
  "#f97316", // orange  — AWS
  "#a78bfa", // violet  — ITIL
  "#0ea5e9", // sky     — Google Cloud
  "#fbbf24", // gold    — AI Bootcamp
  "#06b6d4", // cyan    — SOLID
  "#f43f5e", // rose    — StartUps
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
          <p className="font-pixel text-[9px] text-[var(--gold)] mb-3 tracking-widest uppercase">
            ▸ ACHIEVEMENTS & SKILLS
          </p>
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
            <p className="font-pixel text-[8px] text-[var(--gold)] mb-5 tracking-wider">
              ▸ LOGROS
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
                          borderColor: "rgba(251,191,36,0.35)",
                          background: "rgba(251,191,36,0.05)",
                          boxShadow: "0 0 20px rgba(251,191,36,0.08)",
                        }
                      : {
                          borderColor: "var(--border)",
                          background: "var(--card)",
                        }
                  }
                >
                  {a.highlight && (
                    <div className="px-4 py-1.5 border-b flex items-center gap-2" style={{ borderColor: "rgba(251,191,36,0.2)", background: "rgba(251,191,36,0.06)" }}>
                      <span className="font-pixel text-[7px] text-[var(--gold)]">▸ ACHIEVEMENT UNLOCKED</span>
                    </div>
                  )}
                  <div className="flex items-start gap-3 p-4">
                    <div
                      className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0"
                      style={
                        a.highlight
                          ? { background: "rgba(251,191,36,0.15)", border: "1px solid rgba(251,191,36,0.3)" }
                          : { background: "var(--card-elevated)", border: "1px solid var(--border)" }
                      }
                    >
                      {a.highlight
                        ? <Trophy size={15} style={{ color: "var(--gold)" }} />
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

          {/* ── Skills Acquired ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="font-pixel text-[8px] text-[var(--gold)] mb-5 tracking-wider">
              ▸ SKILLS ACQUIRED
            </p>
            <div className="flex flex-wrap gap-2.5">
              {certifications.map((c, i) => {
                const color = CERT_COLORS[i % CERT_COLORS.length];
                return (
                  <motion.div
                    key={c.name}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                    className="rounded-xl p-3 terminal-card"
                    style={{
                      borderColor:     `${color}30`,
                      border:          `1px solid ${color}30`,
                      background:      `${color}0a`,
                      "--t-glow":      `${color}15`,
                      "--t-accent":    `${color}40`,
                    } as React.CSSProperties}
                  >
                    <p className="text-sm font-medium text-[var(--foreground)] leading-snug max-w-[200px]">
                      {c.name}
                    </p>
                    <div className="flex items-center justify-between gap-3 mt-1.5">
                      <p className="font-pixel text-[7px] text-[var(--muted)]">{c.issuer}</p>
                      <span className="font-mono text-[10px] shrink-0" style={{ color }}>
                        {c.date}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
