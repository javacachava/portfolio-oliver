"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import TiltCard from "@/components/ui/TiltCard";
import type { Project } from "@/data/projects";

const STATUS: Record<Project["statusType"], { label: string; color: string }> = {
  live:       { label: "● LIVE",  color: "#00ff9f" },
  active:     { label: "◎ DEV",   color: "#06b6d4" },
  functional: { label: "◈ DEMO",  color: "#a78bfa" },
};

function HoloPreview({
  project,
  heightClass,
}: {
  project: Project;
  heightClass: string;
}) {
  const c = project.accentColor;
  return (
    <div
      className={`relative w-full shrink-0 overflow-hidden ${heightClass}`}
      style={{ background: "#030014" }}
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
        <div className="absolute inset-0 flex flex-col items-center justify-center select-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                `linear-gradient(${c}18 1px, transparent 1px),` +
                `linear-gradient(90deg, ${c}18 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />
          <div
            className="absolute left-0 right-0 h-px pointer-events-none"
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${c}90 40%, ${c} 50%, ${c}90 60%, transparent 100%)`,
              animation: "holo-scan 3s linear infinite",
            }}
          />
          <span
            className="font-mono text-xs tracking-wider opacity-50 relative z-10"
            style={{ color: c }}
          >
            {project.id.toUpperCase()}
          </span>
        </div>
      )}
      {/* Brackets de esquina */}
      <div className="absolute top-3 left-3 w-5 h-5 border-t border-l opacity-40" style={{ borderColor: c }} />
      <div className="absolute top-3 right-3 w-5 h-5 border-t border-r opacity-40" style={{ borderColor: c }} />
      <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l opacity-40" style={{ borderColor: c }} />
      <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r opacity-40" style={{ borderColor: c }} />
      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.07) 2px,rgba(0,0,0,0.07) 3px)",
        }}
      />
    </div>
  );
}

function MissionHeader({
  project,
  mission,
}: {
  project: Project;
  mission: string;
}) {
  const c = project.accentColor;
  const st = STATUS[project.statusType];
  return (
    <div
      className="flex items-center justify-between gap-2 px-4 py-2.5 shrink-0"
      style={{ borderBottom: `1px solid ${c}18`, background: `${c}07` }}
    >
      <span className="font-mono text-[10px] tracking-widest text-[var(--muted)] truncate">
        MISSION {mission} ·{" "}
        <span style={{ color: c }}>{project.id.toUpperCase()}</span>
      </span>
      <span
        className="font-mono text-[10px] font-semibold tracking-wider px-1.5 py-0.5 rounded shrink-0"
        style={{ color: st.color, background: `${st.color}14`, border: `1px solid ${st.color}30` }}
      >
        {st.label}
      </span>
    </div>
  );
}

function CardFooter({ project }: { project: Project }) {
  const c = project.accentColor;
  return (
    <div className="flex gap-2 pt-3 border-t" style={{ borderColor: `${c}18` }}>
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-1.5 font-mono text-[11px] px-3 py-2 rounded-lg border border-[var(--border)] text-[var(--muted)] hover:text-white hover:border-[#7042f8]/60 transition-colors flex-1"
      >
        <GithubIcon size={12} />
        GitHub
      </a>
      {project.demo && (
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 font-mono text-[11px] px-3 py-2 rounded-lg transition-all hover:-translate-y-px flex-1"
          style={{ background: `${c}18`, color: c, border: `1px solid ${c}30` }}
        >
          <ExternalLink size={12} />
          Ver demo
        </a>
      )}
    </div>
  );
}

function StackChips({ project, max }: { project: Project; max?: number }) {
  const c = project.accentColor;
  const stack = max ? project.stack.slice(0, max) : project.stack;
  const rest = max ? project.stack.length - max : 0;
  return (
    <div className="flex flex-wrap gap-1">
      {stack.map((s) => (
        <span
          key={s}
          className="font-mono text-[9px] px-1.5 py-0.5 rounded border"
          style={{ color: `${c}cc`, background: `${c}0c`, borderColor: `${c}25` }}
        >
          {s}
        </span>
      ))}
      {rest > 0 && (
        <span className="font-mono text-[9px] px-1.5 py-0.5 text-[var(--muted)]">
          +{rest}
        </span>
      )}
    </div>
  );
}

export default function ProjectCard({
  project,
  index,
  featured = false,
}: {
  project: Project;
  index: number;
  featured?: boolean;
}) {
  const c = project.accentColor;
  const mission = String(index + 1).padStart(2, "0");

  if (featured) {
    return (
      <TiltCard glowColor={c} className="h-full">
        <div
          className="flex flex-col h-full rounded-xl overflow-hidden border bg-[var(--card)]"
          style={{ borderColor: `${c}30` }}
        >
          <MissionHeader project={project} mission={mission} />
          <div className="flex flex-col md:flex-row flex-1 min-h-0">
            <div className="md:w-[42%] shrink-0 flex">
              <HoloPreview project={project} heightClass="h-[180px] md:h-auto md:min-h-full flex-1" />
            </div>
            <div className="flex flex-col flex-1 p-5 gap-3">
              <div>
                <h3 className="text-lg font-bold text-[var(--foreground)]">
                  {project.title}
                </h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed mt-1">
                  {project.tagline}
                </p>
              </div>
              <ul className="flex flex-col gap-1.5">
                {project.highlights.slice(0, 3).map((h) => (
                  <li key={h} className="flex items-start gap-1.5 text-xs text-[var(--muted)]">
                    <span className="shrink-0 mt-0.5" style={{ color: c }}>›</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
              <StackChips project={project} />
              {project.note && (
                <p className="font-mono text-[9px] text-[var(--muted)] opacity-50 italic">
                  # {project.note}
                </p>
              )}
              <div className="flex-1" />
              <CardFooter project={project} />
            </div>
          </div>
        </div>
      </TiltCard>
    );
  }

  return (
    <TiltCard glowColor={c} className="h-full flex">
      <div
        className="flex flex-col h-full w-full rounded-xl overflow-hidden border bg-[var(--card)]"
        style={{ borderColor: "var(--border)" }}
      >
        <MissionHeader project={project} mission={mission} />
        <HoloPreview project={project} heightClass="h-[120px]" />
        <div className="flex flex-col flex-1 p-4 gap-3">
          <div>
            <h3 className="text-sm font-bold text-[var(--foreground)]">
              {project.title}
            </h3>
            <p className="text-xs text-[var(--muted)] leading-relaxed mt-1 line-clamp-2">
              {project.tagline}
            </p>
          </div>
          <StackChips project={project} max={4} />
          <div className="flex-1" />
          <CardFooter project={project} />
        </div>
      </div>
    </TiltCard>
  );
}
