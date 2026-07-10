"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Images } from "lucide-react";
import ProjectGallery from "@/components/ui/ProjectGallery";
import type { Project } from "@/data/projects";

const STATUS: Record<Project["statusType"], { label: string; color: string }> = {
  live:       { label: "● LIVE",  color: "#00ff9f" },
  active:     { label: "◎ DEV",   color: "#06b6d4" },
  functional: { label: "◈ DEMO",  color: "#a78bfa" },
};

function ScreenContent({
  project,
  num,
  onOpenGallery,
}: {
  project: Project;
  num: string;
  onOpenGallery: () => void;
}) {
  const c = project.accentColor;
  const st = STATUS[project.statusType];
  const cover = project.images?.[0];

  return (
    <div className="absolute inset-0 flex flex-col">
      {/* Barra de ventana */}
      <div
        className="flex items-center justify-between gap-2 px-3 py-1.5 shrink-0"
        style={{ borderBottom: `1px solid ${c}20`, background: `${c}08` }}
      >
        <span className="font-mono text-[8px] sm:text-[10px] tracking-widest text-[var(--muted)] truncate">
          MISSION {num} · <span style={{ color: c }}>{project.id.toUpperCase()}</span>
        </span>
        <span
          className="font-mono text-[8px] sm:text-[10px] font-semibold tracking-wider px-1.5 py-0.5 rounded shrink-0"
          style={{ color: st.color, background: `${st.color}14`, border: `1px solid ${st.color}30` }}
        >
          {st.label}
        </span>
      </div>

      {cover ? (
        /* Captura real de fondo + overlay */
        <button
          onClick={onOpenGallery}
          className="relative flex-1 min-h-0 cursor-pointer group/screen text-left"
          aria-label={`Ver galería de ${project.title}`}
        >
          <Image
            src={cover}
            alt={project.title}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 768px"
          />
          <div
            className="absolute inset-x-0 bottom-0 p-3 sm:p-4 flex items-end justify-between gap-3"
            style={{ background: "linear-gradient(transparent, rgba(3,0,20,0.92))" }}
          >
            <div className="min-w-0">
              <h3 className="text-sm sm:text-lg font-bold text-white truncate">{project.title}</h3>
              <p className="text-[10px] sm:text-xs text-gray-300 line-clamp-1">{project.tagline}</p>
            </div>
            <span
              className="flex items-center gap-1.5 font-mono text-[9px] sm:text-[11px] px-2.5 sm:px-3 py-1.5 rounded-lg shrink-0 group-hover/screen:-translate-y-px transition-transform"
              style={{ background: `${c}22`, color: c, border: `1px solid ${c}40` }}
            >
              <Images size={11} />
              Galería ({project.images!.length})
            </span>
          </div>
        </button>
      ) : (
        /* Mini-UI del proyecto */
        <div className="flex-1 min-h-0 p-3 sm:p-7 flex flex-col gap-1.5 sm:gap-3 overflow-hidden">
          <h3 className="text-base sm:text-3xl font-bold text-[var(--foreground)] leading-tight shrink-0">
            {project.title}
          </h3>
          <p className="text-[10px] sm:text-base text-[var(--muted)] leading-snug line-clamp-2 shrink-0">
            {project.tagline}
          </p>
          <p className="hidden sm:[display:-webkit-box] text-sm text-[var(--muted)] opacity-70 leading-relaxed line-clamp-3">
            {project.description}
          </p>
          <ul className="flex flex-col gap-1 mt-0.5">
            {project.highlights.slice(0, 3).map((h) => (
              <li
                key={h}
                className="flex items-start gap-1.5 text-[9px] sm:text-sm text-[var(--muted)] leading-snug"
              >
                <span className="shrink-0" style={{ color: c }}>›</span>
                <span className="line-clamp-1">{h}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-1 mt-0.5">
            {project.stack.slice(0, 6).map((s) => (
              <span
                key={s}
                className="font-mono text-[8px] sm:text-[10px] px-1.5 py-0.5 rounded border"
                style={{ color: `${c}cc`, background: `${c}0c`, borderColor: `${c}25` }}
              >
                {s}
              </span>
            ))}
            {project.stack.length > 6 && (
              <span className="font-mono text-[8px] sm:text-[9px] px-1 py-0.5 text-[var(--muted)]">
                +{project.stack.length - 6}
              </span>
            )}
          </div>

          <div className="flex-1" />

          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-[9px] sm:text-[10px] text-[var(--muted)] truncate">
              <span style={{ color: c }}>$</span> {project.id} --status
              <span className="cursor-blink ml-1" style={{ color: c }} />
            </span>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-mono text-[9px] sm:text-[11px] px-2.5 py-1 rounded-lg shrink-0 hover:-translate-y-px transition-transform"
                style={{ background: `${c}18`, color: c, border: `1px solid ${c}30` }}
              >
                <ExternalLink size={11} />
                Ver demo
              </a>
            )}
          </div>
        </div>
      )}

      {/* Scanlines del display */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.05) 2px,rgba(0,0,0,0.05) 3px)",
        }}
      />
    </div>
  );
}

export default function ProjectLaptop({ projects }: { projects: Project[] }) {
  const [idx, setIdx] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);

  const project = projects[idx];
  const c = project.accentColor;
  const num = String(idx + 1).padStart(2, "0");

  const prev = useCallback(
    () => setIdx((i) => (i - 1 + projects.length) % projects.length),
    [projects.length]
  );
  const next = useCallback(
    () => setIdx((i) => (i + 1) % projects.length),
    [projects.length]
  );

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Flechas laterales (desktop) */}
      <button
        aria-label="Proyecto anterior"
        onClick={prev}
        className="hidden md:flex absolute -left-16 top-1/2 -translate-y-1/2 h-11 w-11 rounded-xl items-center justify-center border bg-[#0b0322]/70 text-gray-300 hover:text-white transition-colors cursor-pointer z-10"
        style={{ borderColor: `${c}40` }}
      >
        <ChevronLeft size={20} />
      </button>
      <button
        aria-label="Proyecto siguiente"
        onClick={next}
        className="hidden md:flex absolute -right-16 top-1/2 -translate-y-1/2 h-11 w-11 rounded-xl items-center justify-center border bg-[#0b0322]/70 text-gray-300 hover:text-white transition-colors cursor-pointer z-10"
        style={{ borderColor: `${c}40` }}
      >
        <ChevronRight size={20} />
      </button>

      {/* ── Laptop ── */}
      <div className="select-none" style={{ perspective: "1800px" }}>
        {/* Pantalla — se abre al entrar en viewport */}
        <motion.div
          initial={{ rotateX: -68, opacity: 0.6 }}
          whileInView={{ rotateX: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ type: "spring", stiffness: 50, damping: 13, delay: 0.25 }}
          style={{ transformOrigin: "bottom center", transformStyle: "preserve-3d" }}
        >
          <div
            className="relative rounded-t-2xl p-2 sm:p-3 pt-3.5 sm:pt-5 pb-4 sm:pb-6 border transition-shadow duration-500"
            style={{
              borderColor: `${c}40`,
              background: "linear-gradient(180deg, #17172e 0%, #101024 55%, #0c0c1c 100%)",
              boxShadow: `0 0 70px ${c}1c, inset 0 1px 0 rgba(255,255,255,0.06), inset 0 0 24px rgba(0,0,0,0.55)`,
            }}
          >
            {/* Cámara */}
            <div
              className="absolute top-1.5 sm:top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
              style={{ background: `${c}70`, boxShadow: `0 0 6px ${c}90, inset 0 0 2px #000` }}
            />
            {/* Display */}
            <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-[#030014] border border-black/60 shadow-[inset_0_0_12px_rgba(0,0,0,0.8)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: 34 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -34 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="absolute inset-0"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.15}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -60) next();
                    else if (info.offset.x > 60) prev();
                  }}
                >
                  <ScreenContent
                    project={project}
                    num={num}
                    onOpenGallery={() => setGalleryOpen(true)}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Glare estático de esquina */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(115deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.015) 28%, transparent 45%)",
                }}
              />
              {/* Reflejo que barre la pantalla */}
              <motion.div
                className="absolute inset-y-0 w-1/3 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(105deg, transparent, rgba(255,255,255,0.07), transparent)",
                }}
                animate={{ x: ["-160%", "420%"] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
              />
            </div>

            {/* Logo en el bezel inferior */}
            <span
              className="absolute bottom-1 sm:bottom-1.5 left-1/2 -translate-x-1/2 font-mono text-[8px] sm:text-[10px] font-bold tracking-widest"
              style={{ color: `${c}55` }}
            >
              ›_
            </span>
          </div>
        </motion.div>

        {/* Bisagra */}
        <div className="relative mx-[2%] h-[5px] sm:h-[7px] flex items-center justify-between rounded-sm bg-gradient-to-b from-[#050510] to-[#12122a] border-x border-black/50">
          <div className="h-full w-10 sm:w-14 rounded-sm bg-[#1b1b34] border-x border-black/60" />
          <div className="h-full w-10 sm:w-14 rounded-sm bg-[#1b1b34] border-x border-black/60" />
        </div>

        {/* Deck: teclado + trackpad en perspectiva */}
        <div style={{ perspective: "900px" }}>
          <div
            className="relative mx-[-5%] rounded-b-[20px] border px-[6%] pt-2 sm:pt-3 pb-1.5 sm:pb-2"
            style={{
              transform: "rotateX(48deg)",
              transformOrigin: "top center",
              borderColor: `${c}30`,
              background: "linear-gradient(180deg, #191932 0%, #12122a 60%, #0a0a1a 100%)",
              boxShadow: `inset 0 1px 0 rgba(255,255,255,0.07), 0 18px 40px rgba(0,0,0,0.55), 0 6px 30px ${c}14`,
            }}
          >
            {/* Teclado retroiluminado */}
            <div
              className="grid grid-cols-[repeat(14,1fr)] gap-[3px] sm:gap-1 rounded-md p-1 sm:p-1.5"
              style={{ background: "rgba(0,0,0,0.35)", boxShadow: `0 0 18px ${c}22` }}
            >
              {Array.from({ length: 56 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-[7px] sm:h-[11px] rounded-[2px] ${
                    i === 42 ? "col-span-1" : ""
                  } ${i === 49 ? "col-span-4" : ""}`}
                  style={{
                    background: "linear-gradient(180deg, #23233f 0%, #17172e 100%)",
                    boxShadow: `inset 0 -1px 0 rgba(0,0,0,0.6), 0 0 4px ${c}18`,
                    border: `1px solid ${c}10`,
                  }}
                />
              ))}
            </div>

            {/* Trackpad */}
            <div
              className="mx-auto mt-1.5 sm:mt-2 h-6 sm:h-9 w-[34%] rounded-md"
              style={{
                background: "linear-gradient(180deg, #15152c 0%, #101022 100%)",
                border: "1px solid rgba(255,255,255,0.05)",
                boxShadow: "inset 0 1px 3px rgba(0,0,0,0.6)",
              }}
            />

            {/* LED de encendido */}
            <div
              className="absolute right-[7%] bottom-2 sm:bottom-3 w-1 h-1 rounded-full animate-pulse"
              style={{ background: c, boxShadow: `0 0 6px ${c}` }}
            />
          </div>
        </div>

        {/* Luz ambiental sobre el escritorio */}
        <div
          className="mx-auto -mt-2 h-5 w-[85%] rounded-full opacity-70"
          style={{
            background: `radial-gradient(ellipse at center, ${c}2e 0%, ${c}10 45%, transparent 75%)`,
            filter: "blur(10px)",
          }}
        />
      </div>

      {/* Controles inferiores */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <button
          aria-label="Proyecto anterior"
          onClick={prev}
          className="md:hidden h-9 w-9 rounded-lg flex items-center justify-center border bg-[#0b0322]/70 text-gray-300 cursor-pointer"
          style={{ borderColor: `${c}40` }}
        >
          <ChevronLeft size={16} />
        </button>

        <div className="flex items-center gap-1.5">
          {projects.map((p, i) => (
            <button
              key={p.id}
              aria-label={p.title}
              onClick={() => setIdx(i)}
              className="h-1.5 rounded-full transition-all cursor-pointer"
              style={{
                width: i === idx ? 22 : 7,
                background: i === idx ? p.accentColor : "var(--border)",
              }}
            />
          ))}
        </div>

        <span className="font-mono text-[10px] text-[var(--muted)] tabular-nums">
          {num}/{String(projects.length).padStart(2, "0")}
        </span>

        <button
          aria-label="Proyecto siguiente"
          onClick={next}
          className="md:hidden h-9 w-9 rounded-lg flex items-center justify-center border bg-[#0b0322]/70 text-gray-300 cursor-pointer"
          style={{ borderColor: `${c}40` }}
        >
          <ChevronRight size={16} />
        </button>
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
