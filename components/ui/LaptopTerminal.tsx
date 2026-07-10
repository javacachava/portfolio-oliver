"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";

interface Line {
  t: "in" | "out";
  s: string;
  color?: string;
}

const HASHES = ["a4f2c", "d8e9f", "c2b7e", "f1a4d", "e5c8b"];

const BANNER: Line[] = [
  { t: "out", s: "oliver-os v2.0 · bash", color: "#b49bff" },
  { t: "out", s: "comandos: ls · cd · cat · git · neofetch · help" },
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
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const print = (out: Line[]) => setLines((l) => [...l, ...out]);

  const active = projects[activeIndex];

  const findProject = (raw: string) => {
    const arg = raw.replace(/\/$/, "").toLowerCase();
    return projects.findIndex(
      (p) =>
        p.id.toLowerCase().includes(arg) || p.title.toLowerCase().includes(arg)
    );
  };

  const exec = (raw: string) => {
    const cmd = raw.trim();
    print([{ t: "in", s: cmd }]);
    if (!cmd) return;
    setCmdHistory((h) => [...h, cmd]);

    const [head, ...rest] = cmd.split(/\s+/);
    const arg = rest.join(" ").toLowerCase();

    switch (head.toLowerCase()) {
      case "help":
        print([
          { t: "out", s: "comandos disponibles:", color: accent },
          { t: "out", s: "  ls                    lista los proyectos" },
          { t: "out", s: "  cd <proyecto>         abre la ventana del proyecto" },
          { t: "out", s: "  cat README.md         descripción del proyecto actual" },
          { t: "out", s: "  git log --oneline     historial del proyecto actual" },
          { t: "out", s: "  git status            estado del proyecto actual" },
          { t: "out", s: "  git clone <proyecto>  clonar (spoiler: privado)" },
          { t: "out", s: "  open captures/        galería del proyecto actual" },
          { t: "out", s: "  neofetch              info del sistema" },
          { t: "out", s: "  whoami · pwd · history · clear · exit" },
          { t: "out", s: "" },
        ]);
        break;

      case "ls":
        if (arg.startsWith("captures")) {
          if (active.images?.length) {
            print([
              ...active.images.map((img, i) => ({
                t: "out" as const,
                s: `  captura-${i + 1}.png`,
              })),
              { t: "out", s: "" },
            ]);
          } else {
            print([
              { t: "out", s: `ls: no se puede acceder a 'captures/': el proyecto aún no tiene capturas` },
              { t: "out", s: "" },
            ]);
          }
        } else {
          print([
            ...projects.map((p, i) => ({
              t: "out" as const,
              s: `  ${p.id}/`,
              color: i === activeIndex ? p.accentColor : undefined,
            })),
            { t: "out", s: "" },
          ]);
        }
        break;

      case "cd": {
        if (!arg || arg === "~" || arg === "..") {
          print([{ t: "out", s: "→ volviendo al escritorio…" }]);
          setTimeout(onExit, 400);
          break;
        }
        const i = findProject(arg);
        if (i === -1) {
          print([
            { t: "out", s: `bash: cd: ${arg}: No existe el directorio` },
            { t: "out", s: "probá 'ls' para ver los proyectos" },
            { t: "out", s: "" },
          ]);
        } else {
          print([{ t: "out", s: `→ abriendo ${projects[i].id}…`, color: projects[i].accentColor }]);
          setTimeout(() => onOpenProject(i), 450);
        }
        break;
      }

      case "cat": {
        if (!arg || arg.includes("readme")) {
          print([
            { t: "out", s: `# ${active.title}`, color: active.accentColor },
            { t: "out", s: "" },
            { t: "out", s: active.description },
            { t: "out", s: "" },
            { t: "out", s: `> stack: ${active.stack.join(" · ")}` },
            { t: "out", s: "" },
          ]);
        } else {
          print([{ t: "out", s: `cat: ${arg}: No existe el archivo` }, { t: "out", s: "" }]);
        }
        break;
      }

      case "git": {
        const sub = rest[0]?.toLowerCase();
        if (sub === "log") {
          print([
            ...active.highlights.map((h, i) => ({
              t: "out" as const,
              s: `${HASHES[i % HASHES.length]} feat: ${h}`,
              color: i === 0 ? active.accentColor : undefined,
            })),
            { t: "out", s: "" },
          ]);
        } else if (sub === "status") {
          print([
            { t: "out", s: "On branch main" },
            { t: "out", s: `Your branch is up to date with 'origin/main'.` },
            { t: "out", s: "" },
            { t: "out", s: `  estado: ${active.status}`, color: active.accentColor },
            { t: "out", s: "" },
            { t: "out", s: "nothing to commit, working tree clean" },
            { t: "out", s: "" },
          ]);
        } else if (sub === "clone") {
          const target = rest.slice(1).join(" ").toLowerCase() || active.id;
          const i = findProject(target);
          print([
            { t: "out", s: `Cloning into '${i >= 0 ? projects[i].id : target}'...` },
            { t: "out", s: "fatal: repository is private", color: "#f87171" },
            { t: "out", s: "→ solicitá acceso: oliver.a.ascencio@gmail.com", color: accent },
            { t: "out", s: "" },
          ]);
        } else {
          print([
            { t: "out", s: `git: '${sub ?? ""}' is not a git command. Probá: log, status, clone` },
            { t: "out", s: "" },
          ]);
        }
        break;
      }

      case "open": {
        if (arg.startsWith("captures")) {
          const ok = onOpenGallery();
          print([
            ok
              ? { t: "out", s: "→ abriendo galería…", color: accent }
              : { t: "out", s: "open: captures/ está vacío — este proyecto aún no tiene capturas" },
            { t: "out", s: "" },
          ]);
        } else {
          print([{ t: "out", s: `open: no se puede abrir '${arg}'` }, { t: "out", s: "" }]);
        }
        break;
      }

      case "neofetch":
        print([
          { t: "out", s: "        ›_        oliver@wuju", color: accent },
          { t: "out", s: "       ────       ─────────────" },
          { t: "out", s: "                  OS: oliver-os v2.0" },
          { t: "out", s: "                  Host: Santa Ana, El Salvador" },
          { t: "out", s: "                  Uptime: 20 años" },
          { t: "out", s: "                  Shell: full-stack" },
          { t: "out", s: "                  Stack: TS · PHP · Python · Vue" },
          { t: "out", s: "                  Tests: 1,400+ en producción" },
          { t: "out", s: "                  Contact: oliver.a.ascencio@gmail.com" },
          { t: "out", s: "" },
        ]);
        break;

      case "whoami":
        print([{ t: "out", s: "oliver" }, { t: "out", s: "" }]);
        break;

      case "pwd":
        print([{ t: "out", s: `/home/oliver/projects/${active.id}` }, { t: "out", s: "" }]);
        break;

      case "history":
        print([
          ...cmdHistory.map((c, i) => ({
            t: "out" as const,
            s: `  ${String(i + 1).padStart(3)}  ${c}`,
          })),
          { t: "out", s: "" },
        ]);
        break;

      case "clear":
        setLines([]);
        break;

      case "exit":
        print([{ t: "out", s: "logout" }]);
        setTimeout(onExit, 350);
        break;

      case "sudo":
        if (arg.startsWith("hire")) {
          print([
            { t: "out", s: "[sudo] password for visitante: ********" },
            { t: "out", s: "[OK] Excelente decisión.", color: "#00ff9f" },
            { t: "out", s: "→ oliver.a.ascencio@gmail.com", color: accent },
            { t: "out", s: "" },
          ]);
        } else {
          print([
            { t: "out", s: "visitante is not in the sudoers file. This incident will be reported." },
            { t: "out", s: "(probá 'sudo hire oliver')" },
            { t: "out", s: "" },
          ]);
        }
        break;

      case "rm":
        print([
          { t: "out", s: "rm: ni lo intentes — este portfolio tiene backups", color: "#f87171" },
          { t: "out", s: "" },
        ]);
        break;

      default:
        print([
          { t: "out", s: `bash: ${head}: command not found` },
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
