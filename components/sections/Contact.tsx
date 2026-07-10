"use client";

import { motion } from "framer-motion";
import { Mail, MessageCircle, GitBranch, ExternalLink } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

interface Connection {
  cmd:   string;
  label: string;
  value: string;
  href:  string;
  color: string;
  Icon:  LucideIcon;
}

const connections: Connection[] = [
  {
    cmd:   "$ connect --email",
    label: "Email",
    value: "oliver.a.ascencio@gmail.com",
    href:  "mailto:oliver.a.ascencio@gmail.com",
    color: "#7042f8",
    Icon:  Mail,
  },
  {
    cmd:   "$ connect --whatsapp",
    label: "WhatsApp",
    value: "+503 7539-8164",
    href:  "https://wa.me/50375398164",
    color: "#00ff9f",
    Icon:  MessageCircle,
  },
  {
    cmd:   "$ connect --github",
    label: "GitHub",
    value: "github.com/javacachava",
    href:  "https://github.com/javacachava",
    color: "#a78bfa",
    Icon:  GitBranch,
  },
  {
    cmd:   "$ connect --linkedin",
    label: "LinkedIn",
    value: "in/oliver-ascencio",
    href:  "https://linkedin.com/in/oliver-ascencio",
    color: "#06b6d4",
    Icon:  ExternalLink,
  },
];

export default function Contact() {
  return (
    <section id="contacto" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <SectionEyebrow className="mb-3">Contacto</SectionEyebrow>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-3">
            Hablemos.
          </h2>
          <p className="text-[var(--muted)] max-w-lg">
            Disponible para proyectos remotos o en El Salvador.
            También podés contactarme para proyectos de Wuju.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
          {connections.map(({ cmd, label, value, href, color, Icon }, i) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith("http") || href.startsWith("https") ? "_blank" : undefined}
              rel={href.startsWith("http") || href.startsWith("https") ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
              className="flex flex-col rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden terminal-card group"
              style={{
                "--t-glow":   `${color}20`,
                "--t-accent": `${color}40`,
              } as React.CSSProperties}
            >
              {/* Terminal header */}
              <div
                className="flex items-center gap-3 px-4 py-2.5 border-b"
                style={{ background: `${color}0a`, borderColor: `${color}20` }}
              >
                <div className="flex gap-1.5">
                  {(["#ff5f57", "#febc2e", "#28c840"] as const).map((c) => (
                    <span key={c} className="block w-2 h-2 rounded-full" style={{ background: c }} />
                  ))}
                </div>
                <span className="font-mono text-[10px]" style={{ color }}>
                  {cmd}
                </span>
              </div>

              {/* Content */}
              <div className="flex items-center gap-4 px-4 py-4">
                <div
                  className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110"
                  style={{
                    background:  `${color}18`,
                    border:      `1px solid ${color}40`,
                    boxShadow:   `0 0 14px ${color}20`,
                  }}
                >
                  <Icon size={18} style={{ color }} />
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--muted)] mb-1">{label}</p>
                  <p
                    className="text-sm font-medium truncate transition-colors"
                    style={{ color: "var(--foreground)" }}
                  >
                    {value}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}
