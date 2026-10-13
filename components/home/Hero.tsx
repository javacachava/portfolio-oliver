"use client";

import Link from "next/link";
import { useState } from "react";
import { profile } from "@/data/profile";

interface Area {
  id: string;
  /** Rótulo corto dentro del chip del tablero. */
  chip: string;
  /** Prueba corta dentro del chip. */
  chipEvidence: string;
  title: string;
  evidence: string;
  href: string;
}

const AREAS: Area[] = [
  {
    id: "software",
    chip: "Software",
    chipEvidence: "POS, bot, invitaciones",
    title: "Desarrollo de software",
    evidence: "Sistema POS para Pizza Brava, bot de pedidos por WhatsApp y gestión de invitaciones.",
    href: "/proyectos",
  },
  {
    id: "seguridad",
    chip: "Ciberseguridad",
    chipEvidence: "RBAC, firma de webhook, TSU",
    title: "Ciberseguridad",
    evidence: "TSU en Ciberseguridad. Control de acceso por roles aplicado en el POS.",
    href: "/proyectos/pos-pizza-brava",
  },
  {
    id: "ia",
    chip: "IA y datos",
    chipEvidence: "Akhet, Atria, FlowCore",
    title: "IA y datos",
    evidence: "Componentes de análisis en Python para CuencaOS / Akhet y Terrivo / Atria.",
    href: "/proyectos/cuencaos",
  },
  {
    id: "coordinacion",
    chip: "Coordinación",
    chipEvidence: "WUJU, TuGuíaSV",
    title: "Coordinación técnica",
    evidence: "Líder técnico de un equipo de seis personas en WUJU.",
    href: "/#wuju",
  },
];

/* Geometría del tablero (viewBox 640 × 520). */
const CHIP_X = 358;
const CHIP_W = 270;
const CHIP_H = 88;
const GAP = 40;
const TOP = 24;
const DIE = { x: 24, y: 206, w: 104, h: 108 };
const STARTS = [236, 252, 268, 284];
/* Codos escalonados para que los trazos no se crucen: arriba crecen, abajo decrecen. */
const ELBOWS = [196, 232, 306, 268];

const chips = AREAS.map((area, i) => {
  const y = TOP + i * (CHIP_H + GAP);
  return { ...area, y, cy: y + CHIP_H / 2 };
});

function chamfered(x0: number, y0: number, ex: number, y1: number, x1: number, d = 14) {
  const delta = y1 - y0;
  if (Math.abs(delta) < 4) return `M${x0} ${y0} H${x1}`;
  const dir = Math.sign(delta);
  const k = Math.min(d, Math.abs(delta) / 2 - 1);
  return `M${x0} ${y0} H${ex - k} L${ex} ${y0 + dir * k} V${y1 - dir * k} L${ex + k} ${y1} H${x1}`;
}

const traces = chips.map((chip, i) =>
  chamfered(DIE.x + DIE.w, STARTS[i], ELBOWS[i], chip.cy, CHIP_X),
);

export default function Hero() {
  const [active, setActive] = useState<number | null>(null);
  const anyActive = active !== null;

  const activate = (i: number) => () => setActive(i);
  const deactivate = () => setActive(null);

  return (
    <section aria-labelledby="inicio-titulo" className="relative overflow-hidden">
      {/* Retícula y luz cálida detrás del tablero */}
      <div aria-hidden="true" className="grid-texture pointer-events-none absolute inset-0 opacity-70" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-0 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(200,130,72,0.22),transparent)]"
      />

      <div className="wrap relative grid gap-x-10 gap-y-14 pb-16 pt-14 sm:pt-20 lg:grid-cols-12 lg:pb-24 lg:pt-24">
        <div className="lg:col-span-7">
          <h1 id="inicio-titulo" className="t-display">
            Oliver
            <br />
            Ascencio
          </h1>
          <p className="t-lead measure mt-8">{profile.tagline}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/proyectos" className="btn btn-primary">
              Ver proyectos
            </Link>
            <a
              href={profile.cv}
              className="btn btn-ghost"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver CV<span className="sr-only"> (PDF, se abre en una pestaña nueva)</span>
            </a>
            <Link href="/#contacto" className="btn btn-ghost">
              Contactar
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5">
          <svg
            viewBox="0 0 640 520"
            aria-hidden="true"
            focusable="false"
            className="h-auto w-full"
            onPointerLeave={deactivate}
          >
            <defs>
              <radialGradient id="hero-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#c88248" stopOpacity="0.38" />
                <stop offset="100%" stopColor="#c88248" stopOpacity="0" />
              </radialGradient>
            </defs>

            <circle cx={DIE.x + DIE.w / 2} cy={DIE.y + DIE.h / 2} r="150" fill="url(#hero-glow)" />

            {/* Entradas a la izquierda del chip principal */}
            {[236, 260, 284].map((y, i) => (
              <g key={y}>
                <path
                  d={`M0 ${y} H${DIE.x}`}
                  pathLength={1}
                  className="hero-trace"
                  style={{ "--i": i } as React.CSSProperties}
                  opacity={0.5}
                />
              </g>
            ))}

            {/* Trazos hacia cada especialidad */}
            {traces.map((d, i) => (
              <g key={AREAS[i].id}>
                <path
                  d={d}
                  pathLength={1}
                  className="hero-trace"
                  data-active={active === i}
                  data-dim={anyActive && active !== i}
                  style={{ "--i": i + 2 } as React.CSSProperties}
                />
                <path
                  d={d}
                  pathLength={1}
                  className="dg-pulse"
                  style={{ "--d": `${3 + i * 0.8}s` } as React.CSSProperties}
                />
                <circle cx={CHIP_X} cy={chips[i].cy} r="4" className="dg-pad" />
              </g>
            ))}

            {/* Chip principal */}
            <g>
              <rect
                x={DIE.x}
                y={DIE.y}
                width={DIE.w}
                height={DIE.h}
                rx="6"
                fill="#34251e"
                stroke="#c88248"
                strokeWidth="2"
              />
              <circle cx={DIE.x + 14} cy={DIE.y + 14} r="3.5" fill="#c88248" />
              <text
                x={DIE.x + DIE.w / 2}
                y={DIE.y + DIE.h / 2 + 12}
                textAnchor="middle"
                fontSize="40"
                fontWeight="700"
                fill="#f5ebdd"
                style={{ fontFamily: "var(--font-bricolage)" }}
              >
                OA
              </text>
            </g>

            {/* Chips de especialidad */}
            {chips.map((chip, i) => (
              <g
                key={chip.id}
                className="hero-chip"
                data-active={active === i}
                style={{ "--i": i } as React.CSSProperties}
                onPointerEnter={activate(i)}
              >
                <rect x={CHIP_X} y={chip.y} width={CHIP_W} height={CHIP_H} rx="5" />
                <text x={CHIP_X + 22} y={chip.y + 38} fontSize="25">
                  {chip.chip}
                </text>
                <text
                  x={CHIP_X + 22}
                  y={chip.y + 65}
                  fontSize="14.5"
                  className="hero-ev"
                >
                  {chip.chipEvidence}
                </text>
                <text x={CHIP_X + CHIP_W - 16} y={chip.y + 22} fontSize="10" textAnchor="end" className="hero-uref">
                  U{i + 1}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Equivalente accesible del tablero: las cuatro áreas, con su prueba. */}
        <ul className="grid gap-x-8 gap-y-6 border-t border-line pt-8 sm:grid-cols-2 lg:col-span-12 lg:grid-cols-4">
          {AREAS.map((area, i) => (
            <li key={area.id}>
              <Link
                href={area.href}
                className="group block no-underline"
                onMouseEnter={activate(i)}
                onMouseLeave={deactivate}
                onFocus={activate(i)}
                onBlur={deactivate}
              >
                <span className="t-h3 block text-crema transition-colors group-hover:text-caramelo group-focus-visible:text-caramelo">
                  {area.title}
                </span>
                <span className="t-small mt-2 block">{area.evidence}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
