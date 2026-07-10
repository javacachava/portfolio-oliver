"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formacion, type FormacionItem } from "@/data/formacion";

const VIEW_W = 1200;
const VIEW_H = 640;

// Centro de cada constelación (coordenadas viewBox)
const CLUSTER_CENTERS: Record<string, { cx: number; cy: number }> = {
  academica:       { cx: 175, cy: 150 },
  gubernamentales: { cx: 450, cy: 115 },
  bootcamps:       { cx: 720, cy: 160 },
  cloud:           { cx: 990, cy: 190 },
  programacion:    { cx: 210, cy: 430 },
  blockchain:      { cx: 460, cy: 500 },
  complementaria:  { cx: 715, cy: 460 },
  reconocimientos: { cx: 975, cy: 490 },
};

// Offsets deterministas por cantidad de ítems (forma de la constelación)
const OFFSETS: Record<number, Array<[number, number]>> = {
  1: [[0, 0]],
  2: [[-48, -18], [48, 24]],
  3: [[-62, 28], [4, -46], [66, 32]],
  6: [[-100, -8], [-48, -58], [14, -28], [72, -62], [96, 14], [2, 48]],
};

interface StarNode {
  catId: string;
  catLabel: string;
  color: string;
  item: FormacionItem;
  x: number;
  y: number;
  r: number;
}

function buildStars(): StarNode[] {
  const stars: StarNode[] = [];
  for (const cat of formacion) {
    const center = CLUSTER_CENTERS[cat.id];
    const offsets = OFFSETS[cat.items.length] ?? OFFSETS[3];
    cat.items.forEach((item, i) => {
      const [ox, oy] = offsets[i % offsets.length];
      stars.push({
        catId: cat.id,
        catLabel: cat.label,
        color: cat.color,
        item,
        x: center.cx + ox,
        y: center.cy + oy,
        // radio ∝ horas documentadas (70h = máx)
        r: 4 + Math.min(item.hours ?? 8, 70) / 70 * 5,
      });
    });
  }
  return stars;
}

export default function Constellation() {
  const stars = useMemo(buildStars, []);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const [mouse, setMouse] = useState({ x: -9999, y: -9999, inside: false });
  const [hovered, setHovered] = useState<StarNode | null>(null);
  const [pinned, setPinned] = useState<StarNode | null>(null);
  const [filter, setFilter] = useState<string | null>(null);

  const active = pinned ?? hovered;
  const activeCat = filter ?? active?.catId ?? null;

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (rafRef.current !== null) return;
    const { clientX, clientY } = e;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setMouse({
        x: ((clientX - rect.left) / rect.width) * VIEW_W,
        y: ((clientY - rect.top) / rect.height) * VIEW_H,
        inside: true,
      });
    });
  }, []);

  const onMouseLeave = useCallback(() => {
    setMouse({ x: -9999, y: -9999, inside: false });
    setHovered(null);
  }, []);

  // Parallax sutil del campo entero hacia el cursor
  const px = mouse.inside ? (mouse.x / VIEW_W - 0.5) * 16 : 0;
  const py = mouse.inside ? (mouse.y / VIEW_H - 0.5) * 12 : 0;

  // Líneas de constelación: conecta ítems consecutivos de cada categoría
  const lines = useMemo(() => {
    const segs: Array<{ catId: string; color: string; x1: number; y1: number; x2: number; y2: number }> = [];
    for (const cat of formacion) {
      const catStars = stars.filter((s) => s.catId === cat.id);
      for (let i = 0; i < catStars.length - 1; i++) {
        segs.push({
          catId: cat.id,
          color: cat.color,
          x1: catStars[i].x,
          y1: catStars[i].y,
          x2: catStars[i + 1].x,
          y2: catStars[i + 1].y,
        });
      }
    }
    return segs;
  }, [stars]);

  const dimmed = (catId: string) =>
    (filter !== null && filter !== catId) ||
    (filter === null && active !== null && active.catId !== catId);

  // Posición de la card flotante (en % del contenedor)
  const cardPos = active
    ? {
        left: `${(active.x / VIEW_W) * 100}%`,
        top: `${(active.y / VIEW_H) * 100}%`,
        below: active.y < 180,
        nearRight: active.x > VIEW_W - 220,
        nearLeft: active.x < 220,
      }
    : null;

  return (
    <div className="w-full">
      {/* Filtros por categoría */}
      <div className="flex flex-wrap gap-2 justify-center mb-6 px-4">
        <button
          onClick={() => { setFilter(null); setPinned(null); }}
          className={`font-mono text-[11px] px-3 py-1.5 rounded-full border transition-colors cursor-pointer ${
            filter === null
              ? "border-[#7042f8] bg-[#7042f8]/20 text-white"
              : "border-[#7042f8]/30 bg-[#0b0322]/60 text-gray-400 hover:text-white"
          }`}
        >
          Todas
        </button>
        {formacion.map((cat) => (
          <button
            key={cat.id}
            onClick={() => { setFilter(filter === cat.id ? null : cat.id); setPinned(null); }}
            className={`font-mono text-[11px] px-3 py-1.5 rounded-full border transition-colors cursor-pointer ${
              filter === cat.id
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }`}
            style={{
              borderColor: filter === cat.id ? cat.color : `${cat.color}40`,
              background: filter === cat.id ? `${cat.color}25` : "rgba(11,3,34,0.6)",
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Campo de constelaciones */}
      <div
        ref={containerRef}
        className="relative w-full select-none"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="w-full h-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setPinned(null);
          }}
        >
          <g
            style={{
              transform: `translate(${px}px, ${py}px)`,
              transition: "transform 0.5s cubic-bezier(0.25, 0, 0, 1)",
            }}
          >
            {/* Líneas de constelación */}
            {lines.map((l, i) => {
              const visible = activeCat === l.catId;
              return (
                <motion.line
                  key={i}
                  x1={l.x1}
                  y1={l.y1}
                  x2={l.x2}
                  y2={l.y2}
                  stroke={l.color}
                  strokeWidth={1}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={
                    visible
                      ? { pathLength: 1, opacity: 0.65 }
                      : { pathLength: 0, opacity: 0 }
                  }
                  transition={{ duration: 0.45, ease: "easeOut" }}
                />
              );
            })}

            {/* Etiquetas de categoría */}
            {formacion.map((cat) => {
              const c = CLUSTER_CENTERS[cat.id];
              return (
                <text
                  key={cat.id}
                  x={c.cx}
                  y={c.cy + 92}
                  textAnchor="middle"
                  className="font-mono uppercase"
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.15em",
                    fill: dimmed(cat.id) ? "#4a4468" : "#9a91c5",
                    transition: "fill 0.3s",
                  }}
                >
                  {cat.label}
                </text>
              );
            })}

            {/* Estrellas */}
            {stars.map((s, i) => {
              const dist = Math.hypot(mouse.x - s.x, mouse.y - s.y);
              const glow = Math.max(0, 1 - dist / 200);
              const isActive = active?.item.name === s.item.name;
              const isDim = dimmed(s.catId);
              const scale = isActive ? 1.9 : 1 + glow * 0.6;
              const opacity = isDim ? 0.18 : 0.7 + glow * 0.3;
              return (
                <g
                  key={i}
                  role="button"
                  tabIndex={0}
                  aria-label={`${s.item.name} — ${s.item.institution}`}
                  className="cursor-pointer focus:outline-none"
                  onMouseEnter={() => setHovered(s)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(s)}
                  onBlur={() => setHovered(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setPinned(pinned?.item.name === s.item.name ? null : s);
                  }}
                  style={{ opacity, transition: "opacity 0.3s" }}
                >
                  {/* Halo */}
                  <circle
                    cx={s.x}
                    cy={s.y}
                    r={s.r * 3.2}
                    fill={s.color}
                    opacity={0.1 + glow * 0.25 + (isActive ? 0.2 : 0)}
                    style={{ transition: "opacity 0.2s" }}
                  />
                  {/* Núcleo */}
                  <circle
                    cx={s.x}
                    cy={s.y}
                    r={s.r}
                    fill={isActive ? "#ffffff" : s.color}
                    style={{
                      transform: `scale(${scale})`,
                      transformOrigin: `${s.x}px ${s.y}px`,
                      transition: "transform 0.25s cubic-bezier(0.25, 0, 0, 1), fill 0.2s",
                      filter: `drop-shadow(0 0 ${4 + glow * 10}px ${s.color})`,
                    }}
                  />
                  {/* Zona de hit más generosa */}
                  <circle cx={s.x} cy={s.y} r={22} fill="transparent" />
                </g>
              );
            })}
          </g>
        </svg>

        {/* Card flotante */}
        <AnimatePresence>
          {active && cardPos && (
            <motion.div
              key={active.item.name}
              initial={{ opacity: 0, y: cardPos.below ? -8 : 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute z-20 w-[250px] pointer-events-none rounded-xl border bg-[#0b0322]/95 backdrop-blur-md p-4 shadow-2xl"
              style={{
                left: cardPos.left,
                top: cardPos.top,
                borderColor: `${active.color}50`,
                boxShadow: `0 0 30px ${active.color}25, 0 12px 40px rgba(0,0,0,0.6)`,
                transform: `translate(${
                  cardPos.nearRight ? "-100%" : cardPos.nearLeft ? "0%" : "-50%"
                }, ${cardPos.below ? "28px" : "calc(-100% - 24px)"})`,
              }}
            >
              <p
                className="font-mono text-[9px] uppercase tracking-widest mb-1.5"
                style={{ color: active.color }}
              >
                {active.catLabel}
              </p>
              <p className="text-sm font-semibold text-white leading-snug">
                {active.item.name}
              </p>
              <p className="text-xs text-gray-400 mt-1">{active.item.institution}</p>
              {active.item.detail && (
                <p className="text-[11px] text-gray-500 mt-1">{active.item.detail}</p>
              )}
              <div className="flex items-center gap-2 mt-2 font-mono text-[10px]">
                {active.item.hours && (
                  <span
                    className="px-1.5 py-0.5 rounded"
                    style={{ color: active.color, background: `${active.color}15`, border: `1px solid ${active.color}30` }}
                  >
                    {active.item.hours}h
                  </span>
                )}
                {active.item.date && (
                  <span className="text-gray-500">{active.item.date}</span>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="text-center font-mono text-[10px] text-gray-600 mt-2">
        hover para explorar · click para fijar
      </p>
    </div>
  );
}
