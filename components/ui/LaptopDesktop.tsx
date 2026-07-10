"use client";

import { useEffect, useState } from "react";
import { Folder, Terminal } from "lucide-react";
import type { Project } from "@/data/projects";

export default function LaptopDesktop({
  projects,
  onOpenProject,
  onOpenTerminal,
}: {
  projects: Project[];
  onOpenProject: (index: number) => void;
  onOpenTerminal: () => void;
}) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("es-SV", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0 flex flex-col">
      {/* Wallpaper */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 28% 18%, #1a1040 0%, #0a0526 45%, #030014 100%)",
        }}
      />
      <span className="absolute inset-0 flex items-center justify-center font-mono font-bold text-6xl sm:text-8xl opacity-[0.05] text-[#b49bff] select-none pointer-events-none">
        ›_
      </span>

      {/* Iconos del escritorio */}
      <div className="relative flex-1 min-h-0 p-2.5 sm:p-4 grid grid-cols-3 gap-1 sm:gap-2 content-start overflow-hidden">
        {projects.map((p, i) => (
          <button
            key={p.id}
            onClick={() => onOpenProject(i)}
            className="flex flex-col items-center gap-0.5 sm:gap-1 p-1 sm:p-2 rounded-md hover:bg-white/[0.06] active:bg-white/10 transition-colors cursor-pointer"
            title={p.title}
          >
            <Folder
              className="h-5 w-5 sm:h-8 sm:w-8"
              style={{ color: p.accentColor, fill: `${p.accentColor}2e` }}
            />
            <span className="font-mono text-[7px] sm:text-[9px] text-gray-300 truncate max-w-full">
              {p.id}
            </span>
          </button>
        ))}

        <button
          onClick={onOpenTerminal}
          className="flex flex-col items-center gap-0.5 sm:gap-1 p-1 sm:p-2 rounded-md hover:bg-white/[0.06] active:bg-white/10 transition-colors cursor-pointer"
          title="Terminal"
        >
          <Terminal className="h-5 w-5 sm:h-8 sm:w-8 text-[#b49bff]" />
          <span className="font-mono text-[7px] sm:text-[9px] text-gray-300">
            terminal
          </span>
        </button>
      </div>

      {/* Taskbar */}
      <div className="relative shrink-0 flex items-center justify-between px-2.5 h-5 sm:h-7 border-t border-white/10 bg-[#0b0b1e]/95">
        <span className="font-mono text-[8px] sm:text-[10px] font-bold text-[#b49bff]">
          ›_ oliver-os
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[7px] sm:text-[9px] text-gray-400 tabular-nums">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00ff9f] animate-pulse" />
          online · {time}
        </span>
      </div>
    </div>
  );
}
