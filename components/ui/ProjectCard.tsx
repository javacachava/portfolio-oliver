"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import type { Project } from "@/data/projects";

const STATUS: Record<Project["statusType"], { label: string; color: string }> = {
  live:       { label: "● LIVE",  color: "#00ff9f" },
  active:     { label: "◎ DEV",   color: "#0ea5e9" },
  functional: { label: "◈ FUNC",  color: "#a78bfa" },
};

const TRAFFIC = ["#ef4444", "#f59e0b", "#22c55e"] as const;

export default function ProjectCard({ project }: { project: Project }) {
  const c  = project.accentColor;
  const st = STATUS[project.statusType];

  return (
    <div
      className="flex flex-col h-full rounded-xl overflow-hidden border bg-[var(--card)] terminal-card"
      style={{
        borderColor:  "var(--border)",
        "--t-glow":   `${c}1a`,
        "--t-accent": `${c}40`,
      } as React.CSSProperties}
    >
      {/* ── Terminal chrome ── */}
      <div
        className="flex items-center gap-2.5 px-4 py-2.5 shrink-0"
        style={{ borderBottom: `1px solid ${c}18`, background: `${c}07` }}
      >
        <div className="flex gap-1.5 shrink-0">
          {TRAFFIC.map((col) => (
            <span key={col} className="block w-2.5 h-2.5 rounded-full" style={{ background: col }} />
          ))}
        </div>
        <span className="font-mono text-[10px] text-[var(--muted)] flex-1 min-w-0 truncate">
          ~/projects/<span style={{ color: c }}>{project.id}</span>
        </span>
        <span
          className="font-pixel text-[7px] px-1.5 py-0.5 rounded shrink-0"
          style={{ color: st.color, background: `${st.color}14`, border: `1px solid ${st.color}30` }}
        >
          {st.label}
        </span>
      </div>

      {/* ── Screenshot / Holographic preview ── */}
      <div
        className="relative w-full shrink-0 overflow-hidden"
        style={{
          height: "164px",
          borderBottom: `1px solid ${c}18`,
          background: "#040410",
        }}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover object-top"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          /* Star Wars holographic placeholder */
          <div className="absolute inset-0 flex flex-col items-center justify-center select-none">
            {/* Grid */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  `linear-gradient(${c}18 1px, transparent 1px),` +
                  `linear-gradient(90deg, ${c}18 1px, transparent 1px)`,
                backgroundSize: "24px 24px",
              }}
            />
            {/* Scanning line */}
            <div
              className="absolute left-0 right-0 h-px pointer-events-none"
              style={{
                background: `linear-gradient(90deg, transparent 0%, ${c}90 40%, ${c} 50%, ${c}90 60%, transparent 100%)`,
                animation:  "holo-scan 3s linear infinite",
              }}
            />
            {/* Corner brackets */}
            <div className="absolute top-3 left-3 w-5 h-5 border-t border-l opacity-40"   style={{ borderColor: c }} />
            <div className="absolute top-3 right-3 w-5 h-5 border-t border-r opacity-40"  style={{ borderColor: c }} />
            <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l opacity-40" style={{ borderColor: c }} />
            <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r opacity-40" style={{ borderColor: c }} />
            {/* Center */}
            <div className="flex flex-col items-center gap-2 relative z-10">
              <span className="font-pixel text-[10px] opacity-50" style={{ color: c }}>
                {project.id.toUpperCase()}
              </span>
            </div>
          </div>
        )}
        {/* Scanlines overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.07) 2px,rgba(0,0,0,0.07) 3px)",
          }}
        />
      </div>

      {/* ── Card body ── */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Project name + tagline */}
        <div>
          <p className="font-mono text-xs" style={{ color: c }}>
            $ {project.id}
          </p>
          <p className="text-sm text-[var(--muted)] leading-relaxed mt-1 line-clamp-2">
            {project.tagline}
          </p>
        </div>

        {/* Highlights (top 2 only) */}
        <ul className="flex flex-col gap-1">
          {project.highlights.slice(0, 2).map((h) => (
            <li key={h} className="flex items-start gap-1.5 text-xs text-[var(--muted)]">
              <span className="shrink-0 mt-0.5" style={{ color: c }}>›</span>
              <span className="line-clamp-1">{h}</span>
            </li>
          ))}
        </ul>

        {/* Stack chips */}
        <div className="flex flex-wrap gap-1">
          {project.stack.map((s) => (
            <span
              key={s}
              className="font-mono text-[9px] px-1.5 py-0.5 rounded border"
              style={{ color: `${c}cc`, background: `${c}0c`, borderColor: `${c}25` }}
            >
              {s}
            </span>
          ))}
        </div>

        {project.note && (
          <p className="font-mono text-[9px] text-[var(--muted)] opacity-50 italic">
            # {project.note}
          </p>
        )}

        <div className="flex-1" />

        {/* ── Footer ── */}
        <div className="flex gap-2 pt-3 border-t" style={{ borderColor: `${c}18` }}>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-mono text-[10px] px-3 py-1.5 rounded border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--muted)]/40 transition-colors flex-1"
          >
            <GithubIcon size={11} />
            $ github
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono text-[10px] px-3 py-1.5 rounded transition-colors flex-1 justify-center"
              style={{ background: `${c}18`, color: c, border: `1px solid ${c}30` }}
            >
              <ExternalLink size={11} />
              $ demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
