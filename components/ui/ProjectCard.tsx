"use client";

import { useState } from "react";
import { ExternalLink, Images } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import ProjectGallery from "@/components/ui/ProjectGallery";
import type { Project } from "@/data/projects";

const STATUS: Record<Project["statusType"], { label: string; color: string }> = {
  live:       { label: "● LIVE",  color: "#00ff9f" },
  active:     { label: "◎ DEV",   color: "#06b6d4" },
  functional: { label: "◈ DEMO",  color: "#a78bfa" },
};

export default function ProjectRow({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const c = project.accentColor;
  const st = STATUS[project.statusType];
  const num = String(index + 1).padStart(2, "0");
  const hasImages = (project.images?.length ?? 0) > 0;

  return (
    <div className="group relative border-b border-[var(--border)]">
      {/* Lavado de acento al hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: `linear-gradient(90deg, ${c}0a 0%, transparent 55%)` }}
      />
      {/* Regla lateral de acento */}
      <span
        className="absolute left-0 top-0 bottom-0 w-[2px] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"
        style={{ background: c }}
      />

      <div className="relative grid md:grid-cols-[110px_1fr_auto] gap-x-8 gap-y-4 py-9 px-4 sm:px-6 items-start">
        {/* Número de misión */}
        <span
          className="font-mono text-5xl md:text-6xl font-bold leading-none tabular-nums select-none text-[var(--border)] group-hover:text-[var(--pc)] transition-colors duration-300"
          style={{ "--pc": c } as React.CSSProperties}
        >
          {num}
        </span>

        {/* Contenido */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-xl font-bold text-[var(--foreground)]">
              {project.title}
            </h3>
            <span
              className="font-mono text-[10px] font-semibold tracking-wider px-1.5 py-0.5 rounded"
              style={{ color: st.color, background: `${st.color}14`, border: `1px solid ${st.color}30` }}
            >
              {st.label}
            </span>
          </div>

          <p className="text-sm text-[var(--muted)] leading-relaxed mt-1.5 max-w-2xl">
            {project.tagline}
          </p>

          <ul className="flex flex-col gap-1 mt-3">
            {project.highlights.slice(0, 3).map((h) => (
              <li key={h} className="flex items-start gap-1.5 text-xs text-[var(--muted)]">
                <span className="shrink-0 mt-0.5" style={{ color: c }}>›</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-1 mt-4">
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
            <p className="font-mono text-[9px] text-[var(--muted)] opacity-50 italic mt-3">
              # {project.note}
            </p>
          )}
        </div>

        {/* Acciones */}
        <div className="flex md:flex-col gap-2 shrink-0 md:pt-1">
          {hasImages && (
            <button
              onClick={() => setGalleryOpen(true)}
              className="flex items-center justify-center gap-1.5 font-mono text-[11px] px-4 py-2 rounded-lg transition-all hover:-translate-y-px cursor-pointer"
              style={{ background: `${c}18`, color: c, border: `1px solid ${c}30` }}
            >
              <Images size={12} />
              Ver capturas
            </button>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 font-mono text-[11px] px-4 py-2 rounded-lg transition-all hover:-translate-y-px"
              style={
                hasImages
                  ? { border: "1px solid var(--border)", color: "var(--muted)" }
                  : { background: `${c}18`, color: c, border: `1px solid ${c}30` }
              }
            >
              <ExternalLink size={12} />
              Ver demo
            </a>
          )}
        </div>
      </div>

      <AnimatePresence>
        {galleryOpen && project.images && (
          <ProjectGallery
            images={project.images}
            title={project.title}
            color={c}
            onClose={() => setGalleryOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
