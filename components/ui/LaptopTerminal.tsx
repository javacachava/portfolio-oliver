"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";

interface Line {
  t: "in" | "out";
  s: string;
  color?: string;
}

const BANNER: Line[] = [
  { t: "out", s: "›_ oliver-os v1.0 — terminal de proyectos", color: "#b49bff" },
  { t: "out", s: "escribí 'help' para ver los comandos" },
  { t: "out", s: "" },
];

export default function LaptopTerminal({
  projects,
  activeIndex,
  accent,
  onOpenProject,
  onOpenGallery,
  onExit,
  onKeystroke,
}: {
  projects: Project[];
  activeIndex: number;
  accent: string;
  onOpenProject: (index: number) => void;
  onOpenGallery: () => boolean;
  onExit: () => void;
  onKeystroke: (key: string) => void;
}) {
  const [lines, setLines] = useState<Line[]>(BANNER);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const print = (out: Line[]) => setLines((l) => [...l, ...out]);

  const findProject = (arg: string) =>
    projects.findIndex(
      (p) =>
        p.id.toLowerCase().includes(arg) ||
        p.title.toLowerCase().includes(arg)
    );

  const exec = (raw: string) => {
    const cmd = raw.trim();
    print([{ t: "in", s: cmd }]);
    if (!cmd) return;

    const [head, ...rest] = cmd.toLowerCase().split(/\s+/);
    const arg = rest.join(" ");

    switch (head) {
      case "help":
        print([
          { t: "out", s: "comandos disponibles:", color: accent },
          { t: "out", s: "  ls              lista los proyectos" },
          { t: "out", s: "  open <nombre>   abre un proyecto" },
          { t: "out", s: "  stack [nombre]  tecnologías del proyecto" },
          { t: "out", s: "  gallery         capturas del proyecto actual" },
          { t: "out", s: "  whoami          sobre el dueño de esta máquina" },
          { t: "out", s: "  contact         cómo contactarme" },
          { t: "out", s: "  formacion       mapa de formación" },
          { t: "out", s: "  clear           limpia la pantalla" },
          { t: "out", s: "  exit            volver a la ficha" },
          { t: "out", s: "" },
        ]);
        break;

      case "ls":
      case "projects":
        print([
          ...projects.map((p, i) => ({
            t: "out" as const,
            s: `  ${p.id}/${" ".repeat(Math.max(1, 20 - p.id.length))}${p.statusType === "live" ? "● LIVE" : p.statusType === "active" ? "◎ DEV" : "◈ DEMO"}${i === activeIndex ? "   ← actual" : ""}`,
            color: i === activeIndex ? accent : undefined,
          })),
          { t: "out", s: "" },
        ]);
        break;

      case "open": {
        if (!arg) {
          print([{ t: "out", s: "uso: open <nombre> — probá 'ls' primero" }, { t: "out", s: "" }]);
          break;
        }
        const i = findProject(arg);
        if (i === -1) {
          print([{ t: "out", s: `no encontré '${arg}' — probá 'ls'` }, { t: "out", s: "" }]);
        } else {
          print([{ t: "out", s: `→ abriendo ${projects[i].id}…`, color: projects[i].accentColor }]);
          setTimeout(() => onOpenProject(i), 450);
        }
        break;
      }

      case "stack": {
        const i = arg ? findProject(arg) : activeIndex;
        if (i === -1) {
          print([{ t: "out", s: `no encontré '${arg}'` }, { t: "out", s: "" }]);
        } else {
          print([
            { t: "out", s: `${projects[i].id}:`, color: projects[i].accentColor },
            { t: "out", s: `  ${projects[i].stack.join(" · ")}` },
            { t: "out", s: "" },
          ]);
        }
        break;
      }

      case "gallery": {
        const ok = onOpenGallery();
        print([
          ok
            ? { t: "out", s: "→ abriendo galería…", color: accent }
            : { t: "out", s: "este proyecto aún no tiene capturas cargadas" },
          { t: "out", s: "" },
        ]);
        break;
      }

      case "whoami":
        print([
          { t: "out", s: "Oliver Alexander Ascencio Pleitez", color: accent },
          { t: "out", s: "  full-stack · Santa Ana, El Salvador" },
          { t: "out", s: "  backend TS/Node · cloud AWS/GCP · tiempo real" },
          { t: "out", s: "  1,400+ tests en producción · cliente real" },
          { t: "out", s: "" },
        ]);
        break;

      case "contact":
        print([
          { t: "out", s: "  email:    oliver.a.ascencio@gmail.com" },
          { t: "out", s: "  github:   github.com/javacachava" },
          { t: "out", s: "  linkedin: in/oliver-ascencio" },
          { t: "out", s: "" },
        ]);
        break;

      case "formacion":
      case "formación":
        print([{ t: "out", s: "→ navegando a /formacion…", color: accent }]);
        setTimeout(() => { window.location.href = "/formacion"; }, 500);
        break;

      case "clear":
        setLines([]);
        break;

      case "exit":
      case "q":
        print([{ t: "out", s: "→ cerrando terminal…" }]);
        setTimeout(onExit, 350);
        break;

      case "sudo":
        if (arg.startsWith("hire")) {
          print([
            { t: "out", s: "[sudo] verificando privilegios… OK", color: "#00ff9f" },
            { t: "out", s: "[OK] Excelente decisión.", color: "#00ff9f" },
            { t: "out", s: "→ oliver.a.ascencio@gmail.com", color: accent },
            { t: "out", s: "" },
          ]);
        } else {
          print([{ t: "out", s: "sudo: permiso denegado (probá 'sudo hire oliver')" }, { t: "out", s: "" }]);
        }
        break;

      case "rm":
        print([{ t: "out", s: "rm: ni lo intentes — este portfolio tiene backups", color: "#f87171" }, { t: "out", s: "" }]);
        break;

      case "whoareyou":
      case "wuju":
        print([
          { t: "out", s: "Wuju — asociación de desarrolladores · Santa Ana, SV", color: accent },
          { t: "out", s: "  wuju.dev · contacto@wuju.dev" },
          { t: "out", s: "" },
        ]);
        break;

      default:
        print([
          { t: "out", s: `comando no encontrado: ${head}` },
          { t: "out", s: "probá 'help'" },
          { t: "out", s: "" },
        ]);
    }
  };

  return (
    <div
      className="absolute inset-0 flex flex-col font-mono cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      <div
        ref={scrollRef}
        className="flex-1 min-h-0 overflow-y-auto px-3 py-2 space-y-px [scrollbar-width:thin]"
      >
        {lines.map((l, i) => (
          <p
            key={i}
            className="text-[9px] sm:text-[11px] leading-relaxed whitespace-pre-wrap break-words"
            style={{ color: l.color ?? (l.t === "in" ? "#e5e7eb" : "var(--muted)") }}
          >
            {l.t === "in" ? (
              <>
                <span style={{ color: accent }}>oliver@wuju:~$</span> {l.s}
              </>
            ) : (
              l.s
            )}
          </p>
        ))}

        {/* Línea de entrada */}
        <div className="flex items-center gap-1.5 text-[9px] sm:text-[11px]">
          <span style={{ color: accent }}>oliver@wuju:~$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              onKeystroke(e.key);
              if (e.key === "Enter") {
                exec(input);
                setInput("");
              }
            }}
            autoFocus
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-label="Terminal"
            className="flex-1 bg-transparent outline-none border-none text-gray-100 min-w-0"
            style={{ caretColor: accent }}
          />
        </div>
      </div>
    </div>
  );
}
